+++
title = "C# delegate"
date = 2025-08-29T19:50:40.824+01:00
draft = false
description = "C# delegate tutorial shows how to work with delegates in C#. A delegate is a form of type-safe function pointer."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# delegate

last modified July 5, 2023

 

In this article we work with delegates in C#.

## Delegate definition

A delegate is a form of type-safe method pointer. It references methods with 
a specific parameter list and return type.

A delegate is a reference type. But instead of referring to an object, a
delegate refers to a method. We can invoke can referenced method through the
delegate instance.

Delegates are used in the following cases:

  - Event handlers

  - Callbacks

  - Passing methods as method parameters

  - LINQ

  - Implementation of design patterns

There is nothing that is done with delegates that cannot be done with regular
methods. Delegates are used because they bring several advantages. They foster
flexibility of the application and code reuse. When we need to decide which
method to call at runtime, we use a delegate. 

## C# using delegates

We have some simple examples showing how to use delegates.

Program.cs
  

var md = new MyDelegate(MyCallback);
md();

void MyCallback()
{
    Console.WriteLine("Calling callback");
}

delegate void MyDelegate();

We declare a delegate, create an instance of the delegate and invoke it.

var md = new MyDelegate(MyCallback);

We create an instance of the delegate. When called, the delegate will
invoke the Callback method.

md();

We call the delegate.

delegate void MyDelegate();

This is our delegate declaration. It returns no value and takes no parameters.

$ dotnet run
Calling callback

We can use a different syntax for creating and using a delegate.

Program.cs
  

MyDelegate del = MyCallback;
del();

void MyCallback()
{
    Console.WriteLine("Calling callback");
}

delegate void MyDelegate();

We can save some typing when creating an instance of a delegate.

MyDelegate del = MyCallback;

This is another way of creating a delegate. We point directly to the method
name.

## C# delegate pointing to different methods

A delegate can point to different methods over time.

Program.cs
  

var per = new Person("Fabius", "Maximus");

var nDelegate = new NameDelegate(per.ShowFirstName);
nDelegate("Call 1:");

nDelegate = new NameDelegate(per.ShowSecondName);
nDelegate("Call 2:");

public delegate void NameDelegate(string msg);

public class Person
{
    public string firstName;
    public string secondName;

    public Person(string firstName, string secondName)
    {
        this.firstName = firstName;
        this.secondName = secondName;
    }

    public void ShowFirstName(string msg)
    {
        Console.WriteLine($"{msg} {this.firstName}");
    }

    public void ShowSecondName(string msg)
    {
        Console.WriteLine($"{msg} {this.secondName}");
    }
}

In the example we have one delegate. This delegate is used to point to two
methods of the Person class. The methods are called with the
delegate.

var nDelegate = new NameDelegate(per.ShowFirstName);
nDelegate("Call 1:");

We create an instance of a new delegate that points to the
ShowFirstName method. Later we call the method via the delegate.

public delegate void NameDelegate(string msg);

The delegate is created with a delegate keyword. The delegate
signature must match the signature of the method being called with the delegate.

$ dotnet run
Call 1: Fabius
Call 2: Maximus

Both names are printed via the delegate.

## C# multicast delegate

Multicast delegate is a delegate which holds a reference to
more than one method. Multicast delegates must contain only
methods that return void, else there is a run-time exception.

Program.cs
  

var del = new MyDelegate(Oper.Add);

del += new MyDelegate(Oper.Sub);
del(6, 4);

del -= new MyDelegate(Oper.Sub);
del(2, 8);

delegate void MyDelegate(int x, int y);

public class Oper
{
    public static void Add(int x, int y)
    {
        Console.WriteLine("{0} + {1} = {2}", x, y, x + y);
    }

    public static void Sub(int x, int y)
    {
        Console.WriteLine("{0} - {1} = {2}", x, y, x - y);
    }
}

This is an example of a multicast delegate.

var del = new MyDelegate(Oper.Add);

We create an instance of our delegate. The delegate points to the static
Add method of the Oper class.

del += new MyDelegate(Oper.Sub);
del(6, 4);

We plug another method to the existing delegate instance. The first call of the
delegate invokes two methods.

del -= new MyDelegate(Oper.Sub);
del(2, 8);

We remove one method from the delegate. The second call of the delegate invokes
only one method.

delegate void MyDelegate(int x, int y);

Our delegate takes two parameters. We have an Oper class which has
two static methods. One adds two values the other one subtracts two values.

