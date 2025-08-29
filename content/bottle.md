+++
title = "Bottle"
date = 2025-08-29T20:07:43.264+01:00
draft = false
description = "Bottle tutorial shows how to use Python Bottle micro web framework to create simple web applications in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Bottle

last modified January 29, 2024

Bottle tutorial shows how to use Python Bottle 
micro web framework to create simple web applications in Python.

## Bottle

*Bottle* is a fast, simple and lightweight WSGI micro web-framework 
for Python. It is distributed as a single file module. There are no 
dependencies other than the Python Standard Library.

The Web Server Gateway Interface (WSGI) is a simple calling convention 
for web servers to forward requests to web applications or frameworks written 
in the Python programming language.    

## Bottle installation

$ sudo pip3 install bottle

We use the pip3 tool to install Bottle.

## Bottle simple example

In the following example, we create a simple Bottle application.

$ mkdir simple &amp;&amp; cd simple
$ touch simple.py

We create a project directory a Python file.

simple.py
  

#!/usr/bin/python

from bottle import route, run

@route('/message')
def hello():
    return "Today is a beautiful day"  

run(host='localhost', port=8080, debug=True)

The example sends a message to the client.

from bottle import route, run

We import the route decorator and the run
function. The route decorator is used to bind a function to 
a request URL. The run function starts a server instance.
By default, it is a development server.

@route('/message')
def hello():
    return "Today is a beautiful day"  

With the @route decorator we define a route. A route
is a mapping between an URL and the functionality of a web server.
In our case, the functionality returns a simple text message.

run(host='localhost', port=8080, debug=True)

We start the server on port 8080 in debug mode.

$ ./simple.py 
Bottle v0.12.13 server starting up (using WSGIRefServer())...
Listening on http://localhost:8080/
Hit Ctrl-C to quit.

We start a development server. 

$ curl localhost:8080/message
Today is a beautiful day

We create a request with the curl tool. The server responds
with a simple message.

## Bottle JSON response

Web applications often send responses in JSON format. Bottle
automatically transforms Python dictionaries into JSON.

json_response.py
  

#!/usr/bin/python

from bottle import route, run

@route('/cars')
def getcars():

    cars = [ {'name': 'Audi', 'price': 52642},
        {'name': 'Mercedes', 'price': 57127},
        {'name': 'Skoda', 'price': 9000},
        {'name': 'Volvo', 'price': 29000},
        {'name': 'Bentley', 'price': 350000},
        {'name': 'Citroen', 'price': 21000},
        {'name': 'Hummer', 'price': 41400},
        {'name': 'Volkswagen', 'price': 21600} ]

    return dict(data=cars)

run(host='localhost', port=8080, debug=True)

The application sends data about cars as JSON to the client.

return dict(data=cars)

Bottle transforms a Python dictionary into JSON.

$ curl localhost:8080/cars
{"data": [{"name": "Audi", "price": 52642}, {"name": "Mercedes", "price": 57127}, 
{"name": "Skoda", "price": 9000}, {"name": "Volvo", "price": 29000}, 
{"name": "Bentley", "price": 350000}, {"name": "Citroen", "price": 21000}, 
{"name": "Hummer", "price": 41400}, {"name": "Volkswagen", "price": 21600}]}

We receive a named JSON array.

## Bottle GET request

The HTTP GET method requests a representation of the specified resource.
In Bottle, we can map GET requests with @route or @get
decorators. The data is retrieved from request.query.

The GET request is usually the default request method.

get_request.py
  

#!/usr/bin/python

from bottle import route, run, request, get

@get('/msg')
def message():

    name = request.query.name
    age = request.query.age

    return "{0} is {1} years old".format(name, age)

run(host='localhost', port=8080, debug=True)

The application builds a message from the data of a GET request.

@get('/msg')
def message():

The message function is mapped to the GET request
with the /msg path. The @get('msg') decorator
is equivalent to @route('msg', method='GET'), or 
shorter @route('msg').

