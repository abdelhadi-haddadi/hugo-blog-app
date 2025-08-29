+++
title = "Python Requests"
date = 2025-08-29T20:10:17.558+01:00
draft = false
description = "Python Requests tutorial introduces the Python Requests module. We grab data, post data, stream data, and connect to secure web pages."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Requests

last modified January 29, 2024

In this article we show how to work with the Python Requests module. We grab data, post
data, stream data, and connect to secure web pages. In the examples, we use an online
service, an Nginx server, a Python HTTP server, and a flask application.

The Hypertext Transfer Protocol (HTTP) is an application
protocol for distributed, collaborative, hypermedia information systems. HTTP is
the foundation of data communication for the World Wide Web.

## Python requests

Requests is a simple and elegant Python HTTP library. It provides
methods for accessing Web resources via HTTP. 

$ sudo service nginx start

We run Nginx web server on localhost. Some of our examples
use nginx server.

## Python requests version

The first program prints the version of the Requests library.

version.py
  

#!/usr/bin/python

import requests

print(requests.__version__)
print(requests.__copyright__)

The program prints the version and copyright of Requests.

$ ./version.py
2.21.0
Copyright 2018 Kenneth Reitz

This is a sample output of the example.

## Python requests reading a web page

The get method issues a GET request; it fetches documents
identified by the given URL.

read_webpage.py
  

#!/usr/bin/python

import requests as req

resp = req.get("http://www.webcode.me")

print(resp.text)

The script grabs the content of the www.webcode.me web page.

resp = req.get("http://www.webcode.me")

The get method returns a response object.

print(resp.text)

The text attribute contains the content of the response, in Unicode.

$ ./read_webpage.py
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

This is the output of the read_webpage.py script.

The following program gets a small web page and strips its HTML tags.

strip_tags.py
  

#!/usr/bin/python

import requests as req
import re

resp = req.get("http://www.webcode.me")

content = resp.text

stripped = re.sub('&lt;[^&lt;]+?&gt;', '', content)
print(stripped)

The script strips the HTML tags of the www.webcode.me
web page.

stripped = re.sub('&lt;[^&lt;]+?&gt;', '', content)

A simple regular expression is used to strip the HTML tags.

## HTTP Request

An HTTP request is a message send from the client to the browser to
retrieve some information or to make some action.

Request's request method creates a new request.
Note that the request module has some higher-level methods,
such as get, post, or put,
which save some typing for us.

create_request.py
  

#!/usr/bin/python

import requests as req

resp = req.request(method='GET', url="http://www.webcode.me")
print(resp.text)

The example creates a GET request and sends it to http://www.webcode.me.

## Python requests getting status

The Response object contains a server's response to an HTTP request.
Its status_code attribute returns HTTP status code of the response, such
as 200 or 404.

get_status.py
  

#!/usr/bin/python

import requests as req

resp = req.get("http://www.webcode.me")
print(resp.status_code)

resp = req.get("http://www.webcode.me/news")
print(resp.status_code)

We perform two HTTP requests with the get method
and check for the returned status.

$ ./get_status.py
200
404

200 is a standard response for successful HTTP requests and 404 tells that the requested
resource could not be found.

## Python requests head method

The head method retrieves document headers.
The headers consist of fields, including date, server, content type,
or last modification time.

head_request.py
  

#!/usr/bin/python

import requests as req

resp = req.head("http://www.webcode.me")

print("Server: " + resp.headers['server'])
print("Last modified: " + resp.headers['last-modified'])
print("Content type: " + resp.headers['content-type'])

The example prints the server, last modification time, and content type
of the www.webcode.me web page.

$ ./head_request.py
Server: nginx/1.6.2
Last modified: Sat, 20 Jul 2019 11:49:25 GMT
Content type: text/html

This is the output of the head_request.py program.

## Python requests get method

The get method issues a GET request to the server.
The GET method requests a representation of the specified resource.

The httpbin.org is a freely available HTTP Request &amp; Response Service.

mget.py
  

#!/usr/bin/python

import requests as req

resp = req.get("https://httpbin.org/get?name=Peter")
print(resp.text)

The script sends a variable with a value to the httpbin.org
server. The variable is specified directly in the URL.

$ ./mget.py
{
  "args": {
    "name": "Peter"
  },
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Host": "httpbin.org",
    "User-Agent": "python-requests/2.21.0"
  },
  ...
}

