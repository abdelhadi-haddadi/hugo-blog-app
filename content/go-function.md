+++
title = "Go function"
date = 2025-08-29T19:55:17.815+01:00
draft = false
description = "Learn how to define and use functions in Go. Includes examples of parameters, return values, and closures."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go function

last modified May 11, 2025

This article provides a comprehensive overview of working with functions in
Golang. Functions play a crucial role in structuring code efficiently, enabling
reusable logic, and ensuring cleaner, more maintainable programs.

## Function Definition

A function in Go is a unit of code that maps zero or more input parameters to
zero or more output parameters. Functions allow developers to encapsulate logic,
improve code readability, and structure applications efficiently.

The key advantages of using functions in Go include:

    - Reducing redundancy by eliminating repetitive code

    - Breaking down complex problems into manageable components

    - Enhancing clarity and making code easier to understand

    - Encouraging code reuse for modular programming

    - Enforcing information hiding to maintain encapsulation

In Go, functions are first-class citizens, meaning they can be assigned to
variables, passed as arguments, and returned from other functions. This
flexibility enables powerful programming techniques such as higher-order
functions and function composition.

Functions in Go are defined using the func keyword. The
return statement is used to return values from a function. The body
of a function contains statements that execute when the function is invoked.
Function bodies are enclosed within curly brackets {}, ensuring
clear separation of logic.

To call a function, its name must be specified, followed by parentheses
(). A function may accept zero or more parameters, allowing for
dynamic behavior based on input values. By structuring logic within functions,
Go programs become more scalable, maintainable, and easier to debug.

## Simple example

The following example creates a simple function in Go. 

main.go
  

package main

import "fmt"

func main() {

    x := 4
    y := 5

    z := add(x, y)

    fmt.Printf("Output: %d\n", z)
}

func add(a int, b int) int {

    return a + b
}

In the code example, we define a function which adds two values.

z := add(x, y)

We call the add function; it takes two parameters. The computed 
value is passed to the z variable.

func add(a int, b int) int {

    return a + b
}

We define the add function. The parameters of the function are 
separated with comma; each parameter name is followed with its data type.
After the parameters, we specify the return value type. The statements that are 
executed when the function is called are placed between curly brackets.
The result of the addition operation is returned to the caller with the 
return keyword.

$ go run main.go 
Output: 9

## Omitting type

When the parameters of a function have the same type, the type can be omitted 
for some of them; that is, specified only once. 

main.go
  

package main

import "fmt"

func add(x int, y int) int {

    return x + y
}

func sub(x, y int) int {

    return x - y
}

func main() {

    fmt.Println(add(5, 4))
    fmt.Println(sub(5, 4))
}

In the code example, we have two functions: add and sub. 
In case of the sub function, the type was omitted for the 
x variable.

## Function named return variables

We can specify named return variables in round brackets after the function 
parameters.

main.go
  

package main

import "fmt"

func inc(x, y, z int) (a, b, c int) {

    a = x + 1
    b = y + 1
    c = z + 1

    return
}

func main() {

    x, y, z := inc(10, 100, 1000)

    fmt.Println(x, y, z)
}

In the code example, we have a function which increments its three parameters.

