+++
title = "C# switch expression"
date = 2025-08-29T19:51:32.274+01:00
draft = false
description = "C# switch expression tutorial shows how to use switch expressions in C#. A switch expression is a more powerfula and concise alternative to the traditional switch statement."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# switch expression

last modified January 19, 2024

 

In this article we show how to use switch expressions in C#.

*Switch expressions* are a powerful enhancement for the classic
*switch statements*. They consists of arms each of which returns a value.

The arms may evaluate the following:

    - values

    - types

    - relational logic

    - when guards

    - properties

    - tuples

    - lists

## C# switch expression value pattern

With a value pattern, the switch arms are based on constant values such as
integers or strings.

Program.cs
  

Console.Write("Enter a domain name: ");

string? domain = Console.ReadLine();

domain = domain?.Trim().ToLower();

string result = domain switch
{
    "us" =&gt; "United States",
    "de" =&gt; "Germany",
    "sk" =&gt; "Slovakia",
    "hu" =&gt; "Hungary",

    _ =&gt; "Unknown"
};

Console.WriteLine(result);

In the example, we use a switch expression to map a country name to its domain
name.

$ dotnet run
Enter a domain name: sk
Slovakia
# dotnet run
Enter a domain name: jp
Unknown

## C# switch expression type pattern

Data types can be patterns to the switch expression.

Program.cs
  

int age = 23;
string name = "Peter";

List&lt;string&gt; colors = ["blue", "khaki", "orange"];
int[] nums = [1, 2, 3, 4, 5];

Console.WriteLine(check(age));
Console.WriteLine(check(name));
Console.WriteLine(check(colors));
Console.WriteLine(check(nums));

object check(object val) =&gt; val switch
{
    int =&gt; "integer",
    string =&gt; "string",
    List&lt;string&gt; =&gt; "list of strings",
    Array =&gt; "array",
    _ =&gt; "unknown"
};

In the example, we find out the data type of a variable using switch expression.

$ dotnet run
integer
string
list of strings
array

## C# switch expression relational pattern

Powerful logic can be constructed with relational patterns.

Program.cs
  

List&lt;int&gt; nums = [-3, 2, 0, 1, 9, -2, 7];

foreach (var num in nums)
{
    var res = num switch
    {
        &lt; 0 =&gt; "negative",
        0 =&gt; "zero",
        &gt; 0 =&gt; "positive"
    };

    Console.WriteLine($"{num} is {res}");
}

We have a list of integers. In a foreach loop, we go through the list and print
whether the value is negative, positive, or zero with a switch expression.
Inside the switch expression, we use simple relational expressions.

$ dotnet run
-3 is negative
2 is positive
0 is zero
1 is positive
9 is positive
-2 is negative
7 is positive

## C# switch expression when guards

Using when guards adds some additional flexibility to our expression arms.

Program.cs
  

List&lt;User&gt; users =
[
    new ("John", "Doe", 34),
    new ("Roger", "Roe", 44),
    new ("Jane", "Doe", 44),
    new ("Robert", "Molnar", 41),
    new ("Lucia", "Petrovicova", 16),
];

foreach (var user in users)
{
    Console.WriteLine(checkPerson(user));
}

string checkPerson(User u)
{
    return u switch
    {
        { LastName: "Doe" } =&gt; "Doe family",
        { Age: var age } when age &lt; 18 =&gt; "minor person",
        _ =&gt; $"{u}"
    };
}

record User(string FirstName, string LastName, int Age);

In the example, we use a when guard to account for users younger than 18.

$ dotnet run
Doe family
User { FirstName = Roger, LastName = Roe, Age = 44 }
Doe family
User { FirstName = Robert, LastName = Molnar, Age = 41 }
minor person

## C# switch expression logical pattern

The and and or operators can be used in switch
expressions.

Program.cs
  

List&lt;User&gt; users =
[
    new ("Peter Novak", "driver", new DateTime(2000, 12, 1)),
    new ("John Doe", "gardener", new DateTime(1996, 2, 10)),
    new ("Roger Roe", "teacher", new DateTime(1976, 5, 9)),
    new ("Lucia Smith", "student", new DateTime(2007, 8, 18)),
    new ("Roman Green", "retired", new DateTime(1945, 7, 21)),
];

foreach (var user in users)
{
    int age = GetAge(user);

    string res = age switch
    {
        &gt; 65 =&gt; "senior",
        &gt;= 18 and &lt;= 64 =&gt; "adult",
        &lt; 18 =&gt; "minor",
        _ =&gt; "unknown",
    };

    Console.WriteLine($"{user.Name} is {res}");
}

int GetAge(User user)
{
    return (int)Math.Floor((DateTime.Now - user.Dob).TotalDays / 365.25D);
}

record User(string Name, string Occupation, DateTime Dob);

Logical and operator is used to assign the adult string to users
with age range between 18 and 65.

$ dotnet run
Peter Novak is adult
John Doe is adult
Roger Roe is adult
Lucia Smith is minor
Roman Green is senior

In the following example, we have an or expression.

Program.cs
  

var q = @"
WWI started in:

1) 1912
2) 1914
3) 1918
";

Console.WriteLine(q);

var inp = Console.ReadLine();
var ans = int.Parse(inp.Trim());

var res = ans switch
{
    1 or 3 =&gt; "Incorrect",
    2 =&gt; "correct",
    _ =&gt; "unknown option"
};

Console.WriteLine(res);

The example examines the input from a user and uses an or
expression in the switch expression.

## C# switch expression property pattern

The values of object properties can be patterns in a switch expression.

Program.cs
  

