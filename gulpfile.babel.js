const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const watchSass = require('gulp-watch-sass');
const debug = require('gulp-debug');
const gulpif = require('gulp-if');
const sass = require('gulp-sass')(require('sass'));
const tinypng = require('gulp-tinypng-extended');

const childProcess = require('child_process');

const postcssGulpConfig = require('./gulp-postcss.config.js');
const watchFolders = require('./gulp-folders.json');

let sassOptions = watchFolders.options.sass;

/* Otimiza as imagens utilizando o TinyPNG */
const image = () => {
  return gulp
    .src(watchFolders.paths.image.src)
    .pipe(plumber())
    .pipe(tinypng(watchFolders.options.image))
    .pipe(gulp.dest(watchFolders.paths.image.dest))
    .pipe(
      debug({
        title: 'Imagem otimizada:',
      }),
    );
};
image.description = 'Otimiza as imagens utilizando o TinyPNG';
/* Otimiza as imagens utilizando o TinyPNG */

/* Compila os arquivos CSS */
const css = () => {
  return (
    gulp
      .src(watchFolders.paths.sass.src)
      // .pipe(postcss(postcssGulpConfig.plugins, postcssGulpConfig.options))
      .pipe(
        sass(sassOptions).on('error', error => {
          console.log(error.messageFormatted);
        }),
      )
      .pipe(postcss())
      .pipe(
        gulpif(
          file => file.path.indexOf('checkout6-custom') > 0,
          gulp.dest(watchFolders.paths.sass.dest.checkout),
          gulp.dest(watchFolders.paths.sass.dest.theme),
        ),
      )
      .pipe(
        debug({
          title: 'CSS Compilado:',
        }),
      )
  );
};
css.description = 'Compila os arquivos CSS';
/* Compila os arquivos CSS */

/* SASS Watch */
const sasswatch = () => {
  watchSass([watchFolders.paths.sass.src], watchFolders.options.sass)
    .pipe(plumber())
    .pipe(postcss(postcssGulpConfig.plugins, postcssGulpConfig.options))
    .pipe(
      sass(sassOptions).on('error', error => {
        console.log(error.messageFormatted);
      }),
    )
    .pipe(postcss())
    .pipe(
      gulpif(
        file => file.path.indexOf('checkout6-custom') > 0,
        gulp.dest(watchFolders.paths.sass.dest.checkout),
        gulp.dest(watchFolders.paths.sass.dest.theme),
      ),
    )
    .pipe(
      debug({
        title: 'CSS Compilado:',
      }),
    );
};
sasswatch.description = 'SASS Watch';
/* SASS Watch */

/* CSS Watch */
const csswatch = sasswatch;
csswatch.description = 'CSS Watch';
/* CSS Watch */

/* Watch */
const watch = sasswatch;
watch.description = 'Watch';
/* Watch */

/* Mostra todas as funções disponíveis */
const help = () => {
  return childProcess.exec('gulp -T', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout);
  });
};
help.description = 'Mostra todas as funções disponíveis';
/* // Mostra todas as funções disponíveis */

export { csswatch, sasswatch, watch, css, image };

export default help;
