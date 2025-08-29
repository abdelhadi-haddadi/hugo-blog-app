+++
title = "C# Func"
date = 2025-08-27T23:23:05.498+01:00
draft = false
description = "Master the C# Func delegate for functional
programming. This comprehensive tutorial explores Func usage with lambda
expressions, LINQ, and advanced examples."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Func

last modified April 22, 2025

 

This tutorial explores the Func delegate in C#, a powerful tool
for functional programming, enabling concise and expressive code.

Unlike languages with first-class functions, C# relies on delegates like
Func to emulate functional programming. Combined with lambda
expressions, Func reduces verbosity and enhances code flexibility,
as seen in LINQ and other scenarios.

## C# Func

Func is a built-in generic delegate type, alongside
Predicate and Action. It supports methods, anonymous
methods, or lambda expressions, offering versatility in functional programming.

Func supports 0 to 16 input parameters and requires a return type.
With 16 overloads, it accommodates various method signatures.

public delegate TResult Func&lt;in T1, in T2, out TResult&gt;(T1 arg1, T2 arg2);

This delegate represents a method with two input parameters and a return value
of type TResult.

## C# Func simple example

This example demonstrates basic usage of the Func delegate.

Program.cs
  

string GetMessage()
{
    return "Hello there!";
}

Func&lt;string&gt; sayHello = GetMessage;
Console.WriteLine(sayHello());

The example uses a Func delegate with no parameters, returning a
string from a method.

string GetMessage()
{
    return "Hello there!";
}

The GetMessage method is referenced by the Func
delegate.

Func&lt;string&gt; sayHello = GetMessage;

The delegate is assigned to reference GetMessage, simplifying
method invocation.

Console.WriteLine(sayHello());

The delegate invokes the method, printing the result.

$ dotnet run
Hello there!

## C# Func examples

This example uses Func to perform addition.

Program.cs
  

int Sum(int x, int y)
{
    return x + y;
}

Func&lt;int, int, int&gt; add = Sum;

int res = add(150, 10);

Console.WriteLine(res);

The Sum method is referenced via a Func delegate to
add two integers.

Func&lt;int, int, int&gt; add = Sum;

The delegate accepts two integers and returns their sum.

$ dotnet run
160

This example extends Func to three parameters.

Program.cs
  

int Sum(int x, int y, int z)
{
    return x + y + z;
}

Func&lt;int, int, int, int&gt; add = Sum;

int res = add(150, 20, 30);

Console.WriteLine(res);

The delegate references a method summing three integers.

$ dotnet run
200

This example shows a custom delegate without Func.

Program.cs
  

int Sum(int x, int y)
{
    return x + y;
}

Add AddTwo = Sum;
int res = AddTwo(150, 10);

Console.WriteLine(res);

delegate int Add(int x, int y);

A custom delegate is used instead of Func, illustrating the
additional boilerplate required.

## C# Func with lambda expression

Lambda expressions streamline Func creation using the
=&gt; operator, enhancing code conciseness.

Program.cs
  

Func&lt;int, int, int&gt; randInt = (n1, n2) =&gt; new Random().Next(n1, n2);
Console.WriteLine(randInt(1, 100));

The example generates a random integer within a range using a lambda-based
Func.

## C# Func Linq Where

Many LINQ methods, like Where, accept Func delegates
to filter sequences based on predicates.

Program.cs
  

Func&lt;string, bool&gt; HasThree = str =&gt; str.Length == 3;

string[] words =
[
    "sky", "forest", "wood", "cloud", "falcon", "owl" , "ocean",
    "water", "bow", "tiny", "arc"
];

IEnumerable&lt;string&gt; threeLetterWords = words.Where(HasThree);

foreach (var word in threeLetterWords)
{
    Console.WriteLine(word);
}

The example filters words with exactly three letters using a
Func-based predicate.

Func&lt;string, bool&gt; HasThree = str =&gt; str.Length == 3;

The lambda expression checks if a string's length is three, returning a boolean.

IEnumerable threeLetterWords = words.Where(HasThree);

The Where method applies the predicate to filter the array.

$ dotnet run
sky
owl
bow
arc

## C# list of Func delegates

Func delegates can be stored in collections for dynamic function
application.

Program.cs
  

int[] vals = [1, 2, 3, 4, 5];

