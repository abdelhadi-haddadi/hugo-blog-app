+++
title = "Symfony validation"
date = 2025-08-29T20:12:47.937+01:00
draft = false
description = "Symfony validation tutorial shows how to validate data in a Symfony application. Manual validation is used."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony validation

last modified July 5, 2020 

Symfony validation tutorial shows how to validate data in a Symfony application. 
In this tutorial, we use manual validation. We do not use doctrine annotations.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework 
for web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. Symfony was inspired by Ruby on Rails, Djanog, 
and the Spring Framework.

## Symfony validation

Input from users must be validated. Symfony provides a Validator component
to perform validation tasks. The component is based on Java's Bean Validation specification.

The Validator is designed to validate objects against constraints. 
Constraints are assertions that a condition is true. Symfony has many built-in 
constraints including NotBlank, Email, Length, 
and Isbn. It is possible to create custom constraints as well.   

## Symfony validation example

In the example, we have a simple form with two fields: name and email. 
After the form is submitted, we manually validate the fields with 
Symfony's Validator. In the example, we use Length, 
NotBlank, and Email constraints.

### Installing packages

$ composer create-project symfony/skeleton myval
$ cd myval

We create a new Symfony project and go to the project directory.

$ composer req maker server --dev

We install symfony/maker-bundle and symfony/web-server-bundle.
These are useful for development mode. Note that we are using aliases for the 
packages.

$ composer req twig annotations 

We install the twig-bundle and  the annotations. Annotations are 
located in the sensio/framework-extra-bundle.

$ composer req validator

The symfony/validator package contains the Symfony validation tools.

$ composer req security-csrf
$ composer req monolog
$ composer req property-access

The symfony/security-csrf package is needed against cross-site request 
forgeries, symfony/monolog-bundle for logging, and 
symfony/property-access for manipulating PHP properties.

### Building Symfony application

$ php bin/console make:controller HomeController

    

We create a HomeController. 

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
     * @Route("/home", name="home")
     */
    public function index(): Response
    {
        return $this-&gt;render('home/index.html.twig');
    }
}

This is a simple controller that sends a view containing the web form 
to the user.

$ php bin/console make:controller FormController

We create a FormController that responds to the form submission.

src/Controller/FormController.php
  

&lt;?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FormController extends AbstractController
{
    /**
     * @Route("/sendForm", name="form")
     */
    public function index(Request $request, ValidatorInterface $validator,
        LoggerInterface $logger): Response {

        $token = $request-&gt;request-&gt;get("token");

        if (!$this-&gt;isCsrfTokenValid('myform', $token)) {

            $logger-&gt;info("CSRF failure");

            return new Response("Operation not allowed", Response::HTTP_OK,
                ['content-type' =&gt; 'text/plain']);
        }

        $name = $request-&gt;request-&gt;get("name");
        $email = $request-&gt;request-&gt;get("email");

        $input = ['name' =&gt; $name, 'email' =&gt; $email];

        $constraints = new Assert\Collection([
            'name' =&gt; [new Assert\Length(['min' =&gt; 2]), new Assert\NotBlank],
            'email' =&gt; [new Assert\Email(), new Assert\notBlank],
        ]);

        $violations = $validator-&gt;validate($input, $constraints);

        if (count($violations) &gt; 0) {

            $accessor = PropertyAccess::createPropertyAccessor();

            $errorMessages = [];

            foreach ($violations as $violation) {

                $accessor-&gt;setValue($errorMessages,
                    $violation-&gt;getPropertyPath(),
                    $violation-&gt;getMessage());
            }

            return $this-&gt;render('form/violations.html.twig',
                ['errorMessages' =&gt; $errorMessages]);
        } else {
            return new Response("Validation passed", Response::HTTP_OK,
                ['content-type' =&gt; 'text/plain']);
        }
    }
}

In the FormController, we check the CSRF token, validate the form 
input values, and send a response back to the client.

**Note:** For simplicity reasons, we have placed the validation code 
into the controller. In a production application it is better to place 
such code in a separate service class.