mget2.py
  

```
#!/usr/bin/python

import requests as req

payload = {'name': 'Peter', 'age': 23}
resp = req.get("https://httpbin.org/get", params=payload)

print(resp.url)
print(resp.text)

```

The get method takes a params parameter where
we can specify the query parameters.

payload = {'name': 'Peter', 'age': 23}

The data is sent in a Python dictionary.

resp = req.get("https://httpbin.org/get", params=payload)

We send a GET request to the httpbin.org site and
pass the data, which is specified in the params parameter.

print(resp.url)
print(resp.text)

We print the URL and the response content to the console.

$ ./mget2.py
http://httpbin.org/get?name=Peter&amp;age=23
{
  "args": {
    "age": "23",
    "name": "Peter"
  },
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Host": "httpbin.org",
    "User-Agent": "python-requests/2.21.0"
  },
  ...
}

## Python requests redirection

Redirection is a process of forwarding one URL to a different URL.
The HTTP response status code 301 Moved Permanently is used for permanent URL redirection;
302 Found for a temporary redirection.

redirect.py
  

#!/usr/bin/python

import requests as req

resp = req.get("https://httpbin.org/redirect-to?url=/")

print(resp.status_code)
print(resp.history)
print(resp.url)

In the example, we issue a GET request to the https://httpbin.org/redirect-to page.
This page redirects to another page; redirect responses are stored in the
history attribute of the response.

$ ./redirect.py
200
[&lt;Response [302]&gt;]
https://httpbin.org/

A GET request to https://httpbin.org/redirect-to was 302 redirected to
https://httpbin.org.

In the second example, we do not follow a redirect.

redirect2.py
  

#!/usr/bin/python

import requests as req

resp = req.get("https://httpbin.org/redirect-to?url=/", allow_redirects=False)

print(resp.status_code)
print(resp.url)

The allow_redirects parameter specifies whether the redirect
is followed; the redirects are followed by default.

$ ./redirect2.py
302
https://httpbin.org/redirect-to?url=/

## Redirect with nginx

In the next example, we show how to set up a page redirect in nginx server.

location = /oldpage.html {

        return 301 /newpage.html;
}

Add these lines to the nginx configuration file, which is located at
/etc/nginx/sites-available/default on Debian.

$ sudo service nginx restart

After the file has been edited, we must restart nginx to apply the
changes.

oldpage.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Old page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;
This is old page
&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

This is the oldpage.html file located in the nginx document root.

newpage.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;New page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;
This is a new page
&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

This is the newpage.html.

redirect3.py
  

#!/usr/bin/python

import requests as req

resp = req.get("http://localhost/oldpage.html")

print(resp.status_code)
print(resp.history)
print(resp.url)

print(resp.text)

This script accesses the old page and follows the redirect. As we already mentioned,
Requests follows redirects by default.

$ ./redirect3.py
200
(&lt;Response [301]&gt;,)
http://localhost/files/newpage.html
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;New page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;
This is a new page
&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

```
$ sudo tail -2 /var/log/nginx/access.log
127.0.0.1 - - [21/Jul/2019:07:41:27 -0400] "GET /oldpage.html HTTP/1.1" 301 184
"-" "python-requests/2.4.3 CPython/3.4.2 Linux/3.16.0-4-amd64"
127.0.0.1 - - [21/Jul/2019:07:41:27 -0400] "GET /newpage.html HTTP/1.1" 200 109
"-" "python-requests/2.4.3 CPython/3.4.2 Linux/3.16.0-4-amd64"

```

As we can see from the access.log file, the request was redirected
to a new file name. The communication consisted of two GET requests.

## User agent

In this section, we specify the name of the user agent. We create our
own Python HTTP server.

http_server.py
  

#!/usr/bin/python

from http.server import BaseHTTPRequestHandler, HTTPServer

class MyHandler(BaseHTTPRequestHandler):

    def do_GET(self):

        message = "Hello there"

        self.send_response(200)

        if self.path == '/agent':

            message = self.headers['user-agent']

        self.send_header('Content-type', 'text/html')
        self.end_headers()

        self.wfile.write(bytes(message, "utf8"))

        return

def main():

    print('starting server on port 8081...')

    server_address = ('127.0.0.1', 8081)
    httpd = HTTPServer(server_address, MyHandler)
    httpd.serve_forever()

main()

We have a simple Python HTTP server.

