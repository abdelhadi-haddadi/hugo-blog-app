+++
title = "Python sqlite3.Cursor.fetchall Method"
date = 2025-08-29T20:10:41.252+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.fetchall method covering database queries, result fetching, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.fetchall Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.fetchall method,
the primary way to retrieve all query results from SQLite databases. We'll cover basic
usage, performance considerations, and practical examples.

## Basic Definitions

The fetchall method retrieves all remaining rows from a query result set.
It returns a list of tuples where each tuple represents a row from the database.

Key characteristics: it consumes all results at once, returns an empty list if no rows
are available, and should be used after executing a SELECT statement with the cursor.

## Basic fetchall Usage

Here's the simplest usage of fetchall to retrieve all rows from a table.
The example demonstrates proper resource management with context managers.

basic_fetchall.py
  

import sqlite3

# Using context managers for both connection and cursor
with sqlite3.connect('example.db') as conn:
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM users")
        all_rows = cursor.fetchall()
        
        for row in all_rows:
            print(f"ID: {row[0]}, Name: {row[1]}, Age: {row[2]}")

This example shows the basic workflow: connect to database, create cursor, execute
SELECT query, fetch all results, and iterate through them. The context managers
ensure proper resource cleanup.

The fetchall method returns all rows as a list of tuples, where each
tuple contains column values in the order specified in the SELECT statement.

## Fetching Empty Results

When no rows match the query, fetchall returns an empty list rather
than None or raising an exception. This example demonstrates this behavior.

empty_results.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    with conn.cursor() as cursor:
        # Query with no matching rows
        cursor.execute("SELECT * FROM users WHERE age &gt; 100")
        results = cursor.fetchall()
        
        print(f"Number of rows: {len(results)}")  # 0
        print(f"Type of results: {type(results)}")  # &lt;class 'list'&gt;

This example shows that fetchall consistently returns a list, even
when no rows are found. This behavior makes it safe to iterate over the results
without additional type checking.

The empty list return value is useful for conditional logic that needs to handle
both populated and empty result sets the same way.

## Combining with Parameterized Queries

fetchall works seamlessly with parameterized queries, which are
essential for preventing SQL injection. This example demonstrates this combination.

parameterized_query.py
  

import sqlite3

min_age = 25
max_age = 40

with sqlite3.connect('example.db') as conn:
    with conn.cursor() as cursor:
        # Parameterized query with fetchall
        cursor.execute(
            "SELECT * FROM users WHERE age BETWEEN ? AND ?",
            (min_age, max_age)
        )
        
        matching_users = cursor.fetchall()
        for user in matching_users:
            print(user)

This example shows how to safely use parameters in queries while still benefiting
from fetchall to retrieve all matching rows. The parameters are
passed as a tuple to the execute method.

Parameterized queries are crucial for security and also improve performance by
allowing SQLite to reuse query plans for similar queries with different values.

## Working with Large Result Sets

While fetchall is convenient, it loads all results into memory at
once. For large datasets, consider alternatives like fetchmany.

large_results.py
  

import sqlite3

with sqlite3.connect('large_db.db') as conn:
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM big_table")
        
        # Process in batches to reduce memory usage
        batch_size = 1000
        while True:
            batch = cursor.fetchmany(batch_size)
            if not batch:
                break
                
            for row in batch:
                process_row(row)  # Your processing function

This example demonstrates a more memory-efficient approach for large datasets.
While it doesn't use fetchall, it's important to understand when
not to use it.

For moderate-sized result sets (up to thousands of rows), fetchall
is perfectly acceptable and often more convenient than manual batching.

## Using with Custom Row Factories

fetchall works well with custom row factories that transform how
rows are represented. This example uses the built-in sqlite3.Row.

row_factory.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    conn.row_factory = sqlite3.Row  # Enable named column access
    with conn.cursor() as cursor:
        cursor.execute("SELECT name, age FROM users")
        rows = cursor.fetchall()
        
        for row in rows:
            print(f"{row['name']} is {row['age']} years old")

This example shows how fetchall returns rows that can be accessed
both by index and by column name when using the sqlite3.Row factory.

The Row factory provides a nice balance between convenience and
performance, making code more readable while maintaining efficiency.

## Combining with JOIN Operations

fetchall can handle complex queries with JOINs, returning all
related data in a single call. This example demonstrates a multi-table query.

join_query.py
  

import sqlite3

with sqlite3.connect('library.db') as conn:
    with conn.cursor() as cursor:
        query = """
        SELECT books.title, authors.name, books.publication_year 
        FROM books
        JOIN authors ON books.author_id = authors.id
        WHERE books.genre = ?
        """
        cursor.execute(query, ('Science Fiction',))
        
        sci_fi_books = cursor.fetchall()
        for book in sci_fi_books:
            title, author, year = book
            print(f"{title} by {author} ({year})")

This example shows fetchall being used with a JOIN query that
combines data from multiple tables. Each returned tuple contains columns from
all tables in the JOIN.

The method handles complex result sets just as well as simple single-table
queries, making it versatile for various query types.

## Using with Aggregate Functions

fetchall works with queries using aggregate functions like COUNT,
SUM, or AVG. This example demonstrates statistical queries.

aggregate_functions.py
  

import sqlite3

with sqlite3.connect('sales.db') as conn:
    with conn.cursor() as cursor:
        # Multiple aggregate functions in one query
        cursor.execute("""
            SELECT 
                COUNT(*) as total_orders,
                AVG(amount) as avg_amount,
                MAX(amount) as max_sale,
                MIN(amount) as min_sale
            FROM orders
            WHERE order_date BETWEEN ? AND ?
        """, ('2024-01-01', '2024-12-31'))
        
        stats = cursor.fetchall()[0]  # Get first (and only) row
        print(f"Total orders: {stats[0]}")
        print(f"Average amount: ${stats[1]:.2f}")
        print(f"Largest sale: ${stats[2]:.2f}")
        print(f"Smallest sale: ${stats[3]:.2f}")

This example shows how fetchall can be used with aggregate queries
that return a single row of calculated values. We access the first (and only)
row from the result list.

Even for single-row results, fetchall returns a list containing
one tuple, maintaining consistent behavior across all query types.

## Best Practices

- **Use for moderate result sets:** Avoid for very large datasets

- **Close resources properly:** Always use context managers

- **Combine with parameterized queries:** For security

- **Consider memory usage:** Be aware of dataset size

- **Use row factories:** For more readable code

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite SELECT Documentation](https://www.sqlite.org/lang_select.html)

- [SQLite C API Fetch Functions](https://www.sqlite.org/c3ref/fetch.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).