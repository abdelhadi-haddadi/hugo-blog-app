+++
title = "Java Matcher.appendTail Method"
date = 2025-08-29T20:00:10.832+01:00
draft = false
description = "Complete Java Matcher.appendTail method tutorial with examples. Learn how to use appendTail for regex operations in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Matcher.appendTail Method

Last modified: April 20, 2025

 

The appendTail method is part of Java's java.util.regex.Matcher
class. It appends the remaining input sequence to a StringBuffer after the last
match. This method is typically used with appendReplacement for
regex-based string manipulation.

When performing find-and-replace operations with regex, appendTail
ensures any text after the last match is included in the result. It completes
the transformation process started by appendReplacement calls.

## Matcher.appendTail Overview

The appendTail method has the signature:
public StringBuffer appendTail(StringBuffer sb). It appends the
remaining substring to the specified StringBuffer and returns the buffer.

This method is essential when using appendReplacement in a loop.
After processing all matches, appendTail adds any remaining text
that follows the last match. Without it, this text would be lost.

## Basic appendTail Usage

This example demonstrates the fundamental usage of appendTail with
appendReplacement. We'll replace all digits in a string with their
word equivalents while preserving the rest of the text.

AppendTailBasic.java
  

package com.zetcode;

import java.util.regex.*;

public class AppendTailBasic {

    public static void main(String[] args) {
        String input = "I have 3 apples and 5 oranges.";
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        
        StringBuffer sb = new StringBuffer();
        
        while (matcher.find()) {
            String numWord = convertToWord(matcher.group());
            matcher.appendReplacement(sb, numWord);
        }
        
        matcher.appendTail(sb);
        
        System.out.println("Original: " + input);
        System.out.println("Modified: " + sb.toString());
    }
    
    private static String convertToWord(String num) {
        switch(num) {
            case "3": return "three";
            case "5": return "five";
            default: return num;
        }
    }
}

In this example, we first find all digit sequences using matcher.find.
For each match, we convert the digit to its word form and use
appendReplacement. After the loop, appendTail adds
the remaining text (" oranges.") to the result.

The output shows the complete transformed string with all digits replaced and
the remaining text preserved. Without appendTail, the final part
of the string would be missing.

## Multiple Replacement with appendTail

This example shows how to perform multiple replacements in a text while
maintaining the original structure. We'll replace both dates and currency
values in a financial statement.

MultipleReplacements.java
  

package com.zetcode;

import java.util.regex.*;

public class MultipleReplacements {

    public static void main(String[] args) {
        String statement = "Date: 12/31/2023, Amount: $1,250.75\n" +
                          "Date: 01/15/2024, Amount: $950.50";
                          
        Pattern datePattern = Pattern.compile("\\d{2}/\\d{2}/\\d{4}");
        Pattern amountPattern = Pattern.compile("\\$\\d{1,3}(,\\d{3})*\\.\\d{2}");
        
        Matcher matcher = datePattern.matcher(statement);
        StringBuffer sb = new StringBuffer();
        
        // Replace dates first
        while (matcher.find()) {
            String newDate = formatDate(matcher.group());
            matcher.appendReplacement(sb, newDate);
        }
        matcher.appendTail(sb);
        
        // Now replace amounts in the modified string
        String intermediate = sb.toString();
        matcher = amountPattern.matcher(intermediate);
        sb = new StringBuffer();
        
        while (matcher.find()) {
            String newAmount = formatAmount(matcher.group());
            matcher.appendReplacement(sb, newAmount);
        }
        matcher.appendTail(sb);
        
        System.out.println("Original:\n" + statement);
        System.out.println("\nModified:\n" + sb.toString());
    }
    
    private static String formatDate(String date) {
        return date.replaceAll("(\\d{2})/(\\d{2})/(\\d{4})", "$2-$1-$3");
    }
    
    private static String formatAmount(String amount) {
        return amount.replace("$", "").replace(",", "") + " USD";
    }
}

This example performs two sequential replacement operations. First, it reformats
dates from MM/DD/YYYY to DD-MM-YYYY. Then it converts currency amounts from
$1,250.75 format to 1250.75 USD format.

After each replacement pass, appendTail ensures all remaining text
is preserved. The intermediate results are stored and used as input for the next
replacement operation.

## appendTail with Partial Replacement

Sometimes we want to replace only some matches while leaving others unchanged.
This example demonstrates selective replacement while still using
appendTail to maintain the complete output.

SelectiveReplacement.java
  

package com.zetcode;

import java.util.regex.*;

public class SelectiveReplacement {

