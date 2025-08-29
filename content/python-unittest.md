+++
title = "Python unittest"
date = 2025-08-29T20:11:08.198+01:00
draft = false
description = "Python unittest tutorial shows how to write and run unit tests in Python. Learn with practical examples and best practices."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python unittest

last modified February 25, 2025

The unittest module is Python's built-in framework for writing and executing
unit tests, inspired by JUnit from the Java ecosystem. It enables developers to
verify that individual components (functions, methods, or classes) of their code
work as intended. Unit testing is a cornerstone of reliable software
development, helping you catch bugs early, validate functionality, and ensure
maintainability.

## Key Concepts in unittest

**Test Case**: The smallest unit of testing, typically validating a specific
   behavior or output for a given input. Test cases are defined by subclassing
  unittest.TestCase.
**Test Fixture**: The setup and teardown logic required for tests, such as
   initializing resources (e.g., files, databases) before tests run and cleaning
   up afterward.
**Test Suite**: A collection of test cases or other test suites, allowing you
   to group related tests for execution.
**Test Runner**: The mechanism that executes tests and reports results, such
   as pass/fail counts and error details.
**Assertions**: Methods like assertEqual, assertTrue, assertRaises,
   etc., used to check if the code behaves as expected. A failed assertion marks
   the test as failed.

## Setting Up unittest

To get started, import unittest and create a test class by subclassing
unittest.TestCase. Test methods must start with test_ to be
recognized by the test runner.

BasicTest.py
  

import unittest

class MyTestCase(unittest.TestCase):

    def test_basic_arithmetic(self):
        self.assertEqual(1 + 1, 2)

if __name__ == '__main__':
    unittest.main()

This example demonstrates a basic unit test using the unittest module. The class
MyTestCase inherits from unittest.TestCase, defining a single test method,
test_basic_arithmetic. This method uses assertEqual to verify that 1 + 1 equals
2. When executed via unittest.main(), the test runner checks this assertion and
reports the result.

Run the tests from the command line:

python -m unittest test_filename.py

For verbose output (showing test names and results):

python -m unittest test_filename.py -v

## Practical Examples of unittest

Below are practical examples showcasing unittest in various scenarios, from
basic functions to advanced features.

### Testing a Simple Function

Test a basic addition function with multiple cases.

TestAddFunction.py
  

import unittest

def add(a, b):
    return a + b

class TestAddFunction(unittest.TestCase):

    def test_add_positive_numbers(self):
        self.assertEqual(add(2, 3), 5)

    def test_add_negative_numbers(self):
        self.assertEqual(add(-1, -1), -2)

    def test_add_mixed_numbers(self):
        self.assertEqual(add(-1, 1), 0)

if __name__ == '__main__':
    unittest.main()

This code tests a simple add function with three test cases.
TestAddFunction subclasses unittest.TestCase and
includes methods to check addition of positive numbers (2 + 3 = 5), negative
numbers (-1 + -1 = -2), and mixed numbers (-1 + 1 = 0). Each test uses
assertEqual to ensure the function returns the expected output.

### Testing String Methods

Verify built-in string methods with positive and negative tests.

TestStringMethods.py
  

import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('hello'.upper(), 'HELLO')

    def test_isupper(self):
        self.assertTrue('HELLO'.isupper())
        self.assertFalse('Hello'.isupper())

    def test_split(self):
        s = 'hello there'
        self.assertEqual(s.split(), ['hello', 'there'])
        with self.assertRaises(TypeError):
            s.split(2)  # split() expects a string, not an integer

if __name__ == '__main__':
    unittest.main()

This example tests Python's built-in string methods.
TestStringMethods includes three tests: test_upper checks if
'hello'.upper() returns 'HELLO', test_isupper verifies
'HELLO'.isupper() is True and 'Hello'.isupper() is False, and
test_split confirms 'hello there'.split() yields ['hello', 'there']. 
It also uses assertRaises to ensure split(2) raises a
TypeError.

### Testing List Methods

Test list manipulation methods for correctness.

TestListMethods.py
  

import unittest

