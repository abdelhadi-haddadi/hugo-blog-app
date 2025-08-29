+++
title = "Java String format"
date = 2025-08-29T20:00:36.955+01:00
draft = false
description = "Java String format tutorial shows how to format strings in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java String format

last modified July 4, 2024

 

In this article we show how to format strings in Java.

In Java, we have methods for string formatting. Another way to dynamically 
create strings is [string building](/java/stringbuilder/).

The System.out.printf, System.out.format, and
formatted methods can be used to format strings in Java. They work
the same. These three methods write a formatted string to the output stream using
the specified format string and arguments. If there are more arguments than
format specifiers, the extra arguments are ignored.

%[argument_index$][flags][width][.precision]conversion

The format specifiers for general, character, and numeric types have this
syntax.

%[argument_index$][flags][width]conversion

This is the syntax for types which are used to represents dates and
times.

The format specifiers begin with the % character and end
with a 1 or 2 character conversion that specifies the kind of formatted
output being generated. The optional items are placed between the square brackets.

The argument_index is a decimal integer indicating the position of the argument
in the argument list. The flags is a set of characters that modify the output
format. The set of valid flags depends on the conversion. The width is a
non-negative decimal integer indicating the minimum number of characters to be
written to the output.

The precision is a non-negative decimal integer usually used to restrict the
number of characters. The specific behavior depends on the conversion. The
required conversion is a character indicating how the argument should be
formatted.

## Java String format methods

We use the three methods to format a simple message.

Main.java
  

void main() {

    String name = "John Doe";
    String occupation = "gardener";

    String txt = "%s is a %s";
    String msg = txt.formatted(name, occupation);

    System.out.println(msg);

    System.out.format("%s is a %s\n", name, occupation);
    System.out.printf("%s is a %s%n", name, occupation);
}

We build the same string three times.

String name = "John Doe";
String occupation = "gardener";

String txt = "%s is a %s";
String msg = txt.formatted(name, occupation);

The formatted method is an instance method.

System.out.format("%s is a %s\n", name, occupation);
System.out.printf("%s is a %s%n", name, occupation);

The format and printf methods are static.

$ java Main.java
John Doe is a gardener
John Doe is a gardener
John Doe is a gardener

## Java String format specifiers

Next we use two basic format specifiers.

Main.java
  

void main() {

    System.out.format("There are %d %s.%n", 5, "pencils");
    System.out.printf("The rock weighs %f kilograms.%n", 5.345);
}

In this program, we format two simple sentences.

System.out.format("There are %d %s.%n", 5, "pencils");

In this code line, we have three format specifiers. Each specifier starts with
the % character. The d specifier formats integer
values. The s specifier expects string values. The %n
outputs a platform-specific line terminator; it does not require an argument.

System.out.printf("The rock weighs %f kilograms.%n", 5.345);

The f formats a floating point value as a decimal value.
The System.out.printf works the same as the
System.out.format.

$ java Main.java
There are 5 pencils.
The rock weighs 5.345000 kilograms.

## Java String format argument index

In the next example, we work with argument indexes.

Main.java
  

import java.time.LocalDateTime;

void main() {

    int x = 12;
    int y = 32;
    int z = 43;

    LocalDateTime dt = LocalDateTime.now();

    System.out.format("There are %d apples, %d oranges and "
            + "%d pears%n", x, y, z);

    System.out.format("There are %2$d apples, %3$d oranges and "
            + "%1$d pears%n", x, y, z);

    System.out.format("Year: %tY, Month: %&lt;tm, Day: %&lt;td%n", dt);
}

The example uses argument index to refer to variables included the list
of arguments.

System.out.format("There are %d apples, %d oranges and "
        + "%d pears%n", x, y, z);

If we do not specify the index, the variables automatically match
the specifiers. The d specifier formats an integer value as a
decimal value.

System.out.format("There are %2$d apples, %3$d oranges and "
        + "%1$d pears%n", x, y, z);

The 1$ referes to the x variable, the 2$
referes to the y variable and the 3$ refers to
the z variable.

System.out.format("Year: %tY, Month: %&lt;tm, Day: %&lt;td%n", c);

The &lt; flag  causes the argument for the previous format
specifier to be reused. All three specifiers refer to the c
variable. The tY conversion characters give a year formatted as at
least four digits with leading zeros as necessary, tm
give a month, formatted as two digits with leading zeros as necessary, and
td give a day of month, formatted as two digits with leading zeros
as necessary.

$ java Main.java
There are 12 apples, 32 oranges and 43 pears
There are 32 apples, 43 oranges and 12 pears
Year: 2022, Month: 10, Day: 17

## Java String format flag

The *flag* modifies the format in a specific way. There are several flags
available. For instance, the + flag requires the output to include
a positive sign for all positive numbers.

Main.java
  

void main() {

    System.out.format("%+d%n", 553);
    System.out.format("%010d%n", 553);
    System.out.format("%10d%n", 553);
    System.out.format("%-10d%n", 553);
    System.out.format("%d%n", -553);
    System.out.format("%(d%n", -553);
}

The example presents a few flags of the string format specifier.

