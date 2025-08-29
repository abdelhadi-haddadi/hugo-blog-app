+++
title = "C# method"
date = 2025-08-29T19:51:05.963+01:00
draft = false
description = "C# method tutorial covers C# methods. Methods change the state of the created objects created."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# method

last modified July 5, 2023

 

In this article we cover C# methods.

In object oriented programming, we work with objects. Objects are the basic
building blocks of a program. Objects consists of data and methods. Methods
change the state of the created objects. They are the dynamic part of the
objects; data is the static part.

## C# method definition

A method is a code block containing a series of statements. Methods must be
declared within a class, struct, or interface. It is a good programming practice
that methods do only one specific task. Methods bring modularity to programs.
Proper use of methods bring the following advantages:

- Reducing duplication of code

- Decomposing complex problems into simpler pieces

- Improving clarity of the code

- Reuse of code

- Information hiding

## C# method characteristics

Basic characteristics of methods are:

  - Access level

  - Return value type

  - Method name

  - Method parameters

  - Parentheses

  - Block of statements

Access level of methods is controlled with access modifiers. They set the
visibility of methods. They determine who can call the method. Methods may
return a value to the caller. In case our method returns a value, we provide its
data type. If not, we use the void keyword to indicate that our
method does not return values. 

Method parameters are surrounded by parentheses and separated by commas. Empty
parentheses indicate that the method requires no parameters. The method block is
surrounded with { } characters. The block contains one or more statements that
are executed, when the method is *invoked*. It is legal to have an empty
method block.

## C# method signature

A *method signature* is a unique identification of a method for the C#
compiler. The signature consists of a method name and the type and kind (value,
reference, or output) of each of its formal parameters. Method signature does
not include the return type.

Any legal character can be used in the name of a method. By convention, method
names begin with an uppercase letter. The method names are verbs or verbs
followed by adjectives or nouns. Each subsequent word starts with an uppercase
character. The following are typical names of methods in C#:

  - Execute

  - FindId

  - SetName

  - GetName

  - CheckIfValid

  - TestValidity

## C# simple method example

We start with a simple example.

Program.cs
  

var bs = new Base();
bs.ShowInfo();

class Base
{
    public void ShowInfo()
    {
        Console.WriteLine("This is Base class");
    }
}

We have a ShowInfo method that prints the name of its class.

class Base
{
    public void ShowInfo()
    {
        Console.WriteLine("This is Base class");
    }
}

Each method must be defined inside a class or a structure. It must have a name.
In our case the name is ShowInfo. The keywords that precede the
name of the method are access specifier and the return type. Parentheses follow
the name of the method. They may contain parameters of the method. Our method
does not take any parameters.

static void Main()
{
   ...
}

This is the Main method. It is the entry point to each console or
GUI application. It must be declared static. We will see later why.
The return type for a Main method may be void or 
int. The access specifier for the Main method is
omitted. In such a case a default one is used, which is private. 

It is not recommended to use public access specifier for the
Main method. It is not supposed to be called by any other methods
in the assemblies. It is only the CLR that should be able to call it when the
application starts.

var bs = new Base();
bs.ShowInfo();

We create an instance of the Base class. We call the
ShowInfo method upon the object. We say that the method is an
instance method, because it needs an instance to be called. The method is called
by specifying the object instance, followed by the member access operator — the
dot, followed by the method name.

## C# method parameters

A parameter is a value passed to the method. Methods can take one or more
parameters. If methods work with data, we must pass the data to the methods. We
do it by specifying them inside the parentheses. In the method definition, we
must provide a name and type for each parameter.

Program.cs
  

var a = new Addition();
int x = a.AddTwoValues(12, 13);
int y = a.AddThreeValues(12, 13, 14);

Console.WriteLine(x);
Console.WriteLine(y);

class Addition
{
    public int AddTwoValues(int x, int y)
    {
        return x + y;
    }

    public int AddThreeValues(int x, int y, int z)
    {
        return x + y + z;
    }
}

In the above example, we have two methods. One of them
takes two parameters, the other one takes three parameters.

public int AddTwoValues(int x, int y)
{
    return x + y;
}

The AddTwoValues method takes two parameters. These parameters have
int type. The method also returns an integer to the caller. We use
the return keyword to return a value from the method.

public int AddThreeValues(int x, int y, int z)
{
    return x + y + z;
}

The AddThreeValues is similar to the previous method. It takes
three parameters.

int x = a.AddTwoValues(12, 13);

We call the AddTwoValues method of the addition object. It takes
two values. These values are passed to the method. The method returns a value
which is assigned to the x variable.

