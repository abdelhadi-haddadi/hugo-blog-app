+++
title = "Java Unix time"
date = 2025-08-29T20:00:55.569+01:00
draft = false
description = "Java Unix time tutorial shows how to compute Unix time in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Unix time

last modified July 16, 2024

 

In this article we show how to compute Unix time in Java. 

Unix time (also known as POSIX time or epoch time), is a system for
describing a point in time, defined as the number of seconds that have elapsed
since 00:00:00 Coordinated Universal Time (UTC), Thursday, 1 January 1970, minus
the number of leap seconds that have taken place since then. 

Unix time is widely used on Unix-like operating systems but also in many other
computing systems and file formats. It is often used by webmasters because a
Unix timestamp can represent all time zones at once. 

Unix timestamps should be stored as long numbers; if they are store
as Java int values, then this leads to a 2038 year problem. 32-bit
variables cannot encode times after 03:14:07 UTC on 19 January 2038.

$ date +%s
1721218154

We can use the date command to determine Unix time on Linux. 
Unix time can be determined on the [https://www.unixtimestamp.com/](https://www.unixtimestamp.com/).

## Java Unix time example

The following example computes the Unix time. 

Main.java
  

import java.time.Instant;
import java.util.Date;

void main() {

    long ut1 = Instant.now().getEpochSecond();
    System.out.println(ut1);

    long ut2 = System.currentTimeMillis() / 1000L;
    System.out.println(ut2);

    Date now = new Date();
    long ut3 = now.getTime() / 1000L;
    System.out.println(ut3);
}

There are three basic ways to compute Unix time in Java. 

long ut1 = Instant.now().getEpochSecond();
System.out.println(ut1);

Since Java 8, it is possible to use Instant and its 
getEpochSecond to compute the Unix time.

long ut2 = System.currentTimeMillis() / 1000L;
System.out.println(ut2);

Here we compute the Unix time with System.currentTimeMillis method.
We need to transform milliseconds to seconds. 

Date now = new Date();
long ut3 = now.getTime() / 1000L;
System.out.println(ut3);

We can also use the old Date class to compute the Unix time. 

$ java Main.java
1721218241
1721218241
1721218241

## Source

[Unix time](https://en.wikipedia.org/wiki/Unix_time)

In this article we have shown how to compute Unix time in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).