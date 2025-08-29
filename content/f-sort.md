+++
title = "F# sort"
date = 2025-08-29T19:54:34.033+01:00
draft = false
description = "Explore sorting techniques in F#. This tutorial demonstrates how to sort values effectively in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# sort

last modified May 1, 2025

In this article we show how to sort values in F#. 

## Sorting

Sorting is arranging elements in an ordered sequence. In the past, several
algorithms were developed to perform sorting on data, including merge sort,
quick sort, selection sort, or bubble sort. 

Data can be sorted alphabetically or numerically. The sort key specifies the
criteria used to perform the sort. It is possible to sort objects by multiple
keys. For instance, when sorting users, the names of the users could be used as
primary sort key, and their occupation as the secondary sort key. 

## Sorting order

A standard order is called the ascending order: a to z, 0 to 9. The reverse
order is called the descending order: z to a, 9 to 0. For dates and times,
ascending means that earlier values precede later ones e.g. 12/1/2021 will sort
ahead of 12/1/2022.

## Stable sort

A stable sort is one where the initial order of equal elements is preserved.
Some sorting algorithms are naturally stable, some are unstable. For instance,
the merge sort and the bubble sort are stable sorting algorithms. On the other
hand, heap sort and quick sort are examples of unstable sorting algorithms.

Consider the following values: 3715593. A stable
sorting produces the following: 1335579. The ordering
of the values 3 and 5 is kept. An unstable sorting may produce the following:
1335579. 

## F# List.sort, List.sortDescending

The List.sort function sorts a list in ascending order. The
List.sortDescending sorts a list in descending order. The functions
return a sorted list; the original list is not modifier. The functions implement
a stable sort, i.e. the original order of equal elements is preserved.

## F# List.sortBy

The List.sortBy sorts the given list using keys given by the
projection function.

## F# sort a list of integers

The following example sorts a list of integers.

main.fsx
  

let nums = [ 7; 9; 3; -2; 8; 1; 0 ]

List.sort nums |&gt; printfn "%A"
List.sortDescending nums |&gt; printfn "%A"

We define a list of integers. The list is sorted in ascending and descending
order.

λ dotnet fsi main.fsx
[-2; 0; 1; 3; 7; 8; 9]
[9; 8; 7; 3; 1; 0; -2]

## F# sort a list of strings

In the second example, we sort a list of strings.

main.fsx
  

let words =
    [ "sky"
      "cloud"
      "atom"
      "brown"
      "den"
      "kite"
      "town" ]

List.sort words |&gt; printfn "%A"
List.sortDescending words |&gt; printfn "%A"

The strings are sorted in ascending and descending order.

λ dotnet fsi main.fsx
["atom"; "brown"; "cloud"; "den"; "kite"; "sky"; "town"]
["town"; "sky"; "kite"; "den"; "cloud"; "brown"; "atom"]

## F# sort by surnames

In the following example, we sort names by the surnames.

main.fsx
  

let names =
    [ "John Doe"
      "Lucy Smith"
      "Benjamin Young"
      "Robert Brown"
      "Thomas Moore"
      "Linda Black"
      "Adam Smith"
      "Jane Smith" ]

names
|&gt; List.sortBy (fun e -&gt; e.Split(" ")[1])
|&gt; printfn "%A"

names
|&gt; List.sortBy (fun e -&gt; let a = e.Split(" ") in Array.get a 1)
|&gt; printfn "%A"

We have a list of full names. We need to split the names in order to get the 
surname.

names
|&gt; List.sortBy (fun e -&gt; e.Split(" ")[1])
|&gt; printfn "%A"

In the projection function, we split the string by a space and return the second
value.

names
|&gt; List.sortBy (fun e -&gt; let a = e.Split(" ") in Array.get a 1)
|&gt; printfn "%A"

This is an alternative solution, where we use a let expression and the
Array.get function.

λ dotnet fsi main.fsx
["Linda Black"; "Robert Brown"; "John Doe"; "Thomas Moore"; "Lucy Smith";
 "Adam Smith"; "Jane Smith"; "Benjamin Young"]
["Linda Black"; "Robert Brown"; "John Doe"; "Thomas Moore"; "Lucy Smith";
 "Adam Smith"; "Jane Smith"; "Benjamin Young"]

## F# case insensitive list sort

The following example sorts a list in case-insensitive order.

main.fsx
  

let words =
    [ "sky"
      "Sun"
      "Albert"
      "cloud"
      "by"
      "Earth"
      "else"
      "atom"
      "brown"
      "a"
      "den"
      "kite"
      "town" ]

words |&gt; List.sortBy (fun e -&gt; e.ToLower()) |&gt; printfn "%A" 

The List.sortBy function sorts the given list using keys given by
the given projection.

words |&gt; List.sortBy (fun e -&gt; e.ToLower()) |&gt; printfn "%A" 

We pass a lambda function to the List.sortBy. It transforms the 
elements to lowercase.

λ dotnet fsi main.fsx
["a"; "Albert"; "atom"; "brown"; "by"; "cloud"; "den"; "Earth"; "else"; "kite";
 "sky"; "Sun"; "town"]

