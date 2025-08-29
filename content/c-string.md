+++
title = "C# string"
date = 2025-08-29T19:51:28.908+01:00
draft = false
description = "Discover how to work with strings in C# through this comprehensive tutorial. Learn about the string data type, Unicode characters, and the fundamentals of C# programming within the .NET framework."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# string

last modified May 1, 2025

 

In this article we show how to work with strings in C#. 

## Understanding C# Strings

A string in C# represents a sequence of characters encoded using UTF-16. It is a
fundamental data type that stores a series of characters according to a specific
character encoding. When a string appears directly in source code, it is
referred to as a *string literal*.

In C#, strings are objects, and there are two primary classes available for
handling them:

  - System.String

  - System.Text.StringBuilder

The System.String class provides immutable strings, meaning that
once created, their content cannot be altered. On the other hand, the
System.Text.StringBuilder class is designed for mutable strings,
enabling efficient modifications like appending or replacing characters.

In C#, the string keyword is an alias for
System.String. While string is specific to the C#
language, System.String belongs to the .NET framework, and the two
can be used interchangeably.

**Note:** This article focuses on basic ASCII strings. Working with
strings in other alphabets, such as those with complex encodings, often involves
more advanced operations.

## C# string initialization

There are multiple ways of creating strings, both immutable and mutable. We show
a few of them.

Program.cs
  

using System.Text;

char[] cdb = ['M', 'y', 'S', 'q', 'l'];

string lang = "C#";
string ide = "NetBeans";
string db = new(cdb);

Console.WriteLine(lang);
Console.WriteLine(ide);
Console.WriteLine(db);

var sb1 = new StringBuilder(lang);
var sb2 = new StringBuilder();

sb2.Append("Fields");
sb2.Append(" of ");
sb2.Append("glory");

Console.WriteLine(sb1);
Console.WriteLine(sb2);

The example shows a few ways of creating System.String and
System.Text.StringBuilder objects.

using System.Text;

This statement enables to use the System.Text.StringBuilder type
without qualification.

string lang = "C#";
string ide = "NetBeans";

The most common way is to create a string object from a string literal.

string db = new(cdb);

Here we create a string object from an array of characters.
The string is an alias for the System.String.

var sb1 = new StringBuilder(lang);

A StringBuilder object is created from a String.

var sb2 = new StringBuilder();

sb2.Append("Fields");
sb2.Append(" of ");
sb2.Append("glory");

We create an empty StringBuilder object. We append three strings
into the object.

$ dotnet run
C#
NetBeans
MySql
C#
Fields of glory

## C# string interpolation

The $ special character prefix identifies a string literal as an interpolated
string. An interpolated string is a string literal that might contain
interpolated expressions.

String formatting is a similar feature to string interpolation; it is covered
later in the chapter.

Program.cs
  

int age = 23;
string name = "Peter";

DateTime now = DateTime.Now;

Console.WriteLine($"{name} is {age} years old");
Console.WriteLine($"Hello, {name}! Today is {now.DayOfWeek}, it's {now:HH:mm} now");

The example presents C# string interpolation.

Console.WriteLine($"{name} is {age} years old");

The interpolated variables are placed between {} brackets.

Console.WriteLine($"Hello, {name}! Today is {now.DayOfWeek}, it's {now:HH:mm} now");

The interpolation syntax can receive expressions or formatting specifiers.

$ dotnet run
Peter is 23 years old
Hello, Peter! Today is Friday, it's 12:23 now

## C# regular string

Regular strings can contain escape sequences, such as new line or tab character,
which are interpreted. Regular strings are placed between a pair of double
quotes.

Program.cs
  

string s1 = "deep \t forest";
string s2 = "deep \n forest";

Console.WriteLine(s1);
Console.WriteLine(s2);

Console.WriteLine("C:\\Users\\Admin\\Documents");

The example prints two strings which contain \t and
\n escape sequences.

Console.WriteLine("C:\\Users\\Admin\\Documents");

