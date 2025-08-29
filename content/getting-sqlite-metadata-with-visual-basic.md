+++
title = "Getting SQLite metadata with Visual Basic"
date = 2025-08-29T19:53:02.783+01:00
draft = false
description = "In this part of the SQLite Visual Basic tutorial, we work with database metadata."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../images/)
[Next](../trans/)

# Getting SQLite metadata with Visual Basic

last modified July 6, 2020 

Metadata is information about the data in the database. 
Metadata in SQLite contains information about the tables 
and columns, in which we store data. Number of rows affected 
by an SQL statement is metadata. Number of rows and columns returned 
in a result set belong to metadata as well.

Metadata in SQLite can be obtained using the PRAGMA command. 
SQLite objects may have attributes, which are metadata. Finally, 
we can also obtain specific metatada from querying the SQLite 
system sqlite_master table.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"
        Dim nrows As String

        Try 
            Console.Write("Enter rows to fetch: ")
            nrows = Console.ReadLine()
        Catch e As FormatException
            Console.WriteLine(e.ToString())
        End Try

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)
            
                cmd.CommandText = "SELECT * FROM Cars LIMIT @Id"
                cmd.Prepare()

                cmd.Parameters.AddWithValue("@Id", Int32.Parse(nrows))

                Dim cols As Integer = 0
                Dim rows As Integer = 0

                Dim rdr As SqliteDataReader = cmd.ExecuteReader()

                Using rdr

                    cols = rdr.FieldCount
                    rows = 0

                    While rdr.Read()                    
                        rows += 1
                    End While

                    Console.WriteLine("The query fetched {0} rows", rows)
                    Console.WriteLine("Each row has {0} cols", cols)
                End Using    
            End Using

            con.Close()
        End Using
        
    End Sub

End Module

In the above example, we get the number of rows and columns returned
by a query. 

Try 
    Console.Write("Enter rows to fetch: ")
    nrows = Console.ReadLine()
Catch e As FormatException
    Console.WriteLine(e.ToString())
End Try

The example asks for the number of rows on the command line.

cmd.CommandText = "SELECT * FROM Cars LIMIT @Id"
cmd.Prepare()

cmd.Parameters.AddWithValue("@Id", Int32.Parse(nrows))

We select as many rows as we have provided on the command line.

cols = rdr.FieldCount

The number of returned columns can be retrieved from the 
FieldCount property of the SqliteDataReader
object. 

While rdr.Read()                    
    rows += 1
End While

We count the number of rows in the result set. 

$ mono fields_rows.exe 
Enter rows to fetch: 5
The query fetched 5 rows
Each row has 3 cols

Output.

## Column headers

Next we will show, how to print column headers with the data
from a database table.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)

                cmd.CommandText = "SELECT * FROM Cars LIMIT 5"
                
                Dim rdr As SqliteDataReader = cmd.ExecuteReader()

                Using rdr
                
                    Console.WriteLine(String.Format("{0, -3} {1, -8} {2, 8}", _
                        rdr.GetName(0), rdr.GetName(1), rdr.GetName(2)))

                    While rdr.Read()                    
                        Console.WriteLine(String.Format("{0, -3} {1, -8} {2, 8}", _
                            rdr.GetInt32(0), rdr.GetString(1), rdr.GetInt32(2)))
                    End While
         
                End Using        
            End Using

            con.Close()
        End Using
       
    End Sub

End Module

In this program, we select 5 rows from the Cars table
with their column names. 

Dim rdr As SqliteDataReader = cmd.ExecuteReader()

We create a SqliteDataReader object. 

Console.WriteLine(String.Format("{0, -3} {1, -8} {2, 8}", _
    rdr.GetName(0), rdr.GetName(1), rdr.GetName(2)))

We get the names of the columns with the GetName 
method of the reader. The String.Format method is
used to format the data. 

While rdr.Read()                    
    Console.WriteLine(String.Format("{0, -3} {1, -8} {2, 8}", _
        rdr.GetInt32(0), rdr.GetString(1), rdr.GetInt32(2)))
