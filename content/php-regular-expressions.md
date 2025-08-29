+++
title = "PHP regular expressions"
date = 2025-08-29T20:04:41.563+01:00
draft = false
description = "Learn how to use regular expressions in PHP for text searching, validation, and advanced text manipulation. This guide covers regex functions, pattern matching, and practical examples for efficient string operations."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP regular expressions

last modified May 19, 2025

This article explores the use of regular expressions in PHP, a powerful tool for
text searching and advanced text manipulation.

Regular expressions are widely utilized in applications such as grep, sed, and
text editors like vi and emacs. They are also integrated into many programming
languages, including Tcl, Perl, Python, and PHP, which provides built-in support
for regex processing.

PHP offers two regular expression modules: POSIX Regex and PCRE. The POSIX Regex
module is deprecated, so this guide focuses exclusively on PCRE (Perl-Compatible
Regular Expressions), which is more efficient and widely used.

Working with regular expressions in PHP requires two key elements: regex
functions and a pattern.

A *pattern* is a structured expression that defines the text to be
matched or manipulated. It consists of literal characters and metacharacters.
The pattern is enclosed within delimiters, commonly
//, ##, or @@. These delimiters indicate
where the regular expression begins and ends, allowing PHP's regex functions to
interpret and process the pattern correctly.

Here is a partial list of metacharacters used in PCRE (Perl-Compatible Regular
Expressions). These special characters allow powerful pattern matching and text
processing in PHP.

    
        
            Metacharacter / Syntax
            Description
            Example Usage
        
    
    
        
            .
            Matches any single character except a newline.
            /a.c/ matches abc, a7c, but not ac.
        
        
            *
            Matches the preceding element zero or more times.
            /go*/ matches g, go, goo, etc.
        
        
            [ ]
            Bracket expression. Matches a character within the brackets.
            /[aeiou]/ matches any vowel in a string.
        
        
            [^ ]
            Negated bracket expression. Matches any character except the ones specified.
            /[^0-9]/ matches any non-digit character.
        
        
            ^
            Matches the starting position of the string.
            /^Hello/ matches Hello world but not World, Hello.
        
        
            $
            Matches the ending position of the string.
            /world$/ matches Hello world but not world Hello.
        
        
            |
            Alternation operator. Acts like an "OR" condition.
            /cat|dog/ matches cat or dog.
        
        
            \d
            Matches any digit (0-9).
            /\d+/ matches 123, 98, but not abc.
        
        
            \D
            Matches any non-digit character.
            /\D+/ matches abc, hello, but not 123.
        
        
            \w
            Matches any word character (letters, digits, underscores).
            /\w+/ matches hello123, var_name, but not #!.
        
        
            \W
            Matches any non-word character.
            /\W+/ matches symbols like @#$%.
        
        
            \s
            Matches whitespace (spaces, tabs, newlines).
            /\s+/ matches "   " (multiple spaces).
        
        
            \S
            Matches any non-whitespace character.
            /\S+/ matches Hello, word, but not spaces.
        
        
            +
            Matches the preceding element one or more times.
            /go+/ matches go, goo, but not g.
        
        
            {n}
            Matches exactly n occurrences of the preceding element.
            /\d{3}/ matches 123, but not 12 or 1234.
        
        
            {n,}
            Matches at least n occurrences.
            /\w{5,}/ matches words 5 or more characters long.
        
        
            ( )
            Capturing groups for extracting sub-patterns.
            /(\d{3})-(\d{3})-(\d{4})/ matches a phone number format.
        
    

## PHP PCRE Functions

PHP provides powerful regular expression functions through the PCRE
(Perl-Compatible Regular Expressions) library, all prefixed with
preg_. These functions enable flexible text manipulation and
pattern matching.

Here are four commonly used PCRE functions:

    preg_split - Splits a string using a regular expression
    pattern.
    preg_match - Performs a regex match and returns a success
    indicator.
    preg_replace - Searches for a pattern and replaces
    occurrences in a string.
    preg_grep - Filters an array, returning entries that
    match a regex pattern.

Let's examine how each function works with practical examples.

main.php
  

&lt;?php

$text = "Jane\tKate\nLucy Marion";
$names = ["Jane", "jane", "Joan", "JANE"];
$sentence = "I saw Jane. Jane was beautiful.";

// Splitting a string using whitespace characters (\s)
print_r(preg_split("@\s@", $text));

// Checking if 's' belongs to the lowercase alphabet
echo preg_match("#[a-z]#", "s") ? "Match found\n" : "No match\n";

