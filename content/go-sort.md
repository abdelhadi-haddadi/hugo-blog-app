+++
title = "Go sort"
date = 2025-08-29T19:56:08.394+01:00
draft = false
description = "Learn how to sort slices and user-defined collections in Go. Includes examples for integers, strings, and custom types."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go sort

last modified April 11, 2024

In this article we show how to sort slices and user-defined collections in
Golang.

## Sorting

Sorting is arranging elements in an ordered sequence. In computer science, many
algorithms were developed to perform sorting on data, including merge sort,
quick sort, selection sort, or bubble sort. (The other meaning of sorting is
categorizing; it is grouping elements with similar properties.)

The opposite of sorting, rearranging a sequence of elements in a random or
meaningless order, is called shuffling.

Basic data types can ben sorted in a natural order, either alphabetically or
numerically. The sort key specifies the criteria used to perform the sort. We
can also sort objects by multiple keys. For instance, when sorting users, the
names of the users could be used as primary sort key, and their occupation as
the secondary sort key.

## Sorting order

A standard order is called the ascending order: a to z, 0 to 9. The reverse
order is called the descending order: z to a, 9 to 0. For dates and times,
ascending means that earlier values precede later ones e.g. 1/1/2019 will sort
ahead of 1/1/2023.

## Stable sort

In a stable sorting algorithms, the initial order of equal elements is
preserved. Some sorting algorithms are naturally stable, some are not. For
example, the bubble sort and the merge sort are stable sorting algorithms. On
the other hand, heap sort and quick sort are examples of unstable sorting
algorithms.

Consider the following values: 3715593. A stable sorting
produces the following: 1335579. The ordering of the values
3 and 5 is kept. An unstable sorting may produce the following: 1335579.

## Sorting in Go

Go has the standard sort package for doing sorting. The sorting
functions sort data in-place. For basic data types, we have built-in functions
such as sort.Ints and sort.Strings. For more complex
types, we need to create our own sorting by implementing the
sort.Interface:

type Interface interface {
    Len() int
    Less(i, j int) bool
    Swap(i, j int)
}

The interface contains three functions: Len, Less,
and Swap.

## Go sort integers

The sort.Ints sorts a slice of ints in ascending order.
The Reverse function returns the reverse order for data.

sort_ints.go
  

package main

import (
    "fmt"
    "sort"
)

func main() {

    vals := []int{3, 1, 0, 7, 2, 4, 8, 6}
    sort.Ints(vals)
    fmt.Println(vals)

    sort.Sort(sort.Reverse(sort.IntSlice(vals)))
    fmt.Println(vals)
}

The example sorts a slice of integers in ascending and descending order.

$ go run sort_ints.go
[0 1 2 3 4 6 7 8]
[8 7 6 4 3 2 1 0]

## Go sort strings

The sort.Strings sorts a slice of strings in ascending order.

sort_strings.go
  

package main

import (
    "fmt"
    "sort"
)

func main() {

    words := []string{"bear", "atom", "world", "falcon", "cloud", "forest"}

    sort.Strings(words)
    fmt.Println(words)

    sort.Sort(sort.Reverse(sort.StringSlice(words)))
    fmt.Println(words)
}

We have a slice of words. We sort the words in ascending and descending orders.

sort.Strings(words)

The sort.Strings sorts the words in ascending order.

sort.Sort(sort.Reverse(sort.StringSlice(words)))

With the help of the sort.Reverse and sort.StringSlice
functions, we sort the words in descending order.

$ go run sort_strings.go
[atom bear cloud falcon forest world]
[world forest falcon cloud bear atom]

## Go sort accented words

In the next example, we sort accented words. For this task we use the
x/text module.

sort_accented_words.go
  

package main

import (
    "fmt"

    "golang.org/x/text/collate"
    "golang.org/x/text/language"
)

func main() {

    words := []string{"čaj", "auto", "pot", "márny", "kľak", "chyba", "drevo",
        "cibuľa", "džíp", "džem", "šum", "pól", "čučoriedka", "banán", "čerešňa",
        "červený", "klam", "čierny", "tŕň", "pôst", "hôrny", "mat", "chobot",
        "cesnak", "kĺb", "mäta", "ďateľ", "troska", "sýkorka", "elektrón",
        "fuj", "zem", "guma", "hora", "gejzír", "ihla", "pýr", "hrozno",
        "jazva", "džavot", "lom"}

    c := collate.New(language.Slovak)
    c.SortStrings(words)

    fmt.Println(words)
}

