+++
title = "Golang maps.All"
date = 2025-08-29T19:55:26.869+01:00
draft = false
description = "Learn how to use the maps-all function in Go. Includes examples of applying functions to all map elements."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang maps.All

last modified April 20, 2025

This tutorial explains how to use the maps.All function in Go.
We'll cover map operations with practical examples of checking conditions.

The maps.All function tests whether all key-value pairs in a map satisfy
a given condition. It's part of Go's experimental maps package.

This function is useful for validating data or checking properties across all
entries in a map. It returns true only if all entries pass the test.

## Basic maps.All Example

The simplest use of maps.All checks if all values in a map are
positive. We define a test function for key-value pairs.

basic_all.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    scores := map[string]int{
        "Alice": 85,
        "Bob":   92,
        "Carol": 78,
    }
    
    allPositive := maps.All(scores, func(k string, v int) bool {
        return v &gt; 0
    })
    
    fmt.Println("All scores positive:", allPositive)
}

We create a map of scores and check if all values are greater than zero.
The anonymous function defines our condition for each key-value pair.

## Checking Both Keys and Values

maps.All can verify properties of both keys and values. This example
checks if all keys start with 'A' and values are above 80.

key_value_check.go
  

package main

import (
    "fmt"
    "maps"
    "strings"
)

func main() {
    grades := map[string]int{
        "Alice": 85,
        "Amy":   92,
        "Anna":  78,
    }
    
    allValid := maps.All(grades, func(k string, v int) bool {
        return strings.HasPrefix(k, "A") &amp;&amp; v &gt; 80
    })
    
    fmt.Println("All names start with A and grades &gt; 80:", allValid)
}

The test function examines both the key prefix and value. Since Anna's grade is
78, the function returns false.

## Working with Custom Types

We can use maps.All with custom value types. This example checks
if all products in a map are in stock.

custom_types.go
  

package main

import (
    "fmt"
    "maps"
)

type Product struct {
    Name     string
    InStock  bool
    Quantity int
}

func main() {
    inventory := map[string]Product{
        "p1": {"Laptop", true, 10},
        "p2": {"Mouse", false, 0},
        "p3": {"Keyboard", true, 15},
    }
    
    allInStock := maps.All(inventory, func(k string, p Product) bool {
        return p.InStock
    })
    
    fmt.Println("All products in stock:", allInStock)
}

The function checks each product's InStock field. Since the mouse is out of stock,
the result is false.

## Combining Multiple Conditions

Complex conditions can be combined in the test function. This example checks if
all values are even numbers and keys are uppercase.

combined_conditions.go
  

package main

import (
    "fmt"
    "maps"
    "strings"
    "unicode"
)

func main() {
    data := map[string]int{
        "A": 2,
        "B": 4,
        "C": 6,
    }
    
    allValid := maps.All(data, func(k string, v int) bool {
        return v%2 == 0 &amp;&amp; 
               strings.ToUpper(k) == k &amp;&amp;
               len(k) == 1 &amp;&amp;
               unicode.IsLetter(rune(k[0]))
    })
    
    fmt.Println("All conditions met:", allValid)
}

The condition combines multiple checks using logical AND. All entries satisfy
all conditions, so the result is true.

## Empty Map Behavior

maps.All has special behavior for empty maps. This example
demonstrates how it always returns true for empty maps.

empty_map.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    var empty map[string]int
    
    result := maps.All(empty, func(k string, v int) bool {
        return false // Condition doesn't matter
    })
    
    fmt.Println("Result for empty map:", result)
}

With no entries to check, the function vacuously returns true. This behavior
follows mathematical logic for universal quantification.

## Performance Considerations

For large maps, the performance of the test function matters. This example
benchmarks different approaches.

performance.go
  

package main

import (
    "fmt"
    "maps"
    "time"
)

func main() {
    largeMap := make(map[int]int, 1_000_000)
    for i := 0; i &lt; 1_000_000; i++ {
        largeMap[i] = i
    }
    
    // Simple condition
    start := time.Now()
    _ = maps.All(largeMap, func(k, v int) bool {
        return v &gt;= 0
    })
    fmt.Println("Simple condition:", time.Since(start))
    
    // Complex condition
    start = time.Now()
    _ = maps.All(largeMap, func(k, v int) bool {
        return v &gt;= 0 &amp;&amp; k%2 == 0 &amp;&amp; v &lt; 1_000_000
    })
    fmt.Println("Complex condition:", time.Since(start))
}

The execution time depends on the condition complexity and map size.
maps.All stops at the first false condition for efficiency.

## Practical Example: Configuration Validation

This practical example validates configuration settings using maps.All.
We check if all configuration values meet requirements.

config_validation.go
  

package main

import (
    "fmt"
    "maps"
    "strconv"
)

func main() {
    config := map[string]string{
        "timeout":  "30",
        "retries":  "3",
        "log_level": "debug",
    }
    
    allValid := maps.All(config, func(k, v string) bool {
        switch k {
        case "timeout":
            n, err := strconv.Atoi(v)
            return err == nil &amp;&amp; n &gt; 0
        case "retries":
            n, err := strconv.Atoi(v)
            return err == nil &amp;&amp; n &gt;= 0 &amp;&amp; n &lt;= 5
        case "log_level":
            return v == "info" || v == "debug" || v == "error"
        default:
            return false
        }
    })
    
    if allValid {
        fmt.Println("All configuration values are valid")
    } else {
        fmt.Println("Some configuration values are invalid")
    }
}

We validate different configuration parameters with specific rules for each key.
The combination of type conversion and validation demonstrates real-world usage.

## Source

[Go experimental maps package documentation](https://pkg.go.dev/golang.org/x/exp/maps)

This tutorial covered the maps.All function in Go with practical
examples of checking conditions across map entries in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).