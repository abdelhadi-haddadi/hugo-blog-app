+++
title = "Go lancet"
date = 2025-08-29T19:55:24.646+01:00
draft = false
description = "Learn how to use the Lancet library in Go. Includes examples of utility functions."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go lancet

last modified April 11, 2024

In this article we show how to work with the lancet utility library.

## Lancet

Lancet is a comprehensive, efficient, and reusable utility function
library for the Go programming language. It contains over 600 functions. Lancet
covers various areas including strings, slices, datetimes, net, zip, system,
tuples, or data structures.

## System functions

In the system package, we have some system-related functions.

main.go
  

package main

import (
    "fmt"

    "github.com/duke-git/lancet/v2/system"
)

func main() {

    res := system.GetOsEnv("JAVA_HOME")
    fmt.Println(res)

    fmt.Println("----------------------------")

    stdout, stderr, err := system.ExecCommand("ls")

    fmt.Println(stdout)
    fmt.Println(stderr)
    fmt.Println(err)

    fmt.Println("----------------------------")

    if system.IsLinux() {
        fmt.Println("OS is Linux")
    } else if system.IsWindows() {
        fmt.Println("OS is Windows")
    } else if system.IsMac() {
        fmt.Println("OS is Mac")
    } else {
        fmt.Println("Unknown OS")
    }
}

The example retrieves an environment variable, runs a command, and determines
the OS. 

res := system.GetOsEnv("JAVA_HOME")
fmt.Println(res)

With GetOsEnv function, we retrieve the JAVA_HOME
directory if present.

stdout, stderr, err := system.ExecCommand("ls")

We launch the ls command with ExecCommand.

if system.IsLinux() {
    fmt.Println("OS is Linux")
} else if system.IsWindows() {
    fmt.Println("OS is Windows")
} else if system.IsMac() {
    fmt.Println("OS is Mac")
} else {
    fmt.Println("Unknown OS")
}

We check the running OS with IsLinux, IsWindows, and 
IsMac functions.

$ go run main.go
C:\Users\Jano\.jdks\coretto-17.0.7_7
----------------------------

    Directory: C:\Users\Jano\Documents\prog\go\lancet\system

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----       23. 9. 2023     15:26            167 go.mod
-a----       23. 9. 2023     15:26           2941 go.sum
-a----       23. 9. 2023     15:27            596 main.go

&lt;nil&gt;
------------------
OS is Windows

## Tuple functions

Lancet has support for tuples.

main.go
  

package main

import (
    "fmt"

    "github.com/duke-git/lancet/v2/tuple"
)

func main() {
    t := tuple.NewTuple2(1, 0.1)

    x, y := t.Unbox()

    fmt.Println(x)
    fmt.Println(y)

    fmt.Printf("%v %v", t.FieldA, t.FieldB)

    t2 := tuple.NewTuple3(1, 0.1, "a")
    fmt.Printf("%v %v %v", t2.FieldA, t2.FieldB, t2.FieldC)

    a, b, c := t2.Unbox()
    fmt.Println(a)
    fmt.Println(b)
    fmt.Println(c)
}

The example defines and unboxes two-element and three-elements tuples.

$ go run main.go
1
0.1
1 0.11 0.1 a1
0.1
a

## Date and time functions

In the datetime package, we have functions related to date and
time.

main.go
  

package main

import (
    "fmt"
    "time"

    "github.com/duke-git/lancet/v2/datetime"
)

func main() {

    now := time.Now()

    dt := datetime.AddYear(now, 11)
    fmt.Println(dt)
    fmt.Println(datetime.FormatTimeToStr(dt, "yyyy-mm-dd"))

    res2 := datetime.EndOfYear(now)
    fmt.Println(res2)

    begin := datetime.BeginOfWeek(now)
    fmt.Println(begin)
}

The example presents the AddYear, FormatTimeToStr, 
EndOfYear, and BeginOfWeek functions.

$ go run main.go
2034-09-20 15:45:35.7624076 +0200 CEST m=+346896000.002289001
2034-09-20
2023-12-31 23:59:59.999999999 +0100 CET
2023-09-17 00:00:00 +0200 CEST

## Slice functions

In the next example we present some slice functions.

main.go
  

package main

import (
    "fmt"

    "github.com/duke-git/lancet/v2/slice"
    "github.com/duke-git/lancet/v2/strutil"
)

