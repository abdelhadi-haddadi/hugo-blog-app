+++
title = "Golang maps.Delete"
date = 2025-08-29T19:55:27.981+01:00
draft = false
description = "Learn how to delete elements from maps in Go. Includes examples of using the delete function."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang maps.Delete

last modified April 20, 2025

This tutorial explains how to use the maps.Delete function in Go.
We'll cover map operations with practical examples of removing key-value pairs.

The maps.Delete function removes a key-value pair from a map. It's
part of Go's experimental maps package introduced in Go 1.21.

This function is useful for safely removing entries from maps without needing
to check for key existence first. It handles non-existent keys gracefully.

## Basic maps.Delete Example

The simplest use of maps.Delete removes a key from a map. We create
a map and delete one of its entries.

basic_delete.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    fruits := map[string]int{
        "apple":  5,
        "banana": 3,
        "orange": 2,
    }
    
    maps.Delete(fruits, "banana")
    fmt.Println("Map after deletion:", fruits)
}

We create a fruit inventory map and remove the "banana" entry. The function
modifies the map in place and doesn't return anything.

## Deleting Non-Existent Key

maps.Delete safely handles attempts to delete keys that don't exist.
This example demonstrates this behavior.

nonexistent_key.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    capitals := map[string]string{
        "France":  "Paris",
        "Germany": "Berlin",
    }
    
    maps.Delete(capitals, "Italy")
    fmt.Println("Map remains unchanged:", capitals)
}

Attempting to delete "Italy" (which doesn't exist) doesn't cause an error. The
map remains unchanged, showing the function's safe behavior.

## Deleting Multiple Keys

We can use maps.Delete in a loop to remove multiple keys. This
example removes several entries at once.

multiple_deletes.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    scores := map[string]int{
        "Alice":   85,
        "Bob":     72,
        "Charlie": 90,
        "Dave":    68,
    }
    
    toDelete := []string{"Bob", "Dave", "Eve"}
    
    for _, name := range toDelete {
        maps.Delete(scores, name)
    }
    
    fmt.Println("Scores after deletions:", scores)
}

We iterate through a slice of names to delete. The function safely handles "Eve"
which doesn't exist in the map.

## Combining with maps.Clone

We can combine maps.Delete with maps.Clone to modify
a copy of a map. This example demonstrates non-destructive deletion.

clone_and_delete.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    original := map[int]string{
        1: "one",
        2: "two",
        3: "three",
    }
    
    copy := maps.Clone(original)
    maps.Delete(copy, 2)
    
    fmt.Println("Original:", original)
    fmt.Println("Modified copy:", copy)
}

We clone the original map before deletion. This preserves the original data while
allowing us to work with a modified version.

## Performance Considerations

maps.Delete has constant-time performance for most cases. This
example benchmarks deletion operations.

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
        largeMap[i] = i * 2
    }
    
    start := time.Now()
    maps.Delete(largeMap, 500_000)
    fmt.Println("Delete middle element:", time.Since(start))
    
    start = time.Now()
    maps.Delete(largeMap, 999_999)
    fmt.Println("Delete last element:", time.Since(start))
    
    start = time.Now()
    maps.Delete(largeMap, -1) // Doesn't exist
    fmt.Println("Delete non-existent:", time.Since(start))
}

Deletion time is generally O(1) regardless of map size or key position. The
example shows consistent performance across different scenarios.

## Practical Example: Cache Management

This practical example shows using maps.Delete in a cache system.
We implement basic cache expiration by removing stale entries.

cache_management.go
  

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
    cache := make(map[string]CacheEntry)
    
    // Add some entries
    cache["user1"] = CacheEntry{"Alice", time.Now().Add(5 * time.Minute)}
    cache["user2"] = CacheEntry{"Bob", time.Now().Add(-1 * time.Minute)} // Expired
    
    // Cleanup expired entries
    for key, entry := range cache {
        if time.Now().After(entry.ExpireAt) {
            maps.Delete(cache, key)
        }
    }
    
    fmt.Println("Cache after cleanup:", cache)
}

We iterate through the cache and remove expired entries. This demonstrates a
real-world use case for map deletion in resource management.

## Comparison with delete Built-in

This example compares maps.Delete with Go's built-in delete
function. Both achieve similar results.

comparison.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    map1 := map[string]int{"a": 1, "b": 2, "c": 3}
    map2 := maps.Clone(map1)
    
    // Using maps.Delete
    maps.Delete(map1, "b")
    
    // Using built-in delete
    delete(map2, "b")
    
    fmt.Println("maps.Delete result:", map1)
    fmt.Println("built-in delete result:", map2)
}

Both methods produce identical results. maps.Delete is part of the
experimental maps package, while delete is a language built-in.

## Source

[Go experimental maps package documentation](https://pkg.go.dev/golang.org/x/exp/maps)

This tutorial covered the maps.Delete function in Go with practical
examples of removing key-value pairs from maps in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).