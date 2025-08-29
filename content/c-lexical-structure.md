+++
title = "C# lexical structure"
date = 2025-08-29T19:50:56.650+01:00
draft = false
description = "Discover the lexical structure of C#, including syntax rules, tokens, and fundamental building blocks of the language. Like human languages, programming languages have a defined structure—learn how C# handles lexical elements."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# lexical structure

last modified May 16, 2025

 

Like human languages, computer languages have a well-defined lexical structure.
The source code of a C# program is made up of *tokens*, which are the
smallest meaningful elements in the code. Tokens include identifiers (such as
variable and method names), keywords (reserved words like if,
class, public), literals (fixed values such as numbers
and strings), operators (such as +, -,
=), delimiters (such as parentheses, braces, commas, and
semicolons), comments, and white space. The C# compiler reads the source code
and breaks it down into these tokens to understand and process the program
correctly.

C# programs are written using characters from the Unicode character set, which
allows for a wide range of symbols and scripts from many languages around the
world. This means that C# source code can include not only standard Latin
letters and digits, but also characters from other alphabets, mathematical
symbols, and even emoji. Unicode support enables developers to write identifiers
and string literals in their native languages, making C# a globally accessible
programming language.

## C# comments

*Comments* are used by humans to clarify the source code. There are three
types of comments in C#. Single-line comments, multi-line comments and XML
comments. XML comments can be extracted to HTML files.

Multi-line comments are enclosed by /* */ characters. Single line comments
start with two forward slashes.

Program.cs
  

/*
    This is Program.cs
    Author: Jan Bodnar
    ZetCode 2022
*/

// A C# statement
Console.WriteLine("This is Comments program");

Comments are ignored by C# compiler.

/*
  This is Program.cs
/*  Author: Jan Bodnar */
  ZetCode 2022
*/

Comments cannot be nested; the above code does not compile.

## C# White Space

White space in C# refers to spaces, tabs, and newlines used in source code. It serves two primary purposes: separating tokens for the compiler and improving code readability for developers.

### Role of White Space

White space is required in certain places to distinguish keywords, identifiers,
and symbols. It also improves code clarity, making it easier to read and
maintain. While necessary in some cases, excessive white space does not affect
compilation.

int i = 0;
string message = "Hello, World!";

In this example, white space separates the int keyword from the
variable name i, ensuring the compiler correctly interprets each
token.

### Rules for White Space in C#

White space must be placed between a type declaration and its identifier, such
as int value. However, it cannot be used within keywords or
variable names—int my Variable is invalid. Extra spaces between
tokens are ignored by the compiler. Proper formatting enhances readability,
while inconsistent spacing can make code harder to read.

int a=1;   // No space around '=' (valid but less readable)
int b = 2; // Proper spacing improves clarity
int c  =  3; // Extra spaces do not affect compilation

### Best Practices for White Space

Using consistent indentation and spacing improves readability. Following
standard C# coding conventions—such as placing spaces around operators—enhances
clarity. Avoid unnecessary white space that does not contribute to better
structure.

// Poorly formatted code:
if(x==10){Console.WriteLine("Hello");}

// Well-formatted code:
if (x == 10)
{
    Console.WriteLine("Hello");
}

Although excess white space is ignored by the compiler, well-structured code
improves maintainability and readability, ensuring a more professional and
organized approach to C# development.

## C# Variables

A variable is an identifier that references a memory location holding a value.
Variables are assigned values during program execution. Identifiers can include
letters, digits, and underscores, but must start with a letter or underscore,
not a digit.

C# is case-sensitive, so Name, name, and
NAME are distinct variables. Keywords cannot be used as identifiers
unless prefixed with @ (e.g., @int), but this is
discouraged.

string userName;
int _count;
DateTime birthDate;

These are valid identifiers. 

string 123name; // Starts with a digit
int %count;     // Contains invalid character
DateTime birth date; // Contains space

These are invalid identifiers.

VariablesExample.cs
  

public class VariablesExample
{
    public static void Main(string[] args)
    {
        string name = "Robert";
        string Name = "Julia";
        Console.WriteLine(name); // Outputs: Robert
        Console.WriteLine(Name); // Outputs: Julia
    }
}

This program demonstrates case sensitivity, as name and
Name are treated as separate variables.

## C# Literals

A *literal* is a direct representation of a specific value within a given
type. C# supports various literal types, including boolean, integer, floating
point, string, character, and date. Unlike variables, which receive their values
at runtime, literals are assigned at compile time.

int age = 29;
string nationality = "Hungarian";

In the example above, 29 is an integer literal, while
"Hungarian" is a string literal.

Program.cs
  

bool isSingle = true;
string name = "James";
string job = null;
double weight = 68.5;
DateTime birthDate = DateTime.Parse("November 12, 1987");

Console.WriteLine($"His name is {name}");

if (isSingle)
{
    Console.WriteLine("He is single");
}
else
{
    Console.WriteLine("He is in a relationship");
}

Console.WriteLine($"His job is {job}");
Console.WriteLine($"He weighs {weight} kilograms");
Console.WriteLine($"He was born in {birthDate:yyyy}");

The example above demonstrates different literal types:

    - A bool literal can hold either true or false.

    - The value "James" is a string literal.

    - The keyword null represents an unassigned value.

    - 68.5 is a floating-point literal.

    - The date November 12, 1987 is a date literal.

$ dotnet run
His name is James
He is single
His job is
He weighs 68.5 kilograms
He was born in 1987

## C# operators

An *operator* is a symbol used to perform an action on some value.
Operators are used in expressions to describe operations involving one or more
operands.

