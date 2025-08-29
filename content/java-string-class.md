+++
title = "Java String Class"
date = 2025-08-29T19:59:55.004+01:00
draft = false
description = "Complete Java String class tutorial covering all methods with examples. Learn about string manipulation, comparison, and other String class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java String Class

Last modified: April 13, 2025

 

The java.lang.String class represents character strings in Java.
All string literals in Java programs are implemented as instances of this class.
Strings are immutable, meaning their values cannot be changed after creation.

The String class provides methods for examining individual characters, comparing
strings, searching strings, extracting substrings, and creating copies with
case conversion. String concatenation is implemented through the StringBuilder
class for better performance.

## String Class Methods

The String class provides numerous methods for string manipulation and
examination. Key methods include length, charAt,
substring, equals, compareTo, and
indexOf. These methods enable comprehensive string handling.

public final class String implements Serializable, Comparable&lt;String&gt;, CharSequence {
    public int length() {...}
    public char charAt(int index) {...}
    public String substring(int beginIndex) {...}
    public boolean equals(Object anObject) {...}
    public int compareTo(String anotherString) {...}
    public int indexOf(int ch) {...}
    public String toLowerCase() {...}
    public String toUpperCase() {...}
    public String trim() {...}
    // Many more methods...
}

The code above shows some fundamental methods provided by the String class.
These methods form the core functionality for string operations in Java.

## String Creation and Basic Methods

Strings can be created using literals or the new keyword. The String class
provides basic methods like length and charAt for
examining strings. String literals are stored in the string pool for efficiency.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // String creation
        String str1 = "Hello";
        String str2 = new String("World");
        String str3 = new String(new char[]{'J', 'a', 'v', 'a'});
        
        // Basic methods
        System.out.println("str1 length: " + str1.length());
        System.out.println("str2 char at 2: " + str2.charAt(2));
        System.out.println("str3: " + str3);
        
        // String concatenation
        String combined = str1 + " " + str2;
        System.out.println("Combined: " + combined);
    }
}

This example demonstrates different ways to create strings and basic string
operations. The length method returns string length, while
charAt accesses specific characters. String concatenation creates
a new string combining existing ones.

## String Comparison Methods

String comparison can be done using equals for content comparison
or compareTo for lexicographical ordering. The ==
operator compares references, not content. Case-insensitive comparison is
available via equalsIgnoreCase.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");
        String s4 = "JAVA";
        
        // Reference comparison
        System.out.println("s1 == s2: " + (s1 == s2)); // true (string pool)
        System.out.println("s1 == s3: " + (s1 == s3)); // false
        
        // Content comparison
        System.out.println("s1.equals(s2): " + s1.equals(s2)); // true
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true
        System.out.println("s1.equalsIgnoreCase(s4): " + 
                         s1.equalsIgnoreCase(s4)); // true
        
        // Lexicographical comparison
        System.out.println("\"apple\".compareTo(\"banana\"): " + 
                         "apple".compareTo("banana")); // negative
    }
}

This example shows different string comparison techniques. The ==
operator checks reference equality, while equals checks content.
compareTo returns negative, zero, or positive for ordering.

## String Searching Methods

The String class provides several methods for searching within strings,
including indexOf, lastIndexOf, contains,
and startsWith/endsWith. These methods help locate
substrings or characters within a string.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        String text = "The quick brown fox jumps over the lazy dog";
        
        // Searching methods
        System.out.println("Index of 'fox': " + text.indexOf("fox"));
        System.out.println("Last index of 'the': " + 
                         text.lastIndexOf("the"));
        System.out.println("Contains 'brown'? " + 
                         text.contains("brown"));
        System.out.println("Starts with 'The'? " + 
                         text.startsWith("The"));
        System.out.println("Ends with 'dog'? " + 
                         text.endsWith("dog"));
        
        // Finding all occurrences
        int index = -1;
        while ((index = text.indexOf("o", index + 1)) != -1) {
            System.out.println("Found 'o' at position: " + index);
        }
    }
}

This example demonstrates string searching methods. indexOf finds
the first occurrence, while lastIndexOf finds the last.
contains checks for substring presence. The loop shows how to find
all occurrences of a character.

## String Manipulation Methods

