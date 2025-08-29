+++
title = "PHP OOP"
date = 2025-08-29T20:04:35.934+01:00
draft = false
description = "Learn object-oriented programming (OOP) in PHP with this comprehensive tutorial, covering classes, inheritance, polymorphism, and best practices."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP OOP

last modified May 18, 2025

In this article we talk about object-oriented programming in PHP.

There are three widely used programming paradigms there: procedural, functional,
and object-oriented. PHP supports both procedural and object-oriented
programming.

*Object-oriented programming (OOP)* is a programming paradigm that uses objects
and their interactions to design applications and computer programs.

The basic programming concepts in OOP are:

    - Abstraction

    - Polymorphism

    - Encapsulation

    - Inheritance

*Abstraction* is simplifying complex reality by modeling classes
appropriate to the problem. *Polymorphism* is the process of using an
operator or function in different ways for different data input.
*Encapsulation* hides the implementation details of a class from other
objects. *Inheritance* is a way to form new classes  using classes that
have already been defined.

## PHP objects

Objects are basic building blocks of a PHP OOP program. An object is a
combination of data and methods. In a OOP program, we create objects. These
objects communicate together through methods. Each object can receive messages,
send messages, and process data.

There are two steps in creating an object. First, we create a class. A
*class* is a template for an object. It is a blueprint which describes
the state and behavior that the objects of the class all share. A class can be
used to create many objects. Objects created at runtime from a class are called
*instances* of that particular class.

simple_class.php
  

&lt;?php

class Simple {}

$object = new Simple();
print_r($object);
echo gettype($object), "\n";

In our first example, we create a simple object.

class Simple {}

This is a simple class definition. The body of the template is empty. It does
not have any data or methods.

$object = new Simple();

We create a new instance of the Simple class. For this we have the
new keyword. The $object variable is the handle to the
created object.

print_r($object);
echo gettype($object), "\n";

We use the print_r function to get information about the object and
the gettype function to get the type of the variable.

$ php simple_class.php
Simple Object
(
)
object

We don't get much info, since the class definition was empty.
The type of the variable is object.

## PHP object attributes

Object attributes is the data bundled in an instance of a class. The object
attributes are called *instance variables* or *member fields*. An
instance variable is a variable defined in a class, for which each object in the
class has a separate copy.

member_fields.php
  

&lt;?php

class Person {

    public $name = "";
}

$p1 = new Person();
$p1-&gt;name = "Jane";

$p2 = new Person();
$p2-&gt;name = "Beky";

echo $p1-&gt;name . "\n";
echo $p2-&gt;name . "\n";

In the above PHP script, we have a Person class with
one member field.

$p1 = new Person();
$p1-&gt;name = "Jane";

We create an instance of the Person class and set the $name
variable to "Jane". We use the *-&gt;* operator to access the attributes of
objects.

$p2 = new Person();
$p2-&gt;name = "Beky";

We create another instance of the Person class. Here
we set the variable to "Beky".

echo $p1-&gt;name . "\n";
echo $p2-&gt;name . "\n";

We print the contents of the variables to the console.

$ php member_fields.php
Jane
Beky

We see the output of the script. Each instance of the Person
class has a separate copy of the $name member field.

## PHP methods

Methods are functions defined inside the body of a class. They are used to
perform operations with the attributes of our objects. Methods are essential in
*encapsulation* concept of the OOP paradigm. For example, we might have a
connect method in our AccessDatabase class. We need not to be
informed how exactly the method connect connects to the database.
We only know that it is used to connect to a database. This is essential in
dividing responsibilities in programming, especially in large applications.

circle.php
  

&lt;?php

class Circle {

    public $radius;

    function setRadius($radius) {

        $this-&gt;radius = $radius;
    }

    function area() {

        return $this-&gt;radius * $this-&gt;radius * M_PI;
    }
}

$c = new Circle();
$c-&gt;setRadius(5);

echo $c-&gt;area(), "\n";

In the code example, we have a Circle class. We define two methods.

 public $radius;