func inc(x, y, z int) (a, b, c int) {

We have three named return values: a, b, and c.

a = x + 1
b = y + 1
c = z + 1

return

We compute the values for the return variables. After that, we must specify the 
return keyword.

$ go run main.go 
11 101 1001

## Multiple return values

Go functions allow to return multiple values.

main.go
  

package main

import (
    "fmt"
    "math/rand"
)

func threerandom() (int, int, int) {

    x := rand.Intn(10)
    y := rand.Intn(10)
    z := rand.Intn(10)

    return x, y, z
}

func main() {

    r1, r2, r3 := threerandom()

    fmt.Println(r1, r2, r3)
}

In the code example, we have a threerandom function, which returns 
three random values.

func threerandom() (int, int, int) {

We specify that the function returns three integer values.

x := rand.Intn(10)
y := rand.Intn(10)
z := rand.Intn(10)

We compute three random values.

return x, y, z

The values are returned from the function. They are separated with commad
character.

$ go run main.go 
0 8 0

## Anonymous function

We can create anonymous functions. Anonymous functions do not have a name.

main.go
  

package main

import "fmt"

func main() {

    sum := func(a, b, c int) int {
        return a + b + c
    }(3, 5, 7)

    fmt.Println("5+3+7 =", sum)
}

We create an anonymous function which adds three values. We pass three parameters
to the function right after its definition. 

$ go run main.go 
5+3+7 = 15

## Variadic function

A variadic function can accept variable number of parameters. For instance, when
we want to calculate the sum of values, we might have four, five, six etc. 
values to pass to the function.

We use the ... (ellipses) operator to define a variadic function.

main.go
  

package main

import "fmt"

func main() {

    s1 := sum(1, 2, 3)
    s2 := sum(1, 2, 3, 4)
    s3 := sum(1, 2, 3, 4, 5)

    fmt.Println(s1, s2, s3)
}

func sum(nums ...int) int {

    res := 0

    for _, n := range nums {
        res += n
    }

    return res
}

In the code example, we have a sum function which accepts variable 
number of parameters.

func sum(nums ...int) int {

    res := 0

    for _, n := range nums {
        res += n
    }

    return res
}

The nums variable is a slice, which contains all values passed 
to the sum function. We loop over the slice and calculate the 
sum of the parameters.

$ go run main.go 
6 10 15

## Recursive function

Recursion, in mathematics and computer science, is a way of defining methods in
which the method being defined is applied within its own definition. To put it
differently, a recursive method calls itself to do its task. Recursion is a
widely used approach to solve many programming tasks.

A typical example is the calculation of a factorial. 

main.go
  

package main

import "fmt"

func fact(n int) int {

    if n == 0 || n == 1 {
        return 1
    }

    return n * fact(n-1)
}

func main() {

    fmt.Println(fact(7))
    fmt.Println(fact(10))
    fmt.Println(fact(15))
}

In this code example, we calculate the factorial of three numbers. 

return n * fact(n-1)

Inside the body of the fact function, we call the fact 
function with a modified argument. The function calls itself.

$ go run main.go 
5040
3628800
1307674368000

These are the computed factorials.

## Deferring function call

The defer statement defers the execution of a function until the
surrounding function returns. The deferred call's arguments are evaluated
immediately, but the function call is not executed until the surrounding
function returns. 

main.go
  

package main

import "fmt"

func main() {

    fmt.Println("begin main")

    defer sayHello()

    fmt.Println("end main")
}

func sayHello() {

    fmt.Println("hello")
}

In the code example, the sayHello function is called after the
main function finishes.

$ go run main.go 
begin main
end main
hello

## Passing parameters by value

In Go, function parameters are passed only by value.

**Note: ** everything is passed by value in Go. When we pass 
a pointer to a type, a separate copy of that pointer is created. This is 
different from C, where in case of pointers,  the same pointer is passed to 
the function. 

In the following example, an integer and a User structure are
passed as parameters to functions.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
}

func main() {

    x := 10
    fmt.Printf("inside main %d\n", x)

    inc(x)

    fmt.Printf("inside main %d\n", x)

    fmt.Println("---------------------")

    u := User{"John Doe", "gardener"}
    fmt.Printf("inside main %v\n", u)

    change(u)
    fmt.Printf("inside main %v\n", u)
}

func inc(x int) {

    x++
    fmt.Printf("inside inc %d\n", x)
}

func change(u User) {

    u.occupation = "driver"
    fmt.Printf("inside change %v\n", u)
}

In the code example, the original values of the x and User 
struct are not modified.

func inc(x int) {

    x++
    fmt.Printf("inside inc %d\n", x)
}

A copy of the integer value is created. Inside the function, we increment the 
value of this copy. So the original variable is intact.

$ go run main.go 
inside main 10
inside inc 11
inside main 10
---------------------
inside main {John Doe gardener}
inside change {John Doe driver}
inside main {John Doe gardener}

In the next example, we pass pointers to the the integer variable and
structure.

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
}

