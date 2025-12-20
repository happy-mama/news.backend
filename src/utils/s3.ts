import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

import env from "./env.js";

const AVAILABLE_BUCKETS = ["news.md"] as const;

const s3 = new S3Client({
  endpoint: env.get("MINIO_URL"),
  credentials: {
    accessKeyId: env.get("MINIO_CREDENTIAL_KEY_ID"),
    secretAccessKey: env.get("MINIO_CREDENTIAL_ACCESS_KEY"),
  },
});

async function getFile(
  bucket: (typeof AVAILABLE_BUCKETS)[number],
  key: string,
) {
  const data = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: key }),
  );

  const stream = data.Body as Readable;
  const chunks: Buffer[] = [];

  for await (const chunk of stream) chunks.push(chunk);

  return Buffer.concat(chunks);
}

async function getFileAsText(
  bucket: (typeof AVAILABLE_BUCKETS)[number],
  key: string,
) {
  const buffer = await getFile(bucket, key);

  return buffer.toString("utf-8");
}

export default { getFile, getFileAsText };
