+++
title = "Groovy Switch Expressions"
date = 2025-08-29T19:56:32.417+01:00
draft = false
description = "Groovy Switch Expressions tutorial covers pattern matching with strings, types, ranges, and more."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Switch Expressions

last modified March 20, 2025

Switch expressions in Groovy, also known as pattern matching, offer a
concise way to handle multiple conditions. Unlike traditional switches,
they return values, enhancing expressiveness. This tutorial explores their
versatility with examples.

## Simple Switch

Switch expressions use the -&gt; syntax to return a value based
on a condition, simplifying basic decision-making.

SimpleSwitch.groovy
  

def num = 3
def res = switch (num) {
    case 3 -&gt; "three"
    default -&gt; "other"
}
println res

switch (num) checks num (3) against cases.
case 3 matches, returning "three". The default
case handles unmatched values. This compact form returns a value directly,
unlike statement-based switches.

$ groovy SimpleSwitch.groovy
three

## Matching String Literals

Switch expressions can match string inputs, making them ideal for text-based
conditions like user responses.

SwitchStrings.groovy
  

def res = System.console().readLine 'Capital of Slovakia?: '
def capital = res.capitalize()

def msg = switch (capital) {
    case 'Bratislava' -&gt; 'correct answer'
    default -&gt; 'wrong answer'
}

println msg

readLine gets user input, capitalized for consistency.
switch (capital) checks if it's "Bratislava", returning
"correct answer", else "wrong answer" via default. This shows
string matching with a fallback, useful for quizzes or validation.

$ groovy SwitchStrings.groovy
Capital of Slovakia?: bratislava
correct answer

## Matching Integers

Integer matching allows switch expressions to handle numeric options,
common in menu-driven programs.

SwitchIntegers.groovy
  

def menu = '''
Select option
1 - start
2 - slow down
3 - accelerate
4 - pause
5 - terminate
'''

println menu

def opt = System.console().readLine ': ' 

def res = switch (opt as Integer) {
    case 1 -&gt; 'start'
    case 2 -&gt; 'slow down'
    case 3 -&gt; 'accelerate'
    case 4 -&gt; 'pause'
    case 5 -&gt; 'terminate'
    default -&gt; 'unknown'
}

println "your option: $res"

A menu is displayed, and opt as Integer converts input to a
number. switch maps 1-5 to actions, with default
for invalid inputs. This returns a string like "your option: accelerate",
demonstrating numeric pattern matching.

$ groovy SwitchIntegers.groovy
Select option
1 - start
2 - slow down
3 - accelerate
4 - pause
5 - terminate
: 3
your option: accelerate

## Matching Types

Switch expressions can match object types, identifying the class of a value
in a mixed collection.

SwitchTypes.groovy
  

def data = [1, 2.2, 'falcon', true, [1, 2, 3], 2g]

for (e in data) {
    def res = switch (e) {
        case Integer -&gt; 'integer'
        case String -&gt; 'string'
        case Boolean -&gt; 'boolean'
        case List -&gt; 'list'
        default -&gt; 'other'
    }
    println res
}

data contains varied types. switch (e) checks each
element's type, returning a label (e.g., "integer" for 1, "list" for [1, 2,
3]). default catches BigDecimal (2g). This highlights type-based
pattern matching for dynamic data.

$ groovy SwitchTypes.groovy
integer
other
string
boolean
list
other

## Multiple Options

Comma-separated cases group multiple values under one outcome, streamlining
conditions with shared results.

SwitchMultiple.groovy
  

def grades = ['A', 'B', 'C', 'D', 'E', 'F', 'FX']

for (grade in grades) {
    switch (grade) {
        case 'A' , 'B' , 'C' , 'D' , 'E' , 'F' -&gt; println('passed')
        case 'FX' -&gt; println('failed')
    }
}

grades lists academic marks. case 'A' , 'B' , ...
groups passing grades (A-F), printing "passed", while 'FX' prints "failed".
This comma syntax consolidates multiple matches into a single action,
enhancing readability.

$ groovy SwitchMultiple.groovy
passed
passed
passed
passed
passed
passed
failed

## Default Option

