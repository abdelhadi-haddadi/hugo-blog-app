+++
title = "Qt5 files and directories"
date = 2025-08-29T19:57:27.381+01:00
draft = false
description = "In this part of the Qt5 tutorial, we work with files and directories."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../containers/)
[Next](../firstprograms/)

# Qt5 files and directories

last modified October 18, 2023

In this part of the Qt5 C++ programming tutorial, we work with files and
directories.

QFile, QDir, and QFileInfo are
fundamental classes for working with files in Qt5. QFile provides
an interface for reading from and writing to files. QDir provides
access to directory structures and their contents.  QFileInfo
provides system-independent file information, including file's name and position
in the file system, access time and modification time, permissions, or file
ownership.

## Qt5 file size

In the next example, we determine the size of a file.

file_size.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFileInfo&gt;

int main(int argc, char *argv[]) {

  QTextStream out{stdout};

  if (argc != 2) {

    qWarning("Usage: file_size file");
    return 1;
  }

  QString filename = argv[1];

  QFile f{filename};

  if (!f.exists()) {

    qWarning("The file does not exist");
    return 1;
  }

  QFileInfo fileinfo{filename};

  qint64 size = fileinfo.size();

  QString str = "The size is: %1 bytes";

  out &lt;&lt; str.arg(size) &lt;&lt; endl;

  return 0;
}

The size of the file is determined with the QFileInfo's size
method.

QString filename = argv[1];

The name of the file is passed as an argument to the program.

QFile f{filename};

if (!f.exists()) {

  qWarning("The file does not exist");
  return 1;
}

The existence of the file is checked with the exists method of the
QFile class. If it does not exist, we issue a warning and terminate
the program.

QFileInfo fileinfo{filename};

An instance of the QFileInfo is created.

qint64 size = fileinfo.size();

The file size is determined with the size method. The
qint64 is a type guaranteed to be 64-bit on all platforms supported
by Qt.

QString str = "The size is: %1 bytes";

out &lt;&lt; str.arg(size) &lt;&lt; endl;

The outcome is printed to the console.

$ ./filesize Makefile
The size is: 19993 bytes

## Qt5 read file

In order to read the contents of a file, we must first open the file for
reading. Then an input file stream is created; from this stream, the data is
read.

words.txt
  

sky
blue
cloud
falcon
forest
lake
cup
bear
wolf

We have a sample text file.

read_file.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFile&gt;

int main(void) {

  QTextStream out{stdout};

  QFile f{"words.txt"};

  if (!f.open(QIODevice::ReadOnly)) {

    qWarning("Cannot open file for reading");
    return 1;
  }

  QTextStream in{&amp;f};

  while (!in.atEnd()) {

    QString line = in.readLine();
    out &lt;&lt; line &lt;&lt; endl;
  }

  return 0;
}

The example reads data from the words.txt file.

QFile f{"words.txt"};

An instance of the QFile object is created. The QFile
automatically closes the file when it goes out of scope.

if (!f.open(QIODevice::ReadOnly)) {

  qWarning("Cannot open file for reading");
  return 1;
}

The QFile's open method opens the file in the
read-only mode. If the method fails, we issue a warning and terminate the
program.

QTextStream in{&amp;f};

An input stream is created. The QTextStream receives the file
handle. The data will be read from this stream.

while (!in.atEnd()) {

  QString line = in.readLine();
  out &lt;&lt; line &lt;&lt; endl;
}

In the while loop we read the file line by line until the end of the file.
The atEnd method returns true if there is no more data to be read
from the stream. The readLine method reads one line from the
stream.

$ ./readfile 
sky
blue
cloud
falcon
forest
lake
cup
bear
wolf

## Qt5 write to file

In order to write to a file, we open the file in the write
mode, create an output stream directed to the file, and use
a write operator to write to that stream.

write_file.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFile&gt;

