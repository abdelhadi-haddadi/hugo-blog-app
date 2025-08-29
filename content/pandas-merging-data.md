+++
title = "Pandas Merging Data"
date = 2025-08-29T20:03:52.021+01:00
draft = false
description = "Python tutorial on Pandas, covering how to merge DataFrames with practical examples."
image = ""
imageBig = ""
categories = ["pandas"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pandas Merging Data

last modified February 25, 2025

Pandas is a powerful Python library for data manipulation. Merging DataFrames is
a common task when working with multiple datasets. This tutorial covers how to
merge DataFrames using Pandas, with practical examples.

Merging allows combining data from different sources based on common columns or
indices. Pandas provides methods like merge and join
to perform these operations.

## Inner Join

This example shows how to perform an inner join using merge.

merge_inner.py
  

import pandas as pd

df1 = pd.DataFrame({
    'ID': [1, 2, 3],
    'Name': ['Alice', 'Bob', 'Charlie']
})

df2 = pd.DataFrame({
    'ID': [2, 3, 4],
    'City': ['New York', 'Los Angeles', 'Chicago']
})

merged_df = pd.merge(df1, df2, on='ID', how='inner')

print(merged_df)

The merge(df1, df2, on='ID', how='inner') performs an inner join on
the 'ID' column. Only rows with matching IDs in both DataFrames are included.

## Left Join

This example demonstrates a left join using merge.

merge_left.py
  

import pandas as pd

df1 = pd.DataFrame({
    'ID': [1, 2, 3],
    'Name': ['Alice', 'Bob', 'Charlie']
})

df2 = pd.DataFrame({
    'ID': [2, 3, 4],
    'City': ['New York', 'Los Angeles', 'Chicago']
})

merged_df = pd.merge(df1, df2, on='ID', how='left')

print(merged_df)

The merge(df1, df2, on='ID', how='left') performs a left join. All
rows from df1 are included, and matching rows from df2
are added.

## Right Join

This example shows how to perform a right join using merge.

merge_right.py
  

import pandas as pd

df1 = pd.DataFrame({
    'ID': [1, 2, 3],
    'Name': ['Alice', 'Bob', 'Charlie']
})

df2 = pd.DataFrame({
    'ID': [2, 3, 4],
    'City': ['New York', 'Los Angeles', 'Chicago']
})

merged_df = pd.merge(df1, df2, on='ID', how='right')

print(merged_df)

The merge(df1, df2, on='ID', how='right') performs a right join. All
rows from df2 are included, and matching rows from df1
are added.

## Outer Join

This example demonstrates an outer join using merge.

merge_outer.py
  

import pandas as pd

df1 = pd.DataFrame({
    'ID': [1, 2, 3],
    'Name': ['Alice', 'Bob', 'Charlie']
})

df2 = pd.DataFrame({
    'ID': [2, 3, 4],
    'City': ['New York', 'Los Angeles', 'Chicago']
})

merged_df = pd.merge(df1, df2, on='ID', how='outer')

print(merged_df)

The merge(df1, df2, on='ID', how='outer') performs an outer join.
All rows from both DataFrames are included, with missing values filled as NaN.

## Merging on Multiple Columns

This example shows how to merge DataFrames on multiple columns.

merge_multiple_columns.py
  

import pandas as pd

df1 = pd.DataFrame({
    'ID': [1, 2, 3],
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Dept': ['HR', 'IT', 'Finance']
})

df2 = pd.DataFrame({
    'ID': [2, 3, 4],
    'Name': ['Bob', 'Charlie', 'David'],
    'City': ['New York', 'Los Angeles', 'Chicago']
})

merged_df = pd.merge(df1, df2, on=['ID', 'Name'], how='inner')

print(merged_df)

The merge(df1, df2, on=['ID', 'Name'], how='inner') merges on both
'ID' and 'Name' columns. This is useful for more complex joins.

## Merging with Different Column Names

This example demonstrates merging DataFrames with different column names.

merge_different_columns.py
  

import pandas as pd

df1 = pd.DataFrame({
    'ID': [1, 2, 3],
    'Name': ['Alice', 'Bob', 'Charlie']
})

df2 = pd.DataFrame({
    'EmpID': [2, 3, 4],
    'City': ['New York', 'Los Angeles', 'Chicago']
})

merged_df = pd.merge(df1, df2, left_on='ID', right_on='EmpID', how='inner')

print(merged_df)

The merge(df1, df2, left_on='ID', right_on='EmpID', how='inner')
merges DataFrames using different column names. This is useful when column names
do not match.

## Concatenating DataFrames

This example shows how to concatenate DataFrames using concat.

concat_dataframes.py
  

import pandas as pd

df1 = pd.DataFrame({
    'ID': [1, 2, 3],
    'Name': ['Alice', 'Bob', 'Charlie']
})

df2 = pd.DataFrame({
    'ID': [4, 5, 6],
    'Name': ['David', 'Eve', 'Frank']
})

concatenated_df = pd.concat([df1, df2], ignore_index=True)

print(concatenated_df)

The concat([df1, df2], ignore_index=True) concatenates DataFrames
vertically. The ignore_index=True parameter resets the index.

## Best Practices for Merging Data

- **Understand Data:** Analyze datasets before merging to identify common keys.

- **Choose the Right Join:** Use inner, left, right, or outer joins based on requirements.

- **Handle Duplicates:** Check for and handle duplicate keys to avoid unexpected results.

- **Validate Results:** Verify merged data for accuracy and completeness.

## Source

[Pandas merge Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.merge.html)

In this article, we have explored how to merge DataFrames in Pandas.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Pandas tutorials](/all/#pandas).