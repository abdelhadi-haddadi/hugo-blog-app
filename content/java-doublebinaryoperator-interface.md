+++
title = "Java DoubleBinaryOperator Interface"
date = 2025-08-29T19:58:47.557+01:00
draft = false
description = "Complete Java DoubleBinaryOperator interface tutorial covering all methods with examples. Learn about functional programming in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DoubleBinaryOperator Interface

Last modified: April 16, 2025

 

The java.util.function.DoubleBinaryOperator interface represents an
operation on two double-valued operands that produces a double result. It is a
functional interface with a single abstract method applyAsDouble.

DoubleBinaryOperator is part of Java's functional programming
utilities added in Java 8. It is specialized for primitive double operations
to avoid boxing overhead. Common uses include mathematical operations and
stream reductions.

## DoubleBinaryOperator Interface Overview

DoubleBinaryOperator interface contains one abstract method that
takes two double parameters and returns a double. It is a primitive
specialization of BinaryOperator for double values.

@FunctionalInterface
public interface DoubleBinaryOperator {
    double applyAsDouble(double left, double right);
}

The code above shows the simple structure of DoubleBinaryOperator.
It is annotated with @FunctionalInterface to indicate its single abstract method
nature. The interface avoids autoboxing by working directly with primitives.

## Basic DoubleBinaryOperator Usage

The simplest way to use DoubleBinaryOperator is with lambda expressions. We
define how to combine two double values into one result. The example shows
basic arithmetic operations.

Main.java
  

package com.zetcode;

import java.util.function.DoubleBinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Addition operator
        DoubleBinaryOperator add = (a, b) -&gt; a + b;
        
        // Multiplication operator
        DoubleBinaryOperator multiply = (a, b) -&gt; a * b;
        
        System.out.println("5 + 3 = " + add.applyAsDouble(5, 3));
        System.out.println("5 * 3 = " + multiply.applyAsDouble(5, 3));
        
        // Using method reference for Math.max
        DoubleBinaryOperator max = Math::max;
        System.out.println("Max of 5 and 3: " + max.applyAsDouble(5, 3));
    }
}

This example demonstrates basic DoubleBinaryOperator usage with lambda
expressions. We create operators for addition and multiplication. The
interface works directly with primitive doubles, avoiding boxing overhead.
Method references can also be used with compatible methods.

## Using DoubleBinaryOperator with Arrays

DoubleBinaryOperator is useful for processing arrays of double values. We can
use it to implement custom reduction operations or element-wise computations.

Main.java
  

package com.zetcode;

import java.util.function.DoubleBinaryOperator;

public class Main {

    public static void main(String[] args) {

        double[] values = {1.5, 2.3, 3.7, 4.1, 5.9};
        
        // Define a sum operator
        DoubleBinaryOperator sumOperator = (a, b) -&gt; a + b;
        
        // Calculate sum of array
        double sum = 0;
        for (double value : values) {
            sum = sumOperator.applyAsDouble(sum, value);
        }
        
        System.out.println("Sum of array: " + sum);
        
        // Find maximum value
        DoubleBinaryOperator maxOperator = Math::max;
        double max = Double.MIN_VALUE;
        for (double value : values) {
            max = maxOperator.applyAsDouble(max, value);
        }
        
        System.out.println("Max value: " + max);
    }
}

This example shows how DoubleBinaryOperator can process arrays. We implement
sum and max operations by applying the operator to each element. This pattern
is similar to how stream reductions work internally.

## DoubleBinaryOperator in Stream Reductions

The DoubleStream interface uses DoubleBinaryOperator for reduction operations
like reduce. This allows custom accumulation logic for primitive double streams.

Main.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.function.DoubleBinaryOperator;

public class Main {

    public static void main(String[] args) {

        double[] temperatures = {22.5, 23.7, 21.3, 24.1, 20.9};
        
        // Calculate average temperature
        DoubleBinaryOperator avgAccumulator = (a, b) -&gt; a + b;
        double sum = Arrays.stream(temperatures)
            .reduce(0, avgAccumulator);
        double average = sum / temperatures.length;
        
        System.out.println("Average temperature: " + average);
        
        // Find temperature range (max - min)
        double range = Arrays.stream(temperatures)
            .reduce(Double.POSITIVE_INFINITY, Math::min);
        range = Arrays.stream(temperatures)
            .reduce(range, (r, t) -&gt; Math.max(r, t)) - range;
            
        System.out.println("Temperature range: " + range);
    }
}

This example demonstrates DoubleBinaryOperator in stream reductions. We calculate
average temperature and temperature range using different reduction strategies.
The operator defines how values are combined during the reduction.

## Custom Mathematical Operations

DoubleBinaryOperator can implement complex mathematical operations beyond basic
arithmetic. This example shows weighted average and geometric mean calculations.

Main.java
  

package com.zetcode;