func main() {
    vals := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}

    isEven := func(i, num int) bool {
        return num%2 == 0
    }

    n1 := slice.CountBy(vals, isEven)
    fmt.Println(n1)

    words := []string{"sky", "war", "blue", "war", "cottage",
        "war", "car", "pen", "book"}

    n2 := slice.Count(words, "war")
    fmt.Println(n2)

    fmt.Println("------------------------------")

    shuffled := slice.Shuffle(vals)
    slice.ForEach(shuffled, func(_, e int) { fmt.Println(e) })

    fmt.Println("------------------------------")

    res := slice.Map(vals, func(_, e int) int { return e * 2 })
    fmt.Println(res)

    res2 := slice.Map(words, func(_ int, e string) string { return strutil.UpperFirst(e) })
    fmt.Println(res2)
}

The example uses the CountBy, Count,
Shuffle, Map, and  ForEach slice
functions.

vals := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}

isEven := func(i, num int) bool {
    return num%2 == 0
}

n1 := slice.CountBy(vals, isEven)

With CountBy, we count the number of slice elements for which the 
isEven predicate returns true.

words := []string{"sky", "war", "blue", "war", "cottage",
    "war", "car", "pen", "book"}

n2 := slice.Count(words, "war")

We count the number of occurrences for the war word in the
words slice.

shuffled := slice.Shuffle(vals)
slice.ForEach(shuffled, func(_, e int) { fmt.Println(e) })

We randonly rearrange the vals slice with Shuffle and 
iterate over it with ForEach.

res := slice.Map(vals, func(_, e int) int { return e * 2 })
fmt.Println(res)

With Map, we apply the given anonymous function to each element of 
the slice.

$ go run main.go
5
3
------------------------------
6
10
11
9
7
2
1
5
3
4
8
------------------------------
[12 20 22 18 14 4 2 10 6 8 16]
[Sky War Blue War Cottage War Car Pen Book]

## Net functions

We have a couple net-related functions.

main.go
  

package main

import (
    "fmt"
    "log"

    "github.com/duke-git/lancet/v2/netutil"
)

type Post struct {
    UserId int    `json:"userId"`
    Id     int    `json:"id"`
    Title  string `json:"title"`
    Body   string `json:"body"`
}

func main() {
    req := &amp;netutil.HttpRequest{
        RawURL: "https://jsonplaceholder.typicode.com/posts/1",
        Method: "GET",
    }

    client := netutil.NewHttpClient()
    resp, err := client.SendRequest(req)

    if err != nil || resp.StatusCode != 200 {
        log.Fatal(err)
    }

    var body Post
    err = client.DecodeResponse(resp, &amp;body)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(body)

    fmt.Println("-------------------------")

    fmt.Println(body.Id)
    fmt.Println(body.UserId)
    fmt.Println(body.Title)
    fmt.Println(body.Body)
}

The example retrieves a post from an online test service.

req := &amp;netutil.HttpRequest{
    RawURL: "https://jsonplaceholder.typicode.com/posts/1",
    Method: "GET",
}

We define an HTTP GET request.

client := netutil.NewHttpClient()
resp, err := client.SendRequest(req)

An HTTP client is created and a new request is sent.

if err != nil || resp.StatusCode != 200 {
    log.Fatal(err)
}

We check for the response status and error.

var body Post
err = client.DecodeResponse(resp, &amp;body)
if err != nil {
    log.Fatal(err)
}

We decode the JSON response into the Post struct body.

## Sorting functions

The algorithm package contains a few sorting algorithms.

In the next example, we use the quick sort algorithm.

main.go
  

package main

import (
    "fmt"

    "github.com/duke-git/lancet/v2/algorithm"
)

type intComparator struct{}

func (c *intComparator) Compare(e1 any, e2 any) int {
    val1, _ := e1.(int)
    val2, _ := e2.(int)

    if val1 &lt; val2 {
        return -1
    } else if val1 &gt; val2 {
        return 1
    }
    return 0
}

func main() {

    vals := []int{2, 1, 5, 3, 6, 4, -2, 0, 9, 11, -3}
    
    comparator := &amp;intComparator{}
    algorithm.QuickSort(vals, comparator)

    fmt.Println(vals)
}

The example uses the quick sort algorithm to sort integers in a slice.

type intComparator struct{}

func (c *intComparator) Compare(e1 any, e2 any) int {
    val1, _ := e1.(int)
    val2, _ := e2.(int)

    if val1 &lt; val2 {
        return -1
    } else if val1 &gt; val2 {
        return 1
    }
    return 0
}

We define the Compare function. 

comparator := &amp;intComparator{}
algorithm.QuickSort(vals, comparator)

We compare the numbers with QuickSort.

$ go run main.go
[-3 -2 0 1 2 3 4 5 6 9 11]

The following example uses the insertion sort algorithm.

