+++
title = "Ruby regular expressions"
date = 2025-08-29T20:03:12.506+01:00
draft = false
description = "In this part of the Ruby tutorial, we cover regular expressions. Regular expressions are used for text searching and more advanced text manipulation."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../oop2/)
[Next](../io/)

# Ruby regular expressions

last modified October 18, 2023

In this part of the Ruby tutorial, we talk about Regular expressions in Ruby.

Regular expressions are used for text searching and more advanced text
manipulation. Regular expressions are built into tools like grep, sed; text
editors like vi, emacs; programming languages like Tcl, Perl, Python. Ruby has a
built-in support for regular expressions too.

From another point of view, regular expression syntax constitutes a domain specific
language for matching text.

A *pattern* is a regular expression that defines the text we are searching for
or manipulating. It consists of text literals and metacharacters. The pattern is
placed inside two delimiters. In Ruby these are // characters. They inform
the regex function where the pattern starts and ends.

Here is a partial list of metacharacters:

.Matches any single character.
*Matches the preceding element zero or more times.
[  ]Bracket expression. Matches a character within the brackets.
[^  ]Matches a single character that is not contained within the brackets.
^Matches the starting position within the string.
$Matches the ending position within the string.
|Alternation operator.

The =~ operator matches the regular expression against a string,
and it returns either the offset of the match from the string if it is found,
otherwise nil. The Regexp class is used to develop regular expressions.
There are also two shorthand ways to create regular expressions. The following
example will show them.

simple.rb
  

#!/usr/bin/ruby

re = Regexp.new 'Jane'
p "Jane is hot".match re

p "Jane is hot" =~ /Jane/
p "Jane is hot".match %r{Jane}

In the first example, we show three ways of applying regular
expressions on a string.

re = Regexp.new 'Jane'
p "Jane is hot".match re

In the above two lines, we create a Regexp object containing
a simple regular expression text. Using the match method, we
apply this regular expression object on the "Jane is hot" sentence. We check,
if the word 'Jane' is inside the sentence.

p "Jane is hot" =~ /Jane/
p "Jane is hot".match %r{Jane}

These two lines do the same. Two forward slashes // and the %r{} characters are
shorthands for the more verbose first way. In this tutorial, we use the
forward slashes. This is a de facto standard in many languages.

$ ./simple.rb
#&lt;MatchData "Jane"&gt;
0
#&lt;MatchData "Jane"&gt;

In all three cases there is a match. The match method returns a
matched data, or nil if there is no match. The =~
operator returns the first character of the matched text, or nil
otherwise.

## The dot character

The dot character is a regular expression character, which matches any single
character. Note that there must be some character; it may not be omitted.

dot.rb
  

#!/usr/bin/ruby

p "Seven".match /.even/
p "even".match /.even/
p "eleven".match /.even/
p "proven".match /.even/

In the first example, we use the match method
to apply regular expression on strings. The match method
returns the matched data on success or nil otherwise.

p "Seven".match /.even/

The "Seven" is the string on which we call the match method.
The parameter of the method is the pattern. The /.even/ regular
pattern looks for a text that starts with an arbitrary character followed
by the 'even' characters.

$ ./dot.rb
#&lt;MatchData "Seven"&gt;
nil
#&lt;MatchData "leven"&gt;
nil

From the output we can see which strings did match and which did not.

As we have said above, if there is a dot character, there must be
an arbitrary character. It may not be omitted. What if we wanted to
search for a text, in which the character might be omitted? In other
words, we want a pattern for both 'seven' and 'even'. For this, we
can use a ? repetition character. The ?
repetition character tells that the previous character may be present 0 or 1 time.

dot2.rb
  

#!/usr/bin/ruby

p "seven".match /.even/
p "even".match /.even/
p "even".match /.?even/

The script uses the ? repetition character.

p "even".match /.even/

This line prints nil since the regular expression expects one
character before the 'even' string.

p "even".match /.?even/

Here we have slightly modified the regular expression. The .? stands
for no character or one arbitrary character. This time there is a match.

$ ./dot2.rb
#&lt;MatchData "seven"&gt;
nil
#&lt;MatchData "even"&gt;

## Ruby regular expression methods

In the previous two examples, we have used the match method
to work with regular expressions. Other methods besides match accept regular
expressions as parameters.

regex_methods.rb
  