func main() {

    x := 10
    fmt.Printf("inside main %d\n", x)

    inc(&amp;x)

    fmt.Printf("inside main %d\n", x)

    fmt.Println("---------------------")

    u := User{"John Doe", "gardener"}
    fmt.Printf("inside main %v\n", u)

    change(&amp;u)
    fmt.Printf("inside main %v\n", u)
}

func inc(x *int) {

    (*x)++
    fmt.Printf("inside inc %d\n", *x)
}

func change(u *User) {

    u.occupation = "driver"
    fmt.Printf("inside change %v\n", *u)
}

Now the original values are modified. But technically, parameters are still
passed by value. Go creates new copies of the pointers. (This is a different
from C.)

inc(&amp;x)

With the &amp; character, we pass a pointer to the x
variable.

func inc(x *int) {

    (*x)++
    fmt.Printf("inside inc %d\n", *x)
}

A *copy* of the pointer to the x variable is created. 
Changing the value of the x modifies the original variable as well.

$ go run main.go 
inside main 10
inside inc 11
inside main 11
---------------------
inside main {John Doe gardener}
inside change {John Doe driver}
inside main {John Doe driver}

The original values have been modified.

Arrays are value types, slices and maps are reference types. So in case of the
slices and maps, a copy of the reference is created.

main.go
  

package main

import "fmt"

func main() {

    vals := []int{1, 2, 3, 4, 5}

    fmt.Printf("%v\n", vals)

    square(vals)

    fmt.Printf("%v\n", vals)
}

func square(vals []int) {

    for i, val := range vals {

        vals[i] = val * val
    }
}

In the code example, we pass a slice to the square function. The 
elements of the original slice are modified.

$ go run main.go 
[1 2 3 4 5]
[1 4 9 16 25]

The elements are squared.

Arrays are value types.

main.go
  

package main

import "fmt"

func main() {

    vals := [5]int{1, 2, 3, 4, 5}

    fmt.Printf("%v\n", vals)

    square(vals)

    fmt.Printf("%v\n", vals)
}

func square(vals [5]int) {

    for i, val := range vals {

        vals[i] = val * val
    }
}

The example passes an array to the square function.

$ go run main.go 
[1 2 3 4 5]
[1 2 3 4 5]

The elements are not modified.

Maps are reference types.

main.go
  

package main

import "fmt"

func main() {

    items := map[string]int{"coins": 1, "pens": 2, "chairs": 4}
    fmt.Printf("%v\n", items)

    update(items)

    fmt.Printf("%v\n", items)
}

func update(items map[string]int) {

    items["coins"] = 6
}

The example passes a map to the update function.

$ go run main.go 
map[chairs:4 coins:1 pens:2]
map[chairs:4 coins:6 pens:2]

As we can see, the original map has been updated.

## Function as a parameter

A Go function can be passed to other functions as a parameter. Such a function 
is called a *higher-order* function.

main.go
  

package main

import "fmt"

func inc(x int) int {
    x++
    return x
}

func dec(x int) int {
    x--
    return x
}

func apply(x int, f func(int) int) int {

    r := f(x)
    return r
}

func main() {

    r1 := apply(3, inc)
    r2 := apply(2, dec)
    fmt.Println(r1)
    fmt.Println(r2)
}

In the code example, the apply function takes the inc and 
dec functions as parameters.

