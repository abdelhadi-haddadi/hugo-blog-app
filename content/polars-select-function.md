+++
title = "Polars Select Function"
date = 2025-08-29T20:06:39.506+01:00
draft = false
description = "Python tutorial on Polars, covering how to use the select function for data manipulation with practical examples."
image = ""
imageBig = ""
categories = ["polars"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Polars Select Function

last modified March 1, 2025

Polars is a fast, efficient DataFrame library in Python. The select
function is used to choose specific columns from a DataFrame. This tutorial
covers how to use the select function with practical examples.

The select function is essential for data manipulation tasks like
filtering columns, renaming, and applying transformations. Polars provides a
simple and intuitive API for these operations.

## Basic Column Selection

This example shows how to select specific columns from a DataFrame.

basic_select.py
  

import polars as pl

df = pl.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
})

selected = df.select(['A', 'B'])
print(selected)

The select(['A', 'B']) selects columns 'A' and 'B' from the
DataFrame. This is useful for focusing on specific data.

## Select with Renaming

This example demonstrates renaming columns during selection.

select_rename.py
  

import polars as pl

df = pl.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
})

selected = df.select([
    pl.col('A').alias('Column1'),
    pl.col('B').alias('Column2')
])
print(selected)

The alias function renames columns during selection. This is useful
for creating more readable column names.

## Select with Expression

This example shows how to apply an expression during column selection.

select_expression.py
  

import polars as pl

df = pl.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
})

selected = df.select([
    (pl.col('A') + pl.col('B')).alias('Sum')
])
print(selected)

The pl.col('A') + pl.col('B') expression calculates the sum of
columns 'A' and 'B'. This is useful for creating derived columns.

## Select with Filter

This example demonstrates filtering rows during column selection.

select_filter.py
  

import polars as pl

df = pl.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
})

selected = df.select([
    pl.col('A').filter(pl.col('A') &gt; 1)
])
print(selected)

The filter(pl.col('A') &gt; 1) filters rows where column 'A' is greater
than 1. This is useful for conditional data selection.

## Select with Aggregation

This example shows how to aggregate data during column selection.

select_aggregate.py
  

import polars as pl

df = pl.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
})

selected = df.select([
    pl.col('A').sum().alias('Total')
])
print(selected)

The sum function calculates the total of column 'A'. This is useful
for summarizing data.

## Select with Multiple Expressions

This example demonstrates selecting multiple columns with different expressions.

select_multiple.py
  

import polars as pl

df = pl.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
})

selected = df.select([
    pl.col('A').alias('Column1'),
    (pl.col('B') * 2).alias('DoubleB')
])
print(selected)

The pl.col('B') * 2 expression doubles the values in column 'B'. This
is useful for applying multiple transformations.

## Select with Conditional Logic

This example shows how to use conditional logic during column selection.

select_conditional.py
  

import polars as pl

df = pl.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
})

selected = df.select([
    pl.when(pl.col('A') &gt; 1).then(pl.col('B')).otherwise(0).alias('Result')
])
print(selected)

The when and then functions apply conditional logic.
This is useful for creating dynamic columns.

## Select with String Operations

This example demonstrates string operations during column selection.

select_string.py
  

import polars as pl

df = pl.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie']
})

selected = df.select([
    pl.col('Name').str.to_uppercase().alias('UppercaseName')
])
print(selected)

The str.to_uppercase function converts names to uppercase. This is
useful for text manipulation.

## Select with Date Operations

This example shows how to perform date operations during column selection.

select_date.py
  

import polars as pl

df = pl.DataFrame({
    'Date': ['2023-01-01', '2023-02-01', '2023-03-01']
})

selected = df.select([
    pl.col('Date').str.strptime(pl.Date, '%Y-%m-%d').dt.month().alias('Month')
])
print(selected)

The dt.month function extracts the month from the date. This is
useful for time-based analysis.

## Select with Nested Data

This example demonstrates selecting nested data from a DataFrame.

select_nested.py
  

import polars as pl

df = pl.DataFrame({
    'A': [1, 2, 3],
    'B': [[4, 5], [6, 7], [8, 9]]
})

selected = df.select([
    pl.col('B').arr.get(0).alias('FirstElement')
])
print(selected)

The arr.get(0) function extracts the first element from nested lists.
This is useful for working with complex data structures.

## Best Practices for Using Select

- **Plan Column Selection:** Identify required columns before applying select.

- **Use Aliases:** Rename columns for better readability.

- **Combine Expressions:** Apply multiple transformations in a single select call.

- **Optimize Performance:** Avoid unnecessary column selections to improve speed.

## Source

[Polars Documentation](https://docs.pola.rs/api/python/stable/reference/index.html)

In this article, we have explored how to use the select function in Polars.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Polars tutorials](/all/#polars).