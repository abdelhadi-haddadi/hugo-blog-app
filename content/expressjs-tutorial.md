+++
title = "Express.js tutorial"
date = 2025-08-29T20:01:16.783+01:00
draft = false
description = "Express.js tutorial shows how to create simple web applications in JavaScript using Express framework. Express.js is a free and open-source web application framework for Node.js."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Express.js tutorial

last modified last modified October 18, 2023

 

In this article we show how to create simple web applications in JavaScript
using Express framework.

## Express.js

*Express.js* is a free and open-source web application framework for
Node.js. Express is a minimal and flexible web application framework that
provides a robust set of features for web and mobile applications.

It is a fast, unopinionated, and minimalist web framework.

**Note: ** The term unopiniated means that Express maintainers
do not show developers what is the optimal way of building web applications.

## Express.js installation

We install the Express framework. Later, we install additional packages
including Lodash, sqlite3, and Axios.

$ node -v
v18.2.0

We use Node version 18.2.0.

$ npm init -y
$ npm i express

We use the npm tool to install Express.

## URL

A Uniform Resource Locator (URL), is a reference to a web resource that
specifies its location on a computer network and a mechanism for retrieving
it. A web resource is any data that can be obtained via web, such as HTML
documents, PDF files, PNG images, JSON data, or plain text.

A generic URL has the following form:

scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]

The parts between the []  brackets are optional.

## Express.js routes

A route associates an HTTP verb (such as GET, POST, PUT, DELETE) and
a URL path to a handler function. To create routes, we use functions of the
Express application object.

app.get('/', (req, res) =&gt; {

});

Here we map the / path sent in a GET request to the handler
function. The function receives request and response objects as parameters.

To group routes and separate them in modules, we can use the Router
middleware.

## Express.js middleware

Express middleware is a the core of the framework. It sits in the middle of the
request-response cycle. Middleware is a series of functions that are called
between the request object and the response object in a pipeline. Express is a
minimal framework. Most of the functionality is available as middleware
functions.

Middleware functions are used to implement functionalities such as
authentication, CSRF protection, logging, or cookie processing. They are not
used to implement the business  logic of the application.

The use function mounts the specified middleware function or
functions at the specified path.

## Express.js GET request example

The get function routes an HTTP GET request to the
specified path with the specified callback function.

main.js
  

const express = require('express');

const app = express();

app.get('/', (req, res) =&gt; res.send('Hello there!'));

app.listen(3000, () =&gt; console.log('Application started on port 3000'));

The application processes a GET request and sends a short message to the client.

const express = require('express');

We include the express package.

const app = express();

The Express application is created.

app.get('/', (req, res) =&gt; res.send('Hello there!'));

With the get function, we map the / path
to the anonymous function, which sends a string back to the client.

app.listen(3000, () =&gt; console.log('Application started on port 3000'));

When started, the application listens on port 3000.

$ node main.js
Application started on port 3000

We start the application on localhost.

$ curl localhost:3000
Hello there!

We create a request with the curl command.

## Express.js HTTP headers

The request object also includes the request headers sent  from the client.
Request headers are HTTP headers that contain more information  about the
resource to be fetched, and about the client requesting the resource.

main.js
  

const express = require('express');

const app = express();

app.get('/', (req, res) =&gt; {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send(`The request IP is: ${req.ip}`);
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
});

The example outputs the IP address of the client that generated
the request.

$ curl localhost:3000
The request IP is: ::1

This is a sample output; the ::1  is the loopback address in IPv6.

## Express.js query parameters

Query string is a part of the URL which is used to add some criteria to the
request for the resource. It is often a sequence of key/value pairs. It follows
the path and starts with the ? character.

main.js
  

const express = require('express');

const app = express();

app.get('/greet', (req, res) =&gt; {

    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    let name = req.query.name;
    let msg = `Hello ${name}`;
    res.send(msg);
});

app.listen(3000, () =&gt; console.log('Application started on port 3000'));

The application creates and sends a message to the client. It uses
the value from the name query parameter.

