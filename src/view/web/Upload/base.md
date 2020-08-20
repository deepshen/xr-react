```jsx
import React,{useState} from 'react'
import {web} from 'lw-xr-component;
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
