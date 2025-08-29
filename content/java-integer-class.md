+++
title = "Java Integer Class"
date = 2025-08-29T19:59:49.255+01:00
draft = false
description = "Complete Java Integer class tutorial covering all methods with examples. Learn about parsing, conversion, comparison and other Integer class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Integer Class

Last modified: April 13, 2025

 

The java.lang.Integer class is a wrapper for the primitive
int type. It provides methods for converting integer values to and
from String, performing numerical operations, and working with
useful constants. As part of Java's wrapper classes, Integer
enables primitive values to be used as objects, making them compatible with
collections and generic APIs.

The Integer class is immutable, meaning its value cannot be changed
after creation. It encapsulates primitive int values while offering
utility methods for parsing, comparison, and bit manipulation. The class also
provides caching for commonly used integer values, improving performance by
reusing instances instead of creating new ones.

## Integer Class Methods

The Integer class includes numerous static and instance methods for
working with integer values. Key methods include:

    - parseInt(String s) - Converts a string into a primitive int.

    - valueOf(int i) - Returns an Integer object representing the specified int value, benefiting from caching for common values.

    - compare(int x, int y) - Compares two integer values.

    - bitCount(int i) - Returns the number of set bits (1s) in the binary representation of the integer.

    - toBinaryString(int i) - Converts an integer into a binary string representation.

Additionally, the class defines important constants:

    - Integer.MIN_VALUE - The smallest possible int value (-231).

    - Integer.MAX_VALUE - The largest possible int value (231 - 1).

By leveraging these methods and constants, developers can efficiently work with
integer values while ensuring compatibility with Java's object-oriented
features.

## Creating Integer Objects

Integer objects can be created using the valueOf method or
autoboxing. The valueOf method is preferred, as it may reuse cached
instances for commonly used values, improving memory efficiency. Autoboxing
automatically converts primitive int values into
Integer objects when required, such as when storing them in
collections.

### Integer Object Caching

The Integer.valueOf method benefits from caching for values
within the range -128 to 127. When comparing small
integer values, == may return true because both
references point to the same cached instance. However, for values **greater than
127**, new instances are created, making == return
false. In such cases, equals should always be used
for proper value comparison.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        // Using valueOf() methods (recommended)
        Integer num1 = Integer.valueOf(42);
        Integer num2 = Integer.valueOf("42");

        // Autoboxing (automatically uses valueOf internally)
        Integer num3 = 42;

        System.out.println("num1: " + num1);
        System.out.println("num2: " + num2);
        System.out.println("num3: " + num3);

        // Comparing references (demonstrates caching)
        System.out.println("num1 == num2: " + (num1 == num2));
        System.out.println("num1 == num3: " + (num1 == num3));

        // Demonstrating failure of == comparison for values &gt; 127
        Integer num4 = Integer.valueOf(150);
        Integer num5 = 150;

        System.out.println("num4: " + num4);
        System.out.println("num5: " + num5);
        System.out.println("num4 == num5: " + (num4 == num5));
        System.out.println("num4.equals(num5): " + num4.equals(num5)); 
    }
}

This example demonstrates different approaches for creating Integer
objects, showcasing Java's integer object caching behavior and best practices
for comparison.

## Parsing Strings to Integers

The Integer class provides several methods to parse strings into
integer values. The parseInt method converts a String to a
primitive int, while valueOf returns an Integer
object. Both throw NumberFormatException for invalid input.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        // Parsing decimal strings
        String decimalStr = "12345";
        int primitiveInt = Integer.parseInt(decimalStr);
        Integer objectInt = Integer.valueOf(decimalStr);
        
        // Parsing with different radix (base)
        String binaryStr = "1101";
        int binaryInt = Integer.parseInt(binaryStr, 2);
        
        String hexStr = "FF";
        int hexInt = Integer.parseInt(hexStr, 16);
        
        System.out.println("Decimal parse: " + primitiveInt);
        System.out.println("Decimal valueOf: " + objectInt);
        System.out.println("Binary 1101: " + binaryInt);
        System.out.println("Hex FF: " + hexInt);
        
        try {
            Integer invalid = Integer.valueOf("12a45");
        } catch (NumberFormatException e) {
            System.out.println("Error parsing: " + e.getMessage());
        }
    }
}

This example shows how to parse strings into integers using different number
bases. The parseInt and valueOf methods can handle
various radix values from 2 to 36. The example also demonstrates exception
handling for invalid numeric strings.

## Converting Integers to Strings

