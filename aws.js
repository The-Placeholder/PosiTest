import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

(async () => {
  await s3
    .putObject({
      Body: 'Hello World',
      Bucket: 'nofriendo-bucket',
      Key: 'Test.txt',
    })
    .promise();
})();
