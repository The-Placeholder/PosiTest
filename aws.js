import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY, // Make sure these match your .env file
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const BucketName = 'nofriendo-bucket';
const BaseURL = `https://${BucketName}.s3.amazonaws.com/`;

// Helper function to determine the content type based on the file extension
export function getContentTypeByFile(fileName) {
  const ext = path.extname(fileName).toLowerCase();

  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    // Add other file types as needed
  };

  return mimeTypes[ext] || 'application/octet-stream';
}

export async function uploadImage(fileName, fileBuffer, contentType) {
  try {
    const response = await s3
      .putObject({
        Bucket: BucketName,
        Key: fileName,
        Body: fileBuffer,
        ContentType: contentType,
      })
      .promise();
    return `${BaseURL}${fileName}`;
  } catch (err) {
    console.error('Upload failed:', err);
    throw new Error('Failed to upload image to S3'); // Throw an error or return a custom error message
    return null;
  }
}
