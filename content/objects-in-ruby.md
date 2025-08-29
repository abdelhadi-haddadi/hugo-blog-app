+++
title = "Objects in Ruby"
date = 2025-08-29T20:03:11.361+01:00
draft = false
description = "In this part of the Ruby tutorial, we cover Ruby objects. Objects are building blocks of a Ruby program."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../variables/)
[Next](../datatypes/)

# Objects in Ruby

last modified October 18, 2023

In this part of the Ruby tutorial, we cover the concept of objects in Ruby
language. We learn more about objects in OOP chapter. I have written this
preliminary chapter about objects because many Ruby features might be confusing
to newcomers — especially if they already know any other programming language.

## Everything is object

Ruby is an object-oriented programming language. This means that in Ruby
programs we work with objects. From a language programmer's point of view a Ruby
program is a stream of tokens. These tokens are Ruby keywords, operators,
various delimiters or literals. From a semantic point of view a Ruby program
consists of objects. These objects are created and modified during the lifetime
of a Ruby script.

There are two kinds of objects: built-in objects and custom objects. Built-in
objects are predefined objects that all programmers can use. They are available
with the core of the Ruby language or from various libraries. Custom objects are
created by application programmers for their application domains.

All objects must be created before we can work with them. We often use a term
object instantiation. It is a synonym for object creation. Objects consists of
data and methods. Data is a static part of an object. Methods form a dynamic
part of an object. Objects are modified and communicate with each other via
methods.

simple.rb
  

#!/usr/bin/ruby

puts "Ruby language"

We have a simple Ruby script. If we are familiar with some procedural language
like Pascal or C, we might see a keyword or a function named puts
and its parameter "Ruby language", which is a string.

Ruby is a pure object-oriented language and things are a bit different. The
"Ruby language" is a indeed a string, which is a common data type. But it is
also an object. And as with all objects, we can call its methods. This is a bit
different from other languages. The puts is a method. A method is a
function defined in an object. Methods do not exist on their own. In fact, the
puts method is a part of the
Kernel module.

simple2.rb
  

#!/usr/bin/ruby

Kernel.puts "Ruby language"
Kernel.puts "Ruby language".size

In the above script, we have two code lines.

Kernel.puts "Ruby language"

In the first example, we were calling the puts method without
the Kernel part, which may be omitted. This saves time and some
typing. It is in fact a shorthand call for the Kernel.puts formal
call. In C# we have Console.WriteLine and in Java
System.println. The idea is the same. Methods must be associated
with some object, or, in case of class methods, a class.

Kernel.puts "Ruby language".size

In this code line, we print the size of the "Ruby language" string to the
console. This might be confusing to programmers who have coded in other
languages. In other languages, a string is a primitive data type
that cannot be modified and that lacks its own methods. In Ruby, a
string is a full object and has its own methods. The size method
is one of them. It returns the size of the string in characters.

$ ./simple2.rb
Ruby language
13

## Ruby Integer object

In the following example, we look at an integer number. Similarly to a string,
an integer value is a Ruby object too.

object_number.rb
  

#!/usr/bin/ruby

puts 6.object_id

puts 6.even?
puts 6.zero?

puts 6.class

In the example, we have an integer 6. We call a few methods
on the number.

puts 6.object_id

The 6 is an object. The object_id is a method. The method
returns an id associated to the object. Each object has an id. If
we call a method on an object, we must always put a dot character between
the two.

puts 6.even?
puts 6.zero?

Here we call two methods on the 6 object. The even? returns true
if the number is even. And the zero? method returns true if the
number is equal to zero. Note that these two methods end with a question mark.
This is a Ruby convention. Methods that return a boolean value end
with a question mark.

puts 6.class

The class method tells us what kind of object we are dealing with.
In our case a 6 is a Fixnum

$ ./object_number.rb
13
true
false
Integer

## Ruby object creation

We have mentioned that Ruby objects must be created before we can work with
them. Objects can be created implicitly or explicitly. Implicit object creation
is object creation by literal notation. Explicit object creation happens with
the use of the new keyword. A custom object is always created with
the new keyword. Custom objects must be created from a particular
class. A class is a template for an object. A class can be used to create many
objects.

object_create.rb
  

#!/usr/bin/ruby

class Being
end

puts 67
puts "ZetCode"

s = String.new "ZetCode"
puts s

b = Being.new
puts b

The code example demonstrates creation of objects in Ruby.

class Being
end

This is a template for our custom object called Being. The
templates are created using the class keyword.
The templates for custom objects are usually placed at the
top of the source file or in a separate Ruby files.

puts 67
puts "ZetCode"

