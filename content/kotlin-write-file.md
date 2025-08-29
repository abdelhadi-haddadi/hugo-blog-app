+++
title = "Kotlin write file"
date = 2025-08-29T20:03:02.005+01:00
draft = false
description = "Kotlin write file tutorial shows how to write to a file in Kotlin. The tutorial presents four examples that write to a file in Kotlin."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin write file

last modified January 29, 2024

This article shows how to write to a file in Kotlin.

Kotlin is a statically-typed programming language that runs on
Java Virtual Machine.

The tutorial presents four examples that write to a file in Kotlin.

## Kotlin write file with PrintWriter

PrintWriter prints formatted representations of objects to a
text-output stream.

writefile.kt
  

package com.zetcode

import java.io.File

fun main() {

    val fileName = "src/resources/myfile.txt"
    val myfile = File(fileName)

    myfile.printWriter().use { out -&gt;

        out.println("First line")
        out.println("Second line")
    }

    println("Writed to file")
}

The example writes two lines to a file with PrintWriter.

val fileName = "src/resources/myfile.txt"

We write to src/resources/myfile.txt file.

myfile.printWriter().use { out -&gt;

The printWriter returns a PrintWriter for writing the
content to the file. The use method executes the given block
function on the file and then closes it.

out.println("First line")
out.println("Second line")

With println we write a string to the file including a terminating
new line.

## Kotlin write file with BufferedWriter

BufferedWriter writes text to a character-output stream, buffering
characters to provide for more efficient writing of single characters, arrays,
and strings.

writefile2.kt
  

package com.zetcode

import java.io.File

fun main() {

    val fileName = "src/resources/myfile.txt"
    val myfile = File(fileName)

    myfile.bufferedWriter().use { out -&gt;

        out.write("First line\n")
        out.write("Second line\n")
    }

    println("Writed to file")
}

The example writes two lines to a file with BufferedWriter.

myfile.bufferedWriter().use { out -&gt;

The bufferedWriter returns a BufferedWriter
for writing the content to the file. The use method
executes the given block function on the file and then closes it.

## Kotlin write file with writeText

The writeText is a Kotlin File extension function
which writes text encoded using UTF-8 or other charset to the file. If this file
exists, it becomes overwritten.

writefile3.kt
  

package com.zetcode

import java.io.File

fun main() {

    val fileName = "src/resources/myfile3.txt"
    val myfile = File(fileName)

    val content = "Today snow is falling."

    myfile.writeText(content)

    println("Writed to file")
}

The example writes to a file with Kotlin writeText extension
function.

## Kotlin write file with writeText

The Files.write writes bytes to a file.

writefile4.kt
  

package com.zetcode

import java.io.File
import java.nio.file.Files
import java.nio.file.StandardOpenOption

fun main() {

    val fileName = "src/resources/myfile.txt"
    val myfile = File(fileName)

    val content = "Today snow is falling.\n"

    Files.write(myfile.toPath(), content.toByteArray(), StandardOpenOption.APPEND)
}

The example writes to a file with Kotlin Files.write extension
function.

Files.write(myfile.toPath(), content.toByteArray(), StandardOpenOption.APPEND)

The first parameter of the Files.write is the Path
to the file, the second is the byte array to write, and the third parameter
are the options specifying how the file is opened.

In this article we have shown how to write to a file in Kotlin.

## Source

[Kotlin reference documentation](https://kotlinlang.org/docs/home.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).