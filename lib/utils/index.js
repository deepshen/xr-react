"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleUpload = exports.handleAuth = void 0;

const handleAuth = () => fetch('https://open.aihaisi.com/qcloud/api/token').then(data => data.json());

exports.handleAuth = handleAuth;

const handleUpload = (upload, isPrivate, files, cb) => {
  upload.upload(files, {
    bucket: isPrivate ? 'private-10000230' : 'public-10000230',
    urlDomain: isPrivate ? 'privimg.xingren.com' : ''
  }).then(res => {
    cb(res);
  }).finally(() => {});
};

exports.handleUpload = handleUpload;