class TestListMethods(unittest.TestCase):

    def test_append(self):
        my_list = [1, 2, 3]
        my_list.append(4)
        self.assertEqual(my_list, [1, 2, 3, 4])

    def test_pop(self):
        my_list = [1, 2, 3]
        popped_value = my_list.pop()
        self.assertEqual(popped_value, 3)
        self.assertEqual(my_list, [1, 2])

if __name__ == '__main__':
    unittest.main()

This code validates list operations. TestListMethods tests append by adding 4
to [1, 2, 3] and checking the result is [1, 2, 3, 4] with assertEqual. The
test_pop method removes the last element from [1, 2, 3], verifying the popped
value is 3 and the remaining list is [1, 2], using assertEqual for both checks.

### Testing Exceptions

Ensure a function raises exceptions as expected.

TestDivideFunction.py
  

import unittest

def divide(a, b):

    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

class TestDivideFunction(unittest.TestCase):

    def test_divide_valid(self):
        self.assertEqual(divide(10, 2), 5)

    def test_divide_by_zero(self):
        with self.assertRaises(ValueError):
            divide(10, 0)

if __name__ == '__main__':
    unittest.main()

This example tests a divide function that raises an exception on division by
zero. TestDivideFunction includes test_divide_valid, which checks
if divide(10, 2) equals 5 using assertEqual. The
test_divide_by_zero method uses
assertRaises to confirm that divide(10, 0) raises a
ValueError, ensuring proper exception handling.

### Using setUp and tearDown

Simulate a resource (e.g., a database) with setup and teardown.

TestDatabase.py
  

import unittest

class TestDatabase(unittest.TestCase):

    def setUp(self):
        # Simulate opening a database connection
        self.database = []

    def tearDown(self):
        # Simulate closing the connection
        self.database = None

    def test_insert(self):
        self.database.append('data')
        self.assertIn('data', self.database)

    def test_delete(self):
        self.database.append('data')
        self.database.remove('data')
        self.assertNotIn('data', self.database)

if __name__ == '__main__':
    unittest.main()

This code demonstrates test fixtures with setUp and
tearDown. TestDatabase uses setUp to
initialize an empty list as a mock database and tearDown to reset
it to None. The test_insert adds 'data' and checks its presence with
assertIn, while test_delete adds then removes 'data',
verifying absence with assertNotIn, simulating resource management.

### Testing a Class

Test methods of a simple Calculator class.

TestCalculator.py
  

import unittest

class Calculator:
    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

class TestCalculator(unittest.TestCase):

    def setUp(self):
        self.calc = Calculator()

    def test_add(self):
        self.assertEqual(self.calc.add(2, 3), 5)

    def test_subtract(self):
        self.assertEqual(self.calc.subtract(5, 3), 2)

if __name__ == '__main__':
    unittest.main()

This example tests a Calculator class with add and subtract methods.
TestCalculator uses setUp to create a Calculator
instance. The test_add method checks if calc.add(2, 3) returns 5, and
test_subtract verifies calc.subtract(5, 3) equals 2, both using
assertEqual to ensure the class methods function correctly.

### Skipping Tests

Demonstrate how to skip tests conditionally or unconditionally.

TestSkipExample.py
  

import unittest

class TestSkipExample(unittest.TestCase):

    @unittest.skip("Skipping this test for demonstration")
    def test_skip(self):
        self.fail("This test should be skipped")

    @unittest.skipIf(2 &gt; 1, "Skipping because condition is true")
    def test_skip_if(self):
        self.assertEqual(1, 2)  # Would fail if not skipped

    def test_normal(self):
        self.assertEqual(1 + 1, 2)

if __name__ == '__main__':
    unittest.main()

This code illustrates skipping tests. TestSkipExample uses
@unittest.skip to unconditionally skip test_skip,
which would fail with  self.fail. The @unittest.skipIf
decorator skips test_skip_if when 2 &gt; 1 is true, avoiding a
failing assertion. The test_normal runs normally, checking 1 + 1 =
2 with assertEqual.

### Testing with assertAlmostEqual

Handle floating-point arithmetic precision issues.

TestFloatingPoint.py
  

import unittest

