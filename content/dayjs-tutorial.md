+++
title = "Day.js tutorial"
date = 2025-08-29T20:01:13.439+01:00
draft = false
description = "Learn how to handle date and time in JavaScript using the Day.js library, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Day.js tutorial

last modified last modified October 18, 2023

 

In this article we show how to work with date and time in JavaScript with Day.js
module.

## Day.js

Day.js is a minimalist JavaScript date library for parsing,
validating, manipulating, and formatting dates. It is an alternative library to
Moment.js and has largely compatible API. Moment.js is covered in
[Moment.js tutorial](/javascript/momentjs/).

In this article we work with Day.js in a Node application.

## Setting up Day.js

First, we install Day.js.

$ npm init -y

We initiate a new Node application.

$ npm i dayjs

We install Day.js with npm i dayjs command.

## Day.js today's date

In the first example, we get today's date with Day.js.

now.js
  

import dayjs from 'dayjs';

let now = dayjs();

console.log(now.format());

The example prints current datetime.

import dayjs from 'dayjs';

We load the Day.js library.

let now = dayjs();

We get the current local datetime object with dayjs.

console.log(now.format());

We format the output with format. By default, we get a
long datetime format.

$ node now.js
2022-06-16T16:41:57+02:00

The output is in the ISO standard format. The datetime parts are separated by T
character. The string is ended with a time zone.

## Creating Day.js objects

We can use several ways to create datetime Day.js objects. These objects are
formatted to human-readable output.

create_objects.js
  

import dayjs from 'dayjs';

let d1 = dayjs("2018-06-03");
console.log(d1.format());

let d2 = dayjs.unix(1530471537);
console.log(d2.format());

let d3 = dayjs(new Date(2011, 11, 22));
console.log(d3.format());

The example creates date and time objects in three different ways.

let d1 = dayjs("2018-06-03");

We create a dayjs object by parsing a string.

let d2 = dayjs.unix(1530471537);
console.log(d2.format());

We use a unix time stamp (in seconds) to define a datetime object.

let d3 = dayjs(new Date(2011, 11, 22));
console.log(d3.format());

Finally, we use a JavaScript built-in Date object to define a dayjs object.

$ node create_objects.js
2018-06-03T00:00:00+02:00
2018-07-01T20:58:57+02:00
2011-12-22T00:00:00+01:00

## Day.js formatting datetime

Day.js objects are formatted with the format function.

formatting.js
  

import dayjs from 'dayjs';

let now = dayjs();

console.log("ISO")
console.log(now.format());

console.log("\nTime")
console.log(now.format("HH:mm:ss"));
console.log(now.format("h:mm:ss a"));

console.log("\nDate")
console.log(now.format("dddd, MMMM D YYYY"));
console.log(now.format("YYYY-MM-DD"));

The example formats date and time using Day's format
function.

$ node formatting.js
ISO
2022-06-16T16:44:39+02:00

Time
16:44:39
4:44:39 pm

Date
Thursday, June 16 2022
2022-06-16

## Day.js calculating datetime difference

With the diff function, we can calculate the difference
between two datetime objects.

difference.js
  

import dayjs from 'dayjs';

const date1 = dayjs("2019-14-05");
const date2 = dayjs("2018-06-25");

let df1 = date1.diff(date2);
console.log(df1);

let df2 = date1.diff(date2, "month");
console.log(df2);

let df3 = date1.diff(date2, "month", true);
console.log(df3);

let df4 = date1.diff(date2, "day");
console.log(df4);

let df5 = date1.diff(date2, "week");
console.log(df5);

The example calculates the difference between two dayjs objects
in months, days, and weeks.

let df2 = date1.diff(date2, "month");
console.log(df2);

The second parameter tells that the output will be in months.

let df3 = date1.diff(date2, "month", true);
console.log(df3);

Setting the third parameter to true returns a floating
point value, e.g. 7.3 months.

$ node difference.js
19357200000
7
7.3
224
32

The Battle of Borodino was a battle fought on 7 September 1812 in the
Napoleonic Wars during the French invasion of Russia.

borodino.js
  

import dayjs from 'dayjs';

let borodinoBattle = dayjs('1812-09-07');

let now = dayjs();
let days = now.diff(borodinoBattle, 'days');

console.log(`On ${now.format('YYYY-MM-DD')}, ${days} days have passed since the Borodino battle.`);

In the example, we calculate the number of days passed since the famous battle.

$ node borodino.js
On 2022-06-16, 76618 days have passed since the Borodino battle.