// Replacing 'Jane' with 'Beky' in a sentence
$updatedSentence = preg_replace("/Jane/", "Beky", $sentence);
echo "Updated text: $updatedSentence\n";

// Filtering array values matching 'Jane' (case-sensitive)
print_r(preg_grep("#Jane#", $names));

// Filtering array values matching 'Jane' (case-insensitive)
print_r(preg_grep("#Jane#i", $names));

In the first example, preg_split divides a string by whitespace
characters (\s), including spaces, tabs, and newlines. The result is an array of
individual words.

Next, preg_match checks whether the letter 's' belongs to the
lowercase character class ([a-z]). Since it matches, the function returns 1,
indicating success.

With preg_replace, we substitute all occurrences of "Jane" with
"Beky" in a sentence. This function efficiently modifies text using regex-based
replacements.

The preg_grep function filters arrays based on a pattern. In the
first case, it performs a case-sensitive search, returning only exact matches
for "Jane." The second example includes the i modifier, making the search
case-insensitive, allowing matches for "Jane," "jane," and "JANE."

These functions make text processing, validation, and data extraction easier and
more efficient in PHP. Understanding how to apply them correctly improves the
reliability of regex-based operations.

$ php main.php
Array
(
    [0] =&gt; Jane
    [1] =&gt; Kate
    [2] =&gt; Lucy
    [3] =&gt; Marion
)
Match found
Updated text: I saw Beky. Beky was beautiful.
Array
(
    [0] =&gt; Jane
)
Array
(
    [0] =&gt; Jane
    [1] =&gt; jane
    [3] =&gt; JANE
)

## PHP regex dot metacharacter

The . (dot) metacharacter stands for any single character in the text. 

single.php
  

&lt;?php

declare(strict_types=1);

$words = [ "Seven", "even", "Maven", "Amen", "Leven" ];
$pattern = "/.even/";

foreach ($words as $word) {

    if (preg_match($pattern, $word)) {
        echo "$word matches the pattern\n";
    } else {
        echo "$word does not match the pattern\n";
    }
}

In the $words array, we have five words. 

$pattern = "/.even/";

Here we define the search pattern. The pattern is a string. The regular expression 
is placed within delimiters. The delimiters are mandatory.
In our case, we use forward slashes / / as delimiters. Note that we
can use different delimiters if we want. The dot character stands for any single character.

if (preg_match($pattern, $word)) {
    echo "$word matches the pattern\n";
} else {
    echo "$word does not match the pattern\n";
}

We test all five words if they match with the pattern. 

$ php single.php 
Seven matches the pattern
even does not match the pattern
Maven does not match the pattern
Amen does not match the pattern
Leven matches the pattern

The Seven and Leven words match our search pattern. 

## PHP regex anchors

Anchors match positions of characters inside a given text. 

In the next example, we look if a string is located at
the beginning of a sentence. 

anchors.php
  

&lt;?php

declare(strict_types=1);

$sentence1 = "Everywhere I look I see Jane";
$sentence2 = "Jane is the best thing that happened to me";

if (preg_match("/^Jane/", $sentence1)) {
    echo "Jane is at the beginning of the \$sentence1\n";
} else {
    echo "Jane is not at the beginning of the \$sentence1\n";
}

if (preg_match("/^Jane/", $sentence2)) {
    echo "Jane is at the beginning of the \$sentence2\n";
} else {
    echo "Jane is not at the beginning of the \$sentence2\n";
}

We have two sentences. The pattern is ^Jane. The pattern 
checks if the 'Jane' string located at the beginning of the text.

$ php anchors.php 
Jane is not at the beginning of the $sentence1
Jane is at the beginning of the $sentence2

```
php&gt; echo preg_match("#Jane$#", "I love Jane");
1
php&gt; echo preg_match("#Jane$#", "Jane does not love me");
0

```

The Jane$ pattern matches a string in which the word 
Jane is at the end.

## PHP regex exact word match

In the following examples we show how to look for exact word matches.

php&gt; echo preg_match("/mother/", "mother");
1
php&gt; echo preg_match("/mother/", "motherboard");
1
php&gt; echo preg_match("/mother/", "motherland");
1

The mother pattern fits the words mother, motherboard and motherland. 
Say, we want to look just for exact word matches. We will use the aforementioned 
anchor ^ and $ characters.

php&gt; echo preg_match("/^mother$/", "motherland");
0
php&gt; echo preg_match("/^mother$/", "Who is your mother?");
0
php&gt; echo preg_match("/^mother$/", "mother");
1

