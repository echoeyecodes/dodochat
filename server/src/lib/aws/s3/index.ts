import aws from "..";
import envConfig from "../../env";

export const BUCKET_NAME = envConfig.get("AWS_S3_BUCKET_NAME")!;
const s3 = new aws.S3({
  region: envConfig.get("AWS_S3_REGION"),
  credentials: {
    accessKeyId: envConfig.get("AWS_S3_ACCESS_KEY_ID")!,
    secretAccessKey: envConfig.get("AWS_S3_SECRET_ACCESS_KEY")!,
  },
});

export default s3;