In these two lines we work with two objects. A 67 object of Fixnum
type and "ZetCode" string of String type. 67 and "String" are what
we call literals. A literal is a textual representation of a particular value
of a type. These two objects are created behind the scenes by the Ruby interpreter.
Some objects in Ruby are created by specifying their literals in the source code.

s = String.new "ZetCode"
puts s

This is the formal way of creating a String object. It is equal to the
previous, implicit creation with the string literal.

b = Being.new
puts b

And here we create an instance of the custom object. The puts method
gives us a short description of the object.

$ ./object_create.rb
67
ZetCode
ZetCode
#&lt;Being:0x9944d9c&gt;

We continue with some formal object creations.

formal.rb
  

#!/usr/bin/ruby

s1 = String.new "Ruby"
puts s1.size
puts s1.downcase

a1 = Array.new
a1.push 1, 2, 3
puts a1.include? 3
puts a1.empty?

r1 = Range.new 1, 6
puts r1.class
puts r1.include? 4

In the example, we create three built-in objects and
call a few of their methods.

s1 = String.new "Ruby"
puts s1.size
puts s1.downcase

A String object is created. We call two methods of the
object. The size method returns the size of the string.
The downcase method downcases the characters of the string.

a1 = Array.new
a1.push 1, 2, 3
puts a1.include? 3
puts a1.empty?

Here we create an Array object and add three numbers to it.
Later we call two array methods. The include? method checks if
a particular value (3 in our case) is part of the array. The empty?
method returns a boolean value indicating whether the array is empty.

r1 = Range.new 1, 6
puts r1.class
puts r1.include? 4

An instance of the Range class is created. It contains numbers from 1
to 6. The class method returns the name of the object.
The include? method checks if the number 4 is part of
the range. It is in our case.

$ ./formal.rb
4
ruby
true
false
Range
true

Running the example gives this output.

## Ruby object literals

As we have already mentioned, some built-in objects can be created
using object literals. The following example shows several object literals.

object_literals.rb
  

#!/usr/bin/ruby

4.times { puts "Ruby" }

puts "Ruby".size
puts "Ruby".downcase

puts [1, 2, 3].include? 3
puts [1, 2, 3].empty?

puts :name.class
puts :name.frozen?

puts (1..6).class
puts (1..6).include? 4

In the above example we use literal notation to create a fixnum,
strings, arrays, symbols, and ranges.

4.times { puts "Ruby" }

We can immediately call a method on an integer literal. This line
prints a "Ruby" string four times to the terminal.

puts "Ruby".size
puts "Ruby".downcase

We call two methods on a String object created with a string
literal.

puts [1, 2, 3].include? 3
puts [1, 2, 3].empty?

Here we create two Array objects using array literal
notations. We check if a specific number is part of the array with the
include? method. The empty? method checks
if the array object is empty or not.

puts :name.class
puts :name.frozen?

Two methods of the Symbol object are called. The symbol is created
with a symbol literal, which starts with a colon.

puts (1..6).class
puts (1..6).include? 4

Two Range objects are created using the range literal.
We call two methods on those objects. The class method returns
the name of the class and the include? method checks
if a given number is part of the range.

$ ./object_literals.rb
Ruby
Ruby
Ruby
Ruby
4
ruby
true
false
Symbol
true
Range
true

Example output.

## Ruby object hierarchy

In many object-oriented languages objects form a hierarchy. Ruby has and object
hierarchy too. It is a tree-like hierarchy, where we have parent objects and
child objects. Objects inherit data and behaviour from their parent objects. At
the top of the hierarchy there is the root object. It is called the
Object. Each object in Ruby has at least one parent. In other
words, every object inherits from the basic Object object.

According to the official Ruby documentation, Object is the root of
Ruby's class hierarchy. Its methods are available to all classes
unless explicitly overridden.

mother_object.rb
  

#!/usr/bin/ruby

puts 4.is_a? Object
puts "Ruby".is_a? Object
puts [2, 3].is_a? Object
puts :name.is_a? Object
puts (1..2).is_a? Object

In the above code example we demonstrate that all objects inherit
from the root Object

puts 4.is_a? Object

We use the is_a? method to check if a number is a specific
type: in other words, if it inherits from a given object type.

$ ./mother_object.rb
true
true
true
true
true

All methods return true, which means that all objects inherit from the
mother object.

The inheritance hierarchy may be quite complex even for the very basic Ruby
objects.

inheritance.rb
  

#!/usr/bin/ruby

puts 6.class

puts 6.is_a? BasicObject
puts 6.is_a? Object
puts 6.is_a? Numeric
puts 6.is_a? Integer
puts 6.is_a? String

In this example we shed some light on the inheritance hierarchy
of a small numerical value.

puts 6.class

We find out what kind of object is the number value 6: Integer.

