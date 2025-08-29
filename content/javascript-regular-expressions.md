+++
title = "JavaScript regular expressions"
date = 2025-08-29T20:01:37.064+01:00
draft = false
description = "Master the use of regular expressions in JavaScript with examples covering quantifiers, character classes, and more."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript regular expressions

last modified last modified October 18, 2023

 

In this article we show how to use regular expressions in JavaScript.

Regular expressions are used for text searching and more advanced text
manipulation. Regular expressions are built-in tools like grep, sed, text
editors like vi, Emacs, programming languages like JavaScript, Perl, and Python.

## Regular expression

In JavaScript, we build regular expressions either with slashes //
or RegExp object.

A *pattern* is a regular expression that defines the text we are
searching for or manipulating. It consists of text literals and metacharacters.
Metacharacters are special characters that control how the regular expression is
going to be evaluated. For instance, with \s we search for white
spaces.

After we have created a pattern, we can use one of the functions to apply the
pattern on a text string. The funcions include test,
match, matchAll, search, and
replace.

The following table shows some regular expressions:

    
        Regex
        Meaning
    

    
        .
        Matches any single character.
    
    
        ?
        Matches the preceding element once or not at all.
    
    
        +
        Matches the preceding element once or more times.
    
    
        *
        Matches the preceding element zero or more times.
    
    
        ^
        Matches the starting position within the string.
    
    
        $
        Matches the ending position within the string.
    
    
        |
        Alternation operator.
    
    
        [abc]
        Matches a or b, or c.
    
    
        [a-c]
        Range; matches a or b, or c.
    
    
        [^abc]
        Negation, matches everything except a, or b, or c. 
    
    
        \s
        Matches white space character.
    
    
        \w
        Matches a word character; equivalent to [a-zA-Z_0-9]
    

## The test function

The test method executes a search for a match between a regular
expression and a specified string. It returns true or false.

test_fun.js
  

let words = ['book', 'bookworm', 'Bible',
    'bookish','cookbook', 'bookstore', 'pocketbook'];

let pattern = /book/;

words.forEach(word =&gt; {

    if (pattern.test(word)) {

        console.log(`the ${word} matches`);
    }
});

In the example, we have an array of words. The pattern will
look for a 'book' string in each of the words.

let pattern = /book/;

We create a pattern using slashes. The regular expression consists of
four normal characters.

words.forEach(word =&gt; {

    if (pattern.test(word)) {

        console.log(`the ${word} matches`);
    }
});

We go through the array and call the test function. It returns true
if the pattern matches the word.

$ node test_fun.js
the book matches
the bookworm matches
the bookish matches
the cookbook matches
the bookstore matches
the pocketbook matches

## The search function

The search function returns the index of the first match between
the regular expression and the given string. It returns -1 if the match is not
found.

search_fun.js
  

let text = 'I saw a fox in the wood. The fox had red fur.';

let pattern = /fox/;

let idx = text.search(pattern);
console.log(`the term was found at index: ${idx}`);

In the example, we find out the index of the first match of the 'fox'
term.

$ node search_fun.js
the term was found at index: 8

## The exec function

The exec executes a search for a match in a specified string. It
returns an object with information about the match.

exec_fun.js
  

let words = ['book', 'bookworm', 'Bible',
    'bookish', 'cookbook', 'bookstore', 'pocketbook'];

let pattern = /book/;

words.forEach(word =&gt; {

    let res = pattern.exec(word);

    if (res) {
        console.log(`${res} matches ${res.input} at index: ${res.index}`);
    }
});

In the example, we apply the pattern on the input strings with exec.

if (res) {
    console.log(`${res} matches ${res.input} at index: ${res.index}`);
}

We print the information about the match. It includes the index where
the match begins.

$ node exec_fun.js
book matches book at index: 0
book matches bookworm at index: 0
book matches bookish at index: 0
book matches cookbook at index: 4
book matches bookstore at index: 0
book matches pocketbook at index: 6

