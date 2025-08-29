+++
title = "Puppeteer tutorial"
date = 2025-08-29T20:01:35.824+01:00
draft = false
description = "Explore how to automate browsers using Puppeteer, with practical examples and detailed explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Puppeteer tutorial

last modified last modified October 18, 2023

 

In this article we show how to automate browsers using the puppeteer library.

## Puppeteer

Puppeteer is a Node library which provides a high-level API to
control Chromium or Chrome over the DevTools Protocol.

Puppeteer allows to use a browser in a headless mode (the default mode), which
works without the UI. This is great for scripting.

$ npm i puppeteer

We install Puppeteer with npm i puppeteer command.

## Puppeteer get content

In the first example, we get the content of a page.

app.js
  

const puppeteer = require('puppeteer');

(async () =&gt; {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://webcode.me');

    const res = await page.content();
    console.log(res);

    await browser.close();
})();

The example starts the browser in a headless mode, goes to the
webcode.me webpage and retrieves its content.

const puppeteer = require('puppeteer');

We load the puppeteer library.

const browser = await puppeteer.launch();

A Browser is created when Puppeteer connects to a Chromium instance, either
through launch or connect function. The
launch function takes a set of optional parameters. By default, the
browser is started in headless mode.

const page = await browser.newPage();

The newPage function creates a new page in a default browser
context.

await page.goto('http://webcode.me');

With goto, we navigate to the given URL.

const res = await page.content();

The content function gets the full HTML contents of the page,
including the doctype.

await browser.close();

In the end, we close the browser.

## Puppeteer create screenshot

In the next example, we create a screenshot of a webpage. 

app.js
  

const puppeteer = require('puppeteer');

(async () =&gt; {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://webcode.me');
  await page.screenshot({ path: 'webcode.png' });

  await browser.close();
})();

A screenshot is created with the page.screenshot function.

## Puppeteer create PDF file

In the following example, we genearate a PDF file from a webpage.

app.js
  

const puppeteer = require('puppeteer');

(async () =&gt; {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://webcode.me');
  await page.pdf({ path: 'webcode.pdf', format: 'a5' });

  await browser.close();
})();

The example generates a PDF file with the page.pdf function.
We choose the a5 format.

## Puppeteer device emulation

We can emulate a specific device with the emulate function.

app.js
  

const puppeteer = require('puppeteer');

(async () =&gt; {

  const options = {
    headless: false,
    slowMo: 100
  };

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  const device = puppeteer.devices['iPhone X'];
  await page.emulate(device);
  
  await page.goto('http://webcode.me');

  const res = await page.content()
  await page.waitForTimeout(5000);
  console.log(res);

  await browser.close()
})();

In the example, we emulate an iPhone device.

const options = {
     headless: false,
     slowMo: 100
};

const browser = await puppeteer.launch(options);

We pass the launch function some options. We turn off the headless
mode and slow down the automation a bit.

const device = puppeteer.devices['iPhone X'];
await page.emulate(device);

We choose a device and emulate it.

const res = await page.content()
await page.waitForTimeout(5000);
console.log(res);

Before we output the contents of the webpage, we pause the execution of the
script with waitForTimeout; the sleep time is given in
milliseconds.

## Puppeteer link click

The click function fetches an element with the given selector,
scrolls it into view if needed, and then uses page.mouse to click
in the center of the element.

app.js
  

const puppeteer = require('puppeteer');

const run = async () =&gt; {

    const options = { headless: false };
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.goto('http://example.com');
    await page.waitForTimeout(3000);
    
    console.log(`Current page: ${page.url()}`);

    await page.click('a');

    console.log(`Current page: ${page.url()}`);

    await page.waitForTimeout(3000);

    return browser.close();
};

const logErrorAndExit = err =&gt; {
    console.log(err);
    process.exit();
};

run().catch(logErrorAndExit);

In the example, we navigate to the example.com page, wait for 
three seconds and then click on the available link. 

