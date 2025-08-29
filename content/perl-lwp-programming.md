+++
title = "Perl LWP programming"
date = 2025-08-29T20:04:00.115+01:00
draft = false
description = "Perl LWP tutorial shows how to do WWW programming in Perl with LWP module. We grab data, post data, and connect to secure web pages."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl LWP programming

last modified August 24, 2023

In this article we show how to do WWW programming in Perl with LWP module.

LWP is a set of Perl modules which provides a simple and consistent
application programming interface (API) to the World-Wide Web. The main focus of
the library is to provide classes and functions to write WWW clients. LWP is
short for Library for WWW in Perl.

## LWP::Simple

LWP::Simple is a simple procedural interface to LWP. It contains a
few functions for easy working with web pages. The LWP::Simple
module is handy for simple cases but it does not support more advanced features
such as cookies or authorization.

### The get function

The get function fetches the document identified by the given URL
and returns it. It returns undef if it fails. The $url
argument can be either a string or a reference to a URI object.

simple_get.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::Simple;

my $cont = get('http://webcode.me') or die 'Unable to get page';

say $cont;

The script grabs the content of the http://webcode.me web page.

$ ./simple_get.pl
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

This is the output of the simple_get.pl script.

The following program gets a small web page and strips its HTML tags.

strip_tags.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::Simple;
 
my $cont = get('http://webcode.me');

foreach ($cont) {
    s/&lt;[^&gt;]*&gt;//g;
    print;
}

The script strips the HTML tags of the http://webcode.me
web page.

### The head function

The head function retrieves document headers. On success, it returns
the following five values: the content type, document length, modification time,
expiration time, and server. It returns an empty list if it fails.

head_fun.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::Simple;

my ($content_type, $doc_length, 
    $mod_time, $expires, $server) = head("http://webcode.me");

say "Content type: $content_type";
say "Document length: $doc_length";
say "Modification time: $mod_time";
say "Server: $server";

The example prints the content type, document length, modification time, and
server of the http://webcode.me web page.

$ ./simple_head.pl
Content type: text/html
Document length: 348
Modification time: 1563623365
Server: nginx/1.6.2

### The getstore function

The getstore function retrieves a document identified by a URL and
stores it in the file. The return value is the HTTP response code.

get_store.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::Simple;

my $r = getstore('http://webcode.me', 'webcode.html') 
    or die 'Unable to get page';

say "Response code: $r"; 

The script grabs the contents of the http://webcode.me web page
and stores it in the webcode.html file.

$ ./get_store.pl
Response code: 200
$ cat webcode.html
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

It is possible to check the return code with the is_success
function.

check_return_code.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::Simple;

my $url = 'http://webcode.mee';

my $r = getstore($url, 'webcode.html') 
    or die 'Unable to get page';
    
die "Error $r on $url" unless is_success($r); 

In the example, we intentionally misspell the web page URL.

$ ./check_return_code.pl
Error 500 on http://webcode.mee at ./check_return_code.pl line 11.

## The LWP Class Model

The LWP Class Model contains classes for more complex work with the World-Wide
Web.

The LWP::UserAgent is a class implementing a web user agent. In the
application, we create and configure a LWP::UserAgent object. Then
we create an instance of the HTTP::Request for the request that
needs to be performed. This request is then passed to one of the request methods
of the user agent, which dispatches it using the relevant protocol, and returns
a HTTP::Response object. There are convenience methods for sending
the most common request types: get, head,
post, put, and delete.

### User agent

The LWP::UserAgent is a web user agent class.

$ cpanm Mojolicious::Lite

We install Mojolicious framework.

server.php
  

#!/usr/bin/perl

use Mojolicious::Lite -signatures;

get '/' =&gt; sub ($c) {

    my $ua = $c-&gt;req-&gt;headers-&gt;user_agent;

    $c-&gt;render(text =&gt; $ua);
};

app-&gt;start;

The server processes the client request, determines the user agent, and returns 
the user agent back to the client.

$ perl server.pl daemon
[2021-07-08 13:02:55.63239] [49095] [info] Listening at "http://*:3000"
Web application available at http://127.0.0.1:3000

We start our server; it listens on port 3000.

agent.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::UserAgent;

