+++
title = "Pandas Grouping Data"
date = 2025-08-29T20:03:52.016+01:00
draft = false
description = "Python tutorial on Pandas, covering how to group and aggregate data with practical examples."
image = ""
imageBig = ""
categories = ["pandas"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pandas Grouping Data

last modified March 1, 2025

Pandas is a powerful Python library for data manipulation. Grouping data is a
common task when analyzing datasets. This tutorial covers how to group and
aggregate data using Pandas, with practical examples.

Grouping allows you to split data into groups based on criteria, apply functions
to each group, and combine the results. Pandas provides the groupby
function for this purpose.

## Basic Grouping

This example shows how to group data by a single column.

groupby_basic.py
  

import pandas as pd

data = {
    'Category': ['A', 'B', 'A', 'B', 'A'],
    'Values': [10, 20, 30, 40, 50]
}

df = pd.DataFrame(data)
grouped = df.groupby('Category').sum()

print(grouped)

The groupby('Category').sum() groups the data by the 'Category'
column and calculates the sum of 'Values' for each group. This is useful for
aggregating data.

## Grouping by Multiple Columns

This example demonstrates grouping by multiple columns.

groupby_multiple.py
  

import pandas as pd

data = {
    'Category': ['A', 'B', 'A', 'B', 'A'],
    'Subcategory': ['X', 'X', 'Y', 'Y', 'X'],
    'Values': [10, 20, 30, 40, 50]
}

df = pd.DataFrame(data)
grouped = df.groupby(['Category', 'Subcategory']).sum()

print(grouped)

The groupby(['Category', 'Subcategory']).sum() groups the data by
both 'Category' and 'Subcategory' columns. This is useful for hierarchical
grouping.

## Applying Multiple Aggregations

This example shows how to apply multiple aggregation functions to grouped data.

groupby_multiple_agg.py
  

import pandas as pd

data = {
    'Category': ['A', 'B', 'A', 'B', 'A'],
    'Values': [10, 20, 30, 40, 50]
}

df = pd.DataFrame(data)
grouped = df.groupby('Category').agg(['sum', 'mean', 'count'])

print(grouped)

The agg(['sum', 'mean', 'count']) applies multiple aggregation
functions to the grouped data. This is useful for comprehensive analysis.

## Grouping and Filtering

This example demonstrates filtering groups based on aggregation results.

groupby_filter.py
  

import pandas as pd

data = {
    'Category': ['A', 'B', 'A', 'B', 'A'],
    'Values': [10, 20, 30, 40, 50]
}

df = pd.DataFrame(data)
grouped = df.groupby('Category').filter(lambda x: x['Values'].sum() &gt; 50)

print(grouped)

The filter(lambda x: x['Values'].sum() &gt; 50) filters groups where
the sum of 'Values' is greater than 50. This is useful for conditional grouping.

## Grouping and Transforming

This example shows how to transform grouped data.

groupby_transform.py
  

import pandas as pd

data = {
    'Category': ['A', 'B', 'A', 'B', 'A'],
    'Values': [10, 20, 30, 40, 50]
}

df = pd.DataFrame(data)
df['Normalized'] = df.groupby('Category')['Values'].transform(lambda x: (x - x.mean()) / x.std())

print(df)

The transform(lambda x: (x - x.mean()) / x.std()) normalizes the
'Values' column within each group. This is useful for standardizing data.

## Grouping and Counting

This example demonstrates counting values in grouped data.

groupby_count.py
  

import pandas as pd

data = {
    'Category': ['A', 'B', 'A', 'B', 'A'],
    'Values': [10, 20, 30, 40, 50]
}

df = pd.DataFrame(data)
grouped = df.groupby('Category').size()

print(grouped)

The size method counts the number of rows in each group. This is
useful for frequency analysis.

## Grouping and Custom Aggregation

This example shows how to apply custom aggregation functions to grouped data.

groupby_custom_agg.py
  

import pandas as pd

data = {
    'Category': ['A', 'B', 'A', 'B', 'A'],
    'Values': [10, 20, 30, 40, 50]
}

df = pd.DataFrame(data)

def custom_agg(x):
    return x.max() - x.min()

grouped = df.groupby('Category').agg(custom_agg)

print(grouped)

The agg(custom_agg) applies a custom aggregation function to the
grouped data. This is useful for specialized calculations.

## Best Practices for Grouping Data

- **Understand Data:** Analyze data structure before grouping.

- **Choose Appropriate Aggregations:** Use functions like sum, mean, or custom logic.

- **Filter Groups:** Use filter to exclude irrelevant groups.

- **Validate Results:** Check grouped data for accuracy and completeness.

## Source

[Pandas groupby Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.groupby.html)

In this article, we have explored how to group and aggregate data in Pandas.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).