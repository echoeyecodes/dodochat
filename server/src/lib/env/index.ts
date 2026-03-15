import dotenv, { type DotenvConfigOptions } from "dotenv";

const envFile: DotenvConfigOptions | undefined = process.env.NODE_ENV === "test" ? { path: ".env.test" } : undefined

dotenv.config(envFile);

const envConfig = {
    get: (key: string) => {
        return process.env[key];
    },
};

export default envConfig;