Func&lt;int, int&gt; square = x =&gt; x * x;
Func&lt;int, int&gt; cube = x =&gt; x * x * x;
Func&lt;int, int&gt; inc = x =&gt; x + 1;

List&lt;Func&lt;int, int&gt;&gt; fns =
[
    inc, square, cube
];

foreach (var fn in fns)
{
    var res = vals.Select(fn);

    Console.WriteLine(string.Join(", ", res));
}

The example applies multiple Func delegates from a list to an
array, demonstrating dynamic transformations.

$ dotnet run
2, 3, 4, 5, 6
1, 4, 9, 16, 25
1, 8, 27, 64, 125

## C# Func filter array

This example filters an array of user objects using a Func
delegate.

Program.cs
  

User[] users =
[
  new (1, "John", "London", "2001-04-01"),
  new (2, "Lenny", "New York", "1997-12-11"),
  new (3, "Andrew", "Boston", "1987-02-22"),
  new (4, "Peter", "Prague", "1936-03-24"),
  new (5, "Anna", "Bratislava", "1973-11-18"),
  new (6, "Albert", "Bratislava", "1940-12-11"),
  new (7, "Adam", "Trnava", "1983-12-01"),
  new (8, "Robert", "Bratislava", "1935-05-15"),
  new (9, "Robert", "Prague", "1998-03-14"),
];

var city = "Bratislava";
Func&lt;User, bool&gt; livesIn = e =&gt; e.City == city;

var res = users.Where(livesIn);

foreach (var e in res)
{
    Console.WriteLine(e);
}

record User(int Id, string Name, string City, string DateOfBirth);

The program filters users living in Bratislava using a Func
predicate.

var city = "Bratislava";
Func livesIn = e =&gt; e.City == city;

The predicate checks if a user's city matches "Bratislava".

var res = users.Where(livesIn);

The Where method applies the predicate to filter the array.

$ dotnet run
User { Id = 5, Name = Anna, City = Bratislava, DateOfBirth = 1973-11-18 }
User { Id = 6, Name = Albert, City = Bratislava, DateOfBirth = 1940-12-11 }
User { Id = 8, Name = Robert, City = Bratislava, DateOfBirth = 1935-05-15 }

## C# Func filter by age

This example filters users by age using a Func delegate.

Program.cs
  

List&lt;User&gt; users =
[
  new (1, "John", "London", "2001-04-01"),
  new (2, "Lenny", "New York", "1997-12-11"),
  new (3, "Andrew", "Boston", "1987-02-22"),
  new (4, "Peter", "Prague", "1936-03-24"),
  new (5, "Anna", "Bratislava", "1973-11-18"),
  new (6, "Albert", "Bratislava", "1940-12-11"),
  new (7, "Adam", "Trnava", "1983-12-01"),
  new (8, "Robert", "Bratislava", "1935-05-15"),
  new (9, "Robert", "Prague", "1998-03-14"),
];

var age = 60;
Func&lt;User, bool&gt; olderThan = e =&gt; GetAge(e) &gt; age;

var res = users.Where(olderThan);

foreach (var e in res)
{
    Console.WriteLine(e);
}

int GetAge(User user)
{
    var dob = DateTime.Parse(user.DateOfBirth);
    return (int)Math.Floor((DateTime.Now - dob).TotalDays / 365.25D);
}

record User(int Id, string Name, string City, string DateOfBirth);

The program filters users older than 60 using a Func delegate.

Func&lt;User, bool&gt; olderThan = e =&gt; GetAge(e) &gt; age;

The predicate uses GetAge to compute and compare user ages.

var res = users.Where(olderThan);

The Where method filters users based on the predicate.

int GetAge(User user)
{
    var dob = DateTime.Parse(user.DateOfBirth);
    return (int) Math.Floor((DateTime.Now - dob).TotalDays / 365.25D);
}

The GetAge method calculates a user's age from their birth date.

$ dotnet run
User { Id = 4, Name = Peter, City = Prague, DateOfBirth = 1936-03-24 }
User { Id = 6, Name = Albert, City = Bratislava, DateOfBirth = 1940-12-11 }
User { Id = 8, Name = Robert, City = Bratislava, DateOfBirth = 1935-05-15 }

## C# Predicate

Predicate is a specialized Func that returns a boolean,
used for single-argument predicates.

All Predicate functionality can be achieved with
Func, but Predicate offers a clearer intent.

Program.cs
  

