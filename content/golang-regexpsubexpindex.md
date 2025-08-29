+++
title = "Golang Regexp.SubexpIndex"
date = 2025-08-29T19:55:49.177+01:00
draft = false
description = "Learn how to find subexpression indexes using regular expressions in Go. Includes examples of regex subexpression handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.SubexpIndex

last modified April 20, 2025

This tutorial explains how to use the Regexp.SubexpIndex method
in Go. We'll cover named capture groups and provide practical examples.

A named capture group in regular expressions allows assigning names
to matched subpatterns. This makes patterns more readable and maintainable.

The Regexp.SubexpIndex method returns the index of the first
subexpression with the given name. It returns -1 if no subexpression exists.

## Basic SubexpIndex Example

The simplest use of SubexpIndex gets the index of a named group.
Here we extract date components using named groups.

basic_subexp.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;year&gt;\d{4})-(?P&lt;month&gt;\d{2})-(?P&lt;day&gt;\d{2})`)
    date := "2025-04-20"

    matches := re.FindStringSubmatch(date)
    if matches != nil {
        yearIdx := re.SubexpIndex("year")
        monthIdx := re.SubexpIndex("month")
        dayIdx := re.SubexpIndex("day")
        
        fmt.Println("Year:", matches[yearIdx])
        fmt.Println("Month:", matches[monthIdx])
        fmt.Println("Day:", matches[dayIdx])
    }
}

We define named groups for year, month, and day. SubexpIndex gets
their positions in the match results. This makes code more readable.

## Checking for Group Existence

SubexpIndex returns -1 for non-existent groups. This example shows
how to safely check for group existence.

check_group.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;name&gt;\w+)\s+(?P&lt;age&gt;\d+)`)
    input := "John 30"

    matches := re.FindStringSubmatch(input)
    if matches != nil {
        nameIdx := re.SubexpIndex("name")
        ageIdx := re.SubexpIndex("age")
        emailIdx := re.SubexpIndex("email") // Doesn't exist

        if nameIdx != -1 {
            fmt.Println("Name:", matches[nameIdx])
        }
        if ageIdx != -1 {
            fmt.Println("Age:", matches[ageIdx])
        }
        if emailIdx != -1 {
            fmt.Println("Email:", matches[emailIdx])
        } else {
            fmt.Println("Email field not found")
        }
    }
}

We check if each group exists before accessing it. The "email" group returns -1
since it wasn't defined in the pattern.

## Using with FindAll Submatches

SubexpIndex works with FindAllStringSubmatch for
processing multiple matches. Here we parse multiple log entries.

multiple_matches.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`\[(?P&lt;time&gt;\d{2}:\d{2}:\d{2})\] (?P&lt;level&gt;\w+): (?P&lt;message&gt;.*)`)
    logs := []string{
        "[10:23:45] ERROR: File not found",
        "[10:23:47] INFO: User logged in",
        "[10:23:49] WARNING: Disk space low",
    }

    timeIdx := re.SubexpIndex("time")
    levelIdx := re.SubexpIndex("level")
    msgIdx := re.SubexpIndex("message")

    for _, log := range logs {
        matches := re.FindStringSubmatch(log)
        if matches != nil {
            fmt.Printf("Time: %s, Level: %s, Message: %s\n",
                matches[timeIdx], matches[levelIdx], matches[msgIdx])
        }
    }
}

The pattern extracts timestamp, log level, and message from each log entry.
Named groups make the code clearer than numeric indices would.

## Dynamic Group Access

SubexpIndex enables dynamic group access based on runtime values.
This example shows processing different field names.

dynamic_groups.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;first&gt;\w+)\s+(?P&lt;last&gt;\w+),\s+(?P&lt;age&gt;\d+)`)
    input := "Smith John, 42"

    fields := []string{"first", "last", "age"}
    matches := re.FindStringSubmatch(input)

    if matches != nil {
        for _, field := range fields {
            idx := re.SubexpIndex(field)
            if idx != -1 {
                fmt.Printf("%s: %s\n", field, matches[idx])
            }
        }
    }
}

We loop through desired field names and get their values dynamically. This
approach works well when processing different patterns or configurations.

## Combining with SubexpNames

SubexpIndex can be combined with SubexpNames to
process all named groups. Here we print all group names and values.

subexp_names.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;protocol&gt;https?)://(?P&lt;domain&gt;[^/]+)/(?P&lt;path&gt;.*)`)
    url := "https://example.com/path/to/resource"

    matches := re.FindStringSubmatch(url)
    if matches != nil {
        for _, name := range re.SubexpNames() {
            if name != "" { // Skip unnamed groups
                idx := re.SubexpIndex(name)
                fmt.Printf("%s: %s\n", name, matches[idx])
            }
        }
    }
}

SubexpNames returns all group names, including empty strings for
unnamed groups. We filter these out and print each named group's value.

## Error Handling with Invalid Patterns

When using Compile (not MustCompile), we need to
handle potential errors in named group patterns.

error_handling.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    pattern := `(?P&lt;name&gt;\w+)(?P&lt;invalid`
    re, err := regexp.Compile(pattern)
    
    if err != nil {
        fmt.Println("Error compiling regex:", err)
        return
    }

    // This would panic if we used MustCompile
    idx := re.SubexpIndex("name")
    fmt.Println("Name group index:", idx)
}

The invalid pattern (missing closing parenthesis) would cause MustCompile
to panic. Compile lets us handle the error gracefully.

## Complex Pattern with Nested Groups

SubexpIndex works with complex patterns containing nested groups.
This example parses a configuration line.

nested_groups.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P&lt;key&gt;\w+)\s*=\s*(?P&lt;value&gt;"(?P&lt;quoted&gt;[^"]*)"|(?P&lt;unquoted&gt;\S+))`)
    config := `title = "Welcome" timeout=30`

    keyIdx := re.SubexpIndex("key")
    valueIdx := re.SubexpIndex("value")
    quotedIdx := re.SubexpIndex("quoted")
    unquotedIdx := re.SubexpIndex("unquoted")

    matches := re.FindAllStringSubmatch(config, -1)
    for _, match := range matches {
        fmt.Println("Key:", match[keyIdx])
        fmt.Println("Value:", match[valueIdx])
        
        if match[quotedIdx] != "" {
            fmt.Println("(Quoted value)")
        } else {
            fmt.Println("(Unquoted value)")
        }
    }
}

The pattern handles both quoted and unquoted values. SubexpIndex
helps access specific parts of this complex match structure clearly.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.SubexpIndex method in Go with
practical examples of named capture group usage in regular expressions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).