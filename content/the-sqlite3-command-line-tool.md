+++
title = "The sqlite3 command line tool"
date = 2025-08-29T19:52:57.030+01:00
draft = false
description = "In this chapter of the SQLite tutorial, we cover the sqlite3 command line tool. We mention various meta commands, shown how to dump tables, and read SQL from files."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../introduction/)
[Next](../tables/)

# The sqlite3 command line tool

last modified July 6, 2020 

In this part of the SQLite tutorial, we cover the 
sqlite3 command line tool. 

## The sqlite3 tool

The sqlite3 tool is a terminal based frontend to the SQLite library that 
can evaluate queries interactively and display the results in multiple formats.
It can also be used within scripts.

On the terminal screen, we see the following prompt of the sqlite3 tool: 

$ sqlite3 
SQLite version 3.16.2 2017-01-06 16:32:41
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database.

The .help command is one of the meta commands of the sqlite3 tool; it lists 
all meta commands. The .exit and the .quit commands
exit the sqlite3 session. We can also use the Ctrl+D key combination to 
quit sqlite3. The .databases command shows the attached databases. 
The .tables command lists the available tables.

The Ctrl+L clears the screen and Ctrl+U clears
the current line. (When built with readline library.)

## Create database with sqlite3

The complete SQLite database is stored in a single cross-platform disk file. We use
the sqlite3 command line tool to create a new database file. 

$ sqlite3 test.db

Here we create a new test.db database. If the file exists, 
it is opened. 

## Basic sqlite3 meta commands

Next we describe some of the meta commands of the sqlite3 tool. 

sqlite&gt; .tables
Authors       Cars          Friends       Reservations
Books         Customers     Orders 

The .tables command shows the available tables.

sqlite&gt; SELECT * FROM Friends;
1|Jane|F
2|Thomas|M
3|Franklin|M
4|Elisabeth|F
5|Mary|F
6|Lucy|F
7|Jack|M

Here we get the output of a SELECT statement. By default, the 
output mode is line and the separator is |. 

sqlite&gt; .separator :
sqlite&gt; SELECT * FROM Friends;
1:Jane:F
2:Thomas:M
3:Franklin:M
4:Elisabeth:F
5:Mary:F
6:Lucy:F
7:Jack:M

Here we have used a new colon separator. 

There are several other output modes available. The following example shows the 
column output mode.

sqlite&gt; .mode column
sqlite&gt; .headers on
sqlite&gt; SELECT * FROM Friends;
Id          Name        Sex       
----------  ----------  ----------
1           Jane        F         
2           Thomas      M         
3           Franklin    M         
4           Elisabeth   F         
5           Mary        F         
6           Lucy        F         
7           Jack        M 

This example shows how data is formatted in sqlite's column mode. 
The .headers command has also been used to show column headers. 
By default, the headers are hidden. 

The .width command adjusts the size of the columns.
(This meta command is relevant only for tables in the column mode.)

sqlite&gt; SELECT Name, Title FROM Authors NATURAL JOIN Books;
Name         Title     
-----------  ----------
Jane Austen  Emma      
Leo Tolstoy  War and Pe
Joseph Hell  Catch XII 
Charles Dic  David Copp
Joseph Hell  Good as Go
Leo Tolstoy  Anna Karen

The column widths are not wide enough to display all data correctly.

sqlite&gt; .width 15 18
sqlite&gt; SELECT Name, Title FROM Authors NATURAL JOIN Books;
Name             Title             
---------------  ------------------
Jane Austen      Emma              
Leo Tolstoy      War and Peace     
Joseph Heller    Catch XII         
Charles Dickens  David Copperfield 
Joseph Heller    Good as Gold      
Leo Tolstoy      Anna Karenia 

Here we change the column widths. The first column
will be 15 characters wide and the second 18. 

sqlite&gt; .shell clear

The .shell command executes system programs. In our
case, we clear the screen with the clear command. 
(The equivalent on Windows is cls.)

sqlite&gt; .show
        echo: off
         eqp: off
     explain: auto
     headers: on
        mode: column
   nullvalue: ""
      output: stdout
