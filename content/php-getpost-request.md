+++
title = "PHP GET/POST request"
date = 2025-08-29T20:04:25.435+01:00
draft = false
description = "PHP GET/POST request tutorial shows how to generate and process GET and POST requests in PHP. We use plain PHP and Symfony, Slim, and Laravel frameworks."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP GET/POST request

last modified February 16, 2025

PHP GET/POST request tutorial shows how to generate and process GET and POST
requests in PHP. We use plain PHP and Symfony, Slim, and Laravel frameworks.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP protocol is the foundation of data communication for the World Wide Web.

## HTTP GET

The HTTP GET method requests a representation of the specified resource. 

GET requests:

    - should only be used to request a resource

    - parameters are displayed in the URL

    - can be cached

    - remain in the browser history

    - can be bookmarked

    - should never be used when dealing with sensitive data

    - have length limits

## HTTP POST

The HTTP POST method sends data to the server. It is often used when 
uploading a file or when submitting a completed web form.

POST requests:

    - should be used to create a resource

    - parameters are not displayed in the URL

    - are never cached

    - do not remain in the browser history

    - cannot be bookmarked

    - can be used when dealing with sensitive data

    - have no length limits

## PHP $_GET and $_POST

PHP provides the $_GET and $_POST superglobals. 
The $_GET is an associative array of variables passed to the 
current script via the URL parameters (query string). The $_POST
is an associative array of variables passed to the current script via the HTTP
POST method when using application/x-www-form-urlencoded  or 
multipart/form-data as the HTTP Content-Type in the request.

## PHP GET request

In the following example, we generate a GET request with curl tool and process 
the request in plain PHP.

get_req.php
  

&lt;?php

$name = $_GET['name'];

if ($name == null) {
    $name = 'guest';
}

$message = $_GET['message'];

if ($message == null) {
    $message = 'hello there';
}

echo "$name says: $message";

The example retrieves the name and message parameters
from the $_GET variable.

$ php -S localhost:8000 get_req.php

We start the server. 

$ curl 'localhost:8000/?name=Lucia&amp;message=Cau'
Lucia says: Cau
$ curl 'localhost:8000/?name=Lucia'
Lucia says: hello there

We send two GET requests with curl. 

## PHP POST request

In the following example, we generate a POST request with curl tool and process 
the request in plain PHP.

post_req.php
  

&lt;?php

$name = $_POST['name'];

if ($name == null) {
    $name = 'guest';
}

$message = $_POST['message'];

if ($message == null) {
    $message = 'hello there';
}

echo "$name says: $message";

The example retrieves the name and message parameters
from the $_POST variable.

$ php -S localhost:8000 post_req.php

We start the server. 

$ curl -d "name=Lucia&amp;message=Cau" localhost:8000
Lucia says: Cau

We send a POST request with curl. 

## PHP send GET request with Symfony HttpClient

Symfony provides the HttpClient component which enables us to 
create HTTP requests in PHP. 

$ composer req symfony/http-client

    

We install the symfony/http-client component.

send_get_req.php
  

&lt;?php

require('vendor/autoload.php');

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create();
$response = $httpClient-&gt;request('GET', 'http://localhost:8000', [
    'query' =&gt; [
        'name' =&gt; 'Lucia',
        'message' =&gt; 'Cau',
    ]
]);

$content = $response-&gt;getContent();
echo $content . "\n";

The example sends a GET request with two query parameters to 
localhost:8000/get_request.php.

$ php -S localhost:8000 get_req.php

We start the server. 

$ php send_get_req.php 
Lucia says: Cau

We run the send_get_req.php script.

## PHP send POST request with Symfony HttpClient

In the following example, we send a POST request with Symfony HttpClient.

send_post_req.php
  

&lt;?php

require('vendor/autoload.php');

use Symfony\Component\HttpClient\HttpClient;

$httpClient = HttpClient::create();
$response = $httpClient-&gt;request('POST', 'http://localhost:8000', [
    'body' =&gt; [
        'name' =&gt; 'Lucia',
        'message' =&gt; 'Cau',
    ]
]);

$content = $response-&gt;getContent();
echo $content . "\n";

The example sends a POST request with two parameters to 
localhost:8000/post_req.php.

$ php -S localhost:8000 post_req.php

We start the server. 

$ php send_post_req.php 
Lucia says: Cau

We run the send_post_req.php script.

## PHP GET request in Symfony

In the following example, we process a GET request in a Symfony application.

$ symfony new symreq
$ cd symreq

A new application is created.

$ composer req annot
$ composer req maker --dev

We install the annot and maker components.

$ php bin/console make:controller HomeController

We create a new controller.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home", methods={"GET"})
     */
    public function index(Request $request): Response
    {
        $name = $request-&gt;query-&gt;get('name', 'guest');
        $message = $request-&gt;query-&gt;get('message', 'hello there');

        $output = "$name says: $message";

        return new Response($output, Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']);
    }
}

Inside the HomeController's index method, 
we get the query parameters and create a response.

$name = $request-&gt;query-&gt;get('name', 'guest');

The GET parameter is retrieved with $request-&gt;query-&gt;get. 
The second parameter of the method is a default value which is used when no 
value was retrieved.

