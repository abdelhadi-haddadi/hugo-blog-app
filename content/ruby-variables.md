+++
title = "Ruby variables"
date = 2025-08-29T20:03:13.697+01:00
draft = false
description = "In this part of the Ruby tutorial, we cover Ruby variables. A variable is a place to store data. Each variable is given a unique name."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../basics/)
[Next](../objects/)

# Ruby variables

last modified October 18, 2023

In this part of the Ruby tutorial, we examine variables in more detail.

A *variable* is a place to store data. Each variable is given a unique
name. There are some naming conventions which apply to variable names. Variables
hold objects. More precisely, they refer to a specific object located in
computer memory. Each object is of certain data type. There are built-in data
types and there are custom-built data types.

Ruby belongs to the family of dynamic languages. Unlike strongly typed languages
like Java, C or Pascal, dynamic languages do not declare a variable to be of
certain data type. Instead of that, the interpreter determines the data type at
the moment of the assignment. Variables in Ruby can contain different values and
different types of values over time.

simple_variable.rb
  

#!/usr/bin/ruby

i = 5
puts i
i = 7
puts i

The term variable comes from the fact that variables, unlike constants, can take
different values over time. In the example, there is a variable called i.
First it is assigned a value 5, later a different value 7.

## Ruby variable naming conventions

Ruby, like any other programming language, has some naming conventions
for variable identifiers.

Ruby is a *case sensitive* language. It means that age and Age are two
different variable names. Most languages are case sensitive. BASIC is an
exception; it is a case insensitive language. While we can create different
names by changing the case of the characters, this practice is not recommended.

case.rb
  

#!/usr/bin/ruby

i = 5
p i
I = 7
p I

The code example defines two variables: I and i.
They hold different values.

$ ./case.rb
5
7

Variable names in Ruby can be created from alphanumeric characters and the
underscore _ character. A variable cannot begin with a number. This
makes it easier for the interpreter to distinguish a literal number from a
variable. Variable names cannot begin with a capital letter. If an identifier
begins with a capital letter, it is considered to be a constant in Ruby.

valid_variables.rb
  

#!/usr/bin/ruby

name = "Jane"
placeOfBirth = "Bratislava"
placeOfBirth = "Kosice"
favorite_season = "autumn"

n1 = 2
n2 = 4
n3 = 7

p name, placeOfBirth, favorite_season
p n1, n2, n3

In this script, we show a few valid variable names.

Variable names should be *meaningful*. It is a good programming practice
to choose descriptive names for variables. The programs are more readable
then.

meaningful.rb
  

#!/usr/bin/ruby

name = "Jane"
place_of_birth = "Bratislava"
occupation = "student"

i = 5
while i &gt; 0 do
    puts name
    i -= 1
end

The script shows three descriptive variable names. The place_of_birth is more
descriptive to a programmer than e.g. pob. It is generally considered OK to
choose simple variable names in loops.

## Ruby sigils

Variable identifiers can start with special characters also called *sigils*.
A sigil is a symbol attached to an identifier. Variable sigils in Ruby denote
variable scope. This is in contrast to Perl, where sigils denote data type.
The Ruby variable sigils are $ and @.

sigils.rb
  

#!/usr/bin/ruby

tree_name = "pine"
$car_name = "Peugeot"
@sea_name = "Black sea"

class Animal
    @@species = "Cat"
end

p local_variables
p global_variables.include? :$car_name
p self.instance_variables
p Animal.class_variables

We have four variables with different scopes. A scope is the range in which
a variable can be referenced. We use special built-in
methods to determine the scope of the variables.

tree_name = "pine"

A variable without a sigil is a local variable. A local variable is valid
only locally: e.g., inside a method, block or a module.

$car_name = "Peugeot"

Global variables start with $ character. They are valid everywhere.
The use of global variables should be limited in programs.

@sea_name = "Black sea"

A variable name starting with a @ sigil is an instance variable.
This variable is valid inside an object.

class Animal
    @@species = "Cat"
end

Finally we have a class variable. This variable is valid for all instances
of a specific class.

p local_variables

The local_variables gives an array of all local variables
defined in a specific context. Our context is Ruby toplevel.

p global_variables.include? :$car_name

Similarly, the global_variables produces an array of globals.
We do not print all globals to the terminal, because there are many of them.
Each Ruby script starts with a bunch of predefined variables. Instead of that,
we call the include? method of the array to check
if our global is defined in the array. Also note that we are referencing
variables with their symbols. (Symbols start with a colon character.)

p self.instance_variables

The self pseudo variable points to the receiver of the
instance_variables method. The receiver in our case is the
main, the Ruby toplevel execution area.

p Animal.class_variables

Finally we have an array of class variables. The main is
an instance of the Animal class.

