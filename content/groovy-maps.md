+++
title = "Groovy Maps"
date = 2025-08-29T19:56:30.141+01:00
draft = false
description = "Groovy Maps tutorial covers basics and operations like traversing, sorting, and grouping with examples."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Maps

last modified March 20, 2025

Maps in Groovy are key-value collections where each key maps to a value.
They're dynamic, allowing you to add or remove entries easily. This
tutorial covers creating maps, accessing values, and performing operations
like traversing, sorting, and grouping, with examples to illustrate each
concept.

## Basics

Maps are defined with square brackets and colon-separated key-value pairs.
Groovy provides multiple ways to access and modify them, making them
versatile for storing and retrieving data efficiently.

MapBasics.groovy
  

def cts = [ sk: 'Slovakia', ru: 'Russia', de: 'Germany', no: 'Norway' ]

println cts['sk']
println cts.get('sk')
println cts.size()

cts.put('hu', 'Hungary')
println cts.containsKey('hu')

Here, cts maps country codes to names. You can access values
using ['key'] or get('key'), both returning
"Slovakia" for "sk". size() gives the number of entries.
put('hu', 'Hungary') adds a new pair, and
containsKey('hu') checks if "hu" exists, returning
true. These methods showcase Groovy's straightforward map
handling.

## Empty Map and Adding

You can start with an empty map and build it up dynamically, a common
approach when data is gathered incrementally.

EmptyMap.groovy
  

def map = [:]
map['a'] = 1
map['b'] = 2
println map

[:] creates an empty map. Using ['key'] = value,
we add entries one by one. This prints [a:1, b:2],
demonstrating how maps grow flexibly without a predefined size, unlike
arrays.

## Traversing

Traversing maps means iterating over their entries. Groovy offers several
methods to loop through keys and values, with options to include indices
for added context.

MapTraversal.groovy
  

def capitals = [ Bratislava: 424207, Vilnius: 556723, Lisbon: 564657,
    Riga: 713016, Jerusalem: 780200, Warsaw: 1711324,
    Budapest: 1729040, Prague: 1241664, Helsinki: 596661,
    Tokyo: 13189000, Madrid: 3233527 ]

capitals.each { e -&gt; 
    println "$e.key $e.value"
}

println "-----------------------------"

capitals.each { k, v -&gt; 
    println "$k $v"
}

println "-----------------------------"

capitals.eachWithIndex { k, v, i -&gt; 
    println "$i $k $v"
}

capitals maps city names to populations. The first
each uses e as an entry, accessing
e.key and e.value. The second names parameters
k and v for clarity. eachWithIndex
adds i, numbering each entry. These variants show Groovy's
flexible iteration, letting you choose the style that best fits your needs.

## Sorting

Sorting a map rearranges its entries based on keys or values. Groovy's
sort method returns a new sorted map, leaving the original
intact, and supports custom comparators via closures.

MapSorting.groovy
  

def capitals = [ Bratislava: 424207, Vilnius: 556723, Lisbon: 564657,
    Riga: 713016, Jerusalem: 780200, Warsaw: 1711324,
    Budapest: 1729040, Prague: 1241664, Helsinki: 596661,
    Tokyo: 13189000, Madrid: 3233527 ]
    
println capitals.sort { it.key }
println capitals.sort { it.value }
println capitals.sort { a, b -&gt; b.value &lt;=&gt; a.value }

sort { it.key } sorts alphabetically by city name.
sort { it.value } sorts by population ascending.
sort { a, b -&gt; b.value &lt;=&gt; a.value } uses the spaceship
operator (&lt;=&gt;) to sort by population descending. The original
capitals map isn't changed; each call produces a new sorted
map, showing Groovy's functional approach to sorting.

## Finding

Groovy's find and findAll methods search maps
(typically of maps) for entries matching a condition, returning the first
match or all matches, respectively. These are powerful for querying data.

MapFinding.groovy
  

