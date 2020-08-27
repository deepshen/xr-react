## 说明
---
本项目基于react语法，ui库基于antd，上传图片基于xr-cos-web内部库。所以依赖了第三方库
我们只静态打包自己二次封装的内容 antd和xr-cos-web作为依赖，业务方自己下载。 

[ant官网地址](https://ant.design/index-cn)   
[xr-cos-web内部库](https://gitlab.aihaisi.com/teams/frontend/web-utils/-/tree/master/xr-cos-web)

## 使用说明
---
```jsx
yarn add lw-xr-react -D

// 常规
import {Filters} from 'lw-xr-react'
import 'lw-xr-react/lib/lib/filters/style/index.css'

// 用babel-plugin-import
yarn add babel-plugin-import -D

// 在babel中
plugins:[
  ['import',{
      libraryName: 'lw-xr-react',
      libraryDirectory: 'esm/lib',
      style: 'css'
    },'lw-xr-react']
]
```
