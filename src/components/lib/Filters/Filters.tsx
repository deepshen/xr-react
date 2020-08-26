import React, { useEffect, useState, cloneElement } from 'react';
import {
  Row, Col, Input, Button, Select, DatePicker,
} from 'antd';
import './style/filter.less'
import {FilterItem,Props} from './interface'

const { Option } = Select;
const { RangePicker } = DatePicker;

export default (props: Props) => {
  const {
    filters = [], value = {}, onChange, onSearch,
  } = props;
  const [reset, setReset] = useState(false);
  const handleChange = (e: any, name: string): void => {
    let val: any;
    if (e?.target?.nodeName === 'INPUT') {
      val = e?.target?.value || '';
    } else {
      val = e?.target?.value || e;
    }
    value[name] = val;
    onChange({ ...value }, name, val);
  };
  const renderItem = () => filters.map((item: FilterItem, index: number) => {
    const {
      name, type, options = [], render, ...rest
    } = item;
    let node = null;
    switch (type) {
      case 'input': {
        node = (
          <Input
            allowClear
            onChange={(e) => handleChange(e, name)}
            value={value[name]}
            {...rest}
          />
        );
        break;
      }
      case 'select': {
        node = (
          <Select allowClear value={value[name]} onChange={(e) => handleChange(e, name)} style={{ width: '100%' }} {...rest}>
            {
                options.map((i: any) => (
                  <Option value={i.value} key={i.value}>{i.label}</Option>
                ))
              }
          </Select>
        );
        break;
      }
      case 'date': {
        node = <DatePicker style={{ width: '100%' }} value={value[name]} onChange={(e) => handleChange(e, name)} {...rest} />;
        break;
      }
      case 'rdate': {
        node = <RangePicker style={{ width: '100%' }} value={value[name]} onChange={(e) => handleChange(e, name)} {...rest} />;
        break;
      }
      case 'render': {
        if (render) {
          const component = render();
          let Dom;
          if (typeof component === 'string') {
            Dom = component;
          } else {
            Dom = cloneElement(component, {
              value: value[name],
              onChange: (e: any) => handleChange(e, name),
            });
          }
          node = Dom;
        }
        break;
      }
      default: {
        node = null;
      }
    }
    return (
      <Col className="com-filter-item" key={item.name || index} span={type !== 'rdate' ? 4 : 8}>
        {node}
      </Col>
    );
  });
  const handleSearch = (): void => {
    onSearch();
  };
  useEffect(() => {
    if (reset && JSON.stringify(value) === '{}') {
      handleSearch();
      setReset(false);
    }
  }, [reset, value]);
  const handleReset = (): void => {
    onChange({});
    setReset(true);
  };
  return (
    <div className="com-box">
      <Row gutter={16}>
        {
          renderItem()
        }
        <Col className="com-btn-box">
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={handleSearch}>搜索</Button>
        </Col>
      </Row>
    </div>
  );
};
