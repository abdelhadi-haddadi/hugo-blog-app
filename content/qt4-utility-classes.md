+++
title = "Qt4 utility classes"
date = 2025-08-29T19:57:23.420+01:00
draft = false
description = "This part of the Qt4 tutorial covers utility classes."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../introduction/)
[Next](../strings/)

# Qt4 utility classes

last modified October 18, 2023

In this part of the Qt4 C++ programming tutorial, we talk about 
the utility classes available in the Qt4 library. 

The Qt4 library consists of a large group of helper classes that 
help programmers to do their job. These include classes for working with 
strings, files, XML files, streams, database, or network.
Here we show only a tiny drop of the whole lake.

The Qt4 library can be used to create console and GUI applications.
In this chapter, we illustrate some of the helper classes in console 
based applications.

## Printing text to the console

This is a simple console application. The application puts some text 
into the console window.

console.cpp
  

#include &lt;iostream&gt;

int main() {

  std::cout &lt;&lt; "console application\n";
}

In the first example, we print the text using the STL (Standard Template Library) library. 

console2.cpp
  

#include &lt;QTextStream&gt;

int main() {

   QTextStream out(stdout);
   out &lt;&lt; "console application\n";
}

The second example shows, how we can print text using the Qt4 programming library. 

Output
  

$ ./console 
console application

## QFile

The QFile is a class for reading from and writing to files. 

In the first example, we write a line into a file. 

write_line.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFile&gt;

int main() {

   QFile data("myfile");

   if (data.open(QFile::WriteOnly)) {
   
     QTextStream out(&amp;data);
     out &lt;&lt; "You make me want to be a better man." &lt;&lt; endl;
   }
}

A file named myfile is created in the write only mode.
A QTextStream class is used to insert a line into the file.

Output
  

$ cat myfile 
You make me want to be a better man.

The next example prints the contents of a file to the console. The text will 
be in Hungarian language, so we must set the correct codec. 

szerelem
  

S a régi szeretőmér­
mit nem cselekednék,
tengerből a vizet
kanállal lemerném.

S a tenger fenekéről
apró gyöngyöt szednék,
s a régi szeretőmnek
gyöngykoszorút kötnék. 

These are the contents of the szerelem file.

szerelem.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QFile&gt;

int main() {

  QFile data("szerelem");

  QString line;

  if (data.open(QFile::ReadOnly)) {
  
    QTextStream in(&amp;data);
    QTextStream out(stdout);

    out.setCodec("UTF-8");
    in.setCodec("UTF-8");

    do {
    
      line = in.readLine();
      out &lt;&lt; line &lt;&lt; endl;
    } while (!line.isNull());
  }
}

The example opens a file in the read only mode and 
prints its contents line by line.

out.setCodec("UTF-8");
in.setCodec("UTF-8");

Since Hungarian language contains characters outside the basic
Latin1 character set, we set the codec to UTF-8, which is capable of displaying
all possible characters.

do {

    line = in.readLine();
    out &lt;&lt; line &lt;&lt; endl;
} while (!line.isNull());

In this loop, we read and print the contents of the file line by line.
The readLine method reads the next line from the stream.
If the stream has read to the end of the file, the readLine 
will return a null QString. 

Output
  

$ ./szerelem
 S a régi szeretőmér­
mit nem cselekednék,
tengerből a vizet
kanállal lemerném.

S a tenger fenekéről
apró gyöngyöt szednék,
s a régi szeretőmnek
gyöngykoszorút kötnék. 

## QList

The QList is one of the generic Qt4's containers. 
It is used to store a list of values and provides fast index-based access 
as well as fast insertions and removals.

mlist.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QList&gt;

int main() {

  QTextStream out(stdout);

  QList&lt;QString&gt; list;

  list &lt;&lt; "Balzac" &lt;&lt; "Tolstoy" &lt;&lt; "Guldbrassen"
       &lt;&lt; "London" &lt;&lt; "Galsworthy" &lt;&lt; "Sienkiewicz";

  qSort(list);

  for (int i = 0; i &lt; list.size(); ++i) {
  
    out &lt;&lt; list.at(i) &lt;&lt; endl;
  }

}

In the code example, we create a list of great novelists. We sort 
alphabetically the list and print it to the console. 

Output
  