puts 6.is_a? BasicObject
puts 6.is_a? Object
puts 6.is_a? Numeric
puts 6.is_a? Integer

All the above lines return true. 

puts 6.is_a? String

The String is not a parent for the 6 value.

$ ./inheritance.rb 
Integer
true
true
true
true
false

We finish this section with an example, demonstrating inheritance of custom
user objects.

custom_inher.rb
  

#!/usr/bin/ruby

class Being

    def to_s
        "This is Being"
    end

    def get_id
        9
    end
end

class Living &lt; Being

    def to_s
        "This is Living"
    end
end

l = Living.new

puts l
puts l.get_id
puts l.is_a? Being
puts l.is_a? Object
puts l.is_a? BasicObject

In the example we create two objects, Being and Living.
The Living object inherits from the Being. The first is a
parent object and the second is a child object.

class Being

    def to_s
        "This is Being"
    end

    def get_id
        9
    end
end

This is a definition of a custom Ruby object. The definition is placed
between the class and end keywords. Inside the
definition, we create two methods. When the puts method
takes an object as a parameter, it calls its to_s method.
It usually gives a string representation/description of the object.

class Living &lt; Being

    def to_s
        "This is Living"
    end
end

We create a definition of the Living object. The object
inherits from the Being object. The &lt; operator is used
to create inheritance relationships. The  to_s method is
overwritten.

l = Living.new

From the above Living object template, we create an instance
of the Living object. The instance of a custom object is
created with the new keyword.

puts l

The puts method calls the to_s method of
the Living object. Had the to_s method not
been defined in the Living class, the to_s
method of the Being class would have been called.

puts l.get_id

The Living object has no get_id method defined.
In such a case, the parent classes are checked if there is such a method.
In our case the Being method has such a method and it is called.

puts l.is_a? Being

The line returns true. The Living is a type of a Being;
e.g. it inherits from the Being class.

puts l.is_a? Object
puts l.is_a? BasicObject

For our Living custom object, we have not explicitly specified
any relation to the Object or BasicObject
objects. Yet the two lines return true. This is because every object
in Ruby is automatically a descendant of these two objects. This is
done behind the scenes by the Ruby interpreter.

$ ./custom_inher.rb
This is Living
9
true
true
true

## Ruby toplevel

Ruby has a specific object referred to as Ruby toplevel. It is a default
execution environment defined outside any other context like class or module
definition. The toplevel's name is main. It is an instance of the
Object type. There is a local space associated with main, where all
local variables reside.

toplevel.rb
  

#!/usr/bin/ruby

n1 = 3
n2 = 5

puts local_variables

Kernel.puts self
puts self.class

```
n1 = 3
n2 = 5

```

Here we have defined two numeric variables. These variables are local to
the toplevel.

puts local_variables

Here we produce a list of all local variables. The local_variables
is a method of the Kernel module, which is mixed into
each Object, including the toplevel object.

Kernel.puts self

The self is a Ruby pseudo variable. It returns the current object
receiver. The line prints "main" to the console. It is the name for the Ruby
toplevel. The Kernel part of the Kernel.puts code
can be omitted. By fully specifying the name we show that the puts
method belongs to the Kernel module.

puts self.class

The line prints the class of the toplevel. We get the object type
of the toplevel. It is the Object, which is the root of Ruby's
class hierarchy.

$ ./toplevel.rb
n1
n2
main
Object

This is the output of the example. The n1 and n2 are the
local variables associated with toplevel. The main is the name given for the
Ruby toplevel execution environment. Finally, Object is the type of the toplevel.

We have another example related to the Ruby toplevel.

toplevel2.rb
  

#!/usr/bin/ruby

@name = "Jane"
@age = 17

def info
   "#{@name} is #{@age} years old"
end

puts self.instance_variables
puts self.private_methods.include? :info

puts info

We show instance variables and methods that belong
to the toplevel environment.

@name = "Jane"
@age = 17

We define two instance variables. Instance variables begin with
the @ character in Ruby. Instance variables belong to a
specific object instance. In this case, they belong to the Ruby toplevel.

def info
   "#{@name} is #{@age} years old"
end

This is a method definition. Each method must belong to some object. This method
belongs to the toplevel object. All toplevel methods are private. Access to
private methods is restricted.

puts self.instance_variables

The instance_variables method prints all instance variables of the
self, which points to the Ruby toplevel in this context.

puts self.private_methods.include? :info

All toplevel methods are automatically private. The private_methods
returns all private methods of the object. Since there are many methods, we call
the include? method to check if the info method is among them.
Note that we refer to the info method by its symbolic name.

$ ./toplevel2.rb
@name
@age
true
Jane is 17 years old

This chapter covered some basics of the objects in Ruby language.

[Contents](..)
[Previous](../variables/)
[Next](../datatypes/)