+++
title = "Python list directory"
date = 2025-08-29T20:08:51.111+01:00
draft = false
description = "Python list directory tutorial shows how to list directory contents in Python. Multiple examples show how to list the directory contents and filter it."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python list directory

last modified January 29, 2024

Python list directory tutorial shows how to list directory contents in Python.
Multiple examples show how to list the directory contents and filter it.

## Directory definition

Directory is an organizing unit in a computer's file system for storing and
locating files. Directories are hierarchically organized into a tree of
directories. Directories have parent-child relationships. A directory is
sometimes also called a folder.

Over the years, Python gained multiple APIs to list the directory contents.
For instance, we can use the  Path.iterdir, os.scandir,
os.walk, Path.rglob, or os.listdir
functions.

## Python Path.iterdir

The Path.iterdir yields path objects of the directory contents.
The children are yielded in arbitrary order, and the special entries '.' and '..'
are not included.

listing.py
  

#!/usr/bin/python

from pathlib import Path

path = '.'

for path in Path(path).iterdir():

    print(path)

The example lists the contents of the current directory. The listing is non-recursive
and includes both files and directories.

$ ./listing.py
recursive_glob.py
list_dir_files2.py
multiple_extensions.py
walking3.py
list_files.py
temperatures.csv
list_pandas.py
src
...

## Python Path.iterdir list directories

The following example shows how to list only directories.

list_dirs.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('.')

dirs = [e for e in path.iterdir() if e.is_dir()]

for dir in dirs:
    print(dir)
    #print(dir.parts[-1])

The example shows all immediate subdirectories of the current directory.

dirs = [e for e in path.iterdir() if e.is_dir()]

We build a list of directories using Python list comprehension.
The is_dir returns True for a directory entry.

for dir in dirs:
    print(dir)
    #print(dir.parts[-1])

In a for loop, we print all the directories we have found. We can display the
whole path or use the parts to display only a portion of the file.

## Python Path.iterdir list files

The following example shows how to list only files.

list_files.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('/home/janbodnar/Documents/prog/python/')

files = [e for e in path.iterdir() if e.is_file()]

for file in files:
    print(file)

The example lists all files in the given directory. We use the is_file
to check if an entry is a file.

## Python Path.iterdir succint example

The following example shows a very succint code example.

list_files.py
  

#!/usr/bin/python

from pathlib import Path

home_path = Path.home()

print(*Path(home_path).iterdir(), sep="\n")

The iterdir returns a generator. With the * operator, 
we unpack it into arguments for the print function.

## Python list directory with Path.glob

The Path.glob yields all the files that match the given simple
pattern. The ** pattern means this directory and all
subdirectories, recursively. For instance, the **/*.py finds
all Python files in this directory and all its subdirectories.

globbing.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('.')

for e in path.glob('*.py'):
    print(e)

The example prints all files which end in .py extension in the 
current directory.

$ ./globbing.py
recursive_glob.py
list_dir_files2.py
multiple_extensions.py
walking3.py
list_files.py
list_pandas.py
list_files_modified.py
recursive_scandir.py
list_dir_files.py
...

## Python list directory recursively with Path.rglob

The Path.rglob is a convenience call for Path.glob with
**/ added in front of the given relative pattern.

rglobbing.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('/home/janbodnar/Documents/prog/python/')

for e in path.rglob('*.py'):
    print(e)

# for e in path.glob('**/*.py'):
#     print(e)

The example finds all Python files in the given directory and all its
subdirectories. The commented code does the same job.

## Python list directory with multiple extensions

The following example lists all files with three possible extensions.

multiple_extensions.py
  

#!/usr/bin/python

from pathlib import Path

path = Path.cwd()

files = { p.resolve() for p in Path(path).glob("**/*") 
    if p.suffix in ['.py', '.csv', '.txt'] }

for file in files:
    print(file.parts[-1])

The example lists all .py, .csv, and .txt
files.

files = { p.resolve() for p in Path(path).glob("**/*") 
    if p.suffix in ['.py', '.csv', '.txt'] }

We use a set comprehension to build a set of files with the provided extensions.

$ ./multiple_extensions.py 
data_2019.csv
walking.py
list_files.py
data.txt
multiple_extensions.py
scan_dir.py
list_files_size.py
list_pandas.py
temperatures.csv
recursive_glob.py
list_dir_files2.py
data.csv
...

## Python list directory with os.scandir

The os.scandir was introduced in Python 3.5 with the aim of 
improving performance and to mitigate some limitations of the older 
os.listdir.

The scandir function returns directory entries along with file
attribute information, giving better performance for many common use cases.

scan_dir.py
  

#!/usr/bin/python

import os

path = '.'

