+++
title = "Kotlin regular expressions"
date = 2025-08-29T20:02:51.811+01:00
draft = false
description = "Kotlin regular expressions tutorial shows how to use regular expressions in Kotlin. The examples work with quantifiers, character classes, alternations, and groups."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin regular expressions

last modified January 29, 2024

This article shows how to use regular expressions in Kotlin. 

Regular expressions are used for text searching and more advanced text 
manipulation. Regular expressions are built into tools such as grep, sed, 
text editors such as vi, Emacs, programming languages including Kotlin, 
JavaScript, Perl, and Python. 

## Kotlin regular expression

In Kotlin, we build regular expressions with the Regex.

Regex("book")
"book".toRegex()
Regex.fromLiteral("book")

A *pattern* is a regular expression that defines the text we are 
searching for or manipulating. It consists of text literals and 
metacharacters. Metacharacters are special characters that control
how the regular expression is going to be evaluated. For instance,
with \s we search for white spaces.

Special characters must be double escaped or we can use Kotlin raw
strings.

After we have created a pattern, we can use one of the functions
to apply the pattern on a text string. The funcions include 
matches, containsMatchIn, find, 
findall, replace, and split.

The following table shows some commonly used regular expressions:

    
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
    

## Kotlin matches and containsMatchIn methods

The matches method returns true if the regular expression
matches the entire input string. The containsMatchIn method
indicates whether the regular expression can find at least one match in 
the specified input.

simple_regex.kt
  

package com.zetcode

fun main() {

    val words = listOf("book", "bookworm", "Bible",
            "bookish","cookbook", "bookstore", "pocketbook")

    val pattern = "book".toRegex()

    println("*********************")
    println("containsMatchIn function")

    words.forEach { word -&gt;
        if (pattern.containsMatchIn(word)) {
            println("$word matches")
        }
    }

    println("*********************")
    println("matches function")

    words.forEach { word -&gt;
        if (pattern.matches(word)) {
            println("$word matches")
        }
    }
}

In the example, we use the matches and 
containsMatchIn methods. We have a list of words. 
The pattern will look for a 'book' string in each of the words using
both methods.

val pattern = "book".toRegex()

A regular expression pattern is created with toRegex
method. The regular expression consists of four normal characters. 

words.forEach { word -&gt;
    if (pattern.containsMatchIn(word)) {
        println("$word matches")
    }
}

We iterate over the list and apply containsMatchIn on
each of the words.

words.forEach { word -&gt;
    if (pattern.matches(word)) {
        println("$word matches")
    }
}

We iterate over the list again and apply matches on
each of the words.

*********************
containsMatchIn function
book matches
bookworm matches
bookish matches
cookbook matches
bookstore matches
pocketbook matches
*********************
matches function
book matches

For the containsMatchIn method, the pattern matches
if the 'book' word is somewhere in the word; for the matches,
the input string must entirely match the pattern.

## Kotlin find method

The find method returns the first match of a regular 
expression in the input, beginning at the specified start index.
The start index is 0 by default.

regex_find.kt
  

package com.zetcode

fun main() {

    val text = "I saw a fox in the wood. The fox had red fur."

    val pattern = "fox".toRegex()

    val match = pattern.find(text)

    val m = match?.value
    val idx = match?.range

    println("$m found at indexes: $idx")

    val match2 = pattern.find(text, 11)

    val m2 = match2?.value
    val idx2 = match2?.range

    println("$m2 found at indexes: $idx2")
}

In the example, we find out the indexes of the match of the 'fox' term.

val match = pattern.find(text)

val m = match?.value
val idx = match?.range

We find the first match of the 'fox' term. We get its value and indexes.

val match2 = pattern.find(text, 11)

val m2 = match2?.value
val idx2 = match2?.range

In the second case, we start the search from the index 11, finding thus
the next term.

fox found at indexes: 8..10
fox found at indexes: 29..31

## Kotlin findAll method

The findAll method returns a sequence of all occurrences 
of a regular expression within the input string.

regex_findall.kt
  

package com.zetcode

fun main() {

    val text = "I saw a fox in the wood. The fox had red fur."
    val pattern = "fox".toRegex()

    val matches = pattern.findAll(text)

    matches.forEach { f -&gt;
        
        val m = f.value
        val idx = f.range
        println("$m found at indexes: $idx")
    }
}

