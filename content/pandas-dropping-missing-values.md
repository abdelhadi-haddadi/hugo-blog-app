+++
title = "Pandas Dropping Missing Values"
date = 2025-08-29T20:03:50.913+01:00
draft = false
description = "Python tutorial on Pandas, covering how to drop missing values in DataFrames with practical examples."
image = ""
imageBig = ""
categories = ["pandas"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pandas Dropping Missing Values

last modified March 1, 2025

Pandas is a powerful Python library for data manipulation. Handling missing
values is a common task when working with DataFrames. This tutorial covers how
to drop missing values using Pandas, with practical examples.

Missing values can disrupt data analysis. Pandas provides methods like
dropna to handle them. These methods are flexible and allow
dropping rows or columns with missing values based on specific criteria.

## Dropping Rows with Any Missing Values

This example shows how to drop rows with any missing values.

dropna_any.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4],
    'C': [1, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_dropped = df.dropna()

print(df_dropped)

The dropna method removes rows with any missing values. This is
useful for cleaning datasets with scattered missing data.

## Dropping Columns with Any Missing Values

This example demonstrates dropping columns with any missing values.

dropna_columns.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4],
    'C': [1, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_dropped = df.dropna(axis=1)

print(df_dropped)

The axis=1 parameter drops columns with any missing values. This is
useful when columns with missing data are not needed.

## Dropping Rows with All Missing Values

This example shows how to drop rows where all values are missing.

dropna_all.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, np.nan, np.nan, 4],
    'B': [np.nan, np.nan, np.nan, 4],
    'C': [1, np.nan, np.nan, np.nan]
}

df = pd.DataFrame(data)
df_dropped = df.dropna(how='all')

print(df_dropped)

The how='all' parameter drops rows where all values are missing.
This is useful for removing completely empty rows.

## Dropping Rows with Missing Values in Specific Columns

This example demonstrates dropping rows with missing values in specific columns.

dropna_subset.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4],
    'C': [1, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_dropped = df.dropna(subset=['A', 'B'])

print(df_dropped)

The subset=['A', 'B'] parameter drops rows with missing values in
columns 'A' or 'B'. This is useful for targeted cleaning.

## Dropping Rows with a Threshold of Non-Missing Values

This example shows how to drop rows with fewer than a specified number of
non-missing values.

dropna_threshold.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4],
    'C': [1, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_dropped = df.dropna(thresh=2)

print(df_dropped)

The thresh=2 parameter drops rows with fewer than 2 non-missing
values. This is useful for retaining partially complete rows.

## Dropping Missing Values in Place

This example demonstrates dropping missing values without creating a new
DataFrame.

dropna_inplace.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4],
    'C': [1, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df.dropna(inplace=True)

print(df)

The inplace=True parameter modifies the DataFrame directly. This is
useful for memory efficiency.

## Dropping Missing Values with Custom Logic

This example shows how to drop missing values based on custom logic.

dropna_custom.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4],
    'C': [1, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_dropped = df[df['A'].notna() &amp; df['B'].notna()]

print(df_dropped)

The notna method filters rows where columns 'A' and 'B' are not
missing. This allows for custom filtering logic.

## Best Practices for Dropping Missing Values

- **Understand Data:** Analyze missing value patterns before dropping.

- **Use Appropriate Methods:** Choose methods like dropna or thresh based on data context.

- **Preserve Data:** Avoid dropping too much data unless necessary.

- **Validate Results:** Check the dataset after dropping missing values.

## Source

[Pandas dropna Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.dropna.html)

In this article, we have explored how to drop missing values in Pandas DataFrames.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Pandas tutorials](/all/#pandas).