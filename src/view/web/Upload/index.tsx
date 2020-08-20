import React, { useState } from 'react';
import { Upload } from '@/components/index';
import MarkDown from '@/localCom/MarkDown';
import ExtandMark from '@/localCom/ExtandMark';
import home from './index.md';
import base from './base.md';

export default () => {
  const [url, setUrl] = useState('');
  const handleSuccess = (res) => {
    setUrl(res[0]);
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <img style={{ width: 80, height: 80, marginRight: 20 }} src={url} alt="" />
        <Upload onSuccess={handleSuccess} />
      </div>
      <ExtandMark value={base} />
      <MarkDown
        value={home}
      />
    </div>
  );
};
