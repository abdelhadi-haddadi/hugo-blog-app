+++
title = "Strings in Qt4"
date = 2025-08-29T19:57:23.729+01:00
draft = false
description = "In this part of the Qt4 tutorial, we work with strings."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../utilityclasses/)
[Next](../datetime/)

# Strings in Qt4

last modified October 18, 2023

In this chapter we work with strings. Qt4 has a QString 
class for working with strings. It is very powerful and has numerous methods. 

The QString class provides a Unicode character string. It stores a string 
as 16-bit QChars. Each QChar corresponds to one Unicode 4.0 character. 
Unlike strings in many other programming languages, a QString can be modified.

## First example

In the first example, we work with a few basic methods of the QString
class. 

basic.cpp
  

#include &lt;QTextStream&gt;

int main(void) {

   QTextStream out(stdout);
   
   QString a = "love";
   
   a.append(" chess");
   a.prepend("I ");
   
   out &lt;&lt; a &lt;&lt; endl;
   out &lt;&lt; "The a string has " &lt;&lt; a.count() 
       &lt;&lt; " characters" &lt;&lt; endl;
       
   out &lt;&lt; a.toUpper() &lt;&lt; endl;    
   out &lt;&lt; a.toLower() &lt;&lt; endl;
   
   return 0;
}

In the code example, we initiate a QString. We append and prepend some 
additional text. We print the length of the string. Finally, we print the
modified string in upper and lower case.

QString a = "love";

A QString is initiated. 

a.append(" chess");
a.prepend("I ");

We append and prepend text to the initial string. The string is modified
in-place. 

out &lt;&lt; a &lt;&lt; endl;

'I love chess' is printed to the terminal.

out &lt;&lt; "The a string has " &lt;&lt; a.count() 
    &lt;&lt; " characters" &lt;&lt; endl;

The count method returns the number of characters 
in the string. The length and size
methods are equivalents. 

out &lt;&lt; a.toUpper() &lt;&lt; endl;    
out &lt;&lt; a.toLower() &lt;&lt; endl;

These two methods return an uppercase and lowercase copy of the string.
They do not modify the string, they return a new modified copy of the
string.

Output
  

$ ./basic 
I love chess
The a string has 12 characters
I LOVE CHESS
i love chess

## Initiating strings

A QString can be initiated in several ways. 

init.cpp
  

#include &lt;QTextStream&gt;

int main(void) {

   QTextStream out(stdout);
   
   QString str1 = "The night train";
   out &lt;&lt; str1 &lt;&lt; endl;
   
   QString str2("A yellow rose");
   out &lt;&lt; str2 &lt;&lt; endl;
   
   std::string s1 = "A blue sky";
   QString str3 = s1.c_str(); 
   out &lt;&lt; str3 &lt;&lt; endl;
   
   std::string s2 = "A thick fog";
   QString str4 = QString::fromAscii(s2.data(), s2.size());
   out &lt;&lt; str4 &lt;&lt; endl;
   
   char s3[] = "A deep forest";
   QString str5(s3);
   out &lt;&lt; str5 &lt;&lt; endl;
   
   return 0;
}

We present five ways of initiating a QString.

QString str1 = "The night train";

This is a traditional way of initiating a string in computer
languages.

QString str2("A yellow rose");

This is an object way of initiating a QString.

std::string s1 = "A blue sky";
QString str3 = s1.c_str(); 

We have a string object from the C++ standard library. We 
use its c_str method to generate a null-terminated sequence 
of characters. This array of characters, a classic C representation of a string, 
can be assigned to a QString variable.

std::string s2 = "A thick fog";
QString str4 = QString::fromAscii(s2.data(), s2.size());

In these code lines we convert a standard C++ string to a QString.
We utilise the fromAscii method. It takes a pointer to the
an array of characters. The pointer is returned with the data
method of the std::string. The second parameter is the the size of the
std::string.

char s3[] = "A deep forest";
QString str5(s3);

This is a C string. It is an array of chars. One of the QString 
constructors can take an array of chars as a parameter.

Output
  

$ ./init 
The night train
A yellow rose
A blue sky
A thick fog
A deep forest

## Accessing string elements

A QString is a sequence of QChars. The elements of a string
can be accessed using the [] operator or the at
method.

