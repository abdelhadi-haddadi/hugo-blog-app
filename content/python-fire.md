+++
title = "Python Fire"
date = 2025-08-29T20:08:30.648+01:00
draft = false
description = "Python Fire tutorial shows how to create command-line interfaces (CLIs) in Python using the Fire module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Fire

last modified February 22, 2025

In this article, we show how to use the Fire module to create command-line
interfaces (CLIs) in Python.

Fire is a Python library that automatically generates command-line interfaces
(CLIs) from any Python object, including functions, classes, and modules.

With Fire, you can turn any Python component into a CLI with minimal effort.
This makes it an excellent tool for automating the creation of CLIs for your
scripts, libraries, and applications.

## Simple CLI

The first example demonstrates how to create a simple CLI using Fire.

main.py
  

import fire

def greet(name="guest"):
    return f"Hello, {name}!"

if __name__ == '__main__':
    fire.Fire(greet)

In this program, we define a simple function greet that takes an
optional argument name. Fire automatically generates a CLI for this
function.

import fire

We import the Fire module.

def greet(name="guest"):
    return f"Hello, {name}!"

This is a simple function that greets the user. The name parameter
has a default value of "World".

if __name__ == '__main__':
    fire.Fire(greet)

We use fire.Fire to turn the greet function into a CLI.
When the script is run, Fire automatically generates a CLI based on the function.

$ python main.py --name=Alice
Hello, Alice!
$ python main.py
Hello, guest!

We run the script with and without the --name argument.

## CLI with a class

In the next example, we create a CLI using a class.

main.py
  

import fire

class Calculator:

    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

    def multiply(self, a, b):
        return a * b

    def divide(self, a, b):
        return a / b

if __name__ == '__main__':
    fire.Fire(Calculator)

In this program, we define a Calculator class with four methods:
add, subtract, multiply, and
divide. Fire generates a CLI for the class, allowing us to call
these methods from the command line.

class Calculator:

    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

    def multiply(self, a, b):
        return a * b

    def divide(self, a, b):
        return a / b

This is the Calculator class with four arithmetic methods.

if __name__ == '__main__':
    fire.Fire(Calculator)

We use fire.Fire to turn the Calculator class into a
CLI. Fire automatically generates commands for each method in the class.

We run the script with different commands and arguments to perform arithmetic
operations.

## Creating nested commands

Fire also supports nested commands, allowing you to create more complex CLIs.

main.py
  

import fire

class Math:
    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

class String:
    def concat(self, a, b):
        return a + b

    def repeat(self, a, times):
        return a * times

class CLI:
    def __init__(self):
        self.math = Math()
        self.string = String()

if __name__ == '__main__':
    fire.Fire(CLI)

In this program, we define two classes, Math and String,
each with their own methods. We then create a CLI class that
instantiates these classes as attributes. Fire generates a CLI with nested
commands for each class.

class Math:
    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

class String:
    def concat(self, a, b):
        return a + b

    def repeat(self, a, times):
        return a * times

These are the Math and String classes with their
respective methods.

class CLI:
    def __init__(self):
        self.math = Math()
        self.string = String()

The CLI class instantiates the Math and
String classes as attributes.

if __name__ == '__main__':
    fire.Fire(CLI)

We use fire.Fire to turn the CLI class into a CLI.
Fire generates nested commands for the math and string
attributes.

$ python main.py math add 3 5  
8
$ python main.py string repeat falcon 3
falconfalconfalcon

We run the script with nested commands to perform operations from the
Math and String classes.

## CLI from dictionary

It is possible to derive commands from a dictionary.

main.py
  

import fire

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

commands = {
    'add': add,
    'multiply': multiply,
}

if __name__ == '__main__':
    fire.Fire(commands)

We define two functions. The functions are mapped to commands via a dictionary.

## Variable number of arguments

When we define a function with a parameter preceded by an asterisk (*), such as
*elements, it means that the function can accept any number of
positional arguments, which are then packed into a tuple.

main.py
  

import fire

def sort_elements(*elements):
    """Sort the given elements."""
    sorted_elements = sorted(elements)
    return sorted_elements

def uppercase_elements(*elements):
    """Convert the given elements to uppercase."""
    uppercased_elements = [element.upper() for element in elements]
    return uppercased_elements

commands = {
    'sort': sort_elements,
    'upper': uppercase_elements,
}

if __name__ == '__main__':
    fire.Fire(commands)

The program has two functions to sort and uppercase its elements.

$ py main.py sort war atom sky blue say pine 
atom
blue
pine
say
sky
war
$ python main.py upper war atom sky blue say pine
WAR
ATOM
SKY
BLUE
SAY
PINE

## Source

[Python Fire guide](https://google.github.io/python-fire/guide/)

In this article, we have worked with the Python Fire module to create
command-line interfaces (CLIs) in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).