When working with e.g. paths, the slashes must be escaped.

$ dotnet run
deep     forest
deep
    forest
C:\Users\Admin\Documents

## C# verbatim string

Verbatim strings do not interprete escape sequences. Verbatim strings are
preceded with the @ character. Verbatim strings can be used to work
with multiline strings.

Program.cs
  

Console.WriteLine(@"deep \t forest");
Console.WriteLine(@"C:\Users\Admin\Documents");

var text = @"
    Not marble, nor the gilded monuments
Of princes, shall outlive this powerful rhyme;
But you shall shine more bright in these contents
Than unswept stone, besmeared with sluttish time.";

Console.WriteLine(text);

In this code example we work with verbatim strings.

Console.WriteLine(@"deep \t forest");

The \t special character is not interpreted; it is
only printed to the console.

Console.WriteLine(@"C:\Users\Admin\Documents");

Verbatim strings are convenient when we work with paths; the shashes
do not have to be escaped.

var text = @"
    Not marble, nor the gilded monuments
Of princes, shall outlive this powerful rhyme;
But you shall shine more bright in these contents
Than unswept stone, besmeared with sluttish time.";

Verbatim strings allow us to create multiline strings.

$ dotnet run
deep \t forest
C:\Users\Admin\Documents

    Not marble, nor the gilded monuments
Of princes, shall outlive this powerful rhyme;
But you shall shine more bright in these contents
Than unswept stone, besmeared with sluttish time.

## C# strings are objects

Strings are objects. They are reference types. Strings are instances of
the System.String or System.Text.StringBuilder class.
Since they are objects, they have multiple methods available for doing various work.

Program.cs
  

string lang = "Java";
string bclass = lang.GetType().Name;
Console.WriteLine(bclass);

string parclass = lang.GetType().BaseType!.Name;
Console.WriteLine(parclass);

if (lang.Equals(string.Empty))
{
    Console.WriteLine("The string is empty");
}
else
{
    Console.WriteLine("The string is not empty");
}

int len = lang.Length;
Console.WriteLine($"The string has {len} characters");

In this program, we demonstrate that strings are objects. Objects must have a
class name, a parent class and they must also have some methods that we can call
or properties to access.

string lang = "Java";

An object of System.String type is created.

string bclass = lang.GetType().Name;
Console.WriteLine(bclass);

We determine the class name of the object to which the lang
variable refers.

string parclass = lang.GetType().BaseType!.Name;
Console.WriteLine(parclass);

A parent class of our object is received. All objects have at least one parent —
the Object.

if (lang.Equals(string.Empty))
{
    Console.WriteLine("The string is empty");
} else
{
    Console.WriteLine("The string is not empty");
}

Objects have various methods. With the Equals method we check if
the string is empty.

int len = lang.Length;
Console.WriteLine($"The string has {len} characters");

The Length property returns the size of the string.

$ dotnet run
String
Object
The string is not empty
The string has 4 characters

## C# mutable &amp; immutable strings

The String is a sequence of immutable characters, while the
StringBuilder is a sequence of mutable characters. The next
example shows the difference.

Program.cs
  

using System.Text;

string name = "Jane";
string name2 = name.Replace('J', 'K');
string name3 = name2.Replace('n', 't');

Console.WriteLine(name);
Console.WriteLine(name3);

var sb = new StringBuilder("Jane");
Console.WriteLine(sb);

sb.Replace('J', 'K', 0, 1);
sb.Replace('n', 't', 2, 1);

Console.WriteLine(sb);

Both objects have methods for replacing characters in a string.

string name = "Jane";
string name2 = name.Replace('J', 'K');
string name3 = name2.Replace('n', 't');

Calling Replace method on a string results in returning a new
modified string. The original string is not changed.

sb.Replace('J', 'K', 0, 1);
sb.Replace('n', 't', 2, 1);

The Replace method of a StringBuilder replaces a
character at the given index with a new character. The original string is
modified.

