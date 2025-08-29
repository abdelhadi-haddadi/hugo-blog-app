+++
title = "Ruby lexical structure"
date = 2025-08-29T20:03:10.204+01:00
draft = false
description = "In this part of the Ruby tutorial, we cover Ruby lexical structure. Computer languages, like human languages, have a lexical structure."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../ruby/)
[Next](../basics/)

# Ruby lexical structure

last modified October 18, 2023

Computer languages, like human languages, have a lexical structure. A source
code of a Ruby program consists of tokens. Tokens are atomic code elements.
In Ruby language we have various lexical structures, such as comments, variables,
literals, white space, operators, delimiters, and keywords.

## Ruby comments

*Comments* are used by humans to clarify the source code.
There are two types of comments in Ruby. Single-line and multi-line
comments. Single-line comments begin with the #character.
Multi-line comments are put between the =begin and
=end tokens.

comments.rb
  

#!/usr/bin/ruby

=begin
  comments.rb
  author Jan Bodnar
=end

# prints message to the terminal
puts "Comments example"

An example showing both types of comments. Comments are ignored by
the Ruby interpreter.

=begin
  comments.rb
  author Jan Bodnar
=end

This is an example of a multi-line comment. The two tokens must start at
the beginning of the line.

## Ruby white space

White space in Ruby is used to separate tokens and terminate statements
in the source file. It is also used to improve readability of the source code.

if true then
    puts "A message"
end

White spaces are required in some places. For example between the if
keyword and the true keyword. Or between the puts method
and the actual string. In other places, it is forbidden. It cannot be present in
variable identifiers or language keywords.

a=1
b = 2
c  =  3

The amount of space put between tokens is irrelevant for the Ruby interpreter.
However, it is important to have one style throughout the project.

whitespace.rb
  

#!/usr/bin/ruby

x = 5 + 3
puts x

x = 5
      + 3
puts x

x = 5 +
        3
puts x

A new line, a form of a white space, can be used to terminate statements.

x = 5 + 3

In the first case, we have one statement. The sum of the addition is
assigned to the x variable. The variable holds 8.

x = 5
      + 3

Now, there are two statements. The first statement is terminated with a
newline. The x variable is 5. There is another statement, +3, which
has no effect.

x = 5 +
        3

Finally, we have one statement. The newline is preceded with a + binary
operator, so the interpreter expects another value. It looks on the second line.
In this case, it takes both lines as one statement. The x variable
is 8.

$ ./whitespace.rb
8
5
8

## Ruby variables

A *variable* is an identifier, which holds a value. In programming we say
that we assign a value to a variable. Technically speaking, a variable is a
reference to a computer memory, where the value is stored. In Ruby, a variable
can hold a string, a number or various objects. Variables can be assigned
different values over time.

Variable names in Ruby are created from alphanumeric characters and underscore
(_) character. A variable cannot begin with a number. The interpreter can easier
distinguish between a literal number and a variable. Variable names cannot begin
with a capital letter. If an identifier begins with a capital letter, it is
considered to be a constant in Ruby.

Value
value2
company_name

These are valid variable names.

12Val
exx$
first-name

These are examples of invalid variable names.

Variable names may be preceded by two special characters, $ and
@. They are used to create a specific variable scope.

The variables are *case sensitive*. This means that price,
and pRice are two different identifiers.

case.rb
  

#!/usr/bin/ruby

number = 10
numBER = 11

puts number, numBER

In our script, we assign two numeric values to two identifiers.
The number and numBER are two different variables.
However, this practice is discouraged. The names of the variables should not 
be misleading.

$ ./case.rb
10
11

## Ruby constants

Constants are value holders which hold only one value over time. An identifier
with a first uppercase letter is a constant in Ruby. In programming it is a
convention to write all characters of a constant in uppercase.

Unlike in other languages, Ruby does not enforce constants to have only one
value over time. The interpreter only issues a warning if we assign a new value
to an existing constant.

constants.rb
  

#!/usr/bin/ruby

Name = "Robert"
AGE = 23

Name = "Juliet"

In the above example, we create two constants. One of the constants is redefined
later.

Name = "Robert"
AGE = 23

Two constants are created. When the identifier's name begins with an uppercase
letter, than we have a constant in Ruby. By convention, constants are usually
written in upperacse letters.

Name = "Juliet"

We redefine a constant. Which issues a warning.

$ ./constants.rb 
./constants.rb:6: warning: already initialized constant Name
./constants.rb:3: warning: previous definition of Name was here

Running the example.

## Ruby literal

