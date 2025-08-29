+++
title = "C# FluentFTP"
date = 2025-08-27T23:23:04.268+01:00
draft = false
description = "C# FluentFTP tutorial shows how to work with
FTP in C# using FluentFTP library."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# FluentFTP

last modified July 5, 2023

 

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

var path = "/web/test/";

using var con = new FtpClient(host, username, passwd);
con.Connect();

var ok = con.CreateDirectory(path);

if (ok) {
    Console.WriteLine("directory successfully created");
} else {
    Console.WriteLine("failed to create directory");
}

The program creates a new directory on the provided FTP server and prints a 
message.

var path = "/web/test/";

This is the name of the new directory.

using var con = new FtpClient(host, username, passwd);
con.Connect();

We create a new FTP client and make a connection.

var ok = con.CreateDirectory(path);

A new directory is created with CreateDirectory. The method returns
a boolean value indicating whether the creation was successful.

if (ok) {
    Console.WriteLine("directory successfully created");
} else {
    Console.WriteLine("failed to create directory");
}

Depending on the returned value, we print a message to the console.

## C# FluentFTP download file

A file is downloaded with the DownloadFile method.

Program.cs
  

using FluentFTP;

var host = "example.com";
var username = "user7";
var passwd = "s$cret";

var path = "/web/csharp/quest-pdf/index.html";
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

The program downloads an index.html file from the FTP server. It prints a
message about the outcome.

var status = con.DownloadFile($"{baseName}", path,
    FtpLocalExists.Overwrite, FtpVerify.Retry);

We download the file with DownloadFile. The first parameter is the
local path name, the second is the remote path name. The
FtpLocalExists.Overwrite option overwrites the local file if it
exists on disk. With the FtpVerify.Retry option we tell the client
to retry the download a few times if it fails. The method returns
FtpStatus.

var msg = status switch {

    FtpStatus.Success =&gt; "file successfully downloaded",
    FtpStatus.Failed =&gt; "failed to download file",
    _ =&gt; "unknown"
};

Depending on the returned status value, we provide a message.

## C# FluentFTP upload file

A file is uploaded with the UploadFile method.

Program.cs
  

using FluentFTP;

var host = "example.com";
var username = "user7";
var passwd = "s$cret";

var rpath = "/web/test/index.html";
var lpath = "index.html";

using var con = new FtpClient(host, username, passwd);
con.Connect();

var status = con.UploadFile(lpath, rpath, FtpRemoteExists.Overwrite,
    true, FtpVerify.Retry);

var msg = status switch
{
    FtpStatus.Success =&gt; "file successfully uploaded",
    FtpStatus.Failed =&gt; "failed to upload file",
    _ =&gt; "unknown"
};

Console.WriteLine(msg);

The program uploads a file and prints a message.

var status = con.UploadFile(lpath, rpath, FtpRemoteExists.Overwrite,
    true, FtpVerify.Retry);

We upload a file to the FTP server with UploadFile. The remote file
is overwritten if it already exists. We retry the upload a few times if it
fails.

var msg = status switch
{
    FtpStatus.Success =&gt; "file successfully uploaded",
    FtpStatus.Failed =&gt; "failed to upload file",
    _ =&gt; "unknown"
};

Depending on the returned status value, we print a message to the terminal.

## C# FluentFTP list directory

The next example lists the contents of the given remote directory.

Program.cs
  

using FluentFTP;

var host = "example.com";
var username = "user7";
var passwd = "s$cret";

var path = "/";

using var con = new FtpClient(host, username, passwd);
con.Connect();

var items = con.GetListing(path);

foreach (FtpListItem item in items) {

    if (item.Type == FtpObjectType.File) {
        Console.WriteLine($"f {item.Name}");
    } else if (item.Type == FtpObjectType.Directory) {
        Console.WriteLine($"d {item.Name}");
    } else {
        Console.WriteLine($"{item.Name}");
    }
}

The program lists the contents of the root directory. In the listing we specify
whether the item is a file or a directory.

var items = con.GetListing(path);

The GetListing method returns a file listing from the server. Each
FtpListItem object returned contains information about the item.

foreach (FtpListItem item in items) {

    if (item.Type == FtpObjectType.File) {
        Console.WriteLine($"f {item.Name}");
    } else if (item.Type == FtpObjectType.Directory) {
        Console.WriteLine($"d {item.Name}");
    } else {
        Console.WriteLine($"{item.Name}");
    }
}

We go over the array of the FTP list items and print each name to the directory. 
We append an f character for file and d for directories.

## Source

[FluentFTP Github page](https://github.com/robinrodricks/FluentFTP)

In this article we have covered the FluentFTP library. We have shown how to
create a directory, download and upload a file, and list directory contents.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).