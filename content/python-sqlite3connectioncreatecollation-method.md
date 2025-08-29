+++
title = "Python sqlite3.Connection.create_collation Method"
date = 2025-08-29T20:10:32.103+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.create_collation method covering custom collation sequences in SQLite."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.create_collation Method

Last modified April 15, 2025

This comprehensive guide explores Python's create_collation method,
which allows defining custom collation sequences for SQLite databases.

## Basic Definitions

A collation is a set of rules for comparing text strings in database operations.
SQLite uses collations for sorting and comparison in ORDER BY, GROUP BY, etc.

The create_collation method registers a Python function as a custom
collation sequence. This function must take two strings and return -1, 0, or 1.

## Basic Collation Example

This example shows how to create a simple case-insensitive collation sequence.

basic_collation.py
  

import sqlite3

def case_insensitive_collation(a, b):
    a = a.lower()
    b = b.lower()
    if a &lt; b:
        return -1
    elif a &gt; b:
        return 1
    else:
        return 0

with sqlite3.connect(':memory:') as conn:
    conn.create_collation('NOCASE', case_insensitive_collation)
    cursor = conn.cursor()
    
    cursor.execute('CREATE TABLE words (word TEXT)')
    cursor.executemany('INSERT INTO words VALUES (?)', 
                      [('Apple',), ('banana',), ('cherry',)])
    
    cursor.execute('SELECT word FROM words ORDER BY word COLLATE NOCASE')
    print([row[0] for row in cursor.fetchall()])

The example creates a case-insensitive collation named 'NOCASE'. The Python
function converts strings to lowercase before comparison.

When sorting with COLLATE NOCASE, 'Apple', 'banana', 'cherry' are ordered
case-insensitively. The output will be ['Apple', 'banana', 'cherry'].

## Reverse Order Collation

This example demonstrates creating a collation that sorts strings in reverse order.

reverse_collation.py
  

import sqlite3

def reverse_collation(a, b):
    if a &lt; b:
        return 1
    elif a &gt; b:
        return -1
    else:
        return 0

with sqlite3.connect(':memory:') as conn:
    conn.create_collation('REVERSE', reverse_collation)
    cursor = conn.cursor()
    
    cursor.execute('CREATE TABLE items (name TEXT)')
    cursor.executemany('INSERT INTO items VALUES (?)', 
                      [('A',), ('B',), ('C',), ('D',)])
    
    cursor.execute('SELECT name FROM items ORDER BY name COLLATE REVERSE')
    print([row[0] for row in cursor.fetchall()])

The reverse_collation function simply inverts the normal comparison logic.
Strings that would normally sort earlier now sort later and vice versa.

The output will be ['D', 'C', 'B', 'A'], demonstrating the reverse sorting order.

## Numeric Collation

This example shows how to create a collation that sorts numbers stored as text.

numeric_collation.py
  

import sqlite3

def numeric_collation(a, b):
    try:
        a_num = float(a)
        b_num = float(b)
        if a_num &lt; b_num:
            return -1
        elif a_num &gt; b_num:
            return 1
        else:
            return 0
    except ValueError:
        # Fall back to regular string comparison if not numbers
        if a &lt; b:
            return -1
        elif a &gt; b:
            return 1
        else:
            return 0

with sqlite3.connect(':memory:') as conn:
    conn.create_collation('NUMERIC', numeric_collation)
    cursor = conn.cursor()
    
    cursor.execute('CREATE TABLE numbers (value TEXT)')
    cursor.executemany('INSERT INTO numbers VALUES (?)', 
                      [('10',), ('2',), ('1',), ('20',)])
    
    cursor.execute('SELECT value FROM numbers ORDER BY value COLLATE NUMERIC')
    print([row[0] for row in cursor.fetchall()])

The numeric_collation function converts strings to numbers before comparison.
This ensures '10' comes after '2' numerically, not alphabetically.

The output will be ['1', '2', '10', '20'], showing proper numeric ordering.

## Locale-Aware Collation

This example demonstrates a collation that respects locale-specific sorting rules.

locale_collation.py
  

import sqlite3
import locale

def locale_collation(a, b):
    return locale.strcoll(a, b)

# Set the locale to the user's default
locale.setlocale(locale.LC_ALL, '')

with sqlite3.connect(':memory:') as conn:
    conn.create_collation('LOCALE', locale_collation)
    cursor = conn.cursor()
    
    cursor.execute('CREATE TABLE words (word TEXT)')
    words = [('été',), ('eté',), ('étage',), ('étalage',)]
    cursor.executemany('INSERT INTO words VALUES (?)', words)
    
    cursor.execute('SELECT word FROM words ORDER BY word COLLATE LOCALE')
    print([row[0] for row in cursor.fetchall()])

