+++
title = "Python DataFrame"
date = 2025-08-29T20:07:54.432+01:00
draft = false
description = "Python tutorial on DataFrames using the Pandas library. Covers creation, manipulation, and analysis of DataFrames with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python DataFrame

last modified February 25, 2025

A DataFrame is a two-dimensional, size-mutable, and potentially heterogeneous
tabular data structure in Python. It is one of the most commonly used data
structures in data analysis and is provided by the Pandas library. This tutorial
covers the basics of creating, manipulating, and analyzing DataFrames with
practical examples.

## Installing Pandas

You can install the Pandas library using pip:

$ pip install pandas

## Creating a DataFrame

This example demonstrates how to create a DataFrame from a dictionary.

create_dataframe.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data)
print(df)

The DataFrame is created from a dictionary where keys are column names and
values are lists of data. The output is a tabular representation of the data.

## Reading Data from a CSV File

This example demonstrates how to read data from a CSV file into a DataFrame.

read_csv.py
  

import pandas as pd

df = pd.read_csv('data.csv')
print(df)

The read_csv function reads data from a CSV file and creates a
DataFrame. This is one of the most common ways to load data into a DataFrame.

## Selecting Columns

This example demonstrates how to select specific columns from a DataFrame.

select_columns.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data)
print(df['Name'])  # Select a single column
print(df[['Name', 'City']])  # Select multiple columns

Columns can be selected using their names. Single columns are returned as
Series, while multiple columns are returned as a DataFrame.

## Filtering Rows

This example demonstrates how to filter rows based on a condition.

filter_rows.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data)
filtered_df = df[df['Age'] &gt; 30]
print(filtered_df)

Rows can be filtered using a boolean condition. In this example, only rows where
the age is greater than 30 are selected.

## Adding a New Column

This example demonstrates how to add a new column to a DataFrame.

add_column.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'Los Angeles', 'Chicago']
}

df = pd.DataFrame(data)
df['Salary'] = [70000, 80000, 90000]
print(df)

A new column can be added to a DataFrame by assigning a list of values to a new column name.

## Grouping and Aggregating Data

This example demonstrates how to group data and perform aggregations.

group_aggregate.py
  

import pandas as pd

data = {
    'City': ['New York', 'Los Angeles', 'Chicago', 'New York', 'Chicago'],
    'Sales': [200, 150, 300, 250, 400]
}

df = pd.DataFrame(data)
grouped_df = df.groupby('City').sum()
print(grouped_df)

The groupby function groups data by a specific column, and the
sum function aggregates the grouped data. In this example, sales
are summed by city.

## Best Practices for Working with DataFrames

- **Use Vectorized Operations:** Avoid loops and use built-in Pandas functions for better performance.

- **Handle Missing Data:** Use methods like dropna or fillna to handle missing values.

- **Optimize Memory Usage:** Use appropriate data types to reduce memory consumption.

- **Leverage Indexing:** Use indexes for faster data retrieval and manipulation.

## Source

[Pandas DataFrame Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html)

In this article, we have explored Python DataFrames and demonstrated their use
cases through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).