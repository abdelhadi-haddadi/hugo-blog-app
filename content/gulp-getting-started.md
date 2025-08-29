+++
title = "Gulp getting started"
date = 2025-08-29T19:57:50.686+01:00
draft = false
description = "Gulp getting started tutorial is an introduction to Gulp.js Node task runner. The tutorial covers Gulp 4."
image = ""
imageBig = ""
categories = ["gulp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Gulp getting started

last modified October 18, 2023

This article is an introductory tutorial to the Gulp tool, which is a Node.js
build tool. The tutorial covers Gulp 4.

## Gulp

Gulp is a Node task runner. It is a streaming  build system in
front-end web development. It helps automate such tasks as  copying files,
linting, unit testing, image manipulation, minifying JavaScript and CSS code,
or compiling TypeScript to JavaScript.  Gulp is platform independent. In
addition to Node.js, Gulp is used in .NET, Java, or PHP platforms.

Gulp favours code over configuration. It uses tasks to define its workflow. The
tasks are written in the gulpfile.js file. Gulp tasks use plugins,
which are small, single-purpose code units. The Gulp ecosystem includes more
than 3500 such plugins. For instance, the gulp-minify plugin
minifies JS files.

Gulp is based on Node streams. It reads data from a filesystem and passes
them through pipelines to transform them. The data goes from one plugin
to another with the use of the pipe function. One task is
performed at a time. Using plugins in the pipeline allows to perform
complex tasks. The original data may be modified, or we can create new
modified copy of the data.

The gulp.src function creates the stream of source files to perform
the pipe operations on. The gulp.dest specifies where to output the
files once the task is completed.

## Gulp CLI

Gulp consists of two parts: the Gulp library and the Gulp CLI (Command Line
Interface). The Gulp library is used in JavaScript code. The
gulp-cli is a utility program that allows us to access Gulp from
the shell. In order to work with Gulp, we need to install both packages.

## Gulp task

A Gulp task is an asynchronous JavaScript function. The function returns a
stream, promise, event  emitter, child process, or observable. Originally the
tasks were created with the gulp.task function. Gulp now favours
newer syntax based on modules, while the older syntax is still supported.

The modern syntax allows to separate the tasks into private and public. Public
tasks are exported from the gulpfile, which allows them to be run by the gulp
command. Private tasks are used only internally; we cannot run them with the
gulp command.

## Globbing

Globbing is locating files on a file system using one or more glob strings.
A glob string is a literal and/or wildcard characters, like *,
**, or !, used to match filepaths.

*.js

This glob matches all JS files.

**/*.js:

This glob string matches any file ending with .js in the root
folder and any child directories.

!main.scss:

The ! indicates that the main.scss should be excluded.

*.+(scss|sass)

This glob string matches any file that ends either in scss or
sass.

## Composing tasks

Gulp.js 4.0 introduces the series and parallel methods
to combine tasks. The series runs tasks one by one, while the
parallel runs tasks simultaneously.

gulp.series(gulp.parallel(a, b), gulp.series(c, d))

In our case, first the a and b tasks are run in parallel, then, once both are
complete, the c task is run and after it finishes, the d is run.

## Gulp default task

The default task is run when we do not provide any task name to the Gulp CLI
tool.

gulp.task('default', function() {
  ...
});

This is the older syntax to define a default task.

exports.default = function() {
  ...
}

This is the newer syntax.

## Installing Gulp

We initiate a Node.js project and install the Gulp library and the Gulp CLI.

$ nodejs -v
v12.16.1

We use Node.js version 12.16.1.

$ npm init -y
$ npm i --global gulp-cli
$ npm i gulp --save-dev

We initiate a Node project and install Gulp and Gulp CLI.

## Gulp rename files example

In the following example, we use the gulp-rename plugin
to rename our files.

ls src/
about.htm  contact.htm  index.htm

Inside the src directory, we have three HTML files. We want
to rename their extensions to .html.

$ nmp i --save-dev gulp-rename

We install the gulp-rename plugin.

gulpfile.js
  

const { src, dest } = require('gulp');
const rename = require('gulp-rename');

function renameFiles() {

    return src('src/*.htm')
        .pipe(rename({ extname: '.html' }))
        .pipe(dest('dist/'));
}

exports.rename = renameFiles;

We create the renameFiles task. It renames all .htm
files in the src directory and copies them into the output
directory.

return src('src/*.htm')
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('dist/'));

With the src function, we create a source strean from htm files
in the src directory. We use globbing to select htm files only.
The pipe function takes the data from the stream and applies the
rename function on it.
With the dest function, we specify the output stream; it is the
directory where we copy the renamed files.

$ gulp rename
[12:31:42] Using gulpfile ~/Documents/prog/js/gulp-lib/gulpfile.js
[12:31:42] Starting 'rename'...
[12:31:42] Finished 'rename' after 35 ms

With the gulp tool, we run the rename task.

$ ls dist/
about.html  contact.html  index.html

The files were renamed.

## The gulp-minify example

The gulp-minify plugin minifies JS files.

$ npm i --save-dev gulp-minify

We install the gulp-minify plugin.

src/js/main.js
  

function hello() {

    return 'Hello there!';
}

hello();

We have a simple main.js file with a function.

gulpfile.js
  

const { src, dest } = require('gulp');
const minify = require("gulp-minify");

exports.default = () =&gt; {

    return src('src/js/main.js', { allowEmpty: true })
        .pipe(minify({noSource: true}))
        .pipe(dest('dist/js'))
}

We read the JS file, pass it through the minify function
and write the result into the dist/js directory.

$ gulp
[14:01:21] Using gulpfile ~/Documents/prog/js/gulp-lib/gulpfile.js
[14:01:21] Starting 'default'...
[14:01:21] Finished 'default' after 75 ms

We run the default Gulp task.

$ cat dist/js/main-min.js
function hello(){return"Hello there!"}hello();

These are the contents of the minified main-min.js
file.

## Gulp composing tasks

In the next example, we compose tasks with series and
parallel. In this example, we need gulp-minify,
gulp-rename, gulp-clean-css, and del
plugins.

The gulp-clean-css minifies CSS. The del deletes
files and directories.

src/
├── js
│&nbsp;&nbsp; └── main.js
└── styles
    └── main.css

We have this directory structure.

src/js/main.js
  

function hello() {

    return 'Hello there!';
}

hello();

This is a simple main.js file.

src/styles/main.css
  

body {
  font-family:georgia; font-size:1em;
  line-height:1.7em;
  background: #333;
  text-align:center;
}

This is a simple main.css file.

gulpfile.js
  

const { src, dest, series, parallel } = require('gulp');
const minify = require("gulp-minify");
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const clean = () =&gt; del([ 'dist' ]);

function styles() {

    return src('src/styles/main.css', { allowEmpty: true })
        .pipe(cleanCSS())
        .pipe(rename({
          basename: 'main',
          suffix: '.min'
        }))
        .pipe(dest('dist/styles'))
}

function scripts() {

    return src('src/js/main.js', { allowEmpty: true })
        .pipe(minify({noSource: true}))
        .pipe(dest('dist/js'))
}

const build = series(clean, parallel(styles, scripts));

exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.build = build;

exports.default = build;

The gulpfile minifies CSS and JS files. It cleans the distribution
directory. The workflow is separated into several tasks.

const clean = () =&gt; del([ 'dist' ]);

The clean task removes the dist directory.

function styles() {

    return src('src/styles/main.css', { allowEmpty: true })
        .pipe(cleanCSS())
        .pipe(rename({
          basename: 'main',
          suffix: '.min'
        }))
        .pipe(dest('dist/styles'))
}

The styles task minifies the CSS file and renames it. It adds
the .min extension.

function scripts() {

    return src('src/js/main.js', { allowEmpty: true })
        .pipe(minify({noSource: true}))
        .pipe(dest('dist/js'))
}

The scripts task minifies the JS file.

const build = series(clean, parallel(styles, scripts));

We define a build task. It is a composition of
three tasks. First, the clean task is run. After
it finishes, the styles and scripts
are run in parallel.

exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.build = build;

exports.default = build;

We export five functions. The tasks can be called independently or
composed in the build taks. Also, the build
task is the default task.

$ gulp build
[15:17:01] Using gulpfile ~/Documents/prog/js/gulp-lib/gulpfile.js
[15:17:01] Starting 'build'...
[15:17:01] Starting 'clean'...
[15:17:01] Finished 'clean' after 13 ms
[15:17:01] Starting 'styles'...
[15:17:01] Starting 'scripts'...
[15:17:01] Finished 'scripts' after 53 ms
[15:17:01] Finished 'styles' after 54 ms
[15:17:01] Finished 'build' after 70 ms

We explicitly run the build task.

In this tutorial we have introduced Gulp.

You might also be interested in the following related tutorials:
[Node Sass tutorial](/javascript/nodesass/),
[Gulp minify tutorial](/gulp/minify/),
[Gulp Sass tutorial](/gulp/sass/).

List [all JavaScript tutorials](/all#js).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.