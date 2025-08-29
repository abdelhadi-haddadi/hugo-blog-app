+++
title = "Python pexpect"
date = 2025-08-29T20:09:53.378+01:00
draft = false
description = "Python pexpect tutorial shows how to manage interactive programs in Python using the pexpect module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python pexpect

last modified January 29, 2024

In this article we show how to manage interactive programs in Python using the
pexpect module.

The pexpect module is used to manage interactive programs in
Python. It spawns child applications, controls them; and responds to expected
patterns in their output.

The pexpect module is used to automate interactive applications such as ssh,
ftp, or passwd. It can be used to automate setup scripts for software package
installations on different servers.

There are two basic functions: run and spawn. The
run function executes a command and returns the output. It is useful for simple
interatctions.

The spawn function is a more powerful option. It spawns an external
child command and then interacts with the child by sending lines and expecting
responses.

## Python pexpect run

The run function runs the given command; waits for it to finish;
then returns all output as a string. The standard error output is included in
output.

main.py
  

#!/usr/bin/python

import pexpect

r = pexpect.run('echo hello')
print(str(r, 'UTF-8'))

In the program, we run the echo command.

r = pexpect.run('echo hello')

We run the echo command. The output is assigned to the
r variable.

print(str(r, 'UTF-8'))

We transform the output into a string with the str function.

$ ./main.py
hello

We can use the bytes.decode function to convert the
bytes to a str.

main.py
  

#!/usr/bin/python

import pexpect

r = pexpect.run('pwd').decode("utf-8")

print(f"The current working directory: {r.rstrip()}")

The programs runs the pwd program, which returns the current
working directory.

$ ./main.py
The current working directory: /home/jano/Documents/prog/python/pexpect

## Python pexpect logfile

It is possible to redirect the output into a log file. Both run and spawn
functions have the logfile parameter.

main.py
  

#!/usr/bin/python

import pexpect

f = open('mylog.txt', 'wb')

pexpect.run('ls -l', logfile=f)

f.close()

In the program, we run the ls -l command and write the output into
the logfile.

$ ./main.py
$ head -3 mylog.txt
total 60
-rw-rw-r-- 1 jano jano  120 dec 23 10:02 doc.txt
-rwxrwxr-x 1 jano jano  418 dec 23 14:52 ftp2.py

## Python pexpect spawn

The spawn function executes a child program and allows to interact
with it.

The expect function of the child seeks through the stream until a
pattern is matched. The pattern is overloaded and may take several types. The
pattern can be a string, EOF, a compiled regex, or a list of any of those
types. The strings will be compiled to regex types.

main.py
  

#!/usr/bin/python

import pexpect

child = pexpect.spawn('date')
child.expect(pexpect.EOF)
output = child.before

print(f'Today is : {output.decode("utf-8")}')
child.close()

In the program, we run the date command to get the current
datetime.

child = pexpect.spawn('date')

We spawn the date command.

child.expect(pexpect.EOF)

With pexpect.EOF we expect that the child has exited. After each
call to expect the before and after
properties will be set to the text printed by child application.

output = child.before

The before attribute contains all text up to the expected pattern.

$ ./main.py
Today is : Št 29. december 2022, 11:39:30 CET

## Python pexpect FTP example

In the next example, we interact with an FTP command.

main.py
  

#!/usr/bin/python

import pexpect
child = pexpect.spawn('ftp ftp.freebsd.org', encoding='utf-8')

child.expect('Name .*: ')
child.sendline('anonymous')
child.expect('Password:')
child.sendline('')
child.expect('ftp&gt; ')
child.sendline('ls /pub/FreeBSD/')
child.expect('ftp&gt; ')

print(child.before)

child.close()

In the program we connect to an anonymous FTP server and issue the ls command.

child = pexpect.spawn('ftp ftp.freebsd.org', encoding='utf-8')

We spawn the ftp command. With this command, we connect to the
ftp.freebsd.org server. We also provide the encoding.

child.expect('Name .*: ')

From the server, we expect a line starting with the Name string
pattern followed by some characters. Note that the input is a regular
expression.

child.sendline('anonymous')

With sendline, we send the login name.

child.expect('Password:')
child.sendline('')

We expect the password promt and send an empty password, since we log in as
anonymous.

child.sendline('ls /pub/FreeBSD/')

We issue the ls command.

print(child.before)

We print the output of the ls command.

$ ./main.py
ls /pub/FreeBSD/
229 Entering Extended Passive Mode (|||51545|)
150 Here comes the directory listing.
-rw-r--r--    1 ftp      ftp          4259 May 07  2015 README.TXT
-rw-r--r--    1 ftp      ftp            35 Dec 29 10:45 TIMESTAMP
drwxr-xr-x    9 ftp      ftp            10 Dec 29 10:45 development
-rw-r--r--    1 ftp      ftp          2995 Dec 29 10:00 dir.sizes
drwxr-xr-x   22 ftp      ftp            28 Dec 26 23:00 doc
drwxr-xr-x    6 ftp      ftp             6 Nov 10 15:01 ports
drwxr-xr-x   12 ftp      ftp            14 Dec 29 10:45 releases
drwxr-xr-x   12 ftp      ftp            14 Dec 09 20:25 snapshots
226 Directory send OK.

## Python pexpect SSH

In the following example, we interact with the ssh command.

For this example, we must have a ssh account with a password authentication
enabled.

main.py
  

#!/usr/bin/python

import pexpect

username = 'user7@192.168.0.25'
passwd = 'passwd'

child = pexpect.spawn(f'ssh {username}')
f = open('mylog.txt', 'wb')
child.logfile = f

child.expect('password:')
child.sendline(passwd)

i = child.expect(['Permission denied', '[#\$] '])

if i == 0:

    print('failed to login. permission denied')
    child.close()

elif i == 1:

    print('connected')

    child.sendline('uname -a')
    child.expect('[#\$] ')
    r = child.before.decode('utf-8')

    child.write('exit')
    child.close()

f.close()

We connect to a computer on a local network and issue the uname
command on the host.

username = 'user7@192.168.0.25'
passwd = 'passwd'

We provide the username and the password.

child = pexpect.spawn(f'ssh {username}')

We log into into the host with the ssh command.

f = open('mylog.txt', 'wb')
child.logfile = f

The output is directed to a log file.

child.expect('password:')
child.sendline(passwd)

The computer sends a prompt and we send the password.

i = child.expect(['Permission denied', '[#\$] '])

We expect two outcomes: either a permission denied message or a standard prompt.
The expect function returns the index to the returned option.

elif i == 1:

    print('connected')

    child.sendline('uname -a')
    child.expect('[#\$] ')

    child.write('exit')
    child.close()

In case the login was successful, we issue the uname command.
Later, we issue the exit command to terminate the connection.

## Source

[Python pexpect documentation](https://pexpect.readthedocs.io/en/stable/)

In this article we have covered the Python pexpect module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).