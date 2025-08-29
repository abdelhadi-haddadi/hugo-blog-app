+++
title = "C# grapheme"
date = 2025-08-27T23:23:06.589+01:00
draft = false
description = "C# grapheme tutorial shows how to work with
graphemes in C#. A grapheme is the smallest unit of a writing system of any
given language. An individual grapheme may or may not carry meaning by itself,
and may or may not correspond to a single phoneme of the spoken language. "
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# grapheme

last modified May 24, 2025

 

In this article we will work with graphemes in C#. A **grapheme** is the
smallest unit of a writing system of any given language. 

## Grapheme

A **grapheme** is the smallest functional unit of a writing system
in any given language. It may or may not convey meaning on its own and does not
necessarily correspond to a single phoneme in spoken language. Graphemes can
consist of a single character or multiple combined elements, such as accents and
diacritics, forming a visually distinct symbol.

Historically, the term **character** referred to individual symbols
in the original ASCII table, which supported only a limited set of characters.
However, with the expansion of digital text representation, the Unicode
standard was developed to accommodate the vast diversity of written
languages, allowing support for complex scripts, emojis, and multi-character
graphemes.

## Unicode

Unicode is a globally recognized computing industry standard that ensures
consistent encoding, representation, and handling of text across various writing
systems. It was developed to accommodate the vast diversity of characters used
in human languages, as well as symbols, emojis, and special text elements.

In C#, a string is a sequence of Unicode characters, functioning as a data type
that stores text data as a series of values, typically represented as bytes.
Each element in a string corresponds to a character based on a specific encoding
system. C# internally uses **UTF-16** encoding, allowing direct
representation of most common characters while supporting surrogate pairs for
extended Unicode ranges.

Beyond the ASCII table, it is more accurate to use the term
**grapheme** rather than "character." The .NET platform defines a
**text element** as a unit of text displayed as a grapheme. The
TextElementEnumerator allows enumeration over text elements within
a string, which may include base characters, surrogate pairs, or combining
sequences that together form a single displayed symbol.

A code point refers to the numerical value assigned to a character
within the Unicode standard. For example, the Latin letter Q
corresponds to the U+0051 code point, while the Cyrillic small
letter ж is represented by U+0436. Unicode assigns
each character a unique code point, ensuring global compatibility in text
processing.

A grapheme cluster is a sequence of one or more code points that
combine to form a single graphical unit. For instance, the Hindi syllable
ते consists of two code points: U+0924 for
त and U+0947 for े. Grapheme clusters are
essential for correctly rendering complex scripts.

The actual stored representation of a string consists of *bytes*, which
encode each code point. Depending on the Unicode standard used—such as
**UTF-8**, **UTF-16**, or **UTF-32**—each
code point may require a different number of bytes to be fully represented in
memory or storage.

## Unicode table

Below is a small portion of the Unicode table, showing code points, characters,
and their names:

Code pointCharacterName

U+0041ALATIN CAPITAL LETTER A
U+0061aLATIN SMALL LETTER A
U+03B1αGREEK SMALL LETTER ALPHA
U+0416ЖCYRILLIC CAPITAL LETTER ZHE
U+05D0אHEBREW LETTER ALEF
U+0924तDEVANAGARI LETTER TA
U+1F600😀GRINNING FACE

## Surrogate Pairs

C# utilizes the **UTF-16 encoding scheme** to store Unicode text,
where each character is represented by a 16-bit (two-byte) code unit. This
encoding fully supports characters within the Basic Multilingual Plane
(BMP), which spans from U+0000 to U+FFFF. The
BMP contains the most widely used characters, including Latin, Greek, Cyrillic,
Arabic, Hebrew, Chinese, Japanese, and Korean, along with mathematical symbols
and punctuation.

However, some Unicode characters extend beyond the BMP, occupying code points
from U+10000 to U+10FFFF. To accommodate these
characters, surrogate pairs are used in UTF-16 encoding.

A surrogate pair consists of two 16-bit code units that together
encode a single Unicode character outside the BMP. The first code unit is known
as a high surrogate, while the second is a low surrogate. These pairs
allow UTF-16 to fully support extended Unicode characters, including emojis,
rare historical scripts, and specialized symbols used in various fields.

Additionally, Unicode defines a combining character sequence, which consists
of a base character and one or more combining characters that modify it. A
surrogate pair may represent either a base character or be part of a larger
grapheme cluster when combined with other code points.

Code pointCharacterHigh surrogateLow surrogateName

U+1F600😀D83DDE00GRINNING FACE
U+1F680🚀D83DDE80ROCKET
U+1F4A9💩D83DDCA9PILE OF POO
U+1F60D😍D83DDE0DSMILING FACE WITH HEART-EYES
U+1F47B👻D83DDC7BGHOST

