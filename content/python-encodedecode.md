+++
title = "Python encode/decode"
date = 2025-08-29T20:08:26.221+01:00
draft = false
description = "Python encode/decode tutorial shows how to encode and decode data in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python encode/decode

last modified January 29, 2024

In this article we show how to encode and decode data in Python.

str.encode(encoding='utf-8', errors='strict')

The str.encode function encodes the string value to the
bytes type. The encoding defaults to 'utf-8'.

bytes.decode(encoding='utf-8', errors='strict')

The bytes.decode function decodes the bytes type to the string
type.

The bytes type is an immutable sequence of bytes. The sequence
consists of integers in the range 0 to 255. This data type is used for storing 
data and data transmission.

We work with the bytes type when we open network sockets, work
with serial I/O or open binary files.

Python has multiple standard encodings, including utf_8, utf_16, ascii, latin-1,
iso8859_2, or cp1252. An encoding may have multiple aliases; for instance, 
utf_8 has utf8 and utf-8 aliases.

## Python encode example

In the first example, we encode a message containing emoji characters.

main.py
  

#!/usr/bin/python

text = "one 🐘 and three 🐋"
print(text)
print(len(text))

e = text.encode('utf8')
print(e)
print(len(e))

e = text.encode('utf16')
print(e)
print(len(e))

The program defines a message and encodes it into bytes type using utf8 and 
utf16 encodings.

text = "one 🐘 and three 🐋"

We define a Unicode string with two emoji characters.

print(text)
print(len(text))

We print the text and the number of characters.

e = text.encode('utf8')
print(e)
print(len(e))

We encode the string into a bytes type using the utf8 encoding and print the
bytes. We count the number of bytes in this encoding type.

e = text.encode('utf16')
print(e)
print(len(e))

We do the same for the utf16 encoding.

$ ./main.py 
one 🐘 and three 🐋
17
b'one \xf0\x9f\x90\x98 and three \xf0\x9f\x90\x8b'
23
b'\xff\xfeo\x00n\x00e\x00 \x00=\xd8\x18\xdc ... \x00=\xd8\x0b\xdc'
40

## Python decode example

In the following example, we read a file in binary mode. Later we decode the 
data into utf8 string.

data.txt
  

one 🐘 and three 🐋

We have this data.txt file.

main.py
  

#!/usr/bin/python

fname = 'data.txt'

with open(fname, mode='rb') as f:
    contents = f.read()

    print(type(contents))
    print(contents)
    print(contents.decode('utf8'))

We open the file in rb mode and read its contents.

contents = f.read()

Since it is a small file, we read the whole file into a variable with
read.

print(type(contents))

We print the type of the data.

print(contents)
print(contents.decode('utf8'))

We print the contents and then we print the decoded contents to the terminal.

$ ./main.py 
&lt;class 'bytes'&gt;
b'one \xf0\x9f\x90\x98 and three \xf0\x9f\x90\x8b'
one 🐘 and three 🐋

## Python transmitting bytes

The data on the network is transmitted in the bytes type.

main.py
  

#!/usr/bin/python

import requests

url = 'http://webcode.me/small.txt'

resp = requests.get(url)
print(resp.content)
print(resp.content.decode('utf8'))
print(resp.text)

We generate a GET request to a small text resource.

url = 'http://webcode.me/small.txt'

We define the URL.

resp = requests.get(url)

We generate a GET request to the given URL.

print(req.content)

Printing the request content, we get a bytes string.

print(resp.content.decode('utf8'))

We turn the bytes string into a Unicode string with decode.

print(resp.text)

The requests library also contains the text member function which 
does the decoding.

$ ./main.py 
b'small text page\n'
small text page

small text page

## Source

[Python Unicode HOWTO - documentation](https://docs.python.org/3/howto/unicode.html)

In this article we have worked with the encode and decode functions in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).