+++
title = "C switch"
date = 2025-08-29T19:50:17.291+01:00
draft = false
description = "C switch tutorial shows how to control flow in C with switch statement. A switch statement is a type of selection control used to allow the value of a variable or expression to change the control flow of a program."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C switch

last modified January 9, 2023

C switch tutorial shows how to control flow in C with switch statement.

## The switch statement

The switch statement is a control statement that used to change the
flow of a program. It provides an easy way to dispatch execution to different
parts of code based on the value of a variable or expression. The
switch statement is an alternative to multiple if/else
statements.

The body of a switch statement may have an arbitrary number of case
labels. The labels are evaluated against the given value. The expression
provided in the switch must result in a constant value.

The expression is evaluated once and compared with the values of each
case label. If there is a match, the statements after the matching
label are executed.

A case label is usually ended with a break
statement; it terminates the execution of a switch statement. If
omitted, it execution goes to the next case label.

An optional default statement is executed when there is no match
found.

## C switch example

In the following example, we use the switch statement to make
a decistion based on the user input.

switch_stm.c
  

#include &lt;stdio.h&gt;

int main() {

    printf("Are you sure to continue? y/n ");

    char c;

    scanf(" %c", &amp;c);

    switch (c) {

        case 'y':

            printf("program continues\n");
        break;

        case 'n':
            printf("program stops\n");
        break;

        default:
            printf("wrong option\n");
    }
}

We are asked if we want to continue and we are given two options to choose: y or
n.

char c;

scanf(" %c", &amp;c);

We read the input from the user with scanf. The space character
before the %c specifier skips any leading whitespace.

case 'y':

    printf("program continues\n");
break;

This branch is executed if we chose 'y'.

case 'n':
    printf("program stops\n");
break;

This branch is executed if we chose 'n'.

default:
    printf("wrong option\n");

We get this branch executed for any other option.

$ ./switch_stm
Are you sure to continue? y/n y
program continues

## C switch example 2

The next example shows how to get the same output for multiple options.

switch_stm2.c
  

#include &lt;stdio.h&gt;

enum week { Mon, Tue, Wed, Thu, Fri, Sat, Sun };

int main() {

    enum week day = Wed;

    switch (day) {

        case Mon:
        case Tue:
        case Wed:
        case Thu:
        case Fri:
            printf("Weekday\n");
            break;

        case Sat:
        case Sun:
            printf("Weekend\n");
            break;
    }
}

If we omit the break statement, the execution falls through to the
next case. It can be used to group options for single output.

case Mon:
case Tue:
case Wed:
case Thu:
case Fri:
    printf("Weekday\n");
    break;

Monday throug Friday are weekdays.

$ ./switch_stm2
Weekday

In this article, we have covered the C switch statement.