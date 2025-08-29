+++
title = "Python sqlite3.Cursor.description Attribute"
date = 2025-08-29T20:10:38.901+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.description attribute covering metadata access, column information, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.description Attribute

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.description
attribute, which provides metadata about query results. We'll cover its structure,
usage patterns, and practical applications in database programming.

## Basic Definitions

The description attribute of a SQLite cursor is a read-only property
that returns information about the columns in the result set of a query. It's
available after executing a SELECT statement.

The attribute contains a sequence of 7-item tuples, one per column. Each tuple
describes a column's name, type, display size, internal size, precision, scale,
and nullability. Only the first item (name) is always provided in SQLite.

## Basic Usage of description

This example shows the basic usage of the description attribute to
examine column information from a query result.

basic_description.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.execute('''CREATE TABLE products
                    (id INTEGER PRIMARY KEY, name TEXT, price REAL)''')
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    
    # Access the description attribute
    columns = cursor.description
    for col in columns:
        print(f"Column name: {col[0]}, Type: {col[1]}")
    
    # Output:
    # Column name: id, Type: None
    # Column name: name, Type: None
    # Column name: price, Type: None

The example creates an in-memory database with a products table. After executing
a SELECT query, we access cursor.description to get column info.

Note that SQLite doesn't provide type information in the description attribute,
so the type field is None. Only column names are reliably available.

## Getting Column Names

A common use of description is to extract column names from query
results, which is useful for dynamic processing of result sets.

column_names.py
  

import sqlite3

with sqlite3.connect('employees.db') as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT id, first_name, last_name, department FROM employees")
    
    # Extract column names from description
    column_names = [description[0] for description in cursor.description]
    print("Column names:", column_names)
    
    # Process rows with column names
    for row in cursor.fetchall():
        row_dict = dict(zip(column_names, row))
        print(f"{row_dict['first_name']} {row_dict['last_name']}")

This example demonstrates how to extract column names from the description
attribute and use them to create dictionaries for each row. The first item
of each tuple in description contains the column name.

This technique is particularly useful when building generic database tools or
when you need to process result sets without knowing the column names in advance.

## Building a Dynamic Result Processor

We can use description to create a function that automatically
converts query results into dictionaries with column names as keys.

dynamic_processor.py
  

import sqlite3

def query_to_dicts(db_path, sql, params=None):
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(sql) if params is None else cursor.execute(sql, params)
        
        # Get column names from description
        columns = [col[0] for col in cursor.description]
        
        # Convert each row to a dictionary
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

# Usage example
results = query_to_dicts('inventory.db', "SELECT * FROM items WHERE quantity &gt; ?", (5,))
for item in results:
    print(f"{item['name']}: {item['quantity']} in stock")

This example shows a reusable function that takes any query and returns its
results as dictionaries. The column names from description become
the dictionary keys.

The function handles parameterized queries safely and automatically closes
database resources using context managers. This pattern is useful for building
database abstraction layers.

## Validating Query Results

The description attribute can be used to validate that a query
returned the expected columns before processing the results.

validation.py
  

import sqlite3

def validate_columns(cursor, expected_columns):
    actual_columns = [col[0].lower() for col in cursor.description]
    expected_columns = [col.lower() for col in expected_columns]
    
    if set(actual_columns) != set(expected_columns):
        raise ValueError(f"Expected columns {expected_columns}, got {actual_columns}")

with sqlite3.connect('sales.db') as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT product_id, quantity, unit_price FROM order_details")
    
    # Validate the returned columns
    try:
        validate_columns(cursor, ['product_id', 'quantity', 'unit_price'])
        for row in cursor:
            print(f"Product {row[0]}: {row[1]} x {row[2]}")
    except ValueError as e:
        print("Query validation failed:", e)

This example demonstrates how to use the description attribute to verify that
a query returned the expected columns before processing the results. The
validation is case-insensitive.

This technique helps catch schema changes or query errors early, making your
database code more robust, especially in long-running applications.

## Generating CSV Output

We can use description to automatically generate CSV output from
query results, including proper column headers.

csv_output.py
  

import sqlite3
import csv

def query_to_csv(db_path, sql, output_file, params=None):
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(sql) if params is None else cursor.execute(sql, params)
        
        # Write CSV with headers from description
        with open(output_file, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([col[0] for col in cursor.description])
            writer.writerows(cursor)

# Usage example
query_to_csv('customers.db', 
             "SELECT id, name, email, join_date FROM customers WHERE active = 1",
             "active_customers.csv")

This example shows how to use the description attribute to automatically
generate a CSV file with proper column headers from any query result.

The function handles both simple queries and parameterized queries, and
properly manages both database and file resources using context managers.

## Building a Data Class from Query Results

We can use description to dynamically create dataclass instances
from query results, with properties matching the column names.

dataclass_builder.py
  

import sqlite3
from dataclasses import make_dataclass

def query_to_dataclass(db_path, sql, class_name, params=None):
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(sql) if params is None else cursor.execute(sql, params)
        
        # Create dataclass with fields from description
        fields = [(col[0], type(val)) for col, val in zip(cursor.description, cursor.fetchone())]
        DataClass = make_dataclass(class_name, fields)
        
        # Reset cursor to beginning
        cursor.execute(sql) if params is None else cursor.execute(sql, params)
        
        # Create instances for all rows
        return [DataClass(*row) for row in cursor.fetchall()]

# Usage example
products = query_to_dataclass('inventory.db', 
                            "SELECT id, name, price FROM products WHERE stock &gt; 0",
                            "Product")
for prod in products:
    print(f"{prod.name}: ${prod.price:.2f}")

This advanced example demonstrates how to use the description attribute along
with Python's dataclasses module to dynamically create typed objects from
query results.

The function examines the first row to determine appropriate types for each
field, then creates a dataclass with properties matching the column names.
All rows are then converted to instances of this class.

## Debugging Query Results

The description attribute is invaluable for debugging database
queries, especially when working with dynamic or complex queries.

debugging.py
  

import sqlite3

def debug_query(db_path, sql, params=None):
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(sql) if params is None else cursor.execute(sql, params)
        
        print("Query executed successfully")
        print(f"Returned {len(cursor.description)} columns:")
        
        for i, col in enumerate(cursor.description, 1):
            print(f"{i}. {col[0]} (Type code: {col[1]})")
        
        print("\nFirst 5 rows:")
        for i, row in enumerate(cursor.fetchmany(5), 1):
            print(f"Row {i}: {row}")

# Usage example
debug_query('library.db', 
           '''SELECT b.title, a.name, COUNT(l.id) as loans
              FROM books b JOIN authors a ON b.author_id = a.id
              LEFT JOIN loans l ON b.id = l.book_id
              GROUP BY b.id
              ORDER BY loans DESC''')

This example shows a debugging function that uses the description attribute
to provide detailed information about query results, including column names
and sample data.

Such debugging tools are particularly useful during development or when
troubleshooting complex queries in production environments.

## Best Practices

- **Check description after execute:** It's only populated after running a query

- **Handle empty results:** description exists even for empty result sets

- **Use for dynamic processing:** Great for tools that work with arbitrary queries

- **Remember SQLite limitations:** Type information may not be available

- **Combine with row_factory:** For more sophisticated result processing

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [PEP 249 - DB API 2.0](https://www.python.org/dev/peps/pep-0249/)

- [SQLite Data Types](https://www.sqlite.org/datatype3.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).