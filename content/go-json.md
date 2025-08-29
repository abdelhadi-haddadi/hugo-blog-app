+++
title = "Go JSON"
date = 2025-08-29T19:55:24.636+01:00
draft = false
description = "Learn how to work with JSON in Go. Includes examples of encoding and decoding JSON."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go JSON

last modified May 4, 2025

In this article we show how to work with JSON data in Golang.

## JSON

JSON (*JavaScript Object Notation*) is a widely used lightweight
data-interchange format that facilitates structured data exchange. Designed to
be human-readable while remaining easy for machines to parse and generate, JSON
has become a standard for data serialization in web development, APIs, and
configuration files.

The official Internet media type for JSON is application/json,
ensuring consistency in data handling across different systems. JSON files
typically use the .json filename extension.

### JSON in Go

Go provides built-in support for working with JSON through the
encoding/json package, which offers efficient functions for
encoding and decoding JSON data. Some key operations include:

    json.Marshal(v) - Converts a Go data structure into JSON
    format.
    json.Unmarshal(data, &amp;v) - Parses JSON data into a Go data
    structure.
    json.NewEncoder(w).Encode(v) - Writes JSON output directly
    to a writer (e.g., a file or HTTP response).
    json.NewDecoder(r).Decode(&amp;v) - Reads and decodes JSON from
    an input stream.

JSON plays a crucial role in modern software development, enabling seamless
communication between applications and services. Its simplicity, coupled with
Go's efficient handling mechanisms, makes it an ideal choice for structured data
representation.

## Go encode to JSON

The Marshal function encodes data to JSON.

encoding.go
  

package main

import (
    "encoding/json"
    "fmt"
    "log"
)

type User struct {
    Id         int
    Name       string
    Occupation string
}

func main() {

    u1 := User{1, "John Doe", "gardener"}

    json_data, err := json.Marshal(u1)

    if err != nil {

        log.Fatal(err)
    }

    fmt.Println(string(json_data))

    users := []User{
        {Id: 2, Name: "Roger Roe", Occupation: "driver"},
        {Id: 3, Name: "Lucy Smith", Occupation: "teacher"},
        {Id: 4, Name: "David Brown", Occupation: "programmer"},
    }

    json_data2, err := json.Marshal(users)

    if err != nil {

        log.Fatal(err)
    }

    fmt.Println(string(json_data2))
}

In the code example, we transform a Go struct and a slice of structs into JSON 
format.

type User struct {
    Id         int
    Name       string
    Occupation string
}

We declare the User struct.

u1 := User{1, "John Doe", "gardener"}

We create the struct instance.

json_data, err := json.Marshal(u1)

We encode the u1 struct into JSON with Marshal.

fmt.Println(string(json_data))

Since json_data is a byte array, we convert it to a string with the
string function.

users := []User{
    {Id: 2, Name: "Roger Roe", Occupation: "driver"},
    {Id: 3, Name: "Lucy Smith", Occupation: "teacher"},
    {Id: 4, Name: "David Brown", Occupation: "programmer"},
}

We have a slice of users.

json_data2, err := json.Marshal(users)

We encode the slice of users with Marshal.

fmt.Println(string(json_data2))

We print the encoded slice. 

$ go run encoding.go 
{"Id":1,"Name":"John Doe","Occupation":"gardener"}
[{"Id":2,"Name":"Roger Roe","Occupation":"driver"},{"Id":3,"Name":"Lucy Smith","Occupation":"teacher"},
{"Id":4,"Name":"David Brown","Occupation":"programmer"}]

## Go decode to JSON

The Unmarshal function decodes JSON data into Go values.

decoding.go
  

package main

import (
    "encoding/json"
    "fmt"
    "log"
)

type User struct {
    Id         int
    Name       string
    Occupation string
}

func main() {

    var u1 User

    data := []byte(`{
        "Id" : 1,
        "Name": "John Doe",
        "Occupation": "gardener"
    }`)

    err := json.Unmarshal(data, &amp;u1)

    if err != nil {

        log.Fatal(err)
    }

    fmt.Println("Struct is:", u1)
    fmt.Printf("%s is a %s.\n", u1.Name, u1.Occupation)

    var u2 []User

    data2 := []byte(`
    [
        {"Id":2,"Name":"Roger Roe","Occupation":"driver"},
        {"Id":3,"Name":"Lucy Smith","Occupation":"teacher"},
        {"Id":4,"Name":"David Brown","Occupation":"programmer"}
    ]`)

    err2 := json.Unmarshal(data2, &amp;u2)

    if err2 != nil {

        log.Fatal(err2)
    }

    for i := range u2 {

        fmt.Println(u2[i])
    }
}

We decode a JSON string into a Go struct and a slice of structs.

data := []byte(`{
    "Id" : 1,
    "Name": "John Doe",
    "Occupation": "gardener"
}`)

