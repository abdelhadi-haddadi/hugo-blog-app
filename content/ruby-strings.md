+++
title = "Ruby strings"
date = 2025-08-29T20:03:12.491+01:00
draft = false
description = "In this part of the Ruby tutorial, we cover Ruby strings. A Ruby string is a sequence of Unicode characters."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../datatypes/)
[Next](../expressions/)

# Ruby strings

last modified October 18, 2023

In this part of the Ruby tutorial, we work with string data in more detail.

Strings are one of the most important data types in computer languages.
That is why we dedicate a whole chapter to working with strings in Ruby.

A string is a sequence of Unicode characters. It is a data type that stores a
sequence of data values in which elements usually stand for characters according
to a character encoding. When a string appears literally in source code,
it is known as a *string literal*.

## Ruby string first example

In Ruby string literals are enclosed by single or double quotes.

first.rb
  

#!/usr/bin/ruby

# first.rb

puts 'Python language'
puts "Ruby language"

The example has two string literals. The first one is enclosed in
single quotes. The other one is enclosed in double quotes.

$ ./first.rb
Python language
Ruby language

## Ruby using quotes

What if we wanted to display quotes, for example in a direct speech?
There are basically two ways to do this.

quotes.rb
  

#!/usr/bin/ruby

puts "There are many stars"
puts "He said, \"Which one is your favourite?\""

puts 'There are many stars'
puts 'He said, "Which one is your favourite?"'

We use the (\) character to escape additional quotes. Normally the double quote
character is used to delimit a string literal. However, when escaped, the
original meaning is suppressed. It appears as a normal character and can be used
within a string literal. The second way to use quotes within quotes is to mix
single and double quotes.

$ ./quotes.rb 
There are many stars
He said, "Which one is your favourite?"
There are many stars
He said, "Which one is your favourite?"

## Ruby escape sequences

Escape sequences are special characters that have a specific meaning when used
within a string literal.

newline.rb
  

#!/usr/bin/ruby

puts "one two three four"
puts "one\ntwo\nthree\nfour"

One of the most common escape sequences is the newline character \n.
It is available in many programming languages. The next character after
the newline will appear on the new line.

$ ./newline.rb
one two three four
one
two
three
four

Words after newline characters appear on new lines in the output of the about
script.

The r, b and t characters are normal alphabetical characters. When preceded
with a \ character, they have a special meaning.

escapes.rb
  

#!/usr/bin/ruby

puts "   bbb\raaa"
puts "Joan\b\b\bane"
puts "Towering\tinferno"

In the above example, we use three different escape characters.

puts "   bbb\raaa"

The carriage return \r is a control character for end of line
return to beginning of line. Before the string is printed to the console,
it is first processed. The escape sequence causes the aaa characters to be
placed before the bbb characters. The output is aaabbb.

puts "Joan\b\b\bane"

The \b control character is a backspace. It deletes a preceding character.
The string printed to the console is 'Jane' not 'Joan'.

puts "Towering\tinferno"

Finally, the \t escape sequence places a tab space between the two
words.

$ ./escapes.rb
aaabbb
Jane
Towering        inferno

The backslash character \ is a special character used to create
escape sequences. When there is a need to print a backslash itself, it is
preceded with another backslash. Its default meaning is escaped and it is
printed. The single and double quotes are used to delimit strings in Ruby. In
order to print them, they are preceded by \ too.

specials.rb
  

#!/usr/bin/ruby

puts "The special character \\"
puts "The special character \'"
puts "The special character \""

In this simple script, we print all three characters to the terminal.

$ ./specials.rb
The special character \
The special character '
The special character "

## Ruby accessing string elements

It is possible to access string elements in Ruby. For this we use the
square brackets []. Inside the brackets, we can put strings,
indexes, or ranges.

accessing.rb
  

#!/usr/bin/ruby

msg = "Ruby language"

puts msg["Ruby"]
puts msg["Python"]

