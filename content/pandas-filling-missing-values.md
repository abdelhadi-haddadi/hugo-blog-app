+++
title = "Pandas Filling Missing Values"
date = 2025-08-29T20:03:50.936+01:00
draft = false
description = "Python tutorial on Pandas, covering how to fill missing values in DataFrames with practical examples."
image = ""
imageBig = ""
categories = ["pandas"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pandas Filling Missing Values

last modified March 1, 2025

Pandas is a powerful Python library for data manipulation. Handling missing
values is a common task when working with DataFrames. This tutorial covers how
to fill missing values using Pandas, with practical examples.

Missing values can disrupt data analysis. Pandas provides methods like
fillna to handle them. These methods are flexible and allow
filling missing values with constants, forward/backward fills, or custom logic.

## Filling with a Constant Value

This example shows how to fill missing values with a constant.

fillna_constant.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4],
    'C': [1, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_filled = df.fillna(0)

print(df_filled)

The fillna(0) method replaces all missing values with 0. This is
useful for initializing missing data.

## Forward Fill Missing Values

This example demonstrates forward filling missing values.

fillna_ffill.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, np.nan, np.nan, 4],
    'B': [np.nan, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_filled = df.fillna(method='ffill')

print(df_filled)

The method='ffill' parameter fills missing values using the last
valid observation. This is useful for time series data.

## Backward Fill Missing Values

This example shows how to backward fill missing values.

fillna_bfill.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, np.nan, np.nan, 4],
    'B': [np.nan, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_filled = df.fillna(method='bfill')

print(df_filled)

The method='bfill' parameter fills missing values using the next
valid observation. This is useful for filling gaps in data.

## Filling with Column Mean

This example demonstrates filling missing values with column means.

fillna_mean.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4]
}

df = pd.DataFrame(data)
df_filled = df.fillna(df.mean())

print(df_filled)

The df.mean method calculates the mean of each column. Missing
values are replaced with these means, preserving the data distribution.

## Filling with Custom Logic

This example shows how to fill missing values using custom logic.

fillna_custom.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4]
}

df = pd.DataFrame(data)
df_filled = df.fillna({'A': 0, 'B': 1})

print(df_filled)

The fillna({'A': 0, 'B': 1}) method fills missing values in column
'A' with 0 and in column 'B' with 1. This allows for column-specific logic.

## Filling with Interpolation

This example demonstrates filling missing values using interpolation.

fillna_interpolate.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, np.nan, np.nan, 4],
    'B': [np.nan, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_filled = df.interpolate()

print(df_filled)

The interpolate method fills missing values using linear
interpolation. This is useful for continuous data.

## Filling with a Limit

This example shows how to limit the number of missing values filled.

fillna_limit.py
  

import pandas as pd
import numpy as np

data = {
    'A': [1, np.nan, np.nan, 4],
    'B': [np.nan, 2, 3, np.nan]
}

df = pd.DataFrame(data)
df_filled = df.fillna(method='ffill', limit=1)

print(df_filled)

The limit=1 parameter restricts filling to only one missing value
per column. This prevents overfilling in sparse data.

## Best Practices for Filling Missing Values

- **Understand Data:** Analyze missing value patterns before filling.

- **Use Appropriate Methods:** Choose methods like mean, forward fill, or interpolation based on data context.

- **Limit Filling:** Use limit to avoid overfilling.

- **Validate Results:** Check filled data for consistency.

## Source

[Pandas fillna Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.fillna.html)

In this article, we have explored how to fill missing values in Pandas DataFrames.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Pandas tutorials](/all/#pandas).