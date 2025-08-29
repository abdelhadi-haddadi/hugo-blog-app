+++
title = "Containers in Qt5"
date = 2025-08-29T19:57:26.220+01:00
draft = false
description = "In this part of the Qt5 tutorial, we work with Qt container classes, including QVector, QList, QSet, and QMap."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../datetime/)
[Next](../files/)

# Containers in Qt5

last modified October 18, 2023

In this part of the Qt5 tutorial, we talk about containers in Qt5.
The following containers are mentioned: QVector,
QList, QStringList, QSet, and QMap.

Containers are general-purpose classes that store items of a given type in
memory. C++ has the Standard Template Library (STL), which has its own
containers. It Qt, we can use Qt containers or STL containers.

There are two kinds of containers: sequential and associative. Sequential
containers store items one after another, whereas associative containers store
key-value pairs. QList, QVector,
QLinkedList belong to sequential containers; QMap and
QHash are examples of associative containers.

Since in this chapter we create command line programs, we do not need the Qt GUI
module. We can add the QT -= gui declaration to the project file.

## Qt5 QVector

QVector is a template class that provides a dynamic array. It
stores its items in adjacent memory locations and provides fast index-based
access. For large vectors, inserting operations are slower and
QList container is recommended instead.

myvector.cpp
  

#include &lt;QVector&gt;
#include &lt;QTextStream&gt;

int main(void) {

    QTextStream out(stdout);

    QVector&lt;int&gt; vals = {1, 2, 3, 4, 5};

    out &lt;&lt; "The size of the vector is: " &lt;&lt; vals.size() &lt;&lt; endl;

    out &lt;&lt; "The first item is: " &lt;&lt; vals.first() &lt;&lt; endl;
    out &lt;&lt; "The last item is: " &lt;&lt; vals.last() &lt;&lt; endl;

    vals.append(6);
    vals.prepend(0);

    out &lt;&lt; "Elements: ";

    for (int val : vals) {

        out &lt;&lt; val &lt;&lt; " ";
    }

    out &lt;&lt; endl;

    return 0;
}

The example works with a vector of integers.

QVector&lt;int&gt; vals = {1, 2, 3, 4, 5};

A vector of integers is created.

out &lt;&lt; "The size of the vector is: " &lt;&lt; vals.size() &lt;&lt; endl;

The size method gives the size of the vector—the number of items
in the vector.

out &lt;&lt; "The first item is: " &lt;&lt; vals.first() &lt;&lt; endl;

The first item is retrieved with the first method.

out &lt;&lt; "The last item is: " &lt;&lt; vals.last() &lt;&lt; endl;

The last item of the vector is found with the last method.

vals.append(6);

The append method inserts the value at the end of the vector.

vals.prepend(0);

The prepend method inserts the value at the beginning of the
vector.

for (int val : vals) {

    out &lt;&lt; val &lt;&lt; " ";
}

We go through the vector in the for loop and print its contents.

$ ./myvector
The size of the vector is: 5
The first item is: 1
The last item is: 5
Elements: 0 1 2 3 4 5 6

## Qt5 QList

QList is a container for creating a list of elements. It is similar
to QVector. It stores a list of values and provides fast
index-based access as well as fast insertions and removals. It is one of the
most commonly used containers in Qt.

mylist.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QList&gt;
#include &lt;algorithm&gt;

int main(void) {

    QTextStream out(stdout);

    QList&lt;QString&gt; authors = {"Balzac", "Tolstoy",
        "Gulbranssen", "London"};

    for (int i=0; i &lt; authors.size(); ++i) {

        out &lt;&lt; authors.at(i) &lt;&lt; endl;
    }

    authors &lt;&lt; "Galsworthy" &lt;&lt; "Sienkiewicz";

    out &lt;&lt; "***********************" &lt;&lt; endl;

    std::sort(authors.begin(), authors.end());

    out &lt;&lt; "Sorted:" &lt;&lt; endl;
    for (QString author : authors) {

        out &lt;&lt; author &lt;&lt; endl;
    }

    return 0;
}

The example presents the QList container.

QList&lt;QString&gt; authors = {"Balzac", "Tolstoy",
    "Gulbranssen", "London"};

A QList container is created. It stores the names of writers.

for (int i=0; i &lt; authors.size(); ++i) {

    out &lt;&lt; authors.at(i) &lt;&lt; endl;
}

In a for loop, we go through the container and print its elements. The
at method returns the item at the given index.

authors &lt;&lt; "Galsworthy" &lt;&lt; "Sienkiewicz";

The &lt;&lt; operator is used to insert two new items into the list.

std::sort(authors.begin(), authors.end());

