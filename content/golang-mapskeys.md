+++
title = "Golang maps.Keys"
date = 2025-08-29T19:55:29.094+01:00
draft = false
description = "Learn how to extract keys from maps in Go. Includes examples of iterating over map keys."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang maps.Keys

last modified April 20, 2025

This tutorial explains how to use the maps.Keys function in Go.
We'll cover map operations with practical examples of extracting keys.

The maps.Keys function returns a slice containing all the keys from
a map. It's part of Go's experimental maps package.

This function is useful when you need to work with just the keys of a map,
such as for iteration or further processing. The order of keys is not guaranteed.

## Basic maps.Keys Example

The simplest use of maps.Keys extracts keys from a string-to-int
map. We create a map and get all its keys in a slice.

basic_keys.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    fruitPrices := map[string]int{
        "apple":  5,
        "banana": 3,
        "orange": 4,
    }
    
    keys := maps.Keys(fruitPrices)
    fmt.Println("Fruit keys:", keys)
}

We create a map of fruit prices and use maps.Keys to extract all
keys. The output will show the fruit names in an arbitrary order.

## Working with Numeric Keys

maps.Keys works with maps that have numeric keys. This example
shows how to get keys from an int-to-string map.

numeric_keys.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    statusCodes := map[int]string{
        200: "OK",
        404: "Not Found",
        500: "Internal Server Error",
    }
    
    codes := maps.Keys(statusCodes)
    fmt.Println("HTTP status codes:", codes)
}

The function returns a slice of integers containing the HTTP status codes.
The order of codes in the output may vary.

## Empty Map Behavior

maps.Keys handles empty maps gracefully. This example demonstrates
its behavior with an empty map.

empty_map.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    emptyMap := map[string]bool{}
    
    keys := maps.Keys(emptyMap)
    fmt.Println("Keys from empty map:", keys)
    fmt.Println("Length of keys slice:", len(keys))
}

When called on an empty map, maps.Keys returns an empty slice.
The length of the returned slice will be zero.

## Using Keys for Iteration

A common use case is iterating over map keys. This example shows how to process
each key after extracting them.

key_iteration.go
  

package main

import (
    "fmt"
    "maps"
    "strings"
)

func main() {
    userRoles := map[string]string{
        "alice": "admin",
        "bob":   "editor",
        "eve":   "viewer",
    }
    
    usernames := maps.Keys(userRoles)
    for _, username := range usernames {
        fmt.Println("Processing user:", strings.ToUpper(username))
    }
}

We extract usernames from a user roles map and process each one. The keys are
converted to uppercase during iteration.

## Sorting Extracted Keys

Since map keys are unordered, we often sort them. This example shows how to
sort keys after extraction.

sorted_keys.go
  

package main

import (
    "fmt"
    "maps"
    "slices"
)

func main() {
    countryPopulations := map[string]int{
        "China":  1439,
        "India":  1380,
        "USA":    331,
        "Brazil": 213,
    }
    
    countries := maps.Keys(countryPopulations)
    slices.Sort(countries)
    
    fmt.Println("Countries sorted alphabetically:")
    for _, country := range countries {
        fmt.Println(country)
    }
}

After getting country names with maps.Keys, we sort them using
slices.Sort. The output shows countries in alphabetical order.

## Working with Custom Types

maps.Keys works with maps that use custom types as keys. This
example demonstrates with a struct key.

custom_type_keys.go
  

package main

import (
    "fmt"
    "maps"
)

type Coordinate struct {
    X, Y int
}

func main() {
    gridValues := map[Coordinate]string{
        {1, 1}: "start",
        {2, 3}: "treasure",
        {4, 2}: "enemy",
    }
    
    coordinates := maps.Keys(gridValues)
    fmt.Println("Map coordinates:", coordinates)
}

We create a map with Coordinate struct keys and extract them. The function
handles custom types as long as they're valid map key types.

## Practical Example: Key Validation

This practical example validates map keys after extraction. We check if all
keys meet certain criteria.

key_validation.go
  

package main

import (
    "fmt"
    "maps"
    "slices"
    "strings"
)

func main() {
    config := map[string]string{
        "timeout":  "30s",
        "retries":  "3",
        "endpoint": "https://api.example.com",
    }
    
    keys := maps.Keys(config)
    
    allValid := slices.All(keys, func(key string) bool {
        return len(key) &gt; 0 &amp;&amp; !strings.ContainsAny(key, " \t\n")
    })
    
    if allValid {
        fmt.Println("All config keys are valid")
    } else {
        fmt.Println("Invalid keys found in config")
    }
}

We extract configuration keys and validate them. The check ensures keys aren't
empty and don't contain whitespace characters.

## Source

[Go experimental maps package documentation](https://pkg.go.dev/golang.org/x/exp/maps)

This tutorial covered the maps.Keys function in Go with practical
examples of extracting and working with map keys in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).