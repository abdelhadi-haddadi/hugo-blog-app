+++
title = "Java String.replaceFirst Method"
date = 2025-08-29T20:00:26.642+01:00
draft = false
description = "Complete Java String.replaceFirst method tutorial with examples. Learn how to replace first regex match in Java strings."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java String.replaceFirst Method

Last modified: April 20, 2025

 

The String.replaceFirst method replaces the first substring of a
string that matches the given regular expression with the specified replacement.
It is part of Java's String class and provides regex-based string manipulation.

This method is useful when you need to modify only the first occurrence of a
pattern in a string. It returns a new string with the replacement applied. The
original string remains unchanged as strings are immutable in Java.

## Method Signature

The method has two variants. The basic version takes a regex pattern and
replacement string. The second version accepts regex flags for case-insensitive
matching and other options.

public String replaceFirst(String regex, String replacement)

public String replaceFirst(String regex, String replacement, int flags)

## Basic replaceFirst Example

This example demonstrates the simplest usage of replaceFirst. We
replace the first occurrence of a word in a sentence. The method returns a new
string with the replacement applied.

ReplaceFirstBasic.java
  

package com.zetcode; 

public class ReplaceFirstBasic {

    public static void main(String[] args) {
        String text = "The quick brown fox jumps over the lazy dog";
        String result = text.replaceFirst("the", "a");
        
        System.out.println("Original: " + text);
        System.out.println("Modified: " + result);
    }
}

In this example, we replace the first occurrence of "the" with "a". Note that
the replacement is case-sensitive. The original string remains unchanged while
a new modified string is returned.

## Case-Insensitive Replacement

This example shows how to perform case-insensitive replacement using regex
flags. We use Pattern.CASE_INSENSITIVE to match regardless of case.

ReplaceFirstCaseInsensitive.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class ReplaceFirstCaseInsensitive {

    public static void main(String[] args) {
        String text = "The quick brown fox jumps over the lazy dog";
        String result = text.replaceFirst("(?i)the", "a");
        
        System.out.println("Original: " + text);
        System.out.println("Modified: " + result);
    }
}

We use the (?i) regex flag to enable case-insensitive matching. This
makes the pattern match "The" at the start of the string. Without this flag, it
would only match lowercase "the".

## Replacing Digits

This example demonstrates replacing the first sequence of digits in a string.
We use the \d+ regex pattern to match one or more digits.

ReplaceFirstDigits.java
  

package com.zetcode; 

public class ReplaceFirstDigits {

    public static void main(String[] args) {
        String text = "Order 12345 with price 67.89 USD";
        String result = text.replaceFirst("\\d+", "XXXXX");
        
        System.out.println("Original: " + text);
        System.out.println("Modified: " + result);
    }
}

The pattern \\d+ matches the first sequence of digits (12345) and
replaces it with "XXXXX". Note that we need to escape the backslash in Java
strings, so \d becomes \\d.

## Using Capturing Groups

This example shows how to use capturing groups in the replacement string. We can
reference matched groups using $n notation in the replacement.

ReplaceFirstGroups.java
  

package com.zetcode; 

public class ReplaceFirstGroups {

    public static void main(String[] args) {
        String text = "John Doe, age 30";
        String result = text.replaceFirst("(\\w+) (\\w+), age (\\d+)", 
            "Last: $2, First: $1, Years: $3");
        
        System.out.println("Original: " + text);
        System.out.println("Modified: " + result);
    }
}

The pattern captures three groups: first name, last name, and age. In the
replacement string, we rearrange these groups with descriptive labels. $1
refers to the first group, $2 to the second, and so on.

## Replacing Special Characters

This example demonstrates replacing special regex characters. We need to escape
them properly or use Pattern.quote for literal matching.

ReplaceFirstSpecialChars.java
  

package com.zetcode;

import java.util.regex.Pattern;

public class ReplaceFirstSpecialChars {

    public static void main(String[] args) {
        String text = "Calculate 3 + 5 * 2";
        
        // Using escaped characters
        String result1 = text.replaceFirst("\\+", "plus");
        System.out.println("Escaped: " + result1);
        
        // Using Pattern.quote
        String result2 = text.replaceFirst(Pattern.quote("*"), "times");
        System.out.println("Quoted: " + result2);
    }
}

The plus sign and asterisk are regex metacharacters. We either escape them with
backslashes or use Pattern.quote to treat them as literals. Both
methods safely replace the first occurrence of these special characters.

## Replacing with Function

Java 9+ allows using a function to determine the replacement. This provides
dynamic replacement based on the matched content.

ReplaceFirstFunction.java
  

package com.zetcode;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ReplaceFirstFunction {

    public static void main(String[] args) {
        String text = "Prices: $10, $20, $30";
        Pattern pattern = Pattern.compile("\\$\\d+");
        
        String result = pattern.matcher(text)
            .replaceFirst(m -&gt; "USD " + m.group().substring(1));
            
        System.out.println("Original: " + text);
        System.out.println("Modified: " + result);
    }
}

We use a lambda function that receives the match and returns the replacement
string. In this case, we transform "$10" into "USD 10". This approach provides
flexible replacement logic based on the matched content.

## Replacing in Multiline Text

This example shows how to replace the first match in multiline text. We use the
Pattern.MULTILINE flag to make ^ and $
match line boundaries.

ReplaceFirstMultiline.java
  

package com.zetcode; 

import java.util.regex.Pattern;

public class ReplaceFirstMultiline {

    public static void main(String[] args) {
        String text = "First line\nSecond line\nThird line";
        String result = text.replaceFirst("(?m)^.*$", "---");
        
        System.out.println("Original:\n" + text);
        System.out.println("Modified:\n" + result);
    }
}

The (?m) flag enables multiline mode. The pattern ^.*$
matches entire lines. The replacement replaces only the first line with "---".
Without the flag, the pattern would match the entire string.

## Source

[Java String.replaceFirst Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#replaceFirst(java.lang.String,%20java.lang.String))

In this article, we've explored various uses of the String.replaceFirst
method. From basic replacements to advanced regex features, this method provides
powerful string manipulation capabilities.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).