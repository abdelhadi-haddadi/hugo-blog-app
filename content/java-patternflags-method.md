+++
title = "Java Pattern.flags Method"
date = 2025-08-29T20:00:22.114+01:00
draft = false
description = "Complete Java Pattern.flags method tutorial with examples. Learn about regex flags in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Pattern.flags Method

Last modified: April 20, 2025

 

The Pattern.flags method returns the match flags specified when
the Pattern was compiled. These flags modify how the regular expression pattern
is interpreted during matching operations.

Flags can be combined using bitwise OR operations to enable multiple behaviors
simultaneously. The method returns an integer representing the bitmask of all
enabled flags for the Pattern instance.

## Pattern Flags Overview

Java's Pattern class provides several flags that alter regex matching behavior.
Common flags include CASE_INSENSITIVE, MULTILINE, and
DOTALL. Each flag is represented by a constant integer value in the
Pattern class.

The flags method is useful when you need to inspect which flags are
active on a compiled Pattern object. This can help with debugging or when
creating new Pattern instances with similar settings.

## Basic flags Method Usage

This example demonstrates the basic usage of the flags method to
retrieve the flags from a compiled Pattern. We'll create patterns with different
flag combinations and examine their values.

PatternFlagsBasic.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternFlagsBasic {

    public static void main(String[] args) {
        
        // Pattern with no flags
        Pattern noFlags = Pattern.compile("abc");
        System.out.println("No flags: " + noFlags.flags());
        
        // Pattern with CASE_INSENSITIVE flag
        Pattern caseInsensitive = Pattern.compile("abc", Pattern.CASE_INSENSITIVE);
        System.out.println("CASE_INSENSITIVE: " + caseInsensitive.flags());
        
        // Pattern with multiple flags
        Pattern multiFlags = Pattern.compile("abc", 
            Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
        System.out.println("Multiple flags: " + multiFlags.flags());
    }
}

In this example, we create three Pattern instances with different flag
combinations. The flags method returns an integer representing the
bitmask of all enabled flags for each Pattern.

The output will show the numeric values of the flag combinations. These values
can be compared with the Pattern class constants to determine which flags are set.

## Checking Individual Flags

This example shows how to check for specific flags using the flags() method
return value. We'll use bitwise operations to test which flags are enabled.

PatternCheckFlags.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternCheckFlags {

    public static void main(String[] args) {
        
        Pattern pattern = Pattern.compile("^[a-z]+$", 
            Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
        
        int flags = pattern.flags();
        
        System.out.println("All flags: " + flags);
        System.out.println("CASE_INSENSITIVE enabled: " + 
            ((flags &amp; Pattern.CASE_INSENSITIVE) != 0));
        System.out.println("MULTILINE enabled: " + 
            ((flags &amp; Pattern.MULTILINE) != 0));
        System.out.println("DOTALL enabled: " + 
            ((flags &amp; Pattern.DOTALL) != 0));
        System.out.println("UNICODE_CASE enabled: " + 
            ((flags &amp; Pattern.UNICODE_CASE) != 0));
    }
}

Here we create a Pattern with CASE_INSENSITIVE and MULTILINE flags. We then
use bitwise AND operations to check which individual flags are set in the
returned flags value.

The output demonstrates how to verify the presence of specific flags in the
Pattern's configuration. This technique is useful for conditional logic based
on Pattern settings.

## Reconstructing Pattern with Same Flags

This example shows how to use the flags method to create a new
Pattern with the same flags as an existing one. This is useful when you need to
modify a regex but keep the same matching behavior.

PatternReuseFlags.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternReuseFlags {

    public static void main(String[] args) {
        
        Pattern original = Pattern.compile("^start.*end$", 
            Pattern.CASE_INSENSITIVE | Pattern.DOTALL);
        
        // Get flags from original pattern
        int flags = original.flags();
        
        // Create new pattern with same flags but different regex
        Pattern modified = Pattern.compile("^begin.*finish$", flags);
        
        System.out.println("Original flags: " + original.flags());
        System.out.println("Modified flags: " + modified.flags());
        
        // Verify both patterns have same flags
        System.out.println("Flags match: " + 
            (original.flags() == modified.flags()));
    }
}

In this example, we first create a Pattern with specific flags. We
then extract those flags and use them to create a new Pattern with
a different regular expression but the same matching behavior.

This technique ensures consistent matching behavior across different patterns
when flag settings need to be preserved.

## Flags with Pattern.quote

This example demonstrates how flags interact with Pattern.quote.
The flags method will return 0 for patterns created with
quote since no special matching behavior is applied to literal
quoted strings.

PatternQuoteFlags.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternQuoteFlags {

    public static void main(String[] args) {
        
        String regex = "[a-z]+";
        Pattern normalPattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
        
        // Create quoted pattern
        Pattern quotedPattern = Pattern.compile(Pattern.quote(regex));
        
        System.out.println("Normal pattern flags: " + normalPattern.flags());
        System.out.println("Quoted pattern flags: " + quotedPattern.flags());
        
        // Attempt to add flags to quoted pattern
        Pattern quotedWithFlags = Pattern.compile(Pattern.quote(regex), 
            Pattern.CASE_INSENSITIVE);
        
        System.out.println("Quoted with flags: " + quotedWithFlags.flags());
    }
}

This example shows that Pattern.quote creates patterns with no
flags by default. Even when flags are specified, they have no effect on the
matching behavior of quoted patterns since they match literally.

The output demonstrates that quoted patterns maintain their flags
return value regardless of any flags specified during compilation.

## Flags and Pattern.split

This example examines how flags affect the Pattern.split method.
We'll see how different flags change the splitting behavior and how to inspect
those flags.

PatternSplitFlags.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class PatternSplitFlags {

    public static void main(String[] args) {
        
        String input = "Apple\nBanana\nCherry";
        String regex = "^";
        
        // Split with MULTILINE flag
        Pattern multiline = Pattern.compile(regex, Pattern.MULTILINE);
        String[] multilineResult = multiline.split(input);
        System.out.println("Multiline split count: " + multilineResult.length);
        System.out.println("Multiline flags: " + multiline.flags());
        
        // Split without MULTILINE flag
        Pattern normal = Pattern.compile(regex);
        String[] normalResult = normal.split(input);
        System.out.println("Normal split count: " + normalResult.length);
        System.out.println("Normal flags: " + normal.flags());
    }
}

In this example, we demonstrate how the MULTILINE flag affects the
split operation. With MULTILINE, the ^ anchor matches at the start
of each line, creating more splits than without the flag.

The flags method helps verify which flags are active on each
Pattern instance, explaining their different splitting behaviors.

## Flags Inheritance in Pattern.matcher

This example shows that Matcher instances inherit their flags from
the Pattern that created them. The flags method helps confirm this
inheritance.

PatternMatcherFlags.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PatternMatcherFlags {

    public static void main(String[] args) {
        
        Pattern pattern = Pattern.compile("^[a-z]+$", 
            Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
        
        Matcher matcher = pattern.matcher("Test");
        
        // Verify matcher uses pattern's flags
        System.out.println("Pattern flags: " + pattern.flags());
        System.out.println("Does 'Test' match? " + matcher.matches());
        
        // Change would require new Pattern with different flags
        Pattern noFlags = Pattern.compile("^[a-z]+$");
        Matcher strictMatcher = noFlags.matcher("Test");
        System.out.println("No flags pattern: " + noFlags.flags());
        System.out.println("Does 'Test' match now? " + strictMatcher.matches());
    }
}

This example demonstrates that Matcher instances cannot modify the
flags of their parent Pattern. The flags method confirms that any
flag changes require creating a new Pattern instance.

The output shows how different flag settings affect matching behavior and how
the flags method can help debug these differences.

## Source

[Java Pattern.flags Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html#flags--)

In this article, we've explored the Pattern.flags method in depth,
showing how to use it to inspect and work with regular expression flags in Java.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).