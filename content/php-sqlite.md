+++
title = "PHP SQLite"
date = 2025-08-29T20:04:44.952+01:00
draft = false
description = "PHP SQLite3 tutorial shows how to create database programs in PHP and SQLite database."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP SQLite

last modified February 16, 2025

This is a PHP programming tutorial for the SQLite version 3 database. It covers
the basics of SQLite programming with the PHP language.

To work with this tutorial, we must have PHP CLI installed on the system. 

For working with the SQLite database, we can install the sqlite3
command line tool or the SQLite browser GUI.

$ sudo apt install php8.1-sqlite3 

We need to install the SQLite3 module for PHP.

...
;extension=sockets
extension=sqlite3
;extension=tidy
...

We may need to enable the extension in the php.ini file. On a
Debian system, the extension is automatically enabled after installing
php8.1-sqlite3. The extension is enabled in 
/etc/php/8.1/mods-available/sqlite3.ini.

## SQLite

SQLite is an embedded relational database engine. The documentation calls
it a self-contained, serverless, zero-configuration and transactional SQL
database engine. It is very popular with hundreds of millions
copies worldwide in use today. Several programming languages have built-in
support for SQLite including PHP and Python.

## Creating SQLite database

We use the sqlite3 command line tool to create
a new database.

$ sqlite3 test.db
SQLite version 3.46.1 2024-08-13 09:16:08 (UTF-16 console I/O)
Enter ".help" for usage hints.
sqlite&gt;

We provide a parameter to the sqlite3 tool; the 
test.db is the database name. It is a file on our disk. If it is
present, it is opened. If not, it is created.

sqlite&gt; .tables
sqlite&gt; .exit
$ ls
test.db

The .tables command gives a list of tables in the test.db
database. There are currently no tables. The .exit command
terminates the interactive session of the sqlite3 command line tool.
The ls command shows the contents of the current working
directory. We can see the test.db file. All data will be stored
in this single file.

## PHP SQLite3 version example

In the following examples, we get the version of the SQLite database.

version.php
  

&lt;?php

$ver = SQLite3::version();

echo $ver['versionString'] . "\n";
echo $ver['versionNumber'] . "\n";

var_dump($ver);

The SQLite3::version returns the version of the SQLite database.

$ php version.php
3.37.2
3037002
array(2) {
  ["versionString"]=&gt;
  string(6) "3.37.2"
  ["versionNumber"]=&gt;
  int(3037002)
}

version2.php
  

```
&lt;?php

$db = new SQLite3('test.db');

$version = $db-&gt;querySingle('SELECT SQLITE_VERSION()');

echo $version . "\n";

```

The program returns the current version of the SQLite database. This time we have
executed the SELECT SQLITE_VERSION statement.

$db = new SQLite3('test.db');

We create an SQLite3 object and open an SQLite3 database connection.

$version = $db-&gt;querySingle('SELECT SQLITE_VERSION()');

The querySingle executes a query and returns a single result.

$ php version2.php
3.37.2

## PHP SQLite3 exec

The exec executes a result-less query against a given database.

create_table.php
  

&lt;?php

$db = new SQLite3('test.db');

$db-&gt;exec("CREATE TABLE cars(id INTEGER PRIMARY KEY, name TEXT, price INT)");
$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Audi', 52642)");
$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Mercedes', 57127)");
$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Skoda', 9000)");
$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Volvo', 29000)");
$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Bentley', 350000)");
$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Citroen', 21000)");
$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Hummer', 41400)");
$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Volkswagen', 21600)");

The program creates a cars table and inserts eight
rows into the table.

$db-&gt;exec("CREATE TABLE cars(id INTEGER PRIMARY KEY, name TEXT, price INT)");

This SQL statement creates a new cars table. The table has
three columns. Note that in SQLite database, INTEGER PRIMARY KEY
column is auto-incremented.

$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Audi', 52642)");
$db-&gt;exec("INSERT INTO cars(name, price) VALUES('Mercedes', 57127)");

These two lines insert two cars into the table.

sqlite&gt; .mode column
sqlite&gt; .headers on

We verify the written data with the sqlite3 tool. First we modify the
way the data is displayed in the console. We use the column mode and
turn on the headers.

