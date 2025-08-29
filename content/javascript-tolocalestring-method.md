+++
title = "JavaScript toLocaleString method"
date = 2025-08-29T20:02:14.905+01:00
draft = false
description = "JavaScript toLocaleString tutorial shows how to format numbers and dates in JavaScript. The tutorial provides numerous examples to demonstrate localization in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript toLocaleString method

last modified April 4, 2025

 

In this article we show how to format numbers and dates using the
toLocaleString method in JavaScript.

## Localization in JavaScript

The toLocaleString method converts a number or date into a string,
using locale-specific conventions. It provides a way to format data according
to the user's language and region settings.

This method is available on Number, Date, and Array objects in JavaScript.
The formatting rules vary based on the host's current locale or the locale
specified in the options parameter.

For numbers, it handles decimal separators, grouping of digits, and currency
formatting. For dates, it formats according to local conventions for date and
time representation. The method is essential for internationalized applications.

## Basic number formatting

The following example demonstrates basic number formatting with
toLocaleString.

main.js
  

const number = 123456.789;

console.log(number.toLocaleString()); // Default locale
console.log(number.toLocaleString('de-DE')); // German format
console.log(number.toLocaleString('ar-EG')); // Arabic format

We format the same number using different locales. The method automatically
adjusts decimal points, grouping separators, and digit representation based
on locale conventions.

$ node main.js
"123,456.789" (en-US)
"123.456,789" (de-DE)
"١٢٣٬٤٥٦٫٧٨٩" (ar-EG)

## Currency formatting

The toLocaleString method can format numbers as currency values.

main.js
  

const price = 1234.56;

console.log(price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
}));

console.log(price.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY'
}));

We format numbers as currency values for different locales. The style option
specifies currency formatting, while the currency option defines which
currency to use.

$ node main.js
"$1,234.56" (en-US)
"￥1,235" (ja-JP)

## Date formatting

The toLocaleString method can format Date objects according to
locale conventions.

main.js
  

const date = new Date();

console.log(date.toLocaleString()); // Default locale
console.log(date.toLocaleString('en-GB')); // British format
console.log(date.toLocaleString('ko-KR')); // Korean format

We format the current date and time using different locales. The method adjusts
the date order, separators, and time format based on regional conventions.

$ node main.js
"4/4/2025, 3:14:07 PM" (en-US)
"04/04/2025, 15:14:07" (en-GB)
"2025. 4. 4. 오후 3:14:07" (ko-KR)

## Custom date formatting

We can customize date formatting using options with toLocaleString.

main.js
  

const date = new Date();

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

console.log(date.toLocaleString('de-DE', options));
console.log(date.toLocaleString('fr-FR', options));

We specify formatting options to control how the date is displayed. The options
object lets us choose which components to include and their format style.

$ node main.js
"Freitag, 4. April 2025" (de-DE)
"vendredi 4 avril 2025" (fr-FR)

## Array localization

The toLocaleString method can also be called on arrays to format
all elements.

main.js
  

const mixedArray = [12345.67, new Date(), 'plain string'];

console.log(mixedArray.toLocaleString('en-US'));
console.log(mixedArray.toLocaleString('es-ES'));

When called on an array, toLocaleString calls the method on each
element. Numbers and dates are formatted according to locale, while strings
remain unchanged.

$ node main.js
"12,345.67,4/4/2025, 3:14:07 PM,plain string" (en-US)
"12.345,67,4/4/2025 15:14:07,plain string" (es-ES)

## Source

[Number toLocaleString - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

In this article we have demonstrated how to use the toLocaleString() method to
format numbers and dates in JavaScript according to locale conventions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)