+++
title = "Dart SSH"
date = 2025-08-29T19:52:27.321+01:00
draft = false
description = "Dart SSH tutorial shows how to work with SSH and SFTP in Dart language."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart SSH

last modified January 28, 2024

In this article we show how to work with SSH and SFTP in Dart language. We use
the DartSSH 2 library.

Secure SHell (SSH) is a protocol which allows to create an encrypted
channel between two networked hosts. Secure File Transfer Protocol
(SFTP) is a network protocol for securely accessing, transferring and
managing files. It runs on SSH.

There are two widely used ways of SSH authentication for secure remote access:

  - password authentication (usernames and passwords)

  - public key-based authentication (public and private key pairs)

The DartSSH 2 library provides an SSH and SFTP client written in pure Dart.
It allows to create SSH sessions, provides authenticaion and forwarding.
It supports all features of the SFTPv3 protocol, including upload, download,
remove, rename, or delete.

$ dart pub add dartssh2

## Dart SSH execute command

In the next example, we execute a command remotely.

main.dart
  

import 'dart:convert';
import 'dart:io';

import 'package:dartssh2/dartssh2.dart';

void main() async {
  final ip = "192.168.0.25";
  final username = "user7";

  final socket = await SSHSocket.connect(ip, 22);

  final client = SSHClient(
    socket,
    username: username,
    onPasswordRequest: () {
      stdout.write('Password: ');
      stdin.echoMode = false;
      return stdin.readLineSync() ?? exit(1);
    },
  );

  final res = await client.run('uname -a');

  print("\n");
  print(utf8.decode(res));

  client.close();
  await client.done;
}

We connect to a computer on a local network and lanuch the uname
command.

import 'package:dartssh2/dartssh2.dart';

We import the dartssh2 library.

final socket = await SSHSocket.connect(ip, 22);

A socket is created with SSHSocket.connect.

final client = SSHClient(
  socket,
  username: username,
  onPasswordRequest: () {
    stdout.write('Password: ');
    stdin.echoMode = false;
    return stdin.readLineSync() ?? exit(1);
  },
);

Using the socket, we create an SSH client. Upon connecting, the client will ask 
for a password. The password is not echoed.

final res = await client.run('uname -a');

We run the uname command.

print(utf8.decode(res));

We print the decoded response.

client.close();

The connection is terminated with close.

await client.done;

We wait until the transport is closed.

$ dart main.dart
Password:

Linux debian 4.19.0-23-amd64 #1 SMP Debian 4.19.269-1 ...

## Dart SSH shell

With the shell function, we can create an interactive shell
session.

main.dart
  

import 'dart:io';
import 'dart:typed_data';

import 'package:dartssh2/dartssh2.dart';

void main() async {
  final ip = "192.168.0.25";
  final username = "user7";

  final socket = await SSHSocket.connect(ip, 22);

  final client = SSHClient(
    socket,
    username: username,
    onPasswordRequest: () {
      stdout.write('Password: ');
      stdin.echoMode = false;
      return stdin.readLineSync() ?? exit(1);
    },
  );

  final shell = await client.shell();
  stdin.echoMode = true;

  stdout.addStream(shell.stdout);
  stderr.addStream(shell.stderr);
  stdin.cast&lt;Uint8List&gt;().listen(shell.write);

  await shell.done;

  client.close();
  await client.done;

  exit(0);
}

The program creates an interactive shell session.

final shell = await client.shell();
stdin.echoMode = true;

We create a shell session and turn the echo mode so that we can see what we
type.

stdout.addStream(shell.stdout);
stderr.addStream(shell.stderr);
stdin.cast&lt;Uint8List&gt;().listen(shell.write);

We plug the remote standard streams to our local streams.

await shell.done;

We wait until the shell terminates. We can terminate the shell with
exit command.

## Dart SSH public key authenticaion

In the next example, we authenticate using public key authenticaion, which is 
more secure.

main.dart
  

import 'dart:convert';
import 'dart:io';

import 'package:dartssh2/dartssh2.dart';

void main() async {
  final ip = "192.168.0.25";
  final username = "user7";
  final rsa_key = "C:\\Users\\Jano\\.ssh\\id_rsa";

  final socket = await SSHSocket.connect(ip, 22);

  final client = SSHClient(
    socket,
    username: username,
    identities: [
      ...SSHKeyPair.fromPem(await File(rsa_key).readAsString(), 'passphrase')
    ],
  );

  final uptime = await client.run('uptime');
  print(utf8.decode(uptime));

  client.close();
  await client.done;
}

The program connects to the remote system, authenticates using public key
authenticaion, and executes the uptime command.

final rsa_key = "C:\\Users\\Jano\\.ssh\\id_rsa";

This is the location of the RSA private keys on our Windows OS.

final client = SSHClient(
  socket,
  username: username,
  identities: [
    ...SSHKeyPair.fromPem(await File(rsa_key).readAsString(), 'passphrase')
  ],
);

We pass the private key to the to the SSHKeyPair.fromPem function.
The keys may be also protected by a passphrase. Also note that the remote system
must contain our public key in the ~/.ssh/authorized_keys file.

final uptime = await client.run('uptime');
print(utf8.decode(uptime));

We run the command and print the decoded response.

$ dart main.dart
06:45:06 up 30 min,  1 user,  load average: 0.00, 0.00, 0.00

## Dart SFTP list directory

In the following example, we list directory contents via SFTP.

main.dart
  

import 'dart:io';
import 'package:dartssh2/dartssh2.dart';

