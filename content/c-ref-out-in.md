+++
title = "C# ref, out, in"
date = 2025-08-29T19:51:18.845+01:00
draft = false
description = "C# ref, out, in keywords tutorial explains the differences between the ref/out/in keywords and shows how to use them."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# ref, out, in

last modified July 5, 2023

 

C# ref, out, in keywords tutorial explains the differences between the
ref/out/in keywords and shows how to use them.

In C#, the method parameters are passed by copy by default. We use the
ref keyword to pass a value by reference. When we pass values by
reference, the method receives a reference to the actual values. The original
values are affected when modified. The ref requires that the
variable be initialized before it is passed. The ref modifier must
be used on the method definition and in a method call. The out and
in keywords are some modifications of ref.

The out keyword causes arguments to be passed by reference as well.
Unlike ref, it does not require the passed variable to be
initialized in advance. To use an out parameter, both the method
definition and the calling method must explicitly use the out
keyword. 

The in keyword causes arguments to be passed by reference but
ensures the argument is not modified. Variables passed as in
arguments must be initialized before being passed in a method call.

When overloading methods, they cannot differ in signature solely by
in, ref, and out. Overloading is possible 
when one method does not have one of modifiers and the other has. 

The in, ref, and out modifiers have the 
following restrictions:

    - they cannot be used in async methods

    they cannot be used in interator methods, which include a yield return
    or yield break statement

## C# ref modifier example

The following example uses the ref keyword to change the values of 
two variables.

Program.cs
  

int a = 4;
int b = 7;

Console.WriteLine("Outside Swap method");
Console.WriteLine($"a is {a}");
Console.WriteLine($"b is {b}");

Swap(ref a, ref b);

Console.WriteLine("Outside Swap method");
Console.WriteLine($"a is {a}");
Console.WriteLine($"b is {b}");

void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;

    Console.WriteLine("Inside Swap method");
    Console.WriteLine($"a is {a}");
    Console.WriteLine($"b is {b}");
}

The original variables are changed inside the Swap method.

Swap(ref a, ref b); 
...
void Swap(ref int a, ref int b)

Notice that both the method call and the method definition use the
ref keyword.

$ dotnet run 
Outside Swap method
a is 4
b is 7
Inside Swap method
a is 7
b is 4
Outside Swap method
a is 7
b is 4

## C# out modifier example

The following example uses the out modifier.

Program.cs
  

ReadName(out string? name);
Console.WriteLine(name);

void ReadName(out string? name) {

    Console.Write("Enter your name: ");
    name = Console.ReadLine();
}

In the example, we read an input from the user. The input is stored in a
variable, which has the out modifier. The name
variable is not defined before it is being used.

ReadName(out string? name);
...
void ReadName(out string? name) {

The out keyword is used with the method call and definition.

$ dotnet run 
Enter your name: Peter
Peter

## C# in modifier example

In the following example, we use the in modifier.

Program.cs
  

string msg = "an old falcon";
Modify(in msg);

void Modify(in string msg) {

    msg = "a young eagle";
}    

We try to modify the msg variable, but the compilation ends with an
error message: error CS8331: Cannot assign to variable 'in string' because
it is a readonly variable

## Source

[C# language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/)

In this article we have presented the C# ref, out, &amp; in keywords.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).