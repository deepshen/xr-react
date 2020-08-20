```jsx
import React, {useState} from 'react'
import {web} from 'lw-xr-component
const {Filter} = web
  export default () => {
    const [value,setValue] = useState({})
    const filers = [
       {
         type: 'input',
         name: 'name',
         placeholder: '名字'
       },
       {
         type: 'select',
         name: 'age',
         options:[
           {
             value: '1',
             label :'ceshi'
           }
         ],
         placeholder: '年龄'
       },
       {
         type: 'render',
         name: 'ceshi',
         render: () => {
           return < Input placeholder='ceshi' />
         }
       }
    const handleSearch = () => {
        alert(JSON.stringfy(value))
    }   
    const handleChange = (res) => {
        setValue(res)
    }
    return (
       < Filter
           value={value}
           filters={filters}
           onSearch={handleSearch}
           onChange={handleChange}
        />
    )
}
```