func apply(x int, f func(int) int) int {

We specify that the second parameter is a function type.

r1 := apply(3, inc)
r2 := apply(2, dec)

We pass the inc and dec functions to the apply
function as parameters.

$ go run main.go 
4
1

## Custom function types

Go allows to create reusable functions signatures with the type
keyword.

main.go
  

package main

import "fmt"

type output func(string) string

func hello(name string) string {

    return fmt.Sprintf("hello %s", name)
}

func main() {

    var f output

    f = hello
    fmt.Println(f("Peter"))
}

With the type keyword, we create a function type which accepts 
one string parameter and returns a string.

## The filter function

We have a practical example where we filter data. 

main.go
  

package main

import "fmt"

type User struct {
    name       string
    occupation string
    married    bool
}

func main() {

    u1 := User{"John Doe", "gardener", false}
    u2 := User{"Richard Roe", "driver", true}
    u3 := User{"Bob Martin", "teacher", true}
    u4 := User{"Lucy Smith", "accountant", false}
    u5 := User{"James Brown", "teacher", true}

    users := []User{u1, u2, u3, u4, u5}

    married := filter(users, func(u User) bool {
        if u.married == true {
            return true
        }
        return false
    })

    teachers := filter(users, func(u User) bool {

        if u.occupation == "teacher" {
            return true
        }
        return false
    })

    fmt.Println("Married:")
    fmt.Printf("%v\n", married)

    fmt.Println("Teachers:")
    fmt.Printf("%v\n", teachers)

}

func filter(s []User, f func(User) bool) []User {
    var res []User

    for _, v := range s {

        if f(v) == true {
            res = append(res, v)
        }
    }
    return res
}

We have a slice of User structures. We filter the slice to 
form new slices of married users and users that are teachers.

married := filter(users, func(u User) bool {
    if u.married == true {
        return true
    }
    return false
})

We call the filter function. It accepts an anonymous function as a
parameter. The function returns true for married users. A function
that returns a boolean value is known also as a *predicate*.

func filter(s []User, f func(User) bool) []User {
    var res []User

    for _, v := range s {

        if f(v) == true {
            res = append(res, v)
        }
    }
    return res
}

The filter function forms a new slice for all users that satisfy
the given condition.

$ go run main.go 
Married:
[{Richard Roe driver true} {Bob Martin teacher true} {James Brown teacher true}]
Teachers:
[{Bob Martin teacher true} {James Brown teacher true}]

## Function as a struct method

In Go, you can define methods on struct types by specifying a receiver between
the func keyword and the method name.

main.go
  

package main

import "fmt"

type Rectangle struct {
    width, height float64
}

// Method with value receiver
func (r Rectangle) Area() float64 {
    return r.width * r.height
}

// Method with pointer receiver
func (r *Rectangle) Scale(factor float64) {
    r.width *= factor
    r.height *= factor
}

func main() {

    rect := Rectangle{width: 10, height: 5}
    
    fmt.Println("Initial area:", rect.Area())
    
    rect.Scale(2)
    fmt.Println("After scaling:")
    fmt.Println("Width:", rect.width, "Height:", rect.height)
    fmt.Println("New area:", rect.Area())
}

This example demonstrates both value and pointer receivers for struct methods.

func (r Rectangle) Area() float64 {

Area is a method with a value receiver - it operates on a copy of
the Rectangle.

func (r *Rectangle) Scale(factor float64) {

Scale is a method with a pointer receiver - it can modify the
original Rectangle.

$ go run main.go 
Initial area: 50
After scaling:
Width: 20 Height: 10
New area: 200

## Function with Worker Interface

This example demonstrates how interfaces can be used to create flexible functions that work with different worker implementations.

main.go
  

package main

import (
    "fmt"
    "time"
)

type Worker interface {
    Work() string
    Rest()
}

type Programmer struct {
    Name string
}

func (p Programmer) Work() string {
    return fmt.Sprintf("%s is writing Go code", p.Name)
}

func (p Programmer) Rest() {
    fmt.Printf("%s is taking a coffee break\n", p.Name)
}

type Chef struct {
    Name string
}

func (c Chef) Work() string {
    return fmt.Sprintf("%s is preparing a gourmet meal", c.Name)
}

func (c Chef) Rest() {
    fmt.Printf("%s is tasting the food\n", c.Name)
}

func WorkDay(w Worker, hours int) {
    fmt.Println("Starting work day")
    for i := 0; i &lt; hours; i++ {
        fmt.Println(w.Work())
        time.Sleep(500 * time.Millisecond) // Simulate work
    }
    w.Rest()
    fmt.Println("Work day complete")
}

func main() {
    dev := Programmer{"Alice"}
    cook := Chef{"Bob"}

    WorkDay(dev, 3)
    WorkDay(cook, 2)
}

This example shows how different types can implement the same interface and be processed by the same function.

type Worker interface {
    Work() string
    Rest()
}

The Worker interface defines two methods that must be implemented by any type that wants to be considered a Worker.

func WorkDay(w Worker, hours int) {
    fmt.Println("Starting work day")
    for i := 0; i &lt; hours; i++ {
        fmt.Println(w.Work())
        time.Sleep(500 * time.Millisecond)
    }
    w.Rest()
    fmt.Println("Work day complete")
}

The WorkDay function accepts any type that satisfies the Worker interface and coordinates the work day.

$ go run main.go 
Starting work day
Alice is writing Go code
Alice is writing Go code
Alice is writing Go code
Alice is taking a coffee break
Work day complete
Starting work day
Bob is preparing a gourmet meal
Bob is preparing a gourmet meal
Bob is tasting the food
Work day complete

## Function with Type Switch

This example demonstrates how to use a type switch inside a function to handle
different types differently.

main.go
  

package main

import (
    "fmt"
    "reflect"
)

func ProcessValue(v interface{}) string {
    switch val := v.(type) {
    case int:
        return fmt.Sprintf("Integer: %d (double is %d)", val, val*2)
    case float64:
        return fmt.Sprintf("Float: %.2f (square is %.2f)", val, val*val)
    case string:
        return fmt.Sprintf("String: '%s' (length %d)", val, len(val))
    case bool:
        return fmt.Sprintf("Boolean: %v (negated is %v)", val, !val)
    default:
        return fmt.Sprintf("Unknown type: %v", reflect.TypeOf(v))
    }
}

func main() {

    fmt.Println(ProcessValue(42))
    fmt.Println(ProcessValue(3.14159))
    fmt.Println(ProcessValue("Hello"))
    fmt.Println(ProcessValue(true))
    fmt.Println(ProcessValue([]int{1, 2, 3}))
}

This function uses a type switch to provide different handling for different
input types.

func ProcessValue(v interface{}) string {
    switch val := v.(type) {
    case int:
        return fmt.Sprintf("Integer: %d (double is %d)", val, val*2)
    ...
    }
}

The type switch examines the concrete type of the interface value and executes
the matching case.

fmt.Println(ProcessValue(42))
fmt.Println(ProcessValue(3.14159))
fmt.Println(ProcessValue("Hello"))

The same function handles multiple different types with appropriate behavior for
each.

$ go run main.go 
Integer: 42 (double is 84)
Float: 3.14 (square is 9.87)
String: 'Hello' (length 5)
Boolean: true (negated is false)
Unknown type: []int

## Immediately Invoked Function Expression (IIFE)

In Go, you can define and immediately execute an anonymous function. This
pattern is useful for initialization or creating scopes.

main.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    // IIFE that initializes a value
    startTime := func() time.Time {
        fmt.Println("Initializing start time...")
        return time.Now()
    }()
    
    // IIFE with parameters
    func(msg string) {
        fmt.Println("Message:", msg)
    }("Hello from IIFE")
    
    fmt.Println("Program started at:", startTime.Format("15:04:05"))
    
    // IIFE creating a scope
    func() {
        x := 10
        y := 20
        fmt.Println("Inside scope:", x+y)
    }()
    
    // x and y not accessible here
}

This example shows several uses of Immediately Invoked Function Expressions in
Go.

startTime := func() time.Time {
    fmt.Println("Initializing start time...")
    return time.Now()
}()

An IIFE that initializes a variable with the current time.

func(msg string) {
    fmt.Println("Message:", msg)
}("Hello from IIFE")

An IIFE that takes parameters and executes immediately.

$ go run main.go 
Initializing start time...
Message: Hello from IIFE
Program started at: 14:30:45
Inside scope: 30

## Function with Generic Type Parameters

Go 1.18 introduced generics, allowing functions to work with multiple types
while maintaining type safety.

main.go
  

package main

import (
    "fmt"
    "golang.org/x/exp/constraints"
)

// Generic function to find the maximum of two values
func Max[T constraints.Ordered](a, b T) T {
    if a &gt; b {
        return a
    }
    return b
}

// Generic function to reverse any slice
func ReverseSlice[T any](s []T) []T {
    result := make([]T, len(s))
    for i, v := range s {
        result[len(s)-1-i] = v
    }
    return result
}

func main() {

    fmt.Println("Max int:", Max(3, 7))
    fmt.Println("Max float:", Max(3.14, 2.71))
    fmt.Println("Max string:", Max("apple", "banana"))

    ints := []int{1, 2, 3, 4, 5}
    strs := []string{"a", "b", "c", "d"}

    fmt.Println("Reversed ints:", ReverseSlice(ints))
    fmt.Println("Reversed strs:", ReverseSlice(strs))

    type Point struct{ X, Y float64 }
    points := []Point{{1, 2}, {3, 4}, {5, 6}}
    fmt.Println("Reversed points:", ReverseSlice(points))
}

This example demonstrates generic functions that work with multiple types.

func Max[T constraints.Ordered](a, b T) T {

The Max function uses a type parameter T constrained
to ordered types, allowing comparisons like &gt;.

func ReverseSlice[T any](s []T) []T {

The ReverseSlice function works with any type (any
constraint).

fmt.Println("Max int:", Max(3, 7))
fmt.Println("Max float:", Max(3.14, 2.71))

The same generic function works with different concrete types.

$ go run main.go 
Max int: 7
Max float: 3.14
Max string: banana
Reversed ints: [5 4 3 2 1]
Reversed strs: [d c b a]
Reversed points: [{5 6} {3 4} {1 2}]

## Error Handling in Functions

Go functions often return an error value as their second return parameter to
indicate when something went wrong.

main.go
  

package main

import (
    "errors"
    "fmt"
    "math"
)

func sqrt(x float64) (float64, error) {
    if x &lt; 0 {
        return 0, errors.New("cannot take square root of negative number")
    }
    return math.Sqrt(x), nil
}

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {

    if result, err := sqrt(9); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Square root:", result)
    }
    
    if result, err := divide(10, 0); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Division result:", result)
    }
    
    if result, err := sqrt(-4); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Square root:", result)
    }
}

This example demonstrates the idiomatic Go pattern of returning errors from
functions.

func sqrt(x float64) (float64, error) {
    if x &lt; 0 {
        return 0, errors.New("cannot take square root of negative number")
    }
    return math.Sqrt(x), nil
}

The sqrt function returns either a valid result with
nil error, or zero with an error message.

if result, err := sqrt(9); err != nil {
    fmt.Println("Error:", err)
} else {
    fmt.Println("Square root:", result)
}

The calling code checks the error value first before using the result.

$ go run main.go 
Square root: 3
Error: division by zero
Error: cannot take square root of negative number

## Closures

A closure in Go is an anonymous function returned from an enclosing function. 
Closure retains a reference to a variable defined outside its body.

main.go
  

package main

import "fmt"

func intSeq() func() int {

    i := 0
    return func() int {
        i++
        return i
    }
}

func main() {

    nextInt := intSeq()

    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())

    nextInt2 := intSeq()
    fmt.Println(nextInt2())
}