class TestFloatingPoint(unittest.TestCase):

    def test_almost_equal(self):
        self.assertAlmostEqual(0.1 + 0.2, 0.3, places=7)  # Accounts for float precision

    def test_not_almost_equal(self):
        self.assertNotAlmostEqual(0.1 + 0.2, 0.4, places=7)

if __name__ == '__main__':
    unittest.main()

This example addresses floating-point precision. TestFloatingPoint uses
assertAlmostEqual in test_almost_equal to verify 0.1 +
0.2 ≈ 0.3 within 7 decimal places, accounting for float inaccuracies.
Test_not_almost_equal uses assertNotAlmostEqual to
ensure 0.1 + 0.2 ≠ 0.4, demonstrating precision-aware testing.

### Testing with assertRaises

Verify that exceptions are raised as expected.

TestException.py
  

import unittest

def raise_exception():
    raise ValueError("An error occurred")

class TestException(unittest.TestCase):

    def test_raise_exception(self):
        with self.assertRaises(ValueError) as context:
            raise_exception()
        self.assertEqual(str(context.exception), "An error occurred")

if __name__ == '__main__':
    unittest.main()

This code tests exception handling. TestException defines
raise_exception, which raises a ValueError. The
test_raise_exception method uses assertRaises to
confirm the exception occurs, capturing it with a context manager to check the
exception message 'An error occurred' matches using assertEqual.

### Using Test Suites

Manually create and run a custom test suite.

TestSuiteExample.py
  

import unittest

class TestSuiteExample1(unittest.TestCase):
    def test_case1(self):
        self.assertEqual(1, 1)

class TestSuiteExample2(unittest.TestCase):
    def test_case2(self):
        self.assertEqual(2, 2)

def suite():

    suite = unittest.TestSuite()
    suite.addTest(TestSuiteExample1('test_case1'))
    suite.addTest(TestSuiteExample2('test_case2'))
    return suite

if __name__ == '__main__':

    runner = unittest.TextTestRunner()
    test_suite = suite()
    runner.run(test_suite)

This example creates a custom test suite. TestSuiteExample1 and
TestSuiteExample2 each contain one test checking equality (1 = 1
and 2 = 2). The suite function builds a TestSuite, adding specific
tests, and TextTestRunner executes it, allowing manual grouping and
running of tests.

### Testing File Operations

Simulate file operations with a temporary file.

TestFileOperations.py
  

import unittest
import os

class TestFileOperations(unittest.TestCase):

    def setUp(self):
        self.filename = "temp_test.txt"
        with open(self.filename, 'w') as f:
            f.write("Hello, there!")

    def tearDown(self):
        if os.path.exists(self.filename):
            os.remove(self.filename)

    def test_read_file(self):
        with open(self.filename, 'r') as f:
            content = f.read()
        self.assertEqual(content, "Hello, there!")

if __name__ == '__main__':
    unittest.main()

This example tests file operations with fixtures.
TestFileOperations uses setUp to create a file with 'Hello, there!'
and tearDown to delete it. The test_read_file reads
the file and uses assertEqual to ensure the content matches the
written string, simulating file I/O testing.

### Testing Mocking with unittest.mock

Use mocking to isolate dependencies.

TestMocking.py
  

import unittest
from unittest.mock import Mock

def fetch_data(api):
    return api.get_data()

class TestMocking(unittest.TestCase):

    def test_fetch_data(self):

        # Create a mock API object
        mock_api = Mock()
        mock_api.get_data.return_value = "mocked data"
        
        result = fetch_data(mock_api)
        self.assertEqual(result, "mocked data")
        mock_api.get_data.assert_called_once()

if __name__ == '__main__':
    unittest.main()

This code demonstrates mocking with unittest.mock.
TestMocking mocks an API in test_fetch_data, setting
get_data to return 'mocked data'. It calls   fetch_data with the
mock, verifying the result with assertEqual and checking the method
was called once with assert_called_once, isolating dependencies.

### Testing Type Checking

Ensure functions handle input types correctly.

TestTypeChecking.py
  

import unittest

def multiply(a, b):
    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        raise TypeError("Inputs must be numbers")
    return a * b

