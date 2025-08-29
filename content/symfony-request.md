+++
title = "Symfony Request"
date = 2025-08-29T20:12:45.699+01:00
draft = false
description = "Symfony request tutorial shows how to work with request objects in Symfony. We show several ways how to create request objects in Symfony."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony Request

last modified July 12, 2020 

Symfony request tutorial shows how to work with request objects in 
Symfony. We show several ways how to create request objects in Symfony.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework 
for web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. The development of the framework is 
sponsored by a Frech company Sensio Labs.

## Symfony HttpFoundation component

Symfony HttpFoundation component defines an object-oriented layer for the 
HTTP specification. The component represents the request/response
process in an object-oriented manner. On the lowest-level, we have
PHP global variables such as $_GET, $_POST, 
or $_FILES. These are represented by a Request
object. And the response is represented by a Response object.

## Symfony request example

In the following example, we create three different requests using
links. 

$ symfony new symreq

With composer, we create a new Symfony skeleton project.

$ cd symreq

We go to the project directory.

$ composer req annot twig

We install modules annotations and twig.

$ composer req maker --dev

We install the maker component.

$ php bin/console make:controller HomeController

A HomeController is created.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return $this-&gt;render('home/index.html.twig');
    }
}

The HomeController returns a home page that contains
the anchor tags.

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block body %}

&lt;ul&gt;
&lt;li&gt;&lt;a href="/myapp?colour=yellow&amp;day=Saturday"&gt;First request&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;&lt;a href="/myapp2?colour=green&amp;day=Sunday"&gt;Second request&lt;/a&gt;&lt;/li&gt;

&lt;li&gt;&lt;a href="/myapp3?colour=red&amp;day=Monday"&gt;Third request&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;

{% endblock %}

The HomeController returns a home page that contains
three links. Each of the links has two query parameters. They point
to different controller methods.

{% extends 'base.html.twig' %}

The template inherits from the base.html.twig file, which
has base markup that will be shared. 

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;{% block title %}Welcome!{% endblock %}&lt;/title&gt;
        {% block stylesheets %}{% endblock %}
    &lt;/head&gt;
    &lt;body&gt;
        {% block body %}{% endblock %}
    &lt;/body&gt;
&lt;/html&gt;

The base.html.twig template contains code that is shared
by other template files. It defines blocks that will be replaced in
children templates.

$ php bin/console make:controller MyappController

A MyappController is created.

src/Controller/MyappController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MyappController extends AbstractController
{
   /**
     * @Route("/myapp", name="myapp")
     */
    public function process()
    {
        $request = Request::createFromGlobals();
        $col = $request-&gt;query-&gt;get("colour");
        $day = $request-&gt;query-&gt;get("day");

        $content = "Colour: $col, day: $day";

        return new Response($content);
    }

    /**
     * @Route("/myapp2", name="myapp2")
     */
    public function process2()
    {
        $request = new Request(
            $_GET,
            $_POST,
            array(),
            $_COOKIE,
            $_FILES,
            $_SERVER
        );

        $col = $request-&gt;query-&gt;get("colour");
        $day = $request-&gt;query-&gt;get("day");

        $content = "Colour: $col, day: $day";

        return new Response($content);
    }    

    /**
     * @Route("/myapp3", name="myapp3")
     */
    public function process3(Request $request)
    {
        $data = $request-&gt;query-&gt;all();

        $col = $data["colour"];
        $day = $data["day"];

        $content = "Colour: $col, day: $day";

        return new Response($content);        
    }    
}

The MyappController processes the three GET requests 
created by the links.

$request = Request::createFromGlobals();
$col = $request-&gt;query-&gt;get("colour");
$day = $request-&gt;query-&gt;get("day");

The request object is created with Request::createFromGlobals().
The GET parameters are retrieved with the get() method.

$request = new Request(
    $_GET,
    $_POST,
    array(),
    $_COOKIE,
    $_FILES,
    $_SERVER
);

In the second case, the request is created with a new keyword.
It is passed the PHP global variables.

public function process3(Request $request)
{
    $data = $request-&gt;query-&gt;all();
...    

In the third case, the request object is injected using Symfony's
dependency injection. We get all parameters from the 
request with the all() method. 

$col = $data["colour"];
$day = $data["day"];

From the array, we get the values.

$content = "Colour: $col, day: $day";

return new Response($content);  

We build the content and return a Response object.

$ symfony serve

We start the web server and locate to http://localhost:8000.

In this tutorial we have worked with requests in Symfony.

List [all Symfony tutorials](/all/#symfony).