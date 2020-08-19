import React, { useState } from 'react';
import { Upload } from '@/components/index';
import home from './home.md';
import MarkDown from '../../localCom/MarkDown';

export default () => {
  const [url, setUrl] = useState('');
  const handleSuccess = (res) => {
    setUrl(res[0]);
  };
  return (
    <div>
      <div>
        <img src={url} alt="" />
        <Upload onSuccess={handleSuccess} />
      </div>
      <MarkDown
        value={home}
      />
    </div>
  );
};
