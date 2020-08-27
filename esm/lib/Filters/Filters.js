import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useEffect, useState, cloneElement } from 'react';
import { Row, Col, Input, Button, Select, DatePicker } from 'antd';
var Option = Select.Option;
var RangePicker = DatePicker.RangePicker;
export default (function (props) {
  var _props$filters = props.filters,
      filters = _props$filters === void 0 ? [] : _props$filters,
      _props$value = props.value,
      value = _props$value === void 0 ? {} : _props$value,
      onChange = props.onChange,
      onSearch = props.onSearch;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      reset = _useState2[0],
      setReset = _useState2[1];

  var handleChange = function handleChange(e, name) {
    var _e$target;

    var val;

    if ((e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.nodeName) === 'INPUT') {
      var _e$target2;

      val = (e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.value) || '';
    } else {
      var _e$target3;

      val = (e === null || e === void 0 ? void 0 : (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : _e$target3.value) || e;
    }

    value[name] = val;
    onChange(_objectSpread({}, value), name, val);
  };

  var renderItem = function renderItem() {
    return filters.map(function (item, index) {
      var name = item.name,
          type = item.type,
          _item$options = item.options,
          options = _item$options === void 0 ? [] : _item$options,
          render = item.render,
          rest = _objectWithoutProperties(item, ["name", "type", "options", "render"]);

      var node = null;

      switch (type) {
        case 'input':
          {
            node = /*#__PURE__*/React.createElement(Input, _extends({
              allowClear: true,
              onChange: function onChange(e) {
                return handleChange(e, name);
              },
              value: value[name]
            }, rest));
            break;
          }

        case 'select':
          {
            node = /*#__PURE__*/React.createElement(Select, _extends({
              allowClear: true,
              value: value[name],
              onChange: function onChange(e) {
                return handleChange(e, name);
              },
              style: {
                width: '100%'
              }
            }, rest), options.map(function (i) {
              return /*#__PURE__*/React.createElement(Option, {
                value: i.value,
                key: i.value
              }, i.label);
            }));
            break;
          }

        case 'date':
          {
            node = /*#__PURE__*/React.createElement(DatePicker, _extends({
              style: {
                width: '100%'
              },
              value: value[name],
              onChange: function onChange(e) {
                return handleChange(e, name);
              }
            }, rest));
            break;
          }

        case 'rdate':
          {
            node = /*#__PURE__*/React.createElement(RangePicker, _extends({
              style: {
                width: '100%'
              },
              value: value[name],
              onChange: function onChange(e) {
                return handleChange(e, name);
              }
            }, rest));
            break;
          }

        case 'render':
          {
            if (render) {
              var component = render();
              var Dom;

              if (typeof component === 'string') {
                Dom = component;
              } else {
                Dom = /*#__PURE__*/cloneElement(component, {
                  value: value[name],
                  onChange: function onChange(e) {
                    return handleChange(e, name);
                  }
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

      return /*#__PURE__*/React.createElement(Col, {
        className: "com-filter-item",
        key: item.name || index,
        span: type !== 'rdate' ? 4 : 8
      }, node);
    });
  };

  var handleSearch = function handleSearch() {
    onSearch();
  };

  useEffect(function () {
    if (reset && JSON.stringify(value) === '{}') {
      handleSearch();
      setReset(false);
    }
  }, [reset, value]);

  var handleReset = function handleReset() {
    onChange({});
    setReset(true);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "com-box"
  }, /*#__PURE__*/React.createElement(Row, {
    gutter: 16
  }, renderItem(), /*#__PURE__*/React.createElement(Col, {
    className: "com-btn-box"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: handleReset
  }, "\u91CD\u7F6E"), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: handleSearch
  }, "\u641C\u7D22"))));
});