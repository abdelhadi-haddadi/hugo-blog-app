+++
title = "The faker.js tutorial"
date = 2025-08-29T20:01:16.766+01:00
draft = false
description = "The faker.js tutorial shows how to generate fake data in JavaScript with faker.js library."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# The faker.js tutorial

last modified last modified October 18, 2023

 

In this article we show how to generate fake data in JavaScript with
faker.js library.

## faker.js

faker.js is a JavaScript library for generating fake data. Fake 
data is useful when building and testing our application. The faker.js 
can generate fake data for various areas, including address, commerce,
company, date, finance, image, random, or name.

In this article we work with faker.js in a Node application.

## Setting up faker.js

First, we install faker.js.

$ node -v
v18.2.0

We use Node version 18.2.0.

$ npm init -y

We initiate a new Node application.

$ npm install --save-dev @faker-js/faker

We install faker.js module as a development dependency.

## Faking names

In the first example, we fake data related to user names.

main.js
  

import { faker } from '@faker-js/faker';

let firstName = faker.name.firstName();
let lastName = faker.name.lastName();

let jobTitle = faker.name.jobTitle();
let prefix = faker.name.prefix(); 
let suffix = faker.name.suffix();
let jobArea = faker.name.jobArea();

let phone = faker.phone.number();

console.log(`Employee: ${prefix} ${firstName} ${lastName} ${suffix}`);
console.log(`Job title: ${jobTitle}`);
console.log(`Job area: ${jobArea}`);
console.log(`Phone: ${phone}`);

The example creates a random first name, last name, job title, name prefix and suffix, job area, 
and phone number.

import { faker } from '@faker-js/faker';

We import the faker module. 

let firstName = faker.name.firstName();

We generate a fake first name with the firstName function.
The function is located in the name object.

$ node names.js
Employee: Miss Annabelle Rosenbaum PhD
Job title: Central Usability Officer
Job area: Tactics
Phone: 1-681-585-6744 x028

## Faking dates

In the second example, we generate fake dates.

main.js
  

import { faker } from '@faker-js/faker';

let futureDate = faker.date.future();
let recentDate = faker.date.recent();
let weekday = faker.date.weekday();

console.log(futureDate);
console.log(recentDate);
console.log(weekday);

The example picks up a future and recent date and some weekday.

$ node main.js 
2023-01-22T16:26:38.376Z
2022-06-23T16:20:01.315Z
Wednesday

## Faking random values

The faker allows to generate random values, such as integers, uuids, or words.

main.js
  

import { faker } from '@faker-js/faker';

let number = faker.random.numeric();
console.log(number);

let uuid = faker.datatype.uuid();
console.log(uuid);

let word = faker.random.word();
console.log(word);

let words = faker.random.words(6);
console.log(words);

The example generates random number, uuid, word, and a group of six words. 

$ node main.js
7
970441be-c5bb-4e7f-84a6-d0556b69bb2a
hacking
Switchable auxiliary Implementation Manors Corporate AI

## Faking locale data

The faker supports localized data to some extent. Note that the locales are finished
to various levels.

main.js
  

import { faker } from '@faker-js/faker/locale/ru';

let firstName = faker.name.firstName();
let lastName = faker.name.lastName();

console.log(`Pаботник: ${firstName} ${lastName}`);

let month = faker.date.month();
let recentDate = faker.date.recent();
let rectentDate = faker.date.weekday();

console.log(month);
console.log(recentDate);
console.log(rectentDate);

The example generates fake data in Russian language.

$ node main.js
Pаботник: Blaise Sauer
январь
2022-06-24T07:29:27.397Z
Четверг

## Serving fake data with JSON Server

In the next example, we generate JSON data and write it to file. The file is
served by JSON Server. 

$ npm i g json-server

We install json-server module.

main.js
  

import { faker } from '@faker-js/faker';
import fs from 'fs'

function generateUsers() {

  let users = []

  for (let id=1; id &lt;= 100; id++) {

    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();

    users.push({
        "id": id,
        "first_name": firstName,
        "last_name": lastName,
        "email": email
    });
  }

  return { "data": users }
}

let dataObj = generateUsers();

fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));

The example generates one-hundred users and writes them to a data.json
file.

$ json-server --watch data.json --port 3004

We start the JSON Server. The server serves data from the generated JSON file.

$ curl localhost:3004/data/3/
{
  "id": 3,
  "first_name": "Sheila",
  "last_name": "Bayer",
  "email": "Moshe.Walsh32@yahoo.com"
}

We retrieve the user with Id 3 with the curl tool.

We show how to generate a HTTP GET request in JavaScript with the Node
request 
module.

$ npm i request

We install the module.

get_data.js
  

import request from 'request';

request('http://localhost:3004/data?_start=4&amp;_end=8', (err, resp, body) =&gt; {

    if (err) {
        console.error('request failed');
        console.error(err);
    } else {
        console.log(body);
    }
});

The program fetches data from the JSON Server, beginning with index 4 (exclusive)
and ending with index 8 (inclusive).

$ node get_data.js
[
  {
    "id": 5,
    "first_name": "Cheyanne",
    "last_name": "Ernser",
    "email": "Amber.Spinka62@yahoo.com"
  },
  {
    "id": 6,
    "first_name": "Jeff",
    "last_name": "Bogisich",
    "email": "Bettie.Ritchie60@hotmail.com"
  },
  {
    "id": 7,
    "first_name": "Simone",
    "last_name": "Zemlak",
    "email": "Dorris49@gmail.com"
  },
  {
    "id": 8,
    "first_name": "Demond",
    "last_name": "Barrows",
    "email": "Nestor81@yahoo.com"
  }
]

## Source

[Faker.js Guide](https://fakerjs.dev/guide/)

In this article we have used faker.js to generate fake data in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)