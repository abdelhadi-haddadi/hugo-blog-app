+++
title = "Ruby HTTPClient"
date = 2025-08-29T20:11:22.880+01:00
draft = false
description = "This tutorial introduces the Ruby HTTPClient module. We grab data, post data, work with cookies, and connect to secure web pages."
image = ""
imageBig = ""
categories = ["ruby"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Ruby HTTPClient

last modified October 18, 2023

In this article we show how to work with the Ruby HTTPClient module. We grab
data, post data, work with cookies, and connect to secure web pages. ZetCode has
also a concise [Ruby tutorial](/lang/rubytutorial/).

The Hypertext Transfer Protocol (HTTP) is an application
protocol for distributed, collaborative, hypermedia information systems. HTTP is
the foundation of data communication for the World Wide Web.

Ruby HTTPClient provides methods for accessing Web resources via
HTTP.The gem was created by Hiroshi NAKAMURA.

$ sudo gem install httpclient

The module is installed with the sudo gem install httpclient command.

## Ruby HTTPClient version

The first program prints the version of the library and of the Ruby language.

version.rb
  

#!/usr/bin/ruby

require 'httpclient'

puts HTTPClient::LIB_NAME
puts HTTPClient::RUBY_VERSION_STRING
puts HTTPClient::VERSION

These three constants provide the library and Ruby version numbers.

$ ./version.rb 
(2.8.3, ruby 2.7.2 (2020-10-01))
ruby 2.7.2 (2020-10-01)
2.8.3

This is a sample output of the example.

## Ruby HTTPClient get_content function

The get_content is a high-level method for fetching documents 
identified by the given URL.

get_content.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new
cont = client.get_content 'http://webcode.me'

puts cont

The script grabs the content of the webcode.me web page.

cont = client.get_content 'http://webcode.me'

The get_content method returns the result as one string.

$ ./get_content.rb 
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

This is the output of the get_content.rb script.

The following program gets a small web page and strips its HTML tags. 

strip_tags.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new

client.get_content('http://webcode.me') do |chunk|
    puts chunk.gsub(%r{&lt;/?[^&gt;]+?&gt;}, '')
end

The script strips the HTML tags of the webcode.me web page.

client.get_content('http://webcode.me') do |chunk|
    puts chunk.gsub(%r{&lt;/?[^&gt;]+?&gt;}, '')
end

A simple regular expression is used to strip the HTML tags.
In this context the get_content method returns the content
in chunks of strings.

## Ruby HTTPClient Request

An HTTP request is a message send from the client to the browser to
retrieve some information or to make some action. 

HTTPClient's request method creates a new request.
Note that the HTTPClient class has methods, such as get, 
post, or put, which save some typing for us.

create_request.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new
method = 'GET'
url = URI.parse 'http://webcode.me'

res = client.request method, url
puts res.body

The example creates a GET request and sends it to http://webcode.me.

method = 'GET'
url = URI.parse 'http://webcode.me'

We create a request method and URL.

res = client.request method, url

A request is made with the request method.

puts res.body

The body attribute of the message response contains
the body of the message.

## Ruby HTTPClient status

HTTP::Message represents an HTTP request or response.
Its status method returns HTTP status code of the response.

status.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new

res = client.get 'http://webcode.me'
puts res.status
puts HTTP::Status::successful? res.status

res = client.get 'http://webcode.me/news/'
puts res.status
puts HTTP::Status::successful? res.status

We perform three HTTP requests with the get method and check for
the returned status.

puts HTTP::Status::successful? res.status

The HTTP::Status::successful? method tells whether the status code
was successful.

$ ./status.rb 
200
true
404
false

200 is a standard response for successful HTTP requests, 404 tells that the
requested resource could not be found.

## The head method

The head method retrieves document headers. 
The headers consist of fields, including date, server, content type, 
or last modification time.

head.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new

res = client.head 'http://webcode.me'

puts "Server: " + res.header['Server'][0]
puts "Last modified: " + res.header['Last-Modified'][0]
puts "Content type: " + res.header['Content-Type'][0]
puts "Content length: " + res.header['Content-Length'][0]

The example prints the server, last modification time, content type, and content
length of the http://webcode.me web page.

$ ./head.rb 
Server: nginx/1.6.2
Last modified: Sat, 20 Jul 2019 11:49:25 GMT
Content type: text/html
Content length: 348

This is the output of the head.rb program.

## The get method

The get method issues a GET request to the server. The GET method
requests a representation of the specified resource.

public/greet.php
  

&lt;?php

echo "Hello " . htmlspecialchars($_GET['name']);

The greet.php returns the value of the name variable,
which was retrieved from the client. The htmlspecialchars function
converts special characters to HTML entities; e.g. &amp; to &amp;amp.

mget.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new

res = client.get 'http://localhost:8000/greet.php?name=Jan'

puts res.body

The script sends a variable with a value to the PHP script
on the server. The variable is specified directly in the URL.

$ php -S localhost:8000 -t public

We start the built-in web server.

$ ./mget.rb 
Hello Jan

This is the output of the example.

The get method takes a second parameter where we can specify the
query parameters.

mget2.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new

query = {'name' =&gt; 'Jan'}
res = client.get 'http://localhost:8000/greet.php', query

puts res.body

The example is essentially the same as the previous one.

$ ./mget2.rb 
Hello Jan

This is the output of the example.

## Ruby HTTPClient redirect

Redirection is the process of forwarding one URL to a different URL. The HTTP
response status code 301 Moved Permanently is used for permanent URL
redirection.

In the following example, we use nginx web server.

location = /oldpage.html {
        return 301 /newpage.html;
}

Add these lines to the nginx configuration file, which is located at 
/etc/nginx/sites-available/default on Debian.

$ sudo service nginx restart

After the file has been edited, we must restart nginx to apply the 
changes.

/var/www/html/newpage.html
  

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

This is the newpage.html file located in the nginx document root.

redirect.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new

res = client.get 'http://localhost/oldpage.html', :follow_redirect =&gt; true
puts res.body

This script accesses the old page and follows the redirect. 

res = client.get 'http://localhost/oldpage.html', :follow_redirect =&gt; true

The :follow_redirect option is used to follow the redirects.

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

$ sudo tail -2 /var/log/nginx/access.log
::1 - - [16/Nov/2020:14:45:28 +0100] "GET /oldpage.html HTTP/1.1" 301 169 "-" 
    "HTTPClient/1.0 (2.8.3, ruby 2.7.2 (2020-10-01))"
::1 - - [16/Nov/2020:14:45:28 +0100] "GET /newpage.html HTTP/1.1" 200 122 "-" 
    "HTTPClient/1.0 (2.8.3, ruby 2.7.2 (2020-10-01))"

As we can see from the access.log file, the request was redirected
to a new file name. The communication consisted of two GET messages.

## Ruby HTTPClient User agent

In this section, we specify the name of the user agent.

public/user_agent.php
  

&lt;?php 

echo $_SERVER['HTTP_USER_AGENT'];

Inside the nginx document root, we have this simple PHP file.
It returns the name of the user agent. 

agent.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new default_header: {"User-Agent" =&gt; "Ruby script"}

res = client.get 'http://localhost:8000/user_agent.php'
puts res.body

This script creates a simple GET request to the agent.php 
script.

client = HTTPClient.new default_header: {"User-Agent" =&gt; "Ruby script"}

In the constructor of the HTTPClient, we specify the 
user agent.

$ ./agent.rb 
Ruby script

The server responded with the name of the agent that we have sent with the
request.

## Ruby HTTPClient post value

The post method dispatches a POST request on the given 
URL, providing the key/value pairs for the fill-in form content.

public/target.php
  

&lt;?php

echo "Hello " . htmlspecialchars($_POST['name']);

On our local web server, we have this target.php file. It simply
prints the posted value back to the client. 

post_value.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new

query = {"name" =&gt; "Jan"}
res = client.post 'http://localhost:8000/target.php', query

puts res.body

The script sends a request with a name key having Jan value.
The POST request is issued with the post method.

$ ./post_value.rb 
Hello Jan

This is the output.

$ sudo tail -1 /var/log/nginx/access.log
::1 - - [16/Nov/2020:14:45:28 +0100] "GET /newpage.html HTTP/1.1" 200 122 "-" 
    "HTTPClient/1.0 (2.8.3, ruby 2.7.2 (2020-10-01))"

With the POST method, the value is not send in the request URL.

## Ruby HTTPClient cookies

An HTTP cookie is a small piece of data sent from a website and
stored in the user's web browser or program data subfolder while the user is
browsing. When the user accesses a web page, the browser/program sends the
cookie back to the server to notify the user's previous activity. Cookies have
expiration dates during which they are valid.

When receiving an HTTP request, a server can send a Set-Cookie
header with the response. Afterward, the cookie value is sent along with every
request made to the same server in the form of a Cookie HTTP header. 

public/cookies.php
  

&lt;?php

$theme = $_COOKIE['theme'];

if (isset($theme)) {

    echo "Your theme is $theme";
} else {

    echo "You are using default theme";
    setcookie('theme', 'black-and-white', time() + (86400 * 7));
}

This PHP file reads a cookie. If the cookie does not exist, it is created.
The cookie stores a theme for a user.

send_cookie.rb
  

#!/usr/bin/ruby

require 'httpclient'

url = URI.parse "http://localhost:8000/cookies.php"

cookie = WebAgent::Cookie.new
cookie.name = "theme"
cookie.value = "green-and-black"
cookie.url = url

client = HTTPClient.new
client.cookie_manager.add cookie

res = client.get url
puts res.body

We create a custom cookie and send it to the cookies.php page.

cookie = WebAgent::Cookie.new
cookie.name = "theme"
cookie.value = "green-and-black"
cookie.url = url

A cookie is created with the WebAgent::Cookie class.

client = HTTPClient.new
client.cookie_manager.add cookie

The cookie is added to the cookie manager.

$ ./send_cookie.rb 
Your theme is green-and-black

This is the output of the example.

Next, we are going to read a cookie and store it locally in a file.

read_cookie.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new

res = client.get 'http://localhost:8000/cookies.php'

client.set_cookie_store 'cookie.dat'
p res.header["Set-Cookie"]

client.save_cookie_store

This script reads a cookie from the PHP file and stores it
locally in the cookie.dat file.

Finally, we read the stored cookie and send it to the same PHP file.

send_cookie2.rb
  

#!/usr/bin/ruby

require 'httpclient'

client = HTTPClient.new

cm = HTTPClient::CookieManager.new 'cookie.dat'
cm.load_cookies
client.cookie_manager = cm

res = client.get 'http://localhost/cookies.php'
p res.body

The HTTPClient::CookieManager is used to read
the cookie.

$ ./send_cookie.rb 
Unknown key: Max-Age = 604800
"You are using default theme"
$ ./read_cookie.rb 
Unknown key: Max-Age = 604800
["theme=black-and-white; expires=Sun, 15-May-2016 16:00:08 GMT; Max-Age=604800"]
$ ./send_cookie.rb 
"Your theme is black-and-white"

We run the scripts. The warning message [should be ignored](https://github.com/nahi/httpclient/issues/242) 
according to the author.

## Ruby HTTPClient credentials

The client's set_auth method sets the name and password 
to be used for a realm. A security realm is a mechanism used for protecting 
web application resources.

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

/var/www/html/secure/index.html
  

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

Inside the /var/www/html/secure/ directory, we have this HTML file.

credentials.rb
  

#!/usr/bin/ruby

require 'httpclient'

user = 'user7'
passwd = '7user'

client = HTTPClient.new
client.set_auth 'http://localhost/secure/', user, passwd
cont = client.get_content 'http://localhost/secure/'

puts cont

The script connects to the secure webpage; it provides the user name
and the password necessary to access the page.

$ ./credentials.rb 
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

With the right credentials, we get the secured page.

In this article we have worked with the Ruby HTTPClient module. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.