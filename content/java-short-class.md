+++
title = "Java Short Class"
date = 2025-08-29T19:59:54.978+01:00
draft = false
description = "Complete Java Short class tutorial covering all methods with examples. Learn about parsing, comparing, converting and other Short class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Short Class

Last modified: April 13, 2025

 

The java.lang.Short class is a wrapper class for the primitive
short data type in Java. It provides methods to convert between
short values and String representations, as well as various utility methods.

Short objects contain a single field of type short. This class is
useful when you need to treat a short as an object, such as in collections or
when using reflection. It also provides constants for the minimum and maximum
values a short can hold.

## Short Class Methods

The Short class provides several static and instance methods for working with
short values. Key methods include parseShort, valueOf,
toString, compare, and various conversion methods.

public final class Short extends Number implements Comparable&lt;Short&gt; {
    public static final short MIN_VALUE = -32768;
    public static final short MAX_VALUE = 32767;
    
    public static short parseShort(String s) {...}
    public static Short valueOf(short s) {...}
    public static Short valueOf(String s) {...}
    public static String toString(short s) {...}
    public static int compare(short x, short y) {...}
    public static short reverseBytes(short i) {...}
    public byte byteValue() {...}
    public short shortValue() {...}
    public int intValue() {...}
    public long longValue() {...}
    public float floatValue() {...}
    public double doubleValue() {...}
    public int compareTo(Short anotherShort) {...}
    public boolean equals(Object obj) {...}
    public int hashCode() {...}
    public String toString() {...}
}

The code above shows the main methods and constants provided by the Short class.
These methods allow for parsing, comparing, converting, and manipulating short
values in various ways.

## Creating Short Objects

There are several ways to create Short objects in Java. You can use the
constructor, valueOf methods, or autoboxing. The valueOf methods are generally
preferred as they may cache frequently used values.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Using constructor (deprecated in Java 9)
        Short s1 = new Short((short) 100);
        
        // Using valueOf method
        Short s2 = Short.valueOf((short) 200);
        Short s3 = Short.valueOf("300");
        
        // Using autoboxing
        Short s4 = 400;
        
        System.out.println("s1: " + s1);
        System.out.println("s2: " + s2);
        System.out.println("s3: " + s3);
        System.out.println("s4: " + s4);
        
        // Accessing constants
        System.out.println("Min value: " + Short.MIN_VALUE);
        System.out.println("Max value: " + Short.MAX_VALUE);
    }
}

This example demonstrates different ways to create Short objects. Note that the
constructor approach is deprecated since Java 9. The valueOf methods and
autoboxing are the preferred approaches. We also show the MIN_VALUE and
MAX_VALUE constants.

## Parsing Short Values

The Short class provides methods to parse String representations of short values.
The parseShort method converts a String to a primitive short,
while valueOf returns a Short object. Both can handle different
radixes (number bases).

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Parsing decimal strings
        short s1 = Short.parseShort("123");
        Short s2 = Short.valueOf("456");
        
        // Parsing hexadecimal strings
        short s3 = Short.parseShort("1A", 16);
        Short s4 = Short.valueOf("FF", 16);
        
        System.out.println("s1: " + s1);
        System.out.println("s2: " + s2);
        System.out.println("s3: " + s3);
        System.out.println("s4: " + s4);
        
        try {
            // This will throw NumberFormatException
            Short.parseShort("32768"); // Exceeds MAX_VALUE
        } catch (NumberFormatException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

This example shows how to parse String values into short values. We demonstrate
both decimal and hexadecimal parsing. The example also includes error handling
for values that exceed the valid range of a short (-32768 to 32767).

## Comparing Short Values

Short values can be compared using the compare and
compareTo methods. The static compare method works
with primitive shorts, while compareTo is an instance method for
Short objects.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        short a = 100;
        short b = 200;
        Short s1 = Short.valueOf(a);
        Short s2 = Short.valueOf(b);
        
        // Comparing primitive shorts
        int result1 = Short.compare(a, b);
        System.out.println("compare(100, 200): " + result1);
        
        // Comparing Short objects
        int result2 = s1.compareTo(s2);
        System.out.println("100.compareTo(200): " + result2);
        
        // Equality comparison
        Short s3 = Short.valueOf((short) 100);
        System.out.println("s1.equals(s3): " + s1.equals(s3));
        System.out.println("s1 == s3: " + (s1 == s3)); // May be true due to caching
    }
}

