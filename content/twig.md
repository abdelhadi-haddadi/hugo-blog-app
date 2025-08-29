+++
title = "Twig"
date = 2025-08-29T20:04:49.794+01:00
draft = false
description = "Twig tutorial shows how to use Twig template engine in PHP applications. A template engine is used to combine templates with a data model to produce documents."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Twig

last modified February 16, 2025

Twig tutorial shows how to use Twig template engine in PHP applications to 
generate documents.

## Twig

Twig is a PHP template engine. It was created by Symfony developers.
Twig files have the extension of .html.twig; they are a mix of 
static data such as HTML and Twig constructs.

Twig uses the double curly brace delimiters {{ }} for output
and the curly brace percentage delimiters {% %} for logic.
The {# #} are used for comments.

&lt;ul&gt;
    {% for word in words %}
        &lt;li&gt;{{ word }}&lt;/li&gt;
    {% endfor %}
&lt;/ul&gt;

This code is a sample Twig syntax. In this code, we use for
tag to crate a loop.

Twig syntax consists of tags, filters, functions, operators, and tests. 

## Setting up Twig

First, we set up Twig.

$ composer require twig/twig

We install Twig with composer.

$ mkdir templates

We will place our template files into the template
directory.

require __DIR__ . '/vendor/autoload.php';

We need to add the autoload.php file to our scripts.

## Template engine

A template engine or template processor is a library designed to combine
templates with a data model to produce documents. Template engines are often
used to generate large amounts of emails, in source code preprocessing or
producing dynamic HTML pages.

We create a template engine, where we define static parts and dynamic parts. The
dynamic parts are later replaced with data. The rendering function later
combines the templates with data. 

## Twig first example

The following is a simple demonstration of the Twig template system.    

first.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

echo $twig-&gt;render('first.html.twig', ['name' =&gt; 'John Doe', 
    'occupation' =&gt; 'gardener']);

We used FilesystemLoader to load templates from the specified directory.

echo $twig-&gt;render('first.html.twig', ['name' =&gt; 'John Doe', 
    'occupation' =&gt; 'gardener']);

The output is generated with render. It takes two parameters:
the template file and the data.

templates/first.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;p&gt;
        {{ name }} is a {{ occupation }}
    &lt;/p&gt;

&lt;/body&gt;

&lt;/html&gt;

This is the template file. The variables are output with {{}} syntax.

$ php first.php
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;p&gt;
        John Doe is a gardener
    &lt;/p&gt;

&lt;/body&gt;

&lt;/html&gt;

## Twig filters

Filters allow us to modify data in various ways.    

filters.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

$words = ['sky', 'mountain', 'falcon', 'forest', 'rock', 'blue'];
$sentence = 'today is a windy day';

echo $twig-&gt;render('filters.html.twig', 
    ['words' =&gt; $words, 'sentence' =&gt; $sentence]);

In the example, we have an array and a string as template data.

templates/filters.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Filters&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;p&gt;
     The array has {{ words | length }} elements
    &lt;/p&gt;

    &lt;p&gt;
     Joined array elements: {{ words | join(',') }} 
    &lt;/p&gt;    

    &lt;p&gt;
     {{ sentence | title }} 
    &lt;/p&gt;        

&lt;/body&gt;

&lt;/html&gt;

Filters are applied with the | character. The example counts 
words with length, joins array elements with join
and modifies characters with title.

## Twig custom filters

We can create custom filters with Twig_Filter.  

customfilter.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);
$twig-&gt;addFilter(new Twig_Filter('accFirst', 'accFirst'));

$sentence = 'šumivé víno';

echo $twig-&gt;render('customfilter.html.twig',
    ['sentence' =&gt; $sentence]);

function accFirst($value, $encoding = 'UTF8')
{
    $strlen = mb_strlen($value, $encoding);
    $firstChar = mb_substr($value, 0, 1, $encoding);
    $rest = mb_substr($value, 1, $strlen - 1, $encoding);

    return mb_strtoupper($firstChar, $encoding) . $rest;
}

We add a new filter called accFirst. It modifies only 
the first letter and also handles accents.

