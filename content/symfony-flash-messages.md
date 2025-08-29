+++
title = "Symfony Flash messages"
date = 2025-08-29T20:12:43.430+01:00
draft = false
description = "Symfony Flash tutorial shows how to create flash messages in Symfony. Flash messages are temporary messages used for user notifications. They are stored in a session and vanish as soon as they are retrieved."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony Flash messages

last modified July 5, 2020 

Symfony Flash messages tutorial shows how to create flash messages in Symfony.
Flash messages are temporary messages used for user notifications. They are
stored in a session and vanish as soon as they are retrieved.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. Symfony was
heavily inspired by the Spring Framework.

## Symfony Flash example

In the following example, we have a simple form with one input box for
a user name. If the user enters an invalid name (empty or containing only
spaces), the application shows a flash notification above the form.

**Note:** In our application, we have a GET form.
A GET method is considered [safe](https://developer.mozilla.org/en-US/docs/Glossary/safe),
so we do not implement a CSRF protection. The [Symfony CSRF tutorial](/symfony/csrf/)
covers CSRF protection in Symfony.

$ symfony new symflash

With symfony CLI we create a new Symfony skeleton project.

$ cd symflash

We go to the project directory.

$ php bin/console --version
Symfony 5.0.8 (env: dev, debug: true)

We use Symfony 5.0.8.

$ composer require annotations twig

We install two packages: annotations and twig.

$ composer require maker --dev

We install the Symfony maker.

src/Service/Validate.php
  

&lt;?php

namespace App\Service;

class Validate
{
    public function isValid(?string $name): bool
    {
        if (!isset($name) || trim($name) === '') {

            return false;
        } else {

            return true;
        }
    }
}

The Validate service checks if the provided string is empty
or contains only spaces.

**Note:** In production applications, we use some validation
library such as Symfony's symfony/validator or PHP Rackit or
Respect.

$ php bin/console make:controller FormController

A FormController is created.

src/Controller/FormController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\Validate;

class FormController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(): Response
    {
        return $this-&gt;render('form/index.html.twig');
    }

    /**
     * @Route("/form", name="do-form")
     * @param Request $request
     * @param Validate $valService
     * @return RedirectResponse|Response
     */
    public function doForm(Request $request, Validate $valService): Response
    {
        $name = $request-&gt;query-&gt;get("name");

        $validated = $valService-&gt;isValid($name);

        if ($validated) {

            $msg = sprintf("Hello %s!", $name);

            return new Response($msg,  Response::HTTP_OK,
                ['content-type' =&gt; 'text/plain']);
        } else {

            $this-&gt;addFlash(
                'notice', 'Invalid name entered'
            );

            return $this-&gt;redirectToRoute("index");
        }
    }
}

The FormController responds to root and form paths.

/**
 * @Route("/", name="index")
 */
public function index()
{
    return $this-&gt;render('form/index.html.twig');
}

The root path returns an HTML form.

/**
 * @Route("/form", name="do-form")
 * @param Request $request
 * @param Validate $valService
 * @return RedirectResponse|Response
 */
public function doForm(Request $request, Validate $valService): Response
{

In the doForm() method, we inject a Request object
and a Validate service.

$name = $request-&gt;get("name");
$validated = $valService-&gt;isValid($name);

We retrieve the name input and validate it.

if ($validated) {

    $msg = sprintf("Hello %s!", $name);

    return new Response($msg,  Response::HTTP_OK,
        ['content-type' =&gt; 'text/plain']);
}

If the validation was successfull, we send a plain text response to the client.

$this-&gt;addFlash(
    'notice', 'Invalid name entered'
);

return $this-&gt;redirectToRoute("index");

If the input is not valid, we add a flash message with addFlash()
and redirect to the index route.

templates/form/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block stylesheets %}
    &lt;style&gt; .flash-notice { color: red } &lt;/style&gt;
{% endblock %}

{% block body %}

    {% for message in app.flashes('notice') %}
        &lt;div class="flash-notice"&gt;
            {{ message }}
        &lt;/div&gt;
    {% endfor %}

    &lt;form action="{{ path('do-form') }}"&gt;

        &lt;div&gt;
            &lt;label for="name"&gt;Enter your name:&lt;/label&gt;1
            &lt;input type="text" name="name" id="name"&gt;
        &lt;/div&gt;

        &lt;button type="submit"&gt;Send&lt;/button&gt;

    &lt;/form&gt;

{% endblock %}

The FormController returns a form page. It contains an input for
user name.

{% for message in app.flashes('notice') %}
    &lt;div class="flash-notice"&gt;
        {{ message }}
    &lt;/div&gt;
{% endfor %}

When the application redirects to this page, we go through flash messages
and display them in div tags above the form.

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

The base.html.twig template contains code that is shared
by other template files. It defines blocks that will be replaced in
children templates.

$ symfony serve

We run the application and locate to localhost:8000.

In this tutorial we have worked with flash messages in Symfony.

List [all Symfony](/all/#symfony) tutorials.