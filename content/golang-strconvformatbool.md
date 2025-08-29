+++
title = "Golang strconv.FormatBool"
date = 2025-08-29T19:56:14.371+01:00
draft = false
description = "Learn how to convert boolean values to strings using strconv.FormatBool in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.FormatBool

last modified April 20, 2025

This tutorial explains how to use the strconv.FormatBool function in Go.
We'll cover boolean-to-string conversion basics with practical examples.

The strconv.FormatBool function converts a boolean value to its string
representation. It returns "true" for true and "false" for false.

This function is useful when you need to serialize boolean values or display them
in a human-readable format. It's part of Go's strconv package for string conversions.

## Basic strconv.FormatBool Example

The simplest use of strconv.FormatBool converts a boolean to its
string representation. Here we demonstrate both true and false cases.

basic_formatbool.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    b1 := true
    b2 := false
    
    s1 := strconv.FormatBool(b1)
    s2 := strconv.FormatBool(b2)
    
    fmt.Printf("%v becomes %q\n", b1, s1)
    fmt.Printf("%v becomes %q\n", b2, s2)
}

We convert both true and false boolean values to strings. The function always
returns lowercase "true" or "false" without any error cases to handle.

## Using FormatBool in Conditional Logic

strconv.FormatBool can be used with conditional statements to
produce descriptive output. This example shows a practical application.

conditional.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    isAvailable := checkAvailability()
    
    status := strconv.FormatBool(isAvailable)
    fmt.Println("Service available:", status)
}

func checkAvailability() bool {
    // Simulate some availability check
    return true
}

We convert the result of a function call to a descriptive string. This makes
the output more readable than just printing the raw boolean value.

## FormatBool with JSON Serialization

When working with JSON data, FormatBool can help create custom
serialization. This example demonstrates manual JSON field generation.

json_serialization.go
  

package main

import (
    "fmt"
    "strconv"
)

type User struct {
    Name      string
    IsActive  bool
}

func main() {
    user := User{Name: "Alice", IsActive: true}
    
    jsonStr := fmt.Sprintf(
        `{"name":"%s","active":%s}`,
        user.Name,
        strconv.FormatBool(user.IsActive),
    )
    
    fmt.Println(jsonStr)
}

We manually construct a JSON string with a boolean field. FormatBool
ensures the boolean value is properly represented as a JSON literal.

## Comparing with fmt.Sprintf

strconv.FormatBool is more efficient than fmt.Sprintf
for boolean conversion. This example compares both approaches.

comparison.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    b := true
    
    // Using strconv.FormatBool
    s1 := strconv.FormatBool(b)
    
    // Using fmt.Sprintf
    s2 := fmt.Sprintf("%v", b)
    
    fmt.Println("FormatBool:", s1)
    fmt.Println("Sprintf:", s2)
}

Both methods produce the same output, but FormatBool is more
efficient when you only need boolean-to-string conversion.

## FormatBool in Configuration Handling

Configuration systems often need to convert boolean flags to strings. This
example shows a configuration setting implementation.

configuration.go
  

package main

import (
    "fmt"
    "strconv"
)

type Config struct {
    DebugMode bool
}

func (c Config) String() string {
    return "DebugMode: " + strconv.FormatBool(c.DebugMode)
}

func main() {
    config := Config{DebugMode: true}
    fmt.Println(config)
}

We implement a String() method for a Config type that uses FormatBool.
This provides clean string representation of boolean configuration settings.

## FormatBool with String Concatenation

When building strings that include boolean values, FormatBool
ensures proper formatting. This example demonstrates string building.

concatenation.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    hasPermission := true
    username := "admin"
    
    msg := "User " + username + " has permission: " +
        strconv.FormatBool(hasPermission)
    
    fmt.Println(msg)
}

We construct a message string that includes a boolean value. FormatBool
converts the boolean to a predictable string format for clean output.

## FormatBool in Template Processing

Template engines often need boolean values converted to strings. This example
shows a simple template substitution scenario.

templates.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
)

func main() {
    const tpl = "Feature enabled: {{.Enabled}}"
    data := struct {
        Enabled bool
    }{true}
    
    result := strings.Replace(tpl,
        "{{.Enabled}}",
        strconv.FormatBool(data.Enabled),
        1)
    
    fmt.Println(result)
}

We perform simple template substitution with a boolean value. FormatBool
ensures the boolean is properly represented in the final output string.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.FormatBool function in Go with
practical examples of boolean-to-string conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).