+++
title = "Python function"
date = 2025-08-29T20:08:34.000+01:00
draft = false
description = "Python function tutorial covers functions in Python. A function is a mapping of zero or more input parameters to zero or more output parameters."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python function

last modified January 29, 2024

In this article we cover functions in Python.

## Python function definition

A function is a mapping of zero or more input parameters to zero or more output
parameters.

The advantages of using functions are:

    - Code organization

    - Reducing duplication of code

    - Decomposing complex problems into simpler pieces

    - Improving clarity of the code

    - Reuse of code

    - Information hiding

Functions in Python are first-class citizens. It means that functions have equal
status with other objects in Python. Functions can be assigned to variables,
stored in collections, or passed as arguments. This brings additional flexibility
to the language.

## Python function types

There are two basic types of functions: built-in functions and user
defined functions. The built-in functions are part of the Python language;
for instance dir, len, or abs.
The user defined functions are functions created with the def keyword.

## Python creating functions

A function is created with the def keyword. The
statements in the block of the function must be indented.

def function():
    pass

The def keyword is followed by the function name with round
brackets and a colon. The indented statements form a *body* of the
function.

The function is later executed when needed. We say that we *call* the
function. If we call a function, the  statements inside the function body are
executed. They are not executed until the function is called.

myfunc()

To call a function, we specify the function name with the round brackets.

ret.py
  

#!/usr/bin/python

"""
The ret.py script shows how to work with
functions in Python.
Author: Jan Bodnar
ZetCode, 2024
"""

def show_module_name():

    print(__doc__)

def get_module_file():

    return __file__

a = show_module_name()
b = get_module_file()

print(a, b)

The string at the top of the script is called the documentation string. It
documents the current script. The file in which we put Python code is called a
*module*.

We define two functions. The first function prints the module documentation
string. The second returns the path of the module. Function may or may not
return a value. If a function does not return a value, it implicitly returns
None. The __doc__ and __file__ are
special state attributes. Note that there are two underscores on both sides of
the attribute.

$ ./ret.py

The ret.py script shows how to work with
functions in Python.
Author: Jan Bodnar
ZetCode, 2024

None C:/Users/Jano/PycharmProjects/Simple/simple.py

Definitions of functions must precede their usage. Otherwise the
interpreter will complain with a NameError.

func_prec.py
  

#!/usr/bin/python

# func_prec.py

def f1():
    print("f1()")

f1()
#f2()

def f2():
    print("f2()")

In the above example, we have two definitions of functions. One line is
commented. A function call cannot be ahead of its definition.

#f2()

def f2():
    print("f2()")

We can call the f2 only after its definition. Uncommenting
the line we get a NameError.

## Where to define functions

Functions can be defined inside modules, classs, or other functions. Functions
defined inside classe are called *member functions* or *methods*.

defining.py
  

#!/usr/bin/python

class Info:

    def say(self):
        print('This is Info class')

class Some:

    @staticmethod
    def f():
        print ("f() static method")

def f():
    print ("f() plain function")

def g():
    def f():
        print ("f() inner function")
    f()

i = Info()
i.say()

Some.f()
f()
g()

In this example we define an f function in different places.

class Info:

    def say(self):
        print('This is Info class')

We define a member function. This function is called on the object instance.

class Some:

    @staticmethod
    def f():
        print("f() method")

A static method is defined with a decorator in a Some class.
The method is calle on the class name.

def f():
    print("f() function")

The function is defined in a module. It is a plain function.

def g():
    def f():
        print("f() inner function")
    f()

Here the f function is defined inside another g
function. It is an inner function.

i = Info()
i.say()

We create an instance of the Info class. We call the
say method on the instance using the dot operator.

Some.f()

The static method is called by specifying the class name, the dot operator and
the function name with square brackets. 

f()
g()

Plain functions are called using their names and round brackets.

$ ./defining.py
This is Info class
f() static method
f() plain function
f() inner function

