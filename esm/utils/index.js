export var handleAuth = function handleAuth() {
  return fetch('https://open.aihaisi.com/qcloud/api/token').then(function (data) {
    return data.json();
  });
};
export var handleUpload = function handleUpload(upload, isPrivate, files, cb) {
  upload.upload(files, {
    bucket: isPrivate ? 'private-10000230' : 'public-10000230',
    urlDomain: isPrivate ? 'privimg.xingren.com' : ''
  }).then(function (res) {
    cb(res);
  })["finally"](function () {});
};