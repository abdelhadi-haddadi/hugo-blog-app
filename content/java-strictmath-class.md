+++
title = "Java StrictMath Class"
date = 2025-08-29T19:59:54.972+01:00
draft = false
description = "Complete Java StrictMath class tutorial covering all methods with examples. Learn about mathematical operations with strict precision."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java StrictMath Class

Last modified: April 13, 2025

 

The java.lang.StrictMath class provides methods for performing basic
numeric operations with strict floating-point precision. Unlike Math,
StrictMath guarantees bit-for-bit identical results across all
platforms. This makes it ideal for applications requiring reproducible results.

All methods in StrictMath are static and include trigonometric,
exponential, logarithmic, and other common mathematical functions. The class
ensures platform independence by using algorithms from the well-known
Freely Distributable Math Library (fdlibm).

## StrictMath Class Methods

The StrictMath class contains over 70 methods for mathematical
operations. These include basic arithmetic, trigonometry, exponents, rounding,
and special functions. All methods are static and work with primitive numeric
types.

public final class StrictMath {
    public static double sin(double a) {...}
    public static double cos(double a) {...}
    public static double tan(double a) {...}
    public static double exp(double a) {...}
    public static double log(double a) {...}
    public static double sqrt(double a) {...}
    public static double pow(double a, double b) {...}
    public static int abs(int a) {...}
    public static double ceil(double a) {...}
    public static double floor(double a) {...}
    // ... and many more
}

The code above shows a subset of methods available in StrictMath.
These methods provide mathematical operations with strict floating-point
semantics, ensuring consistent results across different platforms.

## Basic Arithmetic Operations

StrictMath provides methods for basic arithmetic operations like
absolute value, maximum, minimum, and signum. These methods work with various
primitive types and ensure consistent results across platforms.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Absolute value
        int absInt = StrictMath.abs(-10);
        double absDouble = StrictMath.abs(-3.14);
        
        // Maximum and minimum
        double max = StrictMath.max(5.6, 9.2);
        double min = StrictMath.min(5.6, 9.2);
        
        // Signum function
        double signum = StrictMath.signum(-25.5);
        
        System.out.println("Absolute int: " + absInt);
        System.out.println("Absolute double: " + absDouble);
        System.out.println("Maximum: " + max);
        System.out.println("Minimum: " + min);
        System.out.println("Signum: " + signum);
    }
}

This example demonstrates basic arithmetic operations with StrictMath.
The abs method returns absolute values, max and
min compare values, and signum returns the sign of
a number (-1, 0, or 1). All operations are performed with strict precision.

## Trigonometric Functions

StrictMath provides standard trigonometric functions including
sine, cosine, tangent, and their inverses. These methods take angles in radians
and return precise results according to strict floating-point rules.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        double angle = StrictMath.PI / 4; // 45 degrees in radians
        
        // Basic trigonometric functions
        double sinValue = StrictMath.sin(angle);
        double cosValue = StrictMath.cos(angle);
        double tanValue = StrictMath.tan(angle);
        
        // Inverse trigonometric functions
        double asinValue = StrictMath.asin(sinValue);
        double acosValue = StrictMath.acos(cosValue);
        double atanValue = StrictMath.atan(tanValue);
        
        System.out.println("Sine: " + sinValue);
        System.out.println("Cosine: " + cosValue);
        System.out.println("Tangent: " + tanValue);
        System.out.println("Arcsine: " + asinValue);
        System.out.println("Arccosine: " + acosValue);
        System.out.println("Arctangent: " + atanValue);
    }
}

This example shows trigonometric operations with StrictMath. We
calculate sine, cosine, and tangent of a 45-degree angle (π/4 radians), then
verify the results using inverse functions. The precision is guaranteed to be
consistent across all platforms.

## Exponential and Logarithmic Functions

StrictMath includes methods for exponential and logarithmic
calculations. These include natural logarithm, base-10 logarithm, exponential
function, and power operations. All methods maintain strict floating-point
semantics.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        double value = 2.5;
        
        // Exponential and logarithmic functions
        double exp = StrictMath.exp(value);
        double log = StrictMath.log(value);
        double log10 = StrictMath.log10(value);
        
        // Power functions
        double pow = StrictMath.pow(value, 3);
        double sqrt = StrictMath.sqrt(value);
        
        System.out.println("exp(" + value + "): " + exp);
        System.out.println("ln(" + value + "): " + log);
        System.out.println("log10(" + value + "): " + log10);
        System.out.println(value + "^3: " + pow);
        System.out.println("sqrt(" + value + "): " + sqrt);
    }
}

