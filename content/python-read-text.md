+++
title = "Python read text"
date = 2025-08-29T20:10:05.010+01:00
draft = false
description = "Python read text tutorial shows how to read text data in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python read text

last modified January 29, 2024

In this article we show how to read text data in Python.

We can read text data in Python with the built-in open function or
the pathlib module.

The Path.read_text reads the contents of the file as a string.

The open function is used to open files in Python.

open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None)

The file is the name of the file to be opened. The
mode indicates how the file is going to be opened: for reading,
writing, or appending. The buffering is an optional integer used to
set the buffering policy.

The encoding is the name of the encoding
used to decode or encode the file. The errors is an optional string
that specifies how encoding and decoding errors are to be handled. The
newline controls the behaviour of the newline character.

The file modes are:

Mode
Meaning

'r'open for reading (default)

'w'open for writing, truncating the file first

'a'open for writing, appending to the end of the file if it exists

'b'binary mode

't'text mode (default)

'+'updating (reading and writing)

'x'exclusive creation, failing if file exists

The default mode is the text mode.

words.txt
  

falcon
sky
book
sum
cup
cloud
water
win

We have this simple text file.

## Python read text with read function

The read function reads at most size characters as a
single string. If the size parameter is negative, it reads until
EOF.

main.py
  

#!/usr/bin/python

with open('words.txt', 'r') as f:

    contents = f.read()
    print(contents)

The program reads the whole file and prints its contents.

with open('words.txt', 'r') as f:

We open the works.txt file in the read mode. Since we did not
specify the binary mode, the file is opened in the default text mode. The
function returns the file object f. The with statement
simplifies exception handling by encapsulating common preparation and cleanup
tasks; in addition, it automatically closes the opened file.

contents = f.read()

We call the file object's read function. Since we did not specify
any parameter, it reads the whole file.

$ ./main.py
falcon
sky
book
sum
cup
cloud
water
win

In the next example, we explicitly specify the text mode.

main.py
  

#!/usr/bin/python

with open('words.txt', 'rt') as f:

    contents = f.read()
    print(contents)

The program reads the whole words.txt file.

## Python read text with readline

The readline function reads until newline or EOF and return a
single string. If the stream is already at EOF, an empty string is returned. If
the size parameter is specified, at most size characters will be
read.

main.py
  

#!/usr/bin/python

with open('words.txt', 'r') as f:

    line = f.readline()
    print(line.rstrip())

    line = f.readline()
    print(line.rstrip())

In the example, we read two lines from the file. The rstrip
function cuts the trailing newline character from the string.

$ ./main.py
falcon
sky

## Python read text with readlines

The readlines function reads and returns a list of lines from the
stream.

main.py
  

#!/usr/bin/python

with open('words.txt', 'r') as f:

    lines = f.readlines()

    print(lines)

    for line in lines:

        print(line.strip())

In the example, we read the contents of the file with readlines.
We print the list of the lines and then loop over the list with a for statement.

$ ./main.py
['falcon\n', 'sky\n', 'book\n', 'sum\n', 'cup\n', 'cloud\n', 'water\n', 'win']
falcon
sky
book
sum
cup
cloud
water
win

## Python read text with for loop

Since the file object returned from the open function is a
iterable, we can pass it directly to the for loop.

main.py
  

#!/usr/bin/python

with open('works.txt', 'r') as f:

    for line in f:

        print(line.rstrip())

The program iterates over the file object to print the contents of the text
file.

$ ./main.py
falcon
sky
book
sum
cup
cloud
water
win

## Python read text with Path.read_text

The Path.read_text function opens the file in text mode, reads it,
and closes the file. It is a convenience function for easy reading of text. It
should not be used for large files.

main.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('words.txt')

content = path.read_text()
print(content)

The programs reads the whole text file into a string in one go.

$ ./main.py
falcon
sky
book
sum
cup
cloud
water
win

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have showed how to read files in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).