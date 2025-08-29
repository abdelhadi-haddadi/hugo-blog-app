+++
title = "C# yield"
date = 2025-08-29T19:51:39.021+01:00
draft = false
description = "C# yield tutorial shows how to use yield keyword in C# language."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# yield

last modified February 1, 2024

 

In this article we show how to  use yield keyword in C# language.

## The yield keyword

The yield keyword is use to do custom stateful iteration over a
collection. The yield keyword tells the compiler that the method in which it
appears is an iterator block. 

yield return &lt;expression&gt;;
yield break;

The yield return statement returns one element at a time. The
return type of yield keyword is either IEnumerable or
IEnumerator. The yield break statement is used to end
the iteration.

We can consume the iterator method that contains a yield return statement either
by using foreach loop or LINQ query. Each iteration of the loop calls the
iterator method. When a yield return statement is reached in the iterator
method, the expression is returned, and the the current location in code is
retained. Execution is restarted from that location the next time that the
iterator function is called.

Two important aspects of using yield are:

    - lazy evaluation

    - deferred execution

## C# yield example

In the first examples, we work with Fibonacci sequence.

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

The Fibonacci sequence is the series of numbers, where the next number is found
by adding up the two numbers before it.

Program.cs
  

var data = Fibonacci(10);

foreach (int e in data)
{
    Console.WriteLine(e);
}

IEnumerable&lt;int&gt; Fibonacci(int n)
{
    var vals = new List&lt;int&gt;();

    for (int i = 0, n1 = 0, n2 = 1; i &lt; n; i++)
    {
        int fib = n1 + n2;
     
        n1 = n2;

        vals.Add(fib);
        n2 = fib;
    }

    return vals;
}

Here, we compute the sequence without the yield keyword. We print 
the first ten values of the sequence.

var vals = new List&lt;int&gt;();

This implementation requires a new list. Imagine that we worked hundreds of
millions of values. This would significantly slow our computation and would 
require huge amount of memory.

$ dotnet run 
1
2
3
5
8
13
21
34
55
89

Next, we use the yield keyword to generate the Fibonacci sequence.

Program.cs
  

foreach (int fib in Fibonacci(10))
{
    Console.WriteLine(fib);
}

IEnumerable&lt;int&gt; Fibonacci(int n)
{
    for (int i = 0, n1 = 0, n2 = 1; i &lt; n; i++)
    {
        yield return n1;

        int temp = n1 + n2;
        n1 = n2;

        n2 = temp;
    }
}

This implementation starts producing numbers before reaching the specified end
of the sequence.

for (int i = 0, n1 = 0, n2 = 1; i &lt; n; i++)
{
    yield return n1;

    int temp = n1 + n2;
    n1 = n2;

    n2 = temp;
}

The yield return returns the currently computed value to the 
above foreach statement. The n1, n2, 
temp values are remembered; C# creates a class behind the scenes 
to keep these values.

We can have multiple yields statements. 

Program.cs
  

int n = 10;

IEnumerable&lt;string&gt; res = FibSeq().TakeWhile(f =&gt; f.n &lt;= n).Select(f =&gt; $"{f.fib}");

Console.WriteLine(string.Join(" ", res));

IEnumerable&lt;(int n, int fib)&gt; FibSeq()
{
    yield return (0, 0);
    yield return (1, 1);

    var (x, y, n) = (1, 0, 0);

    while (x &lt; int.MaxValue - y)
    {
        (x, y, n) = (x + y, x, n + 1);
        yield return (n, x);
    }
}

In the example, we calculate the Fibonacci sequence with the help of tuples.

IEnumerable&lt;string&gt; res = FibSeq().TakeWhile(f =&gt; f.n &lt;= n).Select(f =&gt; $"{f.fib}");

We consume the Fibonacci sequence with the LINQ's TakeWhile method.

Console.WriteLine(string.Join(" ", res));

The sequence of strings is joined.

IEnumerable&lt;(int n, int fib)&gt; FibSeq()
{
    yield return (0, 0);
    yield return (1, 1);

    var (x, y, n) = (1, 0, 0);

    while (x &lt; int.MaxValue - y)
    {
        (x, y, n) = (x + y, x, n + 1);
        yield return (n, x);
    }
}

The FibSeq method returns a sequence of tuple values. Each tuple
contains the n value, up to which we generate the sequence and 
the current Fibonacci value fib.

yield return (0, 0);
yield return (1, 1);

The first two tuples are returned with yield return.

var (x, y, n) = (1, 0, 0);

while (x &lt; int.MaxValue - y)
{
    (x, y, n) = (x + y, x, n + 1);
    yield return (n, x);
}

