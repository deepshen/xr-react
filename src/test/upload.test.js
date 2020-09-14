import React from 'react'
import {shallow,mount} from 'enzyme'
import {Upload} from '../components'

jest.mock('../components/utils/index',()=>({
  handleAuth: jest.fn(()=>Promise.resolve('file')),
  handleUpload:jest.fn()
}))
import {handleUpload,handleAuth} from '../components/utils/index'

jest.mock('xr-cos-web',()=>function () {
  this.on = jest.fn()
  this.getAuth = jest.fn()
})
import COS from 'xr-cos-web'

describe('初步渲染',()=>{
  it('默认样式',()=>{
    const wrapper = shallow(<Upload />)
    expect(wrapper.find('input').length).toBe(1)
  })
  it('children样式',()=>{
    const wrapper = shallow(<Upload><div id='init'>hello</div></Upload>)
    expect(wrapper.find('#init').length).toBe(1)
    expect(wrapper.find('#init').text()).toEqual('hello')
  })
})

describe('测试功能点',()=>{
  it('测试上传',()=>{
    const wrapper = mount(<Upload />)
    const file = new File(['hello'],'test.txt')
    wrapper.find('input').at(0).simulate('click')
    wrapper.find('input').at(0).simulate('change',{target:{files:[file]}})
    handleUpload()
    expect(handleUpload).toHaveBeenCalled()

  })
})
