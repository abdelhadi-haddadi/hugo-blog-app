+++
title = "Working with images in SQLite with Visual Basic"
date = 2025-08-29T19:53:01.499+01:00
draft = false
description = "In this part of the SQLite Visual Basic tutorial, we work with images. We insert an image to the database and retrieve it back."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../dataset/)
[Next](../meta/)

# Working with images in SQLite with Visual Basic

last modified July 6, 2020 

In this chapter of the SQLite Visual Basic tutorial, we will work with 
image files. Note that some people oppose putting images into databases. 
Here we only show how to do it. We do not dwell into technical issues of 
weather to save images in databases or not. 

sqlite&gt; CREATE TABLE Images(Id INTEGER PRIMARY KEY, Data BLOB);

For this example, we create a new table called Images. For 
the images, we use the BLOB data type, which stands for 
Binary Large Object. 

## Inserting images

In the first example, we are going to insert an image to the 
SQLite database. 

Option Strict On

Imports System.IO
Imports System.Data
Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Dim data As Byte()

            Try
                data = File.ReadAllBytes("woman.jpg")
            Catch ex As Exception
                Console.WriteLine(ex.ToString())
            End Try
 
            Dim cmd As New SqliteCommand(con)
    
            cmd.CommandText = "INSERT INTO Images(Data) VALUES (@img)"
            cmd.Prepare()

            cmd.Parameters.Add("@img", DbType.Binary, data.Length)
            cmd.Parameters("@img").Value = data
            cmd.ExecuteNonQuery()

            con.Close()

        End Using
        
    End Sub

End Module

We read an image from the current working directory and write it into the 
Images table of the SQLite test.db database. 

Dim data As Byte()

The image data will be stored in an array of bytes. 

data = File.ReadAllBytes("woman.jpg")

The ReadAllBytes method opens a binary file, reads 
the contents of the file into a byte array, and then closes the file.

cmd.CommandText = "INSERT INTO Images(Data) VALUES (@img)"
cmd.Prepare()

We prepare an SQL statement for inserting the array of bytes into the
Data column of the Images table. 

cmd.Parameters.Add("@img", DbType.Binary, data.Length)
cmd.Parameters("@img").Value = data
cmd.ExecuteNonQuery()

We bind the binary data to the prepared statement. Then the 
statement is executed. The image is written to the database
table. 

## Reading images

In this section, we are going to perform the reverse operation.
We will read an image from the database table. 

Option Strict On

Imports System.IO
Imports System.Data
Imports Mono.Data.Sqlite

Module Example

    Sub Main()

        Dim cs As String = "URI=file:test.db"

        Using con As New SqliteConnection(cs)
        
            con.Open()
        
            Dim cmd As New SqliteCommand(con)
            cmd.CommandText = "SELECT Data FROM Images WHERE Id=1"

            Dim data As Byte() = cmd.ExecuteScalar()

            Try                           
                If data IsNot Nothing
                    File.WriteAllBytes("woman2.jpg", data)
                Else 
                    Console.WriteLine("Binary data not read")
                End If

            Catch ex As Exception            
                Console.WriteLine(ex.ToString())
            End Try    

            con.Close()

        End Using
        
    End Sub

End Module

We read image data from the Images table and write it
to another file, which we call woman2.jpg. 

cmd.CommandText = "SELECT Data FROM Images WHERE Id=1"

This line selects the image data from the table.

Dim data As Byte() = cmd.ExecuteScalar()

We retrieve the binary data from the database table. The
data is stored in an array of bytes. 

If data IsNot Nothing
    File.WriteAllBytes("woman2.jpg", data)
Else 
    Console.WriteLine("Binary data not read")
End If

The WriteAllBytes method creates a new file, writes 
the specified byte array to the file, and then closes the file. 
If the target file already exists, it is overwritten.
When the database table is empty and we run this example, we get
Nothing. Therefore we check for the Nothing value.

This part of the SQLite Visual Basic tutorial was dedicated to reading 
and writing images. 

[Contents](..)
[Previous](../dataset/)
[Next](../meta/)