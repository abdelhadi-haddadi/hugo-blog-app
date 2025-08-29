+++
title = "Python argparse"
date = 2025-08-29T20:07:38.756+01:00
draft = false
description = "Python argparse tutorial shows how to parse arguments in Python with argparse module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python argparse

last modified September 24, 2024

In this article we show how to parse command line arguments in Python with
argparse module.

## Python argparse

The argparse module makes it easy to write user-friendly
command-line interfaces. It parses the defined arguments from the
sys.argv. 

The argparse module also automatically generates help and usage
messages, and issues errors when users give the program invalid arguments.

The argparse is a standard module; we do not need to install it.

A parser is created with ArgumentParser and a new parameter is 
added with add_argument. Arguments can be optional, required, or 
positional.

## Optional argument

The following example creates a simple argument parser.

optional_arg.py
  

#!/usr/bin/python

import argparse

# help flag provides flag help
# store_true actions stores argument as True

parser = argparse.ArgumentParser()
   
parser.add_argument('-o', '--output', action='store_true', 
    help="shows output")

args = parser.parse_args()

if args.output:
    print("This is some output")

The example adds one argument having two options: a short -o and 
a long --ouput. These are optional arguments.

import argparse

The module is imported.

parser.add_argument('-o', '--output', action='store_true', 
    help="shows output")

An argument is added with add_argument. The action
set to store_true will store the argument as True, if present.
The help option gives argument help.

args = parser.parse_args()

The arguments are parsed with parse_args. The parsed arguments are
present as object attributes. In our case, there will be
args.output attribute.

if args.output:
    print("This is some output")

If the argument is present, we show some output.

$ optional_arg.py -o
This is some output
$ optional_arg.py --output
This is some output

We run the program with the -o and --output.

$ optional_arg.py --help
usage: optional_arg.py [-h] [-o]

optional arguments:
    -h, --help    show this help message and exit
    -o, --output  shows output

We can show the program help.

## Required argument

An argument is made required with the required option.

required_arg.py
  

#!/usr/bin/python

import argparse

# required arg

parser = argparse.ArgumentParser()
   
parser.add_argument('--name', required=True)

args = parser.parse_args()

print(f'Hello {args.name}')

The example must have the name option specified; otherwise
it fails.

$ required_arg.py --name Peter
Hello Peter

$ required_arg.py
usage: required_arg.py [-h] --name NAME
required_arg.py: error: the following arguments are required: --name

## Positional arguments

The following example works with positional arguments. They are created with
add_argument.

positional_arg.py
  

#!/usr/bin/python

import argparse

# positional args

parser = argparse.ArgumentParser()
   
parser.add_argument('name')
parser.add_argument('age')

args = parser.parse_args()

print(f'{args.name} is {args.age} years old')

The example expects two positional arguments: name and age.

parser.add_argument('name')
parser.add_argument('age')

Positional arguments are created without the dash prefix characters.

$ positional_arg.py Peter 23
Peter is 23 years old

## The dest option

The dest option of the add_argument gives 
a name to the argument. If not given, it is inferred from the option.

dest.py
  

#!/usr/bin/python

import argparse
import datetime

# dest gives a different name to a flag

parser = argparse.ArgumentParser()
   
parser.add_argument('-n', dest='now', action='store_true', help="shows now")

args = parser.parse_args()

# we can refer to the flag
# by a new name
if args.now:

    now = datetime.datetime.now()
    print(f"Now: {now}")

The program gives the now name to the -n argument.

$ ./dest.py -n
Now: 2022-08-20 09:42:32.195881

## The type argument

The type argument determines the argument type.

rand_int.py
  

#!/usr/bin/python

import argparse
import random

# type determines the type of the argument

parser = argparse.ArgumentParser()
   
parser.add_argument('-n', type=int, required=True, 
    help="define the number of random integers")
args = parser.parse_args()

n = args.n

