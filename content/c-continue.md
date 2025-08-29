+++
title = "C continue"
date = 2025-08-27T23:22:08.743+01:00
draft = false
description = "C continue tutorial shows how to passing iterations of do, for, or while statements in C. Unlike the break statement, continue does not terminate the entire loop."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C continue

last modified January 9, 2023

C continue tutorial shows how to passing iterations of do, for, or while
statements in C.

## The continue statement

The continue statement passes control to the next iteration of the
nearest enclosing do, for, or while statement. It skips any remaining statements
in the do, for, or while statement body.

Unlike the break statement, it does not terminate the entire loop.

## C continue example

In the following example, we skip adding two values to the sum with the
continue statement.

simple.c
  

#include &lt;stdio.h&gt;

int main() {

    int sum = 0;

    for (int i=1; i &lt; 20; i++) {

        if (i == 7 || i == 13) {
            continue;
        }

        sum += i;
    }

    printf("%d\n", sum);
}

In the example, we calculate the sum of values 1..20, skipping values 7 and 13.

if (i == 7 || i == 13) {
    continue;
}

If the i equals to 7 or 13, we call continue. It ends
the current cycle and continues with the next one. Effectively, we pass the 
sum += i; statement.

$ ./simple
170

## C continue example II

In the next example, we use continue to print odd values. Odd
numbers are whole numbers that cannot be divided exactly into pairs.

odds.c
  

#include &lt;stdio.h&gt;

int main() {

    int i = 0;

    while (i &lt; 100) {

        i++;

        if (i % 2 == 0) {
            continue;
        }

        printf("%d ", i);
    }

    puts("\n");
}

We iterate through numbers 1..999 with the while loop. 

If the expression i % 2 returns 0, the number in question can be
divided by 2. The continue statement is executed and the rest of the cycle is
skipped. In our case, the printf function is skipped and the number
is not printed to the console. The next iteration is started.

$ ./odds 
1 3 5 7 9 11 13 15 17 19 21 23 25 27 29 31 33 35 37 39 41 43 45 47 49 51 53 
55 57 59 61 63 65 67 69 71 73 75 77 79 81 83 85 87 89 91 93 95 97 99

In this article, we have covered the C continue statement.