The rest of the sequence is calculated with a while loop. The sequence goes 
up to int.MaxValue.

## C# yield running total

The yield stores state; the next program demonstrates this.

Program.cs
  

List&lt;int&gt; vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

foreach (int e in RunningTotal())
{
    Console.WriteLine(e);
}

IEnumerable&lt;int&gt; RunningTotal()
{
    int runningTotal = 0;

    foreach (int val in vals)
    {
        runningTotal += val;
        yield return runningTotal;
    }
}

The example calculates the running total for a list of integers. The
runningTotal is stored when the control goes between the iterator 
and the consumer of the iterator.

$ dotnet run 
1
3
6
10
15
21
28
36
45
55

## C# yield partition example

In the next example, we compare the efficiency of two approaches to partitioning
a huge list.

Program.cs
  

using System.Collections.ObjectModel;

var vals = Enumerable.Range(1, 100_000_000);

var option = int.Parse(args[0]);

IEnumerable&lt;IEnumerable&lt;int&gt;&gt; result;

if (option == 1)
{
    result = Partition1(vals, 5);
} else 
{
    result = Partition2(vals, 5);
}

foreach (var part in result)
{
    // Console.WriteLine(string.Join(", ", part));
}

Console.WriteLine(string.Join(", ", result.First()));
Console.WriteLine(string.Join(", ", result.Last()));

Console.WriteLine("-------------------");
Console.WriteLine("Finished");

IEnumerable&lt;IEnumerable&lt;int&gt;&gt; Partition1(IEnumerable&lt;int&gt; source, int size)
{
    int[] array = null;
    int count = 0;

    var data = new List&lt;IEnumerable&lt;int&gt;&gt;();

    foreach (int item in source)
    {
        if (array == null)
        {
            array = new int[size];
        }

        array[count] = item;
        count++;

        if (count == size)
        {
            data.Add(new ReadOnlyCollection&lt;int&gt;(array));
            array = null;
            count = 0;
        }
    }

    if (array != null)
    {
        Array.Resize(ref array, count);
        data.Add(new ReadOnlyCollection&lt;int&gt;(array));
    }

    return data;
}

IEnumerable&lt;IEnumerable&lt;int&gt;&gt; Partition2(IEnumerable&lt;int&gt; source, int size)
{
    int[] array = null;
    int count = 0;

    foreach (int item in source)
    {
        if (array == null)
        {
            array = new int[size];
        }

        array[count] = item;
        count++;

        if (count == size)
        {
            yield return new ReadOnlyCollection&lt;int&gt;(array);
            array = null;
            count = 0;
        }
    }

    if (array != null)
    {
        Array.Resize(ref array, count);
        yield return new ReadOnlyCollection&lt;int&gt;(array);
    }
}

We have a sequence of a hundred million vallues. We partition them into groups
of five values with and without the yield keyword and compare the 
efficiency.

var vals = Enumerable.Range(1, 100_000_000);

A sequence of one hundred million values is generated with
Enumerable.Range.

var option = int.Parse(args[0]);

IEnumerable&lt;IEnumerable&lt;int&gt;&gt; result;

if (option == 1)
{
    result = Partition1(vals, 5);
} else 
{
    result = Partition2(vals, 5);
}

The program is run with a parameter. The option 1 invokes
Partition1 function. The yield keyword is used in
Partition2 and is invoked with option other than 1.

var data = new List&lt;IEnumerable&lt;int&gt;&gt;();
...
return data;

The Partition1 function builds a list with values partitioned 
inside. For one hundred million values, this requires a significant chunk of 
memory. Also, if there is not enough free memory, the operating system starts 
swapping the memory to disk which slows down the computation.

if (array != null)
{
    Array.Resize(ref array, count);
    yield return new ReadOnlyCollection&lt;int&gt;(array);
}

In Partition2, we return one partitioned collection at a time. We
don't wait for the whole process to finish. This approach requires less memory.

$ /usr/bin/time -f "%M KB %e s" bin/Release/net5.0/Partition 1
1, 2, 3, 4, 5
99999996, 99999997, 99999998, 99999999, 100000000
-------------------
Finished
1696712 KB 6.38 s

$ /usr/bin/time -f "%M KB %e s" bin/Release/net5.0/Partition 2
1, 2, 3, 4, 5
99999996, 99999997, 99999998, 99999999, 100000000
-------------------
Finished
30388 KB 2.99 s

We use the time command to compare the two functions. In our case
it was 1.7 GB vs 30 MB.

## Source

[yield statement - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/yield)

In this article we have worked with C# yield keyword.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).