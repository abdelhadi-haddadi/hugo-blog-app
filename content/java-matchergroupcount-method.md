+++
title = "Java Matcher.groupCount Method"
date = 2025-08-29T20:00:13.072+01:00
draft = false
description = "Complete Java Matcher.groupCount tutorial with examples. Learn about capturing groups in Java regex."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.groupCount Method

Last modified: April 20, 2025

 

The Matcher.groupCount method returns the number of capturing
groups in a regular expression pattern. It is part of the
java.util.regex package. This method is useful for determining how
many groups a pattern contains before performing matches.

Capturing groups are portions of a regex pattern enclosed in parentheses. They
allow you to extract specific parts of matched text. The
groupCount method does not include the special group 0, which
always represents the entire match.

## Basic Definition

The groupCount method is defined in the Matcher
class. It returns an integer representing the number of capturing groups in the
pattern. The count is based on the pattern used to create the Matcher instance.

The method signature is simple: public int groupCount. It takes
no parameters and returns the count of capturing groups. The count remains
constant for a given Matcher instance.

## Simple Group Count Example

This basic example demonstrates how to use groupCount with a
simple pattern. We'll create a pattern with two capturing groups and check the
count.

SimpleGroupCount.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SimpleGroupCount {

    public static void main(String[] args) {
        String regex = "(\\d{3})-(\\d{3})"; // Two capturing groups
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher("123-456");
        
        int groupCount = matcher.groupCount();
        System.out.println("Number of capturing groups: " + groupCount);
        
        if (matcher.matches()) {
            for (int i = 0; i &lt;=  groupCount; i++) {
                System.out.println("Group " + i + ": " + matcher.group(i));
            }
        }
    }
}

In this example, we create a pattern that matches phone number-like strings with
two groups of three digits. The groupCount method returns 2,
matching our two capturing groups. Note that we loop up to and including
groupCount to include group 0 (the full match).

## No Capturing Groups Example

This example shows the behavior of groupCount when the pattern
contains no capturing groups. The method will return 0 in such cases.

NoGroupsExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NoGroupsExample {

    public static void main(String[] args) {
        String regex = "\\d{3}-\\d{3}"; // No capturing groups
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher("123-456");
        
        System.out.println("Number of capturing groups: " + 
            matcher.groupCount());
        
        if (matcher.matches()) {
            System.out.println("Full match: " + matcher.group(0));
            // matcher.group(1) would throw IndexOutOfBoundsException
        }
    }
}

Here, the pattern matches the same phone number format but without capturing
groups. groupCount returns 0, and attempting to access group 1
would throw an exception. Only group 0 (the full match) is available.

## Nested Groups Example

This example demonstrates how groupCount works with nested
capturing groups. Each set of parentheses counts as a separate group,
regardless of nesting level.

NestedGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NestedGroups {

    public static void main(String[] args) {
        // One outer group containing two inner groups
        String regex = "((\\d{2})-(\\d{2}))-(\\d{4})";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher("12-31-2023");
        
        System.out.println("Number of capturing groups: " + 
            matcher.groupCount());
        
        if (matcher.matches()) {
            for (int i = 0; i &lt;=  matcher.groupCount(); i++) {
                System.out.println("Group " + i + ": " + matcher.group(i));
            }
        }
    }
}

The pattern has four capturing groups: the entire date part, the month-day part,
the month, the day, and the year. groupCount returns 4. The
output shows how each nested group is numbered sequentially from left to right.

## Non-Capturing Groups Example

This example illustrates how non-capturing groups (using (?:...)
syntax) affect groupCount. Non-capturing groups are not included
in the count.

NonCapturingGroups.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NonCapturingGroups {

    public static void main(String[] args) {
        // One capturing group and one non-capturing group
        String regex = "(\\d{3})(?:-)(\\d{3})";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher("123-456");
        
        System.out.println("Number of capturing groups: " + 
            matcher.groupCount());
        
        if (matcher.matches()) {
            for (int i = 0; i &lt;=  matcher.groupCount(); i++) {
                System.out.println("Group " + i + ": " + matcher.group(i));
            }
        }
    }
}

