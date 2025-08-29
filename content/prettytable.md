+++
title = "PrettyTable"
date = 2025-08-29T20:09:55.989+01:00
draft = false
description = "PrettyTable tutorial shows how to use Python PrettyTable module to generate ASCII tables in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PrettyTable

last modified January 29, 2024

In this article we show how to use Python PrettyTable module to generate ASCII
tables in Python. In this article we use the *PTable* module, which is a
fork of the original PrettyTable library.

## PrettyTable

*PrettyTable* is a Python library for generating simple ASCII tables.
It was inspired by the ASCII tables used in the PostgreSQL shell psql.
We can control many aspects of a table, such as the width of the column padding,
the alignment of text, or the table border. We can sort data.

We can also choose which columns and rows are going to be displayed in the final
output. PrettyTable can read data from CSV, HTML, or database cursor and output
data in ASCII or HTML.

## PrettyTable installation

$ pip install prettytable

We install the module with the pip tool.

## Generating PrettyTable

A table can be created with add_row or add_column
methods.

create_by_row.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable()

x.field_names = ["City name", "Area", "Population", "Annual Rainfall"]

x.add_row(["Adelaide", 1295, 1158259, 600.5])
x.add_row(["Brisbane", 5905, 1857594, 1146.4])
x.add_row(["Darwin", 112, 120900, 1714.7])
x.add_row(["Hobart", 1357, 205556, 619.5])
x.add_row(["Sydney", 2058, 4336374, 1214.8])
x.add_row(["Melbourne", 1566, 3806092, 646.9])
x.add_row(["Perth", 5386, 1554769, 869.4])

print(x)

The example creates a PrettyTable with the add_row method.

from prettytable import PrettyTable

From the module, we import PrettyTable.

x.field_names = ["City name", "Area", "Population", "Annual Rainfall"]

We set the header names.

x.add_row(["Adelaide", 1295, 1158259, 600.5])
x.add_row(["Brisbane", 5905, 1857594, 1146.4])

The rows are added to the table with add_row.

print(x)

In the end, we print the table to the console.

$ ./create_by_row.py
+-----------+------+------------+-----------------+
| City name | Area | Population | Annual Rainfall |
+-----------+------+------------+-----------------+
|  Adelaide | 1295 |  1158259   |      600.5      |
|  Brisbane | 5905 |  1857594   |      1146.4     |
|   Darwin  | 112  |   120900   |      1714.7     |
|   Hobart  | 1357 |   205556   |      619.5      |
|   Sydney  | 2058 |  4336374   |      1214.8     |
| Melbourne | 1566 |  3806092   |      646.9      |
|   Perth   | 5386 |  1554769   |      869.4      |
+-----------+------+------------+-----------------+

In the next example, we create the same table with the add_column
method.

create_by_column.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable()

column_names = ["City name", "Area", "Population", "Annual Rainfall"]

x.add_column(column_names[0], ["Adelaide", "Brisbane", "Darwin",
    "Hobart", "Sydney", "Melbourne", "Perth"])
x.add_column(column_names[1], [1295, 5905, 112, 1357, 2058, 1566, 5386 ])
x.add_column(column_names[2], [1158259, 1857594, 120900, 205556, 4336374,
    3806092, 1554769])
x.add_column(column_names[3], [600.5, 1146.4, 1714.7, 619.5, 1214.8,
    646.9, 869.4])

print(x)

The column name is the first parameter of the add_column
method.

## PrettyTable deleting rows

With del_row it is possible to delete a specific row.
The method takes the index of the row to be deleted. Note that indexing
start from zero.

delete_rows.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable()

x.field_names = ["City name", "Area", "Population", "Annual Rainfall"]

x.add_row(["Adelaide", 1295, 1158259, 600.5])
x.add_row(["Brisbane", 5905, 1857594, 1146.4])
x.add_row(["Darwin", 112, 120900, 1714.7])
x.add_row(["Hobart", 1357, 205556, 619.5])
x.add_row(["Sydney", 2058, 4336374, 1214.8])
x.add_row(["Melbourne", 1566, 3806092, 646.9])
x.add_row(["Perth", 5386, 1554769, 869.4])

x.del_row(6)
x.del_row(5)
x.del_row(4)
x.del_row(3)

print(x)

In the example, we delete last four rows.

$ ./delete_rows.py
+-----------+------+------------+-----------------+
| City name | Area | Population | Annual Rainfall |
+-----------+------+------------+-----------------+
|  Adelaide | 1295 |  1158259   |      600.5      |
|  Brisbane | 5905 |  1857594   |      1146.4     |
|   Darwin  | 112  |   120900   |      1714.7     |
+-----------+------+------------+-----------------+

