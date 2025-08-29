+++
title = "Go struct"
date = 2025-08-29T19:56:22.208+01:00
draft = false
description = "Learn how to define and use structs in Go. Covers initialization, nested structs, and best practices for struct usage."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go struct

last modified April 11, 2024

In this article we show how to work with structures in Golang.

## The struct

A struct is a user-defined type that contains a collection of fields.
It is used to group related data to form a single unit. A Go struct can be
compared to a lightweight class without the inheritance feature.

## Go struct definition

A struct is defined with the type keyword.

type User struct {
    name       string
    occupation string
    age        int
}

A new type is created with the type keyword. It is followed
by the name of the type (User). The struct keyword indicates
that we are creating a struct. Inside the curly brackets, we have a list of
fields. Each field has a name and a type.

## Go initialize struct

We show how to initialize struct types in Go.

u := User{"John Doe", "gardener", 34}

A new User struct is created. The struct fields are initialized with the values
provided between the curly brackets. In this case, the order of the fields is
relevant.

u := User{
    name:       "John Doe",
    occupation: "gardener",
    age:        34,
}

We can provide both the field names and values. In this case, the order is not
important. Note that the last comma is mandatory.

u := User{}

If we omit the values in the curly brackets, they are initialized to zero values.

## Go struct simple example

The following is a Go struct simple example.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    age        int
}

func main() {

    u := User{"John Doe", "gardener", 34}

    fmt.Printf("%s is %d years old and he is a %s\n", u.name, u.age, u.occupation)
}

We define a User struct with three fields.

type User struct {
    name       string
    occupation string
    age        int
}

We declare the User struct.

u := User{"John Doe", "gardener", 34}

We initialize the User struct.

fmt.Printf("%s is %d years old and he is a %s\n", u.name, u.age, u.occupation)

We print the contents of the User struct.

$ go run main.go
John Doe is 34 years old and he is a gardener

## Go struct access fields

The struct fields are accessed with the dot operator.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    age        int
}

func main() {

    u := User{}
    u.name = "John Doe"
    u.occupation = "gardener"
    u.age = 34

    fmt.Printf("%s is %d years old and he is a %s\n", u.name, u.age, u.occupation)
}

We create an empty User struct. We initialize the fields with
values and read them using the dot operator.

## Go anonymous struct

It is possible to create anonymous structs in Go. Anonymous structs do not have
a name. They are created only once.

main.go
  

package main

import "fmt"

func main() {

    u := struct {
        name       string
        occupation string
        age        int
    }{
        name:       "John Doe",
        occupation: "gardener",
        age:        34,
    }

    fmt.Printf("%s is %d years old and he is a %s\n", u.name, u.age, u.occupation)
}

An anonymous struct is created only with the struct keyword. The
declaration of the struct is followed by its initialization.

## Go nested structs

Go structs can be nested.

main.go
  

package main

import "fmt"

type Address struct {
    city    string
    country string
}

type User struct {
    name    string
    age     int
    address Address
}

func main() {

    p := User{
        name: "John Doe",
        age:  34,
        address: Address{
            city:    "New York",
            country: "USA",
        },
    }

    fmt.Println("Name:", p.name)
    fmt.Println("Age:", p.age)
    fmt.Println("City:", p.address.city)
    fmt.Println("Country:", p.address.country)
}

In the code example, the Address struct is nested inside the
User struct.

fmt.Println("City:", p.address.city)
fmt.Println("Country:", p.address.country)

To access the fields of the nested struct, we access first the inner struct with
the dot operator; then we access the respective fields.

$ go run nested.go
Name: John Doe
Age: 34
City: New York
Country: USA

## Go struct promoted fields

The fields of a nested anonymous struct are promoted; that is, they are
accessed without referring to the nested struct.

main.go
  

package main

import "fmt"

type Address struct {
    city    string
    country string
}

type User struct {
    name string
    age  int
    Address
}