puts msg[0]
puts msg[-1]

puts msg[0, 3]
puts msg[0..9]
puts msg[0, msg.length]

This code example shows, how we can access parts of a string.

msg = "Ruby language"

Here is the string that we be accessing.

puts msg["Ruby"]

In this code line we test, whether string 'Ruby' is a substring
of the msg string. If it is true, then the string that we
are looking for is returned.

puts msg[0]

The characters of the string can be accessed by their index. The numbers
start from 0. In other words, the 0 is the index of the first character.
The msg[0] returns the first character of the string, namely R.

puts msg[-1]

Here we access the last character of the string. The -1 stands for the last
index of the string.

puts msg[0, 3]

Two indexes separated by a comma return characters starting from the first
index and ending with the second index, excluded.

puts msg[0..9]

A range operator can be used as well. Here we print
the first ten characters of the msg string.

puts msg[0, msg.length]

This line returns the whole string. The msg.length returns the
size of the string.

$ ./accessing.rb
Ruby

R
e
Rub
Ruby langu
Ruby language

## Ruby multiline strings

In many programming languages creating multiline strings
requires additional effort. This is especially true in Visual Basic. In Ruby,
multiline strings are created easily.

multiline.rb
  

#!/usr/bin/ruby

puts "I hear Mariachi static on my radio
And the tubes they glow in the dark
And I'm there with her in Ensenada
And I'm here in Echo Park
"

puts %/
Carmelita hold me tighter
I think I'm sinking down
And I'm all strung out on heroin
On the outskirts of town/

puts &lt;&lt;STRING

Well, I'm sittin' here playing solitaire
With my pearl-handled deck
The county won't give me no more methadone
And they cut off your welfare check
STRING

In the example, we have lyrics of a Carmelita song. We show three ways to print
multiline strings. They can be used within double quotes. We can use a %
character to build a multiline string. The character following the % also
encloses the string. Finally, we can use the heredoc syntax. In this syntax, we
use &lt;&lt; followed by some string. The string encloses the multiline strings.
It must also be left aligned.

## Ruby variable interpolation

Variable interpolation is replacing variables with their values inside
string literals. To substitute a variable with a value, the variable
name is put between #{ and } characters inside
the string literal.

interpolation.rb
  

#!/usr/bin/ruby

name = "Jane"
age = 17

puts "#{name} is #{age} years old"

In this example, we substitute for two variables in the string:
name and age.

$ ./interpolation.rb
Jane is 17 years old

In the substitution it is possible to use expressions.

interpolation2.rb
  

#!/usr/bin/ruby

x = 5
y = 6

puts "The product of #{x} and #{y} is #{x*y}"

This is an example of the expression in the substitution.

$ ./interpolation2.rb
The product of 5 and 6 is 30

Running the example.

There is another way to substitute variables in a string. 

string_format.rb
  

#!/usr/bin/ruby

name = "Jane"
age = 17

message = "%s is %d years old" % [name, age]
puts message

```
message = "%s is %d years old" % [name, age]

```

We build a string before we use it. The %s and %d
are formatting characters that expect a string and a number, respectively.
The values are provided in square brackets after the % character.

## Ruby concatenating strings

Concatenating strings is creating one string from multiple strings.

concatenate.rb
  

#!/usr/bin/ruby

lang = "Ruby" + " programming" + " languge"
puts lang

lang = "Python" " programming" " language"
puts lang

lang = "Perl" &lt;&lt; " programming" &lt;&lt; " language"
puts lang

lang = "Java".concat(" programming").concat(" language")
puts lang

Ruby provides multiple ways of concatenating strings.

lang = "Ruby" + " programming" + " languge"

The plus operator is the most common operator used to add strings in
computer languages. Perl and PHP use the dot . operator to
concatenate strings.

lang = "Python" " programming" " language"

Ruby automatically concatenates subsequent strings.

lang = "Perl" &lt;&lt; " programming" &lt;&lt; " language"

