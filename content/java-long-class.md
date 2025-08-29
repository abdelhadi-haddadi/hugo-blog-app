+++
title = "Java Long Class"
date = 2025-08-29T19:59:50.442+01:00
draft = false
description = "Complete Java Long class tutorial covering all methods with examples. Learn about parsing, comparing, converting and other Long class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Long Class

Last modified: April 13, 2025

 

The java.lang.Long class is a wrapper for the primitive type
long. It provides a wide range of utility methods for
*converting, comparing, and manipulating* long values, making it an
essential part of Java's type system when working with numerical data.
Additionally, it offers constants such as Long.MAX_VALUE and
Long.MIN_VALUE to represent the largest and smallest possible
values for a long.

As an *immutable class*, Long ensures that its value cannot
be modified after creation, making it safe for use in concurrent applications.
It extends the Number class, allowing seamless integration with
numeric operations, and implements the Comparable interface,
enabling *ordering and comparisons* in collections like
TreeSet and PriorityQueue.

## Long Class Methods

The Long class provides several static and instance
methods for handling long values efficiently. These include:

*Parsing &amp; Conversion:* parseLong(String s), valueOf(long l), 
    and toString() for converting between different representations.
*Comparison Methods:* compare(long x, long y) and compareTo(Long other) 
    for ordering and logical comparisons.
*Bit Manipulation:* bitCount(long x), highestOneBit(long x), 
    and numberOfTrailingZeros(long x) for efficient binary operations.

These methods make Long a powerful tool for working with large
numbers, optimizing storage, and performing mathematical operations
efficiently within Java applications.

## Creating Long Objects

Long objects can be created using static factory methods or
autoboxing. The valueOf methods are preferred, as they may return
cached objects for better performance.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        Long num1 = Long.valueOf(987654321L);
        
        // Parsing from String
        Long num2 = Long.valueOf("123456789012345");
        
        // Using autoboxing
        Long num3 = 98765432109876L;
        
        System.out.println("num1: " + num1);
        System.out.println("num2: " + num2);
        System.out.println("num3: " + num3);
    }
}

This example demonstrates the recommended ways to create Long
objects. The valueOf methods are preferred as they may use cached
instances for better performance. Autoboxing automatically converts primitive
longs to Long
objects.

## Parsing Strings to Longs

The Long class provides several methods for converting strings to
long values. The parseLong method converts a string to
a primitive long, while valueOf returns a
Long object. Both can handle different radixes (number bases).

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Parse decimal string
        long decimal = Long.parseLong("123456789");
        System.out.println("Decimal: " + decimal);
        
        // Parse hexadecimal string
        long hex = Long.parseLong("1A3F", 16);
        System.out.println("Hex 1A3F: " + hex);
        
        // Parse binary string
        long binary = Long.parseLong("101010", 2);
        System.out.println("Binary 101010: " + binary);
        
        // Using valueOf which returns Long object
        Long octal = Long.valueOf("777", 8);
        System.out.println("Octal 777: " + octal);
        
        try {
            Long invalid = Long.parseLong("123ABC");
        } catch (NumberFormatException e) {
            System.out.println("Error parsing: " + e.getMessage());
        }
    }
}

This example shows how to parse strings into long values using
different number bases. The parseLong method throws
NumberFormatException for invalid inputs. The radix parameter
(2-36) specifies the number base for conversion.

## Converting Longs to Strings

Long provides multiple methods to convert long values
to strings in various formats. These include standard decimal strings, as well
as binary, octal, and hexadecimal representations. The toString
method is the most commonly used.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        long number = 255L;
        
        // Standard decimal string
        String decimalStr = Long.toString(number);
        System.out.println("Decimal: " + decimalStr);
        
        // Binary string
        String binaryStr = Long.toBinaryString(number);
        System.out.println("Binary: " + binaryStr);
        
        // Hexadecimal string
        String hexStr = Long.toHexString(number);
        System.out.println("Hex: " + hexStr);
        
        // Octal string
        String octalStr = Long.toOctalString(number);
        System.out.println("Octal: " + octalStr);
        
        // String with specified radix
        String base5Str = Long.toString(number, 5);
        System.out.println("Base 5: " + base5Str);
    }
}

