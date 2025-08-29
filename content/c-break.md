+++
title = "C break"
date = 2025-08-29T19:49:50.596+01:00
draft = false
description = "C break tutorial shows how to terminate do, for, switch, or while statements in C."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C break

last modified January 9, 2023

C break tutorial shows how to terminate do, for, switch, or while statements in
C.

## The break statement

The break statement terminates the execution of the nearest
enclosing do, for, switch, or while statement in which it appears.

The execution of the program passes to the statement that follows the terminated
statement.

## C break with while

In the following example, we use a break statement with the
while loop. With while (1), we create and endless
loop. In order to terminate the loop, we use the break statement.

break_while.c
  

#include &lt;time.h&gt;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {

    srand(time(NULL));

    while (1) {

        int r = rand() % 30;

        printf("%d ", r);

        if (r == 22) {

            break;
        }
    }

    printf("\n");

    return 0;
}

The example calculates a random value between 0..29. If it equals to 22, the
loop is finished with the break statement.

$ ./break_while
27 17 21 12 25 5 8 6 10 24 9 19 4 19 1 13 18 22

## C break with for

In the next example, we use a break statement with the
for loop. With for(;;), we create and endless for 
loop, which we terminate using break.

break_for.c
  

#include &lt;stdio.h&gt;

int main() {

   char c;

   for(;;) {

      printf("Press any key, q to quit: ");

      scanf(" %c", &amp;c);
      printf("%c\n", c);

      if (c == 'q') {
          break;
      }
   }
}

The example prints the entered character until the 'q' character terminates the 
program.

$ ./break_for 
Press any key, q to quit: s
s
Press any key, q to quit: e
e
Press any key, q to quit: w
w
Press any key, q to quit: q
q
$

## C break with switch

In the following example, we use the break statement with the
switch statement.

break_switch.c
  

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

case 'y':

    printf("program continues\n");
break;

For the 'y' a particular statement is executed. Then, the
switch statement is terminated with break and no
other options are evaluated.

In this article, we have covered the C break statement.