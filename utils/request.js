const host = 'https://www.lzf-allen.top'
module.exports = {
  request(options = {}) {
    const {
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success,
      fail,
      complete
    } = options;
    return new Promise((res, rej) => {
      wx.request({
        url: host + url,
        data,
        header,
        method,
        dataType,
        responseType,
        success(r) {
          res(r);
        },
        fail(err) {
          rej(err)
        },
        complete
      })
    })
  },
  uploadFile(options = {}) {
    const {
      url,
      filepath,
      header,
      formData,
      success,
      fail,
      complete
    } = options;
    return new Promise((res, rej) => {
      wx.uploadFile({
        url: host + url, 
        filePath: filepath,
        name: 'file',
        header: header,
        formData: formData,
        success(response) {
          res(response)
        },
        fail(err) {
          rej(err)
        },
        complete
      })
    })
  }
}