$ ./sigils.rb
[:tree_name]
true
[:@sea_name]
[:@@species]

We see symbolic names of the variables.

## Ruby local variables

Local variables are variables that are valid within a local area
of a Ruby source code. This area is also referred to as *local scope*.
Local variables exist within the definition of a Ruby module, method,
class.

locals.rb
  

#!/usr/bin/ruby

def method1
   x = 5
   p x
end

method1

p x

We have a method called method1, which has one variable. The
variable is local. This means that it is valid only within the method
definition. We can refer to the x variable only between the method
name and the end keyword.

def method1
   x = 5
   p x
end

This is the definition of the method1 method. Inside the
method, we create a local x variable. We print the value
of the variable to the terminal.

method1

The method is called.

p x

We try to refer to a local variable outside the definition
of the method. This leads to a NameError.
The Ruby interpreter cannot find such identifier.

$ ./locals.rb
5
Traceback (most recent call last):
./locals.rb:10:in `&lt;main&gt;': undefined local variable or method `x' for main:Object (NameError)

Running the example gives the above output.

The following example is a slight modification of a previous
example.

locals2.rb
  

#!/usr/bin/ruby

x = 5

def method1
    x = 10
    p x
end

method1

p x

We have two x variables. One is defined inside the
method1 and the other one is defined outside. They are two distinct
local variables. They do not clash with each other.

x = 5

We have created a local x variable, which holds value 5.
The variable is valid in the local scope of the main execution area. It is not
valid inside the method1.

def method1
    x = 10
    p x
end

Inside the definition of the method1 a new local variable
x is defined. It has value 10. It exists in the body of the
method1 method. After the end keyword it ceases to
exist.

$ ./locals2.rb
10
5

If a method takes parameters, a local variable is created for each of these
parameters.

parameters.rb
  

#!/usr/bin/ruby

def rectangle_area a, b

    puts local_variables
    return a * b
end

puts rectangle_area 5, 6

We have a method definition, which takes two values. The method returns the area
of a rectangle.

def rectangle_area a, b
    puts local_variables
    return a * b
end

The rectangle_area method takes two parameters. They are the sides of a
rectangle, for which we calculate the area. Two local variables are
automatically created for identifiers a and b. We call the local_variables
method to see what local variables we have in the method.

puts rectangle_area 5, 6

Here we pass two values to the method rectangle_area. The values
will be assigned to two local variables, created inside the method.

$ ./parameters.rb
a
b
30

The output shows three things. The first two are the names of the
local variables within the rectangle_area method. The third is the
calculated area of the given rectangle.

A method may be defined inside another method. The inner methods
have their own local variables.

locals2.rb
  

#!/usr/bin/ruby

def method1

    def method2

        def method3

            m5, m6 = 3
            puts "Level 3"
            puts local_variables
        end

        m3, m4 = 3
        puts "Level 2"
        puts local_variables
        method3
    end

    m1, m2 = 3
    puts "Level 1"
    puts local_variables
    method2

end

method1

In this Ruby script, we create three methods. The method2
and method3 are inner methods. The method2 is
defined inside the method1 and the method3 is defined inside
method2. Each method's local variables are only
accessible in the method in which they were defined.

$ ./locals2.rb
Level 1
m1
m2
Level 2
m3
m4
Level 3
m5
m6

From the output we can see that method1 has two local variables,
m1 and m2. The inner method2 has
local variables m3 and m4. The method3,
the innermost method, has local variables m5 and m6.

The last example of this section will present
several demonstrations of a local scope.

locals3.rb
  

#!/usr/bin/ruby

module ModuleM
    m1, m2 = 4

    puts "Inside module"
    puts local_variables
end

def method1
    v, w = 3
    puts "Inside method"
    puts local_variables
end

class Some
    x, y = 2
    puts "Inside class"
    puts local_variables
end

method1

t1, t2 = 7

puts "Inside toplevel"
puts local_variables

In the code example, we create local variables inside a module,
method, class and toplevel. The local_variables
is a method of the Kernel module that returns all
current local variables.

module ModuleM
    m1, m2 = 4

    puts "Inside module"
    puts local_variables
end

A module is a collection of methods and constants.
We create two local variables m1 and m2.

def method1
    v, w = 3
    puts "Inside method"
    puts local_variables
end

Two local variables, v and w, are created
in method1.

class Some
    x, y = 2
    puts "Inside class"
    puts local_variables
end

The x and y local variables are created inside the
definition of the Some class.

t1, t2 = 7

Finally, two local variables that belong to the Ruby toplevel's
local scope are created.

$ ./locals3.rb
Inside module
m1
m2
Inside class
x
y
Inside method
v
w
Inside toplevel
t1
t2

The output shows local variables for each local scope.

## Ruby global variables

