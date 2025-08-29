+++
title = "Spring Boot upload file"
date = 2025-08-29T20:12:37.729+01:00
draft = false
description = "Spring Boot upload file tutorial shows how to upload a single file with Spring Boot framework."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot upload file

last modified July 29, 2023

In this article we show how to upload a single file with Spring Boot framework.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring which helps create stand-alone, production-grade Spring 
based applications easily.

## HTML form encoding types

There are three encoding HTML form types for a POST request:

- application/x-www-form-urlencoded

- multipart/form-data

- text/plain

The application/x-www-form-urlencoded is the default encoding, where 
the values are encoded in key-value tuples separated by &amp;. The = 
character is used between the key and the value. Non-alphanumeric characters are 
percent encoded. This encoding type is not suitable for binary files.

The multipart/form-data is used for non-acsii data and binary files.
The input element's type attribute is set to 
file.

The text/plain is used for debugging.

## Spring upload file example

In the following example we have a web form to select a file to be uploaded to
the server. The file is uploaded to the /var/www/upload/ directory.

**Note: ** For simplicity reasons, we do not include code that
checks if the file is indeed an image. This is a complex code that prevents 
uploading web shells.

### Upload directory

The /var/www/ directory is a standard directory for web content in
Debian Linux.

$ ls -ld /var/www/upload/
drwxrwxr-x 2 www-data www-data 4096 Dec  3 14:29 /var/www/upload/

We are going to upload files to the /var/www/upload/ directory.
The directory files can be modified by users who are in the www-data
group. So the user who runs the web server must be in this group.

### Application

The following are the sources of the Spring Boot web application.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───controller
│   │           │       MyController.java
│   │           ├───exception
│   │           │       StorageException.java
│   │           └───service
│   │                   StorageService.java
│   └───resources
│       │   application.properties
│       └───static
│               failure.html
│               index.html
│               success.html
└───test
    └───java

This is the project structure of the Spring application.

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
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.exception.StorageException;
import com.zetcode.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class MyController {

    private final StorageService storageService;

    @Autowired
    public MyController(StorageService storageService) {
        this.storageService = storageService;
    }

    @RequestMapping(value = "/doUpload", method = RequestMethod.POST,
            consumes = {"multipart/form-data"})
    public String upload(@RequestParam MultipartFile file) {

        storageService.uploadFile(file);

        return "redirect:/success.html";
    }

    @ExceptionHandler(StorageException.class)
    public String handleStorageFileNotFound(StorageException e) {

        return "redirect:/failure.html";
    }
}

The MyController reads the file from the request and saves it
into the chosen directory.

private final StorageService storageService;

@Autowired
public MyController(StorageService storageService) {
    this.storageService = storageService;
}

The StoreageService stores the file on the disk.

@RequestMapping(value = "/doUpload", method = RequestMethod.POST,
    consumes = {"multipart/form-data"})
public String upload(@RequestParam MultipartFile file) {

The upload method is mapped to the doUpload URL pattern.
Since we are sending data to the server, we use the POST request. The request
parameter has the MultipartFile type.

return "redirect:/success.html";

We show a message upon successfull file upload.

@ExceptionHandler(StorageException.class)
public String handleStorageFileNotFound(StorageException e) {

    return "redirect:/failure.html";
}

We have a handler for the StorageException.

com/zetcode/exception/StorageException.java
  

package com.zetcode.exception;

public class StorageException extends RuntimeException {

    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}

This is our custom StorageException. It is thrown when the 
file cannot be stored on the filesystem.

com/zetcode/service/StorageService.java
  

package com.zetcode.service;

import com.zetcode.exception.StorageException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class StorageService {

    @Value("${upload.path}")
    private String path;

    public void uploadFile(MultipartFile file) {

        if (file.isEmpty()) {

            throw new StorageException("Failed to store empty file");
        }

        try {
            var fileName = file.getOriginalFilename();
            var is = file.getInputStream();

            Files.copy(is, Paths.get(String.format("%s/%s", path, fileName)),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {

            var msg = String.format("Failed to store file %s", file.getName());

            throw new StorageException(msg, e);
        }
    }
}

StorageService copies the data from the inputstream and saves it on 
the disk.

@Value("${upload.path}")
private String path;

We read the upload directory from the application.properties file
using the @Value annotation.

if (file.isEmpty()) {
    throw new StorageException("Failed to store empty file");
}

We ensure that a file has been chosen with the isEmpty method.

var fileName = file.getOriginalFilename();

We get the file name with the getOriginalFilename method.

var is = file.getInputStream();

We get the input stream with the getInputStream method.

Files.copy(is, Paths.get(String.format("%s/%s", path, fileName)),
    StandardCopyOption.REPLACE_EXISTING);

The file is copied to the destination directory from the input stream source
with Files.copy.

resources/application.properties
  

upload.path=/var/www/upload/

In the application.properties, we have an upload.path
property that specifies the upload directory.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;title&gt;Uploading file&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;Uploading file&lt;/h1&gt;

        &lt;form action="/doUpload" method="post" enctype="multipart/form-data"&gt;
            &lt;label&gt;Enter file&lt;/label&gt;
            &lt;input type="file" name="file"&gt;
            &lt;button type="submit"&gt;Upload&lt;/button&gt;
        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It is a static file located in the src/main/resources/static
directory. It contains a form to select a file and send it to the Spring application.

&lt;form action="/doUpload" method="post" enctype="multipart/form-data"&gt;

We have chosen the doUpload URL pattern. A request created by this form
will be processed by a Spring controller.
The enctype attribute specifies the multipart/form-data
encoding type, which is required for uploading a file with an HTML form.

&lt;input type="file" name="file"&gt;

The type attribute of the input tag lets a user choose a file.

&lt;button type="submit"&gt;Upload&lt;/button&gt;

Finally, this is a Submit button.

resources/static/success.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;title&gt;Success&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;File successfully uploaded&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

The success.html is shown when the file is successfully uploaded 
to the server.

resources/static/failure.html
  

&lt;!DOCTYPE html&gt;
&lt;htm lang="en"l&gt;
    &lt;head&gt;
        &lt;title&gt;Failure&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;Failed to upload file&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

The failure.html is shown when the file upload failed.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application  {
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

This code sets up the Spring Boot application.

In this article we have learned how to upload a file in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).