## Puppeteer post form

In the following example, we post an HTMl form. We use Express library to 
create a simple web application.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Form&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;form action="message" method="post"&gt;

        &lt;div&gt;
            &lt;label&gt;Name:&lt;/label&gt;
            &lt;input type="text" name="name"&gt;
        &lt;/div&gt;

        &lt;div&gt;
            &lt;label&gt;Message&lt;/label&gt;
            &lt;input type="text" name="message"&gt;
        &lt;/div&gt;

        &lt;button type="submit"&gt;Send&lt;/button&gt;

    &lt;/form&gt;

&lt;/body&gt;
&lt;/html&gt;

The form contains two input boxes: name and message.

index.js
  

const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =&gt; {

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/message', (req, res) =&gt; {

    res.set({ 'Content-Type': 'text/plain; charset=utf-8' });

    let name = req.body.name;
    let message = req.body.message;
    let output = `${name} says: ${message}`;

    res.send(output);
});

app.listen(3000, () =&gt; {

    console.log('Application started on port 3000');
})

This Express application processes the posted form. It builds a message from 
the sent parameters.

app.js
  

const puppeteer = require('puppeteer');

(async () =&gt; {

    const options = {
        headless: false,
        slowMo: 40
    };

    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.type('input[name="name"]', 'John Doe');
    await page.type('input[name="message"]', 'Hello there!');
    await page.click('button[type=submit]');

    const content = await page.content();

    if (content.includes('John Doe says: Hello there!')) {
        console.log('form submitted OK');
    } else {
        console.log('failed to submit form');
    }

    await browser.close();
})();

In the example, we fill the form, send it and verify the response.

const options = {
     headless: false,
     slowMo: 40
};

We run the example in UI mode; slowed down a bit.

await page.type('input[name="name"]', 'John Doe');
await page.type('input[name="message"]', 'Hello there!');

With page.type functions, we fill in data into the input tags.

await page.click('button[type=submit]');

We submit the form with page.click.

const content = await page.content();

if (content.includes('John Doe says: Hello there!')) {
     console.log('form submitted OK');
} else {
     console.log('failed to submit form');
}

We verify the response from the Express application.

## Puppeteer DuckDuckGo search

In the following example, we pass a term to a DuckDuckGo search engine and
process the result.

app.js
  

const puppeteer = require('puppeteer');

(async () =&gt; {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://duckduckgo.com/', { waitUntil: 'networkidle2' });

    await page.type("input[id=search_form_input_homepage]", "falcon");

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForNavigation()
    ]);
    
    const res = await page.evaluate(() =&gt;
        [...document.querySelectorAll(".result__snippet.js-result-snippet")].map(e =&gt; ({
            text: e.innerText
        })));

    for (let e of res) {

        console.log(e.text);
    }

    await browser.close();
})();

The example searches for the falcon term and returns the top definitions from
the DuckDuckGo.

await page.goto('https://duckduckgo.com/', { waitUntil: 'networkidle2' });

We navigate to the DuckDuckGo; by setting the waitUntil option to
networkidle2, we consider the navigation to be finished when there
are no more than 2 network connections for at least 500 ms. This is to ensure 
that we have the page correctly loaded and we can find the search box.

await page.type("input[id=search_form_input_homepage]", "falcon");

We type the falcon term into the DuckDuckGo's search box.

await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForNavigation()
]);

We submit the form and wait for results.

const res = await page.evaluate(() =&gt;
    [...document.querySelectorAll(".result__snippet.js-result-snippet")].map(e =&gt; ({
        text: e.innerText
})));

We evaluate the anonymous function in the page context. In the function, we
select all tags having both result__snippet and
js-result-snippet classes. This is where DuckDuckGo stores its 
definitions.

for (let e of res) {

     console.log(e.text);
}

We go over the definitions and print them to the console.

## Source

[Puppeteer documentation](https://pptr.dev/)

In this article we have worked with the puppeteer library to automate a
browser.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)