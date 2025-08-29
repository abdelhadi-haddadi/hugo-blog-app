+++
title = "Python Flask"
date = 2025-08-29T20:08:30.664+01:00
draft = false
description = "Python Flask tutorial shows how to use Python Flask library to create Python web applications."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Flask

last modified January 29, 2024

Python Flask tutorial shows how to use Python Flask module to create Python web applications.

## Flask

*Flask* is Python micro web framework. It includes only a core library.
Most of the functionality is available as extensions including validation,
form handling, object-relational mappers, or authentication.
Flask is based on Werkzeug WSGI toolkit and Jinja2 template engine.

The Web Server Gateway Interface (WSGI) is a simple calling convention
for web servers to forward requests to web applications or frameworks written
in the Python programming language.

## Flask Jinja2

Jinja2 is a Flask templating engine. A *template engine* or template
processor is a library designed to combine templates with a data model to
produce documents. Template engines are often used to generate large amounts of
emails, in source code preprocessing, or producing dynamic HTML pages.

Learn more about Jinja2 with the [Jinja tutorial](/python/jinja/).

## URL

A Uniform Resource Locator (URL), is a reference to a web resource that
specifies its location on a computer network and a mechanism for retrieving it.
A web resource is any data that can be obtained via web, such as HTML documents,
PDF files, PNG images, JSON data, or plain text.

A generic URL has the following form:

scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]

The parts between the []  brackets are optional.

## Flask installation

$ pip3 install -U Flask

We use the pip3 tool to install Flask. The -U or
--update updates the module to the latest version.

## Setting up virtual environment

More complex applications use virtual environments during development.

$ python3 -m venv venv
. venv/bin/activate

These commands create a new virtual environment on Linux.

&gt; py -3 -m venv venv
&gt; venv\Scripts\activate

These commands create a new virtual environment on Windows.

## Running Flask application

The recommended way to run Flask applications is with the
help of environment variables.

$ export FLASK_APP=hello.py
$ flask run

We set the FLASK_APP to the name of the
main application file. On Windows, use the set command
instead of export.

$ export FLASK_ENV=development

To run Flask application in development mode, we also set the
FLASK_EVN variable.

## Flask simple example

In the following example, we create a simple Flask application.

$ mkdir hello
$ cd hello

We create a directory for the application.

hello.py
  

#!/usr/bin/python

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello there!'

Inside a directory, we create a Python file hello.py.

from flask import Flask

We import the Flask object. It implements a WSGI application and
acts as the central object.

@app.route('/')
def hello():
    return 'Hello there!'

With the @app.route decorator we define a route. A route
is a mapping between an URL and the functionality of a web application.
In our case, we return a simple text message.

$ flask run
* Serving Flask app "hello.py"
* Environment: production
  WARNING: This is a development server. Do not use it in a production deployment.
  Use a production WSGI server instead.
* Debug mode: off
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)

We set the FLASK_APP environment variable and start the
application with flask run command. The default Flask port
is 5000.

$ curl localhost:5000
Hello there!

We create a request with the curl command.

## Flask query parameters

Query string is a part of the URL which is used to add some criteria to the
request for the resource. It is often a sequence of key/value pairs.
It follows the path and starts with the ? character.

app.py
  

#!/usr/bin/python

from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():

    return 'Home page'

@app.route('/greet', methods=['GET'])
def greet():

    name = request.args.get('name', 'Guest')
    msg = f'Hello {name}'

    return msg, 200, {'Content-Type': 'text/plain; charset=utf-8'}

The application creates and sends a message to the client. It uses
the value from the name query parameter.

from flask import Flask, request

We import the Flask and the request
objects.

@app.route('/greet', methods=['GET'])
def greet():
...

The greet function is mapped to the /greet
path and the GET type request.

name = request.args.get('name', 'Guest')

We get the query parameter from the request object using
the get method. If the parameter is not present, a default
value 'Guest' is returned.

msg = f'Hello {name}'

We include the value of the name query parameter to the message.

return msg, 200, {'Content-Type': 'text/plain; charset=utf-8'}

We return the message, status code, and the response content type
to the client.

$ export FLASK_APP=app.py
$ flask run

We run the application.

$ curl -i localhost:5000/greet?name=Lucia
HTTP/1.0 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 11
Server: Werkzeug/0.16.0 Python/3.8.0
Date: Thu, 16 Jan 2020 15:50:58 GMT

Hello Lucia

We create a GET request to the application. With the -i
option, we also include the response header.

$ curl localhost:5000/greet
Hello Guest

When no query parameter is set, the default value is used.

## Flask path parameters

Values can be send to the web application via query parameters or path
parameters. The path parameter is specified between angle brackets:
&lt;param&gt;.

