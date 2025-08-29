+++
title = "Python Pandas loc Function"
date = 2025-08-29T20:03:52.044+01:00
draft = false
description = "Python tutorial on Pandas, covering how to use the loc function for data selection and manipulation with practical examples."
image = ""
imageBig = ""
categories = ["pandas"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Pandas loc Function

last modified February 25, 2025

Pandas is a powerful Python library for data manipulation. The loc
function is used for label-based indexing, allowing you to select and manipulate
data in DataFrames. This tutorial covers how to use loc with
practical examples.

The loc function is versatile and supports selecting rows, columns,
and specific cells. It is essential for working with labeled data in Pandas.

## Selecting Rows by Label

This example shows how to select rows using the loc function.

loc_select_rows.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data, index=['a', 'b', 'c'])
selected_row = df.loc['b']

print(selected_row)

The loc['b'] selects the row with the label 'b'. This is useful for
accessing specific rows in a DataFrame.

## Selecting Columns by Label

This example demonstrates selecting columns using the loc function.

loc_select_columns.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data, index=['a', 'b', 'c'])
selected_column = df.loc[:, 'Name']

print(selected_column)

The loc[:, 'Name'] selects the 'Name' column for all rows. This is
useful for accessing specific columns.

## Selecting Specific Cells

This example shows how to select specific cells using the loc function.

loc_select_cells.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data, index=['a', 'b', 'c'])
selected_cell = df.loc['b', 'Age']

print(selected_cell)

The loc['b', 'Age'] selects the cell at row 'b' and column 'Age'.
This is useful for accessing individual values.

## Selecting Multiple Rows and Columns

This example demonstrates selecting multiple rows and columns using loc.

loc_select_multiple.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data, index=['a', 'b', 'c'])
selected_data = df.loc[['a', 'c'], ['Name', 'City']]

print(selected_data)

The loc[['a', 'c'], ['Name', 'City']] selects rows 'a' and 'c' and
columns 'Name' and 'City'. This is useful for extracting subsets of data.

## Conditional Selection with loc

This example shows how to use loc for conditional selection.

loc_conditional.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data, index=['a', 'b', 'c'])
selected_data = df.loc[df['Age'] &gt; 30]

print(selected_data)

The loc[df['Age'] &gt; 30] selects rows where the 'Age' column is
greater than 30. This is useful for filtering data based on conditions.

## Updating Data with loc

This example demonstrates updating data using the loc function.

loc_update.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data, index=['a', 'b', 'c'])
df.loc['b', 'Age'] = 31

print(df)

The loc['b', 'Age'] = 31 updates the 'Age' value for row 'b'. This
is useful for modifying specific data points.

## Selecting Rows with Slicing

This example shows how to use slicing with loc to select rows.

loc_slicing.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data, index=['a', 'b', 'c'])
selected_data = df.loc['a':'c']

print(selected_data)

The loc['a':'c'] selects rows from 'a' to 'c'. This is useful for
selecting a range of rows.

## Best Practices for Using loc

- **Understand Labels:** Ensure row and column labels are known before using loc.

- **Use Conditional Selection:** Leverage conditions for filtering data.

- **Update Data Carefully:** Use loc to update specific data points.

- **Validate Results:** Check selected or updated data for accuracy.

## Source

[Pandas loc Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.loc.html)

In this article, we have explored how to use the loc function in Pandas.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Pandas tutorials](/all/#pandas).