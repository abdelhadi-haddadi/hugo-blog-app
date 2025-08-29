+++
title = "Java Number Class"
date = 2025-08-29T19:59:51.533+01:00
draft = false
description = "Complete Java Number class tutorial covering all methods with examples. Learn about numeric conversions and Number class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Number Class

Last modified: April 13, 2025

 

The java.lang.Number class is the abstract superclass of all
numeric wrapper classes in Java. It serves as a foundation for handling
different numeric types, including Integer, Double,
Float, Long, Short, and
Byte. Understanding the Number class is crucial for
performing numeric conversions and working with object-oriented representations
of primitive values.

The Number class provides methods for converting numeric values
into various primitive types. These methods are implemented by all numeric
wrapper subclasses, ensuring seamless type conversions. Acting as a bridge
between primitive numeric types and their object counterparts, the
Number class simplifies operations on numeric data while
maintaining flexibility.

## Key Methods of the Number Class

The Number class defines essential abstract methods that its
subclasses must implement. These methods facilitate type conversion by returning
primitive representations of numeric values. The primary methods include:

    - intValue  Converts the numeric value to an int.

    - doubleValue  Converts the numeric value to a double.

    - longValue  Converts the numeric value to a long.

    - floatValue  Converts the numeric value to a float.

By implementing these methods, numeric wrapper classes offer convenient ways to
work with different data types while preserving object-oriented principles.

In practice, the Number class is essential for writing generic,
flexible code that can seamlessly handle various numeric types without requiring
specific type knowledge in advance. This makes it particularly valuable in
scenarios where polymorphism is needed, such as designing APIs, collections, or
utility methods that process different numeric types dynamically.

For example, an API might need to accept different numeric inputs—whether
Integer, Double, or Float—without
enforcing a strict type dependency. By using Number as a parameter
or return type, developers ensure their code remains adaptable, capable of
supporting multiple numeric types without extensive type-checking logic. This
approach enhances code reusability and scalability, making it easier to extend
functionality while maintaining robust type safety.

Moreover, since all numeric wrapper classes implement the conversion methods
defined in Number, developers can effortlessly switch between
primitive types using methods like intValue,
doubleValue, longValue, and floatValue.
This allows for smooth type conversions within mathematical operations,
computations, and data processing workflows, ensuring precision while adhering
to object-oriented design principles.

Overall, leveraging the Number class in generic programming fosters
modular, maintainable, and efficient code, helping developers handle a broad
range of numeric types without sacrificing flexibility or performance.

## Basic Number Usage

The Number class is abstract, so we use its concrete subclasses
like Integer or Double. This example demonstrates
basic usage of Number references with different numeric types.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        
        Number num1 = Integer.valueOf(42);
        Number num2 = Double.valueOf(3.14);
        Number num3 = Float.valueOf(2.718f);
        
        System.out.println("Integer value: " + num1.intValue());
        System.out.println("Double value: " + num2.doubleValue());
        System.out.println("Float value: " + num3.floatValue());
        
        // Using Number as a common type
        Number[] numbers = {num1, num2, num3};
        for (Number num : numbers) {
            System.out.println("Number value: " + num.doubleValue());
        }
    }
}

In this example, we create Number references to different numeric
types. We then demonstrate how to access the values using the conversion
methods. The Number array shows how Number can be used
as a common type for different numeric classes.

## Number Conversions

The Number class provides methods to convert between different
numeric types. This example shows various conversion scenarios between numeric
types.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        
        Number num = Double.valueOf(123.456);
        
        // Converting to different types
        int intVal = num.intValue();
        long longVal = num.longValue();
        float floatVal = num.floatValue();
        double doubleVal = num.doubleValue();
        
        System.out.println("int: " + intVal);
        System.out.println("long: " + longVal);
        System.out.println("float: " + floatVal);
        System.out.println("double: " + doubleVal);
        
        // Potential loss of precision
        Number bigNum = Double.valueOf(1.23e50);
        System.out.println("Big double as float: " + bigNum.floatValue());
    }
}

This example demonstrates converting a Double Number
to various primitive types. Note that conversions may result in loss of
precision, especially when converting large numbers to float. The
example shows both exact and lossy conversions.

## Number Parsing

While Number itself doesn't provide parsing methods, its subclasses
do. This example shows how to parse strings into Number objects
using different numeric types.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        
        try {
            // Parsing different number types
            Number intNum = Integer.valueOf("42");
            Number doubleNum = Double.valueOf("3.14159");
            Number floatNum = Float.valueOf("2.71828");
            
            System.out.println("Parsed Integer: " + intNum.intValue());
            System.out.println("Parsed Double: " + doubleNum.doubleValue());
            System.out.println("Parsed Float: " + floatNum.floatValue());
            
            // Hexadecimal parsing
            Number hexNum = Integer.valueOf("FF", 16);
            System.out.println("Hexadecimal FF: " + hexNum.intValue());
            
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + e.getMessage());
        }
    }
}

This example demonstrates parsing strings into Number objects using
the valueOf methods of different numeric wrapper classes. It also
shows hexadecimal parsing and includes error handling for invalid number
formats.

## Number Comparison

