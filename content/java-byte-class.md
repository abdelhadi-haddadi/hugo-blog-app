+++
title = "Java Byte Class"
date = 2025-08-29T19:59:45.877+01:00
draft = false
description = "Complete Java Byte class tutorial covering all methods with examples. Learn about byte conversion, parsing, comparison and other Byte class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Byte Class

Last modified: April 13, 2025

 

The java.lang.Byte class is a wrapper for the primitive
byte type. It provides utility methods for handling byte values,
including conversion, comparison, and parsing. As part of Java's wrapper class
system, Byte allows byte primitives to be used in object-oriented
contexts, such as collections and generic classes.

Since Byte is **final** and
**immutable**, its value cannot be changed after creation. It
extends the Number class, inheriting numeric capabilities, and
implements the Comparable interface, enabling byte values to be
compared within Java collections and sorting mechanisms.

## Byte Class Methods

The Byte class provides several static and instance methods for
byte manipulation. Some key methods include:

    parseByte(String s) - Converts a string into a
    byte, throwing a NumberFormatException if the
    input is invalid.
    valueOf(byte b) - Returns a Byte instance
    representing the specified byte value.
    byteValue() - Extracts the primitive byte
    value from a Byte object.
    compare(Byte b1, Byte b2) - Compares two Byte
    values, returning a negative, zero, or positive result based on their
    ordering.
    toString() - Converts the Byte object into its
    string representation.

By integrating these methods, Java ensures seamless conversions between byte
primitives, string representations, and object-oriented structures. The
Byte class is commonly used in scenarios requiring type safety,
numerical comparisons, and storage within data structures.

## Creating Byte Objects

Byte objects can be created using static factory methods. The
valueOf may cache frequently used values for better performance.

Main.java
  

void main() {

    Byte byte1 = Byte.valueOf((byte) 100);
    Byte byte2 = Byte.valueOf("100");

    // Using autoboxing
    Byte byte3 = 100;

    System.out.println("byte1: " + byte1);
    System.out.println("byte2: " + byte2);
    System.out.println("byte3: " + byte3);

    // Comparing objects
    System.out.println("byte1 equals byte2: " + (byte1.equals(byte2)));
    System.out.println("byte2 equals byte3: " + (byte2.equals(byte3)));
}

This example demonstrate show to create Byte objects. Note that due
to caching, small byte values (between -128 and 127) may refer to the same
object when using valueOf.

## Parsing Byte Values

The Byte class provides methods to parse string representations of
byte values. The parseByte method converts a string to a primitive
byte, while valueOf returns a Byte object. Both methods can throw
NumberFormatException for invalid input.

Main.java
  

void main() {

    // Parsing decimal strings
    byte b1 = Byte.parseByte("100");
    Byte b2 = Byte.valueOf("100");
    
    // Parsing hexadecimal strings
    byte b3 = Byte.parseByte("A", 16);
    Byte b4 = Byte.valueOf("7F", 16);
    
    System.out.println("b1: " + b1);
    System.out.println("b2: " + b2);
    System.out.println("b3: " + b3); // 10 in decimal
    System.out.println("b4: " + b4); // 127 in decimal
    
    try {
        // This will throw NumberFormatException
        byte b5 = Byte.parseByte("200");
    } catch (NumberFormatException e) {
        System.out.println("Error: " + e.getMessage());
    }
}

This example shows how to parse byte values from strings. The radix parameter
allows parsing hexadecimal (base 16) values. Note that "200" is invalid as it
exceeds Byte.MAX_VALUE (127), causing
NumberFormatException.

## Comparing Byte Values

Byte values can be compared using instance methods or static
utility methods. The compareTo method compares two
Byte objects, while compare compares primitive bytes.
Both return negative, zero, or positive values indicating ordering.

Main.java
  

void main() {

    Byte byte1 = 50;
    Byte byte2 = 100;
    byte byte3 = 50;
    
    // Instance comparison
    System.out.println("byte1.compareTo(byte2): " + byte1.compareTo(byte2));
    System.out.println("byte1.compareTo(Byte.valueOf(byte3)): " + 
                        byte1.compareTo(Byte.valueOf(byte3)));
    
    // Static comparison
    System.out.println("Byte.compare(byte1, byte2): " + 
                        Byte.compare(byte1, byte2));
    System.out.println("Byte.compare(byte3, byte1.byteValue()): " + 
                        Byte.compare(byte3, byte1.byteValue()));
    
    // Equality comparison
    System.out.println("byte1.equals(byte2): " + byte1.equals(byte2));
    System.out.println("byte1.equals(Byte.valueOf(byte3)): " + 
                        byte1.equals(Byte.valueOf(byte3)));
}

This example demonstrates different ways to compare byte values. The compareTo
and compare methods return -1, 0, or 1 for less than, equal to, or greater than
comparisons. The equals method checks for exact value equality between objects.

## Converting Byte Values

The Byte class extends Number, providing methods to convert byte values to other
primitive numeric types. These include intValue,
doubleValue, etc. The toString methods convert bytes
to string representations.

