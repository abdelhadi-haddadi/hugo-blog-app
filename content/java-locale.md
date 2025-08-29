+++
title = "Java Locale"
date = 2025-08-29T20:00:00.634+01:00
draft = false
description = "Java Locale tutorial shows how to localize Java programs."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Locale

last modified July 10, 2024

 

In this article we show how to localize Java programs.

*Internationalization* is the process of designing an application so that
it can be adapted to various languages and regions. *Localization* is the
process of customizing applications for a specific region or language.

Locale represents a specific geographical, political, or cultural
region.

Locale-sensitive data include:

    - messages

    - dates and times

    - numbers

    - currencies

    - measurements

    - phone numbers

    - names

    - postal addresses

## Default locale

The default locale is determined with Locale.getDefault.

Main.java
  

import java.util.Locale;

void main() {

    var defLoc = Locale.getDefault();
    System.out.println(defLoc.getDisplayCountry());
    System.out.println(defLoc.getDisplayLanguage());
    System.out.println(defLoc.getDisplayName());
    System.out.println(defLoc.getISO3Country());
    System.out.println(defLoc.getISO3Language());
    System.out.println(defLoc.getLanguage());
    System.out.println(defLoc.getCountry());

    System.out.println("------------------------");

    var skLoc = Locale.of("SK", "sk");
    System.out.println(skLoc.getDisplayCountry());
    System.out.println(skLoc.getDisplayLanguage());
    System.out.println(skLoc.getDisplayName());
    System.out.println(skLoc.getISO3Country());
    System.out.println(skLoc.getISO3Language());
    System.out.println(skLoc.getLanguage());
    System.out.println(skLoc.getCountry());
}

The program prints the attributes of a default locale and a Slovak locale.

var defLoc = Locale.getDefault();
System.out.println(defLoc.getDisplayCountry());
System.out.println(defLoc.getDisplayLanguage());
System.out.println(defLoc.getDisplayName());

We get the default locale and print the display country name, language, and
name.

$ java Main.java
United States
English
English (United States)
USA
eng
en
US
------------------------
Slovakia
Slovak
Slovak (Slovakia)
SVK
slk
sk
SK

## Locale constants

There are a few built-in locale constants such as Locale.US.

Main.java
  

import java.text.NumberFormat;
import java.util.Locale;

void main() {

    double n = 1240.35;

    NumberFormat nf = NumberFormat.getInstance(Locale.US);
    System.out.println(nf.format(n));

    NumberFormat nf2 = NumberFormat.getInstance(Locale.FRANCE);
    System.out.println(nf2.format(n));

    NumberFormat nf3 = NumberFormat.getInstance(Locale.GERMAN);
    System.out.println(nf3.format(n));
}

The program prints a number in Locale.US,
Locale.FRANCE, and Locale.GERMAN locales.

NumberFormat nf = NumberFormat.getInstance(Locale.US);

The NumberFormat.getInstance returns a general-purpose number
format for the specified locale.

System.out.println(nf.format(n));

We pass the value to the NumberFormat's format method.

$ java Main.java
1,240.35
1 240,35
1.240,35

## Locale.Builder

Locales can be created with Locale.Builder.

Main.java
  

import java.text.NumberFormat;
import java.util.Locale;

void main() {

    double n = 1240.35;

    var loc = new Locale.Builder()
            .setLanguage("sk")
            .setRegion("SK")
            .build();

    NumberFormat nf = NumberFormat.getInstance(loc);
    System.out.println(nf.format(n));

    var loc2 = new Locale.Builder()
            .setLanguage("ja")
            .setRegion("JP")
            .build();

    NumberFormat nf2 = NumberFormat.getInstance(loc2);
    System.out.println(nf2.format(n));
}

The program localizes a value for Slovak and Japanese languages. The locales
are created with a builder.

var loc = new Locale.Builder()
    .setLanguage("sk")
    .setRegion("SK")
    .build();

A locale is built with the builder. We set the language with
setLanguage and the region with setRegion.

$ java Main.java
1 240,35
1,240.35

## The Locale.of method

There are three methods for creating a Locale object.