if self.path == '/agent':

    message = self.headers['user-agent']

If the path contains '/agent', we return
the specified user agent.

user_agent.py
  

#!/usr/bin/python

import requests as req

headers = {'user-agent': 'Python script'}

resp = req.get("http://localhost:8081/agent", headers=headers)
print(resp.text)

This script creates a simple GET request to our Python HTTP server.
To add HTTP headers to a request, we pass in a dictionary to the
headers parameter.

headers = {'user-agent': 'Python script'}

The header values are placed in a Python dictionary.

resp = req.get("http://localhost:8081/agent", headers=headers)

The values are passed to the headers parameter.

$ simple_server.py
starting server on port 8081...

First, we start the server.

$ ./user_agent.py
Python script

Then we run the script. The server responded with the name of the agent that we
have sent with the request.

## Python requests post value

The post method dispatches a POST request on the given
URL, providing the key/value pairs for the fill-in form content.

post_value.py
  

#!/usr/bin/python

import requests as req

data = {'name': 'Peter'}

resp = req.post("https://httpbin.org/post", data)
print(resp.text)

The script sends a request with a name key having Peter value.
The POST request is issued with the post method.

$ ./post_value.py
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "name": "Peter"
  },
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Content-Length": "10",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "python-requests/2.21.0"
  },
  "json": null,
  ...
}

This is the output of the post_value.py script.

## Python requests upload image

In the following example, we are going to upload an image. We create
a web application with Flask.

app.py
  

#!/usr/bin/python

import os
from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def home():
    return 'This is home page'

@app.route("/upload", methods=['POST'])
def handleFileUpload():

    msg = 'failed to upload image'

    if 'image' in request.files:

        photo = request.files['image']

        if photo.filename != '':

            photo.save(os.path.join('.', photo.filename))
            msg = 'image uploaded successfully'

    return msg

if __name__ == '__main__':
    app.run()

This is a simple application with two endpoints. The /upload
endpoint checks if there is some image and saves it to the current directory.

upload_file.py
  

#!/usr/bin/python

import requests as req

url = 'http://localhost:5000/upload'

with open('sid.jpg', 'rb') as f:

    files = {'image': f}

    r = req.post(url, files=files)
    print(r.text)

We send the image to the Flask application. The file is specified
in the files attribute of the post method.

## JSON

JSON (JavaScript Object Notation) is a lightweight
data-interchange format. It is easy for humans to read and write and for
machines to parse and generate.

JSON data is a collection of key/value pairs; in Python, it is realized by a dictionary.

### Read JSON

In the first example, we read JSON data from a PHP script.

send_json.php
  

&lt;?php

$data = [ 'name' =&gt; 'Jane', 'age' =&gt; 17 ];
header('Content-Type: application/json');

echo json_encode($data);

The PHP script sends JSON data. It uses the json_encode
function to do the job.

read_json.py
  

#!/usr/bin/python

import requests as req

resp = req.get("http://localhost/send_json.php")
print(resp.json())

The read_json.py reads JSON data sent by the PHP script.

print(resp.json())

The json method returns the json-encoded
content of a response, if any.

$ ./read_json.py
{'age': 17, 'name': 'Jane'}

### Send JSON

Next, we send JSON data to a PHP script from a Python script.

parse_json.php
  

&lt;?php

$data = file_get_contents("php://input");

$json = json_decode($data , true);

foreach ($json as $key =&gt; $value) {

    if (!is_array($value)) {
        echo "The $key is $value\n";
    } else {
        foreach ($value as $key =&gt; $val) {
            echo "The $key is $value\n";
        }
    }
}

This PHP script reads JSON data and sends back a message with
the parsed values.

send_json.py
  

#!/usr/bin/python

import requests as req

data = {'name': 'Jane', 'age': 17}

resp = req.post("http://localhost/parse_json.php", json=data)
print(resp.text)

This script sends JSON data to the PHP application and
reads its response.

data = {'name': 'Jane', 'age': 17}

This is the data to be sent.

resp = req.post("http://localhost/parse_json.php", json=data)

The dictionary containing JSON data is passed to the json
parameter.

$ ./send_json.py
The name is Jane
The age is 17

This is the example output.

## Retrieving definitions from a dictionary