name = request.query.name
age = request.query.age

We retrieve the data from the query string.

$ curl "localhost:8080/greet?name=Peter&amp;age=34"
Peter is 34 years old

We issue a GET request with the curl tool. The GET
request is the default with curl. We add name
and age parameters to the query string.

## Bottle serving static files

With static_file, we can serve static files in Bottle.

$ mkdir botstat &amp;&amp; cd botstat
$ mkdir public 
$ touch public/home.html app.py

We create directories and files for the application.    

public/home.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt;This is home page&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

This is a home page located in the public directory. 
The directory for static resources is often called public
or static.

app.py
  

#!/usr/bin/python

from bottle import route, run, static_file

@route('/&lt;filepath:path&gt;')
def server_static(filepath):
    return static_file(filepath, root='./public/')

run(host='localhost', port=8080, debug=True)

We serve static files in this example. In order to get the home page,
we have to navigate to localhost:8080/home.html.

@route('/&lt;filepath:path&gt;')

The filepath:path is a filter that allows only characters
that can appear in a path including slashes.

return static_file(filepath, root='./public/')

With static_file function, we serve static files. 
The directory where the static files are located is specified in
the root parameter.

## Bottle filters

Routes that contain wildcards are called dynamic routes 
(as opposed to static routes). They can match more than one URL at 
the same time. A wildcard consists of a name enclosed in angle brackets 
(e.g. &lt;name&gt;) and accepts one or more characters up to the next 
slash.

Filters can be used to define more specific wildcards. 

- :int matches (signed) digits

- :float matches decimal numbers

- :path mathes characters allowed in path segments

- :re allows to specify a custom regular expression

filters.py
  

#!/usr/bin/python

from bottle import route, run

@route('/app/&lt;myid:int&gt;/')
def provide(myid):
    return "Object with id {} returned".format(myid)

@route('/app/&lt;name:re:[a-z]+&gt;/')
def provide(name):
    return "Name {} given".format(name)    

run(host='localhost', port=8080, debug=True)

The example uses an integer filter and a regex filter.

$ curl localhost:8080/app/3/
Object with id 3 returned

Here we add an integer to the path.

## Bottle form example

In the following example, we send a form to a Bottle application.

$ mkdir simple_form &amp;&amp; cd simple_form
$ mkdir public 
$ touch public/index.html simple_form.py

We create directories and files for the application.    

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;form method="post" action="doform"&gt;
        &lt;div&gt;
            &lt;label for="name"&gt;Name:&lt;/label&gt;
            &lt;input type="text" id="name" name="name"&gt;
        &lt;/div&gt;
        &lt;div&gt;
            &lt;label for="occupation"&gt;Occupation:&lt;/label&gt;
            &lt;input type="text" id="occupation" name="occupation"&gt;
        &lt;/div&gt;
        &lt;button type="submit"&gt;Submit&lt;/button&gt;
    &lt;/form&gt;

&lt;/body&gt;

&lt;/html&gt;

In the HTML file, we have a form tag. The form contains two input
fields: name and occupation.

simple_form.py
  

#!/usr/bin/python

from bottle import route, run, post, request, static_file

@route('/')
def server_static(filepath="index.html"):
    return static_file(filepath, root='./public/')

@post('/doform')
def process():

    name = request.forms.get('name')
    occupation = request.forms.get('occupation')
    return "Your name is {0} and you are a(n) {1}".format(name, occupation)

run(host='localhost', reloader=True, port=8080, debug=True)

In the simple_form.py file, we serve a form and process
the form.

@route('/')
def server_static(filepath="index.html"):
    return static_file(filepath, root='./public/')

For the root path (/), we serve index.html from the 
public directory.

@post('/doform')
def process():

    name = request.forms.get('name')
    occupation = request.forms.get('occupation')
    return "Your name is {0} and you are a(n) {1}".format(name, occupation)

Here we process the form. We use the @post decorator. 
We get the data from request.forms and build the message
string.

## Bottle error handler

Custom error pages can be created with the @error decorator.

