import _typeof from "@babel/runtime/helpers/esm/typeof";
import React from 'react';
import COS from 'xr-cos-web';
import { handleUpload, handleAuth } from '../utils/index';

var FN = function FN() {};

var Upload = function Upload(props) {
  var _props$multiple = props.multiple,
      multiple = _props$multiple === void 0 ? false : _props$multiple,
      _props$authSuccess = props.authSuccess,
      authSuccess = _props$authSuccess === void 0 ? FN : _props$authSuccess,
      _props$authFailed = props.authFailed,
      authFailed = _props$authFailed === void 0 ? FN : _props$authFailed,
      _props$beforeUpload = props.beforeUpload,
      beforeUpload = _props$beforeUpload === void 0 ? FN : _props$beforeUpload,
      _props$uploadProgress = props.uploadProgress,
      uploadProgress = _props$uploadProgress === void 0 ? FN : _props$uploadProgress,
      _props$uploadFileSucc = props.uploadFileSuccess,
      uploadFileSuccess = _props$uploadFileSucc === void 0 ? FN : _props$uploadFileSucc,
      _props$uploadFileFail = props.uploadFileFailed,
      uploadFileFailed = _props$uploadFileFail === void 0 ? FN : _props$uploadFileFail,
      _props$uploadError = props.uploadError,
      uploadError = _props$uploadError === void 0 ? FN : _props$uploadError,
      _props$uploadFinish = props.uploadFinish,
      uploadFinish = _props$uploadFinish === void 0 ? FN : _props$uploadFinish,
      _props$onSuccess = props.onSuccess,
      onSuccess = _props$onSuccess === void 0 ? FN : _props$onSuccess,
      _props$isPrivate = props.isPrivate,
      isPrivate = _props$isPrivate === void 0 ? false : _props$isPrivate,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function () {
    return true;
  } : _props$onChange;
  var upload = new COS({
    getAuth: function getAuth() {
      var startTime = parseInt(String(new Date().valueOf() / 1000), 10);
      return handleAuth().then(function (res) {
        return {
          TmpSecretId: res.data.tmpSecretId,
          TmpSecretKey: res.data.tmpSecretKey,
          StartTime: startTime,
          ExpiredTime: res.data.expiration,
          XCosSecurityToken: res.data.sessionToken
        };
      });
    },
    region: 'ap-shanghai'
  });
  upload.on('auth-success', function (res) {
    // 获取临时密匙成功
    authSuccess(res);
  });
  upload.on('auth-failed', function (err) {
    // 获取临时密匙错误
    authFailed(err);
  });
  upload.on('before-upload', function (res) {
    // 上传文件前
    beforeUpload(res);
  });
  upload.on('upload-progress', function (res) {
    // 上传进度
    uploadProgress(res);
  });
  upload.on('upload-file-success', function (res) {
    // 上传单个文件成功
    uploadFileSuccess(res);
  });
  upload.on('upload-file-failed', function (err) {
    // 上传单个文件失败
    uploadFileFailed(err);
  });
  upload.on('upload-error', function (err) {
    // 上传错误
    uploadError(err);
  });
  upload.on('upload-finish', function (res) {
    // 上传结束 任何情况
    uploadFinish(res);
  });

  var handleChange = function handleChange(e) {
    var files = e.target.files;
    var result = true;
    result = onChange();

    if (!result) {
      return;
    }

    var blobArr = [];

    var _loop = function _loop(i, len) {
      var item = files[i];
      var reader = new FileReader();
      reader.readAsArrayBuffer(item);
      var blob = void 0;

      reader.onload = function (r) {
        if (_typeof(r.target.result) === 'object') {
          blob = new Blob([r.target.result]);
        } else {
          blob = e.target.result;
        }

        blobArr.push(blob);

        if (i === len - 1) {
          handleUpload(upload, isPrivate, blobArr, onSuccess);
        }
      };
    };

    for (var i = 0, len = files.length; i < len; i += 1) {
      _loop(i, len);
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'inline-block'
    }
  }, props.children ? props.children : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80px',
      height: '80px',
      border: '1px solid #ececec',
      borderRadius: '6px'
    }
  }, "+"), /*#__PURE__*/React.createElement("input", {
    multiple: multiple,
    onChange: handleChange,
    style: {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      opacity: 0
    },
    type: "file"
  }));
};

export default Upload;