let gulp = require('gulp');
let spawn = require('child_process').spawn;
let node;

gulp.task('server', () => {
  if (node) node.kill();
  node = spawn('node', ['src/index.js'], {stdio: 'inherit'})
  
  node.on('close', code => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task('default', () => {
  gulp.run('server');

  gulp.watch(['./src/**/*.js', './src/**/*.json', './public/**/*'], ['server']);
});

process.on('exit', () => {
  if (node) node.kill();
});