The first three rows are left in the output.

## PrettyTable clearing data

The clear_rows method deletes all rows from the table but keeps the
current column names. The clear method clears both rows and column names.

clear_rows.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable()

x.field_names = ["City name", "Area", "Population", "Annual Rainfall"]

x.add_row(["Adelaide", 1295, 1158259, 600.5])
x.add_row(["Brisbane", 5905, 1857594, 1146.4])
x.add_row(["Darwin", 112, 120900, 1714.7])
x.add_row(["Hobart", 1357, 205556, 619.5])
x.add_row(["Sydney", 2058, 4336374, 1214.8])
x.add_row(["Melbourne", 1566, 3806092, 646.9])
x.add_row(["Perth", 5386, 1554769, 869.4])

x.clear_rows()
print(x)

The example clears all rows from the table.

$ ./clear_rows.py
+-----------+------+------------+-----------------+
| City name | Area | Population | Annual Rainfall |
+-----------+------+------------+-----------------+
+-----------+------+------------+-----------------+

This is the output of the example. The header of the table is not deleted.

## PrettyTable generation from CSV

The from_csv method can be used to
generate a PrettyTable from CSV data.

data.csv
  

"City name", "Area", "Population", "Annual Rainfall"
"Adelaide", 1295, 1158259, 600.5
"Brisbane", 5905, 1857594, 1146.4
"Darwin", 112, 120900, 1714.7
"Hobart", 1357, 205556, 619.5
"Sydney", 2058, 4336374, 1214.8
"Melbourne", 1566, 3806092, 646.9
"Perth", 5386, 1554769, 869.4

The data.csv contains data separated by comma character.
Note that the first row consists of table column names.

read_from_csv.py
  

#!/usr/bin/python

from prettytable import from_csv

with open("data.csv", "r") as fp:
    x = from_csv(fp)

print(x)

The example reads data from data.csv and generates a PrettyTable
with from_csv from it.

## PrettyTable generation from database cursor

The from_db_cursor method generates PrettyTable from a database cursor.

cities.sql
  

DROP TABLE IF EXISTS Cities;

CREATE TABLE Cities(Id INTEGER PRIMARY KEY, Name TEXT, Area INTEGER,
    Population INTEGER, Rainfall REAL);

INSERT INTO Cities(Name, Area, Population, Rainfall) VALUES("Adelaide", 1295, 1158259, 600.5);
INSERT INTO Cities(Name, Area, Population, Rainfall) VALUES("Brisbane", 5905, 1857594, 1146.4);
INSERT INTO Cities(Name, Area, Population, Rainfall) VALUES("Darwin", 112, 120900, 1714.7);
INSERT INTO Cities(Name, Area, Population, Rainfall) VALUES("Hobart", 1357, 205556, 619.5);
INSERT INTO Cities(Name, Area, Population, Rainfall) VALUES("Sydney", 2058, 4336374, 1214.8);
INSERT INTO Cities(Name, Area, Population, Rainfall) VALUES("Melbourne", 1566, 3806092, 646.9);
INSERT INTO Cities(Name, Area, Population, Rainfall) VALUES("Perth", 5386, 1554769, 869.4);

This is an SQL script to create a Cities table in the SQLite database.

$ sqlite3 data.db
sqlite&gt; .read cities.sql
sqlite&gt; SELECT * FROM Cities;
Id          Name        Area        Population  Rainfall
----------  ----------  ----------  ----------  ----------
1           Adelaide    1295        1158259     600.5
2           Brisbane    5905        1857594     1146.4
3           Darwin      112         120900      1714.7
4           Hobart      1357        205556      619.5
5           Sydney      2058        4336374     1214.8
6           Melbourne   1566        3806092     646.9
7           Perth       5386        1554769     869.4

We read the cities.sql script which generates the database table.

read_from_cursor.py
  

#!/usr/bin/python

import sqlite3 as lite
from prettytable import from_db_cursor

con = lite.connect('data.db')

with con:

    cur = con.cursor()
    cur.execute('SELECT * FROM Cities')

    x = from_db_cursor(cur)

print(x)

In the code example, we connect to the data.db database and
select all data from the Cities table. We generate a PrettyTable
from the cursor using the from_db_cursor method.

## PrettyTable generation from HTML

The from_html generates a list of PrettyTables from a string
of HTML code. Each &lt;table&gt; in the HTML becomes one PrettyTable object.
The from_html_one generates a PrettyTable from a string of
HTML code which contains only a single &lt;table&gt;.

data.html
  

