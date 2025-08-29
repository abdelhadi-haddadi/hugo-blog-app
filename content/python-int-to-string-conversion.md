+++
title = "Python int to string conversion"
date = 2025-08-29T20:08:44.255+01:00
draft = false
description = "Python int to string tutorial shows how to convert integers to strings. We can use the str function and string formatting to do the conversion."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python int to string conversion

last modified January 29, 2024

Python int to string tutorial shows how to convert integers to strings. We can
use the str function and string formatting to do the conversion.

Integer to string conversion is a type conversion or type casting,
where an entity of integer data type is changed into string one.

## Python str function

The built-in str function returns the string version of the given
object.

&gt;&gt;&gt; str(2)
'2'
&gt;&gt;&gt; str(3.3)
'3.3'
&gt;&gt;&gt; str(True)
'True'

## Python is strongly typed

Python is a dynamically and strongly typed programming language. Dynamic 
programming languages, including Python, Ruby, and Perl, do not specify the 
data types explicitly in code.

A strongly typed language requires strinct rules when performing operations. A
weakly typed language such as Perl or JavaScript performs automatic convertions.

simple.py
  

#!/usr/bin/python

n = 3

msg = 'There are ' + n + ' falcons in the sky'
print(msg) 

In the example, we concatenate strings and an integer.

$ ./simple.py 
Traceback (most recent call last):
  File "/root/Documents/prog/python/int2str/./strongly_typed.py", line 5, in &lt;module&gt;
    msg = 'There are ' + n + ' falcons in the sky'
  TypeError: can only concatenate str (not "int") to str

We get an error message because Python requires all operands to be strings for 
the + operator.

simple2.py
  

#!/usr/bin/python

n = 3

msg = 'There are ' + str(n) + ' falcons in the sky'
print(msg) 

We change the data type of the n variable to string with the 
help of the str function.

$ ./simple2.py 
There are 3 falcons in the sky

Now the program runs OK.

simple.pl
  

#!/usr/bin/perl

use 5.30.0;
use warnings;

my $n = 3;

say 'There are ' . $n . ' falcons in the sky';

Perl is also a dynamic language, but unlike Python, it is a weakly typed.
This means that Perl automatically converts the types appropriately.

$ ./simple.pl 
There are 3 falcons in the sky

## Python int to string with formatting

We can do the conversion with various formatting options that Python provides.
It is often a more natural approach.

use_format.py
  

#!/usr/bin/python

val = input('enter a value: ')

print(f'You have entered {val}')

In the example, we use the input function to ask a user for a 
value. The value is then added to the message with Python's fstring.

$ ./use_format.py 
enter a value: 5
You have entered 5

In this article we have shown how to perform int to string conversions in
Python.

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).