## The match function

The match function retrieves the matches when matching a pattern
against an input string.

match_fun.js
  

let text = 'I saw a fox in the wood. The fox had red fur.';

let pattern = /fox/g;

let found = text.match(pattern);

console.log(`There are ${found.length} matches`);

In the example, we find out the number of occurrences of the 'fox' term.

let pattern = /fox/g;

The g character is a flag that finds all occurrences of
a term. Normally, the search ends when the first occurrence is found.

$ node match_fun.js
There are 2 matches

We have found two 'fox' terms in the string.

## The matchAll function

The matchAll function returns an iterator of all results matching
a string against a regular expression.

matchall_fun.js
  

let text = 'I saw a fox in the wood. The fox had red fur.';

let rx = /fox/g;
let matches = text.matchAll(rx);

for (let m of matches) {

    console.log(`${m} at ${m.index}`);
}

In the example, we find out all matches in the string; we also print they 
indexes.

$ node matchall_fun.js 
fox at 8
fox at 29

## The replace function

The replace function returns a new string with some or all matches
of a pattern replaced by a replacement string.

replace_fun.js
  

let text = 'He has gray hair; gray clouds gathered above us.'

let pattern = /gray/g;

let new_text = text.replace(pattern, 'grey');

console.log(new_text);

In the example, we create a new string from an input string, where we
replace 'gray' words with 'grey'.

let pattern = /gray/g;

The g character is a flag that finds all occurrences of
a term.

$ node replacing.js
He has grey hair; grey clouds gathered above us.

## JS regex case insensitive match

To enable case insensitive search, we use the i flag.

case_insensitive.js
  

let words = ['dog', 'Dog', 'DOG', 'Doggy'];

let pattern = /dog/i;

words.forEach(word =&gt; {

    if (pattern.test(word)) {

        console.log(`the ${word} matches`);
    }
});

In the example, we apply the pattern on words regardless of the case.

let pattern = /dog/i;

Appending the i flag, we do case insensitive search.

$ node case_insensitive.js
the dog matches
the Dog matches
the DOG matches
the Doggy matches

All four words match the pattern when doing case insensitive search.

## JS regex word boundaries

The metacharacter \b is an anchor which matches at a position that
is called a word boundary. It allows to search for whole words.

word_boundary.js
  

let text = "This island is beautiful; it is also very large.";

let rx = /\bis\b/g;
var matches = text.matchAll(rx);

for (let m of matches) {

    console.log(`${m} at ${m.index}`);
}

In the example, we look for the *is* word. We do not want to include
the *This* and the *island* words.

var matches = text.matchAll(rx);

With matchAll, we find all the matches.

let rx = /\bis\b/g;

With two \b metacharacters, we search for the *is* whole
word.

$ node word_boundary.js 
is at 12
is at 29

## JS regex subpatterns

Subpatterns are patterns within patterns. Subpatterns are created with ()
characters.

subpatterns.js
  

var words = ["book", "bookshelf", "bookworm", "bookcase", "bookish",
    "bookkeeper", "booklet", "bookmark"];

var rx = /^book(worm|mark|keeper)?$/;

for (let word of words) {

    if (word.match(rx)) {
        console.log(`${word} does match`);
    }
    else {
        console.log(`${word} does not match`);
    }
}

The example creates a subpattern.

var rx = /^book(worm|mark|keeper)?$/;

The regular expression uses a subpattern. It matches bookworm, bookmark,
bookkeeper, and book words.

$ node subpatterns.js
book does match
bookshelf does not match
bookworm does match
bookcase does not match
bookish does not match
bookkeeper does match
booklet does not match
bookmark does match

## JS regex dot metacharacter

The dot (.) metacharacter stands for any single character in the text.

dot_meta.js
  

let words = ['seven', 'even', 'prevent', 'revenge', 'maven',
    'eleven', 'amen', 'event'];

