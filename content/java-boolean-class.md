+++
title = "Java Boolean Class"
date = 2025-08-29T19:59:44.741+01:00
draft = false
description = "Complete Java Boolean class tutorial covering all methods with examples. Learn about valueOf, parseBoolean, booleanValue and other Boolean class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Boolean Class

Last modified: April 13, 2025

 

The java.lang.Boolean class wraps a value of the primitive type
boolean in an object. This wrapper class provides methods for
converting between boolean values and strings, as well as other utilities.

Boolean objects contain a single field whose type is boolean. This
class provides constants TRUE and FALSE representing
the primitive boolean values. It also contains methods for string conversion and
comparison operations.

## Boolean Class Methods

The Boolean class provides several static and instance methods for working with
boolean values. Key methods include valueOf, parseBoolean,
booleanValue, toString, and compare.

## Creating Boolean Objects

Boolean objects can be created using the Boolean.valueOf method,
which converts primitive boolean values or string representations into instances
of the Boolean class. This method ensures efficient memory usage by
reusing cached instances of true and false instead of
creating new objects every time.

Main.java
  

void main() {

    Boolean bool1 = Boolean.valueOf(true);
    Boolean bool2 = Boolean.valueOf("true");
    Boolean bool3 = Boolean.valueOf("TRUE");
    Boolean bool4 = Boolean.valueOf("false");

    System.out.println("bool1: " + bool1);
    System.out.println("bool2: " + bool2);
    System.out.println("bool3: " + bool3);
    System.out.println("bool4: " + bool4);
}

This example demonstrates how Boolean objects can be initialized using
Boolean.valueOf. When passing a string argument, the method
interprets "true" case-insensitively, meaning both
"true" and "TRUE" evaluate to true. Any
other string, including "false", results in false.

## parseBoolean Method

The parseBoolean method parses a string argument into a boolean
primitive. It returns true if the string equals "true" (case
insensitive), otherwise false.

Main.java
  

void main() {

    boolean b1 = Boolean.parseBoolean("True");
    boolean b2 = Boolean.parseBoolean("true");
    boolean b3 = Boolean.parseBoolean("TRUE");
    boolean b4 = Boolean.parseBoolean("false");
    boolean b5 = Boolean.parseBoolean("FALSE");
    boolean b6 = Boolean.parseBoolean("yes");
    boolean b7 = Boolean.parseBoolean("1");
    
    System.out.println("b1: " + b1);
    System.out.println("b2: " + b2);
    System.out.println("b3: " + b3);
    System.out.println("b4: " + b4);
    System.out.println("b5: " + b5);
    System.out.println("b6: " + b6);
    System.out.println("b7: " + b7);
}

This example shows how parseBoolean converts strings to boolean
values. Only the exact string "true" (case-insensitive) returns true. All other
strings, including "yes" and "1", return false.

## booleanValue and toString Methods

The booleanValue method returns the primitive boolean value of a
Boolean object. The toString methods convert boolean values to
their string representations.

Main.java
  

void main() {

    Boolean boolObj1 = Boolean.TRUE;
    Boolean boolObj2 = Boolean.FALSE;
    
    // Using booleanValue()
    boolean prim1 = boolObj1.booleanValue();
    boolean prim2 = boolObj2.booleanValue();
    
    // Using toString()
    String str1 = boolObj1.toString();
    String str2 = boolObj2.toString();
    String str3 = Boolean.toString(true);
    String str4 = Boolean.toString(false);
    
    System.out.println("prim1: " + prim1);
    System.out.println("prim2: " + prim2);
    System.out.println("str1: " + str1);
    System.out.println("str2: " + str2);
    System.out.println("str3: " + str3);
    System.out.println("str4: " + str4);
}

This example demonstrates converting between Boolean objects, primitive booleans,
and strings. The booleanValue method extracts the primitive value,
while toString converts boolean values to their string equivalents.

## Logical Operations

The Boolean class provides static methods for logical operations:
logicalAnd, logicalOr, and logicalXor.
These perform AND, OR, and XOR operations on boolean values.

Main.java
  

void main() {

    boolean a = true;
    boolean b = false;
    
    boolean andResult = Boolean.logicalAnd(a, b);
    boolean orResult = Boolean.logicalOr(a, b);
    boolean xorResult = Boolean.logicalXor(a, b);
    
    System.out.println("a AND b: " + andResult);
    System.out.println("a OR b: " + orResult);
    System.out.println("a XOR b: " + xorResult);
    
    // More complex expressions
    boolean expr1 = Boolean.logicalAnd(
        Boolean.logicalOr(a, b),
        Boolean.logicalXor(a, b)
    );
    
    System.out.println("(a OR b) AND (a XOR b): " + expr1);
}

This example shows the logical operations provided by the Boolean class. These
methods are equivalent to using the &amp;&amp;, ||, and
^ operators but are useful in functional programming contexts.

## Comparison Methods

The Boolean class provides compare and compareTo
methods for comparing boolean values. These methods are useful for sorting and
ordering operations.

Main.java
  

void main() {
    
    // Using compare (static method)
    int result1 = Boolean.compare(true, false);
    int result2 = Boolean.compare(false, true);
    int result3 = Boolean.compare(true, true);
    
    // Using compareTo (instance method)
    Boolean bool1 = Boolean.TRUE;
    Boolean bool2 = Boolean.FALSE;
    int result4 = bool1.compareTo(bool2);
    int result5 = bool2.compareTo(bool1);
    int result6 = bool1.compareTo(bool1);
    
    System.out.println("compare(true, false): " + result1);
    System.out.println("compare(false, true): " + result2);
    System.out.println("compare(true, true): " + result3);
    System.out.println("TRUE.compareTo(FALSE): " + result4);
    System.out.println("FALSE.compareTo(TRUE): " + result5);
    System.out.println("TRUE.compareTo(TRUE): " + result6);
}

This example demonstrates boolean comparisons. The methods return positive values
when the first argument is true and the second is false, negative values for the
opposite case, and zero when both values are equal.

## Using Boolean in Collections

Boolean objects are commonly used in Java collections since primitive types
cannot be stored directly. This example shows Boolean usage with
ArrayList and HashMap.

Main.java
  

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

void main() {

    // Using Boolean in a List
    List&lt;Boolean&gt; boolList = new ArrayList&lt;&gt;();
    boolList.add(true);
    boolList.add(Boolean.FALSE);
    boolList.add(Boolean.parseBoolean("true"));
    
    System.out.println("Boolean List:");
    for (Boolean b : boolList) {
        System.out.println(b);
    }
    
    // Using Boolean in a Map
    Map&lt;String, Boolean&gt; settings = new HashMap&lt;&gt;();
    settings.put("autoSave", true);
    settings.put("darkMode", false);
    settings.put("notifications", Boolean.valueOf("TRUE"));
    
    System.out.println("\nSettings Map:");
    for (Map.Entry&lt;String, Boolean&gt; entry : settings.entrySet()) {
        System.out.println(entry.getKey() + ": " + entry.getValue());
    }
}

This example demonstrates storing Boolean objects in collections. The
ArrayList stores multiple Boolean values, while the
HashMap uses them as values associated with string keys. Autoboxing
automatically converts between primitive and object forms.

## Source

[Java Boolean Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Boolean.html)

In this article, we've covered all major aspects of the Java Boolean class with
practical examples. Understanding these methods is essential for working with
boolean values in object-oriented contexts and collections.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).