+++
title = "Ruby Faraday tutorial"
date = 2025-08-29T20:15:48.868+01:00
draft = false
description = "This tutorial introduces the Ruby Faraday module. We grab data, post data, work with JSON, and connect to a secure web page. We also create a custom Faraday middleware."
image = ""
imageBig = ""
categories = ["web"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Faraday tutorial

last modified January 10, 2023

In this tutorial, we show how to work with the Ruby Faraday module. We grab data, post
data, work with JSON, and connect to a secure web page. We also create a custom Faraday
middleware. The tutorial uses Sinatra applications for several examples. 
ZetCode has also a concise [Ruby tutorial](/lang/rubytutorial/).

The Hypertext Transfer Protocol (HTTP) is an application protocol for distributed, collaborative,
hypermedia information systems. HTTP is the foundation of data communication for the World Wide Web.

Ruby Faraday is a simple, flexible HTTP client library, with support for multiple backends.
Faraday also is a middleware.

$ sudo gem install faraday

The module is installed with the sudo gem install faraday command.

## Sinatra

Sinatra is a popular Ruby web application framework. It is easy to install 
and set up. Some of our examples will also use a Sinatra application.

$ sudo gem install sinatra
$ sudo gem install thin

We install Sinatra and Thin web server. If Thin is installed, Sinatra 
automatically chooses Thin over the default WEBrick server.

$ pwd
/home/janbodnar/prog/sinatra/first
$ ls
main.rb

Inside the first directory, we have a main.rb file, which is the Sinatra
application file.

main.rb
  

require 'sinatra'

get '/' do
    "First application"
end

The application reacts to the / route. It sends a simple message back
to the client.

$ ruby main.rb 
== Sinatra (v1.4.7) has taken the stage on 4567 for development with backup from Thin
Thin web server (v1.6.4 codename Gob Bluth)
Maximum connections set to 1024
Listening on localhost:4567, CTRL+C to stop

The application is started with ruby main.rb command. The Thin server
is launched; it listens on 4567 port.

$ curl localhost:4567/
First application

With the curl command line tool, we connect to the server and access
the / route. A message appears on the console.

## Version

The first Faraday program prints the version of the library and of the Ruby language.

version.rb
  

#!/usr/bin/ruby

require 'faraday'

puts Faraday::VERSION
puts Faraday::default_adapter

The two constants provide the library version number and the default
Faraday adapter. 

$ ./version.rb 
0.9.2
net_http

This is a sample output of the string.

## Getting content

The get method fetches documents identified by the given URL.

get_content.rb
  

#!/usr/bin/ruby

require 'faraday'

res = Faraday.get 'http://www.something.com' 

puts res.body

The script grabs the content of the www.something.com web page.

$ ./get_content.rb 
&lt;html&gt;&lt;head&gt;&lt;title&gt;Something.&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;Something.&lt;/body&gt;
&lt;/html&gt;

This is the output of the get_content.rb script.

The following program gets a small web page and strips its HTML tags. 

strip_tags.rb
  

#!/usr/bin/ruby

require 'faraday'

con = Faraday::Connection.new "http://www.something.com"

res = con.get

puts res.body.gsub(%r{&lt;/?[^&gt;]+?&gt;}, '')

The script strips the HTML tags of the www.something.com
web page.

puts res.body.gsub(%r{&lt;/?[^&gt;]+?&gt;}, '')

A simple regular expression is used to strip the HTML tags.

$ ./strip_tags.rb 
Something.
Something.

The script prints the web page's title and content.

## Status

The status method of the Faraday::Response returns the 
HTTP status code of the response.

status.rb
  

#!/usr/bin/ruby

require 'faraday'

res = Faraday.get 'http://www.something.com'  
puts res.status
puts res.success?

res = Faraday.get 'http://www.something.com/news/'
puts res.status
puts res.success?

res = Faraday.get 'http://www.urbandicionary.com/define.php?term=Dog'
puts res.status
puts res.success?

We perform three HTTP requests with the get method
and check for returned status.

res = Faraday.get 'http://www.something.com'  
puts res.status

The status of the HTTP response is checked with the status
method.

puts res.success?

The success? method tells whether the status code was successful.

$ ./status.rb 
200
true
404
false
302
false

200 is a standard response for successful HTTP requests, 404 tells that the requested 
resource could not be found, and 302 tells that the resource was temporarily redirected.

## The head method

The head method retrieves document headers. 
The headers consist of fields, including date, server, content type, 
or last modification time.

head.rb
  

#!/usr/bin/ruby

require 'faraday'

con = Faraday.new :url =&gt; "http://www.something.com"

res = con.head 

puts res.headers['server']
puts res.headers['date']
puts res.headers['last-modified']
puts res.headers['content-type']
puts res.headers['content-length']

The example prints the server, date, last modification time, content type, and content length 
of the www.something.com web page.

$ ./head.rb 
Apache/2.4.12 (FreeBSD) OpenSSL/1.0.1l-freebsd mod_fastcgi/mod_fastcgi-SNAP-0910052141
Tue, 10 May 2016 10:19:01 GMT
Mon, 25 Oct 1999 15:36:02 GMT
text/html
77

This is the output of the head.rb program.

## The get method

The get method issues a GET request to the server.
The GET method requests a representation of the specified resource.

main.rb
  

require 'sinatra'

get '/greet' do  
    "Hello #{params[:name]}"
end

This is the Sinatra application file. Upon receiving the /greet route, 
it returns a message containing the name which was sent by the client.

mget.rb
  

#!/usr/bin/ruby

require 'faraday'

con = Faraday.new 

res = con.get 'http://localhost:4567/greet', { :name =&gt; 'Peter' }

puts res.body   

The script sends a variable with a value to the Sinatra application. The variable is 
specified directly in the URL.

$ ./mget.rb 
Hello Peter

This is the output of the example.

127.0.0.1 - - [10/May/2016:22:04:38 +0200] "GET /greet?name=Peter HTTP/1.1" 200 11 0.0034

In this log of the Thin server we can see that the parameter was encoded into the URL.

The get method takes a second parameter where
we can specify the query parameters.

mget2.rb
  

#!/usr/bin/ruby

require 'faraday'

res = Faraday.get do |req|
    req.url 'http://localhost/greet' 
    req.params['name']  = 'Jan' 
end

puts res.body  

This is another way of issuing the GET message.

$ ./mget2.rb 
Hello Peter

This is the output of the example.

## User agent

In this section, we specify the name of the user agent.

main.rb
  

require 'sinatra'

get '/agent' do
    request.user_agent
end

The Sinatra application returns the user agent sent by the client.

agent.rb
  

#!/usr/bin/ruby

require 'faraday'

con = Faraday.new 

res = con.get do |req| 
    req.url 'http://localhost:4567/agent' 
    req.headers['User-Agent'] = 'Ruby script'
end

puts res.body

This script creates a simple GET request to the Sinatra application.

res = con.get do |req| 
    req.url 'http://localhost:4567/agent' 
    req.headers['User-Agent'] = 'Ruby script'
end

The user agent is specified in the headers attribute
of the request.

$ ./agent.rb 
Ruby script

The server responded with the name of the agent that we have sent
with the request.

## Posting a value

The post method dispatches a POST request on the given 
URL, providing the key/value pairs for the fill-in form content.

main.rb
  

require 'sinatra'

post '/target' do
    "Hello #{params[:name]}"
end

The Sinatra application returns a greeting on the /target
route. It takes the value from the params hash.

mpost.rb
  

#!/usr/bin/ruby

require 'faraday'

con = Faraday.new 'http://localhost'

res = con.post '/target', { :name =&gt; 'Jan' }

puts res.body

The script sends a request with a name key having Jan value.
The POST request is issued with the post method.

$ ./mpost.rb 
Hello Jan

This is the output of the mpost.rb script.

127.0.0.1 - - [11/May/2016:13:49:44 +0200] "POST /target HTTP/1.1" 200 9 0.0006

With the POST method, the value is not send in the request URL.

## Retrieving definitions from a dictionary

In the following example, we find definitions of a term
on the [www.dictionary.com](http://www.dictionary.com). 
To parse HTML, we use the nokogiri gem. It can be 
installed with the sudo gem install nokogiri command.

get_term.rb
  

#!/usr/bin/ruby

require 'faraday'
require 'nokogiri'

term = 'dog'
con = Faraday.new :url =&gt; 'http://www.dictionary.com/browse/'+term

res = con.get 

doc = Nokogiri::HTML res.body
doc.css("div.def-content").map do |node|
    s = node.text.strip!
    s.gsub!(/\s{3,}/, " ") unless (s == nil)
    puts s unless (s == nil)
end

In this script, we find the definitions of the term dog on www.dictionary.com.
The Nokogiri::HTML is used to parse the HTML code.

con = Faraday.new :url =&gt; 'http://www.dictionary.com/browse/'+term

To perform a search, we append the term at the end of the URL.

doc = Nokogiri::HTML res.body
doc.css("div.def-content").map do |node|
    s = node.text.strip!
    s.gsub!(/\s{3,}/, " ") unless (s == nil)
    puts s unless (s == nil)
end

We parse the content with the Nokogiri::HTML class.
The definitions are located inside the &lt;div class="def-content"&gt; tag.
We improve the formatting by removing excessive white space.

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange format. 
It is easy for humans to read and write and for machines to parse and generate. 

$ sudo gem install json

We have to install json gem if we haven't done so before.

main.rb
  

require 'sinatra'
require 'json'

get '/example.json' do
    content_type :json
    { :name =&gt; 'Jane', :age =&gt; 17 }.to_json
end

The Sinatra application sends JSON data. It uses the to_json method 
to do the job.

parse_json.rb
  

#!/usr/bin/ruby

require 'faraday'
require 'json'
 
con = Faraday.new :url =&gt; 'http://localhost:4567/example.json'
  
res = con.get
data = JSON.parse res.body

puts data["name"]
puts data["age"]

The example reads JSON data sent by the Sinatra application.

$ ./parse_json.rb 
Jane
17

This is the output of the example.

Next, we send JSON data to a Sinatra application
from a Ruby script.

main.rb
  

require 'sinatra'
require 'json'

post '/readjson' do
    data = JSON.parse request.body.read
    puts data
    "#{data["name"]} is #{data["age"]} years old"
end

This application reads JSON data and sends back a message with
the parsed values.

post_json.rb
  

#!/usr/bin/ruby

require 'faraday'

con = Faraday.new 

res = con.post do |req|
    req.url 'http://localhost:4567/readjson'
    req.headers['Content-Type'] = 'application/json'
    req.body = '{ "name": "Jane", "age": 17 }'
end

puts res.body

This script sends JSON data to the Sinatra application and 
reads its response.

req.headers['Content-Type'] = 'application/json'

The 'application/json' content type must be specified
in the request.

$ ./post_json.rb 
Jane is 17 years old

This is the output of the example.

## Credentials

The  basic_auth method sets the name and password 
to be used for a realm. A security realm is a mechanism used for protecting 
web application resources.

$ sudo gem install sinatra-basic-auth

For this example, we need to install the sinatra-basic-auth gem.

main.rb
  

require 'sinatra'
require "sinatra/basic_auth"

authorize do |username, password|
    username == "user7" &amp;&amp; password == "7user"
end

get '/' do
    "hello"
end

protect do
    get "/secure" do
        "This is restricted area"
    end
end

In the Sinatra application, we specify the authorization logic and set a 
protected route.

credentials.rb
  

#!/usr/bin/ruby

require 'faraday'

con = Faraday.new :url =&gt; 'http://localhost/secure/'

user = 'user7'
passwd = '7user'

con.basic_auth  user, passwd
res = con.get 

puts res.body

The script connects to the secure webpage; it provides the user name
and the password necessary to access the page.

$ ./credentials.rb 
This is restricted area

With the right credentials, the credentials.rb script returns 
the restricted data.

## Faraday middleware

Middleware is a software that connects two otherwise separate applications. 
In addition to being an HTTP client, Faraday also acts as a middleware. The concept
is very similar to Ruby Rack.

Faraday::Connection contains a list of middlewares. Faraday middlewares 
are passed an env hash that has request and response information. 
The middlewares can manipulate this information before and after a request is executed.

### Redirection

Redirection is the process of forwarding one URL to a different URL. 
The HTTP response status code 302 is used for temporary URL redirection.

Redirection is implemented in one of the Faraday middleware modules.

$ sudo gem install faraday_middleware

These modules are available in the faraday_middleware gem.

main.rb
  

require 'sinatra'

get "/oldpage" do  
    redirect to("/files/newpage.html"), 302
end

In the Sinatra application, we use the redirect command to redirect
to a different location.

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

This is the newpage.html file located in the public/files subdirectory.

redirect.rb
  

#!/usr/bin/ruby

require 'faraday'
require 'faraday_middleware'

con = Faraday.new 'http://localhost:4567/oldpage' do |con|
    con.use FaradayMiddleware::FollowRedirects, limit: 5
    con.adapter Faraday.default_adapter
end

res = con.get
puts res.body

This script accesses the old page and follows the redirect. 

$ ./redirect.rb 
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

This is the output of the example.

127.0.0.1 - - [10/May/2016:22:14:16 +0200] "GET /oldpage HTTP/1.1" 302 - 0.0199
127.0.0.1 - - [10/May/2016:22:14:16 +0200] "GET /files/newpage.html HTTP/1.1" 200 113 0.0073

From the log we see that the request was redirected
to a new file name. The communication consists of two GET messages.

### MyLogger

In the following example, we create our own small middleware. It implements request and
response logging.

main.rb
  

require 'sinatra'

get '/greet' do  
    "Hello #{params[:name]}"
end

This is a Sinatra application which sends a greeting to the client.

logger.rb
  

#!/usr/bin/ruby

require 'faraday'
require 'logger'

class MyLogger
    
    def initialize app
        @app = app
        @logger = Logger.new(STDOUT)
    end

    def call env
        on_request("request", env)
        @app.call(env).on_complete do
            on_response("response", env)
        end
    end

    private
    def on_request phase, env
        @logger.info("#{phase} : #{env.method} - #{env.url}") if env.method and env.url
    end
    
    private
    def on_response phase, env
        @logger.info("#{phase} : #{env.body}") if env.body 
    end    
end

con = Faraday.new(:url =&gt; "http://localhost:4567") do |build|
    build.request :url_encoded
    build.use MyLogger
    build.adapter  Faraday.default_adapter
end

res = con.get "/greet", {'name' =&gt; 'Jan'}

Here we create a middleware that implements logging to the console.

def call env
    on_request("request", env)
    @app.call(env).on_complete do
        on_response("response", env)
    end
end

A middleware must implement the call method. It executes 
a method for a request and for a response.

private
def on_request phase, env
    @logger.info("#{phase} : #{env.method} - #{env.url}") if env.method and env.url
end

Upon generation of a request, the on_request method is called.
The method logs the phase, request method, and URL.

con = Faraday.new(:url =&gt; "http://localhost:4567") do |build|
    build.request :url_encoded
    build.use MyLogger
    build.adapter Faraday.default_adapter
end

The MyLogger middleware is added to the stack with the use
method. When a connection object executes a request, it creates a shared env hash, 
wraps the outer middlewares around each inner middleware, and executes the call method.

res = con.get "/greet", {'name' =&gt; 'Jan'}

A message is sent to the Sinatra application. The request and the response are logged to
the terminal.

$ ./logger.rb 
I, [2016-05-11T14:48:55.700198 #4945]  INFO -- : request : get - http://localhost:4567/greet?name=Jan
I, [2016-05-11T14:48:55.706989 #4945]  INFO -- : response : Hello Jan

This is the output of the example.

In this tutorial, we have worked with the Ruby Faraday module. There are similar
[Ruby HTTPClient tutorial](/web/rubyhttpclient/) and 
[Ruby Net::HTTP tutorial](/web/rubynethttp/) on ZetCode.