    public static void main(String[] args) {
        String text = "The colors are red, blue, green, and yellow. " +
                     "I prefer red and blue over green and yellow.";
                     
        Pattern colorPattern = Pattern.compile("red|blue|green|yellow");
        Matcher matcher = colorPattern.matcher(text);
        
        StringBuffer sb = new StringBuffer();
        
        while (matcher.find()) {
            String color = matcher.group();
            // Only replace 'red' and 'blue' with their French equivalents
            if (color.equals("red") || color.equals("blue")) {
                String replacement = color.equals("red") ? "rouge" : "bleu";
                matcher.appendReplacement(sb, replacement);
            }
        }
        
        matcher.appendTail(sb);
        
        System.out.println("Original: " + text);
        System.out.println("Modified: " + sb.toString());
    }
}

In this example, we only replace "red" and "blue" with their French equivalents
while leaving "green" and "yellow" unchanged. The appendTail call
ensures all text after the last match (whether replaced or not) is included.

This demonstrates how appendTail works even when not all matches
are replaced. The method simply appends any remaining text after the last match
position, regardless of whether replacements occurred.

## HTML Tag Processing with appendTail

This example shows how to use appendTail when processing HTML
content. We'll remove all HTML tags while preserving the text content.

HtmlTagRemoval.java
  

package com.zetcode;

import java.util.regex.*;

public class HtmlTagRemoval {

    public static void main(String[] args) {
        String html = "&lt;html&gt;&lt;body&gt;&lt;h1&gt;Title&lt;/h1&gt;" +
                     "&lt;p&gt;Paragraph with &lt;b&gt;bold&lt;/b&gt; text.&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;";
                     
        Pattern tagPattern = Pattern.compile("&lt;[^&gt;]+&gt;");
        Matcher matcher = tagPattern.matcher(html);
        
        StringBuffer sb = new StringBuffer();
        
        while (matcher.find()) {
            // Replace each tag with empty string
            matcher.appendReplacement(sb, "");
        }
        
        matcher.appendTail(sb);
        
        System.out.println("Original HTML:\n" + html);
        System.out.println("\nText content:\n" + sb.toString());
    }
}

This code removes all HTML tags from a string while preserving the text content.
The regex pattern matches any text between angle brackets. Each match is replaced
with an empty string.

The appendTail call ensures any text after the last HTML tag is
included in the result. This is crucial as HTML content often has text after
the final closing tag.

## appendTail with Custom Transformations

This example demonstrates using appendTail with complex
transformations. We'll convert a markdown-like syntax to HTML, showing how
appendTail handles the complete transformation.

MarkdownToHtml.java
  

package com.zetcode;

import java.util.regex.*;

public class MarkdownToHtml {

    public static void main(String[] args) {
        String markdown = "# Heading\n" +
                         "This is *italic* and this is **bold**.\n" +
                         "Visit [ZetCode](https://zetcode.com).";
                         
        // Process headings
        Pattern headingPattern = Pattern.compile("^# (.*)$", Pattern.MULTILINE);
        Matcher matcher = headingPattern.matcher(markdown);
        StringBuffer sb = new StringBuffer();
        
        while (matcher.find()) {
            matcher.appendReplacement(sb, "&lt;h1&gt;" + matcher.group(1) + "&lt;/h1&gt;");
        }
        matcher.appendTail(sb);
        String step1 = sb.toString();
        
        // Process italics and bold
        sb = new StringBuffer();
        Pattern emphasisPattern = Pattern.compile("\\*(\\*?)(.*?)\\1\\*");
        matcher = emphasisPattern.matcher(step1);
        
        while (matcher.find()) {
            String tag = matcher.group(1).isEmpty() ? "em" : "strong";
            matcher.appendReplacement(sb, "&lt;" + tag + "&gt;" + matcher.group(2) + 
                     "&lt;/" + tag + "&gt;");
        }
        matcher.appendTail(sb);
        String step2 = sb.toString();
        
        // Process links
        sb = new StringBuffer();
        Pattern linkPattern = Pattern.compile("\\[(.*?)\\]\\((.*?)\\)");
        matcher = linkPattern.matcher(step2);
        
        while (matcher.find()) {
            matcher.appendReplacement(sb, "&lt;a href=\"" + matcher.group(2) + 
                     "\"&gt;" + matcher.group(1) + "&lt;/a&gt;");
        }
        matcher.appendTail(sb);
        
        System.out.println("Original Markdown:\n" + markdown);
        System.out.println("\nConverted HTML:\n" + sb.toString());
    }
}

