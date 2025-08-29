+++
title = "Python itertools.chain Function"
date = 2025-08-29T20:07:47.678+01:00
draft = false
description = "A comprehensive guide to Python's itertools.chain, exploring sequence concatenation, lazy evaluation, and real-world uses."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python itertools.chain Function

Last modified March 29, 2025

The itertools.chain function is a versatile tool in Python
for handling iterables. It efficiently concatenates multiple sequences
without generating intermediate lists, offering a memory-efficient solution
for large datasets.

Unlike traditional concatenation, which produces new objects in memory,
chain yields elements from each input iterable sequentially
via an iterator, treating them as a unified sequence. This guide examines
chain comprehensively with practical, illustrative examples.

## Basic Chain Usage

At its core, chain merges multiple iterables into one
iterator with ease.

basic_chain.py
  

from itertools import chain

nums = [1, 2, 3]
chars = ('a', 'b', 'c')
unique = {10, 20}

combined = chain(nums, chars, unique)
print(list(combined))  # [1, 2, 3, 'a', 'b', 'c', 10, 20]

This example highlights key traits of chain. It seamlessly
integrates different iterable types like lists, tuples, and sets. The
order of elements within each iterable is preserved, though sets lack
a fixed order. The resulting iterator requires consumption, such as with
list(), to view its contents.

## Chain vs List Concatenation

Using chain offers superior memory efficiency over standard
list concatenation, especially with large sequences.

chain_vs_concat.py
  

from itertools import chain
import sys

big_seq1 = list(range(50000))
big_seq2 = list(range(50000, 100000))

# Traditional concatenation
merged = big_seq1 + big_seq2
print(sys.getsizeof(merged))  # High memory footprint

# Using chain
linked = chain(big_seq1, big_seq2)
print(sys.getsizeof(linked))  # Minimal memory use

Traditional concatenation constructs a new list with all elements,
consuming significant memory. Conversely, chain produces a
lightweight iterator without copying data until needed. Its memory use
stays constant regardless of input size, making it ideal for large-scale
operations.

## Chain.from_iterable

The chain.from_iterable method excels when dealing with an
iterable containing multiple iterables.

from_iterable.py
  

from itertools import chain

pairs = [[1, 2], [3, 4], [5, 6]]

# chain.from_iterable simplifies flattening
flattened = chain.from_iterable(pairs)
print(list(flattened))  # [1, 2, 3, 4, 5, 6]

This method shines when handling dynamically created sequences, processing
nested structures, or flattening one level of nesting without knowing the
number of iterables beforehand. It eliminates the need for manual unpacking,
streamlining the process.

## Chaining Different Iterable Types

chain adeptly unites a variety of iterable types into a
single sequence.

mixed_iterables.py
  

from itertools import chain

text = "xyz"
numbers = [10, 20]
pairs = ((1, 2), (3, 4))
keys = {"p": 5, "q": 6}

mixed = chain(text, numbers, pairs, keys)
print(list(mixed))  # ['x', 'y', 'z', 10, 20, (1, 2), (3, 4), 'p', 'q']

When combining types, strings yield individual characters, dictionaries
provide their keys, and sets offer no guaranteed order. All elements merge
into a flat sequence, maintaining simplicity despite type diversity.

## Lazy Evaluation with Chain

chain supports lazy evaluation, delaying computation until
elements are requested.

lazy_evaluation.py
  

from itertools import chain

def gen_squares(n):
    print(f"Computing {n} squares")
    for i in range(n):
        yield i * i

lazy_chain = chain(gen_squares(2), gen_squares(3))
print("Chain created")
for square in lazy_chain:
    print(square)

The output reveals lazy behavior:

Chain created
Computing 2 squares
0
1
Computing 3 squares
0
1
4

Generators within chain remain unevaluated until iteration
begins, ensuring resources are used only as needed.

## Chain with Infinite Iterators

chain can link finite and infinite iterators seamlessly.

infinite_chains.py
  

from itertools import chain, count, cycle

short = [5, 6]
upward = count(10, 2)  # 10, 12, 14...
loop = cycle('ab')     # 'a', 'b', 'a'...

combined = chain(short, upward, loop)
from itertools import islice
print(list(islice(combined, 8)))  # [5, 6, 10, 12, 14, 16, 'a', 'b']

With infinite iterators, chain yields items endlessly unless
controlled, such as with islice. Finite iterables are consumed
first, followed by infinite ones in the order specified.

## Practical File Processing

chain simplifies treating multiple files as a single data
stream.

file_processing.py
  

from itertools import chain

def file_lines(files):
    return chain.from_iterable(open(f) for f in files)

# Process files as one
for line in file_lines(['log1.txt', 'log2.txt']):
    print(line.strip())

This method opens files lazily, one at a time, keeping memory use low
regardless of file size. It provides a straightforward way to iterate over
lines and easily scales to additional files.

## Nested Chain Operations

Nesting chain operations enables handling complex, layered
sequences.

nested_chains.py
  

from itertools import chain

mixed_data = [[1, 2], [3, [4, 5]], [6]]

# One-level flatten
flat1 = chain.from_iterable(mixed_data)
print(list(flat1))  # [1, 2, 3, [4, 5], 6]

# Full flatten
def deep_flatten(items):
    for x in chain.from_iterable(items):
        if isinstance(x, list):
            yield from deep_flatten([x])
        else:
            yield x

print(list(deep_flatten(mixed_data)))  # [1, 2, 3, 4, 5, 6]

The chain.from_iterable method flattens only one level, while
a recursive approach fully flattens nested structures of any depth. Both
preserve the original element order effectively.

## Performance Considerations

chain delivers performance advantages in certain contexts.

performance.py
  

from itertools import chain
import timeit

many_lists = [[i] for i in range(500)]

def via_concat():
    result = []
    for lst in many_lists:
        result += lst
    return result

def via_chain():
    return list(chain.from_iterable(many_lists))

print("Concat:", timeit.timeit(via_concat, number=1000))
print("Chain:", timeit.timeit(via_chain, number=1000))

The chain approach avoids repeated list creation, excelling
with numerous or large sequences. For small, fixed sets, concatenation might
be quicker, but chain thrives in memory-limited settings.

## Best Practices

    
        **Prefer from_iterable for sequences of sequences:** It's cleaner than unpacking
    
    
        **Use for memory efficiency:** When working with large datasets
    
    
        **Combine with other itertools:** Like islice, takewhile for control
    
    
        **Document chained sources:** For maintainability of complex chains
    
    
        **Consider alternatives for simple cases:** For 2-3 sequences, + may be clearer
    

## Source

[Python itertools.chain Documentation](https://docs.python.org/3/library/itertools.html#itertools.chain)

[PEP 234 - Iterators](https://peps.python.org/pep-0234/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).