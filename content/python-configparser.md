+++
title = "Python ConfigParser"
date = 2025-08-29T20:07:51.096+01:00
draft = false
description = "Python ConfigParser tutorial shows how to work with configuration files in Python with ConfigParser."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python ConfigParser

last modified January 29, 2024

Python ConfigParser tutorial shows how to work with configuration files in
Python with ConfigParser.

## Python ConfigParser

ConfigParser is a Python class which implements a basic
configuration language for Python programs. It provides a structure similar to
Microsoft Windows INI files. ConfigParser allows to write Python
programs which can be customized by end users easily.

The configuration file consists of sections followed by key/value pairs of options.
The section names are delimited with [] characters. The pairs are separated
either with : or =. Comments start either with #
or with ;.

## Python ConfigParser read file

In the first example, we read configuration data from a file.

db.ini
  

[mysql]
host = localhost
user = user7
passwd = s$cret
db = ydb

[postgresql]
host = localhost
user = user8
passwd = mypwd$7
db = testdb

We have two sections of configuration data.

reading_from_file.py
  

#!/usr/bin/python

import configparser

config = configparser.ConfigParser()
config.read('db.ini')

host = config['mysql']['host']
user = config['mysql']['user']
passwd = config['mysql']['passwd']
db = config['mysql']['db']

print('MySQL configuration:')

print(f'Host: {host}')
print(f'User: {user}')
print(f'Password: {passwd}')
print(f'Database: {db}')

host2 = config['postgresql']['host']
user2 = config['postgresql']['user']
passwd2 = config['postgresql']['passwd']
db2 = config['postgresql']['db']

print('PostgreSQL configuration:')

print(f'Host: {host2}')
print(f'User: {user2}')
print(f'Password: {passwd2}')
print(f'Database: {db2}')

The example reads configuration data for MySQL and PostgreSQL.

config = configparser.ConfigParser()
config.read('db.ini')

We initiate the ConfigParser and read the file with read.

host = config['mysql']['host']
user = config['mysql']['user']
passwd = config['mysql']['passwd']
db = config['mysql']['db']

We access the options from the mysql section.

host2 = config['postgresql']['host']
user2 = config['postgresql']['user']
passwd2 = config['postgresql']['passwd']
db2 = config['postgresql']['db']

We access the options from the postgresql section.

$ python reading_from_file.py
MySQL configuration:
Host: localhost
User: user7
Password: s$cret
Database: ydb
PostgreSQL configuration:
Host: localhost
User: user8
Password: mypwd$7
Database: testdb

## Python ConfigParser sections

The configuration data is organized into sections. The sections
reads all sections and the has_section checks if there is the
specified section.

sections.py
  

#!/usr/bin/python

import configparser

config = configparser.ConfigParser()
config.read('db.ini')

sections = config.sections()
print(f'Sections: {sections}')

sections.append('sqlite')

for section in sections:

    if config.has_section(section):
      print(f'Config file has section {section}')
    else:
      print(f'Config file does not have section {section}')

The example works with sections.

$ python sections.py
Sections: ['mysql', 'postgresql']
Config file has section mysql
Config file has section postgresql
Config file does not have section sqlite

## Python ConfigParser read from string

Since Python 3.2, we can read configuration data from a string with the
read_string method.

read_from_string.py
  

#!/usr/bin/python

import configparser

cfg_data = '''
[mysql]
host = localhost
user = user7
passwd = s$cret
db = ydb
'''

config = configparser.ConfigParser()
config.read_string(cfg_data)

host = config['mysql']['host']
user = config['mysql']['user']
passwd = config['mysql']['passwd']
db = config['mysql']['db']

print(f'Host: {host}')
print(f'User: {user}')
print(f'Password: {passwd}')
print(f'Database: {db}')

The example reads configuration from a string.

## Python ConfigParser read from dictionary

Since Python 3.2, we can read configuration data from a dictionary with
the read_dict method.

read_from_dict.py
  

#!/usr/bin/python

import configparser

cfg_data = {
    'mysql': {'host': 'localhost', 'user': 'user7',
              'passwd': 's$cret', 'db': 'ydb'}
}

config = configparser.ConfigParser()
config.read_dict(cfg_data)

host = config['mysql']['host']
user = config['mysql']['user']
passwd = config['mysql']['passwd']
db = config['mysql']['db']

print(f'Host: {host}')
print(f'User: {user}')
print(f'Password: {passwd}')
print(f'Database: {db}')

The example reads configuration from a Python dictionary.

cfg_data = {
    'mysql': {'host': 'localhost', 'user': 'user7',
                'passwd': 's$cret', 'db': 'ydb'}
}

Keys are section names, values are dictionaries with keys and values that are
present in the section.

## Python ConfigParser write

The write method writes configuration data.

writing.py
  

#!/usr/bin/python

import configparser

config = configparser.ConfigParser()

config.add_section('mysql')

config['mysql']['host'] = 'localhost'
config['mysql']['user'] = 'user7'
config['mysql']['passwd'] = 's$cret'
config['mysql']['db'] = 'ydb'

with open('db3.ini', 'w') as configfile:
    config.write(configfile)

The example writes config data into the db3.ini file.

config.add_section('mysql')

First, we add a section with add_section.

config['mysql']['host'] = 'localhost'
config['mysql']['user'] = 'user7'
config['mysql']['passwd'] = 's$cret'
config['mysql']['db'] = 'ydb'

Then we set the options.

with open('db3.ini', 'w') as configfile:
    config.write(configfile)

Finally, we write the data with write.

## Python ConfigParser interpolation

ConfigParser allows to use interpolation in the configuration file.
It uses the % syntax.

cfg.ini
  

[info]
users_dir= C:\Users
name= Jano
home_dir= %(users_dir)s\%(name)s

We build the home_dir with interpolation. Note that the 's'
character is part of the syntax.

interpolation.py
  

#!/usr/bin/python

import configparser

config = configparser.ConfigParser()
config.read('cfg.ini')

users_dir = config['info']['users_dir']
name = config['info']['name']
home_dir = config['info']['home_dir']

print(f'Users directory: {users_dir}')
print(f'Name: {name}')
print(f'Home directory: {home_dir}')

The example reads the values and prints them.

$ python interpolation.py
Users directory: C:\Users
Name: Jano
Home directory: C:\Users\Jano

## Source

[Python ConfigParser documentation](https://docs.python.org/3/library/configparser.html)

In this article we have used ConfigParser to work with
configuration data in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).