class TestTypeChecking(unittest.TestCase):
    def test_valid_input(self):
        self.assertEqual(multiply(2, 3), 6)

    def test_invalid_input(self):
        with self.assertRaises(TypeError):
            multiply("2", 3)

if __name__ == '__main__':
    unittest.main()

This example tests type validation in a multiply function. TestTypeChecking
uses test_valid_input to check multiply(2, 3) = 6 with
assertEqual. The test_invalid_input uses
assertRaises to ensure multiply('2', 3) raises a
TypeError, confirming the function enforces numeric inputs.

### Testing Edge Cases

Test a function with boundary conditions.

TestClampFunction.py
  

import unittest

def clamp(value, min_val, max_val):
    """Clamp value between min_val and max_val."""
    return max(min_val, min(max_val, value))

class TestClampFunction(unittest.TestCase):

    def test_within_range(self):
        self.assertEqual(clamp(5, 0, 10), 5)

    def test_below_range(self):
        self.assertEqual(clamp(-1, 0, 10), 0)

    def test_above_range(self):
        self.assertEqual(clamp(15, 0, 10), 10)

if __name__ == '__main__':
    unittest.main()

This code tests a clamp function for boundary handling. TestClampFunction
checks test_within_range (clamp(5, 0, 10) = 5), test_below_range (clamp(-1, 0,
10) = 0), and test_above_range (clamp(15, 0, 10) = 10), all using assertEqual
to verify values stay within the specified range.

## Testing Sorting Algorithms

sorting_algos.py
  

def bubble_sort(arr):

    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] &gt; arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

def selection_sort(arr, ascending=True):

    n = len(arr)
    for i in range(n):
        idx = i
        for j in range(i + 1, n):
            if (ascending and arr[j] &lt; arr[idx]) or (not ascending and arr[j] &gt; arr[idx]):
                idx = j
        arr[i], arr[idx] = arr[idx], arr[i]
    return arr

This file defines two sorting algorithms. The bubble_sort
implements a bubble sort, swapping adjacent elements if out of order, modifying
the array in place. The selection_sort finds the minimum (or
maximum) element per iteration, sorting in ascending or descending order based
on the ascending parameter, returning the sorted array.

test_algos.py
  

import unittest
from sorting_algos import bubble_sort, selection_sort

