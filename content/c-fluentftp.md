+++
title = "C# FluentFTP"
date = 2025-08-29T20:14:21.488+01:00
draft = false
description = "C# FluentFTP tutorial shows how to work with FTP in C# using FluentFTP library."
image = ""
imageBig = ""
categories = ["test"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# FluentFTP

last modified February 28, 2023

In this article we show how to work with FTP in C# using FluentFTP.

*FluentFTP* is an FTP and FTPS client for .NET. It supports many FTP
commands, file uploads and downloads, SSL/TLS connections, file hashing and
checksums, file permissions or FTP proxies.

File Transfer Protocol (FTP) is a standard network protocol used for
transfering of computer files between a client and server on a computer network.
Clients and servers communicate with a set of FTP commands, such as DELE, RETR,
or CWD.

$ dotnet add package FluentFTP

We add the package to the project.

## C# FluentFTP make directory

In the first example, we create a remote directory.

Program.cs
using FluentFTP;

var host = "example.com";
var username = "user7";
var passwd = "s$cret";

var path = "/web/test/index.html";
var baseName = Path.GetFileName(path);

using var con = new FtpClient(host, username, passwd);
con.Connect();

var status = con.DownloadFile($"{baseName}", path, 
    FtpLocalExists.Overwrite, FtpVerify.Retry);

var msg = status switch {

    FtpStatus.Success =&gt; "file successfully downloaded",
    FtpStatus.Failed =&gt; "failed to download file",
    _ =&gt; "unknown"
};

Console.WriteLine(msg);

## C# FluentFTP make directory

In the first example, we create a remote directory.

Program.cs
using FluentFTP;

var host = "example.com";
var username = "user7";
var passwd = "s$cret";

var path = "/web/test/index.html";
var baseName = Path.GetFileName(path);

using var con = new FtpClient(host, username, passwd);
con.Connect();

var status = con.DownloadFile($"{baseName}", path, 
    FtpLocalExists.Overwrite, FtpVerify.Retry);

var msg = status switch {

    FtpStatus.Success =&gt; "file successfully downloaded",
    FtpStatus.Failed =&gt; "failed to download file",
    _ =&gt; "unknown"
};

Console.WriteLine(msg);

In this article, we have covered the FluentFTP library. We have shown how to
create a directory, dowloand and upload a file, and list directory contents.

List [all C# tutorials](/csharp/).