Global variables are valid everywhere in the script. They start
with a $ sigil in Ruby.

The use of global variables is discouraged. Global variables easily
lead to many programming errors. Global variables should be used
only when there is a reason to do so. Instead of global variables,
programmers are advised to use local variables whenever possible.

globals.rb
  

#!/usr/bin/ruby

$gb = 6

module ModuleM
    puts "Inside module"
    puts $gb
end

def method1
    puts "Inside method"
    puts $gb
end

class Some
    puts "Inside class"
    puts $gb
end

method1

puts "Inside toplevel"
puts $gb
puts global_variables.include? :$gb

In the example we have a global variable $gb. We show
that the variable can be referenced in a module, method, class and
a toplevel. The global variable $gb is valid in all these entities.

$gb = 6

A global variable $gb is created; it has value 6.

module ModuleM
    puts "Inside module"
    puts $gb
end

Inside a module's definition we print the global variable's value.

def method1
    puts "Inside method"
    puts $gb
end

Inside the definition of a method we print the value
of the global variable.

class Some
    puts "Inside class"
    puts $gb
end

Inside the definition of a class we print the value
of the global variable.

puts $gb
puts global_variables.include? :$gb

Finally, in the toplevel execution area we print the global
variable's value and whether the variable is in the array produced
by the global_variables method.

$ ./globals.rb
Inside module
6
Inside class
6
Inside method
6
Inside toplevel
6
true

The output of the example confirms that the global variable is accessible
everywhere.

When a Ruby script starts, it has access to multiple predefined global variables.
These globals are not considered harmful and help solve common programming
jobs.

globs.rb
  

#!/usr/bin/ruby

p $LOAD_PATH
p $:

The script shows a $LOAD_PATH global variable. The
variable lists directories which are searched by load
and require methods. The $: is a short synonym
for the $LOAD_PATH name.

More global variables will be presented in the Predefined variables section
of this chapter.

## Ruby instance, class variables

In this section we briefly cover instance and class variables.
They will be described in Object-oriented programming chapter in more
detail.

*Instance variables* are variables that belong to a particular object
instance. Each object has its own object variables. Instance variables start
with a @ sigil. *Class variables* belong
to a specific class. All objects created from a particular class share class
variables. Class variables start with @@ characters.

icvars.rb
  

#!/usr/bin/ruby

class Being

    @@is = true

    def initialize nm
        @name = nm
    end

    def to_s
        "This is #{@name}"
    end

    def does_exist?
        @@is
    end
end

b1 = Being.new "Being 1"
b2 = Being.new "Being 2"
b3 = Being.new "Being 3"

puts b1, b2, b3

p b1.does_exist?
p b2.does_exist?
p b3.does_exist?

We create a custom Being class. The Being class
has one class and one instance variable.

class Being

    @@is = true

The @@is is an class variable. This variable is shared by all
instances of the Being class. The logic of this example is that
Being is and NotBeing is not.

def initialize nm
    @name = nm
end

The initialize method is a constructor. The method
is called when the object is created. A @name instance variable is
created. This variable is specific to a concrete object.

def to_s
    "This is #{@name}"
end

The to_s method is called, when the object is a parameter
of a printing method, like p or puts. In our
case, the method gives a short human readable description of the object.

def does_exist?
    @@is
end

The does_exist? method returns the class variable.

b1 = Being.new "Being 1"
b2 = Being.new "Being 2"
b3 = Being.new "Being 3"

Three objects from the Being class are created. Each of the
objects has a different name. The name of the object will
be stored in the instance method, which is unique to each object
instance. This will be used in the to_s method, which
give a short description of the object.

puts b1, b2, b3

The puts method takes the created objects as three parameters.
It calls the to_s method on each of these objects.

p b1.does_exist?
p b2.does_exist?
p b3.does_exist?

Finally, we call the does_exist? method of each of the instances
and print their return values. The output of these three methods is the same,
because each method returns the class variable.

$ ./icvars.rb
This is Being 1
This is Being 2
This is Being 3
true
true
true

Output of the example. The first three messages are unique. The strings are
stored in the instance variables of the objects. The true value is the value of
the class variable, which is called three times.

## Ruby environment &amp; command-line variables

The ENV constant gives access to environment variables.
It is a Ruby hash. Each environment variable is a key to the
ENV hash.

The ARGV constant holds command-line argument values.
They are passed by the programmer when the script is launched.
The ARGV is an array that stores the arguments as
strings. The $* is an alias to the ARGV.

Both ENV and ARGV are global constants.

command_line.rb
  

#!/usr/bin/ruby

ARGV.each do |a|
  puts "Argument: #{a}"
end

In the script we loop through the ARGV array and
print each of its values.

