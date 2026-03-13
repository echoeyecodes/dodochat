import { AuthTokenModel } from '../models/AuthToken';

export const deleteAuthToken = async (access_token: string) => {
    return await AuthTokenModel.deleteOne({ access_token });
};
