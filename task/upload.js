const $path = require('path')
const $gulp = require('gulp')
const $fse = require('fs-extra')
const $chalk = require('chalk')
const $gulpConfirm = require('gulp-confirm')
const $qcloudUpload = require('gulp-qcloud-cos-upload')

const $config = require('../sconfig')

const getQcloudConf = (options) => {
  const cosFile = $path.join($config.root, $config.cosJson)
  let conf = {}
  if ($fse.existsSync(cosFile)) {
    try {
      conf = $fse.readJsonSync(cosFile)
    } catch (err) {
      conf = {}
    }
  }
  if (!conf.SecretKey) {
    throw new Error('Require SecretKey!')
  }
  conf.cdn = $config.cdnBase
  conf.prefix = $config.uploadUrl
  Object.assign(conf, options)
  return conf
}

// 在开发网执行腾讯云上传可能需要启动 proxifier：
// windows: http://km.oa.com/articles/show/340701?kmref=search&from_page=1&no=1
// macs: http://km.oa.com/articles/show/321457?kmref=search&from_page=1&no=2
$gulp.task(
  'upload-dist',
  () => $gulp.src([
    '**/*.{html,js,css,ttf,woff,svg,eot,png,jpg,jpeg,gif}'
  ], {
    cwd: $config.dist,
    base: ''
  })
    .pipe(
      $gulpConfirm({
        question: $chalk.yellow('Start upload dist ? [y/n]'),
        input: '_key:y'
      })
    )
    .pipe(
      $qcloudUpload(getQcloudConf())
    )
)