colseparator: "|"
rowseparator: "\n"
       stats: off
       width: 15 18 
    filename: testdb

The .show command lists various settings. These include the 
output mode, the separator used in the list mode, and whether the 
headers are on. 

sqlite&gt; .schema Cars
CREATE TABLE Cars(Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER);

The .schema command shows the structure of the table. 
It gives the DDL SQL to create the table.

It is possible to change the prompt of the sqlite3 with 
the .prompt command.

sqlite&gt; .prompt "&gt; " ". "
&gt; SELECT * FROM Cars
. LIMIT 2;
Id          Name        Price     
----------  ----------  ----------
1           Audi        52642     
2           Mercedes    57127     
&gt; 

There are two prompts. One is the main prompt and the other is 
a continuation prompt. The default main prompt is sqlite&gt; 
and the default continuation prompt is ...&gt;.

## Executing SQL from the shell

We can execute SQL commands from the shell. 

$ sqlite3 test.db "SELECT * FROM Cars;"
1|Audi|52642
2|Mercedes|57127
3|Skoda|9000
4|Volvo|29000
5|Bentley|350000
6|Citroen|21000
7|Hummer|41400
8|Volkswagen|21600  

Here we have non-interactively executed a SELECT statement; 
all cars from the Cars table were selected.

## Dumping tables

It is possible to dump tables in SQL format to the disk. This way we can easily save
the structure and the data of a database table. 

We have the Cars table.

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

We are going to use the .dump command to 
dump the table.

sqlite&gt; .dump Cars
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE Cars(Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER);
INSERT INTO "Cars" VALUES(1,'Audi',52642);
INSERT INTO "Cars" VALUES(2,'Mercedes',57127);
INSERT INTO "Cars" VALUES(3,'Skoda',9000);
INSERT INTO "Cars" VALUES(4,'Volvo',29000);
INSERT INTO "Cars" VALUES(5,'Bentley',350000);
INSERT INTO "Cars" VALUES(6,'Citroen',21000);
INSERT INTO "Cars" VALUES(7,'Hummer',41400);
INSERT INTO "Cars" VALUES(8,'Volkswagen',21600);
COMMIT;

The .dump command shows us the SQL necessary to 
create the Cars table.

sqlite&gt; .output cars2.sql
sqlite&gt; .dump Cars

We can also redirect the output to a file. The .output
command will redirect the output to the cars2.sql file. 

$ cat cars2.sql 
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE Cars(Id INTEGER PRIMARY KEY, Name TEXT, Price INTEGER);
INSERT INTO "Cars" VALUES(1,'Audi',52642);
...

We show the contents of the cars2.sql file with the cat
command.

## Reading SQL

We can read SQL statements from a file name with the .read command.

sqlite&gt; .tables
Authors       Cars          Friends       Reservations
Books         Customers     Orders  
sqlite&gt; DROP TABLE Cars;
sqlite&gt; .tables
Authors       Customers     Orders      
Books         Friends       Reservations
sqlite&gt; .read cars.sql
sqlite&gt; .tables
Authors       Cars          Friends       Reservations
Books         Customers     Orders     
sqlite&gt; SELECT * FROM Cars WHERE Id=1;
Id          Name        Price     
----------  ----------  ----------
1           Audi        52642   

Here we have executed a series of commands. We drop the table and 
read it from cars.sql.

## The .sqlite_history file

The commands and statements are archived in the .sqlite_history file.
The file is located in the home directory.

$ tail -5 ~/.sqlite_history 
.tables
SELECT * FROM Cars;
.mode column
.headers on
.show

Using the tail command, we show the last five
entries.

## Resource file

The sqlite3 tool has a resource file called .sqliterc. 
It is located in the home directory. If there is no such file, we can simply create it.
The resouce file can contain meta commands, or regular SQL statements.
However, we should avoid using SQL in the file. 

$ cat .sqliterc 
.mode column
.headers on
.nullvalue NULL  

Here is a simple example of a resource file. It has three meta commands. 
With a resource file, we do not have to execute meta commands all over again
when we start the sqlite3 tool. They will be executed 
automatically at the start of the tool.