Another operator which can be used to concatenate strings is &lt;&lt;.

lang = "Java".concat(" programming").concat(" language")

Each string literal is in fact an object. We can call various methods
on each Ruby object. On string objects, we can call the concat
method, which adds two string objects. It also returns the final object, on
which we can call another method. So we can place these methods in a chain.

$ ./concatenate.rb
Ruby programming languge
Python programming language
Perl programming language
Java programming language

## Ruby freezing strings

In Java or C#, the strings are immutable. This means that we cannot modify an
existing string. We can only create a new string out of an existing one. In
Ruby, the strings are not immutable by default.

String objects in Ruby have a freeze method, which makes
them immutable.

freezing.rb
  

#!/usr/bin/ruby

msg = "Jane"
msg &lt;&lt; " is "
msg &lt;&lt; "17 years old"

puts msg

msg.freeze

#msg &lt;&lt; "and she is pretty"

In this example, we demonstrate that strings can be modified. However, after
calling the freeze method on a string object, we cannot modify the string
anymore. If we uncomment the code line, we get 'can't modify frozen String'
error message.

## Ruby comparing strings

Comparing strings is a common job in programming. We can compare two
strings with a == operator or with a
eql? method. They return true if the strings are equal and false if
not.

comparing.rb
  

#!/usr/bin/ruby

puts "12" == "12"
puts "17" == "9"
puts "aa" == "ab"

puts "Jane".eql? "Jan"
puts "Jane".eql? "Jane"

In this code example, we compare some strings.

puts "12" == "12"

These two strings are equal, the line returns true.

puts "aa" == "ab"

The first two characters of both strings are equal. Next the
following characters are compared. They are different so the
line returns false.

puts "Jane".eql? "Jan"

The eql? method is used to compare two strings. Strings are
objects and all have a built-in eql? method. The method takes
one parameter, the string to which we are comparing our first string.

$ ./comparing.rb
true
false
false
false
true

Ruby has a *spaceship* operator &lt;==&gt;. The operator
comes from the Perl language. Unlike the above two ways of comparing strings,
which return either true or false, this operator will return 1, 0, or −1.
Depending on the value of the left argument relative to the right argument. If
the left argument is greater than the right argument, the operator returns 1. If
the left argument is less than the right argument, the operator returns −1. If
the two arguments are equal, the operator returns 0.

What does it mean that a character is greater than another character? Characters
are ordered in tables. Each character has a position in a table. When comparing
characters, we compare their positions in such a table. For example in a ASCII
table, the character a comes before the character b. So comparing a
&lt;==&gt; b returns -1, because the left argument has a lower
position than b.

spaceship.rb
  

#!/usr/bin/ruby

puts "a" &lt;==&gt; "b"
puts "b" &lt;==&gt; "a"
puts "a" &lt;==&gt; "a"

Comparing characters with a spaceship operator.

$ ./spaceship.rb
-1
1
0

In is possible to compare strings regardless of the case. For this Ruby has a
casecmp method. The method works the same way as the spaceship
operator.

case_comp.rb
  

#!/usr/bin/ruby

puts "Jane".casecmp "Jane"
puts "Jane".casecmp "jane"
puts "Jane".casecmp "Jan"

Example.

puts "Jane".casecmp "Jane"
puts "Jane".casecmp "jane"

These two lines return the same result, 0. In this case
we do not take into account whether the characters are in
upper or lower case.

$ ./case_comp.rb
0
0
1

## Strings are objects in Ruby

Ruby is an object-oriented language. Objects are basic building blocks of an OOP
program. Strings are objects too. An object is a combination of data and
methods. In a OOP program, objects are created and they communicate among
themselves.

creating_strings.rb
  

#!/usr/bin/ruby

website = "webcode.me"
puts website

website = String.new "zetcode.com"
puts website

In the example above, we show two basic ways of creating a string in Ruby.

website = "webcode.me"