access.cpp
  

#include &lt;QTextStream&gt;

int main(void) {

   QTextStream out(stdout);
   
   QString a = "Eagle";

   out &lt;&lt; a[0] &lt;&lt; endl;
   out &lt;&lt; a[4] &lt;&lt; endl;
   
   out &lt;&lt; a.at(0) &lt;&lt; endl;
   
   if (a.at(5).isNull()) {
     out &lt;&lt; "Outside the range of the string" &lt;&lt; endl;  
   }      
   
   return 0;
}

We print some individual characters from a specific QString.

out &lt;&lt; a[0] &lt;&lt; endl;
out &lt;&lt; a[4] &lt;&lt; endl;

We print the first and the fifth element of a string.

out &lt;&lt; a.at(0) &lt;&lt; endl;

With the at method, we retrieve the first
character of the string.

if (a.at(5).isNull()) {
    out &lt;&lt; "Outside the range of the string" &lt;&lt; endl;  
}      

The at method returns null if we are trying to access
a character outside the range of string characters.

Output
  

$ ./access 
E
e
E
Outside the range of the string

## The string length

There are three methods to get the length of a string.
The size, the count, and the
length method. All do the same thing. They return the
number of characters in the specified string.

length.cpp
  

#include &lt;QTextStream&gt;

int main(void) {

  QTextStream out(stdout);
   
  QString s1 = "Eagle";
  QString s2 = "Eagle\n";
  QString s3 = "Eagle ";
  QString s4 = QString::fromUtf8("орел");

  out &lt;&lt; s1.length() &lt;&lt; endl;
  out &lt;&lt; s2.length() &lt;&lt; endl;
  out &lt;&lt; s3.length() &lt;&lt; endl;
  out &lt;&lt; s4.length() &lt;&lt; endl;
  
  return 0;
}

We get the size of four strings.

QString s2 = "Eagle\n";
QString s3 = "Eagle ";

Each of these two strings has a white character.

QString s4 = QString::fromUtf8("орел");

This string consists of Russian letters.

Output
  

$ ./length
5
6
6
4

From the output we can see that the length method counts
the white characters too. The last string contains Unicode letters, where each
letter is stored as two characters.

## String interpolation

String interpolation is a dynamic building of strings. It allows us to 
replace specific control characters with actual values. We use the arg
method to do the interpolation.

interpolation.cpp
  

#include &lt;QTextStream&gt;

int main() {

   QTextStream out(stdout);
   
   QString s1 = "There are %1 white roses";
   int n = 12;
   
   out &lt;&lt; s1.arg(n) &lt;&lt; endl;
   
   QString s2 = "The tree is %1 m high";
   double h = 5.65;
   
   out &lt;&lt; s2.arg(h) &lt;&lt; endl;
   
   QString s3 = "We have %1 lemons and %2 oranges";
   int ln = 12;
   int on = 4;
   
   out &lt;&lt; s3.arg(ln).arg(on) &lt;&lt; endl;
   
   return 0;
}

The markers which are going to be replaced begin with the % character.
The following character is a number specifying the argument. There 
can be multiple of arguments for a string. The arg method
is overloaded, it can take integers, long numbers, chars, and QChars among others.

QString s1 = "There are %1 white roses";
int n = 12;

The %1 is the marker which we plan to replace. We have defined one integer.

out &lt;&lt; s1.arg(n) &lt;&lt; endl;

The arg method takes an integer. The %1 marker is 
replaced with the value of the n variable.

QString s2 = "The tree is %1 m high";
double h = 5.65;

out &lt;&lt; s2.arg(h) &lt;&lt; endl;

These three lines do the same thing for a double number. The correct
arg method is called automatically.

QString s3 = "We have %1 lemons and %2 oranges";
int ln = 12;
int on = 4;

out &lt;&lt; s3.arg(ln).arg(on) &lt;&lt; endl;

We can have multiple control characters. The %1 refers to the first
argument, the %2 to the second. The arg methods are called
in a consecutive chain.

Output
  

$ ./interpolation 
There are 12 white roses
The tree is 5.65 m high
We have 12 lemons and 4 oranges

## Substrings

When doing text processing, we need to find substrings of normal strings.
We have left, mid, and right methods
at our disposal.

substrings.cpp
  