## Python functions are objects

Functions in Python are objects. They can be manipulated like other objects in
Python. Therefore functions are called first-class citizens. This is not true in
other OOP languages like Java or C#.

fun_obj.py
  

#!/usr/bin/python

def f():
    """This function prints a message """

    print("Today it is a cloudy day")

print(isinstance(f, object))
print(id(f))

print(f.__doc__)
print(f.__name__)

In this script we show that our function is an object, too.

def f():
    """This function prints a message """

    print("Today it is a cloudy day")

We define an f function. It prints a message to the console. It also
has a documentation string.

print(isinstance(f, object))

The isinstance function checks whether the f function
is an instance of the object. All objects in Python inherit
from this base entity.

print(id(f))

Each object in Python has a unique id. The id function returns
the object's id.

print(f.__doc__)
print(f.__name__)

Objects may have attributes; we print two attributes of the function: __doc__
and __name__.

$ ./fun_obj.py
True
140353774014536
This function prints a message
f

Functions can be stored in collections and passed to other functions.

fun_coll.py
  

#!/usr/bin/python

# fun_coll.py

def f():
    pass

def g():
    pass

def h(f):
    print(id(f))

a = (f, g, h)

for i in a:
    print(i)

h(f)
h(g)

We define three functions. We place them in a tuple and pass them to a function.

a = (f, g, h)

for i in a:
    print(i)

We place three function objects in a tuple and traverse it with a for loop.

h(f)
h(g)

We pass the f and g functions to the
h function.

$ ./fun_coll.py
&lt;function f at 0x0000015B998E9D08&gt;
&lt;function g at 0x0000015B998E9E18&gt;
&lt;function h at 0x0000015B998E9840&gt;
1492929912072
1492929912344

## Three kinds of functions in Python

Looking from a particular point of view, we can discern three kinds
of functions. Functions that are always available for usage, functions
that are contained within external modules, which must be imported and
functions defined by a programmer with the def keyword.

three_kinds.py
  

#!/usr/bin/python

from math import sqrt

def cube(x):
    return x * x * x

print(abs(-1))
print(cube(9))
print(sqrt(81))

Three kinds of functions are present in the above code.

from math import sqrt

The sqrt function is imported from the math module.

def cube(x):
    return x * x * x

The cube() function is a custom defined function.

print(abs(-1))

The abs function is a built-in function readily
accessible. It is part of the core of the language.

## Python return keyword

A function is created to do a specific task. Often there
is a result from such a task. The return keyword is
used to return values from a function. A function may or may not return a value.
If a function does not have a return keyword, it will send None.

returning.py
  

#!/usr/bin/python

# returning.py

def show_message(msg):
    print(msg)

def cube(x):
    return x * x * x

x = cube(3)
print(x)

show_message("Computation finished.")
print(show_message("Ready."))

We have two functions defined. One uses the return
keyword, the other one does not.

def show_message(msg):
    print(msg)

The show_message function does not return explicitly a value. It
shows a message on the console.

def cube(x):
    return x * x * x

The cube functions computes an expression and returns its result
with the return keyword.

x = cube(3)

In this line we call the cube function. The result of the
computation of the cube function is returned and assigned
to the x variable. It holds the result value now.

show_message("Computation finished.")

We call the show_message function with a message as a parameter.
The message is printed to the console. We do not expect a value from
this function.

print(show_message("Ready."))

This code produces two lines. One is a message printed by the show_message
function. The other is the None value, which is implicitly sent
by functions without the return statement.

$ ./returning.py
27
Computation finished.
Ready.
None

We can send more that one value from a function. The objects after
the return keyword are separated by commas.

returning2.py
  

#!/usr/bin/python

# returning2.py

n = [1, 2, 3, 4, 5]

def stats(x):

    _mx = max(x)
    _mn = min(x)
    _ln = len(x)
    _sm = sum(x)

    return _mx, _mn, _ln, _sm