Here a string literal is assigned to a website variable. Under the hood, the
Ruby interpreter creates a string object.

website = String.new "zetcode.com"

This is the standard way of creating string objects. However, the first is used in
most cases because it is less verbose and it is the common way of creating strings
in most computer languages.

string_object.rb
  

#!/usr/bin/ruby

puts "zetcode".upcase
puts "zetcode".size
puts "zetcode".reverse

In this code example, we call three methods on a
string literal. For people who are familiar with Java, C and
similar languages, this may be cofusing. In Ruby, a string literal
is transfromed into a string object upon which it is possible to
call methods.

$ ./string_object.rb
ZETCODE
7
edoctez

## Ruby string methods

Ruby string objects have useful methods that can be used for working with
strings. We have already seen several string methods like concat
or eql?.

basic_methods.rb
  

#!/usr/bin/ruby

word = "Determination"

puts "The word #{word} has #{word.size} characters"

puts word.include? "tion"
puts word.include? "tic"

puts

puts word.empty?
word.clear
puts word.empty?

We have a string variable. Four string methods are presented.

puts "The word #{word} has #{word.size} characters"

The size method returns the number of characters in the
string.

puts word.include? "tion"

The include? method determines whether a substring
is present in the tested string. In this case, the code line
returns true.

puts word.empty?
word.clear

The empty? method checks whether the string is empty. It returns a
boolean true or false. The clear method makes string empty.

$ ./basic_methods.rb
The word Determination has 13 characters
true
false

false
true

Output.

In the next example, we have methods that work with the case of the characters.

ruby_lang.rb
  

#!/usr/bin/ruby

ruby = "Ruby programming language"

puts ruby.upcase
puts ruby.downcase
puts ruby.capitalize
puts ruby.swapcase

Ruby has four methods for character case. The upcase method returns
a copy of the string in which all characters are in uppercase. The
downcase method returns a copy of the string in which all
characters are in downcase. The capitalize method returns a copy of
string with the first character converted to uppercase and the remainder to
lowercase. Finally, the swapcase method returns a copy of the
string where the uppercase letters are converted to downcase and vice versa.

$ ./ruby_lang.rb
RUBY PROGRAMMING LANGUAGE
ruby programming language
Ruby programming language
rUBY PROGRAMMING LANGUAGE

Next we present two Ruby string methods: start_with? and
end_with?. Both methods return a boolean true or false. They
determine whether a string starts or ends with a specific string, respectively.

start_end.rb
  

#!/usr/bin/ruby

ws1 = "zetcode.com"
ws2 = "www.gnome.org"

puts ws1.start_with? "www."
puts ws2.start_with? "www."

puts

puts ws1.end_with? ".com"
puts ws2.end_with? ".com"

This is an example for the aforementioned methods.

puts ws1.start_with? "www."

Here we check if a string starts with a "www." prefix.
It does not, so the output to the console is a boolean false.

puts ws1.end_with? ".com"

We check whether the ws1 string variable ends with a ".com"
suffix. It does, so we see a true in the console.

$ ./start_end.rb
false
true

true
false

In the following example, we deal with the inspect method.
The method returns a raw string, surrounded by quote marks,
with special characters not interpreted. It is useful when we want
to examine what characters form the string.

inspect_method.rb
  

#!/usr/bin/ruby

msg = "Jane\t17\nThomas\t23"

puts msg
puts msg.inspect

An example of the inspect string method.

msg = "Jane\t17\nThomas\t23"

This is a string with some special characters.

puts msg
puts msg.inspect

In the first case, the special characters are interpreted. There
is a tab and a newline between string parts. In the second case, we
get the string in a raw format.

$ ./inspect_method.rb
Jane    17
Thomas  23
"Jane\t17\nThomas\t23"

The chomp method returns a new string with the record separator
removed from the end of the string. The default separator is the
newline (\n).

user_input.rb
  

#!/usr/bin/ruby

