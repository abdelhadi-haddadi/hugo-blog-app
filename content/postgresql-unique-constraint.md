+++
title = "PostgreSQL Unique Constraint"
date = 2025-08-29T20:06:42.873+01:00
draft = false
description = "Tutorial on PostgreSQL Unique constraint with practical examples."
image = ""
imageBig = ""
categories = ["postgresql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PostgreSQL Unique Constraint

last modified February 25, 2025

The UNIQUE constraint ensures that all values in a column are
unique. This tutorial covers how to use the UNIQUE constraint with
practical examples.

## Setting Up the Database

First, let's create the users table with a UNIQUE
constraint on the email column.

create_table.sql
  

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

The UNIQUE constraint ensures that no two users can have the same
email address.

## Basic Unique Constraint

This example demonstrates inserting unique emails into the users
table.

unique_basic.sql
  

INSERT INTO users (username, email) VALUES
('john_doe', 'john@example.com'),
('jane_doe', 'jane@example.com');

Attempting to insert a duplicate email will result in an error.

## Unique Constraint on Multiple Columns

This example creates a UNIQUE constraint on multiple columns.

unique_multiple_columns.sql
  

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    UNIQUE (user_id, product_id)
);

The combination of user_id and product_id must be
unique.

## Adding Unique Constraint to Existing Table

This example adds a UNIQUE constraint to an existing table.

unique_add_to_existing.sql
  

ALTER TABLE users
ADD CONSTRAINT unique_username UNIQUE (username);

The username column must now contain unique values.

## Dropping Unique Constraint

This example drops a UNIQUE constraint from a table.

unique_drop.sql
  

ALTER TABLE users
DROP CONSTRAINT unique_username;

The unique_username constraint is removed from the users
table.

## Unique Constraint with NULL Values

This example shows how UNIQUE constraints handle NULL values.

unique_with_null.sql
  

INSERT INTO users (username, email) VALUES
('alice', NULL),
('bob', NULL);

Multiple NULL values are allowed in a column with a UNIQUE
constraint.

## Unique Constraint with Index

This example creates a unique index on a column.

unique_index.sql
  

CREATE UNIQUE INDEX idx_unique_email
ON users (email);

The idx_unique_email index ensures that the email
column contains unique values.

## Best Practices for Using Unique Constraint

- **Use for Critical Data:** Apply UNIQUE constraints to columns that must contain unique values.

- **Combine with NOT NULL:** Use NOT NULL to ensure columns with UNIQUE constraints are always populated.

- **Index Performance:** Unique constraints automatically create indexes, which can improve query performance.

- **Plan for Scalability:** Consider the impact of unique constraints on large datasets and indexing strategies.

## Source

[PostgreSQL Documentation](https://www.postgresql.org/docs/)

In this article, we have explored how to use the PostgreSQL UNIQUE
constraint with practical examples and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.