Using the anchor characters, we get an exact word match for a pattern. 

## PHP regex quantifiers

A quantifier after a token or a group specifies how often that 
preceding element is allowed to occur.

 ?     - 0 or 1 match
 *     - 0 or more
 +     - 1 or more
 {n}   - exactly n
 {n,}  - n or more
 {,n}  - n or less (??)
 {n,m} - range n to m

The above is a list of common quantifiers.

The question mark ? indicates there is zero or one of 
the preceding element.

zeroorone.php
  

&lt;?php

declare(strict_types=1);

$words = [ "color", "colour", "comic", "colourful", "colored", 
    "cosmos", "coloseum", "coloured", "colourful" ];
$pattern = "/colou?r/";

foreach ($words as $word) {
    if (preg_match($pattern, $word)) {
        echo "$word matches the pattern\n";
    } else {
        echo "$word does not match the pattern\n";
    }
}

We have four nine in the $words array. 

$pattern = "/colou?r/";

Color is used in American English, colour in British English.
This pattern matches both cases.

$ php zeroorone.php 
color matches the pattern
colour matches the pattern
comic does not match the pattern
colourful matches the pattern
colored matches the pattern
cosmos does not match the pattern
coloseum does not match the pattern
coloured matches the pattern
colourful matches the pattern

The * metacharacter matches the preceding element 
zero or more times.

zeroormore.php
  

&lt;?php

declare(strict_types=1);

$words = [ "Seven", "even", "Maven", "Amen", "Leven" ];

$pattern = "/.*even/";

foreach ($words as $word) {
    
    if (preg_match($pattern, $word)) {
        echo "$word matches the pattern\n";
    } else {
        echo "$word does not match the pattern\n";
    }
}

In the above script, we have added the * metacharacter. 
The .* combination means, zero, one or more single characters. 

$ php zeroormore.php 
Seven matches the pattern
even matches the pattern
Maven does not match the pattern
Amen does not match the pattern
Leven matches the pattern

Now the pattern matches three words: Seven, even and Leven. 

php&gt; print_r(preg_grep("#o{2}#", ["gool", "root", "foot", "dog"]));
Array
(
    [0] =&gt; gool
    [1] =&gt; root
    [2] =&gt; foot
)

The o{2} pattern matches strings that contain exactly 
two 'o' characters.

php&gt; print_r(preg_grep("#^\d{2,4}$#", ["1", "12", "123", "1234", "12345"]));
Array
(
    [1] =&gt; 12
    [2] =&gt; 123
    [3] =&gt; 1234
)

We have this ^\d{2,4}$ pattern. The \d is a character 
set; it stands for digits. The pattern matches numbers that have 2, 3, or 4 digits. 

## PHP regex alternation

The next example explains the alternation operator |. This operator
enables to create a regular expression with several choices. 

alternation.php
  

&lt;?php

declare(strict_types=1);

$names = [ "Jane", "Thomas", "Robert", "Lucy", "Beky", 
    "John", "Peter", "Andy" ];

$pattern = "/Jane|Beky|Robert/";

foreach ($names as $name) {

    if (preg_match($pattern, $name)) {
        echo "$name is my friend\n";
    } else {
        echo "$name is not my friend\n";
    }
}

We have eight names in the $names array. 

$pattern = "/Jane|Beky|Robert/";

This is the search pattern. The pattern looks for 'Jane', 'Beky', or
'Robert' strings.

$ php alternation.php 
Jane is my friend
Thomas is not my friend
Robert is my friend
Lucy is not my friend
Beky is my friend
John is not my friend
Peter is not my friend
Andy is not my friend

## PHP regex subpatterns

We can use square brackets  to create subpatterns 
inside patterns.

php&gt; echo preg_match("/book(worm)?$/", "bookworm");
1
php&gt; echo preg_match("/book(worm)?$/", "book");
1
php&gt; echo preg_match("/book(worm)?$/", "worm");
0

We have the following regex pattern: book(worm)?$. The (worm) is
a subpattern. The ? character follows the subpattern, which means that the subpattern
might appear 0, 1 times in the final pattern. The $ character is here for 
the exact end match of the string. Without it, words like bookstore, bookmania would match too.

php&gt; echo preg_match("/book(shelf|worm)?$/", "book");
1
php&gt; echo preg_match("/book(shelf|worm)?$/", "bookshelf");
1
php&gt; echo preg_match("/book(shelf|worm)?$/", "bookworm");
1
php&gt; echo preg_match("/book(shelf|worm)?$/", "bookstore");
0

