+++
title = "Python WebDriver"
date = 2025-08-29T20:11:11.655+01:00
draft = false
description = "Python WebDriver tutorial shows how to automate web browsers using WebDriver in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python WebDriver

last modified March 6, 2025

In this article, we show how to automate web browsers using WebDriver in Python.
WebDriver is a remote control interface that enables introspection and control
of user agents (i.e., web browsers). It provides a platform and language-neutral
wire protocol for out-of-process programs to remotely instruct the behavior of
web browsers.

The WebDriver specification defines a REST-like API for interacting with web
browsers. This REST API uses standard HTTP methods (GET, POST, DELETE) to
perform operations on browser sessions, elements on a webpage, and other
browser-related resources. Each operation is associated with a specific URL
endpoint, which the WebDriver client communicates with the WebDriver server
to execute commands and retrieve results.

ChromeDriver is a standalone server that implements the WebDriver protocol
for Google Chrome. It acts as a bridge between your test scripts written in
languages like Python, Java, etc., and the Chrome browser. When you run your
automated tests, ChromeDriver communicates with Chrome to execute the commands
and actions you've specified. It supports various features like headless mode,
mobile emulation, and more.

## Installing ChromeDriver

Before using WebDriver, you need to download ChromeDriver. You can download it
from the following link:

Download ChromeDriver
  

https://googlechromelabs.github.io/chrome-for-testing/#stable

Ensure that the version of ChromeDriver matches the version of your Chrome
browser. You can check the implementation status of ChromeDriver here:

ChromeDriver Status
  

https://chromium.googlesource.com/chromium/src/+/master/docs/chromedriver_status.md

## Get ChromeDriver Status

The following example demonstrates how to check the status of ChromeDriver
using the REST API.

main.py
  

import requests

def get_chrome_driver_status():
    url = "http://localhost:9515/status"

    try:
        response = requests.get(url)
        print(response)

        code = response.status_code

        if code == 200:
            print("OK - 200")
        else:
            print(f"Failed. HTTP Status Code: {code}")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while connecting to ChromeDriver: {e}")

if __name__ == "__main__":
    get_chrome_driver_status()

In this script, we use the requests library to interact directly
with ChromeDriver's REST API by sending an HTTP GET request to the
/status endpoint at http://localhost:9515/status. This
endpoint is provided by the ChromeDriver server, which must be running locally
on port 9515 (the default port) for this script to work—typically, you'd start
ChromeDriver manually via the command line (e.g., chromedriver)
before executing this code. The response object contains the
server's reply, which we inspect by printing it to see details like headers and
content.

We then extract the HTTP status code using response.status_code. A
status code of 200 indicates that ChromeDriver is operational and ready to
accept commands, while other codes (e.g., 404 or 500) suggest issues like the
server not running or misconfiguration. The try-except block
catches potential errors, such as network failures or ChromeDriver not being
active, and prints a descriptive message. This example is a simple diagnostic
tool to verify ChromeDriver's availability before running more complex
automation tasks.

## Get Webpage Title

This example shows how to retrieve the title of a webpage using the WebDriver
REST API.

main.py
  

import requests

def get_webpage_title(url):
    chromedriver_url = "http://localhost:9515"

    try:
        session_response = requests.post(f"{chromedriver_url}/session", json={
            "capabilities": {
                "alwaysMatch": {
                    "browserName": "chrome",
                    "goog:chromeOptions": {
                        "args": ["--headless"]
                    }
                }
            }
        })
        session_response.raise_for_status()
        session_data = session_response.json()
        session_id = session_data["value"]["sessionId"]

        print(f"Session created with ID: {session_id}")

        navigate_response = requests.post(
            f"{chromedriver_url}/session/{session_id}/url",
            json={"url": url}
        )
        navigate_response.raise_for_status()

        print(f"Navigated to: {url}")

        title_resp = requests.get(
            f"{chromedriver_url}/session/{session_id}/title",
        )
        title_resp.raise_for_status()
        title_data = title_resp.json()
        title = title_data["value"]

        print(f"The title of the webpage is: {title}")

        delete_session_response = requests.delete(
            f"{chromedriver_url}/session/{session_id}")
        delete_session_response.raise_for_status()

        print("Session deleted successfully.")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while interacting with ChromeDriver: {e}")

