+++
title = "Symfony Route Attribute"
date = 2025-08-29T20:12:46.818+01:00
draft = false
description = "Symfony Route attribute tutorial shows how to create routes with attributes in Symfony 7.2."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony Route Attribute

last modified March 3, 2025 

Symfony Route attribute tutorial shows how to create routes with 
Route attributes in Symfony 7.2.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. Fabien Potencier
is the original author of Symfony. Symfony was heavily inspired by the Spring
Framework.

## Route attribute

A *route* is a map from a URL path to a controller. For instance, 
the /about URL is mapped to the MyController's
about method.

The #[Route] attribute is the modern way to create routes in PHP 8+
and Symfony 7.2. It replaces the older @Route annotation syntax and
provides better IDE support and type safety. Other options are still available
like XML and YAML configuration files.

## Symfony Route example

In the following example, we use various options of #[Route].

$ composer create-project symfony/skeleton routeattr "^7.2"
$ cd routeattr

With composer, we create a new Symfony 7.2 skeleton project.
We navigate to the project directory.

$ composer require symfony/maker-bundle --dev

We install the maker-bundle. Note that route attributes are built-in
to Symfony 7.2 and don't require a separate annotations package.

$ php bin/console make:controller MyController

A MyController is created.

src/Controller/MyController.php
  

&lt;?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MyController extends AbstractController
{
    #[Route(path: '/home', name: 'my_home')]
    public function home(): Response
    {
        return new Response('home', Response::HTTP_OK, ['content-type' =&gt; 'text/plain']);
    }

    #[Route(path: '/about', name: 'my_about', methods: ['GET', 'POST'])]
    public function about(Request $request): Response
    {
        $method = $request-&gt;getMethod();
        $msg = "about: $method";

        return new Response($msg, Response::HTTP_OK, ['content-type' =&gt; 'text/plain']);
    }

    #[Route(path: '/news/{id}', name: 'my_news', requirements: ['id' =&gt; '\d+'])]
    public function news(int $id): Response
    {
        $msg = "News $id";

        return new Response($msg, Response::HTTP_OK, ['content-type' =&gt; 'text/plain']);
    }
}

MyController has three routes created with #[Route].

#[Route(path: '/home', name: 'my_home')]
public function home(): Response
{
    return new Response('home', Response::HTTP_OK, ['content-type' =&gt; 'text/plain']);
}

Here we map the /home path to the home() method using
the modern attribute syntax with named parameters.

#[Route(path: '/about', name: 'my_about', methods: ['GET', 'POST'])]
public function about(Request $request): Response
{
    $method = $request-&gt;getMethod();
    $msg = "about: $method";

    return new Response($msg, Response::HTTP_OK, ['content-type' =&gt; 'text/plain']);
}

With the methods option, we restrict the requests to GET and POST.

#[Route(path: '/news/{id}', name: 'my_news', requirements: ['id' =&gt; '\d+'])]
public function news(int $id): Response
{
    $msg = "News $id";

    return new Response($msg, Response::HTTP_OK, ['content-type' =&gt; 'text/plain']);
}

With the requirements option and type hinting, we ensure
id is an integer. The attribute syntax uses named parameters for
clarity.

It is also possible to place the Route attribute on the controller class as a
prefix.

$ php bin/console make:controller TestController

We create a new controller.

src/Controller/TestController.php
  

&lt;?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route(path: '/test', name: 'test_')]
class TestController extends AbstractController
{
    #[Route(path: '/car', name: 'car')]
    public function car(): Response
    {
        $msg = 'Testing car';

        return new Response($msg, Response::HTTP_OK, ['content-type' =&gt; 'text/plain']);
    }

    #[Route(path: '/book', name: 'book')]
    public function book(): Response
    {
        $msg = 'Testing book';

        return new Response($msg, Response::HTTP_OK, ['content-type' =&gt; 'text/plain']);
    }
}

The TestController uses #[Route] at class level with a
name prefix. URL paths become /test/car and /test/book
with route names test_car and test_book.

$ php bin/console debug:router
--------------- ---------- -------- ------ ------------
Name            Method     Scheme   Host   Path
--------------- ---------- -------- ------ ------------
my_home         ANY        ANY      ANY    /home
my_about        GET|POST   ANY      ANY    /about
my_news         ANY        ANY      ANY    /news/{id}
test_car        ANY        ANY      ANY    /test/car
test_book       ANY        ANY      ANY    /test/book
--------------- ---------- -------- ------ ------------

We can list the created routes with bin/console debug:router
command.

### Running the example

We start the server and test the created routes with the curl tool.

$ php bin/console server:start

We start the development server.

$ curl localhost:8000/home
home
$ curl -X POST localhost:8000/about
about: POST
$ curl localhost:8000/news/34
News 34
$ curl localhost:8000/test/car
Testing car
$ curl localhost:8000/test/book
Testing book

We generate requests with curl.

In this tutorial we have created routes in Symfony 7.2 using the modern
#[Route] attribute syntax with strict typing.

List [all Symfony tutorials](/all/#symfony).