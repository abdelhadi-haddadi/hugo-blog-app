+++
title = "F# record"
date = 2025-08-29T19:54:32.934+01:00
draft = false
description = "Learn about records in F#. This tutorial explains how to create and use immutable records in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# record

last modified May 1, 2025

In this article, we explore how to effectively work with records in F# and
understand their role in data structuring.

A record is a collection of named values grouped together in a
structured format. By default, records are *immutable*, meaning their
values cannot be changed after initialization. However, they can include
*members* such as functions or computed properties, enhancing their
functionality. If mutability is required, fields can be explicitly marked as
*mutable* using the mutable keyword.

## F# record simple example

A record is defined with the type keyword. The values are specified
between the { } brackets.

simple.fsx
  

type User =
    { FirstName: string; LastName: string; Occupation: string; Salary: int }

let users =
    [ { FirstName = "Robert"; LastName = "Novak"; Occupation = "teacher"; Salary = 1770 }
      { FirstName = "John"; LastName = "Doe"; Occupation = "gardener"; Salary = 1230 }
      { FirstName = "Lucy"; LastName = "Novak"; Occupation = "accountant"; Salary = 670 } ]

users |&gt; List.iter (printfn "%A")

The program defines a User record. We create a list of three users 
from the record type. The list is then iterated.

type User =
  { FirstName: string; LastName: string; Occupation: string; Salary: int }

The record type defines three fields. The fields are separated with semicolons.
These semicolons are optional. The field name and its type are separated with a
colon.

let users =
    [ { FirstName = "Robert"; LastName = "Novak"; Occupation = "teacher"; Salary = 1770 }
      { FirstName = "John"; LastName = "Doe"; Occupation = "gardener"; Salary = 1230 }
      { FirstName = "Lucy"; LastName = "Novak"; Occupation = "accountant"; Salary = 670 } ]

We have a list of three users. The field names are separated from the values 
with the equals character.

λ dotnet fsi simple.fsx
{ FirstName = "Robert"
  LastName = "Novak"
  Occupation = "teacher"
  Salary = 1770 }
{ FirstName = "John"
  LastName = "Doe"
  Occupation = "gardener"
  Salary = 1230 }
{ FirstName = "Lucy"
  LastName = "Novak"
  Occupation = "accountant"
  Salary = 670 }

When we place each field on a separate line, we can omit the semicolon.

simple2.fsx
  

type User =
    { FirstName: string
      LastName: string
      Occupation: string
      Salary: int }

let users =
    [ { FirstName = "Robert"
        LastName = "Novak"
        Occupation = "teacher"
        Salary = 1770 }
      { FirstName = "John"
        LastName = "Doe"
        Occupation = "gardener"
        Salary = 1230 }
      { FirstName = "Lucy"
        LastName = "Novak"
        Occupation = "accountant"
        Salary = 670 } ]

users |&gt; List.iter (printfn "%A")

The program defines and creates records without semicolons.

## F# record access fields

The fields of a record are access via the dot character.

access.fsx
  

type User = { Name: string; Occupation: string }

let u =
    { Name = "John Doe"
      Occupation = "gardener" }

printfn "%s" u.Name
printfn "%s" u.Occupation

We create a user record with two fields and then print the values of those
fields. The field names are accessed via the dot character.

λ dotnet fsi access.fsx
John Doe
gardener

## F# record fields order

F# determines a records type by the name and type of its fields, not the
order that fields are used.

order.fsx
  

type User = { Name: string; Occupation: string }

let u1 =
    { Name = "John Doe"
      Occupation = "gardener" }

let u2 =
    { Occupation = "driver"
      Name = "Roger Roe" }

printfn "%A" u1
printfn "%A" u2

We define two record objects. The order in which the Name and
Occupation orders are defined is not relevant.

λ dotnet fsi order.fsx
{ Name = "John Doe"
  Occupation = "gardener" }
{ Name = "Roger Roe"
  Occupation = "driver" }

## F# clone record

New records can be derived from existing records using with.

clone.fsx
  

type User = { Name: string; Occupation: string }

let u1 =
    { Name = "John Doe"
      Occupation = "gardener" }

printfn "%A" u1

let u2 = { u1 with Name = "Peter Smith"}
printfn "%A" u2

In the example, we clone a new user base on an existing user. 

