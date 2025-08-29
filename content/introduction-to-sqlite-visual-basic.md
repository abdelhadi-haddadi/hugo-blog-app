+++
title = "Introduction to SQLite Visual Basic"
date = 2025-08-29T19:53:01.495+01:00
draft = false
description = "This is an introductory chapter of the SQLite Visual Basic tutorial. It provides some basic definitions, prerequisites and first working examples."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../read/)

# Introduction to SQLite Visual Basic

last modified July 6, 2020 

In the first chapter of the SQLite Visual Basic tutorial, we will provide
necessary definitions. We will show, how to install Mono &amp; Visual Basic.
All the examples in this tutorial will be run on Mono. Later we create 
the first working examples.

## About SQLite database

SQLite is an embedded relational database engine. Its developers call it a 
self-contained, serverless, zero-configuration and transactional SQL database 
engine. It is very popular and there are hundreds of millions copies worldwide 
in use today. SQLite is used in Solaris 10 and Mac OS operating systems, iPhone 
or Skype. Qt4 library has a buit-in support for the SQLite as well as the Python 
or the PHP language. Many popular applications use SQLite internally such as 
Firefox or Amarok.

$ sudo apt-get install sqlite3

We need to install sqlite3 library if it is not installed already.

The SQLite comes with the sqlite3 command line utility. It can be used to
issue SQL commands against a database. Now we are going to use the 
sqlite3 command line tool to create a new database. 

$ sqlite3 test.db
SQLite version 3.6.22
Enter ".help" for instructions
Enter SQL statements terminated with a ";"

We provide a parameter to the sqlite3 tool. The test.db 
is a database name. It is a single file on our disk. If it is present, 
it is opened. If not, it is created. 

sqlite&gt; .tables
sqlite&gt; .exit
$ ls
test.db

The .tables command gives a list of tables in the test.db
database. There are currently no tables. The .exit command
terminates the interactive session of the sqlite3 command 
line tool. The ls Unix command shows the contents of the current 
working directory. We can see the test.db file. All data will 
be stored in this single file.

## Mono

Mono is an open source implementation of Microsoft's .NET Framework based 
on the ECMA standards for C# and the Common Language Runtime. We need
to have Mono installed in order to compile and run the examples, in this
tutorial.

Mono can be installed from the packages of our Linux distribution or we
can install Mono from sources to get more up-to-date version.

$ bunzip2 mono-2.10.8.tar.bz2
$ tar -xf mono-2.10.8.tar
$ cd mono-2.10.8/
$ ./configure
$ make
$ sudo make install

We download the mono-2.10.8.tar.bz2 tarball from the Mono 
website. We uncompress it, build it and install the libraries. 
We install the Mono runtime, C# language and the SQLite .NET data adapter 
among others. 

$ bunzip2 libgdiplus-2.10.9.tar.bz2 
$ tar -xf libgdiplus-2.10.9.tar 
$ cd libgdiplus-2.10.9/
$ ./configure
$ make
$ sudo make install

For the example with the Winforms control, we need also the libgdiplus 
library. It is located in a separate file. We build and install it. 

$ sudo ldconfig
$ ldconfig -p | grep libgdiplus
        libgdiplus.so.0 (libc6) =&gt; /usr/local/lib/libgdiplus.so.0
        libgdiplus.so (libc6) =&gt; /usr/local/lib/libgdiplus.so

We also run the ldconfig tool to update the database of 
dynamic libraries. The ldconfig scans a running system and 
sets up the symbolic links that are used to load shared libraries.

The Mono.Data.Sqlite assembly contains an ADO.NET data provider 
for the SQLite database. It is written in C# and is available for all CLI 
languages, including C#, Visual Basic, and Boo. 

$ ls /usr/local/lib/mono/4.0/Mono.Data.Sqlite.dll 
/usr/local/lib/mono/4.0/Mono.Data.Sqlite.dll

