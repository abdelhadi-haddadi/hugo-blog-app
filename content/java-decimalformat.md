+++
title = "Java DecimalFormat"
date = 2025-08-29T19:58:33.868+01:00
draft = false
description = "Java DecimalFormat tutorial shows how to format decimal values in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DecimalFormat

last modified July 4, 2024

 

In this article we show how to format numbers in Java. 

DecimalFormat class is used to format numbers. It is a concrete
subclass of the NumberFormat class.

NumberFormat is used to format numbers for the most common cases. 
DecimalFormat gives more options; it allows us to define our
formatting options.

DecimalFormat is located in the java.text package.

## Double values

The 0 format specifier stands for a digit. The #
format specifier stands for a digit, where zero shows as absent. The
. specifier is for a decimal separator.

Main.java
  

import java.text.DecimalFormat;

void main() {

    double[] vals = new double[] {0.31, 5.60, 6.7, 5};

    var pattern1 = "#.##";
    var pattern2 = "#.00";

    var df1 = new DecimalFormat(pattern1);
    var df2 = new DecimalFormat(pattern2);

    for (var val : vals) {

        System.out.printf("%4s - %4s %n", df1.format(val), df2.format(val));
    }
}

The program prints four double values using two format specifiers.

$ java Main.java
0,31 -  ,31 
 5,6 - 5,60 
 6,7 - 6,70 
   5 - 5,00 

## The applyPattern method

The applyPattern method applies the given pattern to an existing
format.

Main.java
  

import java.text.DecimalFormat;

void main() {

    double n = 1240.30;

    var df = new DecimalFormat("#.##");
    System.out.println(df.format(n));

    df.applyPattern("#.00");
    System.out.println(df.format(n));
}

The program formats a double value in two formats.

var df = new DecimalFormat("#.##");

We create a new instance of the DecimalFormat. We pass it a
non-localized pattern string. The pattern defines a format for a decimal value 
with a dot followed by two decimal places.

df.applyPattern("#.00");

We specify a new pattern with applyPattern. This pattern adds zeros 
to decimal places, if they are empty.

## Grouping digits

The , format character is used for grouping of digits.

Main.java
  

import java.text.DecimalFormat;

void main() {

    double n = 2_125_405.30;
    String pattern = "###,###.00";

    var df = new DecimalFormat(pattern);
    System.out.println(df.format(n));
}

The program prints a double value, whose digits are grouped.

## DecimalFormat percentage

With the % format character, we define percentages.

Main.java
  

import java.text.DecimalFormat;

void main() {

    double n = 0.34;
    var pattern = "#.##%";

    var df = new DecimalFormat(pattern);
    System.out.println(df.format(n));
}

The program prints a double value as a percentage.

## DecimalFormat in string literal

We can put the formatted value in a string literal.

Main.java
  

import java.text.DecimalFormat;

void main() {

    double n = 7.34;
    var pattern = "The #.## number";

    var df = new DecimalFormat(pattern);
    System.out.println(df.format(n));
}

The program prints the formatted double value inside a string.

## Localized DecimalFormat

The next example localizes the number formats.

Main.java
  

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Locale;

void main() {

    double n = 127_540.30;
    var skLoc = Locale.of("sk", "SK");
    var usLoc = Locale.of("us", "US");
    var deLoc = Locale.of("de", "DE");

    var pattern = "###,###.##";

    NumberFormat nf = NumberFormat.getNumberInstance(skLoc);
    DecimalFormat df = (DecimalFormat)nf;
    df.applyPattern(pattern);

    System.out.println(df.format(n));

    NumberFormat nf2 = NumberFormat.getNumberInstance(usLoc);
    DecimalFormat df2 = (DecimalFormat)nf2;
    df2.applyPattern(pattern);

    System.out.println(df2.format(n));

    NumberFormat nf3 = NumberFormat.getNumberInstance(deLoc);
    DecimalFormat df3 = (DecimalFormat)nf3;
    df3.applyPattern(pattern);

    System.out.println(df3.format(n));
}

In the program, we print a value in three different locales. The grouping and
the decimal separators chosen according to the given language cultures.

$ java Main.java
127 540,3
127,540.3
127.540,3

## Source

[Java DecimalFormat - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/DecimalFormat.html)

In this article we have shown how to format numbers in Java with
DecimalFormat.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).