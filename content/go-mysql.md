+++
title = "Go MySQL"
date = 2025-08-29T19:55:30.228+01:00
draft = false
description = "Learn how to use MySQL with Go. Includes examples of database connections and queries."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go MySQL

last modified April 11, 2024

In this article we show how to work with MySQL in Golang. The examples perform
basic database operations.

MySQL is a leading open source database management system. It is a multi-user,
multithreaded database management system. MySQL is especially popular on the
web. MariaDB is a community-developed, commercially supported fork of the MySQL
relational database management system.

Go has the sql package which provides a generic interface around
SQL (or SQL-like) databases. The sql package must be used in conjunction with a
database driver.

The package provides automatic connection pooling. Each time we query a
database, we are using a connection from a pool of connections that has been set
up when the application has started. The connections are reused.

$ go get -u github.com/go-sql-driver/mysql

We need to install the MySQL driver.

cities_mysql.sql
  

USE testdb;
DROP TABLE IF EXISTS cities;
CREATE TABLE cities(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), population INT);
INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

In the tutorial, we use the cities table.

## Go MySQL version

In the first example, we print the version of MySQL.

version.go
  

package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/go-sql-driver/mysql"
)

func main() {

    db, err := sql.Open("mysql", "user7:s$cret@tcp(127.0.0.1:3306)/testdb")
    defer db.Close()

    if err != nil {
        log.Fatal(err)
    }

    var version string

    err2 := db.QueryRow("SELECT VERSION()").Scan(&amp;version)

    if err2 != nil {
        log.Fatal(err2)
    }

    fmt.Println(version)
}

The program returns the version of MySQL. The version is determined by executing
the SELECT VERSION() statement.

_ "github.com/go-sql-driver/mysql"

When a package is imported prefixed with a blank identifier, the init function
of the package is called. The function registers the driver.

db, err := sql.Open("mysql", "user7:s$cret@tcp(127.0.0.1:3306)/testdb")

With sql.Open, we open a database specified by its database driver
name and a driver-specific data source name, usually consisting of at least a
database name and connection information. It does not establish any connections
to the database, nor does it validate driver connection parameters. Instead, it
simply prepares the database abstraction for later use. The first actual
connection to the underlying datastore will be established lazily, when it's
needed for the first time.

defer db.Close()

The Close returns the connection to the connection pool.
It is idiomatic to defer db.Close if the sql.DB should not have
a lifetime beyond the scope of the function.

err2 := db.QueryRow("SELECT VERSION()").Scan(&amp;version)

The QueryRow executes a query that is expected to return at most
one row. The Scan function copies the column from the matched row
into the version variable.

$ go run version.go
10.3.24-MariaDB-2

## Go MySQL select all rows with Query

The Query executes a query that returns rows, typically a SELECT.
The optional arguments are for any placeholder parameters in the query.

select_all.go
  

package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/go-sql-driver/mysql"
)

type City struct {
    Id         int
    Name       string
    Population int
}

func main() {

    db, err := sql.Open("mysql", "user7:s$cret@tcp(127.0.0.1:3306)/testdb")
    defer db.Close()

    if err != nil {
        log.Fatal(err)
    }

    res, err := db.Query("SELECT * FROM cities")

    defer res.Close()

    if err != nil {
        log.Fatal(err)
    }

    for res.Next() {

        var city City
        err := res.Scan(&amp;city.Id, &amp;city.Name, &amp;city.Population)

        if err != nil {
            log.Fatal(err)
        }

        fmt.Printf("%v\n", city)
    }
}

The example prints all rows from the cities table.

for res.Next() {

The Next prepares the next result row for reading with the
Scan method. It returns true on success, or false if there is no
next result row or an error happened while preparing it.

err := res.Scan(&amp;city.Id, &amp;city.Name, &amp;city.Population)

We read the data into the City structure Scan.

$ go run select_all.go
{1 Bratislava 432000}
{2 Budapest 1759000}
{3 Prague 1280000}
{4 Warsaw 1748000}
{5 Los Angeles 3971000}
{6 New York 8550000}
{7 Edinburgh 464000}
{8 Berlin 3671000}

## Go MySQL insert row with Exec

The Exec function executes a query without returning any rows. It
is used with INSERT, UPDATE, DELETE, or DROP statements. The optional arguments
are for any placeholder parameters in the query.

insert_row.go
  

package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/go-sql-driver/mysql"
)

func main() {

    db, err := sql.Open("mysql", "user7:s$cret@tcp(127.0.0.1:3306)/testdb")
    defer db.Close()

    if err != nil {
        log.Fatal(err)
    }

    sql := "INSERT INTO cities(name, population) VALUES ('Moscow', 12506000)"
    res, err := db.Exec(sql)

    if err != nil {
        panic(err.Error())
    }

    lastId, err := res.LastInsertId()

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("The last inserted row id: %d\n", lastId)
}

The example inserts a new row into the cities table.

sql := "INSERT INTO cities(name, population) VALUES ('Moscow', 12506000)"
res, err := db.Exec(sql)

We insert a new city into the table.

lastId, err := res.LastInsertId()

With LastInsertId, we get the last inserted id.

## Go MySQL prepared statement

With prepared statements, we use placeholders instead of directly writing the
values into the statements. Prepared statements increase security and
performance of database operations.

Go creates prepared statements for you under the covers. 

db.Query(sql, param1, param2)

The Query function prepares the SQL, then executes it with the
parameters and finally closes the statement.

prepared.go
  

package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/go-sql-driver/mysql"
)

type City struct {
    Id         int
    Name       string
    Population int
}

func main() {

    db, err := sql.Open("mysql", "user7:s$cret@tcp(127.0.0.1:3306)/testdb")
    defer db.Close()

    if err != nil {
        log.Fatal(err)
    }

    var myid int = 1

    res, err := db.Query("SELECT * FROM cities WHERE id = ?", myid)
    defer res.Close()

    if err != nil {
        log.Fatal(err)
    }

    if res.Next() {

        var city City
        err := res.Scan(&amp;city.Id, &amp;city.Name, &amp;city.Population)

        if err != nil {
            log.Fatal(err)
        }

        fmt.Printf("%v\n", city)
    } else {

        fmt.Println("No city found")
    }
}

The example selects a row from the database.

res, err := db.Query("SELECT * FROM cities WHERE id = ?", myid)

The ? is a placeholder which is filled with the value from the
myid variable. Under the hood, db.Query  actually
prepares, executes, and closes a prepared statement. 

$ go run prepared.go
{1 Bratislava 432000}

## Go MySQL affected rows

The RowsAffected  returns the number of rows affected by an
update, insert, or delete statements.

affected_rows.go
  

package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/go-sql-driver/mysql"
)

func main() {

    db, err := sql.Open("mysql", "user7:s$cret@tcp(127.0.0.1:3306)/testdb")
    defer db.Close()

    if err != nil {
        log.Fatal(err)
    }

    sql := "DELETE FROM cities WHERE id IN (2, 4, 6)"
    res, err := db.Exec(sql)

    if err != nil {
        panic(err.Error())
    }

    affectedRows, err := res.RowsAffected()

    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("The statement affected %d rows\n", affectedRows)
}

In the code example, we delete three rows with a DELETE SQL statement. Then 
we print the number of deleted rows with RowsAffected.

$ go run affected_rows.go 
The statement affected 3 rows

## Source

[Go mysql - Github page](https://github.com/go-mysql-org/go-mysql)

In this article we have worked with MySQL in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).