We have a slice of Slovak words.

c := collate.New(language.Slovak)
c.SortStrings(words)

We create a collation for the Slovak language and sort the words with
SortStrings.

$ go run sort_accented_words.go 
[auto banán cesnak cibuľa čaj čerešňa červený čierny čučoriedka ďateľ drevo
džavot džem džíp elektrón fuj gejzír guma hora hôrny hrozno chobot chyba ihla
jazva kľak klam kĺb lom márny mat mäta pól pot pôst pýr sýkorka šum tŕň troska
zem]

The output is not 100% correct; but it is one of the closest solutions in all 
programming languages.

## Go check sorting

We can check if the data is sorted with sort.StringsAreSorted,
sort.IntsAreSorted, or sort.SliceIsSorted functions.

check_sorting.go
  

package main

import (
    "fmt"
    "sort"
)

func main() {

    words := []string{"bear", "atom", "world", "falcon", "cloud", "forest"}

    sorted := sort.StringsAreSorted(words)
    fmt.Println(sorted)

    sort.Sort(sort.StringSlice(words))

    sorted = sort.StringsAreSorted(words)
    fmt.Println(sorted)

    // --------------------------------------------

    vals := []int{5, 2, 6, 3, 1, 7, 8, 4, 0}

    sorted = sort.IntsAreSorted(vals)
    fmt.Println(sorted)

    sort.Ints(vals)

    sorted = sort.IntsAreSorted(vals)
    fmt.Println(sorted)
}

In the code example, we check if our two slices are sorted.

$ go run check_sorting.go
false
true
false
true

## Go custom sorting

For custom sorting we need to implement the sort.Interface
functions.

custom_sorting.go
  

package main

import (
    "fmt"
    "sort"
)

type ByLength []string

func (s ByLength) Len() int {
    return len(s)
}

func (s ByLength) Swap(i, j int) {
    s[i], s[j] = s[j], s[i]
}

func (s ByLength) Less(i, j int) bool {
    return len(s[i]) &lt; len(s[j])
}

func main() {
    words := []string{"cloud", "atom", "sea", "by", "forest", "maintenance"}
    sort.Sort(ByLength(words))
    fmt.Println(words)
}

In the code example, we sort a slice of words by their length.

type ByLength []string

We create a custom type ByLength, which is an alias for the
built-in []string.

func (s ByLength) Len() int {
    return len(s)
}

func (s ByLength) Swap(i, j int) {
    s[i], s[j] = s[j], s[i]
}

func (s ByLength) Less(i, j int) bool {
    return len(s[i]) &lt; len(s[j])
}

We implement the three functions required by the sorting interface.

sort.Sort(ByLength(words))

We cast the slice of string words to our type and we call the Sort
function on that typed slice.

$ go run custom_sorting.go
[by sea atom cloud forest maintenance]

The words are sorted by their length in ascending order.

## Go sort.Slice

The sort.Slice is a convenience function to sort data in a slice
without having to create custom types.

slice_fun.go
  

package main

import (
    "fmt"
    "sort"
)

func main() {

    words := []string{"cloud", "atom", "sea", "by", "forest", "maintenance"}

    sort.Slice(words, func(i1, i2 int) bool {
        return len(words[i1]) &lt; len(words[i2])
    })

    fmt.Println(words)

    sort.Slice(words, func(i1, i2 int) bool {
        return len(words[i1]) &gt; len(words[i2])
    })

    fmt.Println(words)
}

We sort the slice of words by their length. We pass an anonymous comparison
function to sort.Slice.

$ go run slice_fun.go
[by sea atom cloud forest maintenance]
[maintenance forest cloud atom sea by]

## Go sort map by keys

In the following examples, we sort a map by keys.

sort_map_keys.go
  

package main

import (
    "fmt"
    "sort"
)

func main() {

    items := map[string]int{
        "coin":   12,
        "chair":  3,
        "pen":    4,
        "bottle": 9,
    }

    keys := make([]string, 0, len(items))

    for key := range items {
        keys = append(keys, key)
    }

    sort.Strings(keys)

    for _, key := range keys {
        fmt.Printf("%s %d\n", key, items[key])
    }
}

In order to sort a map by its keys, we pick the keys into a keys slice, sort
them, and finally pick values using this sorted slice.