public function index(Request $request, ValidatorInterface $validator, 
        LoggerInterface $logger)
{

We inject the request object, validator object, and logger object.

$token = $request-&gt;request-&gt;get("token");

if (!$this-&gt;isCsrfTokenValid('myform', $token)) {
    
    $logger-&gt;info("CSRF failure");

    return new Response("Operation not allowed",  Response::HTTP_OK, 
        ['content-type' =&gt; 'text/plain']);
}

We retrieve the token and validate it with isCsrfTokenValid() method.

$name = $request-&gt;request-&gt;get("name");
$email = $request-&gt;request-&gt;get("email");

$input = ['name' =&gt; $name, 'email' =&gt; $email];

We get the request input parameters and place them into an array.

$constraints = new Assert\Collection([
    'name' =&gt; [new Assert\Length(['min' =&gt; 2]), new Assert\NotBlank],
    'email' =&gt; [new Assert\Email(), new Assert\notBlank]
]);

We create a collection of constraints. We can assign multiple constraints
for a single value.

$violations = $validator-&gt;validate($input, $constraints);

We validate the input data against the constraints with the validate()
method. The method returns possible violations. Symfony validator returns a 
ConstraintViolationList. We use the Symfony accessor to process 
the list.

if (count($violations) &gt; 0) {

We check if there are some violations.

$accessor = PropertyAccess::createPropertyAccessor();

$errorMessages = [];

foreach ($violations as $violation) {

    $accessor-&gt;setValue($errorMessages,
        $violation-&gt;getPropertyPath(),
        $violation-&gt;getMessage());
}

Symfony PropertyAccess is used to process the violation messages, before 
sending them to the template. The ConstraintViolationList
is transformed into a PHP array, where keys are form fields and values 
are error messages. The array is later processed in Twig using the for
directive.

return $this-&gt;render('form/violations.html.twig',
    ['errorMessages' =&gt; $errorMessages]);

We render the error messages in a separate page. This is often 
done using flash messages. Have a look at 
[Symfony keep form values tutorial](/symfony/keepformvalues/) how 
to do it with flashes.

} else {
    return new Response("Validation passed", Response::HTTP_OK,
        ['content-type' =&gt; 'text/plain']);
}

If everything is OK, we send a plain message *Validation passed*. 

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block body %}

    &lt;form action="sendForm" method="post"&gt;

        &lt;input type="hidden" name="token" value="{{ csrf_token('myform') }}" /&gt;
        &lt;div&gt;
            &lt;label&gt;Name:&lt;/label&gt;
            &lt;input type="text" name="name"&gt;
        &lt;/div&gt;

        &lt;div&gt;
            &lt;label&gt;Email&lt;/label&gt;
            &lt;input type="email" name="email"&gt;
        &lt;/div&gt;

        &lt;button type="submit"&gt;Send&lt;/button&gt;

    &lt;/form&gt;

{% endblock %}

The form contains two fields: name and email. 

&lt;input type="hidden" name="token" value="{{ csrf_token('myform') }}" /&gt;

It also contains a hidden field to guard against cross-site request forgeries.

templates/form/violations.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Violations{% endblock %}

{% block body %}
&lt;h2&gt;Validation failed&lt;/h2&gt;

&lt;ul&gt;
{% for field, errorMessage in errorMessages %}
    &lt;li&gt;{{ field }}: {{ errorMessage }}&lt;/li&gt;
{% endfor %}
&lt;/ul&gt;
{% endblock %}

In the violations view, we go through the violations and list them.

{% for field, errorMessage in errorMessages %}
    &lt;li&gt;{{ field }}: {{ errorMessage }}&lt;/li&gt;
{% endfor %}

With the for directive, we go through error messages 
and show them if there are any.

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

This is the base Twig template.

$ php bin/console server:run

We start the development server. Then locate to the localhost:8000/home
url to get the form.

![validation.png](images/validation.png)

Figure: Symfony validation
 -->

In this tutorial we have validated a simple form in a Symfony application.
We have used manual validation.

List [all Symfony tutorials](/all#symfony).