+++
title = "Pandas Windowing Functions"
date = 2025-08-29T20:03:53.158+01:00
draft = false
description = "Python tutorial on Pandas, covering how to use windowing functions for data analysis with practical examples."
image = ""
imageBig = ""
categories = ["pandas"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pandas Windowing Functions

last modified March 1, 2025

Pandas is a powerful Python library for data manipulation. Windowing functions
are used for analyzing data within a sliding or expanding window. This tutorial
covers how to use windowing functions in Pandas, with practical examples.

Windowing functions are useful for time series analysis, moving averages, and
cumulative calculations. Pandas provides methods like rolling() and
expanding() for these tasks.

## Rolling Window: Moving Average

This example shows how to calculate a moving average using a rolling window.

rolling_window.py
  

import pandas as pd

data = {
    'Date': pd.date_range(start='2023-01-01', periods=10, freq='D'),
    'Values': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

df = pd.DataFrame(data)
df['MovingAvg'] = df['Values'].rolling(window=3).mean()

print(df)

The rolling(window=3).mean() calculates a 3-day moving average for
the 'Values' column. This is useful for smoothing time series data.

## Rolling Window: Minimum and Maximum

This example demonstrates calculating rolling minimum and maximum values.

rolling_min_max.py
  

import pandas as pd

data = {
    'Date': pd.date_range(start='2023-01-01', periods=10, freq='D'),
    'Values': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

df = pd.DataFrame(data)
df['RollingMin'] = df['Values'].rolling(window=3).min()
df['RollingMax'] = df['Values'].rolling(window=3).max()

print(df)

The rolling(window=3).min() and rolling(window=3).max()
calculate the rolling minimum and maximum values, respectively. This is useful
for identifying trends.

## Expanding Window: Cumulative Sum

This example shows how to calculate a cumulative sum using an expanding window.

expanding_sum.py
  

import pandas as pd

data = {
    'Date': pd.date_range(start='2023-01-01', periods=10, freq='D'),
    'Values': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

df = pd.DataFrame(data)
df['CumulativeSum'] = df['Values'].expanding().sum()

print(df)

The expanding().sum() calculates the cumulative sum of the 'Values'
column. This is useful for tracking cumulative totals.

## Expanding Window: Cumulative Average

This example demonstrates calculating a cumulative average using an expanding window.

expanding_avg.py
  

import pandas as pd

data = {
    'Date': pd.date_range(start='2023-01-01', periods=10, freq='D'),
    'Values': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

df = pd.DataFrame(data)
df['CumulativeAvg'] = df['Values'].expanding().mean()

print(df)

The expanding().mean() calculates the cumulative average of the
'Values' column. This is useful for analyzing trends over time.

## Rolling Window with Custom Function

This example shows how to apply a custom function to a rolling window.

rolling_custom.py
  

import pandas as pd

data = {
    'Date': pd.date_range(start='2023-01-01', periods=10, freq='D'),
    'Values': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

df = pd.DataFrame(data)

def custom_agg(x):
    return x.max() - x.min()

df['RollingRange'] = df['Values'].rolling(window=3).apply(custom_agg)

print(df)

The rolling(window=3).apply(custom_agg) applies a custom function
to calculate the range (max - min) within each rolling window. This is useful
for custom calculations.

## Rolling Window with Center Alignment

This example demonstrates using a rolling window with center alignment.

rolling_center.py
  

import pandas as pd

data = {
    'Date': pd.date_range(start='2023-01-01', periods=10, freq='D'),
    'Values': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

df = pd.DataFrame(data)
df['RollingAvgCenter'] = df['Values'].rolling(window=3, center=True).mean()

print(df)

The rolling(window=3, center=True).mean() calculates a rolling
average with the window centered on each point. This is useful for symmetric
analysis.

## Rolling Window with Minimum Periods

This example shows how to use a rolling window with a minimum number of periods.

rolling_min_periods.py
  

import pandas as pd

data = {
    'Date': pd.date_range(start='2023-01-01', periods=10, freq='D'),
    'Values': [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

df = pd.DataFrame(data)
df['RollingAvgMinPeriods'] = df['Values'].rolling(window=3, min_periods=1).mean()

print(df)

The rolling(window=3, min_periods=1).mean() calculates a rolling
average even if fewer than 3 values are available. This is useful for handling
edge cases.

## Best Practices for Windowing Functions

- **Understand Data:** Analyze data structure before applying windowing functions.

- **Choose Appropriate Window Size:** Select a window size that aligns with your analysis goals.

- **Handle Edge Cases:** Use min_periods to handle incomplete windows.

- **Validate Results:** Check windowed data for accuracy and consistency.

## Source

[Pandas rolling Documentation](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.rolling.html)

In this article, we have explored how to use windowing functions in Pandas.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Pandas tutorials](/all/#pandas).