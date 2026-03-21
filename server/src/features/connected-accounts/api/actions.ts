import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../../common/types/request";
import { connectedAccountRepository } from "../repository";
import { providers } from "../services/providers";
import { sendResponse } from "../../common/helpers";
import { HTTP_STATUS_CODES } from "@/features/common/constants/http-status-codes";
import encryption from "@/lib/encryption";
import envConfig from "@/lib/env";
import mongoose from "mongoose";

const OAUTH_STATE_SECRET = envConfig.get("OAUTH_STATE_SECRET") as string;

export const getConnectedAccounts = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const accounts = await connectedAccountRepository.getAccountsForUser(req.user_id!);
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })(accounts);
    } catch (error) {
        return next(error);
    }
};

export const connectProvider = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { provider: provider_name } = req.params as { provider: string };
        const provider = providers[provider_name];

        if (!provider) {
            throw new Error(`Provider "${provider_name}" not supported`);
        }

        const state = encryption.encrypt({
            seed: OAUTH_STATE_SECRET,
            value: JSON.stringify({
                user_id: req.user_id!,
                provider: provider_name,
            }),
        });

        const authUrl = provider.getAuthUrl(state);
        res.cookie("oauth_auth_state", state, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000,
        });

        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })({
            authUrl,
        });
    } catch (error) {
        return next(error);
    }
};

export const oauthCallback = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { code, state: state_query } = req.query as { code: string; state: string };
        const { provider: provider_param } = req.params as { provider: string };
        const stored_state = req.cookies.oauth_auth_state;

        if (!state_query || state_query !== stored_state) {
            throw new Error("Invalid OAuth state");
        }

        const decoded_state = JSON.parse(
            encryption.decrypt({
                seed: OAUTH_STATE_SECRET,
                value: state_query,
            }),
        );

        if (decoded_state.user_id !== req.user_id) {
            throw new Error("OAuth user mismatch");
        }

        const provider_name = provider_param || (decoded_state.provider as string);
        const provider = providers[provider_name];

        if (!provider) {
            throw new Error(`Provider "${provider_name}" not supported`);
        }

        res.clearCookie("oauth_auth_state");

        const tokens = await provider.exchangeCode(code);
        const profile = await provider.getUserProfile(tokens.access_token);

        await connectedAccountRepository.upsertAccount({
            user_id: new mongoose.Types.ObjectId(req.user_id!),
            provider: provider_name as "spotify" | "apple" | "youtube",
            provider_id: profile.id,
            display_name: profile.display_name,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: tokens.expires_at,
        });

        const website_url = envConfig.get("WEBSITE_URL") as string;
        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })({
            success: true,
            redirect_url: `${website_url}/profile`,
        });
    } catch (error) {
        return next(error);
    }
};

export const disconnectAccount = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await connectedAccountRepository.deleteById({
            user_id: req.user_id!,
            account_id: id as string,
        });

        return sendResponse({ res, status: HTTP_STATUS_CODES.OK })({
            message: "Account disconnected successfully",
        });
    } catch (error) {
        return next(error);
    }
};
