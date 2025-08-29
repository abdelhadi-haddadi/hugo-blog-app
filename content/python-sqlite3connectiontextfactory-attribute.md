+++
title = "Python sqlite3.Connection.text_factory Attribute"
date = 2025-08-29T20:10:37.786+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.text_factory attribute covering text encoding, decoding, and customization."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.text_factory Attribute

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.text_factory
attribute, which controls how SQLite TEXT values are converted to Python objects.
We'll cover basic usage, customization, and practical examples.

## Basic Definitions

The text_factory attribute of a sqlite3.Connection
object determines how TEXT values from the database are converted to Python
objects. By default, it returns Unicode strings (str).

Key characteristics: it's a callable that accepts a bytes object, can be
changed at runtime, and affects all subsequent queries. It's essential for
handling text encoding in SQLite databases.

## Default Text Factory Behavior

This example demonstrates the default behavior where TEXT values are returned
as Python Unicode strings.

default_text_factory.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.execute("CREATE TABLE test (id INTEGER, text_data TEXT)")
    conn.execute("INSERT INTO test VALUES (1, 'Hello World')")
    
    # Default text_factory returns str (Unicode)
    cursor = conn.cursor()
    cursor.execute("SELECT text_data FROM test WHERE id = 1")
    result = cursor.fetchone()[0]
    print(type(result), result)  # &lt;class 'str'&gt; Hello World

The default text_factory converts SQLite TEXT values to Python
str objects. This is the most common and recommended setting for
most applications.

The example uses a memory database for simplicity and demonstrates the automatic
Unicode conversion of text data.

## Returning Bytes Instead of Unicode

Setting text_factory = bytes makes TEXT values return as raw bytes
objects instead of Unicode strings.

bytes_text_factory.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.text_factory = bytes
    conn.execute("CREATE TABLE test (id INTEGER, text_data TEXT)")
    conn.execute("INSERT INTO test VALUES (1, 'Hello World')")
    
    cursor = conn.cursor()
    cursor.execute("SELECT text_data FROM test WHERE id = 1")
    result = cursor.fetchone()[0]
    print(type(result), result)  # &lt;class 'bytes'&gt; b'Hello World'

This example shows how to get raw bytes from TEXT columns. The bytes
factory is useful when you need the exact binary representation stored in SQLite.

Note that the bytes object contains the UTF-8 encoded version of the string,
which is SQLite's internal storage format for TEXT.

## Custom Text Factory Function

You can define a custom function to process TEXT values in specific ways before
they become Python objects.

custom_text_factory.py
  

import sqlite3

def upper_case_factory(b):
    return b.decode('utf-8').upper()

with sqlite3.connect(':memory:') as conn:
    conn.text_factory = upper_case_factory
    conn.execute("CREATE TABLE test (id INTEGER, text_data TEXT)")
    conn.execute("INSERT INTO test VALUES (1, 'Hello World')")
    
    cursor = conn.cursor()
    cursor.execute("SELECT text_data FROM test WHERE id = 1")
    result = cursor.fetchone()[0]
    print(result)  # HELLO WORLD

This custom factory converts all TEXT values to uppercase. The function receives
the raw bytes from SQLite and returns the processed Python object.

Custom factories are powerful for data transformation but should be used
judiciously as they affect all TEXT column retrievals.

## Handling Different Encodings

The text_factory can be used to handle non-UTF-8 text encodings
stored in SQLite databases.

encoding_text_factory.py
  

import sqlite3

def latin1_decoder(b):
    return b.decode('latin-1')

with sqlite3.connect(':memory:') as conn:
    conn.text_factory = latin1_decoder
    # Store Latin-1 encoded text directly as bytes
    conn.execute("CREATE TABLE test (id INTEGER, text_data TEXT)")
    conn.execute("INSERT INTO test VALUES (1, ?)", 
                ('Héllö Wørld'.encode('latin-1'),))
    
    cursor = conn.cursor()
    cursor.execute("SELECT text_data FROM test WHERE id = 1")
    result = cursor.fetchone()[0]
    print(result)  # Héllö Wørld

This example demonstrates handling Latin-1 encoded text. The custom factory
decodes the bytes using the correct encoding.

When working with legacy databases or specific encoding requirements, custom
text factories provide the necessary flexibility.

## Using Lambda as Text Factory

For simple transformations, a lambda function can serve as a concise
text_factory.

lambda_text_factory.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.text_factory = lambda b: b.decode('utf-8').strip().title()
    conn.execute("CREATE TABLE test (id INTEGER, text_data TEXT)")
    conn.execute("INSERT INTO test VALUES (1, '  hello world  ')")
    
    cursor = conn.cursor()
    cursor.execute("SELECT text_data FROM test WHERE id = 1")
    result = cursor.fetchone()[0]
    print(result)  # Hello World

This lambda function trims whitespace and title-cases all TEXT values. Lambdas
are convenient for simple one-line transformations.

For more complex processing, a named function (as in previous examples) is
usually more maintainable.

## Disabling Text Conversion

Setting text_factory = None disables all conversion, returning
the raw bytes exactly as stored in SQLite.

none_text_factory.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.text_factory = None
    conn.execute("CREATE TABLE test (id INTEGER, text_data TEXT)")
    conn.execute("INSERT INTO test VALUES (1, 'Hello World')")
    
    cursor = conn.cursor()
    cursor.execute("SELECT text_data FROM test WHERE id = 1")
    result = cursor.fetchone()[0]
    print(type(result), result)  # &lt;class 'bytes'&gt; b'Hello World'

With text_factory = None, TEXT values are returned as raw bytes
without any decoding attempt. This is similar to using bytes but
without the automatic UTF-8 decoding that str would perform.

This approach is useful when you need to handle the encoding manually or when
working with binary data stored in TEXT columns.

## Best Practices

- **Use default str for Unicode:** Best for most applications

- **Handle encodings carefully:** Be explicit about text encodings

- **Consider performance:** Custom factories add overhead

- **Document custom factories:** Make behavior clear to other developers

- **Test thoroughly:** Especially with non-UTF-8 data

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Data Types](https://www.sqlite.org/datatype3.html)

- [SQLite Expressions](https://www.sqlite.org/lang_expr.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).