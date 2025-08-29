+++
title = "Python pathlib"
date = 2025-08-29T20:09:52.216+01:00
draft = false
description = "Python pathlib tutorial shows how to work with files and directories in Python with pathlib module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python pathlib

last modified January 29, 2024

Python pathlib tutorial shows how to work with files and directories in Python
with pathlib module.

The pathlib is a Python module which provides an object API 
for working with files and directories. The pathlib is a standard 
module.

Path is the core object to work with files.

$ pip install prettytable
$ pip install more_itertools

In this article we will also use prettytable and
more_itertools.

words.txt
  

blue
forest
sky
ocean
rabbit
clue

Some examples use this simple text file.

## Path cwd and home

We get the current working directory with cwd and the home 
directory with home.

cwd_home.py
  

#!/usr/bin/python

from pathlib import Path

print(f"Current directory: {Path.cwd()}")
print(f"Home directory: {Path.home()}")

The example prints the current working directory and the home directory.

$ cwd_home.py
Current directory: C:\Users\Jano\Documents\pyprogs\pathlib
Home directory: C:\Users\Jano

## Python pathlib current file

The __file__ gives the path to the current running program.

current.py
  

#!/usr/bin/python

from pathlib import Path

p = Path(__file__)
print(p)

The example prints the program's path.

$ ./current.py 
/home/jano/Documents/prog/python/tmp/current.py

## Python pathlib change directory

We go inside another directory with os' chdir.

change_dir.py
  

#!/usr/bin/python

from pathlib import Path
from os import chdir

path = Path('..')

print(f'Current working directory: {path.cwd()}')

chdir(path)

print(f'Current working directory: {path.cwd()}')

chdir('..')

We change the current working directory. Note that the directory is 
changed only inside the Python program.

$ change_dir.py
Current working directory: C:\Users\Jano\Documents\pyprogs\pathlib
Current working directory: C:\Users\Jano\Documents\pyprogs

## Path mkdir

A new directory is created with mkdir.

mkdir.py
  

#!/usr/bin/python

from pathlib import Path

path = Path.cwd() / 'new'

path.mkdir()

The example creates a new directory inside the current working directory.

## Python pathlib copy file

With the help of the shutil module, we copy a file.

copy_file.py
  

#!/usr/bin/python

from pathlib import Path
from shutil import copyfile

source = Path('words.txt')
destination = Path('words_bck.txt')

copyfile(source, destination)

The example makes a copy of a words.txt file.

source = Path('words.txt')

A file object is created by passing the file name to the 
Path constructor.

## Joining paths

Paths can be joined with the / operator or the joinpath
method.

join_path.py
  

#!/usr/bin/python

from pathlib import Path

path = Path.home()

docs = path / 'Documents'
pictures = path / 'Pictures'

print(docs)
print(pictures)

In the example, we join two paths with /.

$ join_path.py
C:\Users\Jano\Documents
C:\Users\Jano\Pictures

## Path touch

The touch creates a new empty file; it is an equivalent of the
Linux touch command.

touch.py
  

#!/usr/bin/python

from pathlib import Path

Path('myfile.txt').touch()

We create a new empty myfile.txt.

## Path rename

The rename renames a file or directory.

rename.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('names.txt')

path.rename('mynames.txt')

The example renames the names.txt to mynames.txt
in the current working directory.

## Path names

We refer to files with their absolute file paths or relative paths.  
The paths have different representations; Windows uses different file paths 
than Linux.

path_names.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('C:/Users/Jano/Downloads/wordpress-5.1.tar.gz')

print(path)
print(path.as_uri())
print(path.as_posix())

The example shows three different file path structures.

$ path_names.py
C:\Users\Jano\Downloads\wordpress-5.1.tar.gz
file:///C:/Users/Jano/Downloads/wordpress-5.1.tar.gz
C:/Users/Jano/Downloads/wordpress-5.1.tar.gz

The first one is the Windows file path. The second one is an URI style. 
The third one is the POSIX style.

## Path relative_to

A *relative path* starts from some given working directory, 
avoiding the need to provide the full absolute path. For instance, 
data.txt is a relative path to the 
/home/users/jano/data.txt from the perspective of 
the /home/users/jano/ directory. 

In other words, when we are located in the /home/users/jano/
directory, we can relate to the file simply by its name data.txt,
without the need to specify the full path.

relative_path.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('C:/Users/Jano/Downloads/wordpress-5.1.tar.gz')

home = Path.home()

relative = path.relative_to(home)
print(relative)

The example prints the relative path of an archive file given the 
home directory.

$ relative_path.py
Downloads\wordpress-5.1.tar.gz

## Path parents

With parent and parents, we can get the logical
parents of a path.

