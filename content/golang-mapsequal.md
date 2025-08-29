+++
title = "Golang maps.Equal"
date = 2025-08-29T19:55:27.975+01:00
draft = false
description = "Learn how to compare maps in Go. Includes examples of equality checks and deep comparisons."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang maps.Equal

last modified April 20, 2025

This tutorial explains how to use the maps.Equal function in Go.
We'll cover map comparison operations with practical examples.

The maps.Equal function tests whether two maps contain the same
key-value pairs. It's part of Go's experimental maps package.

This function is useful for comparing maps without manual iteration. It returns
true only if both maps have identical keys and values.

## Basic maps.Equal Example

The simplest use of maps.Equal compares two maps with string keys.
Both maps must have exactly the same key-value pairs to be considered equal.

basic_equal.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    m1 := map[string]int{"a": 1, "b": 2}
    m2 := map[string]int{"a": 1, "b": 2}
    
    equal := maps.Equal(m1, m2)
    fmt.Println("Maps are equal:", equal)
}

We create two identical maps and compare them. The function returns true since
both maps contain the same key-value pairs in any order.

## Comparing Maps with Different Order

maps.Equal considers maps equal regardless of key insertion order.
This example shows maps with different creation orders being equal.

order_independent.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    m1 := map[string]int{"x": 10, "y": 20, "z": 30}
    m2 := map[string]int{"z": 30, "x": 10, "y": 20}
    
    equal := maps.Equal(m1, m2)
    fmt.Println("Order-independent equality:", equal)
}

The maps have the same contents but were created in different orders. The
function correctly identifies them as equal.

## Inequality Detection

This example demonstrates how maps.Equal detects differences in
either keys or values between maps.

inequality.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    m1 := map[string]int{"apple": 3, "banana": 5}
    m2 := map[string]int{"apple": 3, "banana": 6}
    m3 := map[string]int{"apple": 3, "orange": 5}
    
    fmt.Println("Same keys, different values:", maps.Equal(m1, m2))
    fmt.Println("Different keys:", maps.Equal(m1, m3))
}

The first comparison fails due to different values for "banana". The second
fails because the keys themselves are different.

## Comparing Empty Maps

maps.Equal handles empty maps correctly. Both nil maps and
initialized empty maps are considered equal.

empty_maps.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    var m1 map[string]bool
    m2 := map[string]bool{}
    m3 := map[string]bool{"active": true}
    
    fmt.Println("Nil vs empty:", maps.Equal(m1, m2))
    fmt.Println("Empty vs non-empty:", maps.Equal(m2, m3))
}

An uninitialized nil map and an initialized empty map are equal. Neither is
equal to a map with actual contents.

## Comparing Maps with Struct Values

maps.Equal can compare maps with struct values. The structs must
be comparable for this to work.

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
    m1 := map[string]Point{
        "origin": {0, 0},
        "center": {5, 5},
    }
    
    m2 := map[string]Point{
        "origin": {0, 0},
        "center": {5, 5},
    }
    
    equal := maps.Equal(m1, m2)
    fmt.Println("Struct maps equal:", equal)
}

The function compares the struct values field by field. Both maps contain
identical Point structs, so they're equal.

## Performance with Large Maps

For large maps, maps.Equal is more efficient than manual comparison.
This example benchmarks the performance difference.

performance.go
  

package main

import (
    "fmt"
    "maps"
    "time"
)

func manualEqual(m1, m2 map[int]int) bool {
    if len(m1) != len(m2) {
        return false
    }
    for k, v1 := range m1 {
        if v2, ok := m2[k]; !ok || v1 != v2 {
            return false
        }
    }
    return true
}

func main() {
    m1 := make(map[int]int, 100000)
    m2 := make(map[int]int, 100000)
    
    for i := 0; i &lt; 100000; i++ {
        m1[i] = i * 2
        m2[i] = i * 2
    }
    
    start := time.Now()
    _ = maps.Equal(m1, m2)
    fmt.Println("maps.Equal duration:", time.Since(start))
    
    start = time.Now()
    _ = manualEqual(m1, m2)
    fmt.Println("Manual equal duration:", time.Since(start))
}

The built-in function is typically faster than manual implementation. It's
optimized for this specific operation.

## Practical Example: Configuration Comparison

This practical example compares configuration maps to detect changes. It's useful
in applications that need to track state.

config_comparison.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    currentConfig := map[string]interface{}{
        "timeout": 30,
        "retries": 3,
        "debug":   false,
    }
    
    newConfig := map[string]interface{}{
        "timeout": 30,
        "retries": 5,  // Changed value
        "debug":   false,
    }
    
    if maps.Equal(currentConfig, newConfig) {
        fmt.Println("No configuration changes detected")
    } else {
        fmt.Println("Configuration has changed")
    }
}

We compare interface{} maps containing mixed types. The function detects the
changed "retries" value and returns false.

## Source

[Go experimental maps package documentation](https://pkg.go.dev/golang.org/x/exp/maps)

This tutorial covered the maps.Equal function in Go with practical
examples of comparing maps in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).