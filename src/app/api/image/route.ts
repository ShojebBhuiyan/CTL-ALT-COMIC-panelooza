import { GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { File } from "buffer";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: process.env.SPACES_ENDPOINT!,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!,
  },
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file-input");

    if (!file) return NextResponse.json({ message: "failure" });

    const isFile = file instanceof File;

    if (!isFile) return NextResponse.json({ message: "failure" });

    const buffer = await file.arrayBuffer();

    const timestamp = Date.now();

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.SPACES_NAME,
        Key: timestamp.toString(),
        Body: Buffer.from(buffer),
      })
    );
    return NextResponse.json({ message: "success", filename: timestamp });
  } catch (reason) {
    console.log(reason);
    return NextResponse.json({ message: "failure" });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const fileName = searchParams.get("fileName");

    const { Body } = await s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.SPACES_NAME!,
        Key: fileName as string,
      })
    );

    if (Body instanceof Readable) {
      const chunks = [];
      for await (const chunk of Body) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      const blob = new Blob([buffer]);

      return new Response(blob, {
        headers: { "Content-Type": "image/*" },
      });
    } else {
      throw new Error("Could not retrieve file");
    }
  } catch (reason) {
    console.log(reason);
    return NextResponse.json({ message: "failure" });
  }
}
