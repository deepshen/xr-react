export const handleAuth = () => fetch('https://open.aihaisi.com/qcloud/api/token').then((data) => data.json());

export const handleUpload = (upload, isPrivate, files, cb) => {
  upload.upload(files, {
    bucket: isPrivate ? 'private-10000230' : 'public-10000230',
    urlDomain: isPrivate ? 'privimg.xingren.com' : '',
  }).then((res) => {
    cb(res);
  }).finally(() => {

  });
};
