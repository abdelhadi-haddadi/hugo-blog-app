+++
title = "Go map"
date = 2025-08-29T19:55:25.754+01:00
draft = false
description = "Learn how to work with maps in Go. Includes examples of creating, accessing, and modifying maps."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go map

last modified May 4, 2025

In this article we show how to work with maps in Golang.

A **map** in Go is an unordered collection of key/value pairs where
each key is unique. Maps provide efficient lookups, insertions, and deletions,
making them an essential data structure for associative storage. Depending on
the context, maps are also referred to as *dictionaries*, associative
arrays, or *hash tables*. The number of key-value pairs in a map can
be determined using the built-in len function.

Maps are created using either the make function or map literals.
The make function initializes an empty map:

m := make(map[string]int)

Alternatively, map literals allow direct initialization with predefined
key-value pairs:

m := map[string]int{ "apple": 5, "banana": 3, "cherry": 7, }

To remove a specific key-value pair from a map, the built-in delete
function is used:

delete(m, "banana")

If the specified key does not exist in the map, delete performs no
action.

The default zero value of a map is nil, meaning that an
uninitialized map has no allocated storage and cannot be directly modified.
Attempting to add elements to a nil map will result in a runtime
panic. Before using a map, it must be initialized with make or
assigned a valid reference.

Go maps offer constant-time complexity for key lookups, making them highly
efficient for storing and retrieving structured data dynamically. However, since
maps are unordered, their iteration order is not guaranteed and may vary between
executions.

## Go map init

The make function creates an empty map.

init.go
  

package main

import "fmt"

func main() {

    var benelux map[string]string

    benelux = make(map[string]string)

    benelux["be"] = "Belgium"
    benelux["nl"] = "Netherlands"
    benelux["lu"] = "Luxembourgh"

    fmt.Println(benelux)
    fmt.Printf("%q\n", benelux)
}

We have a map of Benelux states.

var benelux map[string]string

A map of string keys and string values is declared.

benelux = make(map[string]string)

With the make function, we create an empty map.

benelux["be"] = "Belgium"
benelux["nl"] = "Netherlands"
benelux["lu"] = "Luxembourgh"

We add three pairs to the map.

$ go run init.go
map[be:Belgium lu:Luxembourgh nl:Netherlands]
map["be":"Belgium" "lu":"Luxembourgh" "nl":"Netherlands"]

init2.go
  

```
package main

import "fmt"

func main() {

    benelux := make(map[string]string)

    benelux["be"] = "Belgium"
    benelux["nl"] = "Netherlands"
    benelux["lu"] = "Luxembourgh"

    fmt.Println(benelux)
    fmt.Printf("%q\n", benelux)
}

```

We can shorten the syntax by using the := operator.

## Go map literal

To create and initialze a map with literal notation, we specify the key/value
pairs inside the curly {} brackets. Keys and values are separated
with a colon character. Each pair is separated with a comma.

literal.go
  

package main

import "fmt"

func main() {

    m := map[string]float64{
        "pi":  3.14159,
        "e":   2.71828,
        "ln2": 0.69314,
    }

    fmt.Println(m)
}

In the code example, we create a map of constants using map literal syntax.

## Go map size

The size of the map is determined with the len function. It returns
the number of pairs in the map.

length.go
  

package main

import "fmt"

func main() {

    countries := map[string]string{
        "sk": "Slovakia",
        "ru": "Russia",
        "de": "Germany",
        "no": "Norway",
    }

    fmt.Printf("There are %d pairs in the map\n", len(countries))
}

In the code example, we create a map of countries, where the country codes are keys
and the country names are values. We print the number of countries in the map.

$ go run length.go
There are 4 pairs in the map

There are four key/value pairs in the map.

## Go map loop

With for and range keywords, we can loop over map
elements.

loop.go
  

package main

import "fmt"

func main() {

    countries := map[string]string{
        "sk": "Slovakia",
        "ru": "Russia",
        "de": "Germany",
        "no": "Norway",
    }

    for country := range countries {
        fmt.Println(country, "=&gt;", countries[country])
    }

    for key, value := range countries {
        fmt.Printf("countries[%s] = %s\n", key, value)
    }
}

