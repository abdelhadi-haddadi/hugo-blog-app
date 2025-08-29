+++
title = "Ruby object-oriented programming II"
date = 2025-08-29T20:03:11.327+01:00
draft = false
description = "In this part of the Ruby tutorial, we continue covering Object-oriented programming in Ruby."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../oop/)
[Next](../regex/)

# Ruby object-oriented programming II

last modified October 18, 2023

In this part of the Ruby tutorial, we continue talking about object-oriented
programming in Ruby.

We start with attribute accessors. We cover class constants, class methods and
operator overloading. We define polymorphism and show how it is used in Ruby. We
also mention modules and exceptions.

## Ruby attribute accessors

All Ruby variables are private. It is possible to access them only via methods.
These methods are often called setters and getters. Creating a setter and a
getter method is a very common task. Therefore Ruby has convenient methods to
create both types of methods. They are attr_reader,
attr_writer and attr_accessor.

The attr_reader creates getter methods. The attr_writer
method creates setter methods and instance variables for this setters.
The attr_accessor method creates both getter, setter methods
and their instance variables.

arw.rb
  

#!/usr/bin/ruby

class Car

    attr_reader :name, :price
    attr_writer :name, :price

    def to_s
        "#{@name}: #{@price}"
    end

end

c1 = Car.new
c2 = Car.new

c1.name = "Porsche"
c1.price = 23500

c2.name = "Volkswagen"
c2.price = 9500

puts "The #{c1.name} costs #{c1.price}"

puts c1
puts c2

We have a Car class. In the definition of the class, we use
the attr_reader and attr_writer to
create two getter and setter methods for the Car class.

attr_reader :name, :price

Here we create two instance methods named name and price.
Note that the attr_reader takes symbols of methods
as parameters.

attr_writer :name, :price

The attr_writer creates two setter methods named
name and price and two instance variables, @name and
@price.

c1.name = "Porsche"
c1.price = 23500

In this context, two setter methods are called to fill
instance variables with some data.

puts "The #{c1.name} costs #{c1.price}"

Here two getter methods are called to get data from
the instance variables of the c1 object.

$ ./arw.rb
The Porsche costs 23500
Porsche: 23500
Volkswagen: 9500

As we already stated above, the attr_accessor method
creates getter, setter methods and their instance variables.

accessor.rb
  

#!/usr/bin/ruby

class Book
   attr_accessor :title, :pages
end

b1 = Book.new
b1.title = "Hidden motives"
b1.pages = 255

p "The book #{b1.title} has #{b1.pages} pages"

We have a Book class in which the attr_accessor
creates two pairs of methods and two instance variables.

class Book
   attr_accessor :title, :pages
end

The attr_accessor method that sets up title and
pages methods and @title and @pages
instance variables.

b1 = Book.new
b1.title = "Hidden motives"
b1.pages = 255

An object of a Book class is created. Two setter methods
fill the instance variables of the object.

p "The book #{b1.title} has #{b1.pages} pages"

In this code line we use two getter methods to read
the values of the instance variables.

$ ./accessor.rb
"The book Hidden motives has 255 pages"

## Ruby class constants

Ruby enables you to create class constants. These constants do not belong
to a concrete object. They belong to the class. By convention, constants are
written in uppercase letters.

class_constant.rb
  

#!/usr/bin/ruby

class MMath

    PI = 3.141592
end

puts MMath::PI

We have a MMath class with a PI constant.

PI = 3.141592

We create a PI constant. Remember that constants in Ruby
are not enforced.

puts MMath::PI

We access the PI constant using the :: operator.

$ ./class_constant.rb
3.141592

Running the example we see this output.

## Ruby to_s method

Each object has a to_s method. It returns a
string representation of the object.  Note that when
the puts method takes an object as a parameter,
the to_s of the object is being called.

tostring.rb
  

#!/usr/bin/ruby

class Being

    def to_s
        "This is Being class"
    end
end

