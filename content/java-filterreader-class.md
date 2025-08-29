+++
title = "Java FilterReader Class"
date = 2025-08-29T19:59:18.681+01:00
draft = false
description = "Complete Java FilterReader class tutorial covering all methods with examples. Learn about filtered character stream operations in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FilterReader Class

Last modified: April 16, 2025

 

The java.io.FilterReader class is an abstract base class for
filtering character streams. It wraps another Reader and transforms the data
as it's being read. This class serves as a superclass for custom filtered
readers.

FilterReader extends Reader and follows the decorator
pattern. It delegates all operations to the underlying Reader. Subclasses can
override methods to modify the data stream. The class itself is abstract and
must be subclassed.

## FilterReader Class Overview

FilterReader provides a base for creating filtered character streams.
Key methods include read operations, mark/reset functionality, and stream
skipping. The class maintains a reference to the underlying Reader.

public abstract class FilterReader extends Reader {
    protected Reader in;
    protected FilterReader(Reader in);
    public int read();
    public int read(char[] cbuf, int off, int len);
    public long skip(long n);
    public boolean ready();
    public boolean markSupported();
    public void mark(int readAheadLimit);
    public void reset();
    public void close();
}

The code above shows key methods provided by FilterReader. These
methods allow for filtered reading of character data. The protected 'in' field
holds the underlying Reader. All operations delegate to this underlying stream.

## Creating a Custom FilterReader

To use FilterReader, you must create a subclass that implements specific
filtering behavior. The constructor requires a Reader to wrap. Override read
methods to implement filtering logic. Here's a basic uppercase converter.

Main.java
  

import java.io.FilterReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

class UpperCaseFilter extends FilterReader {
    public UpperCaseFilter(Reader in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        int c = super.read();
        return (c == -1) ? c : Character.toUpperCase(c);
    }

    @Override
    public int read(char[] cbuf, int off, int len) throws IOException {
        int n = super.read(cbuf, off, len);
        for (int i = off; i &lt; off + n; i++) {
            cbuf[i] = Character.toUpperCase(cbuf[i]);
        }
        return n;
    }
}

