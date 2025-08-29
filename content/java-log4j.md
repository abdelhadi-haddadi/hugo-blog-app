+++
title = "Java Log4j"
date = 2025-08-29T20:00:00.669+01:00
draft = false
description = "Java Log4j tutorial defines logging, introduces the Log4j library, and demonstrates logging in several code examples."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Log4j

last modified January 27, 2024

 

Java Log4j tutorial defines logging, introduces Log4j library, and demonstrates logging 
in several code examples.

## Logging

Logging is the process of writing information into log files. Log files
include information about various events that happened in operating system, software, or
in communication.

## Purpose of logging

Logging is done for the following purposes:

- Troubleshooting

- Information gathering

- Profiling

- Auditing

- Generating statistics

Logging is not limited to identifying errors in software development. It is also used 
in detecting security incidents, monitoring policy violations, providing information in case
of problems, finding application bottlenecks, or generating usage data.

## Which events to log

Events that should be logged include input validation failures, authentication and authorization
failures, application errors, configuration changes, and application start-ups and shut-downs.

## Which events not to log

Events that should not be logged include application source code, session identification values,
access tokens, sensitive personal data, passwords, database connection strings, encryption keys,
bank account and card holder data.

## Logging best practices

The following are some best practices for doing logging:

- Logging should be meaningful.

- Logging should be structured and done at different levels.

- Logging should contain context.

- Logging messages should be understandable to humans and parsable by machines.

- Logging should be balanced; it should not include too little or too much information.

- Logging should be adapted to development and to production.

- Logging in more complex applications should be divided into several log files.

## Log4j

Apache Log4j is a Java-based logging utility. It is a project of
the Apache Software Foundation. Log4j can be configured through Java code or
in a configuration file. Configuration files can be  written in XML, JSON,
YAML, or properties file format.

## Log4j components

Log4j has three main components: loggers, appenders, and layouts. Loggers are
named destinations that capture log messages and send them to appenders.
Appenders deliver log messages to their  destinations, such as files, sockets,
or consoles. Layouts are used to define the formatting of log messages.

## Root logger

Log4j has a specific built-in logger called the root looger. It sits at the
top of the hierarchy and is always present, even if not configured. It writes
messages for all classes in the application.  If we do not want messages from
a specific logger to be passed to the root logger, we change the 
additivity attribute of the looger to false.

## Package specific logging

We may want to limit logging to some Java package. In case of XML configuration, we
set the package specific logging with the name attribute.

&lt;Logger name="com.zetcode.work" level="info" additivity="false" &gt;
    &lt;AppenderRef ref="MyFile" /&gt;
&lt;/Logger&gt;

With this logger, we deliver info level event messages to a log file destination from
the com.zetcode.work package. With additivity set to false,
the messages are not propagated to the root logger.

## Log4j event levels

Levels are used for identifying the severity of an event. Levels are organized from most 
to least specific:

- OFF - most specific, no logging

- FATAL - severe errors that will prevent the application from continuing; very specific, little data

- ERROR - serious errors, possibly recoverable

- WARN - potentionally harmful messages

- INFO - informational messages

- DEBUG - general debugging events

TRACE - fine-grained debug messages, typically capturing the flow through the application; 
    little specific, a lot of data
- ALL - least specific, all data

The following table shows how logging levels works.

Logging level rules

    
      Event level
      Configuration level
    
    
        ALL
        TRACE
        DEBUG
        INFO
        WARN
        ERROR
        FATAL
        OFF
    

    
        ALL
        YES
        YES
        YES
        YES
        YES
        YES
        YES
        NO        
    
    
    
        TRACE
        YES
        YES
        NO
        NO
        NO
        NO
        NO
        NO        
        
    
    
        DEBUG
        YES
        YES
        YES
        NO
        NO        
        NO
        NO
        NO        
       
    
    
        INFO
        YES
        YES
        YES
        YES        
        NO
        NO
        NO
        NO
        
    
    
        WARN
        YES
        YES
        YES
        YES           
        YES
        NO
        NO
        NO
      
    
    
        ERROR
        YES
        YES
        YES         
        YES
        YES
        YES
        NO
        NO
       
    
    
        FATAL
        YES
        YES
        YES
        YES
        YES
        YES
        YES
        NO        
       

The table illustrates how event and configuration levels work. If we log a message at a 
Debug level and the configuration is Warn, the message is not passed. If we log a message 
at an Info level and the configuration level is Debug, then the message is passed to its destination.

## Log4j basic example

In the first example, we set up Log4j for a simple Java console 
application.