&lt;html&gt;
    &lt;body&gt;
        &lt;table&gt;
            &lt;tr&gt;
                &lt;th&gt;City name&lt;/th&gt;
                &lt;th&gt;Area&lt;/th&gt;
                &lt;th&gt;Population&lt;/th&gt;
                &lt;th&gt;Annual Rainfall&lt;/th&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
                &lt;td&gt;Adelaide&lt;/td&gt;
                &lt;td&gt;1295&lt;/td&gt;
                &lt;td&gt;1158259&lt;/td&gt;
                &lt;td&gt;600.5&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
                &lt;td&gt;Brisbane&lt;/td&gt;
                &lt;td&gt;5905&lt;/td&gt;
                &lt;td&gt;1857594&lt;/td&gt;
                &lt;td&gt;1146.4&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
                &lt;td&gt;Darwin&lt;/td&gt;
                &lt;td&gt;112&lt;/td&gt;
                &lt;td&gt;120900&lt;/td&gt;
                &lt;td&gt;1714.7&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
                &lt;td&gt;Hobart&lt;/td&gt;
                &lt;td&gt;1357&lt;/td&gt;
                &lt;td&gt;205556&lt;/td&gt;
                &lt;td&gt;619.5&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
                &lt;td&gt;Sydney&lt;/td&gt;
                &lt;td&gt;2058&lt;/td&gt;
                &lt;td&gt;4336374&lt;/td&gt;
                &lt;td&gt;1214.8&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
                &lt;td&gt;Melbourne&lt;/td&gt;
                &lt;td&gt;1566&lt;/td&gt;
                &lt;td&gt;3806092&lt;/td&gt;
                &lt;td&gt;646.9&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr&gt;
                &lt;td&gt;Perth&lt;/td&gt;
                &lt;td&gt;5386&lt;/td&gt;
                &lt;td&gt;1554769&lt;/td&gt;
                &lt;td&gt;869.4&lt;/td&gt;
            &lt;/tr&gt;
        &lt;/table&gt;
    &lt;/body&gt;
&lt;/html&gt;

In the example, we use this HTML file.

read_from_html.py
  

#!/usr/bin/python

from prettytable import from_html_one

with open("data.html", "r") as fp:
    html = fp.read()

x = from_html_one(html)
print(x)

The example reads data from the data.html file and
generates a PrettyTable with the from_html_one method.

## Sorting data

With the sortby property, we specify which column
is going to be sorted. The reversesort property controls
the direction of sorting (ascending vs descending).

sorting.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable()
x.field_names = ["City name", "Area", "Population", "Annual Rainfall"]

x.add_row(["Adelaide", 1295, 1158259, 600.5])
x.add_row(["Brisbane", 5905, 1857594, 1146.4])
x.add_row(["Darwin", 112, 120900, 1714.7])
x.add_row(["Hobart", 1357, 205556, 619.5])
x.add_row(["Sydney", 2058, 4336374, 1214.8])
x.add_row(["Melbourne", 1566, 3806092, 646.9])
x.add_row(["Perth", 5386, 1554769, 869.4])

print("Table sorted by population:")
x.sortby = "Population"
print(x)

print()

print("Table sorted by city in descendig order:")
x.sortby = "City name"
x.reversesort = True
print(x)

In the example, we sort data of the table.

print("Table sorted by population:")
x.sortby = "Population"

First, we sort the data by population in ascending order.

x.sortby = "City name"
x.reversesort = True

Then we sort data by city name in descendig order.

$ ./sorting.py
Table sorted by population:
+-----------+------+------------+-----------------+
| City name | Area | Population | Annual Rainfall |
+-----------+------+------------+-----------------+
|   Darwin  | 112  |   120900   |      1714.7     |
|   Hobart  | 1357 |   205556   |      619.5      |
|  Adelaide | 1295 |  1158259   |      600.5      |
|   Perth   | 5386 |  1554769   |      869.4      |
|  Brisbane | 5905 |  1857594   |      1146.4     |
| Melbourne | 1566 |  3806092   |      646.9      |
|   Sydney  | 2058 |  4336374   |      1214.8     |
+-----------+------+------------+-----------------+

Table sorted by city in descendig order:
+-----------+------+------------+-----------------+
| City name | Area | Population | Annual Rainfall |
+-----------+------+------------+-----------------+
|   Sydney  | 2058 |  4336374   |      1214.8     |
|   Perth   | 5386 |  1554769   |      869.4      |
| Melbourne | 1566 |  3806092   |      646.9      |
|   Hobart  | 1357 |   205556   |      619.5      |
|   Darwin  | 112  |   120900   |      1714.7     |
|  Brisbane | 5905 |  1857594   |      1146.4     |
|  Adelaide | 1295 |  1158259   |      600.5      |
+-----------+------+------------+-----------------+