We have one member field. It is the radius of the circle. The
public keyword is an access specifier. It tells that the variable
is fully accessible from the outside world.

function setRadius($radius) {

    $this-&gt;radius = $radius;
}

This is the setRadius method. It is a normal PHP function. We call
functions defined inside classes *methods*. The $this
variable is a special variable which we use to access the member fields from
methods.

function area() {

    return $this-&gt;radius * $this-&gt;radius * M_PI;
}

The area method returns the area of a circle. The M_PI
is a built-in constant.

$ php circle.php
78.539816339745

## PHP access modifiers

*Access modifiers* set the visibility of methods and member fields. PHP has
three access modifiers: public, protected, and private.
The public members can be accessed from anywhere. The protected
members can be accessed only within the class itself and by inherited and parent
classes. The private members may only be accessed by the class that
defines the member.

Access modifiers protect data against accidental modifications. They make the
programs more robust.

access1.php
  

&lt;?php

class Person {

    public $name = "";
    private $age;
}

$p = new Person();
$p-&gt;name = "Jane";
#$p-&gt;age = 17;

echo $p-&gt;name . "\n";

In the above PHP script, we have two member fields; one is declared public, the
other private.

$p-&gt;name = "Jane";
#$p-&gt;age = 17;

We access the $name member from the outside world. By the outside world,
we mean 'not in the class'. It is OK, since the $name variable is declared
public. Accessing the $age member is not possible. The
private modifier prohibits this. If we uncomment the code line, we
get the 'Fatal error: Cannot access private property Person::$age' error.

access2.php
  

&lt;?php

class Base {

    public $name = "Base";
    protected $id = 6124;
    private $is_defined = "yes";

}

class Derived extends Base {

    public function info() {

        echo "This is Derived class\n";
        echo "Members inherited: \n";

        echo $this-&gt;name . "\n";
        echo $this-&gt;id . "\n";
        echo $this-&gt;is_defined . "\n";
    }
}

$derived = new Derived();
$derived-&gt;info();

In this PHP script, we have a Derived class which extends the
Base class. The Base class has three member fields,
all with different access modifiers. The $is_defined member is
not inherited. The private modifier prevents this.

