+++
title = "SQLite transactions with Visual Basic"
date = 2025-08-29T19:53:02.778+01:00
draft = false
description = "In this part of the SQLite Visual Basic tutorial, we work with database transactions."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../meta/)

# SQLite transactions with Visual Basic

last modified July 6, 2020 

In this chapter, we will work with transactions. First, we provide some
basic definitions. Then we will have programs that show, how to work
with transactions. 

A *transaction* is an atomic unit of database operations 
against the data in one or more databases. The effects of all the 
SQL statements in a transaction can be either all committed to the 
database or all rolled back.

In SQLite, any command other than the SELECT will start an 
implicit transaction. Also, within a transaction a command like 
CREATE TABLE ..., VACUUM, PRAGMA, will 
commit previous changes before executing.

Manual transactions are started with the BEGIN TRANSACTION 
statement and finished with the COMMIT or ROLLBACK 
statements.

SQLite supports three non-standard transaction levels: DEFERRED, 
IMMEDIATE, and EXCLUSIVE. SQLite automatically puts each 
command into its own transaction unless we start our
own transaction. Note that this may be influenced by the driver too. SQLite Python
driver has the autocommit mode turned off by default and the first SQL command
starts a new transaction.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)

                cmd.CommandText = "DROP TABLE IF EXISTS Friends"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "CREATE TABLE Friends(Id INTEGER PRIMARY KEY," _ 
                                    &amp; "Name TEXT)"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Tom')"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Rebecca')"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Jim')"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Robert')"
                cmd.ExecuteNonQuery()
                cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Julian')"
                cmd.ExecuteNonQuery()
        
            End Using

            con.Close()

        End Using
        
    End Sub

End Module

We create a Friends table and fill it with data. We do not 
explicitly start a transaction, nor we call commit or rollback methods. 
Yet the data is written to the table. It is because by default, we work 
in the autocommit mode. In this mode each SQL statement is immediately 
effective.

cmd.CommandText = "DROP TABLE IF EXISTS Friends"
cmd.ExecuteNonQuery()
cmd.CommandText = "CREATE TABLE Friends(Id INTEGER PRIMARY KEY," _ 
                    &amp; "Name TEXT)"
cmd.ExecuteNonQuery()

We drop the Friends table if it already exists. Then we 
create the table with the CREATE TABLE statement.

cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Tom')"
cmd.ExecuteNonQuery()
cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Rebecca')"
cmd.ExecuteNonQuery()
...

We insert two rows. 

sqlite&gt; SELECT * FROM Friends;
1|Tom
2|Rebecca
3|Jim
4|Robert
5|Julian

The Friends table was successfully created. 

In the second example we will start a custom transaction with 
the BeginTransaction method.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()

            Dim tr As SqliteTransaction = con.BeginTransaction()
        
            Using tr 
            
                Using cmd As New SqliteCommand(con)

                    cmd.Transaction = tr
                    cmd.CommandText = "DROP TABLE IF EXISTS Friends"
                    cmd.ExecuteNonQuery()
                    cmd.CommandText = "CREATE TABLE Friends(Id INTEGER PRIMARY KEY," _ 
                                        &amp; "Name TEXT)"
                    cmd.ExecuteNonQuery()
                    cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Tom')"
                    cmd.ExecuteNonQuery()
                    cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Rebecca')"
                    cmd.ExecuteNonQuery()
                    cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Jim')"
                    cmd.ExecuteNonQuery()
                    cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Robert')"
                    cmd.ExecuteNonQuery()
                    cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Julian')"
                    cmd.ExecuteNonQuery()
                    cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Jane')"
                    cmd.ExecuteNonQuery()
                End Using

                tr.Commit()
            End Using

            con.Close()
        End Using
        
    End Sub

End Module

All SQL commands form a unit. Either all are saved or nothing is saved. 
This is the basic idea behind transactions.

Dim tr As SqliteTransaction = con.BeginTransaction()

The BeginTransaction method starts a transaction.

cmd.Transaction = tr

We set the transaction within which the SqliteCommand executes.

tr.Commit()

If everything ran OK, we commit the whole transaction to the database.
In case of an exception, the transaction is rolled back behind the scenes. 

## Explicit rollback call

