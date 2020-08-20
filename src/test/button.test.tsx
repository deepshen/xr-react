import React from 'react'
import {Upload} from '../components/index'
import * as renderer from 'react-test-renderer'


describe('upload compoennt',() => {
  it('正确渲染upload', () => {
    const json = renderer.create(<Upload />).toJSON();
    expect(json).toMatchSnapshot()
  })
})