app.get('/greet', (req, res) =&gt; {

We route the HTTP GET request to the specified path with the specified callback
function. The callback function receives two parameters: request object and
response object. The request object represents the HTTP request and has
properties for the request query string, parameters, body, and HTTP headers.

res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

We set the response content type and character set. Our output will be plain
text. The default content type is text/html.

let name = req.query.name;

We get the query parameter from the request query property. It is an object
containing a property for each query string parameter in the route.

let msg = `Hello ${name}`;

A message is built.

res.send(msg);

The message is sent to the client.

$ curl -i localhost:3000/greet?name=Lucia
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 11
ETag: W/"b-QOTbNGLVpb1ETGDcTt/rfpJV0wI"
Date: Tue, 21 Apr 2020 06:58:12 GMT
Connection: keep-alive

We create a GET request to the application using the curl
command line tool. With the -i option, we also include the response
header.

## Express.js path parameters

Values can be send to the web application via query parameters or path
parameters. The path parameter is specified after a colon /:param.

The req.params property is an object containing properties mapped
to the named route parameters.

main.js
  

const express = require('express');

const app = express();

app.get('/show/:name/:age/', (req, res) =&gt; {

    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    let name = req.params.name;
    let age = req.params.age;
    let msg = `${name} is ${age} years old`;

    res.send(msg);
});

app.listen(3000, () =&gt; console.log('Application started on port 3000'));

The application returns a message to the user, containing the two path parameters
sent.

app.get('/show/:name/:age/', (req, res) =&gt; {

The path parameters are defined in the route path; the names of the parameters
follow the colon character.

let name = req.params.name;
let age = req.params.age;

We retrieve the path parameters from the req.params object.

$ curl localhost:3000/show/Robert/24/
Robert is 24 years old

## Express.js path pattern matching

It is possible to use regular expressions on the request paths. This way we can
restrict the values passed with the request path.

main.js
  

const express = require('express');

const app = express();

app.get('/city/:id([0-9]{1,5})', (req, res) =&gt; {

    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send(`id: ${req.params.id}`);
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
});

In the example, we restrict the Id value to be an integer, having between
1 and 5 digits.

$ curl localhost:3000/city/12345
id: 12345

This is the output for Id 12345.

## Express JSON

JSON is a lightweight data-interchange format. It is easy for humans to read and
machines to parse and generate. Web applications often consume and produce JSON
data.

The res.json function sends a JSON response. The parameter can be
any JSON type, including object, array, string, Boolean, number, or null.

$ npm i lodash

We install the Lodash library.

main.js
  

const express = require('express');
const _ = require('lodash');

const app = express();

app.get('/movies', (req, res) =&gt; {

    res.set({ 'Content-Type': 'application/json; charset=utf-8' });

    let movies = { 1: 'Toy story', 2: 'The Raid', 3: 'Hero',
                4: 'Ip Man', 5: 'Kung Fu Panda' };

    let movie = _.sample(movies);

    res.json({movie});
});

app.listen(3000, () =&gt; console.log('Application started on port 3000'));

The example picks random movie from the movies object. The
movie is returned in JSON format.

res.set({ 'Content-Type': 'application/json; charset=utf-8' });

We set the content type for JSON data.

let movies = { 1: 'Toy story', 2: 'The Raid', 3: 'Hero',
            4: 'Ip Man', 5: 'Kung Fu Panda' };

We have a couple of movies in the JS object.

let movie = _.sample(movies);

With the Lodash _sample method, we pick a random movie.

res.json({movie});

The picked movie is sent to the client in JSON format.

$ curl localhost:3000/movies
{"movie":"Toy story"}
$ curl localhost:3000/movies
{"movie":"Kung Fu Panda"}$
$ curl localhost:3000/movies
{"movie":"Kung Fu Panda"}

## Express bodyparser

The body-parser is a Node request body parsing middleware.
It parses incoming request bodies in a middleware before our handlers. The
data is available under the req.body property.

**Note: ** In older Express versions, the body parser package
had to be separately installed. Since Express 4.16, the body parser is
included in Express.

For this example, we need to install the Axios package.

$ npm i axios

Axios is a promise based HTTP client for the browser and Node.js

main.js
  

const express = require("express");

const app = express();
app.use(express.json());

app.post('/info', (req, res) =&gt; {

    console.log(req.body);

    res.json(req.body);
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
});

In the example, we parse JSON bodies.

app.use(express.json());

Here we apply the body parser middleware for parsing JSON data in
the request body.

res.json(req.body);

We return the parsed data back to the client in JSON format.

post-request.js
  

const axios = require('axios');

async function makePostRequest() {

    params = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'gardener'
      }

    let res = await axios.post('http://localhost:3000/info/', params);

    console.log(`Status code: ${res.status}`);
    console.log(`Status text: ${res.statusText}`);
    console.log(`Request method: ${res.request.method}`);
    console.log(`Path: ${res.request.path}`);

    console.log(res.data);
}

makePostRequest();

With the Axios library, we make a POST request to the Express application.

$ node post-request.js
Status code: 200
Status text: OK
Request method: POST
Path: /info/
{ first_name: 'John', last_name: 'Doe', email: 'gardener' }

## Express post form

The HTTP POST method sends data to the server. It is often used when uploading a
file or when submitting a completed web form. The data sent from the form is
stored in the body of the request.

**Note: ** For state changing operations, we need to
implement the CSRF protection.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Form&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;form action="message" method="post"&gt;

        &lt;div&gt;
            &lt;label&gt;Name:&lt;/label&gt;
            &lt;input type="text" name="name"&gt;
        &lt;/div&gt;

        &lt;div&gt;
            &lt;label&gt;Message&lt;/label&gt;
            &lt;input type="text" name="message"&gt;
        &lt;/div&gt;

        &lt;button type="submit"&gt;Send&lt;/button&gt;

    &lt;/form&gt;

&lt;/body&gt;
&lt;/html&gt;

We have a form with two input fields: name and message.

main.js
  

const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =&gt; {

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/message', (req, res) =&gt; {

    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    let name = req.body.name;
    let message = req.body.message;
    let output = `${name} says: ${message}`;

    res.send(output);
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
})

We have two routes in the application. The / path brings
the form to the user. The function simply sends the static HTML file
containing the form. The /message path processes the form
and builds a message from the posted data.

app.use(express.urlencoded({ extended: true }));

We apply the urlencoded middleware for processing of the form.
The middleware parses incoming requests with urlencoded payloads.
The application/x-www-form-urlencoded content type is the default.
(The extended option chooses a specific library for parsing the data.)

let name = req.body.name;
let message = req.body.message;
let output = `${name} says: ${message}`;

We get the two parameters from the body of the request and
build an output.

res.send(output);

The output is sent to the client.

## Express send file

The sendFile function transfers the file at the given path.
The image is displayed in the browser. The download function
transfers the image; the image is offered as an attachment by browsers.

main.js
  

const express = require('express');
const path = require('path');

const app = express();

app.get('/file', (req, res) =&gt; {

    res.set({ 'Content-Type': 'image/jpeg' });

    let file = path.join(__dirname, 'img/book.jpg');

    // res.sendFile(file);
    res.download(file, 'book-image.jpg');
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
})

The example sends an image to the client. Note that since
the browsers are doing caching, we might no see a difference between
the two methods. In such a case, we can open a private window.

res.set({ 'Content-Type': 'image/jpeg' });

We set the appropriate content type.

let file = path.join(__dirname, 'img/book.jpg');

We specify the path to the image.

## Express static files

Static files are files that do not change. They include CSS files, JavaScript
files and images; also HTML files which do not contain template directives.

To work with static files, we use the builtin static middleware.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        This is home page
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the home page. It is an example of a static HTML file.

main.js
  

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) =&gt; {

    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
});

