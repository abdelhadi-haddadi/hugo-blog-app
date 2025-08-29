+++
title = "Python click"
date = 2025-08-29T20:07:48.764+01:00
draft = false
description = "Python click tutorial shows how to create command line interfaces with the click module. The click module is an alternative to the optparse and argparse modules."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python click

last modified January 29, 2024

Python click tutorial shows how to create command  line interfaces with the
click module.

## Python click

Python click module is used to create command-line (CLI)
applications. It is an easy-to-use  alternative to the standard optparse and
argparse modules. It allows arbitrary nesting  of commands,  automatic help page
generation, and supports lazy loading of subcommands at runtime.

The click module was created as a supporting library for the Flask
web framework.

The commands are basic building blocks of an application.  Click defines
commands through decorators. They are created with the
click.command decorator. Values  are passed to the commands via
options or arguments. Options are added with the click.option
decorator, arguments with the click.argument. Values in options 
follow the name of the option while arguments are taken positionally.

$ pip install -U click

We install the click module. For coloured output, we also need the 
colorama module.

## Python click simple example

The following is a trivial CLI example.

simple.py
  

import click

@click.command()
def hello():
    click.echo('Hello there')

if __name__ == '__main__':
    hello()

The example creates a command that outputs a message. 

@click.command()
def hello():
    click.echo('Hello there')

Click uses the echo instead of the print.
It increases compatibility and adds colouring support. 

$ ./simple.py 
Hello there
$ ./simple.py --help
Usage: simple.py [OPTIONS]

Options:
  --help  Show this message and exit.

Click creates some help messages out of the box.

## Python click default argument

Arguments are added with the click.argument decorator. The
arguments may have default values.

argument.py
  

#!/usr/bin/python

import click

@click.command()
@click.argument('name', default='guest')
def hello(name):
    click.echo(f'Hello {name}')

 
if __name__ == '__main__':
    hello()

The example builds a message with the given argument value. If there is no
argument, the default guest is used. The argument is passed to the function as a
variable.

$ ./argument.py Peter
Hello Peter
$ ./argument.py 
Hello guest

We run the program with and without an argument.

## Python click argument types

We can specify the argument types, including int, float, str, bool, choice and
various ranges. The default one is str.

argument_type.py
  

#!/usr/bin/python

import click

@click.command()
@click.argument('name', default='guest')
@click.argument('age', type=int)
def hello(name, age):
    click.echo(f'{name} is {age} years old')

 
if __name__ == '__main__':
    hello()

In the example, we have two arguments: name and age. They are generated 
positionally, the first is name, the second is age. 

$ ./argument_type.py Peter 34
Peter is 34 years old

## Python click variable number of arguments

With the nargs option, we can set that an argument 
takes multiple values. For the -1 value, the argument may 
take variable number of values.

variable_args.py
  

#!/usr/bin/python

import click
from operator import mul
from functools import reduce

@click.command()
@click.argument('vals', type=int, nargs=-1)
def process(vals):

    print(f'The sum is {sum(vals)}')
    print(f'The product is {reduce(mul, vals, 1)}')

if __name__ == '__main__':
    process()

The example creates a process command, which may take variable number of integer
values in the vals argument. The command calculates the sum and the product 
of the values.

$ ./variable_args.py 1 2 3 4 5
The sum is 15
The product is 120

## Python click simple option

Options are added to commands with the click.option decorator.
Option names are prefixed with one or two dashes.

dots.py
  

#!/usr/bin/python

import click

@click.command()
@click.option('--n', type=int, default=1)
def dots(n):
    click.echo('.' * n)

if __name__ == '__main__':
    dots()

In the example, we have the --n option which takes 
a number. The number determines how many times the dot is printed to the 
console.

$ ./dots.py --n 17
.................

We have outputted seventeen dots.

## Python click option names

The options names start with either a single dash or two dashes. 
Command line programs often take both short and long options. 
Click derives the name of the option from the long name, if both 
are used. 

option_names.py
  

#!/usr/bin/python

import click

@click.command()
@click.option('-s', '--string')
def output(string):
    click.echo(string)

if __name__ == '__main__':
    output()

In the example, we create an option with both short and long names.
The name of the variable passed to the function is string, derived
from the longer option name.

$ ./option_names.py -s sky
sky
$ ./option_names.py --string cloud
cloud

We run the program using both option names.

## Python click prompt for value

We can ask a user to provide a value interactively. 

prompt.py
  

#!/usr/bin/python

import click

@click.command()
@click.option("--name", prompt="Your name", help="Provide your name")
def hello(name):
    click.echo(f"Hello, {name}")

if __name__ == '__main__':
    hello()

The example asks the user for his name.

$ ./prompt.py 
Your name: Peter
Hello, Peter

## Python click colour output

With the secho method, we can output the text in colour. We can
also use styles such as bold and underline. The colour values are limited to a
predefined set of values. For colour output we need to have installed the
colorama module. 

coloured.py
  

#!/usr/bin/python

import click

@click.command()
def coloured():
    click.secho('Hello there', fg="blue", bold=True)

