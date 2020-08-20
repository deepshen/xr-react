import React, { useState } from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import MarkDown from './MarkDown';
import './extand.less';

export default (props) => {
  const { value } = props;
  const [extand, setExtand] = useState(false);
  const handleToggle = () => {
    setExtand(!extand);
  };
  return (
    <div>
      <div>
        <h3>基本用法</h3>
      </div>
      <Button icon={extand ? <UpOutlined /> : <DownOutlined />} onClick={handleToggle} size="small" type="primary">{extand ? '收起' : '展开'}</Button>
      <div className={classnames('mark-box', extand && 'extand')}>
        <MarkDown value={value} />
      </div>
    </div>
  );
};