$ dotnet run
Jane
Kate
Jane
Kate

## C# string concatenation

Immutable strings can be added using the + operator or the Concat
method. They form a new string which is a chain of all concatenated strings.
Mutable strings have the Append method which builds a string from
any number of other strings.

It is also possible to concatenate strings using string formatting and
interpolation.

Program.cs
  

using System.Text;

Console.WriteLine("Return" + " of " + "the king.");
Console.WriteLine(string.Concat(string.Concat("Return", " of "), "the king."));

var sb = new StringBuilder();
sb.Append("Return");
sb.Append(" of ");
sb.Append("the king.");

Console.WriteLine(sb);

string s1 = "Return";
string s2 = "of";
string s3 = "the king.";

Console.WriteLine("{0} {1} {2}", s1, s2, s3);
Console.WriteLine($"{s1} {s2} {s3}");

The example creates five sentences by concatenating strings.

Console.WriteLine("Return" + " of " + "the king.");

A new string is formed by using the + operator.

Console.WriteLine(string.Concat(string.Concat("Return", " of "), "the king."));

The Concat method concatenates two strings. The method is a static
method of the System.String class.

var sb = new StringBuilder();
sb.Append("Return");
sb.Append(" of ");
sb.Append("the king.");

A mutable object of the StringBuilder type is created by calling
the Append method three times.

Console.WriteLine("{0} {1} {2}", s1, s2, s3);

A string is formed with string formatting.

Console.WriteLine($"{s1} {s2} {s3}");

Finally, the strings are added with the interpolation syntax.

$ dotnet run
Return of the king.
Return of the king.
Return of the king.
Return of the king.
Return of the king.

## C# using quotes

When we want to display quotes, for instance in direct speech, the inner quotes
must be escaped.

Program.cs
  

Console.WriteLine("There are many stars.");
Console.WriteLine("He said, \"Which one is your favourite?\"");

