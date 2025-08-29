+++
title = "Golang maps.DeleteFunc"
date = 2025-08-29T19:55:27.986+01:00
draft = false
description = "Learn how to use the deletefunc with maps in Go. Includes examples of conditional deletion."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang maps.DeleteFunc

last modified April 20, 2025

This tutorial explains how to use the maps.DeleteFunc function in Go.
We'll cover map operations with practical examples of conditional deletion.

The maps.DeleteFunc function removes key-value pairs from a map where
the value satisfies a given condition. It's part of Go's experimental maps package.

This function is useful for selectively removing elements based on complex
criteria. It modifies the map in place and doesn't return a new map.

## Basic maps.DeleteFunc Example

The simplest use of maps.DeleteFunc removes all entries with
negative values. We define a test function for the deletion condition.

basic_delete.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    m := map[string]int{
        "a": 1,
        "b": -2,
        "c": 3,
        "d": -4,
    }
    
    maps.DeleteFunc(m, func(k string, v int) bool {
        return v &lt; 0
    })
    
    fmt.Println("Map after deletion:", m)
}

We create a map with some negative values and remove them. The anonymous function
defines our deletion condition based on the value.

## Deleting Based on Key

maps.DeleteFunc can use key information for deletion decisions.
This example removes entries with keys starting with 'b'.

key_based_delete.go
  

package main

import (
    "fmt"
    "maps"
    "strings"
)

func main() {
    m := map[string]int{
        "apple":  5,
        "banana": 3,
        "berry":  7,
        "orange": 2,
    }
    
    maps.DeleteFunc(m, func(k string, v int) bool {
        return strings.HasPrefix(k, "b")
    })
    
    fmt.Println("Map after deletion:", m)
}

The test function examines each key's prefix. All entries with keys starting
with 'b' are removed from the map.

## Working with Struct Values

We can use maps.DeleteFunc with maps containing struct values.
This example removes inactive users.

struct_values_delete.go
  

package main

import (
    "fmt"
    "maps"
)

type User struct {
    Name   string
    Active bool
}

func main() {
    users := map[int]User{
        1: {"Alice", true},
        2: {"Bob", false},
        3: {"Charlie", true},
    }
    
    maps.DeleteFunc(users, func(k int, v User) bool {
        return !v.Active
    })
    
    fmt.Println("Active users:", users)
}

The function checks each user's Active field. Inactive users are removed from
the map while active ones remain.

## Combining Key and Value Conditions

Complex conditions can combine both key and value checks. This example removes
products with low stock and specific IDs.

combined_conditions_delete.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    inventory := map[int]int{
        101: 5,
        102: 0,
        103: 10,
        201: 2,
        202: 7,
    }
    
    maps.DeleteFunc(inventory, func(id int, stock int) bool {
        return stock &lt; 3 || id &gt;= 200
    })
    
    fmt.Println("Filtered inventory:", inventory)
}

The condition combines stock level and product ID checks. Products with low
stock or IDs ≥ 200 are removed.

## Empty Map Behavior

maps.DeleteFunc handles empty maps gracefully. This example
demonstrates its behavior with an empty map.

empty_map_delete.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    m := map[string]int{}
    
    maps.DeleteFunc(m, func(k string, v int) bool {
        return true // Would delete all if any existed
    })
    
    fmt.Println("Empty map remains:", m)
}

With no elements to process, the function does nothing. The map remains empty
after the operation.

## Performance Considerations

For large maps, the performance of the test function matters. This example
benchmarks different deletion conditions.

performance_delete.go
  

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
    maps.DeleteFunc(largeMap, func(k, v int) bool {
        return v%2 == 0
    })
    fmt.Println("Simple condition:", time.Since(start))
    
    // Reset map
    largeMap = make(map[int]int, 1_000_000)
    for i := 0; i &lt; 1_000_000; i++ {
        largeMap[i] = i
    }
    
    // Complex condition
    start = time.Now()
    maps.DeleteFunc(largeMap, func(k, v int) bool {
        return v%2 == 0 &amp;&amp; k &gt; 500_000 &amp;&amp; v &lt; 750_000
    })
    fmt.Println("Complex condition:", time.Since(start))
}

The execution time depends on the condition complexity and number of deletions.
maps.DeleteFunc processes each element sequentially.

## Practical Example: Cache Cleanup

This practical example demonstrates using maps.DeleteFunc for
cache cleanup by removing expired entries.

cache_cleanup.go
  

package main

import (
    "fmt"
    "maps"
    "time"
)

type CacheEntry struct {
    Value    string
    ExpireAt time.Time
}

func main() {
    cache := map[string]CacheEntry{
        "user:1": {"Alice", time.Now().Add(5 * time.Minute)},
        "user:2": {"Bob", time.Now().Add(-1 * time.Hour)},
        "user:3": {"Charlie", time.Now().Add(10 * time.Minute)},
    }
    
    maps.DeleteFunc(cache, func(k string, v CacheEntry) bool {
        return time.Now().After(v.ExpireAt)
    })
    
    fmt.Println("Active cache entries:")
    for k, v := range cache {
        fmt.Printf("%s: %s\n", k, v.Value)
    }
}

We check each cache entry's expiration time against the current time. Expired
entries are removed while valid ones remain in the cache.

## Source

[Go experimental maps package documentation](https://pkg.go.dev/golang.org/x/exp/maps)

This tutorial covered the maps.DeleteFunc function in Go with practical
examples of conditionally removing map elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).