## Data alignment

The align property controls alignment of fields.
Its possible values are l, c, and r.

alignment.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable()

x.field_names = ["City name", "Area", "Population", "Annual Rainfall"]

x.align["City name"] = "l"
x.align["Area"] = "r"
x.align["Annual Rainfall"] = "r"

x.add_row(["Adelaide", 1295, 1158259, 600.5])
x.add_row(["Brisbane", 5905, 1857594, 1146.4])
x.add_row(["Darwin", 112, 120900, 1714.7])
x.add_row(["Hobart", 1357, 205556, 619.5])
x.add_row(["Sydney", 2058, 4336374, 1214.8])
x.add_row(["Melbourne", 1566, 3806092, 646.9])
x.add_row(["Perth", 5386, 1554769, 869.4])

print(x)

The code example aligns data in the table columns.

x.align["City name"] = "l"

We align fields in the "City name" column to the left.

x.align["Area"] = "r"
x.align["Annual Rainfall"] = "r"

We align fields in the "Area" and "Annual Rainfall" to the right.

$ ./alignment.py
+-----------+------+------------+-----------------+
| City name | Area | Population | Annual Rainfall |
+-----------+------+------------+-----------------+
| Adelaide  | 1295 |  1158259   |           600.5 |
| Brisbane  | 5905 |  1857594   |          1146.4 |
| Darwin    |  112 |   120900   |          1714.7 |
| Hobart    | 1357 |   205556   |           619.5 |
| Sydney    | 2058 |  4336374   |          1214.8 |
| Melbourne | 1566 |  3806092   |           646.9 |
| Perth     | 5386 |  1554769   |           869.4 |
+-----------+------+------------+-----------------+

## HTML output

The get_html_string generates HTML output from a PrettyTable.

html_output.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable(["City name", "Area", "Population", "Annual Rainfall"])

x.add_row(["Adelaide",1295, 1158259, 600.5])
x.add_row(["Brisbane",5905, 1857594, 1146.4])
x.add_row(["Darwin", 112, 120900, 1714.7])
x.add_row(["Hobart", 1357, 205556, 619.5])
x.add_row(["Sydney", 2058, 4336374, 1214.8])
x.add_row(["Melbourne", 1566, 3806092, 646.9])
x.add_row(["Perth", 5386, 1554769, 869.4])

print(x.get_html_string())

The example prints the data in an HTML table to the console.

## The get_string method

The get_string method returns the string representation
of a table in current state. It has several options that control how
the table is shown.

### Showing title

With the title parameter, we can include a table title in
the output.

table_title.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable(["City name", "Area", "Population", "Annual Rainfall"])

x.add_row(["Adelaide",1295, 1158259, 600.5])
x.add_row(["Brisbane",5905, 1857594, 1146.4])
x.add_row(["Darwin", 112, 120900, 1714.7])
x.add_row(["Hobart", 1357, 205556, 619.5])
x.add_row(["Sydney", 2058, 4336374, 1214.8])
x.add_row(["Melbourne", 1566, 3806092, 646.9])
x.add_row(["Perth", 5386, 1554769, 869.4])

print(x.get_string(title="Australian cities"))

The example creates a PrettyTable with a title.

$ ./table_title.py
+-------------------------------------------------+
|                Australian cities                |
+-----------+------+------------+-----------------+
| City name | Area | Population | Annual Rainfall |
+-----------+------+------------+-----------------+
|  Adelaide | 1295 |  1158259   |      600.5      |
|  Brisbane | 5905 |  1857594   |      1146.4     |
|   Darwin  | 112  |   120900   |      1714.7     |
|   Hobart  | 1357 |   205556   |      619.5      |
|   Sydney  | 2058 |  4336374   |      1214.8     |
| Melbourne | 1566 |  3806092   |      646.9      |
|   Perth   | 5386 |  1554769   |      869.4      |
+-----------+------+------------+-----------------+

### Selecting column

With the fields option we can select columns which are going
to be displayed.

select_columns.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable(["City name", "Area", "Population", "Annual Rainfall"])

x.add_row(["Adelaide",1295, 1158259, 600.5])
x.add_row(["Brisbane",5905, 1857594, 1146.4])
x.add_row(["Darwin", 112, 120900, 1714.7])
x.add_row(["Hobart", 1357, 205556, 619.5])
x.add_row(["Sydney", 2058, 4336374, 1214.8])
x.add_row(["Melbourne", 1566, 3806092, 646.9])
x.add_row(["Perth", 5386, 1554769, 869.4])

