+++
title = "Groovy Records"
date = 2025-08-29T19:56:31.301+01:00
draft = false
description = "Groovy Records tutorial covers the basics of records introduced in Groovy 4, with practical examples."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Records

last modified March 20, 2025

Groovy 4 introduced records, a concise way to create immutable data
classes. Before records, Groovy offered @Immutable and
@Canonical annotations for similar purposes.

## Simple Record Example

Here's a basic record in Groovy. Save it as SimpleRecord.groovy.

SimpleRecord.groovy
  

record User(String fname, String lname, String occupation) { }

def u = new User('John', 'Doe', 'gardener')
println u 

println u.fname
println u.lname
println u.occupation

Records automatically provide a constructor, getters, and a toString
method. This example creates a User record and accesses its fields.

$ groovy SimpleRecord.groovy
User(fname=John, lname=Doe, occupation=gardener)
John
Doe
gardener

## Named-Argument Constructor

Records support named arguments for flexible instantiation.

NamedArgsRecord.groovy
  

record User(String fname, String lname, String occupation) { }

def u = new User(lname:'Roe', fname:'Roger', occupation:'driver')
println u

Using named arguments, you can specify fields in any order. This improves
readability and flexibility when creating record instances.

$ groovy NamedArgsRecord.groovy
User(fname=Roger, lname=Roe, occupation=driver)

## Destructuring Records

Groovy allows destructuring records into individual variables.

DestructureRecord.groovy
  

record User(String fname, String lname, String occupation) { }

def u = new User('John', 'Doe', 'gardener')
def (fname, lname, occupation) = u

println "${fname} ${lname} is a ${occupation}"

Destructuring assigns record fields to variables in one line. Here, we
extract and use the fields in a formatted string.

$ groovy DestructureRecord.groovy
John Doe is a gardener

## Sortable Records

Records can be made sortable with the @Sortable annotation.

SortableRecord.groovy
  

import groovy.transform.Sortable

@Sortable(includes='lname')
record User(String fname, String lname, String occupation) {}

def users = [
    new User('John', 'Doe', 'gardener'),
    new User('Roger', 'Roe', 'driver'),
    new User('Lucia', 'Smith', 'accountant'),
    new User('Paul', 'Newman', 'firefighter'),
    new User('Adam', 'Clapton', 'teacher'),
    new User('Jane', 'Walter', 'pilot')
]

for (def user in users) {
    println user
}

println '----------------------'

users.sort()

for (def user in users) {
    println user
}

The @Sortable annotation makes records comparable. Here, we
sort users by lname, showing them before and after sorting.

$ groovy SortableRecord.groovy
User(fname=John, lname=Doe, occupation=gardener)
User(fname=Roger, lname=Roe, occupation=driver)
User(fname=Lucia, lname=Smith, occupation=accountant)
User(fname=Paul, lname=Newman, occupation=firefighter)
User(fname=Adam, lname=Clapton, occupation=teacher)
User(fname=Jane, lname=Walter, occupation=pilot)
----------------------
User(fname=Adam, lname=Clapton, occupation=teacher)
User(fname=John, lname=Doe, occupation=gardener)
User(fname=Paul, lname=Newman, occupation=firefighter)
User(fname=Roger, lname=Roe, occupation=driver)
User(fname=Lucia, lname=Smith, occupation=accountant)
User(fname=Jane, lname=Walter, occupation=pilot)

## Grouping Records

Records can be grouped using Groovy's groupBy method.

GroupRecord.groovy
  

import java.time.LocalDate

record User(String name, String occupation, LocalDate dob) { }

def users = [
    new User('John Doe', 'gardener', LocalDate.parse('1973-09-07')),
    new User('Roger Roe', 'driver', LocalDate.parse('1963-03-30')),
    new User('Kim Smith', 'teacher', LocalDate.parse('1980-05-12')),
    new User('Joe Nigel', 'artist', LocalDate.parse('1983-03-30')),
    new User('Liam Strong', 'teacher', LocalDate.parse('2009-03-06')),
    new User('Robert Young', 'gardener', LocalDate.parse('1978-11-16')),
    new User('Liam Strong', 'teacher', LocalDate.parse('1986-10-23'))
]
 
def res = users.groupBy({ it.occupation })

for (def e in res) {
    println e
}

This example groups users by occupation. The groupBy method
returns a map where keys are occupations and values are lists of users.

$ groovy GroupRecord.groovy
gardener=[User(name=John Doe, occupation=gardener, dob=1973-09-07), User(name=Robert Young, occupation=gardener, dob=1978-11-16)]
driver=[User(name=Roger Roe, occupation=driver, dob=1963-03-30)]
teacher=[User(name=Kim Smith, occupation=teacher, dob=1980-05-12), User(name=Liam Strong, occupation=teacher, dob=2009-03-06), User(name=Liam Strong, occupation=teacher, dob=1986-10-23)]
artist=[User(name=Joe Nigel, occupation=artist, dob=1983-03-30)]

## Custom Static Factory with Records

Records can include static methods, like this example splitting users by
millennial status.

StaticFactoryRecord.groovy
  

import java.time.LocalDate

record User(String name, String occupation, LocalDate dob) { 
    static User of(String name, String occupation, LocalDate dob) {
        return new User(name, occupation, dob)
    }
}

def users = [
    User.of('John Doe', 'gardener', LocalDate.parse('1973-09-07')),
    User.of('Roger Roe', 'driver', LocalDate.parse('1963-03-30')),
    User.of('Kim Smith', 'teacher', LocalDate.parse('1980-05-12')),
    User.of('Joe Nigel', 'artist', LocalDate.parse('1983-03-30')),
    User.of('Liam Strong', 'teacher', LocalDate.parse('2009-03-06')),
    User.of('Robert Young', 'gardener', LocalDate.parse('1978-11-16')),
    User.of('Liam Strong', 'teacher', LocalDate.parse('1986-10-23'))
]

def millen = LocalDate.parse('2000-01-01')
def res = users.groupBy({ it.dob &gt; millen })

println 'millennials'
for (def e in res[true]) {
    println e
}

println 'others'
for (def e in res[false]) {
    println e
}

The static of method provides an alternative constructor. We
use it to group users born after 2000 (millennials) versus others.

$ groovy StaticFactoryRecord.groovy
millennials
User(name=Liam Strong, occupation=teacher, dob=2009-03-06)
others
User(name=John Doe, occupation=gardener, dob=1973-09-07)
User(name=Roger Roe, occupation=driver, dob=1963-03-30)
User(name=Kim Smith, occupation=teacher, dob=1980-05-12)
User(name=Joe Nigel, occupation=artist, dob=1983-03-30)
User(name=Robert Young, occupation=gardener, dob=1978-11-16)
User(name=Liam Strong, occupation=teacher, dob=1986-10-23)

## Source

[Groovy Documentation](https://groovy-lang.org/documentation.html)

This tutorial covered the essentials of Groovy records with examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).