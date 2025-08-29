+++
title = "Symfony form"
date = 2025-08-29T20:12:43.418+01:00
draft = false
description = "Symfony form tutorial shows how to create and process an HTML form in Symfony. We manually build the HTML form."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony form

last modified July 5, 2020 

Symfony form tutorial shows how to create and process a form in Symfony.
In this tutorial we do not use a Symfony form builder. Look at the
[Symfony form builder tutorial](/symfony/formbuilder/)
for introduction to form builders.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework
for web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. Symfony was heavily inspired by the Spring Framework.

## HTML form

HTML forms are used for interaction between a user and a web site or
application. They allow users to send data to the web site. An HTML Form is
made of one or more widgets. Those widgets can be text fields, select boxes,
buttons, checkboxes, or radio buttons. Those widgets are often paired with a
label that describes their purpose.

**Note: ** For HTTP request methods that are not safe, forms
have to provide CSRF (Cross-site Request Forgery) protection. Look at the
[Symfony CSRF tutorial](/symfony/csrf/) for details.

## Symfony form example

In the following example, we create an HTML form. The data from the
form is processed by a Symfony controller.

$ symfony new myform

With symfony CLI, we create a new Symfony skeleton project.

$ cd myform

We go to the project directory.

$ composer req annot twig

We install two modules: annotations and twig.

$ composer req maker --dev

We install the the maker into the development dependencies.

$ php bin/console make:controller HomeController

We create a HomeController.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(): Response
    {
        return $this-&gt;render('home/index.html.twig');
    }
}

The HomeController returns a home page that contains
the HTML form.

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block body %}

&lt;section class="ui container"&gt;

    &lt;form class="ui form" action="message" method="get"&gt;

        &lt;div class="field"&gt;
            &lt;label&gt;Name:&lt;/label&gt;
            &lt;input type="text" name="name"&gt;
        &lt;/div&gt;

        &lt;div class="field"&gt;
            &lt;label&gt;Message&lt;/label&gt;
            &lt;input type="text" name="message"&gt;
        &lt;/div&gt;

        &lt;button class="ui button" type="submit"&gt;Send&lt;/button&gt;

    &lt;/form&gt;

&lt;/section&gt;

{% endblock %}

The HomeController returns a home page that contains
the HTML form. The form contains two input fields. The content of
these fields will be passed in a request object via two request
attributes.

{% extends 'base.html.twig' %}

The template inherits from the base.html.twig file, which
has base markup that will be shared. For instance, we include the
files of the Semantic UI CSS framework.

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;{% block title %}Welcome!{% endblock %}&lt;/title&gt;
        &lt;link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.css"
            rel="stylesheet"&gt;
    &lt;/head&gt;

    &lt;body&gt;
        {% block body %}{% endblock %}
    &lt;/body&gt;

&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.js"&gt;&lt;/script&gt;
&lt;/html&gt;

The base.html.twig template contains code that is shared
by other template files. It defines blocks that will be replaced in
children templates.

$ php bin/console make:controller MessageController

A MessageController is created.

src/Controller/MessageController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MessageController extends AbstractController
{
    /**
     * @Route("/message", name="message", methods="GET")
     */
    public function index(Request $request): Response
    {
        $name = $request-&gt;query-&gt;get("name");
        $message = $request-&gt;query-&gt;get("message");

        return $this-&gt;render('message/index.html.twig', ["name" =&gt; $name,
            "message" =&gt; $message]);
    }
}

The MessageController processes the form.

/**
 * @Route("/message", name="message", methods="GET")
 */

The @Route annotation maps the message path
to the index() method. The methods parameter
defines the request type.

public function index(Request $request): Response

We inject the Request object to the method.

$name = $request-&gt;query-&gt;get("name");
$message = $request-&gt;query-&gt;get("message");

From the request object, we get the two request parameters.

return $this-&gt;render('message/index.html.twig', ["name" =&gt; $name,
    "message" =&gt; $message]);

We render the message/index.html.twig template.
We pass the template the two variables.

templates/message/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Show message{% endblock %}

{% block body %}

{{name}} says: {{message}}

{% endblock %}

Finally, we have the template file that shows the message to the user.
The variables are shown with the {{}} syntax.

$ symfony serve

We run the application and navigate to localhost:8000.

In this tutorial we have created and processed a simple HTML form
in a Symfony application.

List [all Symfony tutorials](/all/#symfony).