sqlite&gt; select * from cars;
id          name        price
----------  ----------  ----------
1           Audi        52642
2           Mercedes    57127
3           Skoda       9000
4           Volvo       29000
5           Bentley     350000
6           Citroen     21000
7           Hummer      41400
8           Volkswagen  21600

This is the data that we have written to the cars table.

## PHP SQLite3 lastInsertRowID

Sometimes, we need to determine the Id of the last inserted
row. In PHP SQLite3, we use the lastInsertRowID method.

last_rowid.php
  

&lt;?php

$db = new SQLite3(':memory:');

$db-&gt;exec("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT)");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Tom')");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Rebecca')");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Jim')");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Robert')");

$last_row_id = $db-&gt;lastInsertRowID();

echo "The last inserted row Id is $last_row_id";

We create a friends table in memory. The Id is automatically
incremented.

$db-&gt;exec("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT)");

In SQLite3, INTEGER PRIMARY KEY column is auto incremented.
There is also an AUTOINCREMENT keyword. When used in
INTEGER PRIMARY KEY AUTOINCREMENT a slightly different algorithm
for Id creation is used.

$db-&gt;exec("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT)");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Tom')");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Rebecca')");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Jim')");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Robert')");

When using auto-increment, we have to explicitly state the column names,
omitting the one that is auto-incremented. The four statements insert four
rows into the friends table.

$last_row_id = $db-&gt;lastInsertRowID();

Using the lastInsertRowID we get the last inserted row Id.

$ php last_rowid.php
The last inserted row Id is 4

We see the output of the program.

## PHP SQLite3 query

The query method executes an SQL query and returns 
a result object.

fetch_all.php
  

&lt;?php

$db = new SQLite3('test.db');

$res = $db-&gt;query('SELECT * FROM cars');

while ($row = $res-&gt;fetchArray()) {
    echo "{$row['id']} {$row['name']} {$row['price']} \n";
}

The example retrieves all data from the cars table.

$res = $db-&gt;query('SELECT * FROM cars');

This SQL statement selects all data from the cars table.