We have the intSeq function, which generates a sequence of integers.
It returns a closure which increments the i variable.

func intSeq() func() int {

The intSeq is a function which returns a function which retruns 
an integer.

func intSeq() func() int {

    i := 0
    return func() int {
        i++
        return i
    }
}

Variables defined in functions have a local function scope. However, in this case, 
the closure is bound to the i variable even after the intSeq
function returns.

nextInt := intSeq()

We call the intSeq function. It returns a function which will 
increment a counter. The closure is stored in the nextInt variable.

fmt.Println(nextInt())
fmt.Println(nextInt())
fmt.Println(nextInt())
fmt.Println(nextInt())

We call the closure several times.

$ go run main.go 
1
2
3
4
1

## Higher-order functions

A higher-order function is a function which either accepts a function as a
parameter or returns a function. 

main.go
  

package main

import "fmt"

func main() {

    x := 3
    y := 4

    add, sub := getAddSub()

    r1, r2 := apply(x, y, add, sub)

    fmt.Printf("%d + %d = %d\n", x, y, r1)
    fmt.Printf("%d - %d = %d\n", x, y, r2)
}

func apply(x, y int, add func(int, int) int, sub func(int, int) int) (int, int) {

    r1 := add(x, y)
    r2 := sub(x, y)

    return r1, r2
}

func getAddSub() (func(int, int) int, func(int, int) int) {

    add := func(x, y int) int {
        return x + y
    }

    sub := func(x, y int) int {
        return x - y
    }

    return add, sub
}

In the code example, we have some complex operations with functions. The 
apply function takes two functions as parameters. The 
getAddSub function returns two functions.

$ go run main.go 
3 + 4 = 7
3 - 4 = -1

## Function with Context Parameter

Go's context package is commonly used for request-scoped values,
cancellation signals, and deadlines across API boundaries. It helps manage the
lifecycle of operations, especially in concurrent programming.

main.go
  

package main

import (
    "context"
    "fmt"
    "time"
)

// fetchData simulates a long-running operation while respecting context cancellation.
func fetchData(ctx context.Context, query string) (string, error) {
    select {
    case &lt;-time.After(1 * time.Second): // Simulating query processing delay
        return fmt.Sprintf("Results for '%s'", query), nil
    case &lt;-ctx.Done(): // Handling context cancellation
        return "", fmt.Errorf("query canceled for '%s'", query)
    }
}

func main() {

    // Create a context with a timeout of 1 second
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel() // Ensure context cleanup to avoid resource leaks

    // Channels to receive results or errors from the goroutine
    resultChan := make(chan string)
    errChan := make(chan error)

    // Launch a goroutine to execute fetchData
    go func() {
        res, err := fetchData(ctx, "golang generics")
        if err != nil {
            errChan &lt;- err // Send error to error channel
            return
        }
        resultChan &lt;- res // Send result to result channel
    }()

    // Wait for the operation to complete or the timeout to expire
    select {
    case res := &lt;-resultChan:
        fmt.Println("Success:", res)
    case err := &lt;-errChan:
        fmt.Println("Error:", err)
    case &lt;-ctx.Done():
        fmt.Println("Main context expired")
    }
}

This example demonstrates how context enables proper timeout and
cancellation handling in concurrent operations. The fetchData
function simulates a long-running task and waits for one of two possible
outcomes: either a simulated delay of two seconds, representing the processing
time of a query, or a cancellation signal from the provided context. If the
context expires before two seconds, the function immediately stops execution and
returns an error.

func fetchData(ctx context.Context, query string) (string, error) {
    select {
    case &lt;-time.After(1 * time.Second):
        return fmt.Sprintf("Results for '%s'", query), nil
    case &lt;-ctx.Done():
        return "", fmt.Errorf("query canceled for '%s'", query)
    }
}

The fetchData function respects context cancellation, making it
particularly useful for handling operations that should not run indefinitely. In
production environments, this approach is commonly applied to API requests and
database queries to avoid long-running tasks that block system resources.

ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)

