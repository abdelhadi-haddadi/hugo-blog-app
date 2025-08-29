+++
title = "Java FilterWriter Class"
date = 2025-08-29T19:59:18.651+01:00
draft = false
description = "Complete Java FilterWriter class tutorial covering all methods with examples. Learn about filtered output operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FilterWriter Class

Last modified: April 16, 2025

 

The java.io.FilterWriter class is an abstract class for writing
filtered character streams. It serves as a base class for custom writer
implementations that transform or filter data before writing. The class itself
simply overrides all Writer methods with versions that pass requests to the
contained writer.

FilterWriter extends Writer and requires a
Writer object to function. Subclasses should override some methods
to add filtering behavior. Unlike its input counterpart FilterReader, this class
is not commonly used directly in applications.

## FilterWriter Class Overview

FilterWriter provides a framework for filtering character output
streams. The class itself doesn't perform any filtering - subclasses must
implement the actual filtering logic. All methods delegate to the underlying
writer.

public abstract class FilterWriter extends Writer {
    protected Writer out;
    protected FilterWriter(Writer out);
    public void write(int c) throws IOException;
    public void write(char[] cbuf, int off, int len) throws IOException;
    public void write(String str, int off, int len) throws IOException;
    public void flush() throws IOException;
    public void close() throws IOException;
}

The code above shows the structure of FilterWriter. The protected
out field holds the underlying writer. All write operations are
forwarded to this writer unless overridden by subclasses.

## Creating a Custom FilterWriter

To create a useful FilterWriter, you must extend it and override methods to add
filtering behavior. This example creates a simple uppercase converter that
transforms all written characters to uppercase before passing them to the
underlying writer.

Main.java
  

import java.io.FilterWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

class UppercaseFilterWriter extends FilterWriter {
    
    public UppercaseFilterWriter(Writer out) {
        super(out);
    }
    
    @Override
    public void write(int c) throws IOException {
        super.write(Character.toUpperCase(c));
    }
    
    @Override
    public void write(char[] cbuf, int off, int len) throws IOException {
        char[] upperChars = new char[len];
        for (int i = 0; i &lt; len; i++) {
            upperChars[i] = Character.toUpperCase(cbuf[off + i]);
        }
        super.write(upperChars, 0, len);
    }
    
    @Override
    public void write(String str, int off, int len) throws IOException {
        write(str.toCharArray(), off, len);
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        StringWriter sw = new StringWriter();
        UppercaseFilterWriter filter = new UppercaseFilterWriter(sw);
        
        filter.write("Hello, FilterWriter!");
        filter.close();
        
        System.out.println("Filtered output: " + sw.toString());
    }
}

This example demonstrates a custom FilterWriter implementation. The
UppercaseFilterWriter converts all characters to uppercase before
writing. The StringWriter captures the output. All three write
methods are overridden to ensure consistent behavior.

## FilterWriter with Character Replacement

This example creates a FilterWriter that replaces specific characters in the
output stream. The replacement happens before writing to the underlying writer.
This is useful for sanitizing output or implementing simple ciphers.

Main.java
  

import java.io.FilterWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

class ReplaceFilterWriter extends FilterWriter {
    private final char target;
    private final char replacement;
    
    public ReplaceFilterWriter(Writer out, char target, char replacement) {
        super(out);
        this.target = target;
        this.replacement = replacement;
    }
    
    @Override
    public void write(int c) throws IOException {
        super.write(c == target ? replacement : c);
    }
    
    @Override
    public void write(char[] cbuf, int off, int len) throws IOException {
        char[] filtered = new char[len];
        for (int i = 0; i &lt; len; i++) {
            filtered[i] = (cbuf[off + i] == target) ? replacement : cbuf[off + i];
        }
        super.write(filtered, 0, len);
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        StringWriter sw = new StringWriter();
        ReplaceFilterWriter filter = new ReplaceFilterWriter(sw, 'e', '3');
        
        filter.write("Replace all 'e' characters with '3'");
        filter.close();
        
        System.out.println("Filtered output: " + sw.toString());
    }
}

The ReplaceFilterWriter replaces all occurrences of a target
character with a replacement character. The constructor takes the target and
replacement characters. Both single-character and array write methods are
overridden to perform the replacement. The example replaces all 'e' characters
with '3'.

## FilterWriter with HTML Escaping

This example implements a FilterWriter that escapes HTML special characters. This
is useful when writing text that will be displayed in HTML to prevent XSS attacks
or ensure proper rendering.

Main.java
  

import java.io.FilterWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

class HtmlEscapeFilterWriter extends FilterWriter {
    
    public HtmlEscapeFilterWriter(Writer out) {
        super(out);
    }
    