Now we are going to show an example, where we rollback manually a transaction, 
in case of an exception.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Dim con As SqliteConnection     
        Dim tr As SqliteTransaction
        Dim cmd As SqliteCommand
        
        Try
            con = New SqliteConnection(cs)
        
            con.Open()
    
            tr = con.BeginTransaction()
            cmd = con.CreateCommand()
                
            cmd.Transaction = tr
            cmd.CommandText = "DROP TABLE IF EXISTS Friends"
            cmd.ExecuteNonQuery()
            cmd.CommandText = "CREATE TABLE Friends(Id INTEGER PRIMARY KEY," _
                              &amp;  "Name TEXT)"
            cmd.ExecuteNonQuery()
            cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Tom')"
            cmd.ExecuteNonQuery()
            cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Rebecca')"
            cmd.ExecuteNonQuery()
            cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Jim')"
            cmd.ExecuteNonQuery()
            cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Robert')"
            cmd.ExecuteNonQuery()
            cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Julian')"
            cmd.ExecuteNonQuery()
            cmd.CommandText = "INSERT INTO Friends(Name) VALUES ('Jane')"
            cmd.ExecuteNonQuery()
                
            tr.Commit()

        Catch ex As SqliteException
        
            Console.WriteLine("Error: {0}",  ex.ToString())

            If tr IsNot Nothing
                Try                 
                    tr.Rollback()                    
                Catch ex2 As SqliteException
                    Console.WriteLine("Transaction rollback failed.")
                    Console.WriteLine("Error: {0}",  ex2.ToString())
                Finally                
                    tr.Dispose()
                End Try
            End If
        Finally 
            If cmd IsNot Nothing
                cmd.Dispose()
            End If

            If tr IsNot Nothing
                tr.Dispose()
            End If

            If con IsNot Nothing
                Try                 
                    con.Close()
                Catch ex As SqliteException                
                    Console.WriteLine("Closing connection failed.")
                    Console.WriteLine("Error: {0}",  ex.ToString())
                Finally                
                    con.Dispose()
                End Try
            End If
        End Try    
        
    End Sub

End Module

We create our own Try, Catch, Finally blocks, 
where we deal with possible issues.

Catch ex As SqliteException

    Console.WriteLine("Error: {0}",  ex.ToString())

    If tr IsNot Nothing
        Try                 
            tr.Rollback()                    
        Catch ex2 As SqliteException
            Console.WriteLine("Transaction rollback failed.")
            Console.WriteLine("Error: {0}",  ex2.ToString())
        Finally                
            tr.Dispose()
        End Try
    End If

When an exception is thrown during the creation of the Friends 
table, we call the Rollback method. Rolling back a transaction
might fail too; we check this scenario.

If cmd IsNot Nothing
    cmd.Dispose()
End If

If tr IsNot Nothing
    tr.Dispose()
End If

When all goes OK, we dispose the resources. 

If con IsNot Nothing
    Try                 
        con.Close()
    Catch ex As SqliteException                
        Console.WriteLine("Closing connection failed.")
        Console.WriteLine("Error: {0}",  ex.ToString())
    Finally                
        con.Dispose()
    End Try
End If

When closing a connection, we might receive another exception. 
We handle this case here.

## Errors

When there is an error in the transaction, the transaction is rolled back 
an no changes are committed to the database.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()

            Dim tr As SqliteTransaction = con.BeginTransaction()
        
            Using tr 
        
                Using cmd As New SqliteCommand(con)

                    cmd.CommandText = "SELECT * FROM Cars LIMIT 5"
                    
                    cmd.Transaction = tr
                    cmd.CommandText = "UPDATE Friends SET Name='Thomas' WHERE Id=1"
                    cmd.ExecuteNonQuery()

                    cmd.CommandText = "UPDATE Friend SET Name='Bob' WHERE Id=4"
                    cmd.ExecuteNonQuery()
                    
                    tr.Commit()
                End Using
            End Using
            con.Close()
        End Using
        
    End Sub

End Module

In the code example we want to change two names. There are two statements 
which form a transaction. There is an error in the second SQL statement. 
Therefore the transaction is rolled back.

cmd.CommandText = "UPDATE Friend SET Name='Bob' WHERE Id=4"
cmd.ExecuteNonQuery()

The name of the table is incorrect. There is no Friend table in 
the database.

$ mono error.exe 

Unhandled Exception: Mono.Data.Sqlite.SqliteException: SQLite error
no such table: Friend
...

Running the example will display this error message. The transaction is 
rolled back.

sqlite&gt; SELECT * FROM Friends;
1|Tom
2|Rebecca
3|Jim
4|Robert
5|Julian
6|Jane

No changes took place in the Friends table. Even if the first 
UPDATE statement was correct.

We will again try to change two rows; this time without using the
SqliteTransaction.

Option Strict On

Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Using cmd As New SqliteCommand(con)

                cmd.CommandText = "SELECT * FROM Cars LIMIT 5"
                
                cmd.CommandText = "UPDATE Friends SET Name='Thomas' WHERE Id=1"
                cmd.ExecuteNonQuery()

                cmd.CommandText = "UPDATE Friend SET Name='Bob' WHERE Id=4"
                cmd.ExecuteNonQuery()
                
            End Using

            con.Close()
        End Using
        
    End Sub

End Module

We try to update two names in the Friends table, Tom to Thomas and
Robert to Bob. 

cmd.CommandText = "UPDATE Friend SET Name='Bob' WHERE Id=4"
cmd.ExecuteNonQuery()

This UPDATE statement is incorrect.

$ mono error2.exe 

Unhandled Exception: Mono.Data.Sqlite.SqliteException: SQLite error
no such table: Friend
...

We receive the same error message as in the previous example.

sqlite&gt; SELECT * FROM Friends;
1|Thomas
2|Rebecca
3|Jim
4|Robert
5|Julian
6|Jane

However this time, the first UPDATE statement was saved. 
The second one was not. 

In this part of the SQLite Visual Basic tutorial, we have worked with transactions.

[Contents](..)
[Previous](../meta/)