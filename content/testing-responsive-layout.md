+++
title = "Testing Responsive Layout"
date = 2025-08-29T20:11:43.886+01:00
draft = false
description = "Python Flask tutorial shows how to create a responsive Holy Grail layout and test it with Selenium and unittest."
image = ""
imageBig = ""
categories = ["selenium"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Testing Responsive Layout

last modified March 23, 2025

This tutorial shows how to create a responsive Holy Grail layout with Flask and
CSS Grid, then test it using Selenium and unittest for layout and visibility.

## Introduction

Flask is a Python micro web framework used to build web apps. This guide
demonstrates a Holy Grail layout—a classic web design with a header, footer, two
sidebars, and main content—using CSS Grid. We'll test its responsiveness across
desktop, tablet, and mobile viewports.

## Project Structure

holy_grail_app/
├── app.py              # Flask app
├── static/
│   └── style.css       # CSS with Grid
├── templates/
│   └── home.html       # HTML layout
└── test/
    └── test_layout.py  # Selenium test

## Flask Application

The Flask app serves a single page with the Holy Grail
layout.

app.py
  

# holy_grail_app/app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)

This script serves as the entry point into the Flask web application. It
initializes the Flask instance 
app and defines a single route '/', which renders the
home.html template upon being accessed. When executed directly, the
application runs in debug mode on port 5001, offering enhanced
development and debugging capabilities. This foundational setup allows for easy
expansion and further customization of the web app.

## HTML Template

The HTML defines the layout structure. Save this as
templates/home.html.

templates/home.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Holy Grail Layout&lt;/title&gt;
    &lt;link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="grid-container"&gt;
        &lt;header class="header"&gt;Header&lt;/header&gt;
        &lt;aside class="left-sidebar"&gt;Left Sidebar&lt;/aside&gt;
        &lt;main class="main-content"&gt;Main Content&lt;/main&gt;
        &lt;aside class="right-sidebar"&gt;Right Sidebar&lt;/aside&gt;
        &lt;footer class="footer"&gt;Footer&lt;/footer&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

This HTML structure implements a webpage design using semantic elements and a
responsive grid layout. The main layout resides within a
&lt;div&gt; element with the class
grid-container, containing sections like
&lt;header&gt; for the title or navigation, two
&lt;aside&gt; elements for the left and right sidebars, a
&lt;main&gt; for the central content, and a
&lt;footer&gt; for footer details. Each section is semantically and
structurally defined with class names, ensuring clarity, accessibility, and
compatibility with CSS styling.

## CSS with Grid

CSS Grid creates the responsive layout. Save this as
static/style.css.

static/style.css
  

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.grid-container {
    display: grid;
    grid-template-areas:
        "header header header"
        "left-sidebar main-content right-sidebar"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.header {
    grid-area: header;
    background-color: #f1c40f;
    padding: 20px;
    text-align: center;
}

.left-sidebar {
    grid-area: left-sidebar;
    background-color: #2ecc71;
    padding: 20px;
}

.main-content {
    grid-area: main-content;
    background-color: #ecf0f1;
    padding: 20px;
}

.right-sidebar {
    grid-area: right-sidebar;
    background-color: #3498db;
    padding: 20px;
}

.footer {
    grid-area: footer;
    background-color: #e74c3c;
    padding: 20px;
    text-align: center;
}

@media (max-width: 1024px) {
    .grid-container {
        grid-template-areas:
            "header header"
            "main-content main-content"
            "left-sidebar right-sidebar"
            "footer footer";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto 1fr auto auto;
    }
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-areas:
            "header"
            "main-content"
            "left-sidebar"
            "right-sidebar"
            "footer";
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto auto auto;
    }
}

This CSS defines a responsive and structured grid layout for a webpage, ensuring
a clean and visually appealing design. The universal box-sizing rule simplifies
element dimension calculations by including padding and borders. The body style
eliminates default margins and applies a modern font for a polished appearance.
The .grid-container organizes content into named grid areas:
header, footer, sidebars, and main content, with specific rows and columns. Each
section is styled with unique background colors and padding, creating clear
visual separation. The layout spans the full viewport height 
(min-height: 100vh), ensuring full-page coverage regardless of content.

To enhance adaptability, media queries adjust the grid layout for different
screen sizes. At widths under 1024px, the layout shifts to two columns, stacking
the main content above the sidebars. Below 768px, the grid collapses into a
single-column layout, with all sections stacked vertically. This approach
ensures a user-friendly interface across devices, maintaining readability and
ease of navigation on smaller screens. It's a practical and efficient design for
responsive web development.

## Selenium Test

The test verifies layout and visibility across viewports.
Save this as test/test_layout.py.

test/test_layout.py
  

# holy_grail_app/test/test_layout.py
import unittest
from flask import url_for
from app import app as flask_app
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import threading
import time
from werkzeug.serving import make_server

class TestLayoutResponsiveness(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        flask_app.config['TESTING'] = True
        flask_app.config['SERVER_NAME'] = 'localhost:5001'
        cls.server = make_server('localhost', 5001, flask_app, threaded=True)
        cls.server_thread = threading.Thread(target=cls.server.serve_forever)
        cls.server_thread.daemon = False
        cls.server_thread.start()
        time.sleep(1)
        options = webdriver.ChromeOptions()
        cls.driver = webdriver.Chrome(options=options)

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server_thread.join(timeout=5)
        if cls.server_thread.is_alive():
            print("Warning: Server thread did not stop cleanly")
        cls.driver.quit()

    def setUp(self):
        self.driver.delete_all_cookies()

    def get_computed_style(self, selector, property_name):
        script = f"""
            const elem = document.querySelector('{selector}');
            return window.getComputedStyle(elem).getPropertyValue('{property_name}');
        """
        return self.driver.execute_script(script)

    def get_bounding_rect(self, selector):
        script = f"""
            const elem = document.querySelector('{selector}');
            const rect = elem.getBoundingClientRect();
            return {{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            }};
        """
        return self.driver.execute_script(script)

    def get_viewport_width(self):
        return self.driver.execute_script("return window.innerWidth;")

    def test_layout_responsiveness_and_visibility(self):

        driver = self.driver
        driver.get('http://localhost:5001/')
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "grid-container"))
        )

        viewports = [
            {"name": "Desktop", "width": 1280, "height": 800},
            {"name": "Tablet", "width": 800, "height": 600},
            {"name": "Mobile", "width": 400, "height": 600},
        ]

        elements = [
            {"selector": ".header", "name": "Header"},
            {"selector": ".left-sidebar", "name": "Left Sidebar"},
            {"selector": ".main-content", "name": "Main Content"},
            {"selector": ".right-sidebar", "name": "Right Sidebar"},
            {"selector": ".footer", "name": "Footer"},
        ]
        
        for vp in viewports:
            with self.subTest(viewport=vp["name"]):

                driver.execute_cdp_cmd('Emulation.setDeviceMetricsOverride', {
                    'width': vp["width"],
                    'height': vp["height"],
                    'deviceScaleFactor': 1,
                    'mobile': vp["width"] &lt;= 400
                })

                time.sleep(1)

                viewport_width = self.get_viewport_width()
                container_width = self.get_computed_style('.grid-container', 'width')
                header_width = self.get_computed_style('.header', 'width')
                left_width = self.get_computed_style('.left-sidebar', 'width')
                main_width = self.get_computed_style('.main-content', 'width')
                right_width = self.get_computed_style('.right-sidebar', 'width')
                footer_width = self.get_computed_style('.footer', 'width')
                header_grid = self.get_computed_style('.header', 'grid-area')
                left_grid = self.get_computed_style('.left-sidebar', 'grid-area')
                main_grid = self.get_computed_style('.main-content', 'grid-area')
                right_grid = self.get_computed_style('.right-sidebar', 'grid-area')
                footer_grid = self.get_computed_style('.footer', 'grid-area')

                if vp["name"] == "Desktop":
                    self.assertEqual(header_grid, 'header')
                    self.assertEqual(left_grid, 'left-sidebar')
                    self.assertEqual(main_grid, 'main-content')
                    self.assertEqual(right_grid, 'right-sidebar')
                    self.assertEqual(footer_grid, 'footer')
                    self.assertEqual(float(left_width[:-2]), 200)
                    self.assertEqual(float(right_width[:-2]), 200)
                    self.assertEqual(float(main_width[:-2]), viewport_width - 400)
                    self.assertEqual(float(header_width[:-2]), viewport_width)
                    self.assertEqual(float(footer_width[:-2]), viewport_width)

                elif vp["name"] == "Tablet":
                    self.assertEqual(header_grid, 'header')
                    self.assertEqual(main_grid, 'main-content')
                    self.assertEqual(left_grid, 'left-sidebar')
                    self.assertEqual(right_grid, 'right-sidebar')
                    self.assertEqual(footer_grid, 'footer')
                    expected_half = viewport_width / 2
                    self.assertAlmostEqual(float(left_width[:-2]), expected_half, delta=10)
                    self.assertAlmostEqual(float(right_width[:-2]), expected_half, delta=10)
                    self.assertEqual(float(main_width[:-2]), viewport_width)
                    self.assertEqual(float(header_width[:-2]), viewport_width)
                    self.assertEqual(float(footer_width[:-2]), viewport_width)

                elif vp["name"] == "Mobile":
                    self.assertEqual(header_grid, 'header')
                    self.assertEqual(main_grid, 'main-content')
                    self.assertEqual(left_grid, 'left-sidebar')
                    self.assertEqual(right_grid, 'right-sidebar')
                    self.assertEqual(footer_grid, 'footer')
                    self.assertEqual(float(header_width[:-2]), viewport_width)
                    self.assertEqual(float(main_width[:-2]), viewport_width)
                    self.assertEqual(float(left_width[:-2]), viewport_width)
                    self.assertEqual(float(right_width[:-2]), viewport_width)
                    self.assertEqual(float(footer_width[:-2]), viewport_width)

                for elem in elements:
                    display = self.get_computed_style(elem["selector"], 'display')
                    visibility = self.get_computed_style(elem["selector"], 'visibility')
                    self.assertNotEqual(display, 'none')
                    self.assertNotEqual(visibility, 'hidden')
                    rect = self.get_bounding_rect(elem["selector"])
                    self.assertGreater(rect['width'], 0)
                    self.assertGreater(rect['height'], 0)
                    self.assertGreaterEqual(rect['top'], 0)
                    self.assertLess(rect['top'] + rect['height'], vp['height'] + 100)
                    self.assertGreaterEqual(rect['left'], 0)
                    self.assertLess(rect['left'] + rect['width'], vp['width'] + 20)

                print(f"{vp['name']}: Container width={container_width}, "
                      f"Header={header_width}, Left={left_width}, "
                      f"Main={main_width}, Right={right_width}, Footer={footer_width}")

