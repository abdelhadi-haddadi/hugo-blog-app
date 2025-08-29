+++
title = "Opencsv"
date = 2025-08-29T20:00:04.028+01:00
draft = false
description = "Opencsv tutorial shows how to work with the Opencsv library which is used to read and write CSV files in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Opencsv

last modified July 4, 2024

 

In this article we show how to work with the Opencsv library which is used to
read and write CSV files in Java. We provide several code examples to work with
CSV in Java. 

CSV (Comma Separated Values) format is a very popular import and
export format used in spreadsheets and databases.

Each line in a CSV file is a data record. Each record consists of one or more fields, separated
by commas. Despite CSV format being a very simple format, there can be many differecies, such
as different delimiters, new lines, or quoting characters.

## Opencsv library

Opencsv is a very simple CSV parser library for Java. It was
developed because of the lack of commercial-friendly licenses.

&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;com.opencsv&lt;/groupId&gt;
        &lt;artifactId&gt;opencsv&lt;/artifactId&gt;
        &lt;version&gt;5.9&lt;/version&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;

This is the Maven dependency for Opencsv.

## Reading data

The following example reads numbers from a CSV file.

src/main/resources/numbers.csv
  

3,5,6,2,1,7,8
4,5,7,3,2,8,9

We have two records of data in the numbers.csv file.

Main.java
  

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

void main() throws IOException, CsvValidationException {

    var fileName = "src/main/resources/numbers.csv";

    try (var fr = new FileReader(fileName, StandardCharsets.UTF_8);
            var reader = new CSVReader(fr)) {

        String[] nextLine;

        while ((nextLine = reader.readNext()) != null) {

            for (var e : nextLine) {
                System.out.format("%s ", e);
            }
        }
    }
}

The example reads numbers from the numbers.csv file and prints
them to the console.

var fileName = "src/main/resources/numbers.csv";

The file is located in the src/main/resources directory.