$ ./mlist 
Balzac
Galsworthy
Guldbrassen
London
Sienkiewicz
Tolstoy

## QDir

The QDir class provides access to directory 
structures and their contents.

home_dir.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDir&gt;

int main() {

  QTextStream out(stdout);
  
  QString home = QDir::homePath();
  out &lt;&lt; home &lt;&lt; endl;
}

This example determines the home directory and prints it to the console. 

Output
  

$ ./home_dir
/home/janbodnar

In the following example, we use the QDir class

filters.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QDir&gt;

int main() {
    
  QTextStream out(stdout);
  QDir dir;

  QStringList filters;
  filters &lt;&lt; "*.c" &lt;&lt; "*.c~";
  dir.setNameFilters(filters);

  QFileInfoList list = dir.entryInfoList();

  for (int i=0; i&lt;list.size(); ++i) {
      
    QFileInfo fileInfo = list.at(i);
    out &lt;&lt; QString("%1").arg(fileInfo.fileName());
    out &lt;&lt; endl;
  } 
}

The code example determines all files in the current directory and 
applies a specific filter to the files. 

Output
  

$ ls -F
anim*  anim.c  anim.c~  filters*  sun.png
$ ./filters 
anim.c
anim.c~

## QTime

The QTime class provides clock time functions.

In the following example, we print the current local time to the console. 

local_time.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QTime&gt;

int main() {

   QTextStream out(stdout);

   QTime qtime = QTime::currentTime();
   QString stime = qtime.toString(Qt::LocalDate);

   out &lt;&lt; stime &lt;&lt; endl;
}

Watch out that the file must not be called time.cpp. 

Output
  

$ ./local_time 
10:30:33 PM

## QString

The QString class is used to work with strings. 
This is probably the most important utility class
available in Qt4 programming library. 

concat.cpp
  

#include &lt;QTextStream&gt;

int main() {

   QString a = "Disziplin ";
   QString b = "ist ";
   QString c = "Macht.\n";

   QTextStream out(stdout);
   out &lt;&lt; a + b + c;
}

The first example concatenates three strings. 

Output
  

$ ./concat
Disziplin ist Macht.

The seconds example builds a string by means of appending 
text one after the other. 

append.cpp
  

#include &lt;QTextStream&gt;

int main() {

   QString string = "Whether I shall ";

   string.append("turn out to be the hero of my own life, \n");
   string.append("or whether that station will be held by anybody else, \n");
   string.append("these pages must show.\n");

   QTextStream out(stdout);
   out &lt;&lt; string;
}

The QString's append method appends the given string 
onto the end of this string.

Output
  

$ ./append
Whether I shall turn out to be the hero of my own life, 
or whether that station will be held by anybody else, 
these pages must show.

The next example shows an argument substitution. 

arg.cpp
  

#include &lt;QTextStream&gt;

int main() {

   QString string = "What if I gave you %1 red roses?";
   int num = 21;

   QTextStream out(stdout);
   out &lt;&lt; string.arg(num) &lt;&lt; endl; 
}

The arg method returns a copy of the string in which it 
replaces the %1 marker with the provided integer value.

Output
  

$ ./arg 
What if I gave you 21 red roses?

The following example shows, how we can determine the size of the string. 

size.cpp
  

#include &lt;QTextStream&gt;

int main() {

 QString string = "The history of my life.";

 QTextStream out(stdout);
 out &lt;&lt; "The string has " + QString::number(string.size())
    + " characters." &lt;&lt; endl; 
}

The size method returns the number of characters in this string.
In order to join the number with the preceding string, we use the number
method, which returns a string equivalent of the given number.

Output
  

$ ./size
The string has 23 characters.

The last example is about making a string uppercase or lowercase.

uplow.cpp
  

#include &lt;QTextStream&gt;

int main() {

  QString string = "The history of my life.";

  QTextStream out(stdout);
  out &lt;&lt; string.toLower() &lt;&lt; endl; 
  out &lt;&lt; string.toUpper() &lt;&lt; endl; 
}

The toLower method returns a lowercase copy of the string,
and the toUpper method returns an uppercase copy of the string.

Output
  

$ ./uplow
the history of my life.
THE HISTORY OF MY LIFE.

In this chapter, we have described some utility classes in Qt4.

[Contents](..)
[Previous](../introduction/)
[Next](../strings/)