+++
title = "F# match expression"
date = 2025-08-29T19:54:31.816+01:00
draft = false
description = "Learn about pattern matching in F#. This tutorial explains match expressions and their usage in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# match expression

last modified May 17, 2025

This article explores how to effectively use match expressions in F# to enhance
branching logic and data handling.

A *match expression* enables structured branching by comparing an
expression against a predefined set of patterns. Each possible outcome is called
an *arm*, allowing developers to process data efficiently. Match
expressions can be used to transform input, decompose complex data structures,
or extract specific elements with ease.

F# match expressions rely on the match, with, and
when keywords. The match keyword initiates the
pattern-matching process, with defines the possible arms, and
when introduces additional conditional filters to refine matches.
This syntax provides a concise and expressive way to handle conditional logic
without excessive nested statements.

## Match constant patterns

The basic patterns are constants, integers, strings, or enumerations.

main.fsx
  

let word = "falcon"

let langs =
    [ "Slovak"
      "German"
      "Hungarian"
      "Russian"
      "French" ]

for lang in langs do

    let res =
        match lang with
        | "Slovak" -&gt; "sokol"
        | "German" -&gt; "Falke"
        | "Hungarian" -&gt; "sólyom"
        | "Russian" -&gt; "сокол"
        | "French" -&gt; "faucon"
        | _ -&gt; "unknown"

    printfn $"{word} in {lang} is {res}"

The program prints a translation of the word falcon in a few languages.

let res =
    match lang with
    | "Slovak" -&gt; "sokol"
    | "German" -&gt; "Falke"
    | "Hungarian" -&gt; "sólyom"
    | "Russian" -&gt; "сокол"
    | "French" -&gt; "faucon"
    | _ -&gt; "unknown"

The match expression returns a value. Each arm in a match expression is started
with |. The string pattern follows the | character.
The return value is specified after -&gt;. The wildcard match
_ returns a value for an option that is not recognized.

λ dotnet fsi main.fsx
falcon in Slovak is sokol
falcon in German is Falke
falcon in Hungarian is sólyom
falcon in Russian is сокол
falcon in French is faucon

## Matching enums

In the next example, we match enums.

main.fsx
  

open System

type Day =
    | Monday
    | Tuesday
    | Wednesday
    | Thursday
    | Friday
    | Saturday
    | Sunday

let days = [ Monday; Tuesday; Wednesday; Thursday; 
    Friday; Saturday; Sunday ]

let rnd = new Random()

let res = days 
        |&gt; Seq.sortBy (fun _ -&gt; rnd.Next()) 
        |&gt; Seq.take 3

for e in res do

    match e with
        | Monday -&gt; printfn "%s" "monday"
        | Tuesday -&gt;  printfn "%s" "tuesday"
        | Wednesday -&gt;  printfn "%s" "wednesay"
        | Thursday -&gt;  printfn "%s" "thursday"
        | Friday -&gt;  printfn "%s" "friday"
        | Saturday -&gt;  printfn "%s" "saturday"
        | Sunday -&gt;  printfn "%s" "sunday"

We define a Day enumeration. We randomly pick three Day
enumerations.

match e with
    | Monday -&gt; printfn "%s" "monday"
    | Tuesday -&gt;  printfn "%s" "tuesday"
    | Wednesday -&gt;  printfn "%s" "wednesay"
    | Thursday -&gt;  printfn "%s" "thursday"
    | Friday -&gt;  printfn "%s" "friday"
    | Saturday -&gt;  printfn "%s" "saturday"
    | Sunday -&gt;  printfn "%s" "sunday"

In this match expression, we match against enumerations. Here we do not return
value; we print messages.

λ dotnet fsi main.fsx
monday
friday
tuesday

## F# match guards

Guards are conditions that must be fulfilled inside the arm. Guards are created 
with when.

main.fsx
  

let vals = [ 1; -3; 5; 6; 0; 4; -9; 11; 22; -7 ]

for wal in vals do

    match wal with
    | n when n &lt; 0 -&gt; printfn "%d is negative" n
    | n when n &gt; 0 -&gt; printfn "%d is positive" n
    | _ -&gt; printfn "zero"

