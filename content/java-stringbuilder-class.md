+++
title = "Java StringBuilder Class"
date = 2025-08-29T19:59:56.154+01:00
draft = false
description = "Complete Java StringBuilder class tutorial covering all methods with examples. Learn about append, insert, delete, reverse and other StringBuilder methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java StringBuilder Class

Last modified: April 13, 2025

 

The java.lang.StringBuilder class is a mutable sequence of characters.
It provides an alternative to String when you need to modify strings frequently.
Unlike String objects, StringBuilder objects can be modified after creation.

StringBuilder is more efficient than String for concatenating multiple strings.
It avoids creating multiple intermediate String objects. This makes it ideal for
situations where you need to perform many string modifications.

## StringBuilder Class Methods

The StringBuilder class provides methods for string manipulation including
appending, inserting, deleting, and replacing characters. It also includes
methods for capacity management and string reversal.

public final class StringBuilder {
    public StringBuilder() {...}
    public StringBuilder(int capacity) {...}
    public StringBuilder(String str) {...}
    
    public StringBuilder append(...) {...}
    public StringBuilder insert(int offset, ...) {...}
    public StringBuilder delete(int start, int end) {...}
    public StringBuilder replace(int start, int end, String str) {...}
    public StringBuilder reverse() {...}
    
    public int length() {...}
    public int capacity() {...}
    public void ensureCapacity(int minimumCapacity) {...}
    public void trimToSize() {...}
    
    public char charAt(int index) {...}
    public void setCharAt(int index, char ch) {...}
    public String substring(int start) {...}
    public String substring(int start, int end) {...}
}

The code above shows the main methods provided by the StringBuilder class.
These methods allow efficient string manipulation without creating new objects.

## Creating a StringBuilder

StringBuilder objects can be created in several ways: empty, with initial
capacity, or from an existing string. The default constructor creates an empty
StringBuilder with capacity 16.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        // Empty StringBuilder with default capacity (16)
        StringBuilder sb1 = new StringBuilder();
        System.out.println("sb1 capacity: " + sb1.capacity());
        
        // StringBuilder with initial capacity of 100
        StringBuilder sb2 = new StringBuilder(100);
        System.out.println("sb2 capacity: " + sb2.capacity());
        
        // StringBuilder initialized with a string
        StringBuilder sb3 = new StringBuilder("Hello");
        System.out.println("sb3 content: " + sb3);
        System.out.println("sb3 length: " + sb3.length());
        System.out.println("sb3 capacity: " + sb3.capacity());
    }
}

This example demonstrates different ways to create StringBuilder objects.
The capacity is automatically increased when needed. The length shows the
actual content size while capacity shows the allocated space.

## Appending to a StringBuilder

The append method adds data to the end of the StringBuilder.
It is overloaded to accept various data types including primitives, objects,
and character arrays. Each append returns the same StringBuilder instance.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        
        // Append different types
        sb.append("Hello");
        sb.append(' ');
        sb.append(123);
        sb.append(' ');
        sb.append(true);
        sb.append(' ');
        sb.append(3.14);
        
        System.out.println(sb); // Hello 123 true 3.14
        
        // Chaining append calls
        sb.append(" and ").append("welcome!");
        System.out.println(sb); // Hello 123 true 3.14 and welcome!
        
        // Append part of a string
        sb.append(" to Java programming", 0, 8);
        System.out.println(sb); // Hello 123 true 3.14 and welcome! to Java 
    }
}

This example shows how to append different data types to a StringBuilder.
The method is versatile and supports method chaining. It also demonstrates
appending a substring of a larger string.

## Inserting into a StringBuilder

The insert method adds data at a specified position in the
StringBuilder. Like append, it supports various data types. The offset must
be within the current length of the StringBuilder.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Java programming");
        
        // Insert at position 5
        sb.insert(5, "is ");
        System.out.println(sb); // Java is programming
        
        // Insert various types
        sb.insert(0, "Version: ");
        sb.insert(8, 11);
        sb.insert(10, ' ');
        System.out.println(sb); // Version: 11 Java is programming
        
        // Insert part of a string
        sb.insert(20, "great ", 0, 6);
        System.out.println(sb); // Version: 11 Java is great programming
    }
}

