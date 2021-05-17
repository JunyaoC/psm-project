const fs = require('fs')

module.exports = {
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    https: true,
    port: 443,
    key: fs.readFileSync('./cert/private.key'),
    cert: fs.readFileSync('./cert/public.cert')
  }
}
