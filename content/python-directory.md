+++
title = "Python directory"
date = 2025-08-29T20:07:57.976+01:00
draft = false
description = "Python directory tutorial shows how to work with directories in Python. We show how to create, rename, move, or list a directory in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python directory

last modified January 29, 2024

Python directory tutorial shows how to work with directories in Python.
We show how to create, rename, move, or list a directory in Python.

## Directory definition

Directory is an organizing unit in a computer's file system for storing and
locating files. Directories are hierarchically organized into a tree of
directories. Directories have parent-child relationships. A directory is
sometimes also called a folder.

There are multiple functions for manipulating directories in Python. They 
are located in the os and pathlib modules. 
In the tutorial, we work with the pathlib module, which has the 
more modern API.

## Python create directory

The Path.mkdir creates a single directory or multiple directories,
including intermediate directories.

If a directory exists, a FileExistsError is raised.

create_dir.py
  

#!/usr/bin/python

from pathlib import Path

p = Path('test')
p.mkdir()

The example creates a directory with Path's mkdir
function.

$ ./create_dir.py 
$ ./create_dir.py 
Traceback (most recent call last):
    File "./create_dir.py", line 6, in &lt;module&gt;
    p.mkdir()
    File "/usr/lib/python3.8/pathlib.py", line 1284, in mkdir
    self._accessor.mkdir(self, mode)
FileExistsError: [Errno 17] File exists: 'test'

When we run the program twice, an exception is thrown. To get around this issue,
we can check if a directory already exists.

create_dir2.py
  

#!/usr/bin/python

from pathlib import Path

dir_name = 'test'

p = Path(dir_name)

try:
    if not p.exists():
        p.mkdir()
except OSError:
    print(f'Error: Creating directory. {dir_name}')

Before we create the directory, we check if it already exists with the 
Path.exists function. We also catch a possible exception.

Another solution is to use the exist_ok flag. If this flag is 
set to True, the FileExistsError is ignored.

create_dir3.py
  

#!/usr/bin/python

from pathlib import Path

dir_name = 'test'

p = Path(dir_name)
p.mkdir(exist_ok=True)

In this example, we ignore the FileExistsError exceptions.

## Python create temporary directory

The tempfile.TemporaryDirectory function securely creates a
temporary directory. On completion of the context or destruction of the
temporary directory object the newly created temporary directory and all its
contents are removed from the filesystem.

create_temp_dir.py
  

#!/usr/bin/python

import tempfile

with tempfile.TemporaryDirectory() as tempdir:
     print(f'created temporary directory {tempdir}')

The example creates a temporary directory. When the program finishes, the 
directory is destroyed.

$ ./create_temp_dir.py 
created temporary directory /tmp/tmpww4breow

The program created a temporary directory in the special /tmp
directory, which is used for such purposes on Linux.

## Python rename directory

The Path.rename function renames a directory.

rename_dir.py
  

#!/usr/bin/python

from pathlib import Path

src = 'test'
dest = 'test2'

p = Path(src)
p.rename(dest)

In the example, we rename the test directory to test2.

## Python remove directory

A directory is removed with the Path.rmdir function. The directory
must be empty.

remove_dir.py
  

#!/usr/bin/python

from pathlib import Path

p = Path('test2')
p.rmdir()

The example deletes the test2 directory.

## Python move directory

The shutil.move function moves a directory. 

shutil.move(src, dst, copy_function=copy2)

The shutil.move recursively moves a file or directory (src) to 
another location (dst) and returns the destination. 

There are two copy functions:
copy and copy2; the default is copy2.
They differ how they handle file metadata.  The copy2 tries to 
preserve all the file metadata, while the copy does not.

move_dir.py
  

#!/usr/bin/python

import shutil

src = 'docs'
dst = 'docs2'

shutil.move(src, dst)

The example moves the contents of the doc directory to docs2.

$ mkdir docs
$ touch docs/data.txt docs/names.csv docs/numbers.csv

We create the docs directory and some files.

$ ./move_dir.py 
$ ls docs2/
data.txt  names.csv  numbers.csv

We run the program and show the contents of the new directory.

## Python current working directory

The Path.cwd function returns a new path object representing the
current directory.

current_dir.py
  

#!/usr/bin/python

from pathlib import Path
from os import chdir

path = Path('..')

print(f'Current working directory: {path.cwd()}')

chdir(path)

print(f'Current working directory: {path.cwd()}')

chdir('..')

The example changes directories and prints the current directory.

## Python home directory

The Path.home function returns a new path object representing the
user's home directory.

home_dir.py
  

#!/usr/bin/python

from pathlib import Path
home = str(Path.home())
print(home)

The program prints the home directory of the user that launched it.

## Python directory parents

The Path.parent retunrs the parent of the path and the 
Path.parents a sequence of ancestors of the path.

parents.py
  

#!/usr/bin/python

from pathlib import Path

path = Path.cwd()

print(f'The parent directory of {path} is {path.parent}')
print(f'The parent of the parent of {path} is {path.parent.parent}')

print(f'All the parents of {path.parent}: ')

print(list(path.parents))

The example prints the various parents of the current working directory.

## Python list directory contents

The Path.iterdir yields path objects of the directory contents. The
children are yielded in arbitrary order, and the special entries '.' and '..'
are not included.

list_dir.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('.')

dirs = [e for e in path.iterdir()]

for mydir in dirs:
    print(mydir)

The example lists the files and directories of the current working directory. 
The list is non-recursive.

## Python check if path is directory

The Path.is_dir returns True  if the path points to a
directory.

list_dirs.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('.')

dirs = [e for e in path.iterdir() if e.is_dir()]
print(*dirs)

In the example, we list all immediate subdirectories of the current working 
directory.

$ ./list_dirs.py 
mydata docs2 listdirectory

In our case, we have three subdirectories.

## Python list directory recursively

The path.rglob yields all the files that match the given 
simple pattern recursively. 

recursive.py
  

#!/usr/bin/python

from pathlib import Path

path = Path('..')

for e in path.rglob('*.py'):
    print(e)

In the example, we recursively walk the contents of the parent directory and 
print all Python files.

## Source

[Python File and Directory access - language reference](https://docs.python.org/3/library/filesys.html)

In this article we have worked with directories in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).