User[] users =
[
  new (1, "John", "London", "2001-04-01"),
  new (2, "Lenny", "New York", "1997-12-11"),
  new (3, "Andrew", "Boston", "1987-02-22"),
  new (4, "Peter", "Prague", "1936-03-24"),
  new (5, "Anna", "Bratislava", "1973-11-18"),
  new (6, "Albert", "Bratislava", "1940-12-11"),
  new (7, "Adam", "Trnava", "1983-12-01"),
  new (8, "Robert", "Bratislava", "1935-05-15"),
  new (9, "Robert", "Prague", "1998-03-14"),
];

var age = 60;
Predicate&lt;User&gt; olderThan = e =&gt; GetAge(e) &gt; age;

var res = Array.FindAll(users, olderThan);

foreach (var e in res)
{
    Console.WriteLine(e);
}

int GetAge(User user)
{
    var dob = DateTime.Parse(user.DateOfBirth);
    return (int) Math.Floor((DateTime.Now - dob).TotalDays / 365.25D);
}

record User(int Id, string Name, string City, string DateOfBirth);

The example uses a Predicate to find users older than 60.

Predicate olderThan = e =&gt; GetAge(e) &gt; age;

The Predicate implicitly returns a boolean, simplifying the
signature.

var res = Array.FindAll(users, olderThan);

The Array.FindAll method filters elements matching the predicate.

int GetAge(User user)
{
    var dob = DateTime.Parse(user.DateOfBirth);
    return (int) Math.Floor((DateTime.Now - dob).TotalDays / 365.25D);
}

The GetAge method computes the user's age.

$ dotnet run
User { Id = 4, Name = Peter, City = Prague, DateOfBirth = 1936-03-24 }
User { Id = 6, Name = Albert, City = Bratislava, DateOfBirth = 1940-12-11 }
User { Id = 8, Name = Robert, City = Bratislava, DateOfBirth = 1935-05-15 }

## C# pass Func as parameter

This example passes a Func delegate as a method parameter.

Program.cs
  

List&lt;Person&gt; data =
[
    new ("John Doe", "gardener"),
    new ("Robert Brown", "programmer"),
    new ("Lucia Smith", "teacher"),
    new ("Thomas Neuwirth", "teacher")
];

ShowOutput(data, r =&gt; r.Occupation == "teacher");

void ShowOutput(List&lt;Person&gt; list, Func&lt;Person, bool&gt; condition)
{
    var data = list.Where(condition);

    foreach (var person in data)
    {
        Console.WriteLine("{0}, {1}", person.Name, person.Occupation);
    }
}

record Person(string Name, string Occupation);

The ShowOutput method filters and displays persons based on a
Func predicate.

void ShowOutput(List&lt;Person&gt; list, Func&lt;Person, bool&gt; condition)

The method accepts a Func delegate to filter the list dynamically.

$ dotnet run
Lucia Smith, teacher
Thomas Neuwirth, teacher

## C# Func compose

This example demonstrates composing Func delegates by chaining
transformations.

Program.cs
  

int[] vals = [1, 2, 3, 4, 5];

Func&lt;int, int&gt; inc = e =&gt; e + 1;
Func&lt;int, int&gt; cube = e =&gt; e * e * e;

var res = vals.Select(inc).Select(cube);

foreach (var e in res)
{
    Console.WriteLine(e);
}

The example chains Func delegates to increment and cube array
elements.

Func&lt;int, int&gt; inc = e =&gt; e + 1;
Func&lt;int, int&gt; cube = e =&gt; e * e * e;

Two Func delegates define increment and cubing operations.

var res = vals.Select(inc).Select(cube);

The Select method chains the transformations, applying them
sequentially.

$ dotnet run
8
27
64
125
216

## C# Func with async method

This example uses Func with an asynchronous method to simulate a
delayed computation.

Program.cs
  

Func&lt;Task&lt;int&gt;&gt; getRandomAsync = async () =&gt;
{
    await Task.Delay(1000); // Simulate async work
    return new Random().Next(1, 100);
};

int result = await getRandomAsync();
Console.WriteLine($"Random number: {result}");

The program defines a Func that returns a Task,
generating a random number after a delay.

## C# Func with LINQ aggregation

This example uses Func with LINQ to compute an aggregate value.

Program.cs
  

int[] numbers = [10, 20, 30, 40, 50];

Func&lt;int, int&gt; doubleValue = x =&gt; x * 2;
var sum = numbers.Select(doubleValue).Sum();

