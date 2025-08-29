+++
title = "C variable"
date = 2025-08-27T23:22:35.848+01:00
draft = false
description = "C variable tutorial shows how to work with variables in C language. A variable represents a storage location."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C variable

last modified April 10, 2023

In this article we show how to work with variables in C language.

A *variable* is a storage location. A variable has a name and a data
type. A data type determines what values can be assigned to the variable, for
instance integers, strings, or boolean values. Over the time of the program
variables can obtain various values of the same data type.

int x = 5;

The x is the variable name. The int is the data type
that determines what values can the x variable hold. The
= is an operator that assigns a value on the right side to the
variable on the left side. The 5 is an integer literal that is
assigned to x. Finally, the ; is used to end a C
statement.

Variable names must adhere to the rules for valid C identifiers. Variable names
must start with a letter, or _. Otherwise, they can consist of alhphanumeric
characters. In C, variable names are case sensitive.

## C variable example

In the following example, we define several variables.

simple.c
  

#include &lt;stdio.h&gt;

int main() {

    int x;
    int y, z;

    x = 5;
    y = 6;
    z = 7;

    float w = 4.5;
    double h = 5.5;

    printf("%d %d %d\n", x, y, z);
    printf("%f %f\n", w, h);

    x = 55;

    printf("%d\n", x);
}

In the example we have five variables.

int x;
int y, z;

We define three variables. They are of integer data type. It is possible to
define multiple variables on one line.

x = 5;
y = 6;
z = 7;

The x, y, and z variables are initialized
to their values.

float w = 4.5;
double h = 5.5;

We define and initialize two variables in one go.

printf("%d %d %d\n", x, y, z);
printf("%f %f\n", w, h);

We print the values of the five variables.

x = 55;

We assign a new value to the x variable.

$ ./simple
5 6 7
4.500000 5.500000
55

## C variable initialization

In the next example, we show several ways of initializing C variables.

init.c
  

#include &lt;stdio.h&gt;

int main() {

    int x, y = 5;

    printf("x: %d\n", x);
    printf("y: %d\n", y);

    int m = 6, n = 7;

    printf("m: %d\n", m);
    printf("n: %d\n", n);

    int v, w;

    v = w = 8;
    printf("v: %d\n", v);
    printf("w: %d\n", w);
}

We have six integer variables.

int x, y = 5;

In this line, we define two integer variables. The y is assigned
value 5. 

The value of the x variable is undefined; i.e. it depends on the
compiler being used. In our case, x was assigned 0, but other
compilers may assign some random values. The best practice is to avoid such 
definitions and always define variables explicitly.

int m = 6, n = 7;

This is the way to define and initialize variables in one go.

int v, w;

We define two integers.

v = w = 8;

We assign value 8 to both variables.

$ ./init
x: 0
y: 5
m: 6
n: 7
v: 8
w: 8

## C local variable

A C local variable is defined within the bounds of a function. A local variable
is only valid in the function where it is defined.

local_var.c
  

#include &lt;stdio.h&gt;

int max(int, int);

int main() {

    int x = 4;
    int y = 5;

    printf("%d + %d = %d\n", x, y, x + y);

    int _max = max(x, y);
    printf("%d\n", _max);
}

int max(int x, int y) {

    return x &gt; y ? x : y;
}

We have two pairs of x and y variables defined in
main and max functions. These variables do not clash
because they are valid only in the bodies of their functions.

$  ./local_var
4 + 5 = 9
5

## C global variable

A global variable is a variable that is defined outside a function. It is
accessible in all functions. Global variables should be used with caution.

global_var.c
  

#include &lt;stdio.h&gt;

void f();

int x = 10;

int main() {

    printf("x: %d\n", x);
    x = 11;

    printf("x: %d\n", x);

    f();

    printf("x: %d\n", x);
}

void f() {

    printf("x: %d\n", x);
    x = 12;
    printf("x: %d\n", x);
}

We have an x global variable defined. We can access it and modify
it in main and f functions.

$ ./global_var
x: 10
x: 11
x: 11
x: 12
x: 12

## C static local variable

A static local variable is initialized only once and it retains its value across
function calls.

static_var.c
  

#include &lt;stdio.h&gt;

void f();

int main() {

    f();
    f();
    f();
    f();
    f();
    f();
}

void f() {

    static int n = 0;
    int c = 0;

    n++;
    c++;

    printf("n: %d, c: %d\n", n, c);
}

We have a static n local variable and a normal local c
variable defined inside the f function. We call the f
function several times. Each time we call the function, we increment the
variables.

$ ./static_var
n: 1, c: 1
n: 2, c: 1
n: 3, c: 1
n: 4, c: 1
n: 5, c: 1
n: 6, c: 1

While the n variable increases its value, the c
variable is always 1.

## C variable - function parameters

Value parameters come into existence upon invocation of a function. It is
initialized with the value of the argument given in the invocation.

function_params.c
  

#include &lt;stdio.h&gt;

int add(int, int);

int main() {

    printf("%d\n", add(4, 5));
    printf("%d\n", add(8, 9));

    return 0;
}

int add(int x, int y) {

    return x + y;
}

We have two function parameters: x and y. They are
valid within the bounds of the add function.

$ ./function_params
9
17

## C extern variable

An extern variable means that a variable is defined in a different
file. The extern keyword  declares a variable; it informs the
compiler that it exist. But it does not define it; i.e. it does not allocate the
storage for the variable at that point.

myfile.h
  

int x = 5;
int y = 6;

In the myfile.h file, we define two variables: x and
y.

extern_var.c
  

#include &lt;stdio.h&gt;
#include "myfile.h"

extern int x;
extern int y;

int main() {

    printf("x: %d\n", x);
    printf("y: %d\n", y);
}

In the extern_var.c, we print the x and y
variables from the header file.

#include "myfile.h"

First, we include the file.

extern int x;
extern int y;

We declare the variables. We tell the compiler that the two variables are
defined outside the current file.

$ ./extern_var
x: 5
y: 6

In this article, we have worked with variables in C language.