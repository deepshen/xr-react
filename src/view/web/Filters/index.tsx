import React, { useEffect, useState } from 'react';
import { Filters } from '@/components/index';
import { Input } from 'antd';
import MarkDown from '@/localCom/MarkDown';
import ExtandMark from '@/localCom/ExtandMark';
import desc from './index.md';
import base from './base.md';

const Fil = (props) => {
  const [value, setValue] = useState({});
  const filters = [
    {
      type: 'input',
      name: 'name',
      placeholder: '名字',
    },
    {
      type: 'select',
      name: 'age',
      options: [
        {
          value: '1',
          label: 'ceshi',
        },
      ],
      placeholder: '年龄',
    },
    {
      type: 'render',
      name: 'ceshi',
      render: () => <Input placeholder="ceshi" />,
    },
  ];
  useEffect(() => {
  }, []);
  const handleChange = (res: object) => {
    setValue(res);
  };
  const handleSearch = () => {
    alert(JSON.stringify(value));
  };
  return (
    <div>
      <Filters
        onSearch={handleSearch}
        onChange={handleChange}
        filters={filters}
        value={value}
      />
      <ExtandMark
        value={base}
      />
      <MarkDown
        value={desc}
      />
    </div>
  );
};

export default Fil;