Comparing Number objects requires care due to different numeric
types. Use Integer.valueOf(100),
Double.valueOf(100.0), or autoboxing (e.g., Number num =
100) to create wrapper objects. This example shows how to properly
compare Number objects by converting them to a common type.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        
        Number num1 = Integer.valueOf(100);
        Number num2 = Double.valueOf(100.0);
        Number num3 = Float.valueOf(100.0f);
        
        // Comparing as doubles for precision
        System.out.println("num1 == num2: " + 
            (num1.doubleValue() == num2.doubleValue()));
        System.out.println("num1 == num3: " + 
            (num1.doubleValue() == num3.doubleValue()));
            
        // Comparing with epsilon for floating point
        double epsilon = 0.0001;
        Number floatNum = Float.valueOf(1.0f / 3.0f);
        Number doubleNum = Double.valueOf(1.0 / 3.0);
        
        System.out.println("Float vs Double exact: " + 
            (floatNum.doubleValue() == doubleNum.doubleValue()));
        System.out.println("Float vs Double with epsilon: " + 
            (Math.abs(floatNum.doubleValue() - doubleNum.doubleValue()) &lt; epsilon));
    }
}

This example demonstrates proper comparison techniques for Number
objects. It shows converting to a common type (double) for
comparison and using epsilon for floating-point comparisons to account for
precision differences between types.

## Number Arithmetic

Performing arithmetic with Number objects requires converting to
primitive types. This example shows how to safely perform arithmetic operations
with different Number types.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        
        Number num1 = Integer.valueOf(10);
        Number num2 = Double.valueOf(3.5);
        
        // Performing arithmetic by converting to appropriate types
        double sum = num1.doubleValue() + num2.doubleValue();
        double product = num1.intValue() * num2.doubleValue();
        double division = num1.doubleValue() / num2.doubleValue();
        
        System.out.println("Sum: " + sum);
        System.out.println("Product: " + product);
        System.out.println("Division: " + division);
        
        // Handling different numeric types
        Number[] numbers = {Integer.valueOf(5), Double.valueOf(2.5), Float.valueOf(1.5f)};
        double total = 0;
        for (Number num : numbers) {
            total += num.doubleValue();
        }
        System.out.println("Total: " + total);
    }
}

This example shows how to perform arithmetic operations with Number
objects by converting them to appropriate primitive types. It demonstrates
addition, multiplication, and division, as well as summing an array of mixed
Number types.

## Number Formatting

Formatting Number objects for display can be done using
NumberFormat or DecimalFormat. This example
demonstrates different formatting options for
Number objects.

Main.java
  

package com.zetcode;

import java.text.NumberFormat;
import java.text.DecimalFormat;
import java.util.Locale;

public class Main {

    public static void main(String[] args) {
        
        Number num = Double.valueOf(12345.6789);
        
        // Default locale formatting
        NumberFormat defaultFormat = NumberFormat.getInstance();
        System.out.println("Default format: " + defaultFormat.format(num));
        
        // Currency formatting
        NumberFormat currencyFormat = NumberFormat.getCurrencyInstance();
        System.out.println("Currency format: " + currencyFormat.format(num));
        
        // Percentage formatting
        Number percentNum = Double.valueOf(0.85);
        NumberFormat percentFormat = NumberFormat.getPercentInstance();
        System.out.println("Percent format: " + percentFormat.format(percentNum));
        
        // Custom decimal formatting
        DecimalFormat decimalFormat = new DecimalFormat("#,##0.00");
        System.out.println("Custom format: " + decimalFormat.format(num));
        
        // Locale-specific formatting
        NumberFormat frenchFormat = NumberFormat.getInstance(Locale.FRANCE);
        System.out.println("French format: " + frenchFormat.format(num));
    }
}

This example demonstrates various ways to format Number objects for
display. It shows default number formatting, currency formatting, percentage
formatting, custom decimal formatting, and locale-specific formatting using
different locales.

## Number and Collections

The Number class is useful when working with collections of mixed
numeric types. This example shows how to process a collection containing
different Number implementations.

Main.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        
        List&lt;Number&gt; numbers = new ArrayList&lt;&gt;();
        numbers.add(Integer.valueOf(42));
        numbers.add(Double.valueOf(3.14159));
        numbers.add(Float.valueOf(2.71828f));
        numbers.add(Long.valueOf(1000000000L));
        
        // Processing mixed numbers
        double sum = 0;
        for (Number num : numbers) {
            sum += num.doubleValue();
            System.out.println("Processing: " + num.getClass().getSimpleName() + 
                             " with value: " + num);
        }
        
        System.out.println("Total sum: " + sum);
        System.out.println("Average: " + (sum / numbers.size()));
        
        // Finding maximum value
        double max = Double.MIN_VALUE;
        for (Number num : numbers) {
            if (num.doubleValue() &gt; max) {
                max = num.doubleValue();
            }
        }
        System.out.println("Maximum value: " + max);
    }
}

This example demonstrates working with a collection of mixed Number
types. It shows how to process each number regardless of its concrete type,
calculate sum and average, and find the maximum value in the collection by
converting to a common type (double).

## Source

[Java Number Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Number.html)

In this article, we've covered the Java Number class with practical
examples. Understanding Number is essential for working with
numeric conversions and mixed numeric types in Java collections and APIs.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).