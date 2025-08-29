+++
title = "Visual Basic collections"
date = 2025-08-29T20:03:19.438+01:00
draft = false
description = "This part of the Visual Basic tutorial cover Visual Basic collections."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../oopii/)
[Next](../io/)

# Visual Basic collections

last modified October 18, 2023

In this chapter we deal with Visual Basic collections. The .NET framework
provides specialized classes for data storage and retrieval. In the previous
chapter, we have described arrays. Collections are enhancement to the arrays.

There are two distinct collection types in Visual Basic. The standard
collections, which are found under the System.Collections namespace and the
generic collections, under System.Collections.Generic. The generic collections
are more flexible and are the preferred way to work with data. The generic
collections or generics were introduced in .NET framework 2.0. Generics enhance
code reuse, type safety, and performance.

*Generic programming* is a style of computer programming in which
algorithms are written in terms of to-be-specified-later types that are then
instantiated when needed for specific types provided as parameters. This
approach, pioneered by Ada in 1983, permits writing common functions or types
that differ only in the set of types on which they operate when used, thus
reducing duplication. (Wikipedia)

## ArrayList

An ArrayList is a collection from a standard System.Collections
namespace. It is a dynamic array. It provides random access to its elements. An
ArrayList automatically expands as data is added. Unlike arrays, an ArrayList
can hold data of multiple data types. Elements in the ArrayList are accessed via
an integer index. Indexes are zero based. Indexing of elements and insertion and
deletion at the end of the ArrayList takes constant time. Inserting or deleting
an element in the middle of the dynamic array is more costly. It takes linear
time.

Program.vb
  

Option Strict On

Imports System.Collections

Module Example

    Class Empty

    End Class

    Sub Main()

        Dim da As ArrayList = New ArrayList()

        da.Add("Visual Basic")
        da.Add(344)
        da.Add(55)
        da.Add(New Empty)
        da.Remove(55)

        For Each el As Object In da
            Console.WriteLine(el)
        Next

    End Sub

End Module

In the above example, we have created an ArrayList collection. We
have added some elements to it. They are of various data type: a string, two
integers and a class object.

Imports System.Collections

In order to work with ArrayList collection, we need to import
System.Collections namespace.

Dim da As ArrayList = New ArrayList()

ArrayList collection is created.

da.Add("Visual Basic")
da.Add(344)
da.Add(55)
da.Add(New Empty)

We add five elements to the array with the Add method.

da.Remove(55)

We remove one element.

For Each el As Object In da
    Console.WriteLine(el)
Next

We iterate through the array and print its elements
to the console.

## List

A List is a strongly typed list of objects that can be accessed by
index. It can be found under System.Collections.Generic
namespace.

Program.vb
  

Option Strict On

Imports System.Collections.Generic

Module Example

    Sub Main()

        Dim langs As New List(Of String)
        langs.Add("Java")
        langs.Add("C#")
        langs.Add("C")
        langs.Add("C++")
        langs.Add("Ruby")
        langs.Add("Javascript")

        Console.WriteLine(langs.Contains("C#"))

        Console.WriteLine(langs(1))
        Console.WriteLine(langs(2))

        langs.Remove("C#")
        langs.Remove("C")

        Console.WriteLine(langs.Contains("C#"))

        langs.Insert(4, "Haskell")

        langs.Sort()

        For Each lang As String In langs
            Console.WriteLine(lang)
        Next

    End Sub

End Module

In the preceding example, we work with the List
collection.

Imports System.Collections.Generic

In order to work with the List collection,
we need to import the System.Collections.Generic
namespace.

Dim langs As New List(Of String)

A generic dynamic array is created. We specify that we work
with strings with the Of keyword.

langs.Add("Java")
langs.Add("C#")
langs.Add("C")
...

We add elements to the List using the Add method.

Console.WriteLine(langs.Contains("C#"))

We check if the List contains a specific string using the
Contains method.

Console.WriteLine(langs(1))
Console.WriteLine(langs(2))