void main(List&lt;String&gt; args) async {
  final ip = "93.184.216.34";
  final username = "user7";

  final dirname = args.first;
  final socket = await SSHSocket.connect(ip, 22);

  final client = SSHClient(
    socket,
    username: username,
    onPasswordRequest: () {
      stdout.write('Password: ');
      stdin.echoMode = false;
      return stdin.readLineSync() ?? exit(1);
    },
  );

  final sftp = await client.sftp();
  final items = await sftp.listdir(dirname);

  print("\n");

  for (final item in items) {
    print(item.longname);
  }

  client.close();
  await client.done;
}

The program accepts an argument, which is a path to the directory, such as
/web/perl/.

final dirname = args.first;

We get the first command-line argument. It is expected to be the path to the 
remote directory.

final sftp = await client.sftp();
final items = await sftp.listdir(dirname);

An SFTP client is created with sftp function. The directory listing 
is retrieved with listdir.

for (final item in items) {
  print(item.longname);
}

We go through list of pathnames and print them.

$ dart main.dart /web/perl
Password: 

drwx---r-x   12 user7 117992         12 Jan 23 20:00 .
drwx------   56 user7 117992         61 Jan 11 16:39 ..
drwx---r-x    2 user7 117992          3 Jan  4 12:31 string2
drwx---r-x    2 user7 117992          3 Jan  4 12:31 dbi
drwx---r-x    2 user7 117992          3 Jan  4 12:31 string
drwx---r-x    2 user7 117992          3 Jan  4 12:31 hash
drwxr-xr-x    2 user7 117992          3 Jan 19 13:39 read-file
drwxr-xr-x    2 user7 117992          3 Jan 23 20:00 loops
drwxr-xr-x    2 user7 117992          3 Jan  4 12:31 grep
drwx---r-x    2 user7 117992          3 Jan  4 12:31 array
drwx---r-x    2 user7 117992          3 Jan  4 12:31 socket
drwx---r-x    2 user7 117992          3 Jan  4 12:31 lwp

## Dart SFTP make directory

The mkdir creates a new directory.

main.dart
  

import 'dart:io';
import 'package:dartssh2/dartssh2.dart';

void main(List&lt;String&gt; args) async {
  final ip = "93.184.216.34";
  final username = "user7";
  
  final dirname = args.first;

  final socket = await SSHSocket.connect(ip, 22);

  final client = SSHClient(
    socket,
    username: username,
    onPasswordRequest: () {
      stdout.write('Password: ');
      stdin.echoMode = false;
      return stdin.readLineSync() ?? exit(1);
    },
  );

  final sftp = await client.sftp();
  await sftp.mkdir(dirname);

  print('directory created');

  client.close();
  await client.done;
}

The program creates a new directory on the remote system. The directory name 
is passed as the first command-line argument.

## Dart SFTP upload file

The open function opens a remote file.

main.dart
  

import 'dart:io';
import 'package:dartssh2/dartssh2.dart';

void main(List&lt;String&gt; args) async {
  final ip = "93.184.216.34";
  final username = "user7";
  
  final lname = args.first;
  final rname = args.last;

  final socket = await SSHSocket.connect(ip, 22);

  final client = SSHClient(
    socket,
    username: username,
    onPasswordRequest: () {
      stdout.write('Password: ');
      stdin.echoMode = false;
      return stdin.readLineSync() ?? exit(1);
    },
  );

  final sftp = await client.sftp();
  final file = await sftp.open(
    rname,
    mode: SftpFileOpenMode.truncate |
        SftpFileOpenMode.create |
        SftpFileOpenMode.write,
  );

  await file.write(File(lname).openRead().cast());

  print("\n");
  print('file successfully uploaded');

  client.close();
  await client.done;
}

The program uploads a file on a remote system.

final lname = args.first;
final rname = args.last;

We have two command-line parameters. The first is the local filename to be
uploaded and the second is the full path of the remote file.

final file = await sftp.open(
  rname,
  mode: SftpFileOpenMode.truncate |
      SftpFileOpenMode.create |
      SftpFileOpenMode.write,
);

We open a file in the write mode on the remote system with open.
The file is truncated if it exists, or created if it does not.

  await file.write(File(lname).openRead().cast());

The data is read from the local file and written to the remote file.

## Dart SFTP download file

The following program downloads a file.

main.dart
  

import 'dart:convert';
import 'dart:io';
import 'package:dartssh2/dartssh2.dart';

void main(List&lt;String&gt; args) async {
  final ip = "93.184.216.34";
  final username = "user7";
  
  final rname = args.first;
  final lname = args.last;

  final socket = await SSHSocket.connect(ip, 22);

  final client = SSHClient(
    socket,
    username: username,
    onPasswordRequest: () {
      stdout.write('Password: ');
      stdin.echoMode = false;
      return stdin.readLineSync() ?? exit(1);
    },
  );

  final sftp = await client.sftp();
  final rfile = await sftp.open(
    rname,
    mode: SftpFileOpenMode.read,
  );

  final data = await rfile.readBytes();

  final lfile = File(lname).openWrite();
  lfile.write(utf8.decode(data));

  print('file downloaded');

  client.close();
  await client.done;
}

The program is similar to the previous one; we again utilize the
open function.

final rname = args.first;
final lname = args.last;

The program takes two parameters. The first is the full path to the remote file
(such as /web/dart/ssh/index.html ), and the second is the local
filename.

final rfile = await sftp.open(
  rname,
  mode: SftpFileOpenMode.read,
);

We open the remote file in the read mode.

final data = await rfile.readBytes();

We read the bytes with the readBytes.

final lfile = File(lname).openWrite();
lfile.write(utf8.decode(data));

We write the decoded data to the local file.

## Source

[dartssh2 documentation](https://pub.dev/documentation/dartssh2/latest/)

In this article we have worked with SSH and SFTP in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).