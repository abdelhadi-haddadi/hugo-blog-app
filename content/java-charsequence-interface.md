+++
title = "Java CharSequence Interface"
date = 2025-08-29T19:59:45.847+01:00
draft = false
description = "Complete Java CharSequence interface tutorial covering all methods with examples. Learn about length, charAt, subSequence and other CharSequence methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java CharSequence Interface

Last modified: April 13, 2025

 

The java.lang.CharSequence interface represents a readable sequence
of character values, providing a consistent, immutable view of textual data. It
serves as an abstraction for various types of character sequences, allowing
uniform access to their contents. This interface is implemented by several
classes, including String, StringBuilder, and
StringBuffer, each offering different functionalities for handling
and manipulating text.

Introduced in Java 1.4, CharSequence was designed to unify
operations on different character sequence types. It provides several methods,
such as:

    length() - Returns the number of characters in the
    sequence.
    charAt(int index) - Retrieves the character at the
    specified index.
    subSequence(int start, int end) - Returns a portion of the
    character sequence.
    toString() - Converts the sequence into a
    String representation.

Since CharSequence is an interface, it does not provide a concrete
implementation but rather defines a contract that implementing classes must
follow. The String class, for example, represents immutable
character sequences, while StringBuilder and
StringBuffer allow mutable string operations with different
threading behaviors.

Many Java APIs accept CharSequence as a parameter, enabling
flexibility when working with different types of character sequences. This
abstraction makes it easier to process text without being constrained to a
specific underlying implementation.

## CharSequence Interface Methods

The CharSequence interface defines several methods for examining
characters. These methods must be implemented by all classes that implement the
interface. The main methods include length, charAt,
subSequence, and toString.

## Basic CharSequence Usage

This example demonstrates basic usage of CharSequence with
different implementations. We show how to use the interface methods with
String, StringBuilder, and StringBuffer.

Main.java
  

void main() {

    // Different CharSequence implementations
    CharSequence str = "Hello World";
    CharSequence sb = new StringBuilder("Java Programming");
    CharSequence sbf = new StringBuffer("CharSequence Demo");
    
    // Common operations
    System.out.println("String length: " + str.length());
    System.out.println("5th char in StringBuilder: " + sb.charAt(4));
    System.out.println("Subsequence of StringBuffer: " + 
                        sbf.subSequence(0, 11));
    
    // toString() usage
    String s = str.toString();
    System.out.println("Converted to String: " + s);
}

This example shows how CharSequence provides a common interface for
different character sequence types. We can call the same methods regardless of
the underlying implementation. The toString method converts any
CharSequence to a String when needed.

## CharSequence with String

Strings are the most common CharSequence implementation. This
example shows specific String operations through the CharSequence
interface.

Main.java
  

void processSequence(CharSequence seq) {

    System.out.println("Processing sequence: " + seq);
    System.out.println("Length: " + seq.length());
    System.out.println("First char: " + seq.charAt(0));
    System.out.println("Last char: " + seq.charAt(seq.length() - 1));
}

void main() {

    String text = "Programming in Java";
    processSequence(text);
    processSequence(text.subSequence(0, 11));
}

Here we demonstrate how String works as a CharSequence. The
processSequence method accepts any CharSequence, allowing it to
work with both the full String and its subsequence. This shows the flexibility
of programming to interfaces.

## CharSequence with StringBuilder

StringBuilder is a mutable CharSequence
implementation. This example shows how to use StringBuilder through
the CharSequence interface while maintaining mutability.

Main.java
  

void main() {

    StringBuilder sb = new StringBuilder("Initial Value");
    CharSequence cs = sb;
    
    System.out.println("Original: " + cs);
    System.out.println("Length: " + cs.length());
    System.out.println("Char at 3: " + cs.charAt(3));
    
    // Mutate the underlying StringBuilder
    sb.append(" Appended");
    System.out.println("After mutation: " + cs);
    
    // Create subsequence
    CharSequence sub = cs.subSequence(8, 13);
    System.out.println("Subsequence: " + sub);
}

