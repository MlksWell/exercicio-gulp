const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");

// Compilar SASS
gulp.task("sass", function () {
return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

// Comprimir JavaScript
gulp.task("scripts", function () {
return gulp
    .src("src/js/**/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("dist/js"));
});

// ✅ COMPRIMIR IMAGENS (versão que funciona)
gulp.task("imagemin", function () {
return gulp
    .src("src/images/**/*")
    .pipe(
    imagemin([
        imagemin.mozjpeg({ quality: 80 }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo(),
    ])
    )
    .pipe(gulp.dest("dist/images"));
});

// Tarefa de observação
gulp.task("watch", function () {
gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
gulp.watch("src/images/**/*", gulp.series("imagemin"));
gulp.watch("src/js/**/*.js", gulp.series("scripts"));
});

// Tarefa padrão
gulp.task("default", gulp.parallel("sass", "imagemin", "scripts"));
