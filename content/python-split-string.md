+++
title = "Python split string"
date = 2025-08-29T20:10:25.377+01:00
draft = false
description = "Python split string tutorial shows how to split strings in Python. We can split strings with split, rsplit, re.split, and partition/rpartition."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python split string

last modified January 29, 2024

Python split string tutorial shows how to split strings in Python.

We can split strings in Python with the following methods:

     - str.split, str.rsplit

     - re.split

     - str.partition, str.rpartition

## Python split/rsplit methods

The split methods cut a string into parts based on the given separator
parameter. With the optional second parameter we can control how many times the
string is cut.

str.split([sep[, maxsplit]])

The str.split method returns a list of the words in the string,
separated by the delimiter string. 

The parameters are:

    - sep − Optional. Character dividing the string into split groups; default is space.

    - maxsplit − Optional. Number of splits to do; default is -1 which splits all the items.

   
str.rsplit([sep[, maxsplit]])

The str.rsplit returns a list of the words in the string, separated
by the delimiter string (starting from right).

## Python split examples

In the following examples, we cut strings into parts with the previously
mentioned methods.   

splitting.py
  

#!/usr/bin/python

line = "sky, club, cpu, cloud, war, pot, rock, water"

words = line.split(',')
print(words)

words2 = line.split(', ')
print(words2)

words3 = line.split(',')
words4 = [e.strip() for e in words3]
print(words4)

In the example, we cut the line of words delimited with a comma into a list of 
words.

words = line.split(',')

The string is cut by the comma character; however, the words have spaces. 

words2 = line.split(', ')

One way to get rid of the spaces is to include a space character in the
separator parameter.

words3 = line.split(',')
words4 = [e.strip() for e in words3]

Another solution is to use the strip method.

$ ./splitting.py 
['sky', ' club', ' cpu', ' cloud', ' war', ' pot', ' rock', ' water']
['sky', 'club', 'cpu', 'cloud', 'war', 'pot', 'rock', 'water']
['sky', 'club', 'cpu', 'cloud', 'war', 'pot', 'rock', 'water']

With the maxsplit parameter we can set how many splits will be
done.

maxsplit.py
  

#!/usr/bin/python

line = "sky, club, cpu, cloud, war, pot, rock, water"

words = line.split(', ', 3)

for word in words:
    print(word)

print('-------------------------')

words2 = line.split(', ', 4)

for word in words2:
    print(word)

The rest of the words forms one string.

$ ./maxsplit.py
sky
club
cpu
cloud, war, pot, rock, water
-------------------------
sky
club
cpu
cloud
war, pot, rock, water

In the next example, we get words from the end of the string.

split_right.py
  

#!/usr/bin/python

line = "sky, club, cpu, cloud, war, pot, rock, water"

words = line.rsplit(', ', 3)[-3:]
print(words)

Using the rsplit method, we get the last three words.

$ ./split_right.py 
['pot', 'rock', 'water']

## Python splitlines

The str.splitlines method returns a list of the lines in the string,
breaking at line boundaries. Line breaks are not included in the resulting list
unless keepends is set to True.

The line boundaries are characters including line feed \n, carriage 
return \r, and carriage return/line feed \r\n.

str.splitlines([keepends])

It is a convenience method to quickly split lines into lists from files.

split_lines.py
  

#!/usr/bin/python

line = "sky\nclub\ncpu\rcloud\r\nwar\npot\nrock\nwater"

words = line.splitlines()
print(words)

The example turns the string into a list of words.

$ ./split_lines.py
['sky', 'club', 'cpu', 'cloud', 'war', 'pot', 'rock', 'water']

In the next example, we read words from a file.

words.txt
  

sky
cup
blue
bear
rock
pen
chair
lamp
bowl
rock
falcon

We have a file of words.

split_lines2.py
  

#!/usr/bin/python

filename = 'words.txt'

with open(filename, 'r') as f:
    
    data = f.read()
    words = data.splitlines()
    
    print(words)

The read method reads the whole file into a string. The string 
is then split into lines with split_lines.

$ ./split_lines2.py 
['sky', 'cup', 'blue', 'bear', 'rock', 'pen', 'chair', 'lamp', 'bowl', 'rock', 'falcon']

## Python re.split

With re.split, we can split strings by using regular expressions. 

re.split(pattern, string, maxsplit=0, flags=0)

The method gives us more powerful options to cut strings.

reg_split.py
  

#!/usr/bin/python

import re

line = "sky, \nclub, \tcpu; cloud,  \n\n\nwar; pot, rock, water"

words = re.split("[;,]\s+", line)
print(words)

In the example, we spit the string into a list of words with
re.spit. The words can be separated a comma or a semicolon and 
multiple white spaces.

$  ./reg_split.py 
['sky', 'club', 'cpu', 'cloud', 'war', 'pot', 'rock', 'water']

## Python word frequency

In the following example, we count the word frequency.

$ wget https://raw.githubusercontent.com/janbodnar/data/main/the-king-james-bible.txt

We use the King James Bible. 

word_freq.py
  

#!/usr/bin/python

import collections
import re

filename = 'the-king-james-bible.txt'

def get_words():

    words = []

    with open(filename) as f:

        for line in f:

            fields = re.split("\W+", line)

            for w in fields:

                if w and not w.isdigit():
                    words.append(w)

    return words

words = get_words()

c = collections.Counter(words)
common = c.most_common(10)

for e, i in common:
    print(f'{e}: {i}')

The example prints the ten most common words from the
the-king-james-bible.txt file.

fields = re.split("\W+", line)

We split the line into words. The \W character class matches 
any character which is not a word character.

for w in fields:

if w and not w.isdigit():
     words.append(w)

We skip empty fields and verse notations (they contain digits).

c = collections.Counter(words)
common = c.most_common(10)

We count the occurences and print the top ten frequent words.

$ ./word_freq.py 
the: 62103
and: 38848
of: 34478
to: 13400
And: 12846
that: 12576
in: 12331
shall: 9760
he: 9665
unto: 8942

## Python string partition

The partition method splits the sequence at the first occurrence of
the given separator and returns a 3-tuple containing the part before the
separator, the separator itself, and the part after the separator.

The rpartition method splits the sequence at the last occurrence of
the given separator and returns a 3-tuple containing the part before the
separator, the separator itself, and the part after the separator.

partition.py
  

#!/usr/bin/python

import os 

files = os.listdir('.')

for file in files:
    
    data = file.partition('.')
    print(f'{data[0]} has extension {data[2]}')

The example lists the current working directory and cuts each file into its name 
and extension. It uses partition.

$ ./partition.py 
words has extension txt
split_lines2 has extension py
splitting has extension py
split_lines has extension py
word_freq2 has extension py
split_right has extension py
the-king-james-bible has extension txt
reg_split has extension py
word_freq has extension py
partition has extension py
maxsplit has extension py

## Source

[The Python Language Reference](https://docs.python.org/3/reference/index.html)

In this article we have showed how to split strings in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).