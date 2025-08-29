+++
title = "Go CSV - read & write CSV"
date = 2025-08-29T19:55:07.306+01:00
draft = false
description = "Learn how to work with CSV files in Go. Includes examples of reading and writing CSV files."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go CSV - read &amp; write CSV

last modified April 11, 2024

In this article we show how to read and write CSV data in Golang.

## CSV

CSV (Comma Separated Values) is a very popular import and export data
format used in spreadsheets and databases. Each line in a CSV file is a data
record. Each record consists of one or more fields, separated by commas. While
CSV is a very simple data format, there can be many differences, such as
different delimiters, new lines, or quoting characters.

Golang has the encoding/csv package to deal with CSV. It provides
functions to read and write comma-separated values (CSV) files. A CSV file
contains zero or more records of one or more fields per record. Each record is
separated by the newline character. The final record may optionally be followed
by a newline character. White space is considered part of a field. Blank lines
are ignored.

## Go CSV Read

The Read function reads one record (a slice of fields) from the
reader.

numbers.csv
  

1,2,3,4,5
6,7,8,9,10

This is the numbers.csv file.

read_fun.go
  

package main

import (
    "encoding/csv"
    "fmt"
    "io"
    "log"
    "os"
)

func main() {

    f, err := os.Open("numbers.csv")

    if err != nil {

        log.Fatal(err)
    }

    r := csv.NewReader(f)

    for {

        record, err := r.Read()

        if err == io.EOF {
            break
        }

        if err != nil {
            log.Fatal(err)
        }

        for value := range record {
            fmt.Printf("%s\n", record[value])
        }
    }
}

In the code example, we read values from the numbers.csv file.

for {

    record, err := r.Read()

    if err == io.EOF {
        break
    }

    if err != nil {
        log.Fatal(err)
    }    

    for value := range record {
        fmt.Printf("%s\n", record[value])
    }
}

The values are read in a for loop line by line using the Read
function.

$ go run read_fun.go
1
2
3
4
5
6
7
8
9
10

## Go CSV ReadAll

The ReadAll function reads all the remaining records from the
reader. Each record is a slice of fields.

users.csv
  

first_name,last_name,occupation
John,Doe,gardener
Lucy,Smith,teacher
Brian,Bethamy,programmer

This is the users.csv file. The first line are the column names.

read_all.go
  

package main

import (
    "encoding/csv"
    "fmt"
    "log"
    "os"
)

type User struct {
    firstName  string
    lastName   string
    occupation string
}

func main() {

    records, err := readData("users.csv")

    if err != nil {
        log.Fatal(err)
    }

    for _, record := range records {

        user := User{
            firstName:  record[0],
            lastName:   record[1],
            occupation: record[2],
        }

        fmt.Printf("%s %s is a %s\n", user.firstName, user.lastName,
            user.occupation)
    }
}

func readData(fileName string) ([][]string, error) {

    f, err := os.Open(fileName)

    if err != nil {
        return [][]string{}, err
    }

    defer f.Close()

    r := csv.NewReader(f)

    // skip first line
    if _, err := r.Read(); err != nil {
        return [][]string{}, err
    }

    records, err := r.ReadAll()

    if err != nil {
        return [][]string{}, err
    }

    return records, nil
}

The example reads the users.csv file. Each line is turned into
a User type.

// skip first line
if _, err := r.Read(); err != nil {
    return [][]string{}, err
}

Here we skip the first line, which contains the column names.

records, err := r.ReadAll()

We get all the records in one shot with ReadAll.

$ go run read_all.go
John Doe is a gardener
Lucy Smith is a teacher
Brian Bethamy is a programmer

## Go CSV different delimiter

Despite its name, CSV may contain other seperators than a comma. This is due to
the lack of the standardization of the CSV format.

users.csv
  

# this is users.csv file

John;Doe;gardener
Lucy;Smith;teacher
Brian;Bethamy;programmer

In the users.csv file, the fields are separated with a semicolon.
The file also contains a comment.

different_delimiter.go
  

package main

import (
    "encoding/csv"
    "fmt"
    "log"
    "os"
)

func main() {

    f, err := os.Open("users.csv")

    if err != nil {

        log.Fatal(err)
    }

    r := csv.NewReader(f)
    r.Comma = ';'
    r.Comment = '#'

    records, err := r.ReadAll()

    if err != nil {
        log.Fatal(err)
    }

    fmt.Print(records)
}

The example reads all data from this file. 

r := csv.NewReader(f)
r.Comma = ';'
r.Comment = '#'

Here we set the separator and the comment character so that the package knows 
how to parse the file. 

## Go CSV Write

The Write function writes a single CSV record to writer. A record
is a slice of strings with each string being one field. Writes are buffered, so
Flush must be called to ensure that the record is written to the
underlying writer.

write_fun.go
  

package main

import (
    "encoding/csv"
    "log"
    "os"
)

func main() {

    records := [][]string{
        {"first_name", "last_name", "occupation"},
        {"John", "Doe", "gardener"},
        {"Lucy", "Smith", "teacher"},
        {"Brian", "Bethamy", "programmer"},
    }

    f, err := os.Create("users.csv")
    defer f.Close()

    if err != nil {

        log.Fatalln("failed to open file", err)
    }

    w := csv.NewWriter(f)
    defer w.Flush()

    for _, record := range records {
        if err := w.Write(record); err != nil {
            log.Fatalln("error writing record to file", err)
        }
    }
}

In the code example, we write a couple of records into the users.csv
file with the Write function.

## Go CSV WriteAll

The WriteAll function writes multiple CSV records to the writer 
using Write and then calls Flush.

write_all.go
  

package main

import (
    "encoding/csv"
    "log"
    "os"
)

func main() {

    records := [][]string{
        {"first_name", "last_name", "occupation"},
        {"John", "Doe", "gardener"},
        {"Lucy", "Smith", "teacher"},
        {"Brian", "Bethamy", "programmer"},
    }

    f, err := os.Create("users.csv")
    defer f.Close()

    if err != nil {

        log.Fatalln("failed to open file", err)
    }

    w := csv.NewWriter(f)
    err = w.WriteAll(records) // calls Flush internally

    if err != nil {
        log.Fatal(err)
    }
}

We write a couple of records in one shot with WriteAll.

## Source

[Go encoding/csv package - reference](https://pkg.go.dev/encoding/csv)

In this article we have showed how to read and write CSV data in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).