From the technical point of view, we need a DLL. On our system, it
was located under the above path. (In fact the above link is a soft link to 
the DLL, which is located in a gac subdirectory.) 

## Visual Basic

Visual Basic is a modern, high-level, general-purpose, object-based programming language. 
It is the second most important language of the .NET framework. The main design
goal of the language was to create an easy to use and learn programming language. 
It was derived from the classic BASIC language. Mono brings Visual Basic to the
Unix platform. It has a Visual Basic compiler in a separate package. 

$ bunzip2 mono-basic-2.10.tar.bz2
$ tar xvf mono-basic-2.10.tar
$ cd mono-basic-2.10/

We download the sources from the Mono project website. We upack the file
and go into the newly created subdirectory. 

$ ./configure
$ make
$ sudo make install

We build &amp; install the compiler. 

$ ls /usr/local/bin/vbnc*
/usr/local/bin/vbnc  /usr/local/bin/vbnc2

The compiler is called vbnc and is located in the /usr/local/lib/bin
directory by default. 

## ADO.NET

ADO.NET is an important part of the .NET framework. It is a specification
that unifies access to relational databases, XML files and other application data.
From the programmer's point of view it is a set of libraries 
and classes to work with database and other data sources.
A Mono.Data.SQLite is an implementation of the ADO.NET specification
for the SQLite database. It is a driver written in C# language and is available for
all .NET languages. 

SqliteConnection, SqliteCommand, SqliteDataReader, 
SqliteDataAdapter are the core elements of the .NET data provider model. 
The SqliteConnection creates a connection to a specific data source. 
The SqliteCommand object executes an SQL statement against a data source. 
The SqliteDataReader reads streams of data from a  data source. 
A SqliteDataAdapter is an intermediary between the DataSet and 
the data source. It populates a DataSet and resolves 
updates with the data source.

The DataSet object is used for offline work with a mass of data. It is a 
disconnected data representation that can hold data from a variety of different 
sources. Both SqliteDataReader and DataSet are used to 
work with data; they are used under different circumstances. If we only need to 
read the results of a query, the SqliteDataReader is the better choice. 
If we need more extensive processing of data, or we want to bind a Winforms control 
to a database table, the DataSet is preferred.

## SQLite version

If the first program, we check the version of the SQLite database. 

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim con As SqliteConnection
        Dim cmd As SqliteCommand
        
        Try            
            Dim cs As String = "Data Source=:memory:"
            con = New SqliteConnection(cs)
            con.Open()
        
            Dim stm As String = "SELECT SQLITE_VERSION()"
            cmd = New SqliteCommand(stm, con)
            
            Dim version As String = Convert.ToString(cmd.ExecuteScalar())

            Console.WriteLine("SQLite version : {0}", version)

        Catch ex As SqliteException

            Console.WriteLine("Error: " &amp; ex.ToString())

        Finally

            If cmd IsNot Nothing
                cmd.Dispose()
            End If

            If con IsNot Nothing

                Try
                    con.Close()
                Catch ex As SqliteException
                    Console.WriteLine("Failed closing connection")
                    Console.WriteLine("Error: " &amp; ex.ToString())
                Finally
                    con.Close()
                    con.Dispose()
                End Try

            End If

        End Try

    End Sub

End Module

We connect to an in-memory database and select the SQLite version.

Imports Mono.Data.Sqlite

The Mono.Data.SqliteClient assembly contains an ADO.NET 
data provider for the SQLite database engine. We import the elements 
of the SQLite data provider. 

Dim con As SqliteConnection
Dim cmd As SqliteCommand

We declare two variables. They are placed before the Try 
keyword, since we will later call Dispose, and 
Close method on them.

Dim cs As String = "Data Source=:memory:"

This is the connection string. It is used by the data provider
to establish a connection to the database. We create an in-memory
database.

con = New SqliteConnection(cs)

A SqliteConnection object is created. This object is used to
open a connection to a database. 

