import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

export default (props) => {
  const { value = '' } = props;
  return (
    <ReactMarkdown
      source={value}
      escapeHtml={false}
      renderers={{
        code: CodeBlock,
      }}
    />
  );
};