This example demonstrates that while CharSequence itself is
read-only, the underlying StringBuilder remains mutable. Changes to
the StringBuilder are visible through the CharSequence
reference. The subsequence operation creates a new CharSequence
view of part of the original.

## CharSequence in Regular Expressions

Java's regular expression API extensively uses CharSequence. This
example shows pattern matching with different CharSequence
implementations.

Main.java
  

void main() {

    Pattern pattern = Pattern.compile("\\d{3}-\\d{2}-\\d{4}");
    
    CharSequence[] inputs = {
        "123-45-6789", // String
        new StringBuilder("987-65-4321"),
        new StringBuffer("Invalid-12-3456"),
        "Another invalid 12-34-5678"
    };
    
    for (CharSequence input : inputs) {
        Matcher matcher = pattern.matcher(input);
        System.out.println(input + ": " + 
                            (matcher.matches() ? "Valid" : "Invalid"));
    }
}

This example demonstrates how Java's regex API accepts any
CharSequence. We test different implementations against a social
security number pattern. The  and Matcher classes work
with all CharSequence types, showing the interface's utility in API
design.

## Custom CharSequence Implementation

This example shows how to create a custom CharSequence
implementation. We'll build a simple sequence that reverses another
CharSequence.

Main.java
  

public class ReverseCharSequence implements CharSequence {

    private final CharSequence original;
    
    public ReverseCharSequence(CharSequence original) {
        this.original = original;
    }
    
    @Override
    public int length() {
        return original.length();
    }
    
    @Override
    public char charAt(int index) {
        return original.charAt(original.length() - 1 - index);
    }
    
    @Override
    public CharSequence subSequence(int start, int end) {
        return new ReverseCharSequence(
            original.subSequence(original.length() - end, 
                               original.length() - start));
    }
    
    @Override
    public String toString() {

        StringBuilder sb = new StringBuilder(length());
        for (int i = 0; i &lt; length(); i++) {
            sb.append(charAt(i));
        }
        return sb.toString();
    }
}

void main() {

    CharSequence original = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    CharSequence reversed = new ReverseCharSequence(original);
    
    System.out.println("Original: " + original);
    System.out.println("Reversed: " + reversed);
    System.out.println("5th char: " + reversed.charAt(4));
    System.out.println("Subseq(5-10): " + 
                        reversed.subSequence(5, 10));
}

This example demonstrates creating a custom CharSequence that
reverses another sequence. The ReverseCharSequence class implements all required
methods, providing a view of the original sequence in reverse order. This shows
how CharSequence can be used to create specialized sequence views.

## CharSequence Performance Considerations

This example compares performance characteristics of different
CharSequence implementations for common operations.

Main.java
  

public static void measurePerformance(CharSequence seq, String type) {

    final int ITERATIONS = 1000000;
    
    // Measure charAt performance
    long start = System.nanoTime();
    for (int i = 0; i &lt; ITERATIONS; i++) {
        seq.charAt(i % seq.length());
    }
    long duration = System.nanoTime() - start;
    System.out.printf("%s charAt: %d ns%n", type, duration/ITERATIONS);
    
    // Measure subSequence performance
    start = System.nanoTime();
    for (int i = 0; i &lt; ITERATIONS; i++) {
        seq.subSequence(0, seq.length() / 2);
    }
    duration = System.nanoTime() - start;
    System.out.printf("%s subSequence: %d ns%n", type, duration/ITERATIONS);
}

void main() {

    CharSequence str = "PerformanceTestString";
    CharSequence sb = new StringBuilder("PerformanceTestString");
    CharSequence sbf = new StringBuffer("PerformanceTestString");
    
    measurePerformance(str, "String");
    measurePerformance(sb, "StringBuilder");
    measurePerformance(sbf, "StringBuffer");
}

This example measures the performance of basic CharSequence
operations across different implementations. String typically offers the fastest
read operations, while StringBuilder and StringBuffer may have
different performance characteristics. Results may vary based on JVM
implementation and version.

## Source

[Java CharSequence Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/CharSequence.html)

In this article, we've covered the Java CharSequence interface with
practical examples. Understanding CharSequence is valuable for
writing flexible APIs that can work with different character sequence types
efficiently.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).