This example performs multiple transformations in sequence: converting headings,
emphasis (italic and bold), and links from markdown-like syntax to HTML. Each
transformation uses appendReplacement and appendTail.

The intermediate results are passed between transformations, with
appendTail ensuring no content is lost between steps. This
demonstrates how to build complex text processors using these methods.

## appendTail in Template Processing

This example shows how appendTail can be used in template
processing. We'll replace placeholders in a template with actual values while
preserving the template structure.

TemplateProcessor.java
  

package com.zetcode;

import java.util.regex.*;
import java.util.*;

public class TemplateProcessor {

    public static void main(String[] args) {
        String template = "Dear {{customer}},\n\n" +
                         "Your order #{{orderId}} for {{product}} has shipped.\n" +
                         "Expected delivery date: {{deliveryDate}}.\n\n" +
                         "Thank you for shopping with us!";
                         
        Map&lt;String, String&gt; values = new HashMap&lt;&gt;();
        values.put("customer", "John Smith");
        values.put("orderId", "12345");
        values.put("product", "Java Programming Book");
        values.put("deliveryDate", "April 25, 2025");
        
        Pattern placeholderPattern = Pattern.compile("\\{\\{(.*?)\\}\\}");
        Matcher matcher = placeholderPattern.matcher(template);
        
        StringBuffer sb = new StringBuffer();
        
        while (matcher.find()) {
            String key = matcher.group(1);
            String replacement = values.getOrDefault(key, "{{" + key + "}}");
            matcher.appendReplacement(sb, replacement);
        }
        
        matcher.appendTail(sb);
        
        System.out.println("Processed Template:\n" + sb.toString());
    }
}

This code processes a template with placeholders in {{key}} format.
Each placeholder is replaced with its corresponding value from a map. If a key
isn't found, the placeholder remains unchanged.

The appendTail call ensures all template text after the last
placeholder is included in the output. This is essential for maintaining the
complete message structure, including closing text and formatting.

## appendTail Performance Considerations

This example demonstrates the performance implications of using
appendTail versus alternative approaches. We'll compare string
building techniques for large text processing.

PerformanceComparison.java
  

package com.zetcode;

import java.util.regex.*;

public class PerformanceComparison {

    public static void main(String[] args) {
        // Generate a large string with many numbers
        StringBuilder bigText = new StringBuilder();
        for (int i = 0; i &lt; 10000; i++) {
            bigText.append("Number ").append(i).append(", ");
        }
        String input = bigText.toString();
        
        // Method 1: Using appendReplacement/appendTail
        long start1 = System.currentTimeMillis();
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(input);
        StringBuffer sb1 = new StringBuffer();
        
        while (matcher.find()) {
            String replacement = "NUM" + matcher.group();
            matcher.appendReplacement(sb1, replacement);
        }
        matcher.appendTail(sb1);
        long end1 = System.currentTimeMillis();
        
        // Method 2: Using replaceAll
        long start2 = System.currentTimeMillis();
        String result2 = input.replaceAll("\\d+", "NUM$0");
        long end2 = System.currentTimeMillis();
        
        System.out.println("appendReplacement/appendTail time: " + (end1 - start1) + " ms");
        System.out.println("replaceAll time: " + (end2 - start2) + " ms");
        System.out.println("\nFirst 100 chars of appendTail result:\n" + sb1.substring(0, Math.min(100, sb1.length())));
        System.out.println("\nFirst 100 chars of replaceAll result:\n" + result2.substring(0, Math.min(100, result2.length())));
    }
}

This example compares the performance of using appendReplacement 
and appendTail versus replaceAll for a large input 
string. The input contains many numbers that we prefix with "NUM". The 
appendTail approach allows for custom processing of each match but 
may be slower than replaceAll for simple replacements.

The timing results show the trade-offs between flexibility and performance. 
appendReplacement with appendTail is more versatile 
for complex transformations, while replaceAll is optimized for 
straightforward replacements. Developers should choose based on their specific 
needs.

## Source

[Java Matcher.appendTail Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Matcher.html#appendTail-java.lang.StringBuffer-)

In this article, we've explored the Matcher.appendTail method in 
depth with practical examples. This method, paired with 
appendReplacement, enables powerful regex-based text manipulation 
in Java, from simple replacements to complex template processing.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of 
experience in the field. I began writing programming articles in 2007 and have 
since authored over 1,400 articles and eight e-books. With more than eight 
years of teaching experience, I am committed to sharing my knowledge and 
helping others master programming concepts.

List [all Java tutorials](/java/).