import java.util.function.DoubleBinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Weighted average operator
        DoubleBinaryOperator weightedAvg = (value, weight) -&gt; value * weight;
        
        double[] values = {80, 90, 70};
        double[] weights = {0.2, 0.5, 0.3};
        
        double weightedSum = 0;
        double weightSum = 0;
        for (int i = 0; i &lt; values.length; i++) {
            weightedSum += weightedAvg.applyAsDouble(values[i], weights[i]);
            weightSum += weights[i];
        }
        System.out.println("Weighted average: " + weightedSum / weightSum);
        
        // Geometric mean operator
        DoubleBinaryOperator geometricProd = (a, b) -&gt; a * b;
        double product = 1;
        for (double value : values) {
            product = geometricProd.applyAsDouble(product, value);
        }
        System.out.println("Geometric mean: " + Math.pow(product, 1.0/values.length));
    }
}

This example implements weighted average and geometric mean calculations using
DoubleBinaryOperator. The operators define the core computation while the
surrounding code handles accumulation and final calculations.

## Combining with Other Functional Interfaces

DoubleBinaryOperator can be combined with other functional interfaces to create
more complex operations. This example shows composition with DoublePredicate.

Main.java
  

package com.zetcode;

import java.util.function.DoubleBinaryOperator;
import java.util.function.DoublePredicate;

public class Main {

    public static void main(String[] args) {

        // Operator that only adds if both numbers are positive
        DoubleBinaryOperator safeAdd = (a, b) -&gt; {
            DoublePredicate isPositive = n -&gt; n &gt; 0;
            return isPositive.test(a) &amp;&amp; isPositive.test(b) ? a + b : Double.NaN;
        };
        
        System.out.println("Safe add 5 + 3: " + safeAdd.applyAsDouble(5, 3));
        System.out.println("Safe add -5 + 3: " + safeAdd.applyAsDouble(-5, 3));
        
        // Operator that applies discount if total exceeds threshold
        DoubleBinaryOperator discount = (price, quantity) -&gt; {
            double total = price * quantity;
            return total &gt; 100 ? total * 0.9 : total;
        };
        
        System.out.println("Total (50 * 1): " + discount.applyAsDouble(50, 1));
        System.out.println("Total (30 * 4): " + discount.applyAsDouble(30, 4));
    }
}

This example shows how DoubleBinaryOperator can incorporate conditional logic
by combining with DoublePredicate. We create operators that perform checks
before applying their operations, demonstrating more complex use cases.

## Using in Scientific Calculations

DoubleBinaryOperator is well-suited for scientific calculations that operate on
pairs of double values. This example demonstrates vector and statistical
operations.

Main.java
  

package com.zetcode;

import java.util.function.DoubleBinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Dot product operator
        DoubleBinaryOperator dotProduct = (a, b) -&gt; a * b;
        
        double[] vector1 = {1.2, 2.3, 3.4};
        double[] vector2 = {4.5, 5.6, 6.7};
        
        double dotResult = 0;
        for (int i = 0; i &lt; vector1.length; i++) {
            dotResult += dotProduct.applyAsDouble(vector1[i], vector2[i]);
        }
        System.out.println("Dot product: " + dotResult);
        
        // Root mean square operator
        DoubleBinaryOperator rmsAccumulator = (sum, value) -&gt; sum + value * value;
        double sumSquares = 0;
        for (double value : vector1) {
            sumSquares = rmsAccumulator.applyAsDouble(sumSquares, value);
        }
        double rms = Math.sqrt(sumSquares / vector1.length);
        System.out.println("RMS: " + rms);
    }
}

This example applies DoubleBinaryOperator to scientific calculations. We compute
vector dot product and root mean square (RMS) values. The operators define the
core mathematical operations while the surrounding code handles iteration.

## Real-world Application: Financial Calculations

DoubleBinaryOperator is useful for financial calculations involving pairs of
values. This example demonstrates compound interest and portfolio return
calculations.

Main.java
  

package com.zetcode;

import java.util.function.DoubleBinaryOperator;

public class Main {

    public static void main(String[] args) {

        // Compound interest operator (principal * (1 + rate)^periods)
        DoubleBinaryOperator compoundInterest = (principal, ratePeriod) -&gt; {
            double rate = ratePeriod % 1;
            int periods = (int) (ratePeriod - rate);
            return principal * Math.pow(1 + rate, periods);
        };
        
        System.out.println("$1000 at 5% for 3 years: $" + 
            compoundInterest.applyAsDouble(1000, 0.05 + 3));
            
        // Portfolio return operator (weighted sum of returns)
        DoubleBinaryOperator portfolioReturn = (weight, returnPct) -&gt; 
            weight * returnPct;
            
        double[] weights = {0.4, 0.3, 0.3};
        double[] returns = {0.08, 0.12, 0.05};
        double totalReturn = 0;
        
        for (int i = 0; i &lt; weights.length; i++) {
            totalReturn += portfolioReturn.applyAsDouble(weights[i], returns[i]);
        }
        
        System.out.println("Portfolio return: " + (totalReturn * 100) + "%");
    }
}

This example shows practical financial applications of DoubleBinaryOperator. We
calculate compound interest and portfolio returns using specialized operators.
The interface helps encapsulate financial formulas in reusable components.

## Source

[Java DoubleBinaryOperator Interface Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/function/DoubleBinaryOperator.html)

In this article, we've covered the essential methods and features of the Java
DoubleBinaryOperator interface. Understanding these concepts is crucial for
efficient numerical processing in modern Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).