main.go
  

package main

import (
    "fmt"

    "github.com/duke-git/lancet/v2/algorithm"
)

type User struct {
    Name string
    Age  int
}

type byAge struct{}

func (c *byAge) Compare(u1 any, u2 any) int {
    p1, _ := u1.(User)
    p2, _ := u2.(User)

    if p1.Age &lt; p2.Age {
        return -1
    } else if p1.Age &gt; p2.Age {
        return 1
    }

    return 0
}

func main() {
    users := []User{
        {Name: "Peter", Age: 20},
        {Name: "Julia", Age: 14},
        {Name: "Lucia", Age: 17},
        {Name: "Roman", Age: 18},
        {Name: "Jan", Age: 28},
    }

    comparator := &amp;byAge{}
    algorithm.InsertionSort(users, comparator)

    fmt.Println(users)
}

The example sorts the users by their age using InsertionSort.

func (pc *byAge) Compare(u1 any, u2 any) int {
    p1, _ := u1.(User)
    p2, _ := u2.(User)

    if p1.Age &lt; p2.Age {
        return -1
    } else if p1.Age &gt; p2.Age {
        return 1
    }

    return 0
}

We define the Compare function.

comparator := &amp;byAge{}
algorithm.InsertionSort(users, comparator)

We sort the users in-place with InsertionSort.

$ go run main.go
[{Julia 14} {Lucia 17} {Roman 18} {Peter 20} {Jan 28}]

## String functions

String functions are located in the strutil package.

main.go
  

package main

import (
    "fmt"

    "github.com/duke-git/lancet/v2/strutil"
)

func main() {

    msg := "an old falcon"

    fmt.Println(strutil.CamelCase(msg))
    fmt.Println(strutil.Capitalize(msg))
    fmt.Println(strutil.KebabCase(msg))

    fmt.Println(strutil.UpperFirst(msg))
    fmt.Println(strutil.SnakeCase(msg))
    fmt.Println(strutil.Reverse(msg))
}

The example modifies a string with six various functions.

$ go run main.go
anOldFalcon
An old falcon
an-old-falcon
An old falcon
an_old_falcon
noclaf dlo na

Next we use another 4 functions.

main.go
  

package main

import (
    "fmt"

    "github.com/duke-git/lancet/v2/strutil"
)

func main() {

    msg := "F# мультипарадигмальный язык программирования из семейства языков .NET."
    fmt.Println(strutil.WordCount(msg))
    fmt.Println(strutil.IsString(msg))

    w1 := "\t"
    w2 := "  "
    w3 := "."

    fmt.Println(strutil.IsBlank(w1))
    fmt.Println(strutil.IsBlank(w2))
    fmt.Println(strutil.IsBlank(w3))

    fmt.Println(strutil.IsBlank(strutil.Trim(w1)))
}

In the next example, we count words in a string and check values with
IsString and IsBlank, and trim a string with
Trim.

$ go run main.go
8
true
true
true
false
true

## The function package

The function package can control the flow of function execution and
provides some support for functional programming.

main.go
  

package main

import (
    "fmt"

    "github.com/duke-git/lancet/v2/function"
    "github.com/duke-git/lancet/v2/slice"
)

func double(vals []int) []int {
    return slice.Map(vals, func(_, e int) int { return e * 2 })
}

func incByOne(vals []int) []int {
    return slice.Map(vals, func(_, e int) int { return e + 1 })
}

func main() {

    vals := []int{1, 2, 3, 4, 5}

    transform := function.Pipeline(double, incByOne)
    res := transform(vals)

    fmt.Println(res)
}

In the example, we call Pipeline to pipe two functions on the 
vals slice. 

func double(vals []int) []int {
    return slice.Map(vals, func(_, e int) int { return e * 2 })
}

func incByOne(vals []int) []int {
    return slice.Map(vals, func(_, e int) int { return e + 1 })
}

We have two functions that double and increment the slice elements.

transform := function.Pipeline(double, incByOne)

We create a pipeline consisting of these two functions.

res := transform(vals)

The pipeline is executed.

$ go run main.go 
[3 5 7 9 11]

## Zip

The fileutil package contains a Zip function, which 
creates a ZIP archive.

main.go
  

package main

import (
    "fmt"

    "github.com/duke-git/lancet/v2/fileutil"
)

func main() {
    err := fileutil.Zip(".", "current.zip")
    if err != nil {
        fmt.Println(err)
    }
}

The example creates a ZIP archive from the current working directory.

## Source

[Go lancet - Github page](https://github.com/duke-git/lancet)

In this article we have worked with lancet utility library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).