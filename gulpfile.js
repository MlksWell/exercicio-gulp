const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

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
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

// Tarefa padrão
gulp.task("default", gulp.parallel("sass", "scripts"));