#include &lt;QTextStream&gt;

int main(void) {

   QTextStream out(stdout);
   
   QString str = "The night train";
   
   out &lt;&lt; str.right(5) &lt;&lt; endl;
   out &lt;&lt; str.left(9) &lt;&lt; endl;
   out &lt;&lt; str.mid(4, 5) &lt;&lt; endl;
   
   QString str2("The big apple");
   QStringRef sub(&amp;str2, 0, 7);
   
   out &lt;&lt; sub.toString() &lt;&lt; endl;
   
   return 0;
}

We use all three methods to find some substrings of a given string.

out &lt;&lt; str.right(5) &lt;&lt; endl;

With the right method, we get five rightmost characters 
of the str string. The 'train' is printed.

out &lt;&lt; str.left(9) &lt;&lt; endl;

With the left method, we get nine leftmost characters 
of the str string. The 'The night' is printed.

out &lt;&lt; str.mid(4, 5) &lt;&lt; endl;

With the mid method, we get five characters starting from the 4th
position. The 'night' is printed.

QString str2("The big apple");
QStringRef sub(&amp;str2, 0, 7);

The QStringRef class is a read-only version of a QString. 
Here we create a QStringRef of a portion of the str2 string. 
The second parameter is the position and the third is the length of the 
substring.

Output
  

$ ./substrings 
train
The night
night
The big

## Looping through strings

A QString consists of QChars. We can loop through the 
QString to access each element of a string.

looping.cpp
  

#include &lt;QTextStream&gt;

int main(void) {

  QTextStream out(stdout);
   
  QString str = "There are many stars.";
  
  foreach (QChar qc, str) {
    out &lt;&lt; qc &lt;&lt; " ";  
  }
  
  out &lt;&lt; endl;
  
  for (QChar *it=str.begin(); it!=str.end(); ++it) {
    out &lt;&lt; *it &lt;&lt; " " ;
  }
  
  out &lt;&lt; endl;
  
  for (int i = 0; i &lt; str.size(); ++i) {
    out &lt;&lt; str.at(i) &lt;&lt; " ";    
  }
  
  out &lt;&lt; endl;
  
  return 0;
}

We show three ways to go through a QString. We add a 
space character between the letters as we print them to the terminal. 

foreach (QChar qc, str) {
  out &lt;&lt; qc &lt;&lt; " ";  
}

The foreach keyword is a Qt extension to the C++ language.
The first parameter of the keyword is the string element, the second one
is the string.

for (QChar *it=str.begin(); it!=str.end(); ++it) {
  out &lt;&lt; *it &lt;&lt; " " ;
}

In this code, we use iterators to go through the string.

for (int i = 0; i &lt; str.size(); ++i) {
  out &lt;&lt; str.at(i) &lt;&lt; " ";    
}

We compute the size of the string and use the at method to access the 
string elements. 

Output
  

$ ./looping
T h e r e   a r e   m a n y   s t a r s . 
T h e r e   a r e   m a n y   s t a r s . 
T h e r e   a r e   m a n y   s t a r s . 

## String comparison

The QString::compare static method is used to compare two strings. 
The method returns an integer. If the returned value is less than zero, the first 
string is less than the second. If it returns zero, both strings are equal. Finally, 
if the returned value is greater than zero, the first string is greater than the 
second. By 'less' we mean that a specific character of a string is positioned before 
the other one in the character table. Strings are compared the following way:
the first characters of the two strings are compared; if they are equal, the following
two characters are compared until we find some characters that differ or we find
that all characters match. 

comparing.cpp
  

#include &lt;QTextStream&gt;

#define STR_EQUAL 0