We access the second and the third element of the List
using the index notation.

langs.Remove("C#")
langs.Remove("C")

We remove two strings from the List.

langs.Insert(4, "Haskell")

We insert a string at a specific location.

langs.Sort()

We sort the elements using the Sort
method.

$ dotnet run
True
C#
C
False
C++
Haskell
Java
Javascript
Ruby

Outcome of the example.

## LinkedList

LinkedList is a generic doubly linked list in Visual Basic.
LinkedList only allows sequential access. LinkedList allows for constant-time insertions
or removals, but only sequential access of elements. Because linked lists need
extra storage for references, they are impractical for lists of small data items
such as characters. Unlike dynamic arrays, arbitrary number of items can be added
to the linked list (limited by the memory of course) without the need to realocate, which
is an expensive operation.

Program.vb
  

Option Strict On

Imports System.Collections.Generic

Module Example

    Sub Main()

        Dim nums As New LinkedList(Of Integer)

        nums.AddLast(23)
        nums.AddLast(34)
        nums.AddLast(33)
        nums.AddLast(11)
        nums.AddLast(6)
        nums.AddFirst(9)
        nums.AddFirst(7)

        Dim node as LinkedListNode(Of Integer)

        node = nums.Find(6)
        nums.AddBefore(node, 5)

        For Each num As Integer In nums
            Console.WriteLine(num)
        Next

    End Sub

End Module

This is a LinkedList example with some of its methods.

Dim nums As New LinkedList(Of Integer)

This is an integer LinkedList.

nums.AddLast(23)
...
nums.AddFirst(9)

We populate the linked list using the AddLast
and AddFirst methods.

Dim node as LinkedListNode(Of Integer)

node = nums.Find(6)
nums.AddBefore(node, 5)

A LinkedList consists of nodes. We find a specific node
and add an element before it.

For Each num As Integer In nums
    Console.WriteLine(num)
Next

Printing all elements to the console.

## Dictionary

A dictionary, also called an associative array, is a collection
of unique keys and a collection of values, where each key is associated with one value.
Retrieving and adding values is very fast. Dictionaries take more memory, because
for each value there is also a key.

Program.vb
  

Option Strict On

Imports System.Collections.Generic

Module Example

    Sub Main()

        Dim domains As New Dictionary(Of String, String)

        domains.Add("de", "Germany")
        domains.Add("sk", "Slovakia")
        domains.Add("us", "United States")
        domains.Add("ru", "Russia")
        domains.Add("hu", "Hungary")
        domains.Add("pl", "Poland")

        Console.WriteLine(domains("sk"))
        Console.WriteLine(domains("de"))

        Console.WriteLine("Dictionary has {0} items", domains.Count)

        Console.WriteLine("Keys of the dictionary:")

        Dim keys As Dictionary(Of String, String).KeyCollection = domains.Keys

        For Each key As String In keys
            Console.WriteLine("{0}", key)
        Next

        Console.WriteLine("Values of the dictionary:")

        Dim vals As Dictionary(Of String, String).ValueCollection = domains.Values

        For Each val As String In vals
            Console.WriteLine("{0}", val)
        Next

        Console.WriteLine("Keys and values of the dictionary:")

        For Each kvp As KeyValuePair(Of String, String) In domains
            Console.WriteLine("Key = {0}, Value = {1}",
                kvp.Key, kvp.Value)
        Next

    End Sub

End Module

We have a dictionary, where we map domain names to their country names.

Dim domains As New Dictionary(Of String, String)

We create a dictionary with string keys and values.

domains.Add("de", "Germany")
domains.Add("sk", "Slovakia")
domains.Add("us", "United States")
...

We add some data to the dictionary. The first string is the key.
The second is the value.

Console.WriteLine(domains("sk"))
Console.WriteLine(domains("de"))

Here we retrieve two values by their keys.

Console.WriteLine("Dictionary has {0} items",
    domains.Count)

We print the number of items by referring to the
Count property.