con.Open()

This line opens the database connection. 

Dim stm As String = "SELECT SQLITE_VERSION()"

This is the SQL SELECT statement. It returns the version 
of the database. The SQLITE_VERSION is a built-in 
SQLite function.

Dim cmd As New SqliteCommand(stm, con)

The SqliteCommand is an object, which is used to execute a 
query on the database. The parameters are the SQL statement and the 
connection object.

Dim version As String = Convert.ToString(cmd.ExecuteScalar())

There are queries which return only a scalar value. In our case, we want a simple 
string specifying the version of the database. The ExecuteScalar is 
used in such situations. We avoid the overhead of using more complex objects.

Console.WriteLine("SQLite version : {0}", version)

The version of the database is printed to the console.

Catch ex As SqliteException

    Console.WriteLine("Error: " &amp; ex.ToString())

In case of an exception, we print the error message to the
console. 

Finally

    If cmd IsNot Nothing
        cmd.Dispose()
    End If

The SqliteCommand class implements the IDisposable
interface. Therefore it must be explicitly disposed in the Finally
block. 

If con IsNot Nothing

    Try
        con.Close()
    Catch ex As SqliteException
        Console.WriteLine("Failed closing connection")
        Console.WriteLine("Error: " &amp; ex.ToString())
    Finally
        con.Close()
        con.Dispose()
    End Try

End If

Closing connection may throw another exception. We handle this
situation. (Although this situation is more likely to occur in
server based databases like MySQL or PostgreSQL.)

$ vbnc version.vb -r:Mono.Data.Sqlite.dll

We compile our example. A path to the SQLite data provider DLL
is provided. 

$ mono version.exe 
SQLite version : 3.7.7

This is the output of the program on our system.

## The Using statement

The Visual Basic language implements garbage collection. It is a process of automatic
release of objects that are no longer required. The process is non-deterministic.
We cannot be sure when the CLR (Common Language Runtime) decides to release
resources. For limited resources such as file handles or network connections 
it is best to release them as quickly as possible. With the Using statement, 
the programmer controls when the resource is to be released. When the program is
out of the Using block, either reaches the end of it or an exception is thrown,
the resource gets released. 

Internally, the Using statement is translated into Try, 
Finally blocks with a Dispose call in the Finally 
block. Note that you might prefer to use Try, Catch,
Finally blocks instead of the Using statement. Especially, if you want 
to utilize the Catch block explicitly. In this tutorial we have chosen 
the Using statement.

As a rule, when we use an IDisposable object, we should declare and 
instantiate it in a Using statement. (Or call Dispose in the 
Finally block.) In the case of the SQLite ADO.NET driver, we use the 
Using statement for the SqliteConnection, SqliteCommand, 
SqliteDataReader, SqliteCommandBuilder, and 
SqliteDataAdapter classes. We do not have to use it for DataSet. 
or DataTable classes. They can be left for the garbage collector. 

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)

                cmd.CommandText = "SELECT SQLITE_VERSION()"

                Dim version As String = Convert.ToString(cmd.ExecuteScalar())
                Console.WriteLine("SQLite version : {0}", version)
        
            End Using

            con.Close()

        End Using
        
    End Sub

End Module

We have the same example. This time we implement the Using keyword. 

Using con As New SqliteConnection(cs)

    con.Open()

    Using cmd As New SqliteCommand(con)

Both SqliteConnection and SqliteCommand implement 
the IDisposable interface. Therefore they are wrapped with 
the Using keyword. 

## Creating and populating a table

