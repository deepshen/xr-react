### 参数一览API
#### Filter
| 属性名称        | 作用           | 类型  | 默认| 
| ------------- |:-------------:| :-----:| -----:|
| value         | 默认取值和回显   |  object | {} |
| filters       | 具体需要筛选的data |  array,\[ {} ],具体子项见下表filters  | [] |
| onSearch | 搜索按钮点击回调     |    function   |  ()=>{} |
| onChange | filters子项改变change回调 | function(res,name,val){}, <br /> res返回改变后当前value的值，name当前改变的key,val当前变化的结果值  | () => {} |


#### filters
|属性名称|作用|类型| 是否必填|
|----|:------:|:----:|---:|
|name|属性key值|string| 是 |
|type|用什么组件来现实,可选择input,select,render; <br /> 其中render表示自己渲染rectNode进去|string| 是|
|options|select子集option,\[{label:'',value:''}] <br /> label为显示名称，value为选中取值|array|否|
|render|当type='render'时,用render函数组件生成reactNode,()=>{return 'hello world'}|function|否|
|其他参数|具体参考antd组件相关属性添加进去默认传递|''|''|
