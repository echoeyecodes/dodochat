import { Router } from "express";
import isAuthenticated from "../../common/middlewares/isAuthenticated";
import { validate } from "../../common/middlewares/validate";
import {
    ConnectOAuthSchema,
    OAuthCallbackSchema,
    DisconnectAccountSchema,
} from "./req-schema";
import {
    getConnectedAccounts,
    connectProvider,
    oauthCallback,
    disconnectAccount,
} from "./actions";

const router = Router();

router.get("/", isAuthenticated, getConnectedAccounts);
router.get("/:provider/connect", isAuthenticated, validate(ConnectOAuthSchema), connectProvider);
router.get("/:provider/callback", isAuthenticated, validate(OAuthCallbackSchema), oauthCallback);
router.delete("/:id", isAuthenticated, validate(DisconnectAccountSchema), disconnectAccount);

export default router;
