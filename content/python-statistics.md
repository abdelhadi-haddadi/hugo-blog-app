+++
title = "Python Statistics"
date = 2025-08-29T20:12:40.081+01:00
draft = false
description = "Python statistics tutorial shows how to perform statistical calculations in Python using the statistics module."
image = ""
imageBig = ""
categories = ["statistics"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Statistics

last modified February 15, 2025

In this article, we show how to use the Python statistics module to
perform statistical calculations such as mean, median, variance, and standard
deviation.

The statistics module provides functions to calculate mathematical
statistics of numeric data. It is part of the Python standard library and is
useful for basic statistical operations.

## Python statistics mean

The **mean** is the average of a dataset. It is calculated by
summing all the values and dividing by the number of values.

mean.py
#!/usr/bin/python

import statistics

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

mean = statistics.mean(data)
print(f"Mean: {mean}")

```
$ ./mean.py
Mean: 5.5

```

## Python statistics median

The **median** is the middle value of a dataset when the values are
arranged in order. If the dataset has an even number of values, the median is
the average of the two middle values.

median.py
#!/usr/bin/python

import statistics

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

median = statistics.median(data)
print(f"Median: {median}")

```
$ ./median.py
Median: 5.5

```

## Python statistics mode

The **mode** is the value that appears most frequently in a
dataset. A dataset may have no mode (if all values are unique) or multiple modes
(if multiple values have the same highest frequency).

mode.py
#!/usr/bin/python

import statistics

data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]

mode = statistics.mode(data)
print(f"Mode: {mode}")

```
$ ./mode.py
Mode: 4

```

## Python statistics variance

The **variance** measures how far each number in the dataset is
from the mean. It is calculated as the average of the squared differences from
the mean.

variance.py
#!/usr/bin/python

import statistics

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

variance = statistics.variance(data)
print(f"Variance: {variance}")

```
$ ./variance.py
Variance: 9.166666666666666

```

## Python statistics standard deviation

The **standard deviation** is a measure of the amount of variation
or dispersion in a dataset. It is the square root of the variance and provides a
measure of how spread out the values are.

stdev.py
#!/usr/bin/python

import statistics

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

stdev = statistics.stdev(data)
print(f"Standard Deviation: {stdev}")

```
$ ./stdev.py
Standard Deviation: 3.0276503540974917

```

## Python statistics quantiles

**Quantiles** are values that divide a dataset into equal-sized
intervals. Common quantiles include quartiles (dividing the data into 4 parts),
deciles (10 parts), and percentiles (100 parts). The first quartile (Q1) is the
25th percentile, the second quartile (Q2) is the median (50th percentile), and
the third quartile (Q3) is the 75th percentile. 

The **interquartile range (IQR)** is the difference between Q3 and
Q1 and is used to identify outliers.

quantiles.py
#!/usr/bin/python

import statistics

data = [10, 12, 12, 14, 12, 11, 14, 13, 15, 100]

q1, median, q3 = statistics.quantiles(data, n=4, method='exclusive')
print(f"Q1: {q1}, Median: {median}, Q3: {q3}")

iqr = q3 - q1
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

filtered_data = [e for e in data if e &gt;= lower_bound and e &lt;= upper_bound]

print(f"Filtered Data: {filtered_data}")

```
q1, median, q3 = statistics.quantiles(data, n=4, method='exclusive')

```

We calculate the first quartile (Q1), median (Q2), and third quartile (Q3) using
the statistics.quantiles function. The n=4 argument
specifies quartiles, and the method='exclusive' argument specifies
the calculation method.

iqr = q3 - q1
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

We calculate the interquartile range (IQR) and use it to determine the lower and
upper bounds for identifying outliers.

filtered_data = [e for e in data if e &gt;= lower_bound and e &lt;= upper_bound]

We filter the dataset to exclude outliers based on the calculated bounds.

$ ./quantiles.py
Q1: 12.0, Median: 13.0, Q3: 14.0
Filtered Data: [10, 12, 12, 14, 12, 11, 14, 13, 15]

## Python statistics correlation

**Correlation** is a measure that expresses the extent to which two
variables are linearly related, meaning they change together at a constant rate.
It's a common tool for describing simple relationships without making a
statement about cause and effect.

The correlation is quantified by the **correlation coefficient**,
often denoted as r, which measures the strength of the linear
relationship between two variables. The correlation coefficient ranges from
-1 to +1. A correlation coefficient close to
0 indicates a weak linear relationship. Positive r
values indicate a positive correlation, while negative values indicate a
negative correlation.

correlation.py
#!/usr/bin/python

import statistics

orbital_period = [88, 225, 365, 687, 4331, 10_756, 30_687, 60_190]    # days
dist_from_sun = [58, 108, 150, 228, 778, 1_400, 2_900, 4_500]         # million km

cor = statistics.correlation(orbital_period, dist_from_sun, method='ranked')
print(f"Correlation Coefficient: {cor}")

```
orbital_period = [88, 225, 365, 687, 4331, 10_756, 30_687, 60_190]    # days
dist_from_sun = [58, 108, 150, 228, 778, 1_400, 2_900, 4_500]         # million km

```

We define two datasets: orbital_period (the orbital period of
planets in days) and dist_from_sun (the distance of planets from
the sun in million kilometers).

cor = statistics.correlation(orbital_period, dist_from_sun, method='ranked')

We calculate the correlation coefficient using the
statistics.correlation function. The method='ranked'
argument specifies that the calculation should use ranked data, which is useful
for non-linear relationships or when outliers are present.

print(f"Correlation Coefficient: {cor}")

We print the correlation coefficient, which quantifies the strength and
direction of the linear relationship between the two variables.

$ ./correlation.py
Correlation Coefficient: 1.0

The output shows a correlation coefficient of 1.0, indicating a
perfect positive linear relationship between the orbital period and the distance
from the sun.

## Source

[Python statistics module documentation](https://docs.python.org/3/library/statistics.html)

In this article, we have worked with the Python statistics module to
perform statistical calculations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/all/#python).