Locale.of(String language)
Locale.of(String language, String country)
Locale.of(String language, String country, String variant)

We can specify language, country, and variants as parameters.

Main.java
  

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

void main() {

    var val = new BigDecimal("2530.45");

    var skLoc = Locale.of("sk", "SK");
    var huLoc = Locale.of("hu", "HU");
    var ruLoc = Locale.of("ru", "RU");

    NumberFormat cf1 = NumberFormat.getCurrencyInstance(skLoc);
    System.out.println(cf1.format(val));

    NumberFormat cf2 = NumberFormat.getCurrencyInstance(huLoc);
    System.out.println(cf2.format(val));

    NumberFormat cf3 = NumberFormat.getCurrencyInstance(ruLoc);
    System.out.println(cf3.format(val));
}

In the example, we print a currency value in Slovak, Hungarian, and Russian
locales.

var val = new BigDecimal("2530.45");

For currency values, we should use BigDecimal.

NumberFormat cf1 = NumberFormat.getCurrencyInstance(skLoc);

To format a currency value, we use the
NumberFormat.getCurrencyInstance to which we pass the locale.

$ java Main.java
2 530,45 €
2 530,45 Ft
2 530,45 ₽

## Locale format datetime

With Locale and DateTimeFormatter, we can format
datetime values.

Main.java
  

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

void main() {

    var now = LocalDateTime.now();

    var dtf1 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
            .withLocale(Locale.FRANCE);
    System.out.println(now.format(dtf1));

    var dtf2 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
            .withLocale(Locale.US);
    System.out.println(now.format(dtf2));

    var dtf3 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
            .withLocale(Locale.TRADITIONAL_CHINESE);
    System.out.println(now.format(dtf3));
}

In the program, we format the current datetime in French, US, and Chinese
locales.

var dtf1 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM)
    .withLocale(Locale.FRANCE);

We choose a datetime format style with ofLocalizedDateTime and 
set the locale with withLocale.

$ java Main.java
10 juil. 2024, 11:53:59
Jul 10, 2024, 11:53:59 AM
2024年7月10日 上午11:53:59

## Locale ResourceBundle

A resource bundle is a Java properties file that contains locale-specific data.
We localize messages with resource bundles.

src/main/resources/words.properties
  

w1=Earth
w2=ocean

This is the default properties file; it is typically in English language. We
have two words inside the file.

src/main/resources/words_de.properties
  

w1=Erde
w2=ozean

The words_de.properties file contains words in German language.

src/main/resources/words_ru.properties
  

w1=Земля
w2=океан

The words_ru.properties file contains words in Russian language.

When using IntelliJ IDEA, we need to change the encoding of the properties file 
to utf-8; the default is ISO-8859-1. 

Main.java
  

import java.nio.charset.Charset;
import java.util.Locale;
import java.util.ResourceBundle;

void main() {

    Locale[] locales = {
            Locale.GERMAN,
            Locale.of("ru", "RU"),
            Locale.ENGLISH
    };

    System.out.println("w1:");

    for (Locale locale : locales) {

        getWord(locale, "w1");
    }

    System.out.println("w2:");

    for (Locale locale : locales) {

        getWord(locale, "w2");
    }
}

void getWord(Locale curLoc, String key) {

    ResourceBundle words = ResourceBundle.getBundle("main/resources/words", curLoc);
    String value = words.getString(key);

    System.out.printf("Locale: %s, Value: %s %n", curLoc, value);
}

In the code example, we print all the words used in three resource bundles.

ResourceBundle words = ResourceBundle.getBundle("main/resources/words", curLoc);

With the ResourceBundle.getBundle method, we get the bundle for the
currently used locale. 

String value = words.getString(key);

From the bundle, we retrieve values with getString.

$ java Main.java
w1:
Locale: de, Value: Erde 
Locale: ru_RU, Value: Земля 
Locale: en, Value: Earth 
w2:
Locale: de, Value: ozean 
Locale: ru_RU, Value: океан 
Locale: en, Value: ocean 

## Source

[Java locale - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Locale.html)

In this article we have shown how to localize Java programs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).