This example demonstrates exponential and logarithmic functions. We calculate
e2.5, natural log, base-10 log, 2.53, and square root
of 2.5. All operations are performed with strict floating-point precision
guaranteed by StrictMath.

## Rounding and Remainder Operations

StrictMath provides several methods for rounding numbers and
calculating remainders. These include ceiling, floor, round, and IEEE remainder
operations. Each method follows strict floating-point rules.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        double num1 = 3.7;
        double num2 = -2.3;
        
        // Rounding operations
        double ceil1 = StrictMath.ceil(num1);
        double floor1 = StrictMath.floor(num1);
        long round1 = StrictMath.round(num1);
        
        double ceil2 = StrictMath.ceil(num2);
        double floor2 = StrictMath.floor(num2);
        long round2 = StrictMath.round(num2);
        
        // Remainder operation
        double remainder = StrictMath.IEEEremainder(10, 3);
        
        System.out.println("Ceiling of " + num1 + ": " + ceil1);
        System.out.println("Floor of " + num1 + ": " + floor1);
        System.out.println("Round of " + num1 + ": " + round1);
        System.out.println("Ceiling of " + num2 + ": " + ceil2);
        System.out.println("Floor of " + num2 + ": " + floor2);
        System.out.println("Round of " + num2 + ": " + round2);
        System.out.println("IEEE remainder of 10/3: " + remainder);
    }
}

This example shows rounding operations with StrictMath.
ceil rounds up, floor rounds down, and
round rounds to nearest integer. The IEEEremainder
method computes the remainder according to IEEE 754 standard.

## Hyperbolic Functions

StrictMath includes hyperbolic trigonometric functions:
hyperbolic sine, cosine, and tangent. These are useful in various engineering
and physics applications and maintain strict floating-point precision.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        double x = 1.5;
        
        // Hyperbolic functions
        double sinh = StrictMath.sinh(x);
        double cosh = StrictMath.cosh(x);
        double tanh = StrictMath.tanh(x);
        
        System.out.println("Hyperbolic sine: " + sinh);
        System.out.println("Hyperbolic cosine: " + cosh);
        System.out.println("Hyperbolic tangent: " + tanh);
        
        // Verify identity: cosh^2(x) - sinh^2(x) = 1
        double identity = cosh * cosh - sinh * sinh;
        System.out.println("cosh^2(x) - sinh^2(x) = " + identity);
    }
}

This example demonstrates hyperbolic functions in StrictMath.
We calculate hyperbolic sine, cosine, and tangent of 1.5, then verify the
fundamental identity cosh²(x) - sinh²(x) = 1. The results show the precision
of StrictMath operations.

## Angular Conversion

StrictMath provides methods for converting between degrees and
radians. These conversions are essential when working with trigonometric
functions that require angles in radians.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        double degrees = 45.0;
        double radians = StrictMath.toRadians(degrees);
        
        System.out.println(degrees + " degrees = " + radians + " radians");
        
        // Convert back to degrees
        double backToDegrees = StrictMath.toDegrees(radians);
        System.out.println(radians + " radians = " + backToDegrees + " degrees");
        
        // Calculate sin of 45 degrees
        double sin45 = StrictMath.sin(radians);
        System.out.println("sin(45°) = " + sin45);
    }
}

This example shows angle conversion between degrees and radians using
StrictMath. We convert 45 degrees to radians, then back to
degrees, and finally calculate the sine of 45 degrees by first converting
to radians. The precision is maintained throughout all conversions.

## Random Number Generation

StrictMath includes a random number generator method that
produces pseudorandom numbers with strict floating-point semantics. The
numbers are uniformly distributed between 0.0 (inclusive) and 1.0 (exclusive).

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Generate 5 random numbers
        System.out.println("Random numbers:");
        for (int i = 0; i &lt; 5; i++) {
            System.out.println(StrictMath.random());
        }
        
        // Generate random integer between 1 and 100
        int min = 1;
        int max = 100;
        int randomInt = min + (int)(StrictMath.random() * ((max - min) + 1));
        System.out.println("Random integer between " + min + " and " + max + 
                         ": " + randomInt);
    }
}

This example demonstrates random number generation with StrictMath.
We first generate five random doubles between 0.0 and 1.0, then show how to
generate a random integer in a specific range. The results are reproducible
across platforms due to strict floating-point rules.

## Source

[Java StrictMath Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/StrictMath.html)

In this article, we've covered the essential methods of the Java StrictMath
class with practical examples. Understanding these methods is important for
applications requiring strict floating-point precision and reproducibility.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).