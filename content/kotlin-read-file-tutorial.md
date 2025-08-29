+++
title = "Kotlin read file tutorial"
date = 2025-08-29T20:02:50.677+01:00
draft = false
description = "Kotlin read file tutorial shows how to read a file in Kotlin. We show several ways of reading a file in Kotlin."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin read file tutorial

last modified January 29, 2024

This article shows how to read a file in Kotlin. We show several ways of reading
a file in Kotlin.

In this article we use the File methods to read files.

The tutorial presents five examples that read a file in Kotlin.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states, 
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the 
course of three days, during the second Persian invasion of Greece. 

In the examples, we use this text file.

## Kotlin read file with File.readLines

File.readLines reads the file content as a list of lines.
It should not be used for large files.

readfile.kt
  

package com.zetcode

import java.io.File

fun main() {

    val fileName = "src/resources/thermopylae.txt"
    
    val lines: List&lt;String&gt; = File(fileName).readLines()
    
    lines.forEach { line -&gt; println(line) }
}

The example reads a file with File.readLines.

## Kotlin read file with File.useLines

File.useLines reads all data as a list of lines
and provides it to the callback. It closes the reader in the end.

readfile2.kt
  

package com.zetcode

import java.io.File
 
fun main() {
    
    val fileName = "src/resources/thermopylae.txt"
    
    val myList = mutableListOf&lt;String&gt;()

    File(fileName).useLines { lines -&gt; myList.addAll(lines) }
    
    myList.forEachIndexed { i, line -&gt; println("${i}: " + line) }
}

The example reads a file and prints it to the console. We add line numbers to the output.

val myList = mutableListOf&lt;String&gt;()

A mutable list is created.

File(fileName).useLines { lines -&gt; myList.addAll(lines) }

With File.useLines we copy the list of the lines into 
the above created mutable list.

myList.forEachIndexed { i, line -&gt; println("${i}: " + line) }

With forEachIndexed we add a line number to each line.

## Kotlin read file with File.readText

File.readText gets the entire content of this file 
as a String. It is not recommended to use this method
on huge files.

readfile3.kt
  

package com.zetcode

import java.io.File

fun main() {
    
    val fileName = "src/resources/thermopylae.txt"

    val content = File(fileName).readText()
    
    println(content)
}

In the example, we read the whole file into a string and print it to 
the console.

## Kotlin read file with InputStream

InputStream is an input stream of bytes.

readfile4.kt
  

package com.zetcode

import java.io.File
import java.io.InputStream
import java.nio.charset.Charset

fun main() {

    val fileName = "src/resources/thermopylae.txt"
    val myFile = File(fileName)

    var ins: InputStream = myFile.inputStream()
    
    var content = ins.readBytes().toString(Charset.defaultCharset())
    println(content)
}

The example creates an InputStream from a File
and reads bytes from it. The bytes are transformed into text.

var ins: InputStream = myFile.inputStream()

An InputStream is created from a File with inputStream.

var content = ins.readBytes().toString(Charset.defaultCharset())

We read bytes from the InputStream with readBytes and
transform the bytes into text with toString.

## Kotlin read file with readBytes

The readBytes reads the entire content of a file as a byte array.
It is not recommended on huge files.

readfile5.kt
  

package com.zetcode

import java.io.File

fun main() {

    val fileName = "src/resources/thermopylae.txt"
    val file = File(fileName)

    var bytes: ByteArray = file.readBytes()
        
    bytes.forEachIndexed { i, byte -&gt; (
                            
        
        if (i == 0) {
                    
            print("${byte} ")
        } else if (i % 10 == 0) {
            
            print("${byte} \n")
        } else {
                
            print("${byte} ")
        })
    }    
}

The example reads a text file into a byte array. It prints
the file as numbers to the console.

## Source

[Kotlin reference documentation](https://kotlinlang.org/docs/home.html)

In this article we have shown how to read file in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).