The default case in recursive functions provides a catch-all,
demonstrating switch expressions' return value utility.

SwitchDefault.groovy
  

def factorial(n) {
    switch (n) {
        case 0, 1 -&gt; 1
        default -&gt; n * factorial(n - 1)
    }
}

for (i in 0g..5g) {
    def f = factorial(i)
    println("$i $f")
}

factorial uses switch to compute factorials.
case 0, 1 returns 1 (base cases), and default
recursively multiplies. The loop prints factorials from 0 to 5 (e.g., 5
120). This shows switch as an expression in recursion.

$ groovy SwitchDefault.groovy
0 1
1 1
2 2
3 6
4 24
5 120

## Guards Within Options

Guards use closures to add conditions to cases, refining matches beyond
simple equality.

SwitchGuards.groovy
  

def rnd = new Random()
def ri = rnd.nextInt(-5, 5)

def res = switch (ri) {
    case { ri &lt; 0 } -&gt; "${ri}: negative value"
    case { ri == 0 } -&gt; "${ri}: zero"
    case { ri &gt; 0 } -&gt; "${ri}: positive value"
}

println res

ri is a random integer (-5 to 4). switch uses
guards: { ri &lt; 0 } for negatives, { ri == 0 } for
zero, and { ri &gt; 0 } for positives. Output varies (e.g., "-3:
negative value"), showing dynamic condition matching.

$ groovy SwitchGuards.groovy
2: positive value  // varies per run

## Matching Enumerations

Enums pair naturally with switch expressions, matching specific constants
for type-safe logic.

SwitchEnums.groovy
  

enum Day {
    Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
}

def days = [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, 
    Day.Friday, Day.Saturday, Day.Sunday]

def res = []
def random = new Random()

(0..3).each {
    res &lt;&lt; days[random.nextInt(days.size())]
}

for (e in res) {
    switch (e) {
        case Day.Monday -&gt; println("monday")
        case Day.Tuesday -&gt; println("tuesday")
        case Day.Wednesday -&gt; println("wednesday")
        case Day.Thursday -&gt; println("thursday")
        case Day.Friday -&gt; println("friday")
        case Day.Saturday -&gt; println("saturday")
        case Day.Sunday -&gt; println("sunday")
    }
}

Day enum defines weekdays. Four random days are selected, and
switch matches each, printing its name (e.g., "tuesday").
Output varies, but this shows enums as switch targets, leveraging their
fixed values for clarity.

$ groovy SwitchEnums.groovy
friday
monday
sunday
thursday  // varies per run

## Matching Enum Ranges

Switch expressions support ranges of enums, grouping consecutive values
for concise logic.

SwitchEnumRanges.groovy
  

enum Day {
    Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
}

def isWeekend(Day d) {
    switch (d) {
        case Day.Monday..Day.Friday -&gt; false 
        case Day.Saturday, Day.Sunday -&gt; true
    }
}

def days = [Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, 
    Day.Friday, Day.Saturday, Day.Sunday]

for (e in days) {
    if (isWeekend(e)) {
        println('weekend')
    } else {
        println('weekday')
    }
}

isWeekend uses Monday..Friday for weekdays
(false) and Saturday, Sunday for weekends (true). The loop
tests all days, printing "weekday" five times, then "weekend" twice. This
combines ranges and multiple matches effectively.

$ groovy SwitchEnumRanges.groovy
weekday
weekday
weekday
weekday
weekday
weekend
weekend

## Matching Objects

Switch expressions can match object types, grouping related classes for
shared handling.

SwitchObjects.groovy
  

record Cat(String name) {}
record Dog(String name) {}
record Person(String name) {}

def data = [new Cat('Missy'), new Dog('Jasper'), new Dog('Ace'), 
    new Person('Peter'), 'Jupiter']

for (e in data) {
    switch (e) {
        case Cat, Dog -&gt; println("${e} is a pet")
        case Person -&gt; println("${e} is a human")
        default -&gt; println('unknown')
    }
}

Cat, Dog, and Person are records.
case Cat, Dog groups pets, case Person matches
humans, and default catches others (e.g., "Jupiter"). This
prints type-based messages, showing object pattern matching.

$ groovy SwitchObjects.groovy
Cat[name=Missy] is a pet
Dog[name=Jasper] is a pet
Dog[name=Ace] is a pet
Person[name=Peter] is a human
unknown

## Matching Ranges

Numeric ranges in switch expressions check if a value falls within bounds,
useful for categorizing numbers.

SwitchRanges.groovy
  

def rnd = new Random()
def ri = rnd.nextInt(0, 120)

switch (ri) {
    case 1..30 -&gt; println('value is in 1 to 30')
    case 31..60 -&gt; println('value is in 31 to 60')
    case 61..90 -&gt; println('value is in 61 to 90')
    case 91..120 -&gt; println('value is in 91 to 120')
}

ri is random (0-119). switch checks ranges (e.g.,
1..30), printing the matching range's message. Output varies
(e.g., "value is in 61 to 90"), showing how ranges partition numeric
values efficiently.

$ groovy SwitchRanges.groovy
value is in 61 to 90  // varies per run

## Matching Regular Expressions

Switch expressions can match strings against regex patterns, filtering
based on complex criteria.

SwitchRegex.groovy
  

def words = ['week', 'bitcoin', 'cloud', 'copper', 'raw', 'war', 
    'cup', 'water']

def selected = []

for (word in words) {
    def res = switch (word) {
        case ~/^w.*/ -&gt; word
        case ~/^c.*/ -&gt; word
        default -&gt; 'skip'
    }
    if (res != 'skip') {
        selected.add(res)
    }
}

println selected

~/^w.*/ matches words starting with "w", ~/^c.*/
with "c". Matching words are returned, others get "skip". selected
collects matches (e.g., "week", "cloud"), showing regex pattern matching
in action.

$ groovy SwitchRegex.groovy
[week, cloud, copper, war, cup, water]

## Matching Lists (Contains)

Switch expressions can check if a value is in a list, useful for membership
tests within data structures.

SwitchListContains.groovy
  

def users = [
    ['John', 'Doe', 'gardener'],
    ['Jane', 'Doe', 'teacher'],
    ['Roger', 'Roe', 'driver'],
    ['Martin', 'Molnar', 'programmer'],
    ['Robert', 'Kovac', 'shopkeeper'],
    ['Tomas', 'Novy', 'programmer']
]

def occupation = 'programmer'

for (user in users) {
    switch (occupation) {
        case user -&gt; println("${user[0]} ${user[1]} is a programmer")
        default -&gt; println("${user[0]} ${user[1]} is not a programmer")
    }
}

users lists name-occupation pairs. case user
checks if "programmer" is in user (the list), printing
appropriately. This identifies programmers (Martin, Tomas), using list
containment as a pattern.

$ groovy SwitchListContains.groovy
John Doe is not a programmer
Jane Doe is not a programmer
Roger Roe is not a programmer
Martin Molnar is a programmer
Robert Kovac is not a programmer
Tomas Novy is a programmer

## Matching Lists (Property Check)

Switch expressions can test list properties, like checking for a value in
a sublist, enhancing data queries.

SwitchListProperty.groovy
  

def users = [
    ['name': 'Paul', 'grades': ['D', 'A', 'B', 'A']],
    ['name': 'Martin', 'grades': ['F', 'B', 'E', 'FX']],
    ['name': 'Lucia', 'grades': ['A', 'A', 'B', 'FX']],
    ['name': 'Jan', 'grades': ['A', 'B', 'B', 'B']]
]

for (user in users) {
    switch ('FX') {
        case user.grades -&gt; println("${user.name} did not pass")
    }
}

users maps names to grades. case user.grades
checks if 'FX' is in the grades list, printing for failures
(Martin, Lucia). This uses switch to query sublist contents, skipping
non-matches implicitly.

$ groovy SwitchListProperty.groovy
Martin did not pass
Lucia did not pass

## Source

[Groovy Documentation](https://groovy-lang.org/documentation.html)

This tutorial explored Groovy switch expressions with examples.

## Author

I'm Jan Bodnar, a passionate programmer with years of experience. Since
2007, I've written over 1,400 articles and 8 e-books, teaching coding for
over a decade.

List [all Groovy tutorials](/all/#groovy).