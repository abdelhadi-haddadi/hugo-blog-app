+++
title = "Symfony HttpClient"
date = 2025-08-29T20:12:44.581+01:00
draft = false
description = "Symfony HttpClient tutorial shows how to create HTTP requests in Symfony with the HttpClient component."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony HttpClient

last modified July 5, 2020 

Symfony HttpClient tutorial shows how to create HTTP requests in Symfony with
the HttpClient component. The component provides utilities to consume APIs and 
supports synchronous and asynchronous operations.

For more information, read the official 
[The HttpComponent](https://symfony.com/doc/current/components/http_client.html)
documentation.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. Symfony was heavily inspired by the
Spring Framework.

In the examples, we will use the httpbin.org and 
http://jsonplaceholder.typicode.com/ online services.

$ composer require symfony/http-client
$ composer require symfony/var-dumper

We install the HttpClient and the var-dumper components.

## HttpClient GET request

HTTP defines a set of request methods to indicate the desired action to be
performed for a given resource. The GET request is used to request data 
from a specified resource. Requests using GET should only retrieve data 
and should have no other effect on the data.

**Note: ** The purpose and impact of the HTTP methods
is a recommendation; these are not strict rules. This is why we said
earlier that GET method *should* not have effect on data. In 
practice, this is not always followed. 

get_request.php
  

&lt;?php

require('vendor/autoload.php');

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create();
$response = $httpClient-&gt;request('GET', 'http://webcode.me');

$statusCode = $response-&gt;getStatusCode();
echo $statusCode . "\n";

$contentType = $response-&gt;getHeaders()['content-type'][0];
echo $contentType . "\n";

$content = $response-&gt;getContent();
echo $content . "\n";

The example creates the HttpClient and issues a GET request 
to the specified webpage. 

**Note: ** Responses are always asynchronous, so that the call to
the method returns immediately instead of waiting to receive the response.
There are blocking methods such as getStatusCode() and 
getContent(), which wait until the full response contents are received.

$httpClient = HttpClient::create();
$response = $httpClient-&gt;request('GET', 'http://webcode.me');

We create an HttpClient with HttpClient::create().
A GET request is generated with the request() method.

$statusCode = $response-&gt;getStatusCode();
echo $statusCode . "\n";

We get the status code with the getStatusCode() method.

$contentType = $response-&gt;getHeaders()['content-type'][0];
echo $contentType . "\n";

From the headers of the response, we get the content type. 

$content = $response-&gt;getContent();
echo $content . "\n";

Finally, we get the content of the page with the getContent() method.

$ php get_request.php
200
text/html
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

This is the output.

## HttpClient user agent

When we create the HttpClient, we can pass some options, such 
as header values.

user_agent.php
  

&lt;?php

require('vendor/autoload.php');

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create(['headers' =&gt; [
    'User-Agent' =&gt; 'PHP console app',
]]);

$response = $httpClient-&gt;request('GET', 'https://httpbin.org/user-agent');

echo $response-&gt;getContent() . "\n";    

We connect to the httpbin.org website, which is an online tool
for testing HTTP requests &amp; responses.

$httpClient = HttpClient::create(['headers' =&gt; [
    'User-Agent' =&gt; 'PHP console app',
]]);

In the headers array, we add the User-Agent option.

$response = $httpClient-&gt;request('GET', 'https://httpbin.org/user-agent');

We send a GET request to the https://httpbin.org/user-agent URL, which 
returns the user agent option of the request.

## HttpClient toArray()

The toArray() method gets the response body decoded as array, 
typically from a JSON payload.

content_array.php
  

&lt;?php

require('vendor/autoload.php');

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create();

$response = $httpClient-&gt;request('GET', 
        'https://jsonplaceholder.typicode.com/posts/2/');

dump($response-&gt;toArray());

The example issues a GET request to the jsonplaceholder.typicode.com
online service website, which returns the post with Id 2 in JSON format.

dump($response-&gt;toArray());

We dump the output of the toArray() method.

$ php content_array.php
array:4 [
  "userId" =&gt; 1
  "id" =&gt; 2
  "title" =&gt; "qui est esse"
  "body" =&gt; """
    est rerum tempore vitae\n
    sequi sint nihil reprehenderit dolor beatae ea dolores neque\n
    fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n
    qui aperiam non debitis possimus qui neque nisi nulla
    """
]

This is the output.

## HttpClient POST data

A post request is used to send data to the server. The data is in the request
body of the HTTP request.

Post requests are never cached, they do not remain in the browser history, they
cannot be bookmarked and there are no restrictions on the data length.

post_data.php
  

&lt;?php

require('vendor/autoload.php');

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create();

$response = $httpClient-&gt;request('POST', 'https://httpbin.org/post', [
    'body' =&gt; ['msg' =&gt; 'Hello there']
]);

echo $response-&gt;getContent();

In the example, we send a message variable to the specified URL in a POST
request. In the response object, we find the data that were sent in the POST
request.

$ php post_data.php
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "msg": "Hello there"
  },
  ...
}

