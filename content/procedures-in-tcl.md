+++
title = "Procedures in Tcl"
date = 2025-08-29T20:03:17.148+01:00
draft = false
description = "This chapter of the Tcl tutorial covers Tcl procedures. The covered topics include procedure creation, arguments, recursion, and scope."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../arrays/)
[Next](../io/)

# Procedures in Tcl

last modified September 25, 2024

In this part of the tutorial, we cover Tcl procedures. 

A procedure is a code block containing a series of commands. 
Procedures are called functions in many programming languages.
It is a good programming practice for procedures to do only one specific 
task. Procedures bring modularity to programs. The proper use of
procedures brings the following advantages:

  - Reducing duplication of code

  - Decomposing complex problems into simpler pieces

  - Improving clarity of the code

  - Reuse of code

  - Information hiding

There are two basic types of procedures: built-in procedures and user defined ones. 
The built-in procedures are part of the Tcl core language. For instance, the 
rand, sin and exp are buit-in procedures. 
The user defined procedures are procedures created with the proc keyword.

The proc keyword is used to create new Tcl commands. 
The term procedures and commands are often used interchangeably. 

We start with a simple example. 

#!/usr/bin/tclsh

proc tclver {} {

    set v [info tclversion]
    puts "This is Tcl version $v"
}

tclver

In this script, we create a simple tclver procedure.
The procedure prints the version of Tcl language. 

