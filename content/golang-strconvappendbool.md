+++
title = "Golang strconv.AppendBool"
date = 2025-08-29T19:56:09.621+01:00
draft = false
description = "Learn how to append boolean values to byte slices using strconv.AppendBool in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendBool

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendBool function in Go.
We'll cover boolean-to-string conversion basics with practical examples.

The strconv.AppendBool function appends the string representation of a
boolean value to a byte slice. It's efficient for building strings with boolean values.

AppendBool is particularly useful when you need to construct strings dynamically.
It avoids unnecessary allocations compared to concatenating strings directly.

## Basic strconv.AppendBool Example

The simplest use of strconv.AppendBool appends a boolean to an empty
byte slice. Here we demonstrate both true and false cases.

basic_appendbool.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    b := []byte("Value: ")
    b = strconv.AppendBool(b, true)
    
    fmt.Println(string(b)) // Value: true
    
    b = []byte("Value: ")
    b = strconv.AppendBool(b, false)
    
    fmt.Println(string(b)) // Value: false
}

We start with a byte slice containing "Value: " and append a boolean. The function
returns a new slice with the appended string representation of the boolean.

## Appending to Non-Empty Slices

strconv.AppendBool can append to slices with existing content. This
example shows building a complex string with multiple appends.

non_empty_slice.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    b := []byte("Status: ")
    b = strconv.AppendBool(b, true)
    b = append(b, ", Active: "...)
    b = strconv.AppendBool(b, false)
    
    fmt.Println(string(b)) // Status: true, Active: false
}

We build a status message by alternating string literals and boolean values. Each
append operation returns a new slice that we reassign to our variable.

## Building JSON Data

A common use case is building JSON data manually. This example demonstrates using
AppendBool to construct a JSON object with boolean values.

json_builder.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    b := []byte(`{"enabled": `)
    b = strconv.AppendBool(b, true)
    b = append(b, `}`...)
    
    fmt.Println(string(b)) // {"enabled": true}
    
    // More complex example
    b = []byte(`{"settings": {"logging": `)
    b = strconv.AppendBool(b, false)
    b = append(b, `, "caching": `...)
    b = strconv.AppendBool(b, true)
    b = append(b, `}}`...)
    
    fmt.Println(string(b)) // {"settings": {"logging": false, "caching": true}}
}

We construct JSON strings by carefully appending literals and boolean values. This
approach is efficient for simple JSON construction without marshaling.

## Performance Comparison

This example compares AppendBool with string concatenation to
demonstrate its performance benefits.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func main() {
    const iterations = 1000000
    
    // Using AppendBool
    start := time.Now()
    b := []byte{}
    for i := 0; i &lt; iterations; i++ {
        b = strconv.AppendBool(b[:0], true)
    }
    fmt.Println("AppendBool duration:", time.Since(start))
    
    // Using string concatenation
    start = time.Now()
    s := ""
    for i := 0; i &lt; iterations; i++ {
        s = "true"
    }
    fmt.Println("String concat duration:", time.Since(start))
}

AppendBool is generally more efficient than string concatenation,
especially when building large strings or performing many operations.

## Custom Boolean Formatting

We can create custom boolean formatting functions using AppendBool.
This example shows a function that formats booleans as "Yes"/"No".

custom_format.go
  

package main

import (
    "fmt"
    "strconv"
)

func appendYesNo(b []byte, value bool) []byte {
    if value {
        return append(b, "Yes"...)
    }
    return append(b, "No"...)
}

func main() {
    b := []byte("Result: ")
    b = appendYesNo(b, true)
    fmt.Println(string(b)) // Result: Yes
    
    b = []byte("Result: ")
    b = appendYesNo(b, false)
    fmt.Println(string(b)) // Result: No
}

While this doesn't use AppendBool directly, it demonstrates similar
pattern for custom boolean formatting. The function returns a new slice.

## Building CSV Data

AppendBool is useful for building CSV data with boolean values. This
example shows creating a CSV record with mixed data types.

csv_builder.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    b := []byte{}
    
    // CSV header
    b = append(b, "ID,Name,Active\n"...)
    
    // First record
    b = append(b, "1,"...)
    b = append(b, "John Doe,"...)
    b = strconv.AppendBool(b, true)
    b = append(b, '\n')
    
    // Second record
    b = append(b, "2,"...)
    b = append(b, "Jane Smith,"...)
    b = strconv.AppendBool(b, false)
    b = append(b, '\n')
    
    fmt.Println(string(b))
    /* Output:
    ID,Name,Active
    1,John Doe,true
    2,Jane Smith,false
    */
}

We build a CSV file by carefully appending each field. Boolean values are converted
to their string representation using AppendBool.

## Combining with Other Append Functions

AppendBool can be combined with other append functions from the
strconv package. This example shows building a complex string.

combined_appends.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    b := []byte("Configuration: ")
    b = append(b, "enabled="...)
    b = strconv.AppendBool(b, true)
    b = append(b, ", threshold="...)
    b = strconv.AppendFloat(b, 3.14, 'f', 2, 64)
    b = append(b, ", retries="...)
    b = strconv.AppendInt(b, 3, 10)
    
    fmt.Println(string(b))
    // Configuration: enabled=true, threshold=3.14, retries=3
}

We combine AppendBool with AppendFloat and
AppendInt to build a configuration string. This approach is memory
efficient for complex string construction.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendBool function in Go with
practical examples of boolean-to-string conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).