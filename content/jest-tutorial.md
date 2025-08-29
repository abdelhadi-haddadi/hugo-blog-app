+++
title = "Jest tutorial"
date = 2025-08-29T20:01:23.731+01:00
draft = false
description = "Discover how to perform unit testing in JavaScript using the Jest framework, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Jest tutorial

last modified last modified October 18, 2023

 

In this article we show how to use Jest framework to perform unit testing
in JavaScript applications.

## Jest

Jest JavaScript resting framework with a focus on simplicity. Jest

*Unit testing* is a software testing where individual units (components)
of a software are tested. The purpose of unit testing is to validate that each
unit of the software performs as designed. A unit is the smallest testable part
of any software.

*Mocking* is technique where code parts are replaced with dummy
implementations that emulate real code. Mocking helps achieve isolation of
tests. Mocking is primarily used in unit testing.

In our tests we check that values meet certain conditions. The expect
function gives us  a number of *matchers* that let us validate different things,
such as toBe, toBeFalsy, or toEqual.

In this article we work with Jest in a Node application.

## Setting up Jest

First, we install Jest.

$ npm init -y

We initiate a new Node application.

$ npm i --dev jest

We install Jest module with nmp i --dev jest.

$ npm i -g jsonserver
$ npm i axios

We are going to use jsonserver and axios too.

## The package.json

The test script runs jest.

package.json
  

{
  "name": "jest-test",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "jest --verbose"
  },
  "keywords": [],
  "author": "Jan Bodnar",
  "license": "ISC",
  "devDependencies": {
    "jest": "^24.0.0"
  },
  "dependencies": {
    "axios": "^0.18.0"
  }
}

By default, jest only gives a rudimentary output. To get more information
about test runs, we use the --verbose flag.

## Jest running tests

Tests are run with npm test command. The test files must
have the test term in their names.

$ npm test

&gt; jest-test@1.0.0 test C:\Users\Jano\Documents\js\jest-test
&gt; jest

  PASS  ./math-utils.test.js
  PASS  ./arith.test.js
  PASS  ./arith-params.test.js
  PASS  ./arith-skip.test.js
  PASS  ./string-utils.test.js
  PASS  ./arith-mock.test.js
  PASS  ./users.test.js

Test Suites: 7 passed, 7 total
Tests:       2 skipped, 35 passed, 37 total
Snapshots:   0 total
Time:        5.19s
Ran all test suites.

This is an sample output running tests with Jest. This is a terse output.
For more information, we can use the --verbose option.

To run an individual test, we can use the npx jest testname
command.

scripts:{
    "test": "jest --verbose ./test-directory"
}

We can configure Jest to run tests in a specified test directory.

## Testing arithmetic functions with Jest

The following is a classic scholarly example for demostrating unit testing
with Jest.

arith.js
  

const add = (a, b) =&gt; a + b;
const mul = (a, b) =&gt; a * b;
const sub = (a, b) =&gt; a - b;
const div = (a, b) =&gt; a / b;

module.exports = { add, mul, sub, div };

We have four basic arithmetic functions in a module.

arith.test.js
  

const { add, mul, sub, div } = require('./arith');

test('2 + 3 = 5', () =&gt; {
  expect(add(2, 3)).toBe(5);
});

test('3 * 4 = 12', () =&gt; {
  expect(mul(3, 4)).toBe(12);
});

test('5 - 6 = -1', () =&gt; {
  expect(sub(5, 6)).toBe(-1);
});

test('8 / 4 = 2', () =&gt; {
  expect(div(8, 4)).toBe(2);
});

In arith.test.js, we test the module. The name of the file
contains the test term. It is then picked by jest.

test('2 + 3 = 5', () =&gt; {
  expect(add(2, 3)).toBe(5);
});

We test the add method with test function. The first
parameter is the name of the test, the second parameter is the function to be
run. We are testing that the add function returns correct answer
for sample data.

