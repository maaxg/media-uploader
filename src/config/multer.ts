import multer from 'multer';
import path from 'path';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
require('dotenv').config();

const s3 = new aws.S3({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.REGION,
});


const storage = {
    local: 
        multer.diskStorage({
            destination: function (req, file, cb) {
              // to use local storage create at root tmp/media
              cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'media' ));
            },
            filename: function (req, file, cb) {
              cb(null, file.originalname);
            },
        }),

      s3: multerS3({
        s3,
        bucket: process.env.BUCKET_NAME || '',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: process.env.ACL,
        metadata: (req, file, cb) => cb(null, {fieldName: file.fieldname}),
        key: (req, file, cb) => cb(null, file.originalname)
      })
}

const limits = {
    fileSize: (1024 * 5) * 1024
};

export const upload = multer({ storage: storage.s3, limits: limits,  }).single('media')