#!/usr/bin/ruby

puts "motherboard" =~ /board/
puts "12, 911, 12, 111"[/\d{3}/]

puts "motherboard".gsub /board/, "land"

p "meet big deep nil need".scan /.[e][e]./
p "This is Sparta!".split(/\s/)

The example shows some methods that can work with regular expressions.

puts "motherboard" =~ /board/

The =~ is an operator that applies the regular expression on the right
to the string on the left.

puts "12, 911, 12, 111"[/\d{3}/]

Regular expressions can be placed between the square brackets following
the string. This line prints the first string which has three digits.

puts "motherboard".gsub /board/, "land"

With the gsub method we replace a 'board' string with
a 'land' string.

p "meet big deep nil need".scan /.[e][e]./

The scan method looks for matches in the string.
It looks for all occurrences, not just the first one. The line prints
all strings that match the pattern.

p "This is Sparta!".split(/\s/)

The split method splits a string using a given regular
expression as a separator. The \s character type stands
for any whitespace character.

$ ./regex_methods.rb
6
911
motherland
["meet", "deep", "need"]
["This", "is", "Sparta!"]

We see the output.

## Ruby special variables

Some of the methods that work with regular expressions activate
a few special variables. They contain the last matched string, the
string before the last match and string after the last match. These
variables make the job easier for a programmer.

svars.rb
  

#!/usr/bin/ruby

puts "Her name is Jane" =~ /name/

p $`
p $&amp;
p $'

The example shows three special variables.

puts "Her name is Jane" =~ /name/

In this line we have a simple regular expression matching. We look for a 'name'
string inside the 'Her name is Jane' sentence. We use the =~
operator. This operator also sets three special variables. The line returns
number 4, which is the position on which the match starts.

p $`

The $` special variable contains the text before the last match.

p $&amp;

The $&amp; has the matched text.

p $'

And the $' variable contains the text after
the last match.

$ ./svars.rb
4
"Her "
"name"
" is Jane"

## Anchors

Anchors match positions of characters inside a given text.
We present three anchoring characters. The ^ character
matches the beginning of the line. The $ character matches the
end of the line. The \b character matches word boundaries.

anchors.rb
  

#!/usr/bin/ruby

sen1 = "Everywhere I look I see Jane"
sen2 = "Jane is the best thing that happened to me"

p sen1.match /^Jane/
p sen2.match /^Jane/

p sen1.match /Jane$/
p sen2.match /Jane$/

In the first example, we work with the ^ and the $
anchoring characters.

sen1 = "Everywhere I look I see Jane"
sen2 = "Jane is the best thing that happened to me"

We have two sentences. The word 'Jane' is located at the
beginning of the first one and at the end of the second
one.

p sen1.match /^Jane/
p sen2.match /^Jane/

Here we look if the word 'Jane' is at the beginning of the
two sentences.

p sen1.match /Jane$/
p sen2.match /Jane$/

Here we look for a match of a text at the end of
the sentences.

$ ./anchors.rb
nil
#&lt;MatchData "Jane"&gt;
#&lt;MatchData "Jane"&gt;
nil

These are the results.

A common request is to include only a match of a whole word. By default we count
any match, including a match in larger or compound words. Let us look at an
example to clarify things.

boundaries.rb
  

#!/usr/bin/ruby

text = "The cat also known as the domestic cat is a small,
usually furry, domesticated, carnivorous mammal."

p text.scan /cat/

p $`
p $&amp;
p $'

We have a sentence. And within this sentence, we look for a string cat. Using
scan, we look for all 'cat' strings in the sentence—not just the
first occurrence.

text = "The cat also known as the domestic cat is a small,
usually furry, domesticated, carnivorous mammal."

The problem is that inside the text there are three 'cat' strings. In addition
to matching the 'cat' that refers to the mammal,
/cat/ matches letters 8-10 inside the word 'domesticated'. Which is
not what we are looking for in this case.

$ ./boudaries.rb
["cat", "cat", "cat"]
"The cat also known as the domestic cat is a small, \nusually furry, domesti"
"cat"
"ed, carnivorous mammal."

This last match on 'domesticated' will be eliminated in the next example,
using the \b anchor.

The \b character is used to set boundaries to the words
we are looking for.

boundaries2.rb
  

#!/usr/bin/ruby

