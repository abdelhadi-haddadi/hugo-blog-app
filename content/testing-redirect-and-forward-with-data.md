+++
title = "Testing Redirect & Forward with Data"
date = 2025-08-29T20:11:43.864+01:00
draft = false
description = "Learn to build a Flask app with redirect and forward navigation, using data to show differences, tested with Selenium."
image = ""
imageBig = ""
categories = ["selenium"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Testing Redirect &amp; Forward with Data

last modified March 23, 2025

This guide builds a Flask app with redirect and forward navigation, using a
counter to show data handling differences.

## Redirect vs Forward

The difference between a redirect and a forward lies in how the
server and client handle navigation. A redirect instructs the client (usually a
browser) to make a new HTTP request to a different URL. This involves a round
trip, where the client temporarily pauses and accesses the new resource
directly, often resulting in a change in the browser's URL. 

In contrast, a **forward** happens entirely on the server-side,
where the server internally transfers processing to another resource (like a
different servlet or view) without the client being aware of the change. With a
forward, the URL in the browser remains the same, and the user does not notice
the internal routing, making it seamless and ideal for internal navigation.

## Introduction

Flask is a versatile Python web framework. Here, we explore redirect (new URL)
and forward (same URL, new content) navigation, tracking a counter to highlight
how data behaves in each case, tested with Selenium and unittest.

## Project Structure

The following lists the application structure.

redirect_forward_app/
├── requirements.txt    # Dependencies
├── run.py             # App entry point
├── app/
│   ├── __init__.py   # App factory
│   ├── routes.py     # Routes
│   └── templates/
│       ├── home.html # Home page
│       ├── redir.html # Redirect target
│       └── fwd.html  # Forward target
└── tests/
    └── test_navigation.py # Selenium tests

The structure is straightforward. The root holds
requirements.txt for dependencies and
run.py to launch the app. The app/
folder contains the core files, including templates for each
page with counter data.

The tests/ folder has
test_navigation.py for Selenium tests, verifying
how the counter behaves with redirect and forward. No
database is used, keeping the focus on navigation and data.

## Flask Application Setup

This run.py serves as the entry point to launch the Flask
application, utilizing the application factory pattern for instantiation.

run.py
  

from flask_pagination import create_app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

The run.py file is the primary executable for starting the Flask
application. It imports the create_app function from the
flask_pagination package and invokes it to instantiate the
application object. The app.run(debug=True)
command launches the development server with debugging enabled, facilitating
real-time error tracking and automatic reloading during development.

app/__init__.py
  

from flask import Flask, session

def create_app():

    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'simple-secret-for-testing'
    from . import routes
    app.register_blueprint(routes.bp)

    return app

The create_app function sets up the Flask app. It imports
session to store the counter across requests. The
SECRET_KEY is set for session security, essential for persisting
data like our counter.

The function registers a Blueprint from routes.py
to define endpoints. This minimal setup focuses on navigation and data handling,
avoiding unnecessary complexity for this demonstration.

## Home Template

The home.html template is the app's entry point, rendered at
/. 

app/templates/home.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Home&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Home Page&lt;/h1&gt;
    &lt;p&gt;Counter: {{ counter }}&lt;/p&gt;
    &lt;a href="{{ url_for('main.redirect_page') }}"&gt;Go to Redirect&lt;/a&gt;
    &lt;br&gt;
    &lt;a href="{{ url_for('main.forward_page') }}"&gt;Go to Forward&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;

It displays a heading, the current counter value
passed from the route, and links to trigger redirect and forward actions using
url_for.

The counter increments each time the home page is visited, stored in the
session. This setup lets us see how redirect (a new request) resets the counter,
while forward (same request) retains it, illustrating their data differences.

## Redirect Target Template

The redir.html template is the redirect's target, accessed at
/redir-target.

app/templates/redir.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Redirected Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;You've been redirected here!&lt;/h1&gt;
    &lt;p&gt;Counter: {{ counter }}&lt;/p&gt;
    &lt;a href="{{ url_for('main.home') }}"&gt;Back to Home&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;

It shows a message, the counter value,
and a link back to home. Since redirect triggers a new request, the counter
increments again here.

This behavior contrasts with forward, demonstrating that redirect involves a
full client-side navigation, resetting request-specific data unless explicitly
preserved (e.g., via session), which we'll test with Selenium.

## Forward Target Template

The fwd.html template is rendered for the forward action at
/forward.

app/templates/fwd.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Forwarded Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;You've been forwarded here!&lt;/h1&gt;
    &lt;p&gt;Counter: {{ counter }}&lt;/p&gt;
    &lt;a href="{{ url_for('main.home') }}"&gt;Back to Home&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;

It displays a message, the counter value, and a home link. Since
forward happens within the same request, the counter doesn't increment beyond
the home page's value.

This persistence of the counter in the same request
highlights the key difference from redirect, where a new
request triggers additional increments. The tests will
verify this distinction in data handling.

## Routes

The routes.py file defines the app's logic with
a Blueprint named main.

app/routes.py
  

from flask import Blueprint, render_template, redirect, url_for, session

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    counter = session.get('counter', 0) + 1
    session['counter'] = counter
    return render_template('home.html', counter=counter)

@bp.route('/redirect')
def redirect_page():
    return redirect(url_for('main.redirect_target'))

@bp.route('/forward')
def forward_page():
    counter = session.get('counter', 0)
    return render_template('fwd.html', counter=counter)

@bp.route('/redir-target')
def redirect_target():
    counter = session.get('counter', 0) + 1
    session['counter'] = counter
    return render_template('redir.html', counter=counter)

The / route increments a counter in the
session (starting at 0) and renders home.html
with that value. This sets the baseline for navigation.

The /redirect route uses redirect
to send the user to /redir-target, where the
counter increments again due to a new request.
/forward renders fwd.html directly,
using the existing counter without incrementing,
as it's the same request. These differences are key to
understanding redirect vs. forward.

## Selenium Tests

The test_navigation.py file tests navigation with
unittest and Selenium.

tests/test_navigation.py
  

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import threading
from app import create_app

class TestNavigation(unittest.TestCase):

    def setUp(self):

        self.app = create_app()

        self.client = self.app.test_client()
        self.server_thread = threading.Thread(
            target=self.app.run, kwargs={'port': 5000})
        self.server_thread.daemon = True
        self.server_thread.start()

        time.sleep(1)

        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()))
        self.driver.get('http://localhost:5000')

        time.sleep(1)

    def tearDown(self):
        self.driver.quit()

    def test_redirect(self):

        driver = self.driver
        WebDriverWait(driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.TAG_NAME, "body"), "Counter: 1"))
        driver.find_element(By.LINK_TEXT, "Go to Redirect").click()
        WebDriverWait(driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.TAG_NAME, "body"), "Counter: 2"))
        self.assertEqual(driver.current_url,
                         'http://localhost:5000/redir-target')
        self.assertIn("You've been redirected here!", driver.page_source)
        self.assertIn("Counter: 2", driver.page_source)

    def test_forward(self):

        driver = self.driver
        WebDriverWait(driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.TAG_NAME, "body"), "Counter: 1"))
        driver.find_element(By.LINK_TEXT, "Go to Forward").click()
        WebDriverWait(driver, 10).until(
            EC.text_to_be_present_in_element(
                (By.TAG_NAME, "body"), "Counter: 1"))
        self.assertEqual(driver.current_url, 'http://localhost:5000/forward')
        self.assertIn("You've been forwarded here!", driver.page_source)
        self.assertIn("Counter: 1", driver.page_source)

The setUp starts the Flask app in a thread on port 5000 and opens a
Chrome driver to /, where the counter begins at 1.
tearDown closes the driver.

test_redirect verifies that clicking "Go to Redirect" changes the
URL to /redir-target, increments the counter to 2 (new request),
and shows the expected content. test_forward checks that clicking
"Go to Forward" keeps the URL at /forward, retains the counter at 1
(same request), and displays the forward page's content.

## Running the App and Tests

Now we show how to run the app and the tests.

requirements.txt
  

flask
selenium
webdriver-manager

```
$ pip install -r requirements.txt
$ python run.py

```

To run tests:

$ python -m unittest tests/test_navigation.py -v

Install dependencies from requirements.txt using
pip, then start the app with python run.py. Run
tests with unittest and the -v flag
to see detailed output, confirming how redirect increments
the counter while forward preserves it.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
experience spanning many years. Since 2007, I have authored over 1400
programming articles and 8 e-books. Additionally, I possess more than eight
years of experience in teaching programming concepts.

List [all Python tutorials](/all/#python).