## F# sort a list of tuples

In the next example we sort a list of tuples.

main.fsx
  

let vals =
    [ (1, 3)
      (4, 3)
      (3, 0)
      (4, 0)
      (0, 1)
      (0, 3)
      (2, 2)
      (0, 0)
      (1, 1)
      (3, 3) ]

vals |&gt; List.sortBy (fun (e, _) -&gt; e) |&gt; printfn "%A" 
vals |&gt; List.sortBy fst |&gt; printfn "%A" 

printfn "------------------------" 

vals |&gt; List.sortBy (fun (_, e) -&gt; e) |&gt; printfn "%A" 
vals |&gt; List.sortBy snd |&gt; printfn "%A" 

The tuples are sorted by the first and then by the second elements.

vals |&gt; List.sortBy (fun (e, _) -&gt; e) |&gt; printfn "%A" 

In the projection, we select the first element. 

vals |&gt; List.sortBy fst |&gt; printfn "%A" 

We can also use the fst function.

λ dotnet fsi main.fsx
[(0, 1); (0, 3); (0, 0); (1, 3); (1, 1); (2, 2); (3, 0); (3, 3); (4, 3); (4, 0)]
[(0, 1); (0, 3); (0, 0); (1, 3); (1, 1); (2, 2); (3, 0); (3, 3); (4, 3); (4, 0)]
------------------------
[(3, 0); (4, 0); (0, 0); (0, 1); (1, 1); (2, 2); (1, 3); (4, 3); (0, 3); (3, 3)]
[(3, 0); (4, 0); (0, 0); (0, 1); (1, 1); (2, 2); (1, 3); (4, 3); (0, 3); (3, 3)]

## F# sort a list of records

In the next example we sort a list of records.

main.fsx
  

open System

type User =
    { FirstName: string
      LastName: string
      Salary: int }

let users =
    [ { FirstName = "John"
        LastName = "Doe"
        Salary = 1230 }
      { FirstName = "John"
        LastName = "Doe"
        Salary = 1230 }
      { FirstName = "Lucy"
        LastName = "Novak"
        Salary = 670 }
      { FirstName = "Ben"
        LastName = "Walter"
        Salary = 2050 }
      { FirstName = "Robin"
        LastName = "Brown"
        Salary = 2300 }
      { FirstName = "Joe"
        LastName = "Draker"
        Salary = 1190 }
      { FirstName = "Janet"
        LastName = "Doe"
        Salary = 980 } ]

users |&gt; List.sortBy (fun u -&gt; u.LastName) |&gt; List.iter Console.WriteLine

Console.WriteLine "---------------------"

users |&gt; List.sortBy (fun u -&gt; u.Salary) |&gt; List.iter Console.WriteLine

We define a list of users. We sort the users by their last names and salaries.

type User =
    { FirstName: string
      LastName: string
      Salary: int }

The User record has three labels: FirstName,
LastName, and Salary.

users |&gt; List.sortBy (fun u -&gt; u.LastName) |&gt; List.iter Console.WriteLine

Here we sort the list of users by their last names. In the projection function, 
we select the LastName label.

users |&gt; List.sortBy (fun u -&gt; u.Salary) |&gt; List.iter Console.WriteLine

Here we choose the Salary label.

## F# sort records by multiple fields

Next, we show how to sort a list of records by multiple fields.

main.fsx
  

type User =
    { FirstName: string
      LastName: string
      Salary: int }
    override this.ToString() =
        $"{this.FirstName} {this.LastName}, {this.Salary}"

let users =
    [ { FirstName = "John"
        LastName = "Doe"
        Salary = 1230 }
      { FirstName = "Lucy"
        LastName = "Novak"
        Salary = 670 }
      { FirstName = "Ben"
        LastName = "Walter"
        Salary = 2050 }
      { FirstName = "Robin"
        LastName = "Brown"
        Salary = 2300 }
      { FirstName = "Vivien"
        LastName = "Doe"
        Salary = 1010 }
      { FirstName = "Joe"
        LastName = "Draker"
        Salary = 1190 }
      { FirstName = "Albert"
        LastName = "Novak"
        Salary = 1930 }
      { FirstName = "Janet"
        LastName = "Doe"
        Salary = 980 }
      { FirstName = "Ken"
        LastName = "Novak"
        Salary = 2990 } ]

users
|&gt; List.sortBy (fun e -&gt; e.LastName, e.Salary)
|&gt; List.iter (fun e -&gt; printfn $"{e}")

The list of users is sorted first by last names and then by salaries.

|&gt; List.sortBy (fun e -&gt; e.LastName, e.Salary)

In the projection function, we simply pass two labels separated by a comma.

λ dotnet fsi main.fsx
Robin Brown, 2300
Janet Doe, 980
Vivien Doe, 1010
John Doe, 1230
Joe Draker, 1190
Lucy Novak, 670
Albert Novak, 1930
Ken Novak, 2990
Ben Walter, 2050

In this article we have sorted values in F#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.