try (var fr = new FileReader(fileName, StandardCharsets.UTF_8);
    var reader = new CSVReader(fr)) {

The CSVReader is a class used for reading CSV files.

while ((nextLine = reader.readNext()) != null) {

    for (String e: nextLine) {
        System.out.format("%s ", e);
    }
}

We iterate through the reader and print the value to the terminal. The
readNext method reads the next line from the buffer and converts
to a string array.

## Reading with different separator

Despite its name, CSV files can be separated with a
delimiter other than a comma. The following example shows how
to read numbers separated by a pipe | character.

src/main/resources/numbers.csv
  

1|2|3|4|5
6|7|3|9|8
9|1|1|0|2

We have three rows of numbers separated with the | character.

Main.java
  

import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

void main() throws IOException, CsvException {

    var fileName = "src/main/resources/numbers.csv";
    Path myPath = Paths.get(fileName);

    CSVParser parser = new CSVParserBuilder().withSeparator('|').build();

    try (var br = Files.newBufferedReader(myPath,  StandardCharsets.UTF_8);
         var reader = new CSVReaderBuilder(br).withCSVParser(parser)
                 .build()) {

        List&lt;String[]&gt; rows = reader.readAll();

        for (String[] row : rows) {

            for (String e : row) {

                System.out.format("%s ", e);
            }

            System.out.println();
        }
    }
}

The example reads values from the numbers.csv file and prints them
to the console.

CSVParser parser = new CSVParserBuilder().withSeparator('|').build();

A CSVParser with specific parser character is created.

try (var br = Files.newBufferedReader(myPath,  StandardCharsets.UTF_8);
    var reader = new CSVReaderBuilder(br).withCSVParser(parser)
            .build()) {

A CSVReader is created with CSVReaderBuilder.

List&lt;String[]&gt; rows = reader.readAll();

We read all the elements into a list in one shot with the readAll
method. This method should not be used for large files.

## Writing data

The CSVWriter class is used to write data to a CSV file.

Main.java
  

import com.opencsv.CSVWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;

void main() throws IOException {

    String[] entries = { "book", "coin", "pencil", "cup" };
    String fileName = "src/main/resources/items.csv";

    try (var fos = new FileOutputStream(fileName); 
            var osw = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
            var writer = new CSVWriter(osw)) {

        writer.writeNext(entries);
    }
}

The example writes data from an array to the items.csv file.
The file is written into the project root directory. The writeNext
method writes an array of elements to the file.

In the next code example, we write all data in one shot.

Main.java
  

import com.opencsv.CSVWriter;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

void main() throws IOException {

    String[] items1 = {"book", "coin", "pencil"};
    String[] items2 = {"pen", "chair", "lamp"};
    String[] items3 = {"ball", "bowl", "spectacles"};

    List&lt;String[]&gt; entries = new ArrayList&lt;&gt;();
    entries.add(items1);
    entries.add(items2);
    entries.add(items3);

    String fileName = "src/main/resources/items.csv";

    try (var fos = new FileOutputStream(fileName);
            var osw = new OutputStreamWriter(fos, StandardCharsets.UTF_8);
            var writer = new CSVWriter(osw)) {

        writer.writeAll(entries);
    }
}

The example writes a list of arrays to the items.csv file
using the writeAll method.

## SQL data to CSV file

The following example retrieves data from a database table and writes it into a
CSV file. We use PostgreSQL database.

In addition to the opencsv artifact, we also need the 
postgresql driver artifact.

cars_postgres.sql
  

-- SQL for the cars table

CREATE TABLE cars(id serial PRIMARY KEY, name VARCHAR(255), price INT);

INSERT INTO cars(name, price) VALUES('Audi', 52642);
INSERT INTO cars(name, price) VALUES('Mercedes', 57127);
INSERT INTO cars(name, price) VALUES('Skoda', 9000);
INSERT INTO cars(name, price) VALUES('Volvo', 29000);
INSERT INTO cars(name, price) VALUES('Bentley', 350000);
INSERT INTO cars(name, price) VALUES('Citroen', 21000);
INSERT INTO cars(name, price) VALUES('Hummer', 41400);
INSERT INTO cars(name, price) VALUES('Volkswagen', 21600);

This is the Cars table from which we retrieve the
data.

Main.java
  

import com.opencsv.CSVWriter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

void main() {

    String url = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    String fileName = "src/main/resources/cars.csv";
    Path myPath = Paths.get(fileName);

    try (var con = DriverManager.getConnection(url, user, password);
         var pst = con.prepareStatement("SELECT * FROM cars");
         var rs = pst.executeQuery()) {

        try (var writer = new CSVWriter(Files.newBufferedWriter(myPath,
                StandardCharsets.UTF_8), CSVWriter.DEFAULT_SEPARATOR,
                CSVWriter.NO_QUOTE_CHARACTER, CSVWriter.NO_ESCAPE_CHARACTER,
                CSVWriter.DEFAULT_LINE_END)) {

            writer.writeAll(rs, true);
        }

    } catch (SQLException | IOException ex) {
        Logger.getLogger(getClass().getName()).log(
                Level.SEVERE, ex.getMessage(), ex);
    }
}

In the example, we connect to the PostgreSQL database and retrieve all rows
from the Cars table. The data is written to the
cars.csv file.

try (var con = DriverManager.getConnection(url, user, password);
    var pst = con.prepareStatement("SELECT * FROM cars");
    var rs = pst.executeQuery()) {

We connect to the database table with the driver manager and execute the 
SELECT * FROM cars statement.

try (var writer = new CSVWriter(Files.newBufferedWriter(myPath,
    StandardCharsets.UTF_8), CSVWriter.DEFAULT_SEPARATOR,
    CSVWriter.NO_QUOTE_CHARACTER, CSVWriter.NO_ESCAPE_CHARACTER,
    CSVWriter.DEFAULT_LINE_END)) {

    writer.writeAll(rs, true);
}

We create a CSVWriter with a default separator, no quoting
characters, no escape character, and a default line end.

writer.writeAll(rs, true);

The writeAll method takes the java.sql.ResultSet
as a parameter. The second parameter specifies whether the field headers
should be included.

## Opencsv mapping to JavaBeans

CsvToBean is used to map CSV data to JavaBeans.

### Mapping by column names

With HeaderColumnNameMappingStrategy, we can map CSV data to Java
objects using the column names in the first row of the CSV file

src/main/resources/cars.csv
  

id,name,price
1,Audi,52642
2,Mercedes,57127
3,Skoda,9000
4,Volvo,29000
5,Bentley,350000
6,Citroen,21000
7,Hummer,41400
8,Volkswagen,21600
9,Toyota,26700

This is the cars.csv file. The first record contains the
column names.

Main.java
  

import com.opencsv.bean.CsvBindByName;

public class Car {

    @CsvBindByName
    private int id;

    @CsvBindByName
    private String name;

    @CsvBindByName
    private int price;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {

        var builder = new StringBuilder();
        builder.append("Car{id=").append(id).append(", name=")
                .append(name).append(", price=").append(price).append("}");

        return builder.toString();
    }
}

The Car is a JavaBean. It contains the
@CsvBindByName annotations to map the bean attributes
to the CSV columns.

Main.java
  

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

void main() throws IOException {

    String fileName = "src/main/resources/cars.csv";
    Path myPath = Paths.get(fileName);

    try (BufferedReader br = Files.newBufferedReader(myPath,
            StandardCharsets.UTF_8)) {

        HeaderColumnNameMappingStrategy&lt;Car&gt; strategy
                = new HeaderColumnNameMappingStrategy&lt;&gt;()&gt;
        strategy.setType(Car.class);

        CsvToBean&lt;Car&gt; csvToBean = new CsvToBeanBuilder&lt;Car&gt;(br)
                .withMappingStrategy(strategy)
                .withIgnoreLeadingWhiteSpace(true)
                .build();

        List&lt;Car&gt; cars = csvToBean.parse();

        cars.forEach(System.out::println);
    }
}

The example reads the data from the cars.csv file and
maps them to the Car objects. It uses HeaderColumnNameMappingStrategy.

HeaderColumnNameMappingStrategy&lt;Car&gt; strategy
        = new HeaderColumnNameMappingStrategy&lt;&gt;();
strategy.setType(Car.class);

The HeaderColumnNameMappingStrategy maps data to objects using
the column names in the first row of the CSV file. The column order does not matter.

CsvToBean&lt;Car&gt; csvToBean = new CsvToBeanBuilder&lt;Car&gt;(br)
    .withMappingStrategy(strategy)
    .withIgnoreLeadingWhiteSpace(true)
    .build();

A CsvToBean is created with CsvToBeanBuilder. We
specify the mapping strategy.

List&lt;Car&gt; cars = csvToBean.parse();

With the CsvToBean's parse method, we parse the CSV data
into the list.

cars.forEach(System.out::println);

We go over the list of beans and print them to the console.

### Mapping by column position

The ColumnPositionMappingStrategy maps columns by their position.

src/main/resources/cars.csv
  

1,Audi,52642
2,Mercedes,57127
3,Skoda,9000
4,Volvo,29000
5,Bentley,350000
6,Citroen,21000
7,Hummer,41400
8,Volkswagen,21600
9,Toyota,26700

This is the cars.csv file.

Car.java
  

import com.opencsv.bean.CsvBindByPosition;

public class Car {

    @CsvBindByPosition(position = 0)
    private int id;

    @CsvBindByPosition(position = 1)
    private String name;

    @CsvBindByPosition(position = 2)
    private int price;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {

        var builder = new StringBuilder();
        builder.append("Car{id=").append(id).append(", name=")
                .append(name).append(", price=").append(price).append("}");

        return builder.toString();
    }
}

The @CsvBindByPosition specifies a binding between a column
number of the CSV input and a field in a bean.

Main.java
  

import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

void main() throws IOException {

    String fileName = "src/main/resources/cars.csv";
    Path myPath = Paths.get(fileName);

    try (BufferedReader br = Files.newBufferedReader(myPath,
            StandardCharsets.UTF_8)) {

        ColumnPositionMappingStrategy&lt;Car&gt; strategy = new ColumnPositionMappingStrategy&lt;&gt;();
        strategy.setType(Car.class);
        String[] fields = {"id", "name", "price"};
        strategy.setColumnMapping(fields);

        CsvToBean&lt;Car&gt; csvToBean = new CsvToBeanBuilder&lt;Car&gt;(br)
                .withMappingStrategy(strategy)
                .withIgnoreLeadingWhiteSpace(true)
                .build();

        List&lt;Car&gt; cars = csvToBean.parse();

        cars.forEach(System.out::println);
    }
}

The example reads the data from the cars.csv file and
maps them to the Car objects. It uses ColumnPositionMappingStrategy.

ColumnPositionMappingStrategy&lt;Car&gt; strategy = new ColumnPositionMappingStrategy&lt;&gt;();
strategy.setType(Car.class);
String[] fields = {"id", "name", "price"};
strategy.setColumnMapping(fields);

We create a ColumnPositionMappingStrategy. With setColumnMapping
we set the column names to be mapped.

## Opencsv writing JavaBeans with StatefulBeanToCsv

In the next example, we write JavaBeans to CSV with StatefulBeanToCsv.

Car.java
  

public class Car {

    private int id;
    private String name;
    private int price;

    public Car() {
    }

    public Car(int id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {

        var builder = new StringBuilder();
        builder.append("Car{id=").append(id).append(", name=")
                .append(name).append(", price=").append(price).append("}");

        return builder.toString();
    }
}

This is a Car bean.

Main.java
  

import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

void main() {

    String fileName = "src/main/resources/cars.csv";
    Path myPath = Paths.get(fileName);

    var cars = List.of(new Car(1, "Audi", 52642),
            new Car(2, "Mercedes", 57127),
            new Car(3, "Skoda", 9000),
            new Car(4, "Volvo", 29000));

    try (var writer = Files.newBufferedWriter(myPath, StandardCharsets.UTF_8)) {

        StatefulBeanToCsv&lt;Car&gt; beanToCsv = new StatefulBeanToCsvBuilder&lt;Car&gt;(writer)
                .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
                .build();

        beanToCsv.write(cars);

    } catch (CsvDataTypeMismatchException | CsvRequiredFieldEmptyException |
             IOException ex) {
        Logger.getLogger(getClass().getName()).log(
                Level.SEVERE, ex.getMessage(), ex);
    }
}

The example creates a list of car objects and writes them to a CSV file.

var cars = List.of(new Car(1, "Audi", 52642),
        new Car(2, "Mercedes", 57127),
        new Car(3, "Skoda", 9000),
        new Car(4, "Volvo", 29000));

We create a list of car objects.

StatefulBeanToCsv&lt;Car&gt; beanToCsv = new StatefulBeanToCsvBuilder&lt;Car&gt;(writer)
    .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
    .build();

A StatefulBeanToCsv is created with StatefulBeanToCsvBuilder.

beanToCsv.write(cars);

The beans are written to a file.

In this article we have worked with the Opencsv library. We have read data from
a CSV file, written data to a CSV file, exported data from a database table to a
CSV file, and mapped CSV data to beans.

## Source

[Java Opencsv documentation](https://opencsv.sourceforge.net/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).