templates/customfilter.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Custom filter&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;  

    &lt;p&gt;
     {{ sentence | accFirst }} 
    &lt;/p&gt;      

&lt;/body&gt;

&lt;/html&gt;

This is the template file, which uses the custom accFirst filter.

## Twig loops

To create loops, we use the for tag.

looping.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

$words = ['sky', 'mountain', 'falcon', 'forest', 
    'rock', 'blue', 'solid', 'book', 'tree'];

echo $twig-&gt;render('words.html.twig', ['words' =&gt; $words]);

We will loop an array of words.

templates/words.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Words&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;ul&gt;
    {% for word in words %}
        &lt;li&gt;{{ word }}&lt;/li&gt;
    {% endfor %}
    &lt;/ul&gt;

    &lt;ul&gt;
    {% for word in words|slice(2, 4) %}
        &lt;li&gt;{{ word }}&lt;/li&gt;
    {% endfor %}    
    &lt;/ul&gt;

&lt;/body&gt;

&lt;/html&gt;

In the template file, we loop over the words array and generate 
an HTML list. With slice filter, we can loop over a part of 
the array.

## Twig looping with if &amp; else

We can combine the for tag with the if tag
and else tags.

looping2.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

$users = [ 
    ['name' =&gt; 'John Doe', 'active' =&gt; false],
    ['name' =&gt; 'Lucy Smith', 'active' =&gt; false],
    ['name' =&gt; 'Peter Holcombe', 'active' =&gt; false],
    ['name' =&gt; 'Barry Collins', 'active' =&gt; false]
];

echo $twig-&gt;render('activeusers.html.twig', ['users' =&gt; $users]);

We send an array of users to the template file.

templates/activeusers.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

&lt;p&gt;Active users&lt;/p&gt;

&lt;ul&gt;
    {% for user in users if user.active %}
        &lt;li&gt;{{ user.name }}&lt;/li&gt;
    {% else %}
        &lt;li&gt;No users found&lt;/li&gt;
    {% endfor %}
&lt;/ul&gt;

&lt;/body&gt;

&lt;/html&gt;

We output the user's name of the user.active property
is true. When there are no active users, the output from the else
tag is shown.

## Twig set tag

The set tag allows to set a value to a variable inside 
a template.

$words = ['sky', 'mountain', 'falcon', 'forest',
    'rock', 'blue', 'solid', 'book', 'tree'];
    
echo $twig-&gt;render('test.html.twig', ['words' =&gt; $words]);

We have a list of words.

{% set sorted = words | sort %}

&lt;ul&gt;
{% for word in sorted %}
    &lt;li&gt;{{ word }}&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;

We sort the array with sort filter and assign the sorted 
array to the sorted variable with set.

## Twig verbatim tag

The verbatim marks sections as being raw text that should 
not be parsed. 

{% verbatim %}
    &lt;ul&gt;
    {% for word in words %}
        &lt;li&gt;{{ word }}&lt;/li&gt;
    {% endfor %}
    &lt;/ul&gt;
{% endverbatim %}

For instance, if we had a tutorial explaing some Twig tag, we would need 
not to parse a piece of the demonstration.

## Twig format filter

The format filter formats a given string by replacing the placeholders.
It works like the sprintf function.

$name = "John Doe";
$age = 34;
        
echo $twig-&gt;render('formatfil.html.twig', ['name' =&gt; $name, 'age' =&gt; $age]);

We send two variables to the template.

{{ "%s is %d years old" | format(name, age) }}

We build the string with format.

## Twig date function

The date function converts an argument to a date to 
allow date comparison.

$user = ['name' =&gt; 'John Doe', 'created_at' =&gt; '2011/11/10'];

echo $twig-&gt;render('datefun.html.twig', ['user' =&gt; $user]);

The user array has a created_at key.

{% if date(user.created_at) &lt; date('-5years') %}
    &lt;p&gt;{{ user.name }} is a senior user&lt;/p&gt;
{% endif %} 

In the template, we compare two dates. 

## Twig automatic escaping

Twig automatically escapes certain characters such as &lt; or &gt;.     

