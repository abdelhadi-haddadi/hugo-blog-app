+++
title = "Java InputStreamReader"
date = 2025-08-29T19:59:06.213+01:00
draft = false
description = "Java InputStreamReader tutorial shows how to use Java InputStreamReader to read text in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java InputStreamReader

last modified March 3, 2024

 

In this article we show how to use Java InputStreamReader
to read text in Java.

JavaInputStreamReader is a bridge between byte streams and character
streams. It reads bytes and decodes them into characters using a specified
charset.

It is recommended to wrap an InputStreamReader within a
BufferedReader for optimal efficiency.

Note that when working with character streams in Java, we should avoid
using streams that rely on default encoding, such as FileReader
or PrintWriter.

## Reading from a FileInputStream

In the first example, we use InputStreamReader to read
text from a file stream.

russian-text.txt
  

Пе́рвая мирова́я война́ (28 июля 1914 — 11 ноября 1918) — один
из самых широкомасштабных вооружённых конфликтов в истории человечества.
Формальным поводом к войне послужили события в Сараеве,
где 28 июня 1914 года девятнадцатилетний боснийский серб, студент
Гаврило Принцип осуществил покушение, в результате которого был убит
австрийский эрцгерцог Франц Фердинанд и его морганатическая жена София Хотек.

We have a text in Cyrillic.

Main.java
  

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

void main() throws Exception {

    String fileName = "russian-text.txt";

    try (var fis = new FileInputStream(fileName);
            var isr = new InputStreamReader(fis, StandardCharsets.UTF_8);
            var br = new BufferedReader(isr)) {

        String line;

        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
    }
}

The example reads a small text in Russian language.

try (var fis = new FileInputStream(fileName);
        var isr = new InputStreamReader(fis, StandardCharsets.UTF_8);
        var br = new BufferedReader(isr)) {

A FileInputStream is used to create a file stream. The
FileInputStream is wrapped into a InputStreamReader
for reading text data. We set the StandardCharsets.UTF_8 encoding.
Finally, the InputStreamReader is wrapped into a
BufferedReader for optimal efficiency.

## Reading from standard input stream

The second example uses InputStreamReader to read text from
standard input stream.

Main.java
  

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

void main() throws IOException {

    try (var br = new BufferedReader(new InputStreamReader(System.in,
                    StandardCharsets.UTF_8))) {

        String line;
        System.out.print("Give me a cookie: ");

        while (!(("cookie").equals(line = br.readLine()))) {

            System.out.println(line);
            System.out.print("Give me a cookie: ");
        }
    }
}

The example prints a prompt and awaits a response from a user. The program
ends when it receives the correct input.

try (var br = new BufferedReader(new InputStreamReader(System.in,
                StandardCharsets.UTF_8))) {

We use System.in to read from standard input.

## Reading from URL stream

The following example reads text from a network stream with InputStreamReader.

Main.java
  

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.nio.charset.StandardCharsets;

void main() throws IOException {

    var url = URI.create("https://www.webcode.me").toURL();

    try (var isr = new InputStreamReader(url.openStream(), StandardCharsets.UTF_8);
            var br = new BufferedReader(isr)) {

        String line;
        var sb = new StringBuilder();

        while ((line = br.readLine()) != null) {

            sb.append(line);
            sb.append(System.lineSeparator());
        }

        System.out.println(sb.toString());
    }
}

The example reads text from a website.

try (var isr = new InputStreamReader(url.openStream(), StandardCharsets.UTF_8);
        var br = new BufferedReader(isr)) {

The example opens a stream from the specified URL. It reads HTML code from
the webcode.me webpage.

## Source

[Java InputStreamReader - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/InputStreamReader.html)

In this article we have shown how to work with Java 
InputStreamReader to read text in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).