+++
title = "Golang strconv.ParseBool"
date = 2025-08-29T19:56:16.654+01:00
draft = false
description = "Learn how to parse boolean values from strings using strconv.ParseBool in Go. Includes practical examples and error handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.ParseBool

last modified April 20, 2025

This tutorial explains how to use the strconv.ParseBool function in Go.
We'll cover string-to-boolean conversion basics with practical examples.

The strconv.ParseBool function converts a string to a boolean value.
It's commonly used for parsing boolean input from various sources.

ParseBool recognizes "1", "t", "T", "true", "TRUE", "True" as true and "0", "f",
"F", "false", "FALSE", "False" as false. Other values return an error.

## Basic strconv.ParseBool Example

The simplest use of strconv.ParseBool converts a boolean string to
a bool value. Here we demonstrate successful conversion and error handling.

basic_parsebool.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    boolStr := "true"
    
    b, err := strconv.ParseBool(boolStr)
    if err != nil {
        fmt.Println("Conversion error:", err)
        return
    }
    
    fmt.Printf("String '%s' converted to boolean %t\n", boolStr, b)
}

We convert the string "true" to a boolean. The error is checked to handle cases
where conversion fails. Successful conversion prints the boolean value.

## Handling Different True/False Values

strconv.ParseBool accepts multiple string representations of boolean
values. This example shows various valid inputs.

different_values.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    trueValues := []string{"1", "t", "T", "true", "TRUE", "True"}
    falseValues := []string{"0", "f", "F", "false", "FALSE", "False"}
    
    for _, tv := range trueValues {
        b, _ := strconv.ParseBool(tv)
        fmt.Printf("%-6s → %t\n", tv, b)
    }
    
    for _, fv := range falseValues {
        b, _ := strconv.ParseBool(fv)
        fmt.Printf("%-6s → %t\n", fv, b)
    }
}

We test all valid string representations of true and false. The output shows how
each string maps to its corresponding boolean value.

## Handling Invalid Boolean Strings

strconv.ParseBool returns an error for invalid boolean strings.
This example demonstrates proper error handling.

invalid_values.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []string{"yes", "no", "on", "off", "y", "n", "", "2"}
    
    for _, tc := range testCases {
        b, err := strconv.ParseBool(tc)
        if err != nil {
            fmt.Printf("'%s' is not a valid boolean: %v\n", tc, err)
        } else {
            fmt.Printf("'%s' converted to %t\n", tc, b)
        }
    }
}

We test various invalid string inputs. The error message helps identify why
conversion failed for each invalid input.

## Converting User Input

A common use case is converting command-line arguments or user input. This
example demonstrates reading and converting boolean values from standard input.

user_input.go
  

package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    
    fmt.Print("Enter a boolean (true/false, 1/0, t/f): ")
    input, _ := reader.ReadString('\n')
    input = strings.TrimSpace(input)
    
    b, err := strconv.ParseBool(input)
    if err != nil {
        fmt.Println("Please enter a valid boolean value")
        return
    }
    
    fmt.Printf("You entered: %t (negated: %t)\n", b, !b)
}

We read user input, trim whitespace, then attempt conversion. The program
provides feedback for invalid input and demonstrates using the converted value.

## Working with Configuration Files

ParseBool is often used when reading boolean values from configuration files.
This example shows a typical configuration parsing scenario.

config_parsing.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    config := map[string]string{
        "debug_mode":    "true",
        "enable_cache":  "1",
        "verbose_logs":  "F",
        "dark_mode":     "false",
    }
    
    debug, _ := strconv.ParseBool(config["debug_mode"])
    cache, _ := strconv.ParseBool(config["enable_cache"])
    verbose, _ := strconv.ParseBool(config["verbose_logs"])
    dark, _ := strconv.ParseBool(config["dark_mode"])
    
    fmt.Println("Debug mode:", debug)
    fmt.Println("Cache enabled:", cache)
    fmt.Println("Verbose logging:", verbose)
    fmt.Println("Dark mode:", dark)
}

We simulate reading from a configuration map and converting values to booleans.
Different string formats are used to demonstrate ParseBool's flexibility.

## Performance Considerations

For performance-critical code, avoiding repeated conversions can help. This
example benchmarks ParseBool against alternatives.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
    "time"
)

func main() {
    const iterations = 1000000
    testStr := "true"
    
    // Benchmark ParseBool
    start := time.Now()
    for i := 0; i &lt; iterations; i++ {
        strconv.ParseBool(testStr)
    }
    fmt.Println("ParseBool duration:", time.Since(start))
    
    // Benchmark custom function
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        strings.ToLower(testStr) == "true"
    }
    fmt.Println("Custom check duration:", time.Since(start))
}

ParseBool is more robust than simple string comparison but slightly slower.
The difference is usually negligible for most use cases.

## Practical Example: Feature Flags

This practical example demonstrates using ParseBool to implement feature flags
from environment variables with proper error handling.

feature_flags.go
  

package main

import (
    "fmt"
    "os"
    "strconv"
)

func main() {
    flags := map[string]string{
        "NEW_UI":        "1",
        "EXPERIMENT_X":  "false",
        "BETA_FEATURES": "t",
    }
    
    for name, value := range flags {
        enabled, err := strconv.ParseBool(value)
        if err != nil {
            fmt.Printf("Invalid value for %s: %s\n", name, value)
            continue
        }
        
        if enabled {
            fmt.Printf("Feature %s is enabled\n", name)
        } else {
            fmt.Printf("Feature %s is disabled\n", name)
        }
    }
}

We simulate feature flags from environment variables. Each flag's value is
converted to a boolean, with proper error handling for invalid values.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.ParseBool function in Go with
practical examples of string-to-boolean conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).