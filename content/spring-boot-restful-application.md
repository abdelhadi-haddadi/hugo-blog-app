+++
title = "Spring Boot RESTFul application"
date = 2025-08-27T23:20:57.179+01:00
draft = false
description = "Spring Boot RESTful application tutorial shows how to create a simple Spring Boot RESTful application."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot RESTFul application

last modified July 13, 2020 

In this tutorial, we are going to create a simple Spring Boot RESTful application. 
Our application will be deployed on an embedded Tomcat server.

We show how to return data in JSON and XML formats from our web service.

## Spring Boot

Spring is a popular Java application framework for creating enterprise applications.
Spring Boot is a way to create stand-alone, production-grade 
Spring based applications with minimal effort.

## RESTFul application

A RESTFul application creates a system (API) that follows the REST architectural style, 
which is used for designing networked applications. RESTful applications use HTTP requests 
perform CRUD (Create/Read/Update/Delete) operations on resources.

## Spring Boot RESTFul simple example

The following code example creates a web service that reads data from 
a CSV file and returns it in JSON format to the client.

$ tree
.
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── Application.java
    │   │           ├── bean
    │   │           │   └── Country.java
    │   │           ├── controller
    │   │           │   └── MyController.java
    │   │           └── service
    │   │               ├── CountryService.java
    │   │               └── ICountryService.java
    │   └── resources
    │       ├── application.yml
    │       └── countries.csv
    └── test
        └── java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;SpringBootRest&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;name&gt;SpringBootRest&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;         
    &lt;/properties&gt;
    
    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;1.5.3.RELEASE&lt;/version&gt;
    &lt;/parent&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;com.opencsv&lt;/groupId&gt;
            &lt;artifactId&gt;opencsv&lt;/artifactId&gt;
            &lt;version&gt;3.8&lt;/version&gt;
        &lt;/dependency&gt;         
    &lt;/dependencies&gt;    

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
            &lt;/plugin&gt;            
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven build file. The opencsv is used for working with CSV 
data. The spring-boot-starter-web is a starter for 
building web and RESTful applications. The application is packaged
into an executable JAR file. The executable JAR is created with the 
spring-boot-maven-plugin.

application.yml
  

server:
  port: 8086
  contextPath: /rest

The application.yml file contains various configuration settings of a Spring Boot
application. We have mappings for server port and context path (application name). The 
file is located in the in the src/main/resources directory.

countries.csv
  

Country, Population
Slovakia,5429000
Norway,5271000
Croatia,4225000
Russia,143439000
Mexico,122273000
Vietnam,95261000
Sweden,9967000
Iceland,337600
Israel,8622000
Hungary,9830000
Germany,82175700
Japan,126650000

The countries.csv, located in the src/main/resources directory, 
contains the data that is used in our application.

com/zetcode/Country.java
  

package com.zetcode.bean;

public class Country {

    private String name;
    private int population;

    public Country() {
    }

    public Country(String name, int population) {

        this.name = name;
        this.population = population;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }
}

The fields from the countries.csv file are mapped to the 
Country class.

com/zetcode/ICountryService.java
  

package com.zetcode.service;

import com.zetcode.bean.Country;
import java.util.ArrayList;

public interface ICountryService {
    
    public ArrayList&lt;Country&gt; findAll();
}

This is the ICountryService interface. It contains one method
called findAll.

com/zetcode/CountryService.java
  

package com.zetcode.service;

import com.opencsv.CSVReader;
import com.zetcode.bean.Country;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;

@Service
public class CountryService implements ICountryService {

    private final ArrayList&lt;Country&gt; countries;

    public CountryService() {

        countries = new ArrayList();
    }

    @Override
    public ArrayList&lt;Country&gt; findAll() {

        FileInputStream fis = null;

        try {

            String fileName = "src/main/resources/countries.csv";

            fis = new FileInputStream(new File(fileName));
            CSVReader reader = new CSVReader(new InputStreamReader(fis));
            String[] nextLine;
            reader.readNext();
            
            while ((nextLine = reader.readNext()) != null) {

                Country newCountry = new Country(nextLine[0],
                        Integer.valueOf(nextLine[1]));
                countries.add(newCountry);
            }

        } catch (FileNotFoundException ex) {
            Logger.getLogger(CountryService.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(CountryService.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException ex) {
                Logger.getLogger(CountryService.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return countries;
    }
}

This is the implementation of the ICountryService contract.
It contains the findAll method that reads data from 
the countries.csv file and returns a list of Country
objects.

com/zetcode/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.Country;
import com.zetcode.service.ICountryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @Autowired
    private ICountryService countryService;

    @RequestMapping("/countries")
    public List&lt;Country&gt; listCountries() {
        
        return countryService.findAll();
    }
}

This is the controller class for the Spring Boot RESTful application. The @RestController annotation 
creates a RESTful controller. While the traditional 
MVC controller uses ModelAndView, the RESTful controller 
simply returns the object and the object data is written directly to the HTTP response 
in JSON or XML format. 

@Autowired
private ICountryService countryService;

We inject a CountryService into the countryService
variable.

@RequestMapping("/countries")
public List&lt;Country&gt; listCountries() {

    return countryService.findAll();
}

The @RequestMapping annotation is used to map web requests to Spring 
controller methods. Here we map a request with the /countries path
to the controller's listCountries method. The default request is
a GET request.

We do not need to convert the Country domain object to JSON manually. 
Because Jackson 2 is on the classpath, Spring chooses MappingJackson2HttpMessageConverter 
automatically to convert the Country instance to JSON.

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

The Application sets up the Spring Boot application. 
The @SpringBootApplication enables auto-configuration
and component scanning.

$ mvn package

With mvn package command, we build the application.

$ mvn spring-boot:run

With mvn spring-boot:run command, we run the application.
The application is deployed on embedded Tomcat server.

$ curl localhost:8086/rest/countries
[{"name":"Slovakia","population":5429000},{"name":"Norway","population":5271000},
{"name":"Croatia","population":4225000},{"name":"Russia","population":143439000},
{"name":"Mexico","population":122273000},{"name":"Vietnam","population":95261000},
{"name":"Sweden","population":9967000},{"name":"Iceland","population":337600},
{"name":"Israel","population":8622000},{"name":"Hungary","population":9830000},
{"name":"Germany","population":82175700},{"name":"Japan","population":126650000}]

With the curl command, we test the application.

## Returning XML data

To return XML data instead of JSON, we need to add a dependency and modify the controller.

&lt;dependency&gt;
    &lt;groupId&gt;com.fasterxml.jackson.dataformat&lt;/groupId&gt;
    &lt;artifactId&gt;jackson-dataformat-xml&lt;/artifactId&gt;
&lt;/dependency&gt;      

We add the jackson-dataformat-xml to the dependencies.

com/zetcode/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.Country;
import com.zetcode.service.ICountryService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @Autowired
    private ICountryService countryService;

    @RequestMapping(value="/countries", method=RequestMethod.GET, 
            produces=MediaType.APPLICATION_XML_VALUE)
    public List&lt;Country&gt; listCountries() {
    
        return countryService.findAll();
    }
}

We choose the MediaType.APPLICATION_XML_VALUE type to tell
the controller to return XML data.

In this tutorial, we have created a Spring Boot RESTful application returning
data in JSON and XML.