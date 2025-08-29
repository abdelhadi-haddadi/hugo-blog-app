+++
title = "Spring Boot RestTemplate"
date = 2025-08-29T20:12:30.968+01:00
draft = false
description = "Spring Boot RestTemplate tutorial shows how to use RestTemplate to create synchronous HTTP requests in a Spring application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot RestTemplate

last modified July 28, 2023

Spring Boot RestTemplate tutorial shows how to use RestTemplate to
create synchronous HTTP requests in a Spring application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## RestTemplate

RestTemplate is a synchronous client to perform HTTP requests. It
uses a simple, template method API over underlying HTTP client libraries such as
the JDK HttpURLConnection, Apache HttpComponents, and others.

Since Spring 5.0, a new client WebClient is available that can be
use do create both synchronous and asynchronous requests. In the future
releases, RestTemplate will be deprecated in favour of
WebClient.

## Spring Boot RestTemplate example

In the following application we create a custom test server that produces
JSON data and use RestTemplate to generate a HTTP request and consume
the returned JSON data.

## Creating JSON server

 We use Node to create a JSON test server for our purposes.

$ node --version
v20.4.0

We show the version of Node.

$ npm init -y
$ npm i -g json-server
$ npm i @faker-js/faker fs

We initialize a Node projet and install json-server,
faker, and fs modules. The json-server is
used to create a test JSON server, faker to generate test data, and
fs to work with filesystem in JavaScript.

generate_fake_users.js
  

import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs'

function generateUsers() {

    let users = []

    for (let id=1; id &lt;= 100; id++) {

        let firstName = faker.person.firstName()
        let lastName = faker.person.lastName()
        let email = faker.internet.email()

        users.push({
            "id": id,
            "first_name": firstName,
            "last_name": lastName,
            "email": email
        })
    }

    return { "users": users }
}

let dataObj = generateUsers();

writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));

With faker we generate one hundred users with id, first name, last name, and
email attributes. The data is written to data.json  file. The file
is used by json-server.

$ node generate_fake_users.js

We generate one hundred fake users.

$ json-server --watch data.json

\{^_^}/ hi!

Loading data.json
Done

Resources
http://localhost:3000/users

Home
http://localhost:3000

We start the json-server. Now we can create a request to the
http://localhost:3000/users resource to get one hundred users in
JSON.

## Spring Boot application

We create a Spring Boot application. We need the following Maven dependencies and plugins:
spring-boot-starter, spring-web, jackson-databind,
spring-boot-starter-test, and spring-boot-maven-plugin.

application.properties
  

spring.main.banner-mode=off
logging.level.root=INFO
logging.pattern.console=%d{dd-MM-yyyy HH:mm:ss} %magenta([%thread]) %highlight(%-5level) %logger.%M - %msg%n

myrest.url=http://localhost:3000/users

The application.properties is the main configuration file in Spring Boot.
We turn off the Spring banner, set the logging level to info, and set the
console logging pattern. We also set an URL property which points to the users resource.
The property is going to be later retrieved with @Value.

com/zetcode/model/User.java
  

package com.zetcode.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {

    private int id;
    private String firstName;
    private String lastName;
    private String email;

    public int getId() {

        return id;
    }

    public void setId(int id) {

        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    @JsonProperty("first_name")
    public void setFirstName(String firstName) {

        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    @JsonProperty("last_name")
    public void setLastName(String lastName) {

        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    @Override
    public String toString() {

        final var sb = new StringBuilder("User{");
        sb.append("id=").append(id);
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", email='").append(email).append('\'');
        sb.append('}');

        return sb.toString();
    }
}

The User bean maps to the JSON user object. Spring uses Jackson
library to bind JSON data to Java classes. Since the JSON attributes do not
match the Java attributes, we use @JsonProperty to fix this.

com/zetcode/config/AppConfig.java
  

package com.zetcode.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class AppConfig {
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {

        return builder
                .setConnectTimeout(Duration.ofMillis(3000))
                .setReadTimeout(Duration.ofMillis(3000))
                .build();
    }
}

We create a configuration bean with RestTemplateBuilder. It sets up
the RestTemplate. We set the connection and read timeouts.

com/zetcode/service/MyRestService.java
  

package com.zetcode.service;

import com.zetcode.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MyRestService {

    private final RestTemplate myRestTemplate;

    @Value("${myrest.url}")
    private String restUrl;

    @Autowired
    public MyRestService(RestTemplate myRestTemplate) {
        this.myRestTemplate = myRestTemplate;
    }

    public User[] getUsers() {

        return myRestTemplate.getForObject(restUrl, User[].class);
    }
}

MyRestService is the service class that generates the HTTP request.
It fetches all users from the JSON test server.

@Autowired
public MyRestService(RestTemplate myRestTemplate) {
    this.myRestTemplate = myRestTemplate;
}

We inject the RestTemplate bean.

@Value("${myrest.url}")
private String restUrl;

From the configuration, we get the URL using @Value annotation.

var users = myRestTemplate.getForObject(restUrl, User[].class);

We use the getForObject method to generate the request.
Since we expect an array of objects, we use User[].class syntaxs.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.service.MyRestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    private final MyRestService myRestService;

    @Autowired
    public MyRunner(MyRestService myRestService) {
        this.myRestService = myRestService;
    }

    @Override
    public void run(String... args) throws Exception {

        var users = myRestService.getUsers();

        Arrays.stream(users).limit(10).forEach(todo -&gt; logger.info("{}", todo));
    }
}

MyRunner uses the MyRestService to get the users.
We show first ten users to the console.

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

Application is the entry point which sets up Spring Boot
application.

com/zetcode/ApplicationTests.java
  

package com.zetcode;

import com.zetcode.config.AppConfig;
import com.zetcode.service.MyRestService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;

@RestClientTest(value = {MyRestService.class, AppConfig.class})
public class ApplicationTests {

    @Autowired
    private MyRestService service;

    @Test
    public void usersNotEmpty() throws Exception {

        var users = this.service.getUsers();
        assertThat(users).isNotEmpty();
    }

    @Test
    public void hasSizeOneHundred() throws Exception {

        var users = this.service.getUsers();
        assertThat(users).hasSize(100);

        System.out.println(Arrays.toString(users));
    }
}

We test the getUsers service method. We test that the JSON data is
not empty and that it contains one hundred elements.

@RestClientTest(value={MyRestService.class, AppConfig.class})

The @RestClientTest annotation is used to test Spring rest clients.
It disables full auto-configuration and applies only configuration relevant to
rest client tests.

$ ./gradlew bootRun
...
... - User{id=1, firstName='Ofelia', lastName='Hintz', email='Gustave.Von43@yahoo.com'}
... - User{id=2, firstName='Brian', lastName='Marvin', email='Marina.Shields@hotmail.com'}
... - User{id=3, firstName='Adah', lastName='Marquardt', email='Osbaldo_Halvorson55@hotmail.com'}
... - User{id=4, firstName='Jaycee', lastName='Kulas', email='Claud85@gmail.com'}
...

We run the application.

In this article we have shown how to use RestTemplate to create
synchronous requests in a Spring application. The REST data came from a test
JSON server created by Node.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).