A literal is a textual representation of a particular value of a type.
Literal types include boolean, integer, floating point, string, character,
and date. Technically, a literal will be assigned a value at compile
time, while a variable will be assigned at runtime.

age = 29
nationality = "Hungarian"

Here we assign two literals to variables. Number 29 and
string "Hungarian" are literals.

literals.rb
  

#!/usr/bin/ruby

require 'date'

sng = true
name = "James"
job = nil
weight = 68.5
born = Date.parse("November 12, 1986")

puts "His name is #{name}"

if sng == true
    puts "He is single"
else
    puts "He is in a relationship"
end

puts "His job is #{job}"
puts "He weighs #{weight} kilograms"
puts "He was born in #{born}"

In the above example, we have multiple literals.
The Boolean literal may have value true or false.
James is a string literal. The nil is an absence of a value.
68.5 is a floating point literal.
Finally, the November 12, 1987 is a date literal.

$ ./literals.rb
His name is James
He is single
His job is
He weighs 68.5 kilograms
He was born in 1986-11-12

## Ruby blocks

Ruby statements are often organized into blocks of code. A code block
can be delimited using { } characters or do
and end keywords.

blocks.rb
  

#!/usr/bin/ruby

puts [2, -1, -4, 0].delete_if { |x| x &lt; 0 }

[1, 2, 3].each do |e|
    puts e
end

In the example, we show two code blocks.

Flow control of Ruby code is often done with the if keyword.
The keyword is followed by a block of code. In this case a block of code
is delimited by then, end keywords, where
the first keyword is optional.

blocks2.rb
  

#!/usr/bin/ruby

if true then
    puts "Ruby language"
    puts "Ruby script"
end

In the above example, we have a simple block of code. It has two
statements. The block is delimited by then, end
keywords. The then keyword can be omitted.

## Ruby sigils

Sigils $, @ are special characters that denote a scope in a
variable. The $ is used for global variables, @ for
instance variables and @@ for class variables.

$car_name = "Peugeot"
@sea_name = "Black sea"
@@species = "Cat"

Sigils are always placed at the beginning of the variable identifier.

## Ruby operators

An *operator* is a symbol used to perform an
action on some value. (answers.com)

!    +    -    ~    *    **    /    %
&lt;&lt;    &gt;&gt;    &amp;    |    ^
==    ===    !=    &lt;=&gt;    &gt;=    &gt;
&lt;    &lt;=    =    %=    /=    -=
+=    *=    **=    ..    ...    not
and    or    ?:    &amp;&amp;    ||

This is a list of operators available in Ruby language. We talk
about operators later in the tutorial.

## Ruby delimiters

A *delimiter* is a sequence of one or more characters
used to specify the boundary between separate, independent regions in plain
text or other data stream. (wikipedia)

(       )       [       ]       {       }
,       ;       '       "       |       |

delimiters.rb
  

```
#!/usr/bin/ruby

name = "Jane"
occupation = 'Student'
numbers = [ 2, 3, 5, 3, 6, 2 ]

puts name; puts occupation
puts numbers[2]
numbers.each { |i| puts i }
puts ( 2 + 3 ) * 5

```

In the above example, we show the usage of various Ruby delimiters.

name = "Jane"
occupation = 'Student'

Single and double quotes are used to delimit a string in Ruby.

numbers = [ 2, 3, 5, 3, 6, 2 ]

The square brackets are used to set boundaries for an array.
The commas are used to separate items in the array.

puts name; puts occupation

The semicolon is used in Ruby to separate two statements in a Ruby
source code.

puts numbers[2]

Delimiters can be used in different contexts. Here the square brackets
are used to access an item in the array.

numbers.each { |i| puts i }

Curly brackets are used to define a block of code. Pipes are used
to define an element, which is filled with a current array item
for each loop cycle.

puts ( 2 + 3 ) * 5

Parentheses can be used to alter the evaluation of an expression.

## Ruby keywords

A keyword is a reserved word in the Ruby programming language. Keywords
are used to perform a specific task in the computer program. For example,
print a value to the console, do repetitive tasks or perform logical operations.
A programmer cannot use a keyword as an ordinary variable.

alias    and      BEGIN      begin    break    case
class    def      defined?   do       else     elsif
END      end      ensure     false    for      if
in       module   next       nil      not      or
redo     rescue   retry      return   self     super
then     true     undef      unless   until    when
while    yield

This is a list of Ruby keywords.

This was the Ruby lexical structure.

[Contents](..)
[Previous](../ruby/)
[Next](../basics/)