parents.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('C:/Users/Jano/Documents')

print(f"The parent directory of {path} is {path.parent}")
print(f"The parent of the parent of {path} is {path.parent.parent}")

print(f"All the parents of {path.parent}: ")

print(list(path.parents))

The example prints parents of a path.

print(f"The parent of the parent of {path} is {path.parent.parent}")

We can get a parent of a parent.

$ parents.py
The parent directory of C:\Users\Jano\Documents is C:\Users\Jano
The parent of the parent of C:\Users\Jano\Documents is C:\Users
All the parents of C:\Users\Jano:
[WindowsPath('C:/Users/Jano'), WindowsPath('C:/Users'), WindowsPath('C:/')]

## Path parts

Path consists of subelements, such as drive or root.

parts.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('C:/Users/Jano/Documents')

print(path.parts)
print(path.drive)
print(path.root)

The program prints some parts of a path.

print(path.parts)

The parts gives access to the path's various components.

print(path.drive)

The drive gives a string representing the drive 
letter or name, if any.

print(path.root)

The root gives a string representing the (local or global) 
root, if any.

$ parts.py
('C:\\', 'Users', 'Jano', 'Documents')
C:
\

The following program gives other parts of a path.  

parts2.py
  

#!/usr/bin/python

from pathlib import Path
import os

path = Path('C:/Users/Jano/Downloads/wordpress-5.1.tar.gz')

print(f"The stem is: {path.stem}")
print(f"The name is: {path.name}")
print(f"The suffix is: {path.suffix}")
print(f"The anchor is: {path.anchor}")

print(f"File name: {os.path.splitext(path.stem)[0]}")

print("The suffixes: ")
print(path.suffixes)

The program prints the stem, name, suffix(es), and the anchor.

$ parts2.py
The stem is: wordpress-5.1.tar
The name is: wordpress-5.1.tar.gz
The suffix is: .gz
The anchor is: C:\
File name: wordpress-5.1
The suffixes:
['.1', '.tar', '.gz']

## Path list directories

The iterdir yields path objects of the directory contents.

list_dirs.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('C:/Users/Jano/Documents')

dirs = [e for e in path.iterdir() if e.is_dir()]
print(dirs)

The example prints the subdirectories of the specified 
directory. We check if the path object is a directory with is_dir.

The following example prints the files inside the specified directory.  

list_files.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('C:/Users/Jano/Documents')

files = [e for e in path.iterdir() if e.is_file()]
print(files)

We check if a path object is a file with is_file.

## Path globbing

Glob patterns specify sets of filenames with wildcard characters. For example,
the *.txt represents all files with names ending in
.txt. The * is a wildcard standing for any string of
characters. The other common wildcard is the question mark (?), which stands for
one character.   

Path provides glob and rglob. The latter is 
used for recursive globbing. It adds **/ in front of 
the given pattern.

globbing.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('C:/Users/Jano/Documents/pyprogs')

for e in path.rglob('*.py'):
    print(e)
    
# for e in path.glob('**/*.py'):
#     print(e)    

The example prints all Python files in the specified directory 
and all its subdirectories. Notice that such operations may be 
very time consuming.

for e in path.rglob('*.py'):
print(e)
    
# for e in path.glob('**/*.py'):
#     print(e)    

Both operations are equivalent.

## Path tree

The following example is a practical program which outputs the contents 
of the specified directory in a hierarchical tree structure.  

tree.py
  

#!/usr/bin/python

from pathlib import Path

def tree(directory):

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

tree(path)

The program outputs the contents of the Downloads directory 
in a tree structure.

## Counting files by extension

In the following example, we count all files by their extension.
We use the collections's Counter for the task.

count_files.py
  

#!/usr/bin/python

import collections
from pathlib import Path

docs = Path.home() / 'Documents'

files = [path.suffix for path in docs.iterdir() if path.is_file() and path.suffix]
data = collections.Counter(files)

print(data)

for key, val in data.items(): 
    print(f'{key}: {val}')

The example counts files grouped by their extension in the Documents directory.

files = [path.suffix for path in docs.iterdir() if path.is_file() and path.suffix]

In the list comprehension, we ensure that the path object is a file with
is_file and that the file has en extension. Files may not have
extensions; especially on Unix systems.

$ count_files.py
Counter({'.txt': 7, '.pdf': 3, '.ini': 1, '.zip': 1, '.rtf': 1})
.pdf: 3
.txt: 7
.ini: 1
.zip: 1
.rtf: 1

## Path read_text

The read_text reads the contents of the file as a string.  
The file is opened and then closed. The optional parameters have the 
same meaning as in open.

read_text.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('words.txt')

content = path.read_text()
print(content)

