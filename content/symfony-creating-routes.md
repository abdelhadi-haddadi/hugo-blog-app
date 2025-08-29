+++
title = "Symfony creating routes"
date = 2025-08-29T20:12:41.206+01:00
draft = false
description = "Symfony create routes tutorial shows how to create routes in Symfony with annotations, XML, YAML and PHP."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony creating routes

last modified July 5, 2020 

Symfony creating routes tutorial shows how to create routes in Symfony with annotations, XML, YAML and PHP.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework 
for web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. Symfony was heavily inspired by the Spring Framework.

## Routes

A *route* is a map from a URL path to a controller. For instance, 
the /about URL is mapped to the MyController's
about() method.

Symfony allows to create routes with annotations, XML, YAML, and PHP.    

## Symfony creating routes example

In the following example, we create routes in different ways.

$ composer create-project symfony/skeleton createroutes

With composer, we create a new Symfony skeleton project.

$ cd createroutes

We go to the project directory.

$ composer require maker
$ composer require annotations

We install two modules: annotations and maker.

$ composer require server --dev

We install the development web server.

$ php bin/console make:controller MyController

A MyController is created.

src/Controller/MyController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MyController extends AbstractController
{
    /**
     * @Route("/about", name="about")
     */
    public function about()
    {
        return new Response("This is About page", Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']);
    }

    public function index()
    {
        return new Response("This is Index page", Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']);
    }

    public function news()
    {
        return new Response("This is News page", Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']);
    }    

    public function contacts()
    {
        return new Response("This is Contacts page", Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']);
    }     
}

The MyController has four routes created with annotation, XML, YAML, 
and PHP. Each of the routes returns simple text.

/**
* @Route("/about", name="about")
*/
public function about()
{
    return new Response("This is About page", Response::HTTP_OK,
        ['content-type' =&gt; 'text/plain']);
}

The about route is mapped with the @Route annotation.

config/routes.yaml
  

index:
    path: /
    controller: App\Controller\MyController::index

The index route is mapped in YAML configuration file.

config/routes.xml
  

&lt;?xml version="1.0" encoding="UTF-8" ?&gt;
&lt;routes xmlns="http://symfony.com/schema/routing"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://symfony.com/schema/routing
        http://symfony.com/schema/routing/routing-1.0.xsd"&gt;

    &lt;route id="contacts" controller="App\Controller\MyController::contacts" path="/contacts" &gt;
    &lt;/route&gt;
&lt;/routes&gt;

The contacts route is mapped in XML configuration file.

config/routes.php
  

&lt;?php

use App\Controller\MyController;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

$routes = new RouteCollection();
$routes-&gt;add('news', new Route('/news', [
    '_controller' =&gt; [MyController::class, 'news']
]));

return $routes;

The news route is created with PHP code.

$ php bin/console server:run

We start the development server.

$ curl localhost:8000/about
This is About page
$ curl localhost:8000/news
This is News page
$ curl localhost:8000/
This is Index page
$ curl localhost:8000/contacts
This is Contacts page

We generate requests with curl.

In this tutorial we have created routes in Symfony using annotation, XML, YAML configuration and 
PHP code.

List [all Symfony](/all/#symfony) tutorials.