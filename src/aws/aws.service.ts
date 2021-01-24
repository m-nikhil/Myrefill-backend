import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from './../aws';
import { Station } from 'src/entities/station.entity';
import { QueryRunner } from 'typeorm';
import { StationCoupon } from 'src/entities/stationCoupon.entity';

@Injectable()
export class AwsService {
  generateRandomString(length) {
    var text = '';
    var possibleChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++)
      text += possibleChars.charAt(
        Math.floor(Math.random() * possibleChars.length),
      );
    return text;
  }

  signedURL = async (queryRunner: QueryRunner, userId, signedUrlRequest) => {
    console.log(signedUrlRequest);
    let fileKey;
    const s3 = new S3({
      region: process.env.AWS_BUCKET_REGION,
      signatureVersion: 'v4',
      accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    });

    if (signedUrlRequest.uploadFor === 'STATION') {
      let station = await queryRunner.manager.findOne(Station, {
        id: signedUrlRequest.id,
      });
      if (!station) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Id Invalid.',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (!station.awsToken) {
        do {
          signedUrlRequest.token = this.generateRandomString(10);
          var existingAWS = await queryRunner.manager.findOne(Station, {
            awsToken: signedUrlRequest.token,
          });
          console.log(existingAWS);
        } while (existingAWS);

        await queryRunner.manager.update(
          Station,
          { id: station.id },
          {
            awsToken: signedUrlRequest.token,
          },
        );
      } else {
        signedUrlRequest.token = station.awsToken;
      }
    }

    const FileResponse = [];
    for (let index = 0; index < signedUrlRequest.data.length; index++) {
      let file = signedUrlRequest.data[index];
      const filename = file.fileName;
      const mimeType = file.contentType;
      var rootDir = process.env.S3_UPLOAD_DIR;

      console.log(signedUrlRequest.token);

      fileKey = `${rootDir}/${signedUrlRequest.uploadFor}/${signedUrlRequest.token}/${filename}`;

      /* if old file want to be deleted---enable this.
                
                if(file.oldFilePath){
                  const delParams={
                    Bucket: process.env.ORIGINAL_BUCKET_NAME,
                    Key: file.oldFilePath
                  }
      
                  s3.deleteObject(delParams, function(err, data) {
                    if (err) {
                      console.log(err, err.stack); // an error occurred
                      throw new Error('Error in deleting old file..!!');
                    }
                    else{
                      console.log(data);           // successful response
                    }
                  });
                } */

      const params = {
        Bucket: process.env.ORIGINAL_BUCKET_NAME,
        Key: fileKey,
        Expires: 600 * (index + 1),
        ContentType: mimeType,
        ACL: mimeType.includes('image') ? 'public-read' : 'private',
      };

      let s3signedUrl = s3.getSignedUrl('putObject', params);
      console.log(s3signedUrl);
      FileResponse.push({
        status: '200',
        signedUrl: s3signedUrl,
        publicUrl: `/s3/uploads/${filename}`,
        filename,
        fileKey,
        token: signedUrlRequest.token,
      });
    }
    // );
    console.log(FileResponse);
    return FileResponse;
  };
}