Console.WriteLine(@"
Lao Tzu has said:
""If you do not change direction, you may end up
where you are heading.""
");

This example prints direct speech.

Console.WriteLine("He said, \"Which one is your favourite?\"");

Inside a regular string, the character is escaped with \.

Console.WriteLine(@"
Lao Tzu has said:
""If you do not change direction, you may end up
where you are heading.""
");

Inside a verbatim string, the quote is preceded with another quote.

$ dotnet run
There are many stars.
He said, "Which one is your favourite?"

Lao Tzu has said:
"If you do not change direction, you may end up
where you are heading."

## C# comparing strings

We can compare two strings with the == operator.

Program.cs
  

Console.WriteLine("12" == "12");
Console.WriteLine("17" == "9");
Console.WriteLine("aa" == "ab");

In the example program, we compare strings.

$ dotnet run
True
False
False

The string.Compare method compares two specified strings and
returns an integer that indicates their relative position in the sort order. If
the returned value is less than zero, the first string is less than the second.
If it returns zero, both strings are equal. Finally, if the returned value is
greater than zero, the first string is greater than the second.

Program.cs
  

string str1 = "ZetCode";
string str2 = "zetcode";

Console.WriteLine(string.Compare(str1, str2, true));
Console.WriteLine(string.Compare(str1, str2, false));

There is an optional third ignoreCase argument. It determines if
the case should be honored or not.

Console.WriteLine(string.Compare(str1, str2, true));

Compare two strings and ignore the case. This line prints 0 to the console.

## C# string elements

A string is a sequence of characters. A character is a basic element of a
string.

Program.cs
  

char[] crs = ['Z', 'e', 't', 'C', 'o', 'd', 'e'];
string s = new(crs);

char c1 = s[0];
char c2 = s[^1];

Console.WriteLine(c1);
Console.WriteLine(c2);

int i1 = s.IndexOf('e');
int i2 = s.LastIndexOf('e');

Console.WriteLine("The first index of character e is " + i1);
Console.WriteLine("The last index of character e is " + i2);

Console.WriteLine(s.Contains('t'));
Console.WriteLine(s.Contains('f'));

char[] elements = s.ToCharArray();

foreach (char e in elements)
{
    Console.WriteLine(e);
}

In the first example, we work with an immutable string.

char[] crs = ['Z', 'e', 't', 'C', 'o', 'd', 'e'];
string s = new(crs);

A new immutable string is formed from an array of characters.

char c1 = s[0];
char c2 = s[^1];

Using the array access notation, we get the first and the last char value of the
string.

int i1 = s.IndexOf('e');
int i2 = s.LastIndexOf('e');

With the above methods, we get the first and the last occurrence of the
character 'e'.

Console.WriteLine(s.Contains('t'));
Console.WriteLine(s.Contains('f'));

With the Contains method we check if the string contains the 't'
character. The method returns a boolean value.

char[] elements = s.ToCharArray();

foreach (char e in elements)
{
    Console.WriteLine(e);
}

The ToCharArray method creates a character array from the string.
We go through the array and print each of the characters.

$ dotnet run
Z
e
The first index of character e is 1
The last index of character e is 6
True
False
Z
e
t
C
o
d
e

In the second example, we work with the elements of a mutable string.

Program.cs
  

using System.Text;

var sb = new StringBuilder("Misty mountains");
Console.WriteLine(sb);

sb.Remove(sb.Length-1, 1);
Console.WriteLine(sb);

sb.Append('s');
Console.WriteLine(sb);

sb.Insert(0, 'T');
sb.Insert(1, 'h');
sb.Insert(2, 'e');
sb.Insert(3, ' ');
Console.WriteLine(sb);

sb.Replace('M', 'm', 4, 1);
Console.WriteLine(sb);

A mutable string is formed. We modify the contents of the string by deleting,
appending, inserting, and replacing characters.

sb.Remove(sb.Length-1, 1);

This line deletes the last character.

sb.Append('s');

The deleted character is appended back to the string.

sb.Insert(0, 'T');
sb.Insert(1, 'h');
sb.Insert(2, 'e');
sb.Insert(3, ' ');

We insert four characters at the beginning of the string.

sb.Replace('M', 'm', 4, 1);

Finally, we replace a character at index 4.

$ dotnet run
Misty mountains
Misty mountain
Misty mountains
The Misty mountains
The misty mountains

## C# string Join and Split

The Join joins strings and the Split splits the
strings.

Program.cs
  

string[] items = ["C#", "Visual Basic", "Java", "Perl"];

var langs = string.Join(",", items);
Console.WriteLine(langs);

string[] langs2 = langs.Split(',');

foreach (string lang in langs2)
{
    Console.WriteLine(lang);
}

In the program we join and split strings.

string[] items = ["C#", "Visual Basic", "Java", "Perl"];

This is an array of strings. These strings are going to be joined.

string langs = string.Join(",", items);

All words from the array are joined. We build one string from them. There will
be a comma character between each two words.

string[] langs2 = langs.Split(',');

As a reverse operation, we split the langs string. The Split method
returns an array of words, delimited by a character. In our case it is a comma
character.

foreach (string lang in langs2)
{
    Console.WriteLine(lang);
}

We go through the array and print its elements.

$ dotnet run
C#,Visual Basic,Java,Perl
C#
Visual Basic
Java
Perl

## C# string StartsWith

The StartsWith method determines whether this string instance
starts with the specified character.

Program.cs
  

var words = "club\nsky\nblue\ncup\ncoin\nnew\ncent\nowl\nfalcon\nwar\nice";

using var sr = new StringReader(words);

string? line;

while ((line = sr.ReadLine()) != null)
{
    if (line.StartsWith('c')) 
    {
        Console.WriteLine(line);
    }
}

We have a couple of words in a string. We print all words that start with letter
c. 

$ dotnet run
club
cup
coin
cent

## C# string EndsWith

The EndsWith determines whether the end of this string instance
matches a specified string.

Program.cs
  

var words = "club\nsky\nblue\ncup\ncoin\nnew\ncent\nowl\nfalcon\nwar\nice";

using var sr = new StringReader(words);

string? line;

while ((line = sr.ReadLine()) != null)
{
    if (line.EndsWith('y') || line.EndsWith('n')) 
    {
        Console.WriteLine(line);
    }
}

In the example, we print all words that end either with n or y. 

$ dotnet run
sky
coin
falcon

## C# string ToUpper/ToLower

The ToUpper method converts all of the characters of the string to
upper case. The ToLower method converts all of the characters of
the string to lower case. 

Program.cs
  

var word1 = "Cherry";

var u_word1 = word1.ToUpper();
var l_word1 = u_word1.ToLower();

Console.WriteLine(u_word1);
Console.WriteLine(l_word1);

var word2 = "Čerešňa";

var u_word2 = word2.ToUpper();
var l_word2 = u_word2.ToLower();

Console.WriteLine(u_word2);
Console.WriteLine(l_word2);

We modify the case of two words. 

$ dotnet run
CHERRY
cherry
ČEREŠŇA
čerešňa

## Working with C# Runes

The EnumerateRunes method in C# allows you to iterate over
individual Unicode characters, or "runes," within a string. A rune is
represented by the System.Text.Rune type, which corresponds to a
single Unicode scalar value, enabling efficient handling of text containing
characters from diverse alphabets, symbols, or emojis.

Program.cs
  

var text = "🐄🦙🐘🐫🐑🦝🦍🐯";
var runes = text.EnumerateRunes();

foreach (var rune in runes) 
{
    Console.WriteLine(rune);
}

In this example, we use the EnumerateRunes method to iterate over a
sequence of emojis. This approach ensures that multi-byte Unicode characters are
accurately processed, preserving their integrity and proper representation.

$ dotnet run
🐄
🦙
🐘
🐫
🐑
🦝
🦍
🐯

## C# string Remove

The Remove method returns a new string in which a specified number
of characters from the current string are deleted.

Program.cs
  

var text = "Did you go there? We did, but we had a \"great\" service there.";

string[] parts = text.Split(" ");

foreach (var part in parts)
{
    var word = removeChars(part);
    Console.WriteLine(word);
}

string removeChars(string part)
{
    var word = part;

    if (part.EndsWith('.') || part.EndsWith('?') || 
        part.EndsWith(',') || part.EndsWith('\"'))
    {
        word = part.Remove(part.Length - 1, 1);
    }

    if (word.StartsWith('\"'))
    {
        word = word.Remove(0, 1);
    }

    return word;
}

The example splits a string into words and removes potential commas, dots,
question marks, or double quotation marks. 

if (part.EndsWith('.') || part.EndsWith('?') || 
    part.EndsWith(',') || part.EndsWith('\"'))
{
    word = part.Remove(part.Length - 1, 1);
}

If the current word ends with any of the characters, we remove it with
Remove.

if (word.StartsWith('\"'))
{
    word = word.Remove(0, 1);
}

Also, we remove the double quote character if it precedes the string.

$ dotnet run
Did
you
go
there
We
did
but
we
had
a
great
service
there

## C# Substring

The Substring method retrieves a substring from a string.

Program.cs
  

var word = "bookcase";

Console.WriteLine(word.Substring(0, 4));
Console.WriteLine(word.Substring(4, 4));
Console.WriteLine(word.Substring(4));

The example uses the substring method to create two substrings. 

Console.WriteLine(word.Substring(0, 4));

We get the first word from the string. The first paramenter is the starting 
index and the second is the length of the substring.

Console.WriteLine(word.Substring(4, 4));

We get the second word.

Console.WriteLine(word.Substring(4));

This overloaded method starts from the specified index and continues to the end
of the string.

$ dotnet run
book
case
case

## C# string Palindrome

A palindrome is a word, number, phrase, or other sequence of characters which
reads the same backward as forward, such as madam or racecar. There are many
ways to check if a string is a palindrome. The following example is one of the
possible solutions. 

Program.cs
  

Console.WriteLine(isPalindrome("radar"));
Console.WriteLine(isPalindrome("kayak"));
Console.WriteLine(isPalindrome("forest"));

bool isPalindrome(string original)
{
    char[] data = original.ToCharArray();

    int i = 0;
    int j = data.Length - 1;

    while (j &gt; i)
    {

        if (data[i] != data[j])
        {
            return false;
        }

        i++;
        j--;
    }

    return true;
}

We have an implementation of the isPalindrome method. 

char[] data = original.ToCharArray();

We turn the string into a array of characters. 

int i = 0;
int j = data.Length - 1;

while (j &gt; i)
{
    if (data[i] != data[j])
    {
        return false;
    }

    i++;
    j--;
}

return true;

We iterate through the array and compare the left side characters with the right
side corresponding characters. If all match, we return true, otherwise we return
false. 

$ dotnet run
True
True
False

## C# string Copy vs Clone

We describe a difference between two methods: Copy
and Clone. The Copy method creates a new instance of
string with the same value as a specified string. The Clone method
returns a reference to the string which is being cloned. It is not an
independent copy of the string on the Heap. It is another reference on the same
string.

Program.cs
  

string str = "ZetCode";

string cloned = (string) str.Clone();
string copied = string.Copy(str);

Console.WriteLine(str.Equals(cloned)); // prints True
Console.WriteLine(str.Equals(copied)); // prints True

Console.WriteLine(ReferenceEquals(str, cloned)); // prints True
Console.WriteLine(ReferenceEquals(str, copied)); // prints False

Our example demonstrates the difference between the two methods.

string cloned = (string) str.Clone();
string copied = string.Copy(str);

The string value is cloned and copied.

Console.WriteLine(str.Equals(cloned)); // prints True
Console.WriteLine(str.Equals(copied)); // prints True

The Equals method determines whether two string objects have the
same value. The contents of all three strings are the same.

Console.WriteLine(ReferenceEquals(str, cloned)); // prints True
Console.WriteLine(ReferenceEquals(str, copied)); // prints False

The ReferenceEquals method compares the two reference objects.
Therefore comparing a copied string to the original string returns false.
Because they are two distinct objects.

## C# string format

In the next examples, we format strings. More in-depth coverage is presented in 
[C# String Format](/csharp/stringformat) article.

The .NET platform has a feature called *composite formatting*. It is
supported by Format and WriteLine methods. A method
takes a list of objects and a composite format string as input. The format
string consists of fixed string and some format items. These format items are
indexed placeholders which correspond to the objects in the list.

The format item has the following syntax:

{index[,length][:formatString]}

The index component is mandatory. It is a number starting from 0 that refers
to an item from the list of objects. Multiple items can refer to the same element
of the list of objects. An object is ignored if it is not referenced by a format
item. If we refer outside the bounds of the list of objects, a runtime exception
is thrown.

The length component is optional. It is the minimum number of characters in
the string representation of the parameter. If positive, the parameter is
right-aligned; if negative, it is left-aligned. If it is specified,
there must by a colon separating the index and the length.

The formatString is optional. It is a string that formats a value is a
specific way. It can be used to format dates, times, numbers or enumerations.

Program.cs
  

int oranges = 2;
int apples = 4;
int bananas = 3;

string str1 = "There are {0} oranges, {1} apples and {2} bananas";
string str2 = "There are {1} oranges, {2} bananas and {0} apples";

Console.WriteLine(str1, oranges, apples, bananas);
Console.WriteLine(str2, apples, oranges, bananas);

We print a simple message to the console. We use only index component
of the format item.

string str1 = "There are {0} oranges, {1} apples and {2} bananas";

The {0}, {1}, and {2} are format
items. We specify the index component. Other components are optional.

Console.WriteLine(str1, oranges, apples, bananas);

Now we put together the composite formatting. We have the string and
the list of objects (oranges, apples, bananas). The {0} format item
refers to the oranges. The WriteLine method
replaces the {0} format item with the contents of the oranges
variable.

string str2 = "There are {1} oranges, {2} bananas and {0} apples";

The order of the format items referring to the objects is notation
important.

$ dotnet run
There are 2 oranges, 4 apples and 3 bananas
There are 2 oranges, 3 bananas and 4 apples

The next example formats numeric data.

Program.cs
  

Console.WriteLine("{0}  {1, 12}", "Decimal", "Hexadecimal");

Console.WriteLine("{0:D}  {1,8:X}", 502, 546);
Console.WriteLine("{0:D}  {1,8:X}", 345, 765);
Console.WriteLine("{0:D}  {1,8:X}", 320, 654);
Console.WriteLine("{0:D}  {1,8:X}", 120, 834);
Console.WriteLine("{0:D}  {1,8:X}", 620, 454);

We print numbers in a decimal and hexadecimal format. We also align the numbers
using the length component.

Console.WriteLine("{0:D}  {1,8:X}", 502, 546);;

The {0:D} format item specifies, the first item from the
list of supplied objects will be taken and formatted in
the decimal format. The {1,8:X} format item takes the
second item. Formats it in the hexadecimal format :X.
And the string length will be 8 characters 8 . Because the
number has only three characters, it is right aligned and
padded with empty strings.

$ dotnet run
Decimal   Hexadecimal
502       222
345       2FD
320       28E
120       342
620       1C6

The last two examples format numeric and date data.

Program.cs
  

Console.WriteLine(string.Format("Number: {0:N}", 126));
Console.WriteLine(string.Format("Scientific: {0:E}", 126));
Console.WriteLine(string.Format("Currency: {0:C}", 126));
Console.WriteLine(string.Format("Percent: {0:P}", 126));
Console.WriteLine(string.Format("Hexadecimal: {0:X}", 126));

The example demonstrates the standard formatting specifiers for numbers.
Number 126 is printed in five different formats: normal, scientific, currency,
percent and hexadecimal.

$ dotnet run
Number: 126.00
Scientific: 1.260000E+002
Currency: $126.00
Percent: 12,600.00%
Hexadecimal: 7E

Finally, we format date and time data.

Program.cs
  

DateTime today = DateTime.Now;

Console.WriteLine(string.Format("Short date: {0:d}", today));
Console.WriteLine(string.Format("Long date: {0:D}", today));
Console.WriteLine(string.Format("Short time: {0:t}", today));
Console.WriteLine(string.Format("Long time: {0:T}", today));
Console.WriteLine(string.Format("Month: {0:M}", today));
Console.WriteLine(string.Format("Year: {0:Y}", today));

The code example shows six various formats for current date and time.

$ dotnet run
Short date: 5/1/2025
Long date: Thursday, May 1, 2025
Short time: 5:13 PM
Long time: 5:13:30 PM
Month: May 1
Year: May 2025

## Trimming whitespace

The Trim, TrimStart, and TrimEnd
methods are used to remove whitespace characters from the beginning and/or end
of a string. The Trim method removes whitespace from both ends,
while TrimStart removes whitespace from the beginning and
TrimEnd removes whitespace from the end. These methods return a
new string with the specified characters removed, leaving the original string
unchanged.  

Program.cs
  

string input = "   hello there   ";

Console.WriteLine($"Original: '{input}'");
Console.WriteLine($"Trim: '{input.Trim()}'");
Console.WriteLine($"TrimStart: '{input.TrimStart()}'");
Console.WriteLine($"TrimEnd: '{input.TrimEnd()}'");

This example shows how to remove whitespace from the beginning and/or end of a
string using Trim, TrimStart, and
TrimEnd.

## String comparison with culture and case sensitivity

The String.Compare method is used to compare two strings
with different StringComparison options. The StringComparison
enum provides options for culture-sensitive and case-sensitive comparisons.
The StringComparison.Ordinal option performs a case-sensitive
ordinal comparison, while StringComparison.InvariantCultureIgnoreCase
performs a case-insensitive comparison using the invariant culture. 

This is useful for comparing strings in a way that is not affected by the
current culture settings of the system. The String.Compare method
returns an integer indicating the relative position of the two strings in the
sort order. A negative value indicates that the first string precedes the second
string, zero indicates that they are equal, and a positive value indicates that
the first string follows the second string.

Program.cs
  

string a = "straße";
string b = "STRASSE";

Console.WriteLine(string.Compare(a, b, StringComparison.Ordinal));
Console.WriteLine(string.Compare(a, b, StringComparison.InvariantCultureIgnoreCase));

This example demonstrates comparing strings with different
StringComparison options, showing the effect of culture and case
sensitivity.

## Replace and remove substrings

The Replace method is used to replace all occurrences of a
specified substring with another substring in a string. The Remove
method is used to remove a specified number of characters from a string,
starting at a specified index. Both methods return a new string with the
modifications applied, leaving the original string unchanged. 

The Replace method is useful for changing specific parts of a
string, while the Remove method is useful for deleting unwanted
characters or substrings. The Remove method takes two parameters:
the starting index and the number of characters to remove. The
Replace method takes two parameters: the substring to replace and
the new substring to insert. Both methods return a new string with the specified
modifications, leaving the original string unchanged.

Program.cs
  

string text = "The quick brown fox jumps over the lazy dog.";
string replaced = text.Replace("fox", "cat");
string removed = text.Remove(16, 4); // removes 'fox '

Console.WriteLine(replaced);
Console.WriteLine(removed);

This example shows how to replace a substring and remove a portion of a string
by index and length.

## PadLeft and PadRight for formatting

The PadLeft and PadRight methods are used to
pad a string with a specified character to the left or right, respectively.
The PadLeft method adds padding characters to the left side of
the string until it reaches a specified total width, while the
PadRight method adds padding characters to the right side of
the string. 

Both methods return a new string with the padding applied, leaving the original
string unchanged. The padding character can be specified as an argument, and the
total width can be specified as well. If the original string is already equal to
or greater than the specified width, no padding is added. These methods are
useful for formatting strings for display, such as aligning text in a table or
ensuring consistent widths for output.

Program.cs
  

string word = "42";

Console.WriteLine(word.PadLeft(5, '0'));
Console.WriteLine(word.PadRight(8, '-'));

This example demonstrates how to align or pad strings using
PadLeft and PadRight.

## Efficient string search with IndexOf and LastIndexOf

The IndexOf and LastIndexOf methods are used to
find the position of a specified character or substring within a string.
The IndexOf method returns the zero-based index of the first
occurrence of the specified character or substring, while the
LastIndexOf method returns the zero-based index of the last
occurrence. If the specified character or substring is not found, both
methods return -1. 

These methods are useful for searching for specific
characters or substrings within a larger string, allowing you to determine
the position of the first or last occurrence. The search is case-sensitive
by default, but you can specify a StringComparison option to
control the case sensitivity of the search. The IndexOf and
LastIndexOf methods can also take additional parameters to
specify the starting index and the number of characters to search within.

Program.cs
  

string phrase = "abracadabra";
int first = phrase.IndexOf('a');
int last = phrase.LastIndexOf('a');

Console.WriteLine($"First 'a': {first}");
Console.WriteLine($"Last 'a': {last}");

This example uses IndexOf and LastIndexOf to find
the position of characters in a string.

## Source

[Strings and string literals](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/)

In this article, we explored the fundamentals of C# strings, including their
definition, key classes, and practical usage. By understanding how strings
function in C#, you can effectively handle and manipulate text in your
applications, whether you're working with immutable objects or dynamic string
builders.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).