We have a JSON object which is transformed into bytes.

err := json.Unmarshal(data, &amp;u1)

We decode the u1 struct from JSON into a struct with Unmarshal.

var u2 []User

We declare a slice of User structs.

data2 := []byte(`
[
    {"Id":2,"Name":"Roger Roe","Occupation":"driver"},
    {"Id":3,"Name":"Lucy Smith","Occupation":"teacher"},
    {"Id":4,"Name":"David Brown","Occupation":"programmer"}
]`)

This is a JSON array to be decoded into a Go slice.

err2 := json.Unmarshal(data2, &amp;u2)

We decode the JSON array to Go slice with Unmarshal.

for i := range u2 {

    fmt.Println(u2[i])
}

We print the decoded JSON array user by user.

$ go run decoding.go 
Struct is: {1 John Doe gardener}
John Doe is a gardener.
{2 Roger Roe driver}
{3 Lucy Smith teacher}
{4 David Brown programmer}

## Go JSON pretty print

The output can be pretty-printed with the MarshalIndent function.

pretty_print.go
  

package main

import (
    "encoding/json"
    "fmt"
    "log"
)

func main() {

    birds := map[string]interface{}{
        "sounds": map[string]string{
            "pigeon":  "coo",
            "eagle":   "squak",
            "owl":     "hoot",
            "duck":    "quack",
            "cuckoo":  "ku-ku",
            "raven":   "cruck-cruck",
            "chicken": "cluck",
            "rooster": "cock-a-doodle-do",
        },
    }

    data, err := json.MarshalIndent(birds, "", "    ")

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(data))
}

In the code example, we have a map of bird sounds. The output is prettified
with MarshalIndent.

$ go run pretty_print.go 
{
    "sounds": {
        "chicken": "cluck",
        "cuckoo": "ku-ku",
        "duck": "quack",
        "eagle": "squak",
        "owl": "hoot",
        "pigeon": "coo",
        "raven": "cruck-cruck",
        "rooster": "cock-a-doodle-do"
    }
}

We can see that the output is indented and hence more readable.

## Go JSON read from file

The next example reads JSON data from a file.

data.json
  

[
    {
        "name": "John Doe",
        "occupation": "gardener",
        "born": "1992-03-02"
    },
    {
        "name": "Brian Flemming",
        "occupation": "teacher",
        "born": "1967-11-22"
    },
    {
        "name": "Lucy Black",
        "occupation": "accountant",
        "born": "1995-04-07"
    },
    {
        "name": "John Doe",
        "occupation": "gardener",
        "born": "1972-08-30"
    }
]

This is the data.json file.

read_file.go
  

package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log"
    "os"
)

type User struct {
    Name       string
    Occupation string
    Born       string
}

func main() {

    filename, err := os.Open("data.json")
    if err != nil {
        log.Fatal(err)
    }

    defer filename.Close()

    data, err := ioutil.ReadAll(filename)

    if err != nil {
        log.Fatal(err)
    }

    var result []User

    jsonErr := json.Unmarshal(data, &amp;result)

    if jsonErr != nil {
        log.Fatal(jsonErr)
    }

    fmt.Println(result)
}

The example reads JSON data from a file and decodes it to a slice of user
structs.

$ go run read_json.go 
[{John Doe gardener 1992-03-02} {Brian Flemming teacher 1967-11-22} 
 {Lucy Black accountant 1995-04-07} {John Doe gardener 1972-08-30}]

## Go JSON HttpClient

The net/http package  provides HTTP client and server
implementations. 

astros.go
  

package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "time"
)

type Astronaut struct {
    Name  string
    Craft string
}

type people struct {
    Number  int
    People  []Astronaut
    Message string
}

func main() {

    url := "http://api.open-notify.org/astros.json"

    var netClient = http.Client{
        Timeout: time.Second * 10,
    }

    res, err := netClient.Get(url)

    if err != nil {
        log.Fatal(err)
    }

    defer res.Body.Close()

    body, err := ioutil.ReadAll(res.Body)

    fmt.Println(body)

    if err != nil {
        log.Fatal(err)
    }

    astros := people{}

    jsonErr := json.Unmarshal(body, &amp;astros)

    if jsonErr != nil {
        log.Fatal(jsonErr)
    }

    fmt.Println(astros)
}

The example reads data from a web service using the built-in Go HTTP client.
We create a GET request to a service, which returns data about astronauts of the 
International Space Station.

$ go run astros.go 
{3 [{Chris Cassidy ISS} {Anatoly Ivanishin ISS} {Ivan Vagner ISS}] success}

At this moment, there are three astronauts on the space station.

## Source

[Go encoding/json package - reference](https://pkg.go.dev/encoding/json)

In this article we have worked with JSON in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).