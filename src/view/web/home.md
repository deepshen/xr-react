### 使用方法

```jsx
import React,{useState} from 'react'
import {web} from 'lw-xr-component
const {Upload} = web
export default () => {
 const [url,setUrl] = useState('')
 const handleSuccess = res => {
    setUrl(res[0])
 }
 render(){
    return (
        < img src={url} />
        < Upload
          onSuccess={handleSuccess}
         />
    )
 }
}
```
       



### 参数API一览
|名称|作用|默认|
|:----|:-----:|-----:|
|isPrivate|上传图片到cos是私域还是公开,一般公开，私域获取图片麻烦|false|
|multiple|是否支持多选上传,默认web和h5都可用，android不可多选|false|