List&lt;Product&gt; products =
[
    new ("Product A", 70m, 1, 10),
    new ("Product B", 50m, 3, 15),
    new ("Product C", 35m, 2, 20)
];

foreach (var product in products)
{
    decimal sum = product switch
    {
        Product { Quantity: 2 } =&gt;
                product.Price * product.Quantity * (1 - product.Discount / 100m),
        _ =&gt; product.Price * product.Quantity,
    };

    Console.WriteLine($"The final sum for {product.Name} is {sum}");
}

record Product(string Name, decimal Price, int Quantity, int Discount);

In the example, we apply a discount to the price of a product if we have bought
two items of the product.

$ dotnet run
The final sum for Product A is 70
The final sum for Product B is 150
The final sum for Product C is 56.0

Twenty percent discount was applied to Product C.

## C# switch expression tuple pattern

Tuple pattern can be used by switch expressions.

Program.cs
  

while (true)
{
    var menu = "Select: \n1 -&gt; rock\n2 -&gt; paper\n3 -&gt; scissors\n4 -&gt; finish";
    Console.WriteLine(menu);

    string[] options = {"rock", "paper", "scissors"};

    int val;

    try {

        var line = Console.ReadLine();
        if (string.IsNullOrEmpty(line))
        {
            Console.WriteLine("Invalid choice");
            continue;
        }

        val = int.Parse(line);
    } catch (FormatException)
    {
        Console.WriteLine("Invalid choice");
        continue;
    }

    if (val == 4)
    {
        break;
    }

    if (val &lt; 1 || val &gt; 4)
    {
        Console.WriteLine("Invalid choice");
        continue;
    }

    string human = options[val-1];

    var rnd = new Random();
    int n = rnd.Next(0, 3);

    string computer = options[n];

    Console.WriteLine($"I have {computer}, you have {human}");

    var res = RockPaperScissors(human, computer);

    Console.WriteLine(res);
}

Console.WriteLine("game finished");

string RockPaperScissors(string human, string computer) =&gt; (human, computer) switch
{
    ("rock", "paper") =&gt; "Rock is covered by paper. You loose",
    ("rock", "scissors") =&gt; "Rock breaks scissors. You win.",
    ("paper", "rock") =&gt; "Paper covers rock. You win.",
    ("paper", "scissors") =&gt; "Paper is cut by scissors. You loose.",
    ("scissors", "rock") =&gt; "Scissors are broken by rock. You loose.",
    ("scissors", "paper") =&gt; "Scissors cut paper. You win.",
    (_, _) =&gt; "tie"
};

We have a Rock paper scissors game in which we utilize the tuple expression.

string RockPaperScissors(string human, string computer) =&gt; (human, computer) switch
{
    ("rock", "paper") =&gt; "Rock is covered by paper. You loose",
    ("rock", "scissors") =&gt; "Rock breaks scissors. You win.",
...

From the human and computer choices we form tuples which are used as patterns
in the switch expression to reach the game conclusion.

$ dotnet run
Select:
1 -&gt; rock
2 -&gt; paper
3 -&gt; scissors
4 -&gt; finish
1
I have rock, you have rock
tie
Select:
1 -&gt; rock
2 -&gt; paper
3 -&gt; scissors
4 -&gt; finish
2
I have paper, you have paper
tie
Select:
1 -&gt; rock
2 -&gt; paper
3 -&gt; scissors
4 -&gt; finish
3
I have paper, you have scissors
Scissors cut paper. You win.
Select:
1 -&gt; rock
2 -&gt; paper
3 -&gt; scissors
4 -&gt; finish
4
game finished

## List patterns

Since C# 11, switch expression arms can evaluate list patterns.

Program.cs
  

List&lt;Student&gt; students = [
    new ("John", ['a', 'b', 'a', 'c', 'd', 'd', 'e']),
    new ("Lucia", ['b', 'b', 'c', 'c', 'a', 'e', 'e']),
    new ("Paul", ['a', 'b', 'a', 'c', 'b', 'e', 'e']),
    new ("Roger", ['a', 'c', 'c', 'c', 'a', 'b', 'e']),
    new ("Michal", ['b', 'b', 'c', 'c', 'a', 'e', 'e']),
];

foreach (var student in students)
{
    string res = student.Answers switch
    {
        ['b', 'b', 'c', 'c', 'a', 'e', 'e'] =&gt; $"{student.Name} has passed",
        _ =&gt; $"{student.Name} has failed"
    };

    Console.WriteLine(res);
}

record Student(string Name, List&lt;char&gt; Answers);

Students are having a test with seven questions. The questions have answers
'a' through 'e'. To pass a test, all questions must be answered correctly.

List&lt;Student&gt; students = [
    new ("John", ['a', 'b', 'a', 'c', 'd', 'd', 'e']),
    new ("Lucia", ['b', 'b', 'c', 'c', 'a', 'e', 'e']),
    new ("Paul", ['a', 'b', 'a', 'c', 'b', 'e', 'e']),
    new ("Roger", ['a', 'c', 'c', 'c', 'a', 'b', 'e']),
    new ("Michal", ['b', 'b', 'c', 'c', 'a', 'e', 'e']),
];

This is a list of students and their test answers.

string res = student.Answers switch
{
    ['b', 'b', 'c', 'c', 'a', 'e', 'e'] =&gt; $"{student.Name} has passed",
    _ =&gt; $"{student.Name} has failed"
};

We check results against the correct one. The pattern is a list of characters
that represent correct answers.

$ dotnet run
John has failed
Lucia has passed
Paul has failed
Roger has failed
Michal has passed

## Source

[switch expression - pattern matching expressions using the switch keyword](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/switch-expression)

In this article we have presented C# switch expression.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).