app.py
  

from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():

    return 'Home page'

@app.route("/greet/&lt;name&gt;/")
def greet(name):

    msg = f'Hello {name}'

    return msg, 200, {'Content-Type': 'text/plain; charset=utf-8'}

The application returns a greeting to the user, whose name is specified as
a path parameter.

@app.route("/greet/&lt;name&gt;/")
def greet(name):

The path parameter is defined here: &lt;name&gt;. The parameter
is then passed to the name variable.

$ curl localhost:5000/greet/Robert/
Hello Robert

## Flask make_response

With the make_response helper function, we can create a response
to the client, including necessary headers.

app.py
  

#!/usr/bin/python

from flask import Flask, make_response

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Home page'

@app.route('/users/&lt;name&gt;', methods=['POST'])
def create_user(name):

    msg = f'user {name} created'
    return make_response(msg, 201)

@app.route('/users/&lt;name&gt;', methods=['GET'])
def get_user(name):

    msg = f'Hello {name}'
    return make_response(msg, 200)

The application consists of one file: app.py.
It contains three methods.

@app.route('/')
def hello():
    return 'Home page'

For the home page, we return a simple text message.

@app.route('/users/&lt;name&gt;', methods=['POST'])
def create_user(name):

    msg = f'user {name} created'
    return make_response(msg, 201)

The create_user method is mapped to the /users/&lt;name&gt;
path a POST request. The &lt;name&gt; is a path variable whose value is passed
to the name variable. The make_response creates a response with
the body and the 201 status code.

@app.route('/users/&lt;name&gt;', methods=['GET'])
def get_user(name):

    msg = f'Hello {name}'
    return make_response(msg, 200)

The get_user is mapped to the same path, but
different method: GET. This time the response contains the 200 status
code.

$ export FLASK_APP=app.py
$ flask run

We run the application.

$ curl -i localhost:5000/users/Peter/
HTTP/1.0 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 11
Server: Werkzeug/0.16.0 Python/3.8.0
Date: Thu, 16 Jan 2020 15:31:37 GMT

Hello Peter

We create a GET request to the application.

$ curl -X POST localhost:5000/users/Peter/
user Peter created

A POST request is created.

## Flask send_file

The send_file method sends the contents of a file to the client.

app.py
  

#!/usr/bin/python

from flask import Flask, send_file

app = Flask(__name__)

@app.route('/image')
def get_image():

    filename = 'sid.png'
    return send_file(filename, mimetype='image/png')

The example sends an image to the client.

return send_file(filename, mimetype='image/png')

We specify the filename and the content type.

## Flask JSON

JSON is a lightweight data-interchange format. It is easy for humans to read and
machines to parse and generate. Web applications often consume and produce JSON
data. 

When returning a Python dictionary to the client, Flask automatically transforms  
it to JSON. Other objects can be transformed to JSON with the jsonify
function.

app.py
  

from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

movies = {1: 'Toy story', 2: 'The Raid', 3: 'Hero',
            4: 'Ip Man', 5: 'Kung Fu Panda'}

@app.route('/movies')
def get_movies():

    return movies

@app.route('/rmovie')
def random_movie():

    movie = random.choice(list(movies.items()))

    return jsonify(movie)

In the example, we have two functions. One returns a dictionary, the other 
one a random pair from the dictionary.

@app.route('/movies')
def get_movies():

    return movies

Flask transforms the movies dictionary into JSON automatically.

@app.route('/rmovie')
def random_movie():

    movie = random.choice(list(movies.items()))

    return jsonify(movie)

This function returns a random movie from the dictionary; it is a Python tuple. 
The tuple is then transformed into JSON with the jsonify function.

$ curl localhost:5000/movies
{"1":"Toy story","2":"The Raid","3":"Hero","4":"Ip Man","5":"Kung Fu Panda"}

Here we get all movies as JSON data. 

$ curl localhost:5000/rmovie
[2,"The Raid"]

Here we get a random movie. 

## Flask render_template

The render_template function renders a template from the
template folder with the given context. The context are the variables that
should be available in the context of the template. The default name of 
the directory to store template files is templates.

app.py
templates
    index.html

These are the contents of the project directory. 

app.py
  

#!/usr/bin/python

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/greet/&lt;name&gt;/')
def greet(name):

    msg = f'Hello {name}'

    return render_template('index.html', name=name)

In the example, we read a value from a path parameter and send it to the 
index.html template file to be processed.

return render_template('index.html', name=name)

The first parameter of the render_template is the 
template file name, the second is the context variable. The name
local variable will be available in the template under name.

templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Greeting&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;p&gt;
        Hello {{ name }}
    &lt;/p&gt;

