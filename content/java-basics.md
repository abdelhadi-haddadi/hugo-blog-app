+++
title = "Java basics"
date = 2025-08-29T19:58:06.690+01:00
draft = false
description = "Java basics tutorial shows some basics of Java: variables, constans, data types, string formatting, and reading and writing to the console."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java basics

last modified January 27, 2024

 

In this article we cover some basic programming concepts of the Java language.
We begin with some simple programs. We work with variables, constants, and basic
data types. We read and write to console and we also mention string formatting.

## Java simple example

We start with a very simple code example. The following code is placed into the
Simple.java file. The naming is important here. A public class of a
Java program must match the name of the file.

com/zetcode/Simple.java
  

package com.zetcode;

public class Simple {

    public static void main(String[] args) {

        System.out.println("This is Java");
    }
}

Java code is strictly organized from the very beginning. A file of a Java code
may have one or more classes, out of which only one can be declared public.

package com.zetcode;

Packages are used to organize Java classes into groups, which usually share
similar functionality. Packages are similar to namespaces and modules in other
programming languages. For a simple code example, a package declaration may
be omitted. This will create a so called *default package*. However, in
this tutorial we use a package for all examples. Another important thing is that
a directory structure must reflect the package name. In our case the source file
Simple.java with a package com.zetcode must be placed into
a directory named com/zetcode/. The package statement must
be the first line in the source file.

public class Simple {

   ...
}

A class is a basic building block of a Java program. The
public keyword gives unrestricted access to this class. The above
code is a class definition. The definition has a body that starts with a left
curly brace { and ends with a right curly brace }. Only one class can be
declared public in a source file. 

Also note the name of the class. Its name must match the file name. The source
file is called Simple.java and the class Simple. It is
a convention that the names of classes start with an uppercase letter.

public static void main(String[] args) {
    ...
}

The main is a method. A method is a piece of code created to do a
specific job. Instead of putting all code into one place, we divide it into
pieces called methods. This brings modularity to our application. Each method
has a body in which we place statements. The body of a method is enclosed by
curly brackets. The specific job for the main method is to start
the application. It is the entry point to each console Java program.

The method is declared to be static. This static method can be
called without the need to create an instance of the Java class. First we need
to start the application and after that we are able to create instances of
classes. The void keyword states that the method does not return a
value. Finally, the public keyword makes the main
method available to the outer world without restrictions. These topics will be
later explained in more detail.

System.out.println("This is Java");

In the main method, we put one statement. The statement prints the
"This is Java", which is a string literal, to the console. Each statement must
be finished with a semicolon ; character. This statement is a
method call. We call the println method of the System
class. The class represents the standard input, output, and error streams for
console applications. We specify the fully qualified name of the
println method.

$ java Simple.java
This is Java

We execute the program with the java tool. 

**Note: ** We execute the (single) source file with 
java tool. This feature was added in Java 11.

## Java console reading values

The second example will show, how to read a value from a console.

com/zetcode/ReadLine.java
  

package com.zetcode;

import java.util.Scanner;

public class ReadLine {

    public static void main(String[] args) {

        System.out.print("Write your name:");

        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();

        System.out.println("Hello " + name);
    }
}

A prompt is shown on the terminal window. The user writes his name on the
terminal and the value is read and printed back to the terminal.

import java.util.Scanner;

The Java standard library has a huge collection of classes available for
programmers. They are organized inside packages. The Scanner class
is one of them. When we import a class with the import keyword, we
can refer later to the class without the full package name. Otherwise, we must
use the fully qualified name. The import allows a shorthand
referring for classes. This is different from some other languages. For instance
in Python, the import keyword imports objects into the namespace of a script. In
Java, the import keyword only saves typing by allowing to refer to
types without specifying the full name.

System.out.print("Write your name:");

We print a message to the user. We use the print method which does
not start a new line. The user then types his response next to the message.

Scanner sc = new Scanner(System.in);

A new instance of the  Scanner class is created. New objects are
created with the new keyword. The constructor of the object follows
the new keyword. We put one parameter to the constructor of the
Scanner object. It is the standard input stream. This way we are
ready to read from the terminal. The Scanner is a simple text
scanner which can parse primitive types and strings.

String name = sc.nextLine();

Objects have methods which perform certain tasks. The nextLine
method reads the next line from the terminal. It returns the result in a
String data type. The returned value is stored in the name
variable which we declare to be of String type.

System.out.println("Hello " + name);

We print a message to the terminal. The message consists of two parts. The
"Hello " string and the name variable. We concatenate these two values into one
string using the + operator. This operator can concatenate two or
more strings.

$ java ReadLine.java
Write your name:John Doe
Hello John Doe

This is a sample execution of the second program.

## Java command line arguments

Java programs can receive command line arguments. They follow the name of the
program when we run it.

com/zetcode/CommandLineArgs.java
  

package com.zetcode;

public class CommandLineArgs {

    public static void main(String[] args) {

        for (String arg : args) {

            System.out.println(arg);
        }
    }
}

Command line arguments can be passed to the main method.

public static void main(String[] args)