$ ./command_line.rb 1 2 3
Argument: 1
Argument: 2
Argument: 3

We have given three command-line arguments. They are printed to the
console, each on a separate line.

The following example will deal with environment variables.

environment.rb
  

#!/usr/bin/ruby

puts ENV['SHELL']
puts ENV['LANG']
puts ENV['TERM']

The script will print values of three environment variables to the
terminal. The values depend on the OS settings of our operating system.

$ ./environment.rb 
/bin/bash
en_US.UTF-8
xterm-256color

This is a sample output.

## Ruby pseudo variables

Ruby has a few variables which are called *pseudo variables*. They are
different from regular variables. We cannot assign values to pseudo variables.

The self is the receiver of the current method.
The nil is the sole instance of the NilClass.
It represents the absense of a value. The true is the
sole instance of the TrueClass. It represents boolean true.
The false is a sole instance of FalseClass.
It represents boolean false.

The true and false are values of a boolean datatype. From another point of view,
they are instances of specific classes. This is because everything in Ruby is an
object. This looks like unnecessarily complicated. But it is the consequence of
the aforementioned Ruby idiom.

pseudo.rb
  

#!/usr/bin/ruby

p self
p nil
p true
p false

p self.class
p nil.class
p true.class
p false.class

This is an example of pseudo variables. We print all four pseudo variables with
the p method. Then we find out the class name for all of them.

p self

In this context, the self pseudo variable returns the main
execution context.

$ ./pseudo.rb
main
nil
true
false
Object
NilClass
TrueClass
FalseClass

Example output.

In the second example of this section, we further look
at the self.

pseudo_self.rb
  

#!/usr/bin/ruby

class Some
    puts self
end

class Other
    puts self
end

puts self

As we have said, the self references the receiver of the current
method. The above example shows three examples of different receivers.

class Some
    puts self
end

The receiver is the class called Some.

class Other
    puts self
end

Here is another receiver: a class named Other.

puts self

And the third receiver is the Ruby toplevel.

$ ./pseudo_self.rb
Some
Other
main

The last example of the section will present other three pseudo variables.

pseudo2.rb
  

#!/usr/bin/ruby

if true
    puts "This message is shown"
end

if false
    puts "This message is not shown"
end

p $name
p $age

The above example shows true, false
and nil pseudo variables at work.

if true
    puts "This message is shown"
end

The true is used in boolean expression.
The message is always printed.

if false
    puts "This message is not shown"
end

This message is never printed. The condition
is not met. In the boolean expression we always
get a negative value.

p $name
p $age

If global values are referenced and have not been
initialized, they contain the nil pseudo variable.
It stands for the absence of a value.

$ ./pseudo2.rb
This message is shown
nil
nil

## Ruby predefined variables

Ruby has plenty of predefined global variables. This is a heritage of Perl
language. Ruby was influenced strongly by Perl. They are accessible when
the Ruby script starts. We have a few examples for the predefined Ruby variables.

predefined.rb
  

#!/usr/bin/ruby

print "Script name: ", $0, "\n"
print "Command line arguments: ", $*, "\n"

puts "Process number of this script: #{$$}"

Three predefined variables have been used: $0, $* and
$$. The $0 stores the current script name.
The $* variable stores command-line arguments. And the $$
stores the PID (process id) of the script.

$ ./predefined.rb 1 2 3
Script name: ./predefined.rb
Command line arguments: ["1", "2", "3"]
Process number of this script: 20909

This is a sample output.

The $? global variable stores the exit status of
the last executed child process.

predefined2.rb
  

#!/usr/bin/ruby

system 'echo "Ruby"'
puts $?

%x[exit '1']
puts $?

We run two external child processes and check their
exit status with the $? variable.

system 'echo "Ruby"'
puts $?

With the use of the system method we start a
child process. It is an echo bash command, which prints a message
to the terminal.

%x[exit '1']
puts $?

In the second case we execute the bash exit command with status 1.
This time we use the %x operator which executes a command between
two selected delimiters. We have chosen [] characters.

$ ./predefined2.rb 
Ruby
pid 20952 exit 0
pid 20953 exit 1

The first child process terminates with status 0, the second with
exit status 1.

In the final example, we show three global predefined variables that
are used with regular expressions.

predefined3.rb
  

#!/usr/bin/ruby

"Her name is Jane" =~ /name/

p $`
p $&amp;
p $'

When we apply the =~ operator on a string, Ruby sets some variables.
The $&amp; variable has a string that matched the last last regular
expression match. The $` has a string preceding $&amp;
and the $' has a string following the $&amp;.

$ ./predefined3.rb
"Her "
"name"
" is Jane"

In this part of the Ruby tutorial, we looked more deeply at the Ruby variables.

[Contents](..)
[Previous](../basics/)
[Next](../objects/)