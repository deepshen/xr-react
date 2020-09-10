import React from 'react';
import Form from '@/components/lib/form';

export default () => {
  const data = [
    {
      label: '姓名',
      name: 'name',
      type: 'input',
    },
  ];
  return (
    <Form
      formData={data}
    />
  );
};
