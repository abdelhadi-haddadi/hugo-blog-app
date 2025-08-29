+++
title = "PostgreSQL UPDATE Statement"
date = 2025-08-29T20:06:42.878+01:00
draft = false
description = "This is tutorial on the PostgreSQL UPDATE statement, covering how to modify data in tables with practical examples."
image = ""
imageBig = ""
categories = ["postgresql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PostgreSQL UPDATE Statement

last modified February 25, 2025

The PostgreSQL UPDATE statement is used to modify existing rows in a
table. It allows you to change the values of one or more columns in one or more
rows. This tutorial covers how to use the UPDATE statement with
practical examples.

The UPDATE statement can be used with a WHERE clause to
filter rows for updating or without a WHERE clause to update all
rows in a table. It is important to use this statement carefully, as it
permanently modifies data.

## Basic UPDATE Statement

This example demonstrates how to update a single row in the books
table:

basic_update.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

UPDATE books
SET price = 14.99
WHERE book_id = 101;

The UPDATE statement specifies the table, the SET
clause defines the new value, and the WHERE clause identifies the
row to update.

## Update Multiple Columns

This example demonstrates how to update multiple columns in a single row:

update_multiple_columns.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

UPDATE books
SET price = 16.50, publication_year = 2023
WHERE book_id = 102;

The SET clause updates both the price and
publication_year columns for the specified row.

## Update All Rows

This example demonstrates how to update all rows in the books table:

update_all_rows.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

UPDATE books
SET price = price * 1.1;

The UPDATE statement without a WHERE clause updates
all rows in the table. In this case, the price of all books is increased by 10%.

## Update with Subquery

This example demonstrates how to update rows using a subquery:

update_with_subquery.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

UPDATE books
SET price = price * 1.2
WHERE book_id IN (
    SELECT book_id FROM books
    WHERE publication_year &lt; 2000
);

The subquery identifies rows to update based on the publication_year
column.

## Update with JOIN

This example demonstrates how to update rows using a JOIN:

update_with_join.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author_id INTEGER REFERENCES authors(author_id),
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

-- CREATE TABLE authors (
--     author_id INTEGER PRIMARY KEY,
--     name VARCHAR(100) NOT NULL
-- );

UPDATE books
SET price = price * 1.15
FROM authors
WHERE books.author_id = authors.author_id
AND authors.name = 'Jane Doe';

The FROM clause joins the books and authors
tables, and the WHERE clause filters rows for updating.

## Update with RETURNING Clause

This example demonstrates how to update rows and return the updated data:

update_returning.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

UPDATE books
SET price = price * 1.1
WHERE genre = 'Sci-Fi'
RETURNING *;

The RETURNING clause returns the updated rows, which is useful for
verification or further processing.

## Update with CASE Statement

This example demonstrates how to update rows conditionally using a CASE
statement:

update_with_case.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

UPDATE books
SET price = CASE
    WHEN publication_year &lt; 2000 THEN price * 1.2
    WHEN publication_year BETWEEN 2000 AND 2010 THEN price * 1.1
    ELSE price * 1.05
END;

The CASE statement applies different updates based on the
publication_year column.

## Update with DEFAULT Values

This example demonstrates how to update a column to its default value:

update_with_default.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL DEFAULT 0.00 CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

UPDATE books
SET price = DEFAULT
WHERE book_id = 103;

The DEFAULT keyword sets the price column to its
default value.

## Update with CURRENT_TIMESTAMP

This example demonstrates how to update a column with the current timestamp:

update_with_timestamp.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025),
--     last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

UPDATE books
SET last_updated = CURRENT_TIMESTAMP
WHERE book_id = 104;

The CURRENT_TIMESTAMP function updates the last_updated
column with the current date and time.

## Best Practices for Using UPDATE

- **Use WHERE Clause Carefully:** Always double-check the WHERE clause to avoid updating unintended rows.

- **Backup Data:** Backup your data before performing large updates.

- **Use Transactions:** Wrap UPDATE statements in a transaction to ensure atomicity.

- **Test with SELECT:** Test your WHERE clause with a SELECT statement before updating.

## Source

[PostgreSQL Documentation](https://www.postgresql.org/docs/)

In this article, we have explored how to use the PostgreSQL UPDATE
statement to modify data in tables, with practical examples and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.