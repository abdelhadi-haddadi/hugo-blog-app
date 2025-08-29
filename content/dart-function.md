+++
title = "Dart function"
date = 2025-08-29T19:51:50.178+01:00
draft = false
description = "Dart function tutorial shows how to work with functions in Dart. A function is a mapping of maps zero or more input parameters to zero or more output parameters."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart function

last modified June 8, 2025

Dart function tutorial shows how to work with functions in Dart.

## Dart function definition

A function is a mapping of zero or more input parameters to zero or more
output parameters. 

The advantages of using functions are:

    - Reducing duplication of code

    - Improving clarity of the code

    - Reuse of code

    - Decomposing complex problems into simpler pieces

    - Information hiding

Dart functions are first-class citizens. Functions can be assigned to variables,
passed as arguments to functions or returned from functions. This makes the
language more flexible.

The body of the function consists of statements that are executed when the
function is called. We use the return keyword to return values from
functions.  The body is delimited with a pair of curly brackets {}.
To call a function, we specify its name followed by round brackets 
(). A function may or may not take parameters.

## Dart function simple example

The following example creates a simple function in Dart. 

main.dart
  

void main() {
  int x = 4;
  int y = 5;

  int z = add(x, y);

  print("Output: $z");
}

int add(int a, int b) {
  return a + b;
}

In the example, we define a function which adds two values.

