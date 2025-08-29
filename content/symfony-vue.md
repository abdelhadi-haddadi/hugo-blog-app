+++
title = "Symfony Vue"
date = 2025-08-29T20:12:49.057+01:00
draft = false
description = "Symfony Vue tutorial shows how to create a Symfony application with Vue frontend. Vue is an open-source JavaScript framework for building user interfaces and single-page applications."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony Vue

last modified July 5, 2020 

Symfony Vue tutorial shows how to create a simple Symfony application with Vue
frontend.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. Symfony was
inspired by Ruby on Rails, Django, and the Spring framework.

*Symfony Encore* is JavaScript library which is used to manage CSS and
JavaScript in a Symfony application. Encore makes it easier to integrate Webpack
into the Symfony application. It wraps Webpack, giving use a clean and powerful
API for bundling JavaScript modules, pre-processing CSS and JavaScript, and
compiling and minifying assets.

## Vue

Vue is an open-source JavaScript framework for building user interfaces
and single-page applications. It is an alternative to Angular and React.

## Symfony Vue example

In the following example, we create a simple Symfony application that
sends data in a template. The data is processed by Vue and displayed
in a component.

In addition to PHP, we need to have Node.js installed. Have a look at
ZetCode's [Node.js tutorial](/javascript/nodejs) for additional
details.

### Setting up the project

We show how to setup Symfony with Vue.

$ symfony new symvue

With symfony CLI we create a new Symfony skeleton project.

$ cd symvue

We go to the project directory.

$ composer require maker --dev

In addition, we install the maker component. The maker package
provides scaffolding.

$ composer req annot twig

We install components for working with annotations and templates.

$ composer require encore
$ npm install

We install the Symfony Encore. This will install and enable the
WebpackEncoreBundle, add the assets directory, create a
webpack.config.js file, and add node_modules to
.gitignore.

$ npm i vue vue-loader vue-template-compiler

We install Vue and its libraries.

### Project files

We show the important project files.

webpack.config.js
  

var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    .enableVueLoader()

    .addEntry('app', './assets/js/app.js')

    .splitEntryChunks()

    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())

;

module.exports = Encore.getWebpackConfig();

In the webpack.config.js file, we enable
the Vue loader and set the public and build paths.

assets/js/app.js
  

import Vue from 'vue';
import App from './components/App';
import '../css/app.css';

new Vue({
    el: '#app',
    render: h =&gt; h(App)
});

This is the main Vue file which starts Vue.

Symfony stores static files such as CSS and JavaScript in the assets
directory.

assets/js/components/App.vue
  

&lt;template&gt;
  &lt;div&gt;
    &lt;h2 class="center"&gt;My Application&lt;/h2&gt;
    &lt;div v-text="message"&gt;&lt;/div&gt;
    {{ message }}
    &lt;ul&gt;
      &lt;li :key="word.id" v-for="word in words"&gt;{{ word }}&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      message: "A list of words",
      words: []
    };
  },
  mounted() {

    let el = document.querySelector("div[data-words]");
    let mywords = el.dataset.words.split(",");

    this.words.push.apply(this.words, mywords);
  }
};
&lt;/script&gt;

&lt;style&gt;
.center {
  text-align: center;
}
&lt;/style&gt;

This is the Vue component. A Vue application consists of components.
A component consists of three parts: template, script, and style.

&lt;div v-text="message"&gt;&lt;/div&gt;
{{ message }}

There are two ways to output variables in Vue; the second one
is identical to Twig.

&lt;ul&gt;
    &lt;li :key="word.id" v-for="word in words"&gt;{{ word }}&lt;/li&gt;
&lt;/ul&gt;

With the v-for directive, we go through the words
array and show each of the elements in a list item.  The :key
directive helps Vue to render the list; it contains the Id of the
element.

The data originates
from a Symfony Twig template; it is processed by JavaScript and finally
output with v-for in a Vue component.

data() {
    return {
        message: "A list of words",
        words: []
    };
},

In the data() function, we initiate a message variable
and the words array.

mounted() {

    let el = document.querySelector("div[data-words]");
    let mywords = el.dataset.words.split(",");

    this.words.push.apply(this.words, mywords);
}

The words array is filled with data in the mounted()
function, which parses data from an element's dataset. It is stored there
as a string; we split the string into words. The data is inserted in the
dataset inside Symfony's Twig template.

assets/css/app.css
  

body {
    background-color: lightgray;
}

We have some basic CSS in the app.css.

$ php bin/console make:controller HomeController

The HomeController is created with the Symfony maker.

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
        $words = ['sky', 'cloud', 'wood', 'rock', 'forest',
            'mountain', 'breeze'];

        return $this-&gt;render('home/index.html.twig', [
            'words' =&gt; $words
        ]);
    }
}

The controller method sends a list of words to the client.

return $this-&gt;render('home/index.html.twig', [
    'words' =&gt; $words
]);

We render the index.html.twig template to which we
send the words.

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Home page{% endblock %}

{% block body %}

&lt;div ref="words" data-words="{{ words|join(',') }}"&gt;

&lt;/div&gt;

&lt;div id="app"&gt;
    &lt;app&gt;&lt;/app&gt;
&lt;/div&gt;
{% endblock %}

In the template, we add the words array to the data-words
attribute. The array is joined into a string with the Twig join
filter. The dataset property on the HTMLElement interface provides
read/write access to all the custom data attributes (data-*) set on the element.

&lt;div id="app"&gt;
    &lt;app&gt;&lt;/app&gt;
&lt;/div&gt;

This is the entry point of the main Vue component.

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;{% block title %}Welcome!{% endblock %}&lt;/title&gt;
        {% block stylesheets %}
            {{ encore_entry_link_tags('app') }}
        {% endblock %}
    &lt;/head&gt;
    &lt;body&gt;

        {% block body %}{% endblock %}

        {% block javascripts %}
            {{ encore_entry_script_tags('app') }}
        {% endblock %}
    &lt;/body&gt;
&lt;/html&gt;

This is the base template file.

{{ encore_entry_link_tags('app') }}

The CSS files are loaded with encore_entry_link_tags.

{{ encore_entry_script_tags('app') }}

The JavaScript files are loaded with encore_entry_script_tags.

## Building assets

We need to build the assets.

$ npm run dev

The assets are built with npm run dev command for the development
environment.

## Running the application

We start the development server and locate to the application page.

$ symfony serve

We start the development server. Then we locate to the localhost:8000/home
page.

In this tutorial we have create a Symfony application that uses Vue on its
frontend.

List [all Symfony tutorials](/all#symfony).