With pattern match, we categorize values into negative, positive, and zero
values.

| _ -&gt; printfn "zero"

With this we create an exhaustive matching.

λ dotnet fsi main.fsx
1 is positive
-3 is negative
5 is positive
6 is positive
zero
4 is positive
-9 is negative
11 is positive
22 is positive
-7 is negative

## F# match multiple options

Multiple options can be combined with |.

main.fsx
  

let grades = ["A"; "B"; "C"; "D"; "E"; "F"; "FX"]

for grade in grades do

    match grade with
    | "A" | "B" | "C" | "D" | "E" | "F" -&gt; printfn "%s" "passed"
    | _ -&gt; printfn "%s" "failed"

We categorize grades into two groups: passed and failed. The passed arm combines 
all matching values with |.

λ dotnet fsi main.fsx
passed
passed
passed
passed
passed
passed
failed

## F# match records

In the next example, we match records.

main.fsx
  

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

We have a few users, which are created with records. With record pattern
matching, we select all Does.

match user with
| { LastName = "Doe" } -&gt; printfn "%A" user
| _ -&gt; ()

We specify an anonymous record with an attribute as a pattern.

λ dotnet fsi main.fsx
{ FirstName = "John"
  LastName = "Doe"
  Occupation = "gardener" }
{ FirstName = "Jane"
  LastName = "Doe"
  Occupation = "teacher" }

## F# match types

With :?, we can match types.

main.fsx
  

open System.Collections

type User =
    { FirstName: string
      LastName: string
      Occupation: string }

let vals = new ArrayList()
vals.Add(1.2)
vals.Add(22)
vals.Add(true)
vals.Add("falcon")

vals.Add(
    { FirstName = "John"
      LastName = "Doe"
      Occupation = "gardener" }
)

for wal in vals do
    match wal with
    | :? int -&gt; printfn "an integer"
    | :? float -&gt; printfn "a float"
    | :? bool -&gt; printfn "a boolean"
    | :? User -&gt; printfn "a User"
    | _ -&gt; ()

We have a list with different data types. We go through the list and print the
type for each of the elements.

λ dotnet fsi main.fsx
a float
an integer
a boolean
a User

## The function syntax

When a pattern match is defined in a function, it can be simplified with the 
function keyword.

main.fsx
  

open System 

type Choices =
    | A
    | B
    | C

let getVal =
    function
    | 1 -&gt; A
    | 2 -&gt; B
    | _ -&gt; C

let chx =
    [ for _ in 1..7 do
          yield getVal (Random().Next(1, 4)) ]

printfn "%A" chx

In the example, we builda list of choices randomly.

let getVal =
    function
    | 1 -&gt; A
    | 2 -&gt; B
    | _ -&gt; C

This is the simplified pattern match syntax inside a function.

λ dotnet fsi main.fsx
[B; C; A; C; A; B; B]

## F# match list pattern

In the next example, we match list patterns.

main.fsx
  

let vals =
    [ [ 1; 2; 3 ]
      [ 1; 2 ]
      [ 3; 4 ]
      [ 8; 8 ]
      [ 0 ] ]

let twoels (sub: int list) =
    match sub with
    | [ x; y ] -&gt; printfn "%A" [ x; y ]
    | _ -&gt; ()

for sub in vals do
    twoels sub

The program prints all lists that contain two elements.

λ dotnet fsi main.fsx
[1; 2]
[3; 4]
[8; 8]

## List comprehension

A match pattern can be used in a list comprehension. 

main.fsx
  

let res =
    [ for e in 1..100 do
          match e with
          | e when e % 3 = 0 -&gt; yield "fizz"
          | e when e % 5 = 0 -&gt; yield "buzz"
          | e when e % 15 = 0 -&gt; yield "fizzbuzz"
          | _ -&gt; yield (string e) ]

printfn "%A" res

We solve the fizz-buzz challenge with a list comprehension. All values are
stored in a list. 

