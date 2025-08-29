+++
title = "Pandas Sorting values"
date = 2025-08-29T20:03:53.177+01:00
draft = false
description = "Python tutorial on Pandas sorting, covering how to sort DataFrames and Series with practical examples."
image = ""
imageBig = ""
categories = ["pandas"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pandas Sorting values

last modified March 1, 2025

Pandas is a powerful Python library for data manipulation. Sorting is a common
operation when working with DataFrames and Series. This tutorial covers how to
sort DataFrames and Series using Pandas, with practical examples.

Sorting helps in organizing data for better analysis. Pandas provides methods
like sort_values() and sort_index() to sort data.
These methods are flexible and allow sorting by columns or indices.

## Sorting by Multiple Columns

This example shows how to sort a DataFrame by multiple columns.

sort_multiple_columns.py
  

import pandas as pd

# Load data from CSV
df = pd.read_csv('products.csv')

# Sort by 'category' (ascending) and 'unit_price' (descending)
sorted_df = df.sort_values(by=['category', 'unit_price'], ascending=[True, False])

print(sorted_df.head())

The sort_values() method sorts the DataFrame by the 'category'
column in ascending order and the 'unit_price' column in descending order. This
is useful for hierarchical sorting.

## Sorting by a Custom Order

This example demonstrates how to sort a DataFrame using a custom order for a
specific column.

sort_custom_order.py
  

import pandas as pd

# Load data from CSV
df = pd.read_csv('products.csv')

# Define custom order for 'category'
custom_order = ['Beverages', 'Condiments', 'Dairy Products', 'Seafood', 'Meat/Poultry', 'Produce', 'Confections', 'Grains/Cereals']

# Convert 'category' to a categorical type with custom order
df['category'] = pd.Categorical(df['category'], categories=custom_order, ordered=True)

# Sort by 'category'
sorted_df = df.sort_values(by='category')

print(sorted_df.head())

The pd.Categorical() function is used to define a custom order for
the 'category' column. The DataFrame is then sorted based on this custom order.

## Sorting a DataFrame by Column Values

This example shows how to sort a DataFrame by one or more columns.

sort_by_column.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, 30, 35, 20],
    'Salary': [50000, 60000, 70000, 40000]
}

df = pd.DataFrame(data)
sorted_df = df.sort_values(by='Age')

print(sorted_df)

The sort_values() method sorts the DataFrame by the 'Age' column.
By default, sorting is in ascending order. You can sort by multiple columns by
passing a list to the by parameter.

## Sorting in Descending Order

This example demonstrates how to sort data in descending order.

sort_descending.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, 30, 35, 20],
    'Salary': [50000, 60000, 70000, 40000]
}

df = pd.DataFrame(data)
sorted_df = df.sort_values(by='Age', ascending=False)

print(sorted_df)

The ascending=False parameter sorts the DataFrame in descending
order. This is useful when you need the highest values first.

## Sorting by Index

This example shows how to sort a DataFrame by its index.

sort_by_index.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, 30, 35, 20],
    'Salary': [50000, 60000, 70000, 40000]
}

df = pd.DataFrame(data)
sorted_df = df.sort_index(ascending=False)

print(sorted_df)

The sort_index() method sorts the DataFrame by its index. Setting
ascending=False sorts the index in descending order.

## Sorting a Series

This example demonstrates how to sort a Pandas Series.

sort_series.py
  

import pandas as pd

s = pd.Series([25, 30, 35, 20], index=['Alice', 'Bob', 'Charlie', 'David'])
sorted_s = s.sort_values()

print(sorted_s)

The sort_values() method sorts the Series by its values. You can
also sort by index using sort_index().

## Sorting with Missing Values

This example shows how to handle missing values while sorting.

sort_with_nan.py
  

import pandas as pd
import numpy as np

data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, np.nan, 35, 20],
    'Salary': [50000, 60000, 70000, 40000]
}

df = pd.DataFrame(data)
sorted_df = df.sort_values(by='Age', na_position='first')

print(sorted_df)

The na_position='first' parameter places missing values at the
beginning. Use na_position='last' to place them at the end.

## Best Practices for Sorting in Pandas

- **Use sort_values() for Column Sorting:** This method is ideal for sorting by column values.

- **Use sort_index() for Index Sorting:** This method is useful for sorting by index.

- **Handle Missing Values:** Use na_position to control the placement of missing values.

- **Sort in Place:** Use inplace=True to sort the DataFrame without creating a new one.

## Source

[Pandas sort_values Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.sort_values.html)

In this article, we have explored how to sort DataFrames and Series in Pandas.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Pandas tutorials](/all/#pandas).