The Integer class provides multiple ways to convert integers to string
representations. These include toString methods for decimal,
binary, octal, and hexadecimal formats. Both static and instance methods are
available.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        int number = 255;
        Integer numObj = 255;
        
        // Using static toString methods
        System.out.println("Decimal: " + Integer.toString(number));
        System.out.println("Binary: " + Integer.toBinaryString(number));
        System.out.println("Octal: " + Integer.toOctalString(number));
        System.out.println("Hex: " + Integer.toHexString(number));
        
        // Using instance toString method
        System.out.println("Object toString: " + numObj.toString());
        
        // Formatting with leading zeros
        System.out.println("Padded binary: " + 
            String.format("%8s", Integer.toBinaryString(number)).replace(' ', '0'));
        
        // Using toString with radix
        System.out.println("Base 5: " + Integer.toString(number, 5));
    }
}

This example demonstrates various methods to convert integers to strings in
different formats. The static toXxxString() methods provide common base
conversions, while toString(int i, int radix) allows any base from 2 to 36.
The example also shows how to format binary strings with leading zeros.

## Comparing Integer Values

Integer objects can be compared using various methods. The
compareTo method compares two Integer objects, while
compare is a static method comparing primitive ints. The
equals method checks value equality for objects.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        Integer a = 10;
        Integer b = 20;
        Integer c = 10;
        int d = 10;
        
        // Using compareTo
        System.out.println("a.compareTo(b): " + a.compareTo(b));
        System.out.println("a.compareTo(c): " + a.compareTo(c));
        
        // Using static compare
        System.out.println("Integer.compare(a, b): " + Integer.compare(a, b));
        System.out.println("Integer.compare(a, c): " + Integer.compare(a, c));
        
        // Using equals
        System.out.println("a.equals(b): " + a.equals(b));
        System.out.println("a.equals(c): " + a.equals(c));
        
        // Comparing with primitive
        System.out.println("a == d: " + (a == d)); // auto-unboxing
    }
}

This example shows different ways to compare integer values. The
compareTo and compare methods return negative, zero,
or positive values indicating ordering. The equals method checks
value equality, while == compares references (except when auto-unboxing occurs
with primitives).

## Bit Manipulation Methods

The Integer class provides several methods for bit-level operations
on integers. These include bit counting, rotation, reversal, and sign
manipulation. These methods are useful for low-level programming and
performance-sensitive code.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        int number = 0b10101010; // Binary 10101010 (170 decimal)
        
        System.out.println("Original: " + Integer.toBinaryString(number));
        System.out.println("Bit count: " + Integer.bitCount(number));
        System.out.println("Highest one bit: " + 
            Integer.toBinaryString(Integer.highestOneBit(number)));
        System.out.println("Lowest one bit: " + 
            Integer.toBinaryString(Integer.lowestOneBit(number)));
        System.out.println("Number of leading zeros: " + 
            Integer.numberOfLeadingZeros(number));
        System.out.println("Number of trailing zeros: " + 
            Integer.numberOfTrailingZeros(number));
        System.out.println("Reversed bits: " + 
            Integer.toBinaryString(Integer.reverse(number)));
        System.out.println("Rotated left by 2: " + 
            Integer.toBinaryString(Integer.rotateLeft(number, 2)));
    }
}

This example demonstrates various bit manipulation methods available in the
Integer class. These methods operate on the binary representation
of integers, providing information about bit patterns and enabling bit-level
transformations. The results are shown in binary for clarity.

## Integer Constants and Size Methods

The Integer class defines several useful constants and size-related
methods. These include MIN_VALUE and MAX_VALUE
representing the range of int, and SIZE
and BYTES representing the size in bits and bytes respectively.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        System.out.println("Integer.MIN_VALUE: " + Integer.MIN_VALUE);
        System.out.println("Integer.MAX_VALUE: " + Integer.MAX_VALUE);
        System.out.println("Integer.SIZE: " + Integer.SIZE + " bits");
        System.out.println("Integer.BYTES: " + Integer.BYTES + " bytes");
        
        // Using size-related methods
        int number = 123456789;
        System.out.println("Signum of " + number + ": " + Integer.signum(number));
        System.out.println("Signum of -" + number + ": " + Integer.signum(-number));
        System.out.println("Signum of 0: " + Integer.signum(0));
        
        // Unsigned operations
        int unsignedCompare = Integer.compareUnsigned(-1, 1);
        System.out.println("Unsigned compare -1 and 1: " + unsignedCompare);
    }
}

This example shows the use of Integer class constants and
size-related methods. The MIN_VALUE and MAX_VALUE
constants define the range of valid int values. The signum method
returns the sign of a number, while compareUnsigned
performs comparison treating integers as unsigned values.

## Source

[Java Integer Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Integer.html)

In this article, we've covered the Java Integer class with practical examples.
Understanding these methods is essential for working with integer values in Java,
especially when dealing with conversions, parsing, and bit manipulation.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).