print "Are you sure to download? (Yes/No) "

response = gets

if (response.downcase == "yes")
    puts "Downloaded"
else
    puts "Download cancelled"
end

puts response.inspect

In the above script, we get an input from the user. We react to the user
response.

$ ./user_input.rb
Are you sure to download? (Yes/No) Yes
Download cancelled
"Yes\n"

The script does not work correctly. The reason becomes clear when
we consider what inspect returns.
The input from the user is ended with an enter key. The newline character is included
in the response variable too. And "yes" does not equal to "yes\n".
To correct the script, we use the chomp method. It removes
the newline from the variable.

chomping.rb
  

#!/usr/bin/ruby

print "Are you sure to download? (Yes/No) "

response = gets

if (response.downcase.chomp == "yes")
    puts "Downloaded"
else
    puts "Download cancelled"
end

puts response.inspect

```
if (response.downcase.chomp == "yes")

```

Here we process the input before it is compared
with the "yes" string. The chomp method
removes the newline character.

$ ./chomping.rb 
Are you sure to download? (Yes/No) yes
Downloaded
"yes\n"

Now the example works correctly.

## Ruby formatting strings

Ruby has *format specifiers*. A format specifier determines how
the string is going to look like. It begins with a % character.
Format specifiers are put inside single or double quotes.

The format specifier has the following fields:

%[flags][field width][precision]conversion specifier

Fields in square brackets are optional.

A *conversion specifier* specifies how the data is going to be
converted into displayable form.

format_specifiers.rb
  

#!/usr/bin/ruby

puts "There are %d oranges in the basket." % 12
puts "There are %d oranges and %d apples in the basket." % [12, 10]

Here is an example of some format specifiers.

puts "There are %d oranges in the basket" % 12

When we use the %d notation inside a string, we expect a number at
that point. The d is a conversion specifier for decimal numbers.
The number is given after the % character.

puts "There are %d oranges and %d apples in the basket" % [12, 10]

We can use multiple format specifiers inside a string. Each begins with
a % character. Multiple values are placed between [] characters
and separated by comma character.

$ ./format_specifiers.rb
There are 12 oranges in the basket.
There are 12 oranges and 10 apples in the basket.

In the following example, we cover some basic conversion specifiers.

format_specifiers2.ev
  

#!/usr/bin/ruby

puts "There are %d apples." % 5
puts "I can see %i oranges." % 3
puts "The width of iPhone 3G is %f mm." % 62.1
puts "This animal is called a %s" % "rhinoceros."

We have conversion specifiers for integers, floating point numbers
and strings.

puts "There are %d apples." % 5
puts "I can see %i oranges." % 3

Both d an i can be used for integers.

puts "The width of iPhone 3G is %f mm." % 62.1

The f is a conversion specifier for floating point values.
By default, floats have six decimal places.

puts "This animal is called a %s" % "rhinoceros."

The s character is used for strings.

$ ./format_specifiers2.rb
There are 5 apples.
I can see 3 oranges.
The width of iPhone 3G is 62.100000 mm.
This animal is called a rhinoceros.

Next we have a practical example of using a format specifier.

characters.rb
  

#!/usr/bin/ruby

website = "zetcode.com"

website.each_char do |c|
    print "#{c} has ASCII code %d\n" % c.ord
end

In this example, we go through all characters of a
string and print their ASCII values to the terminal.

website.each_char do |c|
    print "#{c} has ASCII code %d\n" % c.ord
end

The each_char method passes each character
of a website string to the block, one character per cycle, with
current character stored in c variable. We get the ASCII code
of the character using the ord method, which returns
the ordinal of a one character string.

$ ./characters.rb
z has ASCII code 122
e has ASCII code 101
t has ASCII code 116
c has ASCII code 99
o has ASCII code 111
d has ASCII code 100
e has ASCII code 101
. has ASCII code 46
c has ASCII code 99
o has ASCII code 111
m has ASCII code 109

