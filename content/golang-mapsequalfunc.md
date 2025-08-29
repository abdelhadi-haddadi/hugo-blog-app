+++
title = "Golang maps.EqualFunc"
date = 2025-08-29T19:55:29.098+01:00
draft = false
description = "Learn how to use the equalfunc with maps in Go. Includes examples of custom equality functions."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang maps.EqualFunc

last modified April 20, 2025

This tutorial explains how to use the maps.EqualFunc function in Go.
We'll cover map comparisons with practical examples using custom equality functions.

The maps.EqualFunc function compares two maps for equality using a
custom function to compare values. It's part of Go's experimental maps package.

This function is useful when you need custom comparison logic for map values.
It returns true only if both maps have identical keys and equivalent values.

## Basic maps.EqualFunc Example

The simplest use of maps.EqualFunc compares maps with case-insensitive
string values. We define a custom comparison function.

basic_equal.go
  

package main

import (
    "fmt"
    "maps"
    "strings"
)

func main() {
    m1 := map[string]string{"name": "Alice", "role": "Admin"}
    m2 := map[string]string{"name": "alice", "role": "admin"}
    
    equal := maps.EqualFunc(m1, m2, func(v1, v2 string) bool {
        return strings.EqualFold(v1, v2)
    })
    
    fmt.Println("Maps equal (case-insensitive):", equal)
}

We compare two maps with different string cases. The custom function uses
strings.EqualFold for case-insensitive comparison.

## Comparing Numeric Values with Tolerance

maps.EqualFunc can compare numeric values with a tolerance range.
This example checks if float values are approximately equal.

numeric_tolerance.go
  

package main

import (
    "fmt"
    "maps"
    "math"
)

func main() {
    m1 := map[string]float64{"x": 1.23456, "y": 2.34567}
    m2 := map[string]float64{"x": 1.23455, "y": 2.34568}
    
    equal := maps.EqualFunc(m1, m2, func(v1, v2 float64) bool {
        return math.Abs(v1-v2) &lt; 0.0001
    })
    
    fmt.Println("Maps equal (with tolerance):", equal)
}

The comparison function checks if float values differ by less than 0.0001.
This approach is useful for floating-point comparisons where exact equality is rare.

## Comparing Custom Struct Values

We can use maps.EqualFunc with custom struct types. This example
compares maps containing struct values by specific fields.

struct_comparison.go
  

package main

import (
    "fmt"
    "maps"
)

type Product struct {
    ID    int
    Name  string
    Price float64
}

func main() {
    m1 := map[int]Product{
        1: {ID: 1, Name: "Laptop", Price: 999.99},
        2: {ID: 2, Name: "Mouse", Price: 19.99},
    }
    
    m2 := map[int]Product{
        1: {ID: 1, Name: "Laptop", Price: 999.99},
        2: {ID: 2, Name: "Mouse", Price: 19.98},
    }
    
    equal := maps.EqualFunc(m1, m2, func(p1, p2 Product) bool {
        return p1.ID == p2.ID &amp;&amp; p1.Name == p2.Name
    })
    
    fmt.Println("Maps equal (ignoring price):", equal)
}

The comparison function only checks ID and Name fields, ignoring Price differences.
This demonstrates selective field comparison for complex types.

## Comparing Maps with Different Key Types

maps.EqualFunc can compare maps with different key types when using
conversion. This example compares string and int-keyed maps.

different_key_types.go
  

package main

import (
    "fmt"
    "maps"
    "strconv"
)

func main() {
    m1 := map[string]int{"one": 1, "two": 2, "three": 3}
    m2 := map[int]int{1: 1, 2: 2, 3: 3}
    
    // Convert m2 to string keys for comparison
    m2Converted := make(map[string]int)
    for k, v := range m2 {
        m2Converted[strconv.Itoa(k)] = v
    }
    
    equal := maps.EqualFunc(m1, m2Converted, func(v1, v2 int) bool {
        return v1 == v2
    })
    
    fmt.Println("Maps equal after conversion:", equal)
}

We convert the int-keyed map to string keys before comparison. The values are
compared using standard equality. This shows flexibility in map comparisons.

## Empty Map Behavior

maps.EqualFunc handles empty maps specially. This example demonstrates
its behavior with various empty map combinations.

empty_maps.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    m1 := map[string]int{}
    m2 := map[string]int{}
    m3 := map[string]int{"a": 1}
    
    // Two empty maps
    equal1 := maps.EqualFunc(m1, m2, func(v1, v2 int) bool {
        return v1 == v2
    })
    
    // Empty vs non-empty
    equal2 := maps.EqualFunc(m1, m3, func(v1, v2 int) bool {
        return v1 == v2
    })
    
    fmt.Println("Two empty maps equal:", equal1)
    fmt.Println("Empty vs non-empty equal:", equal2)
}

Empty maps with the same key type are always equal. Empty and non-empty maps are
never equal, regardless of the comparison function.

## Performance Considerations

For large maps, the performance of the comparison function matters. This example
benchmarks different comparison approaches.

performance.go
  

package main

import (
    "fmt"
    "maps"
    "time"
)

func main() {
    m1 := make(map[int]string, 1000000)
    m2 := make(map[int]string, 1000000)
    
    for i := 0; i &lt; 1000000; i++ {
        m1[i] = fmt.Sprintf("value%d", i)
        m2[i] = fmt.Sprintf("value%d", i)
    }
    
    // Simple comparison
    start := time.Now()
    _ = maps.EqualFunc(m1, m2, func(v1, v2 string) bool {
        return v1 == v2
    })
    fmt.Println("Simple comparison:", time.Since(start))
    
    // Modified map
    m2[500000] = "modified"
    start = time.Now()
    _ = maps.EqualFunc(m1, m2, func(v1, v2 string) bool {
        return v1 == v2
    })
    fmt.Println("Early termination:", time.Since(start))
}

The execution time depends on map size and when differences are found.
maps.EqualFunc stops at the first unequal pair for efficiency.

## Practical Example: Configuration Comparison

This practical example compares configuration maps with special handling for
default values. It demonstrates real-world usage.

config_comparison.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    defaultConfig := map[string]interface{}{
        "timeout":     30,
        "retries":     3,
        "concurrent":  false,
        "log_level":   "info",
    }
    
    userConfig := map[string]interface{}{
        "timeout":     30,
        "retries":     3,
        "log_level":   "info",
    }
    
    equal := maps.EqualFunc(defaultConfig, userConfig, func(v1, v2 interface{}) bool {
        // Missing key in userConfig is treated as default
        if v2 == nil {
            return true
        }
        return v1 == v2
    })
    
    fmt.Println("Configs equivalent:", equal)
}

We compare a user configuration against defaults, treating missing keys as
equivalent to defaults. The custom function handles nil values specially.

## Source

[Go experimental maps package documentation](https://pkg.go.dev/golang.org/x/exp/maps)

This tutorial covered the maps.EqualFunc function in Go with practical
examples of comparing maps with custom equality logic in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).