The example reads the contents of the words.txt file 
with read_text.

$ read_text.py
blue
forest
sky
ocean
rabbit
clue

## Merging two files

In the following example, we read data from two text files and merge them

words.txt
  

sky
cup
wind
snow
tree

This is the words.txt file.

adjectives.txt
  

blue
brown
strong
early
old

This is the adjectives.txt file.

merge_files.py
  

#!/usr/bin/python

import sys

from pathlib import Path
 
fname1 = sys.argv[1]
fname2 = sys.argv[2]

data1 = Path(fname1).read_text(encoding='utf-8').splitlines()
data2 = Path(fname2).read_text(encoding='utf-8').splitlines()

data = list(zip(data1, data2))

for e in data:
    print(' '.join(e))

We merge adjectives.txt with words.txt.

 

data1 = Path(fname1).read_text(encoding='utf-8').splitlines()
data2 = Path(fname2).read_text(encoding='utf-8').splitlines()

We read data from the two files and split them into lines.

data = list(zip(data1, data2))

We zip the two lists; we get a list of tuple pairs.

for e in data:
    print(' '.join(e))

Finally, we join each tuple pair into a final string.

$ ./join_files.py adjectives.txt words.txt 
blue sky
brown cup
strong wind
early snow
old tree

## Path read file with open

The open opens the file pointed to by the path, 
like the built-in open function does.

read_with_open.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('words.txt')

with path.open() as f: 
    lines = f.readlines()
    print(lines)

for line in lines:
    print(line.rstrip())

The example opens the words.txt file with open
and reads the contents with readlines.

## Path read binary file

Binary files, such as images, can be read with read_bytes.

read_bytes.py
  

#!/usr/bin/python

from pathlib import Path
import binascii
from more_itertools import sliced

path = Path('sid.jpg')

hexed = binascii.hexlify(path.read_bytes())
mybytes = list(sliced(hexed, 2))

i = 0

for b in mybytes:

    print(b.decode("utf-8") , end=' ')
    i += 1

    if (i % 30 == 0):
        print()

The example reads a JPEG picture and prints it to the terminal 
in hexadecimal representation.

## Path write_text

The write_text opens the file in text mode, writes data 
to it, and closes the file.

write_text.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('myfile.txt')
path.touch()

path.write_text('This is myfile.txt')

The example creates a new empty file with touch
and writes some text data into the file with write_text.

## New article

Content management systems often put their newly created 
articles in directory structure based on the current year and month. 
The next example demonstrates this.  

new_article.py
  

#!/usr/bin/python

from pathlib import Path
import datetime

now = datetime.datetime.now()
year = now.year
month = now.month

name = input('Enter article name:')

path1 = Path('articles') / str(year) / str(month)
path1.mkdir(parents=True)

path2 = path1 /  f'{name}.txt'

path2.touch()

print(f'Article created at: {path2}')

The program ask an input from the users. It creates a new text file
based on the current year and month.

## Python Pathlib PrettyTable example

When we work with files and directories, we can use PrettyTable  
module for nicer output.

simple_table.py
  

#!/usr/bin/python

from pathlib import Path
import datetime
from prettytable import PrettyTable

path = Path('C:/Users/Jano/Documents/')

pt = PrettyTable()
pt.field_names = ["File name", "Size", "Created"]

pt.align["File name"] = "l"
pt.align["Size"] = "r"
pt.align["Created"] = "l"

for e in path.glob('**/*.txt'):

    created = datetime.datetime.fromtimestamp(e.stat().st_ctime)
    size = e.stat().st_size
    pt.add_row([e.name, size, f"{created:%Y-%m-%d}"])
    
print(pt)

The example displays all text files inside Documents in a nice table.
The table contains three columns: file name, size, and creation date.

$ simple_table.py
+-------------------------------------------------------+-------+------------+
| File name                                             |  Size | Created    |
+-------------------------------------------------------+-------+------------+
| data.txt                                              |     0 | 2019-02-27 |
| eternal_return.txt                                    | 10467 | 2019-03-03 |
| potvrdenie.txt                                        |   773 | 2019-01-14 |
| text_processing.txt                                   |   750 | 2019-02-18 |
| website-inspire.txt                                   |    62 | 2019-03-03 |
| words.txt                                             |    31 | 2018-12-30 |
| Úvod do Symfony.txt                                   |  7613 | 2019-03-04 |
| robots.txt                                            |   240 | 2019-01-01 |
| robots.txt                                            |   240 | 2019-02-03 |
...

This is a sample partial output.

## Source

[Python pathlib — Object-oriented filesystem paths](https://docs.python.org/3/library/pathlib.html)

In this article we have covered the standard Python pathlib module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).