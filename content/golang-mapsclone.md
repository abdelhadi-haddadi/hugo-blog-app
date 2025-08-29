+++
title = "Golang maps.Clone"
date = 2025-08-29T19:55:26.862+01:00
draft = false
description = "Learn how to clone maps in Go. Includes examples of deep and shallow copying."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang maps.Clone

last modified April 20, 2025

This tutorial explains how to use the maps.Clone function in Go.
We'll cover map operations with practical examples of creating shallow copies.

The maps.Clone function creates a shallow copy of a map. It's part of
Go's experimental maps package introduced in Go 1.18.

This function is useful when you need to work with a copy of a map without
modifying the original. It returns a new map with the same key-value pairs.

## Basic maps.Clone Example

The simplest use of maps.Clone creates a copy of a string-to-int
map. Changes to the copy won't affect the original map.

basic_clone.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    original := map[string]int{
        "apple":  5,
        "banana": 7,
    }
    
    copy := maps.Clone(original)
    copy["apple"] = 10
    
    fmt.Println("Original:", original)
    fmt.Println("Copy:", copy)
}

We create a map, clone it, then modify the clone. The original remains unchanged,
demonstrating the independence of the cloned map.

## Cloning an Empty Map

maps.Clone handles empty maps gracefully. This example shows cloning
an empty map and verifying its behavior.

empty_map.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    empty := map[string]bool{}
    
    copy := maps.Clone(empty)
    copy["test"] = true
    
    fmt.Println("Original:", len(empty))
    fmt.Println("Copy:", len(copy))
}

The empty map is cloned successfully. Adding elements to the clone doesn't affect
the original empty map, which remains empty.

## Cloning a Map with Struct Values

When cloning maps with struct values, remember it's a shallow copy. This example
demonstrates the behavior with struct values.

struct_values.go
  

package main

import (
    "fmt"
    "maps"
)

type Point struct {
    X, Y int
}

func main() {
    original := map[string]Point{
        "center": {0, 0},
    }
    
    copy := maps.Clone(original)
    point := copy["center"]
    point.X = 100
    
    fmt.Println("Original:", original)
    fmt.Println("Copy:", copy)
}

Modifying the struct value requires reassignment. The clone contains copies of
the struct values, but they're separate instances from the original.

## Cloning a Nil Map

maps.Clone safely handles nil maps. This example shows the behavior
when cloning a nil map.

nil_map.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    var nilMap map[int]string
    
    copy := maps.Clone(nilMap)
    
    fmt.Println("Original is nil:", nilMap == nil)
    fmt.Println("Copy is nil:", copy == nil)
}

Cloning a nil map returns another nil map. This behavior is consistent with
Go's handling of nil collections in other contexts.

## Performance Considerations

For large maps, cloning can be expensive. This example benchmarks the clone
operation on a large map.

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
    _ = maps.Clone(largeMap)
    elapsed := time.Since(start)
    
    fmt.Printf("Cloned 1,000,000 elements in %v\n", elapsed)
}

The benchmark shows the time required to clone a large map. Memory allocation
is the primary cost factor in map cloning operations.

## Practical Example: Configuration Copy

This practical example demonstrates cloning a configuration map before making
modifications for a specific use case.

config_copy.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    defaultConfig := map[string]interface{}{
        "timeout":  30,
        "retries":  3,
        "logging":  true,
    }
    
    testConfig := maps.Clone(defaultConfig)
    testConfig["timeout"] = 5
    testConfig["logging"] = false
    
    fmt.Println("Default config:", defaultConfig)
    fmt.Println("Test config:", testConfig)
}

We clone the default configuration before modifying settings for testing. The
original configuration remains unchanged for other uses.

## Comparing Clone with Manual Copy

This example compares maps.Clone with manual map copying to
demonstrate their equivalence.

manual_copy.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    original := map[rune]string{
        'A': "Apple",
        'B': "Banana",
    }
    
    clone1 := maps.Clone(original)
    clone2 := make(map[rune]string, len(original))
    
    for k, v := range original {
        clone2[k] = v
    }
    
    fmt.Println("maps.Clone result:", clone1)
    fmt.Println("Manual copy result:", clone2)
}

Both methods produce equivalent results, but maps.Clone is more
concise and handles edge cases like nil maps automatically.

## Source

[Go experimental maps package documentation](https://pkg.go.dev/golang.org/x/exp/maps)

This tutorial covered the maps.Clone function in Go with practical
examples of creating shallow copies of maps in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).