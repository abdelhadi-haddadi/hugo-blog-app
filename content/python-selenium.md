+++
title = "Python Selenium"
date = 2025-08-29T20:10:20.927+01:00
draft = false
description = "Python Selenium tutorial shows how to automate web application tests with Selenium framework in Python. Selenium is a portable framework for testing web applications."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Selenium

last modified January 29, 2024

Python Selenium tutorial shows how to automate web application tests with
Selenium framework in Python.

## Selenium

Selenium is a portable framework for testing web applications.
Selenium runs on Windows, Linux, and macOS.

*Selenium WebDriver* is a collection of open source APIs which are used
to automate the testing of a web application. There are specific drivers
for browsers including Chrome, Firefox, Opera, Microsoft Edge. These drivers
need to be dowloaded and placed on the PATH. Selenium WebDriver supports
different programming languages including Python, C#, and Java.

Selenium can be run in a full mode or in a headless mode. In the headless mode,
the browser is not started.

## Selenium drivers

We need to download the drivers for the browsers that we use from
[https://selenium-python.readthedocs.io/installation.html#drivers](https://selenium-python.readthedocs.io/installation.html#drivers).
The driver must be placed on the PATH such as /usr/bin/, /usr/local/bin/
or the current working directory.

## Python Selenium install

The selenium module is installed with the following command:

$ pip install selenium

This install the selenium module.

## Python Selenium Firefox example

For the Firefox browser, we download the we download the driver (geckodriver.exe for Windows) from
[https://github.com/mozilla/geckodriver/releases](https://github.com/mozilla/geckodriver/releases).

firefox_get_title_.py
  

#!/usr/bin/python

from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options

opts = Options()
opts.headless = True

driver = Firefox(options=opts)

try:

    driver.get('http://webcode.me')
    print(browser.title)
    assert 'My html page' == driver.title

finally:

    driver.quit()

In the example, we test a web page title with the Firefox's driver.

opts = Options()
opts.headless = True

driver = Firefox(options=opts)

We create a driver in a headless mode. The browser will not start.

try:

    driver.get('http://webcode.me')
    print(driver.title)
    assert 'My html page' == driver.title

We make a get request to the webcode.me page and get its title.
We make an assertion about the content's of the title.

finally:

    driver.quit()

In the end, we quit the driver.

## Python Selenium Chrome example

For the Chrome browser, we download the driver (chromedriver.exe for Windows) from
[sites.google.com/chromium.org/driver/](https://sites.google.com/chromium.org/driver/).

chrome_get_title.py
  

#!/usr/bin/python

from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options

opts = Options()
opts.headless = True

driver = Chrome(options=opts, executable_path='chromedriver.exe')

try:
    driver.get('http://webcode.me')

    assert 'My html page!' == driver.title

finally:

    driver.quit()

In this example, we use the Chrome browser.

driver = Chrome(options=opts, executable_path='chromedriver.exe')

We create an instance of the Chrome driver. The executable_path
points to the executable; if not specified, it assumes the executable is in
the PATH.

assert 'My html page!' == driver.title

We added an additional explamation mark, so the test will fail.

&gt; py chrome_get_title.py

DevTools listening on ws://127.0.0.1:61178/devtools/browser/14d2fd68-eb2a-415a-9bf0-53a0f7b388d6
My html page
Traceback (most recent call last):
  File "chrome_get_title.py", line 19, in &lt;module&gt;
    assert 'My html page!' == driver.title
AssertionError

## Python Selenium page source

The page_source property gets the source of the current page.

page_source.py
  

#!/usr/bin/python

from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options

opts = Options()
opts.headless = True

driver = Firefox(options=opts)

try:

    driver.get('http://webcode.me')
    title = driver.title
    content = driver.page_source

    print(content)

    assert title == 'My html page'
    assert 'Today is a beautiful day' in content

finally:

    driver.quit()

In the example, we test for a title and for a specifiec text in the page source.

## Python Selenium find elements

We can use methods such as find_elements_by_tag_name,
find_element_by_id, or find_elements_by_class_name
to locate the HTML elements and get their content.

get_paragraphs.py
  

#!/usr/bin/python

from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options

opts = Options()
opts.headless = True

driver = Firefox(options=opts)

try:

    driver.get('http://webcode.me')

    els = driver.find_elements_by_tag_name("p")

    for el in els:
        print(el.text)

finally:

    driver.close()

In the example, we get and print the text of the two paragraphs on the
webcode.me home page.

els = driver.find_elements_by_tag_name("p")

We find the p tags by using the find_elements_by_tag_name
method.

for el in els:
    print(el.text)

We go through the list of the elements and print their contents with the
text property.

&gt; py get_paragraphs.py
Today is a beautiful day. We go swimming and fishing.
Hello there. How are you?

## Python Selenium alert box

In the following example we show how to test for a JavaScript alert box.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Test page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;button id="mybtn" onclick="alert('Hello there!')"&gt;
        Click
    &lt;/button&gt;

&lt;/body&gt;
&lt;/html&gt;

We have an HTML page with a button. When we click on the button, an alert box
appears.

alert_box.py
  

#!/usr/bin/python

import time
from pathlib import Path

from selenium.common.exceptions import TimeoutException
from selenium.webdriver import Firefox
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait

myfile = Path.cwd() / "index.html"
driver = Firefox()

try:
    driver.get(f'file://{myfile}')
    button = driver.find_element_by_id("mybtn")
    button.click()
    time.sleep(2)

    try:
        WebDriverWait(driver, 3).until(ec.alert_is_present(),
                                       'Timed out waiting for confirmation popup to appear')

        alert = driver.switch_to.alert
        assert alert.text == 'Hello there!'

        alert.accept()
        print("alert accepted")

    except TimeoutException:
        print("no alert")

    time.sleep(5)
finally:

    driver.quit()

In the example, we click on a button element and check for the text
of the alert box.

try:
    driver.get(f'file://{myfile}')
    button = driver.find_element_by_id("mybtn")
    button.click()
    time.sleep(2)

We load a file on the disk, find the button element and click on it. In this
example, the browser appears; therefore, we sleep for 2 s so that we can see
what is happening.

WebDriverWait(driver, 3).until(ec.alert_is_present(),
                               'Timed out waiting for confirmation popup to appear')

With WebDriverWait, we wait 3 seconds for the alert to appear.
If the box does not appear, we provide an error message.

alert = driver.switch_to.alert
assert alert.text == 'Hello there!'

We check the text of the alert box.

## Python Selenium unittest example

The unittest is a Python unit testing framework. It is a Python
language version of JUnit, which is the original unit testing framework for the
Java programming language. The unittest supports test automation,
sharing of setup and shutdown code for tests, aggregation of tests into
collections, and independence of the tests from the reporting framework.

The unittest provides a base class, TestCase, which
may be used to create new test cases. The setUp is a hook method
for setting up the test fixture before exercising it and the tearDown
is a hook method for deconstructing the test fixture after testing it.

A test fixture represents the preparation needed to perform one or
more tests, and any associated cleanup actions. This may involve, for example,
creating temporary or proxy databases, directories, or starting a server
process. A test case is the test function which refers to the
individual test. The name of the function must begin with test.
The checks are performed with various assertion methods, such
as assertIn, assertTrue, or assertEqual.

A test suite is a collection of test cases, test
suites, or both. It is used to aggregate tests that should be executed together.
A test runner is a component which orchestrates the execution of
tests and provides the outcome to the user. The runner may use a graphical
interface, a textual interface, or return a special value to indicate the
results of executing the tests. The unittest, pytest
and nose are examples of Python test runners.

unittest_example.py
  

#!/usr/bin/python

import unittest

from selenium import webdriver
from selenium.webdriver.firefox.options import Options

class WebCode(unittest.TestCase):

    def setUp(self):
        opts = Options()
        opts.headless = True

        self.driver = webdriver.Firefox(options=opts)

    def test_title(self):

        self.driver.get("http://webcode.me")
        self.assertIn("My html page", self.driver.title)

    def test_paragraphs(self):

        self.driver.get("http://webcode.me")

        els = self.driver.find_elements_by_tag_name("p")

        self.assertIn('Today is a beautiful day', els[0].text)
        self.assertIn('Hello there', els[1].text)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()

We have a test file, where we check for the title and paragraphs of the
webcode.me home page.

def setUp(self):
    opts = Options()
    opts.headless = True

    self.driver = webdriver.Firefox(options=opts)

In the setUp method, we set up the Firefox driver.

def test_title(self):

    self.driver.get("http://webcode.me")
    self.assertIn("My html page", self.driver.title)

The test_title method is a single test case, which checks for
the title of the specified web page using the assertIn method.

def test_paragraphs(self):

    self.driver.get("http://webcode.me")

    els = self.driver.find_elements_by_tag_name("p")

    self.assertIn('Today is a beautiful day', els[0].text)
    self.assertIn('Hello there', els[1].text)

In the test_paragraphs test case, we check for the content
of the two paragraphs.

def tearDown(self):
    self.driver.close()

In the tearDown method, we close the driver.

if __name__ == "__main__":
    unittest.main()

With the main method, we execute the tests.

&gt; py unittest_example.py
..
----------------------------------------------------------------------
Ran 2 tests in 13.273s

OK

We run the tests. The unittest shows a dot for a successfully
executed test case and F for a failed one, and E for an error that occurred
during the execution of the test.

## Python Selenium with pytest

The pytest module is a Python library for testing Python
applications. It is an alternative to nose and unittest.

$ pip install pytest

We install the pytest library.

The pytest looks for test_*.py or *_test.py
files in directories. In the selected files, pytest
looks for test prefixed test functions outside of class and test prefixed
test methods inside Test prefixed test classes
(without an __init__ method).

tests/test_web.py
  

#!/usr/bin/python

import pytest

from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options

@pytest.fixture
def browser():

    opts = Options()
    opts.headless = True
    driver = Firefox(options=opts)

    driver.implicitly_wait(5)

    yield driver

    # For cleanup, quit the driver
    driver.quit()

def test_get_title(browser):
    browser.get("http://webcode.me")

    assert 'My html page' == browser.title

The example shows a simple test case with the pytest module.

@pytest.fixture
def browser():

    opts = Options()
    opts.headless = True
    driver = Firefox(options=opts)
...

We define a fixture. It sets up the Firefox driver.

driver.implicitly_wait(5)

We wait implicitly for elements to be ready before attempting interactions.

yield driver

With the yield keyword, we return the driver 
object at the end of setup.

def test_get_title(browser):
    browser.get("http://webcode.me")

    assert 'My html page' == browser.title

We have a test method which checks the title of a web page. It receives 
the brower fixture as a parameter.

&gt; pytest
============================== test session starts ==============================
platform win32 -- Python 3.8.1, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: C:\Users\Jano\Documents\python\SeleniumPytest
collected 1 item

tests\test_web.py .                                                        [100%]

=============================== 1 passed in 6.31s ===============================

We run the tests.

## Python Selenium Flask example

In the next example, we create a test case with pytest and 
Selenium for a Flask web application. We test for a response from an HTML form.

app.py
├───static
│       greet.html
├───templates
│       index.html
└───tests
        web_test.py

This is the project structure.

static/greet.html
  

&lt;!doctype html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Greet form&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;p&gt;Enter your name:&lt;/p&gt;

    &lt;form id="myform" action="greet"&gt;

        &lt;input name="name" type="text"&gt;
        &lt;button type="submit"&gt;Submit&lt;/button&gt;

    &lt;/form&gt;

&lt;/body&gt;

&lt;/html&gt;

We have a greet form in the static resources. The form sends a text value 
to the Flask application.

templates/index.html
  

&lt;!doctype html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Greeting&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;p&gt;
        Hello {{ name }}
    &lt;/p&gt;
&lt;/body&gt;

&lt;/html&gt;

This is the Flask template file, which returns a message back to the client.

app.py
  

#!/usr/bin/python

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def home():
    return app.send_static_file('greet.html')

@app.route("/greet")
def greet():
    username = request.args.get('name')
    return render_template('index.html', name=username)

if __name__ == "__main__":
    app.run()

The Flask application has two routes: one for the home page and one for 
the greeting.

tests/web_test.py
  

#!/usr/bin/python

import pytest

from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.wait import WebDriverWait

@pytest.fixture
def browser():
    opts = Options()
    opts.headless = True
    driver = Firefox(options=opts)

    driver.implicitly_wait(10)

    yield driver

    # For cleanup, quit the driver
    driver.quit()

def test_greet_form(browser):
    user_name = "John"

    browser.get('http://localhost:5000/')

    form = browser.find_element_by_id("myform")
    name = browser.find_element_by_name("name")
    name.send_keys(user_name)

    form.submit()

    WebDriverWait(browser, 12).until(ec.url_matches('/greet'),
                                     'Timed out waiting for response')

    content = browser.page_source
    print(content)
    assert 'Hello John' in content

The web_test.py contains a test case for the greet form.

def test_greet_form(browser):
    user_name = "John"

    browser.get('http://localhost:5000/')
...

First, we get the greet form. 

form = browser.find_element_by_id("myform")
name = browser.find_element_by_name("name")
name.send_keys(user_name)

form.submit()

We retrieve the elements of the form. We add the test user name to the 
input tag and submit the form.

WebDriverWait(browser, 12).until(ec.url_matches('/greet'),
                                 'Timed out waiting for response')

We waint for the Flask to redirect to the /greet route. 

content = browser.page_source
print(content)
assert 'Hello John' in content

We get the response and check for the message in the response.

&gt; set FLASK_APP=app.py
&gt; flask run

We run the Flask application.

&gt; pytest
========================== test session starts ===========================
platform win32 -- Python 3.8.1, pytest-5.3.5, py-1.8.1, pluggy-0.13.1
rootdir: C:\Users\Jano\PycharmProjects\SeleniumPytestFlask
collected 1 item

tests\web_test.py .                                                 [100%]

=========================== 1 passed in 12.44s ===========================

From a different shell, we execute the pytest.

## Source

[Selenium with Python](https://selenium-python.readthedocs.io/)

In this article we have worked wit the Python Selenium framework.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).