Subpatterns are often used with alternation. The (shelf|worm) 
subpattern enables to create several word combinations. 

## PHP regex character classes

We can combine characters into character classes with the square brackets.
A character class matches any character that is specified in the brackets. 

characterclass.php
  

&lt;?php

declare(strict_types=1);

$words = [ "sit", "MIT", "fit", "fat", "lot" ];

$pattern = "/[fs]it/";

foreach ($words as $word) {

    if (preg_match($pattern, $word)) {
        echo "$word matches the pattern\n";
    } else {
        echo "$word does not match the pattern\n";
    }
}

We define a character set with two characters.  

$pattern = "/[fs]it/";

The [fs] is the character class. Note that we work only with one
character at a time. We either consider f, or s, but not both.

$ php characterclass.php 
sit matches the pattern
MIT does not match the pattern
fit matches the pattern
fat does not match the pattern
lot does not match the pattern

We can also use shorthand metacharacters for character classes. 
The \w stands for alphanumeric characters, 
\d for digit, and \s whitespace characters.  

shorthand.php
  

&lt;?php

declare(strict_types=1);

$words = [ "Prague", "111978", "terry2", "mitt##" ];
$pattern = "/\w{6}/";

foreach ($words as $word) {

    if (preg_match($pattern, $word)) {
        echo "$word matches the pattern\n";
    } else {
        echo "$word does not match the pattern\n";
    }
}

In the above script, we test for words consisting of alphanumeric characters. 
The \w{6} stands for six alphanumeric characters. Only the word 
mitt## does not match, because it contains non-alphanumeric characters. 

php&gt; echo preg_match("#[^a-z]{3}#", "ABC");
1

The #[^a-z]{3}# pattern stands for three characters that are 
not in the class a-z. The "ABC" characters match the condition.

php&gt; print_r(preg_grep("#\d{2,4}#", [ "32", "234", "2345", "3d3", "2"]));
Array
(
    [0] =&gt; 32
    [1] =&gt; 234
    [2] =&gt; 2345
)

In the above example, we have a pattern that matches 2, 3, and 4 digits. 

## PHP regex extracting matches

The preg_match takes an optional third parameter. 
If it is provided, it is filled with the results of the search. 
The variable is an array whose first element contains the text that 
matched the full pattern, the second element contains 
the first captured parenthesized subpattern, and so on.

extract_matches.php
  

&lt;?php

declare(strict_types=1);

$times = [ "10:10:22", "23:23:11", "09:06:56" ];

$pattern = "/(\d\d):(\d\d):(\d\d)/";

foreach ($times as $time) {

    $r = preg_match($pattern, $time, $match);
    
    if ($r) {
        
        echo "The $match[0] is split into:\n";
        
        echo "Hour: $match[1]\n";
        echo "Minute: $match[2]\n";
        echo "Second: $match[3]\n";
    } 
}

In the example, we extract parts of a time string.

$times = [ "10:10:22", "23:23:11", "09:06:56" ];

We have three time strings in English locale.

$pattern = "/(\d\d):(\d\d):(\d\d)/";

The pattern is divided into three subpatterns using square 
brackets. We want to refer specifically to exactly to 
each of these parts.

$r = preg_match($pattern, $time, $match);

We pass a third parameter to the preg_match 
function. In case of a match, it contains text parts of
the matched string.

if ($r) {
    
    echo "The $match[0] is split into:\n";
    
    echo "Hour: $match[1]\n";
    echo "Minute: $match[2]\n";
    echo "Second: $match[3]\n";
} 

The $match[0] contains the text that matched the full 
pattern, $match[1] contains text that matched the first
subpattern, $match[2] the second, and $match[3]
the third.

$ php extract_matches.php 
The 10:10:22 is split into:
Hour: 10
Minute: 10
Second: 22
The 23:23:11 is split into:
Hour: 23
Minute: 23
Second: 11
The 09:06:56 is split into:
Hour: 09
Minute: 06
Second: 56

## PHP regex email example

Next have a practical example. We create a regex pattern for checking email
addresses.

emails.php
  

&lt;?php

declare(strict_types=1);

$emails = [ "luke@gmail.com", "andy@yahoocom", "34234sdfa#2345", 
    "f344@gmail.com"];

# regular expression for emails
$pattern = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,18}$/";

foreach ($emails as $email) {

    if (preg_match($pattern, $email)) {
        echo "$email matches \n";
    } else {
        echo "$email does not match\n";
    }
}

Note that this example provides only one solution. It does not have to be the
best one. 