In the example, we find all occurrences of the 'fox' term with findAll.

## Kotlin regex word boundaries

The metacharacter \b is an anchor which matches at a position that
is called a word boundary. It allows to search for whole words. 

word_boundaries.kt
  

package com.zetcode

fun main() {

    val text = "This island is beautiful"
    val pattern = "\\bis\\b".toRegex()

    val matches = pattern.findAll(text)

    matches.forEach { m -&gt;
        val v = m.value
        val idx = m.range
        println("$v found at indexes: $idx")
    }
}

In the example, we look for the *is* word. We do not want to include 
the *This* and the *island* words.

val pattern = "\\bis\\b".toRegex()

With two \b metacharacters, we search for the *is* whole word.

val matches = pattern.findAll(text)

With the findAll function, we find all matches.

is found at indexes: 12..13

## Kotlin regex implicit word boundaries

The \w is a character class used for a character allowed in a word.
For the \w+ regular expression, which denotes a word, the leading 
and trailing word boundary metacharacters are implicit; i.e. \w+ is
equal to \b\w+\b. 

implicit_word_boundaries.kt
  

package com.zetcode

fun main() {
    val content = """
Foxes are omnivorous mammals belonging to several genera
of the family Canidae. Foxes have a flattened skull, upright triangular ears,
a pointed, slightly upturned snout, and a long bushy tail. Foxes live on every
continent except Antarctica. By far the most common and widespread species of
fox is the red fox."""

    val pattern = "\\w+".toRegex()

    val words = pattern.findAll(content)
    val count = words.count()

    println("There are $count words")

    words.forEach { matchResult -&gt;
        println(matchResult.value)
    }
}

In the example, we search for all words in the text. 

val pattern = "\\w+".toRegex()

We look for words.

val words = pattern.findAll(content)
val count = words.count()

We find all the words and count them.

## Kotlin currency symbols

The \p{Sc} regular expresion can be used to look for currency
symbols. 

currency_symbols.kt
  

package com.zetcode

fun main() {

    val content = """
Currency symbols: ฿ Thailand bath, ₹ Indian rupee, ₾ Georgian lari, $ Dollar,
€ Euro, ¥ Yen, £ Pound Sterling"""

    val pattern = "\\p{Sc}".toRegex(RegexOption.IGNORE_CASE)

    val matches = pattern.findAll(content)

    matches.forEach { matchResult -&gt;

        val currency = matchResult.value
        val idx = matchResult.range

        println("$currency at $idx")
    }
}

In the example, we look for currency symbols.

    val content = """
Currency symbols: ฿ Thailand bath, ₹ Indian rupee, ₾ Georgian lari, $ Dollar,
€ Euro, ¥ Yen, £ Pound Sterling"""

We have a couple of currency symbols in the text.

val pattern = "\\p{Sc}".toRegex(RegexOption.IGNORE_CASE)

We define the regular expression for the currency symbols.

val matches = pattern.findAll(content)

We find all the matches.

matches.forEach { matchResult -&gt;

    val currency = matchResult.value
    val idx = matchResult.range

    println("$currency at $idx")
}

We print all the matched values and their indexes.

฿ at 19..19
₹ at 36..36
₾ at 52..52
$ at 69..69
€ at 79..79
¥ at 87..87
£ at 94..94

## Kotlin split function

The split method splits the input string around matches
of the regular expression.

regex_split.js
  

package com.zetcode

fun main() {

    val text = "I saw a fox in the wood. The fox had red fur."

    val pattern = "\\W+".toRegex()
    val words = pattern.split(text).filter { it.isNotBlank() }

    println(words)
}

In the exmaple, we find out the number of occurrences of the 'fox' term.

val pattern = "\\W+".toRegex()

The pattern contains the \W named character class, which
stands for non-word character. In conjunction with the +
quantifier, the pattern looks for non-word character(s) such as space, 
comma, or dot, which are often used to separate words in text. Note
that the character class is double escaped.

val words = pattern.split(text).filter { it.isNotBlank() }

