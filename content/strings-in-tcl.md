+++
title = "Strings in Tcl"
date = 2025-08-29T20:03:17.115+01:00
draft = false
description = "In this chapter of the Tcl tutorial, we work with strings."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../flowcontrol/)
[Next](../lists/)

# Strings in Tcl

last modified October 18, 2023

In this part of the Tcl tutorial, we work with string 
data in more detail.  
String is an important data type in computer languages. 

A string is a sequence of characters. String in Tcl, unlike in other languages,
need not be always enclosed within double quotes. They are necessary only if
we have a space between words. Tcl is a string based language. 
It provides a rich set of commands for manipulating strings.

## First example

A simple example showing some strings follows. 

#!/usr/bin/tclsh

puts Tcl
puts Java
puts Falcon

puts "Tcl language"
puts {Tcl language}

This script prints some string values to the console. 

puts Tcl
puts Java
puts Falcon

Strings in Tcl do not have to be always enclosed within quotes. 

puts "Tcl language"
puts {Tcl language}

Strings in Tcl can be grouped with double quotes or 
curly brackets. 

$ ./simple_strings.tcl 
Tcl
Java
Falcon
Tcl language
Tcl language

## Using quotes

What if we wanted to display quotes, for example, in a direct speech?
In such a case, inner quotes must be escaped.

$ cat directspeech.tcl
#!/usr/bin/tclsh

puts "There are many stars"
puts "He said, \"Which one is your favourite?\""

We use the \ character to escape additional quotes.

$ ./directspeech.tcl
There are many stars
He said, "Which one is your favourite?"

## Multiline strings

It is very easy to create a multiline string in Tcl. 
I many other languages creating multiline strings is much
less convenient. 

#!/usr/bin/tclsh

set lyrics "I cheated myself
like I knew I would
I told ya, I was trouble
you know that I'm no good"

puts $lyrics

We simple continue on the next line. This is useful if we wanted to 
display verses. 

$ ./multiline.tcl
I cheated myself
like I knew I would
I told ya, I was trouble
you know that I'm no good

## Comparing strings

Basic comparison of strings can be done with the string compare command. 

#!/usr/bin/tclsh

puts [string compare 12 12]
puts [string compare Eagle Eagle]
puts [string compare Eagle eagle]
puts [string compare -nocase Eagle eagle]

The string compare command compares strings character by character.
If it finds that the first characters of both strings are equal, it continues with
the second character, until the end.
It returns 0 if the strings are equal and -1 if a non-matching character in the first 
string is located in the ASCII table before the character of the second string. 
The 1 number is returned if the non-matching character of the first string is located after 
the character of the second string.

puts [string compare 12 12]

In this context, 12 is a string.

puts [string compare Eagle Eagle]

Two strings are equal, 0 is printed to the console. 

puts [string compare Eagle eagle]

E stands before e, therefore, -1 is returned. 

puts [string compare -nocase Eagle eagle]

With the -nocase option, we ignore the case. 
The two strings are equal. 

$ ./compare.tcl
0
0
-1
0

The string equal also can be used to compare strings. 
The command returns 1 if the strings are equal, and 0 if they are not.

#!/usr/bin/tclsh

set str1 Tcl
set str2 "Tcl language"

puts [string compare $str1 $str2]
puts [string compare -length 3 $str1 $str2]

puts [string equal $str1 $str2]
puts [string equal -length 3 $str1 $str2]

The script shows both commands comparing strings.

puts [string compare $str1 $str2]

The line prints -1. The characters on the first three positions 
are equal. On the fourth position the string compare command
compares white space with the l character. The space is located
before the l character in the ASCII table. Strings are not equal.

puts [string compare -length 3 $str1 $str2]

In this case, we limit the comparing to first three characters.
They are same in both strings, so the command returns 0. 

puts [string equal $str1 $str2]

The two strings are not identical, so the string equal
command returns 0, for false. 

puts [string equal -length 3 $str1 $str2]

Limiting strings to the first three characters, the command returns 1.
Which means they are identical up to the first three characters.

## Pattern matching

For simple pattern matching—globbing—we can use the string match
command. For more powerful pattern matching, we can utilize the regexp
command.

#!/usr/bin/tclsh

puts [string match book???? bookcase] 

puts [regexp {[a-z]{3}} "abc"]
puts [regexp {[^a-z]{3}} "abc"]
puts [regexp book(shelf|worm) bookworm] 

The example demonstrates the usage of the string match and regexp
commands. They return 1 for a match and 0 for a non-match.

$ ./string_match.tcl 
1
1
0
1

## Unicode

We can use Unicode strings in our Tcl scripts. 

#!/usr/bin/tclsh

puts "La femme vit par le sentiment, là où l'homme vit par l'action"
puts "Анна Каренина"

We print two messages to the terminal. The first is in French, the
second in Russian. 

$ ./unicode.tcl
La femme vit par le sentiment, là où l'homme vit par l'action
Анна Каренина

Output.

## String commands

Tcl has useful built-in commands that can be used for working with strings. 

#!/usr/bin/tclsh

set str Eagle

puts [string length $str]

puts [string index $str 0]
puts [string index $str end]

puts [string range $str 1 3]

We define a string variable and work with some string commands. 

puts [string length $str]

The string length returns the number of characters in
the string. 

puts [string index $str 0]
puts [string index $str end]

The string index command returns the character at
a specific position. 

puts [string range $str 1 3]

The string range returns a range of characters selected
by the first and last index. 

$ ./strings1.tcl
5
E
e
agl

Output.

We have a split command to split strings at a specific character.
The command returns a list of words. These words can be combined together
into a string with the join command.

#!/usr/bin/tclsh

