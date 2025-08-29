+++
title = "Python random module"
date = 2025-08-29T20:10:03.928+01:00
draft = false
description = "Python random module tutorial shows how to generate pseudo-random numbers in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python random module

last modified January 29, 2024

Python random module tutorial shows how to generate pseudo-random numbers in
Python.

## Random number generator

Random number generator (RNG) generates a set of values that do not
display any distinguishable patterns in their appearance.  The random number
generators are divided into two categories: hardware random-number generators
and pseudo-random number generators. Hardware random-number generators  are
believed to produce genuine random numbers. Pseudo-random number generators
generate values based on software algorithms. They produce values that look
random.  But these values are deterministic and can be reproduced, if the
algorithm is known. 

In computing, random generators are used in gambling, gaming, simulations, or cryptography.

**Note: ** For security purposes, cryptographically secure pseudo-random 
number generators must be used.

To increase the quality of the pseudo random-number generators, operating systems use 
environmental noise collected from device drivers, user input latency, or jitter 
from one or more hardware components. This is the core of the cryptographically secure 
pseudo-random number generators.

## Python random module

The built-in Python random module implements pseudo-random number generators for 
various distributions. Python uses the Mersenne Twister algorithm to produce its 
pseudo-random numbers. This module is not suited for security. For security related 
tasks, the secrets module is recommended.

## The seed

The seed is a value which initializes the random number generator. Random number generators
produce values by performing some operation on a previous value. When the algorithm starts, 
the seed is the initial value on which the generator operates. The most important and
difficult part of the generators is to provide a seed that is close to a truly random
number. 

In Python, the seed value is provided with the random.seed function. If the value 
is not explicitly given, Python uses either the system clock or other random source. 

**Note: ** The same seed produces the same set of pseudo-random numbers.

## Python random - same seed

In the following example, we use the same seed. 

same_seed.py
  

#!/usr/bin/python

import random

myseed = 16

random.seed(myseed)

print(random.random())
print(random.random())
print(random.random())

print('********************************')

random.seed(myseed)

print(random.random())
print(random.random())
print(random.random())

The same seed value produces the same pseudo-random values.

$ ./same_seed.py 
0.36152277491407514
0.480480665601294
0.4169526266056648
********************************
0.36152277491407514
0.480480665601294
0.4169526266056648

## Python random.randint

The random.randint function generates integers between values [x, y].

rand_int.py
  

#!/usr/bin/python

import random

val = random.randint(1, 10)
print(val)

val = random.randint(1, 10)
print(val)

val = random.randint(1, 10)
print(val)

val = random.randint(1, 10)
print(val)

The example produces four random integers between numbers 1 and 10.

$ ./rand_int.py 
10
4
9
3

## Python random.randrange

The random.randrange function excludes the right-hand side of the interval.
It picks values between [x, y).

rand_range.py
  

#!/usr/bin/python

import random

val = random.randrange(1, 10)
print(val)

val = random.randrange(1, 10)
print(val)

val = random.randrange(1, 10)
print(val)

val = random.randrange(1, 10)
print(val)

The example produces four random integers between numbers 1 and 10, where
the value 10 is excluded.

## Python random.uniform

The random.uniform function generates random floats between 
values [x, y].

floats.py
  

#!/usr/bin/python

import random

val = random.uniform(1, 10)
print(val)

val = random.uniform(1, 10)
print(val)

val = random.uniform(1, 10)
print(val)

val = random.uniform(1, 10)
print(val)

The example produces four random floats between numbers 1 and 10.

$ ./floats.py 
9.594596536362012
5.832673168195081
6.7942727933257
7.035310921661894

## Python random.choice

The random.choice function returns a random element 
from the non-empty sequence.

rand_choice.py
  

#!/usr/bin/python

import random

words = ['sky', 'storm', 'rock', 'falcon', 'forest']

val = random.choice(words)
print(val)

val = random.choice(words)
print(val)

val = random.choice(words)
print(val)

val = random.choice(words)
print(val)

The example picks randomly a word from the list four times.

$ ./rand_choice.py 
forest
forest
sky
storm

## Python random.shuffle

The random.shuffle function shuffles the sequence in place.

shuffling.py
  

#!/usr/bin/python

import random

words = ['sky', 'storm', 'rock', 'falcon', 'forest']

random.shuffle(words)
print(words)

random.shuffle(words)
print(words)

The example shuffles the list of words twice.

$ ./shuffling.py 
['storm', 'falcon', 'rock', 'sky', 'forest']
['falcon', 'storm', 'rock', 'forest', 'sky']

## Python random.sample

The random.sample allows to pick a random sample 
of n unique elements from a sequence.

sampling.py
  

#!/usr/bin/python

import random

words = ['sky', 'storm', 'rock', 'falcon', 'forest']

sample = random.sample(words, 3)
print(sample)

sample = random.sample(words, 3)
print(sample)

The example picks randomly three elements twice from a list of words.

$ ./sampling.py 
['rock', 'storm', 'falcon']
['forest', 'sky', 'rock']

## Python secrets

The secrets module is used for generating cryptographically strong random
numbers suitable for managing data such as passwords, account authentication,
or security tokens.

strong.py
  

#!/usr/bin/python

import secrets
import string

print(secrets.token_hex(12))
print(secrets.token_urlsafe(12))

alphabet = string.ascii_letters + string.digits
password = ''.join(secrets.choice(alphabet) for i in range(8))

print(password)

The token_hex function returns a random text string, in hexadecimal.
The token_urlsafe function returns a random URL-safe text string.

alphabet = string.ascii_letters + string.digits
password = ''.join(secrets.choice(alphabet) for i in range(8))

Here we generate an eight-character alphanumeric password.

$ ./strong.py 
69e6919fc04cbd6f9f5a25dc
eLL8-yT4cictksh8
YbpPzXvt

## Source

[random — Generate pseudo-random numbers](https://docs.python.org/3/library/random.html)

In this article we have worked with the Python random module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).