b = Being.new
puts b.to_s
puts b

We have a Being class in which we override the default implementation
of the to_s method.

def to_s
    "This is Being class"
end

Each class created inherits from the base Object.
The to_s method belongs to this class.
We overwrite the to_s method and create a new implementation.
We provide a human-readable description of our object.

b = Being.new
puts b.to_s
puts b

We create a Being class and call the to_s method
twice. The first time explicitly, the second time implicitly.

$ ./tostring.rb
This is Being class
This is Being class

This is what we get when we run the example.

## Ruby operator overloading

Operator overloading is a situation where different operators
have different implementations depending on their arguments.

In Ruby there is only a slight distinction between an operator
and a method.

operator_overloading.rb
  

#!/usr/bin/ruby

class Circle

    attr_accessor :radius

    def initialize r
        @radius = r
    end

    def +(other)
        Circle.new @radius + other.radius
    end

    def to_s
        "Circle with radius: #{@radius}"
    end
end

c1 = Circle.new 5
c2 = Circle.new 6
c3 = c1 + c2

puts c3

In the example, we have a Circle class. We overload
the + operator in the class. We use it to add two circle objects.

def +(other)
    Circle.new @radius + other.radius
end

We define a method with a + name. The method adds
the radiuses of two circle objects.

c1 = Circle.new 5
c2 = Circle.new 6
c3 = c1 + c2

We create two circle objects. In the third line, we add these
two objects to create a new one.

$ ./operator_overloading.rb
Circle with radius: 11

Adding these two circle objects creates a third with a radius of 11.

## Ruby class methods

Ruby methods can be divided into class methods and instance methods.
*Class methods* are called on a class. They cannot be called on an
instance of a class.

Class methods cannot access instance variables.

class_methods.rb
  

#!/usr/bin/ruby

class Circle

    def initialize x
        @r = x
    end

    def self.info
       "This is a Circle class"
    end

    def area
        @r * @r * 3.141592
    end

end

p Circle.info
c = Circle.new 3
p c.area

The above code example presents a Circle class. Apart
from a constructor method, it has one class and one instance method.

def self.info
    "This is a Circle class"
end

Methods that start with a self keyword are class methods.

def area
    "Circle, radius: #{@r}"
end

Instance methods do not start with the self keyword.

p Circle.info

We call a class method. Note that we call the method on a class name.

c = Circle.new 3
p c.area

To call an instance method, we must first create an object.
Instance methods are always called on an object. In our case, the
c variable holds the object and we call the area method on the
circle object. We utilize a dot operator.

$ ./class_methods.rb
"This is a Circle class"
28.274328

There are three ways to create a class method in Ruby.

class_methods2.rb
  

#!/usr/bin/ruby

class Wood

    def self.info
       "This is a Wood class"
    end
end

class Brick

    class &lt;&lt; self
        def info
           "This is a Brick class"
        end
    end
end

class Rock

end

def Rock.info
   "This is a Rock class"
end

p Wood.info
p Brick.info
p Rock.info

The example has three classes. Each of them has one
class method.

def self.info
    "This is a Wood class"
end

Class methods may start with a self keyword.

class &lt;&lt; self
    def info
        "This is a Brick class"
    end
end

Another way is to put a method definition after the
class &lt;&lt; self construct.

def Rock.info
   "This is a Rock class"
end

```
$ ./classmethods2.rb
"This is a Wood class"
"This is a Brick class"
"This is a Rock class"

```

We see the output of calling all three class methods on a
Wood, Brick, and Rock
classes.

## Three ways to create an instance method in Ruby

Ruby has three basic ways to create instance methods. Instance methods belong to
an instance of an object. They are called on an object using a dot operator.

three_ways.rb
  

#!/usr/bin/ruby

class Wood

    def info
       "This is a wood object"
    end
end

wood = Wood.new
p wood.info

class Brick

    attr_accessor :info
end

brick = Brick.new
brick.info = "This is a brick object"
p brick.info