class TestSortingAlgorithms(unittest.TestCase):

    def setUp(self):
        """Set up test fixtures with various input arrays."""
        self.unsorted_list = [64, 34, 25, 12, 22, 11, 90]
        self.sorted_asc_list = [11, 12, 22, 25, 34, 64, 90]
        self.sorted_desc_list = [90, 64, 34, 25, 22, 12, 11]
        self.empty_list = []
        self.single_element_list = [42]
        self.duplicates_list = [5, 2, 8, 5, 1, 9, 2]

    def test_bubble_sort_unsorted(self):
        """Test bubble_sort with an unsorted list."""
        arr = self.unsorted_list.copy()  # Use copy to preserve original fixture
        bubble_sort(arr)
        self.assertEqual(arr, self.sorted_asc_list)

    def test_bubble_sort_already_sorted(self):
        """Test bubble_sort with an already sorted list."""
        arr = self.sorted_asc_list.copy()
        bubble_sort(arr)
        self.assertEqual(arr, self.sorted_asc_list)

    def test_bubble_sort_empty(self):
        """Test bubble_sort with an empty list."""
        arr = self.empty_list.copy()
        bubble_sort(arr)
        self.assertEqual(arr, self.empty_list)

    def test_bubble_sort_single_element(self):
        """Test bubble_sort with a single-element list."""
        arr = self.single_element_list.copy()
        bubble_sort(arr)
        self.assertEqual(arr, self.single_element_list)

    def test_bubble_sort_duplicates(self):
        """Test bubble_sort with a list containing duplicates."""
        arr = self.duplicates_list.copy()
        bubble_sort(arr)
        self.assertEqual(arr, [1, 2, 2, 5, 5, 8, 9])

    def test_selection_sort_ascending_unsorted(self):
        """Test selection_sort with an unsorted list in ascending order."""
        arr = self.unsorted_list.copy()
        result = selection_sort(arr, ascending=True)
        self.assertEqual(result, self.sorted_asc_list)

    def test_selection_sort_descending_unsorted(self):
        """Test selection_sort with an unsorted list in descending order."""
        arr = self.unsorted_list.copy()
        result = selection_sort(arr, ascending=False)
        self.assertEqual(result, self.sorted_desc_list)

    def test_selection_sort_ascending_sorted(self):
        """Test selection_sort with an already sorted list in ascending order."""
        arr = self.sorted_asc_list.copy()
        result = selection_sort(arr, ascending=True)
        self.assertEqual(result, self.sorted_asc_list)

    def test_selection_sort_descending_sorted(self):
        """Test selection_sort with an already sorted list in descending order."""
        arr = self.sorted_desc_list.copy()
        result = selection_sort(arr, ascending=False)
        self.assertEqual(result, self.sorted_desc_list)

    def test_selection_sort_empty(self):
        """Test selection_sort with an empty list."""
        arr = self.empty_list.copy()
        result = selection_sort(arr, ascending=True)
        self.assertEqual(result, self.empty_list)

    def test_selection_sort_single_element(self):
        """Test selection_sort with a single-element list."""
        arr = self.single_element_list.copy()
        result = selection_sort(arr, ascending=True)
        self.assertEqual(result, self.single_element_list)

    def test_selection_sort_duplicates_ascending(self):
        """Test selection_sort with duplicates in ascending order."""
        arr = self.duplicates_list.copy()
        result = selection_sort(arr, ascending=True)
        self.assertEqual(result, [1, 2, 2, 5, 5, 8, 9])

    def test_selection_sort_duplicates_descending(self):
        """Test selection_sort with duplicates in descending order."""
        arr = self.duplicates_list.copy()
        result = selection_sort(arr, ascending=False)
        self.assertEqual(result, [9, 8, 5, 5, 2, 2, 1])

if __name__ == '__main__':
    unittest.main()

This file tests sorting algorithms with various cases.
TestSortingAlgorithms uses setUp to define test
fixtures like unsorted and sorted lists. Tests like
test_bubble_sort_unsorted and
test_selection_sort_ascending_unsorted use assertEqual
to verify sorting correctness across unsorted, sorted, empty, single-element,
and duplicate-containing lists.

## Testing Poker Rank Hands

Run with python -m unittest test_rank_hands.py -v

rank_hands.py
  

from itertools import combinations
from collections import Counter

def create_deck():

    signs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
    symbols = ['♠', '♥', '♦', '♣']  # spades, hearts, diamonds, clubs
    deck = [f'{si}{sy}' for si in signs for sy in symbols]
    return deck

def by_poker_order(card):

    poker_order = ["2", "3", "4", "5", "6",
                   "7", "8", "9", "10", "J", "Q", "K", "A"]
    return poker_order.index(card[:-1])

def calculate_combinations(hole: list, ccards: list):

    hands = hole + ccards
    hands.sort(key=by_poker_order)
    combs = combinations(hands, 5)
    return tuple(combs)

def check_rank(hole: list, ccards: list):

    combs = calculate_combinations(hole, ccards)

    match is_royal(combs):
        case (True, form):
            print(f'{form} is a royal flush')
            return

    match is_4_kind(combs):
        case (True, form):
            print(f'{form} is four of a kind')
            return

    match is_full_house(combs):
        case (True, form):
            print(f'{form} is a full house')
            return

    match is_flush(combs):
        case (True, form):
            print(f'{form} is a flush')
            return

    match is_3_kind(combs):
        case (True, form):
            print(f'{form} is three of a kind')
            return

    match is_straight(combs):
        case (True, form):
            print(f'{form} is a straight')
            return

    match is_two_pairs(combs):
        case (True, form):
            print(f'{form} is two pairs')
            return

    match is_pair(combs):
        case (True, form):
            print(f'{form} is a pair')
            return

    match is_high_card(combs):
        case (True, form):
            print(f'{form} is a high card')
            return

