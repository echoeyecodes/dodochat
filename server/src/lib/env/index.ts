import dotenv from "dotenv";

dotenv.config();

const envConfig = {
  get: (key: string) => {
    return process.env[key];
  },
};

export default envConfig;
