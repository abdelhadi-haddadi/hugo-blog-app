+++
title = "Python FTP"
date = 2025-08-29T20:08:33.986+01:00
draft = false
description = "Python FTP programming tutorial shows how to work with FTP in Python using ftplib library. Python FTP examples create a connection, list FTP directory, upload and download files."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python FTP

last modified January 29, 2024

Python FTP programming tutorial shows how to work with FTP in Python
using ftplib library. We are going to connect to FTP
servers, list directories, download and upload files.

## FTP

File Transfer Protocol (FTP) is a standard network protocol
used for transfering of computer files between a client and server on a
computer network. Clients and servers communicate with a set of FTP
commands, such as DELE, RETR, or CWD.

Many servers provide FTP services with an anonymous FTP access; for instance,
there are Linux hosting sites that provide an anonymous FTP account to
download the distribution image.

## Python ftplib

Python ftplib is a module that implements the client side
of the FTP protocol. It contains an FTP client class and some helper functions.

## Python FTP class

The ftplib.FTP creates a new instance of the FTP class.
When host is given, a connection to the host is made with the
connect method.

## Context manager

Unlike Python 3, Python 2 does not have a context manager implemented
with the FTP class. Therefore, Python 2 code needs a slightly different
approach when dealing with connection objects.

import ftplib

with ftplib.FTP('ftp.debian.org') as ftp:

The with command will automatically close the connection
to the server for Python 3 code.

import ftplib
from contextlib import closing

with closing(ftplib.FTP('ftp.debian.com')) as ftp:

For Python 2 code, we need to use the closing method of
the contextlib module.

## Welcome message

The getwelcome returns the welcome message sent by
the server in reply to the initial connection. This message may contain
some helpful information for the user.

welcome.py
  

#!/usr/bin/python

import ftplib

with ftplib.FTP('ftp.debian.org') as ftp:
    print(ftp.getwelcome())

The example creates a connection to the Debian FTP server, which has
an anonymous account and returns its welcome message.

$ ./welcome.py
220 ftp.debian.org FTP server

## Directory listing

The dir method produces a directory listing.

listing.py
  

#!/usr/bin/python

import ftplib

with ftplib.FTP('ftp.debian.org') as ftp:

    try:
        ftp.login()

        files = []

        ftp.dir(files.append)

        print(files)

    except ftplib.all_errors as e:
        print('FTP error:', e)

The example connects to the ftp.debian.org host and retrieves
the directory listing of the initial landing directory.

try:
    ftp.login()

When the login method has no parameters; we connect
to the anonymous account of the FTP site.

files = []

ftp.dir(files.append)

The dir method produces a directory listing and adds
the data to the list.

$ ./listing.py
['drwxr-xr-x    9 1176     1176         4096 Sep 26 15:07 debian']

## FTP commands

The FTP client sends commands to the FTP server, such as PWD
or RETR. The ftplib contains several methods that wrap
these commands. The commands are send with the sendcmd
or voidcmd methods.

ftp_commands.py
  

#!/usr/bin/python

import ftplib

with ftplib.FTP('ftp.debian.org') as ftp:

    try:
        ftp.login()

        wdir = ftp.sendcmd('PWD')
        print(ftplib.parse257(wdir))

        wdir2 = ftp.pwd()
        print(wdir2)

    except ftplib.all_errors as e:
        print('FTP error:', e)

The example retrieves the current working directory by sending a PWD
command directly and using the pwd method.

wdir = ftp.sendcmd('PWD')

We send the PWD command with the sendcmd
method.

print(ftplib.parse257(wdir))

The parse257 is a helper method that retrieves the directory
from the returned string, which also contains the status code.

wdir2 = ftp.pwd()
print(wdir2)

Here we use the pwd method to retrieve the current working
directory.

$ ./ftp_commands.py
/
/

## Changing directory

The cwd method changes the current working directory.

change_directory.py
  

#!/usr/bin/python

import ftplib

with ftplib.FTP('ftp.debian.org') as ftp:

    try:
        ftp.login()

        wdir = ftp.pwd()
        print(wdir)

        ftp.cwd('debian')

        wdir2 = ftp.pwd()
        print(wdir2)

    except ftplib.all_errors as e:
        print('FTP error:', e)

The example uses the cmd method to change to the
debian folder.

$ ./change_directory.py
/
/debian

## Creating directory

