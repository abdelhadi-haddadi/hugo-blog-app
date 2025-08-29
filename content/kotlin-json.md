+++
title = "Kotlin JSON"
date = 2025-08-29T20:02:41.726+01:00
draft = false
description = "Kotlin JSON tutorial shows how to do JSON serialization and deserialization in Kotlin."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin JSON

last modified January 29, 2024

This article shows how to do JSON serialization and deserialization in
Kotlin. We use gons and kotlinx.serialization libraries.

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. It is less verbose and more readable than XML. The official Internet
media type for JSON is application/json. The JSON filename
extension is .json. JSON is directly consumable by JavaScript.

Gson is a Java serialization/deserialization library to convert Java
Objects into JSON and back. Gson was created by Google for internal use and
later open sourced.

The kotlinx.serialization is a Kotlin library for serialization.

## Gson toJson

The toJson method serializes the specified object into its 
equivalent JSON representation. 

simple.kt
  

package com.zetcode

import com.google.gson.Gson

data class User(val firstName: String, val lastName: String)

fun main() {

    val colours = mutableMapOf(1 to "blue", 2 to "yellow", 3 to "green")

    val gson = Gson()
    val output = gson.toJson(colours)

    println(output)
}

In the example, we serialize a map into JSON with toJSon method.

## Gson fromJson

The fromJson method deserializes the specified JSON into an object
of the specified class.

simple2.kt
  

package com.zetcode

import com.google.gson.Gson

data class User(val firstName: String, val lastName: String)

fun main() {

    val jsonString = """{"firstName":"Tom", "lastName": "Broody"}"""

    val gson = Gson()
    val user: User = gson.fromJson(jsonString, User::class.java)

    println(user)
}

The example uses fromJson method to read JSON into a Kotlin object. 

## GsonBuilder

GsonBuilder builds Gson with various configuration settings.
GsonBuilder follows the builder pattern, and it is typically used
by first invoking various configuration methods to set desired options, and
finally calling create.

builder.kt
  

package com.zetcode

import com.google.gson.FieldNamingPolicy
import com.google.gson.GsonBuilder

fun main() {

    val gson = GsonBuilder()
        .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
        .create()

    val user = User("Peter", "Flemming")

    println(gson.toJson(user))
}

In the example, we write an object into JSON. We use GsonBuilder
to create Gson.

val gson = GsonBuilder()
    .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
    .create()

We create and configure Gson with GsonBuilder. The field 
naming policy is set to FieldNamingPolicy.UPPER_CAMEL_CASE.

## Pretty printing JSON output

Gson has two output modes: compact and pretty.

prettify.kt
  

package com.zetcode

import com.google.gson.GsonBuilder

fun main() {

    val gson = GsonBuilder().setPrettyPrinting().create()
    val items = mutableMapOf(1 to "pencil", 3 to "chair", 5 to "book")

    println(gson.toJson(items))
}

The example pretty prints the JSON output.

val gson = GsonBuilder().setPrettyPrinting().create()

The setPrettyPrinting method sets the pretty printing mode.

## Read JSON from URL

The following example reads JSON data from a web page. We get JSON data from 
http://time.jsontest.com.

$ curl http://time.jsontest.com
{
    "date": "06-01-2022",
    "milliseconds_since_epoch": 1654109903352,
    "time": "06:58:23 PM"
}

The GET request returns this JSON string.

read_page.kt
  

package com.zetcode

import com.google.gson.Gson
import java.net.URL

data class TimeData(val time:String, val milliseconds_since_epoch:Long, val date:String)

fun main() {

    val webPage = URL("http://time.jsontest.com")
    val data = webPage.readText()

    val gson = Gson()
    val td = gson.fromJson(data, TimeData::class.java)
    println(td)
}

The code example reads JSON data from http://time.jsontest.com.

In the next examples, we use the kotlinx-serialization-json
library.

## Json.encodeToString

The Json.encodeToString method serializes and encodes the given
value to string.

plugins {
    kotlin("jvm") version "1.6.20"
    kotlin("plugin.serialization") version "1.6.21"
}
...
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.3")
    testImplementation(kotlin("test"))
}

We need to set up the library. 

simple.kt
  

package com.zetcode

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class User(val name: String, val occupation: String)

fun main() {

    val u = User("John Doe", "gardener")
    val r = Json.encodeToString(u)

    println(r)
}

In the example, we serialize a User class.

## Json.decodeFromString

The Json.decodeFromString method decodes and deserializes the given
string to the value of the given type.

simple2.kt
  

package com.zetcode

import kotlinx.serialization.Serializable
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.Json

@Serializable
data class User(val name: String, val occupation: String)

fun main() {

    val userJson = """{"name":"John Doe","occupation":"gardener"}"""
    val u = Json.decodeFromString&lt;User&gt;(userJson)

    println(u)
}

In the example, we decode the JSON string into the User object.

## Source

[Kotlin serialization - documentation](https://kotlinlang.org/docs/serialization.html)

In this article we have shown how to work with JSON in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).