my $ua = new LWP::UserAgent;
$ua-&gt;agent('Perl script');

my $req = new HTTP::Request 'GET' =&gt; 'http://localhost:3000';
my $res = $ua-&gt;request($req);

if ($res-&gt;is_success) {

    say $res-&gt;content;
} else {

    say $res-&gt;status_line;
}

This script creates a simple GET request to the localhost.

my $ua = new LWP::UserAgent;

An instance of the LWP::UserAgent is created.

$ua-&gt;agent("Perl script");

With the agent method, we set the name of the
agent.

my $req = new HTTP::Request 'GET' =&gt; 'http://localhost:3000';

A GET request to the localhost is created.

my $res = $ua-&gt;request($req);

The request method dispatches the request object. The return value
is a response object.

if ($res-&gt;is_success) {

    say $res-&gt;content;
} else {

    say $res-&gt;status_line;
}

The is_success method checks if the response has a success return
code. The content method returns the raw content. The
status_line the status code and message of the response.

$ ./agent.pl
Perl script

The server responded with the name of the agent that we have sent with the
request.

### The get method

The user agent's get method is a convenience method to execute an
HTTP request. It saves some typing.

get_page.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::UserAgent;
      
my $ua = new LWP::UserAgent;
$ua-&gt;agent("Perl script");

my $res = $ua-&gt;get('http://webcode.me');

if ($res-&gt;is_success) {

    say $res-&gt;content;
} else {

    say $res-&gt;status_line;
}

The script gets the contents of the webcode.me page. We utilize the
convenience get method.

In the following example, we find definitions of a term on the [urbandictionary.com](https://urbandictionary.com).

get_definition.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::UserAgent;
use HTML::TreeBuilder;

my $word = shift || 'dog';

my %parameters = (term =&gt; $word);
my $url = URI-&gt;new('https://www.urbandictionary.com/define.php');
$url-&gt;query_form(%parameters);

my $ua = LWP::UserAgent-&gt;new;
my $res = $ua-&gt;get($url);

my $tree = HTML::TreeBuilder-&gt;new_from_content($res-&gt;decoded_content);
my @meanings = $tree-&gt;look_down(_tag =&gt; q{div}, 'class' =&gt; 'meaning');

foreach my $el (@meanings) {

    say $el-&gt;as_text;
}

die "Error: ", $res-&gt;status_line unless $res-&gt;is_success;

In this script, we find the definitions of the term dog on
urbandictionary.com. We display the definitions from the first
page. The HTML::TreeBuilder is used to parse the HTML code.

### Posting a value

The post method dispatches a POST request on the given
URL, providing the key/value pairs for the fill-in form content.

server2.pl
  

#!/usr/bin/perl

use Mojolicious::Lite -signatures;

post '/' =&gt; sub ($c) {

    my $name = $c-&gt;param('name');

    $c-&gt;render(text =&gt; "Hello $name!");
};

app-&gt;start;

In the handler, we get the name parameter. From the parameter, we build a
message and send it to the client.

post_value.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::UserAgent;

my $ua = LWP::UserAgent-&gt;new;

my $res = $ua-&gt;post('http://localhost:3000/',
    ['name'  =&gt;  'Jan']);

if ($res-&gt;is_success) {

    say $res-&gt;content;
} else {

    say $res-&gt;status_line;
}

The script sends a request with a name key having Jan
value.

$ ./post_value.pl
Hello Jan!

## Credentials

The user agent's credentials method sets the name and password
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

Inside the nginx /etc/nginx/sites-available/default configuration
file, we create a secured page. The name of the realm is "Restricted Area".

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

credentials.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;
use LWP::UserAgent;

my $ua = new LWP::UserAgent;
$ua-&gt;agent("Perl script");

$ua-&gt;credentials('localhost:80', 'Restricted Area', 'user7' =&gt; 's$cret');

my $res = $ua-&gt;get('http://localhost/secure/');

if ($res-&gt;is_success) {

    say $res-&gt;content;
} else {

    say $res-&gt;status_line;
}

The script connects to the secure webpage; it provides the user name
and the password necessary to access the page.

$ ./credentials.pl
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

With the right credentials, the credentials.pl script returns
the secured page.

In this article we have worked with the Perl LWP module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).