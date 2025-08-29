+++
title = "Go string functions"
date = 2025-08-29T19:56:09.626+01:00
draft = false
description = "Go string functions tutorial shows how to work with string functions in Golang. The strings package implements simple functions to manipulate UTF-8 encoded strings."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go string functions

last modified April 11, 2024

In this article we show how to work with string functions in Golang.

The strings package implements simple functions to manipulate UTF-8
encoded strings.

## Go strings repeat

The repeat function returns a new string consisting of the
specified number of copies of the string.

repeat_fun.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    w := "falcon"
    fmt.Println(strings.Repeat(w+" ", 5))
}

We repeat the given string five times.

$ go run repeat_fun.go
falcon falcon falcon falcon falcon

## Go strings comparison

The Compare function compare two strings lexicographically. To
compare two strings in a case-insensitive manner, we use the
EqualFold function.

comparing.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    w1 := "falcon"
    w2 := "Falcon"

    if strings.Compare(w1, w2) == 0 {

        fmt.Println("The words are equal")
    } else {

        fmt.Println("The words are not equal")
    }

    if strings.EqualFold(w1, w2) {

        fmt.Println("The words are equal")
    } else {

        fmt.Println("The words are not equal")
    }
}

The example compares two strings.

$ go run comparing.go
The words are not equal
The words are equal

## Go strings Replace and ReplaceAll

The Replace function returns a copy of the string with the first n
occurrences of the string replaced, while the ReplaceAll returns
a copy where all occurrences are replaced.

replacing.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    msg := "I saw a fox in the forest. The fox had brown fur."

    output := strings.Replace(msg, "fox", "wolf", 2)
    fmt.Println(output)

    output2 := strings.ReplaceAll(msg, "fox", "wolf")
    fmt.Println(output2)
}

The examples replaces fox with wolf.

$ go run replacing.go
I saw a wolf in the forest. The wolf had brown fur.
I saw a wolf in the forest. The wolf had brown fur.

## Go string indexing

The Index function returns the index of the first substring found,
while the LastIndex finds the last index.

indexing.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    msg := "I saw a fox in the forest. The fox had brown fur. I like foxes."

    idx1 := strings.Index(msg, "fox")
    fmt.Println(idx1)

    idx2 := strings.LastIndex(msg, "fox")
    fmt.Println(idx2)
}

We find the first and the last index of the word 'fox'.

$ go run indexing.go
8
57

## Go strings counting

The Count function counts the number of substrings found in a
string.

counting.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    word := "wood"

    c1 := "o"
    c2 := "w"

    n1 := strings.Count(word, c1)
    fmt.Printf("# of %s in %s: %d\n", c1, word, n1)

    n2 := strings.Count(word, c2)
    fmt.Printf("# of %s in %s: %d\n", c2, word, n2)
}

We count the number of times the 'o' and 'w' characters are found in "wood".

$ go run counting.go
# of o in wood: 2
# of w in wood: 1

## Go strings ToUpper, ToLower, Title

The ToLower function returns a lowercased copy of the string, while
the ToUpper returns an uppercased string. The Title
function returns a titlecased copy of the given string (only the first letter is
uppercased).

lower_upper.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    msg := "and old falcon"
    msg2 := "čerešňa"

    fmt.Println(strings.Title(msg))
    fmt.Println(strings.ToUpper(msg))

    fmt.Println(strings.ToUpper(msg2))
    fmt.Println(strings.Title(msg2))
}

We change the case of two words with the given functions.

$ go run lower_upper.go
And Old Falcon
AND OLD FALCON
ČEREŠŇA
Čerešňa

## Go strings HasPrefix and HasSuffix

The HasPrefix function checks whether the string begins with the
given prefix. The HasSufffix function checks whether the string
ends with the given suffix.

starts_ends.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    words := []string {"sky", "lot", "car", "wood", "cloud",
        "cup", "war", "wind", "near", "tell", "cheer", "coin", "book"}

    for _, word := range words {

        if strings.HasPrefix(word, "c") {

            fmt.Println(word)
        }
    }

    fmt.Println("----------------------")

    for _, word := range words {

        if strings.HasSuffix(word, "r") {

            fmt.Println(word)
        }
    }
}

We have a slice of words. We go over the elements of the slice and print all
words that begin with 'c' and end with 'r'.

$ go run starts_ends.go
car
cloud
cup
cheer
coin
----------------------
car
war
near
cheer

## Go string Contains and ContainsRune

The Contains function checks if the given substring is present
in the string. The ConstainsRune checks if the Unicode code point
is in the strings.

contains.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    msg := "a blue 🐋"
    r := '🐋'

    if strings.ContainsRune(msg, r) {

        fmt.Println("yes")
    } else {

        fmt.Println("no")
    }

    fmt.Println("-----------------")

    if strings.Contains(msg, "🐋") {

        fmt.Println("yes")
    } else {

        fmt.Println("no")
    }
}

We use the two methods to determine whether the dolphin rune is in the string.

$ go run contains.go
yes
-----------------
yes

## Go strings trim functions

The Trim returns a slice of the string with all leading and
trailing Unicode code points contained in cutset removed. The TrimLeft
function returns a slice of the string with all leading Unicode code points
contained in cutset removed. The TrimRight function returns a slice
of the string with all trailing Unicode code points contained in cutset removed.

trim_funs.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    msg := ".an old falcon!"
    cutset := ".!"

    msg2 := strings.Trim(msg, cutset)
    fmt.Println(msg2)

    msg3 := strings.TrimLeft(msg, cutset)
    fmt.Println(msg3)

    msg4 := strings.TrimRight(msg, cutset)
    fmt.Println(msg4)
}

We use the tree functions to remove a dot and an expclamation mark from the
string.