pom.xml
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           └── JavaLog4jEx.java
│   └── resources
│       └── log4j2.xml
└── test
    └── java

This is the project structure. The Log4j configuration file is located
in the src/main/resources directory. We use the XML format.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JavaLog4jEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
    
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.logging.log4j&lt;/groupId&gt;
            &lt;artifactId&gt;log4j-core&lt;/artifactId&gt;
            &lt;version&gt;2.13.1&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;
    
&lt;/project&gt;

This is the Maven pom.xml file. We include the log4j-core dependency.

com/zetcode/JavaLog4jEx.java
  

package com.zetcode;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class JavaLog4jEx {

    private static final Logger logger = LogManager.getLogger(JavaLog4jEx.class);
    
    public static void main(String[] args) {
        
        logger.info("The main() method is called");
        
        doWork();
        
        logger.warn("Warning message");
        logger.error("Error message");
    }
    
    public static void doWork() {
        
        // doing some work
        
        logger.info("The doWork() method is called");
    }
}

This is a simple Java console example.

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

We import the LogManager and Logger classes.

private static final Logger logger = LogManager.getLogger(JavaLog4jEx.class);

From the LogManager, we get the logger.

logger.info("The main() method is called");

doWork();

logger.warn("Warning message");
logger.error("Error message");

We generate information, warning, and error messages. 

resources/log4j2.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;Configuration status="info"&gt;
    &lt;Properties&gt;
        &lt;Property name="layout"&gt;%d [%t] %-5level %logger - %m%n&lt;/Property&gt;
    &lt;/Properties&gt;
  
    &lt;Appenders&gt;
  
        &lt;Console name="Console" target="SYSTEM_OUT"&gt;
            &lt;PatternLayout pattern="${layout}" /&gt;
        &lt;/Console&gt;     

    &lt;/Appenders&gt;
    
    &lt;Loggers&gt;

        &lt;Logger name="com.zetcode" level="info" additivity="false" &gt;
            &lt;AppenderRef ref="Console" /&gt;
        &lt;/Logger&gt;
    
        &lt;Root level="error"&gt;
            &lt;AppenderRef ref="Console" /&gt;
        &lt;/Root&gt;    

    &lt;/Loggers&gt;
&lt;/Configuration&gt;

Log4j is configured in the log4j2.xml. We have chosen
the XML file format.

&lt;Properties&gt;
    &lt;Property name="layout"&gt;%d [%t] %-5level %logger - %m%n&lt;/Property&gt;
&lt;/Properties&gt;

In the Properties tag, we set the logging directory and layout. 
The layouts define the format of the log message. 

The pattern layout consists of conversion specifiers. Each specifier starts with a percent 
sign and is followed by optional format modifier and mandatory conversion character. The %d 
outputs the date of the logging event. 
The %t outputs the name of the thread that generated the logging event.
The %-5level outputs the level of the logging event, where the level name has
minimum of five characters and the characters are left justified. The %logger outputs the name of the 
logger that published the logging event. The %m prints the application message associated 
with the logging event and the %n is the platform dependent line separator character 
or characters.

&lt;Appenders&gt;

    &lt;Console name="Console" target="SYSTEM_OUT"&gt;
        &lt;PatternLayout pattern="${layout}" /&gt;
    &lt;/Console&gt;     

&lt;/Appenders&gt;

Appenders are objects which define where logging messages are sent. We define
one console appender; it writes messages to the standard output using the above
mentioned layout.

&lt;Loggers&gt;

    &lt;Logger name="com.zetcode" level="info" additivity="false" &gt;
        &lt;AppenderRef ref="Console" /&gt;
    &lt;/Logger&gt;

    &lt;Root level="error"&gt;
        &lt;AppenderRef ref="Console" /&gt;
    &lt;/Root&gt;    

&lt;/Loggers&gt;

We have two loggers. The com.zetcode logger has level info and the 
root logger has level error. Both loggers use the Console appender, i.e. they 
deliver messages to the console. With additivity set to false,
the com.zetcode's messages are not propagated to the root logger. In other
words, the messages are not printed twice to the console.

2020-03-29 18:37:11,775 [main] INFO  com.zetcode.JavaLog4jEx - The main() method is called
2020-03-29 18:37:11,780 [main] INFO  com.zetcode.JavaLog4jEx - The doWork() method is called
2020-03-29 18:37:11,780 [main] WARN  com.zetcode.JavaLog4jEx - Warning message
2020-03-29 18:37:11,780 [main] ERROR com.zetcode.JavaLog4jEx - Error message

