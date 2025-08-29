+++
title = "C if & else"
date = 2025-08-27T23:22:17.959+01:00
draft = false
description = "C if else tutorial shows how to create
conditions and branches in C with if/else statements."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C if &amp; else

last modified January 9, 2023

C if else tutorial shows how to create conditions and branches in C with if/else
statements.

## C if else

The if statement specifies the conditional execution 
of a block. If the expression evaluates to true, the block is executed. 
If the else statement is present and the if statement evaluates
to false, the block following else is executed. 

There can be multiple if/else statements.

## C if else example

The following examples demonstrate conditional execution of blocks with if/else.

if_stm.c
  

#include &lt;stdio.h&gt;

int main() {
    
    int num = 4;
    
    if (num &gt; 0) {

        printf("The number is positive\n");
    }

    return 0;
}

In the example we have a simple condition; if the num variable 
is positive, the message "The number is positive" is printed to the console.
Otherwise; nothing is printed. 

$ ./if_stm 
The number is positive

if_else.c
  

```
#include &lt;stdio.h&gt;

int main() {
    
    int num = -4;
    
    if (num &gt; 4){

        printf("The number is positive\n");
    } else {

        printf("The number is negative\n");
    }

    return 0;
}

```

Now we have added the second branch. The else statement specifies
the block that is executed if the if condition fails.

$ ./if_else 
The number is negative

## C multiple conditions with else if

We can have multiple branches of conditions with additional else if
statements.

if_else_if.c
  

#include &lt;time.h&gt;
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {

    srand(time(NULL));

    int r = rand() % 10 - 5;

    printf("%d\n", r);
    
    if (r &gt; 0){

        printf("The number is positive\n");
    } else if (r == 0) {

        printf("The number is zero\n");
    } else {

        printf("The number is negative\n");
    }
}

In this example, we add additional branch with if else. We generate 
random values between -5 and 4. With the help of the if &amp;
else statement we print a message for all three options.

$ ./if_else_if 
-3
The number is negative
$ ./if_else_if 
0
The number is zero
$ ./if_else_if 
0
The number is zero
$ ./if_else_if 
1
The number is positive
$ ./if_else_if 

We run the example a few times.

In this article, we have covered if else conditions in C.