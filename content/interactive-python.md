+++
title = "Interactive Python"
date = 2025-08-29T20:03:05.502+01:00
draft = false
description = "In this chapter of the Python tutorial, we work with the interactive Python interpreter. We show how to use it and mention its built-in help system."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../python/)
[Next](../lexicalstructure/)

# Interactive Python

last modified October 18, 2023

In this part of the Python programming tutorial, we talk about 
interactive Python interpreter. 

 

Python code can be launched in two basic ways. As a script or 
inside an interactive interpreter. 

#!/usr/bin/env python

# first.py

print("The Python tutorial")

This is an example of a small Python script. It is launched 
from a UNIX shell. 

$ ./first.py 
The Python tutorial

## Interactive interpreter

Another way of running Python code is the interactive Python interpreter. 
The Python interpreter is very useful for our explorations. When we quickly 
want to test some basic functionality of the Python language and we don't want to
write a whole script. To get the interactive interpreter, we execute the Python 
command on our favourite shell. 

$ python3
Python 3.5.2 (default, Nov 17 2016, 17:05:23) 
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
&gt;&gt;&gt;

This is the welcome message of the Python interpreter. We see the version of Python 
on our machine. In our case it is Python 3.5.2. The "&gt;&gt;&gt;" is the prompt used 
in the Python interactive mode. To leave the interpreter and return back to the shell, 
we can type Ctrl+D or quit. 
Typing Ctrl+L clears the screen of the Python interpreter. 

Now we can query for some useful information. 

&gt;&gt;&gt; credits
    Thanks to CWI, CNRI, BeOpen.com, Zope Corporation and a cast of thousands
    for supporting Python development.  See www.python.org for more information.

If we type credits we get some information about organizations 
involved in Python development. 

&gt;&gt;&gt; copyright
Copyright (c) 2001-2016 Python Software Foundation.
All Rights Reserved.

Copyright (c) 2000 BeOpen.com.
All Rights Reserved.

Copyright (c) 1995-2001 Corporation for National Research Initiatives.
All Rights Reserved.

Copyright (c) 1991-1995 Stichting Mathematisch Centrum, Amsterdam.
All Rights Reserved.

The copyright command gives the copyright of the 
Python programming language. 

The license command provides several pages regarding 
the license of Python. 

## Getting help

The help command provides some help about Python. 

&gt;&gt;&gt; help
Type help() for interactive help, or help(object) for help about object.
&gt;&gt;&gt;

We can use the command in two ways. Either we can get some help about a specific 
object or we enter a interactive help mode.

For example, if we type help(True), we get some information 
about bool objects.

Help on bool object:

class bool(int)
 |  bool(x) -&gt; bool
 |  
 |  Returns True when the argument x is true, False otherwise.
 |  The builtins True and False are the only two instances of the class bool.
 |  The class bool is a subclass of the class int, and cannot be subclassed.
 |  
 |  Method resolution order:
 |      bool
 |      int
 |      object
 |  
 |  Methods defined here:
 |  
 |  __and__(...)
 |      x.__and__(y) &lt;==&gt; x&amp;y

 ...

If the topic is larger than one page, we can scroll it using the arrows. 
If we want to quit the topic, we press the q key. 

If we type help we get the interactive help mode of the interpreter. 

&gt;&gt;&gt; help()

Welcome to Python 3.5's help utility!

If this is your first time using Python, you should definitely check out
the tutorial on the Internet at http://docs.python.org/3.5/tutorial/.

Enter the name of any module, keyword, or topic to get help on writing
Python programs and using Python modules.  To quit this help utility and
return to the interpreter, just type "quit".

To get a list of available modules, keywords, symbols, or topics, type
"modules", "keywords", "symbols", or "topics".  Each module also comes
with a one-line summary of what it does; to list the modules whose name
or summary contain a given string such as "spam", type "modules spam".

help&gt; 

To leave the help mode and return to the interpreter, we use 
the quit command. 

The keywords command gives a list of available keywords in 
Python programming language.  

help&gt; keywords

Here is a list of the Python keywords.  Enter any keyword to get more help.

False               def                 if                  raise
None                del                 import              return
True                elif                in                  try
and                 else                is                  while
as                  except              lambda              with
assert              finally             nonlocal            yield
break               for                 not                 
class               from                or                  
continue            global              pass  

If we type any of the keywords, we get some help on it. 

The modules command gives a list of available modules. 
Again, typing a name of the module will provide additional help.

Finally, we have the topics command. 

help&gt; topics

Here is a list of available topics.  Enter any topic name to get more help.