System.out.format("%010d%n", 553);

The 0 flag will cause the output to be padded with leading
zeros to the minimum field width. Our number has three digits. The
minimum width is 10. Therefore, we have 7 leading zeros in the output.

System.out.format("%10d%n", 553);

Without the 0 flag, the number is right aligned.

System.out.format("%-10d%n", 553);

The - flag will cause the number to be left aligned.

System.out.format("%d%n", -553);
System.out.format("%(d%n", -553);

By default, negative numbers have a minus sign. If we use the (
flag, the negative values will be put inside round brackets. (This is used
in accounting.)

$ java Main.java
+553
0000000553
       553
553
-553
(553)

## Java String format width

The *width* field is the minimum number of characters to be
written to the output. It cannot be used together with the line separator.

Main.java
  

void main() {

    System.out.println(1);
    System.out.println(16);
    System.out.println(1655);
    System.out.println(16567);
    System.out.println(166701);

    System.out.format("%10d%n", 1);
    System.out.format("%10d%n", 16);
    System.out.format("%10d%n", 1655);
    System.out.format("%10d%n", 16567);
    System.out.format("%10d%n", 166701);
}

First, we print five numbers without specifying the field width. The width of
the output is equal to the number of the characters being displayed. In the
second case, we have a field width of 10. Each of the 5 outputs has a minimum
length of 10 characters. The numbers are right aligned.

System.out.format("%10d%n", 1);

Number 10 states that the string output must have at least ten characters.

$ java Main.java
1
16
1655
16567
166701
         1
        16
      1655
     16567
    166701

We can see that in the second case the numbers are right aligned.

## Java String format precision

The *precision* field has different meaning for different conversions.
For general argument types, the precision is the maximum number of characters
to be written to the output.

Main.java
  

void main() {

    System.out.format("%.3g%n", 0.0000006);
    System.out.format("%.3f%n", 54.34263);
    System.out.format("%.3s%n", "ZetCode");
}

The precision specifier is demonstrated on three different outputs.

System.out.format("%.3g%n", 0.0000006);

If the g conversion is used, then the precision is the total
number of digits in the resulting magnitude after rounding.

System.out.format("%.3f%n", 54.34263);

For floating point values, the precision is the number of digits
after the decimal separator.

System.out.format("%.3s%n", "ZetCode");

For strings, it is the maximum number of printed characters. Only three
characters out of seven are printed to the console.

$ java Main.java
6.00e-07
54.343
Zet

## Java String format numbers

The next example formats numeric data.

Main.java
  

void main() {

    System.out.format("%d%n", 12263);
    System.out.format("%o%n", 12263);
    System.out.format("%x%n", 12263);
    System.out.format("%e%n", 0.03452342263);
    System.out.format("%d%%%n", 45);
}

The example demonstrates the standard formatting specifiers for numbers.

System.out.format("%d%n", 12263);

The d conversion specifier will turn an integer value into
a decimal value.

System.out.format("%o%n", 12263);

The o conversion specifier will format the number into
the octal base.

System.out.format("%x%n", 12263);

With the x specifier, the result is formatted as a
hexadecimal integer.

System.out.format("%e%n", 0.03452342263);

Using the e specifier, the number is printed in a scientific
notation.

System.out.format("%d%%%n", 45);

The %% characters are used to print a percent sign.

$ java Main.java
12263
27747
2fe7
3.452342e-02
45%

## Java String format date and time

Finally, we format date and time data.

Main.java
  

import java.time.LocalDateTime;

void main() {

    LocalDateTime ldt = LocalDateTime.now();

    System.out.format("%tF%n", ldt);
    System.out.format("%tD%n", ldt);
    System.out.format("%tT%n", ldt);

    System.out.format("%1$tA, %1$tb %1$tY%n", ldt);
    System.out.format("%1$td.%1$tm.%1$tY%n", ldt);
}

The example demonstrates the standard formatting specifiers for dates. The
conversion part of the date and time format string starts with the
t character.

System.out.format("%tF%n", c);

This line prints a date in a complete ISO 8601 format, as a result of
the tF conversion.

System.out.format("%1$td.%1$tm.%1$tY%n", c);

Using these format specifiers, we print a date in the form that is used in
Slovakia. The parts are separated by the dot character and the day precedes the
month and the month precedes the year. All three format specifiers refer to the
c variable.

$ java Main.java
2024-07-04
07/04/24
13:39:10
Thursday, Jul 2024
04.07.2024

## Java localized String format

We can pass the locale to the formatting methods.

Main.java
  

import java.time.LocalDate;
import java.util.Locale;

void main() {

    double val = 12_568_120.214;
    LocalDate now = LocalDate.now();

    System.out.printf("%f%n", val);
    System.out.printf(Locale.FRENCH, "%f%n", val);

    System.out.printf("%tA%n", now);
    System.out.printf(Locale.FRENCH, "%tA%n", now);

}

In the example, we print values in English and French locales.

$ java Main.java
12568120.214000
12568120,214000
Monday
lundi

## Source

[Java String - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

In this article we have formatted strings in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).