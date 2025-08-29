+++
title = "C++ while"
date = 2025-08-27T23:22:41.385+01:00
draft = false
description = "C++ while tutorial shows how to create loops in C++ with while statement. A while loop is a control flow statement that allows code to be executed repeatedly based on a given boolean condition."
image = ""
imageBig = ""
categories = ["cpp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C++ while

last modified January 9, 2023

C++ while tutorial shows how to create loops in C++ with the while statement.

## The while statement

The while statement is used to create a while loop. A while loop is
a control flow statement executes code repeatedly based on the given boolean
condition.

This is the general form of the while loop:

while (expression) {

    statement(s);
}

The while keyword executes the statements inside the block enclosed
by the curly brackets. The statements are executed each time the expression is
evaluated to true.

## C++ while example

The following example uses a while statement to calculate a sum.

simple.cpp
  

#include &lt;iostream&gt;

int main() {

    int i = 0;
    int sum = 0;

    while (i &lt;= 10) {

        sum += i;
        i++;
    }

    std::cout &lt;&lt; sum &lt;&lt; std::endl;

    return 0;
}

We calculate the sum of 1..10 numbers. 

The while loop has three parts: initialization, testing and updating. Each
execution of the statement is called a cycle. 

int i = 0;

We initiate the i variable. It is used as a counter.

while (i &lt;= 10) {
   ...
}

The expression inside the brackets following the while
keyword is the second phase: the testing. The statements in the body are
executed until the expression is evaluated to false.

i++;

This is the last, third phase of the while loop: the updating. We
increment the counter. Note that improper handling of the while
loops may lead to endless cycles.

$ ./simple 
55

## C++ while - calculate factorial

The factorial of a positive integer n, denoted by n!,
is the product of all positive integers less than or equal to n.

n! = n * (n-1) * (n-2) * ... * 1

This is the formula to calculate the factorial.

factorial.c
  

#include &lt;iostream&gt;

int main() {

    int i = 10;
    int factorial = 1;

    while (i &gt; 1) {

        factorial *= i;
        i--;
    }

    std::cout &lt;&lt; factorial &lt;&lt; std::endl;

    return 0;
}

In the example, we use the while loop to calculate the 10! factorial.

$ ./factorial 
3628800

## C++ while - endless loop

The while (1) creates an endless loop. In order to terminate the 
loop, we use the break statement.

random.cpp
  

#include &lt;random&gt;
#include &lt;iostream&gt;

using u32    = uint_least32_t;
using engine = std::mt19937;

int main() {

    std::random_device os_seed;
    const u32 seed = os_seed();

    engine generator(seed);
    std::uniform_int_distribution&lt;u32&gt; distribute(1, 30);

    while (1) {

        int r = distribute(generator);

        std::cout &lt;&lt; r &lt;&lt; " ";

        if (r == 22) {

            break;
        }
    }

    std::cout &lt;&lt; std::endl;

    return 0;
}

The example calculates a random value between 0..29. If it equals to 22, the
loop is finished with the break statement.

$ ./random 
25 28 9 9 18 6 20 2 5 15 7 11 22

## C++ while - loop over array

The while statement can be used to traverse over an array.

loop_array.cpp
  

#include &lt;iostream&gt;

int main() {

    int vals[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    int i, sum = 0;
    size_t len = sizeof vals / sizeof vals[0];

    while (i &lt;= len) {

        sum += vals[i];
        i++;
    }

    std::cout &lt;&lt; "The sum is: " &lt;&lt; sum &lt;&lt; std::endl;

    return 0;
}

In the example, we have an array of integers. We go over the array with the 
while statement and calculate the sum of the values.

$ ./loop_array 
The sum is: 55

## C++ do while example

The do while statement is a specific form of a while statement, where the 
block is executed before the condition. So the block is always executed at 
least once. 

do_while.cpp
  

#include &lt;iostream&gt;

int main() {

    int val, sum = 0;

    do {

        std::cout &lt;&lt; "Enter a number: ";
        std::cin &gt;&gt; val;
        sum += val;

    } while(val != 0);

    std::cout &lt;&lt; "The sum is: " &lt;&lt; sum &lt;&lt; std::endl;

    return 0;
}

The example asks the user to repeatedly enter a number. It calculates the 
sum of all those values. It terminates the loop when the user enters zero.

$ ./do_while 
Enter a number: 3
Enter a number: 2
Enter a number: 1
Enter a number: 0
The sum is: 6

This tutorial was dedicated to the while statement in C++.