with os.scandir(path) as it:

    for entry in it:

        if entry.is_file():
            print(entry.name)

The example list all files in the current working directory.

## Python list directory recursively with os.walk

The os.walk walks the given directory recursively; it
 yields a 3-tuple (dirpath, dirnames, filenames).

walking.py
  

#!/usr/bin/python

import os

path = '/home/janbodnar/Documents/prog/python/'

for dirpath, dirs, files in os.walk(path):

  for file in files:

    file_name = os.path.join(dirpath, file)

    if file_name.endswith('.py'):
        print(file_name)

The example lists all Python files. To check if a file is a Python file, we 
use the endswith function.

## Python list directory recursively with os.scandir

The os.walk returns an iterator of os.DirEntry objects
corresponding to the entries in the directory given by path.

recursive_scandir.py
  

#!/usr/bin/python

import os
 
def scan_recursive(path):

    with os.scandir(path) as it:
        
        for entry in it:
            if entry.is_file():
                yield entry.name
            else:
                yield from scan_recursive(entry.path)
 
for e in scan_recursive('/root/Documents/prog/python/'):
    print(e)

The example uses the scandir function alongside the generator 
and recursion patterns to recursively find all files in the given directory.

## Python Path tree

The following practical program outputs the contents of the specified directory
in a hierarchical tree structure. 

path_tree.py
  

#!/usr/bin/python

from pathlib import Path

def generate_tree(directory):

    print(f'+ {directory}')

    for path in sorted(directory.rglob('*')):

        depth = len(path.relative_to(directory).parts)
        spacer = '    ' * depth

        # print(f'{spacer}+ {path.name}')

        if path.is_file():
            print(f'{spacer}f {path.name}')
        else:
            print(f'{spacer}d {path.name}')

path = Path.home() / 'Downloads'

generate_tree(path)

The example generates a directory tree from the Downloads directory.

## Python list directory files by size

The following example lists files filtered by size. 

list_files_size.py
  

#!/usr/bin/python

import os 
from pathlib import Path

path = Path.home() / 'Downloads'

size = 1024*1024*1024

large_files = [e for e in path.rglob('*.*') if e.is_file() and os.path.getsize(e) &gt;= size]

for file in large_files:
    print(f'{file} {os.path.getsize(file)}')

The example prints all files that are greater than 1GB in the Downloads 
directory. We use the path.rglob to walk recursively and the 
os.path.getsize to determine the file size.

## Python list diretory by modification date

The following example lists all files by modification date.

list_files_modified.py
  

#!/usr/bin/python

import os
import datetime

now = datetime.datetime.now()
ago = now - datetime.timedelta(minutes=30)

path = '/home/janbodnar/Documents/prog/python/'

for root, dirs, files in os.walk(path):

    for fname in files:

        path = os.path.join(root, fname)
        st = os.stat(path)
        mtime = datetime.datetime.fromtimestamp(st.st_mtime)

        if mtime &gt; ago:
            print(f'{path} modified {mtime}')

In the example, we list all files that have been modified in the last 30 minutes.
We use the os.stat function to get the modification date of a file
and the os.walk to list the contents.

## Python list directory with os.listdir

The os.listdir returns a list containing the names of the entries
in the directory given by path. The list is in arbitrary order, and does not
include the special entries '.' and '..'.

This is older API and it is generally recommended to use more recent APIs for 
directory listings.

list_dir.py
  

#!/usr/bin/python

import os

path = '.'

files = os.listdir(path)

for file in files:
    print(file)

The example lists all files and directories in the current directory.

list_files2.py
  

#!/usr/bin/python

import os

dirs = filter(os.path.isfile, os.listdir())

print(tuple(dirs))

In this example, we list all files in the current working directory.
We use the built-in filter and the os.path.isfile
functions.

## Python fnmatch with os.listdir

The fnmatch module provides support for Unix
shell-style wildcards. They are not the same as regular expressions..
The special characters used in shell-style wildcards are:

    
        Pattern
        Meaning
    

    
        *
        matches everything
    
    
        ?
        matches any single character
    
    
        [seq]
        matches characters in seq
    
    
        [!seq]
        matches characters not in seq
    

    
Table: The fnmatch special characters

The fnmatch function takes the filename and the pattern as
parameters.

list_csv.py
  

#!/usr/bin/python

import fnmatch
import os

path = '.'

for file in os.listdir(path):

    if fnmatch.fnmatch(file, '*.csv'):
        print(file)

In the example, we list all CSV files.

$ ./list_csv.py 
temperatures.csv
data_2019.csv
data.csv

We have three CSV files in the directory.

## Python directory contents in table with Pandas

Pandas is a Python data analysis and manipulation tool. The following example
shows the directory listings in a Pandas DataFrame.

list_pandas.py
  