$ go run trim_funs.go
an old falcon
an old falcon!
.an old falcon

The TrimSpace function removes all leading and trailing whitespace
characters. The TrimFunc returns a slice of the string with all
leading and trailing Unicode code points satisfying the provided function
removed.

trim_funs2.go
  

package main

import (
    "fmt"
    "strings"
    "unicode"
)

func main() {

    msg := "\t\tand old falcon\n"

    msg2 := strings.TrimSpace(msg)
    fmt.Println(msg2)

    msg3 := strings.TrimFunc(msg, trimSpace)
    fmt.Println(msg3)
}

func trimSpace(r rune) bool {

    return !unicode.IsLetter(r)
}

In the code example, we remove leading and trailing spaces using the mentioned
functions.

The TrimPrefix function returns the string without the provided
leading prefix string, while TrimSuffix returns the string without
the trailing suffix string.

trim_funs3.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    msg := "--and old falcon--"

    msg2 := strings.TrimPrefix(msg, "--")
    fmt.Println(msg2)

    msg3 := strings.TrimSuffix(msg, "--")
    fmt.Println(msg3)
}

The example removes "--" characters from the start and end of the string.

$ go run trim_funs3.go
and old falcon--
--and old falcon

## Go strings Split

The Split function splits a slice into all substrings separated by
the given separator and returns a slice of the substrings between those
separators.

split_fun.go
  

package main

import (
    "fmt"
    "log"
    "strconv"
    "strings"
)

func main() {

    msg := "3,4,5,6,7,8,9,10,11"

    data := strings.Split(msg, ",")
    fmt.Printf("%v\n", data)

    var sum = 0
    for _, e := range data {

        val, err := strconv.Atoi(e)

        if err != nil {
            log.Fatal(err)
        }

        sum += val
    }

    fmt.Println(sum)
}

We have a string of integer values, separated with comma. The string is cut
into parts by the comma. The string parts are converted to integers with
strconv.Atoi and the integers are summed.

$ go run split_fun.go
[3 4 5 6 7 8 9 10 11]
63

## Go strings Join

The Join function concatenates the elements of the slice argument
to create a single string.

join_fun.go
  

package main

import (
    "fmt"
    "strings"
)

func main() {

    words := []string{"an", "old", "falcon", "in", "the", "sky"}

    msg := strings.Join(words, " ")
    fmt.Println(msg)
}

We join words of a slice by a space character.

## Go strings Fields

The Fields function cuts the given string into parts by one or more
space characters. It provides an easy way to cut a string into words.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

This is a small text file.

fields_fun.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "strings"
)

func main() {

    fileName := "thermopylae.txt"
    bs, err := ioutil.ReadFile(fileName)

    if err != nil {

        log.Fatal(err)
    }

    text := string(bs)
    fields := strings.Fields(text)

    for _, field := range fields {

        fmt.Println(strings.Trim(field, ".,"))
    }
}

We read the given file into a string and cut it into words utilizing
Fields. We also remove the dot and comma characters from the words.

$ go run fields_fun.go
The
Battle
of
Thermopylae
was
fought
between
an
alliance
of
Greek
city-states
...

## Go strings FieldsFun

The FieldsFunc function splits the string at each run of Unicode
code points satisfying the provided function and returns an array of slices.

$ wget https://raw.githubusercontent.com/janbodnar/data/main/the-king-james-bible.txt

We use the King James Bible.

read_freq.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "sort"
    "strings"
)

func main() {

    fileName := "the-king-james-bible.txt"

    bs, err := ioutil.ReadFile(fileName)

    if err != nil {

        log.Fatal(err)
    }

    text := string(bs)

    fields := strings.FieldsFunc(text, func(r rune) bool {

        return !('a' &lt;= r &amp;&amp; r &lt;= 'z' || 'A' &lt;= r &amp;&amp; r &lt;= 'Z' || r == '\'')
    })

    wordsCount := make(map[string]int)

    for _, field := range fields {

        wordsCount[field]++
    }

    keys := make([]string, 0, len(wordsCount))

    for key := range wordsCount {

        keys = append(keys, key)
    }

    sort.Slice(keys, func(i, j int) bool {

        return wordsCount[keys[i]] &gt; wordsCount[keys[j]]
    })

    for idx, key := range keys {

        fmt.Printf("%s %d\n", key, wordsCount[key])

        if idx == 10 {
            break
        }
    }
}

We count the frequency of the words from the King James Bible.

fields := strings.FieldsFunc(text, func(r rune) bool {

    return !('a' &lt;= r &amp;&amp; r &lt;= 'z' || 'A' &lt;= r &amp;&amp; r &lt;= 'Z' || r == '\'')
})

The FieldsFunc cuts the text by characters that are not alphabetic
and apostrophe. This will also disregard all the verse numbers.

wordsCount := make(map[string]int)

for _, field := range fields {

    wordsCount[field]++
}

Each word and its frequency is stored in the wordsCount map.

keys := make([]string, 0, len(wordsCount))

for key := range wordsCount {

    keys = append(keys, key)
}

sort.Slice(keys, func(i, j int) bool {

    return wordsCount[keys[i]] &gt; wordsCount[keys[j]]
})

In order to sort the words by frequency, we create a new keys
slice. We put all the words there and sort them by their frequency values.

for idx, key := range keys {

    fmt.Printf("%s %d\n", key, wordsCount[key])

    if idx == 10 {
        break
    }
}

We print the top ten frequent words from the Bible.

$ go run word_freq.go
the 62103
and 38848
of 34478
to 13400
And 12846
that 12576
in 12331
shall 9760
he 9665
unto 8942
I 8854

## Source

[Go strings package - reference](https://pkg.go.dev/strings)

In this article we have covered string functions from the Go's
strings package.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).