def is_royal(combs: list):

    royals = ["10♠ J♠ Q♠ K♠ A♠", "10♣ J♣ Q♣ K♣ A♣",
              "10♥ J♥ Q♥ K♥ A♥", "10♦ J♦ Q♦ K♦ A♦"]

    for comb in combs:
        form = ' '.join(comb)
        if form in royals:
            return True, form

def is_4_kind(combs: list):

    four_kinds = []

    for comb in combs:
        c = Counter([e[:-1] for e in comb])
        vals = c.values()

        if 4 in vals:
            form = ' '.join(comb)
            four_kinds.append(form)

    if len(four_kinds) &gt; 0:
        return True, four_kinds[-1]

def is_full_house(combs: list):

    for comb in combs:
        c = Counter([e[:-1] for e in comb])
        vals = c.values()
        form = ' '.join(comb)

        if 2 in vals and 3 in vals:
            return True, form

def is_flush(combs: list):

    matches = ['♣ ♣ ♣ ♣ ♣', '♦ ♦ ♦ ♦ ♦', '♥ ♥ ♥ ♥ ♥', '♠ ♠ ♠ ♠ ♠']
    flushes = []  # there may be more flush combinations, we pick the strongest

    for comb in combs:
        psuits = ' '.join(e[-1] for e in comb)

        if psuits in matches:
            form = ' '.join(comb)
            flushes.append(form)

    if len(flushes) &gt; 0:
        return True, flushes[-1]

def is_straight(combs: list):

    order = "2 3 4 5 6 7 8 9 10 J Q K A"
    strainghts = []

    for comb in combs:
        seq = [e[:-1] for e in comb]
        unit = ' '.join(seq)

        if unit in order:
            form = ' '.join(comb)
            strainghts.append(form)

    if len(strainghts) &gt; 0:
        return True, strainghts[-1]

def is_3_kind(combs: list):

    three_kinds = []

    for comb in combs:
        c = Counter([e[:-1] for e in comb])
        vals = c.values()

        if 3 in vals:
            form = ' '.join(comb)
            three_kinds.append(form)

    if len(three_kinds) &gt; 0:
        return True, three_kinds[-1]

def is_two_pairs(combs: list):

    two_pairs = []

    for comb in combs:
        c = Counter([e[:-1] for e in comb])
        vals = list(c.values())

        if vals.count(2) == 2:
            form = ' '.join(comb)
            two_pairs.append(form)

    if len(two_pairs) &gt; 0:
        return True, two_pairs[-1]

def is_pair(combs: list):

    pairs = []

    for comb in combs:
        c = Counter([e[:-1] for e in comb])
        vals = list(c.values())

        if vals.count(2) == 1:
            form = ' '.join(comb)
            pairs.append(form)

    if len(pairs) &gt; 0:
        return True, pairs[-1]

def is_high_card(combs: list):

    high_cards = []

    for comb in combs:
        form = ' '.join(comb)
        high_cards.append(form)

    if len(high_cards) &gt; 0:
        return True, high_cards[-1]

holes = (['K♥', 'A♣'], ['6♥', '4♠'], ['Q♠', 'Q♣'], ['2♠', '4♣'], ['5♠', '3♠'],
         ['J♣', 'Q♣'], ['Q♦', 'K♦'], ['K♠', 'A♠'], ['6♣', '7♣'], ['2♠', '7♦'])

ccards = (['3♦', '6♠', '10♦', 'J♠', '2♣'],
          ['10♠', 'J♠', 'Q♠', '8♣', '6♠'],
          ['9♠', '10♠', 'J♠', '6♦', '4♥'],
          ['9♠', '3♠', '4♦', '5♦', '6♥'],
          ['9♠', '5♦', '6♦', 'J♠', '3♣'],
          ['9♣', '10♣', '2♣', '3♣', '4♥'],
          ['4♦', '7♥', '7♦', 'A♣', '6♠'],
          ['5♦', '6♦', '10♣', '2♦', '2♣'],
          ['5♦', '5♣', '5♥', '6♦', '2♣'],
          ['5♣', '5♥', '6♦', '2♣', '4♦'],
          ['A♣', '10♣', '6♦', '3♦', 'K♣'])