$ dotnet run
6 + 4 = 10
6 - 4 = 2
2 + 8 = 10

## C# anonymous methods

It is possible to use anonymous methods with delegates.

Program.cs
  

MyDelegate del = delegate
{
    Console.WriteLine("Anonymous method");
};

del();

delegate void MyDelegate();

We can omit a method declaration when using an anonymous method with a delegate.
The method has no name and can be invoked only via the delegate.

MyDelegate del = delegate
{
    Console.WriteLine("Anonymous method");
};

Here we create a delegate that points to an anonymous method. The anonymous
method has a body enclosed by {} characters, but it has no name.

## C# delegates as method parameters

Delegates can be used as method parameters.

Program.cs
  

DoOperation(10, 2, Multiply);
DoOperation(10, 2, Divide);

void DoOperation(int x, int y, Arithm del)
{
    int z = del(x, y);
    Console.WriteLine(z);
}

int Multiply(int x, int y)
{
    return x * y;
}

int Divide(int x, int y)
{
    return x / y;
}

delegate int Arithm(int x, int y);

We have a DoOperation method which takes a delegate as a parameter.

DoOperation(10, 2, Multiply);
DoOperation(10, 2, Divide);

We call the DoOperation method. We pass two values and a method
to it. What we do with the two values depends on the method that we pass. This
is the flexibility that come with using delegates.

void DoOperation(int x, int y, Arithm del)
{
    int z = del(x, y);
    Console.WriteLine(z);
}

This is DoOperation method implementation. The third parameter is
a delegate. The DoOperation method calls a method which is passed
to it as a third parameter.

delegate int Arithm(int x, int y);

This is a delegate declaration.

$ dotnet run
20
5

## C# events

Events are messages triggered by some action. A click on a button or a tick of a
clock are such actions. The object that triggers an event is called a sender and
the object that receives the event is called a receiver.

By convention, event delegates in the .NET have two parameters: the source that
raised the event and the data for the event.

Program.cs
  

var fe = new FEvent();
fe.FiveEvent += new OnFiveHandler(Callback);

var random = new Random();

for (int i = 0; i &lt; 10; i++)
{
    int rn = random.Next(6);

    Console.WriteLine(rn);

    if (rn == 5)
    {
        fe.OnFiveEvent();
    }
}

void Callback(object sender, EventArgs e)
{
    Console.WriteLine("Five Event occurred");
}

class FEvent
{
    public event OnFiveHandler FiveEvent;

    public void OnFiveEvent()
    {
        if (FiveEvent != null)
        {
            FiveEvent(this, EventArgs.Empty);
        }
    }
}

public delegate void OnFiveHandler(object sender, EventArgs e);

We have a simple example in which we create and launch an event. An random
number is generated. If the number equals to 5 a FiveEvent event
is generated.

fe.FiveEvent += new OnFiveHandler(Callback);

Here we plug the event called FiveEvent to the
Callback method. In other words, if the ValueFive
event is triggered, the Callback method is executed.

public event OnFiveHandler FiveEvent;

An event is declared with a event keyword.

public void OnFiveEvent()
{
    if(FiveEvent != null)
    {
        FiveEvent(this, EventArgs.Empty);
    }
}

When the random number equals to 5, we invoke the OnFiveEvent
method. In this method, we raise the FiveEvent event. This event
carries no arguments.

$ dotnet run
1
1
5
Five Event occurred
1
1
4
1
2
4
5
Five Event occurred

## C# complex event example

Next we have a more complex example. This time we send some data with the
generated event.

Program.cs
  

namespace ComplexEvent;

public delegate void OnFiveHandler(object sender, FiveEventArgs e);

public class FiveEventArgs : EventArgs
{
    public int count;
    public DateTime time;

    public FiveEventArgs(int count, DateTime time)
    {
        this.count = count;
        this.time = time;
    }
}

public class FEvent
{
    public event OnFiveHandler FiveEvent;

    public void OnFiveEvent(FiveEventArgs e)
    {
        FiveEvent(this, e);
    }
}

public class RandomEventGenerator
{
    public void Generate()
    {
        int count = 0;
        FiveEventArgs args;

        var fe = new FEvent();
        fe.FiveEvent += new OnFiveHandler(Callback);

        var random = new Random();

        for (int i = 0; i &lt; 10; i++)
        {
            int rn = random.Next(6);

            Console.WriteLine(rn);

            if (rn == 5)
            {
                count++;
                args = new FiveEventArgs(count, DateTime.Now);
                fe.OnFiveEvent(args);
            }
        }
    }