let pattern = /..even/;

words.forEach(word =&gt; {

    if (pattern.test(word)) {

        console.log(`the ${word} matches`);
    }
});

In the example, we have eight words in an array. We apply a pattern
containing two dot metacharacters on each of the words.

$ node dot_meta.js
the prevent matches
the eleven matches

There are two words that match the pattern.

## Question mark meta character

The question mark (?) meta character is a quantifier that matches the
previous element zero or one time.

question_mark_meta.js
  

let words = ['seven', 'even', 'prevent', 'revenge', 'maven',
    'eleven', 'amen', 'event'];

let pattern = /.?even/;

words.forEach(word =&gt; {

    if (pattern.test(word)) {

        console.log(`the ${word} matches`);
    }
});

In the example, we add a question mark after the dot character. This means that
in the pattern we can have one arbitrary character or we can have no character
there.

$ node question_mark_meta.js
the seven matches
the even matches
the prevent matches
the revenge matches
the eleven matches
the event matches

This time the even and event words, which do not have a preceding character,
match as well.

## JS regex anchors

Anchors match positions of characters inside a given text. When using the ^
anchor the match must occur at the beginning of the string and when using the $
anchor the match must occur at the end of the string.

anchors.js
  

let sentences = ['I am looking for Jane.',
    'Jane was walking along the river.',
    'Kate and Jane are close friends.'];

let pattern = /^Jane/;

sentences.forEach(sentence =&gt; {

    if (pattern.test(sentence)) {

        console.log(`${sentence}`);
    }
});

In the example, we have three sentences. The search pattern is
^Jane. The pattern checks if the "Jane" string is located at the
beginning of the text. The Jane\. would look for "Jane" at the end
of the sentence.

## JS regex exact match

An exact match can be performed by placing the term between the anchors: ^ and
$.

exact_match.js
  

let words = ['seven', 'even', 'prevent', 'revenge', 'maven',
    'eleven', 'amen', 'event']

let pattern = /^even$/;

words.forEach(word =&gt; {

    if (pattern.test(word)) {

        console.log(`the ${word} matches`);
    }
});

In the example, we look for an exact match for the 'even' term.

$ node exact_match.js
the even matches

## JS regex character classes

A character class defines a set of characters, any one of which can occur in an
input string for a match to succeed.

character_class.js
  

let words = ['a gray bird', 'grey hair', 'great look'];

let pattern = /gr[ea]y/;

words.forEach(word =&gt; {

    if (pattern.test(word)) {

        console.log(`${word}`);
    }
});

In the example, we use a character class to include both gray and grey
words.

let pattern = /gr[ea]y/;

The [ea] class allows to use either 'e' or 'a' character
in the pattern.

## Named character classes

There are some predefined character classes. The \s
matches a whitespace character [\t\n\t\f\v], the
\d a digit [0-9], and the \w
a word character [a-zA-Z0-9_].

named_character_class.js
  

let text = 'We met in 2013. She must be now about 27 years old.';

let pattern = /\d+/g;

while ((found = pattern.exec(text)) !== null) {

    console.log(`found ${found} at index ${found.index}`);
}

In the example, we search for numbers in the text.

let pattern = /\d+/g;

The \d+ pattern looks for any number of digit sets in
the text. The g flag makes the search not stop at first
occurrence.

while ((found = pattern.exec(text)) !== null) {

    console.log(`found ${found} at index ${found.index}`);
}

To find all the matches, we use the exec function in
a while loop.

$ node named_character_class.js
found 2013 at index 10
found 27 at index 38

In the following example, we have an alternative solution using
the match function.

count_numbers.js
  

let text = 'I met her in 2012. She must be now about 27 years old.'

let pattern = /\d+/g;

var found = text.match(pattern);

console.log(`There are ${found.length} numbers`);

