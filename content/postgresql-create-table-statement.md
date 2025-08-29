+++
title = "PostgreSQL CREATE TABLE Statement"
date = 2025-08-29T20:06:40.633+01:00
draft = false
description = "This is tutorial on the PostgreSQL CREATE TABLE statement, covering how to create tables with practical examples."
image = ""
imageBig = ""
categories = ["postgresql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PostgreSQL CREATE TABLE Statement

last modified March 1, 2025

The PostgreSQL CREATE TABLE statement is used to create a new table
in a database. It defines the structure of the table, including column names,
data types, and constraints. This tutorial covers how to use the
CREATE TABLE statement with practical examples.

The CREATE TABLE statement is one of the most important SQL
commands, as it lays the foundation for storing and organizing data in a
database.

## Basic CREATE TABLE Statement

This example demonstrates how to create a simple table with basic columns:

basic_create_table.sql
  

CREATE TABLE books (
    book_id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    publication_year INTEGER NOT NULL
);

The books table is created with columns for book_id,
title, author, genre, price,
and publication_year.

The NOT NULL constraint is used to ensure that certain
columns must always contain a value and cannot be left empty or set to NULL. By
specifying NOT NULL for columns such as title,
author, genre, price, and
publication_year, the database enforces that each record in the
table must have valid values for these fields. 

This helps maintain data integrity and consistency by preventing the insertion
of incomplete records. For example, a book record cannot be created without
specifying its title, author, genre, price, and publication year. The
book_id column, which serves as the primary key, is also implicitly
NOT NULL, ensuring that every book has a unique identifier.

## CREATE TABLE with CHECK Constraint

This example demonstrates how to add a CHECK constraint to enforce
data validation:

create_table_with_check.sql
  

CREATE TABLE books (
    book_id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
    publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
);

The CHECK constraints ensure that price is non-negative
and publication_year is within a valid range.

## CREATE TABLE with UNIQUE Constraint

This example demonstrates how to add a UNIQUE constraint to ensure
column values are unique:

create_table_with_unique.sql
  

CREATE TABLE books (
    book_id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL UNIQUE,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    publication_year INTEGER NOT NULL
);

The UNIQUE constraint ensures that no two books have the same title.

## CREATE TABLE with DEFAULT Values

This example demonstrates how to set default values for columns:

create_table_with_default.sql
  

CREATE TABLE books (
    book_id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL DEFAULT 'Unknown',
    price NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    publication_year INTEGER NOT NULL DEFAULT 2023
);

The DEFAULT keyword assigns default values to the genre,
price, and publication_year columns.

## CREATE TABLE with FOREIGN KEY

This example demonstrates how to create a table with a foreign key:

create_table_with_foreign_key.sql
  

CREATE TABLE authors (
    author_id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    book_id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author_id INTEGER REFERENCES authors(author_id),
    genre VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    publication_year INTEGER NOT NULL
);

The author_id column in the books table references the
author_id column in the authors table.

## CREATE TABLE with Composite Primary Key

This example demonstrates how to create a table with a composite primary key:

create_table_with_composite_key.sql
  

CREATE TABLE orders (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    PRIMARY KEY (order_id, product_id)
);

The PRIMARY KEY constraint ensures that the combination of
order_id and product_id is unique.

## CREATE TABLE with SERIAL Primary Key

This example demonstrates how to create a table with an auto-incrementing primary
key:

create_table_with_serial.sql
  

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    publication_year INTEGER NOT NULL
);

The SERIAL data type automatically generates a unique value for the
book_id column.

## CREATE TABLE with TIMESTAMP

This example demonstrates how to create a table with a TIMESTAMP
column:

create_table_with_timestamp.sql
  

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

The order_date column is automatically populated with the current
timestamp when a row is inserted.

## CREATE TABLE with JSONB

This example demonstrates how to create a table with a JSONB column:

create_table_with_jsonb.sql
  

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    metadata JSONB
);

The metadata column stores JSON data, which can be queried and
manipulated using PostgreSQL's JSON functions.

## CREATE TABLE with ENUM

This example demonstrates how to create a table with an ENUM column:

create_table_with_enum.sql
  

CREATE TYPE genre_type AS ENUM ('Fiction', 'Non-Fiction', 'Sci-Fi', 'Mystery');

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre genre_type NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    publication_year INTEGER NOT NULL
);

The genre column is restricted to the values defined in the
genre_type enumeration.

## CREATE TABLE with ARRAY

This example demonstrates how to create a table with an ARRAY column:

create_table_with_array.sql
  

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    tags TEXT[]
);

The tags column stores an array of text values.

## CREATE TABLE with CHECK on ARRAY

This example demonstrates how to add a CHECK constraint on an
ARRAY column:

create_table_with_array_check.sql
  

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    tags TEXT[] CHECK (array_length(tags, 1) &lt;= 5)
);

The CHECK constraint ensures that the tags array
contains no more than 5 elements.

## CREATE TABLE with PARTITIONING

This example demonstrates how to create a partitioned table:

create_table_with_partitioning.sql
  

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    order_date DATE NOT NULL
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2023 PARTITION OF orders
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE orders_2024 PARTITION OF orders
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

The orders table is partitioned by the order_date
column, and separate partitions are created for each year.

## CREATE TABLE with INHERITANCE

This example demonstrates how to create a table that inherits from another table:

create_table_with_inheritance.sql
  

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(5,2) NOT NULL
);

CREATE TABLE books (
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL
) INHERITS (products);

The books table inherits all columns from the products
table and adds additional columns.

## CREATE TABLE with EXCLUDE Constraint

This example demonstrates how to create a table with an EXCLUDE
constraint:

create_table_with_exclude.sql
  

CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    room_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    EXCLUDE USING GIST (
        room_id WITH =,
        daterange(start_date, end_date) WITH &amp;&amp;
    )
);

The EXCLUDE constraint ensures that no two reservations for the same
room overlap in date range.

## Best Practices for Using CREATE TABLE

- **Use Descriptive Column Names:** Choose meaningful names for columns to improve readability.

- **Add Constraints:** Use constraints like PRIMARY KEY, UNIQUE, and CHECK to enforce data integrity.

- **Normalize Data:** Organize data into related tables to reduce redundancy.

- **Use Appropriate Data Types:** Choose the most suitable data type for each column to optimize storage and performance.

## Source

[PostgreSQL Documentation](https://www.postgresql.org/docs/)

In this article, we have explored how to use the PostgreSQL CREATE TABLE
statement to create tables, with practical examples and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).