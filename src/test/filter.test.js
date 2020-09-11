import React, {useEffect} from 'react'
import {shallow, mount} from 'enzyme'
import {Filters} from '../components'
import {Col,Input} from 'antd'


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

beforeEach(()=>{
  jest.clearAllMocks()
})
describe('测试filter组件',()=>{

  it('没有参数',()=>{
    const wrapper = shallow(<Filters />)
    expect(wrapper.find(Col).length).toBe(1)
  })

  it('有参数',()=>{
    const onChange = jest.fn(props => props)
    const onSearch = jest.fn()
    const value = {
      name: 'lw'
    }
    const initDiv = <input id='init' />
    const filters = [
      {
        type: 'input',
        name: 'name',
      },
      {
        type: 'select',
        name: 'age',
        options:[{value:'18',label:'18'}]
      },
      {
        type: "date",
        name: 'time',
      },
      {
        type: 'rdate',
        name: 'time1'
      },
      {
        type: 'render',
        name: 'init',
        render: () => initDiv
      },
      {
        type: 'render',
        name: 'abc',
        render: () => 'hello'
      },
      {
        type: 'other',
        name: 'other'
      }
    ]
    const wrapper = mount((
      <Filters
        filters={filters}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
      />
      )
    )
    expect(wrapper.find(Col).length).toBe(8)
    expect(wrapper.find(Input).length).toBe(1)
    expect(wrapper.find('.ant-input').at(0).prop('value')).toEqual('lw')
    expect(wrapper.find('#init').length).toBe(1)

    // 测试修改input
    wrapper.find('.ant-input').at(0).simulate('focus')
    wrapper.find('.ant-input').at(0).simulate('change',{target:{value:'13',nodeName:'INPUT'}},'name')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toEqual({name:'13'})
    expect(onChange.mock.calls[0][1]).toBe('name')
    expect(onChange.mock.calls[0][2]).toBe('13')


    // 测试重制按钮
    wrapper.find('button').at(0).simulate('click')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange.mock.calls[1][0]).toEqual({})


    // 测试init组件onchange
    wrapper.find('#init').simulate('focus')
    wrapper.find('#init').simulate('change',{target:{value:'123',nodeName: 'INPUT'}},'init')
    expect(onChange).toHaveBeenCalledTimes(3)

    // 测试search
    wrapper.find('button').at(1).simulate('click')
    expect(onSearch).toHaveBeenCalled()

  })
})