This example demonstrates different ways to compare short values. The compare
methods return negative, zero, or positive values depending on whether the first
argument is less than, equal to, or greater than the second. Note that ==
compares object references, not values.

## Converting Short Values

The Short class provides methods to convert short values to other primitive
types. These methods are inherited from the Number class and include
byteValue, intValue, longValue, etc.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Short s = Short.valueOf((short) 12345);
        
        // Converting to other primitive types
        byte b = s.byteValue(); // May lose information
        int i = s.intValue();
        long l = s.longValue();
        float f = s.floatValue();
        double d = s.doubleValue();
        
        System.out.println("byteValue: " + b);
        System.out.println("intValue: " + i);
        System.out.println("longValue: " + l);
        System.out.println("floatValue: " + f);
        System.out.println("doubleValue: " + d);
        
        // Converting to String
        String str1 = s.toString();
        String str2 = Short.toString((short) 54321);
        
        System.out.println("toString: " + str1);
        System.out.println("Short.toString: " + str2);
    }
}

This example shows how to convert Short values to other primitive types and to
Strings. Note that converting to byte may lose information since byte has a
smaller range (-128 to 127) than short. The toString methods provide String
representations of the values.

## Byte Manipulation

The Short class provides the reverseBytes method to reverse the
order of bytes in a short value. This is useful for dealing with different
byte-order representations (endianness).

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        short original = (short) 0x1234;
        short reversed = Short.reverseBytes(original);
        
        System.out.printf("Original: 0x%04x\n", original);
        System.out.printf("Reversed: 0x%04x\n", reversed);
        
        // Practical example: reading little-endian data
        byte[] data = {0x34, 0x12}; // Little-endian representation of 0x1234
        short value = (short) ((data[1] &amp; 0xFF) &lt;&lt; 8 | (data[0] &amp; 0xFF));
        
        System.out.printf("Constructed value: 0x%04x\n", value);
    }
}

This example demonstrates byte manipulation with short values. The
reverseBytes method swaps the two bytes of a short value. We also
show how to construct a short value from bytes in little-endian order, which is
common when reading binary data from files or network streams.

## Hash Code and Equality

The Short class overrides hashCode and equals to
provide proper value-based comparison and hashing. Two Short objects are equal
if they represent the same short value, regardless of whether they are the same
object.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Short s1 = Short.valueOf((short) 100);
        Short s2 = Short.valueOf((short) 100);
        Short s3 = Short.valueOf((short) 200);
        
        // Equality tests
        System.out.println("s1.equals(s2): " + s1.equals(s2));
        System.out.println("s1.equals(s3): " + s1.equals(s3));
        
        // Hash codes
        System.out.println("s1.hashCode(): " + s1.hashCode());
        System.out.println("s2.hashCode(): " + s2.hashCode());
        System.out.println("s3.hashCode(): " + s3.hashCode());
        
        // Identity vs equality
        System.out.println("s1 == s2: " + (s1 == s2)); // May be true due to caching
    }
}

This example demonstrates the equality and hashing behavior of Short objects.
The equals method compares the wrapped short values, while hashCode returns the
short value itself as the hash code. Note that == may return true for equal
values due to caching of frequently used Short objects.

## Source

[Java Short Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Short.html)

In this article, we've covered the Java Short class with practical examples.
The Short class is essential when working with collections, generics, or when
you need object representations of short values. Understanding its methods is
important for proper Java development.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).