$ symfony serve

We start the server. 

$ curl 'localhost:8000/?name=Lucia&amp;message=Cau'
Lucia says: Cau

We generate a GET request with curl.

## PHP POST request in Symfony

In the following example, we process a POST request in a Symfony application.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home", methods={"POST"})
     */
    public function index(Request $request): Response
    {
        $name = $request-&gt;request-&gt;get('name', 'guest');
        $message = $request-&gt;request-&gt;get('message', 'hello there');

        $output = "$name says: $message";

        return new Response($output, Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']);
    }
}

We change the controller to process the POST request.

$name = $request-&gt;request-&gt;get('name', 'guest');

The POST parameter is retrieved with $request-&gt;request-&gt;get. 
The second parameter of the method is a default value which is used when no 
value was retrieved.

$ symfony serve

We start the server. 

$ curl -d "name=Lucia" localhost:8000
Lucia says: hello there

We generate a POST request with curl.

## PHP GET request in Slim

In the following example, we are going to process a GET request in the Slim 
framework.

$ composer req slim/slim
$ composer req slim/psr7
$ composer req slim/http

We install slim/slim, slim/psr7, and slim/http
packages.

public/index.php
  

&lt;?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app-&gt;get('/', function (Request $request, Response $response): Response {

    $name = $request-&gt;getQueryParam('name', 'guest');
    $message = $request-&gt;getQueryParam('message', 'hello there');
    $output = "$name says $message";

    $response-&gt;getBody()-&gt;write($output);
    return $response;
});

$app-&gt;run();

We get the parameters and return a response in Slim. 

$name = $request-&gt;getQueryParam('name', 'guest');

The query parameter is retrieved with getQueryParam; the 
second parameter is the default value.

$response-&gt;getBody()-&gt;write($output);

We write the output to the response body with write.

$ php -S localhost:8000 -t public

We start the server.

$ curl 'localhost:8000/?name=Lucia&amp;message=Cau'
Lucia says: Cau

We generate a GET request with curl.

## PHP POST request in Slim

In the following example, we are going to process a POST request in the Slim 
framework.

public/index.php
  

&lt;?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app-&gt;post('/', function (Request $request, Response $response): Response {

    $data = $request-&gt;getParsedBody();
    
    $name = $data['name'];
    $message = $data['message'];

    if ($name == null) {
        $name = 'guest';
    }

    if ($message == null) {
        $message = 'hello there';
    }
    
    $output = "$name says: $message";

    $response-&gt;getBody()-&gt;write($output);
    return $response;
});

$app-&gt;run();

We get the POST parameters and return a response in Slim. 

$data = $request-&gt;getParsedBody();

The POST parameters are retrieved with getParsedBody.

$ php -S localhost:8000 -t public

We start the server.

$ curl -d "name=Lucia" localhost:8000
Lucia says: hello there

We generate a POST request with curl.

## PHP GET request in Laravel

In the following example, we process a GET request in Laravel.

$ laravel new larareq
$ cd larareq

We create a new Laravel application.

routes/web.php
  

&lt;?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function (Request $request) {
    
    $name = $request-&gt;query('name', 'guest');
    $message = $request-&gt;query('message', 'hello there');
    $output = "$name says $message";

    return $output;
});

We get the GET parameters and create a response. 

$ php artisan serve

We start the server.

$ curl 'localhost:8000/?name=Lucia&amp;message=Cau'
Lucia says Cau

We send a GET request with curl.

## PHP POST request in Laravel

In the following example, we send a POST request from an HTML form.

resources/views/home.blade.php
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;meta charset="utf-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;style&gt;
            .alert { color: red}
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        @if ($errors-&gt;any())
        &lt;div class="alert"&gt;
            &lt;ul&gt;
                @foreach ($errors-&gt;all() as $error)
                    &lt;li&gt;{{ $error }}&lt;/li&gt;
                @endforeach
            &lt;/ul&gt;
        &lt;/div&gt;
        @endif
         &lt;form action="process_form" method="post"&gt;
            @csrf
            &lt;label for="name"&gt;Name&lt;/label&gt; &lt;input id="name" 
                value="{{old('name')}}"type="text" name="name"&gt;
            &lt;label for="message"&gt;Message&lt;/label&gt; &lt;input id="message" 
                value="{{old('message')}}" type="text" name="message"&gt;
            &lt;button type="submit"&gt;Submit&lt;/button&gt;
        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;

We have a POST form in a Blade template. Laravel requires CSRF protection for 
POST requests. We enable CSRF protection with @csrf.

routes/web.php
  

&lt;?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('home');
});

Route::post('/process_form', function (Request $request) {

    $request-&gt;validate([
        'name'  =&gt;  'required|min:2',
        'message' =&gt;  'required|min:3'
    ]);
    
    $name = $request-&gt;input('name');
    $message = $request-&gt;input('message');
    
    $output = "$name says: $message";

    return $output;
});

We validate and retrieve the POST parameters and send them in the response.
This example should be tested in a browser.

## Source

[PHP language reference](https://www.php.net/manual/en/langref.php)

In this article we have worked with GET and POST requests in plain PHP,
Symfony, Slim, and Laravel.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.