while ($row = $res-&gt;fetchArray()) {

The fetchArray retrieves a result row as an associative 
or numerically indexed array or both (the default is both).
It returns false if there are no more rows. 

$ php fetch_all.php
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600

This is the output of the example.

## PHP SQLite3 escapeString

The escapeString returns a string that 
has been properly escaped.

escape_string.php
  

&lt;?php

$db = new SQLite3('test.db');

$sql = "SELECT name FROM cars WHERE name = 'Audi'";

$escaped = SQLite3::escapeString($sql);

var_dump($sql);
var_dump($escaped);

The example escapes a string in a query.

$ php escape_string.php
string(41) "SELECT name FROM cars WHERE name = 'Audi'"
string(43) "SELECT name FROM cars WHERE name = ''Audi''"

This is the output of the example.

## PHP SQLite3 parameterized statements

SQL statements are often dynamically built. A user provides some input and this
input is built into the statement. We must be cautious every time we deal with
an input from a user. It has some serious security implications. The recommended
way to dynamically build SQL statements is to use parameter binding.

Parameterized queries are created with prepare; it prepares an SQL 
statement for execution and returns a statement object. 

PHP SQLite3 has bindParam and bindValue method to 
bind values to placeholders. It allows to bind data to question mark or named placeholders. 

### Parameterized statements with question marks

In the first example we use the syntax of question marks.    

prepared.php
  

&lt;?php

$db = new SQLite3('test.db');

$stm = $db-&gt;prepare('SELECT * FROM cars WHERE id = ?');
$stm-&gt;bindValue(1, 3, SQLITE3_INTEGER);

$res = $stm-&gt;execute();

$row = $res-&gt;fetchArray(SQLITE3_NUM);
echo "{$row[0]} {$row[1]} {$row[2]}";

We select a car using question mark placeholder.

$stm = $db-&gt;prepare('SELECT * FROM cars WHERE id = ?');

The question marks ? are placeholders for values. The values are
later added (bound) to the placeholders.

$stm-&gt;bindValue(1, 3, SQLITE3_INTEGER);

With bindValue we bind value 3 to the question mark placeholder. 
The first argument is the positional parameter, identifying the placeholder 
(there can be multiple question mark placeholders).

$ php prepared.php
3 Skoda 9000

### Parameterized statements with named placeholders

The second example uses parameterized statements with
named placeholders.

prepared2.php
  

&lt;?php

$db = new SQLite3('test.db');

$stm = $db-&gt;prepare('SELECT * FROM cars WHERE id = :id');
$stm-&gt;bindValue(':id', 1, SQLITE3_INTEGER);

$res = $stm-&gt;execute();

$row = $res-&gt;fetchArray(SQLITE3_NUM);
echo "{$row[0]} {$row[1]} {$row[2]}";

We select a specific car using a named placeholder.

$stm = $db-&gt;prepare('SELECT * FROM cars WHERE id = :id');

The named placeholders start with a colon character.

### PHP SQLite3 bind_param

The bind_param binds a parameter to a statement variable.
It can be used to handle multiple rows. 

bind_param.php
  

&lt;?php

$db = new SQLite3(':memory:');

$db-&gt;exec("CREATE TABLE friends(id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT)");

$stm = $db-&gt;prepare("INSERT INTO friends(firstname, lastname) VALUES (?, ?)");
$stm-&gt;bindParam(1, $firstName);
$stm-&gt;bindParam(2, $lastName);

$firstName = 'Peter';
$lastName = 'Novak';
$stm-&gt;execute();

$firstName = 'Lucy';
$lastName = 'Brown';
$stm-&gt;execute();

$res = $db-&gt;query('SELECT * FROM friends');

while ($row = $res-&gt;fetchArray()) {
    echo "{$row[0]} {$row[1]} {$row[2]}\n";
}

In the example, we insert two rows into a table with a parameterized statement.
To bind the placeholders, we use the bind_param method.

$ php bind_param.php
1 Peter Novak
2 Lucy Brown

## PHP SQLite3 metadata

Metadata is information about the data in the database. Metadata in a SQLite
contains information about the tables and columns, in which we store data.
Number of rows affected by an SQL statement is a metadata. Number of rows and
columns returned in a result set belong to metadata as well.

Metadata in SQLite can be obtained using specific PHP SQLite3 methods, 
PRAGMA command, or by querying the SQLite system
sqlite_master table.

num_of_columns.php
  

&lt;?php

$db = new SQLite3('test.db');

$res = $db-&gt;query("SELECT * FROM cars WHERE id = 1");
$cols = $res-&gt;numColumns();

echo "There are {$cols} columns in the result set\n";

The numColumns returns the number of columns in 
the result set. 

$ php num_of_columns.php
There are 3 columns in the result set

column_names.php
  

```
&lt;?php

$db = new SQLite3('test.db');

$res = $db-&gt;query("PRAGMA table_info(cars)");

while ($row = $res-&gt;fetchArray(SQLITE3_NUM)) {
    echo "{$row[0]} {$row[1]} {$row[2]}\n";
}

```

In this example, we issue the PRAGMA table_info(tableName) command
to get some metadata info about our cars table.

$res = $db-&gt;query("PRAGMA table_info(cars)");

The PRAGMA table_info(tableName) command returns one row for each
column in the cars table. Columns in the result set include the
column order number, column name, data type, whether or not the column can be
NULL, and the default value for the column.

while ($row = $res-&gt;fetchArray(SQLITE3_NUM)) {
    echo "{$row[0]} {$row[1]} {$row[2]}\n";
}

From the provided information, we print the column order number, column name,
and column data type.

$ php column_names.php
0 id INTEGER
1 name TEXT
2 price INT

This is the output of the example.

In the following example we print all rows from the cars table with their
column names.

column_names2.php
  

&lt;?php

$db = new SQLite3('test.db');

$res = $db-&gt;query("SELECT * FROM cars");

$col1 = $res-&gt;columnName(1);
$col2 = $res-&gt;columnName(2);

$header = sprintf("%-10s %s\n", $col1, $col2);
echo $header;

while ($row = $res-&gt;fetchArray()) {

    $line = sprintf("%-10s %s\n", $row[1], $row[2]);
    echo $line;
}

We print the contents of the cars table to the console with 
the names of the columns too. The records are aligned
with the column names.

$col1 = $res-&gt;columnName(1);

The columnName returns the name of the nth column.

$header = sprintf("%-10s %s\n", $col1, $col2);
echo $header;

These lines print two column names of the cars table.

while ($row = $res-&gt;fetchArray()) {

    $line = sprintf("%-10s %s\n", $row[1], $row[2]);
    echo $line;
}

We print the rows using the while loop. The data is aligned with the column names.

$ php column_names2.php
name       price
Audi       52642
Mercedes   57127
Skoda      9000
Volvo      29000
Bentley    350000
Citroen    21000
Hummer     41400
Volkswagen 21600

In our next example, we list all tables in the test.db database.

list_tables.php
  

&lt;?php

$db = new SQLite3('test.db');

$res = $db-&gt;query("SELECT name FROM sqlite_master WHERE type='table'");

while ($row = $res-&gt;fetchArray(SQLITE3_NUM)) {
    echo "{$row[0]}\n";
}

The code example prints all available tables in the specified database
to the terminal.

$res = $db-&gt;query("SELECT name FROM sqlite_master WHERE type='table'");

The table names are stored inside the system sqlite_master table.

$ php list_tables.php
cars
images

These were the tables on our system.

The changes returns the number of database rows that were
modified, inserted, or deleted by the most recent SQL statement.

changes.php
  

&lt;?php

$db = new SQLite3(':memory:');

$db-&gt;exec("CREATE TABLE friends(id INTEGER PRIMARY KEY, name TEXT)");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Tom')");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Rebecca')");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Jim')");
$db-&gt;exec("INSERT INTO friends(name) VALUES ('Robert')");