## C# variable number of arguments

A method can take variable number of arguments. For this we use the
params keyword. No additional parameters are permitted after
the params keyword. Only one params keyword
is permitted in a method declaration.

Program.cs
  

Sum(1, 2, 3);
Sum(1, 2, 3, 4, 5);

void Sum(params int[] list)
{
    Console.WriteLine($"There are {list.Length} items");

    int sum = 0;

    foreach (int i in list)
    {
        sum = sum + i;
    }

    Console.WriteLine($"Their sum is {sum}");
}

We create a Sum method which can take variable number of arguments.
The method will calculate the sum of values passed to the method.

Sum(1, 2, 3);
Sum(1, 2, 3, 4, 5);

We call the Sum method twice. In one case, it takes 3 arguments,
in the second case 5. We call the same method.

void Sum(params int[] list)
{
...
}

The Sum method can take variable number of integer values. All
values are added to the list array.

Console.WriteLine($"There are {list.Length} items");

We print the length of the list array.

int sum = 0;

foreach (int i in list)
{
    sum = sum + i;
}

We compute the sum of the values in the list.

$ dotnet run
There are 3 items
Their sum is 6
There are 5 items
Their sum is 15

## C# returning tuples

C# methods can return multiple values by using tuples.

Program.cs
  

var vals = new List&lt;int&gt; { 11, 21, 3, -4, -15, 16, 5 };

(int min, int max, int sum) = BasicStats(vals);

Console.WriteLine($"Minimum: {min}, Maximum: {max}, Sum: {sum}");

(int, int, int) BasicStats(List&lt;int&gt; vals)
{
    int sum = vals.Sum();
    int min = vals.Min();
    int max = vals.Max();

    return (min, max, sum);
}

We have the BasicStats method, which returns the basic statistics
of a list of integers.

var vals = new List&lt;int&gt; { 11, 21, 3, -4, -15, 16, 5 };

We have a list of integer values. We want to compute some basic statistics
from these values.

(int min, int max, int sum) = BasicStats(vals);

We use a deconstruction operation to assign the tuple elements into three
variables.