func main() {
    p := User{
        name: "John Doe",
        age:  34,
        Address: Address{
            city:    "New York",
            country: "USA",
        },
    }

    fmt.Println("Name:", p.name)
    fmt.Println("Age:", p.age)
    fmt.Println("City:", p.city)
    fmt.Println("Country:", p.country)
}

In the code example, we have a nested Address struct.

type User struct {
    name string
    age  int
    Address
}

The User struct has a nested anonymous Address struct.
The field does not have a name.

fmt.Println("City:", p.city)
fmt.Println("Country:", p.country)

The city and country fields are promoted. They are
accessed by directly referring to the parent struct.

$ go run main.go
Name: John Doe
Age: 34
City: New York
Country: USA

## Go struct functions fields

The struct fields can be functions.

main.go
  

package main

import "fmt"

type Info func(string, string, int) string

type User struct {
    name       string
    occupation string
    age        int
    info       Info
}

func main() {

    u := User{
        name:       "John Doe",
        occupation: "gardener",
        age:        34,
        info: func(name string, occupation string, age int) string {

            return fmt.Sprintf("%s is %d years old and he is a %s\n", name, age, occupation)
        },
    }

    fmt.Printf(u.info(u.name, u.occupation, u.age))
}

In the code example, we have the User struct. Its info
field is a function called Info.

## Go struct pointer

A pointer to the struct can be created with the &amp; operator or
the new keyword. A pointer is dereferenced with the *
operator.

main.go
  

package main

import "fmt"

type Point struct {
    x int
    y int
}

func main() {

    p := Point{3, 4}

    p_p := &amp;p

    (*p_p).x = 1
    p_p.y = 2

    fmt.Println(p)
}

In the code example, we create a pointer to the Point struct.

p_p := &amp;p

The &amp; operator returns a pointer to the Point
structure.

(*p_p).x = 1
p_p.y = 2

A pointer is dereferenced with the * operator. Go also allows to
use the dot operator directly.

Alternatively, we can create a pointer to a struct with the new
keyword.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    age        int
}

func main() {

    u := new(User)
    u.name = "Richard Roe"
    u.occupation = "driver"
    u.age = 44

    fmt.Printf("%s is %d years old and he is a %s\n", u.name, u.age, u.occupation)
}

The example creates a new pointer to the User struct with the
new keyword.

## Go struct constructor

There are no built-in constructors in Go. Programmers sometimes create
constructor functions as a best practice.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    age        int
}

func newUser(name string, occupation string, age int) *User {

    p := User{name, occupation, age}
    return &amp;p
}

func main() {

    u := newUser("Richard Roe", "driver", 44)

    fmt.Printf("%s is %d years old and he is a %s\n", u.name, u.age, u.occupation)
}

In the code example, we have the newUser constructor function, which
creates new User structs. The function returns a pointer to the
newly created struct.

## Go struct is a value type

Go structs are value types. When we assign a struct variable to another struct
variable, a new copy of the struct is created. Likewise, when we pass a struct
to another function, the function receives a new copy of the struct.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    age        int
}

func main() {

    u1 := User{"John Doe", "gardener", 34}

    u2 := u1

    u2.name = "Richard Roe"
    u2.occupation = "driver"
    u2.age = 44

    fmt.Printf("%s is %d years old and he is a %s\n", u1.name, u1.age, u1.occupation)
    fmt.Printf("%s is %d years old and he is a %s\n", u2.name, u2.age, u2.occupation)
}

In the code example, we assign a struct to another struct. Changing the fields
of the new struct does not affect the original struct.

$ go run main.go
John Doe is 34 years old and he is a gardener
Richard Roe is 44 years old and he is a driver

The two structs are distinct entities.

## Comparing Go structs

Go structs are equal if all their corresponding fields are equal.

main.go
  

package main

import "fmt"

type Point struct {
    x int
    y int
}

func main() {

    p1 := Point{3, 4}
    p2 := Point{3, 4}

    if p1 == p2 {

        fmt.Println("The structs are equal")
    } else {

        fmt.Println("The structs are not equal")
    }
}

