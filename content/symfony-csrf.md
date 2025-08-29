+++
title = "Symfony CSRF"
date = 2025-08-29T20:12:41.220+01:00
draft = false
description = "Symfony CSRF tutorial shows how to implement CSRF protection in Symfony applications. Cross-site request forgery (CSRF) is an attack in which a malicious users attempt to make legitimate users unknowingly submit data that they do not intend to submit."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony CSRF

last modified July 5, 2020 

Symfony CSRF tutorial shows how to implement CSRF protection in Symfony
applications.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework
for web projects. Symfony was published as free software in 2005. Symfony was
inspired by Django, Spring, and ROR frameworks.

## CSRF

Cross-site request forgery (CSRF) is an attack in which malicious
users attempt to make legitimate users unknowingly submit data that they do not
intend to submit. CSRF attacks specifically target state-changing requests, not
theft of data. A successful CSRF attack can force the user to perform state
changing requests like transferring funds or changing their profile details.

CSRF protection must be applied for HTTP requests that are considered unsafe.
Safe methods do not have to be protected against CSRF because they do not make
changes to the application. Check the
[should-i-use-csrf-protection-for-get-requests](https://security.stackexchange.com/questions/115794/should-i-use-csrf-protection-for-get-requests)
for more details.

CSRF protection works by adding a hidden field to the form that contains a value
(token) that only the application and the user know. This ensures that the user
- not some other entity - is submitting the given data.

The symfony/security-csrf component provides
CsrfTokenManager for generating and validating CSRF tokens.
Forms created with the Symfony Form component and form builders include CSRF
tokens by default and Symfony checks them automatically. In such cases, we do
not have to do anything to be protected against CSRF attacks.

If we do not use form component or form builders, we need to handle CSRF
ourselves (with Symfony tools).

The csrf_token() Twig directive renders the CSRF token for a user.

## Symfony CSRF protection example

In the following example, we manually create a form for which we implement
the CSRF protection. In this application we define routes in the routes.yaml
file.

$ symfony new mycsrf
$ cd mycsrf

With symfony CLI we create a new Symfony skeleton project and
locate to the project directory.

$ composer req twig symfony/security-csrf

We install the twig and the security-csrf packages.

config/routes.yaml
  

index:
    path: /
    controller: App\Controller\AppController::index

process-form:
    path: /process
    controller: App\Controller\AppController::processForm

We define two routes for the application. The index route shows
the home page with the form. The process-form processes the
submitted form and checks the CSRF token.

src/Controller/AppController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AppController extends AbstractController
{
    public function index(): Response
    {
        return $this-&gt;render('home/index.html.twig');
    }

    public function processForm(Request $request): Response
    {
        $token = $request-&gt;request-&gt;get("token");

        if (!$this-&gt;isCsrfTokenValid('myform', $token))
        {
            return new Response('Operation not allowed', Response::HTTP_BAD_REQUEST,
                ['content-type' =&gt; 'text/plain']);
        }

        $name = $request-&gt;request-&gt;get("name");
        $email = $request-&gt;request-&gt;get("email");

        $msg = "$name with $email received";

        return new Response($msg, Response::HTTP_CREATED,
            ['content-type' =&gt; 'text/plain']);
    }
}

The AppController has two actions: index() and processForm().

public function index(): Response
{
    return $this-&gt;render('home/index.html.twig');
}

The index() function renders the home page. The home page
contains the HTML form.

$token = $request-&gt;request-&gt;get("token");

We retrieve the CSRF token with the get() method from the request.

if (!$this-&gt;isCsrfTokenValid('myform', $token))
{
    return new Response('Operation not allowed', Response::HTTP_BAD_REQUEST,
        ['content-type' =&gt; 'text/plain']);
}

We check the validity of the token with isCsrfTokenValid() method.
If the token is not valid, we return a response with Response::HTTP_BAD_REQUEST code.
The name of the token myform is specified in the HTML form in the template.

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block body %}

    &lt;section class="ui container"&gt;

        &lt;form class="ui form" action="{{ path('process-form') }}" method="post"&gt;

            &lt;input type="hidden" name="token" value="{{ csrf_token('myform') }}"&gt;

            &lt;div class="field"&gt;
                &lt;label&gt;Name:&lt;/label&gt;
                &lt;input name="name" type="text"&gt;
            &lt;/div&gt;

            &lt;div class="field"&gt;
                &lt;label&gt;Email&lt;/label&gt;
                &lt;input name="email" type="text"&gt;
            &lt;/div&gt;

            &lt;button class="ui button" type="submit"&gt;Send&lt;/button&gt;

        &lt;/form&gt;

    &lt;/section&gt;

{% endblock %}

This is the Twig template for the home page with the form. The form is styled
with the Semantic UI library.

&lt;form class="ui form" action="{{ path('process-form') }}" method="post"&gt;

The form action points to the process-form path. The form's method is POST,
which means that CSRF protection is necessary.

&lt;input type="hidden" name="token" value="{{ csrf_token('myform') }}" /&gt;

We add the hidden input with the CSRF token. The token is generated with
csrf_token().

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;{% block title %}Welcome!{% endblock %}&lt;/title&gt;
        {% block stylesheets %}
            &lt;link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
                  rel="stylesheet"&gt;
        {% endblock %}
    &lt;/head&gt;
    &lt;body&gt;
        {% block body %}{% endblock %}
        {% block javascripts %}{% endblock %}
    &lt;/body&gt;

    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"&gt;&lt;/script&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.js"&gt;&lt;/script&gt;
&lt;/html&gt;

This is the base template file. It loads the Semantic UI library.

$ symfony serve

We run the application.

$ curl -d "name=Peter&amp;email=peter@example.com" -X POST http://localhost:8000/process
Operation not allowed

If we try to bypass the form and try to access the controller action with the
curl tool, we get an error message.

In this tutorial we have implemented the CSRF protection in our Symfony application.

List [all Symfony](/all/#symfony) tutorials.