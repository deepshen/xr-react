import React from 'react';
import renderer from 'react-test-renderer';
describe('Button 组件', () => {
  it('正确渲染 Button 组件', () => {
    const button = renderer.create(<button>button</button>).toJSON();
    expect(button).toMatchSnapshot();
  });
});
