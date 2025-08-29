+++
title = "Spring Boot Vue.js"
date = 2025-08-29T20:12:38.937+01:00
draft = false
description = "Spring Boot Vue.js tutorial shows how to create a simple Spring Boot with Vue.js framework."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Vue.js

last modified July 16, 2023

Spring Boot Vue.js tutorial shows how to create a simple Spring Boot with Vue.js
framework.

## Vue.js

Vue.js is a JavaScript framework for building user interfaces. It
builds on top of standard HTML, CSS and JavaScript. It provides a declarative
and component-based programming model.

It is marketed as an approachable, performant and versatile framework for
building web user interfaces. Vue.js is an alternative to React.js and Angular.

There are several ways how we can integrate Vue.js in a Spring Boot application.
It is possible to integrate Vue.js in a template file or we can create a
REST application with a Vue.js UI as the consumer of REST APIs.

Also, we can include Vue.js with a simple HTML link or use a separate Vue build
system.

## Vue.js Groovy samples

We start with very simple Groovy examples.

app.groovy
static
└── index.html

This is the project structure.

app.groovy
  

@RestController
class MyApp {

    @RequestMapping("/hello")
    String home() {
        "Hello there!"
    }
}

The application sends a simple text message.

static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
&lt;script src="https://unpkg.com/vue@3"&gt;&lt;/script&gt;

&lt;div id="app"&gt;{{ message }}&lt;/div&gt;

&lt;script&gt;
    const {createApp} = Vue

    createApp({
        data() {
            return {
                message: 'Hello Vue!'
            }
        },
        mounted() {
            fetch('/hello')
                .then((response) =&gt; response.text())
                .then((data) =&gt; {
                    console.log(data);
                    this.message = data;
                });
        }
    }).mount('#app')
&lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;

In the HTML file, we include the Vue.js library from an external CDN source.
Upon starting the application, we generate a request to the Spring Boot
application and display the message in the div tag.

$ spring run app.groovy

We start the application and navigate to localhost:8080.

In the next example, we list words.

app.groovy
└── static
    └── index.html

This is the project structure.

app.groovy
  

@RestController
class MyApp {

    @RequestMapping("/words")
    Map&lt;String, List&gt; home() {
        return ['words': ['sky', 'cup', 'snow', 'war', 'water', 'ocean']]
    }
}

The Spring Boot application sends a JSON response containing a list of words.

static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;script src="https://unpkg.com/vue@3"&gt;&lt;/script&gt;

    &lt;div id="app"&gt;
        &lt;ul&gt;
            &lt;li v-for="word in words"&gt;{{word}}&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;

    &lt;script&gt;
        const { createApp } = Vue

        createApp({
            data() {
                return {
                    words: []
                }
            },
            mounted() {
                fetch('/words')
                    .then((resp) =&gt; resp.text())
                    .then((data) =&gt; {
                        let vals = JSON.parse(data);
                        this.words = vals.words;
                    });
            }
        }).mount('#app')
    &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;

The Vue application fetches the words from the endpoint, parses the JSON data
and displays the words inside the HTML list.

## Vue.js Java example

In the following example, we create a Spring Boot Java example. This time
we will utilize the Vue build system.

vue-app/
├── backend
│   ├── bin
│   ├── build
│   ├── build.gradle
│   ├── gradle
│   ├── gradlew
│   ├── gradlew.bat
│   ├── HELP.md
│   ├── settings.gradle
│   └── src
└── frontend
    ├── babel.config.js
    ├── jsconfig.json
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    ├── public
    ├── README.md
    ├── src
    └── vue.config.js

The project is split into two directories: backend and
frontend. The Spring Boot application is in the backend and Vue.js
in the frontend.

$ spring init -d web build:gradle backend

We create the Spring Boot project.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '2.7.0'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

This is the Gradle build file.

resources/application.properties
  

server.servlet.context-path=/api

We set the context-path in the application.properties
file.

com/zetcode/controller/HelloController.java
  

package com.zetcode.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping(value="/hello")
    public String hello() {

        return "Hello there!";
    }
}

We have a simple HelloController where we map the
/hello URL path to a short text message.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

We set up the Spring Boot application.

Now we create the frontend part.

$ npm install -g @vue/cli

We install the Vue command line tool.

$ vue create frontend

We create a new Vue application.

src/components/MessageItem.vue
  

&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;{{ msg }}&lt;/h1&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: 'MessageItem',
  props: {
    msg: String
  }
}
&lt;/script&gt;

We have a custom MessageItem component, which displays the hello
message.

src/App.vue
  

&lt;template&gt;
    &lt;MessageItem :msg="msg" /&gt;
    {{ message }}
&lt;/template&gt;

&lt;script&gt;
import MessageItem from './components/MessageItem.vue'

export default {
    name: 'App',
    components: {
        MessageItem
    },
    data() {
        return {
            message: 'Simple Spring Boot Vue application',
            msg: ''
        };
    },
    mounted() {
        fetch('/api/hello')
            .then((response) =&gt; response.text())
            .then((data) =&gt; {
                console.log(data);
                this.msg = data;
            });
    }
}
&lt;/script&gt;

&lt;style&gt;
#app {
    font-family: sans-serif;
    text-align: center;
    color: #1b76d1;
}
&lt;/style&gt;

This is the Vue application. We import the custom component and use it in the
template section. We make a request to the Spring Boot application and pass
the message to the custom component.

src/main.js
  

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

This is the main.js file which bootstraps Vue application.

vue.config.js
  

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      "/api/hello": {
        target: "http://localhost:8080",
        secure: false
      }
    }
  }
})

We set the proxy for the development server so that it does not collide with the
Spring Boot's server.

$ ./gradlew bootRun

We start the Spring Boot application.

$ npm run serve

We start the Vue.js development server.

After starting the servers, we navigate to localhost:8081.

In this article we have integrated the Vue.js framework with Spring Boot.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).