#!/usr/bin/python

import pandas as pd
from pathlib import Path
import time

path = Path.cwd()
all_files = []

for e in path.rglob('*.*'):
    all_files.append((e.name, e.parent, time.ctime(e.stat().st_ctime)))

columns = ['File_Name', 'Parent', 'Created']
df = pd.DataFrame.from_records(all_files, columns=columns)

print(df.head(5))

In the example, we show file names, their suffix and creation date for the first 
file entries in a Pandas DataFrame.

$./list_pandas.py 
File name                 Suffix                   Created
0       recursive_glob.py    .py  Fri Sep 11 13:04:54 2020
1      list_dir_files2.py    .py  Fri Sep 11 12:50:22 2020
2  multiple_extensions.py    .py  Fri Sep 11 16:09:30 2020
3             walking3.py    .py  Fri Sep 11 13:06:31 2020
4           list_files.py    .py  Fri Sep 11 14:23:47 2020

## Python directory contents in table with PrettyTable

PrettyTable is a Python library for generating simple ASCII tables. 

list_pretty_table.py
  

#!/usr/bin/python

from prettytable import PrettyTable
from pathlib import Path
import time
    
pt = PrettyTable()

path = Path.cwd()
all_files = []

pt.field_names = ['File name', 'Suffix', 'Created']

for e in path.rglob('*.*'):

    pt.add_row((e.name, e.suffix, time.ctime(e.stat().st_ctime)))

print(pt)

We show the file names of the current directory, their suffix and creation date 
in a table generated by PrettyTable.

$ ./list_pretty_table.py 
+------------------------+--------+--------------------------+
|       File name        | Suffix |         Created          |
+------------------------+--------+--------------------------+
|   recursive_glob.py    |  .py   | Fri Sep 11 13:04:54 2020 |
|   list_dir_files2.py   |  .py   | Fri Sep 11 12:50:22 2020 |
| multiple_extensions.py |  .py   | Fri Sep 11 16:09:30 2020 |
|      walking3.py       |  .py   | Fri Sep 11 13:06:31 2020 |
|     list_files.py      |  .py   | Fri Sep 11 14:23:47 2020 |
|    temperatures.csv    |  .csv  | Fri Sep 11 12:50:37 2020 |
|     list_pandas.py     |  .py   | Sat Sep 12 08:11:57 2020 |
| list_files_modified.py |  .py   | Fri Sep 11 14:59:32 2020 |
|  recursive_scandir.py  |  .py   | Fri Sep 11 16:42:36 2020 |
|   list_dir_files.py    |  .py   | Fri Sep 11 12:48:49 2020 |
|     data_2019.csv      |  .csv  | Fri Sep 11 12:47:35 2020 |
|      listing2.py       |  .py   | Fri Sep 11 15:18:03 2020 |
|       listing.py       |  .py   | Fri Sep 11 15:12:55 2020 |
|     system_list.py     |  .py   | Fri Sep 11 12:53:13 2020 |
|      listing3.py       |  .py   | Fri Sep 11 13:24:58 2020 |
|      scan_dir.py       |  .py   | Fri Sep 11 16:00:53 2020 |
|      list_dir.py       |  .py   | Fri Sep 11 12:46:34 2020 |
|   list_files_size.py   |  .py   | Fri Sep 11 16:52:20 2020 |
|       walking.py       |  .py   | Fri Sep 11 16:41:27 2020 |
|      walking2.py       |  .py   | Fri Sep 11 12:46:34 2020 |
| list_dir_generator.py  |  .py   | Sat Sep 12 07:54:17 2020 |
|      scan_dir2.py      |  .py   | Fri Sep 11 16:00:23 2020 |
|        data.csv        |  .csv  | Fri Sep 11 12:47:35 2020 |
|     list_files2.py     |  .py   | Fri Sep 11 17:07:18 2020 |
|      globbing.py       |  .py   | Fri Sep 11 15:26:45 2020 |
|      rglobbing.py      |  .py   | Fri Sep 11 15:26:24 2020 |
|        data.txt        |  .txt  | Fri Sep 11 12:47:35 2020 |
|      path_tree.py      |  .py   | Fri Sep 11 13:26:39 2020 |
|      list_csv.py       |  .py   | Sat Sep 12 07:48:16 2020 |
|       links.txt        |  .txt  | Fri Sep 11 16:58:25 2020 |
|       succint.py       |  .py   | Fri Sep 11 15:49:54 2020 |
|  list_pretty_table.py  |  .py   | Sat Sep 12 08:13:37 2020 |
+------------------------+--------+--------------------------+

## Source

[Python File and Directory Access - language reference](https://docs.python.org/3/library/filesys.html)

In this article we have showed how to list the directory contents in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).