found.forEach((num, i) =&gt; {
    console.log(`match ${++i}: ${num}`);
});

To count numbers, we use the \d named class.

$ node count_numbers.js
There are 2 numbers
match 1: 2012
match 2: 27

## JS regex count words

In the next example, we count words in the text.

count_words.js
  

let text = 'The Sun was shining; I went for a walk.';

let pattern = /\w+/g;

let found = text.match(pattern);

console.log(`There are ${found.length} words`);

The \w name set stands for a word character.

let pattern = /\w+/g;

The pattern uses a quantifier (+) to search for one or more word characters. The
global flag makes the search look for all words in the string.

console.log(`There are ${found.length} words`);

We print the number of words to the console.

$ node count_words.js
There are 9 words

## JS regex alternations

The alternation operator | creates a regular expression with several choices.

alternations.js
  

let words = ["Jane", "Thomas", "Robert",
    "Lucy", "Beky", "John", "Peter", "Andy"];

let pattern = /Jane|Beky|Robert/;

words.forEach(word =&gt; {

    if (pattern.test(word)) {

        console.log(`the ${word} matches`);
    }
});

We have eight names in the list.

let pattern = /Jane|Beky|Robert/;

This regular expression looks for "Jane", "Beky", or "Robert" strings.

## JS regex capturing groups

Capturing groups is a way to treat multiple characters as a single unit. They
are created by placing charactes inside a set of round brackets. For instance,
(book) is a single group containing 'b', 'o', 'o', 'k', characters.

The capturing groups technique allows us to find out those parts of a string
that match the regular expression pattern.

capturing_groups.js
  

content = `&lt;p&gt;The &lt;code&gt;Pattern&lt;/code&gt; is a compiled
representation of a regular expression.&lt;/p&gt;`;

let pattern = /(&lt;\/?[a-z]*&gt;)/g;

let found = content.match(pattern);

found.forEach(tag =&gt; {

    console.log(tag);
});

The code example prints all HTML tags from the supplied string by
capturing a group of characters.

let found = content.match(pattern);

In order to find all tags, we use the match method.

$ ./capturing_groups.js
&lt;p&gt;
&lt;code&gt;
&lt;/code&gt;
&lt;/p&gt;

We have found four HTML tags.

## JavaScript regex email example

In the following example, we create a regex pattern for checking
email addresses.

emails.js
  

let emails = ["luke@gmail.com", "andy@yahoocom",
    "34234sdfa#2345", "f344@gmail.com"];

let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,18}$/;

emails.forEach(email =&gt; {
    if (pattern.test(email)) {

        console.log(`${email} matches`);
    } else {

        console.log(`${email} does not match`);
    }
})

This example provides one possible solution.

let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,18}$/;

The first ^ and the last $ characters provide an exact
pattern match. No characters before and after the pattern are allowed. The email
is divided into five parts. The first part is the local part. This is usually a
name of a company, individual, or a nickname. The [a-zA-Z0-9._-]+
lists all possible characters that we can use in the local part. They can be
used one or more times.

The second part consists of the literal @ character. The third part
is the domain part. It is usually the domain name of the email provider such as
yahoo, or gmail. The [a-zA-Z0-9-]+
is a character class providing all characters that can be used in the domain name.
The + quantifier allows to use of one or more of these characters.

The fourth part is the dot character; it is preceded by the escape character (\)
to get a literal dot.

The final part is the top level domain name: [a-zA-Z.]{2,18}. Top
level domains can have from 2 to 18 characters, such as sk, net, info, travel,
cleaning, travelinsurance. The maximum lenght can be 63 characters, but most
domain are shorter than 18 characters today. There is also a dot character. This
is because some top level domains have two parts; for instance co.uk.

$ node emails.js
luke@gmail.com matches
andy@yahoocom does not match
34234sdfa#2345 does not match
f344@gmail.com matches

## Source

[Regular expressions - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)

In this article we have covered regular expressions in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)