for hole in holes:
    for ccard in ccards:
        check_rank(hole, ccard)

This file ranks poker hands. The create_deck generates a 52-card deck, and
calculate_combinations computes 5-card hands from hole and
community cards. Functions like is_royal and is_pair
check for specific ranks, returning the strongest match. The script iterates
over hole and community card pairs, printing ranks.

test_poker_rank_hands.py
  

import unittest

from rank_hands import (create_deck, by_poker_order, calculate_combinations,
                       is_royal, is_4_kind, is_full_house, is_flush, is_straight,
                       is_3_kind, is_two_pairs, is_pair, is_high_card)
from collections import Counter

class TestPokerHandRanking(unittest.TestCase):

    def setUp(self):
        """Set up test fixtures with sample hole and community cards."""
        self.hole_royal = ['K♠', 'A♠']
        self.hole_pair = ['Q♠', 'Q♣']
        self.hole_high = ['K♥', 'A♣']
        
        self.ccards_royal = ['10♠', 'J♠', 'Q♠', '2♣', '3♦']
        self.ccards_4kind = ['Q♥', 'Q♦', 'Q♠', '5♣', '6♦']
        self.ccards_full = ['Q♥', 'Q♦', '5♠', '5♣', '6♦']
        self.ccards_flush = ['2♠', '5♠', '7♠', '9♠', 'J♠']
        self.ccards_straight = ['9♠', '10♦', 'J♣', 'Q♥', 'K♦']
        self.ccards_3kind = ['Q♥', 'Q♦', '5♠', '6♣', '7♦']
        self.ccards_twopair = ['Q♥', '5♠', '5♣', 'K♦', '6♠']
        self.ccards_pair = ['5♠', '6♣', '7♦', '8♠', '9♣']
        self.ccards_high = ['2♣', '5♦', '7♥', '9♠', 'J♦']

    def test_create_deck(self):
        """Test that create_deck generates a standard 52-card deck."""
        deck = create_deck()
        self.assertEqual(len(deck), 52)
        self.assertIn('A♠', deck)
        self.assertIn('2♣', deck)
        self.assertEqual(len(set(deck)), 52)

    def test_by_poker_order(self):
        """Test that by_poker_order ranks cards correctly."""
        self.assertEqual(by_poker_order('2♠'), 0)
        self.assertEqual(by_poker_order('10♦'), 8)
        self.assertEqual(by_poker_order('J♣'), 9)
        self.assertEqual(by_poker_order('A♥'), 12)
        self.assertTrue(by_poker_order('2♠') &lt; by_poker_order('A♠'))

    def test_calculate_combinations(self):
        """Test that calculate_combinations generates correct 5-card combinations."""
        hole = ['K♥', 'A♣']  # 2 hole cards
        ccards = ['2♠', '3♦', '4♣', '5♠', '6♦']  # 5 community cards
        combs = calculate_combinations(hole, ccards)
        self.assertEqual(len(combs), 21)  # 7 choose 5 = 21
        sample_comb = combs[0]
        self.assertEqual(len(sample_comb), 5)
        self.assertTrue(all(card in hole + ccards for card in sample_comb))

    def test_is_royal(self):
        """Test detection of a royal flush."""
        combs = calculate_combinations(self.hole_royal, self.ccards_royal)
        result = is_royal(combs)
        self.assertTrue(result[0])
        self.assertEqual(result[1], '10♠ J♠ Q♠ K♠ A♠')

        combs = calculate_combinations(self.hole_high, self.ccards_flush)
        result = is_royal(combs)
        self.assertIsNone(result)

    def test_is_4_kind(self):
        """Test detection of four of a kind."""
        combs = calculate_combinations(self.hole_pair, self.ccards_4kind)
        result = is_4_kind(combs)
        self.assertTrue(result[0])
        ranks = [card[:-1] for card in result[1].split()]
        self.assertEqual(Counter(ranks)['Q'], 4)

        combs = calculate_combinations(self.hole_high, self.ccards_high)
        result = is_4_kind(combs)
        self.assertIsNone(result)

    def test_is_full_house(self):
        """Test detection of a full house."""
        combs = calculate_combinations(self.hole_pair, self.ccards_full)
        result = is_full_house(combs)
        self.assertTrue(result[0])
        ranks = [card[:-1] for card in result[1].split()]
        c = Counter(ranks)
        self.assertTrue(3 in c.values() and 2 in c.values())

        combs = calculate_combinations(self.hole_high, self.ccards_high)
        result = is_full_house(combs)
        self.assertIsNone(result)

    def test_is_flush(self):
        """Test detection of a flush."""
        combs = calculate_combinations(self.hole_high, self.ccards_flush)
        result = is_flush(combs)
        self.assertTrue(result[0])
        suits = [card[-1] for card in result[1].split()]
        self.assertEqual(len(set(suits)), 1)

        combs = calculate_combinations(self.hole_high, self.ccards_high)
        result = is_flush(combs)
        self.assertIsNone(result)

    def test_is_straight(self):
        """Test detection of a straight."""
        combs = calculate_combinations(self.hole_high, self.ccards_straight)
        result = is_straight(combs)
        self.assertTrue(result[0])
        ranks = [card[:-1] for card in result[1].split()]
        self.assertEqual(len(set(ranks)), 5)

        combs = calculate_combinations(self.hole_high, self.ccards_high)
        result = is_straight(combs)
        self.assertIsNone(result)

    def test_is_3_kind(self):
        """Test detection of three of a kind."""
        combs = calculate_combinations(self.hole_pair, self.ccards_3kind)
        result = is_3_kind(combs)
        self.assertTrue(result[0])
        ranks = [card[:-1] for card in result[1].split()]
        self.assertEqual(Counter(ranks)['Q'], 3)

        combs = calculate_combinations(self.hole_high, self.ccards_high)
        result = is_3_kind(combs)
        self.assertIsNone(result)

    def test_is_two_pairs(self):
        """Test detection of two pairs."""
        combs = calculate_combinations(self.hole_pair, self.ccards_twopair)
        result = is_two_pairs(combs)
        self.assertTrue(result[0])
        ranks = [card[:-1] for card in result[1].split()]
        c = Counter(ranks)
        self.assertEqual(list(c.values()).count(2), 2)

        combs = calculate_combinations(self.hole_high, self.ccards_high)
        result = is_two_pairs(combs)
        self.assertIsNone(result)

    def test_is_pair(self):
        """Test detection of a pair."""
        combs = calculate_combinations(self.hole_pair, self.ccards_pair)
        result = is_pair(combs)
        self.assertTrue(result[0])
        ranks = [card[:-1] for card in result[1].split()]
        c = Counter(ranks)
        self.assertEqual(list(c.values()).count(2), 1)

        combs = calculate_combinations(self.hole_high, self.ccards_high)
        result = is_pair(combs)
        self.assertIsNone(result)

    def test_is_high_card(self):
        """Test detection of a high card (always true if no other hand)."""
        combs = calculate_combinations(self.hole_high, self.ccards_high)
        result = is_high_card(combs)
        self.assertTrue(result[0])
        self.assertTrue(isinstance(result[1], str))

if __name__ == '__main__':
    unittest.main()

This file tests poker hand ranking functions. TestPokerHandRanking uses setUp
to define sample hands. Tests like test_is_royal verify royal flush detection,
test_is_4_kind checks four of a kind, and
test_is_high_card ensures high card detection, using assertions to
validate hand recognition and ranking logic.

## Tips for Effective Unit Testing

- **Test One Thing at a Time**: Each test should focus on a single behavior or condition.

- **Use Descriptive Names**: Method names like test_add_positive_numbers make failures easier to diagnose.

- **Cover Edge Cases**: Test boundaries, exceptions, and unusual inputs.

- **Keep Tests Independent**: Avoid dependencies between tests using setUp and tearDown.

- **Run Tests Frequently**: Integrate testing into your workflow to catch issues early.

In this article we have covered the unittest module which provides a versatile
and powerful framework for testing Python code. With the examples above, you've
seen how to test functions, classes, exceptions, and more, including advanced
features like mocking and test suites. Start incorporating unit tests into your
projects to improve code quality and confidence.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Python tutorials](/python/).