The example displays a simple static HTML file for the home page.

app.use(express.static('public'));

We use the static middleware; the static files are stored in the
public directory.

app.get('/', (req, res) =&gt; {

    res.sendFile(path.join(__dirname, 'public/index.html'));
});

The sendFile function transfers the file at the given
path.

## Express favicon

A favicon, also known as a website icon, is a small icon, associated with
a particular website or web page. To display a favicon in an Express
application, we can use the express-favicon middleware.

$ npm i express-favicon

We install the package.

$ ls public/images/
favicon.ico

We have the favicon in the public/images
directory.

main.js
  

const express = require('express');
const path = require('path');
const favicon = require('express-favicon');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.get('/', (req, res) =&gt; {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send('Home page');
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
});

The example displays a favicon.

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

We apply the middleware function with the use function. The icon
is located in the public/images directory.

## Express custom 404 error message

The HTTP 404, 404 Not Found, 404, Page Not Found error message is a Hypertext
Transfer Protocol (HTTP) standard response code used in web communication. It
indicates that the browser was able to communicate with a given server, but the
server could not find requested resource.

Express provides a rudimentary 404 message. In the following example, we create
our custom one.

main.js
  

const express = require('express');

const app = express();

app.get('/', (req, res) =&gt; {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send('Home page');
});