This example demonstrates inserting different data types at specific positions.
The method allows precise control over where new content is added. It also
shows inserting a substring of a larger string.

## Deleting and Replacing Content

The delete method removes characters between specified indices.
The replace method substitutes characters with a new string.
Both methods modify the StringBuilder in place.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Java is awesome!");
        
        // Delete characters from index 8 to 16
        sb.delete(8, 16);
        System.out.println(sb); // Java is !
        
        // Replace characters from index 5 to 7
        sb.replace(5, 7, "was");
        System.out.println(sb); // Java was !
        
        // Delete single character
        sb.deleteCharAt(8);
        System.out.println(sb); // Java was!
        
        // Replace all occurrences (using toString and String methods)
        String result = sb.toString().replace("was", "is");
        System.out.println(result); // Java is!
    }
}

This example shows how to delete and replace content in a StringBuilder.
The delete method removes a range, while replace substitutes it. For global
replacements, convert to String first.

## Reversing and Modifying Characters

The reverse method inverts the character sequence.
Individual characters can be accessed and modified using charAt
and setCharAt. These operations are performed in place.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello World");
        
        // Reverse the content
        sb.reverse();
        System.out.println(sb); // dlroW olleH
        
        // Modify individual characters
        sb.setCharAt(5, '_');
        System.out.println(sb); // dlroW_olleH
        
        // Get character at specific position
        char c = sb.charAt(3);
        System.out.println("Character at index 3: " + c); // o
        
        // Get substring
        String sub = sb.substring(6, 10);
        System.out.println("Substring: " + sub); // olle
    }
}

This example demonstrates reversing the content and modifying individual
characters. It also shows how to access characters and extract substrings
from a StringBuilder.

## Capacity Management

StringBuilder manages memory automatically but provides methods for capacity
control. ensureCapacity guarantees minimum capacity while
trimToSize reduces storage to the actual content size.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        
        System.out.println("Initial capacity: " + sb.capacity()); // 16
        System.out.println("Initial length: " + sb.length()); // 0
        
        // Add content to exceed default capacity
        sb.append("This is a long string that exceeds default capacity");
        System.out.println("New capacity: " + sb.capacity()); // 34
        System.out.println("New length: " + sb.length()); // 50
        
        // Ensure minimum capacity
        sb.ensureCapacity(100);
        System.out.println("After ensureCapacity: " + sb.capacity()); // 100
        
        // Trim to size
        sb.trimToSize();
        System.out.println("After trimToSize: " + sb.capacity()); // 50
    }
}

This example shows StringBuilder's automatic capacity management and how to
control it manually. The capacity grows as needed, but can be pre-allocated
or trimmed to save memory.

## Performance Comparison with String

StringBuilder significantly outperforms String for multiple concatenations.
This example demonstrates the performance difference when building a large
string through repeated concatenation.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        final int ITERATIONS = 100000;
        
        // Using String
        long startTime = System.currentTimeMillis();
        String result = "";
        for (int i = 0; i &lt; ITERATIONS; i++) {
            result += "a";
        }
        long stringTime = System.currentTimeMillis() - startTime;
        
        // Using StringBuilder
        startTime = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i &lt; ITERATIONS; i++) {
            sb.append("a");
        }
        String sbResult = sb.toString();
        long sbTime = System.currentTimeMillis() - startTime;
        
        System.out.println("String concatenation time: " + stringTime + "ms");
        System.out.println("StringBuilder time: " + sbTime + "ms");
        System.out.println("StringBuilder is " + 
                          (stringTime / sbTime) + " times faster");
    }
}

This example clearly shows the performance advantage of StringBuilder for
repeated string operations. String concatenation creates many intermediate
objects, while StringBuilder modifies a single buffer.

## Source

[Java StringBuilder Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html)

In this article, we've covered all major methods of the Java StringBuilder class
with practical examples. StringBuilder is essential for efficient string
manipulation in Java, especially when performing multiple modifications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).