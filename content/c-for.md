+++
title = "C for"
date = 2025-08-27T23:22:12.272+01:00
draft = false
description = "C for tutorial shows how to create loops in C with for statement. The for statement lets us repeat a statement or several statements a specified number of times."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C for

last modified January 9, 2023

C for tutorial shows how to create loops in C with for statement.

## The for statement

The for statement lets us repeat a statement or several
statements a specified number of times.

for (init; condition; increment ) {
    statement(s);
}

The for statement consists of three parts: the initialization, the condition,
and the increment. The initialization part is executed only once. The body of
the for statement, enclosed in curly brackets, is executed when the condition is
true.

If the condition returns false, the for loop is terminated. After the statements
in the block are executed, the for loop switches to the third part, where the
counter is incremented. The cycle continues until the condition is not true
anymore. Note that is it possible to create endless loops.

## C for example

In the first example, we print numbers 0..9.

simple.c
  

#include &lt;stdio.h&gt;

int main() {

    for (int i = 0; i &lt; 10; i++) {

        printf("%d\n", i);
    }

    return 0;
}

In this for loop, we print ten values. At the beginning, we initiate the counter
i variable to 0. This is done only once. In the condition, we
compare the counter to 10. If it is less than 10, the body of the for statement
is executed: the counter value is printed to the console with
printf function. Then the counter is incremented in with the
++ operator. The body of the for statement is executed until the
condition is returns true.

$ ./simple
0
1
2
3
4
5
6
7
8
9

In the next example, we print the same values in reverse order.

simple2.c
  

#include &lt;stdio.h&gt;

int main() {

    for (int i = 9; i &gt;= 0; i--) {

        printf("%d\n", i);
    }

    return 0;
}

The for statement starts with the value 9. We use the -- operator
to decrement the counter.

$ ./simple2
9
8
7
6
5
4
3
2
1
0

## C for - parts are optional

All three parts of the for statement are optional.

random.c
  

#include &lt;time.h&gt;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {

    srand(time(NULL));

    for (;;) {

        int r = rand() % 30;

        printf("%d ", r);

        if (r == 22) {

            break;
        }
    }

    return 0;
}

In the example, we do not specify any of the three parts of the for statement:
we create an endless loop. In order to finish the loop, we use the
break statement.

The example calculates a random value between 0..29. If it equals to 22, the
loop is finished.

$ ./random
20 18 9 4 10 23 11 28 21 29 12 8 12 16 22

## C for - multiple init variables

In the for statement, we can have multiple init variables.

multi_init.c
  

#include &lt;stdio.h&gt;

int main() {

    for (int i=0, j=0; i&lt;=10 &amp;&amp; j&lt;=10; i++, j++) {

        printf("%d\n", i*j);
    }

    return 0;
}

In the example, we have intialized two variables: i and
j. The variables are separated with a comma.

$ ./multi_init 
0
1
4
9
16
25
36
49
64
81
100

## C for - loop over array

C for statements are often used to traverse arrays.

sum.c
  

#include &lt;stdio.h&gt;

int main() {

    int vals[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

    int sum = 0;
    size_t length = sizeof vals / sizeof vals[0];

    for (int i = 0; i &lt; length; i++) {

        sum += vals[i];
    }

    printf("The sum of values is: %d\n", sum);

    return 0;
}

In the example, we go over the array of integers and calculate their sum.

size_t length = sizeof vals / sizeof vals[0];

We calculate the size of the array.

for (int i = 0; i &lt; length; i++) {

  sum += vals[i];
}

In each of the for loops, we add the current value to the sum
variable.

$ ./sum
The sum of values is: 55

## C nested for statements

The for statements may be nested.

nested.c
  

#include &lt;stdio.h&gt;

int main() {

    const int m = 3;
    const int n = 5;

    int vals[m][n] = {
        {1, 2, 3, 4, 5},
        {6, 7, 8, 9, 10},
        {11, 12, 13, 14, 15}
    };

    for (int i = 0; i &lt; m; i++) {

        for (int j = 0; j &lt; n; j++) {

            printf("%d ", vals[i][j]);
        }

        printf("\n");
    }

    return 0;
}

In the example, we use a nested for statement to traverse a two-dimensional 
array of integers.

$ ./nested
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15

In this article, we have covered the C for statement.