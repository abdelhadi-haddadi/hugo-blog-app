+++
title = "PHP basics"
date = 2025-08-29T20:04:10.252+01:00
draft = false
description = "PHP basics tutorial covers the basics of PHP language."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP basics

last modified March 11, 2025

In this article we cover the basics of PHP.

## PHP

PHP is a scripting language designed for web development. It is used to produce
dynamic web pages. Currently, PHP is one of the most widely used programming
languages. Much of its syntax is borrowed from C, Java, and Perl with a couple
of unique PHP-specific features.

PHP can be embedded into HTML code and it generally runs on a web server. The
web server needs to be configured to process PHP code and create web page
content from it. It can be deployed on most web servers and operating systems.
PHP is a free software. PHP was first created in 1995 and is actively developed
since then.

## Installing PHP

For development on our computer, PHP can be installed via installation packages
or via development bundles such as WAMP, MAMP or XAMPP.

A great way to learn the basics of PHP is to use the PHP CLI. PHP CLI is the
command-line interpreter for the PHP scripting language.

$ sudo apt install php-cli

On Debian Linux systems, we can install PHP CLI via the system package manager.

On Windows, can can download the binaries at 
[https://www.php.net/downloads.php](https://www.php.net/downloads.php).

$ php -v
PHP 8.4.4 (cli) (built: Feb 11 2025 16:24:56) (NTS Visual C++ 2022 x64)
Copyright (c) The PHP Group
Zend Engine v4.4.4, Copyright (c) Zend Technologies

We get the version of PHP with php -v command.

## PHP CLI

PHP CLI is a command line interpreter for the PHP language. It is useful for
testing PHP scripts from the shell. In this article we are using the PHP
command line interpreter. We focus on the core of the PHP language.

simple.php
  

&lt;?php

echo "this is PHP language\n";

Here we have a simple PHP script.

$ php simple.php
this is PHP language

## PHP interactive shell

Like Python or Ruby, PHP also has an interactive shell. It is
useful to test small language constructs.

$ php -a
Interactive mode enabled

php&gt; print PHP_OS;
Linux
php&gt; print PHP_VERSION;
8.4.4

The PHP shell is invoked with the -a option of the
php command. The shell uses the php&gt; prompt.

## PHP comments

*Comments* are used by humans to clarify the source code. All comments in
PHP follow the # character.

&lt;?php

# comments.php
# Author Jan Bodnar
# ZetCode 2025

echo "This is comments.php script\n";

Everything that follows the # character is ignored by the
PHP interpreter.

// comments.php
// author Jan Bodnar
// ZetCode 2022

/*
 comments.php
 author Jan Bodnar
 ZetCode 2022
*/

PHP also recognizes the comments from the C language.

## PHP white space

White space in PHP is used to separate tokens in PHP source file. It is
used to improve the readability of the source code.

public $isRunning;

White spaces are required in some places; for example between the access specifier
and the variable name. In other places, it is forbidden. It cannot be present in
variable identifiers.

$a=1;
$b = 2;
$c  =  3;

The amount of space put between tokens is irrelevant for the PHP interpreter.
It is based on the preferences and the style of a programmer.

$a = 1;
$b = 2; $c = 3;
$d
  =
   4;

We can put two statements into one line. Or one statement into three lines.
However, source code should be readable for humans. There are accepted standards of
how to lay out your source code.

## PHP semicolon

A semicolon is used to mark the end of a statement in PHP. It is mandatory.

$a = 34;
$b = $a * 34 - 34;
echo $a;

Here we have three different PHP statements. The first is an assignment. It puts
a value into the $a variable. The second one is an expression. The
expression is evaluated and the output is given to the $b variable.
The third one is a command. It prints the $a variable.

## PHP variables

A variable is an identifier, which holds a value.
In programming we say that we assign a value to a variable. Technically
speaking, a variable is a reference to a computer memory, where the value is stored.
In PHP language, a variable can hold a string, a number, or various objects
like a function or a class. Variables can be assigned different values over time.

Variables in PHP consist of the $ character, called a sigil, and a
label. A label can be created from alphanumeric characters and an underscore
_ character. A variable cannot begin with a number. The PHP interpreter
can then distinguish between a number and a variable more easily.

$Value
$value2
$company_name

These were valid PHP identifiers.

$12Val
$exx$
$first-name

These were examples of invalid PHP identifiers.

The variables are *case sensitive*. This means that
$Price, $price, and $PRICE
are three different identifiers.

case.php
  

&lt;?php

$number = 10;
$Number = 11;
$NUMBER = 12;

echo $number, $Number, $NUMBER;

echo "\n";

In our script, we assign three numeric values to three variables
and print them. However, for clarity reasons, it is not recommended
to create variables which differ only in case; it is considered
a poor practice.

$ php case.php
101112

## PHP constants

A constant is an identifier for a value which cannot change during the execution
of the script. By convention, constant identifiers are always uppercase.

constants.php
  

&lt;?php

define("SIZE", 300);
define("EDGE", 100);

#SIZE = 100;

echo SIZE;
echo EDGE;

echo "\n";

In the script, we define two constants.

define("SIZE", 300);
define("EDGE", 100);

Constants are created with the define function.

# SIZE = 100;

Constants differ from variables; we cannot assign a different
value to an existing constant. The script will fail if we uncomment
the line.

echo SIZE;
echo EDGE;

Constants do not use the dollar sigil character.

$ php constants.php
300100

The following is a list of PHP compile time constants.

__CLASS__    __DIR__       __FILE__    __FUNCTION__
__METHOD__   __NAMESPACE__

## PHP literal

A literal is any notation for representing a value within
the PHP source code. Technically, a literal is assigned a value
at compile time, while a variable is assigned at runtime.

$age = 29;
$nationality = "Hungarian";

Here we assign two literals to variables. Number 29 and string "Hungarian" are literals.

literals.php
  

&lt;?php

$name1 = "Jane ";
$age1 = 17;

$name2 = "Rose ";
$age2 = 16;

echo "Patrick 34\n";
echo "Luke 22\n";

echo $name1, $age1, "\n";
echo $name2, $age2, "\n";

If we do not assign a literal to a variable, there is no way how we can
work with it—it is dropped.

$ php literals.php
Patrick 34
Luke 22
Jane 17
Rose 16

## PHP operators

An operator is a symbol used to perform an action
on some value.

+    -    *    /    %  **  ++   --  ?:  ??
=    +=   -=   *=   /=   .=    %=
==   !=  ===  !==  &lt;&gt;  &gt;  &lt;  &gt;=  &lt;=  &lt;=&gt;
&amp;&amp;   ||   !   xor   or
&amp;    ^    |   ~   .   &lt;&lt;   &gt;&gt;

These are PHP operators. We will talk about operators later in the tutorial.

## PHP delimiters

A delimiter is a sequence of one or more characters used
to specify the boundary between separate, independent regions in plain
text or other data stream.

$a = "PHP";
$b = 'Java';

The single and double characters are used to mark the beginning and
the end of a string.

function setDate($date) {

    $this-&gt;date = $data;
}

if ($a &gt; $b) {

    echo "\$a is bigger than \$b";
}

Parentheses are used to mark the function signature. The signature is the function parameters.
Curly brackets are used to mark the beginning and the end of the function body. They are also used
in flow control.

$a = array(1, 2, 3);
echo $a[1];

The square brackets are used to mark the array index.

/*
 Author Jan Bodnar
 January 2022
 ZetCode
*/

/* */ delimiters are used to provide C style comments in PHP.

&lt;?php
// PHP code

The &lt;?php delimiter is used to declare the start of PHP code.

## PHP keywords

A keyword is a reserved word in the PHP programming language. Keywords are used to
perform a specific task in a computer program; for example, print a value, do
repetitive tasks, or perform logical operations.
A programmer cannot use a keyword as an ordinary variable.

The following is a list of PHP keywords.

abstract    and          array       as          break
case        catch        class       clone       const
continue    declare      default     do          else
elseif      enddeclare   endfor      endforeach  endif
endswitch   endwhile     extends     final       for
foreach     function     global      goto        if
implements  interface    instanceof  namespace   new
or          private      protected   public      static
switch      throw        try         use         var
while       xor          yield       yield from

## PHP console output

Output from our PHP scripts is sent to the console. Note that we say console 
because here we use the PHP_CLI command  line interpreter. 
If we test these examples on the web, the output will be sent to the browser. 

printing.php
  

&lt;?php 

$a = 23;
print $a;

This PHP script assigns a value to a variable. It prints it to the console. 

$a = 23;

We assign a value 23 to the $a variable. Each variable starts with 
a dollar character. This PHP code line is a statement. Each statement
ends with a semicolon. In PHP, semicolons are not optional like in JavaScript or Ruby. 
They are obligatory. 

print $a;

We print the $a variable to the console. The print keyword
does not add a new line to the output. If we want a new line, we must put it manually.
The print keyword takes only one argument. 

echoing.php
  

&lt;?php 

$a = 23;
$b = 24;

echo $a, "\n", $b, "\n";

In this script, we use the echo keyword. It is similar to the
print keyword. Unlike the print keyword, 
it can take multiple arguments.

$a = 23;
$b = 24;

We define two variables.

echo $a, "\n", $b, "\n";

We print the variables to the console. We also include the new line 
characters. Arguments can be separated by commas. 

$ php echoing.php 
23
24

## PHP command line arguments

PHP scripts can receive command line arguments. They follow the name 
of the program. The $argv is an array holding all 
arguments of a PHP script. The $argc holds the 
number of arguments passed, including the name of the PHP script.

arguments.php
  

&lt;?php 

echo "There are $argc arguments\n";

for ($i=0; $i &lt; $argc; $i++) {
    echo $argv[$i] . "\n";
}

This script works with command line arguments.

echo "There are $argc arguments\n";

We print the number of arguments passed to the script.

for ($i=0; $i &lt; $argc; $i++) {
    echo $argv[$i] . "\n";
}

In the for loop, we go through and print all arguments.
Loops are covered later in the tutorial.

$ php arguments.php 1 2 3
There are 4 arguments
arguments.php
1
2
3

We pass three arguments to the script. The name of the script 
is also an argument to the PHP script.

## PHP types

PHP is a weakly typed language. It works with types, but the programmer 
does not specify them when declaring variables. A *data type* is 
a one of various types of data, as double, integer, or boolean.
Values of a certain data type are from a specific range of values stating 
the possible values for that type, the operations that can be done on that 
type, and the way the values of that type are stored. PHP works implicitly 
with data types. Programmers do not specify explicitly the data types. 

dynamic.php
  

&lt;?php 

$a = "Jane";
echo "$a \n";

$a = 12;
echo "$a \n";

$a = 56.4;
echo "$a \n";

$a = true;
echo "$a \n";

In this PHP script, we have an $a variable. First, we assign it a
string, then an integer, a double, and finally a boolean value. 
If we assign a string to a variable the PHP automatically creates
a string variable. 

$ php dynamic.php 
Jane 
12 
56.4 
1 

gettype.php
  

```
&lt;?php 

$temperature = 12.4;
$name = "Jane";
$age = 17;
$values = array(1, 2, 3, 4, 5, 6); 

class Being {};

$somebody = new Being();

echo gettype($temperature), "\n";
echo gettype($name), "\n";
echo gettype($age), "\n";
echo gettype($values), "\n";
echo gettype($somebody), "\n";

```

In the above PHP script, we dynamically create five types. 

$temperature = 12.4;

A double variable is defined.

$name = "Jane";

A string variable is defined.

$age = 17;

An integer variable is defined.

$values = array(1, 2, 3, 4, 5, 6); 

class Being {};

This is an array and a class. Both types will be covered later in 
more detail. 

echo gettype($temperature), "\n";

The gettype function returns the type
of the variable in question. 

$ php gettype.php 
double
string
integer
array
object

## PHP type declarations

Type declarations can be added to function arguments, return values, and class
properties. They are enforced with the declare(strict_types=1);
directive. 

declarations.php
  

&lt;?php

declare(strict_types=1);

function power(int $a, int $b=2): int {

    if ($b == 2) {
    
        return $a * $a;
    }

    $value = 1;

    for ($i = 0; $i &lt; $b; $i++) {
    
        $value *= $a;
    }
    
    return $value;
}

$v1 = power(5);
$v2 = power(5, 4);

echo "5^2 is $v1 \n";
echo "5^4 is $v2 \n";

In the example, we use type declarations for function arguments and function
return value.

## PHP constants

In PHP, we can create constants. A *constant* is a name for a value that, 
unlike a variable, cannot be reassociated with a different value. We use the 
define function to create constants in PHP.

constants.php
  

&lt;?php 

define("BLUE", "0000FF");

echo BLUE, "\n";

echo defined("BLUE");
echo "\n";

In this PHP script, we define a BLUE constant. 

define("BLUE", "0000FF");

Here we define the BLUE constant. It is a convention to 
write constants in uppercase letters. 

echo BLUE, "\n";

Here we use it. Note that constants are not preceded by the
$ dollar character. 

echo defined("BLUE");

We have used another function, the defined function.
It checks if a particular constant exists. It returns true if it does. 

$ php constant.php 
0000FF
1

PHP also has some predefined constants. 

predefined_constants.php
  

&lt;?php 

echo TRUE;
echo "\n";
echo PHP_VERSION;
echo "\n";
echo PHP_OS;
echo "\n";
echo __LINE__;
echo "\n";
echo __FILE__;
echo "\n";
echo DIRECTORY_SEPARATOR;
echo "\n";
echo PHP_DATADIR;
echo "\n";

Here we print some built-in PHP constants. For example, the PHP_OS
constant prints the OS version on which the PHP was built.

$ php predefined_constants.php 
1
8.1.2
Linux
9
/home/jano/Documents/prog/php/simple.php
/
/usr/share/php/8.1

## PHP variable interpolation

*Variable interpolation* is replacing variables with their values inside
string literals. Another names for variable interpolation are: variable
substitution or variable expansion.

interpolation.php
  

&lt;?php 

$age = 17;

echo "Jane is $age years old\n";

The $age variable is replaced with the value 17 in the string
enclosed by double quotes.

$ php interpolation.php 
Jane is 17 years old

nointerpolation.php
  

```
&lt;?php 

$age = 17;

echo 'Jane is $age years old\n';

```

However, this does not work if we use single quotes. In this
case, no interpolation happens and no special characters are
working. 

$ php nointerpolation.php 
Jane is $age years old\n

We see a verbatim output of the string. 

## PHP including files

PHP code is split in multiple files for bigger programs. We use the
include statement to join various PHP files.

common.php
  

&lt;?php 

define("VERSION", 1.12);

function get_max($x, $y) {

    if ($x &gt; $y) {

        return $x;
    } else {

        return $y;
    }
}

Let's say, we have a common.php file, in which we define some 
constants and functions. 

myfile.php
  

&lt;?php 

include "common.php";

echo "The version is " . VERSION . "\n";

$a = 5;
$b = 3;

echo get_max($a, $b), "\n";

And we have another file which wants to use the aforementioned definitions. 

include "common.php";

We simply include the definitions to our file with the include 
keyword. We must specify the exact path to the common.php file. 
In our simple case, both files are in the same directory. 

$ php myfile.php 
The version is 1.12
5

## Source

[PHP language reference](https://www.php.net/manual/en/langref.php)

In this article we have introduced the PHP language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.