import React, { useState } from 'react';
import home from './home.md';
import MarkDown from '../../localCom/MarkDown';
import {Upload} from '@/components/index'

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