text = "The cat also known as the domestic cat is a small,
usually furry, domesticated, carnivorous mammal."

p text.scan /\bcat\b/

p $`
p $&amp;
p $'

The example is improved by including the \b metacharacter.

p text.scan /\bcat\b/

With the above regular expression, we look for 'cat' strings
as whole words. We do not count subwords.

$ ./boundaries2.rb
["cat", "cat"]
"The cat also known as the domestic "
"cat"
" is a small, \nusually furry, domesticated, carnivorous mammal."

This time there are two matches. And the special variables show
correctly the text before and after the last match.

## Character classes

We can combine characters into character classes with the
square brackets. A character class matches any character that is
specified in the brackets. The /[ab]/ pattern means
a or b, as opposed to /ab/ which means a followed by b.

char_classes.rb
  

#!/usr/bin/ruby

words = %w/ sit MIT fit fat lot pad /

pattern = /[fs]it/

words.each do |word|
   if word.match pattern
       puts "#{word} matches the pattern"
   else
       puts "#{word} does not match the pattern"
   end
end

We have an array of six three letter words. We apply a regular expression on the
strings of the array with a specific character set.

pattern = /[fs]it/

This is the pattern. The pattern looks for 'fit' and 'sit' strings in the array.
We use either 'f' or 's' from the character set.

$ ./char_classes.rb
sit matches the pattern
MIT does not match the pattern
fit matches the pattern
fat does not match the pattern
lot does not match the pattern
pad does not match the pattern

There are two matches.

In the next example we further explore the character classes.

char_classes2.rb
  

#!/usr/bin/ruby

p "car".match %r{[abc][a][rs]}
p "car".match /[a-r]+/
p "23af 433a 4ga".scan /\b[a-f0-9]+\b/

The example has three regular expressions with character classes.

p "car".match %r{[abc][a][rs]}

The regular expression in this line consists of three character classes.
Each is for one character. The [abc] is either a, b, or c.
The [a] is only a. The third one, [rs], is
either r or s. There is a match with the 'car' string.

p "car".match /[a-r]+/

We can use a hyphen — character inside the character class. The hyphen is a
metacharacter denoting an inclusive range of characters:  here, a, b, c, d, e,
f, g, h, i, j, k, l, m, n, o, p, q, or r. Since the character class applies only
for one character, we also use the + repetition
character. This says that the previous character from the character set
may be repeated one or more times. The 'car' strings meets these conditions.

p "23af 433a 4ga".scan /\b[a-f0-9]+\b/

In this line, we have a string consisting of three substrings. With the
scan method we check for hexadecimal numbers.
We have two ranges. The first, [a-f] stands for characters
from a to f. The second one, [0-9] stands for numbers 0 to 9.
The + specifies that these characters can be repeated multiple times.
Finally, the \b metacharacters create boundaries, which accept
only strings that consists of only these characters.

$ ./char_classes2.rb
#&lt;MatchData "car"&gt;
#&lt;MatchData "car"&gt;
["23af", "433a"]

If the first character of a character class is a caret ^
the class is inverted. It matches any character except those which are specified.

caret.rb
  

#!/usr/bin/ruby

p "ABC".match /[^a-z]{3}/
p "abc".match /[^a-z]{3}/

In the example, we use a caret character inside a character
class.

p "ABC".match /[^a-z]{3}/

We look for a string having 3 letters. These letters may
not be letters from a to z. The "ABC" string matches the regular
expression because all three characters are uppercase characters.

p "abc".match /[^a-z]{3}/

This "abc" string does not match. All three characters are in the range
that is excluded from the search.

$ ./caret.rb
#&lt;MatchData "ABC"&gt;
nil

Here we have the example output.

## Quantifiers

A quantifier after a token or group specifies how often
that preceding element is allowed to occur.

?     - 0 or 1 match
*     - 0 or more
+     - 1 or more
{n}   - exactly n
{n,}  - n or more
{,n}  - n or less (??)
{n,m} - range n to m

The above is a list of common quantifiers.

nchars.rb
  

#!/usr/bin/ruby

p "seven dig moon car lot fire".scan /\w{3}/
p "seven dig moon car lot fire".scan /\b\w{3}\b/

In the example, we want to select those words that
have exactly three characters. The \w character is
a word character, and \w{3} means three times
the prevoius word character.

p "seven dig moon car lot fire".scan /\w{3}/

The first line simply cuts first three characters from each string. This is not
exactly what we want.

p "seven dig moon car lot fire".scan /\b\w{3}\b/

This is an improved search. We put the previous pattern between the
\b boundary metacharacter. Now the search will find only those
words that have exactly three characters.

$ ./nchars.rb
["sev", "dig", "moo", "car", "lot", "fir"]
["dig", "car", "lot"]

The {n,m} is a repetition structure for strings
having from n to m characters.

rchars.rb
  

#!/usr/bin/ruby

p "I dig moon lottery it fire".scan /\b\w{2,4}\b/

In the above example we choose words that have two, three of four
characters. We again use the boundary \b metacharacter to
choose whole words.

$ ./rchars.rb
["dig", "moon", "it", "fire"]

The example prints an array of words having 2-4 characters.

In the next example, we present the ? metacharacter.
A character followed by a ? is optional. Formally, the character
preceding the ? may be present once or 0 times.

qmark.rb
  

#!/usr/bin/ruby

p "color colour colors colours".scan /colou?rs/
p "color colour colors colours".scan /colou?rs?/

p "color colour colors colours".scan /\bcolor\b|\bcolors\b|\bcolour\b|\bcolours\b/

Say we have a text in which we want to look for the
colour word. The word has two distinct spellings, English 'colour'
and American 'color'. We want to find both occurrences, plus we
want to find their plurals too.

p "color colour colors colours".scan /colou?rs/

The colou?rs pattern finds both 'colours' and 'colors'. The u character, which
precedes the ? metacharacter is optional.

p "color colour colors colours".scan /colou?rs?/

The colou?rs? pattern makes the u and s characters optional. And so we find
all four colour combinations.

p "color colour colors colours".scan /\bcolor\b|\bcolors\b|\bcolour\b|\bcolours\b/

The same request could be written using alternations.

$ ./qmark.rb
["colors", "colours"]
["color", "colour", "colors", "colours"]
["color", "colour", "colors", "colours"]

In the last example of this section, we show the + metacharacter.
It allows the preceding character to be repeated 1 or more times.

numbers.rb
  

#!/usr/bin/ruby

nums = %w/ 234 1 23 53434 234532453464 23455636
    324f 34532452343452 343 2324 24221 34$34232/

nums.each do |num|
    m = num.match /[0-9]+/

    if m.to_s.eql? num
        puts num
    end
end

In the example, we have an array of numbers. Numbers can have one or more number
characters.

nums = %w/ 234 1 23 53434 234532453464 23455636
    324f 34532452343452 343 2324 24221 34$34232/

This is an array of strings. Two of them are not numbers, because
they contain non-numerical characters. They must be excluded.

nums.each do |num|
    m = num.match /[0-9]+/

    if m.to_s.eql? num
        puts num
    end
end

We go through the array and apply the regular expression on each string. The
expression is [0-9]+, which stands for any character from 0..9,
repeated 0 or multiple times. By default, the regular expression looks for
substrings as well. In the 34$34232 the engine considers 34 to be a number. The
\b boundaries do not work here because we do not have concrete
characters and the engine does not know, where to stop looking. This is why we
have included an if condition in the block. The string is considered a number
only if the match is equal to the original string.

$ ./numbers.rb
234
1
23
53434
234532453464
23455636
34532452343452
343
2324
24221

These values are numbers.

## Case insensitive search

We can perform a case insensitive search. A regular expression can be followed
by an option. It is a single character that modifies the pattern in some way. In
case of a case insensitive search, we apply the i option.

icase.rb
  

#!/usr/bin/ruby

p "Jane".match /Jane/
p "Jane".match /jane/
p "Jane".match /JANE/

p "Jane".match /jane/i
p "Jane".match /Jane/i
p "Jane".match /JANE/i

The example show both case sensitive and case insensitive search.

p "Jane".match /Jane/
p "Jane".match /jane/
p "Jane".match /JANE/

In these three lines the characters must exactly match the
pattern. Only the first line gives a match.

p "Jane".match /jane/i
p "Jane".match /Jane/i
p "Jane".match /JANE/i

Here we use the i option, which followers the second / character.
We do case insensitive search. All three lines do match.

$ ./icase.rb
#&lt;MatchData "Jane"&gt;
nil
nil
#&lt;MatchData "Jane"&gt;
#&lt;MatchData "Jane"&gt;
#&lt;MatchData "Jane"&gt;

## Alternation

The next example explains the alternation operator |.
This operator enables to create a regular expression with several choices.

alternation.rb
  

#!/usr/bin/ruby

names = %w/Jane Thomas Robert Lucy Beky
    John Peter Andy/

pattern = /Jane|Beky|Robert/

names.each do |name|

    if name =~ pattern
        puts "#{name} is my friend"
    else
        puts "#{name} is not my friend"
    end
end

We have 8 names in the names array. We look for a multiple combination of
strings in that array.

pattern = /Jane|Beky|Robert/

This is the search pattern. It says, Jane, Beky, and Robert are my friends. If
you find either of them, you have found my friend.

$ ./alternation.rb
Jane is my friend
Thomas is not my friend
Robert is my friend
Lucy is not my friend
Beky is my friend
John is not my friend
Peter is not my friend
Andy is not my friend

Here we see the output of the script.

## Subpatterns

We can use parentheses  to create subpatterns inside patterns.

subpatterns.rb
  

#!/usr/bin/ruby

p "bookworm" =~ /book(worm)?$/
p "book" =~ /book(worm)?$/
p "worm" =~ /book(worm)?$/
p "bookstore" =~ /book(worm)?$/

We have the following regex pattern: book(worm)?$.
The (worm) is a subpattern. Only two strings can match: either
'book' or 'bookworm'. The ? character follows the subpattern,
which means that the subpattern might appear 0, 1 time in the final pattern.
The $ character is here for the exact end match
of the string. Without it, words like bookstore and bookmania would match too.

subpatterns2.rb
  

#!/usr/bin/ruby

p "book" =~ /book(shelf|worm)?$/
p "bookshelf" =~ /book(shelf|worm)?$/
p "bookworm" =~ /book(shelf|worm)?$/
p "bookstore" =~ /book(shelf|worm)?$/

Subpatterns are often combined with alternation to create multiple word
combinations. For example, book(shelf|worm) matches 'bookshelf' and
'bookworm', and book(shelf|worm)? matches 'bookshelf', 'bookworm',
and 'book'.

$ ./subpatterns2.rb
0
0
0
nil

The last subpattern does not match. Remember that the 0s do not mean
that there was no match. For the =~ operator, it is the index
of the first character of the matched string.

## Email example

In the final example, we create a regex pattern for checking email
addresses.

email.rb
  

#!/usr/bin/ruby

emails = %w/ luke@gmail.com andy@yahoo.com 23214sdj^as
    f3444@gmail.com /

pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/

emails.each do |email|

    if email.match pattern
        puts "#{email} matches"
    else
        puts "#{email} does not match"
    end

end

Note that this example provides only one solution. It does not have to be the
best one.

emails = %w/ luke@gmail.com andy@yahoocom 23214sdj^as
    f3444@gmail.com /

This is an array of emails. Only two of them are valid.

pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/

This is the pattern. The first ^ and the last $ characters
are here to get an exact pattern match. No characters before and after the pattern
are allowed. The email is divided into five parts.

The first part is the local part. This is usually a name of a company, individual,
or a nickname. The [a-zA-Z0-9._-]+ lists all possible characters we
can use in the local part. They can be used one or more times.
The second part is the literal @ character. The third part is the
domain part. It is usually the domain name of the email provider: e.g., yahoo or gmail.
The character set [a-zA-Z0-9-]+ specifies all
characters that can be used in the domain name. The + quantifier makes

use of one or more of these characters. The fourth part is the dot character. It is
preceded by the escape character \. This is because the dot character
is a metacharacter and has a special meaning. By escaping it,
we get a literal dot. The final part is the top level domain. The pattern is as
follows: [a-zA-Z.]{2,5} Top level domains can have from 2 to 5 characters,
like sk, net, info, or travel. There is also a dot character.
This is because some top level domains like co.uk have two parts.

$ ./email.rb
luke@gmail.com matches
andy@yahoocom does not match
23214sdj^as does not match
f3444@gmail.com matches

The regular expression marked two strings as valid email adresses.

In this chapter, we have covered regular expressions in Ruby.

[Contents](..)
[Previous](../oop2/)
[Next](../io/)