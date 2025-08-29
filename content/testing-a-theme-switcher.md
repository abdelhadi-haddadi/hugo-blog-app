+++
title = "Testing a Theme Switcher"
date = 2025-08-29T20:11:45.084+01:00
draft = false
description = "A comprehensive guide to developing a Flask application with a theme switcher, tested using Selenium with Chrome Developer Tools integration."
image = ""
imageBig = ""
categories = ["selenium"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Testing a Theme Switcher

last modified March 22, 2025

This tutorial provides a detailed walkthrough for constructing a Flask
application featuring a theme switcher, tested with Selenium and integrated with
Chrome Developer Tools. The app includes a toggle switch to alternate between
light and dark themes, with Selenium tests verifying the DOM changes and
visually displaying the Developer Tools during execution.

## Project Structure

The following describes the structure of the application.

theme_app/
├── app.py              # Flask app
├── static/
│   └── style.css       # CSS for themes and toggle
├── templates/
│   └── home.html       # Home page with toggle
└── test/
    ├── __init__.py     # Makes test/ a package
    └── test_app.py     # Selenium tests with DevTools

## Set Up the Flask Application

The application is a simple Flask app that serves a single page with a theme
toggle switch. The toggle uses JavaScript to switch between light and dark
themes, applying CSS classes to the &lt;body&gt; element. Selenium
tests launch the app in a separate thread, interact with the toggle, and use the
Chrome DevTools Protocol (CDP) to inspect DOM changes, opening the Developer
Tools for visual confirmation.

### Flask Application

This script defines the Flask application and its single route.

app.py
  

# theme_app/app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)

The app.py file initializes a Flask application and defines a
single route (/) that renders the home.html template.
The app.run(debug=True) command starts the development server with
debugging enabled, allowing real-time feedback during development.

### HTML Template

This template includes the theme toggle switch and JavaScript for theme switching.

templates/home.html
  

&lt;!-- theme_app/templates/home.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Theme Switcher App&lt;/title&gt;
    &lt;link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="container"&gt;
        &lt;h1&gt;Welcome to Theme Switcher&lt;/h1&gt;
        &lt;p&gt;Toggle the switch below to change themes.&lt;/p&gt;
        
        &lt;!-- Toggle Switch --&gt;
        &lt;label class="switch"&gt;
            &lt;input type="checkbox" id="theme-toggle"&gt;
            &lt;span class="slider round"&gt;&lt;/span&gt;
        &lt;/label&gt;
        &lt;span class="label-text"&gt;Light/Dark Mode&lt;/span&gt;
    &lt;/div&gt;

    &lt;script&gt;
        const toggle = document.getElementById('theme-toggle');
        const body = document.body;

        // Load saved theme from localStorage
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-theme');
            toggle.checked = true;
        }

        // Toggle theme on click
        toggle.addEventListener('change', () =&gt; {
            body.classList.toggle('dark-theme');
            const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

The home.html template creates a page with a heading, a paragraph,
and a toggle switch styled with CSS from style.css. The JavaScript
checks localStorage for a saved theme on load and applies the
dark-theme class to &lt;body&gt; if set to 'dark'.
Clicking the toggle switches the class and updates localStorage,
enabling theme persistence.

### CSS

This CSS file styles the toggle and defines the light and dark themes.

static/style.css
  

/* theme_app/static/style.css */
body {
    font-family: Arial, sans-serif;
    transition: background-color 0.3s, color 0.3s;
    margin: 0;
    padding: 0;
}

/* Light theme (default) */
body {
    background-color: #f0f0f0;
    color: #333;
}

/* Dark theme */
body.dark-theme {
    background-color: #333;
    color: #f0f0f0;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    text-align: center;
}

/* Toggle Switch Styles */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    vertical-align: middle;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #2196F3;
}

input:checked + .slider:before {
    transform: translateX(26px);
}

.label-text {
    margin-left: 10px;
    font-size: 16px;
}

The style.css file defines styles for the light theme
(#f0f0f0 background) and dark theme (#333 background)
with smooth transitions. It also styles the toggle switch, using a hidden
checkbox and a sliding .slider element that changes color and
position when checked.

## Selenium Unit Tests

This module contains Selenium-based unit tests to validate the theme switcher,
opening Chrome Developer Tools during execution.

test/test_app.py
  

# theme_app/test/test_app.py
import unittest
from flask import url_for
from app import app as flask_app
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import threading
import time
from werkzeug.serving import make_server

class TestThemeSwitcher(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Configure Flask app
        flask_app.config['TESTING'] = True
        flask_app.config['SERVER_NAME'] = 'localhost:5001'
        
        # Start Flask server in a separate thread with explicit stop capability
        cls.server = make_server('localhost', 5001, flask_app, threaded=True)
        cls.server_thread = threading.Thread(target=cls.server.serve_forever)
        cls.server_thread.daemon = False  # Non-daemon for explicit control
        cls.server_thread.start()
        
        # Wait for server to start
        time.sleep(1)
        
        # Set up Selenium WebDriver (using Chrome) with DevTools capabilities
        options = webdriver.ChromeOptions()
        # Ensure NOT headless so we can see DevTools
        # options.add_argument('--headless')  # Comment this out
        options.add_argument('--auto-open-devtools-for-tabs')  # Auto-open DevTools (optional)
        cls.driver = webdriver.Chrome(options=options)
        
        # Enable DevTools DOM domain
        cls.driver.execute_cdp_cmd('DOM.enable', {})
        
    @classmethod
    def tearDownClass(cls):
        # Disable DOM domain and clean up Selenium
        cls.driver.execute_cdp_cmd('DOM.disable', {})
        cls.driver.quit()
        
        # Explicitly stop the Flask server
        cls.server.shutdown()
        cls.server_thread.join(timeout=5)  # Wait for thread to finish, max 5s
        if cls.server_thread.is_alive():
            print("Warning: Server thread did not stop cleanly")
        
    def setUp(self):
        # Reset browser state before each test
        self.driver.delete_all_cookies()
        self.client = flask_app.test_client()
        
    def test_home_page_basic(self):
        """Test the home page for status code and basic content"""
        response = self.client.get('/')
        
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"&lt;title&gt;Theme Switcher App&lt;/title&gt;", response.data)
        self.assertIn(b'&lt;input type="checkbox" id="theme-toggle"&gt;', response.data)
        self.assertIn(b"body.classList.toggle('dark-theme')", response.data)
        
    def test_theme_switching(self):
        """Test theme switching by inspecting DOM elements and showing DevTools"""
        driver = self.driver
        driver.get('http://localhost:5001/')
        
        # Wait for the label (which wraps the toggle) to be clickable
        toggle_label = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "switch"))
        )
        
        # Open Developer Tools using keyboard shortcut (Ctrl+Shift+I)
        actions = ActionChains(driver)
        actions.key_down(Keys.CONTROL).key_down(Keys.SHIFT).send_keys('i')\
               .key_up(Keys.SHIFT).key_up(Keys.CONTROL).perform()
        time.sleep(1)  # Give DevTools a moment to open
        
        # Get the document node ID for the root (HTML document)
        document = driver.execute_cdp_cmd('DOM.getDocument', {})
        root_node_id = document['root']['nodeId']
        
        # Query the &lt;body&gt; element using DOM.querySelector
        body_node = driver.execute_cdp_cmd('DOM.querySelector', {
            'nodeId': root_node_id,
            'selector': 'body'
        })
        body_node_id = body_node['nodeId']
        
        # Get initial attributes of &lt;body&gt; (should not have dark-theme)
        initial_attributes = driver.execute_cdp_cmd('DOM.getAttributes', {'nodeId': body_node_id})
        initial_classes = initial_attributes.get('attributes', [])
        class_index = initial_classes.index('class') + 1 if 'class' in initial_classes else -1
        initial_class_value = initial_classes[class_index] if class_index &gt;= 0 else ''
        self.assertNotIn('dark-theme', initial_class_value)
        
        # Check initial background color for confirmation
        body = driver.find_element(By.TAG_NAME, 'body')
        initial_bg = driver.execute_script(
            "return window.getComputedStyle(arguments[0]).backgroundColor", body
        )
        self.assertEqual(initial_bg, 'rgb(240, 240, 240)')  # #f0f0f0
        
        # Click the label to toggle the theme (DevTools should show the change)
        toggle_label.click()
        
        # Wait for theme transition and let you see it in DevTools
        time.sleep(2)  # Increased to give you time to observe
        
        # Get updated attributes of &lt;body&gt; (should now have dark-theme)
        dark_attributes = driver.execute_cdp_cmd('DOM.getAttributes', {'nodeId': body_node_id})
        dark_classes = dark_attributes.get('attributes', [])
        dark_class_index = dark_classes.index('class') + 1 if 'class' in dark_classes else -1
        dark_class_value = dark_classes[dark_class_index] if dark_class_index &gt;= 0 else ''
        self.assertIn('dark-theme', dark_class_value)
        
        # Check dark theme background color
        dark_bg = driver.execute_script(
            "return window.getComputedStyle(arguments[0]).backgroundColor", body
        )
        self.assertEqual(dark_bg, 'rgb(51, 51, 51)')  # #333
        
        # Toggle back to light (DevTools should update)
        toggle_label.click()
        time.sleep(2)  # Increased to give you time to observe
        
        # Get final attributes of &lt;body&gt; (should not have dark-theme again)
        light_attributes = driver.execute_cdp_cmd('DOM.getAttributes', {'nodeId': body_node_id})
        light_classes = light_attributes.get('attributes', [])
        light_class_index = light_classes.index('class') + 1 if 'class' in light_classes else -1
        light_class_value = light_classes[light_class_index] if light_class_index &gt;= 0 else ''
        self.assertNotIn('dark-theme', light_class_value)
        
        # Check light theme background color again
        light_bg = driver.execute_script(
            "return window.getComputedStyle(arguments[0]).backgroundColor", body
        )
        self.assertEqual(light_bg, 'rgb(240, 240, 240)')
        
        # Optional: Keep browser open longer to inspect DevTools
        time.sleep(3)

