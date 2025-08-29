+++
title = "Symfony AssetMapper Tutorial"
date = 2025-08-29T20:12:40.087+01:00
draft = false
description = "Symfony AssetMapper tutorial shows how to manage front-end assets in Symfony 7.2 using AssetMapper."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony AssetMapper Tutorial

last modified March 3, 2025 

Symfony AssetMapper tutorial shows how to manage front-end assets in Symfony 7.2
using AssetMapper. AssetMapper simplifies asset management by leveraging native
browser features like ES modules.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. Fabien Potencier
is the original author of Symfony. Symfony was heavily inspired by the Spring
Framework.

## AssetMapper

AssetMapper is a Symfony component that simplifies front-end asset
management. It eliminates the need for build tools like Webpack by using native
browser features such as ES modules. Assets are served directly to the browser,
making development faster and simpler.

## Setting up the project

We start by creating a new Symfony project and installing the necessary
dependencies.

$ composer create-project symfony/skeleton symfony-assetmapper "^7.2"
$ cd symfony-assetmapper

We create a new Symfony 7.2 project and navigate to the project directory.

$ composer require symfony/asset-mapper

We install the AssetMapper component.

## Configuring AssetMapper

AssetMapper is configured in the config/packages/asset_mapper.yaml
file. By default, it looks for assets in the assets/ directory.

config/packages/asset_mapper.yaml
  

framework:
    asset_mapper:
        paths:
            - assets/

This configuration tells AssetMapper to look for assets in the assets/
directory.

## Adding Assets

We create a simple CSS file and a JavaScript file in the assets/
directory.

assets/styles/app.css
  

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
}

This is a simple CSS file for styling the application.

assets/app.js
  

console.log('Hello from AssetMapper!');

This is a simple JavaScript file that logs a message to the console.

## Using Assets in Twig

We create a Twig template to include the CSS and JavaScript files.

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;{% block title %}Welcome!{% endblock %}&lt;/title&gt;
        &lt;link rel="stylesheet" href="{{ asset('styles/app.css') }}"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        {% block body %}{% endblock %}
        &lt;script type="module" src="{{ asset('app.js') }}"&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;

The asset() function is used to include the CSS and JavaScript files.
The type="module" attribute is added to the script tag to enable
ES modules.

## Creating a Controller

We create a controller to render the Twig template.

$ php bin/console make:controller HomeController

We generate a HomeController.

src/Controller/HomeController.php
  

&lt;?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this-&gt;render('home/index.html.twig');
    }
}

The HomeController renders the home/index.html.twig
template.

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home{% endblock %}

{% block body %}
&lt;h1&gt;Welcome to Symfony AssetMapper!&lt;/h1&gt;
{% endblock %}

The index.html.twig template extends the base template and displays
a welcome message.

## Running the Application

We start the Symfony development server and test the application.

$ php bin/console server:start

We start the development server.

$ curl localhost:8000

We visit the home page in a browser. The CSS styles are applied, and the
JavaScript message is logged to the console.

## Adding Images

We add an image to the assets/images/ directory and include it in
the Twig template.

assets/images/logo.png
  

(Place your logo.png file here)

This is a sample logo image.

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home{% endblock %}

{% block body %}
&lt;h1&gt;Welcome to Symfony AssetMapper!&lt;/h1&gt;
&lt;img src="{{ asset('images/logo.png') }}" alt="Logo"&gt;
{% endblock %}

The asset() function is used to include the image.

## Advanced Configuration

AssetMapper supports advanced configurations, such as:
- Versioning assets for cache busting.
- Importing third-party libraries using npm or CDN.
- Using preprocessors like Sass or TypeScript.

config/packages/asset_mapper.yaml
  

framework:
    asset_mapper:
        paths:
            - assets/
        versioning: true

This configuration enables versioning for assets.

In this tutorial, we used Symfony AssetMapper to manage front-end assets in
Symfony 7.2. We configured AssetMapper, added CSS, JavaScript, and images, and
used them in Twig templates.

List [all Symfony tutorials](/all/#symfony).