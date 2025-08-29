+++
title = "Java StreamTokenizer Class"
date = 2025-08-29T19:59:32.167+01:00
draft = false
description = "Complete Java StreamTokenizer class tutorial covering all methods with examples. Learn about tokenizing streams in Java I/O."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java StreamTokenizer Class

Last modified: April 16, 2025

 

The java.io.StreamTokenizer class parses an input stream into tokens.
It can identify numbers, quoted strings, and various comment styles. This class
is useful for simple lexical analysis tasks.

StreamTokenizer breaks input into tokens that are either words,
numbers, strings, or special characters. It provides methods to configure what
should be considered whitespace, comments, or word characters. The class is not
thread-safe.

## StreamTokenizer Class Overview

StreamTokenizer takes an InputStream or Reader
as input. It categorizes tokens into types like TT_WORD,
TT_NUMBER, or TT_EOF. The class provides methods to
configure token recognition rules.

public class StreamTokenizer {
    public StreamTokenizer(InputStream in);
    public StreamTokenizer(Reader r);
    public void resetSyntax();
    public void wordChars(int low, int hi);
    public void whitespaceChars(int low, int hi);
    public void ordinaryChars(int low, int hi);
    public void ordinaryChar(int ch);
    public void commentChar(int ch);
    public void quoteChar(int ch);
    public void parseNumbers();
    public void eolIsSignificant(boolean flag);
    public void slashStarComments(boolean flag);
    public void slashSlashComments(boolean flag);
    public void lowerCaseMode(boolean fl);
    public int nextToken();
    public int ttype;
    public String sval;
    public double nval;
    public int lineno();
}

The code above shows key methods and fields of StreamTokenizer.
The nextToken method reads the next token. Token type is stored in
ttype, with string and numeric values in sval and
nval.

## Creating a StreamTokenizer

StreamTokenizer can be created from either an InputStream or Reader. The Reader
version is preferred for character stream handling. The class needs configuration
before use to define token recognition rules.

Main.java
  

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.StreamTokenizer;

public class Main {

