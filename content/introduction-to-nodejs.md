+++
title = "Introduction to Node.js"
date = 2025-08-29T20:01:30.880+01:00
draft = false
description = "Discover the basics of Node.js for server-side JavaScript programming, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to Node.js

last modified last modified October 18, 2023

 

Node.js tutorial is an introductory tutorial to Node.js. We describe Node.js and
provide some Node.js code examples.

## Nojde.js

Node.js is an open-source, cross-platform JavaScript run-time
environment. It was built on Chrome's V8 JavaScript engine. Node.js uses an
event-driven, non-blocking I/O model that makes it lightweight and efficient.
Node.js was originally written by Ryan Dahl in 2009.

Node.js provides a rich library of various JavaScript modules, such as
fs for working with filesystem or http for working
with HTTP requests and responses.

Node.js applications are written in JavaScript, and can be run within the
Node.js runtime on OS X, Microsoft Windows, and Linux.

Node.js has a package manager called npm, which is a huge ecosystem
of open source JavaScript libraries.

## Node.js installation

We install the newest version of Node.js. Follow the installation instructions
available on the Node.js website for your platform.

## Node.js first example

We create a simple console application.

first.js
  

console.log("This is our first application");

The program prints a message to the console.

$ node first.js
This is our first application

## Node.js read contents of file

Node.js contains the fs module to work with files.

words.txt
  

blue
book
pen
dog
computer
screen

We have a text file.

Most functions in Node.js are asynchronous. The are non-blocking; i.e. they do
not block the execution of the script.

read_file.js
  

const fs = require('fs')

fs.readFile('words.txt', 'utf-8', (err, data) =&gt; {
    if (err) throw err;
    console.log(data);
});

console.log("Script continues...")

The example reads the contents of the words.txt file.

const fs = require('fs');

We load the fs module.

fs.readFile('words.txt', 'utf-8', (err, data) =&gt; {

The readFile asynchronously reads the entire contents of a file. We
specify the encoding in the second parameter of the method.

$ node read_file.js
Script continues
blue
book
pen
dog
computer
screen

The 'Script continues' is shown before the contents of the file.

## Node.js read directory synchronously

Now we are going to read the contents of a directory.

readdir_syn.js
  

const fs = require('fs');

readDirContentSync('.');

console.log("Ready.");

function readDirContentSync(mydir) {

    const filenames = fs.readdirSync(mydir);

    for (var i = 0; i &lt; filenames.length; i++) {
        console.log(filenames[i]);
    }
}

The code example reads the contents of a directory synchronously.

const filenames = fs.readdirSync(mydir);

We read the directory synchronously with readdirSync.

for (var i = 0; i &lt; filenames.length; i++) {
    console.log(filenames[i]);
}

We loop through the array of file names and print them to the console.

$ node readdir_syn.js
builtins.js
first.js
links
read_file.js
readdir_asyn.js
readdir_syn.js
server.js
todo
words.txt
Ready.

With a synchronous function call, the 'Ready.' message is shown after the
function finishes its execution.

## Node.js read directory asynchronously

In the next example, we read a directory asynchronously.

readdir_async.js
  

var fs = require('fs');

fs.readdir(".", (err, filenames) =&gt; {

    for (var i = 0; i &lt; filenames.length; i++) {
        console.log(filenames[i]);
    }

    console.log("Ready.");
});

The readdir reads the contents of the current working directory
asynchronously. It fills an array with the names of the files in the directory
excluding '.' and '..'.

## Node.js reading web page

In the following example we read a web page using a built-in http
module.

read_webpage.js
  

const http = require('http');

const request = http.request({ hostname: 'webcode.me' }, (res) =&gt; {

    res.setEncoding('utf8');
    res.on('data', (chunk) =&gt; {

        console.log(chunk);
    });
});

request.end();

request.on('error', (err) =&gt; {

    console.log("Error occured\n");
    console.error(err);
});

In the example, we use the http module to create a request to a
small web page. The returned HTML page is printed to the console.

$ node read_webpage.js
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is a beautiful day. We go swimming and fishing.
    &lt;/p&gt;

    &lt;p&gt;
         Hello there. How are you?
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

We have received this small HTML page.

## Node.js install module with npm

Additional modules can be installed with npm, the Node Package
Manager. Now we are going to install a new module called
builtin-modules. With this module we are going to list all
available Node.js built-in modules.

$ mkdir builtmodtest
$ cd builtmodtest/
$ npm init

We create a new project directory. With npm init command we create
a package.json file. It contains project-related metadata such as
application name, author, or dependencies.

$ cat package.json
{
    "name": "builtmodtest",
    "version": "1.0.0",
    "description": "Testing builtin modules",
    "main": "main.js",
    "scripts": {
        "start": "node main.js"
    },
    "author": "Jan Bodnar",
    "license": "ISC"
}

This is the initial package.json file. We have chosen
main.js to be the main file.

$ npm install builtin-modules
$ tree -L 1
.
├── main.js
├── node_modules
├── package.json
└── package-lock.json

With the npm install builtin-modules we install the
builtin-modules module locally. A new node_modules
directory is created where the modules and their dependencies are stored. A
package-lock.json file was created automatically by npm. It is used
to ensure consistent install of dependencies for teammates, deployments, and
continuous integrations. This file must be committed to source repositories.

$ cat package.json
{
  "name": "builtmodtest",
  "version": "1.0.0",
  "description": "Testing builtin modules",
  "main": "main.js",
  "scripts": {
    "start": "node main.js"
  },
  "author": "Jan Bodnar",
  "license": "ISC",
  "dependencies": {
    "builtin-modules": "^2.0.0"
  }
}

The builtin-modules is also written to the package.json
file.

main.js
  

const builtmods = require('builtin-modules');

console.log(builtmods);

This is the main.js file. It prints all the built-in modules
to the console.

$ npm start

&gt; builtmod@1.0.0 start /home/janbodnar/prog/nodejs/builtmod
&gt; node main.js

[ 'assert',
  'async_hooks',
  'buffer',
  'child_process',
  'cluster',
  'config',
  'console',
  'constants',
...
]

## Node.js server

We create a simple server with Node.js http module.

server.js
  

const http = require('http');

const server = http.createServer((req, res) =&gt; {

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello there\n");
});

server.listen(8000);

console.log("Server running at http://127.0.0.1:8000/");

The server sends a simple text message to the client.

const http = require('http');

We load the http module to create an http server.

const server = http.createServer((req, res) =&gt; {

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello there\n");
});

A server is created. It sends a text message to the client.

server.listen(8000);

The server listens on port 8000 on localhost.

$ node server.js &amp;
$ curl localhost:8000
Hello there

We run the server and create a request with curl.

## Source

[Node.js documentation](https://nodejs.org/docs/latest/api/)

In this article we have introduced Node.js. We have created some
code examples with Node.js.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)