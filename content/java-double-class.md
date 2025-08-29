+++
title = "Java Double Class"
date = 2025-08-29T19:59:48.134+01:00
draft = false
description = "Complete Java Double class tutorial covering all methods with examples. Learn about parsing, comparing, and converting Double values."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Double Class

Last modified: April 13, 2025

 

The java.lang.Double class is a wrapper for the primitive
double type, providing utility methods for working with
double-precision floating-point numbers. It allows conversion between primitive
double values and Double objects, enabling them to be
used in collections, generics, and object-oriented programming contexts.

In addition to conversion functions, the Double class offers useful
constants and methods for numerical operations. It includes functionalities for
parsing, comparing, and checking special floating-point values such as
NaN (Not-a-Number) and infinity. These features help ensure
precision and correctness when handling floating-point arithmetic.

## Double Class Methods

The Double class provides several static and instance methods for
working with double values. Some key methods include:

    parseDouble(String s) - Converts a string into a primitive
    double, throwing a NumberFormatException for
    invalid input.
    valueOf(double d) - Returns a Double object
    representing the specified primitive double value.
    doubleValue() - Extracts the primitive double
    value from a Double object.
    compare(Double d1, Double d2) - Compares two
    Double objects, returning a negative, zero, or positive result
    based on their relative values.
    isNaN(double d) - Determines whether the given
    double value is NaN, which occurs in cases of
    undefined mathematical operations.

By utilizing these methods, the Double class facilitates seamless
conversions, comparisons, and numerical operations in Java, ensuring reliability
when working with floating-point data.

## Creating Double Objects

The Double class provides multiple ways to create instances
representing double-precision floating-point numbers. Objects can be
instantiated using the valueOf method, which is preferred due to
its potential for caching frequently used values. Additionally, Java's
autoboxing mechanism automatically converts primitive double values
into Double objects when necessary.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        Double d1 = Double.valueOf(3.14159);
        Double d2 = Double.valueOf("3.14159");

        // Using autoboxing
        Double d3 = 3.14159;

        System.out.println("d1: " + d1);
        System.out.println("d2: " + d2);
        System.out.println("d3: " + d3);

        // Converting back to primitive
        double primitive = d1;
        System.out.println("Primitive value: " + primitive);
    }
}

This example demonstrates different approaches for creating Double
objects. The valueOf method is often preferred because it may reuse
existing instances instead of creating new ones. Autoboxing simplifies
conversions, automatically wrapping primitive double values into
Double objects when needed, reducing manual object creation.

## Parsing Double Values

The parseDouble method converts a string to a primitive double.
The valueOf method converts a string to a Double object. Both
throw NumberFormatException for invalid input.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        String numStr1 = "3.14159";
        String numStr2 = "-123.456";
        String invalidStr = "3.14.159";
        
        // Parsing to primitive double
        double d1 = Double.parseDouble(numStr1);
        double d2 = Double.parseDouble(numStr2);
        
        // Parsing to Double object
        Double dObj1 = Double.valueOf(numStr1);
        Double dObj2 = Double.valueOf(numStr2);
        
        System.out.println("d1: " + d1);
        System.out.println("d2: " + d2);
        System.out.println("dObj1: " + dObj1);
        System.out.println("dObj2: " + dObj2);
        
        try {
            double invalid = Double.parseDouble(invalidStr);
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + invalidStr);
        }
    }
}

This example shows how to parse strings into double values. The
parseDouble returns a primitive, while valueOf
returns a Double object. Both methods throw exceptions for malformed input.

## Special Double Values

Special floating-point values arise from certain mathematical operations:

    **NaN (Not-a-Number):** Represents an undefined result,
    such as 0/0 or Infinity - Infinity. NaN values
    propagate through calculations.
    **Positive Infinity:** Occurs when a value exceeds the
    largest possible double, such as 1.0 / 0.0.
    **Negative Infinity:** Represents an infinitely small
    value, such as -1.0 / 0.0.

These values follow specific rules in floating-point arithmetic. Operations
involving NaN almost always result in NaN. Infinite
values behave as expected in multiplication or addition but can become
NaN when divided by another infinity.

By leveraging special values and their corresponding validation methods,
developers can handle edge cases in floating-point computations effectively and
prevent unexpected numerical errors.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        double nanValue = Double.NaN;
        double posInf = Double.POSITIVE_INFINITY;
        double negInf = Double.NEGATIVE_INFINITY;
        
        System.out.println("NaN: " + nanValue);
        System.out.println("Positive Infinity: " + posInf);
        System.out.println("Negative Infinity: " + negInf);
        
        System.out.println("Is NaN? " + Double.isNaN(nanValue));
        System.out.println("Is Infinity? " + Double.isInfinite(posInf));
        
        // Operations with special values
        System.out.println("NaN + 1: " + (nanValue + 1)); // NaN propagates
        System.out.println("Infinity * 2: " + (posInf * 2)); // Still infinity
        System.out.println("Infinity / Infinity: " + (posInf / posInf)); // Results in NaN
    }
}

This example demonstrates how special floating-point values—NaN,
POSITIVE_INFINITY, and NEGATIVE_INFINITY—behave in
Java. It shows how to check for these values using isNaN and
isInfinite and illustrates how they propagate through arithmetic
operations, helping developers handle edge cases in numerical computations
effectively

## Comparing Double Values

