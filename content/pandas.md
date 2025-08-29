+++
title = "Pandas"
date = 2025-08-29T20:10:02.685+01:00
draft = false
description = "Pandas tutorial shows how to do basic data analysis in Python with Pandas library. Pandas is a library providing high-performance, easy-to-use data structures and data analysis tools for the Python programming language."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pandas

last modified January 29, 2024

In this article we show how to do basic data analysis in Python with Pandas
library. The code examples and the data are available at the author's Github 
[repository](https://github.com/janbodnar/Python-Course/tree/master/datascience/pandas).

## Pandas

Pandas is an open source, BSD-licensed library providing
high-performance, easy-to-use data structures and data analysis tools for the
Python programming language.

The name of the library comes from the term "panel data", which is an
econometrics term for data sets that include observations over multiple time
periods for the same individuals.

It offers data structures and operations for manipulating
numerical tables and time series. The main two data types are: Series
and DataFrame.

DataFrame is a two-dimensional size-mutable, potentially
heterogeneous tabular data structure with labeled axes (rows and columns).
It is a spreadsheet-like data structure. Series is a single
column of the DataFrame. A DataFrame can be
thought of as a dictionary of Series objects.

## Python Pandas installation

Pandas is installed with the following command:

$ pip install pandas

We use the pip3 command to install pandas module.

$ pip install numpy

Some examples also use numpy.

## Pandas simple example

The following is a simple Pandas example.

simple.py
  

#!/usr/bin/python

import pandas as pd

data = [['Alex', 10], ['Ronald', 18], ['Jane', 33]]
df = pd.DataFrame(data, columns=['Name', 'Age'])

print(df)

In the program, we create a simple DataFrame and
print it to the console.

import pandas as pd

We import the Pandas library.

data = [['Alex', 10], ['Ronald', 18], ['Jane', 33]]

This is the data to be displayed in the frame. Each nested list is
a row in the table. Note that there are many ways how to initialize
a Pandas DataFrame.

df = pd.DataFrame(data, columns=['Name', 'Age'])

A DataFrame is created from the data. We give the frame column
names with columns property.

$ python simple.py
    Name  Age
0    Alex   10
1  Ronald   18
2    Jane   33

This is the output. The first column are row indexes.

## Pandas changing index

We can update the index so that it does not start from 0.

change_index.py
  

#!/usr/bin/python

import pandas as pd

data = [['Alex', 10], ['Ronald', 18], ['Jane', 33]]
df = pd.DataFrame(data, columns=['Name', 'Age'])
df.index = df.index + 1

print(df)

In the example, we add 1 to the index.

$ python change_index.py
    Name  Age
1    Alex   10
2  Ronald   18
3    Jane   33

## Pandas scalar series

The following example creates a series of a scalar value.

series_scalar.py
  

#!/usr/bin/python

import pandas as pd

s = pd.Series(5, index=[0, 1, 2, 3])
print(s)

We have a column containing fives.

$ python series_scalar.py
0    5
1    5
2    5
3    5
dtype: int64

The left column is the index.

## Pandas series ndarray

We can create a series object from a numpy ndarray .

series_numpy.py
  

#!/usr/bin/python

import pandas as pd
import numpy as np

data = np.array(['a', 'b', 'c', 'd'])
s = pd.Series(data)

print(s)

The example creates a column of letters from an ndarray.

$ python series_numpy.py
0    a
1    b
2    c
3    d
dtype: object

## Pandas series dict

A series can be created from a Python dictionary.

series_dict.py
  

#!/usr/bin/python

import pandas as pd
import numpy as np

data = {'coins' : 22, 'pens' : 3, 'books' : 28}
s = pd.Series(data)

print(s)

The example creates a series object from a dicionary of items.

$ python series_dict.py
coins    22
pens      3
books    28
dtype: int64

The index consits of the names of the items.

## Pandas series retrieve

The following example retrieves values form a series object.

series_retrieve.py
  

#!/usr/bin/python

import pandas as pd

s = pd.Series([1, 2, 3, 4, 5], index=['a', 'b', 'c', 'd', 'e'])

print(s[0])
print('-----------------------')

print(s[1:4])
print('-----------------------')

print(s[['a','c','d']])

The example retrieves values from a series object.

print(s[0])

Here we get a single value.

print(s[1:4])

We retrieve rows by their indexes.

print(s[['a','c','d']])

Here we get the values by the index labels.

$ python series_retrieve.py
1
-----------------------
b    2
c    3
d    4
dtype: int64
-----------------------
a    1
c    3
d    4
dtype: int64

## Pandas custom index

The index column does not have to be numerical. We can create our own custom
index.

custom_index.py
  

#!/usr/bin/python

import pandas as pd

data = {"country": ["Brazil", "Russia", "India", "China", "South Africa"],
        "capital": ["Brasilia", "Moscow", "New Dehli", "Beijing", "Pretoria"],
        "area": [8.516, 17.10, 3.286, 9.597, 1.221],
        "population": [200.4, 143.5, 1252, 1357, 52.98]}

frame = pd.DataFrame(data)
print(frame)

print('------------------------------')

frame.index = ["BR", "RU", "IN", "CH", "SA"]
print(frame)

In the example, we create a data frame from a data dictionary.
We print the data frame and then we change the index column with
index property.

$ python custom_index.py
        country    capital    area  population
0        Brazil   Brasilia   8.516      200.40
1        Russia     Moscow  17.100      143.50
2         India  New Dehli   3.286     1252.00
3         China    Beijing   9.597     1357.00
4  South Africa   Pretoria   1.221       52.98
------------------------------
         country    capital    area  population
BR        Brazil   Brasilia   8.516      200.40
RU        Russia     Moscow  17.100      143.50
IN         India  New Dehli   3.286     1252.00
CH         China    Beijing   9.597     1357.00
SA  South Africa   Pretoria   1.221       52.98

## Pandas index, columns &amp; values

Pandas DataFrame has three basic parts: index, columns, and
values.

index_vals_cols.py
  

#!/usr/bin/python

import pandas as pd

data = [['Alex', 10], ['Ronald', 18], ['Jane', 33]]
df = pd.DataFrame(data, columns=['Name', 'Age'])

print(f'Index: {df.index}')
print(f'Columns: {df.columns}')
print(f'Values: {df.values}')

The example prints the index, columns, and values of a data frame.

$ python index_vals_cols.py
Index: RangeIndex(start=0, stop=3, step=1)
Columns: Index(['Name', 'Age'], dtype='object')
Values: [['Alex' 10]
    ['Ronald' 18]
    ['Jane' 33]]

## Pandas sum and max value

The following example calculates the sum and the maximum
of values in a data frame column. It uses also numpy
library.

sum_max.py
  

#!/usr/bin/python

import pandas as pd
import numpy as np

df = pd.DataFrame(np.arange(0, 1200, 2), columns=['A'])
# df.index = df.index + 1

print(sum(df['A']))
print(max(df['A']))

# print(df)

The example calculates the maximum and the sum of values.
It uses numpy's arange fuction to
generate an array of values.

print(sum(df['A']))

When we compute the sum value, we refer to the column by
its name.

$ sum_max.py
359400
1198

## Pandas read CSV

Pandas reads data from a CSV file with read_csv.

military_spending.csv
  

Pos, Country, Amount (Bn. $), GDP
1, United States, 610.0, 3.1
2, China, 228.0, 1.9
3, Saudi Arabia, 69.4, 10.0
4, Russia, 66.3, 4.3
5, India, 63.9, 2.5
6, France, 57.8, 2.3
7, United Kingdom, 47.2, 1.8
8, Japan, 45.4, 0.9
9, Germany, 44.3, 1.2
10, South Korea, 39.2, 2.6
11, Brazil, 29.3, 1.4
12, Italy Italy, 29.2, 1.5
13, Australia Australia, 27.5, 2.0
14, Canada Canada, 20.6, 1.3
15, Turkey Turkey, 18.2, 2.2

This is a simple CSV file containing data about military spending
of countries.

**Note:** CSV files may have optional column names in the first
row.

read_from_csv.py
  

#!/usr/bin/python

import pandas as pd

df = pd.read_csv("military_spending.csv")

print(df.to_string(index=False))

The example reads all data from the military_spending.csv file
and prints it in tabular format to the console. It uses read_csv method.

print(df.to_string(index=False))

Since we have positions column, we hide the index from the output.

$ python read_from_csv.py
Pos               Country   Amount (Bn. $)   GDP
  1         United States            610.0   3.1
  2                 China            228.0   1.9
  3          Saudi Arabia             69.4  10.0
  4                Russia             66.3   4.3
  5                 India             63.9   2.5
  6                France             57.8   2.3
  7        United Kingdom             47.2   1.8
  8                 Japan             45.4   0.9
  9               Germany             44.3   1.2
 10           South Korea             39.2   2.6
 11                Brazil             29.3   1.4
 12           Italy Italy             29.2   1.5
 13   Australia Australia             27.5   2.0
 14         Canada Canada             20.6   1.3
 15         Turkey Turkey             18.2   2.2

## Pandas write CSV

A DataFrame is written to a CSV file with to_csv.

write_csv.py
  

#!/usr/bin/python

import pandas as pd

data = [['Alex', 10], ['Ronald', 18], ['Jane', 33]]
df = pd.DataFrame(data, columns=['Name', 'Age'])

df.to_csv("users.csv", index=False)

The example writes data to the users.csv file.

## Pandas random rows

Random rows from the data frame can be selected with sample.

random_sample.py
  

#!/usr/bin/python

import pandas as pd

df = pd.read_csv("military_spending.csv")

print(df.sample(3))

In the example, we print three random rows from the data frame.

## Pandas to_dict function

The to_dict transforms a data frame to a Python dictionary. The
dictionary can be shown in different data outputs.

data_orient.py
  

#!/usr/bin/python

import pandas as pd

data = [['Alex', 10], ['Ronald', 18], ['Jane', 33]]
df = pd.DataFrame(data, columns=['Name', 'Age'])

print('list')
print(df.to_dict(orient='list'))

print('************************************')

print('series')
print(df.to_dict(orient='series'))

print('************************************')

print('dict')
print(df.to_dict(orient='dict'))

print('************************************')

print('split')
print(df.to_dict(orient='split'))

print('************************************')

print('records')
print(df.to_dict(orient='records'))

print('************************************')

print('index')
print(df.to_dict(orient='index'))

The example prints a data frame to the console in six
different formats.

## Pandas describe

The describe method generates descriptive statistics that
summarize the central tendency, dispersion and shape of a dataset's
distribution, excluding NaN values.

describing.py
  

#!/usr/bin/python

import pandas as pd

s1 = pd.Series([1, 2, 3, 4, 5, 6, 7, 8])
s2 = pd.Series([12, 23, 31, 14, 11, 61, 17, 18])

data = {'Vals 1': s1, 'Vals 2': s2}
df = pd.DataFrame(data)

print(df.describe())

The example prints descriptive statistics from a data frame.

$ python describe.py
        Vals 1     Vals 2
count  8.00000   8.000000
mean   4.50000  23.375000
std    2.44949  16.535136
min    1.00000  11.000000
25%    2.75000  13.500000
50%    4.50000  17.500000
75%    6.25000  25.000000
max    8.00000  61.000000

## Pandas counting

The next example counts values. You can find the employees.csv
file in the Github repository.

counting.py
  

#!/usr/bin/python

import pandas as pd

df = pd.read_csv("employees.csv")

print(df.count())

print(f'Number of columns: {len(df.columns)}')

print(df.shape)

The count method calculates the number of values
for each column. The number of columns is retrieved with
len(df.columns). The shape returns a
tuple representing the dimensionality of the data frame.

$ python counting.py
First Name            933
Gender                855
Start Date           1000
Last Login Time      1000
Salary               1000
Bonus %              1000
Senior Management     933
Team                  957
dtype: int64
Number of columns: 8
(1000, 8)

Note that the columns have different number of values, because some
values are missing.

## Pandas head and tail

With the head and tail methods, we can
display the first and last n rows from the data frame.

head_tail.py
  

#!/usr/bin/python

import pandas as pd

df = pd.read_csv("military_spending.csv")

print(df.head(4))

print('*******************************************')

print(df.tail(4))

The example displays the first and last four rows from the data frame.

$ python head_tail.py
Pos         Country   Amount (Bn. $)   GDP
0    1   United States            610.0   3.1
1    2           China            228.0   1.9
2    3    Saudi Arabia             69.4  10.0
3    4          Russia             66.3   4.3
*******************************************
 Pos               Country   Amount (Bn. $)   GDP
11   12           Italy Italy             29.2   1.5
12   13   Australia Australia             27.5   2.0
13   14         Canada Canada             20.6   1.3
14   15         Turkey Turkey             18.2   2.2

## Pandas no header and index

We can hide the header and the index when we display the data frame.

no_header_index.py
  

#!/usr/bin/python

import pandas as pd

df = pd.read_csv("military_spending.csv")

print(df.head(4).to_string(header=False, index=False))

By setting the header and index attributes
to False, we output the data frame without the header and index.

$ python no_header.py
1   United States  610.0   3.1
2           China  228.0   1.9
3    Saudi Arabia   69.4  10.0
4          Russia   66.3   4.3

This is the output. (The values 1 through 4 are from the pos column.)

## Pandas loc

The loc method allows to access a group of rows and
columns by label(s) or a boolean array.

select_loc.py
  

#!/usr/bin/python

import pandas as pd

data = {'Items': ['coins', 'pens', 'books'], 'Quantity': [22, 28, 3]}

df = pd.DataFrame(data, index=['A', 'B', 'C'])

print(df.loc['A'])

print('-------------------------------')

print(df.loc[['A', 'B'], ['Items']])

The example uses the loc function.

print(df.loc['A'])

Here we get the first row. We access the row by its index label.

print(df.loc[['A', 'B'], ['Items']])

Here we get the first two rows of the Items column.

$ python select_loc.py
Items       coins
Quantity       22
Name: A, dtype: object
-------------------------------
    Items
A  coins
B   pens

The second example shows how to select by a boolean array.

select_loc2.py
  

#!/usr/bin/python

import pandas as pd

data = {'Items': ['coins', 'pens', 'books'], 'Quantity': [22, 28, 3]}

df = pd.DataFrame(data, index=['A', 'B', 'C'])

print(df.loc[[True, False, True], ['Items', 'Quantity']])

The example selects rows by a boolean array.

$ select_loc2.py
    Items  Quantity
 A  coins        22
 C  books         3

In the third example, we apply a condition when selecting.

select_loc3.py
  

#!/usr/bin/python

import pandas as pd

df = pd.read_csv("employees.csv")

data = df.loc[(df['Salary'] &gt; 10000) &amp; (df['Salary'] &lt; 50000)]
print(data.head(5))

The example prints first five rows from the employees.csv file
that match the criteria: the salary is between 10000 and 50000.

## Pandas iloc

The iloc function allows for a integer-location
based indexing for selection by position.

select_iloc.py
  

#!/usr/bin/python

import pandas as pd

df = pd.read_csv("employees.csv")

# integer-location based indexing for selection by position.
# Multiple row and column selections using iloc and DataFrame

print(df.iloc[0:6])  # first six rows of dataframe
print('--------------------------------------')

print(df.iloc[:, 0:2])  # first two columns of data frame with all rows
print('--------------------------------------')

# 1st, 4th, 7th, 25th row + 1st 6th 8th column
print(df.iloc[[0, 3, 6, 24], [0, 5, 7]])
print('--------------------------------------')

# first 5 rows and 5th, 6th, 7th columns of data frame
print(df.iloc[:5, 5:8])
print('--------------------------------------')

The example shows how to select various combinations of rows and columns
with iloc.

## The take function

The take function returns the elements in the given positional
indices along an axis.

take_fun.py
  

#!/usr/bin/python

import pandas as pd
import numpy as np

df = pd.read_csv('military_spending.csv')
df_c = df.take([1, 2, 3], axis=1)

print(df_c.to_string(index=False))

The example shows columns with indexes 1, 2, and 3. 

$ ./take_fun.py
    Country   Amount (Bn. $)   GDP
United States          610.0   3.1
      China            228.0   1.9
Saudi Arabia            69.4  10.0
     Russia             66.3   4.3
      India             63.9   2.5
     France             57.8   2.3
United Kingdom          47.2   1.8
      Japan             45.4   0.9
    Germany             44.3   1.2
South Korea             39.2   2.6
     Brazil             29.3   1.4
Italy Italy             29.2   1.5
Australia Australia     27.5   2.0
Canada Canada           20.6   1.3
Turkey Turkey           18.2   2.2

## Pandas drop function

The drop function removes the given columns or rows. 

drop_fun.py
  

#!/usr/bin/python

import pandas as pd
import numpy as np

df = pd.DataFrame(np.arange(16).reshape(4, 4), columns=['A', 'B', 'C', 'D'])
df.index = df.index + 1
print(df)

print('----------------------------------------')

df2 = df.drop(['A', 'B'], axis=1)
print(df2)

print('----------------------------------------')

df3 = df.drop([2, 3], axis=0)
print(df3)

We build a small dataframe and delete two columns and two rows.

df2 = df.drop(['A', 'B'], axis=1)
print(df2)

We drop columns 'A' and 'B'. The axis=1 tells that we drop columns.

df3 = df.drop([2, 3], axis=0)

We drop rows width indexes 2 and 3. To drop rows, we set the axis to 0.

$./drop_fun.py
    A   B   C   D
1   0   1   2   3
2   4   5   6   7
3   8   9  10  11
4  12  13  14  15
----------------------------------------
    C   D
1   2   3
2   6   7
3  10  11
4  14  15
----------------------------------------
    A   B   C   D
1   0   1   2   3
4  12  13  14  15

## Pandas sorting

The sort_values sorts a series in ascending or descending order.

sorting.py
  

#!/usr/bin/python

import pandas as pd

s1 = pd.Series([2, 1, 4, 5, 3, 8, 7, 6])
s2 = pd.Series([12, 23, 31, 14, 11, 61, 17, 18])

data = {'Col 1': s1, 'Col 2': s2}
df = pd.DataFrame(data)

print(df.sort_values('Col 1', ascending=True))
print('------------------------------------')
print('Sorted')

print(df.sort_values('Col 2', ascending=False))

The example sorts columns in in ascending or descending order.

$ python sorting.py
    Col 1  Col 2
 1      1     23
 0      2     12
 4      3     11
 2      4     31
 3      5     14
 7      6     18
 6      7     17
 5      8     61
 ------------------------------------
 Sorted
    Col 1  Col 2
 5      8     61
 2      4     31
 1      1     23
 7      6     18
 6      7     17
 3      5     14
 0      2     12
 4      3     11

In the next example, we sort by multiple columns.

sorting2.py
  

#!/usr/bin/python

import pandas as pd

s1 = pd.Series([1, 2, 1, 2, 2, 1, 2, 2])
s2 = pd.Series(['A', 'A', 'B', 'A', 'C', 'C', 'C', 'B'])

data = {'Col 1': s1, 'Col 2': s2}
df = pd.DataFrame(data)

print(df.sort_values(['Col 1', 'Col 2'], ascending=[True, False]))

The example sorts by the first column containing the integers.
Then the second column is sorted taken the results of the first sort
into account.

$ python sorting2.py
    Col 1 Col 2
 5      1     C
 2      1     B
 0      1     A
 4      2     C
 6      2     C
 7      2     B
 1      2     A
 3      2     A

## Source

[Pandas documentation](https://pandas.pydata.org/docs/)

In this article we have worked with the Pandas library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).