+++
title = "C# FluentValidation"
date = 2025-08-27T23:23:05.404+01:00
draft = false
description = "C# FluentValidation tutorial shows how to
validate data in C# using FluentValidation library. The article is a short
introduction."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# FluentValidation

last modified July 5, 2023

 

Thi article is a short introduction to data validation in C# using the
FluentValidation library.

FluentValidation is a validation library of .NET. It uses fluent
interface and lambda expressions for building strongly-typed validation rules.

$ dotnet add package FluentValidation

We add the package to the project.

## C# FluentValidation simple example

The following is a simple example that uses FluentValidation.

Program.cs
  

using FluentValidation;

var validator = new UserValidator();
var u1 = new User("John Doe", "gardener");
var u2 = new User("Roger Roe", "");

var res = validator.Validate(u1);

if (res.IsValid)
{
    Console.WriteLine("instance is valid");
}
else
{
    Console.WriteLine("instance not valid");
}

var res2 = validator.Validate(u2);

if (res2.IsValid)
{
    Console.WriteLine("instance is valid");
}
else
{
    Console.WriteLine("instance not valid");
}

class User
{
    public string Name;
    public string Occupation;

    public User(string Name, string Occupation) =&gt;
        (this.Name, this.Occupation) = (Name, Occupation);

    public override string ToString() =&gt;
        $"User {{ {this.Name} {this.Occupation} }}";
}

class UserValidator : AbstractValidator&lt;User&gt;
{
    public UserValidator()
    {
        RuleFor(user =&gt; user.Name).NotEmpty();
        RuleFor(user =&gt; user.Occupation).NotEmpty();
    }
}

In the program, we have a User class. With our validation code 
we ensure that the user properties are not empty.

class UserValidator : AbstractValidator&lt;User&gt;
{
    public UserValidator()
    {
        RuleFor(user =&gt; user.Name).NotEmpty();
        RuleFor(user =&gt; user.Occupation).NotEmpty();
    }
}

A validator class inherits from AbstractValidator. It defines 
rules for its properties with RuleFor. In our case, we use the 
built-in NotEmpty rule.

var validator = new UserValidator();

We create an instance of the UserValidator.

var u1 = new User("John Doe", "gardener");
var u2 = new User("Roger Roe", "");

We create two user objects.

if (res.IsValid)
{
    Console.WriteLine("instance is valid");
}
else
{
    Console.WriteLine("instance not valid");
}

We check the validity of an object with IsValid.

$ dotnet run 
instance is valid
instance not valid

## C# FluentValidation errors

The validation result contains the Errors property which contains 
the validation error messages.

Program.cs
  

using FluentValidation;

var validator = new UserValidator();
var u1 = new User("John Doe", "gardener");
var u2 = new User("Roger Roe", "");

var res = validator.Validate(u1);

if (res.IsValid)
{
    Console.WriteLine("instance is valid");
}
else
{
    Console.WriteLine("instance not valid");
    ShowErrors(res);
}

var res2 = validator.Validate(u2);

if (res2.IsValid)
{
    Console.WriteLine("instance is valid");
}
else
{
    Console.WriteLine("instance not valid");
    ShowErrors(res2);
}

void ShowErrors(FluentValidation.Results.ValidationResult res)
{
    foreach (var e in res.Errors)
    {
        Console.WriteLine(e);
    }
}

class User
{
    public string Name;
    public string Occupation;

    public User(string Name, string Occupation) =&gt;
        (this.Name, this.Occupation) = (Name, Occupation);

    public override string ToString() =&gt;
        $"User {{ {this.Name} {this.Occupation} }}";
}

class UserValidator : AbstractValidator&lt;User&gt;
{
    public UserValidator()
    {
        RuleFor(user =&gt; user.Name).NotEmpty();
        RuleFor(user =&gt; user.Occupation).NotEmpty();
    }
}

In this program, we also display the error messages.

void ShowErrors(FluentValidation.Results.ValidationResult res)
{
    foreach (var e in res.Errors)
    {
        Console.WriteLine(e);
    }
}

We define the ShowErrors function which goes over the
Errors property and displays them to the console.