if __name__ == '__main__':
    unittest.main()

This Python test file verifies the responsiveness and visibility of a web
application's layout using unittest and Selenium. It sets up a
Flask test server configured on localhost:5001 
and initializes a Selenium WebDriver for automated browser testing. The
setUpClass and tearDownClass methods handle server and
WebDriver lifecycle management, while the setUp method ensures a
clean browser state by clearing cookies before each test.

The main focus is the test_layout_responsiveness_and_visibility
method, which validates the layout across multiple viewports: Desktop, Tablet,
and Mobile. Using Selenium, it dynamically adjusts browser dimensions and checks
CSS properties such as grid-area, width, and
display to ensure all elements are properly positioned and visible.
Custom helper methods like get_computed_style and
get_bounding_rect retrieve and validate element styles and
dimensions. This comprehensive test ensures the layout adapts correctly across
various screen sizes, maintaining both structure and functionality.

## Running the Application and Test

Install dependencies and run the app and test as follows.

$ pip install flask selenium
$ python holy_grail_app/app.py

For testing, ensure ChromeDriver is in your PATH, then run:

$ cd holy_grail_app
$ python -m unittest test.test_layout -v

In this article, we focused on testing the responsive layout of a Flask
application. The setup included a Python test file utilizing
unittest and Selenium for browser automation. A Flask test server
was initialized and run locally, serving as the foundation for layout
verification across multiple devices. Through detailed tests, the layout's
adaptability was validated using viewports corresponding to desktop, tablet, and
mobile environments. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
experience spanning many years. Since 2007, I have authored over 1400
programming articles and 8 e-books. Additionally, I possess more than eight
years of experience in teaching programming concepts.

List [all Python tutorials](/all/#python).