A directory is created with the mkd method. This operation
requires a user account with sufficient privileges; it is not available
with anonymous accounts.

create_directory.py
  

#!/usr/bin/python

import ftplib
from contextlib import closing

with closing(ftplib.FTP('ftp.example.com')) as ftp:

    try:
        ftp.login('user7', 's$cret')

        ftp.mkd('newdir')

        files = []

        ftp.retrlines('LIST', files.append)

        for fl in files:
            print(fl)

    except ftplib.all_errors as e:
        print('FTP error:', e)

The example connects to a FTP server and creates a new directory in
the landing folder.

ftp.login('user7', 's$cret')

We log in with the login method.

ftp.mkd('newdir')

A new directory is created with the mkd method.

files = []

ftp.retrlines('LIST', files.append)

With the LIST FTP command we retrieve a list of files and
information about those files. The listing is stored in the files list.

$ ./create_directory.py
drwx------   6 example.com 117992          7 Sep 27 14:58 .
drwx------   6 example.com 117992          7 Sep 27 14:58 ..
-rw-------   1 example.com 117992        151 Jul 31  2015 .htaccess
drwxr-xr-x   2 0        0            4096 Sep 27 01:16 logs
drwx---r-x   2 example.com 117992          2 Sep 27 14:58 newdir
drwx------   3 example.com 117992          3 Mar 11  2011 sub
drwx------  26 example.com 117992         31 Sep 25 15:32 web

from the output we can see that the newdir was created.

## Getting size of text file

The SIZE command and its size method equivalent are
a non-standard way of determining the size of a file. It is implemented
by many servers despite not being standardized.

text_file_size.py
  

#!/usr/bin/python

import ftplib

with ftplib.FTP('ftp.debian.org') as ftp:

    try:
        ftp.login()

        size = ftp.size('debian/README')
        print(size)

    except ftplib.all_errors as e:
        print('FTP error:', e)

The example retrieves the size of a README file with the size
method.

## Getting size of binary file

To determine the size of a binary file, we have to switch to the binary
mode.

binary_file_size.py
  

#!/usr/bin/python

import ftplib

with ftplib.FTP('ftp.debian.org') as ftp:

    try:
        ftp.login()

        # TYPE A for ASCII mode
        ftp.sendcmd('TYPE I')

        size = ftp.size('debian/ls-lR.gz')
        print(size)

    except ftplib.all_errors as e:
        print('FTP error:', e)

The example determines the size of a binary file.

ftp.sendcmd('TYPE I')

We go to the binary mode with the TYPE I command.

size = ftp.size('debian/ls-lR.gz')

We get the size of a binary file.

## Downloading text file

To download a text file, we utilize the RETR FTP command.

download_text_file.py
  

#!/usr/bin/python

import ftplib
import os

with ftplib.FTP('ftp.debian.org') as ftp:

    file_orig = '/debian/README'
    file_copy = 'README'

    try:
        ftp.login()

        with open(file_copy, 'w') as fp:

            res = ftp.retrlines('RETR ' + file_orig, fp.write)

            if not res.startswith('226 Transfer complete'):

                print('Download failed')
                if os.path.isfile(file_copy):
                    os.remove(file_copy)

    except ftplib.all_errors as e:
        print('FTP error:', e)

        if os.path.isfile(file_copy):
            os.remove(file_copy)

The example downloads a text file from ftp.debian.org
server.

with open(file_copy, 'w') as fp:

    res = ftp.retrlines('RETR ' + file_orig, fp.write)

We fetch the file and write into a local copy file.

if not res.startswith('226 Transfer complete'):

    print('Download failed')
    if os.path.isfile(file_copy):
        os.remove(file_copy)

In case the download failed, we print an error message and delete
the local file.

## Uploading text file

The STOR command with the storlines method
is used to upload text files.

upload_text_file.py
  

#!/usr/bin/python

import ftplib

with ftplib.FTP('ftp.example.com') as ftp:

    filename = 'README'

    try:
        ftp.login('user7', 's$cret')

        with open(filename, 'rb') as fp:

            res = ftp.storlines("STOR " + filename, fp)

            if not res.startswith('226 Transfer complete'):

                print('Upload failed')

    except ftplib.all_errors as e:
        print('FTP error:', e)

In this example, we upload a text file to the FTP server.

## Source

[Python FTP protocol client - documentation](https://docs.python.org/3/library/ftplib.html)

In this article we have worked with Python ftplib.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).