This is the output.

## HttpClient redirects

URL redirection is the process of forwarding a request from one page to another.
When a web browser attempts to open a URL that has been redirected, a page with
a different URL is opened. There may be multiple redirects for a single URL.

Reasons for using redirects:

  - URL shortening

  - preventing broken links when web pages are moved

  - allowing multiple domain names belonging to the same owner to refer to a single web site

  - privacy protection

  - HTTP to HTTPs transition

  - hostile purposes such as phishing attacks or malware distribution

The HttpClient follows redirects, up to a maximum of 20, when
making a request. The max_redirects attribute is used 
to configure this behavior. Value 0 means not to follow any redirect.

redirect.php
  

&lt;?php

require 'vendor/autoload.php';

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create();

$response = $httpClient-&gt;request('GET', 'https://httpbin.org/redirect/4', [
    'max_redirects' =&gt; 3,
]);

echo $response-&gt;getStatusCode();

We send a GET request to an URL which redirects four times, while setting
the max redirection attribute to three. This means we get 302 redirect status
code. If we increase the max_redirects value, we should get 200.

## HttpClient query parameters

Query parameters are the part of a uniform resource locator (URL) which assigns
values to specified parameters. This is one way of sending data to the
destination server.

http://example.com/api/users?name=John%20Doe&amp;occupation=gardener

The query parameters are specified after the ? character. Multiple 
fields are separated with the &amp;. Special characters, such as spaces, 
are encoded. In the above string, the space is encoded with the %20
value.

Symfony HttpClient automatically encodes values before including them in the
URL.

query_params.php
  

&lt;?php

require('vendor/autoload.php');

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create();

$response = $httpClient-&gt;request('GET', 'https://httpbin.org/get', [

    'query' =&gt; [
        'name' =&gt; 'John Doe',
    ],
]);

echo $response-&gt;getContent();

We send a name field to the https://httpbin.org/get
URL. In the response we get the URL parameters back.

$ php query_params.php
{
  "args": {
    "name": "John Doe"
  },
  "headers": {
    "Accept-Encoding": "deflate, gzip",
    "Host": "httpbin.org",
    "User-Agent": "Symfony HttpClient/Curl"
  },
  ...
}

This is the output.

## Using httpbin's Docker container

The httpbin.org also provides a Docker container for testing.

$ docker run -p 80:80 kennethreitz/httpbin

We run the container.

docker_ex.php
  

&lt;?php

require 'vendor/autoload.php';

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create();

$response = $httpClient-&gt;request('GET', 'http://localhost:80/anything',
    [
        'json' =&gt; ['message' =&gt; 'Hello there'],
    ]);

dump($response-&gt;toArray());

In the example, we connect to the container with the httpbin's service.
The localhost:80/anything returns anything that is passed to
the request.

## HTTP Basic Authentication

HTTP basic authentication is a simple challenge and response mechanism in
which a server requests credentials from a client. The client passes the 
credentials to the server in an Authorization header. 
The authentication information is not encrypted or hashed in any way. It is 
in encoded with Base64 algorithm. Therefore, the HTTP Basic Authentication
is only considered to be secure when used with HTTPS.

HTTP Basic authentication uses standard fields in the HTTP header, removing
the need for handshakes.   

authenticate.php
  

&lt;?php

require('vendor/autoload.php');

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create([
    'auth_basic' =&gt; ['user7', 'passwd']
]);

$response = $httpClient-&gt;request('GET', 
    'https://httpbin.org/basic-auth/user7/passwd');

echo $response-&gt;getStatusCode();

