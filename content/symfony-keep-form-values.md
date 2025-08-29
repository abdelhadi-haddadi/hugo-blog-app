+++
title = "Symfony keep form values"
date = 2025-08-29T20:12:44.564+01:00
draft = false
description = "Symfony keep form values tutorial shows how to keep form values after the form submission of the form fails. The tutorial uses classic forms."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony keep form values

last modified March 3, 2025 

Symfony keep form values tutorial shows how to keep form values after form
submission after the submission of the form fails. In this tutorial, we do the
traditional form submission; we do not use form builders. 

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. Symfony was heavily inspired by the
Spring Framework.

## Keeping form values

When the form is submitted by the user, it is validated by the application.
When the validation fails, the application redirects the user back to the
form, displaying the validation errors. It is a good practice to keep the
already entered values in the form.

## Symfony keep form values example

In the example, we have a simple form with two fields: name and email.
After the form is submitted, we check for CSRF protection and validate
the input values with Symfony's Validator. We store the entered
values into the session to retrieve them back when the submission fails.

### Setting up the application

We start with setting up the application with composer.

$ composer create-project symfony/skeleton formkeepvals "^7.2"
$ cd formkeepvals

We create a new Symfony 7.2 skeleton project and go to the newly created project
directory.

$ composer require symfony/twig-bundle symfony/validator symfony/annotations

We install three basic Symfony packages: twig-bundle,
validator, and annotations. 

$ composer require symfony/security-csrf symfony/monolog-bundle

The security-csrf package is needed against cross-site request
forgeries and monolog-bundle for logging.

$ composer require symfony/property-access

We install the PropertyAccess component, which is used for
convenient reading and writing of properties/keys of objects and arrays.

$ composer require symfony/maker-bundle symfony/web-server-bundle --dev

We install the maker bundle and the development server for Symfony 7.2.

$ php bin/console make:controller HomeController

We create a HomeController. The controller sends a form to the
client.

src/Controller/HomeController.php
  

&lt;?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'home')]
    public function index(): Response
    {
        return $this-&gt;render('home/index.html.twig');
    }
}

This is a simple controller that sends a view containing the web form
to the user.

$ php bin/console make:controller MessageController

We create a MessageController that responds to the form submission.

src/Controller/MessageController.php
  

&lt;?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\ValidationService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MessageController extends AbstractController
{
    #[Route('/message', name: 'message', methods: ['POST'])]
    public function index(Request $request, ValidationService $validator): Response
    {
        $token = $request-&gt;request-&gt;get('token', '');

        if (!$validator-&gt;validateToken($token)) {
            return new Response(
                'Operation not allowed',
                Response::HTTP_BAD_REQUEST,
                ['content-type' =&gt; 'text/plain']
            );
        }

        $name = $request-&gt;request-&gt;get('name', '');
        $email = $request-&gt;request-&gt;get('email', '');

        $input = ['name' =&gt; $name, 'email' =&gt; $email];
        $errorMessages = $validator-&gt;validateInput($input);

        if (count($errorMessages) &gt; 0) {
            $session = $request-&gt;getSession();
            $session-&gt;set('name', $name);
            $session-&gt;set('email', $email);

            foreach ($errorMessages as $key =&gt; $val) {
                $this-&gt;addFlash($key, $val);
            }

            return $this-&gt;redirectToRoute('home');
        }

        return new Response(
            'User saved',
            Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']
        );
    }
}

In the MessageController, we check the CSRF token, validate the form
input values, and send a response back to the client. 

src/Service/ValidationService.php
  

&lt;?php

declare(strict_types=1);

namespace App\Service;

use Psr\Log\LoggerInterface;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;

class ValidationService
{
    public function __construct(
        private readonly CsrfTokenManagerInterface $tokenManager,
        private readonly ValidatorInterface $validator,
        private readonly PropertyAccessorInterface $accessor,
        private readonly LoggerInterface $logger
    ) {
    }

    public function validateToken(string $token): bool
    {
        $csrfToken = new CsrfToken('myform', $token);
        $isValid = $this-&gt;tokenManager-&gt;isTokenValid($csrfToken);

        if (!$isValid) {
            $this-&gt;logger-&gt;error('CSRF failure');
        }

        return $isValid;
    }

    /** @return array&lt;string, string&gt; */
    public function validateInput(array $input): array
    {
        $constraints = new Assert\Collection([
            'name' =&gt; [
                new Assert\Length(['min' =&gt; 2]),
                new Assert\NotBlank(),
            ],
            'email' =&gt; [
                new Assert\Email(),
                new Assert\NotBlank(),
            ],
        ]);

        $violations = $this-&gt;validator-&gt;validate($input, $constraints);

        if (count($violations) &gt; 0) {
            $this-&gt;logger-&gt;info('Validation failed');
            $messages = [];

            foreach ($violations as $violation) {
                $this-&gt;accessor-&gt;setValue(
                    $messages,
                    $violation-&gt;getPropertyPath(),
                    $violation-&gt;getMessage()
                );
            }

            return $messages;
        }

        return [];
    }
}

The ValidationService checks the CSRF token and validates the
input. 

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block stylesheets %}
&lt;style&gt;
    .topmargin {
        margin-top: 10px;
    }
&lt;/style&gt;
{% endblock %}

{% block body %}

&lt;section class="ui container topmargin"&gt;

    &lt;form class="ui form" action="{{ path('message') }}" method="post"&gt;

        &lt;input type="hidden" name="token" value="{{ csrf_token('myform') }}" /&gt;

        {% for msg in app.flashes('name') %}
        &lt;div class="ui small red message"&gt;
            {{ msg }}
        &lt;/div&gt;
        {% endfor %}

        &lt;div class="field"&gt;
            &lt;label&gt;Name:&lt;/label&gt;
            &lt;input type="text" name="name" value="{{ app.session.get('name')|default('') }}"&gt;
        &lt;/div&gt;

        {% for msg in app.flashes('email') %}
        &lt;div class="ui small red message"&gt;
            {{ msg }}
        &lt;/div&gt;
        {% endfor %}

        &lt;div class="field"&gt;
            &lt;label&gt;Email&lt;/label&gt;
            &lt;input type="text" name="email" value="{{ app.session.get('email')|default('') }}"&gt;
        &lt;/div&gt;

        &lt;button class="ui button" type="submit"&gt;Send&lt;/button&gt;

    &lt;/form&gt;

&lt;/section&gt;

{% endblock %}

The home page has a form. The form contains two fields: name and
email.

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;{% block title %}Welcome!{% endblock %}&lt;/title&gt;
        &lt;link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
                 rel="stylesheet"&gt;
        {% block stylesheets %}{% endblock %}
    &lt;/head&gt;
    &lt;body&gt;
        {% block body %}{% endblock %}

        &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"&gt;&lt;/script&gt;
        &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.js"&gt;&lt;/script&gt;
        {% block javascripts %}{% endblock %}
    &lt;/body&gt;
&lt;/html&gt;

This is the base Twig template. It contains the Semantic UI CSS framework.

In this tutorial we have validated a simple form in a Symfony 7.2 application.

List [all Symfony tutorials](/all/#symfony).