Numbers can be displayed in various forms. The conversion specifier
can be used to format numbers.

format_numbers.rb
  

#!/usr/bin/ruby

# decimal
puts "%d" % 300

# hexadecimal
puts "%x" % 300

# octal
puts "%o" % 300

# binary
puts "%b" % 300

# scientific
puts "%e" % (5/3.0)

In the above example, we print numbers in decimal, hexadecimal, octal,
binary, and scientific formats.

# hexadecimal
puts "%x" % 300

The x conversion specifier is used to transform a number into a
hexadecimal format.

# binary
puts "%b" % 300

The x conversion specifier is used to transform a
number into a binary format.

$ ./format_numbers.rb
300
12c
454
100101100
1.666667e+00

*Precision* is a field in the format specifier. It is specified as a
number following a decimal point. It has a different meaning for an integer, a
floating point number and for a string. When used with integers, it indicates
the minimum number of digits to be printed. If the number has fewer digits than
the precision, zeros are prefixed. The default precision for integers is 1,
meaning that no zeros are filled. When used with a float number, the precision
is the number of digits displayed after the decimal point. Finally, with
strings, the precision is the maximum number of characters printed.

precision.rb
  

#!/usr/bin/ruby

puts 'Height: %f %s' % [172.3, 'cm']
puts 'Height: %.1f %s' % [172.3, 'cm']

puts "%d" % 16
puts "%.5d" % 16

puts "%s" % "zetcode"
puts "%.5s" % "zetcode"

In this example, we work with the precision field.

puts 'Height: %f %s' % [172.3, 'cm']
puts 'Height: %.1f %s' % [172.3, 'cm']

172.3 is a floating point number. If no precision is specified,
there will be 6 decimal places after a decimal point. In our case,
there will be 5 zeros. The .1 in the second code line is
the precision. For a floating point value, it reduces the number of
decimal places to 1.

puts "%d" % 16
puts "%.5d" % 16

The default precision for integers is 1. In the second line, we have
specified precision .5, which adds (prepends) 3 zeros to the 16 number.

puts "%s" % "zetcode"
puts "%.5s" % "zetcode"

The first line prints all characters of the string. The second line prints
only five of them. Two characters are dropped.

$ ./precision.rb
Height: 172.300000 cm
Height: 172.3 cm
16
00016
zetcode
zetco

*Field width* specifies the minimum width of the data to display. It is a
number, which comes before the decimal point if it is present. If the output is
shorter, then it is padded with spaces and it is right aligned. If we put a
minus sign before the field width, it is left aligned. If the output is longer
than the field width, it is displayed in full.

field_width.rb
  

#!/usr/bin/ruby

puts "%d" % 1
puts "%d" % 16
puts "%d" % 165
puts "%d" % 1656
puts "%d" % 16567

puts "%10d" % 1
puts "%10d" % 16
puts "%10d" % 165
puts "%10d" % 1656
puts "%10d" % 16567

In the first case, we print five numbers without specifying the field width. The
width of the output is equal to the number of the characters being displayed. In
the second case we have a field width of 10. Each of the 5 outputs has a minimum
length of 10 characters. The numbers are right aligned.

puts "%d" % 1
puts "%d" % 16

We print two numbers. The width of the output has 1, 2 characters, respectively.

puts "%10d" % 1
puts "%10d" % 16

Here the length in both cases is 10 characters. The two numbers are padded with 9
and 8 spaces in the given order.

$ ./field_width.rb
1
16
165
1656
16567
         1
        16
       165
      1656
     16567

We can see that in the second case the numbers are right
aligned.

The *flag* qualifier modifies the format's behaviour.

The # flag adds a 0b, 0, and 0x
prefix to binary, octal, and hexadecimal formats respectively. It adds a decimal point
to the floating point values, even if the number of decimal places have been
restricted by the precision.

flags.rb
  

#!/usr/bin/ruby