app.get('/about', (req, res) =&gt; {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send('About page');
});

app.get('/contact', (req, res) =&gt; {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send('Contact page');
});

app.use((req, res) =&gt; {

    res.statusCode = 404;
    res.end("404 - page not found");
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
});

In the example, we register an error handler function for the 404 not found error.
It shows the 404.html file.

app.use((req, res) =&gt; {

    res.statusCode = 404;
    res.end("404 - page not found");
});

We set the status code and finish the response process. The mapping of the
error handling  comes after all other mappings.

## Express Router middleware

Basic routing is performed with the routing methods of the application
object, such as get, post, put,
head, or delete.

Routes can be grouped and separated into modules with the Router
middleware.

routes.js
  

const express = require('express');
const router = express.Router();

router.get('/', (req, res) =&gt; {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send('Home page');
});

router.get('/about', (req, res) =&gt; {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send('About page');
});

router.get('/contact', (req, res) =&gt; {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send('Contact page');
});

module.exports = router;

There are three routes in the routes.js module.
The routes are bound to the Router middleware, which is exposed
for inclusion.

main.js
  

const express = require('express');
const routes = require('./routes');

const app = express();

app.use(routes);

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
});

We include the routes and apply them to the application with
use.

## Express - using template engine

A template engine or template processor is a library designed to combine
templates with a data model to produce documents. Template engines are
used to generate large amounts of emails, in source code preprocessing, or
producing dynamic HTML pages.

It is possible to use many template engines with Express; for instance
Liquid, Nunjucks, Pug, or EJS.

Liquid is a JavaScript template engine, created by Shopify. Liquid
files have the extension of .liquid; they are a mix of static
data such as HTML and Liquid constructs. Learn more about Liquid in
the [Liquid.js tutorial](/javascript/liquidjs/).

$ npm i liquidjs

We install the Liquid template engine.

In Liquid, we use the double curly brace delimiters {{ }} for
output and the curly brace percentage delimiters {% %} for logic.

{% if user != null %}
  Hello {{ user.name }}
{% endif %}

This code is a sample Liquid syntax.

main.js
  

const express = require('express');
const path = require('path');
const { Liquid } = require('liquidjs');

const app = express();
const engine = new Liquid();

app.engine('liquid', engine.express());
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'liquid');

app.get('/today', (req, res) =&gt; {

    let today = new Date();
    res.render('show_date', {now: today});
});

app.use((req, res) =&gt; {

    res.statusCode = 404;
    res.end("404 - page not found");
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
});

In the example, we read a value from a path parameter and send it to the
show_date.liquid template file to be processed.

app.engine('liquid', engine.express());
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'liquid');

We set up the Liquid template engine. The template files are located
in the views directory.

res.render('show_date', {now: today});

The render function renders a view and sends the rendered HTML
string to the client. The first parameter is the view name (without extension);
the second parameter is the locals object, whose properties define
local variables for the view.

views/show_date.liquid
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Show date&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is {{ now }}
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the show_date.liquid template file. The template consists
of static data and dynamic data.

&lt;p&gt;
    Today is {{ now }}
&lt;/p&gt;

With the {{}} syntax, we output the value of the now
variable, which was passed to the template.