    public void Callback(object sender, FiveEventArgs e)
    {
        Console.WriteLine("Five event {0} occurred at {1}", e.count, e.time);
    }
}

class Program
{
    static void Main()
    {
        var reg = new RandomEventGenerator();
        reg.Generate();
    }
}

We have four classes. The FiveEventArgs carries some data with the
event object. The FEvent class encapsulates the event object. The
RandomEventGenerator class is responsible for random number generation.
It is the event sender. Finally, the ComplexEvent is the main
application class.

public class FiveEventArgs : EventArgs
{
    public int count;
    public DateTime time;
...

The FiveEventArgs carries data inside the event object. It inherits
from the EventArgs base class. The count and time members are
data that will be initialized and carried with the event.

if (rn == 5)
{
    count++;
    args = new FiveEventArgs(count, DateTime.Now);
    fe.OnFiveEvent(args);
}

If the generated random number equals to 5, we instantiate the
FiveEventArgs class with the current count and
DateTime values. The count variable counts the number
of times this event was generated. The DateTime value holds the
time when the event was generated.

$ dotnet run
2
1
0
5
Five event 1 occurred at 1/7/2022 1:16:03 PM
1
3
1
1
0
3

## C# predefined delegates

The .NET has several built-in delegates that a reduce the typing needed and make
the programming easier for developers.

### C# Func delegate

Func is a built-in generic delegate type. Func can be
used with a method, an anonymous method or a lambda expression.

Func can contains 0 to 16 input parameters and must have one return
type. (There are 16 overloads of the Func delegate.)

public delegate TResult Func&lt;in T, out TResult&gt;(T arg);

For instance, this delegate encapsulates a method that has one parameter and
returns a value of the type specified by the TResult parameter.

Program.cs
  

string GetMessage()
{
    return "Hello there!";
}

Func&lt;string&gt; sayHello = GetMessage;

Console.WriteLine(sayHello());

In the example, we use the Func delegate which  has no parameters
and returns a single value.

$ dotnet run
Hello there!

### C# Action delegate

An *action delegate* encapsulates a method that
has no parameters and does not return a value.

Program.cs
  

Action act = ShowMessage;
act();

void ShowMessage()
{
    Console.WriteLine("C# language");
}

Using predefined delegates further simplifies programming. We do not need to
declare a delegate type.

Action act = ShowMessage;
act();

We instantiate an action delegate. The delegate points to
theShowMessage method. When the delegate is invoked, the
ShowMessage method is executed.

There are multiple types of action delegates. For example, the
Action&lt;T&gt; delegate encapsulates a method that takes a single
parameter and does not return a value.

Program.cs
  

Action&lt;string&gt; act = ShowMessage;
act("C# language");

void ShowMessage(string message)
{
    Console.WriteLine(message);
}

We modify the previous example to use the action delegate that takes one
parameter.

Action&lt;string&gt; act = ShowMessage;
act("C# language");

We create an instance of the Action&lt;T&gt; delegate and
call it with one parameter.

### C# Predicate delegate

A predicate is a method that returns true or false. A predicate delegate is a
reference to a predicate. Predicates are very useful for filtering lists of
values.

Program.cs
  

List&lt;int&gt; vals = new List&lt;int&gt; { 4, 2, 3, 0, 6, 7, 1, 9 };

Predicate&lt;int&gt; myPred = greaterThanThree;

List&lt;int&gt; vals2 = vals.FindAll(myPred);

foreach (int i in vals2)
{
    Console.WriteLine(i);
}

bool greaterThanThree(int x)
{
    return x &gt; 3;
}

We have a list of integer values. We want to filter all numbers that
are bigger than three. For this, we use the predicate delegate.

List&lt;int&gt; vals = new List&lt;int&gt; { 4, 2, 3, 0, 6, 7, 1, 9 };

This is a generic list of integer values.

Predicate&lt;int&gt; myPred = greaterThanThree;

We create an instance of a predicate delegate. The delegate points to a
predicate, a special method that returns true or false.

List&lt;int&gt; vals2 = vals.FindAll(myPred);

The FindAll method retrieves all the elements that match the
conditions defined by the specified predicate.

bool greaterThanThree(int x)
{
    return x &gt; 3;
}

The predicate returns true for all values that are greater than three.

In this article we worked with delegates in C#.

## Source

[Delegates - programming guide](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/delegates/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).