ASSERTION           DELETION            LOOPING             SHIFTING
ASSIGNMENT          DICTIONARIES        MAPPINGMETHODS      SLICINGS
ATTRIBUTEMETHODS    DICTIONARYLITERALS  MAPPINGS            SPECIALATTRIBUTES
ATTRIBUTES          DYNAMICFEATURES     METHODS             SPECIALIDENTIFIERS
AUGMENTEDASSIGNMENT ELLIPSIS            MODULES             SPECIALMETHODS
BASICMETHODS        EXCEPTIONS          NAMESPACES          STRINGMETHODS
BINARY              EXECUTION           NONE                STRINGS
BITWISE             EXPRESSIONS         NUMBERMETHODS       SUBSCRIPTS
BOOLEAN             FLOAT               NUMBERS             TRACEBACKS
CALLABLEMETHODS     FORMATTING          OBJECTS             TRUTHVALUE
CALLS               FRAMEOBJECTS        OPERATORS           TUPLELITERALS
CLASSES             FRAMES              PACKAGES            TUPLES
CODEOBJECTS         FUNCTIONS           POWER               TYPEOBJECTS
COMPARISON          IDENTIFIERS         PRECEDENCE          TYPES
COMPLEX             IMPORTING           PRIVATENAMES        UNARY
CONDITIONAL         INTEGER             RETURNING           UNICODE
CONTEXTMANAGERS     LISTLITERALS        SCOPING             
CONVERSIONS         LISTS               SEQUENCEMETHODS     
DEBUGGING           LITERALS            SEQUENCES  

The topics command gives a list of topics regarding Python programming language. 
Here we can find some useful information. 

## Python code

Next we have some practical examples of Python interpreter. 

&gt;&gt;&gt; 2 + 4
6
&gt;&gt;&gt; 5 * 56
280
&gt;&gt;&gt; 5 - 45
-40
&gt;&gt;&gt; 

Python interpreter can be used as a calculator. Each expression is executed 
right away and the result is shown on the screen. 

&gt;&gt;&gt; a = 3
&gt;&gt;&gt; b = 4
&gt;&gt;&gt; a**b
81
&gt;&gt;&gt; a == b
False
&gt;&gt;&gt; a &lt; b
True
&gt;&gt;&gt;

We can define variables and perform operations on them. 

&gt;&gt;&gt; import random
&gt;&gt;&gt; dir(random)
['BPF', 'LOG4', 'NV_MAGICCONST', 'RECIP_BPF', 'Random', 'SG_MAGICCONST', 
'SystemRandom', 'TWOPI', 'WichmannHill', '_BuiltinMethodType', '_MethodType',
'__all__', '__builtins__', '__doc__', '__file__', '__name__', '_acos', 
'_ceil', '_cos', '_e', '_exp', '_hexlify', '_inst', '_log', '_pi', '_random',
'_sin', '_sqrt', '_test', '_test_generator', '_urandom', '_warn', 
'betavariate', 'choice', 'expovariate', 'gammavariate', 'gauss', 
'getrandbits', 'getstate', 'jumpahead', 'lognormvariate', 'normalvariate',
'paretovariate', 'randint', 'random', 'randrange', 'sample', 'seed',
'setstate', 'shuffle', 'uniform', 'vonmisesvariate', 'weibullvariate']
&gt;&gt;&gt; 

Here we imported a random module. With the dir function, we further 
explore the random module.  

With the help of the special __doc__ string, we can get help 
on a specific function. 

&gt;&gt;&gt; print(random.seed.__doc__)
Initialize internal state from hashable object.

        None or no argument seeds from current time or from an operating
        system specific randomness source if available.

        If a is not None or an int or long, hash(a) is used instead.
&gt;&gt;&gt;

The locals command shows our current local namespace. 

&gt;&gt;&gt; locals()
{'random': &lt;module 'random' from '/usr/lib/python3.5/random.py'&gt;, '__spec__': None, 
'__package__': None, '__loader__': &lt;class '_frozen_importlib.BuiltinImporter'&gt;, 
'__builtins__': &lt;module 'builtins' (built-in)&gt;, '__doc__': None, '__name__': '__main__'}

We can see the random module that we have previously imported.

&gt;&gt;&gt; class Car:
...   pass
... 
&gt;&gt;&gt; def function():
...   pass
... 
&gt;&gt;&gt; for i in range(5):
...   print(i)
... 
0
1
2
3
4
&gt;&gt;&gt;

We can define our own classes, functions, or use control flow structures. 
We must not forget to indent the code. To finish each of these blocks of 
code, we type Enter key twice. 

&gt;&gt;&gt; import os
&gt;&gt;&gt; os.getcwd()
'/home/vronskij/programming/python'
&gt;&gt;&gt; os.system('ls')
command_line_arguments.py  read_input.py
0

Here we import the os module and interact with the operating system. 

Finally, we want to exit the interpreter. We can exit the interpreter in several ways:

- Ctrl+D

- quit()

We can also exit the interpreter programatically. 

&gt;&gt;&gt; raise SystemExit
$ 

or

&gt;&gt;&gt; import sys
&gt;&gt;&gt; sys.exit()
$

The interpreter is exited.

## The Zen of Python

The Zen of Python is a set of rules how to write good Python code.
It reflects somehow the philosophy of the language. 

&gt;&gt;&gt; import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!

The rules can be read by launching import this.

In this chapter we have looked at Python interactive interpreter. 

[Contents](..)  
[Previous](../python/)
[Next](../lexicalstructure/)