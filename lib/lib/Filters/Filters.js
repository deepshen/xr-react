"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

require("./style/filter.less");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  Option
} = _antd.Select;
const {
  RangePicker
} = _antd.DatePicker;

var _default = props => {
  const {
    filters = [],
    value = {},
    onChange,
    onSearch
  } = props;
  const [reset, setReset] = (0, _react.useState)(false);

  const handleChange = (e, name) => {
    var _e$target;

    let val;

    if ((e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.nodeName) === 'INPUT') {
      var _e$target2;

      val = (e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.value) || '';
    } else {
      var _e$target3;

      val = (e === null || e === void 0 ? void 0 : (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : _e$target3.value) || e;
    }

    value[name] = val;
    onChange({ ...value
    }, name, val);
  };

  const renderItem = () => filters.map((item, index) => {
    const {
      name,
      type,
      options = [],
      render,
      ...rest
    } = item;
    let node = null;

    switch (type) {
      case 'input':
        {
          node = /*#__PURE__*/_react.default.createElement(_antd.Input, _extends({
            allowClear: true,
            onChange: e => handleChange(e, name),
            value: value[name]
          }, rest));
          break;
        }

      case 'select':
        {
          node = /*#__PURE__*/_react.default.createElement(_antd.Select, _extends({
            allowClear: true,
            value: value[name],
            onChange: e => handleChange(e, name),
            style: {
              width: '100%'
            }
          }, rest), options.map(i => /*#__PURE__*/_react.default.createElement(Option, {
            value: i.value,
            key: i.value
          }, i.label)));
          break;
        }

      case 'date':
        {
          node = /*#__PURE__*/_react.default.createElement(_antd.DatePicker, _extends({
            style: {
              width: '100%'
            },
            value: value[name],
            onChange: e => handleChange(e, name)
          }, rest));
          break;
        }

      case 'rdate':
        {
          node = /*#__PURE__*/_react.default.createElement(RangePicker, _extends({
            style: {
              width: '100%'
            },
            value: value[name],
            onChange: e => handleChange(e, name)
          }, rest));
          break;
        }

      case 'render':
        {
          if (render) {
            const component = render();
            let Dom;

            if (typeof component === 'string') {
              Dom = component;
            } else {
              Dom = /*#__PURE__*/(0, _react.cloneElement)(component, {
                value: value[name],
                onChange: e => handleChange(e, name)
              });
            }

            node = Dom;
          }

          break;
        }

      default:
        {
          node = null;
        }
    }

    return /*#__PURE__*/_react.default.createElement(_antd.Col, {
      className: "com-filter-item",
      key: item.name || index,
      span: type !== 'rdate' ? 4 : 8
    }, node);
  });

  const handleSearch = () => {
    onSearch();
  };

  (0, _react.useEffect)(() => {
    if (reset && JSON.stringify(value) === '{}') {
      handleSearch();
      setReset(false);
    }
  }, [reset, value]);

  const handleReset = () => {
    onChange({});
    setReset(true);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "com-box"
  }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
    gutter: 16
  }, renderItem(), /*#__PURE__*/_react.default.createElement(_antd.Col, {
    className: "com-btn-box"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: handleReset
  }, "\u91CD\u7F6E"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: handleSearch
  }, "\u641C\u7D22"))));
};

exports.default = _default;