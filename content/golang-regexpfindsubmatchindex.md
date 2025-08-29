+++
title = "Golang Regexp.FindSubmatchIndex"
date = 2025-08-29T19:55:43.635+01:00
draft = false
description = "Learn how to find submatch indexes using regular expressions in Go. Includes examples of regex matching."
image = "images/"
imageBig = "images/"
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Regexp.FindSubmatchIndex

last modified April 20, 2025

This tutorial explains how to use the Regexp.FindSubmatchIndex method in Go.
We'll cover submatch indices and provide practical examples.

A regular expression is a sequence of characters that defines a
search pattern. It's used for pattern matching within strings.

The Regexp.FindSubmatchIndex method returns a slice holding the
index pairs identifying the leftmost match and submatches. It's useful for
extracting matched portions and their positions.

## Basic FindSubmatchIndex Example

The simplest use of FindSubmatchIndex finds matches and their
positions. Here we locate a simple word and its position.

basic_indices.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`hello`)
    str := "hello world hello again"
    
    indices := re.FindSubmatchIndex([]byte(str))
    if indices != nil {
        fmt.Println("Full match:", str[indices[0]:indices[1]])
        fmt.Printf("Positions: %d to %d\n", indices[0], indices[1])
    }
}

The method returns a slice where indices[0] is the start and indices[1] is the
end of the match. We can use these to extract the matched substring.

## Extracting Date Components with Indices

This example shows how to get both the matched date components and their
positions in the input string.

date_indices.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    str := "Event date: 2025-04-20, deadline: 2025-05-15"
    
    indices := re.FindSubmatchIndex([]byte(str))
    if indices != nil {
        fmt.Println("Full match:", str[indices[0]:indices[1]])
        fmt.Println("Year:", str[indices[2]:indices[3]])
        fmt.Println("Month:", str[indices[4]:indices[5]])
        fmt.Println("Day:", str[indices[6]:indices[7]])
    }
}

Each capture group gets two indices in the result slice. The pattern has three
groups, so we get seven index pairs (including the full match).

## Finding All Matches with Indices

To find all matches with their positions, we use FindAllSubmatchIndex.
This shows all dates in a string with their locations.

all_indices.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    str := "Dates: 2025-04-20, 2025-05-15, 2025-06-30"
    
    allIndices := re.FindAllSubmatchIndex([]byte(str), -1)
    for _, indices := range allIndices {
        fmt.Printf("Found date %s at position %d\n",
            str[indices[0]:indices[1]], indices[0])
    }
}

The method returns a slice of index slices. Each inner slice contains the
positions for one match. The second parameter limits the number of matches.

## Named Capture Groups with Indices

Named capture groups make the code more readable. This example shows how to
work with named groups and their indices.

named_groups.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(?P\d{4})-(?P\d{2})-(?P\d{2})`)
    str := "Today is 2025-04-20"
    
    indices := re.FindSubmatchIndex([]byte(str))
    if indices != nil {
        for i, name := range re.SubexpNames() {
            if i != 0 &amp;&amp; name != "" {
                start := indices[2*i]
                end := indices[2*i+1]
                fmt.Printf("%s: %s\n", name, str[start:end])
            }
        }
    }
}

Named groups are accessed via SubexpNames. The indices follow the
same pattern as numbered groups but with meaningful names.

## Email Validation with Position Tracking

This example validates email addresses while also tracking their positions in
the input text.

email_indices.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})`)
    str := "Contact us at info@example.com or support@company.org"
    
    allIndices := re.FindAllSubmatchIndex([]byte(str), -1)
    for _, indices := range allIndices {
        fmt.Printf("Found email %s at position %d\n",
            str[indices[0]:indices[1]], indices[0])
        fmt.Printf("Username: %s\n", str[indices[2]:indices[3]])
        fmt.Printf("Domain: %s\n", str[indices[4]:indices[5]])
    }
}

The pattern captures both the full email and its components. The indices help
locate each part within the original string.

## Complex Pattern with Multiple Groups

For complex patterns with many groups, FindSubmatchIndex helps
extract specific parts while knowing their exact positions.

complex_pattern.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\w+):(\d+):(\d+\.\d+)`)
    str := "item1:42:3.14,item2:99:2.72,item3:7:1.61"
    
    allIndices := re.FindAllSubmatchIndex([]byte(str), -1)
    for i, indices := range allIndices {
        fmt.Printf("Match %d:\n", i+1)
        fmt.Printf("  Name: %s\n", str[indices[2]:indices[3]])
        fmt.Printf("  ID: %s\n", str[indices[4]:indices[5]])
        fmt.Printf("  Value: %s\n", str[indices[6]:indices[7]])
    }
}

The pattern matches name-value pairs with IDs. The indices let us extract each
component precisely, even in a complex string.

## HTML Tag Extraction with Positions

This example extracts HTML tags and their attributes while tracking their
positions in the document.

html_tags.go
  

package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`&lt;([a-zA-Z]+)(\s+[^&gt;]*)?&gt;`)
    html := `# Title

![logo.png](images/logo.png)

`
    
    allIndices := re.FindAllSubmatchIndex([]byte(html), -1)
    for _, indices := range allIndices {
        tag := html[indices[2]:indices[3]]
        fullTag := html[indices[0]:indices[1]]
        fmt.Printf("Found %s tag at position %d\n", tag, indices[0])
        fmt.Printf("  Full tag: %s\n", fullTag)
    }
}

The pattern matches HTML tags and captures the tag name. The indices help locate
each tag in the HTML string for further processing.

## Source

[Go regexp package documentation](https://pkg.go.dev/regexp)

This tutorial covered the Regexp.FindSubmatchIndex method in Go
with practical examples of pattern matching with position tracking.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).