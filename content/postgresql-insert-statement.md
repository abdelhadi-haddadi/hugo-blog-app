+++
title = "PostgreSQL INSERT Statement"
date = 2025-08-29T20:06:41.771+01:00
draft = false
description = "This is tutorial on the PostgreSQL INSERT statement, covering how to insert data into tables with practical examples."
image = ""
imageBig = ""
categories = ["postgresql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PostgreSQL INSERT Statement

last modified March 1, 2025

The PostgreSQL INSERT statement is used to add new rows to a table.
It is one of the most fundamental SQL operations and is essential for populating
tables with data. This tutorial covers how to use the INSERT
statement with practical examples.

The INSERT statement can be used to insert a single row, multiple
rows, or data from another table. It can also handle default values and
conditional inserts.

## Basic INSERT Statement

This example demonstrates how to insert a single row into the books
table:

basic_insert.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

INSERT INTO books (book_id, title, author, genre, price, publication_year)
VALUES (131, 'The Hidden Truth', 'Alice Brown', 'Mystery', 12.99, 2023);

The INSERT INTO statement specifies the table and columns, and the
VALUES clause provides the data for the new row.

## Insert Multiple Rows

This example demonstrates how to insert multiple rows into the books
table in a single query:

insert_multiple_rows.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

INSERT INTO books (book_id, title, author, genre, price, publication_year)
VALUES 
    (132, 'The Lost City', 'John Green', 'Adventure', 14.99, 2022),
    (133, 'The Final Chapter', 'Sarah Black', 'Thriller', 16.50, 2021),
    (134, 'The Forgotten Path', 'Emily White', 'Fantasy', 18.75, 2020);

Multiple rows can be inserted by separating each set of values with a comma.

## Insert with Default Values

This example demonstrates how to insert a row using default values for some
columns:

insert_with_defaults.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL DEFAULT 0.00 CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL DEFAULT 2023 CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

INSERT INTO books (book_id, title, author, genre)
VALUES (135, 'The Silent River', 'Michael Blue', 'Mystery');

If a column has a default value defined, it will be used when no value is
provided.

## Insert from Another Table

This example demonstrates how to insert data from another table:

insert_from_table.sql
  

-- CREATE TABLE old_books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

INSERT INTO books (book_id, title, author, genre, price, publication_year)
SELECT book_id, title, author, genre, price, publication_year
FROM old_books
WHERE publication_year &gt; 2010;

The SELECT statement retrieves data from the old_books
table and inserts it into the books table.

## Insert with RETURNING Clause

This example demonstrates how to insert a row and return the inserted data:

insert_returning.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

INSERT INTO books (book_id, title, author, genre, price, publication_year)
VALUES (136, 'The Golden Key', 'Laura Green', 'Fantasy', 19.99, 2024)
RETURNING *;

The RETURNING clause returns the inserted row, which is useful for
verification or further processing.

## Insert with ON CONFLICT

This example demonstrates how to handle conflicts when inserting data:

insert_on_conflict.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

INSERT INTO books (book_id, title, author, genre, price, publication_year)
VALUES (101, 'The Silent Forest', 'Jane Doe', 'Mystery', 12.99, 2020)
ON CONFLICT (book_id) DO NOTHING;

The ON CONFLICT clause ensures that no action is taken if a row with
the same book_id already exists.

## Insert with ON CONFLICT UPDATE

This example demonstrates how to update an existing row if a conflict occurs:

insert_on_conflict_update.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

INSERT INTO books (book_id, title, author, genre, price, publication_year)
VALUES (101, 'The Silent Forest', 'Jane Doe', 'Mystery', 14.99, 2020)
ON CONFLICT (book_id) DO UPDATE
SET price = EXCLUDED.price;

The ON CONFLICT ... DO UPDATE clause updates the price
column if a row with the same book_id already exists.

## Insert with Subquery

This example demonstrates how to insert data using a subquery:

insert_with_subquery.sql
  

-- CREATE TABLE old_books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

INSERT INTO books (book_id, title, author, genre, price, publication_year)
SELECT book_id, title, author, genre, price, publication_year
FROM old_books
WHERE genre = 'Sci-Fi';

The subquery retrieves data from the old_books table and inserts it
into the books table.

## Insert with JSON Data

This example demonstrates how to insert JSON data into a table:

insert_json.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025),
--     metadata JSONB
-- );

INSERT INTO books (book_id, title, author, genre, price, publication_year, metadata)
VALUES (137, 'The Digital World', 'Chris Tech', 'Sci-Fi', 21.99, 2025, '{"pages": 320, "publisher": "TechPress"}');

The metadata column stores JSON data, which can be queried and
manipulated using PostgreSQL's JSON functions.

## Insert with CURRENT_TIMESTAMP

This example demonstrates how to insert the current timestamp into a table:

insert_timestamp.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025),
--     added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

INSERT INTO books (book_id, title, author, genre, price, publication_year, added_on)
VALUES (138, 'The Time Machine', 'H.G. Wells', 'Sci-Fi', 9.99, 1895, CURRENT_TIMESTAMP);

The CURRENT_TIMESTAMP function inserts the current date and time
into the added_on column.

## Best Practices for Using INSERT

- **Use Explicit Column Names:** Always specify column names to avoid errors and improve readability.

- **Handle Conflicts:** Use ON CONFLICT to handle duplicate key errors gracefully.

- **Validate Data:** Ensure data meets table constraints before inserting.

- **Use Transactions:** Wrap multiple INSERT statements in a transaction for atomicity.

## Source

[PostgreSQL Documentation](https://www.postgresql.org/docs/)

In this article, we have explored how to use the PostgreSQL INSERT
statement to add data to tables, with practical examples and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.