Main.java
  

void main() {

    Byte byteValue = 100;
    
    // Converting to other primitive types
    System.out.println("intValue: " + byteValue.intValue());
    System.out.println("doubleValue: " + byteValue.doubleValue());
    System.out.println("floatValue: " + byteValue.floatValue());
    System.out.println("longValue: " + byteValue.longValue());
    System.out.println("shortValue: " + byteValue.shortValue());
    
    // String conversions
    System.out.println("toString: " + byteValue.toString());
    System.out.println("static toString: " + Byte.toString((byte) 100));
    System.out.println("toHexString: " + 
                        Integer.toHexString(byteValue &amp; 0xFF));
}

This example shows various conversion methods available in the Byte class. While
Byte provides basic string conversion, for hexadecimal representation we use
Integer.toHexString with proper byte masking to avoid sign extension issues.

## Byte Constants and Size

The Byte class defines useful constants for the minimum and maximum values a
byte can represent. It also provides the SIZE constant representing the number
of bits used to store a byte value (always 8 bits in Java).

Main.java
  

void main() {

    System.out.println("Byte.MIN_VALUE: " + Byte.MIN_VALUE);
    System.out.println("Byte.MAX_VALUE: " + Byte.MAX_VALUE);
    System.out.println("Byte.SIZE: " + Byte.SIZE + " bits");
    System.out.println("Byte.BYTES: " + Byte.BYTES + " bytes");
    
    // Demonstrating byte range
    byte minByte = Byte.MIN_VALUE;
    byte maxByte = Byte.MAX_VALUE;
    
    System.out.println("minByte - 1: " + (minByte - 1));
    System.out.println("maxByte + 1: " + (maxByte + 1));
    
    // Binary representation
    System.out.println("MIN_VALUE binary: " + 
                        Integer.toBinaryString(minByte &amp; 0xFF));
    System.out.println("MAX_VALUE binary: " + 
                        Integer.toBinaryString(maxByte &amp; 0xFF));
}

This example demonstrates Byte class constants and byte size information. Note
that arithmetic operations on bytes promote them to int, so overflow doesn't
occur in the same way as with pure byte operations. The binary representation
shows the actual 8-bit pattern when properly masked.

## Byte Hash Code and Equality

The Byte class overrides hashCode and equals from
Object. The hashCode returns the byte value itself, while equals compares the
wrapped byte values. This ensures proper behavior when using Byte objects in
collections.

Main.java
  

void main() {

    Byte byte1 = 100;
    Byte byte2 = 100;
    Byte byte3 = 50;
    
    // Hash code examples
    System.out.println("byte1.hashCode(): " + byte1.hashCode());
    System.out.println("byte2.hashCode(): " + byte2.hashCode());
    System.out.println("byte3.hashCode(): " + byte3.hashCode());
    
    // Equality examples
    System.out.println("byte1.equals(byte2): " + byte1.equals(byte2));
    System.out.println("byte1.equals(byte3): " + byte1.equals(byte3));
    
    // Using in HashSet
    HashSet&lt;Byte&gt; byteSet = new HashSet&lt;&gt;();
    byteSet.add(byte1);
    byteSet.add(byte2);
    byteSet.add(byte3);
    
    System.out.println("Set size: " + byteSet.size());
    System.out.println("Set contains 100: " + byteSet.contains((byte) 100));
}

This example demonstrates the hashCode and equals behavior of Byte
objects. Identical byte values produce the same hash code and are considered
equal. The HashSet example shows proper collection behavior due to
these implementations.

## Byte Decoding and Encoding

The Byte class can be used in conjunction with character encoding
operations. While Java's String uses UTF-16 internally, bytes are often used for
ASCII or other single-byte character encodings. This example shows basic
byte/char conversion.

Main.java
  

void main() {

    // ASCII character to byte
    byte letterA = (byte) 'A';
    Byte letterB = (byte) 'B';
    
    System.out.println("letterA: " + letterA);
    System.out.println("letterB: " + letterB);
    
    // Byte to character
    char aChar = (char) letterA;
    char bChar = (char) letterB.byteValue();
    
    System.out.println("aChar: " + aChar);
    System.out.println("bChar: " + bChar);
    
    // String to bytes and back
    String text = "Hello";
    byte[] bytes = text.getBytes();
    
    System.out.print("Bytes: ");
    for (byte b : bytes) {
        System.out.print(b + " ");
    }
    System.out.println();
    
    String reconstructed = new String(bytes);
    System.out.println("Reconstructed: " + reconstructed);
}

This example shows basic conversion between bytes and characters. Note that this
simple approach works for ASCII characters (0-127) but may not handle extended
character sets properly. For full character encoding support, use appropriate
Charset objects with String.getBytes and String constructors.

## Source

[Java Byte Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Byte.html)

In this article, we've covered all major aspects of the Java Byte
class with practical examples. The Byte wrapper class is essential
when byte values need to be treated as objects or when utility methods for byte
manipulation are required.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).