Next we are going to create a database table and fill it
with data.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)

                cmd.CommandText = "DROP TABLE IF EXISTS Cars"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "CREATE TABLE Cars(Id INTEGER PRIMARY KEY," _
                   &amp; "Name TEXT, Price INT)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Cars VALUES(1,'Audi',52642)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Cars VALUES(2,'Mercedes',57127)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Cars VALUES(3,'Skoda',9000)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Cars VALUES(4,'Volvo',29000)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Cars VALUES(5,'Bentley',350000)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Cars VALUES(6,'Citroen',21000)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Cars VALUES(7,'Hummer',41400)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Cars VALUES(8,'Volkswagen',21600)"
                cmd.ExecuteNonQuery()
        
            End Using

            con.Close()

        End Using
        
    End Sub

End Module

In the above code example, we create a Cars table with 8 rows.

cmd.CommandText = "DROP TABLE IF EXISTS Cars"
cmd.ExecuteNonQuery()

First we drop the table if it already exists. We can use the 
ExecuteNonQuery method if we do not want a 
result set. For example for DROP, INSERT, 
or DELETE statements.

cmd.CommandText = "CREATE TABLE Cars(Id INTEGER PRIMARY KEY," _
    &amp; "Name TEXT, Price INT)"
cmd.ExecuteNonQuery()

A Cars table is created. The INTEGER PRIMARY KEY 
column is autoincremented in SQLite. 

cmd.CommandText = "INSERT INTO Cars VALUES(1,'Audi',52642)"
cmd.ExecuteNonQuery()
cmd.CommandText = "INSERT INTO Cars VALUES(2,'Mercedes',57127)"
cmd.ExecuteNonQuery()

We insert two rows into the table.

sqlite&gt; .mode column  
sqlite&gt; .headers on

In the sqlite3 command line tool we modify the 
way the data is displayed in the console. We use the column mode 
and turn on the headers.

sqlite&gt; SELECT * FROM Cars;
Id          Name        Price     
----------  ----------  ----------
1           Audi        52642     
2           Mercedes    57127     
3           Skoda       9000      
4           Volvo       29000     
5           Bentley     350000    
6           Citroen     21000     
7           Hummer      41400     
8           Volkswagen  21600    

We verify the data. The Cars table was successfully created.

## Prepared statements

Now we will concern ourselves with prepared statements. 
When we write prepared statements, we use placeholders instead 
of directly writing the values into the statements. 
Prepared statements increase security and performance.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)

                cmd.CommandText = "INSERT INTO Cars(Name, Price) VALUES(@Name, @Price)"
                cmd.Prepare()
                
                cmd.Parameters.AddWithValue("@Name", "BMW")
                cmd.Parameters.AddWithValue("@Price", 36600)
                cmd.ExecuteNonQuery()
        
            End Using

            con.Close()

        End Using
        
    End Sub

End Module

We add a row to the Cars table. We use a parameterized command.

cmd.CommandText = "INSERT INTO Cars(Name, Price) VALUES(@Name, @Price)"
cmd.Prepare()

Here we create a prepared statement. When we write prepared statements, we use 
placeholders instead of directly writing the values into the statements. 
Prepared statements are faster and guard against SQL injection attacks. 
The @Name and @Price are placeholders, which are 
going to be filled later. 

cmd.Parameters.AddWithValue("@Name", "BMW")
cmd.Parameters.AddWithValue("@Price", 36600)

Values are bound to the placeholders. 

cmd.ExecuteNonQuery()

The prepared statement is executed. We use the ExecuteNonQuery
method of the SqliteCommand object when we do not expect any 
data to be returned. 

$ mono prepared.exe 

sqlite&gt; SELECT * FROM Cars;
Id          Name        Price     
----------  ----------  ----------
1           Audi        52642     
2           Mercedes    57127     
3           Skoda       9000      
4           Volvo       29000     
5           Bentley     350000    
6           Citroen     21000     
7           Hummer      41400     
8           Volkswagen  21600     
9           BMW         36600  

We have a new car inserted into the table. 

## Sources

The MSDN (Microsoft Developer Network) was consulted to create this tutorial.
Several definitions come from this website. 

This was an introductory chapter to SQLite Visual Basic tutorial.  

[Contents](..)
[Next](../read/)