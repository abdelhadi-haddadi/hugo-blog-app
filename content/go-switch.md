+++
title = "Go switch"
date = 2025-08-29T19:56:22.181+01:00
draft = false
description = "Learn how to effectively use switch statements in Go. Covers syntax, examples, and advanced usage scenarios."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go switch

last modified April 11, 2024

In this article we show how to work with switch statement in Golang.

## Go switch statement

Go switch statement provides a multi-way execution. An expression or type
specifier is compared to the cases inside the switch to determine which
branch to execute. Unlike in other languages such as C, Java, or PHP, each 
case is terminated by an implicit break; therefore, we do not have to write 
it explicitly. 

Switch cases evaluate cases from top to bottom, stopping when a case succeeds. 
Switch statements work on values of any type, not just integers.

There are two types of switch statements: switch expressions and switch types.
We can use commas to separate multiple expressions in the same case statement. 
The switch without an expression is an alternate way to express if/else logic.

The default statement can be used for a branch that is executed, 
when no other cases fit. The default statement is optional.

## Go switch example

The following is a simple example  of a switch statement in Go.

weekday.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    switch time.Now().Weekday() {

    case time.Monday:
        fmt.Println("Today is Monday.")
        
    case time.Tuesday:
        fmt.Println("Today is Tuesday.")
        
    case time.Wednesday:
        fmt.Println("Today is Wednesday.")
        
    case time.Thursday:
        fmt.Println("Today is Thursday.")
        
    case time.Friday:
        fmt.Println("Today is Friday.")
        
    case time.Saturday:
        fmt.Println("Today is Saturday.")
        
    case time.Sunday:
        fmt.Println("Today is Sunday.")
    }
}

In the code example, we find out the current weekday and print the corresponding 
message. 

switch time.Now().Weekday() {

The switch statement takes an expresssion, which evaluates to the 
current weekday. 

case time.Monday:
    fmt.Println("Today is Monday.")

If the weekday evaluates to time.Monday, we print the 
"Today is Monday" message. 

## Go switch multiple expressions

It is possible to place multiple expressions in one case. 

weekday2.go
  

package main

import (
    "time"
    "fmt"
)

func main() {

    switch time.Now().Weekday() {
        
    case time.Monday, time.Tuesday, time.Wednesday, time.Thursday, time.Friday:
        fmt.Println("weekday")
    case time.Saturday, time.Sunday:
        fmt.Println("weekend")
    }
}

The example prints either weekday or weekend, depending on the evaluation of 
multiple expressions in two case statements.

## Go switch default

The default statement can be used for all the values that do not
fit the specified cases.

sizes.go
  

package main

import (
    "fmt"
)

func main() {

    size := "XXXL"

    switch size {

    case "XXS":
        fmt.Println("extra extra small")

    case "XS":
        fmt.Println("extra small")

    case "S":
        fmt.Println("small")

    case "M":
        fmt.Println("medium")

    case "L":
        fmt.Println("large")

    case "XL":
        fmt.Println("extra large")

    case "XXL":
        fmt.Println("extra extra large")

    default:
        fmt.Println("unknown")
    }
}

The example checks the sizes of clothes. If a value that is not recognized 
is used, it prints "unknown" to the terminal.

## Go switch optional statement

An optional initializer statement may precede a switch expression.
The initializer and the expression are separated by semicolon.

number.go
  

package main

import (
    "fmt"
)

func main() {

    switch num := 6; num % 2 == 0 {

    case true:
        fmt.Println("even value")

    case false:
        fmt.Println("odd value")
    }
}

In the code example, we have both the switch initializer and the expression. 
The switch statement determines if the value is even or odd.

switch num := 6; num % 2 == 0 {

The num := 6 is the switch initializer and the num % 2
is the switch expression. 

## Go switch break statement

Go uses an implicit break statement for each case. This is different
from languages like C or Java, where the break is necessary. 
We can also explicitly specify break when needed.

explicit_break.go
  

package main

import (
"fmt"
)

func main() {

    w := "a b c\td\nefg hi"

    for _, e := range w {

        switch e {
        case ' ', '\t', '\n': 
            break
        default:
            fmt.Printf("%c\n", e)
        }
    }
}

In the code example, we loop through a string which contains white spaces. 
Only non-white spaces are printed.

w := "a b c\td\nefg hi"

We have a space a tab and a new line white space characters in the string.

    
for _, e := range w {

We go through the string elements with for range loop.

    

switch e {
    case ' ', '\t', '\n': 
        break

If we encounter the specified three white spaces, we terminate the switch
statement with break.

    
$ go run explicit_break.go 
a
b
c
d
e
f
g
h
i

## Go switch without expression

When used without an expression, the switch statement is effectively
equal to switch true. This form can be used instead of multiline 
if/else statements to shorten code.

noon.go
  

package main

import (
    "time"
    "fmt"
)

func main() {

    now := time.Now()

    switch {
    case now.Hour() &lt; 12:
        fmt.Println("AM")

    default:
        fmt.Println("PM")
    }
}

Depending on the current hour, the example prints AM or PM.

## Go switch fallthrough

We can use the fallthrough keyword to go to the next case. 

fallthrough.go
  

package main

import (
    "fmt"
)

// A -&gt; B -&gt; C -&gt; D -&gt; E

func main() {

    nextstop := "B"

    fmt.Println("Stops ahead of us:")

    switch nextstop {

    case "A":
        fmt.Println("A")
        fallthrough

    case "B":
        fmt.Println("B")
        fallthrough

    case "C":
        fmt.Println("C")
        fallthrough

    case "D":
        fmt.Println("D")
        fallthrough

    case "E":
        fmt.Println("E")
    }
}

Imagine that we go from A stop to E stop. We determine how many stops are ahead
of us, basend on the next visible stop.

$ go run fallthrough.go 
Stops ahead of us:
B
C
D
E

    

## Go type switch

With a type switch we can switch on the type of an interface value.

type_switch.go
  

package main 

import "fmt"

func main() { 

    var data interface{} 
    
    data = 112523652346.23463246345

    switch mytype:= data.(type) { 
        
    case string: 
        fmt.Println("string")

    case bool: 
        fmt.Println("boolean") 

    case float64: 
        fmt.Println("float64 type") 

    case float32: 
        fmt.Println("float32 type") 

    case int: 
        fmt.Println("int") 

    default: 
        fmt.Printf("%T", mytype) 
    } 
} 

In the code example, we print the data type of a value. 

case bool: 
    fmt.Println("boolean") 

    

For the bool type, we print "boolean".

$ go run type_switch.go 
float64 type

    

The 112523652346.23463246345 value is a float64.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered the switch statement in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).