In the code example, we compare two Point structs.

$ go run main.go
The structs are equal

## Go export struct

Named structs that start with a capital letter are exported and accessible from
outside their packages. Similarly, struct fields that start with a capital
letter are exported. Struct names and fields starting with a small letter are
visible only inside their package.

$ go mod init exporting

We create a new Go module with the go mod init command.

go.mod
main
└── main.go
model
├── address.go
└── user.go

This is the project structure.

model/user.go
  

package model

type User struct {
    Name       string
    Occupation string
    age        int
}

The Name and Occupation fields of the User
struct are exported, while the age field is not.

model/address.go
  

package model

type address struct {
    city    string
    country string
}

The address struct is not exported. We cannot refer to it in the
main.go file.

main/main.go
  

package main

import (
    "exporting/model"
    "fmt"
)

func main() {

    u := model.User{Name: "John Doe", Occupation: "gardener"}

    fmt.Printf("%s is a %s\n", u.Name, u.Occupation)
}

In the main.go file, we import the Name and Occupation
fields from the exporting/model package.

## Go create a slice of structs

In the following example, we create a slice of structs.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    country    string
}

func main() {

    users := []User{}
    users = append(users, User{"John Doe", "gardener", "USA"})
    users = append(users, User{"Roger Roe", "driver", "UK"})
    users = append(users, User{"Paul Smith", "programmer", "Canada"})
    users = append(users, User{"Lucia Mala", "teacher", "Slovakia"})
    users = append(users, User{"Patrick Connor", "shopkeeper", "USA"})
    users = append(users, User{"Tim Welson", "programmer", "Canada"})
    users = append(users, User{"Tomas Smutny", "programmer", "Slovakia"})

    for _, user := range users {

        fmt.Println(user)
    }
}

A User type is defined. Then we create an empty slice of User
structs. We add elements to the slice with append.

## Go filter slice of structs

In the next example, we filter a slice of Go structures.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    country    string
}

func main() {

    users := []User{

        {"John Doe", "gardener", "USA"},
        {"Roger Roe", "driver", "UK"},
        {"Paul Smith", "programmer", "Canada"},
        {"Lucia Mala", "teacher", "Slovakia"},
        {"Patrick Connor", "shopkeeper", "USA"},
        {"Tim Welson", "programmer", "Canada"},
        {"Tomas Smutny", "programmer", "Slovakia"},
    }

    var programmers []User

    for _, user := range users {

        if isProgrammer(user) {
            programmers = append(programmers, user)
        }
    }

    fmt.Println("Programmers:")
    for _, u := range programmers {

        fmt.Println(u)
    }
}

func isProgrammer(user User) bool {

    return user.occupation == "programmer"
}

In the code example, we define a slice of users. We create a new slice that
contains only programmers.

type User struct {
    name       string
    occupation string
    country    string
}

The User struct has three fields.

users := []User{

    {"John Doe", "gardener", "USA"},
    {"Roger Roe", "driver", "UK"},
    {"Paul Smith", "programmer", "Canada"},
    {"Lucia Mala", "teacher", "Slovakia"},
    {"Patrick Connor", "shopkeeper", "USA"},
    {"Tim Welson", "programmer", "Canada"},
    {"Tomas Smutny", "programmer", "Slovakia"},
}

This is the original slice of User structures.

var programmers []User

The filtered users/programmers are stored in the programmers
slice.

for _, user := range users {

    if isProgrammer(user) {
        programmers = append(programmers, user)
    }
}

We go over the users slice and add a current user to the
programmers slice only if the user satisfies the
isProgrammer predicate.

func isProgrammer(user User) bool {

    return user.occupation == "programmer"
}

The IsProgrammer predicate returns true for all users whose
occupation field equals to "programmer".

$ go run main.go
Programmers:
{Paul Smith programmer Canada}
{Tim Welson programmer Canada}
{Tomas Smutny programmer Slovakia}

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered structs in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).