$twig = new Environment($loader, [
    'autoescape' =&gt; false
]);

Autoescaping can be turned off with the autoescape option.

$data = "&lt;script src='http::/example.com/nastyscript.js'&gt;&lt;/script&gt;";

echo $twig-&gt;render('autoescape.html.twig', ['data' =&gt; $data]);

Users could potentionally add dangerous input to the application. The 
inclusion of unknown JS file can be prevented with autoescaping. 

&lt;p&gt;
The data is {{ data }}
&lt;/p&gt;

&lt;p&gt;
The data is {{ data | raw }}
&lt;/p&gt;

If autoescaping is enabled, we can show the raw input with the raw
filter.

&lt;p&gt;
The data is &lt;script src=&amp;#039;http::/example.com/nastyscript.js&amp;#039;&gt;&lt;/script&gt;
&lt;/p&gt;

&lt;p&gt;
The data is &lt;script src='http::/example.com/nastyscript.js'&gt;&lt;/script&gt;
&lt;/p&gt;

This partial output shows how the characters are escaped.

## Twig tests

Twig tests allow to test data. The tests are applied with 
the is operator.

$words = ['', null, 'rock', '   ', 'forest'];
echo $twig-&gt;render('tests.html.twig', ['words' =&gt; $words]);

We have an array of words that contains empty, null, and blank elements.

&lt;ul&gt;
{% for word in words %}

    {% if word is null %}
    &lt;p&gt;null element&lt;/p&gt;
    {% elseif word | trim is empty %}
    &lt;p&gt;Empty element&lt;/p&gt;
    {% else %}
    &lt;li&gt;{{ word }}&lt;/li&gt;
    {% endif %}

{% endfor %}
&lt;/ul&gt;

To deal with empty, blank, and null elements, Twig has empty
and null tests.

## Twig inheritance

Twig's template inheritance is a powerful feature which removes duplication
and promotes maintenance.    

inheritance.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader);

echo $twig-&gt;render('derived.html.twig');

This is the inheritance.php file. It renders the 
derived.html.twig, which extends from base.html.twig.

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;{% block title %}{% endblock %}&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

{% block body %}{% endblock %}

&lt;/body&gt;

&lt;/html&gt;

The base layout defines two blocks which are replaced by children: title
and body.

templates/derived.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Some title{% endblock %}

{% block body %}

The body contents

{% endblock %}

The derived child template inherits from the base template with the 
extends keyword. The two block define custom text.

$ php inheritance.php
&lt;!DOCTYPE html&gt;&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;    
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Some title&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

The body contents

&lt;/body&gt;

&lt;/html&gt;

## Symfony example

Twig is an integral part of Symfony framework. The next example shows 
steps to use Twig in a Symfony skeleton application.    

$ composer create-project symfony/skeleton simple
$ cd simple

We create a new Symfony skeleton application and move to the 
project directory.

$ composer require server --dev

We include the development server.

$ composer require maker annotations twig

We include some basic Symfony components including Twig.

$ php bin/console make:controller HomeController

We create a home controller.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/home", name="home")
     */
    public function index()
    {
        $words = ['sky', 'blue', 'cloud', 'symfony', 'forest'];

        return $this-&gt;render('home/index.html.twig', [
            'words' =&gt; $words
        ]);
    }
}

In the home controller, we render the index.html.twig 
template and pass it the $words array to process. 

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
        {% block javascripts %}{% endblock %}
    &lt;/body&gt;
&lt;/html&gt;

This is the base layout page.

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block body %}

&lt;h2&gt;List of words&lt;/h2&gt;

&lt;ul&gt;
{% for word in words  %}
    &lt;li&gt;{{ word }}&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;

{% endblock %}

This is the home page template. It uses the for tag to 
iterate over the words and output them in an unordered list.

$ php bin/console server:run

We start the server.

We navigate to http://localhost:8000/home to see the result.

 

## Source

[Twig template engine]( https://twig.symfony.com/)

 

In this article we have used Twig to generate documents from templates 
and data. We covered Twig tags, filters, tests, and inheritance. We showed 
Twing in a Symfony application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.