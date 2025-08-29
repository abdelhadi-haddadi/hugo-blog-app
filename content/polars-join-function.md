+++
title = "Polars Join Function"
date = 2025-08-29T20:06:39.515+01:00
draft = false
description = "Python tutorial on Polars, covering how to use the join function for data analysis with practical examples."
image = ""
imageBig = ""
categories = ["polars"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Polars Join Function

last modified March 1, 2025

Polars is a fast DataFrame library in Python for data manipulation. The join
function combines rows from two DataFrames based on a common key. This tutorial
covers how to use the join function in Polars, with practical examples.

Joins are essential for combining datasets, such as merging customer data with
transaction data. Polars supports various join types, including inner, left,
right, and outer joins.

## Inner Join

This example shows how to perform an inner join between two DataFrames.

inner_join.py
  

import polars as pl

df1 = pl.DataFrame({
    'id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie']
})

df2 = pl.DataFrame({
    'id': [2, 3, 4],
    'age': [25, 30, 35]
})

result = df1.join(df2, on='id', how='inner')
print(result)

The join(how='inner') combines rows where the 'id' column matches
in both DataFrames. Only matching rows are included in the result.

## Left Join

This example demonstrates a left join, which includes all rows from the left
DataFrame.

left_join.py
  

import polars as pl

df1 = pl.DataFrame({
    'id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie']
})

df2 = pl.DataFrame({
    'id': [2, 3, 4],
    'age': [25, 30, 35]
})

result = df1.join(df2, on='id', how='left')
print(result)

The join(how='left') includes all rows from df1 and
matching rows from df2. Non-matching rows in df2 are
filled with null values.

## Right Join

This example shows how to perform a right join, which includes all rows from the
right DataFrame.

right_join.py
  

import polars as pl

df1 = pl.DataFrame({
    'id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie']
})

df2 = pl.DataFrame({
    'id': [2, 3, 4],
    'age': [25, 30, 35]
})

result = df1.join(df2, on='id', how='right')
print(result)

The join(how='right') includes all rows from df2 and
matching rows from df1. Non-matching rows in df1 are
filled with null values.

## Outer Join

This example demonstrates an outer join, which includes all rows from both
DataFrames.

outer_join.py
  

import polars as pl

df1 = pl.DataFrame({
    'id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie']
})

df2 = pl.DataFrame({
    'id': [2, 3, 4],
    'age': [25, 30, 35]
})

result = df1.join(df2, on='id', how='outer')
print(result)

The join(how='outer') includes all rows from both DataFrames.
Non-matching rows are filled with null values.

## Join on Multiple Columns

This example shows how to join DataFrames on multiple columns.

multi_column_join.py
  

import polars as pl

df1 = pl.DataFrame({
    'id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie'],
    'dept': ['HR', 'IT', 'Finance']
})

df2 = pl.DataFrame({
    'id': [2, 3, 4],
    'name': ['Bob', 'Charlie', 'David'],
    'dept': ['IT', 'Finance', 'HR']
})

result = df1.join(df2, on=['id', 'name'], how='inner')
print(result)

The join(on=['id', 'name']) combines rows where both 'id' and 'name'
columns match. This is useful for more complex joins.

## Self Join

This example demonstrates a self join, where a DataFrame is joined with itself.

self_join.py
  

import polars as pl

df = pl.DataFrame({
    'id': [1, 2, 3],
    'manager_id': [None, 1, 2]
})

result = df.join(df, left_on='manager_id', right_on='id', how='left')
print(result)

The join(left_on='manager_id', right_on='id') joins the DataFrame
with itself to find manager names for each employee. This is useful for
hierarchical data.

## Cross Join

This example shows how to perform a cross join, which combines all rows from
both DataFrames.

cross_join.py
  

import polars as pl

df1 = pl.DataFrame({
    'color': ['Red', 'Blue']
})

df2 = pl.DataFrame({
    'size': ['S', 'M', 'L']
})

result = df1.join(df2, how='cross')
print(result)

The join(how='cross') creates a Cartesian product of both DataFrames.
This is useful for generating combinations.

## Best Practices for Joins

- **Choose the Right Join Type:** Select the join type that matches your data needs.

- **Check for Duplicates:** Ensure keys are unique to avoid unexpected results.

- **Handle Null Values:** Use null-safe joins or fill nulls as needed.

- **Optimize Performance:** Use indexes or smaller DataFrames for faster joins.

## Source

[Polars Documentation](https://docs.pola.rs/api/python/stable/reference/index.html)

In this article, we have explored how to use the join function in Polars.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Polars tutorials](/all/#polars).