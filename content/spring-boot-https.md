+++
title = "Spring Boot HTTPS"
date = 2025-08-29T20:12:18.609+01:00
draft = false
description = "Spring Boot HTTPS tutorial shows how to set up secure communication with HTTPS in a Spring Boot application. HTTPS is is a secure communication protocol used in Internet communication."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot HTTPS

last modified July 24, 2023

In this article we show how to set up secure communication with HTTPS in a
Spring Boot application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## HTTPS

Hypertext Transfer Protocol Secure (HTTPS) is a secure communication 
protocol used in Internet communication. It ensures data integrity and data
confidentiality. It is an extension of the HTTP protocol. In HTTPS, the
communication protocol is encrypted using Transport Layer Security (TLS) or,
int the past, the Secure Sockets Layer (SSL). The protocol is often
referred to as HTTP over TLS, or HTTP over SSL.

SSL (Secure Sockets Layer) is an industry standard protocol for keeping Internet
connections secure by protecting all sensitive data that is being sent between
systems. It prevents intruders from reading and modifying any information
transferred. TLS (Transport Layer Security) is a more recent secure version of
SSL. Today, the certificates provided by certificate authorities are based on
TLS only. These tho terms are often used interchangeably.

In Java, *truststore* is normally used to store the certificates of 
trusted entities. It maintains a store of certificates of all its trusted parties 
which it trusts. *Keystore* is used to store the server keys 
(both public and private) along with signed certificates.

## Creating TLS certificates

We can obtain a TLS certificate from a certification authority (CA), such as 
Verison, Symantec or Digicert. This takes time and costs money. 
(There is a popular free automated certificate authority called Let's Encrypt.)
Another option, which is ideal for development purposes, is to create a 
self-signed certificate. 

In this article we use a self-signed certificate.

**Note: ** when using self-signed certificates, browsers will 
complain when launching the application. We need to add the security exception
to make the application work.

## Creating self-signed certificate

First, we create a self-signed certificate. Certificates can use either of 
the following two certificate formats: PKCS12 or JKS.

Public Key Cryptographic Standards (PKCS12) is a password protected
format that can contain multiple certificates and keys; it's an industry-wide
used format. Java KeyStore (JKS) is a proprietary format similar to
PKCS12. It is limited to the Java environment.

We can use keytool or OpenSSL tools to generate the certificates
from the command line. Keytool is shipped with Java Runtime Environment and
OpenSSL could be downloaded from 
[https://www.openssl.org](https://www.openssl.org).

### The keytool

Java keytool manages a keystore (database) of cryptographic keys,
X.509 certificate chains, and trusted certificates.

$ keytool -genkeypair -alias mycert -keyalg RSA -keysize 2048 \
    -storetype PKCS12 -keystore zetcode.p12 -validity 365

With the keytool, we genereate a set of cryptographic keys and 
store them in a new keystore.  It is possible to store multiple numbers of 
key-pair in the same keystore, each identified by a unique alias.

If we do not specify the password explicitly as in our case, for the keystore,
the tool will ask for one along with a couple of other options.

The -genkeypair option generates a key pair (a public key and
associated private key). It wraps the public key into an X.509 v3 self-signed
certificate, which is stored as a single-element certificate chain. This
certificate chain and the private key are stored in a new keystore entry
identified by alias. The -alias option gives the new pair of keys a
name. The -keyalg option specifies the algorithm to be used to
generate the key pair, and the keysize value specifies the size of
each key to be generated. 

The -storetype specifies the storetype, which can be either JKS 
or PKCS12. The -keystore gives the new store a name. The 
-validity option specifies the number of days the certificate is 
valid.

## Spring Boot HTTPS example

The following application shows how to set up HTTPS with the previously created
self-signed certificate. In addition, we redirect the HTTP traffic to HTTPS.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───config
│   │           │       WebConfig.java
│   │           └───controller
│   │                   MyController.java
│   └───resources
│           application.properties
│           zetcode.p12
└───test
    └───java

This is the project structure. We move the keystore database to the 
src/main/resources directory.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
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

This is the Gradle build file. It is a very simple web application,
so we need only the spring-boot-starter-web starter. 

resources/application.properties
  

server.port=8443
server.ssl.key-alias=mycert
server.ssl.key-store-password=s$cret
server.ssl.key-store=classpath:zetcode.p12
server.ssl.key-store-provider=SUN
server.ssl.key-store-type=PKCS12

In the application.properties, we configure the application. 
We specify the port, key-pair alias, keystore password, keystore location, 
provider and type. 

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {

    @Bean
    public ServletWebServerFactory servletContainer() {

        var tomcat = new TomcatServletWebServerFactory() {

            @Override
            protected void postProcessContext(Context context) {

                var securityConstraint = new SecurityConstraint();
                securityConstraint.setUserConstraint("CONFIDENTIAL");

                var collection = new SecurityCollection();
                collection.addPattern("/*");
                securityConstraint.addCollection(collection);
                context.addConstraint(securityConstraint);
            }
        };

        tomcat.addAdditionalTomcatConnectors(redirectConnector());
        return tomcat;
    }

    private Connector redirectConnector() {

        var connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        connector.setPort(8080);
        connector.setSecure(false);
        connector.setRedirectPort(8443);

        return connector;
    }
}

In WebConfig, we configure Tomcat (the default Spring Boot 
embedded server) to redirect HTTP traffic automatically to HTTPS.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping(value = "/hello", produces = MediaType.TEXT_PLAIN_VALUE)
    public String hello(){

        return "hello there";
    }
}

In our controller, we have a simple page that returns a text message.

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

Application is the entry point which sets up Spring Boot
application.

We run the application with ./gradlew -q bootRun and navigate 
to the https://localhost:8443/hello. Note that when the application 
is launched for the first time, the browser gives a huge error message that 
the site certificate is not trusted. We need to add a security exception for
our application to make it work. 

In this article we have shown how to create a self-signed certificate and 
set up a Spring Boot application for HTTPS with this certificate.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).