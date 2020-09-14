import {handleUpload} from '../components/utils/index'


describe('test upload',()=>{
  it('upload',()=>{
    const isPrivate = true
    const files = 'a'
    const bucket = isPrivate?'private-10000230':'public-10000230'
    const urlDomain = isPrivate?'privimg.xingren.com':''
    const upload = {
      upload: jest.fn(() => Promise.resolve('file'))
    }
    const callback = jest.fn(res => res)
    handleUpload(upload,isPrivate,files,callback)
    expect(upload.upload).toHaveBeenCalled()
    expect(upload.upload.mock.calls[0][0]).toBe('a')
    expect(upload.upload.mock.calls[0][1]).toEqual( { bucket: 'private-10000230', urlDomain: 'privimg.xingren.com' })
  })
})