int main(void) {

   QTextStream out(stdout);
   
   QString a = "Rain";
   QString b = "rain";
   QString c = "rain\n";
   
   if (QString::compare(a, b) == STR_EQUAL) {
     out &lt;&lt; "a, b are equal" &lt;&lt; endl;
   } else {
     out &lt;&lt; "a, b are not equal" &lt;&lt; endl;
   }
   
   out &lt;&lt; "In case insensitive comparison:" &lt;&lt; endl;
   
   if (QString::compare(a, b, Qt::CaseInsensitive) == STR_EQUAL) {
     out &lt;&lt; "a, b are equal" &lt;&lt; endl;
   } else {
     out &lt;&lt; "a, b are not equal" &lt;&lt; endl;
   }     
   
   if (QString::compare(b, c) == STR_EQUAL) {
     out &lt;&lt; "b, c are equal" &lt;&lt; endl;
   } else {
     out &lt;&lt; "b, c are not equal" &lt;&lt; endl;
   }   

   c.chop(1);
   
   out &lt;&lt; "After removing the new line character" &lt;&lt; endl;
   
   if (QString::compare(b, c) == STR_EQUAL) {
     out &lt;&lt; "b, c are equal" &lt;&lt; endl;
   } else {
     out &lt;&lt; "b, c are not equal" &lt;&lt; endl;
   }            
   
   return 0;
}

We do case sensitive and case insensitive comparison with the 
compare method.

#define STR_EQUAL 0

For better code clarity, we define the STR_EQUAL constant. 

QString a = "Rain";
QString b = "rain";
QString c = "rain\n";

We be comparing these three strings.

if (QString::compare(a, b) == STR_EQUAL) {
    out &lt;&lt; "a, b are equal" &lt;&lt; endl;
} else {
    out &lt;&lt; "a, b are not equal" &lt;&lt; endl;
}

We compare a and b strings, they are not equal.
They differ in the first character.

if (QString::compare(a, b, Qt::CaseInsensitive) == STR_EQUAL) {
    out &lt;&lt; "a, b are equal" &lt;&lt; endl;
} else {
    out &lt;&lt; "a, b are not equal" &lt;&lt; endl;
}     

In case of case insensitive comparison, the strings are equal.
The Qt::CaseInsensitive makes the comparison case insensitive.

c.chop(1);

The chop method removes the last character from the 
c string. Now the b and c strings are equal.

Output
  

$ ./comparing 
a, b are not equal
In case insensitive comparison:
a, b are equal
b, c are not equal
After removing the new line character
b, c are equal

## Converting strings

Strings often need to be converted to other data types, and vice versa.
The toInt, toFloat, toLong 
are three QString methods which convert a string to an integer, float, and
long number. (There are more such methods.) The setNum method 
converts various numeric data types to a string. The method is overloaded 
and the correct one is called automatically. 

Output
  

#include &lt;QTextStream&gt;

int main(void) {

  QTextStream out(stdout);
   
  QString s1 = "12";
  QString s2 = "15";
  QString s3, s4;
  
  out &lt;&lt; s1.toInt() + s2.toInt() &lt;&lt; endl;
   
  int n1 = 30;
  int n2 = 40;
  
  out &lt;&lt; s3.setNum(n1) + s4.setNum(n2) &lt;&lt; endl;
   
  return 0;
}

In the example we convert two strings to integers and add them. Then
we convert two integers to strings and concatenate them.

out &lt;&lt; s1.toInt() + s2.toInt() &lt;&lt; endl;

The toInt method converts a string to an integer. We add
two numbers converted froms strings.

out &lt;&lt; s3.setNum(n1) + s4.setNum(n2) &lt;&lt; endl; 

In this case the setNum method converts an integer to 
a string. We concatenate two strings.

Output
  

$ ./converts 
27
3040

## Letters

Characters are divided into various categories: digits, letters, spaces, and 
punctuation characters. Each QString consists of QChars. 
The QChar has the isDigit, isLetter, 
isSpace, and isPunct method to perform the job. 

letters.cpp
  

#include &lt;QTextStream&gt;

int main(void) {

  QTextStream out(stdout);
   
  int digits  = 0;
  int letters = 0;
  int spaces  = 0;
  int puncts  = 0;
  
  QString str = "7 white, 3 red roses.";
  
  foreach(QChar s, str) {
  
    if (s.isDigit()) {
      digits++;
    } else if (s.isLetter()) {
      letters++;
    } else if (s.isSpace()) {
      spaces++;
    } else if (s.isPunct()) {
      puncts++;
    }    
  }  
  
  out &lt;&lt; QString("There are %1 characters").arg(str.count()) &lt;&lt; endl;
  out &lt;&lt; QString("There are %1 letters").arg(letters) &lt;&lt; endl;
  out &lt;&lt; QString("There are %1 digits").arg(digits) &lt;&lt; endl;
  out &lt;&lt; QString("There are %1 spaces").arg(spaces) &lt;&lt; endl;
  out &lt;&lt; QString("There are %1 punctuation characters").arg(puncts) &lt;&lt; endl;
    
  return 0;
}

