+++
title = "Spring Boot banner"
date = 2025-08-29T20:12:05.372+01:00
draft = false
description = "Spring Boot banner tutorial shows how to create banners in a Spring Boot application. Banner is a text message that is displayed at the start of a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot banner

last modified July 16, 2023

Spring Boot banner tutorial shows how to create banners in Spring Boot
application.

Spring Boot is a popular application framework for creating
enterprise application in Java, Kotlin, or Groovy.

## Spring Boot banner

Spring Boot banner is a text message that is displayed at the start of a
Spring Boot application.

 .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.1)

This is how the default banner looks like. This banner can be turned off or
it is also possible to create a custom banner.

## Turning banner off

The banner can be disabled using configuration settings or programatically.

spring.main.banner-mode=off

We can turn off the banner with the spring.main.banner-mode
property.

SPRING_MAIN_BANNER-MODE=off

It is also possible to disable the banner with the
SPRING_MAIN_BANNER-MODE
environment variable.

new SpringApplicationBuilder(MyApplication.class)
    .bannerMode(Banner.Mode.OFF)
    .run(args)
...
var app = new SpringApplication(Application.class);
app.setBannerMode(Banner.Mode.OFF);
app.run(args);

Programatically, it is possible to turn off the banner with
SpringApplicationBuilder
or SpringApplication.

## Spring Boot custom banner

The banner can be specified in text file. The default name
for a banner is banner.txt. The default location of banner
files is src/main/resources.

spring.banner.location=classpath:custom-banner.txt

The default location of a text file banner can be configured with the
spring.banner.location property.

Custom ASCII banners can be created using specialized sites such as
[patorjk.com/software/taag](http://patorjk.com/software/taag).

Inside the banner.txt file, we can use any of the following
placeholders:

    
        
            Variable
            Description
        
    

    
        
            ${application.version}
            The version number of your application, as declared in MANIFEST.MF
        
        
            ${application.formatted-version}
            The version number of your application, as declared in MANIFEST.MF
                and formatted for display
        
        
            ${spring-boot.version}
            The Spring Boot version
        
        
            ${spring-boot.formatted-version}
            The Spring Boot version formatted for display
        
        
            ${application.title}
            The title of the application, as declared in MANIFEST.MF
        
    

In addition, the text can be coloured with variables such as
${AnsiColor.NAME} or ${AnsiBackground.NAME}.

**Note:** On Windows, the colours can be seen only on the built-in
IntelliJ IDEA terminal or the newest Windows terminal; it is also necessary
to set the spring.output.ansi.enabled property to always.

## Spring Boot banner example

The following application uses a custom banner.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │               Application.java
│   └───resources
│           application.properties
│           banner.txt
└── test
    ├── java
    └── resources

This is the project structure of the Spring Boot application.

build.gradle
  

plugins {
    id 'java'
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'

java {
    sourceCompatibility = '17'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
}

This is the Gradle build file. The spring-boot-starter is the core
starter that includes auto-configuration support, logging, and YAML. The
application is packaged into a JAR file.

resources/application.properties
  

spring.main.log-startup-info=false
spring.output.ansi.enabled=always

The spring.output.ansi.enabled property is needed to enable
colours on Windows.

resources/banner.txt
  

    __      __             ___
   /\ \  __/\ \           /\_ \
   \ \ \/\ \ \ \     __   \//\ \      ___     ___     ___ ___       __
    \ \ \ \ \ \ \  /'__`\   \ \ \    /'___\  / __`\ /' __` __`\   /'__`\
     \ \ \_/ \_\ \/\  __/    \_\ \_ /\ \__/ /\ \L\ \/\ \/\ \/\ \ /\  __/
      \ `\___x___/\ \____\   /\____\\ \____\\ \____/\ \_\ \_\ \_\\ \____\
       '\/__//__/  \/____/   \/____/ \/____/ \/___/  \/_/\/_/\/_/ \/____/

Application Name: ${application.title}
Application Version: ${application.version}
${AnsiColor.RED} :: Spring Boot${spring-boot.formatted-version} :: ${AnsiColor.RED}
${AnsiColor.DEFAULT}

This is our text banner. The application name and the application version are
only displayed when executing the final JAR file; i.e. not from IDE.
We use the ${AnsiColor.RED} to output the Spring Boot formatted
version in red colour.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.Banner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Application implements CommandLineRunner {

    public static void main(String[] args) {

        new SpringApplicationBuilder(Application.class)
//                .bannerMode(Banner.Mode.OFF)
                .run(args);
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Spring Boot console application");
    }
}

The Application sets up the Spring Boot application.
The CommandLineRunner interface
indicates that a bean should run when it is contained within a SpringApplication.
It can be used to create command line applications in Spring Boot.

$ ./gradlew bootRun
__      __             ___
/\ \  __/\ \           /\_ \
\ \ \/\ \ \ \     __   \//\ \      ___     ___     ___ ___       __
 \ \ \ \ \ \ \  /'__`\   \ \ \    /'___\  / __`\ /' __` __`\   /'__`\
  \ \ \_/ \_\ \/\  __/    \_\ \_ /\ \__/ /\ \L\ \/\ \/\ \/\ \ /\  __/
   \ `\___x___/\ \____\   /\____\\ \____\\ \____/\ \_\ \_\ \_\\ \____\
    '\/__//__/  \/____/   \/____/ \/____/ \/___/  \/_/\/_/\/_/ \/____/

Application Name: 
Application Version: 
:: Spring Boot (v3.1.1) :: 

Spring Boot console application

We build the application and run it.

In this tutorial we have worked with a Spring Boot banner.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).