print(x.get_string(fields=["City name", "Population"]))

In the example, we only display "City name" and "Population" columns.

$ ./select_columns.py
+-----------+------------+
| City name | Population |
+-----------+------------+
|  Adelaide |  1158259   |
|  Brisbane |  1857594   |
|   Darwin  |   120900   |
|   Hobart  |   205556   |
|   Sydney  |  4336374   |
| Melbourne |  3806092   |
|   Perth   |  1554769   |
+-----------+------------+

### Selecting rows

With the start and end parameters, we can select which
rows to display in the output.

select_rows.py
  

#!/usr/bin/python

from prettytable import PrettyTable

x = PrettyTable(["City name", "Area", "Population", "Annual Rainfall"])

x.add_row(["Adelaide",1295, 1158259, 600.5])
x.add_row(["Brisbane",5905, 1857594, 1146.4])
x.add_row(["Darwin", 112, 120900, 1714.7])
x.add_row(["Hobart", 1357, 205556, 619.5])
x.add_row(["Sydney", 2058, 4336374, 1214.8])
x.add_row(["Melbourne", 1566, 3806092, 646.9])
x.add_row(["Perth", 5386, 1554769, 869.4])

print(x.get_string(start=1, end=4))

In the example, we only include three rows in the output.

$ ./select_rows.py
+-----------+------+------------+-----------------+
| City name | Area | Population | Annual Rainfall |
+-----------+------+------------+-----------------+
|  Brisbane | 5905 |  1857594   |      1146.4     |
|   Darwin  | 112  |   120900   |      1714.7     |
|   Hobart  | 1357 |   205556   |      619.5      |
+-----------+------+------------+-----------------+

## Diplaying BTC tickers

In the next example, we display the BTC prices in a table. To fetch the data, 
we use the ccxt module. The data is fetched from the Binance 
exchange.

btc_ohlcv.py
  

#!/usr/bin/python

import asyncio
from datetime import datetime
import ccxt.async_support as ccxt
from prettytable import PrettyTable

async def tickers():

    binance = ccxt.binance()
    data = await binance.fetch_ohlcv('BTC/USDT', '1d', limit=10)
    await binance.close()

    x = PrettyTable()
    x.field_names = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume']
    x.align['Volume'] = 'r'

    for e in data:

        d = datetime.utcfromtimestamp(e[0]/1000.0)
        x.add_row([f'{d:%m/%d/%Y}', f'{e[1]:.2f}', f'{e[2]:.2f}',
                   f'{e[3]:.2f}', f'{e[4]:.2f}', f'{e[5]:.5f}'])

    print(x)

asyncio.run(tickers())

The example displays the open, high, low, close data for BTC for the last ten 
days.

x = PrettyTable()
x.field_names = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume']
x.align['Volume'] = 'r'

We have the date and the OHLCV values. The last column is right-aligned.

$ ./btc_ohlcv.py
+------------+----------+----------+----------+----------+--------------+
|    Date    |   Open   |   High   |   Low    |  Close   |       Volume |
+------------+----------+----------+----------+----------+--------------+
| 03/17/2023 | 24998.78 | 27756.84 | 24890.00 | 27395.13 | 624460.68091 |
| 03/18/2023 | 27395.13 | 27724.85 | 26578.00 | 26907.49 | 371238.97174 |
| 03/19/2023 | 26907.49 | 28390.10 | 26827.22 | 27972.87 | 372066.99054 |
| 03/20/2023 | 27972.87 | 28472.00 | 27124.47 | 27717.01 | 477378.23373 |
| 03/21/2023 | 27717.01 | 28438.55 | 27303.10 | 28105.47 | 420929.74220 |
| 03/22/2023 | 28107.81 | 28868.05 | 26601.80 | 27250.97 | 224113.41296 |
| 03/23/2023 | 27250.97 | 28750.00 | 27105.00 | 28295.41 | 128649.60818 |
| 03/24/2023 | 28295.42 | 28374.30 | 27000.00 | 27454.47 |  86242.06544 |
| 03/25/2023 | 27454.46 | 27787.33 | 27156.09 | 27462.95 |  50844.08102 |
| 03/26/2023 | 27462.96 | 28194.40 | 27417.76 | 27740.46 |  42069.06686 |
+------------+----------+----------+----------+----------+--------------+

## Source

[Python prettytable Github page](https://github.com/jazzband/prettytable)

In this article we have used the PrettyTable library to generate ASCII tables in
Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).