(int, int, int) BasicStats(List&lt;int&gt; vals)
{

The method declaration specifies that we return a tuple.

return (min, max, sum);

We return a tuple of three elements.

$ dotnet run
Minimum: -15, Maximum: 21, Sum: 37

## C# anonymous methods

Anonymous methods are inline methods that do not have a name. Anonymous methods
reduce the coding overhead by eliminating the need to create a separate method.
Without anonymous methods developers often had to create a class just to call
one method.

Program.cs
  

using System.Timers;
using MyTimer = System.Timers.Timer;

var timer = new MyTimer();

timer.Elapsed += (object? _, ElapsedEventArgs e) =&gt; 
     Console.WriteLine($"Event triggered at {e.SignalTime}");

timer.Interval = 2000;
timer.Enabled = true;

Console.ReadLine();

We create a timer object and every 2 seconds we call an anonymous
method.

using MyTimer = System.Timers.Timer;

To avoid ambiguity, we create an alias for the System.Timers.Timer
class.

var timer = new MyTimer();

A MyTimer class generates recurring events in an application.

timer.Elapsed += (object? _, ElapsedEventArgs e) =&gt;
    Console.WriteLine($"Event triggered at {e.SignalTime}");

Here we plug the anonymous method to the Elapsed event.

Console.ReadLine();

At this moment, the program waits for an input from the user. The program ends
when we hit the Return key. Otherwise, the program would finish immediately
before the events could be generated.

## C# passing arguments by value, by reference

C# supports two ways of passing arguments to methods: by value and by reference.
The default passing of arguments is by value. When we pass arguments by value,
the method works only with the copies of the values. This may lead to
performance overheads when we work with large amounts of data.

We use the ref keyword to pass a value by reference. When we pass
values by reference, the method receives a reference to the actual values. The
original values are affected when modified. This way of passing values is more
time and space efficient. On the other hand, it is more error prone.

Which way of passing arguments should we use? It depends on the situation. Say
we have a set of data, for example salaries of employees. If we want to compute
some statistics of the data, we do not need to modify them. We can pass by
values. If we work with large amounts of data and the speed of computation is
critical, we pass by reference. If we want to modify the data, e.g. do some
reductions or raises to the salaries, we might pass by reference.

The following example shows how we pass arguments by values.

Program.cs
  

int a = 4;
int b = 7;

Console.WriteLine("Outside Swap method");
Console.WriteLine($"a is {a}");
Console.WriteLine($"b is {b}");

Swap(a, b);

Console.WriteLine("Outside Swap method");
Console.WriteLine($"a is {a}");
Console.WriteLine($"b is {b}");

void Swap(int a, int b)
{
    int temp = a;
    a = b;
    b = temp;

    Console.WriteLine("Inside Swap method");
    Console.WriteLine($"a is {a}");
    Console.WriteLine($"b is {b}");
}

The Swap method swaps the numbers between the a
and b variables. The original variables are not affected.

int a = 4;
int b = 7;

At the beginning, these two variables are initiated. 

Swap(a, b);

We call the Swap method. The method takes a and
b variables as arguments.

int temp = a;
a = b;
b = temp;

Inside the Swap method, we change the values. Note that the
a and b variables are defined locally. They are
valid only inside the Swap method.

$ dotnet run
Outside Swap method
a is 4
b is 7
Inside Swap method
a is 7
b is 4
Outside Swap method
a is 4
b is 7

The output shows that the original variables were not affected.

The next code example passes values to the method by reference. The original
variables are changed inside the Swap method. Both the method
definition and the method call must use the ref keyword.

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

In this example, calling the Swap method changes the original
values.

Swap(ref a, ref b);

We call the method with two arguments. They are preceded by the
ref keyword to indicate that we are passing arguments by reference.

void Swap(ref int a, ref int b)
{
...
}

Also in the method declaration, we use the ref keyword to inform
the compiler that we accept references to the parameters and not the values.

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

Here we see that the Swap method really changed the values of the
variables.

The out keyword is similar to the ref keyword. The
difference is that when using the ref keyword, the variable must be
initialized before it is being passed. With the out keyword, it may
not be initialized. Both the method definition and the method call must use the
out keyword.

Program.cs
  

int val;
SetValue(out val);

Console.WriteLine(val);

void SetValue(out int i)
{
    i = 12;
}

An example shows the usage of the out keyword.

int val;
SetValue(out val);

The val variable is declared, but not initialized. We pass the variable to the
SetValue method.

void SetValue(out int i)
{
    i = 12;
}

Inside the SetValue method it is assigned a value which
is later printed to the console.

## C# method overloading

*Method overloading* allows the creation of several methods with the same
name which differ from each other in the type of the input.

What is method overloading good for? The Qt5 library gives a nice example for
the usage. The QPainter class has three methods to draw a
rectangle. Their name is drawRect and their parameters differ. One
takes a reference to a floating point rectangle object, another takes a
reference to an integer rectangle object, and the last one takes four
parameters: x, y, width, height. If the C++ language, which is the language in
which Qt is developed, didn't have method overloading, the creators of the
library would have to name the methods like drawRectRectF,
drawRectRect, drawRectXYWH. The solution with method
overloading is more elegant.

Program.cs
  

var s = new Sum();

Console.WriteLine(s.GetSum());
Console.WriteLine(s.GetSum(20));
Console.WriteLine(s.GetSum(20, 30));

class Sum
{
    public int GetSum()
    {
        return 0;
    }

    public int GetSum(int x)
    {
        return x;
    }

    public int GetSum(int x, int y)
    {
        return x + y;
    }
}

We have three methods called GetSum. They differ in input
parameters.

public int GetSum(int x)
{
    return x;
}

This one takes one parameter.

Console.WriteLine(s.GetSum());
Console.WriteLine(s.GetSum(20));
Console.WriteLine(s.GetSum(20, 30));

We call all three methods.

$ dotnet run
0
20
50

## C# recursion

Recursion, in mathematics and computer science, is a way of defining methods in
which the method being defined is applied within its own definition. In other
words, a recursive method calls itself to do its job. Recursion is a widely used
approach to solve many programming tasks.

A typical example is the calculation of a factorial.

Program.cs
  

Console.WriteLine(Factorial(6));
Console.WriteLine(Factorial(10));

int Factorial(int n)
{
    if (n == 0)
    {
        return 1;
    }
    else
    {
        return n * Factorial(n - 1);
    }
}

In this code example, we calculate the factorial of two numbers.

return n * Factorial(n-1);

Inside the body of the factorial method, we call the factorial method
with a modified argument. The function calls itself.

$ dotnet run
720
3628800

## C# method scope

A variable declared inside a method has a method scope. The *scope* of a
name is the region of program text within which it is possible to refer to the
entity declared by the name without the qualification of the name. A variable
which is declared inside a method has a method scope. It is also called a local
scope. The variable is valid only in this particular method.

Program.cs
  

var ts = new Test();
ts.exec1();
ts.exec2();

class Test
{
    int x = 1;

    public void exec1()
    {
        Console.WriteLine(this.x);
        Console.WriteLine(x);
    }

    public void exec2()
    {
        int z = 5;

        Console.WriteLine(x);
        Console.WriteLine(z);
    }
}

In the preceding example, we have the x variable defined outside
the exec1 and exec2 methods. The variable has a class
scope. It is valid everywhere inside the definition of the
Test class, e.g. between its curly brackets.

public void exec1()
{
    Console.WriteLine(this.x);
    Console.WriteLine(x);
}

The x variable, also called the x field, is an instance variable. And so it is
accessible through the this keyword. It is also valid inside the
exec1 method and can be referred by its bare name. Both statements
refer to the same variable.

public void exec2()
{
    int z = 5;

    Console.WriteLine(x);
    Console.WriteLine(z);
}

The x variable can be accessed also in the exec2 method. The
z variable is defined in the exec2 method. It has
a method scope. It is valid only in this method.

$ dotnet run
1
1
1
5

A variable defined inside a method has a local/method scope. If a local
variable has the same name as an instance variable, it *shadows* the
instance variable. The class variable is still accessible inside the method by
using the this keyword.

Program.cs
  

var ts = new Test();
ts.exec();

class Test
{
    int x = 1;

    public void exec()
    {
        int x = 3;

        Console.WriteLine(this.x);
        Console.WriteLine(x);
    }
}

In the example, we declare the x variable outside the
exec method and inside the exec method. Both variables
have the same name, but they are not in conflict because they live in different
scopes.

Console.WriteLine(this.x);
Console.WriteLine(x);

The variables are accessed differently. The x variable defined
inside the method, also called the local variable, is simply accessed by its
name. The instance variable can be referred by using the this
keyword.

$ dotnet run
1
3

## C# static methods

Static methods are called without an instance of the object. To call a static
method, we use the name of the class and the dot operator. Static methods can
only work with static member variables. Static methods are often used to
represent data or calculations that do not change in response to object state.
An example is a math library which contains static methods for various
calculations. We use the static keyword to declare a static method.
When no static modifier is present, the method is said to be an instance method.
We cannot use the this keyword in static methods. It can be used in
instance methods only.

The Main method is an entry point to the C# console and GUI
application. In C#, the Main method is required to be static.
Before the application starts, no object is created yet. To invoke non-static
methods, we need to have an object instance. Static methods exist before a class
is instantiated so static is applied to the main entry point.

Program.cs
  

namespace StaticMethod;

class Basic
{
    static int Id = 2321;

    public static void ShowInfo()
    {
        Console.WriteLine("This is Basic class");
        Console.WriteLine($"The Id is: {Id}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Basic.ShowInfo();
    }
}

In our code example, we define a static ShowInfo method.

static int Id = 2321;

A static method can only work with static variables.

public static void ShowInfo()
{
    Console.WriteLine("This is Basic class");
    Console.WriteLine($"The Id is: {Id}");
}

This is our static ShowInfo method. It works with a static Id
member.

Basic.ShowInfo();

To invoke a static method, we do not need an object instance. We call the method
by using the name of the class and the dot operator.

$ dotnet run
This is Basic class
The Id is: 2321

## C# hiding methods

When a derived class inherits from a base class, it can define methods that are
already present in the base class. We say that we *hide* the method of
the class that we have derived from. To explicitly inform the compiler about our
intention to hide a method, we use the new keyword. Without this
keyword, the compiler issues a warning.

Program.cs
  

var d = new Derived();
d.Info();

class Base
{
    public void Info()
    {
        Console.WriteLine("This is Base class");
    }
}

class Derived : Base
{
    public new void Info()
    {
        base.Info();
        Console.WriteLine("This is Derived class");
    }
}

We have two classes: the Derived and the Base class.
The Derived class inherits from the Base class. Both
have a method called Info.

class Derived : Base
{
...
}

The (:) character is used to inherit from a class.

public new void Info()
{
    base.Info();
    Console.WriteLine("This is Derived class");
}

This is an implementation of the Info method in the
Derived class. We use the new keyword to inform
the compiler that we are hiding a method from the base class. Note that
we can still reach the original Info method. With the help of
the base keyword, we invoke the Info
method of the Base class too.

$ dotnet run
This is Base class
This is Derived class

We have invoked both methods.

## C# overriding methods

Now we introduce two new keywords: the virtual
keyword and the override keyword. They are both method modifiers.
They are used to implement polymorphic behaviour of objects. 

The virtual keyword creates a virtual method. Virtual methods can
be redefined in derived classes. Later in the derived class we use the
override keyword to redefine the method in question. If the method
in the derived class is preceded with the override
keyword, objects of the derived class calls that method rather than the base
class method.

Program.cs
  

Base[] objs = { new Base(), new Derived(), new Base(),
                        new Base(), new Base(), new Derived() };

foreach (Base obj in objs)
{
    obj.Info();
}

class Base
{
    public virtual void Info()
    {
        Console.WriteLine("This is Base class");
    }
}

class Derived : Base
{
    public override void Info()
    {
        Console.WriteLine("This is Derived class");
    }
}

We create an array of the Base and Derived
objects. We go through the array and invoke the Info
method upon all of them.

public virtual void Info()
{
    Console.WriteLine("This is Base class");
}

This is the virtual method of the Base class. It is expected to be
overridden in the derived classes.

public override void Info()
{
    Console.WriteLine("This is Derived class");
}

We override the base Info method in the Derived
class. We use the override keyword.

Base[] objs = { new Base(), new Derived(), new Base(),
                new Base(), new Base(), new Derived() };

Here we create an array of Base and Derived
objects. Note that we used the Base type in our array declaration.
This is because a Derived class can be converted to the
Base class because it inherits from it. The opposite is not true.
The only way to have both objects in one array is to use a type which is top
most in the inheritance hierarchy for all possible objects.

foreach (Base obj in objs)
{
    obj.Info();
}

We traverse the array and call Info on all objects in the array.

$ dotnet run
This is Base class
This is Derived class
This is Base class
This is Base class
This is Base class
This is Derived class

Now change the override keyword for new keyword.
Compile the example again and run it.

$ dotnet run
This is Base class
This is Base class
This is Base class
This is Base class
This is Base class
This is Base class

This time we have a different output.

## C# local functions

C# 7.0 introduced local functions. These are functions defined inside other
methods.

Program.cs
  

namespace LocalFunction;

class Program
{
    static void Main(string[] args)
    {
        Console.Write("Enter your name: ");

        string? name = Console.ReadLine();
        string message = BuildMessage(name);

        Console.WriteLine(message);

        string BuildMessage(string? value)
        {
            string msg = $"Hello {value}!";

            return msg;
        }
    }
}

In the example, we have a local function BuildMessage, which is
defined and called inside the Main method.

## C# sealed methods

A sealed method overrides an inherited virtual method with the same signature. A
sealed method shall also be marked with the override modifier. Use of the
sealed modifier prevents a derived class from further overriding
the method. The word *further* is important. First, a method must be
virtual. It must be later overridden. And at this point, it can be sealed.

Program.cs
  

namespace SealedMethod;

class A
{
    public virtual void F()
    {
        Console.WriteLine("A.F");
    }

    public virtual void G()
    {
        Console.WriteLine("A.G");
    }
}

class B : A
{
    public override void F()
    {
        Console.WriteLine("B.F");
    }

    public sealed override void G()
    {
        Console.WriteLine("B.G");
    }
}

class C : B
{
    public override void F()
    {
        Console.WriteLine("C.F");
    }

    /*public override void G()
    {
        Console.WriteLine("C.G");
    }*/
}

class SealedMethods
{
    static void Main(string[] args)
    {
        B b = new B();
        b.F();
        b.G();

        C c = new C();
        c.F();
        c.G();
    }
}

In the preceding example, we seal the method G in class B.

public sealed override void G()
{
    Console.WriteLine("B.G");
}

The method G overrides a method with the same name in the ancestor
of the B class. It is also sealed to prevent from further
overriding the method.

/*public override void G()
{
    Console.WriteLine("C.G");
}*/

These lines are commented because otherwise the code example would not compile.
The compiler would give the following error: Program.cs(38,30): error CS0239:
'C.G()': cannot override inherited member 'B.G()' because it is sealed

c.G();

This line prints "B.G" to the console.

$ dotnet run
B.F
B.G
C.F
B.G

## C# expression body definitions for methods

Expression body definitions for methods allow us to define a method
implementation in a very concise, readable form.

method declaration =&gt; expression

Program.cs
  

```
var user = new User();
user.Name = "John Doe";
user.Occupation = "gardener";

Console.WriteLine(user);

class User
{
    public string Name { get; set; }
    public string Occupation { get; set; }

    public override string ToString() =&gt; $"{Name} is a {Occupation}";
}

```

In the example, we provide the body of the ToString method with
an expression body definition.

public override string ToString() =&gt; $"{Name} is a {Occupation}";

The expression body definition simplifies the syntax.

In this article we have covered C# methods.

 ## Source

[Methods - programming guide](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/methods)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).