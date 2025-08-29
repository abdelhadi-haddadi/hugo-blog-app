+++
title = "Introduction to SQL with PostgreSQL"
date = 2025-08-29T20:06:42.884+01:00
draft = false
description = "Introductory SQL tutorial with PostgreSQL, covering basic queries, filtering, sorting, and aggregations with practical examples."
image = ""
imageBig = ""
categories = ["postgresql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to SQL with PostgreSQL

last modified February 25, 2025

SQL (Structured Query Language) is a standard language for managing and
manipulating relational databases. PostgreSQL is a powerful, open-source
relational database system. This tutorial covers the basics of SQL using
PostgreSQL, including creating tables, inserting data, and querying data.

We will use a dataset of books to demonstrate SQL concepts. The dataset includes
information about books, such as their title, author, genre, price, and
publication year.

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

## Basic SQL Queries

This section covers basic SQL queries to retrieve data from the
books table.

### Select All Books

To retrieve all books from the table, the following SQL query is used:

select_all.sql
  

SELECT * FROM books;

This query uses the SELECT statement to fetch all columns and rows
from the books table. The asterisk (*) is a wildcard
that represents all columns in the table.

### Select Specific Columns

To retrieve only the title and author columns from the
books table, the following SQL query is used:

select_columns.sql
  

SELECT title, author FROM books;

This query uses the SELECT statement to specify the columns
title and author from the books table.
Only these two columns are returned for all rows in the table.

### Filtering Data

To retrieve books published after the year 2020, the following SQL query is used:

filter_books.sql
  

SELECT * FROM books
WHERE publication_year &gt; 2020;

This query uses the WHERE clause to filter rows based on the
condition publication_year &gt; 2020. Only books published after 2020
are returned.

### Sorting Data

To retrieve books sorted by their price in ascending order, the following SQL
query is used:

sort_books.sql
  

SELECT * FROM books
ORDER BY price ASC;

This query uses the ORDER BY clause to sort the results by the
price column in ascending order (ASC). The books are
returned starting with the lowest price.

### Aggregating Data

To calculate the total number of books in the books table, the
following SQL query is used:

count_books.sql
  

SELECT COUNT(*) AS total_books FROM books;

This query uses the COUNT function, which returns the total number
of rows in the books table. The result is aliased as
total_books.

### Filter by Genre

To retrieve all books in the "Sci-Fi" genre, the following SQL query is used:

filter_by_genre.sql
  

SELECT * FROM books
WHERE genre = 'Sci-Fi';

This query uses the WHERE clause to filter rows where the
genre column matches the value 'Sci-Fi'. Only books in the "Sci-Fi"
genre are returned.

### Filter by Price Range

To retrieve books with a price between $10 and $20, the following SQL query is used:

filter_by_price_range.sql
  

SELECT * FROM books
WHERE price BETWEEN 10 AND 20;

This query uses the BETWEEN operator in the WHERE
clause to filter rows where the price column is between $10 and
$20, inclusive.

### Filter by Multiple Conditions

To retrieve books published after 2020 in the "Fantasy" genre, the following SQL
query is used:

filter_by_multiple_conditions.sql
  

SELECT * FROM books
WHERE publication_year &gt; 2020 AND genre = 'Fantasy';

This query uses the WHERE clause with the AND operator
to filter rows that meet both conditions: publication_year &gt; 2020
and genre = 'Fantasy'.

### Sort by Publication Year (Descending)

To retrieve all books sorted by their publication year in descending order, the
following SQL query is used:

sort_by_year_desc.sql
  

SELECT * FROM books
ORDER BY publication_year DESC;

This query uses the ORDER BY clause to sort the results by the
publication_year column in descending order (DESC).
The books are returned starting with the most recent publication year.

### Limit Results

To retrieve the first 5 books from the books table, the following SQL query is used:

limit_results.sql
  

SELECT * FROM books
LIMIT 5;

This query uses the LIMIT clause to restrict the number of rows
returned to 5. Only the first 5 books in the table are retrieved.

### Count Books by Genre

To count the number of books in each genre, the following SQL query is used:

count_by_genre.sql
  

SELECT genre, COUNT(*) AS book_count
FROM books
GROUP BY genre;

This query uses the GROUP BY clause to group the results by the
genre column. The COUNT function is used to count the
number of books in each genre, and the result is aliased as
book_count.

### Average Price by Genre

To calculate the average price of books in each genre, the following SQL query is used:

avg_price_by_genre.sql
  

SELECT genre, AVG(price) AS avg_price
FROM books
GROUP BY genre;

This query uses the GROUP BY clause to group the results by the
genre column. The AVG function calculates the average
price of books in each genre, and the result is aliased as
avg_price.

### Find the Most Expensive Book

To retrieve the book with the highest price, the following SQL query is used:

most_expensive_book.sql
  

SELECT * FROM books
ORDER BY price DESC
LIMIT 1;

This query uses the ORDER BY clause to sort the results by the
price column in descending order (DESC). The
LIMIT 1 clause ensures that only the book with the highest price is
returned.

### Find the Oldest Book

To retrieve the oldest book (the one with the earliest publication year), the
following SQL query is used:

oldest_book.sql
  

SELECT * FROM books
ORDER BY publication_year ASC
LIMIT 1;

This query uses the ORDER BY clause to sort the results by the
publication_year column in ascending order (ASC). The
LIMIT 1 clause ensures that only the oldest book is returned.

### Filter by Author

To retrieve all books written by "Jane Doe", the following SQL query is used:

filter_by_author.sql
  

SELECT * FROM books
WHERE author = 'Jane Doe';

This query uses the WHERE clause to filter rows where the
author column matches the value 'Jane Doe'. Only books written by
"Jane Doe" are returned.

### Update a Book's Price

To update the price of the book with book_id = 101 to $14.99, the
following SQL query is used:

update_price.sql
  

UPDATE books
SET price = 14.99
WHERE book_id = 101;

This query uses the UPDATE statement to modify the
price column for the row where book_id = 101. The
SET clause specifies the new price.

### Delete a Book

To delete the book with book_id = 130, the following SQL query is used:

delete_book.sql
  

DELETE FROM books
WHERE book_id = 130;

This query uses the DELETE statement to remove the row from the
books table where book_id = 130.

### Find Books with Titles Containing a Word

To retrieve books with titles containing the word "The", the following SQL query
is used:

filter_by_title.sql
  

SELECT * FROM books
WHERE title LIKE '%The%';

This query uses the LIKE operator in the WHERE clause
to filter rows where the title column contains the word "The". The
% symbols are wildcards that match any sequence of characters.

### Find Books Published in a Specific Year

To retrieve books published in the year 2022, the following SQL query is used:

filter_by_year.sql
  

SELECT * FROM books
WHERE publication_year = 2022;

This query uses the WHERE clause to filter rows where the
publication_year column matches the value 2022. Only books
published in 2022 are returned.

### Calculate Total Revenue by Genre

To calculate the total revenue (sum of prices) for each genre, the following SQL
query is used:

total_revenue_by_genre.sql
  

SELECT genre, SUM(price) AS total_revenue
FROM books
GROUP BY genre;

This query uses the GROUP BY clause to group the results by the
genre column. The SUM function calculates the total
revenue for each genre, and the result is aliased as total_revenue.

## Best Practices for SQL

- **Use Meaningful Column Names:** Choose descriptive names for columns to improve readability.

- **Normalize Data:** Organize data into related tables to reduce redundancy.

- **Use Constraints:** Apply constraints like PRIMARY KEY and NOT NULL to ensure data integrity.

- **Optimize Queries:** Use indexes and avoid unnecessary columns in SELECT statements.

## Source

[PostgreSQL Documentation](https://www.postgresql.org/docs/)

In this article, we have explored the basics of SQL using PostgreSQL, including
creating tables, inserting data, and querying data with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.