The main method receives a string array of command line arguments.
Arrays are collections of data. An array is declared by a type followed by a
pair of square brackets []. So the String[] args
construct declares an array of strings. The args is an parameter to
the main method. The method then can work with parameters which are
passed to it.

for (String arg : args) {

    System.out.println(arg);
}

We go through the array of these arguments with a for loop and print them to the
console. The for loop consists of cycles. In this case, the number of cycles
equals to the number of parameters in the array. In each cycle, a new element is
passed to the arg variable from the args array. The
loop ends when all elements of the array were passed. The for statement has a
body enclosed by curly brackets {}. In this body, we place
statements that we want to be executed in each cycle. In our case, we simply
print the value of the arg variable to the terminal. Loops and
arrays will be described in more detail later.

$ java CommandLineArgs.java 1 2 3 4 5
1
2
3
4
5

We provide four numbers as command line arguments and these are
printed to the console.

When we launch programs from the command line, we specify the arguments right
after the name of the program. In Integrated Development Environments (IDE) such
as IntelliJ IDEA, we specify these parameters in a dialog. In IntelliJ IDEA, we 
select Edit configurations and add the values into the Program arguments option.

## Java variables

A variable is a place to store data. A variable has a name and a data type. A
data type determines what values can be assigned to the variable. Integers,
strings, boolean values etc. Over the time of the program, variables can obtain
various values of the same data type. Variables in Java are always initialized
to the default value of their type before any reference to the variable can be
made.

com/zetcode/Variables.java
  

package com.zetcode;

public class Variables {

    public static void main(String[] args) {

        String city = "New York";
        String name = "Paul"; int age = 34;
        String nationality = "American";

        System.out.println(city);
        System.out.println(name);
        System.out.println(age);
        System.out.println(nationality);

        city = "London";
        System.out.println(city);
    }
}

In the above example, we work with four variables. Three of the variables are
strings. The age variable is an integer. The int
keyword is used to declare an integer variable.

String city = "New York";

We declare a city variable of the string type and initialize it to the "New
York" value.

String name = "Paul"; int age = 34;

We declare and initialize two variables. We can put two statements into one
line. Since each statement is finished with a semicolon, the Java compiler knows
that there are two statements in one line. But for readability reasons, each
statement should be on a separate line.

System.out.println(city);
System.out.println(name);
System.out.println(age);
System.out.println(nationality);

We print the values of the variables to the terminal.

city = "London";
System.out.println(city);

We assign a new value to the city variable and later print it.

$ java Variables.java
New York
Paul
34
American
London

## The var keyword

Since Java 10 for local variables with initializers we can use the
var keyword instead of the data type. The data type will be
inferred from the right side of the declaration.

com/zetcode/VarKeyword.java
  

package com.zetcode;

public class VarKeyword {

    public static void main(String[] args) {

        var name = "John Doe";
        var age = 34;

        System.out.println(name + " is " + age  + " years old");
    }
}

In the example, we use the var keyword for two variables.

var name = "John Doe";
var age = 34;

We have one string variable and one integer variable. The data type is inferred
by the compiler from the right side of the declaration. For the inference to
work, the variables must be initialized.

## Java constants

Unlike variables, constants cannot change their initial values. Once
initialized, they cannot be modified. Constants are created with the
final keyword.

com/zetcode/Constants.java
  

package com.zetcode;

public class Constants {

    public static void main(String[] args) {

        final int WIDTH = 100;
        final int HEIGHT = 150;
        int var = 40;

        var = 50;

        //WIDTH = 110;
    }
}

In this example, we declare two constants and one variable.

final int WIDTH = 100;
final int HEIGHT = 150;

We use the final keyword to inform the compiler that we
declare a constant. It is a convention to write constants in uppercase letters.

int var = 40;

var = 50;

We declare and initialize a variable. Later, we assign a new value
to the variable. It is legal.

// WIDTH = 110;

Assigning new values to constants is not possible. If we uncomment this line, we
will get a compilation error: "Uncompilable source code - cannot assign a value
to final variable WIDTH".

## Java string formatting

Building strings from variables is a very common task in programming. Java
language has the  String.format method to format strings.

Some dynamic languages like Perl, PHP, or Ruby support variable interpolation.
*Variable interpolation* is replacing variables with their values inside
string literals. Java language does not allow this. It has string formatting
instead.

com/zetcode/StringFormatting.java
  

package com.zetcode;

public class StringFormatting {

    public static void main(String[] args) {

        int age = 34;
        String name = "William";

        String output = String.format("%s is %d years old.", name, age);

        System.out.println(output);
    }
}

In Java, strings are immutable. We cannot modify an existing string. We must
create a new string from existing strings and other types. In the code example,
we create a new string. We also use values from two variables.

int age = 34;
String name = "William";

Here we have two variables, one integer and one string.

String output = String.format("%s is %d years old.", name, age);

We use the format method of the built-in String class. The
%s and %d are control characters which are later
evaluated. The %s accepts string values, the %d
integer values.

$ java StringFormatting.java
William is 34 years old.

## Source

[Java Getting Started tutorial](https://docs.oracle.com/javase/tutorial/getStarted/index.html)

This article covered some basics of the Java language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).