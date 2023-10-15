const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: "AKIA3BCD7COSYA3ZBUXS",
    secretAccessKey: "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",
    region: "ap-northeast-2"
});

const imageStorage = multerS3({
    s3: s3,
    bucket: "kdt-wonno2",
    acl: 'public-read',
    key: (req, file, cb) => {
        const uniqueFileName = Date.now().toString() + "-" + Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, "img/" + uniqueFileName); 
    }
});

const audioStorage = multerS3({
    s3: s3,
    bucket: "kdt-wonno2",
    acl: 'public-read',
    key: (req, file, cb) => {
        const uniqueFileName = Date.now().toString() + "-" + Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, "audio/" + uniqueFileName); 
    }
});

const limits = { fileSize: 1024 * 1024 * 10 };

module.exports.uploadImage = multer({ storage: imageStorage, limits }).single('imgfile');
module.exports.uploadAudio = multer({ storage: audioStorage, limits }).single('songfile');