The std::sort method sorts the list in ascending order.

out &lt;&lt; "Sorted:" &lt;&lt; endl;
for (QString author : authors) {

    out &lt;&lt; author &lt;&lt; endl;
}

Now we print the sorted list.

$ ./mylist
Balzac
Tolstoy
Gulbranssen
London
***********************
Sorted:
Balzac
Galsworthy
Gulbranssen
London
Sienkiewicz
Tolstoy

## QStringList

QStringList is a convenience container that provides a list of
strings. It has fast index-based access as well as fast insertions and removals.

mystringlist.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QList&gt;

int main(void) {

    QTextStream out(stdout);

    QString string = "coin, book, cup, pencil, clock, bookmark";
    QStringList items = string.split(",");
    QStringListIterator it(items);

    while (it.hasNext()) {

        out &lt;&lt; it.next().trimmed() &lt;&lt; endl;
    }

    return 0;
}

In the example, we create a list of strings from a string and print
the elements into the console.

QString string = "coin, book, cup, pencil, clock, bookmark";
QStringList items = string.split(",");

The QString's split method cuts the string into
substrings according to the provided separator. The substrings are returned in a
list.

QStringListIterator it(items);

QStringListIterator provides a Java-style const iterator for
QStringList.

while (it.hasNext()) {

    out &lt;&lt; it.next().trimmed() &lt;&lt; endl;
}

With the created iterator, we print the elements of the list to the terminal.
The trimmed
method trims the white space in the string element.

$ ./mystringlist
coin
book
cup
pencil
clock
bookmark

## Qt5 QSet

QSet provides a single-valued mathematical set with fast lookups.
The values are stored in an unspecified order.

myset.cpp
  

#include &lt;QSet&gt;
#include &lt;QList&gt;
#include &lt;QTextStream&gt;
#include &lt;algorithm&gt;

int main(void) {

    QTextStream out(stdout);

    QSet&lt;QString&gt; cols1 = {"yellow", "red", "blue"};
    QSet&lt;QString&gt; cols2 = {"blue", "pink", "orange"};

    out &lt;&lt; "There are " &lt;&lt; cols1.size() &lt;&lt; " values in the set" &lt;&lt; endl;

    cols1.insert("brown");

    out &lt;&lt; "There are " &lt;&lt; cols1.size() &lt;&lt; " values in the set" &lt;&lt; endl;

    cols1.unite(cols2);

    out &lt;&lt; "There are " &lt;&lt; cols1.size() &lt;&lt; " values in the set" &lt;&lt; endl;

    for (QString val : cols1) {
        out &lt;&lt; val &lt;&lt; endl;
    }

    QList&lt;QString&gt; lcols = cols1.values();
    std::sort(lcols.begin(), lcols.end());

    out &lt;&lt; "*********************" &lt;&lt; endl;
    out &lt;&lt; "Sorted:" &lt;&lt; endl;

    for (QString val : lcols) {
        out &lt;&lt; val &lt;&lt; endl;
    }

   return 0;
}

The QSet is used to store colours in the example. It makes no sense
to have one colour value specified more times.

QSet&lt;QString&gt; cols1 = {"yellow", "red", "blue"};
QSet&lt;QString&gt; cols2 = {"blue", "pink", "orange"};

We have two sets of colour values. Blue colour is located in both sets.

out &lt;&lt; "There are " &lt;&lt; cols1.size() &lt;&lt; " values in the set" &lt;&lt; endl;

The size method returns the size of the set.

cols1.insert("brown");

We add a new value to a set with the insert method.

cols1.unite(cols2);

The unite method performs a union of two sets. The
cols1 set will have all items inserted from cols2 set
that are not already present; in our case, all except for the colour blue.

for (QString val : cols1) {

    out &lt;&lt; val &lt;&lt; endl;
}

With the for loop, we print all the items in the cols1 set.

QList&lt;QString&gt; lcols = cols1.values();
std::sort(lcols.begin(), lcols.end());

Sorting of a set is not supported. We can create a list out of a set and
sort it. The values method returns a new QList
containing the elements in the set. The order of the elements in the
QList is undefined.

$ ./myset
There are 3 values in the set
There are 4 values in the set
There are 6 values in the set
pink
orange
brown
blue
yellow
red
*********************
Sorted:
blue
brown
orange
pink
red
yellow

## Qt5 QMap

QMap is an associative array (dictionary) that stores key-value pairs.
It provides fast lookup of the value associated with a key.

myqmap.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QMap&gt;

