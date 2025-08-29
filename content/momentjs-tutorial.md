+++
title = "Moment.js tutorial"
date = 2025-08-29T20:01:29.620+01:00
draft = false
description = "Learn how to handle date and time in JavaScript using the Moment.js library, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Moment.js tutorial

last modified last modified October 18, 2023

 

In this article we show how to work with date and time in JavaScript with
Moment.js module.

## Moment.js

Moment.js is a lightweight JavaScript date library for 
parsing, validating, manipulating, and formatting dates.

In this article we work with Moment.js in a Node application. There is a
similar Day.js library, which is covered in Day.js
tutorial.

## Setting up Moment.js

First, we install Moment.js.

$ npm init

We initiate a new Node application.

$ npm i moment

We install Moment.js with npm i moment command.

## Moment.js today's date

In the first example, we get today's date with Moment.js.

today.js
  

const moment = require('moment');

let now = moment();
console.log(now.format());

The example prints today's date and time.

const moment = require('moment');

We load the Moment.js library.

let now = moment();

We get the current local datetime object with moment.

console.log(now.format());

We format the output with format. By default, we get a 
long datetime format. 

$ node today.js 
2018-07-01T16:32:53+02:00

This is the ISO standard format. The date and time parts are separated
by T character. The string is ended with a time zone.

## Creating Moment.js objects

We can use several ways to create date and time Moment.js objects. These objects
have to be formatted later to human-readable format.

create_objects.js
  

const moment = require('moment');

let d1 = moment("2018-06-03");
console.log(d1.format('ll'));

let d2 = moment([2017, 11, 23]);
console.log(d2.format('ll'));

let d3 = moment({ year :2010, month :3, day :5, 
    hour :15, minute :10, second :3, millisecond :123});
console.log(d3.format('ll'));

let d4 = moment(1530471537000);
console.log(d4.format('ll'));

let d5 = moment(new Date(2011, 11, 22));
console.log(d5.format('ll'));

The example creates date and time objects in five different ways.

let d1 = moment("2018-06-03");

We create a moment object from a string.

let d2 = moment([2017, 11, 23]);
console.log(d2.format('ll'));

Here a moment object is created from an array.

let d3 = moment({ year :2010, month :3, day :5, 
    hour :15, minute :10, second :3, millisecond :123});
console.log(d3.format('ll'));

We can use JSON objects to create moment objects.

let d4 = moment(1530471537000);
console.log(d4.format('ll'));

We use a unix time stamp (in milliseconds) to define a moment object. 

let d5 = moment(new Date(2011, 11, 22));
console.log(d5.format('ll'));

Finally, we use a JavaScript built-in Date object to define a moment object.

$ node create_moment_objects.js 
Jun 3, 2018
Dec 23, 2017
Apr 5, 2010
Jul 1, 2018
Dec 22, 2011

## Moment.js formatting datetime

Moment.js objects are formatted with the format function.
There are also options for localized formats.

format.js
  

const moment = require('moment');

let now = moment();

console.log("ISO")
console.log(now.format());

console.log("\nTime")
console.log(now.format("HH:mm:ss"));
console.log(now.format("h:mm:ss a"));

console.log("\nDate")
console.log(now.format("dddd, MMMM Do YYYY"));
console.log(now.format("YYYY-MM-DD"));

console.log("\nLocalized")
console.log(now.format("LT"));
console.log(now.format("LTS"));
console.log(now.format("LTS"));
console.log(now.format("L"));
console.log(now.format("l"));

The example formats date and time using Moment's format
function.

$ node format.js 
ISO
2018-07-03T10:09:47+02:00

Time
10:09:47
10:09:47 am

Date
Tuesday, July 3rd 2018
2018-07-03

Localized
10:09 AM
10:09:47 AM
10:09:47 AM
07/03/2018
7/3/2018

## Moment.js calculating datetime difference

With the diff function, we can calculate the difference
between two datetime objects.

difference.js
  

const moment = require('moment');

let d1 = moment('2018-06-12');
let d2 = moment('2018-06-28');

let days = d2.diff(d1, 'days');
console.log(`Difference in days: ${days}`);

let hours = d2.diff(d1, 'hours');
console.log(`Difference in hours: ${hours}`);

The example calculates the difference between two moment objects
in days and hours.

let days = d2.diff(d1, 'days');

The second parameter tells that the output will be in days.

$ node difference.js 
Difference in days: 16
Difference in hours: 384

The Battle of Borodino was a battle fought on 7 September 1812 in the Napoleonic
Wars during the French invasion of Russia.

borodino.js
  

const moment = require('moment');

let borodinoBattle = moment('1812-09-07');

let now = moment();
let days = now.diff(borodinoBattle, 'days');