if __name__ == '__main__':
    unittest.main()

 
The test_app.py module uses Selenium to test a Flask theme
switcher app. In setUpClass, the Flask app is configured to run on
port 5001 in a thread using werkzeug.serving.make_server for
explicit stop control. A non-headless Chrome instance is initialized with
optional DevTools auto-opening, and the DOM domain is enabled via CDP.
tearDownClass disables the DOM domain, closes the browser, and
explicitly stops the server thread with shutdown and
join. 

 

 
The test_home_page_basic test uses Flask's test client to verify
the page's status code and content, checking for the title, toggle checkbox, and
theme-switching script. The test_theme_switching test opens
DevTools with Ctrl+Shift+I, checks the initial light theme (no
dark-theme class, #f0f0f0 background), toggles to dark
(verifies dark-theme class and #333 background), and
toggles back to light, pausing to allow inspection in DevTools. 

## Requirements

Specify the required Python packages in a requirements.txt file
(optional but recommended):

requirements.txt
  

flask
selenium

Install the dependencies using the following command:

pip install -r requirements.txt

## Running the Application

To run the application manually, navigate to the theme_app
directory and execute:

flask run

Access the app at http://localhost:5000 to interact with the theme
switcher manually.

To run the tests, navigate to the theme_app directory and execute:

python -m unittest test.test_app -v

The tests launch the Flask app, open Chrome with DevTools, perform the theme
switching tests, and allow visual inspection of the DOM changes in the Elements
tab before closing.

In this article, we have created a Flask application with a theme switcher and
written unit tests using Selenium to verify the functionality, integrating
Chrome Developer Tools for visual debugging.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
experience spanning many years. Since 2007, I have authored over 1400
programming articles and 8 e-books. Additionally, I possess more than eight
years of experience in teaching programming concepts.

List [all Python tutorials](/all/#python).