String manipulation methods include substring, replace,
toUpperCase/toLowerCase, and trim.
These methods return new strings since strings are immutable. The original
string remains unchanged.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        String original = "   Hello, World!   ";
        
        // Manipulation methods
        String trimmed = original.trim();
        String upper = original.toUpperCase();
        String lower = original.toLowerCase();
        String replaced = original.replace("World", "Java");
        String substring = original.substring(3, 8);
        
        System.out.println("Original: '" + original + "'");
        System.out.println("Trimmed: '" + trimmed + "'");
        System.out.println("Upper: '" + upper + "'");
        System.out.println("Lower: '" + lower + "'");
        System.out.println("Replaced: '" + replaced + "'");
        System.out.println("Substring(3,8): '" + substring + "'");
        
        // Chaining methods
        String result = "  Some Text  "
                       .trim()
                       .toLowerCase()
                       .replace("some", "modified");
        System.out.println("Chained result: '" + result + "'");
    }
}

This example shows various string manipulation methods. Each method returns a
new string without modifying the original. Method chaining demonstrates how to
combine multiple operations in a single expression.

## String Splitting and Joining

The split method divides a string into an array using a regular
expression delimiter. Java 8 introduced String.join for combining
strings with a delimiter. These methods are useful for processing CSV data or
building paths.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        String csv = "apple,orange,banana,grape";
        String path = "usr/local/bin/java";
        
        // Splitting strings
        String[] fruits = csv.split(",");
        String[] dirs = path.split("/");
        
        System.out.println("Fruits:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }
        
        // Joining strings
        String joinedPath = String.join("/", "usr", "local", "bin", "java");
        String joinedWithDelimiter = String.join(" - ", fruits);
        
        System.out.println("Joined path: " + joinedPath);
        System.out.println("Joined with delimiter: " + joinedWithDelimiter);
        
        // Complex splitting
        String text = "Hello;World.Another-Example";
        String[] parts = text.split("[;.-]");
        System.out.println("Complex split:");
        for (String part : parts) {
            System.out.println(part);
        }
    }
}

This example demonstrates string splitting and joining. split can
use simple delimiters or regular expressions. String.join
concatenates strings with a specified delimiter between elements.

## String Formatting

The format method provides C-style string formatting similar to
printf. Format specifiers like %s, %d, and %f control how values
are inserted into the string. This is useful for creating formatted output.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Basic formatting
        String formatted = String.format("Hello, %s! You have %d messages.", 
                                       "Alice", 5);
        System.out.println(formatted);
        
        // Number formatting
        double price = 19.99;
        String priceStr = String.format("Price: $%.2f", price);
        System.out.println(priceStr);
        
        // Date formatting
        String date = String.format("Today is %tB %te, %tY", 
                                  new java.util.Date(),
                                  new java.util.Date(),
                                  new java.util.Date());
        System.out.println(date);
        
        // Padding and alignment
        String table = String.format("%-15s %5d %10.2f%n" +
                                   "%-15s %5d %10.2f%n",
                                   "Apples", 10, 2.99,
                                   "Oranges", 5, 1.49);
        System.out.println(table);
    }
}

This example shows various string formatting techniques. The format
method supports different data types with precise control over formatting.
Alignment, padding, and number formatting are demonstrated in the table example.

## String Performance Considerations

For intensive string operations, consider using StringBuilder or
StringBuffer instead of String concatenation. These classes
provide mutable sequences of characters for better performance when modifying
strings frequently.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Inefficient concatenation in loop
        String result = "";
        for (int i = 0; i &lt; 10; i++) {
            result += i; // Creates new String each time
        }
        System.out.println("Inefficient: " + result);
        
        // Efficient using StringBuilder
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i &lt; 10; i++) {
            sb.append(i);
        }
        System.out.println("Efficient: " + sb.toString());
        
        // StringBuffer for thread safety
        StringBuffer sbf = new StringBuffer();
        sbf.append("Thread-safe");
        sbf.append(" ");
        sbf.append("version");
        System.out.println(sbf.toString());
    }
}

This example compares string concatenation approaches. The inefficient version
creates many temporary String objects. StringBuilder provides better
performance for mutable strings, while StringBuffer offers thread safety.

## Source

[Java String Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html)

In this article, we've covered the essential methods of the Java String class
with practical examples. Understanding these methods is crucial for effective
string manipulation in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).