The locale_collation function uses Python's locale module to perform
locale-aware string comparison. This is important for correct sorting of
accented characters in many languages.

The output will vary based on system locale but will show proper language-
specific ordering of French words with accents.

## Natural Sort Collation

This example implements natural sorting where numbers in strings are compared
numerically rather than lexicographically.

natural_sort.py
  

import sqlite3
import re

def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split('([0-9]+)', s)]

def natural_collation(a, b):
    a_key = natural_sort_key(a)
    b_key = natural_sort_key(b)
    if a_key &lt; b_key:
        return -1
    elif a_key &gt; b_key:
        return 1
    else:
        return 0

with sqlite3.connect(':memory:') as conn:
    conn.create_collation('NATURAL', natural_collation)
    cursor = conn.cursor()
    
    cursor.execute('CREATE TABLE files (name TEXT)')
    files = [('file1.txt',), ('file10.txt',), ('file2.txt',), ('file20.txt',)]
    cursor.executemany('INSERT INTO files VALUES (?)', files)
    
    cursor.execute('SELECT name FROM files ORDER BY name COLLATE NATURAL')
    print([row[0] for row in cursor.fetchall()])

The natural_collation function splits strings into text and number parts,
converting the numbers to integers for proper numeric comparison.

The output will be ['file1.txt', 'file2.txt', 'file10.txt', 'file20.txt'],
showing correct natural sorting order.

## Diacritic-Insensitive Collation

This example creates a collation that ignores diacritical marks when comparing.

diacritic_insensitive.py
  

import sqlite3
import unicodedata

def remove_diacritics(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s)
                  if not unicodedata.combining(c))

def diacritic_insensitive_collation(a, b):
    a_simple = remove_diacritics(a)
    b_simple = remove_diacritics(b)
    if a_simple &lt; b_simple:
        return -1
    elif a_simple &gt; b_simple:
        return 1
    else:
        return 0

with sqlite3.connect(':memory:') as conn:
    conn.create_collation('DIACRITIC_INSENSITIVE', diacritic_insensitive_collation)
    cursor = conn.cursor()
    
    cursor.execute('CREATE TABLE words (word TEXT)')
    words = [('café',), ('cafe',), ('résumé',), ('resume',)]
    cursor.executemany('INSERT INTO words VALUES (?)', words)
    
    cursor.execute('SELECT word FROM words ORDER BY word COLLATE DIACRITIC_INSENSITIVE')
    print([row[0] for row in cursor.fetchall()])

The collation removes diacritical marks before comparison using Unicode
normalization. This makes 'café' and 'cafe' compare as equal.

The output will group words with and without diacritics together based on
their base characters.

## Custom Weighted Collation

This example shows a collation that applies custom weights to certain characters.

weighted_collation.py
  

import sqlite3

def weighted_collation(a, b):
    # Custom weights for certain characters
    weights = {'@': 0, '#': 1, '$': 2}
    
    def get_weight(c):
        return weights.get(c, ord(c))
    
    for a_char, b_char in zip(a, b):
        a_weight = get_weight(a_char)
        b_weight = get_weight(b_char)
        if a_weight &lt; b_weight:
            return -1
        elif a_weight &gt; b_weight:
            return 1
    
    # If all compared characters were equal, compare lengths
    if len(a) &lt; len(b):
        return -1
    elif len(a) &gt; len(b):
        return 1
    else:
        return 0

with sqlite3.connect(':memory:') as conn:
    conn.create_collation('WEIGHTED', weighted_collation)
    cursor = conn.cursor()
    
    cursor.execute('CREATE TABLE symbols (value TEXT)')
    symbols = [('apple',), ('@pple',), ('#pple',), ('$pple',)]
    cursor.executemany('INSERT INTO symbols VALUES (?)', symbols)
    
    cursor.execute('SELECT value FROM symbols ORDER BY value COLLATE WEIGHTED')
    print([row[0] for row in cursor.fetchall()])

The weighted_collation function applies custom sorting weights to specific
symbols (@, #, $) while maintaining normal ordering for other characters.

The output will be ['@pple', '#pple', '$pple', 'apple'], showing the custom
symbol ordering followed by regular alphabetical sorting.

## Best Practices

- **Keep collation functions simple:** Complex logic can slow down queries

- **Handle edge cases:** Account for None values and different types

- **Use Unicode normalization:** For consistent text comparison

- **Test thoroughly:** Verify behavior with various inputs

- **Document custom collations:** Explain their purpose and behavior

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Collation Sequences](https://www.sqlite.org/datatype3.html#collation)

- [SQLite COLLATE Operator](https://www.sqlite.org/lang_expr.html#collate_op)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).