+    -    *    /    %    ^    &amp;    |    !    ~
=    +=   -=   *=   /=   %=    ^=    ++    --
==   !=    &lt;   &gt;    &amp;=  &gt;&gt;=   &lt;&lt;=   &gt;=   &lt;=
||   &amp;&amp;    &gt;&gt;    &lt;&lt;    ?:

This is a partial list of C# operators. We will talk about operators later in
the tutorial.

## C# separators

A *separator* is a sequence of one or more characters used
to specify the boundary between separate, independent regions in plain text or
other data stream.

[ ]   ( )   { }   ,   :   ;

```
string language = "C#";

```

The double characters are used to mark the beginning and the end of a string.
The semicolon (;) character is used to end each C# statement.

Console.WriteLine("Today is {0}", DateTime.Today.ToString("M/d"));

Parentheses (round brackets) are used to mark the method signature. The
signature consists of method parameters. Curly brackets are used to denote
the evaluated value.

int[] array = new int[5] {1, 2, 3, 4, 5};

Square brackets [] are used to denote an array type. They are also
used to access or modify array elements. Curly brackets {} are also
used to initiate arrays. Curly brackets are also used in variable
interpolation or to enclose the body of a method or a class.

int a, b, c;

The comma character can be used to use multiple declarations on the
same line of code.

## C# Keywords

Keywords in C# are reserved words that have special meaning within the language.
They are used to define variables, control program flow, and perform logical
operations, ensuring a structured and functional codebase.

C# includes a wide range of keywords, such as if,
else, for, while, base,
false, float, catch, and
this. These keywords play a crucial role in various aspects of
programming and are introduced progressively throughout the tutorial.

Program.cs
  

for (int i = 0; i &lt;= 5; i++)
{
    Console.WriteLine(i);
}

In the example above, the int keyword defines a variable type,
while the for keyword initiates a loop, demonstrating fundamental
control flow and data handling in C#.

## C# Unicode Support

C# uses the Unicode character set, allowing identifiers, literals, and comments
to include characters from various languages, such as Cyrillic, Chinese, or
Arabic. This makes C# suitable for internationalization.

UnicodeExample.cs
  

public class UnicodeExample
{
    public static void Main(string[] args)
    {
        string имя = "Анна"; // Russian identifier and string
        Console.WriteLine($"Имя: {имя}");
        string 名前 = "太郎"; // Japanese identifier and string
        Console.WriteLine($"名前: {名前}");
    }
}

This example uses Unicode identifiers and literals in Russian and Japanese,
demonstrating C#'s support for global character sets.

## C# Preprocessor Directives

Preprocessor directives are special instructions that are processed before
compilation. They allow conditional compilation, symbol definition, and other
compile-time behaviors. All preprocessor directives begin with #.

These directives do not produce executable code but influence how the compiler
handles source code. Common preprocessor directives include
#define, #if, #else, #elif,
#endif, #region, and #pragma.

PreprocessorExample.cs
  

#define DEBUG

public class PreprocessorExample
{
    public static void Main(string[] args)
    {
        #if DEBUG
            Console.WriteLine("Debug mode is active");
        #else
            Console.WriteLine("Debug mode is inactive");
        #endif
    }
}

In the example above:

    - #define DEBUG declares a preprocessor symbol.

    - #if DEBUG checks if the symbol DEBUG is defined.

    - #else specifies an alternative code path if the symbol is not defined.

    - #endif marks the end of the conditional directive.

Preprocessor directives are useful for managing debug and release
configurations, organizing code blocks, and enhancing compiler behavior without
altering runtime execution.

## C# Line Terminators

Line terminators mark the end of a line in the source code. In C#, valid line
terminators include the carriage return (\r), line feed
(\n), or the combination (\r\n). They affect how the
compiler parses tokens.

Unlike some languages, C# does not require a semicolon to terminate every line,
but statements must be separated by semicolons. Line terminators help the
compiler identify token boundaries.

LineTerminatorExample.cs
  

public class LineTerminatorExample
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Line 1");
        Console.WriteLine("Line 2");
    }
}

Each statement ends with a semicolon and is separated by a line terminator,
ensuring proper parsing by the compiler.

## C# conventions

Conventions are recommended practices for writing consistent and readable C#
code. While not enforced by the compiler, they improve code maintainability and
collaboration. Below are key C# conventions:

- *PascalCase for identifiers*: Classes, methods, and properties start with an uppercase letter (e.g., MyClass, GetName).

- *Interface names*: Start with I (e.g., IEnumerable).

- *Comments*: Place on separate lines, not at the end of code lines, for clarity.

- *One statement per line*: Avoid multiple statements on a single line.

- *Meaningful names*: Use descriptive identifiers like customerName instead of cn.

- *Constants*: Use uppercase with underscores (e.g., MAX_COUNT).

- *Curly braces*: Place opening braces on a new line for code blocks.

- *Main method parameter*: Name the string array parameter args.

- *Keyword order*: Place public before static in declarations.

- *Indentation*: Use consistent 4-space indentation for nested code.

- *File naming*: Match the file name to the main class name (e.g., Program.cs for Program class).

This article explored the lexical structure of C#, including tokens like
comments, variables, literals, operators, separators, and keywords. Additional
topics like Unicode support, preprocessor directives, and line terminators were
covered to provide a comprehensive understanding. Adhering to C# conventions
ensures high-quality, maintainable code.

## Source

[C# documentation](https://learn.microsoft.com/en-us/dotnet/csharp/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).