proc tclver {} {

The new procedure is created with the proc command. 
The {} characters reveal that the procedure takes 
no arguments. 

    {

    set v [info tclversion]
    puts "This is Tcl version $v"
}

This is the body of the tclver procedure. It is executed when
we execute the tclver command. The body of the command lies between
the curly brackets. 

tclver

The procedure is called by specifying its name. 

$ ./version.tcl 
This is Tcl version 8.6

Sample output. 

## Procedure arguments

An argument is a value passed to the procedure. Procedures can take one 
or more arguments. If procedures work with data, we must
pass the data to the procedures. 

In the following example, we have a procedure which
takes one argument. 

proc ftc {f} {

    return [expr ($f - 32) * 5/9 ]
}

puts [ftc 100]
puts [ftc 0]
puts [ftc 30]

We create a ftc procedure which transforms Fahrenheit
temperature to Celsius temperature. 

proc ftc {f} {

The procedure takes one parameter. Its name f will be used
in the body of the procedure. 

return [expr ($f - 32) * 5/9 ]

We compute the value of the Celsius temperature. The return
command returns the value to the caller. If the procedure does not execute 
an explicit return, then its return value is the value of the last command 
executed in the procedure's body. 

puts [ftc 100]

The ftc procedure is executed. It takes 100 as a parameter. It is
the temperature in Fahrenheit. The returned value is used by the
puts command, which prints it to the console. 

$ ./fahrenheit.tcl
37
-18
-2

Next we have a procedure which takes two arguments. 

#!/usr/bin/tclsh

proc maximum {x y} {
    
    if {$x &gt; $y} {

        return $x
    } else {
        
        return $y
    }
}

set a 23
set b 32

set val [maximum $a $b]
puts "The max of $a, $b is $val"

The maximum procedure returs the maximum of two values.

proc maximum {x y} {

The method takes two arguments. 

if {$x &gt; $y} {

    return $x
} else {
    
    return $y
}

Here we compute which number is greater. 

set a 23
set b 32

We define two variables which are to be compared. 

set val [maximum $a $b]

We calculate the maximum of the two variables. 

$ ./maximum.tcl
The max of 23, 32 is 32

## Variable number of arguments

A procedure can take and process variable number of arguments. 
For this we use the special args parameter. 

#!/usr/bin/tclsh

proc sum {args} {

    set s 0

    foreach arg $args {

        incr s $arg
    }

    return $s
}

puts [sum 1 2 3 4]
puts [sum 1 2]
puts [sum 4]

We define a sum procedure which adds up all its arguments. 

proc sum {args} {

The sum procedure has a special args argument. 
It has a list of all values passed to the procedure. 

foreach arg $args {

    incr s $arg
}

We go through the list and calculate the sum. 

puts [sum 1 2 3 4]
puts [sum 1 2]
puts [sum 4]

We call the sum procedure three times. In the first case, it takes 
4 arguments, in the second case 2, in the last case one. 

$ ./variable.tcl
10
3
4

## Implicit arguments

The arguments in Tcl procedures may have implicit values. 
An implicit value is used if no explicit value is provided.

#!/usr/bin/tclsh

proc power {a {b 2}} {

    if {$b == 2} {
        return [expr $a * $a]
    }

    set value 1

    for {set i 0} {$i&lt;$b} {incr i} {

        set value [expr $value * $a]
    }

    return $value
}

set v1 [power 5]
set v2 [power 5 4]

puts "5^2 is $v1"
puts "5^4 is $v2"

Here we create a power procedure. 
The procedure has one argument with an implicit value. 
We can call the procedure with one and two arguments.

proc power {a {b 2}} {

The second argument b, has an implicit value 2. If we provide only
one argument, the power procedure then returns the value of 
a to the power 2.

set v1 [power 5]
set v2 [power 5 4]

We call the power procedure with one and two arguments. 
The first line computes the value of 5 to the power 2. The
second line value of 5 to the power 4. 

$ ./implicit.tcl
5^2 is 25
5^4 is 625

## Returning multiple values

The return command passes one value to the caller.
There is often a need to return multiple values. In such cases, 
we can return a list.

#!/usr/bin/tclsh

proc tworandoms {} {

    set r1 [expr round(rand()*10)]
    set r2 [expr round(rand()*10)]

    return [list $r1 $r2]
}

puts [tworandoms]
puts [tworandoms]
puts [tworandoms]
puts [tworandoms]

We have a tworandoms procedure. It returns two random integers
between 1 and 10.

set r1 [expr round(rand()*10)]

A random integer is computed and set to the r1 variable.

return [list $r1 $r2]

Two values are returned with the help of the list command.

$ ./tworandoms.tcl 
3 7
1 3
8 7
9 9

A sample output.

## Recursion

Recursion, in mathematics and computer science, is a way of 
defining functions in which the function being defined is applied 
within its own definition. In other words, a recursive function 
calls itself to do its job. Recursion is a widely used approach 
to solve many programming tasks. Recursion is the fundamental approach
in functional languages like Scheme, OCalm, or Clojure.

Recursion calls have a limit in Tcl. There cannot be more than
1000 recursion calls. 

A typical example of recursion is the calculation of a factorial.
Factorial n! is the product of all positive integers less than or 
equal to n.

#!/usr/bin/tclsh

proc factorial n {

    if {$n==0} {

        return 1
    } else {

        return [expr $n * [factorial [expr $n - 1]]]
    }
}

# Stack limit between 800 and 1000 levels

puts [factorial 4]
puts [factorial 10]
puts [factorial 18]

In this code example, we calculate the factorial of three
numbers. 

return [expr $n * [factorial [expr $n - 1]]]

Inside the body of the factorial procedure, we call the 
factorial procedure with a modified argument. The procedure 
calls itself.

$ ./recursion.tcl
24
3628800
6402373705728000

These are the results. If we tried to compute the factorial of 100, 
we would receive "too many nested evaluations" error. 

## Scope

A variable declared inside a procedure has a procedure scope.
The *scope* of a name is the region of a program text within which it 
is possible to refer to the entity declared by the name without qualification 
of the name. A variable which is declared inside a procedure has a procedure
scope; it is also called a local scope. The variable is then valid only in 
this particular procedure.

#!/usr/bin/tclsh

proc test {} {

    puts "inside procedure"
    #puts "x is $x"
    set x 4
    puts "x is $x"
}

set x 1

puts "outside procedure"
puts "x is $x"

test

puts "outside procedure"
puts "x is $x"

In the preceding example, we have an x variable defined 
outside and inside of the test procedure.

set x 4
puts "x is $x"

Inside the test procedure, we define an x variable. The variable has
local scope, valid only inside this procedure. 

set x 1

puts "outside procedure"
puts "x is $x"

We define an x variable outside the procedure. It has a global scope. 
The variables do not conflict because they have different scopes. 

$ ./scope.tcl
outside procedure
x is 1
inside procedure
x is 4
outside procedure
x is 1

It is possible to change the global variable inside
a procedure. 

#!/usr/bin/tclsh

proc test {} {

    upvar x y
    puts "inside procedure"
    puts "y is $y"
    set y 4
    puts "y is $y"
}

set x 1

puts "outside procedure"
puts "x is $x"

test

puts "outside procedure"
puts "x is $x"

We define a global x variable. We change the variable 
inside the test procedure. 

upvar x y

We refer to the global x variable by the name y with 
the upvar command. 

set y 4

We assign a value to the local y variable and also change the value
of the global x variable. 

$ ./scope2.tcl
outside procedure
x is 1
inside procedure
y is 1
y is 4
outside procedure
x is 4

From the output we can see the test procedure has changed the
x variable. 

With the global command, we can refer to global
variables from procedures. 

#!/usr/bin/tclsh

proc test {} {

    global x 
    puts "inside test procedure x is $x"

    proc nested {} {
        global x
        puts "inside nested x is $x"
    }
}

set x 1

test
nested

puts "outside x is $x"

In the above example, we have a test procedure and a nested
procedure defined within the test procedure. We refer to the
global x variable from both procedures. 

global x 
puts "inside test procedure x is $x"

With the global command, we refer to the global
x variable, defined outside the test procedure. 

proc nested {} {
    global x
    puts "inside nested x is $x"
}

It is possible to create nested procedures. These are procedures defined
inside other procedures. We refer to the global x variable with 
the global command. 

test
nested

We call the test procedure and its nested procedure. 

$ ./scope3.tcl
inside test procedure x is 1
inside nested x is 1
outside x is 1

In this part of the Tcl tutorial, we covered Tcl procedures.

  
[Contents](..)  
[Previous](../arrays/)
[Next](../io/)