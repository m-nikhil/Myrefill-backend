const aws = require("aws-sdk");

const S3 = require("aws-sdk/clients/s3");

var SES = require("aws-sdk/clients/ses");
console.log(process.env.AWS_SES_ACCESS_KEY_ID);
const ses = new SES({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: "ap-south-1",
  apiVersion: "2010-12-01"
});
// exports.ses = ses;
export const ses=ses;

aws.config.update({
  signatureVersion: "v2",
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY
});
// exports.S3 = S3;
export const S3=S3;

const sns= new aws.SNS({
  apiVersion: '2010-03-31',
  region: "ap-south-1",
});

// exports.SNS=sns;
export const SNS=sns;