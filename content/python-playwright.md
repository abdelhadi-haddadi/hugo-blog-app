+++
title = "Python Playwright"
date = 2025-08-29T20:09:54.551+01:00
draft = false
description = "Python Playwright tutorial shows how to automate browsers in Python with Playwright."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Playwright

last modified January 29, 2024

In this article we show how to automate browsers in Python with Playwright.

## Playwright

Playwright is a cross-broser automation library created by Microsoft. It
supports all modern rendering engines including Chromium, WebKit, and
Firefox.

Playwright can be used in Node, Python, .NET and JVM.

Playwright allows to use a browser in a headless mode (the default mode), which
works without the UI. This is great for scripting.

$ pip install --upgrade pip
$ pip install playwright
$ playwright install

We install Playwright library and the browser drivers.

## Python Playwright get title

In the first example, we get the title of a web page.

main.py
  

#!/usr/bin/python

from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:

    webkit = playwright.webkit

    browser = webkit.launch()
    page = browser.new_page()

    url = 'http://webcode.me'
    page.goto(url)

    title = page.title()
    print(title)

    browser.close()

The example retrieves and prints the title of a small webpage.

from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:
...

We use Playwright in a synchronous manner.

webkit = playwright.webkit

We use the Webkit driver.

browser = webkit.launch()
page = browser.new_page()

We launch the browser and create a new page. The default browser mode is
headless; that is, no UI is shown.

url = 'http://webcode.me'
page.goto(url)

We navigate to the specified URL.

title = page.title()
print(title)

We get the title and print it.

$ ./main.py
My html page

## Python Playwright create screenshot

In the following example we create a screenshot of a web page.

main.py
  

#!/usr/bin/python

from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:

    webkit = playwright.webkit
    browser = webkit.launch()
    page = browser.new_page()

    url = 'http://webcode.me'
    page.goto(url)

    page.screenshot(path='shot.png')
    browser.close()

The screenshot is created with the screenshot function; the
path attribute specifies the file name.

## Python Playwright async example

The next example is an asynchronous version of the previous one.

main.py
  

#!/usr/bin/python

import asyncio

from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as playwright:

        webkit = playwright.webkit
        browser = await webkit.launch()
        page = await browser.new_page()

        url = 'http://webcode.me'
        await page.goto(url)
        await page.screenshot(path='shot.png')

        await browser.close()

asyncio.run(main())

For the asynchronous version, we use the async/await keywords and 
the asyncio module.

## Python Playwright set HTTP headers

With the set_extra_http_headers function, we can specify HTTP 
headers for the client.

main.py
  

#!/usr/bin/python

from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:

    webkit = playwright.webkit
    browser = webkit.launch()
    page = browser.new_page()

    page.set_extra_http_headers({"User-Agent": "Python program"})

    url = 'http://webcode.me/ua.php'
    page.goto(url)

    content = page.text_content('*')
    print(content)

    browser.close()

We set the User-Agent header to the request and navigate to the
http://webcode.me/ua.php URL, which returns the User-Agent header
back to the client.

$ ./main.py 
Python program

## Python Playwright click on element

In the next example, we click on the button element with
click. After clicking on the button, a text message is displayed 
in the output div element.

main.py
  

#!/usr/bin/python

import time
from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:

    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    page = browser.new_page()

    url = 'http://webcode.me/click.html'
    page.goto(url)

    time.sleep(2)

    btn = page.locator('button');
    btn.click()

    output = page.locator('#output');
    print(output.text_content())

    time.sleep(1)

    browser.close()

The example starts the browser.

browser = webkit.launch(headless=False)

To start the UI, we set the headless option to
False.

time.sleep(2)

We slow down the program a bit. 

btn = page.locator('button');
btn.click()

We locate the button element with locator and click on it with
click.

output = page.locator('#output');
print(output.text_content())

We locate the output element and get its text content.

$ ./main.py
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 ...

## Python Playwright locating elements

In the next example, we find elements with locator.

main.py
  

#!/usr/bin/python

from playwright.sync_api import sync_playwright

with sync_playwright() as playwright:

    webkit = playwright.webkit
    browser = webkit.launch()
    page = browser.new_page()

    url = 'http://webcode.me/os.html'
    page.goto(url)

    els = page.locator('ul li').all();

    for e in els:
        print(e.text_content())

    browser.close()

The program finds all li tags and prints their content.

$ ./main.py
Solaris
FreeBSD
Debian
NetBSD
Windows

## Source

[Python Playwright documentation](https://playwright.dev/python/docs/intro)

In this article we have worked with the Python Playwright library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).