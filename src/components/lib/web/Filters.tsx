import React, { useEffect, useState, cloneElement } from 'react';
import {
  Row, Col, Input, Button, Select,
} from 'antd';

const { Option } = Select;

interface FilterItem{
  name: string;
  type: string;
  options?: object[];
  render?: Function;
}
interface Props {
  filters: FilterItem[];
  value: object;
  onChange: Function;
  onSearch: Function;
}

export default (props: Props) => {
  const {
    filters = [], value = {}, onChange, onSearch,
  } = props;
  const [reset, setReset] = useState(false);
  const handleChange = (e: any, name: string): void => {
    const val = e?.target?.value || e;
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
      <Col key={item.name || index} span={4}>
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
    <div>
      <Row gutter={16}>
        {
          renderItem()
        }
        <Col>
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" onClick={handleSearch}>搜索</Button>
        </Col>
      </Row>
    </div>
  );
};