In the code example, we loop over countries map in two ways.

for country := range countries {
    fmt.Println(country, "=&gt;", countries[country])
}

In the first case, we loop by pair objects.

for key, value := range countries {
    fmt.Printf("countries[%s] = %s\n", key, value)
}

In the second case, we loop by keys and values.

$ go run loop.go
de =&gt; Germany
no =&gt; Norway
sk =&gt; Slovakia
ru =&gt; Russia
countries[ru] = Russia
countries[de] = Germany
countries[no] = Norway
countries[sk] = Slovakia

## Go map check element

We check if a value exists by referring to its key. If we have one variable
on the left side, we either get an existing value or a zero value. If there
are two variables on the left side, we get the value and a boolean value
indicating the existence of the key in the map.

checking.go
  

package main

import "fmt"

func main() {

    grades := map[string]int{
        "Lucia": 2,
        "Paul":  1,
        "Merry": 3,
        "Jane":  1,
    }

    g := grades["Lucia"]
    fmt.Println(g)

    g = grades["Peter"]
    fmt.Println(g)

    g, found := grades["Lucia"]
    fmt.Println(g, found)

    g, found = grades["Peter"]
    fmt.Println(g, found)

    if g, found := grades["Jane"]; found {
        fmt.Println(g)
    }
}

In the code example, we check the grades of students.

g := grades["Lucia"]
fmt.Println(g)

Here we print the grade of Lucia.

g = grades["Peter"]
fmt.Println(g)

Since Peter is not in the map, we get a zero value (0 for integer).

g, found := grades["Lucia"]
fmt.Println(g, found)

g, found = grades["Peter"]
fmt.Println(g, found)

Here we get the grades and the boolean values as well.

if g, found := grades["Jane"]; found {
    fmt.Println(g)
}

This is a concise syntax for getting the boolean value and checking it
in the if statement.

$ go run checking.go
2
0
2 true
0 false
1

## Go map remove element

An element is removed from a map with the delete function.

removing.go
  

package main

import "fmt"

func main() {

    countries := map[string]string{
        "sk": "Slovakia",
        "ru": "Russia",
        "de": "Germany",
        "no": "Norway",
    }

    fmt.Println(countries)

    delete(countries, "ru")

    fmt.Println(countries)
}

In the code example, we remove one country from a map of countries.

$ go run removing.go
map[de:Germany no:Norway ru:Russia sk:Slovakia]
map[de:Germany no:Norway sk:Slovakia]

Russia was successfully removed.

## Go map is a reference type

Go map is a reference type. It means that when we assign a reference to a new
variable or pass a map to a function, the reference to the map is copied.

reference.go
  

package main

import "fmt"

func main() {

    countries := map[string]string{
        "sk": "Slovakia",
        "ru": "Russia",
        "de": "Germany",
        "no": "Norway",
    }

    countries2 := countries

    countries2["us"] = "USA"

    fmt.Println(countries)
}

Modifying countries2 map, which is a reference to the countries,
the original map is modified as well.

## Go map of structs

In the following example, we work with a map of structs. A struct is a
user-defined type that contains a collection of fields. It is used to group
related data to form a single unit. 

users.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
}

func main() {

    u1 := User{
        name:       "John Doe",
        occupation: "gardener",
    }

    u2 := User{
        name:       "Richard Roe",
        occupation: "driver",
    }

    u3 := User{
        name:       "Lucy Smith",
        occupation: "teacher",
    }

    users := map[int]User{
        1: u1,
        2: u2,
        3: u3,
    }

    fmt.Println(users)
}

In the code example, we have a map of users. Each user is represented by a Go struct.

$ go run users.go 
map[1:{John Doe gardener} 2:{Richard Roe driver} 3:{Lucy Smith teacher}]

## Source

[Go maps in action](https://go.dev/blog/maps)

In this article we have worked with map in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).