$ sqlite3 test.db 
-- Loading resources from /home/janbodnar/.sqliterc
SQLite version 3.16.2 2017-01-06 16:32:41
Enter ".help" for usage hints.

We have a message saying that the tool loaded resources upon the beginning.

## Command line options

The tool has several command line options. They mostly duplicate 
the meta commands. Note that command line options overwrite the resource 
file meta commands.

$ sqlite3 --help
-- Loading resources from /home/janbodnar/.sqliterc
Usage: sqlite3 [OPTIONS] FILENAME [SQL]
FILENAME is the name of an SQLite database. A new database is created
if the file does not previously exist.
OPTIONS include:
   -ascii               set output mode to 'ascii'
   -bail                stop after hitting an error
   -batch               force batch I/O
   -column              set output mode to 'column'
   -cmd COMMAND         run "COMMAND" before reading stdin
   -csv                 set output mode to 'csv'
   -echo                print commands before execution
   -init FILENAME       read/process named file
   -[no]header          turn headers on or off
   -help                show this message
   -html                set output mode to HTML
   -interactive         force interactive I/O
   -line                set output mode to 'line'
   -list                set output mode to 'list'
   -lookaside SIZE N    use N entries of SZ bytes for lookaside memory
   -mmap N              default mmap size set to N
   -newline SEP         set output row separator. Default: '\n'
   -nullvalue TEXT      set text string for NULL values. Default ''
   -pagecache SIZE N    use N slots of SZ bytes each for page cache memory
   -scratch SIZE N      use N slots of SZ bytes each for scratch memory
   -separator SEP       set output column separator. Default: '|'
   -stats               print memory stats before each finalize
   -version             show SQLite version
   -vfs NAME            use NAME as the default VFS

The --help option gives us the list of all available options with
a brief description.

$ sqlite3 -echo -line -noheader test.db 
-- Loading resources from /home/janbodnar/.sqliterc
SQLite version 3.16.2 2017-01-06 16:32:41
Enter ".help" for usage hints.
sqlite&gt; SELECT * FROM Cars LIMIT 2;
SELECT * FROM Cars LIMIT 2;
   Id = 1
 Name = Audi
Price = 52642

   Id = 2
 Name = Mercedes
Price = 57127

We start the sqlite3 tool with -echo, 
-line, and -noheader options. The SELECT 
statement is repeated/echoed after being launched. The ouput is in the line 
mode and we have no headers displayed. 

$ sqlite3 -version
-- Loading resources from /home/janbodnar/.sqliterc
3.16.2 2017-01-06 16:32:41 a65a62893ca8319e89e48b8a38cf8a59c69a8209

With the -version option we get the sqlite3's version.

$ sqlite3 -html test.db
-- Loading resources from /home/janbodnar/.sqliterc
SQLite version 3.16.2 2017-01-06 16:32:41
Enter ".help" for usage hints.
sqlite&gt; SELECT * FROM Cars LIMIT 2;
&lt;TR&gt;&lt;TH&gt;Id&lt;/TH&gt;
&lt;TH&gt;Name&lt;/TH&gt;
&lt;TH&gt;Price&lt;/TH&gt;
&lt;/TR&gt;
&lt;TR&gt;&lt;TD&gt;1&lt;/TD&gt;
&lt;TD&gt;Audi&lt;/TD&gt;
&lt;TD&gt;52642&lt;/TD&gt;
&lt;/TR&gt;
&lt;TR&gt;&lt;TD&gt;2&lt;/TD&gt;
&lt;TD&gt;Mercedes&lt;/TD&gt;
&lt;TD&gt;57127&lt;/TD&gt;
&lt;/TR&gt;

With the -html option, we can output the results as simple HTML tables.

In this part of the SQLite tutorial, we worked with the sqlite3 command 
line tool. We have described various meta commands, shown how to dump tables, and 
read SQL from files. We mentioned the sqlite's history and resource files. 

[Contents](..)
[Previous](../introduction/)
[Next](../tables/)