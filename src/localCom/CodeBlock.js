import React, { PureComponent } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// 设置高亮样式
import { prism as mtstyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
// 设置高亮的语言
import {
  jsx, javascript,
} from 'react-syntax-highlighter/dist/esm/languages/prism';

class CodeBlock extends PureComponent {
  UNSAFE_componentWillMount() {
    // 注册要高亮的语法，
    // 注意：如果不设置打包后供第三方使用是不起作用的
    SyntaxHighlighter.registerLanguage('jsx', jsx);
    SyntaxHighlighter.registerLanguage('javascript', javascript);
  }

  render() {
    // eslint-disable-next-line
    const { language, value } = this.props;
    return (
      // eslint-disable-next-line
      <figure className="highlight">
        <SyntaxHighlighter language={language} style={mtstyle}>
          {value}
        </SyntaxHighlighter>
      </figure>
    );
  }
}

export default CodeBlock;
