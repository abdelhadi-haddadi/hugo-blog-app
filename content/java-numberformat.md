+++
title = "Java NumberFormat"
date = 2025-08-29T20:00:02.880+01:00
draft = false
description = "Java NumberFormat tutorial shows how to format and parse numbers and currencies in Java. We set the number of fractional digits, round numbers, and group digits."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java NumberFormat

last modified July 4, 2024

 

In this article we show how to format numbers in Java.

Different cultures use different ways to represent numbers. For instance, the
way currencies are formatted is widely different in the countries around the
world.

NumberFormat is a Java class for formatting and parsing numbers.
With NumberFormat, we can format and parse numbers for any locale.

NumberFormat allows us to round values, set decimal separators, set
the number of fraction digits, or format values according to a specific locale.

NumberFormat has several static methods to create number formats.

static NumberFormat getInstance(Locale inLocale)

This getInstance method returns a general-purpose number format for
the specified locale.

## Formatting numbers

Numbers are formatted differently for different locales. For instance, some
countries use a dot as a decimal separator (USA, Great Britain), others use a
comma (Slovakia, France).

Main.java
  

import java.text.NumberFormat;
import java.util.Locale;

void main() {

    double n = 1240.35;

    NumberFormat nf = NumberFormat.getInstance(Locale.of("en", "US"));
    String val = nf.format(n);

    System.out.println(val);

    NumberFormat nf2 = NumberFormat.getInstance(Locale.of("sk", "SK"));
    String val2 = nf2.format(n);

    System.out.println(val2);

    NumberFormat nf3 = NumberFormat.getInstance(Locale.of("da", "DK"));
    String val3 = nf3.format(n);

    System.out.println(val3);
}

The example displays a number in three different locales.

double n = 1240.35;

This is the value to be formatted.

NumberFormat nf = NumberFormat.getInstance(Locale.of("en", "US"));

We create a NumberFormat for the US locale.

String val = nf.format(n);

We format the value with the format method.

NumberFormat nf2 = NumberFormat.getInstance(Locale.of("sk", "SK"));
String val2 = nf2.format(n);

Here we format the value for the Slovak locale.

$ java Main.java
1,240.35
1 240,35
1.240,35

USA, Slovakia, and Denmark use different characters for digit grouping and
decimal mark.

## Grouping digits

For ease of reading, numbers with many digits may be divided into groups using a
delimiter. The setGroupingUsed sets whether grouping is used in
the format.

Main.java
  

import java.text.NumberFormat;
import java.util.Locale;

void main() {

    long val = 23_500_390_800_380L;

    NumberFormat nf = NumberFormat.getInstance(Locale.of("sk", "SK"));
    nf.setGroupingUsed(true);

    System.out.println(nf.format(val));

    nf.setGroupingUsed(false);

    System.out.println(nf.format(val));
}

We have a long number. We demonstrate the grouping of digits for the Slovak
locale.

long val = 23_500_390_800_380L;

It is possible to use underscore characters in numeric literals.

nf.setGroupingUsed(true);

We set the grouping with the setGroupingUsed method.

$ java Main.java
23 500 390 800 380
23500390800380

The first value is more readable than the second one. Slovakia uses a space
character for digit grouping.

## NumberFormat fraction digits

We can control the number of fraction digits with the setMinimumFractionDigits
and setMaximumFractionDigits. If there are fewer digits than the
minimum number of fraction digits, zeros are added to the value. If there are
more digits than the maximum number of fraction digits, the number is rounded.

Main.java
  

import java.text.NumberFormat;
import java.util.Locale;

void main() {

    double val1 = 4.5678934;
    double val2 = 2.3;

    NumberFormat nf = NumberFormat.getInstance(Locale.of("sk", "SK"));
    nf.setMinimumFractionDigits(2);
    nf.setMaximumFractionDigits(4);

    System.out.println(nf.format(val1));
    System.out.println(nf.format(val2));
}

In the example, we set the minimum and maximum number of fraction
digits.

$ java Main.java
4,5679
2,30

The first value is rounded, the second value gets an additional zero digit.

## Rounding numbers

As we have already stated above, if there are more fraction digits than the
maximum number of allowed digits, the value is rounded. There are several
rounding techniques available.

Main.java
  

import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.Locale;

void main() {

    double nums[] = {2.32, 2.55, 3.19, 4.88, 5.54, 3.22, 8.78};

    NumberFormat nf = NumberFormat.getInstance(Locale.ENGLISH);
    nf.setMaximumFractionDigits(1);
    nf.setRoundingMode(RoundingMode.UP);

    for (double num : nums) {

        String number = nf.format(num);
        System.out.printf("%s ", number);
    }

    System.out.println();

    nf.setRoundingMode(RoundingMode.DOWN);

    for (double num : nums) {

        String number = nf.format(num);
        System.out.printf("%s ", number);
    }

    System.out.println();
}

The example rounds double numbers using two rounding modes: RoundingMode.UP
and RoundingMode.DOWN.

nf.setMaximumFractionDigits(1);
nf.setRoundingMode(RoundingMode.UP);

We set the maximum number of fraction digits with
setMaximumFractionDigits and the rounding mode with
setRoundingMode.

## Formatting percentages

The NumberFormat.getPercentInstance is used to format percentages.

Main.java
  

import java.text.NumberFormat;
import java.util.Locale;

void main() {

    double x = 25f / 100f;

    NumberFormat pf = NumberFormat.getPercentInstance(Locale.of("sk", "SK"));

    System.out.println(pf.format(x));
}

The example formats a double value as a percentage.

## Formatting currencies

One of the most complex tasks when working with numbers is to format currencies.
We use the NumberFormat.getCurrencyInstance to get the
number format for the currencies.

Main.java
  

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

void main() {

    var val = new BigDecimal("23500");

    NumberFormat cf1 = NumberFormat.getCurrencyInstance(Locale.of("en", "US"));
    System.out.println(cf1.format(val));

    NumberFormat cf2 = NumberFormat.getCurrencyInstance(Locale.of("sk", "SK"));
    System.out.println(cf2.format(val));

    NumberFormat cf3 = NumberFormat.getCurrencyInstance(Locale.of("zh", "CN"));
    System.out.println(cf3.format(val));
}

The example displays currencies for three different countries: USA, Slovakia, and China.

NumberFormat cf3 = NumberFormat.getCurrencyInstance(new Locale("zh", "CN"));

This line gets the number format for the Chinese currency.

$ java Main.java
$23,500.00
23 500,00 €
￥23,500.00

## Parsing numbers

The parse method parses text from the beginning of the
given string to produce a number.

Main.java
  

import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

void main() throws ParseException {

    NumberFormat nf = NumberFormat.getInstance(Locale.of("sk", "SK"));
    nf.setMaximumFractionDigits(3);

    Number num = nf.parse("150000,456");
    System.out.println(num.doubleValue());
}

The example parses a value with the Slovak locale.

## Source

[Java NumberFormat - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/NumberFormat.html)

In this article we have worked with Java NumberFormat.
We have formatted numbers, currencies, percentages, rounded numbers, set the
number of fraction digits, and set the grouping of digits.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).