public function info() {

The info method has a public access modifier.
This means, it can be called outside the class environment.

$ php access2.php
This is Derived class
Members inherited:
Base
6124

The public and protected members are inherited, the private member is not.

system.php
  

&lt;?php

class SysInfo {

    private function get_date() {
        return date("Y/m/d");
    }

    private function get_version() {
        return phpversion();
    }

    public function getInfo() {

        $date = $this-&gt;get_date();
        $version = $this-&gt;get_version();

        echo "The date is: $date\n";
        echo "The PHP version is: $version\n";
    }
}

$sys = new SysInfo();
$sys-&gt;getInfo();
#$sys-&gt;get_date();

In this script, we have a SysInfo class. It outputs some system
information to the console. We have two private functions and one public. The
private methods are here only for internal working of the SysInfo
class. They are not meant to be called outside the class.

$sys = new SysInfo();
$sys-&gt;getInfo();
#$sys-&gt;get_date();

We create an instance of the SysInfo class and call the publicly
available getInfo method. The getInfo method uses
internally the private methods to do its job. Uncommenting the last code line
yields to error.

## PHP method overloading

*Method overloading* allows the creation of several methods with the same
name which differ from each other in the type of the input.

What is method overloading good for? The Qt4 library gives a nice example for
the usage. The QPainter class has three methods to draw a
rectangle. Their name is drawRect and their parameters differ. One
takes a reference to a floating point rectangle object, another takes a
reference to an integer rectangle object and the last one takes four parameters,
x, y, width, height. If the C++ language, which is the language in which Qt is
developed, didn't have method overloading, the creators of the library would
have to name the methods like drawRectRectF,
drawRectRect, drawRectXYWH. The solution with method
overloading is more elegant.

overloading1.php
  

&lt;?php

class Sum {

    public function getSum() {

        return 0;
    }

    public function getSum($x) {

        return $x;
    }

    public function getSum($x, $y) {

        return $x + $y;
    }
}

$s = new Sum();
echo $s-&gt;getSum() . "\n" ;
echo $s-&gt;getSum(5) . "\n" ;
echo $s-&gt;getSum(3, 4) . "\n" ;

This is a method overloading, we know from languages like C#, Java or C++. But
this does not work in PHP. Running this example, we get the following error:
'Fatal error: Cannot redeclare Sum::getSum()'. PHP functions can take arbitrary
number of variables by default.

To simulate method overloading in PHP, we use the func_get_args function.

overloading2.php
  

&lt;?php

class Sum {

    public function getSum() {

        $sum = 0;
        $args = func_get_args();

        if (empty($args)) return 0;

        foreach ($args as $arg) {

            $sum += $arg;
        }

        return $sum;
    }
}

$s = new Sum();

echo $s-&gt;getSum() . "\n" ;
echo $s-&gt;getSum(5) . "\n" ;
echo $s-&gt;getSum(3, 4) . "\n" ;
echo $s-&gt;getSum(3, 4, 7) . "\n" ;

This time, the script will run.

$args = func_get_args();

The func_get_args function returns an array
comprising a function's argument list.

foreach ($args as $arg) {

    $sum += $arg;
}

We go throught all members of the array, and calculate the sum.

echo $s-&gt;getSum() . "\n" ;
echo $s-&gt;getSum(5) . "\n" ;
echo $s-&gt;getSum(3, 4) . "\n" ;
echo $s-&gt;getSum(3, 4, 7) . "\n" ;

We call the same method name with different number of inputs.

$ php overloading2.php
0
5
7
14

## PHP constructor

A constructor is a special kind of a method. It is automatically called when the
object is created. The purpose of the constructor is to initiate the state of
the object. The name of the constructor in PHP is __construct
(with two underscores).

constructor.php
  

&lt;?php

class Song {

    function __construct() {

        echo "Song object is created \n";
    }
}

$song = new Song();

We have a Song class. This class has a constructor that prints
message to the console.

$song = new Song();

This is the time, when the object is created and the constructor is called.
We get a message in the console.

$ php constructor.php
Song object is created

Constructors often take arguments.

constructor2.php
  

&lt;?php

class Song {

    function __construct($song) {

        echo "Song $song is created \n";
    }
}

$song = new Song("Bad romance");

We modify the previous example a bit. We pass a value to the constructor.

function __construct($song) {

    echo "Song $song is created \n";
}

The passed argument is stored in the local $song variable.

$ php constructor2.php
Song Bad romance is created

Now we have a message with a song title printed to the console.

In the next example, we initiate data members of the class.
Initiation of variables is a typical job for constructors.

friend.php
  

&lt;?php

class Friend {

    private $born;
    private $name;

    function __construct($name, $born) {
        $this-&gt;name = $name;
        $this-&gt;born = $born;
    }

    function getInfo() {
        echo "My friend $this-&gt;name was born in $this-&gt;born\n";
    }
}

$friend = new Friend("Monika", 1990);
$friend-&gt;getInfo();

We have a Friend class with data members and methods.

private $born;
private $name;

We have two variables in the class definition. The private keyword
is an access modifier. It is a form of encapsulation. The private
keyword is the most restrictive modifier. It allows only the object in question
to access the variable. No descendants, no other objects. More about this topic
later.

function __construct($name, $born) {

    $this-&gt;name = $name;
    $this-&gt;born = $born;
}

In the constructor, we initiate the two data members. The $this variable
is a handler used to reference the object variables.

$friend = new Friend("Monika", 1990);
$friend-&gt;getInfo();

We create a Friend object with two arguments. Then we call the
getInfo method of the object. To call object methods, we use the
-&gt; operator.

$ php friend.php
My friend Monika was born in 1990

## PHP constructor property promotion

Constructor property promotion is a feature introduced in PHP 8.0 that allows
you to declare and initialize class properties directly in the constructor
parameter list. This reduces boilerplate code and makes class definitions more
concise.

promotion.php
  

&lt;?php

class User {
    public function __construct(
        public string $name,
        private int $age,
        protected string $email
    ) {}
}

$user = new User("Alice", 30, "alice@example.com");
echo $user-&gt;name . "\n";
// echo $user-&gt;age; // Error: private property
// echo $user-&gt;email; // Error: protected property

In this example, the User class uses constructor property
promotion. The name property is public, age is
private, and email is protected. These properties are automatically
declared and initialized from the constructor arguments.

This feature is especially useful for data transfer objects and classes with
many properties, making your code shorter and easier to read.

## PHP class constants

PHP enables to create class constants. These constants do not belong to a
concrete object. They belong to the class. By convention, constants are written
in uppercase letters.

constants.php
  

&lt;?php

class Math {

    const PI = 3.14159265359;

    public function getPI() {

        echo self::PI;
    }
}

$math = new Math();

echo Math::PI, "\n";
echo $math-&gt;getPI(), "\n";

We have a Math class with a PI constant.

const PI = 3.14159265359;

The const keyword is used to define a constant.

public function getPI() {

    echo self::PI;
}

Class constants are accessed from within methods using the self
keyword followed by two colons.

echo Math::PI, "\n";
echo $math-&gt;getPI(), "\n";

We print the PI constant to the console. In the first case, we get
the constant value by referring to the class name, followed by two colons and a
constant name. Note that no object was needed to get the class constant. In the
second case, we use the object method.

## PHP instanceof keyword

The instanceof keyword is used to determine whether a
PHP variable is an instantiated object of a certain class.

instanceof.php
  

&lt;?php

class Cat {}
class Dog {}
class Bird {}

$objects = [ new Cat(), new Dog(), new Cat(), new Bird(), new Bird(),
             new Dog(), new Dog(), new Cat(), new Bird() ];

shuffle($objects);

foreach ($objects as $object) {

    if ($object instanceof Cat) {

        echo "It is a Cat\n";
    } elseif ($object instanceof Dog) {

        echo "It is a Dog\n";
    } else if ($object instanceof Bird) {

        echo "It is a Bird\n";
    }
}

In the above script, we have three classes: Cat,
Dog, and Bird. We traverse the array and print the
class for each array value.

$objects = [ new Cat(), new Dog(), new Cat(), new Bird(), new Bird(),
             new Dog(), new Dog(), new Cat(), new Bird() ];

We create an array of these objects.

shuffle($objects);

We shuffle the array. At this point, we don't know the class types for the
values of the array.

if ($object instanceof Cat) {

    echo "It is a Cat\n";
}

Here we use the instanceof keyword to find out the
type of the class.

$ php instanceof.php
It is a Bird
It is a Cat
It is a Cat
It is a Dog
It is a Dog
It is a Cat
It is a Dog
It is a Bird
It is a Bird

## PHP __toString method

When we use the print or the echo keyword
with the object instance, the __toString special method is called.
We will demonstrate this in the following example.

tostring.php
  

&lt;?php

class Cat {

    public $name;
    public $age;

    function __construct($name, $age) {

        $this-&gt;age = $age;
        $this-&gt;name = $name;
    }

    function __toString() {

        return "Cat: $this-&gt;name, Age: $this-&gt;age \n";
    }
}

$missy = new Cat("Missy", 6);
$lucky = new Cat("Lucky", 4);

print $missy;
echo $lucky;

We have a Cat class with a __toString special method
defined.

function __toString() {

    return "Cat: $this-&gt;name, Age: $this-&gt;age \n";
}

The method prints the basic info about the object.

$missy = new Cat("Missy", 6);
$lucky = new Cat("Lucky", 4);

We create two objects of the Cat class.

print $missy;
echo $lucky;

And we use the print or the echo keywords on them.

$ php tostring.php
Cat: Missy, Age: 6
Cat: Lucky, Age: 4

## PHP inheritance

The inheritance is a way to form new classes using classes that have already
been defined. The newly formed classes are called *derived* classes, the
classes that we derive from are called *base* classes. Important benefits
of inheritance are code reuse and reduction of complexity of a program. The
derived classes (descendants) override or extend the functionality of base
classes (ancestors).

derived.php
  

&lt;?php

class Base {

    function __construct() {

       echo "Construction of Base class \n";
    }
}

class Derived extends Base {

    function __construct() {
        parent::__construct();
        echo "Construction of Derived class \n";
    }
}

$obj1 = new Base();
$obj2 = new Derived();

In this PHP script, we have two classes: a Base class and a
Derived class. The Derived class inherits from the
Base class.

class Derived extends Base {

In PHP, we use the extends keyword to create
inheritance relations.

function __construct() {

    parent::__construct();
    echo "Construction of Derived class \n";
}

In the constructor of the Derived class, we call the parent constructor. We use
the parent keyword, followed by two colons and the
__construct method. The constructors of the parent classes must be
called explicitly.

$obj1 = new Base();
$obj2 = new Derived();

We instantiate both the Base and the Derived classes.

$ php derived.php
Construction of Base class
Construction of Base class
Construction of Derived class

A more complex example follows.

inheritance.php
  

&lt;?php

abstract class Being {

    protected $isAlive = true;

    public function isAlive() {

        if ($this-&gt;isAlive) {
            echo "Being is alive\n";
        } else {
            echo "Being is not alive\n";
        }
    }

    public function kill() {

        $this-&gt;isAlive = false;
    }
}

abstract class Animal extends Being {

    protected $age;

    public function __construct($age) {

        $this-&gt;age = $age;
    }

    protected function setAge($age) {

        $this-&gt;age = $age;
    }

    public function getAge() {

        return $this-&gt;age;
    }
}

class Cat extends Animal {

    private $name;

    public function __construct($name, $age) {

        $this-&gt;name = $name;
        parent::__construct($age);
    }

    public function getName() {

        return $this-&gt;name;
    }
}

$cat = new Cat("Cici", 4);
$cat-&gt;isAlive();
echo $cat-&gt;getName() . " is " .  $cat-&gt;getAge() . " years old\n";
$cat-&gt;kill();
$cat-&gt;isAlive();

We have used several new concepts here. In the code example, we have three
classes: Being, Animal, and Cat. The
Animal class inherits from the Being class. The
Cat class inherits from the Animal class. Classes
inherit methods and data members that are not declared as private.

abstract class Being {

The Being class is declared to be abstract. The
abstract keyword prohibits instantiation of classes. It does not
make much sense to create an instance of the class Being.

protected $isAlive = true;

The $isAlive data member is declared to be protected.
Such members can be accessed only by the classes that define them and by their
descendants.

abstract class Animal extends Being {

The Animal class is also declared to be abstract. It inherits from class
Being. For this, we use the extends keyword. The Animal
is a descendant. It inherits methods and variables of the base Being class.

class Cat extends Animal {

The Cat class inherits from the Animal class. It inherits
from the Animal class and indirectly from the Being class
too. It is not declared abstract, which means that we can instantiate it.

parent::__construct($age);

In the constructor of the Cat class, we call the parent constructor
using the parent keyword, followed by two colons
and the __construct method. The constructors of the parent
classes must be called explicitly.

$cat = new Cat("Cici", 4);
$cat-&gt;isAlive();
echo $cat-&gt;getName() . " is " .  $cat-&gt;getAge() . " years old\n";
$cat-&gt;kill();
$cat-&gt;isAlive();

We create a new Cat: Cici, 4 years old. Then we call functions on the cici object.
Note the usage of methods that were not created in the Cat class, but
rather inherited from the parent classes.

$ php inheritance.php
Being is alive
Cici is 4 years old
Being is not alive

## PHP abstract classes and methods

Abstract classes cannot be instantiated. If a class contains at least one
abstract method, it must be declared abstract too. Abstract methods cannot be
implemented, they merely declare the methods' signatures. When we inherit from
an abstract class, all abstract methods must be implemented by the derived
class. Furthermore, these methods must be declared with the same or with a less
restricted visibility.

Unlike *interfaces*, abstract classes may have methods with full
implementation and may also have defined member fields. So abstract classes
may provide a partial implementation. Programmers often put some common
functionality into abstract classes. And these abstract classes are later
subclassed to provide more specific implementation. For example, the Qt
graphics library has a QAbstractButton, which is the abstract
base class of button widgets, providing functionality common to buttons.
Buttons Q3Button, QCheckBox, QPushButton,
QRadioButton, and QToolButton inherit
from this base abstract class.

Formally put, abstract classes are used to enforce a protocol. A protocol is a
set of operations which all implementing objects must support.

abstract.php
  

&lt;?php

abstract class Drawing {

    protected $x = 0;
    protected $y = 0;

    public abstract function area();

    public function getCoordinates() {

        echo "\$x is $this-&gt;x\n";
        echo "\$y is $this-&gt;y\n";
    }
}

class Circle extends Drawing {

    private $radius;

    public function __construct($x, $y, $r) {

        $this-&gt;radius = $r;
        $this-&gt;x = $x;
        $this-&gt;y = $y;
    }

    public function area() {

        return $this-&gt;radius * $this-&gt;radius * pi();
    }

   public function __toString() {

       return "Circle, at x: $this-&gt;x, y: $this-&gt;y, radius: $this-&gt;radius";
   }

}

$o = new Circle(12, 45, 22);
echo "$o \n";
echo "Area of the circle: " . $o-&gt;area() . "\n";
echo $o-&gt;getCoordinates();

In our PHP script, we have an abstract base Drawing class. The
class defines two member fields, defines one method and declares one method. One
of the methods is abstract, the other one is fully implemented. The
Drawing class is abstract because we cannot draw it. We can draw a
circle, a dot, or a square. The Drawing class has some common
functionality to the objects that we can draw.

class Circle extends Drawing {

A Circle is a subclass of the Drawing class. It must
implement the abstract area method.

$ php abstract.php
Circle, at x: 12, y: 45, radius: 22
Area of the circle: 1520.53084434
$x is 12
$y is 45

## PHP interfaces

A remote control is an interface between the viewer and the TV. It is an
interface to this electronic device. Diplomatic protocol guides all activities
in the diplomatic field. Rules of the road are rules that motorists, cyclists,
and pedestrians must follow. Interfaces in programming are analoguos to the
previous examples.

Interfaces are:

- APIs

- Contracts

Objects interact with the outside world with the methods they expose. The actual
implementation is not important to the programmer, or it also might be secret. A
company might sell a library and it does not want to disclose the actual
implementation. A programmer might call a maximize method on a
window of a GUI toolkit, but knows nothing about how this method is implemented.
From this point of view, interfaces are methods through which objects interact
with the outside world, without exposing too much about their inner workings.

From the second point of view, interfaces are contracts. If agreed upon, they
must be followed. They are used to design an architecture of an application, and
they help
organize the code.

Interfaces are fully abstract types. They are declared using the
interface keyword. Interfaces can only have method signatures and
constants. All method signatures declared in an interface must be public. They
cannot have fully implemented methods, nor member fields. A PHP class may
implement any number of interfaces. An interface can also extend any number of
interfaces. A class that implements an interface must implement all method
signatures of an interface.

Interfaces are used to simulate *multiple inheritance*. A PHP class can
extend only one class. A PHP class can implement multiple interfaces. Multiple
inheritance using the interfaces is not about inheriting methods and variables.
It is about inheriting ideas or contracts, which are described by the
interfaces.

There is one important distinction between interfaces and abstract classes.
Abstract classes provide partial implementation for classes that are related in
the inheritance hierarchy. Interfaces on the other hand can be implemented by
classes that are not related to each other. For example, we have two buttons: a
classic button and a round button. Both inherit from an abstract button class
that provides some common functionality to all buttons. Implementing classes are
related, since all are buttons. Another example might have classes
Database and SignIn. They are not related to each
other. We can apply an ILoggable interface that would force them to
create a method to do logging.

simple_interface.php
  

&lt;?php

interface IInfo {

    public function do_inform();
}

class Some implements IInfo {

    public function do_inform() {

        echo "This is a Some class\n";
    }
}

$sm = new Some();
$sm-&gt;do_inform();

This is a simple PHP script demonstrating an interface.

interface IInfo {

    public function do_inform();
}

This is an interface IInfo. It has the do_inform
method signature.

class Some implements IInfo {

We use the implements to implement from an
interface.

public function do_inform() {

    echo "This is a Some class\n";
}

The class provides an implementation for the do_inform method.

The next example shows how a class can implement multiple interfaces.

interface.php
  

&lt;?php

interface Device {

    public function switch_on();
    public function switch_off();
}

interface Volume {

    public function volume_up();
    public function volume_down();
}

interface Pluggable {

    public function plug_in();
    public function plug_off();
}

class CellPhone implements Device, Volume, Pluggable {

    public function switch_on() { echo "Switching on\n"; }
    public function switch_off() { echo "Switching off\n"; }

    public function volume_up() { echo "Volume up\n"; }
    public function volume_down() { echo "Volume down\n"; }

    public function plug_in() { echo "Plugging in\n"; }
    public function plug_off() { echo "Plugging off\n"; }
}

$o = new CellPhone();
$o-&gt;switch_on();
$o-&gt;volume_up();
$o-&gt;plug_in();

We have a *CellPhone* class that inherits from three interfaces.

class CellPhone implements Device, Volume, Pluggable {

The class implements all three interfaces, which are divided by a comma. The
CellPhone class must implement all method signatures from all three
interfaces.

$ php interface.php
Switching on
Volume up
Plugging in

The next example shows how interfaces can extend from multiple other interfaces.

extending_interfaces.php
  

&lt;?php

interface IInfo {

    public function do_inform();
}

interface IVersion {

    public function get_version();
}

interface ILog extends IInfo, IVersion {

    public function do_log();
}

class DBConnect implements ILog {

    public function do_inform() {

        echo "This is a DBConnect class\n";
    }

    public function get_version() {

        echo "Version 1.02\n";
    }

    public function do_log() {

        echo "Logging\n";
    }

    public function connect() {

        echo "Connecting to the database\n";
    }
}

$db = new DBConnect();
$db-&gt;do_inform();
$db-&gt;get_version();
$db-&gt;do_log();
$db-&gt;connect();

In this PHP script, we define three interfaces.
Extending interfaces allows us to organize them.

interface ILog extends IInfo, IVersion {

    public function do_log();
}

The *ILog* interface extends other two interfaces.

public function do_inform() {

    echo "This is a DBConnect class\n";
}

The DBConnect class implements the do_inform method.
This method was inherited by the ILog interface, which the class
implements.

## PHP polymorphism

Polymorphism is the process of using an operator or function in different ways
for different data input. In practical terms, polymorphism means that if class B
inherits from class A, it doesn't have to inherit everything about class A; it
can do some of the things that class A does differently.

In general, polymorphism is the ability to appear in different forms.
Technically, it is the ability to redefine methods for derived classes.
Polymorphism is concerned with the application of specific implementations to an
interface or a more generic base class.

polymorphism.php
  

&lt;?php

abstract class Shape {

    private $x = 0;
    private $y = 0;

    public abstract function area();
}

class Rectangle extends Shape {

    function __construct($x, $y) {

        $this-&gt;x = $x;
        $this-&gt;y = $y;
    }

    function area() {

        return $this-&gt;x * $this-&gt;y;
    }
}

class Square extends Shape {

    function __construct($x) {

        $this-&gt;x = $x;
    }

    function area() {

        return $this-&gt;x * $this-&gt;x;
    }
}

$shapes = [ new Square(5), new Rectangle(12, 4), new Square(8) ];

foreach ($shapes as $shape) {

    echo $shape-&gt;area() . "\n";
}

In the above PHP script, we have an abstract Shape class. This class
morphs into two descendant classes: Rectangle and Square.
Both provide their own implementation of the area method.
Polymorphism brings flexibility and scalability to the OOP systems.

In this article we have covered OOP in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

## Source

[PHP language reference](https://www.php.net/manual/en/langref.php)

List [all PHP](/php/) tutorials.