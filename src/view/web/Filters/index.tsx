import React, { useEffect, useState } from 'react';
import { Filters } from '@/components/index';
import { Input } from 'antd';
import MarkDown from '@/localCom/MarkDown';
import ExtandMark from '@/localCom/ExtandMark';
import '@/components/lib/filters/style/filter.less';
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
        {
          value: '2',
          label: 'ceshi2',
        },
      ],
      placeholder: '年龄',
    },
    {
      type: 'date',
      name: 'time',
      placeholder: '请选择时间',
    },
    {
      type: 'rdate',
      name: 'time2',
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
      <div className="md-box">
        <MarkDown
          value={desc}
        />
      </div>
    </div>
  );
};

export default Fil;