In the following example, we find definitions of a term
on the [www.dictionary.com](http://www.dictionary.com).
To parse HTML, we use the lxml module.

$ pip install lxml

We install the lxml module with
the pip tool.

get_term.py
  

#!/usr/bin/python

import requests as req
from lxml import html
import textwrap

term = "dog"

resp = req.get("http://www.dictionary.com/browse/" + term)
root = html.fromstring(resp.content)

for sel in root.xpath("//span[contains(@class, 'one-click-content')]"):

    if sel.text:

        s = sel.text.strip()

        if (len(s) &gt; 3):

            print(textwrap.fill(s, width=50))

In this script, we find the definitions of the term dog on www.dictionary.com.
The lxml module is used to parse the HTML code.

**Note:** The tags that contain the definitions may change overnight.
In such case we would need to adapt the script.

from lxml import html

The lxml module can be used to parse HTML.

import textwrap

The textwrap module is used to wrap text to a certain width.

resp = req.get("http://www.dictionary.com/browse/" + term)

To perform a search, we append the term at the end of the URL.

root = html.fromstring(resp.content)

We need to use resp.content rather than resp.text
because html.fromstring implicitly expects bytes as input.
(The resp.content returns content in bytes whereas resp.text
as Unicode text.

for sel in root.xpath("//span[contains(@class, 'one-click-content')]"):

    if sel.text:

        s = sel.text.strip()

        if (len(s) &gt; 3):

            print(textwrap.fill(s, width=50))

We parse the content. The main definitions are located inside the span tag, which
has the one-click-content attribute.
We improve the formatting by removing excessive white space and stray
characters. The text width has maximum of 50 characters. Note that such parsing
is subject to change.

$ ./get_term.py
a domesticated canid,
any carnivore of the dog family Canidae, having
prominent canine teeth and, in the wild state, a
long and slender muzzle, a deep-chested muscular
body, a bushy tail, and large, erect ears.
...

This is a partial list of the definitions.

## Python requests streaming requests

Streaming is transmitting a continuous flow of audio and/or video data
while earlier parts are being used. The Requests.iter_lines iterates over the response
data, one line at a time. Setting stream=True on the request avoids reading the content
at once into memory for large responses.

streaming.py
  

#!/usr/bin/python

import requests as req

url = "https://docs.oracle.com/javase/specs/jls/se8/jls8.pdf"

local_filename = url.split('/')[-1]

r = req.get(url, stream=True)

with open(local_filename, 'wb') as f:

    for chunk in r.iter_content(chunk_size=1024):

        f.write(chunk)

The example streams a PDF file and writes it on the disk.

r = req.get(url, stream=True)

Setting stream to True when making a request,
Requests cannot release the connection back to the pool unless we consume
all the data or call Response.close.

with open(local_filename, 'wb') as f:

    for chunk in r.iter_content(chunk_size=1024):

        f.write(chunk)

We read the resource by 1 KB chunks and write them to a local file.

## Python requests credentials

The auth parameter provides a basic HTTP authentication; it takes
a tuple of a name and a password to be used for a realm. A security realm
is a mechanism used for protecting web application resources.

$ sudo apt-get install apache2-utils
$ sudo htpasswd -c /etc/nginx/.htpasswd user7
New password:
Re-type new password:
Adding password for user user7

We use the htpasswd tool to create a user name and a password
for basic HTTP authentication.

location /secure {

        auth_basic "Restricted Area";
        auth_basic_user_file /etc/nginx/.htpasswd;
}

Inside the nginx /etc/nginx/sites-available/default configuration file,
we create a secured page. The name of the realm is "Restricted Area".

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;title&gt;Secure page&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

&lt;p&gt;
This is a secure page.
&lt;/p&gt;

&lt;/body&gt;

&lt;/html&gt;

Inside the /usr/share/nginx/html/secure directory, we have
this HTML file.

credentials.py
  

#!/usr/bin/python

import requests as req

user = 'user7'
passwd = '7user'

resp = req.get("http://localhost/secure/", auth=(user, passwd))
print(resp.text)

The script connects to the secure webpage; it provides the user name
and the password necessary to access the page.

$ ./credentials.py
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;title&gt;Secure page&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

&lt;p&gt;
This is a secure page.
&lt;/p&gt;

&lt;/body&gt;

&lt;/html&gt;

With the right credentials, the credentials.py script returns
the secured page.

## Source

[Python requests documentation](https://requests.readthedocs.io/en/latest/)

In this article we have worked with the Python Requests module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).