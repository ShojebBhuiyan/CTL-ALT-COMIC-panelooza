import { S3 } from "@aws-sdk/client-s3";

declare global {
  var s3: S3 | undefined;
}

export const s3Client =
  globalThis.s3 ||
  new S3({
    forcePathStyle: false,
    endpoint: process.env.SPACES_ENDPOINT!,
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.SPACES_KEY!,
      secretAccessKey: process.env.SPACES_SECRET!,
    },
  });

if (process.env.NODE_ENV !== "production") globalThis.s3 = s3Client;
