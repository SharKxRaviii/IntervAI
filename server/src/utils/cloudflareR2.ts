import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: `${process.env.R2_ACCESS_KEY}`,
        secretAccessKey: `${process.env.R2_SECRET_KEY}`
    },
});

const command = new PutObjectCommand({
    Bucket: `${process.env.R2_BUCKET}`,
    Key: "r2_uploads/",
    Body: "pdf_text",
    ContentType: "text/plain"
});

await client.send(command);
console.log("Resume uploaded");