In the table above, the code points U+1F600, U+1F680, U+1F4A9, U+1F60D, and
U+1F47B are represented as surrogate pairs. The high surrogate is the first
code unit (D83D), and the low surrogate is the second code unit (DE00, DE80,
DCA9, DE0D, DC7B). These pairs allow the representation of characters outside
the Basic Multilingual Plane (BMP), which includes many emojis and other
special characters.

## C# grapheme example

In the following example, we work with graphemes.

Program.cs
  

using System.Text;
using System.Globalization;

Console.OutputEncoding = System.Text.Encoding.UTF8;

Console.WriteLine("The Hindi word Namaste");

string word = "नमस्ते";
Console.WriteLine(word);
Console.WriteLine();

// code points

Console.WriteLine("Code points:");

for (int i = 0; i &lt; word.Length; i += Char.IsSurrogatePair(word, i) ? 2 : 1)
{
    int x = Char.ConvertToUtf32(word, i);

    Console.WriteLine("U+{0:X4} {1}", x, Char.ConvertFromUtf32(x));
}

Console.WriteLine();

// bytes

Console.WriteLine("Bytes: ");
byte[] bytes = Encoding.UTF8.GetBytes(word);

foreach (byte c in bytes)
{
    Console.Write($"{c} ");
}

Console.WriteLine("\n");

// graphemes

Console.WriteLine("Graphemes: ");

int count = 0;

TextElementEnumerator graphemeEnum = StringInfo.GetTextElementEnumerator(word);
while (graphemeEnum.MoveNext())
{
    string grapheme = graphemeEnum.GetTextElement();

    Console.WriteLine(grapheme);

    count++;
}

Console.WriteLine($"the word has {count} graphemes");

The example defines a variable which contains a Hindi word namaste. We print the
word, print its code points, bytes, and print and count the number of graphemes.

Console.OutputEncoding = System.Text.Encoding.UTF8;

To output Unicode characters to terminal, we st the console output encoding to
UTF8.

string word = "नमस्ते";
Console.WriteLine(word);

We have the Hindi namaste word; we print it to the console.

// code points

Console.WriteLine("Code points:");

for (int i = 0; i &lt; word.Length; i += Char.IsSurrogatePair(word, i) ? 2 : 1)
{
    int x = Char.ConvertToUtf32(word, i);

    Console.WriteLine("U+{0:X4} {1}", x, Char.ConvertFromUtf32(x));
}

We print the code points of the word. The Lenth property determins
the number of UTF-16 chars in the string. The Char.IsSurrogatePair
method is used to determine whether two adjacent Char objects at a
specified position in a string form a surrogate pair. If so, we need more bytes
to represent a grapheme. 

With the Char.ConvertToUft32 method we print the Unicode code
point; the method converts the value of a UTF-16 encoded character or surrogate
pair at a specified position in a string into a Unicode code point. Finally, the
Char.ConvertFromUtf32 method converts the given Unicode code point
into a UTF-16 encoded string; we get the grapheme.

Console.WriteLine("Bytes: ");
byte[] bytes = Encoding.UTF8.GetBytes(word);

foreach (byte c in bytes)
{
    Console.Write($"{c} ");
}

Console.WriteLine("\n");

We print the actual bytes of the word that are stored on a disk. We use the
Encoding.UTF8.GetBytes method to get the array of underlying bytes.

Console.WriteLine("Graphemes: ");

int count = 0;

TextElementEnumerator graphemeEnum = StringInfo.GetTextElementEnumerator(word);
while (graphemeEnum.MoveNext())
{
    string grapheme = graphemeEnum.GetTextElement();

    Console.WriteLine(grapheme);

    count++;
}

Console.WriteLine($"the word has {count} graphemes");

We print the graphemes of the work and count them. The
TextElementEnumerator is used to enumerate graphemes of the word.
The GetTextElement is used to get the current text element
(grapheme).

$ dotnet run
The Hindi word Namaste
नमस्ते

Code points:
U+0928 न
U+092E म
U+0938 स
U+094D  ्
U+0924 त
U+0947  े

Bytes:
224 164 168 224 164 174 224 164 184 224 165 141 224 164 164 224 165 135

Graphemes:
न
म
स्
ते
the word has 4 graphemes

## Source

[Character encoding in .NET](https://learn.microsoft.com/en-us/dotnet/standard/base-types/character-encoding-introduction)

Helpful sites for working with Unicode: [www.fileformat.info](http://www.fileformat.info)
and [www.utf8-chartable.de](https://www.utf8-chartable.de).

In this article we have worked with graphemes, code points, bytes, and
surrogate pairs of a Unicode string.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).