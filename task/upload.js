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
  Object.assign(conf, {
    AppId: '1256085844',
    Bucket: 'ria-1256085844',
    Region: 'ap-chengdu'
  })
  if (!conf.SecretKey) {
    throw new Error('Require SecretKey!')
  }
  conf.cdn = $config.cdnBase
  conf.prefix = $config.uploadUrl
  Object.assign(conf, options)
  return conf
}

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
      $qcloudUpload(getQcloudConf({
        overwrite: true
      }))
    )
)

$gulp.task(
  'upload-images',
  () => $gulp.src([
    '**/*.{html,js,css,ttf,woff,svg,eot,png,jpg,jpeg,gif}'
  ], {
    cwd: $path.join($config.root, 'images'),
    base: 'images'
  })
    .pipe(
      $gulpConfirm({
        question: $chalk.yellow('Start upload images ? [y/n]'),
        input: '_key:y'
      })
    )
    .pipe(
      $qcloudUpload(getQcloudConf({
        overwrite: true
      }))
    )
)