class Rock

end

rock = Rock.new

def rock.info
    "This is a rock object"
end

p rock.info

In the example we create three instance objects from a Wood,
a Brick and a Rock class. Each object
has one instance method defined.

class Wood

    def info
       "This is a wood object"
    end
end

wood = Wood.new
p wood.info

This is probably the most common way to define and call an instance method. The
info method is defined inside the Wood class. Later, the object is
created and we call the info method on the object instance.

class Brick

    attr_accessor :info
end

brick = Brick.new
brick.info = "This is a brick object"
p brick.info

Another way is to create a method using the attribute accessors. This is a
convenient way which saves some typing for the programmer. The
attr_accessor creates two methods, the getter and the setter method
It also creates an instance variable which stores the data. The brick object is
created and the data is stored in the @info variable using the info
setter method. Finally, the message is read by the info getter method.

class Rock

end

rock = Rock.new

def rock.info
    "This is a rock object"
end

p rock.info

In the third way we create an empty Rock class. The
object is instantiated. Later, a method is dynamically
created and placed into the object.

$ ./three_ways.rb
"This is a wood object"
"This is a brick object"
"This is a rock object"

## Ruby polymorphism

*Polymorphism* is the process of using an operator or function in
different ways for different data input. In practical terms, polymorphism means
that if class B inherits from class A, it doesn't have to inherit everything
about class A; it can do some of the things that class A does differently. 

In general, polymorphism is the ability to appear in different forms.
Technically, it is the ability to redefine methods for derived classes.
Polymorphism is concerned with the application of specific implementations to an
interface or a more generic base class.

Note that there is some difference in the definition of the polymorphism in
statically typed languages like C++, Java or C# and dynamically typed languages
like Python or Ruby. In statically typed languages it is important when the
compilers determine the method definition, at compile time or at run time. In
dynamically typed languages we concentrate on the fact that methods with the
same name do different things.

polymorhism.rb
  

#!/usr/bin/ruby

class Animal

    def make_noise
        "Some noise"
    end

    def sleep
        puts "#{self.class.name} is sleeping."
    end

end

class Dog &lt; Animal

    def make_noise
        'Woof!'
    end

end

class Cat &lt; Animal

    def make_noise
        'Meow!'
    end
end

[Animal.new, Dog.new, Cat.new].each do |animal|
  puts animal.make_noise
  animal.sleep
end

We have a simple inheritance hierarchy. There is an Animal base class
and two descendants, a Cat and a Dog. Each of these three
classes has its own implementation of the make_noise method. The implementation
of the method of the descendants replaces the definition of a method in
the Animal class.

class Dog &lt; Animal

    def make_noise
        'Woof!'
    end

end

The implementation of the make_noise method in the
Dog class replaces the implementation of the
make_noise of the Animal class.

[Animal.new, Dog.new, Cat.new].each do |animal|
  puts animal.make_noise
  animal.sleep
end

We create an instance of each class. We call
make_noise and sleep methods on the objects.

$ ./polymorhism.rb
Some noise
Animal is sleeping.
Woof!
Dog is sleeping.
Meow!
Cat is sleeping.

## Ruby modules

A Ruby Module is a collection of methods, classes, and constants.
Modules are similar to classes with a few differences. Modules cannot
have instances and cannot subclasses.

Modules are used to group related classes, methods and constants can be put into
separate modules.  This also prevents name clashes, because modules encapsulate the
objects they contain. In this regard, Ruby modules are similar to C# namespaces
and Java packages.

Modules also support the use of mixins in Ruby. A *mixin* is a Ruby
facility to create *multiple inheritance*. If a class inherits functionality
from more than one class, we speak of multiple inheritance.

modules.rb
  

#!/usr/bin/ruby

puts Math::PI
puts Math.sin 2

Ruby has a built-in Math module. It has multiple
methods and a constant. We access the PI constant by using the :: operator.
Methods are accessed by a dot operator as in classes.