set langs "Tcl,Java,C,C#,Ruby,Falcon"

puts [split $langs ,]
puts [join [split $langs ","] ":"]

In our program, we split and join strings.

set langs "Tcl,Java,C,C#,Ruby,Falcon"

This is a string we are going to split. There are several words
separated by a comma character. The comma character is the character,
by which we split the string. 

puts [split $langs ,]

The line prints all words that we have split from the string.

puts [join [split $langs ","] ":"]

The split command returns a list of words from the
string. These words are then joined. The words will be now separated
by the colon. 

$ ./splitjoin.tcl 
Tcl Java C C# Ruby Falcon
Tcl:Java:C:C#:Ruby:Falcon

Next we have another example with a few
string commands. 

#!/usr/bin/tclsh

set str "ZetCode" 

puts [string toupper $str]
puts [string tolower $str]
puts [string totitle $str]
puts [string reverse $str]

We introduce four string commands. The 
commands do not change the original string.
They return a new, modified string. 

puts [string toupper $str]

We convert the characters to uppercase. 

puts [string tolower $str]

We convert letters of the string to lowercase.

puts [string totitle $str]

The string totitle returns a string with
the first character in uppercase; other characters are in lowercase.

puts [string reverse $str]

We reverse the characters of the string with the
string reverse command. 

$ ./strings2.tcl 
ZETCODE
zetcode
Zetcode
edoCteZ

Running the program. 

## Formatting strings

The very basic formatting of strings is done within the
quotes. 

#!/usr/bin/tclsh

set oranges 2
set apples 4
set bananas 3

puts "There are $oranges oranges, $apples apples and\
$bananas bananas. "

Tcl evaluates variables in double quotes. 

puts "There are $oranges oranges, $apples apples and\
$bananas bananas. "

In this code line, we combine variables and strings
in one sentence. 

$ ./fruit.tcl
There are 2 oranges, 4 apples, and 3 bananas.

Output.

More advanced formatting can be done with the format command.
It has the following synopsis:

format formatString ?arg arg ...?

The formatString is used to control how the arguments are going to be
displayed. The command can take multiple arguments. 

#!/usr/bin/tclsh

puts [format %s "Inception movie"]
puts [format "%d %s" 23 songs]

This is basic script showing the usage of the format command.

puts [format %s "Inception movie"]

This line simply prints a string to the console. 

puts [format "%d %s" 23 songs]

Here we print two arguments. Each argument has a format specifier, 
which begins with the % character. 

$ ./basicformat.tcl
Inception movie
23 songs

Output.

Now we show some basic conversion specifiers for the format 
command. The %s, %f, %d, %e 
are conversion types. They control how the value is displayed. Conversion type
is the only mandatory part of the conversion specifier. 

#!/usr/bin/tclsh

puts [format "%s" "Tcl language"]
puts [format "%f" 212.432]
puts [format "%d" 20000]
puts [format "%e" 212.342]

We print four messages to the terminal. 

puts [format "%s" "Tcl language"]

The %s is a conversion type for a string. 

puts [format "%f" 212.432]

The %f is used to display decimal numbers.

puts [format "%d" 20000]

To print an integer value, we use the %d conversion type. 

puts [format "%e" 212.342]

The %e is used to show number in a scientific format.

$ ./format.tcl
Tcl language
212.432000
20000
2.123420e+02

Output.

In the next example, we be formatting numbers in three different
number formats. 

#!/usr/bin/tclsh

puts [format "%-10s %-14s %s" Decimal Hexadecimal Octal]

puts [format "%-10d %-14x %o" 5000 5000 5000]
puts [format "%-10d %-14x %o" 344 344 344]
puts [format "%-10d %-14x %o" 55 55 55]
puts [format "%-10d %-14x %o" 9 9 9]
puts [format "%-10d %-14x %o" 15666 15666 15666]

We print numbers in a decimal, hexadecimal, and octal
format. We also align the numbers in three columns.

puts [format "%-10d %-14x %o" 5000 5000 5000]

The %-10d applies for the first number, %-14x 
for the second, and %o for the third. We describe the first one.
The format specifier begins with the %
character. The minus sign - tells that if the value will
be shorter than the field width, it is left justified. 
The rest of the field is padded with white space. 
The number 10 specifies the field width. Finally, the d
character tells that the number is displayed in decimal format.
The x stands for hexadecimal and o for octal. 

$ ./numbers.tcl
Decimal    Hexadecimal    Octal
5000       1388           11610
344        158            530
55         37             67
9          9              11
15666      3d32           36462

Running the example. 

Finally, we format date and time data. We use
the clock format command. 

#!/usr/bin/tclsh

set secs [clock seconds]

puts "Short date: [clock format $secs -format %D]"
puts "Long date: [clock format $secs -format "%A, %B %d, %Y"]"
puts "Short time: [clock format $secs -format %R]"
puts "Long time: [clock format $secs -format %r]"
puts "Month: [clock format $secs -format %B]"
puts "Year: [clock format $secs -format %Y]"

The preceding example demonstrates some common date and
time formats. 

set secs [clock seconds]

We get the current timestamp in seconds. This value is later
passed to the clock format command to get dates and
times readable for humans. 

puts "Short date: [clock format $secs -format %D]"

The format of the date is controlled with the -format option.
There are several specifiers available. The %D returns a date in 
month/day/year format.

$ ./clockformat.tcl
Short date: 04/11/2011
Long date: Monday, April 11, 2011
Short time: 11:30
Long time: 11:30:30 am
Month: April
Year: 2011

Output.

This part of the Tcl tutorial covered strings. 

[Contents](..)  
[Previous](../flowcontrol/)
[Next](../lists/)