With the split method, we split the input string into
a list of words. In addition, we remove the blank trailing word, which
was created because our text ended in a non-word character.

[I, saw, a, fox, in, the, wood, The, fox, had, red, fur]

## Case insensitive match

To enable case insensitive search, we pass the RegexOption.IGNORE_CASE
to the toRegex method.

regex_case_insensitive.kt
  

package com.zetcode

fun main() {

    val words = listOf("dog", "Dog", "DOG", "Doggy")

    val pattern = "dog".toRegex(RegexOption.IGNORE_CASE)

    words.forEach { word -&gt;

        if (pattern.matches(word)) {

            println("$word matches")
        }
    }
}

In the example, we apply the pattern on words regardless of the case. 

val pattern = "dog".toRegex(RegexOption.IGNORE_CASE)

We use the RegexOption.IGNORE_CASE to ignore the case
of the input string.

dog matches
Dog matches
DOG matches

## The dot metacharacter

The dot (.) metacharacter stands for any single character in the text. 

regex_dot_meta.kt
  

package com.zetcode

fun main() {

    val words = listOf("seven", "even", "prevent", "revenge", "maven",
            "eleven", "amen", "event")

    val pattern = "..even".toRegex()

    words.forEach { word -&gt;

        if (pattern.containsMatchIn(word)) {

            println("$word matches")
        }
    }
}

In the example, we have eight words in a list. We apply a pattern 
containing two dot metacharacters on each of the words. 

prevent matches
eleven matches

There are two words that match the pattern.

## Question mark meta character

The question mark (?) meta character is a quantifier that matches the 
previous element zero or one time.

regex_qmark_meta.kt
  

package com.zetcode

fun main() {

    val words = listOf("seven", "even", "prevent", "revenge", "maven",
            "eleven", "amen", "event")

    val pattern = ".?even".toRegex()

    words.forEach { word -&gt;

        if (pattern.matches(word)) {

            println("$word matches")
        }
    }
}

In the example, we add a question mark after the dot character.
This means that in the pattern we can have one arbitrary character
or we can have no character there. 

seven matches
even matches

## The {n,m} quantifier

The {n,m} quantifier matches at least n and at most m occurrences of 
the preceding expression.

regex_mn_quantifier.kt
  

package com.zetcode

fun main() {

    val words = listOf("pen", "book", "cool", "pencil", "forest", "car",
            "list", "rest", "ask", "point", "eyes")

    val pattern = "\\w{3,4}".toRegex()

    words.forEach { word -&gt;

        if (pattern.matches(word)) {

            println("$word matches")
        } else {
            println("$word does not match")
        }
    }
}

In the example, we search for words that have either three or four
characters.

val pattern = "\\w{3,4}".toRegex()

In the pattern, we have a word character repeated three or four times.
Note that there must not be a space between the numbers.

pen matches
book matches
cool matches
pencil does not match
forest does not match
car matches
list matches
rest matches
ask matches
point does not match
eyes matches

## Kotlin regex anchors

Anchors match positions of characters inside a given text. 
When using the ^ anchor the match must occur at the beginning of the 
string and when using the $ anchor the match must occur at the end
of the string.

regex_anchors.kt
  

package com.zetcode

fun main() {

    val sentences = listOf("I am looking for Jane.",
        "Jane was walking along the river.",
        "Kate and Jane are close friends.")

    val pattern = "^Jane".toRegex()

    sentences.forEach { sentence -&gt;

        if (pattern.containsMatchIn(sentence)) {

            println(sentence)
        }
    }
}

In the example, we have three sentences. The search pattern is 
^Jane. The pattern checks if the "Jane" string is located 
at the beginning of the text. The Jane\. would look for 
"Jane" at the end of the sentence. 

## Kotlin regex alternations

The alternation operator | creates a regular expression with several choices. 

regex_alternations.kt
  

package com.zetcode

fun main() {

    val words = listOf("Jane", "Thomas", "Robert",
        "Lucy", "Beky", "John", "Peter", "Andy")

    val pattern = "Jane|Beky|Robert".toRegex()

    words.forEach { word -&gt;

        if (pattern.matches(word)) {

            println(word)
        }
    }
}

We have eight names in the list.

val pattern = "Jane|Beky|Robert".toRegex()