console.log(`On ${now.format('ll')}, ${days} days have passed since the Borodino battle.`);

In the example, we calculate the number of days passed since then.

$ node borodino.js 
On Jul 3, 2018, 75174 days have passed since the Borodino battle.

## Moment.js datetime arithmetic

The add function is used to add date and time to the moment object
and the subtract function subtract date and time from the moment
object. 

add_sub.js
  

const moment = require('moment');

let now = moment();

console.log(`Now: ${now.format('ll')}`);

now.add('3', 'days');
console.log(`Adding three days: ${now.format('ll')}`);

now.subtract('2', 'years');
console.log(`Subtracting 2 years: ${now.format('ll')}`);

In the example, we add three days and subtract two years.

now.add('3', 'days');
...
now.subtract('2', 'years');

The second parameter of the add and subtract
methods is the unit type.

$ node add_sub.js 
Now: Jul 1, 2018
Adding three days: Jul 4, 2018
Subtracting 2 years: Jul 4, 2016

## Moment.js datetime parts

In the following example, we get the parts of the current datetime.

parts.js
  

const moment = require('moment');

let now = moment();

let year = now.get('year');
let month = now.get('month');  // 0 to 11
let date = now.get('date');
let hour = now.get('hour');
let minute = now.get('minute');
let second = now.get('second');
let millisecond = now.get('millisecond');

console.log("Year: " + year);
console.log("Month: " + month);
console.log("Date: " + date);
console.log("Hour: " + hour);
console.log("Minute: " + minute);
console.log("Second: " + second);
console.log("Millisecond: " + millisecond);

The example computes the current datetime. We get the year, month, date, hour,
minute, second, and millisecond parts of the datetime.

$ node parts.js 
Year: 2018
Month: 6
Date: 2
Hour: 18
Minute: 10
Second: 3
Millisecond: 329

## Moment.js day of week, month, year

The following example calculates the day of week, month, and year.

dayof.js
  

const moment = require('moment');

let now = moment();

console.log("Day of week: " + now.weekday()); 
console.log("Day of month: " + now.date()); 
console.log("Day of year: " + now.dayOfYear()); 

The weekday returns the day of week, the date
returns the day of month, and the dayOfYear returns the day of
year.

$ node main.js 
Day of week: 1
Day of month: 2
Day of year: 183

## Moment.js week of year, quarter, weeks in year

In the following example, we get the week of the year, the quarter of the year,
and the number of weeks in the year.

weeks_quarter.js
  

const moment = require('moment');

let now = moment();

console.log("Week of year: " + now.week());
console.log("Quarter of year: " + now.quarter());
console.log("Weeks in year: " + now.weeksInYear());

The week method returns the week of the year, 
the quarter returns the quarter of the year, and 
the weeksInYear returns the number of weeks in the year. 

$ node weeks_quarter.js 
Week of year: 27
Quarter of year: 3
Weeks in year: 52

## Moment.js relative datetime

We can compute relative datetime with fromNow, startOf, 
and endOf functions.

relative_time.js
  

const moment = require('moment');

let day = moment().startOf('year');
let now = moment();

let days = now.diff(day, 'days');

console.log(`${days} have passed since the start of the year.`);

let val = moment().endOf('day');
let mins = val.diff(now, 'minutes');

console.log(`The day will end in ${mins} minutes.`);

let day2 = moment("2028-12-20")
let diff = day2.fromNow();

console.log(`The day will come ${diff}.`);

The example uses the aforementioned functions. 

let day = moment().startOf('year');
let now = moment();

let days = now.diff(day, 'days');

Here we calculate the number of days which have passed since the beginning of
the year.

let val = moment().endOf('day');
let mins = val.diff(now, 'minutes');

These lines calculate the number of minutes till midnight.

let day2 = moment("2028-12-20")
let diff = day2.fromNow();

Here we get the number of years until the specified day.

$ node relative_time.js 
182 have passed since the start of the year.
The day will end in 360 minutes.
The day will come in 10 years.

## Moment.js checking validity

We can use the isValid method to check if the date and time object
is valid.

validity.js
  

const moment = require('moment');

let day1 = moment('2018-12-12');
let day2 = moment('2018-13-12');

if (day1.isValid()) {

    console.log("Day is valid");
} else {
    
    console.log("Day is not valid");
}

if (day2.isValid()) {

    console.log("Day is valid");
} else {
    
    console.log("Day is not valid");
}

The example checks the validity of two days.

## Moment.js date queries

The isBefore and isAfter functions can be used to
determine if a date is before or after another date.

date_queries.js
  

const moment = require('moment');

let d1 = moment("2018-05-19");
let d2 = moment("2018-05-20");
let d3 = moment("2018-05-22");

