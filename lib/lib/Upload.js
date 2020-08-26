"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _xrCosWeb = require("xr-cos-web");

var _xrCosWeb2 = _interopRequireDefault(_xrCosWeb);

var _index = require("../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FN = () => {};

exports.default = props => {
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
    onChange = () => true
  } = props;
  const upload = new _xrCosWeb2.default({
    getAuth() {
      const startTime = parseInt(String(new Date().valueOf() / 1000), 10);
      return (0, _index.handleAuth)().then(res => ({
        TmpSecretId: res.data.tmpSecretId,
        TmpSecretKey: res.data.tmpSecretKey,
        StartTime: startTime,
        ExpiredTime: res.data.expiration,
        XCosSecurityToken: res.data.sessionToken
      }));
    },

    region: 'ap-shanghai'
  });
  upload.on('auth-success', res => {
    // 获取临时密匙成功
    authSuccess(res);
  });
  upload.on('auth-failed', err => {
    // 获取临时密匙错误
    authFailed(err);
  });
  upload.on('before-upload', res => {
    // 上传文件前
    beforeUpload(res);
  });
  upload.on('upload-progress', res => {
    // 上传进度
    uploadProgress(res);
  });
  upload.on('upload-file-success', res => {
    // 上传单个文件成功
    uploadFileSuccess(res);
  });
  upload.on('upload-file-failed', err => {
    // 上传单个文件失败
    uploadFileFailed(err);
  });
  upload.on('upload-error', err => {
    // 上传错误
    uploadError(err);
  });
  upload.on('upload-finish', res => {
    // 上传结束 任何情况
    uploadFinish(res);
  });

  const handleChange = e => {
    const {
      files
    } = e.target;
    let result = true;
    result = onChange();

    if (!result) {
      return;
    }

    const blobArr = [];

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
          (0, _index.handleUpload)(upload, isPrivate, blobArr, onSuccess);
        }
      };
    }
  };

  return /*#__PURE__*/_react2.default.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'inline-block'
    }
  }, props.children ? props.children : /*#__PURE__*/_react2.default.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80px',
      height: '80px',
      border: '1px solid #ececec',
      borderRadius: '6px'
    }
  }, "+"), /*#__PURE__*/_react2.default.createElement("input", {
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