dump($response);

In the example, we use the HTTP Basic authentication. 

$httpClient = HttpClient::create([
    'auth_basic' =&gt; ['user7', 'passwd']
]);

The HTTP Basic Authentication is specified with the auth_basic
option. All requests will use the same credentials.

$response = $httpClient-&gt;request('GET', 
  'https://httpbin.org/basic-auth/user7/passwd');

Do not be confused with the user and password in the URL; this is 
merely for testing in the httpbin's service. 

## HttpClient stream data

Chunked transfer encoding is a streaming data transfer mechanism available since
HTTP 1.1. In chunked transfer encoding, the data stream is divided into a series 
of non-overlapping *chunks*.

The chunks are sent out and received independently of one another. Each chunk is
preceded by its size in bytes.  

In Symfony HttpClient, streaming is done with stream().

streaming.php
  

&lt;?php

require 'vendor/autoload.php';

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create();

$url = 'https://download.freebsd.org/ftp/releases/amd64/amd64/ISO-IMAGES/12.0/FreeBSD-12.0-RELEASE-amd64-mini-memstick.img';
$response = $httpClient-&gt;request('GET', $url, [
    'buffer' =&gt; false,
]);

if (200 !== $response-&gt;getStatusCode()) {
    throw new \Exception('Failed to create a request');
}

$fileHandler = fopen('freebsd-12.0-amd64-mini-memstick.iso', 'w');
foreach ($httpClient-&gt;stream($response) as $chunk) {
    fwrite($fileHandler, $chunk-&gt;getContent());
}

In the example, we download a FreeBSD ISO image.

$response = $httpClient-&gt;request('GET', $url, [
  'buffer' =&gt; false,
]);

We create a GET request to the specified URL; optionally, we can turn off 
memory buffering.

$fileHandler = fopen('freebsd-12.0-amd64-mini-memstick.iso', 'w');
foreach ($httpClient-&gt;stream($response) as $chunk) {
    fwrite($fileHandler, $chunk-&gt;getContent());
}

We get the response contents in chunks and save them in a file.

## Symfony HttClient webapp example

In the following example, we create a Symfony web application, which 
uses the HttpClient to generate a request. We use the 
HttpClientInterface to inject the HttpClient.

The application issues a GET request to the https://jsonplaceholder.typicode.com/users,
which returns ten users.  

$ composer create-project symfony/skeleton symfapp
$ cd symfapp
$ composer require annotations
$ composer require maker server --dev
$ composer require symfony/http-client

We create a new Symfony skeleton application and install some 
dependencies.

config/packages/framework.yaml
  

framework:
...
  http_client:
      max_host_connections: 5
      default_options:
          max_redirects: 3

In the framework.yaml file, we can configure the HttpClient.

$ php bin/console make:controller DataController

We create a new controller.

src/Controller/DataController.php
  

&lt;?php

namespace App\Controller;

use App\Service\UserService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DataController extends AbstractController
{
    /**
     * @Route("/data", name="data")
     */
    public function index(UserService $userService): Response
    {
        $data = $userService-&gt;getUsers();

        return $this-&gt;json($data);
    }
}

The DataController injects the UserService, calls
its getUsers() method to retrieve data. The data returned as 
JSON to the caller.

src/Service/UserService.php
  

&lt;?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class UserService
{
    private $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this-&gt;httpClient = $httpClient;
    }

    public function getUsers(): Array
    {
        $response = $this-&gt;httpClient-&gt;request('GET', 
            'https://jsonplaceholder.typicode.com/users');

        $data = $response-&gt;getContent();

        $decoded = json_decode($data);

        return $decoded;
    }
}

This is the UserService.

public function __construct(HttpClientInterface $httpClient)
{
    $this-&gt;httpClient = $httpClient;
}

We inject the HttpClient with HttpClientInterface.

public function getUsers(): Array
{
    $response = $this-&gt;httpClient-&gt;request('GET', 
        'https://jsonplaceholder.typicode.com/users');

    $data = $response-&gt;getContent();

    $decoded = json_decode($data);

    return $decoded;
}

We generate a GET request, decode the data and return it.

$ php bin/console server:run

We run the application and navigate to localhost:8000/data.

In this tutorial we have worked with the Symfony HttpClient component. 

List [all Symfony tutorials](/all/#symfony).