mx, mn, ln, sm = stats(n)
print(stats(n))

print(mx, mn, ln, sm)

There is a definition of a stats function. This function
returns four values.

return _mx, _mn, _ln, _sm

The return keyword sends back four numbers. The
numbers are separated by a comma character. In fact, we have sent
a tuple containing these four values. We could also return a list
instead of a tuple.

mx, mn, ln, sm = stats(n)

The returned values are assigned to local variables.

$ ./returning2.py
(5, 1, 5, 15)
5 1 5 15

## Python function redefinition

Python is dynamic in nature. It is possible to redefine an already
defined function.

redefinition.py
  

#!/usr/bin/python

# redefinition.py

from time import gmtime, strftime

def show_message(msg):
    print(msg)

show_message("Ready.")

def show_message(msg):
    print(strftime("%H:%M:%S", gmtime()))
    print(msg)

show_message("Processing.")

We define a show_message function. Later we provide a new
definition of the same function.

from time import gmtime, strftime

From the time module we import two functions which are used to
compute the current time.

def show_message(msg):
    print(msg)

This is the first definition of a function. It only prints a message
to the console.

def show_message(msg):
    print(strftime("%H:%M:%S", gmtime()))
    print(msg)

Later in the source code, we set up a new definition of the showMessage
function. The message is preceded with a timestamp.

$ ./redefinition.py
Ready.
23:49:33 Processing.

## Python function arguments

Most functions accept arguments. Arguments are values that are sent to
the function. The functions process the values and optionally return
some value back.

fahrenheit.py
  

#!/usr/bin/python

def C2F(c):
    return c * 9/5 + 32

print(C2F(100))
print(C2F(0))
print(C2F(30))

In our example, we convert Celsius temperature to Fahrenheit.
The C2F function accepts one argument c, which is the
Celsius temperature.

$ ./fahrenheit.py
212
32
86

The arguments in Python functions may have implicit values. An implicit
value is used if no value is provided.

fun_implicit.py
  

#!/usr/bin/python

# fun_implicit.py

def power(x, y=2):

    r = 1

    for i in range(y):
        r = r * x

    return r

print(power(3))
print(power(3, 3))
print(power(5, 5))

Here we created a power function. The function has one argument with
an implicit value. We can call the function with
one or two arguments.

$ ./fun_implicit.py
9
27
3125

## Keyword function arguments

Python functions can specify their arguments with a keyword. This means that
when calling a function, we specify both a keyword and a value. When we have
multiple arguments and they are used without keywords, the order in which we
pass those arguments is crucial. If we expect a name, age, or sex in a function
without keywords, we cannot change their order. If we use keywords, we can.

fun_keywords.py
  

#!/usr/bin/python

def display(name, age, sex):

    print("Name: ", name)
    print("Age: ", age)
    print("Sex: ", sex)

display("Lary", 43, "M")
display("Joan", 24, "F")

In this example, the order in which we specify the arguments is important.
Otherwise, we get incorrect results.

$ ./fun_keywords.py
Name:  Lary
Age:  43
Sex:  M
Name:  Joan
Age:  24
Sex:  F

fun_keywords2.py
  

```
#!/usr/bin/python

def display(name, age, sex):

    print("Name: ", name)
    print("Age: ", age)
    print("Sex: ", sex)

display(age=43, name="Lary", sex="M")
display(name="Joan", age=24, sex="F")

```

Now we call the functions with their keywords. The order may be changed,
although it is not recommended to do so. Note that we cannot use a non-keyword
argument after a keyword argument. This would end in a syntax error.

display("Joan", sex="F", age=24)

This is a legal construct. A non-keyword argument may be
followed by keyword arguments.

display(age=24, name="Joan", "F")

This would end in a syntax error. A non-keyword argument
may not follow keyword arguments.

## Arbitrary number of function arguments

