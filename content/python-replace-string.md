+++
title = "Python replace string"
date = 2025-08-29T20:10:16.232+01:00
draft = false
description = "Python replace string tutorial shows how to replace strings in Python. We can replace strings with replace method, translate method, regex.sub method, or with string slicing and formatting."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python replace string

last modified January 29, 2024

Python replace string tutorial shows how to replace strings in Python.

There are several ways of replacing strings in Python:

     - replace method

     - re.sub method

     - translate method

     - string slicing and formatting

## Python replace string with replace method

The replace method return a copys of the string with all
occurrences of substring old replaced by new.

replace(old, new[, count])

The parameters are:

    - old − old substring to be replaced

    - new − new substring to replace old substring.

    - count − the optional count argument determines how many occurrences are replaced

replacing.py
  

#!/usr/bin/python

msg = "There is a fox in the forest. The fox has red fur."

msg2 = msg.replace('fox', 'wolf')

print(msg2)

In the example, both occurrences of word 'fox' are replaced with 'wolf'.

$ ./replacing.py
There is a wolf in the forest. The wolf has red fur.

Alternatively, we can use the str.replace method. It takes
the string on which we do replacement as the first parameter.

replacing2.py
  

#!/usr/bin/python

msg = "There is a fox in the forest. The fox has red fur."

msg2 = str.replace(msg, 'fox', 'wolf')

print(msg2)

The example is equivalent to the previous one.

In the next example, we have a CSV string.

replacing3.py
  

#!/usr/bin/python

data = "1,2,3,4,5,6,7,8,9,10"

data2 = data.replace(',', '\n')

print(data2)

The replace each comma with a newline character.

$ ./replacing3.py
1
2
3
4
5
6
7
8
9
10
$ ./replacing3.py | awk '{ sum+=$1} END {print sum}'
55

## Python replace first occurrence of string

The count parameter can be used to replace only the first
occurrence of the given word.

replacing_first.py
  

#!/usr/bin/python

msg = "There is a fox in the forest. The fox has red fur."

msg2 = msg.replace('fox', 'wolf', 1)

print(msg2)

The example replaces the first occurrence of the word 'fox'.

$ ./replace_first.py
There is a wolf in the forest. The fox has red fur.

## Python replace last occurrence of string

In the next example, we replace the last occurrence of word 'fox'.

replace_last.py
  

#!/usr/bin/python

msg = "There is a fox in the forest. The fox has red fur."

oword = 'fox'
nword = 'wolf'
n = len(nword)

idx = msg.rfind(oword)
idx2 = idx + n - 1

print(f'{msg[:idx]}{nword}{msg[idx2:]}')

We find the index of the last 'fox' word present in the message utilizing
rfind method. We build a new string by omitting the old word an
placing a new word there instead. We use string slicing and formatting
operations.

$ ./replace_last.py
There is a fox in the forest. The wolf has red fur.

## Python chaining of replace methods

It is possible to chain the replace methods to do multiple
replacements.

chaining.py
  

#!/usr/bin/python

msg = "There is a fox in the forest. The fox has red fur."

msg2 = msg.replace('fox', 'wolf').replace('red', 'brown').replace('fur', 'legs')

print(msg2)

In the example, we perform three replacements.

$ ./chaining.py
There is a wolf in the forest. The wolf has brown legs.

## Python replace characters with translate

The translate method allows to replace multiple characters
specified in the dictionary.

translating.py
  

#!/usr/bin/python

msg = "There is a fox in the forest. The fox has red fur."

print(msg.translate(str.maketrans({'.': '!'})))

We replace the dot characters with the exclamation marks in the example.

$ ./translating.py
There is a fox in the forest! The fox has red fur!

## Python replace string with re.sub

We can use regular expressions to replace strings.

re.sub(pattern, repl, string, count=0, flags=0)

The re.sub method returns the string obtained by replacing the
leftmost non-overlapping occurrences of pattern in string by the replacement
repl.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

We have a small text file.

replace_reg.py
  

#!/usr/bin/python

import re

filename = 'thermopylae.txt'

with open(filename) as f:

    text = f.read()

cleaned = re.sub('[\.,]', '', text)

words = set(cleaned.split())

for word in words:
    print(word)

We read the text file and use the re.sub method to remove the
punctunation characters. We split the text into words and use the
set function to get unique words.

cleaned = re.sub('[\.,]', '', text)

In our case, we only have a dot and comma punctunation characters in the file.
We replace them with empty string thus removing them.

$ ./replace_reg.py
city-states
days
was
Empire
and
second
of
led
Battle
alliance
Greece
King
Persian
Leonidas
during
between
course
Thermopylae
Sparta
I
over
three
by
Xerxes
invasion
an
Greek
The
fought
the

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have replaced strings in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).