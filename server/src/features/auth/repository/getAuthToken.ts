import { AuthTokenModel } from '../models/AuthToken';
import { authTokenNotFoundError } from '../constants/errors';

type GetAuthTokenInput = {
    access_token?: string,
    refresh_token?: string
}

export const getAuthToken = async ({ access_token, refresh_token }: GetAuthTokenInput) => {
    let query: any = {}
    if (access_token) {
        query.access_token = access_token
    }
    if (refresh_token) {
        query.refresh_token = refresh_token
    }
    const authToken = await AuthTokenModel.findOne(query).lean();
    if (!authToken) throw authTokenNotFoundError();
    return authToken;
};
