+++
title = "Go YAML"
date = 2025-08-29T19:56:26.713+01:00
draft = false
description = "Learn how to work with YAML in Go using the yaml.v3 package. This tutorial covers reading, writing, and processing YAML data in Go."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go YAML

last modified April 11, 2024

In this article we show how to work with the YAML in Go. We use the yaml.v3
package.

## YAML format

YAML (YAML Ain't Markup Language) is a human-readable
data-serialization language. It is commonly used for configuration files, but it
is also used in data storage (e.g. debugging output) or transmission (e.g.
document headers).

YAML natively supports three basic data types: scalars (such as strings,
integers, and floats), lists, and associative arrays.

The official recommended filename extension for YAML files has been
.yaml.

## The yaml package

The yaml package enables Go programs to easily encode and decode
YAML values. The yaml package supports most of YAML 1.1 and 1.2.

$ go get gopkg.in/yaml.v3

This command installs version 3 of the yaml package.

## Go YAML read example

In the first example, we read a simple YAML file.

items.yaml
  

raincoat: 1
coins: 5
books: 23
spectacles: 2
chairs: 12
pens: 6

We have a couple of scalar values.

func Unmarshal(in []byte, out interface{}) (err error)

The Unmarshal function decodes the first document found within the
in byte slice and assigns decoded values into the out value. 

read_items.go
  

package main

import (
     "fmt"
     "io/ioutil"
     "log"

     "gopkg.in/yaml.v3"
)

func main() {

     yfile, err := ioutil.ReadFile("items.yaml")

     if err != nil {

          log.Fatal(err)
     }

     data := make(map[interface{}]interface{})

     err2 := yaml.Unmarshal(yfile, &amp;data)

     if err2 != nil {

          log.Fatal(err2)
     }

     for k, v := range data {

          fmt.Printf("%s -&gt; %d\n", k, v)
     }
}

We read the contents of the items.yaml file.

data := make(map[interface{}]interface{})

A map in which we read the data is defined.

err2 := yaml.Unmarshal(yfile, &amp;data)

We unmarshal the data into the map.

for k, v := range data {

     fmt.Printf("%s -&gt; %d\n", k, v)
}

We go over the map and print its keys and values.

$ go run read_items.go 
books -&gt; 23
spectacles -&gt; 2
chairs -&gt; 12
pens -&gt; 6
raincoat -&gt; 1
coins -&gt; 5

## Go YAML read example II

In the next example, we read users.

users.yaml
  

user 1:
    name: John Doe
    occupation: gardener
user 2:
    name: Lucy Black
    occupation: teacher
user 3:
    name: Roger Roe
    occupation: driver

We have a few users in the file.

read_users.go
  

package main

import (
     "fmt"
     "io/ioutil"
     "log"

     "gopkg.in/yaml.v3"
)

type User struct {
     Name       string
     Occupation string
}

func main() {

     yfile, err := ioutil.ReadFile("users.yaml")

     if err != nil {

          log.Fatal(err)
     }

     data := make(map[string]User)

     err2 := yaml.Unmarshal(yfile, &amp;data)

     if err2 != nil {

          log.Fatal(err2)
     }

     for k, v := range data {

          fmt.Printf("%s: %s\n", k, v)
     }
}

In the code example, we have the User struct, which represents one 
user record in the file.

data := make(map[string]User)

We define a map of users.

err2 := yaml.Unmarshal(yfile, &amp;data)

We deserialize the data into the map or users.

$ go run read_simple.go 
user 1: {John Doe gardener}
user 2: {Lucy Black teacher}
user 3: {Roger Roe driver}

## Go YAML write example

We write a few words into a YAML file.

func Marshal(in interface{}) (out []byte, err error)

The Marshal function serializes the value provided into a YAML
document. 

write_words.go
  

package main

import (
     "fmt"
     "io/ioutil"
     "log"

     "gopkg.in/yaml.v3"
)

func main() {

     words := [5]string{"falcon", "sky", "earth", "cloud", "fox"}

     data, err := yaml.Marshal(&amp;words)

     if err != nil {
          log.Fatal(err)
     }

     err2 := ioutil.WriteFile("words.yaml", data, 0)

     if err2 != nil {

          log.Fatal(err2)
     }

     fmt.Println("data written")
}

We have an array of words; the array is serialized into the YAML format with 
Marshal and written to the words.yaml with 
WriteFile.

$ go run write_words.go 
data written
$ cat words.yaml 
- falcon
- sky
- earth
- cloud
- fox

## Go YAML write example II

In the following example, we write users to the YAML file.

write_users.go
  

package main

import (
     "fmt"
     "io/ioutil"
     "log"

     "gopkg.in/yaml.v3"
)

type User struct {
     Name       string
     Occupation string
}

func main() {

     users := map[string]User{"user 1": {"John Doe", "gardener"},
          "user 2": {"Lucy Black", "teacher"}}

     data, err := yaml.Marshal(&amp;users)

     if err != nil {

          log.Fatal(err)
     }

     err2 := ioutil.WriteFile("users.yaml", data, 0)

     if err2 != nil {

          log.Fatal(err2)
     }

     fmt.Println("data written")
}

We have a map of users; each user is represented by a User
structure. We serialize the map into YAML format with Marshal
and write the data to the users.yaml file with
WriteFile.

$ go run write_users.go 
data written
$ cat users.yaml 
user 1:
    name: John Doe
    occupation: gardener
user 2:
    name: Lucy Black
    occupation: teacher

## Go YAML write example III

Only exported structure fields (having an upper-case first letter) are
marshalled. By default, they are marshalled using the lowercased field name.

Custom keys may be defined via the yaml name in the field tag. The
content preceding the first comma is used as the key, and the following
comma-separated options are used to tweak the marshalling process.

write_config.go
  

package main

import (
     "fmt"
     "io/ioutil"
     "log"

     "gopkg.in/yaml.v3"
)

type Record struct {
     Item string `yaml:"item"`
     Col  string `yaml:"colour"`
     Size string `yaml:"size"`
}

type Config struct {
     Record Record `yaml:"Settings"`
}

func main() {

     config := Config{Record: Record{Item: "window", Col: "blue", Size: "small"}}

     data, err := yaml.Marshal(&amp;config)

     if err != nil {

          log.Fatal(err)
     }

     err2 := ioutil.WriteFile("config.yaml", data, 0)

     if err2 != nil {
          
          log.Fatal(err2)
     }

     fmt.Println("data written")
}

In the code example, we write configuration data.

$ go run write_config.go 
data written
$ cat config.yaml 
Settings:
    item: window
    colour: blue
    size: small

## Source

[Go yaml - Github page](https://github.com/go-yaml/yaml)

In this article we have worked with the YAML format in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).