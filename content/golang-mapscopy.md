+++
title = "Golang maps.Copy"
date = 2025-08-29T19:55:26.872+01:00
draft = false
description = "Learn how to copy maps in Go. Includes examples of efficient map copying techniques."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang maps.Copy

last modified April 20, 2025

This tutorial explains how to use the maps.Copy function in Go.
We'll cover map copying operations with practical examples.

The maps.Copy function copies all key-value pairs from one map to
another. It's part of Go's experimental maps package.

This function is useful for duplicating map data or merging maps. It handles
overwriting existing keys in the destination map.

## Basic maps.Copy Example

The simplest use of maps.Copy copies all elements from one map to
another. Both maps must have the same key and value types.

basic_copy.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    src := map[string]int{"a": 1, "b": 2}
    dst := make(map[string]int)
    
    maps.Copy(dst, src)
    
    fmt.Println("Copied map:", dst)
}

We create a source map and an empty destination map. After copying, the
destination contains all key-value pairs from the source.

## Overwriting Existing Keys

maps.Copy overwrites existing keys in the destination map. This
example demonstrates this behavior.

overwrite_keys.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    src := map[string]int{"a": 1, "b": 2}
    dst := map[string]int{"a": 5, "c": 3}
    
    maps.Copy(dst, src)
    
    fmt.Println("Result after copy:", dst)
}

The destination map's "a" key gets overwritten with the source value. The "b"
key is added, and "c" remains unchanged.

## Copying Between Different Map Types

We can copy between maps with different underlying types if they're compatible.
This example copies from map[int]string to map[int]string.

different_types.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    src := map[int]string{1: "one", 2: "two"}
    dst := make(map[int]string)
    
    maps.Copy(dst, src)
    
    fmt.Println("Copied map:", dst)
}

The function works with any map types as long as key and value types match.
The destination map receives all elements from the source.

## Copying Nil Maps

maps.Copy handles nil maps gracefully. This example shows behavior
with nil source and destination maps.

nil_maps.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    var src map[string]int
    dst := make(map[string]int)
    
    // Copy from nil map
    maps.Copy(dst, src)
    fmt.Println("Copy from nil:", dst)
    
    // Copy to nil map
    src = map[string]int{"a": 1}
    var nilDst map[string]int
    maps.Copy(nilDst, src)
    fmt.Println("Copy to nil:", nilDst)
}

Copying from a nil source does nothing. Copying to a nil destination causes a
panic, similar to regular map operations.

## Copying Large Maps

maps.Copy efficiently handles large maps. This example benchmarks
copying performance.

large_maps.go
  

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
    
    dst := make(map[int]int, len(largeMap))
    
    start := time.Now()
    maps.Copy(dst, largeMap)
    elapsed := time.Since(start)
    
    fmt.Printf("Copied 1,000,000 elements in %v\n", elapsed)
    fmt.Println("Sample values:", dst[0], dst[999999])
}

The function efficiently copies all elements while maintaining map performance.
Preallocating the destination map improves copy speed.

## Copying Maps with Struct Values

maps.Copy works with maps containing struct values. This example
demonstrates copying complex value types.

struct_values.go
  

package main

import (
    "fmt"
    "maps"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    src := map[string]Person{
        "alice": {"Alice", 30},
        "bob":   {"Bob", 25},
    }
    
    dst := make(map[string]Person)
    maps.Copy(dst, src)
    
    fmt.Println("Copied people:", dst)
}

The function performs a shallow copy of struct values. Both maps will contain
the same Person values after copying.

## Practical Example: Merging Configurations

This practical example shows how to merge configuration maps using
maps.Copy.

merge_configs.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    defaultConfig := map[string]string{
        "theme": "dark",
        "lang":  "en",
        "cache": "true",
    }
    
    userConfig := map[string]string{
        "theme": "light",
        "proxy": "localhost:8080",
    }
    
    // Merge user config over defaults
    maps.Copy(defaultConfig, userConfig)
    
    fmt.Println("Merged configuration:")
    for k, v := range defaultConfig {
        fmt.Printf("%s: %s\n", k, v)
    }
}

User preferences override default values while preserving unspecified settings.
This pattern is common in application configuration systems.

## Source

[Go experimental maps package documentation](https://pkg.go.dev/golang.org/x/exp/maps)

This tutorial covered the maps.Copy function in Go with practical
examples of copying and merging maps in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).