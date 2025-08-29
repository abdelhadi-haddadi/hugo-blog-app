+++
title = "Groovy JsonSlurper"
date = 2025-08-29T19:56:30.168+01:00
draft = false
description = "Groovy JsonSlurper tutorial shows how to parse JSON data in Groovy using JsonSlurper. Learn to read and manipulate JSON with practical examples."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy JsonSlurper

last modified February 25, 2025

Groovy's JsonSlurper is a powerful tool for parsing JSON data. It
allows you to easily convert JSON strings into Groovy objects, making it simple
to read and manipulate JSON data. This tutorial covers how to use
JsonSlurper with practical examples.

## Parsing JSON with JsonSlurper

To parse JSON data, create an instance of JsonSlurper and use its
parseText method to convert a JSON string into a Groovy object.

SimpleJsonSlurper.groovy
  

import groovy.json.JsonSlurper

def jsonText = '''{
    "name": "Alice",
    "age": 30,
    "city": "Wonderland"
}'''

def jsonSlurper = new JsonSlurper()
def jsonObject = jsonSlurper.parseText(jsonText)

println(jsonObject.name)
println(jsonObject.age)
println(jsonObject.city)

This example demonstrates how to parse a JSON string into a Groovy object using
JsonSlurper. The parsed object can be accessed like a map.

## Parsing JSON from a File

JsonSlurper can also parse JSON data from a file using the
parse method.

JsonSlurperFromFile.groovy
  

import groovy.json.JsonSlurper

def jsonFile = new File('data.json')
def jsonSlurper = new JsonSlurper()
def jsonObject = jsonSlurper.parse(jsonFile)

println(jsonObject.name)
println(jsonObject.age)
println(jsonObject.city)

This example shows how to parse JSON data from a file. The parse
method reads the file and converts its contents into a Groovy object.

## Parsing JSON Arrays

JsonSlurper can handle JSON arrays, converting them into Groovy
lists.

JsonSlurperArray.groovy
  

import groovy.json.JsonSlurper

def jsonText = '''[
    { "name": "Alice", "age": 30 },
    { "name": "Bob", "age": 25 }
]'''

def jsonSlurper = new JsonSlurper()
def jsonArray = jsonSlurper.parseText(jsonText)

jsonArray.each { person -&gt;
    println("Name: ${person.name}, Age: ${person.age}")
}

This example demonstrates how to parse a JSON array into a Groovy list. Each
element of the array is a map, which can be accessed using Groovy's collection
methods.

## Handling Nested JSON

JsonSlurper can parse nested JSON structures, allowing you to
access deeply nested data.

NestedJsonSlurper.groovy
  

import groovy.json.JsonSlurper

def jsonText = '''{
    "name": "Alice",
    "address": {
        "city": "Wonderland",
        "zip": "12345"
    }
}'''

def jsonSlurper = new JsonSlurper()
def jsonObject = jsonSlurper.parseText(jsonText)

println(jsonObject.name)
println(jsonObject.address.city)
println(jsonObject.address.zip)

This example shows how to parse and access nested JSON data. The nested
address object is accessed using dot notation.

## Parsing JSON with Custom Parsers

JsonSlurper supports custom parsers for handling specific JSON
formats or data types.

CustomParser.groovy
  

import groovy.json.JsonSlurper
import groovy.json.JsonParserType

def jsonText = '''{
    "name": "Alice",
    "age": 30
}'''

def jsonSlurper = new JsonSlurper().setType(JsonParserType.INDEX_OVERLAY)
def jsonObject = jsonSlurper.parseText(jsonText)

println(jsonObject.name)
println(jsonObject.age)

This example demonstrates how to use a custom parser with JsonSlurper.
The setType method allows you to specify the parser type, such as
INDEX_OVERLAY for optimized parsing.

## Best Practices for Using JsonSlurper

**Validate JSON Data:** Ensure that the JSON data is valid
before parsing to avoid errors.
**Handle Large Files Carefully:** Use appropriate parsers for
large JSON files to avoid memory issues.
**Use Custom Parsers:** Use custom parsers for specific JSON
formats or performance requirements.
**Check for Null Values:** Handle null values in JSON data to
prevent runtime exceptions.

## Source

[Groovy JsonSlurper Documentation](https://groovy-lang.org/json.html)

In this tutorial, we explored how to use JsonSlurper to parse JSON
data in Groovy. JsonSlurper is a versatile tool that simplifies
working with JSON, making it easy to read and manipulate JSON data in Groovy.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).