$pattern = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,18}$/";

This regular expression is designed to validate email addresses. The
^ at the beginning and $ at the end ensure an exact
match, meaning no extra characters can appear before or after the email
structure. The email itself is divided into five key components:

**1. Local Part:** This is typically a username, company name, or
nickname. The pattern [a-zA-Z0-9._-]+ allows letters, numbers, dots
(.), underscores (_), and hyphens (-), appearing one or more times.

**2. The @ Symbol:** This character is a fixed separator between
the local part and domain, ensuring correct email formatting.

**3. Domain Name:** Represents the email provider (e.g., gmail.com,
yahoo.com). The pattern [a-zA-Z0-9-]+ accepts letters, numbers, and
hyphens, ensuring valid domain structures.

**4. The Dot (.) Character:** Since the dot (.) is a metacharacter
in regex, it must be preceded by an escape character (\.) to match it literally.

**5. Top-Level Domain (TLD):** The pattern
[a-zA-Z.]{2,18} ensures that the TLD consists of 2 to 18
characters, accommodating common extensions like .net, .com, .info, and
even multi-part TLDs like .co.uk. While domains can be up to 63
characters, most are significantly shorter.

This regex helps ensure emails follow a structured format, making it useful for
input validation, form submissions, and data processing.

$ php emails.php 
luke@gmail.com matches 
andy@yahoocom does not match
34234sdfa#2345 does not match
f344@gmail.com matches 

## PHP regex phone number validation

Let's see how to validate phone numbers in common formats, such as (123)
456-7890 or 123-456-7890.

phone_numbers.php
  

&lt;?php

declare(strict_types=1);

$numbers = [
    "(123) 456-7890",
    "123-456-7890",
    "123.456.7890",
    "1234567890",
    "(123)456-7890",
    "123-45-6789"
];

# pattern for US phone numbers: (123) 456-7890 or 123-456-7890
$pattern = "/^(\(\d{3}\)\s?|\d{3}[.-]?)\d{3}[.-]?\d{4}$/";

foreach ($numbers as $number) {
    if (preg_match($pattern, $number)) {
        echo "$number is a valid phone number\n";
    } else {
        echo "$number is not valid\n";
    }
}

This pattern matches several common US phone number formats, including those
with parentheses, spaces, dashes, or dots. You can adjust the pattern for other
formats as needed.

## PHP Regex Lookahead and Lookbehind

Lookahead and lookbehind assertions allow you to match a pattern only if it is
(or is not) followed or preceded by another pattern. These are called
*zero-width assertions* because they do not consume characters in the string.

lookaround.php
  

&lt;?php

declare(strict_types=1);

$text = "Price: $20, Discounted: $15, Final: $10, Email: user@example.com";

// Positive lookahead: match dollar amounts only if followed by a comma or space
$pattern1 = "/\\$\\d+(?=[, ])/";
preg_match_all($pattern1, $text, $matches1);
echo "Prices found: ";
print_r($matches1[0]);

// Positive lookbehind: match domain names only if preceded by an email address
$pattern2 = "/(?&lt;=@)[a-zA-Z0-9.-]+/";
preg_match_all($pattern2, $text, $matches2);
echo "Email domains found: ";
print_r($matches2[0]);

In this example, the first pattern matches dollar values only when they are
followed by a comma or space (using (?=[, ])). The second
pattern extracts email domain names only when preceded by an '@' symbol
(using (?&lt;=@)).

Lookahead and lookbehind are powerful for advanced text processing, such as
validating user inputs, formatting currency, or extracting structured data.

## Recap

Finally, we provide a quick recap of the regex patterns. 

Jane         the 'Jane' string
^Jane        'Jane' at the start of a string
Jane$        'Jane' at the end of a string
^Jane$       exact match of the string 'Jane'
[abc]        a, b, or c
[a-z]        any lowercase letter
[^A-Z]       any character that is not an uppercase letter
(Jane|Beky)  matches either 'Jane' or 'Beky'
[a-z]+       one or more lowercase letters
^[98]?$      digit 9, 8 or empty string
([wx])([yz]) wy, wz, xy, or xz
[0-9]        any digit
[^A-Za-z0-9] any symbol (not a number or a letter)
foo(?=\d)    'foo' only if followed by a digit (lookahead)
(?&lt;=bar)\d   digit only if preceded by 'bar' (lookbehind)

## Source

[The preg_match function - PHP manual](https://www.php.net/manual/en/function.preg-match.php)

In this chapter we have covered regular expressions in PHP. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.