$ curl localhost:3000/today
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Show date&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is Tue Jun 28 2022 11:15:15 GMT+0200 (Central European Summer Time)
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

## Express SQLite example

In the following example, we send data from an SQLite database.
SQLite is an file-based relational database engine.

$ npm install sqlite3

We use sqlite3 package.

app-sqlite.js
data
  cities.sql
  test.db

This is the project structure.

data/cities.sql
  

BEGIN TRANSACTION;
DROP TABLE IF EXISTS cities;

CREATE TABLE cities(id INTEGER PRIMARY KEY, name TEXT, population INTEGER);
INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);
COMMIT;

We use this data.

$ cd data
$ sqlite3 test.db
SQLite version 3.37.2 2022-01-06 13:25:41
Enter ".help" for usage hints.
sqlite&gt; .read cities.sql
sqlite&gt; select * from cities;
1|Bratislava|432000
2|Budapest|1759000
3|Prague|1280000
4|Warsaw|1748000
5|Los Angeles|3971000
6|New York|8550000
7|Edinburgh|464000
8|Berlin|3671000

We load the data into the test.db database.

main.js
  

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('data/test.db');

app.get('/', (req, res) =&gt; {
    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    res.send('Home page');
});

app.get('/cities', (req, res) =&gt; {

    const sql = 'select * from cities';
    const params = [];

    db.all(sql, params, (err, rows) =&gt; {

        if (err) {

          res.status(400).json({'error': err.message});
          return;
        }

        if (!rows) {

          res.status(204).json({'error': 'No cities found'});
          return;
        }

        res.json({
            'message':'success',
            'data':rows
        });
    });
});

app.get('/city/:id', (req, res) =&gt; {

    const sql = 'select * from cities where id = ?';
    const params = [req.params.id];

    db.get(sql, params, (err, row) =&gt; {

        if (err) {

          res.status(400).json({'error':err.message});
          return;
        }

        if (!row) {

          res.status(204).json({'error': 'City not found'});
          return;
        }

        res.json({
            'message':'success',
            'data':row
        });
    });
});

const server = app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
});

process.on('SIGINT', () =&gt; {

    db.close((err) =&gt; {

        console.log('Application terminating');

        if (err) {
            console.error(err.message);
        }
          console.log('Closing the database connection.');
        });

    server.close();
});

There are three routes in the application. One is for the home page, another for
all cities, and third is for a specific city. The cities are returned in JSON
format.

const sqlite3 = require('sqlite3').verbose();

We include the sqlite3 package. The verbose function
produces debugging information.

const db = new sqlite3.Database('data/test.db');

We connect to the database file.

app.get('/cities', (req, res) =&gt; {

    const sql = 'select * from cities';
    const params = [];
...

For the /cities route, we fetch all rows from the database and
send them as JSON data to the client. There are no parameters passed to
the SQL statement.

db.all(sql, params, (err, rows) =&gt; {

The all function runs the SQL query with the specified parameters
and calls the callback with all result rows afterwards.

if (err) {

  res.status(400).json({'error': err.message});
  return;
}

If there is an error, we send the 400 status code and return.

if (!rows) {

  res.status(204).json({'error': 'No cities found'});
  return;
}

If there is no data found, we send the 204 No content status code.

res.json({
    'message':'success',
    'data':rows
});

We send a JSON response with the json function, containing the
selected rows.

app.get('/city/:id', (req, res) =&gt; {

    const sql = 'select * from cities where id = ?';
    const params = [req.params.id];
...

In this route, we search for a city with a specific Id. The params array
contains the Id from the request path parameter.

db.get(sql, params, (err, row) =&gt; {

The get function runs the SQL query with the specified parameters
and calls the callback with the first result row afterwards.

res.json({
    'message':'success',
    'data':row
});

The selected row is sent to the client in JSON format.

$ curl localhost:3000/cities
{"message":"success","data":[{"id":1,"name":"Bratislava","population":432000},
{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},
{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},
{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},
{"id":8,"name":"Berlin","population":3671000}]}

## Source

[Express.js Guide](https://expressjs.com/en/guide/routing.html)

In this article we have introduced the Express.js web framework.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)