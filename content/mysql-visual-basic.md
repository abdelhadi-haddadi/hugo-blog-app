+++
title = "MySQL Visual Basic"
date = 2025-08-29T19:52:48.118+01:00
draft = false
description = "This is a Visual Basic tutorial for the MySQL database. It covers the basics of MySQL programming with Visual Basic."
image = "images/grid.png"
imageBig = "images/grid.png"
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# MySQL Visual Basic

last modified July 6, 2020 

This is a Visual Basic tutorial for the MySQL database. It covers the basics of 
MySQL programming with Visual Basic. In this tutorial, we use the 
*Connector/Net* driver. This driver is based on the ADO.NET specification.
The examples were created and tested on Ubuntu Linux. There is a similar
[MySQL C# tutorial](/db/mysqlcsharptutorial/), 
[MySQL Perl tutorial](/db/mysqlperl/) and 
[SQLite Visual Basic tutorial](/db/sqlitevb/) on ZetCode.

If you need to refresh your knowledge of the Visual Basic language, there is a full 
[Visual Basic tutorial](/lang/visualbasic/) on ZetCode. 

## About MySQL database

MySQL is a leading open source database management system. It is a multi user, 
multithreaded database management system. MySQL is especially popular on the web. 
It is one of the parts of the very popular *LAMP*
platform consisting of Linux, Apache, MySQL, and PHP. Currently MySQL is owned by Oracle.
MySQL database is available on most important OS platforms. It runs on BSD Unix, 
Linux, Windows, or Mac OS. Wikipedia and YouTube use MySQL. These sites manage 
millions of queries each day. MySQL comes in two versions: MySQL server system and MySQL
embedded system.

## Before we start

We need to install several packages to execute the examples in this tutorial:
libmysql6.1-cil, mysql-server, mysql-client. 
We need to install Visual Basic compiler from the Mono project. Either from a package 
or from sources. 

The *libmysql6.1-cil* is the MySQL database connector for CLI. It is
written in C# and is available for all CLI languages. C#, Visual Basic, 
Boo and others. 

$ ls /usr/lib/cli/MySql.Data-6.1/MySql.Data.dll 
/usr/lib/cli/MySql.Data-6.1/MySql.Data.dll

From the technical point of view, we need a DLL. On my system (Ubuntu Lucid Lynx), it
was located under the above path. We need to know the path to the DLL library.
To compile our examples. 

If you don't already have MySQL installed, we must install it. 

$ sudo apt-get install mysql-server

This command installs the MySQL server and various other packages. 
While installing the package, we are prompted to enter
a password for the MySQL root account.

Next, we are going to create a new database user and a new database. 
We use the mysql client.

$ service mysql status
mysql start/running, process 1238

We check if the MySQL server is running. If not, we need
to start the server. On Ubuntu Linux, this can be done
with the service mysql start command. 

$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 30
Server version: 5.0.67-0ubuntu6 (Ubuntu)

Type 'help;' or '\h' for help. Type '\c' to clear the buffer.

mysql&gt; SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema | 
| mysql              | 
+--------------------+
2 rows in set (0.00 sec)

We use the *mysql monitor* client application to connect to the 
server. We connect to the database using the root account. We show all available
databases with the SHOW DATABASES statement. 

mysql&gt; CREATE DATABASE testdb;
Query OK, 1 row affected (0.02 sec)

We create a new testdb database. We will use this database throughout 
the tutorial.

mysql&gt; CREATE USER 'testuser'@'localhost' IDENTIFIED BY 'test623';
Query OK, 0 rows affected (0.00 sec)

mysql&gt; USE testdb;
Database changed

mysql&gt; GRANT ALL ON testdb.* TO 'testuser'@'localhost';
Query OK, 0 rows affected (0.00 sec)

mysql&gt; quit;
Bye

We create a new database user. We grant all privileges to this user
for all tables of the testdb database. 

## Definitions

ADO.NET is an important part of the .NET framework. It is a specification
that unifies access to relational databases, XML files and other application data.
A MySQL Connector/Net is an implementation of the ADO.NET specification
for the MySQL database. It is a driver written in C# language and is available for
all .NET languages. 

The Connection, Command, DataReader, 
DataSet, and DataProvider are the core elements
of the .NET data provider model. The Connection creates a connection to 
a specific data source. The Command object executes an SQL statement
against a data source. The DataReader reads streams of data from a 
data source. The DataSet object is used for offline work with a mass
of data. It is a disconnected data representation that can hold data from 
a variety of different sources. Both DataReader and DataSet 
are used to work with data; they are used under different circumstances. If we only 
need to read the results of a query, the DataReader is the better choice. 
If we need more extensive processing of data, or we want to bind a Winforms 
control to a database table, the DataSet is preferred.

## MySQL version

If the following program runs OK, then we have everything
installed OK. We check the version of the MySQL server. 

Option Strict On

Imports MySql.Data.MySqlClient

Module Example

    Sub Main()

        Dim cs As String = "Database=testdb;Data Source=localhost;" _
            &amp; "User Id=testuser;Password=test623"

        Dim conn As New MySqlConnection(cs)

        Try
          conn.Open()
          Console.WriteLine("MySQL version : {0}", conn.ServerVersion)

        Catch ex As MySqlException
          Console.WriteLine("Error: " &amp; ex.ToString())
        Finally
          conn.Close()
        End Try

    End Sub

End Module

We connect to the database and get some info about the MySQL server.

Imports MySql.Data.MySqlClient

We import the elements of the MySQL data provider. 

Dim cs As String = "Database=testdb;Data Source=localhost;" _
    &amp; "User Id=testuser;Password=test623"

This is the connection string. It is used by the data provider
to establish a connection to the database. We specify the database
name, host, user name and password.

Dim conn As New MySqlConnection(cs)

A MySQLConnection object is created. This object is used to
open a connection to a database. 

conn.Open()

This line opens the connection. 

Console.WriteLine("MySQL version : {0}", conn.ServerVersion)

Here we print the version of MySQL using the ServerVersion
property of the connection object. 

Catch ex As MySqlException
  Console.WriteLine("Error: " &amp; ex.ToString())

In case of an exception, we print the error message to the
console. 

$ vbnc -r:/usr/lib/cli/MySql.Data-6.1/MySql.Data.dll connect.vb

We compile our example. A path to the MySQL connector DLL
is provided. 

$ ./connect.exe 
MySQL version : 5.1.41-3ubuntu12.6

This is the output of the program on my system.

 

A more complex program follows. 

Option Strict On

Imports MySql.Data.MySqlClient

Module Example

    Sub Main()
        Dim cs As String = "Database=testdb;Data Source=localhost;" _
            &amp; "User Id=testuser;Password=test623"

        Dim stm As String = "SELECT VERSION()"
        Dim version As String
        Dim conn As MySqlConnection
        
        Try
            conn = New MySqlConnection(cs)
            conn.Open()
          
            Dim cmd As MySqlCommand = New MySqlCommand(stm, conn)

            version = Convert.ToString(cmd.ExecuteScalar())
                  
            Console.WriteLine("MySQL version: {0}", version)

        Catch ex As MySqlException
            Console.WriteLine("Error: " &amp; ex.ToString())
        Finally
            conn.Close()
        End Try

   End Sub

End Module

We check for the version of the MySQL database. This time using
an SQL query. 

Dim stm As String = "SELECT VERSION()"

This is the SQL SELECT statement. It returns the version
of the database. The VERSION is a built-in MySQL function. 

Dim cmd As MySqlCommand = New MySqlCommand(stm, conn)

The MySqlCommand is an object, which is
used to execute a query on the database. The parameters are the
SQL statement and the connection object. 

version = Convert.ToString(cmd.ExecuteScalar())

There are queries which return only a scalar value. In our
case, we want a simple string specifying the version of the
database. The ExecuteScalar is 
used in such situations. We avoid the overhead of using more
complex objects. 

$ ./connect2.exe 
MySQL version : 5.1.41-3ubuntu12.6

Same result as in the previous example.

## Creating and populating tables

Next we are going to create database tables and fill them
with data. These tables will be used throughout this tutorial.  

DROP TABLE IF EXISTS Books, Authors;

CREATE TABLE IF NOT EXISTS Authors(Id INT PRIMARY KEY AUTO_INCREMENT, 
    Name VARCHAR(25)) ENGINE=INNODB;

INSERT INTO Authors(Id, Name) VALUES(1, 'Jack London');
INSERT INTO Authors(Id, Name) VALUES(2, 'Honore de Balzac');
INSERT INTO Authors(Id, Name) VALUES(3, 'Lion Feuchtwanger');
INSERT INTO Authors(Id, Name) VALUES(4, 'Emile Zola');
INSERT INTO Authors(Id, Name) VALUES(5, 'Truman Capote');

CREATE TABLE IF NOT EXISTS Books(Id INT PRIMARY KEY AUTO_INCREMENT, 
    AuthorId INT, Title VARCHAR(100), 
    FOREIGN KEY(AuthorId) REFERENCES Authors(Id) ON DELETE CASCADE)
    ENGINE=INNODB;

INSERT INTO Books(Id, AuthorId, Title) VALUES(1, 1, 'Call of the Wild');
INSERT INTO Books(Id, AuthorId, Title) VALUES(2, 1, 'Martin Eden');
INSERT INTO Books(Id, AuthorId, Title) VALUES(3, 2, 'Old Goriot');
INSERT INTO Books(Id, AuthorId, Title) VALUES(4, 2, 'Cousin Bette');
INSERT INTO Books(Id, AuthorId, Title) VALUES(5, 3, 'Jew Suess');
INSERT INTO Books(Id, AuthorId, Title) VALUES(6, 4, 'Nana');
INSERT INTO Books(Id, AuthorId, Title) VALUES(7, 4, 'The Belly of Paris');
INSERT INTO Books(Id, AuthorId, Title) VALUES(8, 5, 'In Cold blood');
INSERT INTO Books(Id, AuthorId, Title) VALUES(9, 5, 'Breakfast at Tiffany');

We have a books.sql file. It creates two database tables: Authors, 
and Books. The tables are of InnoDB type. InnoDB databases support 
foreign key constraints and transactions. We place a foreign key constraint on the 
AuthorId column of the Books table. We fill the tables 
with initial data. 

mysql&gt; source books.sql
Query OK, 0 rows affected (0.07 sec)
Query OK, 0 rows affected (0.12 sec)
Query OK, 1 row affected (0.04 sec)
...

We use the source command to execute the books.sql script.

In the following example, we are going to insert a new author
into the Authors table. 

Option Strict On

Imports MySql.Data.MySqlClient

Module Example

   Sub Main()
      Dim connString As String = "Database=testdb;Data Source=localhost;" _
          &amp; "User Id=testuser;Password=test623"

      Dim conn As New MySqlConnection(connString)
      Dim cmd As New MySqlCommand()

      Try
        conn.Open()
        cmd.Connection = conn

        cmd.CommandText = "INSERT INTO Authors(Name) VALUES(@Name)"
        cmd.Prepare()

        cmd.Parameters.AddWithValue("@Name", "Trygve Gulbranssen")
        cmd.ExecuteNonQuery()

        conn.Close()

      Catch ex As MySqlException
          Console.WriteLine("Error: " &amp; ex.ToString())
      End Try

   End Sub

End Module

We add a new author to the Authors table. We use a parameterized command.

cmd.CommandText = "INSERT INTO Authors(Name) VALUES(@Name)"
cmd.Prepare()

Here we create a prepared statement. When we write prepared statements, we use 
placeholders instead of directly writing the values into the statements. 
Prepared statements are faster and guard against SQL injection attacks. 
The @Name is a placeholder, which is going to be filled later. 

cmd.Parameters.AddWithValue("@Name", "Trygve Gulbranssen")

A value is bound to the placeholder. 

cmd.ExecuteNonQuery()

The prepared statement is executed. We use the ExecuteNonQuery
method of the MySQLCommand object when we don't expect any data to 
be returned. This is when we create databases or execute INSERT, 
UPDATE, DELETE statements. 

$ ./prepared.exe 
mysql&gt; select * from Authors;
+----+--------------------+
| Id | Name               |
+----+--------------------+
|  1 | Jack London        |
|  2 | Honore de Balzac   |
|  3 | Lion Feuchtwanger  |
|  4 | Emile Zola         |
|  5 | Truman Capote      |
|  6 | Trygve Gulbranssen |
+----+--------------------+
6 rows in set (0.00 sec)

We have a new author inserted into the table. 

## Retrieving data with MySqlDataReader

The MySqlDataReader is an object used
to retrieve data from the database. It provides fast, forward-only, 
read-only access to query results. It is the most efficient way
to retrieve data from tables. 

Option Strict On

Imports MySql.Data.MySqlClient

Module Example

    Sub Main()

        Dim cs As String = "Database=testdb;Data Source=localhost;" _
            &amp; "User Id=testuser;Password=test623"

        Dim conn As New MySqlConnection(cs)

        Try
            conn.Open()
            Dim stm As String = "SELECT * FROM Authors"
            Dim cmd As MySqlCommand = New MySqlCommand(stm, conn)
            Dim reader As MySqlDataReader = cmd.ExecuteReader()

            While reader.Read()
                Console.WriteLine(reader.GetInt32(0) &amp; ": " _ 
                    &amp; reader.GetString(1))
            End While

            reader.Close()

        Catch ex As MySqlException
          Console.WriteLine("Error: " &amp; ex.ToString())
        Finally
          conn.Close()
        End Try

    End Sub

End Module

We get all authors from the Authors table and print 
them to the console. 

Dim reader As MySqlDataReader = cmd.ExecuteReader()

To create a MySQLDataReader, we must call 
the ExecuteReader method of the 
MySqlCommand object.

While reader.Read()
    Console.WriteLine(reader.GetInt32(0) &amp; ": " _ 
        &amp; reader.GetString(1))
End While

The Read method advances the data reader to the next record.
It returns true if there are more rows; otherwise false. We can retrieve 
the value using the array index notation, or use a specific method to access 
column values in their native data types. The latter is more efficient. 

reader.Close()

Always call the Close method when done reading.

$ ./read.exe 
1: Jack London
2: Honore de Balzac
3: Lion Feuchtwanger
4: Emile Zola
5: Truman Capote
6: Trygve Gulbranssen

This is the output of the example. 

## Column headers

Next we will show, how to print column headers with the data
from the database table.

Option Strict On

Imports MySql.Data.MySqlClient

Module Example

   Sub Main()
      Dim connString As String = "Database=testdb;Data Source=localhost;" _
          &amp; "User Id=testuser;Password=test623"

      Dim conn As New MySqlConnection(connString)

      Try
          conn.Open()

          Dim stm As String = "SELECT Name, Title From Authors, " _
              &amp; "Books WHERE Authors.Id=Books.AuthorId"

          Dim cmd As MySqlCommand = New MySqlCommand(stm, conn)
          Dim reader As MySqlDataReader = cmd.ExecuteReader()

          Console.WriteLine("{0} {1}", reader.GetName(0), _
              reader.GetName(1).PadLeft(18))

          While reader.Read()
              Console.WriteLine(reader.GetString(0).PadRight(18) _ 
                  &amp; reader.GetString(1))
          End While

          reader.Close()

      Catch ex As MySqlException
         Console.WriteLine("Error: " &amp; ex.ToString())
      Finally
         conn.Close()
      End Try

   End Sub

End Module

In this program, we select authors from the Authors table
and their books from the Books table. 

Dim stm As String = "SELECT Name, Title From Authors, " _
    &amp; "Books WHERE Authors.Id=Books.AuthorId"

This is the SQL statement which joins authors with their
books. 

Dim reader As MySqlDataReader = cmd.ExecuteReader()

We create a MySqlDataReader object. 

Console.WriteLine("{0} {1}", reader.GetName(0), _
    reader.GetName(1).PadLeft(18))

We get the names of the columns with the GetName 
method of the reader. The PadLeft method returns 
a new string of a specified length in which the beginning of the current string
is padded with spaces. We use this method to align strings properly.

While reader.Read()
    Console.WriteLine(reader.GetString(0).PadRight(18) _ 
        &amp; reader.GetString(1))
End While

We print the data that was returned by the SQL statement
to the terminal. 

$ ./columns.exe 
Name              Title
Jack London       Call of the Wild
Jack London       Martin Eden
Honore de Balzac  Old Goriot
Honore de Balzac  Cousin Bette
Lion Feuchtwanger Jew Suess
Emile Zola        Nana
Emile Zola        The Belly of Paris
Truman Capote     In Cold blood
Truman Capote     Breakfast at Tiffany

Ouput of the program. 

## DataSet &amp; MySqlDataAdapter

A DataSet is a copy of the data and
the relations among the data from the database tables. It is created
in memory and used when extensive processing on data is needed or 
when we bind data tables to a Winforms control. When the processing is
done, the changes are written to the data source. A MySqlDataAdapter 
is an intermediary between the DataSet and the data source. It 
populates a DataSet and resolves updates with the data source.

Option Strict On

Imports System.Data
Imports MySql.Data.MySqlClient

Module Example

    Sub Main()

        Dim cs As String = "Database=testdb;Data Source=localhost;" _
            &amp; "User Id=testuser;Password=test623"

        Dim conn As New MySqlConnection(cs)
    
        Dim stm As String = "SELECT * FROM Authors"

        Try
            conn.Open()

            Dim da As New MySqlDataAdapter(stm, conn)

            Dim ds As New DataSet
            da.Fill(ds, "Authors")

            Dim dt As DataTable = ds.Tables("Authors")

            dt.WriteXml("authors.xml")

            For Each row As DataRow In dt.Rows
                For Each col As DataColumn In dt.Columns
                  Console.WriteLine(row(col))
                Next
                 Console.WriteLine("".PadLeft(20, "="))
            Next

        Catch ex As MySqlException
          Console.WriteLine("Error: " &amp; ex.ToString())
        Finally
          conn.Close()
        End Try

    End Sub

End Module 

We print the authors from the Authors table. This time, we use
the MySqlDataAdapter and DataSet
objects. 

Dim da As New MySqlDataAdapter(stm, conn)

A MySqlDataAdapter object is created. It takes an SQL 
statement and a connection as parameters. 

Dim ds As New DataSet
da.Fill(ds, "Authors")

We create and fill the DataSet.

Dim dt As DataTable = ds.Tables("Authors")

We get the table called Authors. We have given a 
DataSet only one table, but it can contain multiple tables.

dt.WriteXml("authors.xml")

We write the data to an XML file. 

For Each row As DataRow In dt.Rows
    For Each col As DataColumn In dt.Columns
      Console.WriteLine(row(col))
    Next
      Console.WriteLine("".PadLeft(20, "="))
Next

We display the contents of the Authors table to the
terminal. To traverse the data, we utilize the rows and
columns of the DataTable object. 

In the next example, we are going to bind a table to 
a Winforms DataGrid control.

Option Strict On

Imports System.Windows.Forms
Imports System.Drawing
Imports System.Data
Imports MySql.Data.MySqlClient

Public Class WinVBApp
    Inherits Form

    Private dg As DataGrid
    Private da As MySqlDataAdapter
    Private ds As DataSet

    Public Sub New()

       Me.Text = "DataGrid"
       Me.Size = New Size(350, 300)
       
       Me.InitUI()
       Me.InitData()
       
       Me.CenterToScreen()

    End Sub
    
    Private Sub InitUI()
    
        dg = New DataGrid

        dg.CaptionBackColor = System.Drawing.Color.White
        dg.CaptionForeColor = System.Drawing.Color.Black
        dg.CaptionText = "Authors"

        dg.Location = New Point(8, 0)
        dg.Size = New Size(350, 300)
        dg.TabIndex = 0
        dg.Parent = Me
        
    End Sub

    Private Sub InitData()
        
        Dim cs As String = "Database=testdb;Data Source=localhost;" _
            &amp; "User Id=testuser;Password=test623"

        Dim conn As New MySqlConnection(cs)
    
        Dim stm As String = "SELECT * FROM Authors"
        ds = New DataSet

        Try
            conn.Open()

            da = New MySqlDataAdapter(stm, conn)
            da.Fill(ds, "Authors")

            dg.DataSource = ds.Tables("Authors")

        Catch ex As MySqlException
          Console.WriteLine("Error: " &amp; ex.ToString())
        Finally
          conn.Close()
        End Try

    End Sub

    Public Shared Sub Main()
        Application.Run(New WinVBApp)
    End Sub

End Class

In this example, we bind a Authors table to a Winforms
DataGrid control.

Imports System.Windows.Forms
Imports System.Drawing

These two namespaces are for the GUI. 

Me.InitUI()
Me.InitData()

Inside the InitUI method, we build the user interface. 
In the InitData method, we connect to the database, 
retrieve the data into the DataSet and bind it to the 
DataGrid control. 

dg = New DataGrid

The DataGrid control is created. 

Dim stm As String = "SELECT * FROM Authors"

We will display the data from the Authors table in the 
DataGrid control.

dg.DataSource = ds.Tables("Authors")

We bind the DataSource property of the DataGrid 
control to the chosen table. 

vbnc -r:/usr/lib/mono/2.0/System.Windows.Forms.dll 
    -r:/usr/lib/cli/MySql.Data-6.1/MySql.Data.dll grid.vb

To compile the example, we must include two DLLs. The DLL for the Winforms and the DLL
for the MySQL connector. 

![grid.png](images/grid.png)

Figure: DataGrid

## Transaction support

A transaction is an atomic unit of database operations 
against the data in one or more databases. The effects of all the SQL 
statements in a transaction can be either all committed to the database 
or all rolled back.

The MySQL database has different types of storage engines. The most common 
are the MyISAM and the InnoDB engines. The MyISAM is the default one. There 
is a trade-off between data security and database speed. The MyISAM tables are 
faster to process and they do not support transactions. On the other hand, the 
InnoDB tables are more safe against the data loss. They support transactions. 
They are slower to process. 

Option Strict On

Imports MySql.Data.MySqlClient

Module Example

   Sub Main()
      Dim cs As String = "Database=testdb;Data Source=localhost;" _
          &amp; "User Id=testuser;Password=test623"

      Dim conn As New MySqlConnection(cs)
      Dim cmd As New MySqlCommand()

      Dim tr As MySqlTransaction 

      Try
        conn.Open()
        tr = conn.BeginTransaction()

        cmd.Connection = conn
        cmd.Transaction = tr

        cmd.CommandText = "UPDATE Authors SET Name = 'Leo Tolstoy' WHERE Id = 1"
        cmd.ExecuteNonQuery()
        cmd.CommandText = "UPDATE Books SET Title = 'War and Peace' WHERE Id = 1"
        cmd.ExecuteNonQuery()
        cmd.CommandText = "UPDATE Books SET Titl = 'Anna Karenina' WHERE Id = 2"
        cmd.ExecuteNonQuery()

        tr.Commit()
        conn.Close()

      Catch ex As MySqlException
          tr.Rollback()
          Console.WriteLine("Error: " &amp; ex.ToString())
      End Try

   End Sub

End Module

In this program, we want to change the name of the author
on the first row of the Authors table. We must also change the
books associated with this author. A good example where a 
transaction is necessary. If we change the author and do not
change the author's books, the data is corrupted. 

Dim tr As MySqlTransaction 

The MySqlTransaction is an object
for working with transactions. 

tr = conn.BeginTransaction()

We begin a transaction.

cmd.CommandText = "UPDATE Books SET Titl = 'Anna Karenina' WHERE Id = 2"
cmd.ExecuteNonQuery()

The third SQL statement has an error. There is no Titl column in the
table. 

tr.Commit()

If there is no exception, the transaction is committed.

Catch ex As MySqlException
    tr.Rollback()
    Console.WriteLine("Error: " &amp; ex.ToString())

In case of an exception, the transaction is rolled back. 
No changes are committed to the database. 

$ ./transaction.exe 
Error: MySql.Data.MySqlClient.MySqlException: Unknown column 'Titl' in 'field list'
  at MySql.Data.MySqlClient.MySqlStream.ReadPacket () [0x00000] 
  at MySql.Data.MySqlClient.NativeDriver.ReadResult () [0x00000]

mysql&gt; SELECT Name, Title From Authors, Books WHERE Authors.Id=Books.AuthorId;
+-------------------+----------------------+
| Name              | Title                |
+-------------------+----------------------+
| Jack London       | Call of the Wild     |
| Jack London       | Martin Eden          |
| Honore de Balzac  | Old Goriot           |
| Honore de Balzac  | Cousin Bette         |
| Lion Feuchtwanger | Jew Suess            |
| Emile Zola        | Nana                 |
| Emile Zola        | The Belly of Paris   |
| Truman Capote     | In Cold blood        |
| Truman Capote     | Breakfast at Tiffany |
+-------------------+----------------------+
9 rows in set (0.00 sec)

An exception was thrown. The transaction was rolled back and
no changes took place. 

 

However, without a transaction, the data is not safe.

Option Strict On

Imports MySql.Data.MySqlClient

Module Example

   Sub Main()
      Dim cs As String = "Database=testdb;Data Source=localhost;" _
          &amp; "User Id=testuser;Password=test623"

      Dim conn As New MySqlConnection(cs)
      Dim cmd As New MySqlCommand()

      Try
        conn.Open()

        cmd.Connection = conn

        cmd.CommandText = "UPDATE Authors SET Name = 'Leo Tolstoy' WHERE Id = 1"
        cmd.ExecuteNonQuery()
        cmd.CommandText = "UPDATE Books SET Title = 'War and Peace' WHERE Id = 1"
        cmd.ExecuteNonQuery()
        cmd.CommandText = "UPDATE Books SET Titl = 'Anna Karenina' WHERE Id = 2"
        cmd.ExecuteNonQuery()

        conn.Close()

      Catch ex As MySqlException
          Console.WriteLine("Error: " &amp; ex.ToString())
      End Try

   End Sub

End Module

We have the same example. This time, without the transaction support. 

$ ./update.exe 
Error: MySql.Data.MySqlClient.MySqlException: Unknown column 'Titl' in 'field list'
  at MySql.Data.MySqlClient.MySqlStream.ReadPacket () [0x00000] 
  at MySql.Data.MySqlClient.NativeDriver.ReadResult () [0x00000] 

mysql&gt; SELECT Name, Title From Authors, Books WHERE Authors.Id=Books.AuthorId;
+-------------------+----------------------+
| Name              | Title                |
+-------------------+----------------------+
| Leo Tolstoy       | War and Peace        |
| Leo Tolstoy       | Martin Eden          |
| Honore de Balzac  | Old Goriot           |
| Honore de Balzac  | Cousin Bette         |
| Lion Feuchtwanger | Jew Suess            |
| Emile Zola        | Nana                 |
| Emile Zola        | The Belly of Paris   |
| Truman Capote     | In Cold blood        |
| Truman Capote     | Breakfast at Tiffany |
+-------------------+----------------------+
9 rows in set (0.00 sec)

An exception is thrown again. Leo Tolstoy
did not write Martin Eden. The data is corrupted. 

This was the MySQL Visual Basic tutorial, with MySQL Connector. You might be also interested in 
[MySQL C API tutorial](/db/mysqlc/),
[PyMySQL tutorial](/python/pymysql) or 
[PHP mysqli tutorial](/php/mysqli).