λ dotnet fsi main.fsx
["1"; "2"; "fizz"; "4"; "buzz"; "fizz"; "7"; "8"; "fizz"; "buzz"; "11"; "fizz";
 "13"; "14"; "fizz"; "16"; "17"; "fizz"; "19"; "buzz"; "fizz"; "22"; "23";
 "fizz"; "buzz"; "26"; "fizz"; "28"; "29"; "fizz"; "31"; "32"; "fizz"; "34";
 "buzz"; "fizz"; "37"; "38"; "fizz"; "buzz"; "41"; "fizz"; "43"; "44"; "fizz";
 "46"; "47"; "fizz"; "49"; "buzz"; "fizz"; "52"; "53"; "fizz"; "buzz"; "56";
 "fizz"; "58"; "59"; "fizz"; "61"; "62"; "fizz"; "64"; "buzz"; "fizz"; "67";
 "68"; "fizz"; "buzz"; "71"; "fizz"; "73"; "74"; "fizz"; "76"; "77"; "fizz";
 "79"; "buzz"; "fizz"; "82"; "83"; "fizz"; "buzz"; "86"; "fizz"; "88"; "89";
 "fizz"; "91"; "92"; "fizz"; "94"; "buzz"; "fizz"; "97"; "98"; "fizz"; "buzz"]

## Active patterns

With *active patterns* we can define named partitions of input data and 
use these names in a pattern matching expression.

main.fsx
  

let (|Even|Odd|) input = if input % 2 = 0 then Even else Odd

let testnum input =
   match input with
   | Even -&gt; printfn "%d is even" input
   | Odd -&gt; printfn "%d is odd" input

testnum 3
testnum 8
testnum 11

In the active pattern syntax, we define Even and Odd
names. These names are later used in the match expression.

let (|Even|Odd|) input = if input % 2 = 0 then Even else Odd

We define the Even and Odd active patterns.

let testnum input =
    match input with
    | Even -&gt; printfn "%d is even" input
    | Odd -&gt; printfn "%d is odd" input

These names are used in the match expression.

λ dotnet fsi main.fsx
3 is odd
8 is even
11 is odd

## Regular expressions

We can use regular expression in match patterns.

main.fsx
  

open System.Text.RegularExpressions

let (|RegEx|_|) p i =
    let m = Regex.Match(i, p)

    if m.Success then
        Some m.Groups
    else
        None

let checkrgx (msg) =
    match msg with
    | RegEx @"\d+" g -&gt; printfn "Digit: %A" g
    | RegEx @"\w+" g -&gt; printfn "Word : %A" g
    | _ -&gt; printfn "Not recognized"

checkrgx "an old falcon"
checkrgx "1984"
checkrgx "3 hawks"

In the example, we use active patterns and regular expression in pattern
matching. 

λ dotnet fsi main.fsx
Word : seq [an]
Digit: seq [1984]
Digit: seq [3]

## Exception handling

Match expressions can be used to handle exceptions.

main.fsx
  

open System

printf "Enter a number: "

let value = Console.ReadLine()

let n =
    match Int32.TryParse value with
    | true, num -&gt; num
    | _ -&gt; failwithf "'%s' is not an integer" value

let f = function
    | value when value &gt; 0 -&gt; printfn "positive value"
    | value when value = 0 -&gt; printfn "zero"
    | value when value &lt; 0 -&gt; printfn "negative value"
    | _ -&gt; ()

f n

We expect an integer value from the user. We try to parse the input value; if it
is not an integer, we fail with an error message.

let n =
    match Int32.TryParse value with
    | true, num -&gt; num
    | _ -&gt; failwithf "'%s' is not an integer" value

TryParse returns true if the parsing was successfull. Therefore, we
have the true boolean pattern in the first arm. For the rest we fail with
failwithf.

## Matching option types

Option types are used to represent values that may or may not be present.
Pattern matching is a safe and idiomatic way to handle Some and
None cases in F#.

main.fsx
  

let describeOption opt =
    match opt with
    | Some v -&gt; printfn "The value is %d" v
    | None -&gt; printfn "No value found"

describeOption (Some 10)
describeOption None

In this example, the function describeOption prints the value if it
is present, or a message if it is not. Pattern matching on option types makes
the code concise and safe.

λ dotnet fsi main.fsx
The value is 10
No value found

In this article we have worked with match expressions in F#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.