After running the example, we have these messages in the console.

## Log4j basic example II

In the next example, we explain additional features of Log4j. We will write messages to
a file and define a package-specific logger.

pom.xml
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── main
│   │           │   └── JavaLog4jEx2.java
│   │           └── work
│   │               └── MyWork.java
│   └── resources
│       └── log4j2.xml
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
    &lt;artifactId&gt;JavaLog4jEx2&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
    
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.logging.log4j&lt;/groupId&gt;
            &lt;artifactId&gt;log4j-core&lt;/artifactId&gt;
            &lt;version&gt;2.13.1&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

&lt;/project&gt;

This is the pom.xml file.

com/zetcode/main/JavaLog4jEx2.java
  

package com.zetcode.main;

import com.zetcode.work.MyWork;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class JavaLog4jEx2 {

    private static final Logger logger = LogManager.getLogger(JavaLog4jEx2.class);
    
    public static void main(String[] args) {
        
        logger.info("The main() method is called");
        
        doJob();
        
        MyWork mw = new MyWork();
        mw.doMyWork();
    }
    
    public static void doJob() {
        
        // doing some job
        
        logger.info("The doJob() method is called");
    }
}

This is the main application file. It calls a couple of methods which do some
logging.

com/zetcode/work/MyWork.java
  

package com.zetcode.work;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class MyWork {

    private static final Logger logger = LogManager.getLogger(MyWork.class);
    
    public void doMyWork() {
        
        // doing some work
        
        logger.info("doMyWork() method called");
    }
}

We have a simple method that logs an information message. Its class is in
the com.zetcode.work package. We define a logger that will log
message only from this package.

resources/log4j2.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;Configuration status="info"&gt;
    &lt;Properties&gt;
        &lt;Property name="layout"&gt;%d [%t] %-5level %logger{36} - %m%n&lt;/Property&gt;
    &lt;/Properties&gt;
  
    &lt;Appenders&gt;
  
        &lt;Console name="Console"&gt;
            &lt;PatternLayout pattern="${layout}" /&gt;
        &lt;/Console&gt;     
        
        &lt;File name="MyFile" fileName="/home/user7/tmp/mylog.log" append="false"&gt;
            &lt;PatternLayout pattern="${layout}"/&gt;
        &lt;/File&gt;        

    &lt;/Appenders&gt;
    
    &lt;Loggers&gt;

        &lt;Logger name="com.zetcode.work" level="info" additivity="false" &gt;
            &lt;AppenderRef ref="MyFile" /&gt;
        &lt;/Logger&gt;
    
        &lt;Root level="info"&gt;
            &lt;AppenderRef ref="Console" /&gt;
        &lt;/Root&gt;    

    &lt;/Loggers&gt;
&lt;/Configuration&gt;

In the log4j2.xml configuration file, we define two appenders and
two loggers.

&lt;File name="MyFile" fileName="/home/user7/tmp/mylog.log" append="false"&gt;
    &lt;PatternLayout pattern="${layout}"/&gt;
&lt;/File&gt;   

We define a file appender which writes log messages into the specified file.
The file name is specified with the fileName attribute.
With append attribute set to false, the file is always
overwritten.

&lt;Logger name="com.zetcode.work" level="info" additivity="false" &gt;
    &lt;AppenderRef ref="MyFile" /&gt;
&lt;/Logger&gt;

We define a logger that logs information messages from the com.zetcode.work
package. The logger writes messages to the file.

&lt;Root level="info"&gt;
    &lt;AppenderRef ref="Console" /&gt;
&lt;/Root&gt;

The rest of the messages, in our case from the com.zetcode.main package,
are handled by the root logger.

2020-03-29 18:47:07,372 [main] INFO  com.zetcode.main.JavaLog4jEx2 - The main() method is called
2020-03-29 18:47:07,376 [main] INFO  com.zetcode.main.JavaLog4jEx2 - The doJob() method is called

These two messages were written to the console.

$ cat mylog.log 
2020-03-29 18:47:07,377 [main] INFO  com.zetcode.work.MyWork - doMyWork() method called

This message was written to the mylog.log file.

## Log4j RollingFileAppender

RollingFileAppender is a special type of appender which backs up the 
log files when they reach a certain size or meet a time criterion.
A rolling file appender automatically rolls or archives the current log file and 
resumes logging in a new file.

The following application uses a RollingFileAppender.