&lt;/body&gt;

&lt;/html&gt;

This is the index.html template file. The template consists of 
static data and dynamic data. 

&lt;p&gt;
  Hello {{ name }}
&lt;/p&gt;

With the {{}} syntax, we output the value of the name
variable, which was passed to the template. 

$ curl localhost:5000/greet/Peter/
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Greeting&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;p&gt;
        Hello Peter
    &lt;/p&gt;

&lt;/body&gt;

&lt;/html&gt;

## Flask serve static files

Static files are files that do not change. They include CSS files, JavaScript 
files and images; also HTML files which do not contain template directives.
Flask has a default static directory for static files. 

app.py
static
    about.html
    sid.jpg
templates
    index.html

This is the project structure.

app.py
  

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return app.send_static_file('about.html')

We have two routes in the application. The home page renders a template, which 
refers to an image. The about page returns a static HTML file with the 
send_static_file function.

static/about.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;About&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        About page
    &lt;/p&gt;
    
&lt;/body&gt;
&lt;/html&gt;

The about.html page is a simple static HTML file. There are 
no template directives.

templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
        
    &lt;img src="/static/sid.jpg" alt="Sid"&gt;
    &lt;img src="{{ url_for('static', filename='sid.jpg') }}" alt="Sid"&gt;
    
&lt;/body&gt;
&lt;/html&gt;

In the index.html template file, we refer to a static resource: 
an image file. 

&lt;img src="/static/sid.jpg" alt="Sid"&gt;
&lt;img src="{{ url_for('static', filename='sid.jpg') }}" alt="Sid"&gt;

We include an JPEG image into the file. The usage of the url_for
function is recommended, since hard-coded URLs are more difficult to maintain.

## Flask custom 404 page

The HTTP 404, 404 Not Found, 404, Page Not Found error message is a Hypertext
Transfer Protocol (HTTP) standard response code used in web communication. It
indicates that the browser was able to communicate with a given server, but the
server could not find what was requested.

Flask has a built-in abort function, which sends error messages
to client. We can customize error pages with the errorhandler. 
It is a decorator used to register a function to handle errors by code or 
exception class.

app.py
  

#!/usr/bin/python

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Home page'

@app.route('/about')
def about():
    return 'About page'

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

In the example, we register an error handler function for the 404 not found error.
It renders the 404.html template file.

templates/404.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;404 error&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        404 - page not found
    &lt;/p&gt;
    
&lt;/body&gt;
&lt;/html&gt;

This is the error page that is shown to the user.

## Flask SQLite example

In the following example, we send data from an SQLite database. We use 
SQLAlchemy.     

app.py
data 
  cities.sql 
  test.db

This is the project structure.

cities.sql
  

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

$ sqlite3 test.db
SQLite version 3.27.2 2019-02-25 16:06:06
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

app.py
  

#!/usr/bin/python

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/test.db'

db = SQLAlchemy(app)

class City(db.Model):
    __tablename__ = 'cities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    population = db.Column(db.Integer)

    def serialize(self):

        return {
            'id': self.id, 
            'name': self.name,
            'population': self.population,
        }

@app.route('/cities')
def all():

    cities = City.query.all()

    return jsonify(cities=[city.serialize() for city in cities])

The application sends all rows from the cities table as JSON 
data to the client.

from flask_sqlalchemy import SQLAlchemy

To work with data, we use the flask_sqlalchemy module.

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

We do not use the flask_sqlalchemy event system, therefore; we 
turn it off with the SQLALCHEMY_TRACK_MODIFICATIONS configuration
option.

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/test.db'

With the SQLALCHEMY_DATABASE_URI, we specify the path to the 
database.

db = SQLAlchemy(app)

An SQLAlchemy object is created; it is used to work with the 
database.

class City(db.Model):
    __tablename__ = 'cities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    population = db.Column(db.Integer)

    def serialize(self):

        return {
            'id': self.id, 
            'name': self.name,
            'population': self.population,
        }

This is the City entity. We define the table name and map the 
attributes to the database columns. The serialize method helps 
transform the Python class into a JSON object.

@app.route('/cities')
def all():

    cities = City.query.all()

    return jsonify(cities=[city.serialize() for city in cities])

For the /cities route, we fetch all rows from the database and 
send them as JSON data to the client. 

$ export FLASK_APP=app.py
$ curl localhost:5000/cities
{"cities":[{"id":1,"name":"Bratislava","population":432000},
{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},
{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},
{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},
{"id":8,"name":"Berlin","population":3671000}]}

## Source

[Python Flask documentation](https://flask.palletsprojects.com/en/3.0.x/)

In this article we have introduced the Python Flask module, which is used
to develop web applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).