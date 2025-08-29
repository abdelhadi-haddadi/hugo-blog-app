+++
title = "Ruby Net::HTTP tutorial"
date = 2025-08-29T20:15:50.723+01:00
draft = false
description = "This tutorial introduces the standard Ruby Net::HTTP module to grab data, post data, work with JSON, and connect to a secure web page."
image = ""
imageBig = ""
categories = ["web"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby Net::HTTP tutorial

last modified January 10, 2023

In this tutorial, we show how to work with the standard Ruby Net::HTTP module. We grab data, post
data, work with JSON, and connect to a secure web page. The tutorial uses Sinatra applications 
for several examples. Zetcode has also a concise [Ruby tutorial](/lang/rubytutorial/).

The Hypertext Transfer Protocol (HTTP) is an application protocol for distributed, collaborative,
hypermedia information systems. HTTP is the foundation of data communication for the World Wide Web.

Ruby Net::HTTP provides a rich library which can be used to build HTTP clients. 

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

The first program determines the version of the library.

version.rb
  

#!/usr/bin/ruby

require 'net/http'

puts Net::HTTP::version_1_1?
puts Net::HTTP::version_1_2?

The script determines if net/http is in version 1.1 or 1.2 mode.

$ ./version.rb 
false
true

In our case, the mode is 1.2.

## Getting content

The get_print is a high-level method that gets the body text from 
the target and outputs it to the standard output.

get_content.rb
  

#!/usr/bin/ruby

require 'net/http'

uri = URI 'http://www.something.com/'

Net::HTTP.get_print uri

The script grabs the content of the www.something.com web page.
The net/http is designed to work closely with the uri module.

require 'net/http'

This will also require uri so we do not need to require 
it separately.

$ ./get_content.rb 
&lt;html&gt;&lt;head&gt;&lt;title&gt;Something.&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;Something.&lt;/body&gt;
&lt;/html&gt;

This is the output of the get_content.rb script.

The following program gets a small web page and strips its HTML tags. 

strip_tags.rb
  

#!/usr/bin/ruby

require 'net/http'

uri = URI "http://www.something.com/"

doc = Net::HTTP.get uri

puts doc.gsub %r{&lt;/?[^&gt;]+?&gt;}, ''

The script strips the HTML tags of the www.something.com
web page.

puts doc.gsub %r{&lt;/?[^&gt;]+?&gt;}, ''

A simple regular expression is used to strip the HTML tags.

$ ./strip_tags.rb 
Something.
Something.

The script prints the web page's title and content.

## Status

The code and message methods of the 
response give its status.

status.rb
  

#!/usr/bin/ruby

require 'net/http'

uri = URI 'http://www.something.com'
res = Net::HTTP.get_response uri
puts res.message
puts res.code

uri = URI 'http://www.something.com/news/'
res = Net::HTTP.get_response uri
puts res.message
puts res.code

uri = URI 'http://www.urbandicionary.com/define.php?term=Dog'
res = Net::HTTP.get_response uri
puts res.message
puts res.code

We perform three HTTP requests with the get_response method
and check for the returned status.

uri = URI 'http://www.something.com/news/'
res = Net::HTTP.get_response uri
puts res.message
puts res.code

The status of the HTTP response is checked with the message
and code methods.

$ ./status.rb 
OK
200
Not Found
404
Found
302

200 is a standard response for successful HTTP requests, 404 tells that the requested 
resource could not be found, and 302 tells that the resource was temporarily redirected.

## The head method

The head method retrieves document headers. 
The headers consist of fields, including date, server, content type, 
or last modification time.

head.rb
  

#!/usr/bin/ruby

require 'net/http'

uri = URI "http://www.something.com"
http = Net::HTTP.new uri.host, uri.port

res = http.head '/'

puts res['server']
puts res['date']
puts res['last-modified']
puts res['content-type']
puts res['content-length']

The example prints the server, date, last modification time, content type, and content length 
of the www.something.com web page.

$ ./head.rb 
Apache/2.4.12 (FreeBSD) OpenSSL/1.0.1l-freebsd mod_fastcgi/mod_fastcgi-SNAP-0910052141
Wed, 11 May 2016 19:30:56 GMT
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

require 'net/http'

uri = URI "http://localhost:4567/greet"

params = { :name =&gt; 'Peter' }
uri.query = URI.encode_www_form params

puts Net::HTTP.get uri

The script sends a variable with a value to the Sinatra application. The variable is 
specified directly in the URL.

params = { :name =&gt; 'Peter' }

This is the parameter that we send to the server.

uri.query = URI.encode_www_form params

We encode the parameter into the URL with the encode_www_form method.

puts Net::HTTP.get uri

The get method sends a GET request to the server. It returns the response
which is printed to the console.

$ ./mget.rb 
Hello Peter

This is the output of the example.

127.0.0.1 - - [11/May/2016:21:51:12 +0200] "GET /greet?name=Peter HTTP/1.1" 200 11 0.0280

In this log of the Thin server we can see that the parameter was encoded into the URL.

We can directly put the parameter into the URL string.

mget2.rb
  

#!/usr/bin/ruby

require 'net/http'

uri = URI "http://localhost:4567/greet?name=Peter"

puts Net::HTTP.get uri 

This is another way of issuing the GET message; it is essentially the 
same as the previous example.

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

require 'net/http'

uri = URI "http://localhost:4567"
http = Net::HTTP.new uri.host, uri.port

res = http.get '/agent', {'User-Agent' =&gt; 'Ruby script'}
puts res.body

This script creates a simple GET request to the Sinatra application.

res = http.get '/agent', {'User-Agent' =&gt; 'Ruby script'}

The user agent is specified in the second parameter of the get method.

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

require 'net/http'

uri = URI "http://localhost:4567/target"

params = { :name =&gt; 'Peter' }
res = Net::HTTP.post_form uri, params

puts res.body

The script sends a request with a name key having Peter value.
The POST request is issued with the Net::HTTP.post_form method.

$ ./mpost.rb 
Hello Peter

This is the output of the mpost.rb script.

127.0.0.1 - - [12/May/2016:11:36:16 +0200] "POST /target HTTP/1.1" 200 11 0.0006

With the POST method, the value is not send in the request URL.

## Retrieving definitions from a dictionary

In the following example, we find definitions of a term
on the [www.dictionary.com](http://www.dictionary.com). 
To parse HTML, we use the nokogiri gem. It can be 
installed with the sudo gem install nokogiri command.

get_term.rb
  

#!/usr/bin/ruby

require 'net/http'
require 'nokogiri'

term = 'cat'
uri = URI 'http://www.dictionary.com/browse/'+term

res = Net::HTTP.get uri

doc = Nokogiri::HTML res
doc.css("div.def-content").map do |node|
    s = node.text.strip!
    s.gsub!(/\s{3,}/, " ") unless (s == nil)
    puts s unless (s == nil)
end

In this script, we find the definitions of the term cat on www.dictionary.com.
The Nokogiri::HTML is used to parse the HTML code.

uri = URI 'http://www.dictionary.com/browse/'+term

To perform a search, we append the term at the end of the URL.

doc = Nokogiri::HTML res
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

require 'net/http'
require 'json'
 
uri = URI 'http://localhost:4567/example.json'
res = Net::HTTP.get uri 

data = JSON.parse res

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
    "#{data["name"]} is #{data["age"]} years old"
end

This application reads JSON data and sends back a message with
the parsed values.

post_json.rb
  

#!/usr/bin/ruby

require 'net/http'
require 'json'
 
uri = URI 'http://localhost:4567/readjson'

req = Net::HTTP::Post.new uri.path, initheader = {'Content-Type' =&gt;'application/json'}
req.body = {:name =&gt; 'Jane', :age =&gt; 17}.to_json

res = Net::HTTP.start(uri.hostname, uri.port) do |http|
    http.request req
end

puts res.body

This script sends JSON data to the Sinatra application and 
reads its response.

req = Net::HTTP::Post.new uri.path, initheader = {'Content-Type' =&gt;'application/json'}

The 'application/json' content type must be specified
in the header of the request.

$ ./post_json.rb 
Jane is 17 years old

This is the output of the example.

## Redirection

Redirection is the process of forwarding one URL to a different URL. 
The HTTP response status code 302 is used for temporary URL redirection.

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

require 'net/http'

uri = URI 'http://localhost:4567/oldpage'

res = Net::HTTP.get_response uri
if res.code == "302"
    res = Net::HTTP.get_response URI res.header['location']
end 

puts res.body

This script accesses the old page and follows the redirect. Note that this
works for a single redirection.

res = Net::HTTP.get_response URI res.header['location']

The header's location field contains the address to which the file was redirected.

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

127.0.0.1 - - [12/May/2016:12:51:24 +0200] "GET /oldpage HTTP/1.1" 302 - 0.0006
127.0.0.1 - - [12/May/2016:12:51:24 +0200] "GET /files/newpage.html HTTP/1.1" 200 113 0.0006

From the log we see that the request was redirected to a new file name. The communication 
consists of two GET messages.

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

require 'net/http'

uri = URI 'http://localhost:4567/secure'

req = Net::HTTP::Get.new uri.path 
req.basic_auth 'user7', '7user'

res = Net::HTTP.start uri.hostname, uri.port do |http|
    http.request req
end

puts res.body

The script connects to the secure webpage; it provides the user name
and the password necessary to access the page.

$ ./credentials.rb 
This is restricted area

With the right credentials, the credentials.rb script returns 
the restricted data.

In this tutorial, we have worked with the Ruby net/http module. There are also similar 
[Ruby HTTPClient tutorial](/web/rubyhttpclient/) and 
[Ruby Faraday tutorial](/web/rubyfaraday/) on ZetCode.