+++
title = "Symfony translation"
date = 2025-08-29T20:12:47.950+01:00
draft = false
description = "Symfony translation tutorial shows how to to work with different languages in Symfony."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony translation

last modified July 5, 2020 

Symfony translation tutorial shows how to to work with different
languages in Symfony.

Internationalization and localization is adapting computer
software for different languages and cultures.

## Symfony translation

For internationalization and localization, Symfony contains the
symfony/translation package for these tasks.

The translation files have the following mandatory format:  domain.locale.loader.
The domain is an optional way to organize messages into groups.
The default domain is messages. The locale
defines the locale of the translation file; e.g. en, sk, or de. The
loader is a way to load and parse the file; e.g. xlf, php, or yaml.

The translated text can be written into different file formats.
The Symfony translation component supports lots of translation
formats such as XLIFF, PHP, Qt, .po, .mo, JSON, CSV or INI. The recommended
format is XLIFF.

The translation files can be placed in three different directories, where
the first location has the highest priority:
translations/, src/Resources/%bundle name%/translations/,
or Resources/translations/.

## Symfony translation example

In the following example, we create a simple web application that returns
a message according to the locale. We use the default messages
domain.

$ symfony new symtrans
$ cd symtrans

We create a new project and locate to the newly created project directory.

$ php bin/console --version
Symfony 5.0.8 (env: dev, debug: true)

We use Symfony 5.0.8.

$ composer req annotations translation

We install the annotations and translation packages.

$ composer req maker --dev

We install the maker component.

config/packages/translation.yaml
  

framework:
    default_locale: '%locale%'
    translator:
        paths:
            - '%kernel.project_dir%/translations'
        fallbacks:
            - '%locale%'

In the translation.yaml file, we have a default locale
defined. It uses a %locale% parameter, which is set
in the services.yaml configuration file.

config/services.yaml
  

parameters:
    locale: 'en'
...

By default, we have English default locale.

translations/messages.en.xlf
  

&lt;?xml version="1.0"?&gt;
&lt;xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2"&gt;
    &lt;file source-language="en" target-language="en" datatype="plaintext"
            original="file.ext"&gt;
        &lt;body&gt;
            &lt;trans-unit id="text.message"&gt;
                &lt;source&gt;text.message&lt;/source&gt;
                &lt;target&gt;Today is a beautiful day&lt;/target&gt;
            &lt;/trans-unit&gt;
        &lt;/body&gt;
    &lt;/file&gt;
&lt;/xliff&gt;

This is an translation file for the English language.

&lt;trans-unit id="text.message"&gt;
    &lt;source&gt;text.message&lt;/source&gt;
    &lt;target&gt;Today is a beautiful day&lt;/target&gt;
&lt;/trans-unit&gt;

We have one translation unit. A translation unit is identified by Id.

translations/messages.sk.xlf
  

&lt;?xml version="1.0"?&gt;
&lt;xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2"&gt;
    &lt;file source-language="en" target-language="sk" datatype="plaintext"
            original="file.ext"&gt;
        &lt;body&gt;
            &lt;trans-unit id="text.message"&gt;
                &lt;source&gt;text.message&lt;/source&gt;
                &lt;target&gt;Dnes je krásny deň.&lt;/target&gt;
            &lt;/trans-unit&gt;
        &lt;/body&gt;
    &lt;/file&gt;
&lt;/xliff&gt;

This is a translation file for the Slovak language.

We update the translations. The messages.en.yml and
messages.sk.yml are generated.

-->

$ php bin/console cache:clear

Note that we might need to clear the cache.

$ php bin/console make:controller HomeController

We create a HomeController.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     * @param TranslatorInterface $translator
     * @return Response
     */
    public function index(TranslatorInterface $translator): Response
    {
        $translated = $translator-&gt;trans('text.message',[], null, 'sk');

        return new Response($translated);
    }
}

The HomeController returns a translated message.

public function index(TranslatorInterface $translator): Response
{

We inject the TranslatorInterface to get Symfony translation
services.

$translated = $translator-&gt;trans('text.message',[], null, 'sk');

The tranlator's trans() method translates the given message.
The last parameter is the locale. In our case, we have used the Slovak
locale, so we expect a message in Slovak.

$ symfony serve

We start the server.

$ curl localhost:8000
Dnes je krásny deň.

We generate a GET request with curl and get a message in Slovak.

## Using Twig template

Next we are going to use the Twig template.

$ composer req twig

We install Twig.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     * @param TranslatorInterface $translator
     * @return Response
     */
    public function index(TranslatorInterface $translator): Response
    {
        $message = $translator-&gt;trans('text.message',[], null, 'sk');

        return $this-&gt;render('home/index.html.twig', [
            'message' =&gt; $message
        ]);
    }
}

The controller translates the message and renders a Twig template. It
sends the template the translated message.

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block body %}

{% trans %}%message%{% endtrans %}

{% endblock %}

In the template, we display the message with the Twig {% trans %}
and {% endtrans %} directives.

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

This is the autogenerated base template file.

In this tutorial we have worked with translations in Symfony.

List [all Symfony tutorials](/all#symfony).