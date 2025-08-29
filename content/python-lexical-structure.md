+++
title = "Python lexical structure"
date = 2025-08-29T20:08:47.617+01:00
draft = false
description = "Python lexical structure chapter of the Python tutorial covers the lexis of the Python language. The lexical structure of a language is its grammar."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python lexical structure

last modified January 29, 2024

Computer languages, like human languages, have a lexical structure. A source
code of a Python program consists of tokens. Tokens are atomic code elements. In
Python language, we have comments, variables, literals, operators, delimiters,
and keywords.

## Python comments

*Comments* are used by humans to clarify the source code. All comments in
Python language follow the *#* character.

main.py
  

#!/usr/bin/python

# Author Jan Bodnar
# ZetCode 2022

def main():
    print("Comments example")

main()

Everything that follows the # character is ignored by the Python interpreter.

## Python variables

A *variable* is an identifier which holds a value. In programming we say
that we assign a value to a variable. Technically speaking, a variable is a
reference to a computer memory, where the value is stored. In Python language, a
variable can hold a string, a number, or various objects like a function or a
class. Variables can be assigned different values over time.

Variables in Python can be created from alphanumeric characters and the
underscore _ character. A variable cannot begin with a number. This
way the Python interpreter can easier distinguish between a number and a
variable.

Value
value2
company_name

These are valid identifiers.

12Val
exx$
first-name

These are examples of invalid identifiers.

The variables are *case sensitive*. This means that Price,
price, and PRICE are three different identifiers.

main.py
  

#!/usr/bin/python

number = 10
Number = 11
NUMBER = 12

print(number, Number, NUMBER)

In our script, we assign three numeric values to three identifiers. While it is
possible to define three variables differing in their case, it is not considered
a good programming practise.

$ ./main.py
10 11 12

## Python literal

A *literal* is any notation for representing a value in a Python source
code. Technically, a literal is assigned a value at compile time, while a
variable is assigned at runtime.

age = 29
nationality = "Hungarian"

Here we assign two literals to variables; number 29 and string
"Hungarian" are literals.

main.py
  

#!/usr/bin/python

name1 = "Jane"
age1 = 12

name2 = "Rose"
age2 = 16

"Patrick"
34

"Luke"
23

print(name1, age1)
print(name2, age2)

If we do not assign a literal to a variable, there is no way how we can work
with it. It is dropped.

$ ./main.py
Jane 12
Rose 16

## Python operators

An *operator* is a symbol used to perform an action on some value.

+    -    ~    *    **    /    //
%    &lt;&lt;    &gt;&gt;    &amp;    |    ^
and    or    not    in    not in
is    is not    &lt;   &gt;    !=
==    &lt;=    &gt;=

This is a list of operators available in Python language. We will talk
about operators later in the tutorial.

## Python indentation

Indentation is used to delimit blocks in Python. Where other programming
languages use curly brackets or keywords such as begin, end, Python uses white
space. An increase in indentation comes after certain statements; a decrease in
indentation signifies the end of the current block. The Python style guide
recommends using four spaces per indentation level.

if age &gt; 18:
    print("adult person")

for i in range(5):
    print(i)

After the if keyword a code block is expected. A new statement is
started on a new line, indented with four space characters. The indentation for
the following for keyword is decreased back to the initial one. The
for keyword starts a new code block, where its statement(s) are
indented.

## Python delimiters

A *delimiter* is a sequence of one or more characters used to specify the
boundary between separate, independent regions in plain text or other data
stream.

(       )       [       ]       {       }
,       :       .       `       =       ;
+=      -=      *=      /=      //=     %=
&lt;=      |=      ^=      &gt;&gt;=     &lt;&lt;=     **=
'       "       \       @

Delimiters are used in various area of the Python language. They are used to
build expressions, string literals, tuples, dictionaries, or lists.

## Python keywords

A keyword is a reserved word in the Python programming language. Keywords are
used to perform a specific task in a computer program. For example, import other
code, do repetitive tasks or perform logical operations. A programmer cannot use
a keyword as an ordinary variable.

and       del       global      not      with
as        elif      if          or       yield
assert    else      import      pass     False
break     except    in          raise    None
class     finally   is          return   True
continue  for       lambda      try
def       from      nonlocal    while

This is a list of Python keywords.

## Source

[Python language reference](https://docs.python.org/3/contents.html)

In this article we have covered the basic syntax of Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).