$ go run sort_map_keys.go
bottle 9
chair 3
coin 12
pen 4

## Go sort map by values

In the next example, we sort the map by values. The map stores words and
their frequencies in the Bible.

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

## Go sort structs

In the following example, we sort a list of structures.

sort_struct.go
  

package main

import (
    "fmt"
    "sort"
)

type Student struct {
    name  string
    score int
}

func main() {

    students := []Student{

        Student{name: "John", score: 45},
        Student{name: "Bill", score: 68},
        Student{name: "Sam", score: 98},
        Student{name: "Julia", score: 87},
        Student{name: "Tom", score: 91},
        Student{name: "Martin", score: 71},
    }

    sort.Slice(students, func(i, j int) bool {
        return students[i].score &lt; students[j].score
    })

    fmt.Println(students)

    sort.Slice(students, func(i, j int) bool {
        return students[i].name &gt; students[j].name
    })

    fmt.Println(students)
}

We have a slice of student objects, created from the Student struct.
We provide two anonymous functions to the sort.Slice to sort
the slice by scores and names.

$ go run sort_struct.go
[{John 45} {Bill 68} {Martin 71} {Julia 87} {Tom 91} {Sam 98}]
[{Tom 91} {Sam 98} {Martin 71} {Julia 87} {John 45} {Bill 68}]

## Go sort by multiple fields

Data can be sorted by multiple criteria.

sort_mul_fields.go
  

package main

import (
    "fmt"
    "sort"
)

type Student struct {
    name  string
    score int
}

func main() {

    students := []Student{

        Student{name: "John", score: 87},
        Student{name: "Albert", score: 68},
        Student{name: "Bill", score: 68},
        Student{name: "Sam", score: 98},
        Student{name: "Xenia", score: 87},
        Student{name: "Lucia", score: 87},
        Student{name: "Tom", score: 91},
        Student{name: "Jane", score: 68},
        Student{name: "Martin", score: 71},
        Student{name: "Julia", score: 87},
    }

    sort.Slice(students, func(i, j int) bool {

        if students[i].score != students[j].score {
            return students[i].score &lt; students[j].score
        }

        return students[i].name &lt; students[j].name
    })

    fmt.Println(students)
}

In the code example, we sort a slice of students by score and when the score is
the same, by name.

sort.Slice(students, func(i, j int) bool {

    if students[i].score != students[j].score {
        return students[i].score &lt; students[j].score
    }

    return students[i].name &lt; students[j].name
})

The sorting logic is implemented in the anonymous function. First, we compare
the scores. Then, if the score is identical, we compare the names.

$ go run sort_mul_fields.go
[{Albert 68} {Bill 68} {Jane 68} {Martin 71} {John 87} {Julia 87}
    {Lucia 87} {Xenia 87} {Tom 91} {Sam 98}]

## Go sort by datetime

In the following example, we sort data by datetime.

sort_date_time.go
  

package main

import (
    "fmt"
    "sort"
    "time"
)

type Purchase struct {
    id   string
    date time.Time
}

func main() {

    var purchases = make([]Purchase, 0)
    purchases = append(purchases, Purchase{id: "1", date: time.Now()})
    purchases = append(purchases, Purchase{id: "2", date: time.Now().AddDate(-3, 0, 7)})
    purchases = append(purchases, Purchase{id: "3", date: time.Now().AddDate(2, 4, 7)})
    purchases = append(purchases, Purchase{id: "4",
        date: time.Now().AddDate(-5, -5, -7)})

    sort.Slice(purchases, func(i, j int) bool {
        return purchases[i].date.Before(purchases[j].date)
    })

    for _, pur := range purchases {

        fmt.Printf("%s %s\n", pur.id, pur.date.Format("2 Jan 2006 15:04"))
    }
}

We have a slice of purchases. The purchases are sorted by their datetimes.

sort.Slice(purchases, func(i, j int) bool {
    return purchases[i].date.Before(purchases[j].date)
})

In the comparison function, we use the Before function to figure
out whether the first time is before the second.

$ go run sort_date_time.go
4 13 May 2015 14:42
2 27 Oct 2017 14:42
1 20 Oct 2020 14:42
3 27 Feb 2023 14:42

## Source

[Go sort package - reference](https://pkg.go.dev/sort)

In this article we have sorted data in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).