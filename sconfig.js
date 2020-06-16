const $path = require('path')

const config = {}

config.root = $path.resolve(__dirname)
config.src = 'src'
config.dist = 'dist'
config.ignore = 'ignore'

// cos 配置文件路径
// 文件下载地址: https://ria-1256085844.file.myqcloud.com/cld/index.html
config.cosJson = '../tab-private/ria-1256085844.json'
// cdn 域名
config.cdnBase = 'ria-1256085844.file.myqcloud.com'
config.uploadUrl = 'cld'
// 前端部署路径，用于打包代码时变更静态文件部署位置
config.cdnRoot = `//${config.cdnBase}/${config.uploadUrl}`

module.exports = config
