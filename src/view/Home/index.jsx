import React from 'react';
import MarkDown from '@/localCom/MarkDown';
import desc from './index.md';

export default () => (
  <div>
    <MarkDown value={desc} />
  </div>
);
