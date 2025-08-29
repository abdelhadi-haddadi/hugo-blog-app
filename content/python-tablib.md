+++
title = "Python tablib"
date = 2025-08-29T20:10:54.619+01:00
draft = false
description = "Python tablib tutorial shows how to work with tabular ds in Python using the tablib module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python tablib

last modified September 24, 2024

In this article we show how to work with TOML configuration file format in
Python. We use the tomllib module, which was introduced in Python
3.11.

The tablib library is designed to make working with tabular data (like CSV,
XLSX, JSON, and more) more efficient and flexible. It provides a consistent
interface for handling these different data formats.

It allows us to easily:

  Create and manipulate tabular data: Define and modify data structures
  using Python lists or dictionaries.
  Convert between formats: Seamlessly transform data between CSV, XLSX,
  JSON, and other supported formats.
  Export and import data: Save data to files or load data from existing
  files. 
  Customize output: Control the appearance of exported data, such as column
  headers, formatting, and more.

## Defining Dataset

A tablib Dataset is a Python object that represents a collection of tabular
data. It provides a structured way to store and manipulate data in a consistent
format.

main.py
  

import tablib

ds = tablib.Dataset()

ds.headers = ['first_name', 'last_name', 'occupation']
ds.append(['John', 'Doe', 'gardener' ])
ds.append(['Adam', 'Brown', 'programmer' ])
ds.append(['Tom', 'Holland', 'teacher' ])
ds.append(['Ken', 'Roberts', 'driver' ])

print(ds)
ds.wipe()
print(ds)

The example creates a simple dataset.

ds = tablib.Dataset()

We create an empty dataset.

ds.headers = ['first_name', 'last_name', 'occupation']

We create four headers for the dataset.

ds.append(['John', 'Doe', 'gardener' ])
ds.append(['Adam', 'Brown', 'programmer' ])
ds.append(['Tom', 'Holland', 'teacher' ])
ds.append(['Ken', 'Roberts', 'driver' ])

Using append method, we add four rows to the dataset.

print(ds)

We print the contents of the dataset.

ds.wipe()

The wipe method removes the data from the dataset.

$ ./main.py
first_name|last_name|occupation
----------|---------|----------
John      |Doe      |gardener
Adam      |Brown    |programmer
Tom       |Holland  |teacher
Ken       |Roberts  |driver

## Getting rows

We can retrieve rows via indexing operation or the get method.

main.py
  

import tablib

ds = tablib.Dataset()

ds.headers = ['first_name', 'last_name', 'occupation']
ds.append(['John', 'Doe', 'gardener' ])
ds.append(['Adam', 'Brown', 'programmer' ])
ds.append(['Tom', 'Holland', 'teacher' ])
ds.append(['Ken', 'Roberts', 'driver' ])

print(ds[0])
print(ds[-1])

print(ds.get(1))
print(ds.get(-2))

The example builds a dataset and retrieves four rows.

$ ./main.py
('John', 'Doe', 'gardener')
('Ken', 'Roberts', 'driver')
('Adam', 'Brown', 'programmer')
('Tom', 'Holland', 'teacher')

## Getting columns

The get_col method returns the column from the Dataset
at the given index.

main.py
  

import tablib

ds = tablib.Dataset()

ds.headers = ['first_name', 'last_name', 'occupation']
ds.append(['John', 'Doe', 'gardener' ])
ds.append(['Adam', 'Brown', 'programmer' ])
ds.append(['Tom', 'Holland', 'teacher' ])
ds.append(['Ken', 'Roberts', 'driver' ])

print(ds.get_col(0))
print(ds.get_col(2))

In the example, we print the first and the last columns.

$ ./main.py
['John', 'Adam', 'Tom', 'Ken']
['gardener', 'programmer', 'teacher', 'driver']

## Adding a new column

The append_col adds a column to the dataset.

main.py
  

import tablib

ds = tablib.Dataset()

ds.headers = ['first_name', 'last_name', 'occupation']
ds.append(['John', 'Doe', 'gardener' ])
ds.append(['Adam', 'Brown', 'programmer' ])
ds.append(['Tom', 'Holland', 'teacher' ])
ds.append(['Ken', 'Roberts', 'driver' ])

ds.append_col([980, 1230, 2310, 1100], header='salary')

print(ds)