In the example we define a simple sentence. We count the number of 
digits, letters, spaces, and punctuation characters in the sentence. 

int digits  = 0;
int letters = 0;
int spaces  = 0;
int puncts  = 0;

We define an integer variable for each character category.

QString str = "7 white, 3 red roses.";

This is the sentence to be examined. 

foreach(QChar s, str) {

  if (s.isDigit()) {
    digits++;
  } else if (s.isLetter()) {
    letters++;
  } else if (s.isSpace()) {
    spaces++;
  } else if (s.isPunct()) {
    puncts++;
  }    
}  

We use the foreach keyword to go through the QString. Each of 
the elements is a QChar. We use the methods of the QChar 
class to determine the categories of characters. 

out &lt;&lt; QString("There are %1 characters").arg(str.count()) &lt;&lt; endl;
out &lt;&lt; QString("There are %1 letters").arg(letters) &lt;&lt; endl;
out &lt;&lt; QString("There are %1 digits").arg(digits) &lt;&lt; endl;
out &lt;&lt; QString("There are %1 spaces").arg(spaces) &lt;&lt; endl;
out &lt;&lt; QString("There are %1 punctuation characters").arg(puncts) &lt;&lt; endl;

Using the string interpolation, we print the numbers to the terminal. 

Output
  

$ ./letters 
There are 21 characters
There are 13 letters
There are 2 digits
There are 4 spaces
There are 2 punctuation characters

## Modifying strings

Some methods (for example the toLower method) return a new 
modified copy of an original string. Other methods modify the string in-place. 
We present some of them.  

modify.cpp
  

#include &lt;QTextStream&gt;

int main(void) {

   QTextStream out(stdout);
   
   QString str = "Lovely";   
   str.append(" season");
   
   out &lt;&lt; str &lt;&lt; endl;
   
   str.remove(10, 3);
   out &lt;&lt; str &lt;&lt; endl;

   str.replace(7, 3, "girl");
   out &lt;&lt; str &lt;&lt; endl;
   
   str.clear();
   
   if (str.isEmpty()) {
     out &lt;&lt; "The string is empty" &lt;&lt; endl;
   }
   
   return 0;
}

We describe four methods that modify a string in-place.

str.append(" season");

The append method adds a new string at the end
of the string.

str.remove(10, 3);

The remove method removes 3 characters from the string, 
starting from position 10.

str.replace(7, 3, "girl");

The replace method replaces 3 characters beginning at position 
7 with the specified string. 

str.clear();

The clear method clears the string.

Output
  

$ ./modify 
Lovely season
Lovely sea
Lovely girl
The string is empty

## Aligning strings

It is a common requirement to have a neat output. We can 
use the leftJustified and rightJustified
methods to align our strings.

right_align.cpp
  

#include &lt;QTextStream&gt;

int main(void) {
    
   QTextStream out(stdout);
   
   QString field1 = "Name: ";
   QString field2 = "Occupation: ";
   QString field3 = "Residence: ";
   QString field4 = "Marital status: ";

   int width = field4.size();
   
   out &lt;&lt; field1.rightJustified(width, ' ') &lt;&lt; "Robert\n";
   out &lt;&lt; field2.rightJustified(width, ' ') &lt;&lt; "programmer\n";
   out &lt;&lt; field3.rightJustified(width, ' ') &lt;&lt; "New York\n";
   out &lt;&lt; field4.rightJustified(width, ' ') &lt;&lt; "single\n";
    
   return 0;
}

The example aligns field strings to the right.

int width = field4.size();

We calculate the size of the widest string.

out &lt;&lt; field1.rightJustified(width, ' ') &lt;&lt; "Robert\n";

The rightJustified method returns a string having width
characters. If the string is shorter, the rest is filled with the provided character.
In our case, it is a space character. 

Output
  

$ ./rightalign 
          Name: Robert
    Occupation: programmer
     Residence: New York
Marital status: single

In this chapter, we have worked with strings in Qt4.

[Contents](..)
[Previous](../utilityclasses/)
[Next](../datetime/)