This example demonstrates various string conversion methods available in the
Long class. Each method produces a string representation of the
number in the specified base. The toString method can handle any
radix from 2 to 36.

## Comparing Long Values

The Long class provides several ways to compare long
values. The compare and compareTo methods perform
numerical comparison, while equals checks for object equality.
There are also methods for unsigned comparison.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        Long a = 100L;
        Long b = 200L;
        Long c = 100L;
        
        // Using compareTo
        System.out.println("a.compareTo(b): " + a.compareTo(b));
        System.out.println("a.compareTo(c): " + a.compareTo(c));
        
        // Using static compare
        System.out.println("Long.compare(a, b): " + Long.compare(a, b));
        
        // Using equals
        System.out.println("a.equals(b): " + a.equals(b));
        System.out.println("a.equals(c): " + a.equals(c));
        
        // Unsigned comparison
        long x = -1L;
        long y = 1L;
        System.out.println("Unsigned compare: " + Long.compareUnsigned(x, y));
    }
}

This example shows different comparison techniques for Long values.
The compareTo and compare methods return negative,
zero, or positive values indicating the relationship between numbers. The
compareUnsigned method treats values as unsigned for comparison.

## Bit Manipulation Methods

The Long class includes several static methods for bit-level
manipulation of long values. These include counting bits, reversing
bits, rotating bits, and finding highest/lowest set bit. They're useful for
low-level programming.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        
        long num = 0b10101010101010101010101010101010L;
        
        System.out.println("Number: " + Long.toBinaryString(num));
        System.out.println("Bit count: " + Long.bitCount(num));
        System.out.println("Highest one bit: " + 
            Long.toBinaryString(Long.highestOneBit(num)));
        System.out.println("Lowest one bit: " + 
            Long.toBinaryString(Long.lowestOneBit(num)));
        System.out.println("Number of leading zeros: " + 
            Long.numberOfLeadingZeros(num));
        System.out.println("Number of trailing zeros: " + 
            Long.numberOfTrailingZeros(num));
        System.out.println("Reversed bits: " + 
            Long.toBinaryString(Long.reverse(num)));
        System.out.println("Rotated left by 4: " + 
            Long.toBinaryString(Long.rotateLeft(num, 4)));
    }
}

This example demonstrates various bit manipulation methods. The
bitCount method counts set bits, highestOneBit finds
the leftmost set bit, and reverse flips all bits. These operations
are performed at the binary level on the long value.

## Long Constants and Size Methods

The Long class defines several useful constants and methods related
to the size and limits of the long type. These include
MIN_VALUE, MAX_VALUE, SIZE, and
BYTES, which provide information about the long data
type's characteristics.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        System.out.println("Long min value: " + Long.MIN_VALUE);
        System.out.println("Long max value: " + Long.MAX_VALUE);
        System.out.println("Size in bits: " + Long.SIZE);
        System.out.println("Size in bytes: " + Long.BYTES);
        
        long num = 1234567890123456789L;
        System.out.println("Signum of " + num + ": " + Long.signum(num));
        System.out.println("Signum of -" + num + ": " + Long.signum(-num));
        System.out.println("Signum of 0: " + Long.signum(0));
        
        System.out.println("Hash code of " + num + ": " + Long.hashCode(num));
    }
}

This example shows the use of Long class constants and utility
methods. The MIN_VALUE and MAX_VALUE constants define
the range of valid long values. The signum method
returns -1, 0, or 1 indicating the number's sign. The hashCode
method returns a hash code for the long value.

## Source

[Java Long Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Long.html)

In this article, we've covered the essential methods of the Java
Long class with practical examples. The Long class provides
robust functionality for working with long values, including
parsing, conversion, comparison, and bit operations.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).