for i in range(n):
    print(random.randint(-100, 100))

The program shows n random integers from -100 to 100. 

parser.add_argument('-n', type=int, required=True, 
    help="define the number of random integers")

The -n option expects integer value and it is 
required.

$ rand_int.py -n 3
92
-61
-61

## The default option

The default option specifies the default value, 
if the value is not given.

power.py
  

#!/usr/bin/python

import argparse

# required defines a mandatory argument 
# default defines a default value if not specified

parser = argparse.ArgumentParser()

parser.add_argument('-b', type=int, required=True, help="defines the base value")
parser.add_argument('-e', type=int, default=2, help="defines the exponent value")
args = parser.parse_args()

val = 1

base = args.b
exp = args.e

for i in range(exp):
    val *= base

print(val)

The example computes exponentiation. The exponent value is not required; 
if not given, the default will be 2.

$ power.py -b 3
9
$ power.py -b 3 -e 3
27

## The metavar option

The metavar option gives a name to the expected value in error and
help outputs.

metavar.py
  

#!/usr/bin/python

import argparse

# metavar gives name to the expected value 
# in error and help outputs

parser = argparse.ArgumentParser()
   
parser.add_argument('-v', type=int, required=True, metavar='value', 
    help="computes cube for the given value")
args = parser.parse_args()

print(args)

val = args.v

print(val * val * val)

The example names the expected value value. The default 
name is V.

$ metavar.py -h
usage: metavar.py [-h] -v value

optional arguments:
  -h, --help  show this help message and exit
  -v value    computes cube for the given value

The given name is shown in the help output.

## The append action

The append action allows to group repeating options.

appending.py
  

#!/usr/bin/python

import argparse

# append action allows to group repeating
# options

parser = argparse.ArgumentParser()
   
parser.add_argument('-n', '--name', dest='names', action='append', 
    help="provides names to greet")

args = parser.parse_args()

names = args.names

for name in names:
    print(f'Hello {name}!')

The example produces greeting messages to all names specified with the 
n or name options; they can be repeated multipile
times.

$ appending.py -n Peter -n Lucy --name Jane
Hello Peter!
Hello Lucy!
Hello Jane!

## The nargs option

The nargs specifies the number of command-line arguments that
should be consumed.

charseq.py
  

#!/usr/bin/python

import argparse
import sys

# nargs sets the required number of argument values
# metavar gives name to argument values in error and help output

parser = argparse.ArgumentParser()
parser.add_argument('chars', type=str, nargs=2, metavar='c',
                    help='starting and ending character')

args = parser.parse_args()

try:
    v1 = ord(args.chars[0])
    v2 = ord(args.chars[1])

except TypeError as e:

    print('Error: arguments must be characters')
    parser.print_help()
    sys.exit(1)

if v1 &gt; v2:
    print('first letter must precede the second in alphabet')
    parser.print_help()
    sys.exit(1)

The example shows a sequence of characters from character one to character two.
It expects two arguments.

parser.add_argument('chars', type=str, nargs=2, metavar='c',
    help='starting and ending character')

With nargs=2 we specify that we expect two arguments.

$ charseq.py e k
e f g h i j k

The program shows a sequence of characters from e to k.

Variable number of arguments can be set with the * character.

var_args.py
  

#!/usr/bin/python

import argparse

# * nargs expects 0 or more arguments

parser = argparse.ArgumentParser()
parser.add_argument('num', type=int, nargs='*')
args = parser.parse_args()

print(f"The sum of values is {sum(args.num)}")

The example computes the sum of values; we can specify 
variable number of arguments to the program.

$ var_args.py 1 2 3 4 5
The sum of values is 15

## The choices option

The choices option limits arguments to the given list.

mytime.py
  

#!/usr/bin/python

import argparse
import datetime
import time

# choices limits argument values to the 
# given list

parser = argparse.ArgumentParser()