modules2.rb
  

#!/usr/bin/ruby

include Math

puts PI
puts sin 2

If we include a module in our script, we can refer to the
Math objects directly, omitting the Math name. Modules are added
to a script using the include keyword.

$ ./modules2.rb
3.141592653589793
0.9092974268256817

In the following example, we show how modules can be used to organize code.

modules3.rb
  

#!/usr/bin/ruby

module Forest

    class Rock ; end
    class Tree ; end
    class Animal ; end

end

module Town

   class Pool ; end
   class Cinema ; end
   class Square ; end
   class Animal ; end

end

p Forest::Tree.new
p Forest::Rock.new
p Town::Cinema.new

p Forest::Animal.new
p Town::Animal.new

Ruby code can be grouped semantically. Rocks and trees belong to a forest.
Pools, cinemas, squares belong to a town. By using modules our code has some
order. Animals can be in a forest and in a town too. In a single script, we
cannot define two animal classes. They would clash. Putting them in different
modules we solve the issue.

p Forest::Tree.new
p Forest::Rock.new
p Town::Cinema.new

We are creating objects that belong to a forest and to a town. To access an
object in a module, we use the :: operator.

p Forest::Animal.new
p Town::Animal.new

Two different animal objects are created. The Ruby interpreter can tell between
them. It identifies them by their module name.

$ ./modules3.rb
#&lt;Forest::Tree:0x97f35ec&gt;
#&lt;Forest::Rock:0x97f35b0&gt;
#&lt;Town::Cinema:0x97f3588&gt;
#&lt;Forest::Animal:0x97f3560&gt;
#&lt;Town::Animal:0x97f3538&gt;

The final code example of this section will demonstrate multiple inheritance
using Ruby modules. In this context the modules are called mixins.

mixins.rb
  

#!/usr/bin/ruby

module Device
    def switch_on ; puts "on" end
    def switch_off ; puts "off" end
end

module Volume
    def volume_up ; puts "volume up" end
    def vodule_down ; puts "volume down" end
end

module Pluggable
    def plug_in ; puts "plug in" end
    def plug_out ; puts "plug out" end
end

class CellPhone
    include Device, Volume, Pluggable

    def ring
        puts "ringing"
    end
end

cph = CellPhone.new
cph.switch_on
cph.volume_up
cph.ring

We have three modules and one class. The modules represent some functionality. A
device can be swiched on and off. Many objects can share this functionality,
including televisions, mobile phones, computers or refrigerators. Rather than
creating this ability to be swiched on/off for each object class, we separate it
in one module, which can be included in each object if necessary. This way the
code is better organized and more compact.

module Volume
    def volume_up ; puts "volume up" end
    def vodule_down ; puts "volume down" end
end

A Volume module organizes methods that are responsible for controlling the
volume level. If a device needs these methods, it simply includes the module
to its class.

class CellPhone
    include Device, Volume, Pluggable

    def ring
        puts "ringing"
    end
end

A cell phone adds all three modules with the include method.
The methods of the modules are mixed in the CellPhone class. And
are available for the instances of the class. The CellPhone class
has also its own ring method that is specific to it.

cph = CellPhone.new
cph.switch_on
cph.volume_up
cph.ring

A CellPhone object is created and we call three methods
upon the object.

$ ./mixins.rb
on
volume up
ringing

Running the example gives this output.

## Ruby exceptions

Exceptions are objects that signal deviations from the normal flow of program
execution. Exceptions are raised, thrown or initiated.

During the execution of our application, many things might go wrong. A disk
might get full and we cannot save our file. An Internet connection might go down
and our application tries to connect to a site. All these might result in a
crash of our application. To prevent this from happening, we should anticipate
and respond to errors in expected program operation. For this, we can use the
exception handling.