Dim keys As Dictionary(Of String, String).KeyCollection = domains.Keys

For Each key As String In keys
    Console.WriteLine("{0}", key)
Next

These lines retrieve all keys from the dictionary.

Dim vals As Dictionary(Of String, String).ValueCollection = domains.Values

For Each val As String In vals
    Console.WriteLine("{0}", val)
Next

These lines retrieve all values from the dictionary.

For Each kvp As KeyValuePair(Of String, String) In domains
    Console.WriteLine("Key = {0}, Value = {1}",
        kvp.Key, kvp.Value)
Next

Finally, we print both keys and values of the dictionary.

$ dotnet run 
Slovakia
Germany
Dictionary has 6 items
Keys of the dictionary:
de
sk
us
ru
hu
pl
Values of the dictionary:
Germany
Slovakia
United States
Russia
Hungary
Poland
Keys and values of the dictionary:
Key = de, Value = Germany
Key = sk, Value = Slovakia
Key = us, Value = United States
Key = ru, Value = Russia
Key = hu, Value = Hungary
Key = pl, Value = Poland

## Queues

A queue is a First-In-First-Out (FIFO) data structure. The first
element added to the queue will be the first one to be removed. Queues may be
used to process messages as they appear or serve customers as they come. The
first customer which comes should be served first.

Program.vb
  

Option Strict On

Imports System.Collections.Generic

Module Example

    Sub Main()

        Dim msgs As New Queue(Of String)

        msgs.Enqueue("Message 1")
        msgs.Enqueue("Message 2")
        msgs.Enqueue("Message 3")
        msgs.Enqueue("Message 4")
        msgs.Enqueue("Message 5")

        Console.WriteLine(msgs.Dequeue())
        Console.WriteLine(msgs.Peek())
        Console.WriteLine(msgs.Peek())

        Console.WriteLine()

        For Each msg As String In msgs
            Console.WriteLine(msg)
        Next

    End Sub

End Module

In our example, we have a queue with messages.

Dim msgs As New Queue(Of String)

A queue of strings is created.

msgs.Enqueue("Message 1")
msgs.Enqueue("Message 2")
...

The Enqueue adds a message to the end of the queue.

Console.WriteLine(msgs.Dequeue())

The Dequeue method removes and returns the item at the beginning of
the queue.

Console.WriteLine(msgs.Peek())

The Peek method returns the next item from the queue, but does not
remove it from the collection.

$ dotnet run
Message 1
Message 2
Message 2

Message 2
Message 3
Message 4
Message 5

The Dequeue method removes the "Message 1" from the collection. The
Peek method does not. The "Message 2" remains in the collection.

## Stacks

A stack is a Last-In-First-Out (LIFO) data structure. The last
element added to the queue will be the first one to be removed. The C language
uses a stack to store local data in a function. The stack is also used when
implementing calculators.

Program.vb
  

Option Strict On

Imports System.Collections.Generic

Module Example

    Sub Main()

        Dim stc As New Stack(Of Integer)

        stc.Push(1)
        stc.Push(4)
        stc.Push(3)
        stc.Push(6)
        stc.Push(4)

        Console.WriteLine(stc.Pop())
        Console.WriteLine(stc.Peek())
        Console.WriteLine(stc.Peek())

        Console.WriteLine()

        For Each item As Integer In stc
            Console.WriteLine(item)
        Next

    End Sub

End Module

We have a simple stack example above.

Dim stc As New Stack(Of Integer)

A Stack data structure is created.

stc.Push(1)
stc.Push(4)
...

The Push method adds an item at the top of the stack.

Console.WriteLine(stc.Pop())

The Pop method removes and returns the item from the top of the
stack.

Console.WriteLine(stc.Peek())

The Peek method returns the item from the top of the stack. It does
not remove it.

$ dotnet run
4
6
6

6
3
4
1

This part of the Visual Basic tutorial was dedicated to Collections in Visual
Basic.

[Contents](..)
[Previous](../oopii/)
[Next](../io/)