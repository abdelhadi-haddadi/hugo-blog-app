+++
title = "Files in Python"
date = 2025-08-29T20:03:05.514+01:00
draft = false
description = "Files in Python chapter of the Python tutorial shows with numerous examples how to work with files, standard input, and standard output in Python."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../functions/)
[Next](../oop/)

# Files in Python

last modified October 18, 2023

In this part of the Python programming tutorial, we work with files and standard
input and output. We show how to read from a file and write to a file. We
briefly introduce the pickle module.

Everything in Python is an object. Everything in UNIX is a file.

## Python open function

The open function is used to open files in Python.

open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None)

The file is the name of the file to be opened. The mode indicates how the
file is going to be opened: for reading, writing, or appending.
The buffering is an optional integer used to set the buffering policy.
The encoding is the name of the encoding used to decode or encode the file.
The errors is an optional string that specifies how encoding and decoding
errors are to be handled. The newline controls the behaviour of the newline character.
closefd and opener are some low-level parameters; they are rarely used.-->

The file modes are:

Mode
Meaning

'r'Reading (default)

'w'Writing

'a'Appending

'b'Binary data

'+'Updating (reading and writing)

'x'Exclusive creation, failing if file exists

In the following examples, we use this text file.

works.txt
  

Lost Illusions
Beatrix
Honorine
The firm of Nucingen
Old Goriot
Colonel Chabert
Cousin Bette

## Python with statement

Working with files leads often to errors; and therefore, we have to manage possible exceptions.
In addition, the file object must be closed when the file object is not needed anymore.
The with statement simplifies  exception handling by encapsulating common
preparation and cleanup tasks. It also automatically closes the opened file.

read_width.py
  

#!/usr/bin/env python

# read_width.py

with open('works.txt', 'r') as f:

    contents = f.read()
    print(contents)

The example reads the contents of the works.txt file.

with open('works.txt', 'r') as f:

With the open function, we open the works.txt file
for reading. The file object is aliased as f. The with
statement takes care of exceptions and the closing of the opened file.

contents = f.read()

The read method reads all the content until the EOF. It returns
the data as one big string.

## Python read function

The read function reads the specified number of bytes from
the file. If the number of bytes is not specified, it reads the whole file.

read_data.py
  

#!/usr/bin/env python

# read_data.py

import sys

with open('works.txt', 'r') as f:

    print(f.read(5))
    print(f.read(9))

The code example read five letters from the file and prints them to the
console. Then it reads and prints another nine letters. The second operation
continues reading from the position where the first has ended.

$ ./read_data.py
Lost
Illusions

## Python file positions

A file position is a place in the file from where we read data.
The tell method gives the current position in a file
and the seek method moves the position in a file.

file_positions.py
  

#!/usr/bin/env python

# file_positions.py

with open('works.txt', 'r') as f:

    print(f.read(14))
    print(f"The current file position is {f.tell()}")

    f.seek(0, 0)

    print(f.read(30))

In the example, we read 14 bytes, then we determine and print
the current file position. We move the current file position
to the beginning with seek and read another 30 bytes.

$ ./file_positions.py
Lost Illusions
The current file position is 14
Lost Illusions
Beatrix
Honorin

## Python readline method

The readline method reads a line from the file.
A trailing newline character is kept in the string. When
the function reaches the end of file, it returns an empty string.

readbyline.py
  

#!/usr/bin/env python

# readbyline.py

with open('works.txt', 'r') as f:

    while True:

        line = f.readline()

        if not line:
            break

        else:
            print(line.rstrip())

With the readline method and a while loop,
we read all the lines from the file.

while True:

We start and endless loop; therefore, we must later jump of
the loop with a break statement.

line = f.readline()

A line is read from the file.

if not line:
    break

else:
    print(line.rstrip())

We call the break statement if we reach the EOF; otherwise,
we print the line to the console while stripping the newline character at
the end of the line.

In the following example, we use a more convenient way of
going through the lines of the file.

read_file.py
  

#!/usr/bin/env python

# read_file.py

with open('works.txt', 'r') as f:

    for line in f:

        print(line.rstrip())

Internally, a file object is an iterarator. We can pass the file object
to the for loop to traverse it.

## Python readlines method

The readlines method reads data until the end of the file
and returns a list of lines.

readlines.py
  

#!/usr/bin/env python

# readlines.py

with open('works.txt', 'r') as f:

    contents = f.readlines()

    for i in contents:

        print(i.strip())

The readlines method reads all the contents of a file into the
memory. This may be problematic with very large files, though.

## Python write method

The write method writes a string to a file.

strophe.py
  

#!/usr/bin/env python

# strophe.py

text = '''Incompatible, it don't matter though
'cos someone's bound to hear my cry
Speak out if you do
You're not easy to find\n'''

with open('strophe.txt', 'w') as f:

    f.write(text)

This time we open the file in a 'w' mode so that we can write into it.
If the file does not exist, it is created.
If it exists, it is overwritten.