The pattern contains two capturing groups (for the numbers) and one non-capturing
group (for the hyphen). groupCount returns 2, ignoring the
non-capturing group. The hyphen is still part of the match but isn't assigned a
group number.

## Named Groups Example

This example shows how named capturing groups (using (?&lt;name&gt;...)
syntax) work with groupCount. Named groups are included in the
count just like regular capturing groups.

NamedGroupsExample.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NamedGroupsExample {

    public static void main(String[] args) {
        // Two named capturing groups
        String regex = "(?&lt;area&gt;\\d{3})-(?&lt;exchange&gt;\\d{3})";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher("123-456");
        
        System.out.println("Number of capturing groups: " + 
            matcher.groupCount());
        
        if (matcher.matches()) {
            System.out.println("Full match: " + matcher.group(0));
            System.out.println("Area code: " + matcher.group("area"));
            System.out.println("Exchange: " + matcher.group("exchange"));
            System.out.println("Group 1: " + matcher.group(1));
            System.out.println("Group 2: " + matcher.group(2));
        }
    }
}

The pattern has two named groups: "area" and "exchange". groupCount
returns 2, showing that named groups are counted normally. The groups can be
accessed by either their names or their numbers (1 and 2 in this case).

## Complex Pattern Example

This example demonstrates groupCount with a more complex pattern
that mixes different group types. It shows how the method behaves with various
grouping constructs.

ComplexPattern.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ComplexPattern {

    public static void main(String[] args) {
        // Mix of capturing, non-capturing, and named groups
        String regex = "(\\d{2})(?:-)(?&lt;month&gt;\\d{2})-(\\d{4})";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher("31-12-2023");
        
        System.out.println("Number of capturing groups: " + 
            matcher.groupCount());
        
        if (matcher.matches()) {
            System.out.println("\nAll groups:");
            for (int i = 0; i &lt;=  matcher.groupCount(); i++) {
                System.out.println("Group " + i + ": " + matcher.group(i));
            }
            
            System.out.println("\nNamed group:");
            System.out.println("Month: " + matcher.group("month"));
        }
    }
}

The pattern contains three groups: a numbered group for the day, a non-capturing
group for the hyphen, a named group for the month, and a numbered group for the
year. groupCount returns 3 (the non-capturing group is excluded).
The example shows access to both numbered and named groups.

## Real-World Example: Email Parsing

This practical example uses groupCount to parse email addresses.
We'll extract different parts of an email and demonstrate how to handle the
groups.

EmailParser.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailParser {
    
    public static void main(String[] args) {
        // Pattern to capture username, domain, and TLD separately
        String regex = "(\\w+)@([\\w.]+)\\.([a-z]{2,})";
        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher("user@example.com");
        
        System.out.println("Email pattern has " + matcher.groupCount() + 
            " capturing groups");
            
        if (matcher.matches()) {
            System.out.println("\nEmail components:");
            System.out.println("Full address: " + matcher.group(0));
            System.out.println("Username: " + matcher.group(1));
            System.out.println("Domain: " + matcher.group(2));
            System.out.println("TLD: " + matcher.group(3));
            
            System.out.println("\nAll groups:");
            for (int i = 0; i &lt;=  matcher.groupCount(); i++) {
                System.out.println("Group " + i + ": " + matcher.group(i));
            }
        }
    }
}

This pattern breaks down an email address into three parts: the username, domain,
and top-level domain (TLD). groupCount returns 3 for these
capturing groups. The example shows how to access each part individually and how
to iterate through all groups programmatically.

## Source

[Java Matcher.groupCount Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#groupCount--)

In this tutorial, we've explored the Matcher.groupCount method
in depth. We've seen how it works with different types of groups and in various
scenarios. Understanding this method is crucial for effective regex processing.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).