    public static void main(String[] args) {
        try {
            // Create from Reader
            BufferedReader reader = new BufferedReader(new FileReader("data.txt"));
            StreamTokenizer tokenizer1 = new StreamTokenizer(reader);
            
            // Basic configuration
            tokenizer1.wordChars('a', 'z');
            tokenizer1.wordChars('A', 'Z');
            tokenizer1.whitespaceChars(' ', ' ');
            tokenizer1.whitespaceChars('\n', '\n');
            tokenizer1.whitespaceChars('\r', '\r');
            tokenizer1.whitespaceChars('\t', '\t');
            
            System.out.println("StreamTokenizer created and configured");
            
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

This example shows how to create a StreamTokenizer from a Reader. We configure it
to recognize letters as word characters and common whitespace characters. Always
close the underlying stream when done. Configuration is essential before tokenizing.

## Basic Tokenizing Example

The simplest use of StreamTokenizer reads tokens until end of file. Each call to
nextToken returns the token type. The token value is stored in
either sval (for words) or nval (for numbers).

Main.java
  

import java.io.StringReader;
import java.io.StreamTokenizer;

public class Main {

    public static void main(String[] args) {
        String input = "Hello 123 World 45.67";
        StringReader reader = new StringReader(input);
        StreamTokenizer tokenizer = new StreamTokenizer(reader);
        
        try {
            tokenizer.parseNumbers();
            
            while (tokenizer.nextToken() != StreamTokenizer.TT_EOF) {
                switch (tokenizer.ttype) {
                    case StreamTokenizer.TT_WORD:
                        System.out.println("Word: " + tokenizer.sval);
                        break;
                    case StreamTokenizer.TT_NUMBER:
                        System.out.println("Number: " + tokenizer.nval);
                        break;
                    default:
                        System.out.println("Other: " + (char) tokenizer.ttype);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example tokenizes a simple string containing words and numbers. The
parseNumbers method enables number recognition. The switch statement
handles different token types. TT_EOF indicates end of input stream.

## Handling Quoted Strings

StreamTokenizer can recognize quoted strings when configured with
quoteChar. The entire quoted string becomes a single token. Both
single and double quotes can be configured as quote characters.

Main.java
  

import java.io.StringReader;
import java.io.StreamTokenizer;

public class Main {

    public static void main(String[] args) {
        String input = "Name 'John Doe' Age 25 City \"New York\"";
        StringReader reader = new StringReader(input);
        StreamTokenizer tokenizer = new StreamTokenizer(reader);
        
        try {
            // Configure single and double quotes as quote characters
            tokenizer.quoteChar('\'');
            tokenizer.quoteChar('"');
            
            while (tokenizer.nextToken() != StreamTokenizer.TT_EOF) {
                if (tokenizer.ttype == '\'' || tokenizer.ttype == '"') {
                    System.out.println("Quoted string: " + tokenizer.sval);
                } else if (tokenizer.ttype == StreamTokenizer.TT_WORD) {
                    System.out.println("Word: " + tokenizer.sval);
                } else if (tokenizer.ttype == StreamTokenizer.TT_NUMBER) {
                    System.out.println("Number: " + tokenizer.nval);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates handling both single and double quoted strings. The
quoted content is available in sval. The quote character itself is
returned as the token type. This allows distinguishing between different quote
styles.

## Customizing Token Recognition

StreamTokenizer provides extensive customization of what constitutes tokens. You
can define ranges of characters as word chars, whitespace, or ordinary chars.
The resetSyntax method clears all previous settings.

Main.java
  

import java.io.StringReader;
import java.io.StreamTokenizer;

public class Main {

    public static void main(String[] args) {
        String input = "user@example.com 192.168.1.1 #comment";
        StringReader reader = new StringReader(input);
        StreamTokenizer tokenizer = new StreamTokenizer(reader);
        
        try {
            // Reset and customize syntax
            tokenizer.resetSyntax();
            tokenizer.wordChars('a', 'z');
            tokenizer.wordChars('A', 'Z');
            tokenizer.wordChars('0', '9');
            tokenizer.wordChars('@', '@');
            tokenizer.wordChars('.', '.');
            tokenizer.whitespaceChars(' ', ' ');
            tokenizer.commentChar('#');
            
            while (tokenizer.nextToken() != StreamTokenizer.TT_EOF) {
                if (tokenizer.ttype == StreamTokenizer.TT_WORD) {
                    System.out.println("Token: " + tokenizer.sval);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows custom syntax configuration. We treat '@' and '.' as word
characters to handle emails and IPs. The '#' is a comment character. After
resetSyntax, all characters are "ordinary" until configured.

## Tracking Line Numbers

StreamTokenizer can track line numbers during parsing. The lineno
method returns the current line number. This is useful for error reporting in
source code processing.

Main.java
  

import java.io.StringReader;
import java.io.StreamTokenizer;

public class Main {

    public static void main(String[] args) {
        String input = "First line\nSecond line\nThird line";
        StringReader reader = new StringReader(input);
        StreamTokenizer tokenizer = new StreamTokenizer(reader);
        
        try {
            tokenizer.eolIsSignificant(true);
            
            while (tokenizer.nextToken() != StreamTokenizer.TT_EOF) {
                if (tokenizer.ttype == StreamTokenizer.TT_EOL) {
                    System.out.println("End of line " + tokenizer.lineno());
                } else if (tokenizer.ttype == StreamTokenizer.TT_WORD) {
                    System.out.println("Word at line " + 
                        tokenizer.lineno() + ": " + tokenizer.sval);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example demonstrates line number tracking. eolIsSignificant(true)
makes end-of-line markers significant. The lineno method helps
identify token locations. This is valuable for compiler or parser implementations.

## Handling Comments

StreamTokenizer supports both C-style (/* */) and C++-style (//) comments. The
slashStarComments and slashSlashComments methods
control this behavior. Comment content is skipped during tokenizing.

Main.java
  

import java.io.StringReader;
import java.io.StreamTokenizer;

public class Main {

    public static void main(String[] args) {
        String input = "code /* comment */ more // line comment\nend";
        StringReader reader = new StringReader(input);
        StreamTokenizer tokenizer = new StreamTokenizer(reader);
        
        try {
            tokenizer.slashStarComments(true);
            tokenizer.slashSlashComments(true);
            
            while (tokenizer.nextToken() != StreamTokenizer.TT_EOF) {
                if (tokenizer.ttype == StreamTokenizer.TT_WORD) {
                    System.out.println("Token: " + tokenizer.sval);
                } else if (tokenizer.ttype == StreamTokenizer.TT_EOL) {
                    System.out.println("End of line");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

This example shows comment handling in StreamTokenizer. Both comment styles are
enabled. The tokenizer automatically skips comment content. Only non-comment
tokens are returned by nextToken.

## Source

[Java StreamTokenizer Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/io/StreamTokenizer.html)

In this article, we've covered the essential methods and features of the Java
StreamTokenizer class. Understanding these concepts is crucial for text parsing
and lexical analysis in Java applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).