public class Main {
    public static void main(String[] args) {
        String data = "hello filter reader";
        try (Reader reader = new UpperCaseFilter(new StringReader(data))) {
            int c;
            while ((c = reader.read()) != -1) {
                System.out.print((char) c);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example creates a custom UpperCaseFilter that converts all characters to
uppercase. The filter overrides both single-character and array read methods.
The output will show "HELLO FILTER READER". The underlying StringReader provides
the original data.

## Creating a Line Number FilterReader

A common use of FilterReader is to add line numbers to text. This example shows
how to create a LineNumberFilter that prefixes each line with its number. The
filter maintains line count state.

Main.java
  

import java.io.FilterReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

class LineNumberFilter extends FilterReader {
    private int lineNumber = 1;
    private boolean atStart = true;

    public LineNumberFilter(Reader in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        int c = super.read();
        if (atStart) {
            System.out.print(lineNumber++ + ": ");
            atStart = false;
        }
        if (c == '\n') {
            atStart = true;
        }
        return c;
    }
}

public class Main {
    public static void main(String[] args) {
        String text = "First line\nSecond line\nThird line";
        try (Reader reader = new LineNumberFilter(new StringReader(text))) {
            int c;
            while ((c = reader.read()) != -1) {
                System.out.print((char) c);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

The LineNumberFilter prefixes each line with its number. It tracks line starts
using the 'atStart' flag. When a newline is encountered, it sets the flag for
the next line. The output numbers each line of the input text.

## Creating a Word Counting FilterReader

This example demonstrates a WordCountFilter that counts words as they're read.
The filter overrides the read methods to detect word boundaries. It provides a
getWordCount method to retrieve the count.

Main.java
  

import java.io.FilterReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

class WordCountFilter extends FilterReader {
    private int wordCount = 0;
    private boolean inWord = false;

    public WordCountFilter(Reader in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        int c = super.read();
        updateWordCount(c);
        return c;
    }

    @Override
    public int read(char[] cbuf, int off, int len) throws IOException {
        int n = super.read(cbuf, off, len);
        for (int i = off; i &lt; off + n; i++) {
            updateWordCount(cbuf[i]);
        }
        return n;
    }

    private void updateWordCount(int c) {
        if (Character.isWhitespace(c)) {
            if (inWord) {
                wordCount++;
                inWord = false;
            }
        } else {
            inWord = true;
        }
    }

    public int getWordCount() {
        if (inWord) {
            return wordCount + 1;
        }
        return wordCount;
    }
}

public class Main {
    public static void main(String[] args) {
        String text = "This is a test sentence for word counting.";
        try (WordCountFilter reader = new WordCountFilter(new StringReader(text))) {
            char[] buffer = new char[1024];
            while (reader.read(buffer) != -1) {
                // Just reading to count words
            }
            System.out.println("Word count: " + reader.getWordCount());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

The WordCountFilter counts words by detecting transitions between whitespace and
non-whitespace characters. The getWordCount method returns the final count. The
example outputs "Word count: 7" for the given input string.

## Creating a Comment FilterReader

This example shows a CommentFilter that removes Java-style comments from text.
It handles both single-line (//) and multi-line (/* */) comments. The filter
maintains state to track comment blocks.

Main.java
  

import java.io.FilterReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

class CommentFilter extends FilterReader {
    private boolean inLineComment = false;
    private boolean inBlockComment = false;
    private int prevChar = -1;

    public CommentFilter(Reader in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        int c = super.read();
        if (c == -1) return -1;

        if (inLineComment) {
            if (c == '\n') {
                inLineComment = false;
                return c;
            }
            return read(); // Skip comment content
        } else if (inBlockComment) {
            if (prevChar == '*' &amp;&amp; c == '/') {
                inBlockComment = false;
                prevChar = -1;
                return read(); // Skip the closing '/'
            }
            prevChar = c;
            return read(); // Skip comment content
        } else {
            if (prevChar == '/' &amp;&amp; c == '/') {
                inLineComment = true;
                prevChar = -1;
                return read(); // Skip both '/'
            } else if (prevChar == '/' &amp;&amp; c == '*') {
                inBlockComment = true;
                prevChar = -1;
                return read(); // Skip both '/' and '*'
            } else {
                int toReturn = prevChar;
                prevChar = c;
                return (toReturn == -1) ? read() : toReturn;
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        String code = "/* Comment */ public class Test {\n" +
                     "  // Single line\n" +
                     "  int x = 5;\n" +
                     "}";
        try (Reader reader = new CommentFilter(new StringReader(code))) {
            int c;
            while ((c = reader.read()) != -1) {
                System.out.print((char) c);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

The CommentFilter removes all Java-style comments from the input. It maintains
state to track comment blocks. The output shows only the actual code without
comments. This demonstrates complex state management in a FilterReader.

## Creating a Rot13 FilterReader

This example implements the ROT13 cipher, which rotates letters by 13 positions.
It's a simple encryption that works for both encryption and decryption. The
filter only transforms alphabetic characters.

Main.java
  

import java.io.FilterReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

class Rot13Filter extends FilterReader {
    public Rot13Filter(Reader in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        int c = super.read();
        if (c == -1) return -1;
        return rot13(c);
    }

    @Override
    public int read(char[] cbuf, int off, int len) throws IOException {
        int n = super.read(cbuf, off, len);
        for (int i = off; i &lt; off + n; i++) {
            cbuf[i] = (char) rot13(cbuf[i]);
        }
        return n;
    }

    private int rot13(int c) {
        if (c &gt;= 'a' &amp;&amp; c &lt;= 'z') {
            return 'a' + ((c - 'a' + 13) % 26);
        } else if (c &gt;= 'A' &amp;&amp; c &lt;= 'Z') {
            return 'A' + ((c - 'A' + 13) % 26);
        }
        return c;
    }
}

public class Main {
    public static void main(String[] args) {
        String secret = "Secret Message";
        try (Reader reader = new Rot13Filter(new StringReader(secret))) {
            char[] buffer = new char[1024];
            int n = reader.read(buffer);
            System.out.println("Encrypted: " + new String(buffer, 0, n));
            
            // Rot13 is its own inverse
            try (Reader reader2 = new Rot13Filter(new StringReader(buffer, 0, n))) {
                n = reader2.read(buffer);
                System.out.println("Decrypted: " + new String(buffer, 0, n));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

The Rot13Filter applies the ROT13 cipher to all alphabetic characters. Running
the filter twice returns the original text. The example shows both encryption
and decryption using the same filter. Non-alphabetic characters pass through
unchanged.

## Creating a Duplicate Line FilterReader

This final example creates a DuplicateLineFilter that removes consecutive
duplicate lines. It compares each line with the previous one and skips
duplicates. The filter maintains the previous line in memory.

Main.java
  

import java.io.FilterReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

class DuplicateLineFilter extends FilterReader {
    private StringBuilder currentLine = new StringBuilder();
    private String previousLine = null;
    private int posInLine = 0;

    public DuplicateLineFilter(Reader in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        while (true) {
            if (posInLine &lt; currentLine.length()) {
                return currentLine.charAt(posInLine++);
            }
            
            currentLine.setLength(0);
            posInLine = 0;
            
            int c;
            while ((c = super.read()) != -1 &amp;&amp; c != '\n') {
                currentLine.append((char) c);
            }
            if (c == '\n') {
                currentLine.append('\n');
            }
            
            String newLine = currentLine.toString();
            if (newLine.equals(previousLine)) {
                if (c == -1) return -1;
                continue; // Skip duplicate line
            }
            
            previousLine = newLine;
            if (currentLine.length() == 0 &amp;&amp; c == -1) {
                return -1;
            }
            return currentLine.charAt(posInLine++);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        String text = "line1\nline1\nline2\nline3\nline3\nline3\nline4";
        try (Reader reader = new DuplicateLineFilter(new StringReader(text))) {
            int c;
            while ((c = reader.read()) != -1) {
                System.out.print((char) c);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

The DuplicateLineFilter removes consecutive duplicate lines while preserving
the original line endings. It builds each line character by character and
compares it with the previous line. The output shows each unique line only
once, even if it appeared multiple times consecutively in the input.

## Source

[Java FilterReader Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/FilterReader.html)

In this article, we've covered the essential methods and features of the Java
FilterReader class. Understanding these concepts is crucial for working with
custom character stream processing in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).