pom.xml
src
└── main
    ├── java
    │   └── com
    │       └── zetcode
    │           └── JavaLog4jRollingFileEx.java
    └── resources
        └── log4j2.xml

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JavaLog4jRollingFileEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
    
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.logging.log4j&lt;/groupId&gt;
            &lt;artifactId&gt;log4j-core&lt;/artifactId&gt;
            &lt;version&gt;2.13.1&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;    

&lt;/project&gt;

This is the pom.xml file, which contains the log4j-core
dependency.

com/zetcode/JavaLog4jRollingFileEx.java
  

package com.zetcode;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class JavaLog4jRollingFileEx {

    private static final Logger logger = LogManager.getLogger(
        JavaLog4jRollingFileEx.class);
    
    public static void main(String[] args) {
        
        logger.info("Information message");
        logger.warn("Warning message");
        logger.error("Error message");
    }
}

In the JavaLog4jRollingFileEx class, we log three messages.

resources/log4j2.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;Configuration status="info"&gt;
    &lt;Properties&gt;
        &lt;Property name="logdir"&gt;/home/user7/tmp&lt;/Property&gt;
        &lt;Property name="layout"&gt;%d [%t] %-5level %logger{36} - %m%n&lt;/Property&gt;
    &lt;/Properties&gt;
  
    &lt;Appenders&gt;
        
        &lt;Console name="Console"&gt;
            &lt;PatternLayout pattern="${layout}" /&gt;
        &lt;/Console&gt;           
  
        &lt;RollingFile name="MyFile" fileName="${logdir}/app.log"
                     filePattern="${logdir}/app.%d{yyyy-MM-dd}-%i.log"&gt;
            &lt;PatternLayout pattern="${layout}" /&gt;
            &lt;Policies&gt;
                &lt;TimeBasedTriggeringPolicy /&gt;
                &lt;SizeBasedTriggeringPolicy size="1 MB" /&gt;
            &lt;/Policies&gt;
            &lt;DefaultRolloverStrategy max="10" /&gt;
        &lt;/RollingFile&gt;

    &lt;/Appenders&gt;
    
    &lt;Loggers&gt;

        &lt;Logger name="com.zetcode" level="info" additivity="false"&gt;
            &lt;AppenderRef ref="MyFile" /&gt;
        &lt;/Logger&gt;
    
        &lt;Root level="error"&gt;
            &lt;AppenderRef ref="Console" /&gt;
        &lt;/Root&gt;    

    &lt;/Loggers&gt;

&lt;/Configuration&gt;

Log4j is configured in the log4j2.xml. 

&lt;RollingFile name="MyFile" fileName="${logdir}/app.log"
                filePattern="${logdir}/app.%d{yyyy-MM-dd}-%i.log"&gt;
    &lt;PatternLayout pattern="${layout}" /&gt;
...
    &lt;DefaultRolloverStrategy max="10" /&gt;
&lt;/RollingFile&gt;

A rolling file appender is created with RollingFile tag.
We set the location of the log file with the fileName attribute. 
The PatternLayout sets the layout of the log messages.
The DefaultRolloverStrategy deletes older archives if the number of
archives reaches ten.

&lt;Policies&gt;
  &lt;TimeBasedTriggeringPolicy /&gt;
  &lt;SizeBasedTriggeringPolicy size="1 MB" /&gt;
&lt;/Policies&gt;

The triggering policies are defined in the Policies tag.
They control the conditions under which rollovers occur. Here we use two
policies: TimeBasedTriggeringPolicy and SizeBasedTriggeringPolicy.
The TimeBasedTriggeringPolicy starts a rollover according to the most
specific date and time pattern; in our case, every hour. The SizeBasedTriggeringPolicy 
starts a rollover if the size of the log file reaches 1 MB.

&lt;Loggers&gt;

    &lt;Logger name="com.zetcode" level="info" additivity="false"&gt;
        &lt;AppenderRef ref="MyFile" /&gt;
    &lt;/Logger&gt;

    &lt;Root level="error"&gt;
        &lt;AppenderRef ref="Console" /&gt;
    &lt;/Root&gt;    

&lt;/Loggers&gt;

We have two loggers defined. The com.zetcode logger logs
into a file appender. The root logger is not utilized in this application.

