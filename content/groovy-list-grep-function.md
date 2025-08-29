+++
title = "Groovy List Grep Function"
date = 2025-08-29T19:56:29.015+01:00
draft = false
description = "Master the Groovy grep function with this tutorial. Learn how to filter and search lists with practical examples."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy List Grep Function

last modified February 25, 2025

The grep function in Groovy is a versatile tool for filtering and
searching elements in a list. It allows you to select elements that match a
specific condition, such as a pattern, type, or custom logic. This tutorial
covers the grep function with 15 practical examples.

## Basic Usage of Grep

The grep function filters a list based on a condition. It returns
a new list containing only the elements that match the condition.

BasicGrep.groovy
  

def numbers = [1, 2, 3, 4, 5, 6]
def evenNumbers = numbers.grep { it % 2 == 0 }

println(evenNumbers)

This example filters even numbers from a list using the grep
function.

## Filtering by Type

You can use grep to filter elements of a specific type.

FilterByType.groovy
  

def mixedList = [1, "Groovy", 3.14, true, "Java"]
def strings = mixedList.grep(String)

println(strings)

This example filters only string elements from a mixed list.

## Filtering by Regular Expression

grep can filter elements that match a regular expression.

FilterByRegex.groovy
  

def words = ["apple", "banana", "cherry", "date"]
def aWords = words.grep(~ /a/)

println(aWords)

This example filters words containing the letter "a".

## Filtering by Range

You can use a range to filter elements within a specific range.

FilterByRange.groovy
  

def numbers = [10, 20, 30, 40, 50]
def rangeFiltered = numbers.grep(20..40)

println(rangeFiltered)

This example filters numbers within the range 20 to 40.

## Filtering by Custom Condition

You can use a closure to define a custom filtering condition.

CustomCondition.groovy
  

def numbers = [1, 2, 3, 4, 5, 6]
def greaterThanThree = numbers.grep { it &gt; 3 }

println(greaterThanThree)

This example filters numbers greater than 3.

## Filtering Null Values

You can use grep to filter out null values from a list.

FilterNullValues.groovy
  

def mixedList = [1, null, "Groovy", null, 3.14]
def nonNullValues = mixedList.grep { it != null }

println(nonNullValues)

This example removes null values from a list.

## Filtering by Class

You can filter elements that are instances of a specific class.

FilterByClass.groovy
  

def mixedList = [1, "Groovy", 3.14, true]
def integers = mixedList.grep(Integer)

println(integers)

This example filters only integer values from a mixed list.

## Filtering by Multiple Conditions

You can combine multiple conditions in a closure for filtering.

MultipleConditions.groovy
  

def numbers = [1, 2, 3, 4, 5, 6]
def filtered = numbers.grep { it % 2 == 0 &amp;&amp; it &gt; 3 }

println(filtered)

This example filters even numbers greater than 3.

## Filtering by Collection

You can filter elements that are contained in another collection.

FilterByCollection.groovy
  

def numbers = [1, 2, 3, 4, 5, 6]
def filterList = [2, 4, 6]
def filtered = numbers.grep(filterList)

println(filtered)

This example filters elements that are present in another list.

## Filtering by Closure with Index

You can use the index of elements in the filtering condition.

FilterWithIndex.groovy
  

def numbers = [10, 20, 30, 40, 50]
def filtered = numbers.grep { it, index -&gt; index % 2 == 0 }

println(filtered)

This example filters elements at even indices.

## Filtering by Object Properties

You can filter objects based on their properties.

FilterByProperties.groovy
  

class Person {
    String name
    int age
}

def people = [
    new Person(name: "Alice", age: 30),
    new Person(name: "Bob", age: 25),
    new Person(name: "Charlie", age: 35)
]

def adults = people.grep { it.age &gt;= 30 }

println(adults.name)

This example filters people aged 30 or older.

## Filtering by Case Insensitive Match

You can filter strings using case-insensitive matching.

CaseInsensitiveMatch.groovy
  

def words = ["Apple", "banana", "Cherry", "Date"]
def aWords = words.grep(~ /(?i)a/)

println(aWords)

This example filters words containing "a" or "A".

## Filtering by Negative Condition

You can filter elements that do not match a condition.

NegativeCondition.groovy
  

def numbers = [1, 2, 3, 4, 5, 6]
def notEven = numbers.grep { !(it % 2 == 0) }

println(notEven)

This example filters numbers that are not even.

## Filtering by Custom Object

You can filter elements based on custom logic in an object.

CustomObjectFilter.groovy
  

class Filter {
    boolean isEven(n) { n % 2 == 0 }
}

def numbers = [1, 2, 3, 4, 5, 6]
def filter = new Filter()
def evenNumbers = numbers.grep(filter.&amp;isEven)

println(evenNumbers)

This example uses a custom object to filter even numbers.

## Filtering by Multiple Patterns

You can filter elements that match any of multiple patterns.

MultiplePatterns.groovy
  

def words = ["apple", "banana", "cherry", "date"]
def patterns = [~ /a/, ~ /e/]
def filtered = words.grep { word -&gt;
    patterns.any { word =~ it }
}

println(filtered)

This example filters words that contain either "a" or "e".

## Best Practices for Using Grep

**Use Descriptive Conditions:** Write clear and concise
conditions for better readability.
**Combine Conditions:** Use logical operators to combine
multiple conditions.
**Optimize Performance:** Avoid complex conditions for large
lists to improve performance.
**Leverage Regular Expressions:** Use regex for powerful
pattern matching.

## Source

[Groovy Grep Documentation](https://groovy-lang.org/groovy-dev-kit.html)

In this tutorial, we explored the grep function in Groovy with 15
practical examples. The grep function is a powerful tool for
filtering and searching lists, making it easier to work with collections in
Groovy.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).