parser.add_argument('--now', dest='format', choices=['std', 'iso', 'unix', 'tz'],
                    help="shows datetime in given format")

args = parser.parse_args()
fmt = args.format

if fmt == 'std':
    print(datetime.date.today())
elif fmt == 'iso':
    print(datetime.datetime.now().isoformat())
elif fmt == 'unix':
    print(time.time())
elif fmt == 'tz':
    print(datetime.datetime.now(datetime.timezone.utc))

In the example, the now option can accept the following 
values: std, iso, unix, or tz.

$ ./mytime.py --now iso
2022-08-20T09:44:22.437880
$ ./mytime.py --now unix
1660981466.8261166

## Head example

The following example mimics the Linux head command. It shows the n 
lines of a text from the beginning of the file.    

words.txt
  

sky
top
forest
wood
lake
wood

For the example, we have this small test file.

head.py
  

#!/usr/bin/python

import argparse
from pathlib import Path

# head command
# working with positional arguments

parser = argparse.ArgumentParser()
   
parser.add_argument('f', type=str, help='file name')
parser.add_argument('n', type=int, help='show n lines from the top')

args = parser.parse_args()

filename = args.f

lines = Path(filename).read_text().splitlines()

for line in lines[:args.n]:
    print(line) 

The example has two options: f for a file name and 
-n for the number of lines to show.

$ head.py words.txt 3
sky
top
forest

## Mutually exclusive options

The add_mutually_exclusive_group creates a group of options that 
are mutually exclusive.

The following program lists running processes. It uses the psutil
library to list the processes and the rich library to output the 
data in a table.

process.py
  

import psutil
import argparse
from datetime import datetime
from rich import box
from rich.console import Console
from rich.table import Table
from datetime import date

def parse_arguments():

    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('-a', '--all', action='store_true',
                       help='show all processes')
    group.add_argument('-n', '--name', help='show info about process name')

    args = parser.parse_args()
    return args.all, args.name

def list_process(name):

    now = f'{date.today()}'
    table = Table(title=f'Process', box=box.MINIMAL,
                  caption=now, caption_justify='left')
    table.add_column('id', style='cyan')
    table.add_column('process name', style='grey69')
    table.add_column('username')
    table.add_column('create time', style='blue')
    table.add_column('memory', style='green')

    process_count = 0

    for p in psutil.process_iter():

        if name in p.name().lower():
            ctime = datetime.fromtimestamp(p.create_time())
            memory_percent = p.memory_percent()
            table.add_row(f'{p.pid}', p.name(), p.username(),
                          ctime.isoformat(), f'{memory_percent:.2f}')
            process_count += 1

    if process_count &gt; 0:

        console = Console()
        console.print(table, justify='center')
    else:

        print('no such process found')

def list_all_processes():

    now = f'{date.today()}'
    table = Table(title='Processes', box=box.MINIMAL,
                  caption=now, caption_justify='left')
    table.add_column('id', style='cyan')
    table.add_column('process name', style='grey69')

    pnames = []
    for p in psutil.process_iter():
        
        pnames.append(p.name())
        table.add_row(f'[bold]{p.pid}', f'[bold]{p.name()}')

    console = Console()
    console.print(table, justify='center')

    print(len(pnames), 'processes')
    print(len(set(pnames)), 'apps')

all_f, name = parse_arguments()

if all_f:
    list_all_processes()
elif name:
    list_process(name)

The program provides information about running processes. Depending on the 
provided option, it either lists all running processes or provides more 
information about a specific one.

parser = argparse.ArgumentParser()
group = parser.add_mutually_exclusive_group(required=True)
group.add_argument('-a', '--all', action='store_true',
                    help='show all processes')
group.add_argument('-n', '--name', help='show info about process name')

The -a and -n options are mutually exclusive; either
we list all processes or only a specific process.

## Source

[Python argparse - language reference](https://docs.python.org/3/library/argparse.html)

In this article we have worked with Python argparse module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).