$ dotnet run 
instance is valid
instance not valid
'Occupation' must not be empty.

## C# FluentValidation custom error messages

Custom error messages can be provided with WithMessage.

Program.cs
  

using FluentValidation;

var validator = new UserValidator();
var u = new User("Roger Roe", "");

var res = validator.Validate(u);

if (res.IsValid)
{
    Console.WriteLine("instance is valid");
}
else
{
    Console.WriteLine("instance not valid");
    ShowErrors(res);
}

void ShowErrors(FluentValidation.Results.ValidationResult res)
{
    foreach (var e in res.Errors)
    {
        Console.WriteLine(e);
    }
}

class User
{
    public string Name;
    public string Occupation;

    public User(string Name, string Occupation) =&gt;
        (this.Name, this.Occupation) = (Name, Occupation);

    public override string ToString() =&gt;
        $"User {{ {this.Name} {this.Occupation} }}";
}

class UserValidator : AbstractValidator&lt;User&gt;
{
    public UserValidator()
    {
        RuleFor(user =&gt; user.Name).NotEmpty()
            .WithMessage("Validation failed: Name field must not be empty");
        RuleFor(user =&gt; user.Occupation).NotEmpty()
            .WithMessage("Validation failed: Occupation field must not be empty");
    }
}

In the program, we add custom error messages.

RuleFor(user =&gt; user.Name).NotEmpty()
    .WithMessage("Validation failed: Name field must not be empty");
RuleFor(user =&gt; user.Occupation).NotEmpty()
    .WithMessage("Validation failed: Occupation field must not be empty");

Right after the NotEmpty rule, we all the WithMessage
with the custom error message.

$ dotnet run
instance not valid
Validation failed: Occupation field must not be empty

## C# FluentValidation chaining rules

The validation rules can be chained.

Program.cs
  

using FluentValidation;

var validator = new UserValidator();

var u1 = new User();
ValidateUser(u1);

Console.WriteLine("--------------------");

var u2 = new User();
u2.Name = "John Doe";
ValidateUser(u2);

Console.WriteLine("--------------------");

var u3 = new User();
u3.Name = "John Doe";
u3.Occupation = "gar";
ValidateUser(u3);

Console.WriteLine("--------------------");

var u4 = new User();
u4.Name = "John Doe";
u4.Occupation = "gardener";
ValidateUser(u4);

void ValidateUser(User u)
{
    var res = validator.Validate(u);

    if (res.IsValid)
    {
        Console.WriteLine("instance is valid");
    }
    else
    {
        Console.WriteLine("instance not valid");
        ShowErrors(res);
    }
}

void ShowErrors(FluentValidation.Results.ValidationResult res)
{
    foreach (var e in res.Errors)
    {
        Console.WriteLine(e);
    }
}

class User
{
    public string? Name { get; set; }
    public string? Occupation { get; set; }

    public override string ToString() =&gt;
        $"User {{ {this.Name} {this.Occupation} }}";
}

class UserValidator : AbstractValidator&lt;User&gt;
{
    public UserValidator()
    {
        RuleFor(user =&gt; user.Name).NotEmpty().MinimumLength(2);
        RuleFor(user =&gt; user.Occupation).NotEmpty().MinimumLength(5);
    }
}

In the program, we use two rules for our properties: NotEmpty and
MinimumLength.

class UserValidator : AbstractValidator&lt;User&gt;
{
    public UserValidator()
    {
        RuleFor(user =&gt; user.Name).NotEmpty().MinimumLength(2);
        RuleFor(user =&gt; user.Occupation).NotEmpty().MinimumLength(5);
    }
}

In our validation class we assume that a name has at least two letters and 
an occupation five.

$ dotnet run
instance not valid
'Name' must not be empty.
'Occupation' must not be empty.
--------------------
instance not valid
'Occupation' must not be empty.
--------------------
instance not valid
The length of 'Occupation' must be at least 5 characters. You entered 3 characters.
--------------------
instance is valid

[FluentValidation documentation](https://docs.fluentvalidation.net/en/latest/)

This article was a quick introduction to the C# FluentValidation library.

## Source

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).