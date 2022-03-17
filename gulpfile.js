// Sass configuration
var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));

gulp.task("sass", function (cb) {
  gulp
    .src("src/js-files/marcio-scripts/*.scss")
    .pipe(sass())
    .pipe(
      gulp.dest(function (f) {
        return f.base;
      })
    );
  cb();
});

gulp.task(
  "default",
  gulp.series("sass", function (cb) {
    gulp.watch("src/js-files/marcio-scripts/*.scss", gulp.series("sass"));
    cb();
  })
);
