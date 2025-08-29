+++
title = "Python lambda functions"
date = 2025-08-29T20:08:46.502+01:00
draft = false
description = "Python lambda function tutorial shows how to create anonymous functions in Python with lambda keyword."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python lambda functions

last modified January 29, 2024

In this article we shows how to create anonymous functions in Python. Anonymous
functions in Python are created with lambda keyword.

## Python lambda function

Python lambda functions, also known as anonymous functions, are inline functions
that do not have a name. They are created with the  lambda keyword.
This is part of the functional paradigm built-in Python.

Python lambda functions are restricted to a single expression. They can be used
wherever normal functions can be used.

## Python lambda syntax

Python lambda has the following syntax:

z = lambda x: x * y

The statement creates an anonymous function with the lambda
keyword. The function multiplies two values. The x is a parameter that is passed
to the lambda function. The parameter is followed by a colon character. The code
next to the colon is the expression that is executed when the lambda function is
called. The lambda function is assigned to the z variable.

## Python lambda function example

The following is a simple example demonstrating Python lambda function.

lambda_fun_simple.py
  

#!/usr/bin/python

def square(x):

    return x * x

sqr_fun = lambda x: x * x

print(square(3))
print(sqr_fun(4))

In the example, we have two functions that square a value.

def square(x):

    return x * x

This is a Python function defined with the def keyword.
The function's name is square.

sqr_fun = lambda x: x * x

Here we define an anonymous, inline function with lambda.
Note that the function does not have a name. The sqr_fun
is a name of the variable that holds the created lambda function.

$ ./lambda_fun_simple.py
9
16

## Python lambda function with map

Python lambda functions are useful with the map
function. We can create more concise code. Python map
is a built-in function which applies the given function on every item
of iterable(s) and returns an iterator object.

lambda_fun_map.py
  

#!/usr/bin/python

nums = [1, 2, 3, 4, 5, 6]

nums_squared = map(lambda x: x * x, nums)

for num in nums_squared:
    print(num)

The example creates a little inline function for the map
as a parameter. With the map function we apply the lambda
function on each element of the list.

$ ./lambda_fun_map.py
1
4
9
16
25
36

## Python lambda function with filter

Python lambda functions can be used with the filter function.
The filter function constructs a list from those elements of
the iterable for which the function returns true.

lambda_fun_filter.py
  

#!/usr/bin/python

nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

nums_filtered = list(filter(lambda x: x % 2, nums))

print(nums_filtered)

In the example, we filter the list of integers. The new list
contains only odd integers.

nums_filtered = list(filter(lambda x: x % 2, nums))

The first parameter of the filter is the function
which processes the list elements. The lambda function has
the x % 2 expression, which returns true for odd
values.

$ ./lambda_fun_filter.py
[1, 3, 5, 7, 9, 11]

## Python lambda function with sort

Python lists have a built-in list.sort method that modifies the
list in-place. The method has a key parameter to specify a function to be called
on each list element prior to making comparisons. There we can use a lambda
function.

lambda_fun_sort.py
  

#!/usr/bin/python

users = [
  {'name': 'John Doe', 'date_of_birth': 1987},
  {'name': 'Jane Doe', 'date_of_birth': 1996},
  {'name': 'Robert Brown', 'date_of_birth': 1977},
  {'name': 'Lucia Smith', 'date_of_birth': 2002},
  {'name': 'Patrick Dempsey', 'date_of_birth': 1994}
]

users.sort(reverse=True, key=lambda e: e['date_of_birth'])

for user in users:
    print(user)

We have a list of user dictionaries. With the lambda function,
we sort the users by their date of birth in the reverse order.

$ ./lambda_fun_sort.py
{'name': 'Lucia Smith', 'date_of_birth': 2002}
{'name': 'Jane Doe', 'date_of_birth': 1996}
{'name': 'Patrick Dempsey', 'date_of_birth': 1994}
{'name': 'John Doe', 'date_of_birth': 1987}
{'name': 'Robert Brown', 'date_of_birth': 1977}

## Python lambda function with min and max

The next example uses the built-in min and max
functions with lambda.

mmfun.py
  

#!/usr/bin/python

from dataclasses import dataclass

@dataclass(frozen=True)
class Car:
    name: str
    price: int

cars = [
    Car("Audi", 52642), Car("Mercedes", 57127), Car("Skoda", 9000),
    Car("Volvo", 29000), Car("Bentley", 350000), Car("Citroen", 21000),
    Car("Hummer", 41400), Car("Volkswagen", 21601)
]

n = min(cars, key=lambda c: c.price)
print(n)

n = max(cars, key=lambda c: c.price)
print(n)

In the example, we have a list of car objects. We find out the cheapest and
the most expensive cars.

n = min(cars, key=lambda c: c.price)
print(n)

n = max(cars, key=lambda c: c.price)
print(n)

The functions take the lambda function as the second parameter. The lambdas
return the attribute of the object on which the min, max
functions operate.

$ ./mmfun.py
Car(name='Skoda', price=9000)
Car(name='Bentley', price=350000)

## Python lambda with Tkinter

Python lambda function can be used in GUI programming with Tkinter.
It allows to create small, inline functions for the command
parameter.

lambda_tkinter.py
  

#!/usr/bin/python

from tkinter import Tk, BOTH, messagebox
from tkinter.ttk import Frame, Button

class Example(Frame):

    def __init__(self, parent):
        Frame.__init__(self, parent)

        self.parent = parent

        self.initUI()

    def initUI(self):

        self.parent.title("Buttons")

        self.pack(fill=BOTH, expand=1)

        btn1 = Button(self, text="Button 1",
            command=lambda: self.onClick("Button 1"))
        btn1.pack(padx=5, pady=5)

        btn2 = Button(self, text="Button 2",
            command=lambda: self.onClick("Button 2"))
        btn2.pack(padx=5, pady=5)

        btn2 = Button(self, text="Button 3",
            command=lambda: self.onClick("Button 3"))
        btn2.pack(padx=5, pady=5)

    def onClick(self, text):

        messagebox.showinfo("Button label", text);

def main():

    root = Tk()
    root.geometry("250x150+300+300")
    app = Example(root)
    root.mainloop()

if __name__ == '__main__':
    main()

We have three buttons that share one callback. The lambda function allows us to
send specific data to the callback function. Each button displays its label in a
message box.

btn1 = Button(self, text="Button 1",
    command=lambda: self.onClick("Button 1"))

We pass an anonymous function to the command parameter.
We send the label of the button to the onClick callback.

## Source

[Python lambdas - language reference](https://docs.python.org/3/reference/expressions.html#lambda)

In this article we have worked with the Python lambda functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).