In the example, we add a new column salary to the dataset.

$ main.py
first_name|last_name|occupation|salary
----------|---------|----------|------
John      |Doe      |gardener  |980
Adam      |Brown    |programmer|1230
Tom       |Holland  |teacher   |2310
Ken       |Roberts  |driver    |1100

## Sorting data

The sort function is used to sort the data in the dataset.
The function returns a new sorted dataset; the original dataset is not modified.

  

import tablib

ds = tablib.Dataset()

ds.headers = ['first_name', 'last_name', 'occupation']
ds.append(['John', 'Doe', 'gardener' ])
ds.append(['Adam', 'Brown', 'programmer' ])
ds.append(['Tom', 'Holland', 'teacher' ])
ds.append(['Ken', 'Roberts', 'driver' ])

ds.append_col([980, 1230, 2310, 1100], header='salary')

sorted_ds = ds.sort('last_name')
print(sorted_ds)

print()

sorted_ds = ds.sort(3, reverse=True)
print(sorted_ds)

The example sorts the data by last name and salary.

sorted_ds = ds.sort('last_name')
print(sorted_ds)

We sort the data by the last_name column. The function returns
a new sorted dataset.

sorted_ds = ds.sort(3, reverse=True)
print(sorted_ds)

We sort the data by salary in descending order. This time we provide the column
index.

$ ./main.py
first_name|last_name|occupation|salary
----------|---------|----------|------
Adam      |Brown    |programmer|1230
John      |Doe      |gardener  |980
Tom       |Holland  |teacher   |2310
Ken       |Roberts  |driver    |1100

first_name|last_name|occupation|salary
----------|---------|----------|------
Tom       |Holland  |teacher   |2310
Adam      |Brown    |programmer|1230
Ken       |Roberts  |driver    |1100
John      |Doe      |gardener  |980

## Formatting columns

With add_formatter, we can format a column.

main.py
  

import tablib
import datetime

ds = tablib.Dataset()
ds.headers = ['Name', 'Age', 'Height', 'Birthdate']

ds.append(['John Doe', 34, 174.5, datetime.date(1990, 1, 1)])
ds.append(['Roger Roe', 25, 182.7, datetime.date(1995, 5, 15)])

ds.add_formatter('Height', lambda v: f'${v:.2f}')
ds.add_formatter('Birthdate', lambda v: v.strftime('%Y-%m-%d'))
print(ds)

The example formats the Height and Birthdate columns.

## Exporting dataset

The export method exports the dataset into the specified format.
The supported formats include CSV, YAML, XLSX, JSON, and Pandas dataframe.

main.py
  

import tablib

ds = tablib.Dataset()

ds.headers = ['first_name', 'last_name', 'occupation']
ds.append(['John', 'Doe', 'gardener' ])
ds.append(['Adam', 'Brown', 'programmer' ])
ds.append(['Tom', 'Holland', 'teacher' ])
ds.append(['Ken', 'Roberts', 'driver' ])

ds.append_col([980, 1230, 2310, 1100], header='salary')

fname = 'users.csv'

with open(fname, 'w', newline='') as f:
    f.write(ds.export('csv'))

fname = 'users.xlsx'

with open(fname, 'wb') as f:
    f.write(ds.export('xlsx'))

We export the dataset into CSV and XLSX formats.

with open(fname, 'w', newline='') as f:
    f.write(ds.export('csv'))

In order not to have additional empty lines, we set the newline
option for the CSV format to empty character.

with open(fname, 'wb') as f:
    f.write(ds.export('xlsx'))

For the XLSX format, we open a file in the 'wb' mode.

## The load function

The load function loads the data into the dataset.

main.py
  

import tablib

ds = tablib.Dataset()

fname = 'users.csv'
with open(fname, 'r') as f:

    ds.load(f)

print(ds)

We load the rows fromt he users.csv file into the dataset.

$ ./main.py
first_name|last_name|occupation|salary
----------|---------|----------|------
John      |Doe      |gardener  |980
Adam      |Brown    |programmer|1230
Tom       |Holland  |teacher   |2310
Ken       |Roberts  |driver    |1100

## Source

[Tablib: Pythonic Tabular Datasets](https://tablib.readthedocs.io/en/stable/)

In this article we have worked with tabular data in Python utilizing the tablib
library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).