Exceptions are objects. They are descendants of a built-in Exception
class. Exception objects carry information about the exception. Its type
(the exception's class name), an optional descriptive string, and optional
traceback information. Programs may subclass Exception, or more often
StandardError, to obtain custom Exception objects that provide additional
information about operational anomalies.

zero_division.rb
  

#!/usr/bin/ruby

x = 35
y = 0

begin
    z = x / y
    puts z
rescue =&gt; e
    puts e
    p e
end

In the above program, we intentionally divide a number by zero.
This leads to an error.

begin
    z = x / y
    puts z

Statements that can fail are placed after the begin keyword.

rescue =&gt; e
    puts e
    p e
end

In the code following the rescue keyword, we deal with an exception.
In this case, we print the error message to the console. The e is an exception object
that is created when the error occurs.

$ ./zero_division.rb
divided by 0
#&lt;ZeroDivisionError: divided by 0&gt;

In the output of the example, we see the message of the exception. The
last line shows the exception object called ZeroDivisionError.

A programmer may raise exceptions himself using the raise keyword.

raise_exception.rb
  

#!/usr/bin/ruby

age = 17

begin
    if age &lt; 18
        raise "Person is a minor"
    end

    puts "Entry allowed"

rescue =&gt; e
    puts e
    p e
    exit 1
end

The entrance to a club is not allowed for people younger than 18 years.
We simulate this situation in our Ruby script.

begin
    if age &lt; 18
        raise "Person is a minor"
    end

    puts "Entry allowed"

If the person is a minor, an exception is raised. If the raise
keyword does not have a specific exception as a parameter, a RuntimeError
exception is raised setting its message to the given string. The code does
not reach the puts "Entry allowed" line. The execution of the code
is interrupted and it continues at the rescue block.

rescue =&gt; e
    puts e
    p e
    exit 1
end

In the rescue block, we print the error message and the string representation
of the RuntimeError object. We also call the exit method
to inform the environment that the execution of the script ended in error.

$ ./raise_exception.rb
Person is a minor
#&lt;RuntimeError: Person is a minor&gt;
$ echo $?
1

The person, a minor, was not allowed to enter the club.
The bash $? variable is set to the exit error of the script.

Ruby's ensure clause creates a block of code that always
executes, whether there is an exception or not.

stones.txt
  

Garnet
Topaz
Opal
Amethyst
Ruby
Jasper
Pyrite
Malachite
Quartz

ensure_clause.rb
  

```
#!/usr/bin/ruby

begin
    f = File.open("stones.txt", "r")

    while line = f.gets do
        puts line
    end

rescue =&gt; e
    puts e
    p e

ensure
    f.close if f
end

```

In the code example, we try to open and read the
stones file. I/O operations are error prone. We could
easily have an exception.

ensure
    f.close if f
end

In the ensure block we close the file handler. We check if the handler exists
because it might not have been created. Allocated resources are often placed in
the ensure block.

We can create our own custom exceptions if we want. Custom exceptions in Ruby
should inherit from theStandardError class.

custom_exception.rb
  

#!/usr/bin/ruby

class BigValueError &lt; StandardError ; end

LIMIT = 333
x = 3_432_453

begin

    if x &gt; LIMIT
        raise BigValueError, "Exceeded the maximum value"
    end

    puts "Script continues"

rescue =&gt; e

    puts e
    p e
    exit 1
end

Let's say we have a situation in which we cannot deal with big numbers.

class BigValueError &lt; StandardError ; end

We have a BigValueError class. This class derives from the built-in
StandardError class.

LIMIT = 333

Numbers which exceed this constant are considered to be "big" by our program.

if x &gt; LIMIT
    raise BigValueError, "Exceeded the maximum value"
end

If the value is bigger than the limit, we throw our custom exception.
We give the exception a message "Exceeded the maximum value".

$ ./custom_exception.rb
Exceeded the maximum value
#&lt;BigValueError: Exceeded the maximum value&gt;

In this chapter we finished talking about object-oriented programming
in Ruby language.

[Contents](..)
[Previous](../oop/)
[Next](../regex/)