import "dotenv/config";
import { IgdbClient } from "./igdb-client";

const client_id = process.env.IGDB_CLIENT_ID!;
const client_secret = process.env.IGDB_CLIENT_SECRET!;

export const igdbApi = new IgdbClient({
    client_id: client_id,
    client_secret: client_secret
});
