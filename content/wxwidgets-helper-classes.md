+++
title = "wxWidgets helper classes"
date = 2025-08-29T19:57:47.224+01:00
draft = false
description = "This part of the wxWidgets tutorial covers helper classes."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../introduction/)
[Next](../firstprograms/)

# wxWidgets helper classes

last modified October 18, 2023

wxWidgets consists of a large group of helper classes that help 
programmers to do their job. These include classes for working 
with strings, files, XML files, streams, database, or network.
Here we show only a tiny drop of the whole lake.

wxWidgets library can be used to create console and GUI applications. In 
this chapter, we illustrate some of the helper classes in console based 
applications.

## Console

This is a simple console application. The application puts some 
text into the console window.

console.cpp
  

#include &lt;wx/string.h&gt;

int main(int argc, char **argv)
{
  wxPuts(wxT("A wxWidgets console application"));
}

```
$ g++ console.cpp `wx-config --cxxflags --libs` -o console

```

We compile the program.

A wxWidgets console application

This is the output.

## wxString

wxString is a class representing a character string.

In the following example, we define three wxStrings. We 
create one string of these strings using addition operation.

addition.cpp
  

#include &lt;wx/string.h&gt;

int main(int argc, char **argv)
{
  wxString str1 = wxT("Linux");
  wxString str2 = wxT("Operating");
  wxString str3 = wxT("System");

  wxString str = str1 + wxT(" ") + str2 + wxT(" ") + str3;

  wxPuts(str);
}

```
Linux Operating System

```

This is the output.

The Printf method is used to format strings. 

formatted.cpp
  

#include &lt;wx/string.h&gt;

int main(int argc, char **argv)
{

  int flowers = 21;

  wxString str;
  str.Printf(wxT("There are %d red roses."), flowers);
  
  wxPuts(str);
}

```
There are 21 red roses.

```

This is the output.

The following example checks, whether a string contains another string. 
For this we have a Contains method.

contains.cpp
  

#include &lt;wx/string.h&gt;

int main(int argc, char **argv)
{

  wxString str = wxT("The history of my life");

  if (str.Contains(wxT("history"))) {
      wxPuts(wxT("Contains!"));
  }

  if (!str.Contains(wxT("plain"))) {
      wxPuts(wxT("Does not contain!"));
  }

}

```
Contains!
Does not contain!

```

This is the output.

The Len method returns the number of characters in the string.

length.cpp
  

#include &lt;wx/string.h&gt;

int main(int argc, char **argv)
{
  wxString str = wxT("The history of my life");
  wxPrintf(wxT("The string has %d characters\n"), str.Len());
}

```
The string has 22 characters

```

This is the output.

The MakeLower and MakeUpper methods make 
characters lower case and upper case.

cases.cpp
  

#include &lt;wx/string.h&gt;

int main(int argc, char **argv)
{
  wxString str = wxT("The history of my life");

  wxPuts(str.MakeLower());
  wxPuts(str.MakeUpper());
}

```
the history of my life
THE HISTORY OF MY LIFE

```

This is the output.

## Utility functions

wxWidgets has several handy utility functions for executing a process, 
getting a home user directory or getting the OS name.

In the following example, we execute the ls command. For this, we have 
the wxShell function (Unix only).

shell.cpp
  

#include &lt;wx/string.h&gt;
#include &lt;wx/utils.h&gt;

int main(int argc, char **argv)
{

  wxShell(wxT("ls -l"));

}

```
total 40
-rwxr-xr-x 1 vronskij vronskij  9028 2007-09-06 22:10 basic
-rw-r--r-- 1 vronskij vronskij    95 2007-09-06 22:09 basic.cpp
-rw-r--r-- 1 vronskij vronskij   430 2007-09-06 00:07 basic.cpp~
-rwxr-xr-x 1 vronskij vronskij 11080 2007-09-05 23:17 console
-rw-r--r-- 1 vronskij vronskij   500 2007-09-05 23:17 console.cpp
-rw-r--r-- 1 vronskij vronskij   485 2007-09-05 23:16 console.cpp~

```

This is the output.

Next we we get the home user directory, os name, user name, 
host name, and total free memory.

system.cpp
  

#include &lt;wx/string.h&gt;
#include &lt;wx/utils.h&gt;

int main(int argc, char **argv)
{
  wxPuts(wxGetHomeDir());
  wxPuts(wxGetOsDescription());
  wxPuts(wxGetUserName());
  wxPuts(wxGetFullHostName());

  long mem = wxGetFreeMemory().ToLong();

  wxPrintf(wxT("Memory: %ld\n"), mem);
}

```
/home/vronskij
Linux 2.6.20-16-generic i686
jan bodnar
spartan
Memory: 741244928

```

This is the output.

## Time &amp; date

In wxWidgets, we have several classes for working with date &amp; time.

The example shows current date or time in various formats.

datetime.cpp
  

#include &lt;wx/datetime.h&gt;

