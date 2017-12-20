'use strict';

const gulp = require(`gulp`);

const fs = require('fs');
const dir = ['./sass','./js','./img'];
const f = [`index.html`];
const file = require(`gulp-file`);
const server = require('gulp-server-livereload');

const sass = require(`gulp-sass`);  

const htmlmin = require('gulp-htmlmin');

const autoprefixer = require('gulp-autoprefixer');
const concatCss = require(`gulp-concat-css`);
const cleanCSS = require(`gulp-clean-css`);
const rename = require(`gulp-rename`);
 
const concatJs = require(`gulp-concat`);
const jsmin = require('gulp-jsmin');

const imgmin = require(`gulp-imagemin`);


/* Create folders and empty files for new project
*/
gulp.task('default', () => {
  dir.forEach((el) => {
    if (!fs.existsSync(el)){
      fs.mkdirSync(el);
      switch (el) {
        case `./sass`:
          gulp.src(`./sass/*.scss`)
          .pipe(file(`main.scss`, ``))
          .pipe(gulp.dest(`./sass`));
          break;
        case `./js`:
          gulp.src(`./js/*.js`)
          .pipe(file(`main.js`, `;'use strict';`))
          .pipe(gulp.dest(`./js`));
          break;
      }
      console.log(`${el} folder was created.`);
    }
    else {
      console.log(`${el} folder already exist`);
    }
  });
  f.forEach((el) => {
    if (!fs.existsSync(el)) {
      switch (el) {
        case `index.html`:
          gulp.src(`./*.html`)
          .pipe(file(`index.html`, ``))
          .pipe(gulp.dest(`./`));
          console.log(`index.html was created`);
          break;
      }
    }
  }); 
});

/* Start livereload and watchers
*/
gulp.task('live', function() {
  
  gulp.src('')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      directoryListing: false,
      open: false
    }));
  
  gulp.watch('./sass/**/*.scss', ['sass']);
  
});

/* Build project in production
*/
gulp.task(`build`, () => {

  gulp.src('./*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'));
  
  gulp.src('./css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concatCss("css/main.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename(`main.css`))
    .pipe(gulp.dest('./dist/css/'));
  
  gulp.src(`./js/*.js`)
    .pipe(concatJs(`main.js`))
    .pipe(jsmin())
    .pipe(rename({suffix: ''}))
    .pipe(gulp.dest(`./dist/js`));
  
  gulp.src(`./img/*`)
    .pipe(imgmin())
    .pipe(gulp.dest(`./dist/img/`));
});

/* Start only watchers
*/
gulp.task('w', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});





gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('prefix', () =>
    gulp.src('css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
);

gulp.task(`css`, () => {
  return gulp.src('./css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concatCss("css/style.merge.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(uncss({
            html: ['index.html']
        }))
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task(`js`, () => {
  return gulp.src(`./js/*.js`)
  .pipe(concatJs(`script.merge.js`))
  .pipe(jsmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(`./dist/js`));
});

gulp.task(`img`, () => {
  return gulp.src(`./img/*`)
    .pipe(imgmin())
    .pipe(gulp.dest(`./dist/img/`));
});

gulp.task(`merge-css`, () => {
  return gulp.src(`./css/*.css`)
    .pipe(concatCss(`style.merge.css`))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('min-css', () => {
  return gulp.src('./dist/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename(`style.min.css`))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task(`uncss`, () => {
  return gulp.src(`./dist/css/style.merge.css`)
    .pipe(uncss({html: [`index.html`]}))
    .pipe(gulp.dest(`./dist/css`));
});

gulp.task(`merge-js`, () => {
  return gulp.src(`./js/*.js`)
    .pipe(concatJs(`script.merge.js`))
    .pipe(gulp.dest(`./dist/js`));
});

gulp.task('min-js', () => {
  return gulp.src('dist/js/*.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(`./dist/js/`));
});

gulp.task('min-img', () =>
  gulp.src('img/*')
    .pipe(imgmin())
    .pipe(gulp.dest('./dist/img'))
);