Here, context.WithTimeout creates a new context with a deadline of
one second. When the timeout is reached, the context automatically cancels any
operations tied to it. The cancel function ensures that resources
associated with the context are cleaned up properly. Using a timeout prevents
excessive waiting and ensures a more responsive application.

select {
case res := &lt;-resultChan:
    fmt.Println("Success:", res)
case err := &lt;-errChan:
    fmt.Println("Error:", err)
case &lt;-ctx.Done():
    fmt.Println("Main context expired")
}

This selection mechanism listens for three possible outcomes: if
resultChan receives data, it prints the successful result; if
errChan receives an error, it prints the failure message; and if
ctx.Done fires, it signals that the request has timed out. Using
a select block ensures that the program reacts dynamically based on
the fastest available outcome.

$ go run main.go 
Error: query canceled for 'golang generics'

Since the timeout is set to one second while the query simulation takes two
seconds, the operation gets canceled before it completes. As a result, an error
message is returned instead of query results. Adjusting the timeout duration
allows fine-tuning of the application's responsiveness, depending on
requirements.

Using context is essential for managing concurrent operations
effectively. It ensures that tasks do not continue consuming resources
indefinitely and enables controlled execution flow across different components.
This approach is especially useful in networked applications, where delays can
impact system performance if not managed properly.

## Source

[The Go Programming Language Specification](https://go.dev/ref/spec)

In this article we have covered functions in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).