End While

We print the data that was returned by the SQL statement
to the terminal. 

$ mono headers.exe 
Id  Name        Price
1   Audi        52642
2   Mercedes    57127
3   Skoda        9000
4   Volvo       29000
5   Bentley    350000

Ouput of the program. 

## Affected rows

In the following example, we will find out how many changes have
been done by a particular SQL command.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "Data Source=:memory:"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)

                cmd.CommandText = "CREATE TABLE Friends(Id INT, Name TEXT)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends VALUES(1, 'Tom')"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends VALUES(2, 'Jane')"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends VALUES(3, 'Rebekka')"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends VALUES(4, 'Lucy')"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends VALUES(5, 'Robert')"
                cmd.ExecuteNonQuery()

                cmd.CommandText = "DELETE FROM Friends WHERE Id IN (3, 4, 5)"
                Dim n As Integer = cmd.ExecuteNonQuery()

                Console.WriteLine("The statement has affected {0} rows", n)
        
            End Using

            con.Close()

        End Using
        
    End Sub

End Module

We create a Friends table in memory. In the last SQL command, 
we delete three rows. The ExecuteNonQuery method returns 
the number of rows affected by the last SQL command.

cmd.CommandText = "DELETE FROM Friends WHERE Id IN (3, 4, 5)"

In this SQL statement, we delete three rows. 

Dim n As Integer = cmd.ExecuteNonQuery()

We find out the number of changes done by the last SQL
statement. 

$ mono affected_rows.exe 
The statement has affected 3 rows

Example output.

## Table schema

There is a GetSchemaTable method which returns metadata 
about each column. It returns many values, among others the column
name, column size, the base table name or whether the column is unique
or not. 

Option Strict On

Imports System.Data
Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)

                cmd.CommandText = "SELECT * FROM Cars LIMIT 4"
                
                Dim rdr As SqliteDataReader = cmd.ExecuteReader()

                Using rdr
                
                    Dim schemaTable As DataTable = rdr.GetSchemaTable()

                    For Each row As DataRow In schemaTable.Rows                    
                        For Each col As DataColumn In schemaTable.Columns
                            Console.WriteLine(col.ColumnName &amp; " = " &amp; row(col))
                        Next
                        Console.WriteLine()
                    Next
         
                End Using
            End Using

            con.Close()
        End Using
        
    End Sub

End Module

The example prints lots of metadata about table columns. 

Dim schemaTable As DataTable = rdr.GetSchemaTable()

We get the database schema table. 

For Each row As DataRow In schemaTable.Rows                    
    For Each col As DataColumn In schemaTable.Columns
        Console.WriteLine(col.ColumnName &amp; " = " &amp; row(col))
    Next
    Console.WriteLine()
Next

We go through the schema table rows, which hold the metadata, and
print them to the console. 

$ mono table_schema.exe 
ColumnName = Id
ColumnOrdinal = 0
ColumnSize = 8
NumericPrecision = 19
NumericScale = 0
IsUnique = True
IsKey = True
...

Excerpt from the example output.

## Table names

In our last example related to the metadata, we will 
list all tables in the test.db database. 

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)

                cmd.CommandText = "SELECT name FROM sqlite_master " _
                    &amp; "WHERE type='table' ORDER BY name"
                
                Dim rdr As SqliteDataReader = cmd.ExecuteReader()

                Using rdr                
                    While (rdr.Read())
                        Console.WriteLine(rdr.GetString(0))
                    End While         
                End Using        
            End Using

            con.Close()
        End Using
        
    End Sub

End Module

The code example prints all available tables in the chosen database
to the terminal. 

cmd.CommandText = "SELECT name FROM sqlite_master " _
    &amp; "WHERE type='table' ORDER BY name"

The table names are retrieved from the sqlite_master table.

$ mono table_names.exe
Cars
Friends2
Images

These were the tables on our system. 

In this part of the SQLite Visual Basic tutorial, we have worked with database
metadata. 

[Contents](..)
[Previous](../images/)
[Next](../trans/)