## Day.js datetime arithmetic

The add function is used to add date and time to the dayjs
object and the subtract function subtract date and time
from the dayjs object.

arithm.js
  

import dayjs from 'dayjs';

let now = dayjs();

console.log(now.format('YYYY-MM-DD'));

let d1 = now.add('14', 'day');

console.log(d1.format('YYYY-MM-DD'));

let d2 = now.subtract('3', 'year');

console.log(d2.format('YYYY-MM-DD'));

In the example, we add fourteen days and subtract two years to and
from the current datetime.

let d1 = now.add('14', 'day');
...
let d2 = now.subtract('3', 'year'););

The second parameter of the add and subtract
functions is the unit type.

$ node arithm.js
2022-06-16
2022-06-30
2019-06-16

## Day.js datetime parts

In the following example, we get the parts of the current datetime.

parts.js
  

import dayjs from 'dayjs';

let now = dayjs();

console.log(now);

let year = now.year();
console.log(`Year: ${year}`);

let month = now.month();
console.log(`Month: ${month}`);

let date = now.date();
console.log(`Date: ${date}`);

let hour = now.hour();
console.log(`Hour: ${hour}`);

let minute = now.minute();
console.log(`Minute: ${minute}`);

let second = now.second();
console.log(`Second: ${second}`);

let milli = now.millisecond();
console.log(`Millisecond: ${milli}`);

The example computes the current datetime. We get the year, month, date, hour,
minute, second, and millisecond parts of the datetime.

$ node parts.js
M {
  '$L': 'en',
  '$d': 2022-06-16T14:48:25.918Z,
  '$x': {},
  '$y': 2022,
  '$M': 5,
  '$D': 16,
  '$W': 4,
  '$H': 16,
  '$m': 48,
  '$s': 25,
  '$ms': 918
}
Year: 2022
Month: 5
Date: 16
Hour: 16
Minute: 48
Second: 25
Millisecond: 918

The following example calculates the day of week, month, and year.

dayof.js
  

const moment = require('moment');

let now = moment();

console.log("Day of week: " + now.weekday());
console.log("Day of month: " + now.date());
console.log("Day of year: " + now.dayOfYear());

The weekday returns the day of week, the date
returns the day of month, and the dayOfYear returns
the day of year.

$ node main.js
Day of week: 1
Day of month: 2
Day of year: 183

 -->

## Day.js conversion functions

Apart from the format function, we can also use a few built-in
conversion functions.

converting.js
  

import dayjs from 'dayjs';

let now = dayjs();

console.log(now.toString());
console.log(now.toJSON());
console.log(now.toISOString());

We have three functions. The toJSON is an alias to
toISOString.

$ node converting.js
Thu, 16 Jun 2022 14:49:35 GMT
2022-06-16T14:49:35.718Z
2022-06-16T14:49:35.718Z

In the following example, we get the week of the year, the quarter
of the year, and the number of weeks in the year.

weeks_quarter.js
  

const moment = require('moment');

let now = moment();

console.log("Week of year: " + now.week());
console.log("Quarter of year: " + now.quarter());
console.log("Weeks in year: " + now.weeksInYear());

The week function returns the week of the year,
the quarter returns the quarter of the year, and
the weeksInYear returns the number of weeks in the year.

$ node weeks_quarter.js
Week of year: 27
Quarter of year: 3
Weeks in year: 52

 -->

## Day.js relative datetime

We can compute relative datetime with startOf and endOf
functions.

relative_time.js
  

import dayjs from 'dayjs';

// let now = dayjs();

let startWeek = dayjs().startOf('week');
console.log(startWeek.format());

let endWeek = dayjs().endOf('week');
console.log(endWeek.format());

let startMonth = dayjs().startOf('month');
console.log(startMonth.format());

let endMonth = dayjs().endOf('month');
console.log(endMonth.format());

let startYear = dayjs().startOf('year');
console.log(startYear.format());

let endYear = dayjs().endOf('year');
console.log(endYear.format());

The example uses the aforementioned functions.

let startWeek = dayjs().startOf('week');
console.log(startWeek.format());

Here we calculate the datetime of the start of the current week.

let endYear = dayjs().endOf('year');
console.log(endYear.format());

Here we get the last datetime of the year.

$ node relative_time.js
2022-06-12T00:00:00+02:00
2022-06-18T23:59:59+02:00
2022-06-01T00:00:00+02:00
2022-06-30T23:59:59+02:00
2022-01-01T00:00:00+01:00
2022-12-31T23:59:59+01:00

