+++
title = "SQL LIMIT Statement"
date = 2025-08-29T20:06:41.754+01:00
draft = false
description = "Tutorial on the SQL LIMIT statement with PostgreSQL, covering how to restrict query results with practical examples."
image = ""
imageBig = ""
categories = ["postgresql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# SQL LIMIT Statement

last modified February 25, 2025

The SQL LIMIT statement is used to restrict the number of rows
returned by a query. It is particularly useful when working with large datasets
and you only need a subset of the results. This tutorial covers how to use the
LIMIT statement with practical examples.

The LIMIT clause is often used in combination with the
ORDER BY clause to retrieve the top or bottom records based on a
specific column.

## Setting Up the Database

First, let's create the books table and insert sample data.

create_table.sql
  

-- Create the books table
CREATE TABLE books (
    book_id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    price NUMERIC(5,2) NOT NULL CHECK (price &gt;= 0),
    publication_year INTEGER NOT NULL CHECK (publication_year BETWEEN 1900 AND 2025)
);

-- Insert 30 sample book entries
INSERT INTO books (book_id, title, author, genre, price, publication_year) VALUES
(101, 'The Silent Forest', 'Jane Doe', 'Mystery', 12.99, 2020),
(102, 'Code of Tomorrow', 'John Smith', 'Sci-Fi', 15.50, 2022),
(103, 'Cooking Basics', 'Maria Lopez', 'Non-Fiction', 9.99, 2019),
(104, 'Whispers in the Dark', 'Emily Carter', 'Horror', 13.75, 2021),
(105, 'The Last Empire', 'Robert King', 'Fantasy', 18.99, 2018),
(106, 'Data Driven', 'Alex Chen', 'Non-Fiction', 22.00, 2023),
(107, 'Echoes of Time', 'Sarah Miles', 'Sci-Fi', 14.25, 2020),
(108, 'The Red Shadow', 'Tom Harris', 'Thriller', 11.50, 2017),
(109, 'Garden of Dreams', 'Lily Evans', 'Romance', 8.99, 2022),
(110, 'Quantum Leap', 'David Patel', 'Sci-Fi', 16.80, 2024),
(111, 'Broken Chains', 'Anna Reed', 'Historical', 17.45, 2015),
(112, 'The Hungry Flame', 'Mark Stone', 'Fantasy', 19.99, 2021),
(113, 'Simple Joys', 'Clara White', 'Self-Help', 10.25, 2019),
(114, 'Nightmare City', 'Greg Holt', 'Horror', 12.60, 2023),
(115, 'Love in Bloom', 'Sophie Bell', 'Romance', 7.99, 2020),
(116, 'The Codebreaker', 'James Fox', 'Thriller', 14.99, 2018),
(117, 'Stars Unseen', 'Rachel Kim', 'Sci-Fi', 15.75, 2022),
(118, 'The Lost Recipe', 'Elena Ortiz', 'Non-Fiction', 11.20, 2016),
(119, 'Winds of Fate', 'Henry Blake', 'Fantasy', 20.50, 2023),
(120, 'Silent Witness', 'Laura Dean', 'Mystery', 13.30, 2019),
(121, 'Beyond the Veil', 'Chris Ward', 'Horror', 14.00, 2021),
(122, 'The Art of Calm', 'Nina Patel', 'Self-Help', 9.50, 2020),
(123, 'Empire of Dust', 'Oliver Grant', 'Historical', 18.25, 2014),
(124, 'Twist of Trust', 'Kate Lynn', 'Thriller', 12.85, 2022),
(125, 'Heartstrings', 'Emma Rose', 'Romance', 8.75, 2023),
(126, 'The Infinite Loop', 'Sam Carter', 'Sci-Fi', 16.99, 2024),
(127, 'Bread &amp; Soul', 'Luis Gomez', 'Non-Fiction', 10.85, 2018),
(128, 'Dragon's Breath', 'Tara Hill', 'Fantasy', 21.00, 2020),
(129, 'The Locked Door', 'Peter Shaw', 'Mystery', 11.95, 2021),
(130, 'Mind Over Matter', 'Vikram Singh', 'Self-Help', 13.50, 2022);

The books table is created with columns for book_id,
title, author, genre, price,
and publication_year. Constraints like PRIMARY KEY,
NOT NULL, and CHECK ensure data integrity.

## Basic Usage of LIMIT

This example demonstrates how to retrieve the first 5 books from the
books table.

basic_limit.sql
  

SELECT * FROM books
LIMIT 5;

The LIMIT 5 clause restricts the query to return only the first 5
rows from the table.

## LIMIT with ORDER BY

This example retrieves the 5 most expensive books:

limit_with_order.sql
  

SELECT * FROM books
ORDER BY price DESC
LIMIT 5;

The ORDER BY price DESC clause sorts the books by price in
descending order, and LIMIT 5 returns the top 5 results.

## LIMIT with OFFSET

This example retrieves the next 5 books after the first 5:

limit_with_offset.sql
  

SELECT * FROM books
LIMIT 5 OFFSET 5;

The OFFSET 5 clause skips the first 5 rows, and LIMIT 5
returns the next 5 rows.

## LIMIT with WHERE

This example retrieves the first 3 books in the "Sci-Fi" genre:

limit_with_where.sql
  

SELECT * FROM books
WHERE genre = 'Sci-Fi'
LIMIT 3;

The WHERE clause filters the results by genre, and LIMIT 3
returns the first 3 matching rows.

## LIMIT with Aggregation

This example retrieves the top 3 genres with the most books:

limit_with_aggregation.sql
  

SELECT genre, COUNT(*) AS book_count
FROM books
GROUP BY genre
ORDER BY book_count DESC
LIMIT 3;

The GROUP BY clause groups the results by genre, and
LIMIT 3 returns the top 3 genres with the most books.

## LIMIT with JOIN

This example retrieves the first 5 books along with their authors:

limit_with_join.sql
  

SELECT books.title, books.author
FROM books
JOIN authors ON books.author_id = authors.id
LIMIT 5;

The JOIN clause combines data from the books and
authors tables, and LIMIT 5 returns the first 5 rows.

## LIMIT with Subquery

This example retrieves the top 3 most expensive books:

limit_with_subquery.sql
  

SELECT * FROM (
    SELECT * FROM books
    ORDER BY price DESC
) AS top_books
LIMIT 3;

The subquery sorts the books by price in descending order, and the outer query
uses LIMIT 3 to return the top 3 results.

## LIMIT with DISTINCT

This example retrieves the first 5 unique authors:

limit_with_distinct.sql
  

SELECT DISTINCT author
FROM books
LIMIT 5;

The DISTINCT clause ensures that only unique authors are returned,
and LIMIT 5 restricts the results to the first 5 unique authors.

## LIMIT with UNION

This example retrieves the first 5 books from two different tables:

limit_with_union.sql
  

SELECT title, author FROM books
UNION
SELECT title, author FROM old_books
LIMIT 5;

The UNION clause combines results from two tables, and
LIMIT 5 returns the first 5 rows from the combined results.

## LIMIT with Window Functions

This example retrieves the top 3 books in each genre based on price:

limit_with_window.sql
  

SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY genre ORDER BY price DESC) AS rank
    FROM books
) AS ranked_books
WHERE rank &lt;= 3;

The ROW_NUMBER() window function ranks books within each genre by
price, and the outer query filters to return only the top 3 books in each genre.

## Best Practices for Using LIMIT

- **Use with ORDER BY:** Always use LIMIT with ORDER BY to ensure predictable results.

- **Combine with OFFSET:** Use OFFSET to paginate results when working with large datasets.

- **Optimize Performance:** Use LIMIT to reduce the amount of data processed and improve query performance.

- **Test with Subqueries:** Use subqueries to apply LIMIT to intermediate results when needed.

## Source

[PostgreSQL Documentation](https://www.postgresql.org/docs/)

In this article, we have explored how to use the SQL LIMIT statement
to restrict query results, with practical examples and best practices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.