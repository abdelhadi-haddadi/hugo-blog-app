+++
title = "Go random"
date = 2025-08-29T19:55:34.671+01:00
draft = false
description = "Learn how to generate random numbers in Go. Includes examples of random number generation."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go random

last modified April 11, 2024

In this article we show how to generate random values in Golang.

## Random number generator

Random number generator (RNG) generates a set of values that do not
display any distinguishable patterns in their appearance.  The random number
generators are divided into two categories: hardware random-number generators
and pseudo-random number generators. Hardware random-number generators  are
believed to produce genuine random numbers. Pseudo-random number generators
generate values based on software algorithms. They produce values that look
random.  But these values are deterministic and can be reproduced, if the
algorithm is known. 

In computing, random generators are used in gambling, gaming, simulations, or
cryptography.

**Note: ** For security purposes, cryptographically secure pseudo-random 
number generators must be used.

To increase the quality of the pseudo random-number generators, operating
systems use environmental noise collected from device drivers, user input
latency, or jitter from one or more hardware components. This is the core of the
cryptographically secure pseudo-random number generators.

Go contains the math/random package which implements pseudo-random
number generators, and the crypto/rand package which implements a
cryptographically secure random number generator. 

## The seed

The seed is a value which initializes the random number generator. Random number
generators produce values by performing some operation on a previous value. When
the algorithm starts, the seed is the initial value on which the generator
operates. The most important and difficult part of the generators is to provide
a seed that is close to a truly random number. 

In Go, the seed value is provided with the rand.Seed
function. If Seed is not called, the generator behaves as if seeded
by Seed(1).

**Note: ** The same seed produces the same set of pseudo-random
numbers.

## Go random same seed

In the following example, we use the same seed. 

same_seed.go
  

package main

import (
    "fmt"
    "math/rand"
)

func main() {

    rand.Seed(20)
    fmt.Printf("%d ", rand.Intn(100))
    fmt.Printf("%d ", rand.Intn(100))
    fmt.Printf("%d \n", rand.Intn(100))

    rand.Seed(20)
    fmt.Printf("%d ", rand.Intn(100))
    fmt.Printf("%d ", rand.Intn(100))
    fmt.Printf("%d \n", rand.Intn(100))

    fmt.Println()
}

The same seed value produces the same pseudo-random values. 

$ go run same_seed.go 
30 48 40 
30 48 40 

## Go rand.Intn

The rand.Intn function returns, as an int, a non-negative 
pseudo-random number in [0,n) from the default source.

five_random.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func init() {

    rand.Seed(time.Now().UnixNano())
}

func main() {

    for i := 0; i &lt; 5; i++ {

        fmt.Printf("%d ", rand.Intn(20))
    }

    fmt.Println()
}

The example prints five random integers.

rand.Seed(time.Now().UnixNano())

To get different pseudo random values, we seed the random generator with 
time.Now().UnixNano().

## Go random string

The following example generates random strings.

random_string.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {

    rand.Seed(time.Now().UTC().UnixNano())
    fmt.Println(randomString(12))
}

func randomString(len int) string {

    bytes := make([]byte, len)

    for i := 0; i &lt; len; i++ {
        bytes[i] = byte(randInt(97, 122))
    }

    return string(bytes)
}

func randInt(min int, max int) int {

    return min + rand.Intn(max-min)
}

The example creates a random string having twelve characters.

$ go run random_string.go 
gqvqyybfuhxl
$ go run random_string.go 
rrwmqaqkrslu
$ go run random_string.go 
axhhrkwyhnxm

We run the example three times.

## Go random array of integers

The following example creates an array of random integer values.

random_array.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func randArray(len int) []int {

    a := make([]int, len)

    for i := 0; i &lt;= len-1; i++ {

        a[i] = rand.Intn(len)
    }

    return a
}

func main() {

    rand.Seed(time.Now().UnixNano())

    len := 12
    fmt.Println(randArray(len))
}

The example creates an array of twelve integer values.

$ go run rand_array.go 
[5 6 3 5 3 4 7 3 5 6 5 0]
$ go run rand_array.go 
[2 5 10 9 1 5 1 4 11 7 6 3]

## Go random element

The following example picks a random element.

random_element.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func init() {

    rand.Seed(time.Now().UnixNano())
}

func main() {

    runes := []rune("červená čiara")

    myrune := runes[rand.Intn(len(runes))]

    fmt.Println(string(myrune))
}

We have a slice of runes. From this slice, we randomly pick a value.

$ go run random_element.go 
č
$ go run random_element.go 
á

We ran the example twice and get these characters.

## Go random string from a pool

The following example picks letters randomly from a pool of characters.

rand_pool.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

var pool = "abcdefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ:|?$%@][{}#&amp;/()*"

func randomString(l int) string {

    bytes := make([]byte, l)

    for i := 0; i &lt; l; i++ {
        bytes[i] = pool[rand.Intn(len(pool))]
    }

    return string(bytes)
}

func main() {

    rand.Seed(time.Now().UnixNano())
    fmt.Println(randomString(12))
}

The example prints random strings from the predefined pool of various
characters.

var pool = "abcdefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ:|?$%@][{}#&amp;/()*"

This is the set of predefined characters.

for i := 0; i &lt; l; i++ {
    bytes[i] = pool[rand.Intn(len(pool))]
}

We pick a random letter by generating a random index of the string.

$ go run rand_pool.go 
FFFZW(sHvE:a
$ go run rand_pool.go 
(my%Tmf&amp;qOVs
$ go run rand_pool.go 
/{GqgkhRVOfi

We run the example three times.

## Go crypto-secure random values

Go provides cryptographically secure pseudorandom number generator in the
standard library package crypto/rand. While math/random
is much faster, crypto/rand is suited for programs where security
is paramount. For instance, when generating strong passwords, CSRF tokens,
or session keys.

On Linux and FreeBSD, crypto/rand uses getrandom 
if available, /dev/urandom otherwise. On OpenBSD, it uses 
getentropy. Unix-likesystems, it reads from
/dev/urandom. On Windows systems, it uses the CryptGenRandom
function. On Wasm, it uses the Web Crypto API.

crypto_rand.go
  

package main

import (
    "crypto/rand"
    "fmt"
    "log"
)

func main() {

    data, err := generateRandomBytes(16)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(data)
}

func generateRandomBytes(n int) ([]byte, error) {

    b := make([]byte, n)
    _, err := rand.Read(b)
    
    if err != nil {
        return nil, err
    }

    return b, nil
}

In the code example, we create 16 securely generated random bytes.

b := make([]byte, n)
_, err := rand.Read(b)

We read n cryptographically secure pseudorandom numbers and write 
them into a byte slice.

$ go run crypto_rand.go 
[151 0 67 88 199 60 220 50 34 198 169 158 18 162 85 61]

## Source

[Go math/rand package - reference](https://pkg.go.dev/math/rand)

In this article we have worked with random values in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).