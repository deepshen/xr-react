import React from 'react';
import COS from 'xr-cos-web';
import { handleUpload, handleAuth } from '../../utils/index';

const FN = () => {};
interface Props {
  isPrivate?: boolean;
  multiple?: boolean;
  authSuccess?: Function;
  authFailed?: Function;
  beforeUpload?: Function;
  uploadProgress?: Function;
  uploadFileSuccess?: Function;
  uploadFileFailed?: Function;
  uploadError?: Function;
  uploadFinish?: Function;
  onSuccess?: Function;
  onChange?: Function;
  children?: object;
}
export default (props: Props) => {
  const {
    multiple = false,
    authSuccess = FN,
    authFailed = FN,
    beforeUpload = FN,
    uploadProgress = FN,
    uploadFileSuccess = FN,
    uploadFileFailed = FN,
    uploadError = FN,
    uploadFinish = FN,
    onSuccess = FN,
    isPrivate = false,
    onChange = () => true,
  } = props;
  const upload = new COS({
    getAuth() {
      const startTime = (new Date().valueOf() / 1000);
      return handleAuth().then((res) => ({
        TmpSecretId: res.data.tmpSecretId,
        TmpSecretKey: res.data.tmpSecretKey,
        StartTime: startTime,
        ExpiredTime: res.data.expiration,
        XCosSecurityToken: res.data.sessionToken,
      }));
    },
    region: 'ap-shanghai',
  });
  upload.on('auth-success', (res) => {
    // 获取临时密匙成功
    authSuccess(res);
  });
  upload.on('auth-failed', (err) => {
    // 获取临时密匙错误
    authFailed(err);
  });
  upload.on('before-upload', (res) => {
    // 上传文件前
    beforeUpload(res);
  });
  upload.on('upload-progress', (res) => {
    // 上传进度
    uploadProgress(res);
  });
  upload.on('upload-file-success', (res) => {
    // 上传单个文件成功
    uploadFileSuccess(res);
  });
  upload.on('upload-file-failed', (err) => {
    // 上传单个文件失败
    uploadFileFailed(err);
  });
  upload.on('upload-error', (err) => {
    // 上传错误
    uploadError(err);
  });
  upload.on('upload-finish', (res) => {
    // 上传结束 任何情况
    uploadFinish(res);
  });
  const handleChange = (e: any): void => {
    const { files } = e.target;
    let result = true;
    result = onChange();
    if (!result) {
      return;
    }
    const blobArr: any[] = [];
    for (let i = 0, len = files.length; i < len; i += 1) {
      const item = files[i];
      const reader = new FileReader();
      reader.readAsArrayBuffer(item);
      let blob;
      reader.onload = function (r) {
        if (typeof r.target.result === 'object') {
          blob = new Blob([r.target.result]);
        } else {
          blob = e.target.result;
        }
        blobArr.push(blob);
        if (i === len - 1) {
          handleUpload(upload, isPrivate, blobArr, onSuccess);
        }
      };
    }
  };
  return (
    <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
      {
        props.children ? props.children : (
          <div style={
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              border: '1px solid #ececec',
              borderRadius: '6px',
            }
          }
          >
            +
          </div>
        )
      }
      <input
        multiple={multiple}
        onChange={handleChange}
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          opacity: 0,
        }}
        type="file"
      />
    </div>
  );
};
