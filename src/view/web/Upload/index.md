

       



### 参数API一览
|名称|作用|默认|
|:----|:-----:|-----:|
|isPrivate|上传图片到cos是私域还是公开,一般公开，私域获取图片麻烦|false|
|multiple|是否支持多选上传,默认web和h5都可用，android不可多选|false|
|authSuccess|获取临时密匙是否成功回调|function(res){}|
|authFailed|获取临时密匙错误回调|function(res){}|
|beforeUpload|图片上传前回调|function(res){}|
|uploadProgress|上传进度回调|function(res){}|
|uploadFileSuccess|上传单个文件成功回调|function(res){}|
|uploadFileFailed|上传单个文件失败回调|function(res){}|
|uploadError|上传错误回调|function(res){}|
|uploadFinish|上传结束回调 总是触发|function(res){}|
|onSuccess|上传成功回调，返回图片地址\[url]|function(res){}|

