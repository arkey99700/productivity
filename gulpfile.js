const projectFolder = "dist",
  sourceFolder = "src";

let paths = {
    build: {
      html: projectFolder + "/",
      css: projectFolder + "/css/",
      js: projectFolder + "/js/",
      img: projectFolder + "/img/",
    },
    src: {
      html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
      css: sourceFolder + "/scss/style.scss",
      js: sourceFolder + "/js/main.js",
      img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    watch: {
      html: sourceFolder + "/**/*.html",
      css: sourceFolder + "/scss/**/*.scss",
      js: sourceFolder + "/js/**/*.js",
      img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + projectFolder + "/",
  },
  { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  del = require("del"),
  autoPrefixer = require("gulp-autoprefixer"),
  groupMedia = require("gulp-group-css-media-queries"),
  cleanCss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  scss = require("gulp-sass")(require("sass")),
  uglify = require("gulp-uglify-es").default;

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + projectFolder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(paths.src.html)
    .pipe(dest(paths.build.html))
    .pipe(browsersync.stream());
}

function js() {
  return src(paths.src.js)
    .pipe(dest(paths.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(paths.build.js))
    .pipe(browsersync.stream());
}

function img() {
  return src(paths.src.img)
    .pipe(dest(paths.build.img))
    .pipe(browsersync.stream());
}

function css() {
  return src(paths.src.css)
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(groupMedia())
    .pipe(autoPrefixer("last 5 versions"))
    .pipe(dest(paths.build.css))
    .pipe(cleanCss())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(paths.build.css))
    .pipe(browsersync.stream());
}

function watchFiles(params) {
  gulp.watch([paths.watch.html], html);
  gulp.watch([paths.watch.css], css);
  gulp.watch([paths.watch.img], img);
}

function clean(params) {
  return del(paths.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, img, html));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.img = img;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
