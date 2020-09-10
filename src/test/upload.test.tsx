import React from 'react'
import {Upload} from '../components/index'
import {shallow,mount} from 'enzyme'
import renderer from 'react-test-renderer'

const setup = () => {
  const fn = () => {
    console.log('123')
  }
  const props = {
    isPrivate: false,
    multiple: false,
    authSuccess: fn,
    authFailed: fn,
    beforeUpload: fn,
    uploadProgress: fn,
    uploadFileSuccess: fn,
    uploadFileFailed: fn,
    uploadError: fn,
    uploadFinish: fn,
    onSuccess: fn,
    onChange: fn,
    children: <div id='demo'>hello world</div>
  }
  const sUpload = shallow(<Upload {...props} />)
  const mUpload = mount(<Upload {...props} />)
  return {
    props,
    sUpload,
    mUpload
  }
}

describe('upload component',() => {
  const {sUpload,mUpload,props} = setup()
  it('正确渲染upload', () => {
    expect(sUpload.find('input').length).toBe(1)
    expect(mUpload.find('input').length).toBe(1)
  })
  it('input click',()=>{
    mUpload.find('input').simulate('change')
    expect(props.onChange).toBeCalled()
  })
  it('snapshot',()=>{
    const tree = renderer.create(<Upload {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
