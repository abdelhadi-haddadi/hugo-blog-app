+++
title = "Go interface"
date = 2025-08-29T19:55:23.540+01:00
draft = false
description = "Learn how to work with interfaces in Go. Includes examples of polymorphism and abstraction."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go interface

last modified May 3, 2025

In this article we show how to work with interfaces in Golang.

An *interface* in Go is a specific type that defines a set of function
signatures without specifying their implementation. Unlike languages such as
Java or C#, where interfaces require explicit declarations, Go follows an
implicit approach: a type satisfies an interface simply by implementing its
functions.

The primary role of an interface is to define behavior through function
signatures. Each function signature specifies a name, input arguments, and
return types, but the actual implementation is left to the types that satisfy
the interface. This design promotes flexibility and decoupling, making Go code
more modular and adaptable.

Interfaces are often referred to as exposed APIs or contracts. If a type
implements the functions defined in an interface—such as a sortable interface—it
adheres to the contract, guaranteeing that the type supports sorting operations.
This allows developers to write generic and reusable code without needing to
know the specific underlying type.

Since interfaces in Go specify behavior rather than implementation, they play a
crucial role in enabling polymorphism. They allow different types to be used
interchangeably in functions or data structures that expect a given interface,
improving code extensibility and maintainability.

Using interfaces can make code clearer, shorter, and more readable. 

## Go interface example

The following example uses a simple Shape interface.

geo_shapes.go
  

package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
}

type Rectangle struct {
    Width, Height float64
}

