+++
title = "Kotlin CSV"
date = 2025-08-29T20:02:29.481+01:00
draft = false
description = "Kotlin CSV tutorial shows how to read and write CSV files in Kotlin. We use the Opencsv and kotlin-csv libraries."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin CSV

last modified January 29, 2024

This article shows how to read and write CSV files in Kotlin. We use the
Opencsv and kotlin-csv libraries.

CSV (Comma Separated Values) format is a very popular import and
export format used in spreadsheets and databases.

Each line in a CSV file is a data record. Each record consists of one or more
fields, separated by commas. Despite CSV format being a very simple format,
there can be many differecies, such as different delimiters, new lines, or
quoting characters.

## CSVReader

The following example reads numbers from a CSV file.

src/main/resources/numbers.csv
  

3,5,6,2,1,7,8
4,5,7,3,2,8,9

We have two records of data in the numbers.csv file.

com/zetcode/read_csv.kt
  

package com.zetcode

import com.opencsv.CSVReader
import java.io.FileReader
import java.nio.charset.StandardCharsets

fun main() {
    
    val fileName = "src/main/resources/numbers.csv"
    val fr = FileReader(fileName, StandardCharsets.UTF_8)

    fr.use {
        val reader = CSVReader(fr)

        reader.use { r -&gt;

            var line = r.readNext()

            while (line != null) {

                line.forEach {
                    print(" $it")
                }

                println()

                line = r.readNext()
            }
        }
    }
}

The example reads numbers from the numbers.csv file and prints
them to the console.

val fileName = "src/main/resources/numbers.csv"

The file is located in the src/main/resources directory.

val reader = CSVReader(fr)

The CSVReader is a class used for reading CSV files.

var line = r.readNext()
while (line != null) {

    line.forEach {
        print(" $it")
    }

    println()

    line = r.readNext()
}

We iterate through the reader and print the value to the terminal. The
readNext method reads the next line from the buffer and converts
to a string array.

## Read CSV with different separator

Despite its name, CSV files can be separated with a delimiter other than a
comma. The following example shows how to read numbers separated by a pipe |
character.

src/main/resources/numbers.csv
  

1|2|3|4|5
6|7|3|9|8
9|1|1|0|2

We have three rows of numbers separated with the | character.

com/zetcode/read_csv2.kt
  

package com.zetcode

import com.opencsv.CSVParserBuilder
import com.opencsv.CSVReaderBuilder
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

fun main() {

    val fileName = "src/main/resources/numbers.csv"
    val myPath: Path = Paths.get(fileName)

    val parser = CSVParserBuilder().withSeparator('|').build()

    Files.newBufferedReader(myPath, StandardCharsets.UTF_8).use { br -&gt;
        CSVReaderBuilder(br).withCSVParser(parser)
            .build().use { reader -&gt;

                val rows = reader.readAll()

                for (row in rows) {
                    for (e in row) {
                        print("$e ")
                    }

                    println()
                }
            }
    }
}

The example reads values from the numbers.csv file and prints them
to the console.

val parser = CSVParserBuilder().withSeparator('|').build()

A CSVParser with specific parser character is created.

Files.newBufferedReader(myPath, StandardCharsets.UTF_8).use { br -&gt;
    CSVReaderBuilder(br).withCSVParser(parser)
        .build().use { reader -&gt;

A CSVReader is created with CSVReaderBuilder.

val rows = reader.readAll()

We read all the elements into a list in one shot with the readAll
method. This method should not be used for large files.

for (row in rows) {
    for (e in row) {
        print("$e ")
    }

    println()
}

We go over the data.

## CSVWriter

The CSVWriter class is used to write data to a CSV file.

com/zetcode/write_csv.kt
  

package com.zetcode

import com.opencsv.CSVWriter
import java.io.FileOutputStream
import java.io.OutputStreamWriter
import java.nio.charset.StandardCharsets

fun main() {

    val entries = arrayOf("book", "coin", "pencil", "cup")
    val fileName = "src/main/resources/items.csv"

    FileOutputStream(fileName).use { fos -&gt;
        OutputStreamWriter(fos, StandardCharsets.UTF_8).use { osw -&gt;
            CSVWriter(osw).use { writer -&gt;
                writer.writeNext(
                    entries
                )
            }
        }
    }
}

The example writes data from an array to the items.csv file.
The file is written into the project root directory. The writeNext
method writes an array of elements to the file.

## Read/Write CSV with kotlin-csv

In the next example, we use the kotlin-csv library to read CSV
data.

com/zetcode/read_csv3.kt
  

package com.zetcode

import com.github.doyaaaaaken.kotlincsv.dsl.csvReader

fun main() {

    csvReader().open("src/main/resources/numbers.csv") {

        readAllAsSequence().forEach { row -&gt;

            for (e in row) {
                print("$e ")
            }
            
            println()
        }
    }
}

We read data from the numbers.csv file. 

In the next example, we write CSV data.

com/zetcode/write_csv2.kt
  

package com.zetcode

import com.github.doyaaaaaken.kotlincsv.dsl.csvWriter

fun main() {

    val rows = listOf(listOf(1, 2, 3), listOf(4, 5, 6))
    val fileName = "src/main/resources/data.csv"

    csvWriter().open(fileName) {

        rows.forEach { row -&gt;
            writeRow(row)
        }
    }
}

A list of lists is written to the data.csv file.

## Source

[kotlin-csv Github page](https://github.com/doyaaaaaken/kotlin-csv)

In this article we have showed how to work with CSV in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).