This regular expression looks for "Jane", "Beky", or "Robert" strings. 

## Kotlin regex subpatterns

Subpatterns are patterns within patterns. Subpatterns are created 
with () characters. 

regex_subpatterns.kt
  

package com.zetcode

fun main() {

    val words = listOf("book", "bookshelf", "bookworm",
            "bookcase", "bookish", "bookkeeper", "booklet", "bookmark")

    val pattern = "book(worm|mark|keeper)?".toRegex()

    words.forEach { word -&gt;

        if (pattern.matches(word)) {

            println("$word matches")
        } else {

            println("$word does not match")
        }
    }
}

The example creates a subpattern. 

val pattern = "book(worm|mark|keeper)?".toRegex()

The regular expression uses a subpattern. It matches bookworm, 
bookmark, bookkeeper, and book words.

book matches
bookshelf does not match
bookworm matches
bookcase does not match
bookish does not match
bookkeeper matches
booklet does not match
bookmark matches

## Kotlin regex character classes

A character class defines a set of characters, any one of which can occur in an
input string for a match to succeed.

character_classes.kt
  

package com.zetcode

fun main() {

    val words = listOf("a gray bird", "grey hair", "great look")

    val pattern = "gr[ea]y".toRegex()

    words.forEach { word -&gt;

        if (pattern.containsMatchIn(word)) {

            println(word)
        }
    }
}

In the example, we use a character class to include both gray and grey
words.

val pattern = "gr[ea]y".toRegex()

The [ea] class allows to use either 'e' or 'a' character
in the pattern.

## Kotlin named character classes

There are some predefined character classes. The \s
matches a whitespace character [\t\n\t\f\v], the
\d a digit [0-9], and the \w
a word character [a-zA-Z0-9_].

named_character_classes.kt
  

package com.zetcode

fun main() {

    val text = "We met in 2013. She must be now about 27 years old."

    val pattern = "\\d+".toRegex()
    val found = pattern.findAll(text)

    found.forEach { f -&gt;
        
        val m = f.value
        println(m)
    }
}

In the example, we search for numbers in the text.

val pattern = "\\d+".toRegex()

The \d+ pattern looks for any number of digit sets in
the text. 

val found = pattern.findAll(text) 

To find all the matches with findAll.

2013
27

## Kotlin regex capturing groups

Round brackets  are used to create capturing groups. This allows
us to apply a quantifier to the entire group or to restrict alternation to a
part of the regular expression. 

capturing_groups.kt
  

package com.zetcode

fun main() {

    val sites = listOf(
        "webcode.me", "zetcode.com", "freebsd.org",
        "netbsd.org"
    )

    val pattern = "(\\w+)\\.(\\w+)".toRegex()

    for (site in sites) {

        val matches = pattern.findAll(site)

        matches.forEach { matchResult -&gt;

            println(matchResult.value)
            println(matchResult.groupValues[1])
            println(matchResult.groupValues[2])
            println("*****************")
        }
    }
}

In the example, we divide the domain names into two parts by using groups. 

val pattern = "(\\w+)\\.(\\w+)".toRegex()

We define two groups with parentheses.

matches.forEach { matchResult -&gt;

    println(matchResult.value)
    println(matchResult.groupValues[1])
    println(matchResult.groupValues[2])
    println("*****************")
}

The groups are accessed via the groupValues function. 
The groupValues[0]) returns the whole matched string; it is
equivalent to the value property.

webcode.me
webcode
me
*****************
zetcode.com
zetcode
com
*****************
freebsd.org
freebsd
org
*****************
netbsd.org
netbsd
org
*****************

In the following example, we use groups to work with expressions. 

regex_expressions.kt
  

package com.zetcode

fun main() {

    val expressions = listOf("16 + 11", "12 * 5", "27 / 3", "2 - 8")
    val pattern = "(\\d+)\\s+([-+*/])\\s+(\\d+)".toRegex()

    for (expression in expressions) {

        val matches = pattern.findAll(expression)

        matches.forEach { matchResult -&gt;

            val value1 = matchResult.groupValues[1].toInt()
            val value2 = matchResult.groupValues[3].toInt()

            val msg = when (matchResult.groupValues[2]) {

                "+" -&gt; "$expression = ${value1 + value2}"
                "-" -&gt; "$expression = ${value1 - value2}"
                "*" -&gt; "$expression = ${value1 * value2}"
                "/" -&gt; "$expression = ${value1 / value2}"
                else -&gt; "Unknown operator"
            }

            println(msg)
        }
    }
}

