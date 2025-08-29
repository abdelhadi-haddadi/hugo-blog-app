+++
title = "Java Jinjava"
date = 2025-08-29T19:59:40.483+01:00
draft = false
description = "Java Jinjava tutorial shows how to create templates in Java with Jinjava."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Jinjava

last modified January 27, 2024

 

Java Jinjava tutorial shows how to create templates in Java with Jinjava.

A template engine is a library designed to combine templates with a data to
produce documents. Template engines are used to generate large amounts of
emails, in source code preprocessing, or to produce dynamic HTML pages.

A template consists of static data and dynamic regions. The dynamic regions are
later replaced with data. The rendering function later combines the templates
with data. A template engine is used to combine templates with a data model to
produce documents.

The *Jinjava* library is a Java template engine inspired by Python's
jinja template engine.

Jinjava uses various delimiters in template string:

- {%  %} - statements

- {{  }} - expressions to print to the template output

- {#  #} - comments which are not included in the template output

- #  ## - line statements

The documents are rendered with the render method. The method 
accepts the template string and the context, which contains the data. 

&lt;dependency&gt;
    &lt;groupId&gt;com.hubspot.jinjava&lt;/groupId&gt;
    &lt;artifactId&gt;jinjava&lt;/artifactId&gt;
    &lt;version&gt;2.6.0&lt;/version&gt;
&lt;/dependency&gt;

We use the jinjava dependency.

## Jinjava simple example

The following is a Jinjava simple example.

com/zetcode/Simple.java
  

package com.zetcode;

import com.google.common.collect.Maps;
import com.hubspot.jinjava.Jinjava;

import java.util.Map;

public class Simple {

    public static void main(String[] args)  {

        var jnj = new Jinjava();

        Map&lt;String, Object&gt; context = Maps.newHashMap();
        context.put("name", "John Doe");

        String res = jnj.render("Hello {{ name }}!", context);
        System.out.println(res);
    }
}

We print a simple message.

var jnj = new Jinjava();

A Jinjava object is created.

Map&lt;String, Object&gt; context = Maps.newHashMap();
context.put("name", "John Doe");

We create a context; it contains the data passed to the template engine.

String res = jnj.render("Hello {{ name }}!", context);

We render the final ouput with render method. It accepts a template
string and the context object.

## Jinjava template from file

In the next example, we read the template from the file.

src/main/resources/message.jinja
  

{{ name }} is a {{ occupation }}.

This is the template file.

com/zetcode/FromFile.java
  

package com.zetcode;

import com.google.common.collect.Maps;
import com.hubspot.jinjava.Jinjava;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

public class FromFile {

    public static void main(String[] args) throws IOException {

        var jnj = new Jinjava();

        Map&lt;String, Object&gt; context = Maps.newHashMap();
        context.put("name", "John Doe");
        context.put("occupation", "gardener");

        String fileName = "src/main/resources/message.jinja";
        String template = Files.readString(Paths.get(fileName));

        String res = jnj.render(template, context);
        System.out.println(res);
    }
}

We read the template file with Files.readString.

Map&lt;String, Object&gt; context = Maps.newHashMap();
context.put("name", "John Doe");
context.put("occupation", "gardener");

We pass two variables in the context object.

## Jinjava for directive

The for directive is used to iterate over a data collection in a
template. 

src/main/resources/words.jinja
  

{% for word in words -%}
    {{ word }}
{% endfor %}

In the template, we use the for directive to go through the
elements of the words data structure. The - character strips whitespace
characters. 

com/zetcode/Words.java
  

package com.zetcode;

import com.google.common.collect.Maps;
import com.hubspot.jinjava.Jinjava;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class Words {

    public static void main(String[] args) throws IOException {

        var jnj = new Jinjava();

        var words = List.of("sky", "rock", "small", "bed", "food", "warm");

        Map&lt;String, Object&gt; context = Maps.newHashMap();
        context.put("words", words);

        String fileName = "src/main/resources/words.jinja";
        String template = Files.readString(Paths.get(fileName));

        String res = jnj.render(template, context);
        System.out.println(res);
    }
}

In the program, we pass an list of words to the tempate engine. We get a list
of words as the output. 

## Jinjava filter

A filter can be applied to data to modify them. Filters are applied after the |
character. 

src/main/resources/words.jinja
  

{% for word in words -%}
    {{ word }} has {{ word | length }} characters
{% endfor %}

The length filter returns the size of the string. 

com/zetcode/WordsLen.java
  

package com.zetcode;

import com.google.common.collect.Maps;
import com.hubspot.jinjava.Jinjava;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class WordsLen {

    public static void main(String[] args) throws IOException {

        var jnj = new Jinjava();

        var words = List.of("sky", "rock", "small", "bed", "food", "warm");

        Map&lt;String, Object&gt; context = Maps.newHashMap();
        context.put("words", words);

        String fileName = "src/main/resources/words.jinja";
        String template = Files.readString(Paths.get(fileName));

        String res = jnj.render(template, context);
        System.out.println(res);
    }
}

In the program, we pass a list of words to the template. We print each word and
its size. 

## Jinjava if condition

Conditions can be created with if/endif directives. 

src/main/resources/tasks.jinja
  

{%- for task in tasks -%}
    {% if task.done %}
        {{ task.title }}
    {% endif %}
{%- endfor %}

In the template file, we use the if directive to output only tasks that are
finished. 

com/zetcode/Task.java
  

package com.zetcode;

public class Task {

    private String title;
    private boolean done;

    public Task(String title, boolean done) {
        this.title = title;
        this.done = done;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }
}

This is the Task class.

com/zetcode/Tasks.java
  

package com.zetcode;

import com.google.common.collect.Maps;
import com.hubspot.jinjava.Jinjava;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class Tasks {

    public static void main(String[] args) throws IOException {

        var jnj = new Jinjava();

        var tasks = List.of(new Task("Task 1", true),
                new Task("Task 2", true), new Task("Task 3", false),
                new Task("Task 4", true), new Task("Task 5", false));

        Map&lt;String, Object&gt; context = Maps.newHashMap();
        context.put("tasks", tasks);

        String fileName = "src/main/resources/tasks.jinja";
        String template = Files.readString(Paths.get(fileName));

        String res = jnj.render(template, context);
        System.out.println(res);
    }
}

We generate on output from a list of tasks. In the output we include only
finished tasks. 

## Source

[Jinjava Github page](https://github.com/HubSpot/jinjava)

In this article we have covered the Jinjava template engine.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).