void main() {

The main function is the entry point of the program.

int z = add(x, y);

We call the add function; it takes two parameters. The computed 
value is passed to the z variable.

int add(int a, int b) {
    return a + b;
}

The definition of the add function starts with its return value
type.  The parameters of the function are separated with comma; each parameter
name is preceded with its data type. The statements that are executed when the
function is called are placed between curly brackets. The result of the addition
operation is returned to the caller with the return keyword.

print("Output: $z");

The print is a built-in Dart function, which prints the given 
value to the console.

$ dart main.dart
Output: 9

## Dart main function arguments

The main function can accept arguments from the command line.

main.dart
  

void main(List&lt;String&gt; args) {
  print(args);
  print(args.length);

  if (args.length &gt; 1) {
    var a = args[1];
    print(a);
  }
}

The command line arguments are stored in the args list of strings.

$ dart main.dart 1 2 3 4 5
[1, 2, 3, 4, 5]
5
2

## Dart arrow function

The arrow function allows us to create a simplified function consisting of a
single expression. We can omit the curly brackets and the return keyword.

main.dart
  

int add(int x, int y) =&gt; x + y;

int sub(int x, int y) =&gt; x - y;

void main() {
  print(add(3, 5));
  print(sub(5, 4));
}

In the example, we have two functions defined with the arrow syntax.

$ dart main.dart
8
1

## Dart optional positional parameter

The square brackets [] are used to specify optional positional 
parameters.

main.dart
  

void main() {
  print(pow(2, 2));
  print(pow(2, 3));
  print(pow(3));
}

int pow(int x, [int y = 2]) {
  int r = 1;
  for (int i = 0; i &lt; 2; i++) {
    r *= x;
  }
  return r;
}

We define a power function. The second parameter is optional; if it is not
specified its default value is used to calculate the power.

$ dart main.dart
4
4
9

## Dart optional named parameters

Optional named parameters are specified insice curly {} brackets.

main.dart
  

void main() {
  var name = "John Doe";
  var occupation = "carpenter";

  info(name, occupation: occupation);
}

void info(String name, {String occupation}) {
  print("$name is a $occupation");
}

The info function takes an optional named argument as its second 
argument.

info(name, occupation: occupation);

When passing the optional named parameter, we have to specify both the parameter
name and value, separated with colon.

$ dart main.dart
John Doe is a carpenter

## Dart anonymous function

We can create anonymous functions. Anonymous functions do not have a name.

main.dart
  

void main() {
  var words = ['sky', 'cloud', 'forest', 'welcome'];

  words.forEach((String word) {
    print('$word has ${word.length} characters');
  });
}

We create an anonymous function which counts characters for each of the words 
in the list.

$ dart main.dart
sky has 3 characters
cloud has 5 characters
forest has 6 characters
welcome has 7 characters

## Dart recursive function

Recursion, in mathematics and computer science, is a way of defining methods in
which the method being defined is applied within its own definition. To put it
differently, a recursive method calls itself to do its task. Recursion is a
widely used approach to solve many programming tasks.

A typical example is the calculation of a factorial. 

main.dart
  

int fact(int n) {
  if (n == 0 || n == 1) {
    return 1;
  }

  return n * fact(n - 1);
}

void main() {
  print(fact(7));
  print(fact(10));
  print(fact(15));
}

In this code example, we calculate the factorial of three numbers. 

return n * fact(n - 1);

Inside the body of the fact function, we call the fact 
function with a modified argument. The function calls itself.

$ dart main.dart
5040
3628800
1307674368000

## Dart function as parameter

A Dart function can be passed to other functions as a parameter. Such a function 
is called a *higher-order* function.

main.dart
  

int inc(int x) =&gt; ++x;

int dec(int x) =&gt; --x;

int apply(int x, Function f) {
  return f(x);
}

void main() {
  int r1 = apply(3, inc);
  int r2 = apply(2, dec);
  print(r1);
  print(r2);
}

In the example, the apply function takes the inc and 
dec functions as parameters.

int apply(int x, Function f) {
    return f(x);
    }

We specify that the second parameter is a function type.

int r1 = apply(3, inc);
int r2 = apply(2, dec);

We pass the inc and dec functions to the apply
function as parameters.

$ dart main.dart
4
1

## Dart nested function

A nested function, also called an inner function, is a function defined inside
another function. 

main.dart
  

void main() {
  String buildMessage(String name, String occupation) {
    return "$name is a $occupation";
  }

  var name = "John Doe";
  var occupation = "gardener";

  var msg = buildMessage(name, occupation);
  print(msg);
}

We have a helper buildMessage function which is defined inside the 
main function.

$ dart main.dart 
John Doe is a gardener

## Dart function returning a function (closure)

A function in Dart can return another function. This allows you to create
closures that capture variables from their surrounding scope.

main.dart
  

Function makeAdder(int addBy) {
  return (int x) =&gt; x + addBy;
}

void main() {
  var add2 = makeAdder(2);
  var add5 = makeAdder(5);

  print(add2(3)); // 5
  print(add5(3)); // 8
}

The makeAdder function returns a new function that adds a specific
value to its argument. The returned function remembers the value of
addBy from its creation context.

$ dart main.dart
5
8

## Dart default values for named parameters

You can provide default values for named parameters in Dart functions. This
makes parameters optional and assigns a default if not provided.

main.dart
  

void greet(String name, {String greeting = 'Hello'}) {
  print('$greeting, $name!');
}

void main() {
  greet('Alice');
  greet('Bob', greeting: 'Hi');
}

The greet function has a named parameter greeting with
a default value. If not specified, 'Hello' is used.

$ dart main.dart
Hello, Alice!
Hi, Bob!

## Dart function typedefs

Typedefs allow you to define a function signature and use it as a type,
improving code readability and type safety.

main.dart
  

typedef IntOperation = int Function(int, int);

int add(int a, int b) =&gt; a + b;
int mul(int a, int b) =&gt; a * b;

void printResult(int x, int y, IntOperation op) {
  print(op(x, y));
}

void main() {
  printResult(3, 4, add);
  printResult(3, 4, mul);
}

Here, IntOperation is a typedef for a function that takes two
integers and returns an integer. We use it to specify the type of the
op parameter in printResult.

$ dart main.dart
7
12

## Source

[Dart functions - language reference](https://dart.dev/language/functions)

In this article we have learned how to work with functions in Dart. We have
seen how to define functions, pass parameters, use optional parameters, and
how to create higher-order functions. Functions are a fundamental part of
Dart programming, enabling code reuse and modular design.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).