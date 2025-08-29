+++
title = "Python read file"
date = 2025-08-29T20:10:06.155+01:00
draft = false
description = "Python read file tutorial shows how to read files in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python read file

last modified January 29, 2024

Python read file tutorial shows how to read files in Python. We show several 
examples that read text and binary files.

If we want to read a file, we need to open it first. For this, Python has the 
built-in open function.

## Python open function

The open function is used to open files in Python.

open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None)

The file is the name of the file to be opened. The
mode indicates how the file is going to be opened: for reading,
writing, or appending. The buffering is an optional integer used to
set the buffering policy. The encoding is the name of the encoding
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

First, we deal with text files. At the end of the tutorial, we work with a 
binary file. 

works.txt
  

Lost Illusions
Beatrix
Honorine
The firm of Nucingen
Old Goriot
Colonel Chabert
Cousin Bette
Gobseck
César Birotteau
The Chouans

We use this file for reading text.

## Python read

The read function reads at most size characters as a
single string. If the size parameter is negative, it reads until
EOF.

read_all.py
  

#!/usr/bin/python

with open('works.txt', 'r') as f:

    contents = f.read()
    print(contents)

The example reads the whole file and prints its contents.

with open('works.txt', 'r') as f:

We open the works.txt file in the read mode. Since we did not specify
the binary mode, the file is opened in the default text mode. It returns the
file object f. The with statement simplifies exception
handling by encapsulating common preparation and cleanup tasks. It also
automatically closes the opened file. 

contents = f.read()

We call the file object's read function. Since we did not specify
any parameter, it reads the whole file.

$ ./read_all.py 
Lost Illusions
Beatrix
Honorine
The firm of Nucingen
Old Goriot
Colonel Chabert
Cousin Bette
Gobseck
César Birotteau
The Chouans

## Python read characters

By providing the size parameter to the read function, 
we can specify how many characters we want to read.

read_characters.py
  

#!/usr/bin/python

with open('works.txt', 'r') as f:

    data1 = f.read(4)
    print(data1)

    data2 = f.read(20)
    print(data2)

    data3 = f.read(10)
    print(data3)

In the example, we read 4, 20, and 10 characters from the file.

$ ./read_characters.py 
Lost
    Illusions
Beatrix
H
onorine
Th

## Python readline

The readline function reads until newline or EOF and return a
single string. If the stream is already at EOF, an empty string is returned. If
the size parameter is specified, at most size characters will be
read.

read_line.py
  

#!/usr/bin/python

with open('works.txt', 'r') as f:

    line = f.readline()
    print(line.rstrip())

    line2 = f.readline()
    print(line2.rstrip())

    line3 = f.readline()
    print(line3.rstrip())

In the example, we read three lines from the file. The rstrip
function cuts the trailing newline character from the string.

$ ./read_line.py 
Lost Illusions
Beatrix
Honorine

## Python readlines

The readlines function reads and returns a list of lines from the 
stream.

read_lines.py
  

#!/usr/bin/python

with open('works.txt', 'r') as f:

    lines = f.readlines()

    print(lines)

    for line in lines:

        print(line.strip())

In the example, we read the contents of the file with readlines. 
We print the list of the lines and then loop over the list with a for statement.

$ ./read_lines.py 
['Lost Illusions\n', 'Beatrix\n', 'Honorine\n', 'The firm of Nucingen\n', 
'Old Goriot\n', 'Colonel Chabert\n', 'Cousin Bette\n', 'Gobseck\n', 
'César Birotteau\n', 'The Chouans\n']
Lost Illusions
Beatrix
Honorine
The firm of Nucingen
Old Goriot
Colonel Chabert
Cousin Bette
Gobseck
César Birotteau
The Chouans

## Python read file

Since the file object returned from the open function is a 
iterable, we can pass it directly to the for statement.

read_file.py
  

#!/usr/bin/python

with open('works.txt', 'r') as f:

    for line in f:

        print(line.rstrip())

The example iterates over the file object to print the contents of the text 
file.

$ ./read_file.py 
Lost Illusions
Beatrix
Honorine
The firm of Nucingen
Old Goriot
Colonel Chabert
Cousin Bette
Gobseck
César Birotteau
The Chouans

## The seek function

The seek function changes the stream position to the given byte offset.

seek(offset, whence=SEEK_SET)

The offset value is interpreted relative to the position indicated
by whence. The default value for whence is SEEK_SET. 

The values for whence are:

    - SEEK_SET or 0 – start of the stream (the default); offset should be zero or positive

    - SEEK_CUR or 1 – current stream position; offset may be negative

    - SEEK_END or 2 – end of the stream; offset is usually negative

seeking.py
  

#!/usr/bin/python

with open('works.txt', 'r') as f:

    data1 = f.read(22)
    print(data1)

    f.seek(0, 0)

    data2 = f.read(22)
    print(data2)

In the example, we read 22 characters from a text stream. Then we set the 
stream position back to the beginning and read 22 characters again.

$ ./seeking.py 
Lost Illusions
Beatrix
Lost Illusions
Beatrix

## The tell function

The tell function returns the current stream position.

telling.py
  

#!/usr/bin/python

with open('works.txt', 'r') as f:

    print(f'The current file position is {f.tell()}')

    f.read(22)
    print(f'The current file position is {f.tell()}')

    f.seek(0, 0)
    print(f'The current file position is {f.tell()}')

We move the stream position with read and seek
and print it with tell.

$ ./telling.py 
The current file position is 0
The current file position is 22
The current file position is 0

## Python read file with try/except/finally

The with statement simplifies our work when reading files. 
Without with, we need to manually handle exceptions and close 
the resources.

try_except_finally.py
  

#!/usr/bin/python

f = None

try:

    f = open('works.txt', 'r')

    for line in f:
        print(line.rstrip())

except IOError as e:

    print(e)

finally:

    if f:
        f.close()

In the example, we deal with the exceptions and resource release using 
try, except, and finally keywords.

## Python read binary file

In the following example, we read a binary file.

read_binary.py
  

#!/usr/bin/python

with open('web.png', 'rb') as f:

    hexdata = f.read().hex()

    n = 2
    data = [hexdata[i:i+n] for i in range(0, len(hexdata), n)]

    i = 0
    for e in data:

        print(e, end=' ')
        i += 1

        if i % 20 == 0:
            print()

    print()

The example reads a PNG file. It outputs the data as hexadecimal values.

with open('web.png', 'rb') as f:

We open the PNG file in read and binary modes.

hexdata = f.read().hex()

We read all data and turn it into hexadecimal values with hex
function.

n = 2
data = [hexdata[i:i+n] for i in range(0, len(hexdata), n)]

We chunk the string into a list of two characters.

i = 0
for e in data:

    print(e, end=' ')
    i += 1

    if i % 20 == 0:
        print()

We print the data in columns; there is a space between the columns. There 
are 20 columns per line of output. 

$ ./read_binary.py 
89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 10 
00 00 00 10 08 06 00 00 00 1f f3 ff 61 00 00 03 2a 49 44 41 
54 78 01 75 53 43 98 23 69 18 ae eb 7a af eb 4a c6 b6 ed 38 
19 bb b5 6c db 66 55 45 dd 71 66 9f a4 ad 8a 9d b1 6d e3 fe 
ac 77 2f 63 bf 5b 55 a7 e1 e1 c7 a7 f7 33 01 e0 b5 43 6a 1a 
3e 27 e5 6d a9 62 b9 d6 39 4a a5 bd 3e 4a ad bb 22 56 d2 76 
...

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have showed how to read files in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).