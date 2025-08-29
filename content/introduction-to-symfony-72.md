+++
title = "Introduction to Symfony 7.2"
date = 2025-08-29T20:12:44.553+01:00
draft = false
description = "This is an introductory Symfony tutorial. It presents the Symfony PHP framework and shows how to create simple examples using Symfony 7.2."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to Symfony 7.2

last modified March 3, 2025

This is an introductory Symfony tutorial. It presents the Symfony PHP
framework and shows how to create simple examples using Symfony 7.2.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. Symfony was heavily inspired by the
Spring Framework.

Symfony uses several PHP open-source projects such as 
Doctrine object-relational mapping library, PDO database abstraction
layer, PHPUnit test framework, Twig template engine, and Symfony Mailer
e-mail library.

Symfony has created its own components, including Symfony Dependency
Injector and Symfony YAML parser.

## Symfony CLI

Symfony CLI is a tool for creating and managing Symfony applications 
locally and on the Symfony cloud. It includes a powerful local web server 
to develop applications. You can download the Symfony CLI from the 
[official Symfony website](https://symfony.com/download).

## Setting up Symfony project

To create a Symfony 7.2 project, you need PHP 8.2 or higher
(and related libraries such as php-xml or php-mbstring) and composer.
Project dependencies are written into the composer.json file.

$ symfony new symfirst

With the symfony CLI, we create a new Symfony skeleton project. The
skeleton is a minimal project structure where you can install only the
components you need.

$ cd symfirst

Navigate to the project directory.

## Symfony project structure

The Symfony CLI creates the following directory structure:

$ ls -1ap --group-directories-first
./
../
bin/
config/
public/
src/
templates/
var/
vendor/
.env
.gitignore
composer.json
composer.lock
symfony.lock

The bin directory contains the console tool,
which is a command-line utility to execute various types of commands.
The public directory contains web files, including the
index.php front controller.

Third-party dependencies are stored in the vendor directory. The
config directory contains configuration files. The source code is
written in the src directory. The var directory
contains temporary files, such as caching data.

The .env file contains environment variables, and the
.gitignore file specifies intentionally untracked files to ignore
by Git.

## Installing Symfony project dependencies

Next, we install a few project dependencies.

$ composer require symfony/maker-bundle --dev

We install the Maker bundle, which is used to generate commands, controllers,
form classes, or event subscribers.

$ composer req twig

We install twig for using the Twig template engine.

## Symfony creating controller

A Symfony controller is a PHP function that reads information from the 
Request object and creates and returns a Response 
object. The response could be an HTML page, JSON, XML, a file download, 
a redirect, a 404 error, and so on.

$ php bin/console make:controller HelloController

With the console tool, we create a HelloController.
The controller is created in the src/Controller/ directory.

src/Controller/HelloController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HelloController extends AbstractController
{
    #[Route('/plain', name: 'plain')]
    public function helloPlain(): Response
    {
        return new Response("Hello there", Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']);
    }
}

This is the HelloController. It is located in the 
src/Controller/HelloController.php file.

#[Route('/plain', name: 'plain')]
public function helloPlain(): Response

The #[Route] attribute maps the /plain URL
path to the helloPlain function.

return new Response("Hello there", Response::HTTP_OK,
  ['content-type' =&gt; 'text/plain']);

The function returns a Response object. The constructor takes
the response content, status code, and an array of HTTP headers.

$ symfony serve

Start the local web development server with symfony serve.

$ curl 127.0.0.1:8000/plain
Hello there

Issue a GET request to the /plain route to see the text response.

## Symfony with Twig template

When we installed the Twig bundle, a templates directory was created.
This is where we place our template files, which have the html.twig extension.

src/Controller/HelloController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HelloController extends AbstractController
{
    #[Route('/plain', name: 'plain')]
    public function helloPlain(): Response
    {
        return new Response("Hello there", Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']);
    }

    #[Route('/twig', name: 'twig')]
    public function helloTwig(): Response
    {
        $message = "Hello from Twig";
        return $this-&gt;render('hello/index.html.twig', ["message" =&gt; $message]);
    }
}

We have updated the HelloController.php file to include a new route.
This route renders a Twig template.

#[Route('/twig', name: 'twig')]
public function helloTwig(): Response

The helloTwig function is mapped to the /twig path.

$message = "Hello from Twig";
return $this-&gt;render('hello/index.html.twig', ["message" =&gt; $message]);

Twig renders the hello/index.html.twig file, located in the 
templates directory. The render method
also accepts data, such as the message variable.

templates/hello/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Plain message{% endblock %}

{% block body %}
    {{ message }}
{% endblock %}

This is the Twig template file.

{% extends 'base.html.twig' %}

The template inherits from the base.html.twig file, which
contains the base markup shared across templates.

{{ message }}

The {{ }} syntax outputs the contents of the message variable.

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

The base.html.twig template contains shared code and defines blocks
that can be replaced in child templates.

$ curl 127.0.0.1:8000/twig
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;Plain message&lt;/title&gt;
      &lt;/head&gt;
    &lt;body&gt;
          Hello from Twig
    &lt;/body&gt;
&lt;/html&gt;

This is the HTML output when you connect to the /twig path.

In this tutorial, we introduced the Symfony 7.2 framework and created simple examples.

List [all Symfony tutorials](/all/#symfony).