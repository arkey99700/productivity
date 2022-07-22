const projectFolder = "dist",
  sourceFolder = "src";

let paths = {
    build: {
      html: projectFolder + "/",
      css: projectFolder + "/css/",
      js: projectFolder + "/js/",
      img: "/img/",
    },
    src: {
      html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
      css: sourceFolder + "/scss/style.scss",
      js: sourceFolder + "/js/main.js",
      img: "/img/**/*.{jpg,png,gif,webp}",
    },
    watch: {
      html: sourceFolder + "/**/*.html",
      css: sourceFolder + "/scss/**/*.scss",
      js: sourceFolder + "/js/**/*.js",
      img: "/img/**/*.{jpg,png,gif,webp}",
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
  scss = require("gulp-sass")(require("sass"));

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
}

function clean(params) {
  return del(paths.clean);
}

let build = gulp.series(clean, gulp.parallel(css, html));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