$db-&gt;exec('DELETE FROM friends');

$changes = $db-&gt;changes();

echo "The DELETE statement removed $changes rows";

The example returns the number of deleted rows. 

$ php changes.php
The DELETE statement removed 4 rows

## PHP SQLite3 PDO example

PHP Data Objects (PDO) defines a lightweight interface for accessing
databases in PHP. It provides a data-access abstraction layer for working
with databases in PHP. It defines consistent API for working with various
database systems. 

PHP PDO is a built-in library; we do not need to install it.    

list_tables.php
  

&lt;?php

$pdo = new PDO('sqlite:test.db');

$stm = $pdo-&gt;query("SELECT * FROM cars");
$rows = $stm-&gt;fetchAll(PDO::FETCH_NUM);

foreach($rows as $row) {

    printf("$row[0] $row[1] $row[2]\n");
}

The example fetches all table rows with PHP PDO.

## Dibi example

PHP Dibi is a tiny and smart database layer for PHP.  

$ composer req dibi/dibi

We install the library.

fetch_cars.php
  

&lt;?php

require('vendor/autoload.php');

$db = dibi::connect([
    'driver' =&gt; 'sqlite',
    'database' =&gt; 'test.db',
]);

$rows = $db-&gt;query('SELECT * FROM cars');

foreach ($rows as $row) {
    
    $id = $row-&gt;id;
    $name = $row-&gt;name;
    $price = $row-&gt;price;

    echo "$id $name $price \n";
}

The example fetches all rows from the cars table.

## Doctrine DBAL example

Doctrine is a set of PHP libraries primarily focused on providing
persistence services in PHP. Its main projects are an object-relational
mapper (ORM) and the database abstraction layer (DBAL).

$ composer req doctrine/dbal

We install the Doctrine DBAL package.

fetch_cars.php
  

&lt;?php

require_once "vendor/autoload.php";

use Doctrine\DBAL\DriverManager;
use Doctrine\DBAL\FetchMode;

$attrs = ['driver' =&gt; 'pdo_sqlite', 'path' =&gt; 'test.db'];

$conn = DriverManager::getConnection($attrs);

$queryBuilder = $conn-&gt;createQueryBuilder();
$queryBuilder-&gt;select('*')-&gt;from('cars');

$stm = $queryBuilder-&gt;execute();
$rows = $stm-&gt;fetchAll(FetchMode::NUMERIC);

foreach ($rows as $row) {

    echo "{$row[0]} {$row[1]} {$row[2]}\n";
}

The example retrieves all rows from the cars table with 
Doctrine DBAL QueryBuilder.

## Source

[SQLite3 - PHP manual](https://www.php.net/manual/en/book.sqlite3.php)

This was PHP SQLite tutorial. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.