type Circle struct {
    Radius float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func getArea(shape Shape) {

    fmt.Println(shape.Area())
}

func main() {

    r := Rectangle{Width: 7, Height: 8}
    c := Circle{Radius: 5}

    getArea(r)
    getArea(c)
}

The Shape is a generic geometric form. It cannot be drawn. The 
Rectangle and Circle are specific geometric forms, 
which can be drawn and for which we can calculate the area.

type Shape interface {
    Area() float64
}

We define the Shape interface. It has one function signature: 
Area. 

type Rectangle struct {
    Width, Height float64
}

type Circle struct {
    Radius float64
}

We define two types: the Rectangle and the Circle.

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

We define the Area function for the Rectangle and 
Circle; we say that these two types implement the Shape
interface. 

func getArea(shape Shape) {

    fmt.Println(shape.Area())
}

The getArea function takes the Shape interface as a 
parameter. We can pass both the Rectangle and the Circle, 
because they are both shapes.

$ go run geo_shapes.go 
56
78.53981633974483

## Go interface slice

In the following example, we create a slice of Animal interface.

interface_slice.go
  

package main

import (
    "fmt"
)

type Animal interface {
    Sound() string
}

type Dog struct {
}

func (d Dog) Sound() string {
    return "Woof!"
}

type Cat struct {
}

func (c Cat) Sound() string {
    return "Meow!"
}

type Cow struct {
}

func (l Cow) Sound() string {
    return "Moo!"
}

func main() {

    animals := []Animal{Dog{}, Cat{}, Cow{}}

    for _, animal := range animals {

        fmt.Println(animal.Sound())
    }
}

The example defines an Animal interface and Dog, 
Cat, and Cow types.

type Animal interface {
    Sound() string
}

type Dog struct {
}

func (d Dog) Sound() string {
    return "Woof!"
}

The Dog type implements the Sound contract function of
the Animal interface.

animals := []Animal{Dog{}, Cat{}, Cow{}}

for _, animal := range animals {

    fmt.Println(animal.Sound())
}

Because all three types implement one common interface, we can place them 
into a slice.

$ go run interface_slice.go 
Woof!
Meow!
Moo!

## Go Stringer interface

The Stringer interface is defined in the fmt package. 
Its String function is invoked when a type is passed to any of the 
print functions. We can customize the output message of our own types.

type Stringer interface {
    String() string
}

This is the Stringer interface.

stringer.go
  

package main

import (
    "fmt"
)

type User struct {
    Name       string
    Occupation string
}

func (u User) String() string {

    return fmt.Sprintf("%s is a(n) %s", u.Name, u.Occupation)
}

func main() {

    u1 := User{"John Doe", "gardener"}
    u2 := User{"Roger Roe", "driver"}

    fmt.Println(u1)
    fmt.Println(u2)
}

In the code example, we define the String function of the
Stringer interface for the User type.

func (u User) String() string {

    return fmt.Sprintf("%s is a(n) %s", u.Name, u.Occupation)
}

The implementation returns a string that tells the user's name and occupation.

$ go run stringer.go 
John Doe is a(n) gardener
Roger Roe is a(n) driver

## Go interface{}

Go interface{} is an empty interface; all types in Go satisfy 
the empty interface. Any type can be assigned to a variable declared with 
empty interface.

empty_interface.go
  

package main

import (
    "fmt"
)

type Body struct {
    Msg interface{}
}

func main() {

    b := Body{"Hello there"}
    fmt.Printf("%#v %T\n", b.Msg, b.Msg)

    b.Msg = 5
    fmt.Printf("%#v %T\n", b.Msg, b.Msg)
}

We have the Msg variable of interface{}. In the 
example, we assign a string and an integer to the variable.

$ go run empty_interface.go 
"Hello there" string 
5 int

## Go type assertion

The type assertion x.(T)  asserts that the concrete value stored in
x is of type T, and that x is not
nil.

type_assertion.go
  

package main

import (
    "fmt"
)

func main() {

    var val interface{} = "falcon"

    r, ok := val.(string)
    fmt.Println(r, ok)

    r2, ok2 := val.(int)
    fmt.Println(r2, ok2)

    r3 := val.(string)
    fmt.Println(r3)

    //r4 := val.(int)
    //fmt.Println(r4)
}

In the code example, we check the type of the val variable. 

r, ok := val.(string)
fmt.Println(r, ok)

In the r variable, we have the value. The ok is a 
boolean that tells if the value is the string type.

//r4 := val.(int)
//fmt.Println(r4)

The commented lines would lead to a panic: 
interface conversion: interface {} is string, not int.

$ go run type_assertion.go 
falcon true
0 false
falcon

In the following example, we have a map with string type keys and
interface{} for values. It allows us to use various types for 
the values.

main.go
  

package main

import (
    "fmt"
    "log"
)

func main() {

    user := make(map[string]interface{}, 0)

    user["name"] = "John Doe"
    user["age"] = 21
    user["weight"] = 70.3

    age, ok := user["age"].(int)

    if !ok {
        log.Fatal("assert failed")
    }

    user["age"] = age + 1

    fmt.Printf("%+v", user)
}

Since the values are defined as empty interface, the underlying type of the age 
is lost. We need to cast the value to int in order to increment it.

## Go type switch

A *type switch* is used to compare the concrete type of an interface with
the multiple types provide in the case statements.

type_switch.go
  

package main

import "fmt"

type User struct {
    Name string
}

func checkType(a interface{}) {

    switch a.(type) {

    case int:
        fmt.Println("Type: int, Value:", a.(int))
    case string:
        fmt.Println("Type: string, Value:", a.(string))
    case float64:
        fmt.Println("Type: float64, Value:", a.(float64))
    case User:
        fmt.Println("Type: User, Value:", a.(User))
    default:
        fmt.Println("unknown type")
    }
}

func main() {

    checkType(4)
    checkType("falcon")
    checkType(User{"John Doe"})
    checkType(7.9)
    checkType(true)
}

The checkType function determines the type of its parameter in a 
switch statement.

$ go run type_switch.go 
Type: int, Value: 4
Type: string, Value: falcon
Type: User, Value: {John Doe}
Type: float64, Value: 7.9
unknown type

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered the interface type in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).