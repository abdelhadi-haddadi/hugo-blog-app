+++
title = "Sending mail in Symfony"
date = 2025-08-29T20:12:45.730+01:00
draft = false
description = "Symfony mail tutorial shows how to send a simple mail in Symfony. Symfony uses SwiftMailer to send emails."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Sending mail in Symfony

last modified July 5, 2020 

Symfony mail tutorial shows how to send a simple mail in Symfony. Symfony uses
SwiftMailer to send emails.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework 
for web projects. Symfony is free software with some commertial addons. 
Symfony was inspired by Ruby on Rails, Django, and the Spring Framework.

## SwiftMailer

SwiftMailer is a free feature-rich PHP mailer. Symfony integrates
SwiftMailer via its symfony/swiftmailer-bundle.

## Symfony send mail example

In the example, we have send a simple email. We use Twig to create 
an email template.

### Setting up the application

We start with setting up the application with composer. 

$ composer create-project symfony/skeleton mail 
$ cd mail

We create a new Symfony skeleton project and go the the newly created project
directory.

$ composer req twig annotations monolog

We install three basic Symfony packages needed for a web application.

$ composer req symfony/swiftmailer-bundle 

We install the symfony/swiftmailer-bundle.

$ composer req maker server --dev     

We install packages for development: maker and server.

.env
  

... 
MAILER_URL=smtp://smtp.example.com:465?encryption=ssl&amp;auth_mode=login&amp;username=admin@example.com&amp;password=s$cret

In the .env file, we set the MAILER_URL variable. It contains the 
SMTP server that is going to deliver the emails. If you are a beginner, avoid using Gmail because 
setting up Gmail correctly is a complex task due to Gmail's high level of security.

Instead, use an SMTP server from your hosting provider, or a service such as mailgun or mailtrap.
The necessary options such as port number and encryption is given by the provider/service.

$ php bin/console make:controller TestMailController 

We create a TestMailController that contains a simple link to 
send an email.

src/Controller/TestMailController.php
  

&lt;?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class TestMailController extends AbstractController
{
    /**
     * @Route("/test/mail", name="test_mail")
     */
    public function index(Request $request, \Swift_Mailer $mailer, 
        LoggerInterface $logger)
    {
        $name = $request-&gt;query-&gt;get('name');

        $message = new \Swift_Message('Test email');
        $message-&gt;setFrom('admin@zetcode.com');
        $message-&gt;setTo('admin2@zetcode.com');
        $message-&gt;setBody(
            $this-&gt;renderView(
                'emails/mymail.html.twig',
                ['name' =&gt; $name]
            ),
            'text/html'
        );

        $mailer-&gt;send($message);

        $logger-&gt;info('email sent');
        $this-&gt;addFlash('notice', 'Email sent');

        return $this-&gt;redirectToRoute('home');
    }
}

In the TestMailController's index() method, we 
send the email. Note that code sending email should not be in a controller 
in a production application; it should be in some service. But for simplicity 
reasons, we leave it here.

public function index(Request $request, \Swift_Mailer $mailer, 
    LoggerInterface $logger)
{

We inject the Request, Swift_Mailer, and the logger.

$name = $request-&gt;query-&gt;get('name');

We get the name that is used in the GET request.

$message = new \Swift_Message('Test email');
$message-&gt;setFrom('example@example.com');
$message-&gt;setTo('example2@example.com');

A Swift_Message is created. The from and to email values are hard-coded 
to make this example simpler. You can remove the hard-coded values as an exercise.
(Set the source email as a parameter, fetch the destination email from a form.)

$message-&gt;setBody(
    $this-&gt;renderView(
        'emails/mymail.html.twig',
        ['name' =&gt; $name]
    ),
    'text/html'
);

With the setBody(), we set the body of the email. The renderView()
method renders the view from the provided Twig template. We pass the $name
variable to the template.

$mailer-&gt;send($message);

The email is sent with send().

$logger-&gt;info('email sent');
$this-&gt;addFlash('notice', 'Email sent');

We log &amp; flash a message. The flash message is displayed after the email 
is successfully sent.

return $this-&gt;redirectToRoute('home');

We redirect to the home page, where the flash message is shown.

templates/emails/myemail.html.twig
  

Hi {{ name }}! You've got a test email.

Thanks!

This is a simple template for the email.

$ php bin/console make:controller HomeController 

We create a HomeController. It contains a simple link to 
send an email.

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

The HomeController renders the home page.

templates/home/index.html
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block stylesheets %}
&lt;style&gt;
    .flash-notice {
        margin: 8px;
        padding-left: 8px;
        width: 150px;
        background-color: rgb(113, 241, 113)
    }

    .hide {
        opacity: 0;
        transition: opacity 1000ms;
    }
&lt;/style&gt;
{% endblock %}

{% block body %}

&lt;a href="/test/mail?name=Peter Novak"&gt;Send a test mail&lt;/a&gt;

{% for message in app.flashes('notice') %}
&lt;div id="flash-notice" class="flash-notice"&gt;
    {{ message }}
&lt;/div&gt;
{% endfor %}

{% block javascripts %}
&lt;script src="main.js"&gt;&lt;/script&gt;
{% endblock %}

{% endblock %}

The home page contains a link for sending an email. If the email is 
sent, we show a notification. This notification can be hidden by clicking
on it.

&lt;style&gt;
    .flash-notice {
        margin: 8px;
        padding-left: 8px;
        width: 150px;
        background-color: rgb(113, 241, 113)
    }

    .hide {
        opacity: 0;
        transition: opacity 1000ms;
    }
&lt;/style&gt;    

We set some styling for the notification. Also, the hide class 
provides a simple fadeout animation. The animation is lauched in JavaScript by 
inserting this class into the notification element.

&lt;a href="/test/mail?name=Peter Novak"&gt;Send a test mail&lt;/a&gt;

This link makes a GET request that triggers an email. We send a name
attribute with the request. The name is hard-coded; as an exercise, you can 
create a form that will specify the name and the destination email.

{% for message in app.flashes('notice') %}
&lt;div id="flash-notice" class="flash-notice"&gt;
    {{ message }}
&lt;/div&gt;
{% endfor %}

If there is a flash message, we show it.

&lt;script src="main.js"&gt;&lt;/script&gt;

The animation is controlled in JavaScript code, which is located 
in the main.js file.

public/main.js
  

const flash = document.getElementById('flash-notice');

flash.addEventListener('click', function () {

    flash.classList.add('hide');
});

When we click on the flash message, the event callback adds the 
hide class into the class list of the element, thus 
starting a fadeout animation.

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;{% block title %}Welcome!{% endblock %}&lt;/title&gt;
    {% block stylesheets %}

    {% endblock %}
&lt;/head&gt;

&lt;body&gt;
    {% block body %}{% endblock %}
    {% block javascripts %}{% endblock %}
&lt;/body&gt;

&lt;/html&gt;

This is the base Twig template.

In this tutorial we have shown how to send a simple email in Symfony.

List [all Symfony tutorials](/all/#symfony).

See Mailtrap's [How to Send Emails in Symfony with Examples](https://blog.mailtrap.io/send-emails-in-symfony/).