if (d1.isAfter(d2)) {

    console.log(`${d1.format('ll')} is after ${d2.format('ll')}`);
} else {

    console.log(`${d1.format('ll')} is before ${d2.format('ll')}`);
}

if (d2.isBefore(d3)) {

    console.log(`${d2.format('ll')} is before ${d3.format('ll')}`);
} else {

    console.log(`${d2.format('ll')} is after ${d3.format('ll')}`);
}

In the example, we compare three dates using isBefore 
and isAfter functions.

$ node date_queries.js 
May 19, 2018 is before May 20, 2018
May 20, 2018 is before May 22, 2018

The isBetween function checks if a date is in the given date range.

between.js
  

const moment = require('moment');

let d1 = moment("2018-05-19");

if (d1.isBetween('2018-05-10', '2018-05-25')) {

    console.log("The day is within the date range");
}

The example uses the isBetween function to determine if a date is
within the specified date range.

## Moment.js unix time

Unix time is the number of seconds since the Unix epoch. The
unixfunction returns the value of time in seconds since 0 hours, 0
minutes, 0 seconds, January 1, 1970, Coordinated Universal Time. 

unixtime.js
  

const moment = require('moment');

let unixTime = moment().unix();
console.log(unixTime);

let unixTime2 = moment(1000);
console.log(unixTime2.format('MM-DD-YYYY'));

In the example, we get the current Unix time and convert Unix time 1 s to human
readable format.

let unixTime = moment().unix();

We get the Unix time with unix function. The returned value is the
number of seconds elapsed from the start of the Unix Epoch.

let unixTime2 = moment(1000);
console.log(unixTime2.format('MM-DD-YYYY'));

We get the unix time of 1 s and output it in the given format.

$ node unixtime.js 
1530606134
01-01-1970

## Moment.js parsing date and time

We can parse a string representation of date and time by passing the date and
time format to the moment function.

parse.js
  

const moment = require('moment');

let day = "03/04/2008";
let parsed = moment(day, "DD/MM/YYYY");

console.log(parsed.format('ll'));

In the example, we parse a non-standard date and time string. We pass the
expected format as a second parameter of the moment function.

## Moment.js localized date and time

With the locale function, we can set the locale in which we get the
output.

localized.js
  

const moment = require('moment');

moment.locale('sk');
let now = moment();
console.log(now.format('LLLL'));

moment.locale('de');
now = moment();
console.log(now.format('LLLL'));

moment.locale('hu');
now = moment();
console.log(now.format('LLLL'));

In the example, we print the current moment in three different locales.

$ node localized.js 
nedeľa 1. júl 2018 22:21
Sonntag, 1. Juli 2018 22:21
2018. július 1., vasárnap 22:21

We have Slovak, German, and Hungarian date and time outputs of the current
moment.

## Universal time

Our planet is a sphere; it revolves round its axis. The Earth rotates towards
the east, so the Sun rises at different times in different locations. The Earth
rotates once in about 24 hours. The world was therefore divided into 24 time
zones. In each time zone, there is a different local time. This local time is
often further modified by the daylight saving.

There is a pragmatic need for one global time. One global time helps to avoid
confusion about time zones and daylight saving time. The UTC (Universal
Coordinated time) was chosen to be the primary time standard. UTC is used in
aviation, weather forecasts, flight plans, air traffic control clearances, and
maps. Unlike local time, UTC does not change with a change of seasons. 

utc.js
  

const moment = require('moment');

let localTime = moment();
console.log(localTime.format());

let utcTime = moment().utc();
console.log(utcTime.format('lll'));

The example prints the current UTC time and the local time. 

let utcTime = moment().utc();

The universal time is retrieved with utc.

$ node utc.js 
2018-07-01T21:15:17+02:00
Jul 1, 2018 7:15 PM

In our case, the difference between the local and universal time is two hours.
One hour is for the time zone and another hour for the daylight saving. 

## Moment.js leap year

A leap year is a year containing an additional day. The reason for an extra day
in the calendar is the difference between the astronomical and the calendar
year. 

leap_year.js
  

const moment = require('moment');

// Assume year &gt;= 1582 in the Gregorian calendar.

let years = [ 2000, 2002, 2004, 2008, 2012, 2016, 2020,
    1900, 1800, 1600 ];

for (year of years) {

    let ym = moment([year]);

    if (ym.isLeapYear()) {

        console.log(`${year} is a leap year`);
    } else {
        
        console.log(`${year} is not a leap year`);
    }
}

In the example, we have an array of years. We determine which years are leap
years.

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

[Moment.js documentation](https://momentjs.com/docs/)

In this article we have worked with date and time in JavaScript using the
Moment.js library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)