if __name__ == '__main__':
    coloured()

The example outputs the text in bold blue colour.

## Python click flags

Flags are boolean options that can be enabled or disabled.  
This can be accomplished by defining two flags in one go separated by a slash
(/) for enabling or disabling the option or with the 
is_flag parameter.

flags.py
  

#!/usr/bin/python

import click

@click.command()
@click.option('--blue', is_flag=True, help='message in blue color')
def hello(blue):

    if blue:
        click.secho('Hello there', fg='blue')
    else:
        click.secho('Hello there')

 
if __name__ == '__main__':
    hello()

In the example, we define a --blue boolean option with the 
is_flag parameter. If set, it prints the message in blue 
colour.

flags2.py
  

#!/usr/bin/python

import click

@click.command()
@click.argument('word')
@click.option('--shout/--no-shout', default=False)
def output(word, shout):
    if shout:
        click.echo(word.upper())
    else:
        click.echo(word)

if __name__ == '__main__':
    output()

In the second case, we define --shout and --no-shout
flags. If the --shout flag is set, the specified argument is 
outputted in uppercase.

$ ./flags2.py --shout sky
SKY
$ ./flags2.py --no-shout sky
sky

## Python click environment variables

Values can be pulled from environment variables.

env_var.py
  

#!/usr/bin/python

import click
import os

@click.argument('mydir', envvar='MYDIR', type=click.Path(exists=True))
@click.command()
def dolist(mydir):

    click.echo(os.listdir(mydir))

if __name__ == '__main__':
    dolist()

The example prints the content of the directory specified in the
MYDIR environment variable.

export MYDIR=~/Documents; ./env_var.py 
['test.py', 'words2.txt', 'test.php', 'words2.txt~', 'testing', 'todo.txt', 
'tasks', 'links.txt', 'progs']

## Python click option tuples

We can have multi-value options which become Python tuples.

multi_val.py
  

#!/usr/bin/python

import click

@click.command()
@click.option('--data', required=True, type=(str, int))
def output(data):
    click.echo(f'name={data[0]} age={data[1]}')

if __name__ == '__main__':
    output()

In the example, the --data option takes two values that 
become a Python tuple. The values are used to build a message.

$ ./multi_val.py --data Peter 23
name=Peter age=23

## Specifying options multiple times

Option values can be provided multiple times and have all the values recorded.
The values are stored in a Python tuple.

multiples.py
  

#!/usr/bin/python

import click

@click.command()
@click.option('--word', '-w', multiple=True)
def words(word):
    click.echo('\n'.join(word))

if __name__ == '__main__':
    words()

In the example, we can specify the --word/-w options
multiple times.

$ ./multiples.py -w sky --word forest --word rock -w cloud
sky
forest
rock
cloud

## The click.File type

The click.File type declares a parameter to be a file for reading
or writing. The file is automatically closed once the context tears down (after
the command finished working).

words.txt
  

sky
cloud
water
forest
rock
moon
falcon
lake

We work with this text file.

head.py
  

#!/usr/bin/python

import click

@click.command()
@click.argument('file_name', type=click.File('r'))
@click.argument('lines', default=-1, type=int)
def head(file_name, lines):

    counter = 0

    for line in file_name:

        print(line.strip())
        counter += 1

        if counter == lines: 
            break

if __name__ == '__main__':
    head()

We create an equivalent of the Linux head command. 

$ ./head.py words.txt 4
sky
cloud
water
forest

We show the first four lines of the file.

## The click.Path type

The click.Path type is similar to the click.File type.
Instead of returning an open file handle it returns just the filename.

head2.py
  

#!/usr/bin/python

import click

@click.command()
@click.argument('file_name', type=click.Path(exists=True))
@click.argument('lines', default=-1, type=int)
def head(file_name, lines):

    with open(file_name, 'r') as f:

        counter = 0

        for line in file_name:

            print(line.strip())
            counter += 1

            if counter == lines: 
                break

if __name__ == '__main__':
    head()

This is the head command created with the click.Path type.

## Python click command groups

Commands can be added into groups. Groups are created with 
the @click.group decorator.

groups.py
  

#!/usr/bin/python

import click

@click.group()
def messages():
  pass

@click.command()
def generic():
    click.echo('Hello there')

@click.command()
def welcome():
    click.echo('Welcome')

messages.add_command(generic)
messages.add_command(welcome)

if __name__ == '__main__':
    messages()

The example defines two groups.

$ ./groups.py --help
Usage: groups.py [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  generic
  welcome

The help message shows two commands.

groups2.py
  

#!/usr/bin/python

import click

@click.group()
def cli():
  pass

@cli.command(name='gen')
def generic():
    click.echo('Hello there')

@cli.command(name='wel')
def welcome():
    click.echo('Welcome')

if __name__ == '__main__':
    cli()

This is an alternative syntax for creating a command group. The commands take
the name of the function but can be given another name with the
name option.

$ ./groups2.py gen
Hello there
$ ./groups2.py wel
Welcome

## Source

[Python click documentation](https://click.palletsprojects.com/en/8.1.x/)

In this article we have worked with Python click module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).