puts "%#b" % 231
puts "%#x" % 231
puts "%#o" % 231

puts "%.0e" % 231
puts "%#.0e" % 231

puts "%.0f" % 231
puts "%#.0f" % 231

In the code example, we use the x flag.

puts "%#b" % 231
puts "%#x" % 231
puts "%#o" % 231

The decimal 231 is printed in binary, octal, and hexadecimal formats.
The # flags adds a prefix for them.

puts "%.0e" % 231
puts "%#.0e" % 231

Here, the .0 precision supresses the decimal places of a number.
However, when used with a # flag, the decimal point is displayed,
even though there are no decimal digits.

$ ./flags.rb
0xe7
0b11100111
0347
2e+02
2.e+02
231
231.

The + flag adds a plus sign for positive decimal numbers.
For binary, octal and hexadecimal negative numbers it adds a minus sign
and uses an absolute value.

flags2.rb
  

#!/usr/bin/ruby

puts "%d" % 231
puts "%+d" % 231
puts "%d" % -231
puts "%+d" % -231

puts "%b" % -231
puts "%o" % -231
puts "%x" % -231

puts "%+b" % -231
puts "%+o" % -231
puts "%+x" % -231

An example demonstrating the + flag of the format
specifier.

puts "%d" % 231
puts "%+d" % 231

Usually, positive numbers have their sign omitted. If we want to show
a plus sign for positive numbers, we specify the + flag.

puts "%d" % -231
puts "%+d" % -231

The + flag has no effect on negative numbers. The output is the same.

puts "%b" % -231
puts "%o" % -231
puts "%x" % -231

Binary, octal, and hexadecimal numbers have their own way to create
negative numbers.

puts "%+b" % -231
puts "%+o" % -231
puts "%+x" % -231

If we specify the + flag for these negative numbers, we
transform a number to a different format and add a minus sign. There
is no special way of representing negative numbers.

$ ./flags2.rb
231
+231
-231
-231
..100011001
..7431
..f19
-11100111
-347
-e7

Here we introduce the 0 flag and the - flag.
The 0 flag causes the number to be padded with zeros instead of
spaces. The - flag makes the output left aligned.

field_width2.rb
  

#!/usr/bin/ruby

puts "%010d" % 1
puts "%010d" % 16
puts "%010d" % 165
puts "%010d" % 1656
puts "%010d" % 16567

puts "%-10d" % 1
puts "%-10d" % 16
puts "%-10d" % 165
puts "%-10d" % 1656
puts "%-10d" % 16567

Example.

puts "%010d" % 1
puts "%010d" % 16

Numbers will be padded with zeros.

puts "%-10d" % 1
puts "%-10d" % 16

The number, being shorter than the field width, is aligned.
And the - flag makes it left aligned.

$ ./field_width2.rb
0000000001
0000000016
0000000165
0000001656
0000016567
1
16
165
1656
16567

The * flag can be used for the precision and for the width.
Whenever we use the * flag, we have to specify the precision or the
width as an argument.

flags3.rb
  

#!/usr/bin/ruby

puts "%.*f" % [3, 1.1111111]
puts "%0*d" % [10, 2]
puts "%0*.*f" % [10, 3, 1.1111]

Example for the * flag.

puts "%.*f" % [3, 1.1111111]

Here we use the * flag for the precision. The first number, 3, is
the argument for the precision. It says only three decimal digits will be
displayed for the 1.1111111 float number.

puts "%0*d" % [10, 2]

In this code line, we use the * flag for the width. We have to
add the width between the [] brackets. The first number is the
width and the second number is the value for the conversion specifier.

puts "%0*.*f" % [10, 3, 1.1111]

The * flag can be used for both the width and the precision.
We have to specify them both in the [] brackets.

$ ./flags3.rb
1.111
0000000002
000001.111

This part of the Ruby tutorial covered strings.

[Contents](..)
[Previous](../datatypes/)
[Next](../expressions/)