let u2 = { u1 with Name = "Peter Smith"}

We derive user2 from user1; we keep the occupation and change the name.

λ dotnet fsi clone.fsx
{ Name = "John Doe"
  Occupation = "gardener" }
{ Name = "Peter Smith"
  Occupation = "gardener" }

## F# record output

The %A specifier is used for pretty-printing tuples, records and
union types. The %O is used for other objects, using ToString.

output.fsx
  

type User =
  { Name: string
    Occupation: string }
  override this.ToString() =
      sprintf "%s %s" this.Name this.Occupation

let u1 =
  { Name = "John Doe"
    Occupation = "gardener" }

let u2 =
  { Name = "Roger Roe"
    Occupation = "driver" }

printfn "%A" u1
printfn "%O" u2

We define a record type where we override the ToString method. 
We output the records with the %A and %O specifiers.

λ dotnet fsi output.fsx
{ Name = "John Doe"
  Occupation = "gardener" }
Roger Roe driver

## F# record deconstructing

Deconstructing is unpacking types into single pieces.

decons.fsx
  

type User = { Name: string; Occupation: string }

let u1 =
    { Name = "John Doe"
      Occupation = "gardener" }

let { Name = n1; Occupation = o1 } = u1
printfn "%s %s" n1 o1

let { Name = _; Occupation = o2 } = u1
printfn "%s" o2

let { Name = n2 } = u1
printfn "%s" n2

The program deconstructs a user record. Fields can be omitted.

λ dotnet fsi decons.fsx
John Doe gardener
gardener
John Doe

## F# nesting records

We can nest a record inside another record with and.

nest.fsx
  

type User =
    { Name: string
      Occupation: string
      Address: Address }

and Address = { Line1: string; Line2: string }

let u1 =
    { Name = "John Doe"
      Occupation = "gardener"
      Address =
        { Line1 = "Address 1"
          Line2 = "Address 2" } }

printfn "%A" u1

let u2 =
    { Name = "Roger Doe"
      Occupation = "driver"
      Address =
        { Line1 = "Address 1"
          Line2 = "Address 2" } }

printfn "%A" u2

We have a User record where we nest an Address type.

λ dotnet fsi nest.fsx
{ Name = "John Doe"
  Occupation = "gardener"
  Address = { Line1 = "Address 1"
              Line2 = "Address 2" }
  Colours = { Col1 = "red"
              Col2 = "blue" } }
{ Name = "Roger Doe"
  Occupation = "driver"
  Address = { Line1 = "Address 1"
              Line2 = "Address 2" }
  Colours = { Col1 = "red"
              Col2 = "green" } }

## F# record equality

Records have structural equality. Structural equality is when two objects
contain the same values.

equality.fsx
  

type User =
    { Name: string
      Occupation: string }

let u1 =
    { Name = "John Doe"
      Occupation = "gardener" }

let u2 =
    { Name = "Roger Roe"
      Occupation = "driver" }

printfn "%A" (u1 = u2)

In the example we compare two user records.

## F# record members

Members in a record can be defined witih member.

member.fsx
  

type User =
  { Name: string
    Occupation: string }

    member this.Info() =
        $"{this.Name} is a {this.Occupation}"

let u1 = { Name= "John Doe"; Occupation="gardener" }
let u2 = { Name= "Roger Roe"; Occupation="driver" }

printfn "%s" (u1.Info())
printfn "%s" (u2.Info())

In the example, we define the Info member.

λ dotnet fsi member.fsx
John Doe is a gardener
Roger Roe is a driver

## F# record pattern match

Records can be used with pattern matching.

pattern_match.fsx
  

type User =
    { FirstName: string
      LastName: string
      Occupation: string }

let users =
    [ { FirstName = "John"
        LastName = "Doe"
        Occupation = "gardener" }
      { FirstName = "Jane"
        LastName = "Doe"
        Occupation = "teacher" }
      { FirstName = "Roger"
        LastName = "Roe"
        Occupation = "driver" } ]

for user in users do
    match user with
    | { LastName = "Doe" } -&gt; printfn "%A" user
    | _ -&gt; ()

The example prints all Does.

| { LastName = "Doe" } -&gt; printfn "%A" user

In this branch we check for all records whose LastName equals to 
"Doe".

In this article we have worked with record type in F#.

  

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.