Console.WriteLine($"Sum of doubled values: {sum}");

The program doubles each number using a Func and computes the sum
with LINQ's Sum method.

## C# Func with Dynamic Parameter

This example showcases how to dynamically construct a Func delegate
in C# based on a runtime condition. The flexibility provided by
Func delegates allows developers to create reusable, encapsulated
logic that can be passed as parameters or assigned dynamically depending on the
application's requirements.

Program.cs
  

string[] words = { "apple", "banana", "cherry", "date" };

string filterType = "long"; // Can be "short" or "long"
Func&lt;string, bool&gt; filter = filterType == "long"
    ? s =&gt; s.Length &gt; 5
    : s =&gt; s.Length &lt;= 5;

var filteredWords = words.Where(filter);
foreach (var word in filteredWords)
{
    Console.WriteLine(word);
}

In this program, the Func&lt;T, TResult&gt; delegate is used to
create a predicate function that filters an array of words based on their
length. The Func&lt;T, TResult&gt; delegate represents a method
that takes a single input of type T and returns a result of type
TResult. Here, the input type is string, and the
result type is bool, which makes the Func suitable for
defining a condition that evaluates to either true or false.

The filterType variable determines the behavior of the filtering
function. If the value of filterType is set to "long," the program
assigns a lambda expression s =&gt; s.Length &gt; 5 to the
filter variable. This lambda checks whether the length of each word
is greater than 5. Conversely, if the value of filterType is
"short," a different lambda expression, s =&gt; s.Length &lt;= 5,
is assigned, which checks whether the word length is 5 or less.

The dynamically assigned Func is then passed as a predicate to the
Where method of the IEnumerable&lt;T&gt; interface.
The Where method filters the sequence of words using the condition
defined in the filter. This results in a collection containing only
the words that satisfy the specified condition. Finally, the filtered words are
iterated over and printed to the console, allowing users to see the dynamically
filtered output.

## C# Func with Error Handling

This example demonstrates how to incorporate error handling within a
Func delegate in C#. By embedding try-catch blocks directly into a
lambda expression, the program ensures robust and reliable processing, even when
faced with invalid or unexpected inputs. This approach is particularly useful
when handling dynamic data, such as user input or external data sources, where
errors are more likely to occur.

Program.cs
  

Func&lt;string, int&gt; parseNumber = s =&gt;
{
    try
    {
        return int.Parse(s);
    }
    catch (FormatException)
    {
        Console.WriteLine($"Error: '{s}' is not a valid number");
        return 0;
    }
};

string[] inputs = { "123", "abc", "456" };
var results = inputs.Select(parseNumber);

foreach (var result in results)
{
    Console.WriteLine($"Result: {result}");
}

The Func&lt;string, int&gt; delegate in this program is used to
define a lambda expression for parsing strings into integers. It encapsulates
logic for converting a string representation of a number into its integer
equivalent while handling potential exceptions gracefully. 

Error handling is integrated using a try-catch block
within the lambda expression. If the input string cannot be parsed due to an
invalid format (e.g., non-numeric characters), a FormatException is
thrown. The catch block captures this exception and provides
meaningful feedback to the user by printing an error message that specifies the
invalid input. Instead of crashing the program, the lambda expression returns a
default value of 0, allowing the application to continue processing
other inputs seamlessly.

The Select method of the IEnumerable&lt;T&gt;
interface applies the Func&lt;string, int&gt; delegate to each
element of the inputs array. This results in a collection of
integers where valid numbers are converted, and invalid inputs are replaced with
the default value of 0. The filtered results are then iterated over
using a foreach loop, and each parsed value is displayed on the
console, ensuring visibility into both successful and failed parsing attempts.

This implementation is particularly useful in scenarios where data integrity
cannot be guaranteed, such as user-entered values in a form or data retrieved
from external sources like files, APIs, or databases.

## Source

[Func delegate](https://learn.microsoft.com/en-us/dotnet/api/system.func-2?view=net-8.0)

This article explored advanced uses of the C# Func delegate,
including LINQ, async methods, and error handling.

## Author

I am Jan Bodnar, a dedicated programmer with extensive experience in software
development. Since 2007, I have authored over 1,400 programming articles and
eight e-books. With more than a decade of teaching programming, I share my
expertise through comprehensive tutorials.

List [all C# tutorials](/csharp/).