def users = [
   [fname: "Robert", lname: "Novak", salary: 1770],
   [fname: "John", lname:"Doe", salary: 1230],
   [fname: "Lucy", lname:"Novak", salary: 670],
   [fname: "Ben", lname:"Walter", salary: 2050],
   [fname: "Robin",lname: "Brown", salary: 2300],
   [fname: "Amy",lname: "Doe", salary: 1250],
   [fname: "Joe", lname:"Draker", salary: 1190],
   [fname: "Janet", lname:"Doe", salary: 980],
   [fname: "Peter",lname: "Novak", salary: 990],
   [fname:"Albert", lname:"Novak",salary: 193]
]

println users.find { u -&gt; u.salary &lt; 1000 }
println users.findAll { u -&gt; u.salary &lt; 1000 }

users is a list of maps, each representing a person.
find { u -&gt; u.salary &lt; 1000 } returns the first user with a
salary under 1000 (Lucy). findAll returns all such users (Lucy,
Janet, Peter, Albert). These methods use closures to define the condition,
making them adaptable to any criteria you need to search by.

## Counting

The count and countBy methods tally occurrences
in a map or list of maps based on conditions, providing quick summaries of
data without manual iteration.

MapCounting.groovy
  

def users = [
   [fname: "Robert", lname: "Novak", salary: 1770],
   [fname: "John", lname:"Doe", salary: 1230],
   [fname: "Lucy", lname:"Novak", salary: 670],
   [fname: "Ben", lname:"Walter", salary: 2050],
   [fname: "Robin",lname: "Brown", salary: 2300],
   [fname: "Amy",lname: "Doe", salary: 1250],
   [fname: "Joe", lname:"Draker", salary: 1190],
   [fname: "Janet", lname:"Doe", salary: 980],
   [fname: "Peter",lname: "Novak", salary: 990],
   [fname:"Albert", lname:"Novak",salary: 193]
]

println users.count { u -&gt; u.lname == 'Novak' || u.lname == 'Doe' }
println users.countBy { u -&gt; u.salary &lt; 1000 }

count { u -&gt; u.lname == 'Novak' || u.lname == 'Doe' } counts
users with last names "Novak" or "Doe" (7 total).
countBy { u -&gt; u.salary &lt; 1000 } groups by the condition,
returning a map with counts for true (4) and
false (6). These methods simplify data analysis, leveraging
Groovy's closure syntax for custom logic.

## Collect &amp; GroupBy

collect transforms map entries into a new collection, while
groupBy organizes them into sub-maps based on a criterion.
Both are key for data manipulation and restructuring.

MapCollectGroup.groovy
  

def users = [
   [fname: "Robert", lname: "Novak", salary: 1770],
   [fname: "John", lname: "Doe", salary: 1230],
   [fname: "Lucy", lname: "Novak", salary: 670],
   [fname: "Ben", lname: "Walter", salary: 2050],
   [fname: "Robin",lname: "Brown", salary: 2300],
   [fname: "Amy",lname: "Doe", salary: 1250],
   [fname: "Joe", lname: "Draker", salary: 1190],
   [fname: "Janet", lname: "Doe", salary: 980],
   [fname: "Peter", lname: "Novak", salary: 990],
   [fname: "Albert", lname: "Novak",salary: 193]
]

println users.groupBy { it.lname }

println '--------------------------'

println users.collect { [it.fname, it.lname, it.salary * 1.1] }

println '--------------------------'

println users.collect { ["$it.fname $it.lname", it.salary * 1.1] }

groupBy { it.lname } splits users into sub-lists
by last name, creating a map where keys are last names and values are lists
of matching users. collect { [it.fname, it.lname, it.salary * 1.1]
} transforms each user into a list with a 10% salary increase.
collect { ["$it.fname $it.lname", it.salary * 1.1] } does
similarly but combines names into a single string. These operations
highlight Groovy's ability to reshape data flexibly.

## Source

[Groovy Documentation](https://groovy-lang.org/documentation.html)

This tutorial explored Groovy maps with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).