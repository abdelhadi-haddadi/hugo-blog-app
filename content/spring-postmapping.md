+++
title = "Spring @PostMapping"
date = 2025-08-29T20:11:56.433+01:00
draft = false
description = "Spring @PostMapping tutorial shows how to use @PostMapping annotation to map HTTP POST requests onto specific handler methods."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @PostMapping

last modified October 18, 2023

Spring @PostMapping tutorial shows how to use @PostMapping annotation to map
HTTP POST requests onto specific handler methods.

Spring is a popular Java application framework for creating
enterprise applications.

## @PostMapping

@PostMapping annotation maps HTTP POST requests onto specific
handler methods. It is a composed annotation that acts as a shortcut for
@RequestMapping(method = RequestMethod.POST).

## Spring @PostMapping example

The following application uses @PostMapping to create a new
resource. In this example, we use annotations to set up a Spring web
application.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           ├───config
│   │           │       MyWebInitializer.java
│   │           │       WebConfig.java
│   │           ├───controller
│   │           │       MyController.java
│   │           ├───model
│   │           │       Post.java
│   │           └───service
│   │                   PostService.java
│   └───resources
│           logback.xml
└───test
    └───java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;postmappingex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;5.3.23&lt;/spring-version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.fasterxml.jackson.core&lt;/groupId&gt;
            &lt;artifactId&gt;jackson-databind&lt;/artifactId&gt;
            &lt;version&gt;2.13.4&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.3.2&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;9.4.49.v20220914&lt;/version&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

In the pom.xml file we have the project dependencies.

resources/logback.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;
    &lt;logger name="org.springframework" level="ERROR"/&gt;
    &lt;logger name="com.zetcode" level="INFO"/&gt;

    &lt;appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender"&gt;
        &lt;encoder&gt;
            &lt;Pattern&gt;%d{HH:mm:ss.SSS} %blue(%-5level) %magenta(%logger{36}) - %msg %n
            &lt;/Pattern&gt;
        &lt;/encoder&gt;
    &lt;/appender&gt;

    &lt;root&gt;
        &lt;level value="INFO" /&gt;
        &lt;appender-ref ref="consoleAppender" /&gt;
    &lt;/root&gt;
&lt;/configuration&gt;

The logback.xml is a configuration file for the Logback logging
library.

com/zetcode/config/MyWebInitializer.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

@Configuration
public class MyWebInitializer extends
        AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class&lt;?&gt;[] getRootConfigClasses() {
        return null;
    }

    @Override
    protected Class&lt;?&gt;[] getServletConfigClasses() {

        return new Class[]{WebConfig.class};
    }

    @Override
    protected String[] getServletMappings() {

        return new String[]{"/"};
    }
}

MyWebInitializer registers the Spring
DispatcherServlet, which is a front controller for a Spring web
application.

@Override
protected Class&lt;?&gt;[] getServletConfigClasses() {

    return new Class[]{WebConfig.class};
}

The getServletConfigClasses returns a web configuration class.

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.zetcode"})
public class WebConfig {

}

The WebConfig enables Spring MVC annotations with @EnableWebMvc
and configures component scanning for the com.zetcode package.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.Post;
import com.zetcode.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;

import static org.springframework.http.ResponseEntity.ok;

@Controller
public class MyController {

    @Autowired
    private PostService postService;

    @GetMapping(value="/posts")
    public ResponseEntity&lt;Set&lt;Post&gt;&gt; all() {
        return ok().body(postService.all());
    }

    @PostMapping(value = "/posts")
    public ResponseEntity&lt;Post&gt; createPost(HttpServletRequest request,
                                        UriComponentsBuilder uriComponentsBuilder) {

        var content = request.getParameter("content");

        var post = new Post();
        post.setContent(content);

        post = postService.save(post);

        UriComponents uriComponents =
                uriComponentsBuilder.path("/posts/{id}").buildAndExpand(post.getId());
        var location = uriComponents.toUri();

        return ResponseEntity.created(location).build();
    }
}

MyController provides mappings between request paths and handler methods.

**Note:** it is a good practice to return the location of
the newly created resource in the response header.

@PostMapping(value = "/posts")
public ResponseEntity&lt;Post&gt; createPost(HttpServletRequest request,
                                    UriComponentsBuilder uriComponentsBuilder) {

The @PostMapping maps the createPost method to the
/posts URL.

var content = request.getParameter("content");

We get the content parameter of the POST request.

var post = new Post();
post.setContent(content);

post = postService.save(post);

A new post is created and saved with a post service.

UriComponents uriComponents =
    uriComponentsBuilder.path("/posts/{id}").buildAndExpand(post.getId());
var location = uriComponents.toUri();

With UriComponentsBuilder we build the location URI.

return ResponseEntity.created(location).build();

A response entity with the location URI is returned.

com/zetcode/model/Post.java
  

package com.zetcode.model;

import java.util.Objects;

public class Post {

    private Long id;
    private String content;

    public Post() {

    }

    public Post(Long id, String content) {
        this.id = id;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(id, post.id) &amp;&amp;
                Objects.equals(content, post.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, content);
    }
}

This is a simple Post bean. It has two attributes: id
and content.

com/zetcode/service/PostService.java
  

package com.zetcode.service;

import com.zetcode.model.Post;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class PostService {

    private final AtomicLong counter = new AtomicLong();

    private final Set&lt;Post&gt; posts = new HashSet&lt;&gt;(Set.of(new Post(counter.incrementAndGet(), "Post one"),
            new Post(counter.incrementAndGet(), "Post two"), new Post(counter.incrementAndGet(), "Post three"),
            new Post(counter.incrementAndGet(), "Post four")));

    public Post save(Post p) {

        var post = new Post(counter.incrementAndGet(), p.getContent());
        this.posts.add(post);

        return post;
    }

    public Set&lt;Post&gt; all() {

        return this.posts;
    }
}

A PostService has methods to save a post and return all posts. We do not implement
a database layer; instead we use a simple in-memory collection.

$ mvn jetty:run

We run the Jetty server.

$ curl -i -d "content=Post five" -X POST http://localhost:8080/posts
HTTP/1.1 201 Created
Date: Thu, 22 Sep 2022 09:10:11 GMT
Location: http://localhost:8080/posts/5
Content-Length: 0
Server: Jetty(9.4.49.v20220914)

A new post is created. Notice the location header.

$ curl localhost:8080/posts
[{"id":3,"content":"Post three"},{"id":4,"content":"Post four"},
{"id":1,"content":"Post one"},{"id":5,"content":"Post five"},{"id":2,"content":"Post two"}]

We get all posts.

In this article we have presented the @PostMapping annotation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).