if __name__ == "__main__":
    target_url = "https://example.com/"
    get_webpage_title(target_url)

This script demonstrates how to use ChromeDriver's REST API to automate a
browser session and retrieve a webpage's title. It begins by sending a POST
request to /session to create a new browser session, specifying
Chrome as the browser and enabling headless mode (via --headless)
to run without a visible UI, which is ideal for automated testing on servers or
CI/CD pipelines. The response provides a sessionId, a unique
identifier for this session, which we extract and use in subsequent requests.
Next, a POST request to /session/{session_id}/url navigates the
browser to the target URL (e.g., https://example.com/), mimicking a
user entering the address. 

A GET request to /session/{session_id}/title then fetches the
page's title (e.g., "Example Domain"), which is returned in JSON format and
extracted from the "value" key. Finally, a DELETE request to
/session/{session_id} terminates the session, ensuring resources
are freed. Each request uses raise_for_status() to check for HTTP
errors (e.g., 404 or 500), and a try-except block catches broader
issues like network failures or ChromeDriver not running. Intermediate print
statements provide feedback on each step, making this a robust example of
session management and basic page interaction via the WebDriver protocol.

## Click a Button

This example demonstrates how to click a button on a webpage using WebDriver.

main.py
  

import requests

def click_button_on_page(url):
    chromedriver_url = "http://localhost:9515"

    try:
        session_response = requests.post(f"{chromedriver_url}/session", json={
            "capabilities": {
                "alwaysMatch": {
                    "browserName": "chrome",
                    "goog:chromeOptions": {
                        "args": ["--headless"]
                    }
                }
            }
        })
        session_response.raise_for_status()
        session_data = session_response.json()
        session_id = session_data["value"]["sessionId"]

        print(f"Session created with ID: {session_id}")

        navigate_response = requests.post(
            f"{chromedriver_url}/session/{session_id}/url",
            json={"url": url}
        )
        navigate_response.raise_for_status()

        print(f"Navigated to: {url}")

        find_element_response = requests.post(
            f"{chromedriver_url}/session/{session_id}/element",
            json={"using": "tag name", "value": "button"}
        )
        find_element_response.raise_for_status()
        element_data = find_element_response.json()
        button_element_id = element_data["value"]["element-6066-11e4-a52e-4f735466cecf"]

        print(f"Button element found with ID: {button_element_id}")

        click_response = requests.post(
            f"{chromedriver_url}/session/{session_id}/element/{button_element_id}/click",
            json={}
        )
        click_response.raise_for_status()

        print("Button clicked successfully.")

        delete_session_response = requests.delete(
            f"{chromedriver_url}/session/{session_id}")
        delete_session_response.raise_for_status()

        print("Session deleted successfully.")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while interacting with ChromeDriver: {e}")

if __name__ == "__main__":
    target_url = "https://webcode.me/click.html"
    click_button_on_page(target_url)

This script showcases how to locate and click a button on a webpage using
ChromeDriver's REST API in headless mode. It starts by creating a new Chrome
session with a POST request to /session, specifying
--headless to run invisibly, and retrieves the
sessionId for subsequent commands. 

The browser then navigates to https://webcode.me/click.html—a
simple test page with a button—via a POST request to /url. To find
the button, a POST request to
/element uses the "tag name" locator strategy with
"button" as the value, returning the first &lt;button&gt;
element's unique ID (e.g., element-6066-11e4-a52e-4f735466cecf),
which adheres to the WebDriver's element reference format. A POST request to
/element/{button_element_id}/click then simulates a mouse click on
the button, triggering any associated actions (e.g., a JavaScript event on the
test page). The session is cleaned up with a DELETE request to
/session/{session_id}. 

Error handling via raise_for_status() and a try-except
block ensures robustness, while print statements confirm each step. This example
highlights element interaction, though in practice, more specific locators
(e.g., ID or CSS selector) might be needed for complex pages with multiple
buttons.

## Take a Screenshot

This example shows how to take a screenshot of a webpage using WebDriver.

main.py
  

import requests
import base64

def get_webpage_screenshot(url):
    chromedriver_url = "http://localhost:9515"

    try:
        session_response = requests.post(f"{chromedriver_url}/session", json={
            "capabilities": {
                "alwaysMatch": {
                    "browserName": "chrome",
                    "goog:chromeOptions": {
                        "args": ["--headless"]
                    }
                }
            }
        })
        session_response.raise_for_status()
        session_data = session_response.json()
        session_id = session_data["value"]["sessionId"]

        print(f"Session created with ID: {session_id}")

        navigate_response = requests.post(
            f"{chromedriver_url}/session/{session_id}/url",
            json={"url": url}
        )
        navigate_response.raise_for_status()

        print(f"Navigated to: {url}")

        screenshot_response = requests.get(
            f"{chromedriver_url}/session/{session_id}/screenshot"
        )
        screenshot_response.raise_for_status()
        screenshot_data = screenshot_response.json()
        screenshot_base64 = screenshot_data["value"]

        with open("screenshot.png", "wb") as f:
            f.write(base64.b64decode(screenshot_base64))

        print("Screenshot saved as screenshot.png")

        delete_session_response = requests.delete(
            f"{chromedriver_url}/session/{session_id}")
        delete_session_response.raise_for_status()

        print("Session deleted successfully.")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while interacting with ChromeDriver: {e}")

if __name__ == "__main__":
    target_url = "https://example.com/"
    get_webpage_screenshot(target_url)

This script demonstrates capturing a webpage screenshot using ChromeDriver's
REST API in headless mode. It initiates a session with a POST request to
/session, configuring Chrome to run headlessly, and retrieves the
sessionId. The browser navigates to
https://example.com/ via a POST to /url, loading the
page invisibly. A GET request to /screenshot then captures the
visible viewport as a base64-encoded string, returned in the JSON response's
"value" key. 

The script decodes this string using base64.b64decode and writes it
to a file named screenshot.png in binary mode ("wb"),
creating a viewable PNG image in the working directory. The session is
terminated with a DELETE request to /session/{session_id}. Error
handling ensures the script fails gracefully if ChromeDriver isn't running or
network issues arise, while print statements track progress. This functionality
is particularly useful for visual testing, debugging, or archiving webpage
states, though the screenshot size depends on the headless browser's default
window dimensions.

## Maximize Browser Window

This example demonstrates how to maximize the browser window using WebDriver.

main.py
  

import requests
import time

def maximize_browser_window(url):
    chromedriver_url = "http://localhost:9515"

    try:
        session_response = requests.post(f"{chromedriver_url}/session", json={
            "capabilities": {
                "alwaysMatch": {
                    "browserName": "chrome",
                }
            }
        })
        session_response.raise_for_status()
        session_data = session_response.json()
        session_id = session_data["value"]["sessionId"]

        print(f"Session created with ID: {session_id}")

        navigate_response = requests.post(
            f"{chromedriver_url}/session/{session_id}/url",
            json={"url": url}
        )
        navigate_response.raise_for_status()

        print(f"Navigated to: {url}")

        time.sleep(5)

        maximize_response = requests.post(
            f"{chromedriver_url}/session/{session_id}/window/maximize",
            json={}
        )
        maximize_response.raise_for_status()

        print("Browser window maximized.")

        time.sleep(3)

        delete_session_response = requests.delete(
            f"{chromedriver_url}/session/{session_id}")
        delete_session_response.raise_for_status()

        print("Session deleted successfully.")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while interacting with ChromeDriver: {e}")

if __name__ == "__main__":
    target_url = "https://example.com/"
    maximize_browser_window(target_url)

This script illustrates how to maximize a Chrome browser window using the
WebDriver REST API, running in visible mode (no --headless flag).
It starts by creating a session with a POST to /session, obtaining
a sessionId, and navigates to https://example.com/
with a POST to /url. 

A time.sleep(5) pause allows the user to observe the initial window
size before maximization—useful for demonstration but optional in production.
The key action is a POST request to
/window/maximize, which resizes the browser to fill the screen,
simulating a user clicking the maximize button.

Another time.sleep(3) lets the maximized state be observed before
the session ends with a DELETE request to /session/{session_id}.
Error handling via raise_for_status() and try-except
ensures reliability, while print statements confirm each step. This
functionality is helpful for ensuring consistent viewport sizes in tests or
capturing full-page screenshots (if followed by a screenshot command), though
its effect is only visible in non-headless mode.

## Source

[WebDriver Documentation](https://developer.mozilla.org/en-US/docs/Web/WebDriver)

In this article, we have explored the basics of automating web browsers using
WebDriver in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).