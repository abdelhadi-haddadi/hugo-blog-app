+++
title = "Python paramiko"
date = 2025-08-29T20:09:52.208+01:00
draft = false
description = "Python paramiko tutorial shows how to work with SSH in Python using the paramiko module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python paramiko

last modified January 29, 2024

In this article we cover the Python paramiko module, which is used to work with
the SSH protocol.

SSH is a network communication protocol that enables two computers to
communicate and share data securely. The term SSH is used for the network
protocol as well as for the to the suite of utilities that implement that
protocol.

SSH tools are used by administrators for secure management of remote computers.

An SSH server, by default, listens on the TCP port 22.

## OpenSSH

OpenSSH is a popular, open-source implementation of the SSH protocol.

OpenSSH provides the following tools:

    - ssh - client used to connect to a remote host

    - sshd - server on a remote host which enables a remote connection

    - ssh-keygen - generates, manages and converts authentication keys for SSH

    - ssh-agent - stores private keys used for public key authentication

    - ssh-add - adds private keys to the list allowed by the server

    - ssh-keyscan - helps collecting the public SSH host keys from hosts

    - sftp - service which provides an SFTP protocol over SSH

    - scp - client which copies files between hosts on a network

## Paramiko

Paramiko is a Python implementation of the SSHv2 protocol. It provides both
client and server functionality. It is a base library for the popular Fabric
tool.

$ pip install paramiko

Paramiko is a third-party tool; it can be installed with the pip
tool.

## Python paramiko commad execution

In the first example, we execute a command on a remote host.

exec_cmd.py
  

#!/usr/bin/python

import paramiko

hostname = 'example.com'
port = 22

username = 'user7'
password = 'passwd'

cmd = 'uname'

with paramiko.SSHClient() as client:

    client.load_system_host_keys()
    client.connect(hostname, port, username, password)

    (stdin, stdout, stderr) = client.exec_command(cmd)

    output = stdout.read()
    print(str(output, 'utf8'))

In the program, we execute the uname command, which returns the 
name of the OS.

import paramiko

First, we import the paramiko module.

hostname = 'example.com'
port = 22

We provide the remote host name and port.

username = 'user7'
password = 'passwd'

We provide the username and password.

cmd = 'uname'

This is the command to be executed.

with paramiko.SSHClient() as client:

An SSH client is created.

client.load_system_host_keys()

We load the system host keys with load_system_host_keys.

client.connect(hostname, port, username, password)

We connect to the remote host with connect. We pass the hostname, 
port, username, and passowrd to the function.

(stdin, stdout, stderr) = client.exec_command(cmd)

The command is executed with exec_command function.

output = stdout.read()
print(str(output, 'utf8'))

Finally, we read and print the output from the remote host.

$ ./exec_cmd.py
Linux

In the second example, we list the contents of the current working directory.

list_dir.py
  

#!/usr/bin/python

import paramiko

hostname = 'example.com'
port = 22

username = 'user7'
password = 'passwd'

cmd = 'ls -l'

with paramiko.SSHClient() as client:

    client.load_system_host_keys()
    client.connect(hostname, port, username, password)

    (stdin, stdout, stderr) = client.exec_command(cmd)

    output = stdout.readlines()

    for line in output:
        print(line.rstrip())

To list the contents of a directory, we use the ls -l command.

output = stdout.readlines()

for line in output:
    print(line.rstrip())

We read the output into a list of lines with readlines. We go 
through the list and print each line.

## Python paramiko download file

In the following example, we download a file over SSH. 

download.py
  

#!/usr/bin/python

import paramiko

hostname = 'example.com'
port = 22

username = 'user7'
password = 'passwd'

remote_path = f'/home/{username}/data.txt'
output_file = 'data.txt'

with paramiko.SSHClient() as client:
    
    client.load_system_host_keys()
    client.connect(hostname, port, username, password)

    sftp_client = client.open_sftp()
    sftp_client.get(remote_path, output_file)

The example downloads the data.txt file which is located in the 
user's home directory.

sftp_client = client.open_sftp()

The SFTP client is created with open_sftp function.

sftp_client.get(remote_path, output_file)

We download the file with get function.

## Python paramiko SFTP list directory

The next example lists the contents of a directory using SFTP. 

list_dir.py
  

#!/usr/bin/python

import paramiko

hostname = 'example.com'
port = 22

username = 'user7'
password = 'passwd'

with paramiko.SSHClient() as client:
    
    client.load_system_host_keys()
    client.connect(hostname, port, username, password)

    sftp_client = client.open_sftp()
    sftp_client.chdir('tmp')
    contents = sftp_client.listdir()

    for line in contents:
        print(line)

We change to the destination directory with chdir and list the 
contents with listdir.

$ ./list_dir.py 
memo.txt
todo2.txt
notes.txt
test.py
pycp.py
todo.txt
docs

## Source

[Python paramiko documentation](https://www.paramiko.org/)

In this article we have worked with SSH in Python utilizing the paramiko
module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).