    @Override
    public void write(int c) throws IOException {
        switch (c) {
            case '&amp;':  super.write("&amp;"); break;
            case '&lt;':  super.write("&lt;"); break;
            case '&gt;':  super.write("&gt;"); break;
            case '"': super.write("""); break;
            case '\'': super.write("'"); break;
            default:   super.write(c); break;
        }
    }
    
    @Override
    public void write(char[] cbuf, int off, int len) throws IOException {
        for (int i = 0; i &lt; len; i++) {
            write(cbuf[off + i]);
        }
    }
    
    @Override
    public void write(String str, int off, int len) throws IOException {
        write(str.toCharArray(), off, len);
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        StringWriter sw = new StringWriter();
        HtmlEscapeFilterWriter filter = new HtmlEscapeFilterWriter(sw);
        
        filter.write("alert('XSS')");
        filter.close();
        
        System.out.println("Escaped HTML: " + sw.toString());
    }
}

The HtmlEscapeFilterWriter converts special HTML characters to
their entity equivalents. The single-character write method handles the
conversion, while the array and string methods delegate to it. This ensures all
output is properly escaped regardless of which write method is called.

## Counting Characters with FilterWriter

This example creates a FilterWriter that counts the number of characters written.
The count can be retrieved at any time, useful for logging or monitoring
purposes.

Main.java
  

import java.io.FilterWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

class CountingFilterWriter extends FilterWriter {
    private int count = 0;
    
    public CountingFilterWriter(Writer out) {
        super(out);
    }
    
    public int getCount() {
        return count;
    }
    
    @Override
    public void write(int c) throws IOException {
        count++;
        super.write(c);
    }
    
    @Override
    public void write(char[] cbuf, int off, int len) throws IOException {
        count += len;
        super.write(cbuf, off, len);
    }
    
    @Override
    public void write(String str, int off, int len) throws IOException {
        count += len;
        super.write(str, off, len);
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        StringWriter sw = new StringWriter();
        CountingFilterWriter filter = new CountingFilterWriter(sw);
        
        filter.write("Hello");
        filter.write(", ");
        filter.write("world!".toCharArray());
        filter.close();
        
        System.out.println("Output: " + sw.toString());
        System.out.println("Characters written: " + filter.getCount());
    }
}

The CountingFilterWriter maintains a count of all characters written
through it. Each write method increments the counter appropriately. The count can
be retrieved using the getCount method. This example writes three
segments and reports the total character count.

## FilterWriter with Line Numbering

This example implements a FilterWriter that adds line numbers to the output. Each
new line is prefixed with its line number, useful for creating numbered listings
or logs.

Main.java
  

import java.io.FilterWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

class LineNumberingFilterWriter extends FilterWriter {
    private int lineNumber = 1;
    private boolean atStartOfLine = true;
    
    public LineNumberingFilterWriter(Writer out) {
        super(out);
    }
    
    @Override
    public void write(int c) throws IOException {
        if (atStartOfLine) {
            super.write(String.format("%3d: ", lineNumber++));
            atStartOfLine = false;
        }
        super.write(c);
        if (c == '\n') {
            atStartOfLine = true;
        }
    }
    
    @Override
    public void write(char[] cbuf, int off, int len) throws IOException {
        for (int i = 0; i &lt; len; i++) {
            write(cbuf[off + i]);
        }
    }
    
    @Override
    public void write(String str, int off, int len) throws IOException {
        write(str.toCharArray(), off, len);
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        StringWriter sw = new StringWriter();
        LineNumberingFilterWriter filter = new LineNumberingFilterWriter(sw);
        
        filter.write("First line\nSecond line\nThird line");
        filter.close();
        
        System.out.println("Numbered output:\n" + sw.toString());
    }
}

The LineNumberingFilterWriter adds line numbers to each new line.
It tracks when it's at the start of a line and inserts the line number prefix.
The line number increments after each newline character. All write methods
delegate to the single-character version to maintain consistent behavior.

## FilterWriter with Indentation

This example creates a FilterWriter that maintains indentation levels. Each new
line starts with a number of tabs corresponding to the current indentation level,
useful for code generation or structured output.

Main.java
  

import java.io.FilterWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

class IndentingFilterWriter extends FilterWriter {
    private int indentLevel = 0;
    private boolean atStartOfLine = true;
    
    public IndentingFilterWriter(Writer out) {
        super(out);
    }
    
    public void increaseIndent() {
        indentLevel++;
    }
    
    public void decreaseIndent() {
        if (indentLevel &gt; 0) {
            indentLevel--;
        }
    }
    
    @Override
    public void write(int c) throws IOException {
        if (atStartOfLine &amp;&amp; c != '\n') {
            for (int i = 0; i &lt; indentLevel; i++) {
                super.write('\t');
            }
            atStartOfLine = false;
        }
        super.write(c);
        if (c == '\n') {
            atStartOfLine = true;
        }
    }
    
    @Override
    public void write(char[] cbuf, int off, int len) throws IOException {
        for (int i = 0; i &lt; len; i++) {
            write(cbuf[off + i]);
        }
    }
    
    @Override
    public void write(String str, int off, int len) throws IOException {
        write(str.toCharArray(), off, len);
    }
}

public class Main {
    public static void main(String[] args) throws IOException {
        StringWriter sw = new StringWriter();
        IndentingFilterWriter filter = new IndentingFilterWriter(sw);
        
        filter.write("First line\n");
        filter.increaseIndent();
        filter.write("Indented line\n");
        filter.increaseIndent();
        filter.write("More indented\n");
        filter.decreaseIndent();
        filter.write("Less indented\n");
        filter.close();
        
        System.out.println("Indented output:\n" + sw.toString());
    }
}

The IndentingFilterWriter maintains indentation levels for new
lines. The increaseIndent and decreaseIndent methods
adjust the current level. Each new line starts with the appropriate number of
tabs. The writer tracks line starts to only insert indentation when needed.

## Source

[Java FilterWriter Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FilterWriter.html)

In this article, we've covered the essential methods and features of the Java
FilterWriter class. Understanding these concepts is crucial for creating custom
output filters in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).