$ npx jest arith.test.js
PASS  ./arith.test.js
  √ 2 + 3 = 5 (3ms)
  √ 3 * 4 = 12 (6ms)
  √ 5 - 6 = -1
  √ 8 / 4 = 2 (1ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        10.981s
Ran all test suites matching /arith.test.js/i.

## Jest skipping tests

Tests may take considerable time to finish. We can skip some tests if needed.

arith-skip.test.js
  

const { add, mul, sub, div } = require('./arith');

xtest('2 + 3 = 5', () =&gt; {
  expect(add(2, 3)).toBe(5);
});

test.skip('3 * 4 = 12', () =&gt; {
  expect(mul(3, 4)).toBe(12);
});

test('5 - 6 = -1', () =&gt; {
  expect(sub(5, 6)).toBe(-1);
});

test('8 / 4 = 2', () =&gt; {
  expect(div(8, 4)).toBe(2);
});

A test can be skipped with skip or by using the x
prefix. In our case, the first two tests are skipped.

$ npx jest arith-skip.test.js
PASS  ./arith-skip.test.js
  √ 5 - 6 = -1 (2ms)
  √ 8 / 4 = 2 (1ms)
  ○ skipped 2 tests

Test Suites: 1 passed, 1 total
Tests:       2 skipped, 2 passed, 4 total
Snapshots:   0 total
Time:        2.323s
Ran all test suites matching /arith-skip.test.js/i.

Two tests were skipped.

## Jest parameterized tests

Parameterized tests allow us to run the same test multiple times using
different values. This makes our tests more powerful.

For parameterized tests we use the each global function.

arith-param.test.js
  

const { add, mul, sub, div } = require('./arith')

test.each([[1, 1, 2], [-1, 2, 1], [2, 1, 3]])(
  '%i + %i equals %i', (a, b, expected) =&gt; {
    expect(add(a, b)).toBe(expected);
  },
);

test.each([[1, 1, 0], [-1, 2, -3], [2, 2, 0]])(
  '%i - %i equals %i', (a, b, expected) =&gt; {
    expect(sub(a, b)).toBe(expected);
  },
);

test.each([[1, 1, 1], [-1, 2, -2], [2, 2, 4]])(
  '%i * %i equals %i', (a, b, expected) =&gt; {
    expect(mul(a, b)).toBe(expected);
  },
);

test.each([[1, 1, 1], [-1, 2, -0.5], [2, 2, 1]])(
  '%i / %i equals %i', (a, b, expected) =&gt; {
    expect(div(a, b)).toBe(expected);
  },
);

In these tests, we run each arithmetic function multiple times with
different input data.

test.each([[1, 1, 2], [-1, 2, 1], [2, 1, 3]])(
  '%i + %i equals %i', (a, b, expected) =&gt; {
    expect(add(a, b)).toBe(expected);
  },
);

The each method receives an array of arrays with the arguments
that are passed into the test function for each row. The %i are
format specifiers that expect integers. This is for output that is shown
with --verbose option.

$ npx jest arith-params.test.js
PASS  ./arith-params.test.js
  √ 1 + 1 equals 2 (3ms)
  √ -1 + 2 equals 1 (1ms)
  √ 2 + 1 equals 3
  √ 1 - 1 equals 0
  √ -1 - 2 equals -3
  √ 2 - 2 equals 0
  √ 1 * 1 equals 1 (1ms)
  √ -1 * 2 equals -2
  √ 2 * 2 equals 4
  √ 1 / 1 equals 1 (1ms)
  √ -1 / 2 equals 0
  √ 2 / 2 equals 1

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        1.759s
Ran all test suites matching /arith-params.test.js/i.

## Jest beforeAll

The beforeAll function is part of a test setup. It runs a function
before any of the tests in this file run. If the function returns a promise or
is a generator, Jest waits for that promise to resolve before running tests.

math-utils.js
  

const sum = (vals) =&gt; {

    let sum = 0;

    vals.forEach((val) =&gt; {
        sum += val;
    });

    return sum;
}

const positive = (vals) =&gt; {

    return vals.filter((x) =&gt; { return x &gt; 0; });
}

const negative = (vals) =&gt; {

    return vals.filter((x) =&gt; { return x &lt; 0; });
}

module.exports = { sum, positive, negative };

We have a math-utils module, which contains three functions:
sum, positive, and negative.

math-utils.test.js
  

const { sum, positive, negative } = require('./math-utils');

let vals;
let sum_of_vals;
let pos_vals;
let neg_vals;

beforeAll(() =&gt; {
    pos_vals = [2, 1, 3];
    neg_vals = [-2, -1, -1];
    vals = pos_vals.concat(neg_vals);
    sum_of_vals = vals.reduce((x, y) =&gt; x + y, 0);
})

test('the sum of vals should be 2', () =&gt; {
    expect(sum(vals)).toBe(sum_of_vals);
});

test('should get positive values', () =&gt; {
    expect(positive(vals)).toEqual(pos_vals);
});

test('should get negative values', () =&gt; {
    expect(negative(vals)).toEqual(neg_vals);
});

In the test file, we use the beforeAll function to initialize
test data before the tests are run.

test('should get positive values', () =&gt; {
    expect(positive(vals)).toEqual(pos_vals);
});

To test the positive function, we use the toEqual
matcher. We test that the function returns an array of positive values equal to
the predefined test array of values.

## Jest grouping tests

In Jest, tests are grouped into units with describe.
It creates a block that groups together several related tests.

string-utils.js
  

const isPalindrome = (string) =&gt; string == string.split('').reverse().join('');

const isAnagram = (w1, w2) =&gt; {

    const regularize = (word) =&gt; {
        return word.toLowerCase().split('').sort().join('').trim();
    }

    return regularize(w1) === regularize(w2);
}

module.exports = {isPalindrome, isAnagram};

We have string-utils.js module with two functions: isPalindrome
and isAnagram.

math-utils.js
  

const sum = (vals) =&gt; {

    let sum = 0;

    vals.forEach((val) =&gt; {
        sum += val;
    });

    return sum;
}

const positive = (vals) =&gt; {

    return vals.filter((x) =&gt; { return x &gt; 0; });
}

const negative = (vals) =&gt; {

    return vals.filter((x) =&gt; { return x &lt; 0; });
}

module.exports = { sum, positive, negative };

We have again the math-utils.js module.

groups.test.js
  

const { sum, positive, negative } = require('./math-utils');
const { isPalindrome, isAnagram } = require('./string-utils');

describe('testing math utilities', () =&gt; {
    let vals;
    let sum_of_vals;
    let pos_vals;
    let neg_vals;

    beforeAll(() =&gt; {
        pos_vals = [2, 1, 3];
        neg_vals = [-2, -1, -1];
        vals = pos_vals.concat(neg_vals);
        sum_of_vals = vals.reduce((x, y) =&gt; x + y, 0);
    })

    test('the sum of vals should be 2', () =&gt; {
        expect(sum(vals)).toBe(sum_of_vals);
    });

    test('should get positive values', () =&gt; {
        expect(positive(vals)).toEqual(pos_vals);
    });

    test('should get negative values', () =&gt; {
        expect(negative(vals)).toEqual(neg_vals);
    });
});

describe('testing string utilities', () =&gt; {

    test.each(["racecar", "radar", "level", "refer", "deified", "civic"])(
        'testing %s for palindrome', (word) =&gt; {
            expect(isPalindrome(word)).toBeTruthy();
        },
    );

    test.each([["arc", "car"], ["cat", "act"], ["cider", "cried"]])(
        'testing if %s and %s are anagrams ', (word1, word2) =&gt; {
            expect(isAnagram(word1, word2)).toBeTruthy();
        },
    );
});

With describe, we have created two isolated test groups
for string and math utilities. For instance, the beforeAll
is only applied for the math utilities.

$ npx jest groups.test.js
PASS  ./groups.test.js
  testing math utilities
    √ the sum of vals should be 2 (3ms)
    √ should get positive values (1ms)
    √ should get negative values
  testing string utilities
    √ testing racecar for palindrome (1ms)
    √ testing radar for palindrome
    √ testing level for palindrome
    √ testing refer for palindrome
    √ testing deified for palindrome (1ms)
    √ testing civic for palindrome
    √ testing if arc and car are anagrams
    √ testing if cat and act are anagrams
    √ testing if cider and cried are anagrams  (1ms)

 Test Suites: 1 passed, 1 total
 Tests:       12 passed, 12 total
 Snapshots:   0 total
 Time:        1.786s
 Ran all test suites matching /groups.test.js/i.

We run the tests.

## Jest testing Axios

In the following section, we test JavaScript code that uses Axios library.
In the beginning, we have installed axios and json-server
modules.

users.json
  

{
  "users": [
      {
          "id": 1,
          "first_name": "Robert",
          "last_name": "Schwartz",
          "email": "rob23@gmail.com"
      },
      {
          "id": 2,
          "first_name": "Lucy",
          "last_name": "Ballmer",
          "email": "lucyb56@gmail.com"
      },
      {
          "id": 3,
          "first_name": "Anna",
          "last_name": "Smith",
          "email": "annasmith23@gmail.com"
      },
      {
          "id": 4,
          "first_name": "Robert",
          "last_name": "Brown",
          "email": "bobbrown432@yahoo.com"
      },
      {
          "id": 5,
          "first_name": "Roger",
          "last_name": "Bacon",
          "email": "rogerbacon12@yahoo.com"
      }
  ]
}

This is some fake data for the JSON server.

users.js
  

const axios = require('axios');

class Users {

     static async all() {
        let res = await axios.get('http://localhost:3000/users');
        return res;
      }
}

module.exports = Users;

The users.js module retrieves data with axios.
we test this module.

users-app.js
  

const Users = require('./users');

async function showData() {
    let res = await Users.all();
    console.log(res.data);
}

showData();
console.log('finished')

The users-app.js is the application that uses users.js
module to get and output data.

$ json-server --watch users.json

We start the json-server.

$ node users-app.js
finished
[ { id: 1,
    first_name: 'Robert',
    last_name: 'Schwartz',
    email: 'rob23@gmail.com' },
  { id: 2,
    first_name: 'Lucy',
    last_name: 'Ballmer',
    email: 'lucyb56@gmail.com' },
  { id: 3,
    first_name: 'Anna',
    last_name: 'Smith',
    email: 'annasmith23@gmail.com' },
  { id: 4,
    first_name: 'Robert',
    last_name: 'Brown',
    email: 'bobbrown432@yahoo.com' },
  { id: 5,
    first_name: 'Roger',
    last_name: 'Bacon',
    email: 'rogerbacon12@yahoo.com' } ]

We run the application.

users.test.js
  

const axios = require('axios');
const Users = require('./users');

jest.mock('axios');

test('should fetch users', () =&gt; {

    const users = [{
        "id": 1,
        "first_name": "Robert",
        "last_name": "Schwartz",
        "email": "rob23@gmail.com"
    }, {
        "id": 2,
        "first_name": "Lucy",
        "last_name": "Ballmer",
        "email": "lucyb56@gmail.com"
    }];

    const resp = { data : users };

    axios.get.mockImplementation(() =&gt; Promise.resolve(resp));

    Users.all().then(resp =&gt; expect(resp.data).toEqual(users));
});

This test file tests the users.js module.

jest.mock('axios');

We mock the module.

const users = [{
    "id": 1,
    "first_name": "Robert",
    "last_name": "Schwartz",
    "email": "rob23@gmail.com"
}, {
    "id": 2,
    "first_name": "Lucy",
    "last_name": "Ballmer",
    "email": "lucyb56@gmail.com"
}];

const resp = { data : users };

This is the response that the mocked module will return.

axios.get.mockImplementation(() =&gt; Promise.resolve(resp));

The mocked implementation returns a promise with the response.

Users.all().then(resp =&gt; expect(resp.data).toEqual(users));

We test the mocked Users.all function.

$ npx jest users.test.js
PASS  ./users.test.js
  √ should fetch users (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.818s
Ran all test suites matching /users.test.js/i.

We run the test.

## Source

[Jest documentation](https://jestjs.io/docs/getting-started)

In this article we have used Jest to do unit testing in JavaScript
applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)