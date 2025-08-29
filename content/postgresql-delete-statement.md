+++
title = "PostgreSQL DELETE Statement"
date = 2025-08-29T20:06:41.759+01:00
draft = false
description = "This is tutorial on the PostgreSQL DELETE statement, covering how to remove data from tables with practical examples."
image = ""
imageBig = ""
categories = ["postgresql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PostgreSQL DELETE Statement

last modified March 1, 2025

The PostgreSQL DELETE statement is used to remove rows from a
table. It is a powerful operation that allows you to delete specific rows or all
rows from a table. This tutorial covers how to use the DELETE
statement with practical examples.

The DELETE statement can be used with a WHERE clause
to filter rows for deletion or without a WHERE clause to delete all
rows from a table. It is important to use this statement carefully, as it
permanently removes data.

## Basic DELETE Statement

This example demonstrates how to delete a single row from the books
table:

basic_delete.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

DELETE FROM books
WHERE book_id = 101;

The DELETE FROM statement specifies the table, and the
WHERE clause identifies the row to delete.

## Delete Multiple Rows

This example demonstrates how to delete multiple rows from the books
table:

delete_multiple_rows.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

DELETE FROM books
WHERE genre = 'Sci-Fi';

The WHERE clause filters rows by the genre column, and
all matching rows are deleted.

## Delete All Rows

This example demonstrates how to delete all rows from the books
table:

delete_all_rows.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

DELETE FROM books;

The DELETE FROM statement without a WHERE clause
deletes all rows from the table.

## Delete with Subquery

This example demonstrates how to delete rows using a subquery:

delete_with_subquery.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

DELETE FROM books
WHERE book_id IN (
    SELECT book_id FROM books
    WHERE publication_year &lt; 2000
);

The subquery identifies rows to delete based on the publication_year
column.

## Delete with JOIN

This example demonstrates how to delete rows using a JOIN:

delete_with_join.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

-- CREATE TABLE authors (
--     author_id INTEGER PRIMARY KEY,
--     name VARCHAR(100) NOT NULL
-- );

DELETE FROM books
USING authors
WHERE books.author = authors.name
AND authors.name = 'Jane Doe';

The USING clause joins the books and authors
tables, and the WHERE clause filters rows for deletion.

## Delete with RETURNING Clause

This example demonstrates how to delete rows and return the deleted data:

delete_returning.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

DELETE FROM books
WHERE genre = 'Horror'
RETURNING *;

The RETURNING clause returns the deleted rows, which is useful for
verification or further processing.

## Delete with ON DELETE CASCADE

This example demonstrates how to delete rows from a parent table and automatically
delete related rows from a child table:

delete_cascade.sql
  

-- CREATE TABLE authors (
--     author_id INTEGER PRIMARY KEY,
--     name VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author_id INTEGER REFERENCES authors(author_id) ON DELETE CASCADE,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

DELETE FROM authors
WHERE author_id = 1;

The ON DELETE CASCADE constraint ensures that deleting a row from
the authors table also deletes related rows from the
books table.

## Delete with LIMIT

This example demonstrates how to delete a limited number of rows:

delete_with_limit.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

DELETE FROM books
WHERE genre = 'Mystery'
LIMIT 2;

The LIMIT clause restricts the number of rows deleted.

## Delete with EXISTS

This example demonstrates how to delete rows using the EXISTS
clause:

delete_with_exists.sql
  

-- CREATE TABLE books (
--     book_id INTEGER PRIMARY KEY,
--     title VARCHAR(100) NOT NULL,
--     author VARCHAR(100) NOT NULL,
--     genre VARCHAR(50) NOT NULL,
--     price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
--     publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
-- );

DELETE FROM books
WHERE EXISTS (
    SELECT 1 FROM authors
    WHERE authors.name = books.author
    AND authors.name = 'John Smith'
);

The EXISTS clause checks for the existence of related rows in the
authors table.

## Best Practices for Using DELETE

- **Use WHERE Clause Carefully:** Always double-check the WHERE clause to avoid deleting unintended rows.

- **Backup Data:** Backup your data before performing large deletions.

- **Use Transactions:** Wrap DELETE statements in a transaction to ensure atomicity.

- **Test with SELECT:** Test your WHERE clause with a SELECT statement before deleting.

## Source

[PostgreSQL Documentation](https://www.postgresql.org/docs/)

In this article, we have explored how to use the PostgreSQL DELETE
statement to remove data from tables, with practical examples and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).