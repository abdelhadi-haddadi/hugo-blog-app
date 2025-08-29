+++
title = "Spring Boot Docker"
date = 2025-08-29T20:12:13.808+01:00
draft = false
description = "Spring Boot Docker tutorial shows how to dockerize Spring Boot applications."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Docker

last modified July 31, 2023

Spring Boot Docker tutorial shows how to dockerize Spring Boot applications.

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications without much hassle.

Application containerization is an OS-level virtualization method
used to deploy and run distributed applications without having to create an
entire virtual machine for each application. With containers, it is possible to
run multiple isolated applications or services on a single host and access the
same OS kernel. Containers work on bare-metal systems, cloud instances or
virtual machines.

## Docker

Docker is a tool designed to simplify creating, deploying, and running
applications by using containers. A container is a standard unit of software
that packages up code and all its dependencies so the application runs quickly
and reliably from one computing environment to another.

A Docker image is a file, comprised of multiple layers, used to execute code in
a Docker container. Dockerfile is a text document that contains all
the commands to assemble an image. The image is created with the docker
build command.

## Spring Boot Docker example

In the following example, we create a Spring Boot application and place it 
into the Docker image.

build.gradle
Dockerfile
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │               Application.java
│   └───resources
└───test
    └───java

This is the project structure.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file. We create a simple web application so we only
need the spring-boot-starter-web dependency.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application  {

    @GetMapping(value="/", produces=MediaType.TEXT_PLAIN_VALUE)
    public String home() {

        return "home page";
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

The application consists of this simple file. The application returns
a simple text.

DockerFile
  

FROM openjdk:17-jdk-alpine3.14
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

This is the Dockerfile. The FROM command instructs
Docker to set a base image. In our case, it is FROM openjdk:17-jdk-alpine.
It is based on OpenJDK and Alpine Linux. Alpine is a lightweight Linux distribution.
The ARG command  defines a variable that can be passed at build-time to
the builder. 

The COPY command copies the specified file to the image. In our
case, we copy the executable JAR. The ENTRYPOINT defines how to
execute the application inside the container.

$ docker build -t myapp .

We build the image with the docker build command. With the
-t option we specify the image name. The last parameter is the
Docker path, which tells where to fild the Dockerfile.

$ docker image ls
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
myapp        latest    1f2f838a5754   5 minutes ago   345MB

We can list our new image with the docker image ls command.

$ docker run -d -p 8080:8080 90b1c3e39075

We run the cointaner with the docker run command. With the
-d option, we run the container in *detached mode*.
It means that a Docker container runs in the background of the terminal.
With the -p option, we expose the container's 8080 port to
the host's 8080. (The host value is first.)

$ docker ps
CONTAINER ID   IMAGE          COMMAND                CREATED          STATUS          PORTS                    NAMES
9405f91a00ec   1f2f838a5754   "java -jar /app.jar"   58 seconds ago   Up 57 seconds   0.0.0.0:8080-&gt;8080/tcp   hopeful_kare

With the docker ps, we can list the running containers.

$ curl localhost:8080
home page

We create a request to the Spring Boot application.

$ docker stop 9405f91a00ec

We stop the container with the docker stop command.

## Upload Spring Boot image to Docker hub

First, we need to create an account at [hub.docker.com](https://hub.docker.com/).

$ docker login

We log into the Docker hub with the docker login command.

$ docker tag myapp janbodnar/spring-boot-simple:first

We tag the image for uploading with the code docker tag command.
Tags are used to add version information about an image.

$ docker image ls
REPOSITORY                     TAG       IMAGE ID       CREATED          SIZE
janbodnar/spring-boot-simple   first     1f2f838a5754   12 minutes ago   345MB
myapp                          latest    1f2f838a5754   12 minutes ago   345MB

Now we have a tagged image.

$ docker push janbodnar/spring-boot-simple:first

We push the image into the hub with the docker push command.

$ docker rmi -f 1f2f838a5754

We remove the local image with the docker rmi command.

$ docker pull janbodnar/spring-boot-simple:first

The image can be downloaded from the hub using the docker pull
command.

In this article we have dockerized a simple Spring Boot web application
and showed how to upload it to Docker hub.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).