$ cat app.log 
2020-03-29 18:55:46,101 [main] INFO  com.zetcode.JavaLog4jRollingFileEx - Information message
2020-03-29 18:55:46,106 [main] WARN  com.zetcode.JavaLog4jRollingFileEx - Warning message
2020-03-29 18:55:46,106 [main] ERROR com.zetcode.JavaLog4jRollingFileEx - Error message
2020-03-29 18:56:07,533 [main] INFO  com.zetcode.JavaLog4jRollingFileEx - Information message
2020-03-29 18:56:07,537 [main] WARN  com.zetcode.JavaLog4jRollingFileEx - Warning message
2020-03-29 18:56:07,537 [main] ERROR com.zetcode.JavaLog4jRollingFileEx - Error message
2020-03-29 18:56:11,000 [main] INFO  com.zetcode.JavaLog4jRollingFileEx - Information message
2020-03-29 18:56:11,004 [main] WARN  com.zetcode.JavaLog4jRollingFileEx - Warning message
2020-03-29 18:56:11,005 [main] ERROR com.zetcode.JavaLog4jRollingFileEx - Error message
2020-03-29 18:56:13,958 [main] INFO  com.zetcode.JavaLog4jRollingFileEx - Information message
2020-03-29 18:56:13,962 [main] WARN  com.zetcode.JavaLog4jRollingFileEx - Warning message
2020-03-29 18:56:13,962 [main] ERROR com.zetcode.JavaLog4jRollingFileEx - Error message
2020-03-29 18:56:16,676 [main] INFO  com.zetcode.JavaLog4jRollingFileEx - Information message
2020-03-29 18:56:16,680 [main] WARN  com.zetcode.JavaLog4jRollingFileEx - Warning message
2020-03-29 18:56:16,680 [main] ERROR com.zetcode.JavaLog4jRollingFileEx - Error message

This is a sample output of the log file.

## Log4j with Spring Boot

The next example shows how to use Log4j in a Spring Boot application.
The application is a console Java program.

Spring Boot uses Logback for logging by default. Therefore, we need to configure
Spring Boot to exclude Logback and include Log4j. 

General logging settings are set in the application.properties file.
To configure the more fine-grained settings of a logging system, we need to use 
the native configuration format. In our case, Log4j's settings.

pom.xml
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           └── MyRunner.java
│   └── resources
│       ├── app.log
│       └── log4j2.xml
└── test
    └── java

This is the project structure. The log messages are written
to the app.log file.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JavaLog4jSpringBootEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
   
    &lt;properties&gt;
        &lt;java.version&gt;11&lt;/java.version&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter&lt;/artifactId&gt;
            &lt;exclusions&gt;
                &lt;exclusion&gt;
                    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                    &lt;artifactId&gt;spring-boot-starter-logging&lt;/artifactId&gt;
                &lt;/exclusion&gt;
            &lt;/exclusions&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-log4j2&lt;/artifactId&gt;
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

In the pom.xml file, we exclude the spring-boot-starter-logging 
dependency and add the spring-boot-starter-log4j2 dependency.

resources/log4j2.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;Configuration status="info"&gt;
    &lt;Properties&gt;
        &lt;Property name="layout"&gt;%d [%t] %-5level %logger{36} - %m%n&lt;/Property&gt;
    &lt;/Properties&gt;
  
    &lt;Appenders&gt;
  
        &lt;Console name="Console"&gt;
            &lt;PatternLayout pattern="${layout}" /&gt;
        &lt;/Console&gt;     
        
        &lt;File name="MyFile" fileName="src/main/resources/app.log"&gt;
            &lt;PatternLayout pattern="${layout}" /&gt;
        &lt;/File&gt;        

    &lt;/Appenders&gt;
    
    &lt;Loggers&gt;

        &lt;Logger name="com.zetcode" level="info" additivity="false" &gt;
            &lt;AppenderRef ref="MyFile" /&gt;
        &lt;/Logger&gt;
    
        &lt;Root level="error"&gt;
            &lt;AppenderRef ref="Console" /&gt;
        &lt;/Root&gt;    

    &lt;/Loggers&gt;
&lt;/Configuration&gt;

Spring Boot locates the log4j2.xml configuration file in the src/main/resources
directory.

&lt;File name="MyFile" fileName="src/main/resources/app.log"&gt;
    &lt;PatternLayout pattern="${layout}" /&gt;
&lt;/File&gt; 

The log messages are written to the src/main/resources/app.log file.

com/zetcode/MyRunner.java
  

package com.zetcode;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LogManager.getLogger(MyRunner.class);

    @Override
    public void run(String... args) throws Exception {

        logger.info("Information message");
        logger.warn("Warning message");
    }
}

This is our command line runner. The run method generates information and warning
messages.

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

In the Application class, we set up the Spring Boot application.

## Source

[Apache Log4j](https://logging.apache.org/log4j/2.x/)

In this article we have worked with the Log4j library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).