$ cat strophe.txt
Incompatible, it don't matter though
'cos someone's bound to hear my cry
Speak out if you do
You're not easy to find

## Python standard I/O

There are three basic I/O connections: *standard input*,
*standard output* and *standard error*. Standard input is
the data that goes to the program. The standard input comes from a keyboard.
Standard output is where we print our data with the print keyword.
Unless redirected, it is the terminal console.
The standard error is a stream where programs write their error messages.
It is usually the text terminal.

The standard input and output in Python are objects located in the sys
module.

Object
Description

sys.stdinstandard input

sys.stdoutstandard output

sys.stderrstandard error

Conforming to the UNIX philosophy, the standard I/O streams are file objects.

### Python standard input

Standard input is the data that goes to the program.

read_name.py
  

#!/usr/bin/env python

# read_name.py

import sys

print('Enter your name: ', end='')

name = ''

sys.stdout.flush()

while True:

    c = sys.stdin.read(1)

    if c == '\n':
        break

    name = name + c

print('Your name is:', name)

The read method reads one character from the standard input. In
our example we get a prompt saying "Enter your name". We enter our name and
press Enter. The Enter key generates the new
line
character: \n.

$ ./read_name.py
Enter your name: Peter
Your name is: Peter

For getting input we can use higher level functions: input
and raw_input .

The input function prints a prompt if it is given and
reads the input.

input_example.py
  

#!/usr/bin/env python

# input_example.py

data = input('Enter value: ')

print('You have entered:', data)

```
$ ./input_example.py
Enter value: Hello there
You have entered: Hello there

```

### Python standard output

The standard output is where we print our data.

std_output.py
  

#!/usr/bin/env python

# std_output.py

import sys

sys.stdout.write('Honore de Balzac, Father Goriot\n')
sys.stdout.write('Honore de Balzac, Lost Illusions\n')

In the example, we write some text to the standard output. This is in our
case the terminal console. We use the write method.

$ ./stdout.py
Honore de Balzac, Father Goriot
Honore de Balzac, Lost Illusions

The print function puts some text into the sys.stdout by default.

print_fun.py
  

#!/usr/bin/env python

# print_fun.py

print('Honore de Balzac')
print('The Splendors and Miseries of Courtesans', 'Gobseck', 'Father Goriot', sep=":")

vals = [1, 2, 3, 4, 5]

for e in vals:
    print(e, end=' ')

print()

In this example, we use the sep and end parameters.
The sep separates the printed objects and the end defines
what is printed at the end.

$ ./print_fun.py
Honore de Balzac
The Splendors and Miseries of Courtesans:Gobseck:Father Goriot
1 2 3 4 5

It is possible to use the print function to write
to a file. The print function contains a file
parameter, which tells where we print data.

print2file.py
  

#!/usr/bin/env python

# print2file.py

with open('works.txt', 'w') as f:

    print('Beatrix', file=f)
    print('Honorine', file=f)
    print('The firm of Nucingen', file=f)

We open a file and write three titles of Balzac books into it.
The file object is given to the file parameter.

$ cat works.txt
Beatrix
Honorine
The firm of Nucingen

### Python redirection

Standard output can be redirected. In the following example, we redirect the
standard output to a regular file.

redirect.py
  

#!/usr/bin/env python

# redirect.py

import sys

with open('output.txt', 'w') as f:

    sys.stdout = f

    print('Lucien')
    sys.stdout.write('Rastignac\n')
    sys.stdout.writelines(['Camusot\n', 'Collin\n'])

    sys.stdout = sys.__stdout__

    print('Bianchon')
    sys.stdout.write('Lambert\n')

In the redirect.py script, we redirect a standard output to a regular file
output.txt. Then we restore the original standard output back. The original
value of the std.output is kept in a special sys.__stdout__
variable.

$ ./redirect.py
Bianchon
Lambert
$ cat output.txt
Lucien
Rastignac
Camusot
Collin

## Python pickle module

So far, we have been working with simple textual data. What if we are
working with objects rather than simple text?
For such situations, we can use the pickle module.
This module serializes Python objects. The Python
objects are converted into byte streams and written to text files.
This process is called pickling. The inverse operation, reading from a
file and reconstructing objects is called deserializing or unpickling.

pickle_ex.py
  

#!/usr/bin/env python

# pickle_ex.py

import pickle

class Person:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def get_name(self):
        return self.name

    def get_age(self):
        return self.age

person = Person('Monica', 15)
print(person.get_name())
print(person.get_age())

with open('monica', 'wb') as f:
    pickle.dump(person, f)

with open('monica', 'rb') as f2:
    monica = pickle.load(f2)

print(monica.get_name())
print(monica.get_age())

In our script, we define a Person class. We create one person. We pickle
the object using the dump
method. We close the file, open it again for reading, and unpickle the
object using the load method.

$ ./pickle_ex.py
Monica
15
Monica
15

In this part of the Python tutorial, we work with files and standard input and
output in Python.

[Contents](..)
[Previous](../functions/)
[Next](../oop/)