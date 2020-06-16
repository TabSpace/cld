const $gulp = require('gulp')

require('./task/upload')

// =================
// common tasks
// =================

$gulp.task('default', $gulp.series(
  'upload-dist'
))