The example parses four simple mathematical expressions and computes them. 

val expressions = listOf("16 + 11", "12 * 5", "27 / 3", "2 - 8")

We have a list of four expressions.

val pattern = "(\\d+)\\s+([-+*/])\\s+(\\d+)".toRegex()

In the regex pattern, we have three groups: two groups for the values, one for
the operator. 

val value1 = matchResult.groupValues[1].toInt()
val value2 = matchResult.groupValues[3].toInt()

We get the values and transform them into integers. 

val msg = when (matchResult.groupValues[2]) {

    "+" -&gt; "$expression = ${value1 + value2}"
    "-" -&gt; "$expression = ${value1 - value2}"
    "*" -&gt; "$expression = ${value1 * value2}"
    "/" -&gt; "$expression = ${value1 / value2}"
    else -&gt; "Unknown operator"
}

With the when expression, we compute the expressions and build the messages.

16 + 11 = 27
12 * 5 = 60
27 / 3 = 9
2 - 8 = -6

## Kotlin regex word frequency

In the next example, we count the frequency of words in a file. 

$ wget https://raw.githubusercontent.com/janbodnar/data/main/the-king-james-bible.txt

We use the King James Bible.

word_freq.kt
  

import java.io.File

fun main() {

    val fileName = "src/main/resources/the-king-james-bible.txt";

    val text = File(fileName).readText()

    val r = "[a-zA-Z']+".toRegex()
    val matches = r.findAll(text)

    val data = matches.map { it.value }
        .groupBy { it }
        .map { Pair(it.key, it.value.size) }
        .sortedByDescending { it.second }
        .take(10)

    for ((word, freq) in data) {

        System.out.printf("%s %d \n", word, freq)
    }
}

We find all matching words with findAll. We group the words and 
sort them by the number of times they are present. We print the first top 
words.

the 62103 
and 38848 
of 34478 
to 13400 
And 12846 
that 12576 
in 12331 
shall 9760 
he 9665 
unto 8942 

## Kotlin regex email example

In the following example, we create a regex pattern for checking 
email addresses. 

regex_emails.kt
  

package com.zetcode

fun main() {

    val emails = listOf("luke@gmail.com", "andy@yahoocom",
            "34234sdfa#2345", "f344@gmail.com", "dandy!@yahoo.com")

    val pattern = "[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z.]{2,18}".toRegex()

    emails.forEach { email -&gt;

        if (pattern.matches(email)) {

            println("$email matches")
        } else {

            println("$email does not match")
        }
    }
}

This example provides one possible solution. 

val pattern = "[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z.]{2,18}".toRegex()

The email is divided into five parts. The first part is the local part. 
Usually it is a name of a company, an individual, or a nickname.
The [a-zA-Z0-9._-]+ lists all possible characters that we can 
use in the local part. They can be used one or more times. 

The second part consists of the literal @ character. The third 
part is the domain part. It is usually the domain name of the email provider 
such as yahoo, or gmail. The [a-zA-Z0-9-]+ 
is a character class providing all characters that can be used in the domain name. 
The + quantifier allows to use of one or more of these characters. 

The fourth part is the dot character; it is preceded by double escape 
character (\\) to get a literal dot. 

The final part is the top level domain name: [a-zA-Z.]{2,18}.
Top level domains can have from 2 to 18 characters, such as sk, net, info, 
travel, cleaning, travelinsurance. The maximum length can be 63 characters, 
but most domain are shorter than 18 characters today. There is also a 
dot character. This is because some top level domains have two parts; 
for instance co.uk.

luke@gmail.com matches
andy@yahoocom does not match
34234sdfa#2345 does not match
f344@gmail.com matches
dandy!@yahoo.com does not match

## Source

[Kotlin regular expressions documentation](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.text/-regex/)

In this chapter, we have covered regular expressions in Kotlin. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).