## Day.js checking validity

We can use the isValid function to check if the
date and time object is valid.

validating.js
  

import dayjs from 'dayjs';

let day1 = dayjs('2018-12-12');
let day2 = dayjs('2018-11-ks');

if (day1.isValid()) {

    console.log("Day is valid");
    console.log(day1.format());
} else {

    console.log("Day is not valid");
}

if (day2.isValid()) {

    console.log("Day is valid");
    console.log(day2.format());
} else {

    console.log("Day is not valid");
}

The example checks the validity of two days.

## Day.js date queries

The isSame, isBefore, and isAfter
functions can be used to determine if a date is before or after another date.

queries.js
  

import dayjs from 'dayjs';

let d1 = dayjs("2018-05-19");
let d2 = dayjs("2018-05-20");
let d3 = dayjs("2018-05-22");
let d4 = dayjs("2018-05-19");

if (d1.isSame(d4)) {

    console.log('these are same dates');
} else {

    console.log('these are not the same dates');
}

if (d1.isAfter(d2)) {

    console.log(`${d1.format('YYYY-MM-DD')} is after ${d2.format('YYYY-MM-DD')}`);
} else {

    console.log(`${d1.format('YYYY-MM-DD')} is before ${d2.format('YYYY-MM-DD')}`);
}

if (d2.isBefore(d3)) {

    console.log(`${d2.format('YYYY-MM-DD')} is before ${d3.format('YYYY-MM-DD')}`);
} else {

    console.log(`${d2.format('YYYY-MM-DD')} is after ${d3.format('YYYY-MM-DD')}`);
}

In the example, we compare three dates.

$ node queries.js
these are same dates
2018-05-19 is before 2018-05-20
2018-05-20 is before 2018-05-22

The isBetween function checks if a date is in the given date range.

between.js
  

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';

dayjs.extend(isBetween);

let d1 = dayjs("2018-05-19");

if (d1.isBetween('2018-05-10', '2018-05-25')) {

    console.log("The day is within the date range");
} else {

    console.log("The day is not within the date range");
}

The example uses the isBetween function to determine if a date is
within the specified date range. For this example we need the
isBetween plugin.

## Day.js unix time

Unix time is the number of seconds since the Unix epoch.
The unix function returns the value of time in seconds
since 0 hours, 0 minutes, 0 seconds, January 1, 1970,
Coordinated Universal Time.

unixtime.js
  

import dayjs from 'dayjs';

let unixTime_s = dayjs().unix();
console.log(unixTime_s);

let unixTime_ms = dayjs().valueOf();
console.log(unixTime_ms);

let unixTime2 = dayjs(1);
console.log(unixTime2.format('YYYY-DD-MM'));

In the example, we get the current unix time and convert unix time 1 s
to human readable format.

let unixTime_s = dayjs().unix();

We get the Unix time with unix function. The returned
value is the number of seconds elapsed from the start of the Unix Epoch.

let unixTime_ms = dayjs().valueOf();

With the valueOf function, we get the Unix time
in milliseconds.

let unixTime2 = dayjs(1);
console.log(unixTime2.format('YYYY-DD-MM'));

We get the unix time of 1 s and output it in the given format.

$ node unix_time.js
1655391820
1655391820977
1970-01-01

## Day.js leap year

A leap year is a year containing an additional day. The reason for an
extra day in the calendar is the difference between the astronomical and
the calendar year. We need to add the isLeapYear plugin.

leap_year.js
  

import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear.js';

dayjs.extend(isLeapYear)

// Assume year &gt;= 1582 in the Gregorian calendar.

let years = [ 2000, 2002, 2004, 2008, 2012, 2016, 2020,
    1900, 1800, 1600 ];

for (const year of years) {

    let ym = dayjs([year]);

    if (ym.isLeapYear()) {

        console.log(`${year} is a leap year`);
    } else {

        console.log(`${year} is not a leap year`);
    }
}

In the example, we have an array of years. We determine which years
are leap years.

if (ym.isLeapYear()) {

We determine if a year is a leap year with the isLeapYear
function.

$ node leap_year.js
2000 is a leap year
2002 is not a leap year
2004 is a leap year
2008 is a leap year
2012 is a leap year
2016 is a leap year
2020 is a leap year
1900 is not a leap year
1800 is not a leap year
1600 is a leap year

## Source

[Day.js documentation](https://day.js.org/docs/en/installation/installation)

In this article we have worked with date and time in JavaScript using
the Day.js library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)