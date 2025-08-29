+++
title = "C# FakeItEasy"
date = 2025-08-29T19:50:45.283+01:00
draft = false
description = "C# FakeItEasy tutorial shows how to do mocking in C# using the FakeItEasy library."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# FakeItEasy

last modified September 2, 2023

 

In this article we show how to do mocking in C# using the FakeItEasy library.

*Faking* is replacing external dependencies with fakes or test doubles.
These classes or components simulate successful or failed operations in unit
testing.

Fakes are used primarily because the external dependencies might currently not
be available for testing or their usage is very costly.

*FakeItEasy* is an easy mocking library for .NET.

$ dotnet add package FakeItEasy
$ dotnet add package Microsoft.NET.Test.Sdk
$ dotnet add package MSTest.TestAdapter
$ dotnet add package MSTest.TestFramework

In this article we use the MSTest testing framework.

## C# FakeItEasy simple example

In the first example, we replace a simple HelloService class with
a fake.

Services/IMessageService.cs
  

namespace Messages.Services;

public interface IMessageService
{
    string GetHelloMessage();
    string GetGreetingMessage();
}

FakeItEasy creates fakes from the IMessageService interface.

Services/MessageService.cs
  

namespace Messages.Services;

public class MessageService : IMessageService
{
    public string GetHelloMessage()
    {
        return "Hello there!";
    }

    public string GetGreetingMessage()
    {
        return "Good Morning!";
    }
}

MessageService is the implementation of the
IMessageService.

tests/MessageServiceTest.cs
  

namespace Messages.Tests;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using FakeItEasy;
using Messages.Services;

[TestClass]
public class MessageServiceTest
{
    private const string Expected1 = "Hello there!";
    private const string Expected2 = "Good Morning!";

    [TestMethod]
    public void HelloMessageTest()
    {
        var msgService = A.Fake&lt;IMessageService&gt;();
        A.CallTo(() =&gt; msgService.GetHelloMessage()).Returns(Expected1);

        var res = msgService.GetHelloMessage();
        Assert.AreEqual(Expected1, res);
    }

    [TestMethod]
    public void GreetingMessageTest()
    {
        var msgService = A.Fake&lt;IMessageService&gt;();
        A.CallTo(() =&gt; msgService.GetGreetingMessage()).Returns(Expected2);

        var res = msgService.GetGreetingMessage();
        Assert.AreEqual(Expected2, res);
    }
}

In MessageServiceTest, we test the MessageService
class.

var msgService = A.Fake&lt;IMessageService&gt;();
A.CallTo(() =&gt; msgService.GetHelloMessage()).Returns(Expected1);

We create a fake MessageService from the
IMessageService interface and define a response for the
GetHelloMessage call.

var res = msgService.GetHelloMessage();
Assert.AreEqual(Expected1, res);

The method is tested using a fake not a real class.

## C# FakeItEasy example II

Since we have a console program with a testing framework, we need to add the
following option to the project file.

&lt;GenerateProgramFile&gt;false&lt;/GenerateProgramFile&gt;

Otherwise, we have two main entry points clashing.

$ dotnet add package Bogus

In addition to the previously mentioned packages, we also add the Bogus library
to create fake data.

Models/User.cs
  

namespace Users.Models;

public class User
{
    public User(string fname, string lname, string occupation) =&gt;
        (FirstName, LastName, Occupation) = (fname, lname, occupation);

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Occupation { get; set; }

    public override string ToString() =&gt; $"{FirstName} {LastName} is a {Occupation}";
}

This is the User class.

Services/IUserService.cs
  

namespace Users.Services;

using Users.Models;

public interface IUserService
{
    User GetUser();
    IList&lt;User&gt; GetUsers(int n);
}

We have an IUserService interface with two contract methods.
The GetUser returns a single user and the GetUsers
returns the n number of users.

Services/UserService.cs
  

namespace Users.Services;

using Users.Models;
using Bogus;

public class UserService : IUserService
{
    private List&lt;string&gt; occupations = new List&lt;string&gt; { "teacher",
        "programmer", "driver", "accountant" };

    public IList&lt;User&gt; GetUsers(int n)
    {
        var users = new List&lt;User&gt;();

        foreach (int value in Enumerable.Range(1, n))
        {
            users.Add(CreateUser());
        }

        return users;
    }

    public User GetUser()
    {
        var user = CreateUser();
        return user;
    }

    public User CreateUser()
    {
        var faker = new Faker();

        var fname = faker.Person.FirstName;
        var lname = faker.Person.LastName;

        int n = occupations.Count();
        int millis = DateTime.Now.Millisecond;
        var occupation = occupations.ElementAt(new Random(millis).Next(n));

        return new User(fname, lname, occupation);
    }
}

Our UserService implements the contract methods. It uses Bogus
to generate fake data for the users.

Program.cs
  

namespace Main;

using Users.Services;

public class Program
{
    public static void Main(string[] args)
    {
        var userService = new UserService();

        var u1 = userService.GetUser();
        Console.WriteLine(u1);

        var users = userService.GetUsers(5);
        Console.WriteLine(string.Join("\n", users));
    }
}

This is the main console program that uses the userService.

tests/UserServiceTest.cs
  

namespace UserService.Tests;

using Microsoft.VisualStudio.TestTools.UnitTesting;
using FakeItEasy;
using Users.Services;
using Users.Models;

[TestClass]
public class MessageTest
{
    [TestMethod]
    public void GetUserTest()
    {
        var userService = A.Fake&lt;IUserService&gt;();

        var dummyUser = A.Dummy&lt;User&gt;();
        A.CallTo(() =&gt; userService.GetUser()).Returns(dummyUser);

        var res = userService.GetUser();
        Assert.AreEqual(dummyUser, res);
    }

    [TestMethod]
    [DataRow(2)]
    [DataRow(5)]
    [DataRow(10)]
    public void GetUsersTest(int n)
    {
        var userService = A.Fake&lt;IUserService&gt;();
        var dummyUsers = A.CollectionOfFake&lt;User&gt;(n);

        A.CallTo(() =&gt; userService.GetUsers(n)).Returns(dummyUsers);

        var res = userService.GetUsers(n);
        Assert.AreEqual(dummyUsers, res);
    }
}

We test the UserService class with a test double.

var userService = A.Fake&lt;IUserService&gt;();

First, we create a fake UserService.

var dummyUser = A.Dummy&lt;User&gt;();
A.CallTo(() =&gt; userService.GetUser()).Returns(dummyUser);

Then we define a dummy user and set it as a response for the
GetUser method call.

var res = userService.GetUser();
Assert.AreEqual(dummyUser, res);

Finally, we test the GetUser method using the test double.

[TestMethod]
[DataRow(2)]
[DataRow(5)]
[DataRow(10)]
public void GetUsersTest(int n)
{
    var userService = A.Fake&lt;IUserService&gt;();
    var dummyUsers = A.CollectionOfFake&lt;User&gt;(n);

    A.CallTo(() =&gt; userService.GetUsers(n)).Returns(dummyUsers);

    var res = userService.GetUsers(n);
    Assert.AreEqual(dummyUsers, res);
}

With MSTest's DataRow, we run the GetUsers method
with values 2, 5, and 10 consecutively.

## Source

[FakeItEasy documentation](https://fakeiteasy.github.io/docs/8.1.0/)

In this article we have replaced two real classes with test doubles in C# with
FakeItEasy.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).