Functions in Python can accept arbitrary number of arguments.

arbitrary_args.py
  

#!/usr/bin/python

def do_sum(*args):
    """Function returns the sum
of all values"""

    r = 0

    for i in args:
        r += i

    return r

print(do_sum.__doc__)
print(do_sum(1, 2, 3))
print(do_sum(1, 2, 3, 4, 5))

We use the * operator to indicate that the function accepts
arbitrary number of arguments. The do_sum function returns the sum
of all arguments. The first string in the function body is called the function
documentation string. It is used to document the function. The string must be in
triple quotes.

$ ./arbitrary_args.py
Function returns the sum
of all values
6
15

We can also use the ** construct in our functions. In such a case,
the function will accept a dictionary. The dictionary has arbitrary length. We
can then normally parse the dictionary, as usual.

details.py
  

#!/usr/bin/python

# details.py

def display(**details):

    for i in details:
        print(f"{i}: {details[i]}")

display(name="Larry", age=43, sex="M")

This example demonstrates such a case. We can provide arbitrary number of
key-value arguments. The function will handle them all.

$ ./details.py
age: 43
name: Larry
sex: M

## Unpacking function return values

Unpacking is cutting an object (such as a list) into its elements. It is also
called destructuring. The _ operator is used to ignore the value. The * operator
eagerly takes all elements until the next argument.

unpacking_return_values.py
  

#!/usr/bin/python

def fn():
    return [1, 2, 3, 4, 5, 6]

a, b, c, d, e, f = fn()
print(a, b, c, d, e, f)

a, *mid, b = fn()
print(a, mid, b)

a, b, c, _, _, _ = fn()
print(a, b, c)

a, b, c, *d = fn()
print(a, b, c, d)

*a, b, c, d = fn()
print(a, b, c, d)

We have a function that returns a list of values. The values are unpacked into 
separate variables. 

a, b, c, d, e, f = fn()
print(a, b, c, d, e, f)

All the six values are unpacked into separate six variables.

a, *mid, b = fn()
print(a, mid, b)

With the star opertor, the mid variable takes all but the last
value.

a, b, c, _, _, _ = fn()
print(a, b, c)

We ignore the last three values with the _ operator.

a, b, c, *d = fn()
print(a, b, c, d)

Here, the d variable takes all the remaining values. It is a list.

*a, b, c, d = fn()
print(a, b, c, d)

The a variable takes the first three values. The rest is unpacked
into b, c, and d variables.

$ ./unpacking.py
1 2 3 4 5 6
1 [2, 3, 4, 5] 6
1 2 3
1 2 3 [4, 5, 6]
[1, 2, 3] 4 5 6

## Unpacking function arguments

We can unpack values into function arguments.

unpacking2.py
  

#!/usr/bin/python

def fn(a, b, c, d, e, f):
    print(a, b, c, d, e, f)

def fn2(a, b, c, *d):
    print(a, b, c, d)

def fn3(a, b, c, *d, e, f):
    print(a, b, c, d, e, f)

vals = [1, 2, 3, 4, 5, 6]

fn(*vals)
fn2(*vals)
fn3(*vals, e=7, f=8)

In the example, we unpack a list into function arguments.

fn(*vals)

With the star operator, we unpack the list elements into the function arguments.

def fn3(a, b, c, *d, e, f):
    print(a, b, c, d, e, f)
...
fn3(*vals, e=7, f=8)

Since the d argument is not the last one, we need to provide
additional keyworded arguments for the function.

$ ./unpacking2.py
1 2 3 4 5 6
1 2 3 (4, 5, 6)
1 2 3 (4, 5, 6) 7 8

## Python passing parameters by reference

Parameters to functions are passed by reference.
Some languages pass copies of the objects to functions.
Passing objects by reference has two important conclusions:
a) the process is faster than if copies of objects were passed;
b) mutable objects that are modified in functions are permanently
changed.

passing_by_reference.py
  