int main(void) {

  QTextStream out{stdout};

  QString filename = "distros.txt";
  QFile f{filename};

  if (f.open(QIODevice::WriteOnly)) {

    QTextStream out{&amp;f};
    out &lt;&lt; "Xubuntu" &lt;&lt; endl;
    out &lt;&lt; "Arch" &lt;&lt; endl;
    out &lt;&lt; "Debian" &lt;&lt; endl;
    out &lt;&lt; "Redhat" &lt;&lt; endl;
    out &lt;&lt; "Slackware" &lt;&lt; endl;

  } else {

    qWarning("Could not open file");
  }

  return 0;
}

The example writes the names of five Linux distributions to the file name called
distrost.txt.

QString filename = "distros.txt";
QFile f{filename};

The QFile object is created with the provided file name.

if (f.open(QIODevice::WriteOnly)) {

With the open method, we open the file in the write-only method.

QTextStream out{&amp;f};

This line creates a QTextStream that operates on a file handle.
In other words, the stream of data to be written is directed to the file.

out &lt;&lt; "Xubuntu" &lt;&lt; endl;
out &lt;&lt; "Arch" &lt;&lt; endl;
out &lt;&lt; "Debian" &lt;&lt; endl;
out &lt;&lt; "Redhat" &lt;&lt; endl;
out &lt;&lt; "Slackware" &lt;&lt; endl;

The data is written with the &lt;&lt; operator.

$ ./writefile
$ cat distros.txt 
Xubuntu
Arch
Debian
Redhat
Slackware

## Qt5 copy file

When we copy a file, we create an exact reproduction of the file with a
different name or in a different place of the filesystem.

copy_file.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFile&gt;

int main(int argc, char *argv[]) {

  QTextStream out{stdout};

  if (argc != 3) {

      qWarning("Usage: copyfile source destination");
      return 1;
  }

  QString src = argv[1];

  if (!QFile{src}.exists()) {

      qWarning("The source file does not exist");
      return 1;
  }

  QString dest(argv[2]);

  QFile::copy(src, dest);

  return 0;
}

The example creates a copy of the provided file with the
QFile::copy method.

if (argc != 3) {

    qWarning("Usage: copyfile source destination");
    return 1;
}

The program takes two parameters; if they are not given, it ends with a warning
message.

QString src = argv[1];

From the command line arguments of the program, we get the name of the source file.

if (!QFile{src}.exists()) {

    qWarning("The source file does not exist");
    return 1;
}

We check for the existence of the source file with the QFile's
exists method. If it does not exist, we terminate the program with
a warning message.

QString dest(argv[2]);

We get the destination file name.

QFile::copy(src, dest);

The source file is copied with the QFile::copy method. The first
parameter is the source file name, the second parameter is the destination file
name.

## Qt5 file owner and group

Each file has a user who is its owner. A file also belongs to a group of users
for better management and protection of files.

owner_group.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFileInfo&gt;

int main(int argc, char *argv[]) {

  QTextStream out{stdout};

  if (argc != 2) {

      qWarning("Usage: owner file");
      return 1;
  }

  QString filename = argv[1];

  QFileInfo fileinfo{filename};

  QString group = fileinfo.group();
  QString owner = fileinfo.owner();

  out &lt;&lt; "Group: " &lt;&lt; group &lt;&lt; endl;
  out &lt;&lt; "Owner: " &lt;&lt; owner &lt;&lt; endl;

  return 0;
}

The example prints the owner and the primary group of the given file.

QFileInfo fileinfo{filename};

An instance of the QFileInfo class is created. Its parameter
is the file name given as a command line argument.

QString group = fileinfo.group();

The primary group of the file is determined with the QFileInfo's
group method.

QString owner = fileinfo.owner();

The owner of the file is determined with the QFileInfo's
owner method.

$ touch myfile
$ ./ownergroup myfile
Group: janbodnar
Owner: janbodnar

## Qt5 last read, last modified

Files store information about the last time they were read or modified. To get
this information, we use the QFileInfo class.

file_times.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFileInfo&gt;
#include &lt;QDateTime&gt;

int main(int argc, char *argv[]) {

  QTextStream out{stdout};

  if (argc != 2) {

      qWarning("Usage: file_times file");
      return 1;
  }

  QString filename = argv[1];

  QFileInfo fileinfo{filename};

  QDateTime last_rea = fileinfo.lastRead();
  QDateTime last_mod = fileinfo.lastModified();

  out &lt;&lt; "Last read: " &lt;&lt; last_rea.toString() &lt;&lt; endl;
  out &lt;&lt; "Last modified: " &lt;&lt; last_mod.toString() &lt;&lt; endl;

  return 0;
}

The example prints the last read and last modified time.

QFileInfo fileinfo{filename};

The QFileInfo object is created.

QDateTime last_rea = fileinfo.lastRead();

The lastRead method returns the date and time when the file was
last read (accessed).

QDateTime last_mod = fileinfo.lastModified();

The lastModified method returns the date and time when the file was
last modified.

$ ./filetimes Makefile 
Last read: Sun Dec 6 12:46:11 2020
Last modified: Sun Dec 6 12:46:10 2020

## Qt5 working with directories

The QDir class has methods for working with directories.

dirs.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDir&gt;

int main(void) {

  QTextStream out{stdout};
  QDir dir;

  if (dir.mkdir("mydir")) {

    out &lt;&lt; "mydir successfully created" &lt;&lt; endl;
  }

  dir.mkdir("mydir2");

  if (dir.exists("mydir2")) {

    dir.rename("mydir2", "newdir");
  }

  dir.mkpath("temp/newdir");

  return 0;
}

In the example, we present four methods for working with directories.

if (dir.mkdir("mydir")) {

  out &lt;&lt; "mydir successfully created" &lt;&lt; endl;
}

The mkdir method creates a directory. It returns true if the
directory was successfully created.

if (dir.exists("mydir2")) {

  dir.rename("mydir2", "newdir");
}

The exists checks for the existence of a directory.
The rename method renames the directory.

dir.mkpath("temp/newdir");

The mkpath creates a new directory and all necessary parent
directories in one shot.

## Qt5 special paths

There are some special paths in the filesystem; for instance a home diretory
or a root directory. The QDir class is used to get the special
paths in the system.

special_paths.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDir&gt;

int main(void) {

  QTextStream out{stdout};

  out &lt;&lt; "Current path:" &lt;&lt; QDir::currentPath() &lt;&lt; endl;
  out &lt;&lt; "Home path:" &lt;&lt; QDir::homePath() &lt;&lt; endl;
  out &lt;&lt; "Temporary path:" &lt;&lt; QDir::tempPath() &lt;&lt; endl;
  out &lt;&lt; "Rooth path:" &lt;&lt; QDir::rootPath() &lt;&lt; endl;

  return 0;
}

The example prints four special paths.

out &lt;&lt; "Current path:" &lt;&lt; QDir::currentPath() &lt;&lt; endl;

The current working directory is retrieved with the
QDir::currentPath method.

out &lt;&lt; "Home path:" &lt;&lt; QDir::homePath() &lt;&lt; endl;

The home directory is returned with the QDir::homePath method.

out &lt;&lt; "Temporary path:" &lt;&lt; QDir::tempPath() &lt;&lt; endl;

The temporary directory is retrieved with the QDir::tempPath method.

out &lt;&lt; "Rooth path:" &lt;&lt; QDir::rootPath() &lt;&lt; endl;

The root directory is returned by the QDir::rootPath method.

$ ./specialpaths 
Current path:/home/janbodnar/Documents/prog/qt5/files/specialpaths
Home path:/root
Temporary path:/tmp
Rooth path:/

## Qt5 file path

A file is identified by its name and path; a path consists
of a file name, a base name, and a suffix.

file_path.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFileInfo&gt;

int main(int argc, char *argv[]) {

  QTextStream out{stdout};

  if (argc != 2) {

      out &lt;&lt; "Usage: file_times file" &lt;&lt; endl;
      return 1;
  }

  QString filename = argv[1];

  QFileInfo fileinfo{filename};

  QString absPath = fileinfo.absoluteFilePath();
  QString baseName = fileinfo.baseName();
  QString compBaseName = fileinfo.completeBaseName();
  QString fileName = fileinfo.fileName();
  QString suffix = fileinfo.suffix();
  QString compSuffix = fileinfo.completeSuffix();

  out &lt;&lt; "Absolute file path: " &lt;&lt; absPath &lt;&lt; endl;
  out &lt;&lt; "Base name: " &lt;&lt; baseName &lt;&lt; endl;
  out &lt;&lt; "Complete base name: " &lt;&lt; compBaseName &lt;&lt; endl;
  out &lt;&lt; "File name: " &lt;&lt; fileName &lt;&lt; endl;
  out &lt;&lt; "Suffix: " &lt;&lt; suffix &lt;&lt; endl;
  out &lt;&lt; "Whole suffix: " &lt;&lt; compSuffix &lt;&lt; endl;

  return 0;
}

In the example, we use several methods to print the file path and its parts of
the given file name.

QFileInfo fileinfo{filename};

The file path is identified using the QFileInfo class.

QString absPath = fileinfo.absoluteFilePath();

The absoluteFilePath method returns an absolute path including the
file name.

QString baseName = fileinfo.baseName();

The baseName method returns the base name—the name of the file
without the path.

QString compBaseName = fileinfo.completeBaseName();

The completeBaseName method returns the complete base name—all
characters in the file up to (but not including) the last dot character.

QString fileName = fileinfo.fileName();

The fileName method returns the file name, which is the base
name and the extension.

QString suffix = fileinfo.suffix();

The suffix method returns the file ending, which consists of all
characters in the file after (but not including) the last dot character.

QString compSuffix = fileinfo.completeSuffix();

A file ending may consist of several parts; the completeSuffix
method returns all characters in the file after (but not including) the first
dot character.

$ ./filepath ~/Downloads/qt-everywhere-opensource-src-5.5.1.tar.gz
Absolute file path: /home/janbodnar/Downloads/qt-everywhere-opensource-src-5.5.1.tar.gz
Base name: qt-everywhere-opensource-src-5
Complete base name: qt-everywhere-opensource-src-5.5.1.tar
File name: qt-everywhere-opensource-src-5.5.1.tar.gz
Suffix: gz
Whole suffix: 5.1.tar.gz

## Qt5 file permissions

Files in the filesystem have a system of protection. Files are given flags which
determine who can access and modify them. The QFile::permissions
method returns an enumeration of OR-ed flags for the file in question.

permissions.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFile&gt;

int main(int argc, char *argv[]) {

  QTextStream out{stdout};

  if (argc != 2) {

      out &lt;&lt; "Usage: permissions file" &lt;&lt; endl;
      return 1;
  }

  QString filename = argv[1];

  auto ps = QFile::permissions(filename);

  QString fper;

  if (ps &amp; QFile::ReadOwner) {

      fper.append('r');
  } else {
      fper.append('-');
  }

  if (ps &amp; QFile::WriteOwner) {

      fper.append('w');
  } else {
      fper.append('-');
  }

  if (ps &amp; QFile::ExeOwner) {

      fper.append('x');
  } else {
      fper.append('-');
  }

  if (ps &amp; QFile::ReadGroup) {

      fper.append('r');
  } else {
      fper.append('-');
  }

  if (ps &amp; QFile::WriteGroup) {

      fper.append('w');
  } else {
      fper.append('-');
  }

  if (ps &amp; QFile::ExeGroup) {

      fper.append('x');
  } else {
      fper.append('-');
  }

  if (ps &amp; QFile::ReadOther) {

      fper.append('r');
  } else {
      fper.append('-');
  }

  if (ps &amp; QFile::WriteOther) {

      fper.append('w');
  } else {
      fper.append('-');
  }

  if (ps &amp; QFile::ExeOther) {

      fper.append('x');
  } else {
      fper.append('-');
  }

  out &lt;&lt; fper &lt;&lt; endl;

  return 0;
}

The example produces a Unix-like list of permissions for the given file. There
are tree kinds of possible users: owner, the group where the file belongs, and
the rest of the users referred as others. The first three positions belong to
the owner of the file, the next three positions to the file's group, and the
last three characters belong to the others. There are four kinds of rights:
reading (r), writing or modifying (w), executing (x), and no rights (-).

auto ps = QFile::permissions(filename);

With the QFile::permissions method, we get the enumeration of
permission flags.

QString fper;

This string is dynamically built based on the given permissions.

if (ps &amp; QFile::ReadOwner) {

    fper.append('r');
} else {
    fper.append('-');
}

We use the &amp; operator to determine whether the returned enumeration
consists of the QFile::ReadOwner flag.

$ ./permissions Makefile
rw-rw-r--

The owner and the group of users where the file belongs have the right to read
the file and modify it. Other users have the right to read the file. Since the
file is not an executable, there are no rights to execute the file.

## Qt5 list directory contents

In the following example, we display the contents of the given directory.

list_dir.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFileInfo&gt;
#include &lt;QDir&gt;

int main(int argc, char *argv[]) {

  QTextStream out{stdout};

  if (argc != 2) {

      qWarning("Usage: list_dir directory");
      return 1;
  }

  QString directory = argv[1];

  QDir dir{directory};

  if (!dir.exists()) {

      qWarning("The directory does not exist");
      return 1;
  }

  dir.setFilter(QDir::Files | QDir::AllDirs);
  dir.setSorting(QDir::Size | QDir::Reversed);

  QFileInfoList list = dir.entryInfoList();

  int max_size = 0;

  for (QFileInfo finfo: list) {

      QString name = finfo.fileName();
      int size = name.size();

      if (size &gt; max_size) {

          max_size = size;
      }
  }

  int len = max_size + 2;

  out &lt;&lt; QString("Filename").leftJustified(len).append("Bytes") &lt;&lt; endl;

  for (int i = 0; i &lt; list.size(); ++i) {

    QFileInfo fileInfo = list.at(i);
    QString str = fileInfo.fileName().leftJustified(len);
    str.append(QString("%1").arg(fileInfo.size()));
    out &lt;&lt; str &lt;&lt; endl;
  }

  return 0;
}

To list the contents of a directory, we use the QDir class and its
entryInfoList method. The list of the files is reversely sorted by
its size and neatly lined up. There are two columns; the first column contains
file names and the second column file sizes.

QDir dir{directory};

A QDir object with the given directory name is created.

dir.setFilter(QDir::Files | QDir::AllDirs);

The setFilter method specifies the kind of files that should be
returned by the entryInfoList method.

dir.setSorting(QDir::Size | QDir::Reversed);

The setSorting method specifies the sort order used by the
entryInfoList method.

QFileInfoList list = dir.entryInfoList();

The entryInfoList method returns a list of QFileInfo
objects for all the files and directories in the directory, filtered and ordered
by the filtering and ordering methods. QFileInfoList is a synonym
for QList&lt;QFileInfo&gt;.

for (QFileInfo finfo: list) {

  QString name = finfo.fileName();
  int size = name.size();

  if (size &gt; max_size) {

      max_size = size;
  }
}

We go through the list and determine the maximum file name size. This
information is needed to organize the output neatly.

int len = max_size + 2;

We give additional two spaces to the length of a column.

out &lt;&lt; QString("Filename").leftJustified(len).append("Bytes") &lt;&lt; endl;

Here we print the column names. The leftJustified method returns a
string of the given size, whose string is left justified and padded by the fill
character (defaults to space) to its right.

for (int i = 0; i &lt; list.size(); ++i) {

  QFileInfo fileInfo = list.at(i);
  QString str = fileInfo.fileName().leftJustified(len);
  str.append(QString("%1").arg(fileInfo.size()));
  out &lt;&lt; str &lt;&lt; endl;
}

We go through the list of files and print their names and sizes.
The first column is left justified and padded with spaces as necessary;
the second column is simply appended and the end of the line.

$ ./list_dir .
Filename      Bytes
list_dir.pro  291
list_dir.cpp  1092
..            4096
.             4096
list_dir.o    10440
list_dir      19075
Makefile      28369

This is a sample output of the example.

In this chapter, we worked with files and directories in Qt5.

[Contents](..)
[Previous](../containers/)
[Next](../firstprograms/)