error_handler.py
  

#!/usr/bin/python

from bottle import route, run, error

@route('/app/&lt;myid:int&gt;')
def provide(myid):
    return "Object with id {} returned".format(myid)

@error(404)
def error404(error):
    return '404 - the requested page could not be found'   

run(host='localhost', port=8080, debug=True)

In this example, we server a 404 error in a custom error handler.

@error(404)
def error404(error):
    return '404 - the requested page could not be found'   

The @error decorator takes the error code as a parameter.

$ curl localhost:8080/app/Peter
404 - the requested page could not be found

We try to access a route that is not defined; we get the custom error
message.

## Bottle MongoDB example

In the following example, we return data as JSON from a MongoDB database.

create_cars.py
  

#!/usr/bin/python

from pymongo import MongoClient

cars = [ {'name': 'Audi', 'price': 52642},
    {'name': 'Mercedes', 'price': 57127},
    {'name': 'Skoda', 'price': 9000},
    {'name': 'Volvo', 'price': 29000},
    {'name': 'Bentley', 'price': 350000},
    {'name': 'Citroen', 'price': 21000},
    {'name': 'Hummer', 'price': 41400},
    {'name': 'Volkswagen', 'price': 21600} ]

client = MongoClient('mongodb://localhost:27017/')

with client:

    db = client.testdb
    
    db.cars.insert_many(cars)

With this script we create a Mongo collection. For more information
about working with MongoDB in Python, refer to 
[PyMongo tutorial](/python/pymongo/).

bottle_mongo.py
  

#!/usr/bin/python

from bottle import route, run, HTTPResponse
from pymongo import MongoClient
import json

client = MongoClient('mongodb://localhost:27017/')

@route('/cars')
def getcars():

    db = client.testdb
    cars = list(db.cars.find({}, {'_id': 0}))

    if cars:

        return json.dumps(cars)
    else: 
        raise HTTPResponse(status=204)

run(host='localhost', port=8080, debug=True)

The example returns data from a Mongo collection as JSON.

client = MongoClient('mongodb://localhost:27017/')

A MongoClient instance is created.

db = client.testdb
cars = list(db.cars.find({}, {'_id': 0}))

We retrieve all data from two fields; we exclude the _id
field.

if cars:

    return json.dumps(cars)
else: 
    raise HTTPResponse(status=204)

If there are data, we transform them to JSON with json.dumps
and return them to the client. Otherwise, we send 204 status code.

## Bottle template example

A template engine is a library designed to combine templates with a 
data model to produce result documents. Bottle uses a simple template
engine by default. 

$ mkdir botview &amp;&amp; cd botview
$ mkdir views 
$ touch views/show_cars.tpl app.py

We create directories and files for the application.    

views/show_cars.tpl
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Cars&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;table&gt;

        &lt;tr&gt;
            &lt;th&gt;Name&lt;/th&gt;
            &lt;th&gt;Price&lt;/th&gt;
        &lt;/tr&gt;
        % for car in cars:
        &lt;tr&gt;
            &lt;td&gt;{{car['name']}}&lt;/td&gt;
            &lt;td&gt;{{car['price']}}&lt;/td&gt;
        &lt;/tr&gt;
        % end

    &lt;/table&gt;

&lt;/body&gt;
&lt;/html&gt;

In this template, we go through the received cars object and generate
a table from it. The template files are located in the views
directory.

app.py
  

#!/usr/bin/python

from bottle import route, run, template, HTTPResponse
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')

@route('/cars')
def getcars():

    db = client.testdb
    data = db.cars.find({}, {'_id': 0})

    if data:

        return template('show_cars', cars=data)
    else: 
        return HTTPResponse(status=204)

run(host='localhost', port=8080, debug=True)

In the application, we retrieve data from the MongoDB collection.
We use template function to combine the template file
with the data.

## Source

[Python Bottle documentation](https://bottlepy.org/docs/dev/)

In this article we have used Bottle to create simple web applications
in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).