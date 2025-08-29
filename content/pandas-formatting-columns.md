+++
title = "Pandas Formatting Columns"
date = 2025-08-29T20:03:50.898+01:00
draft = false
description = "Python tutorial on Pandas, covering how to format columns in DataFrames with practical examples."
image = ""
imageBig = ""
categories = ["pandas"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pandas Formatting Columns

last modified March 1, 2025

Pandas is a powerful Python library for data manipulation. Formatting columns is
a common task when working with DataFrames. This tutorial covers how to format
columns using Pandas, with practical examples.

Formatting columns can improve readability and presentation. Pandas provides
methods like apply, map, and style to
format columns. These methods are flexible and allow for custom formatting.

## Formatting Numbers as Currency

This example shows how to format numbers as currency.

format_currency.py
  

import pandas as pd

data = {
    'Product': ['A', 'B', 'C'],
    'Price': [100.5, 200.75, 300.25]
}

df = pd.DataFrame(data)
df['Price'] = df['Price'].map('${:,.2f}'.format)

print(df)

The map('${:,.2f}'.format) method formats the 'Price' column as
currency with two decimal places. This is useful for financial data.

## Formatting Dates

This example demonstrates formatting date columns.

format_dates.py
  

import pandas as pd

data = {
    'Event': ['Meeting', 'Conference', 'Workshop'],
    'Date': ['2023-10-01', '2023-11-15', '2023-12-20']
}

df = pd.DataFrame(data)
df['Date'] = pd.to_datetime(df['Date']).dt.strftime('%d-%m-%Y')

print(df)

The dt.strftime('%d-%m-%Y') method formats the 'Date' column as
'DD-MM-YYYY'. This is useful for standardizing date formats.

## Formatting Percentages

This example shows how to format numbers as percentages.

format_percentages.py
  

import pandas as pd

data = {
    'Category': ['A', 'B', 'C'],
    'Growth': [0.15, 0.25, 0.35]
}

df = pd.DataFrame(data)
df['Growth'] = df['Growth'].map('{:.2%}'.format)

print(df)

The map('{:.2%}'.format) method formats the 'Growth' column as
percentages with two decimal places. This is useful for growth metrics.

## Formatting Large Numbers

This example demonstrates formatting large numbers with commas.

format_large_numbers.py
  

import pandas as pd

data = {
    'City': ['New York', 'Los Angeles', 'Chicago'],
    'Population': [8419000, 3971000, 2716000]
}

df = pd.DataFrame(data)
df['Population'] = df['Population'].map('{:,}'.format)

print(df)

The map('{:,}'.format) method formats the 'Population' column with
commas as thousand separators. This improves readability for large numbers.

## Formatting Text as Uppercase

This example shows how to format text columns as uppercase.

format_uppercase.py
  

import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Role': ['Manager', 'Developer', 'Designer']
}

df = pd.DataFrame(data)
df['Role'] = df['Role'].str.upper()

print(df)

The str.upper method converts the 'Role' column to uppercase. This
is useful for standardizing text data.

## Formatting with Conditional Styling

This example demonstrates conditional formatting using the style API.

format_conditional.py
  

import pandas as pd

data = {
    'Product': ['A', 'B', 'C'],
    'Sales': [1000, 1500, 800]
}

df = pd.DataFrame(data)

def highlight_low_sales(val):
    color = 'red' if val &lt; 1000 else 'black'
    return f'color: {color}'

styled_df = df.style.applymap(highlight_low_sales, subset=['Sales'])

print(styled_df)

The style.applymap method applies conditional formatting to the
'Sales' column. Sales below 1000 are highlighted in red. This is useful for
visualizing data.

## Formatting with Custom Functions

This example shows how to use custom functions for formatting.

format_custom.py
  

import pandas as pd

data = {
    'Product': ['A', 'B', 'C'],
    'Price': [100.5, 200.75, 300.25]
}

df = pd.DataFrame(data)

def format_price(price):
    return f'Price: ${price:.2f}'

df['Price'] = df['Price'].apply(format_price)

print(df)

The apply(format_price) method applies a custom function to format
the 'Price' column. This allows for flexible and reusable formatting.

## Best Practices for Formatting Columns

- **Understand Data:** Analyze data types and requirements before formatting.

- **Use Appropriate Methods:** Choose methods like map, apply, or style based on needs.

- **Preserve Data Integrity:** Ensure formatting does not alter underlying data.

- **Validate Results:** Check formatted data for consistency and accuracy.

## Source

[Pandas Style Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.style.html)

In this article, we have explored how to format columns in Pandas DataFrames.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Pandas tutorials](/all/#pandas).