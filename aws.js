import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BaseURL = 'https://nofriendo-bucket.s3.amazonaws.com/';
const FileName = 'Test1.txt';
async function uploadImage(BaseURL, FileName) {
  try {
    await s3
      .putObject({
        Body: 'Hello World',
        Bucket: 'nofriendo-bucket',
        Key: FileName,
      })
      .promise();
    return `${BaseURL}${FileName}`;
  } catch (err) {
    return null;
  }
}

uploadImage(BaseURL, FileName).then((response) => {
  console.log(response);
});