Comparing double values requires special care due to floating-point
precision errors. Direct equality checks using == may produce
unexpected results when dealing with fractional values. The compare
and compareTo methods provide reliable comparison mechanisms,
correctly handling special values like NaN and infinity.

Floating-point precision limitations can lead to inaccurate equality checks. To
ensure correct comparisons, follow these best practices:

    **Use Double.compare(d1, d2):** This method
    correctly handles special values such as NaN and infinity.
    **Avoid direct equality checks (d1 == d2):**
    Minor precision differences may cause inaccurate results.
    **Use a tolerance for approximate equality:**
    Math.abs(d1 - d2) &lt; tolerance accounts for small
    floating-point errors.
    **Be cautious with NaN:** Any comparison
    involving NaN returns unexpected results since NaN
    is unordered.
    Use BigDecimal for exact decimal
    comparisons:
    Unlike double, BigDecimal provides precise decimal
    arithmetic, preventing rounding errors. Use
    BigDecimal.compareTo for reliable equality checks.

For scenarios requiring precise decimal values, such as financial calculations,
BigDecimal is the preferred choice. It avoids floating-point
inaccuracies and allows control over scale and rounding behavior, ensuring
correctness in numerical computations.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        Double d1 = 1.23456;
        Double d2 = 1.23457;
        Double d3 = Double.NaN;
        Double d4 = Double.POSITIVE_INFINITY;
        
        // Using compareTo method (instance method)
        System.out.println("d1 compareTo d2: " + d1.compareTo(d2));
        System.out.println("d3 compareTo d1: " + d3.compareTo(d1));
        System.out.println("d4 compareTo d1: " + d4.compareTo(d1));
        
        // Using static compare method
        System.out.println("Compare d1 and d2: " + Double.compare(d1, d2));

        // Equality comparison with tolerance
        double tolerance = 0.0001;
        boolean nearlyEqual = Math.abs(d1 - d2) &lt; tolerance;
        System.out.println("d1 nearly equals d2: " + nearlyEqual);
    }
}

This example demonstrates different approaches for comparing floating-point
values in Java. It shows how the compareTo method correctly handles
ordering, even with special values like NaN and infinity. The static
Double.compare method provides another way to compare Double
instances. Additionally, the example highlights the importance of using a
tolerance value when checking for approximate equality, ensuring reliable
comparisons despite minor floating-point precision errors

## Converting Double Values

The Double class provides various methods to convert between
double values and other primitive types. These methods allow for
seamless data transformations, but it's important to consider potential
precision loss when converting floating-point numbers to integer types.

Common conversion methods include intValue,
longValue, and floatValue. When converting to
integer types, the fractional part is truncated rather than rounded, which may
lead to differences in expected values.

When converting Double values, consider the following:

    **Truncation vs. Rounding:** Converting a
    double to an integer type removes the decimal part rather than
    rounding.
    **Precision Loss:** Converting to float may
    introduce slight precision errors due to differences in storage format.
    **Overflow Risks:** Converting large double
    values to byte or short can lead to unexpected
    overflow behavior.
    **Hexadecimal Representation:** The
    toHexString() method provides a base-16 floating-point format
    that can be useful for debugging or storage.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        Double d = 123.456789;
        
        // Converting to other primitive types
        int intVal = d.intValue();  // Truncates decimal part
        long longVal = d.longValue();
        float floatVal = d.floatValue(); // Potential precision loss
        byte byteVal = d.byteValue(); // Risk of overflow for large values
        short shortVal = d.shortValue();
        
        System.out.println("Original double: " + d);
        System.out.println("intValue: " + intVal);
        System.out.println("longValue: " + longVal);
        System.out.println("floatValue: " + floatVal);
        System.out.println("byteValue: " + byteVal);
        System.out.println("shortValue: " + shortVal);
        
        // Converting to String
        String strVal = d.toString();
        String hexStr = Double.toHexString(d);
        
        System.out.println("toString: " + strVal);
        System.out.println("toHexString: " + hexStr);
    }
}

This example demonstrates safe and efficient conversion methods, highlighting
potential pitfalls developers should consider when working with floating-point
data.

## Double Constants and Limits

The Double class provides useful constants that represent the
limits of double-precision floating-point numbers. These include
MAX_VALUE, MIN_VALUE, and MAX_EXPONENT.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {

        System.out.println("MAX_VALUE: " + Double.MAX_VALUE);
        System.out.println("MIN_VALUE: " + Double.MIN_VALUE);
        System.out.println("MIN_NORMAL: " + Double.MIN_NORMAL);
        System.out.println("MAX_EXPONENT: " + Double.MAX_EXPONENT);
        System.out.println("MIN_EXPONENT: " + Double.MIN_EXPONENT);
        System.out.println("SIZE: " + Double.SIZE + " bits");
        System.out.println("BYTES: " + Double.BYTES + " bytes");
        
        // Demonstrating overflow
        double max = Double.MAX_VALUE;
        System.out.println("MAX_VALUE * 2: " + (max * 2));
        
        // Demonstrating underflow
        double min = Double.MIN_VALUE;
        System.out.println("MIN_VALUE / 2: " + (min / 2));
    }
}

This example displays the limits of double-precision floating-point numbers.
MAX_VALUE is the largest finite positive value, while
MIN_VALUE is the smallest positive nonzero value. Overflow
results in infinity, while underflow can result in zero.

## Source

[Java Double Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Double.html)

In this article, we've covered the essential methods and features of the Java
Double class. Understanding these concepts is crucial for working
with floating-point numbers in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).