#!/usr/bin/python

n = [1, 2, 3, 4, 5]

print("Original list:", n)

def f(x):

    x.pop()
    x.pop()
    x.insert(0, 0)
    print("Inside f():", x)

f(n)

print("After function call:", n)

In our example, we pass a list of integers to a function. The object is modified
inside the body of the function. After calling the function, the original
object, the list of integers is modified.

def f(x):

    x.pop()
    x.pop()
    x.insert(0, 0)
    print("Inside f():", x)

In the body of the function we work with the original object.
Not with a copy of the object. In many programming languages,
we woud receive a copy of an object by default.

$ ./passing_by_reference.py
Original list: [1, 2, 3, 4, 5]
Inside f(): [0, 1, 2, 3]
After function call: [0, 1, 2, 3]

Once the list was modified it was modified for good.

## Python global and local variables

Next we talk about how variables are used in Python functions.

local_variable.py
  

#!/usr/bin/python

name = "Jack"

def f():
    name = "Robert"
    print("Within function", name)

print("Outside function", name)
f()

A variable defined in a function body has a *local* scope. It is
valid only within the body of the function.

$ ./local_variable.py
Outside function Jack
Within function Robert

global_variable.py
  

```
#!/usr/bin/python

name = "Jack"

def f():
    print("Within function", name)

print("Outside function", name)
f()

```

By default, we can get the contents of a *global variable* inside
the body of a function.

$ ./global_variable.py
Outside function Jack
Within function Jack

But if we want to change a global variable in a
function, we must use the global keyword.

global_variable2.py
  

#!/usr/bin/python

name = "Jack"

def f():

    global name
    name = "Robert"
    print("Within function", name)

print("Outside function", name)
f()
print("Outside function", name)

Now, we change the contents of a global name variable inside a function.

global name
name = "Robert"

Using the global keyword, we reference the variable
defined outside the body of the function. The variable is given a
new value.

$ ./global_variable2.py
Outside function Jack
Within function Robert
Outside function Robert

## Python anonymous functions

It is possible to create anonymous functions in Python. Anonymous
functions do not have a name. With the lambda keyword,
little anonymous functions can be created. Anonymous functions are
also called lambda functions by Python programmers. They are part
of the functional paradigm incorporated in Python.

Lambda functions are restricted to a single expression. They can be used
wherever normal functions can be used. There is a
[Python lambda functions](/python/lambda/)
tutorial on ZetCode.

lambda_fun.py
  

#!/usr/bin/python

y = 6

z = lambda x: x * y
print(z(8))

This is a small example of the lambda function.

z = lambda x: x * y

The lambda keyword creates an anonymous function. The x
is a parameter that is passed to the lambda function. The parameter is followed
by a colon character. The code next to the colon is the expression that is
executed, when the lambda function is called. The lambda function is assigned to
the z variable.

print(z(8))

The lambda function is executed. The number 8 is passed to the anonymous
function and it returns 48 as the result. Note that z is not
a name for this function. It is only a variable to which the anonymous function
was assigned.

$ ./lambda_fun.py
48

The lambda function can be used elegantly with other functional
parts of the Python language, like map or filter
functions.

lambda_fun2.py
  

#!/usr/bin/python

cs = [-10, 0, 15, 30, 40]

ft = map(lambda t: (9.0/5)*t + 32, cs)
print(list(ft))

In the example we have a list of Celsius temperatures. We create a new
list containing temperatures in Fahrenheit.

ft = map(lambda t: (9.0/5)*t + 32, cs)

The map function applies the anonymous function to each element of
the cs list. It returns an iterable of the computed Fahrenheit
temperatures.

$ ./lambda_fun2.py
[14.0, 32.0, 59.0, 86.0, 104.0]

## Source

[Python defining functions - language reference](https://docs.python.org/3/tutorial/controlflow.html#defining-functions)

In this article we covered Python functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).