int main(void) {

    QTextStream out(stdout);

    QMap&lt;QString, int&gt; items = { {"coins", 5}, {"books", 3} };

    items.insert("bottles", 7);

    QList&lt;int&gt; values = items.values();

    out &lt;&lt; "Values:" &lt;&lt; endl;

    for (int val : values) {
        out &lt;&lt; val &lt;&lt; endl;
    }

    QList&lt;QString&gt; keys = items.keys();

    out &lt;&lt; "Keys:" &lt;&lt; endl;
    for (QString key : keys) {
        out &lt;&lt; key &lt;&lt; endl;
    }

    QMapIterator&lt;QString, int&gt; it(items);

    out &lt;&lt; "Pairs:" &lt;&lt; endl;

    while (it.hasNext()) {
        it.next();
        out &lt;&lt; it.key() &lt;&lt; ": " &lt;&lt; it.value() &lt;&lt; endl;
    }

    return 0;
}

In the example, we have a dictionary where we map string keys to integer values.

QMap&lt;QString, int&gt; items = { {"coins", 5}, {"books", 3} };

A QMap is created. It has two pairs.

items.insert("bottles", 7);

A new pair is inserted with the insert method.

QList&lt;int&gt; values = items.values();

out &lt;&lt; "Values:" &lt;&lt; endl;

for (int val : values) {
    out &lt;&lt; val &lt;&lt; endl;
}

We get all the values of the dictionary and print them to the console. The
values method returns a list of map values.

QList&lt;QString&gt; keys = items.keys();

out &lt;&lt; "Keys:" &lt;&lt; endl;
for (QString key : keys) {
    out &lt;&lt; key &lt;&lt; endl;
}

Likewise, we print all the keys of the dictionary. The keys
method returns a list containing all the keys in the dictionary.

QMapIterator&lt;QString, int&gt; it(items);

QMapIterator is a Java-style iterator for a QMap.
It can be used to iterate over elements of a map.

while (it.hasNext()) {

    it.next();
    out &lt;&lt; it.key() &lt;&lt; ": " &lt;&lt; it.value() &lt;&lt; endl;
}

With the help of the iterator, we walk over all elements of the map. The
key method returns the current key and the value
method returns the current value.

$ ./myqmap
Values:
3
7
5
Keys:
books
bottles
coins
Pairs:
books: 3
bottles: 7
coins: 5

## Custom class sorting

In the following example, we are going to sort objects of a custom class
in a QList.

book.h
  

class Book {

    public:
        Book(QString, QString);
        QString getAuthor() const;
        QString getTitle() const;

    private:
        QString author;
        QString title;
};

This is the header file for our custom Book class.

book.cpp
  

#include &lt;QString&gt;
#include "book.h"

Book::Book(QString auth, QString tit) {

    author = auth;
    title = tit;
}

QString Book::getAuthor() const {

    return author;
}

QString Book::getTitle() const {

    return title;
}

This is the implementation of the Book class; we have two
accessor methods.

sortcustomclass.cpp
  

#include &lt;QTextStream&gt;
#include &lt;QList&gt;
#include &lt;algorithm&gt;
#include "book.h"

bool compareByTitle(const Book &amp;b1, const Book &amp;b2) {

  return b1.getTitle() &lt; b2.getTitle();
}

int main(void) {

    QTextStream out(stdout);

    QList&lt;Book&gt; books = {

        Book("Jack London", "The Call of the Wild"),
        Book("Honoré de Balzac", "Father Goriot"),
        Book("Leo Tolstoy", "War and Peace"),
        Book("Gustave Flaubert", "Sentimental education"),
        Book("Guy de Maupassant", "Une vie"),
        Book("William Shakespeare", "Hamlet")
    };

    std::sort(books.begin(), books.end(), compareByTitle);

    for (Book book : books) {
        out &lt;&lt; book.getAuthor() &lt;&lt; ": " &lt;&lt; book.getTitle() &lt;&lt; endl;
    }

    return 0;
}

In the example, we create a few book objects and sort them with the
std::sort algorithm.

bool compareByTitle(const Book &amp;b1, const Book &amp;b2) {

  return b1.getTitle() &lt; b2.getTitle();
}

The compareByTitle is a comparison function used by the sort
algorithm.

std::sort(books.begin(), books.end(), compareByTitle);

The std::sort algorithm sorts the books in the list by the book's
title.

$ ./sortcustomclass
Honoré de Balzac: Father Goriot
William Shakespeare: Hamlet
Gustave Flaubert: Sentimental education
Jack London: The Call of the Wild
Guy de Maupassant: Une vie
Leo Tolstoy: War and Peace

In this chapter, we have worked with Qt's containers.

[Contents](..)
[Previous](../datetime/)
[Next](../files/)