int main(int argc, char **argv)
{
  wxDateTime now = wxDateTime::Now();

  wxString date1 = now.Format();
  wxString date2 = now.Format(wxT("%X"));
  wxString date3 = now.Format(wxT("%x"));

  wxPuts(date1);
  wxPuts(date2);
  wxPuts(date3);
}

```
Thu Feb  4 11:05:33 2021
11:05:33
02/04/21

```

This is the output.

Next we show current time in different cities.

datetime2.cpp
  

#include &lt;wx/datetime.h&gt;

int main(int argc, char **argv)
{
  wxDateTime now = wxDateTime::Now();

  wxPrintf(wxT("   Tokyo: %s\n"), now.Format(wxT("%a %T"), 
      wxDateTime::GMT9).c_str());
  wxPrintf(wxT("  Moscow: %s\n"), now.Format(wxT("%a %T"), 
      wxDateTime::MSD).c_str());
  wxPrintf(wxT("Budapest: %s\n"), now.Format(wxT("%a %T"), 
      wxDateTime::CEST).c_str());
  wxPrintf(wxT("  London: %s\n"), now.Format(wxT("%a %T"), 
      wxDateTime::WEST).c_str());
  wxPrintf(wxT("New York: %s\n"), now.Format(wxT("%a %T"), 
      wxDateTime::EDT).c_str());
}

```
   Tokyo: Sat 05:42:24
  Moscow: Sat 00:42:24
Budapest: Fri 22:42:24
  London: Fri 22:42:24
New York: Fri 16:42:24

```

This is the output.

The following example shows, how we can add date spans to our date/time. 
We add one month to the current time.

datespan.cpp
  

#include &lt;wx/datetime.h&gt;

int main(int argc, char **argv)
{
  wxDateTime now = wxDateTime::Now();
  wxString date1 = now.Format(wxT("%B %d %Y"));
  wxPuts(date1);

  wxDateSpan span(0, 1);
  wxDateTime then = now.Add(span);

  wxString date2 = then.Format(wxT("%B %d %Y"));
  wxPuts(date2);

}

```
February 04 2021
March 04 2021

```

This is the output.

### Files

wxWidgets has several classes to facilitate working with files. This is 
low level access to files, as opposed to working with streams. 

In the following example, we use the wxFile class to create a 
new file and write data to it. We also test, whether the file is opened. 
Note that when we create a file, it automatically stays as opened.

createfile.cpp
  

#include &lt;wx/file.h&gt;

int main(int argc, char **argv)
{

  wxString str = wxT("You make me want to be a better man.\n");

  wxFile file;
  file.Create(wxT("quote"), true);

  if (file.IsOpened())
      wxPuts(wxT("the file is opened"));

  file.Write(str);
  file.Close();

  if (!file.IsOpened())
      wxPuts(wxT("the file is not opened"));
}

```
$ ls qoute
ls: qoute: No such file or directory

$ ./createfile 
the file is opened
the file is not opened

$ cat quote
You make me want to be a better man.

```

This is the output.

The wxTextFile is a simple class which allows to work with text 
files on line by line basis.
It is easier to work with this class than with wxFile class. 

In the next example, we print the number of lines in a file, 
first and last lines and finally we 
read and show the contents of the file.

readfile.cpp
  

#include &lt;wx/textfile.h&gt;

int main(int argc, char **argv)
{

  wxTextFile file(wxT("test.c"));

  file.Open();

  wxPrintf(wxT("Number of lines: %d\n"), file.GetLineCount());
  wxPrintf(wxT("First line: %s\n"), file.GetFirstLine().c_str());
  wxPrintf(wxT("Last line: %s\n"), file.GetLastLine().c_str());

  wxPuts(wxT("-------------------------------------"));

  wxString s;

  for ( s = file.GetFirstLine(); !file.Eof(); 
      s = file.GetNextLine() )
  {
       wxPuts(s);
  }

  file.Close();
}

```
Number of lines: 8
First line: #include &lt;glib.h&gt;
Last line: }
-------------------------------------
#include &lt;glib.h&gt;
#include &lt;glib/gstdio.h&gt;

int main() {

g_mkdir("/home/vronskij/test", S_IRWXU);

}

```

This is the output.

The wxDir class allows us to enumerate files and directories.

In the following example, we print all files and directories available in the 
current working directory.

dir.cpp
  

#include &lt;wx/dir.h&gt;
#include &lt;wx/filefn.h&gt;

int main(int argc, char **argv)
{

  wxDir dir(wxGetCwd());

  wxString file;

  bool cont = dir.GetFirst(&amp;file, wxEmptyString,
      wxDIR_FILES | wxDIR_DIRS);

  while (cont) {
      wxPuts(file);
      cont = dir.GetNext(&amp;file);
  }
}

```
$ ./dir
dir
temp
console
basic.cpp
basic
quote
createfile
console.cpp
basic.cpp~
test.c
console.cpp~

```

This is the output.

In this chapter, we have covered some wxWidgets helper classes.

[Contents](..)
[Previous](../introduction/)
[Next](../firstprograms/)