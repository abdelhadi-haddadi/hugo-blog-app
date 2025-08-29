+++
title = "Python venv"
date = 2025-08-29T20:11:10.549+01:00
draft = false
description = "Python venv tutorial shows how to user virtual environments in Python using the venv module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python venv

last modified January 29, 2024

Python venv tutorial shows how to user virtual environments in Python using the
venv module.

## Virtual environment

Complex applications rely on a number of different dependencies. Various
applications may depend on a library, or different versions of the same library.
Since Python cannot differentiate between versions in its
site-packages directory, virtual environments were created as
a solution.

IDEs including Visual Code and PyCharm have extensive support for virtual
environments.

A virtual environment is a self-contained directory tree that
contains a Python installation for a particular version of Python and  a number
of additional packages.

Common installation tools such as setuptools and pip
work as expected with virtual environments. When a virtual environment is
active, they install Python packages into the virtual environment without
needing to be told to do so explicitly.

## Python venv

The venv module enables to create lightweight virtual environments
with their own site directories. Each virtual environment has its own Python
binary (which matches the version of the binary that was used to create this
environment) and can have its own independent set of installed Python packages
in its site directories. (The site directories are directories where we install
third-party modules.)

## Python create virtual environment

Next we show how to create a virtual environment.

$ python --version
Python 3.8.5
$ python -m venv myenv
. myenv/bin/activate

These commands create and activate a new virtual environment on Linux.

&gt; py --version
Python 3.8.1
&gt; py -m venv myenv
&gt; myenv\Scripts\activate

These commands create and activate a new virtual environment on Windows.

$ ls myenv/
bin  include  lib  lib64  pyvenv.cfg  share

The bin directory contains tools that interact with the
virtual environment. The include directory contains C headers
that compile the Python packages. The lib directory contains
a copy of the Python version. It also includes the site-packages
subdirectory.

The pyvenv.cfg is a configuration file which stores information
about the virtual environment such as the original Python that the environment
was cloned from (and which will provide the standard library) and the version of
the interpreter.

$ cat myenv/pyvenv.cfg
home = /usr/bin
include-system-site-packages = false
version = 3.8.5

This is a sample output of the pyvenv.cfg file.

## Python activate virtual environment

Before we can use a virtual environment, we need to activate it first.

$ python -m venv myenv

We create a new virtual environment called myenv.

$ . myenv/bin/activate
(myenv) $

We activate the virtual environment. We can see the name of the environment in
the prompt.

(myenv) $ echo $PATH
/janbodnar/Documents/prog/python/venv/myenv/bin:/janbodnar/.cargo/bin/:/janbodnar/
Documents/prog/go-workspace/bin/:/janbodnar/.config/composer/vendor/bin/:
... 

The PATH environment is updated; the virtual environment's 
bin directory is at the beginnig. 

(myenv) $ which pip python
/root/Documents/prog/python/venv/myenv/bin/pip
/root/Documents/prog/python/venv/myenv/bin/python

The which command returns the path to the virtual environment's
pip and python.

(myenv) $ deactivate
$

With the deactivate command, we terminate the virtual environment
and go back to the shell.

## Python venv installing packages

After activating the created virtual environment, the pip tool 
installs the packages into the environment.

(myenv) $ pip list
Package       Version
------------- -------
pip           20.0.2
pkg-resources 0.0.0
setuptools    46.1.3

We show the available packages with the pip list command. As we can
see, at this moment we have a bare minimum of packages.

(myenv) $ pip install requests urllib3

Into our new environment, we install the requests and the
urllib3 modules.

(myenv) $ pip list
Package       Version
------------- ---------
certifi       2020.6.20
chardet       3.0.4
idna          2.10
pip           20.0.2
pkg-resources 0.0.0
requests      2.24.0
setuptools    46.1.3
urllib3       1.25.10

We list the available packages again. In addition to the requests
and urllib3 modules, we have additional modules installed by the
two installed modules.

(myenv) $ pip freeze --local | xargs pip uninstall -y

To go to a clean state and remove all installed packages, we can execute
this command.

(myenv) $ deactivate
$

To jump out of the virtual environment, we use the deactivate
command.

$ pip list
Package                      Version
---------------------------- --------------
adblockparser                0.7
AdvancedHTTPServer           2.2.0
aiocmd                       0.1.2
aiodns                       2.0.0
aiohttp                      3.6.2
aioredis                     1.3.1
aiowinreg                    0.0.3
ajpy                         0.0.4
alembic                      1.4.2.dev0
aniso8601                    8.0.0
apispec                      3.3.1
apispec-webframeworks        0.5.2
APScheduler                  0.0.0
asciitree                    0.3.3
asn1crypto                   1.4.0
...

Outside of a virtual environment, we refer to the standard Python installation.
It has naturally many more packages.

$ rm -rf myenv/

If we do not need the virtual environment anymore, we can simply remove its 
directory.

## Source

[Python venv - creation of virtual environments](https://docs.python.org/3/library/venv.html)

In this article we have created Python virtual environments using venv.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).