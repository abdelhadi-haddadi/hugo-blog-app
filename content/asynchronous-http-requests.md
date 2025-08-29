+++
title = "Asynchronous HTTP requests"
date = 2025-08-29T20:15:47.749+01:00
draft = false
description = "The asynchronous HTTP requests tutorial shows how to create async web requests in Go, C#, F#, Groovy, Python, Perl, PHP, Java, JavaScript."
image = ""
imageBig = ""
categories = ["web"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Asynchronous HTTP requests

last modified January 10, 2023

The asynchronous HTTP requests tutorial shows how to create async HTTP requests
in Go, C#, F#, Groovy, Python, Perl, Java, JavaScript, and PHP.

Asynchronous requests do not block the client and allow us to generate HTTP
requests more efficiently.

Rather than generating requests one by one, waiting for the current request to
finish before executing next one, we execute all requests quickly and then wait
for all of them to finish.

## Go async requests

Go has goroutines for making asynchronous requests. A goroutine is a lightweight
thread managed by the Go runtime.

 

main.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "regexp"
    "sync"
)

func main() {

    urls := []string{
        "http://webcode.mse",
        "https://example.com",
        "http://httpbin.org",
        "https://www.perl.org",
        "https://www.php.net",
        "https://www.python.org",
        "https://code.visualstudio.com",
        "https://clojure.org",
    }

    var wg sync.WaitGroup

    for _, u := range urls {

        wg.Add(1)
        go func(url string) {

            defer wg.Done()

            content := doReq(url)
            title := getTitle(content)
            fmt.Println(title)
        }(u)
    }

    wg.Wait()
}

func doReq(url string) (content string) {

    resp, err := http.Get(url)

    if err != nil {

        log.Println(err)
        return
    }

    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {

        log.Println(err)
        return
    }

    return string(body)
}

func getTitle(content string) (title string) {

    re := regexp.MustCompile("&lt;title&gt;(.*)&lt;/title&gt;")

    parts := re.FindStringSubmatch(content)

    if len(parts) &gt; 0 {
        return parts[1]
    } else {
        return "no title"
    }
}

We make multiple asynchronous HTTP requests. We get the contents of the 
title tag of each of the web pages.

var wg sync.WaitGroup

WaitGroups are used to manage goroutines. It waits for a collection
of goroutines to finish.

go func(url string) {

  defer wg.Done()

  content := doReq(url)
  title := getTitle(content)
  fmt.Println(title)
}(u)

A goroutine is created with the go keyword.

$ go run async_req.go 
The Perl Programming Language - www.perl.org
Welcome to Python.org
Visual Studio Code - Code Editing. Redefined
PHP: Hypertext Preprocessor
Example Domain
httpbin.org
Clojure
My html page

## C# async requests

In C#, we use the HttpClient to generate asynchronous requests.

Program.cs
  

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

var urls = new string[] { "http://webcode.me", "http://example.com",
    "http://httpbin.org", "https://ifconfig.me", "http://termbin.com",
    "https://github.com"
};

var rx = new Regex(@"&lt;title&gt;\s*(.+?)\s*&lt;/title&gt;",
  RegexOptions.Compiled);

using var client = new HttpClient();

var tasks = new List&lt;Task&lt;string&gt;&gt;();

foreach (var url in urls)
{
    tasks.Add(client.GetStringAsync(url));
}

Task.WaitAll(tasks.ToArray());

var data = new List&lt;string&gt;();

foreach (var task in tasks)
{
    data.Add(await task);
}

foreach (var content in data)
{
    var matches = rx.Matches(content);

    foreach (var match in matches)
    {
        Console.WriteLine(match);
    }
}

We download the given web pages asynchronously and print their HTML title tags.

tasks.Add(client.GetStringAsync(url));

The GetStringAsync sends a GET request to the specified url and
returns the response body as a string in an asynchronous operation. It returns a
new task; in C# a task represents an asynchronous operation.

Task.WaitAll(tasks.ToArray());

The Task.WaitAll waits for all of the provided tasks to complete
execution.

data.Add(await task);

The await keywords unwraps the result value.

$ dotnet run
&lt;title&gt;My html page&lt;/title&gt;
&lt;title&gt;Example Domain&lt;/title&gt;
&lt;title&gt;httpbin.org&lt;/title&gt;
&lt;title&gt;termbin.com - terminal pastebin&lt;/title&gt;
&lt;title&gt;GitHub: Where the world builds software · GitHub&lt;/title&gt;

## F# async requests

The following example uses HttpClient and task expressions to 
fetch website titles asynchronously.

async_req.fsx
  

open System.Net.Http
open System.Text.RegularExpressions
open System.Threading.Tasks

let fetchTitleAsync (url: string) =

    task {

        use client = new HttpClient()
        let! html = client.GetStringAsync(url)
        let pattern = "&lt;title&gt;\s*(.+?)\s*&lt;/title&gt;"

        let m = Regex.Match(html, pattern)
        return m.Value
    }

let sites =
    [| "http://webcode.me"
       "http://example.com"
       "https://bing.com"
       "http://httpbin.org"
       "https://ifconfig.me"
       "http://termbin.com"
       "https://github.com" |]

let titles =
    sites
    |&gt; Array.map fetchTitleAsync
    |&gt; Task.WhenAll
    |&gt; Async.AwaitTask
    |&gt; Async.RunSynchronously

titles
|&gt; Array.iter (fun title -&gt; printfn $"%s{title}")

The example asynchronously retrieves the titles of the given urls.

Another solution uses the WebRequest to generate a request. Its
GetResponseStream returns a response to a request as an
asynchronous operation.

async_req2.fsx
  

open System.Net
open System
open System.Text.RegularExpressions

let fetchTitleAsync url =

    async {
        let req = WebRequest.Create(Uri(url))
        use! resp = req.AsyncGetResponse()
        use stream = resp.GetResponseStream()

        use reader = new IO.StreamReader(stream)
        let html = reader.ReadToEnd()

        let pattern = "&lt;title&gt;\s*(.+?)\s*&lt;/title&gt;"

        let m = Regex.Match(html, pattern)
        return m.Value
    }

let sites =
    [ "http://webcode.me"
      "http://example.com"
      "https://bing.com"
      "http://httpbin.org"
      "https://ifconfig.me"
      "http://termbin.com"
      "https://github.com" ]

let titles = sites
            |&gt; List.map fetchTitleAsync
            |&gt; Async.Parallel
            |&gt; Async.RunSynchronously

titles |&gt; Array.iter (fun title -&gt; printfn $"%s{title}")

The example asynchronously retrieves the titles of the given urls.

## Groovy async requests

In Groovy, we use ExecutorService and HttpClient.

mul_async_req.gvy
  

import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit

import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

int nThreads = 30

def executor = Executors.newFixedThreadPool(nThreads)

def urls = [
    "https://crunchify.com",
    "https://yahoo.com",
    "https://www.ebay.com",
    "https://google.com",
    "https://www.example.co",
    "https://paypal.com",
    "http://bing.com/",
    "https://techcrunch.com/",
    "http://mashable.com/",
    "https://pro.crunchify.com/",
    "https://wordpress.com/",
    "https://wordpress.org/",
    "https://example.com/",
    "https://sjsu.edu/",
    "https://ask.crunchify.com/",
    "https://test.com.au/",
    "https://www.wikipedia.org/",
    "https://en.wikipedia.org"
]

for (String url in urls ) {

    executor.execute(() -&gt; {

        worker(url)

        // try {
        //     worker(url)
        // } catch (Exception e) {
        //     e.printStackTrace()
        // }
    })
}

executor.shutdown()

executor.awaitTermination(30, TimeUnit.SECONDS)
println("finished")

def worker(url) {

    def client = HttpClient.newHttpClient()
    def request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .build()

    HttpResponse&lt;Void&gt; res = client.send(request,
            HttpResponse.BodyHandlers.discarding())

    println "${url}: ${res.statusCode()}"
}

The example makes multiple asynchronous requests to URLs and prints their status 
codes.

$ groovy mul_async_req.gvy
http://mashable.com/: 301
http://bing.com/: 301
https://paypal.com: 302
https://en.wikipedia.org: 301
https://paypal.com: 302
https://en.wikipedia.org: 301
https://en.wikipedia.org: 301
https://google.com: 301
https://example.com/: 200
https://example.com/: 200
https://yahoo.com: 301
https://test.com.au/: 301
https://wordpress.com/: 200
https://techcrunch.com/: 200
https://www.ebay.com: 200
https://ask.crunchify.com/: 200
https://pro.crunchify.com/: 200
https://sjsu.edu/: 200
finished

## Python async requests

In Python, we use the httpx and asyncio modules.

async_req.py
  

#!/usr/bin/python

import httpx
import asyncio

async def get_async(url):
    async with httpx.AsyncClient() as client:
        return await client.get(url)

urls = ['http://webcode.me', 'https://httpbin.org/get',
    'https://google.com', 'https://stackoverflow.com',
    'https://github.com']

async def launch():
    resps = await asyncio.gather(*map(get_async, urls))
    data = [resp.status_code for resp in resps]

    for status_code in data:
        print(status_code)

asyncio.run(launch())

The example makes asynchronous requests in Python. It prints the status code
of all the provided urls.

./async_req.py
200
200
200
200
200

## Perl async requests

In Perl, we use the LWP module to generate requests and the
Parallel::ForkManager module to make them asynchronous.

$ cpanm Parallel::ForkManager LWP

We install the modules with cpanm.

urls.txt
  

http://webcode.me
https://example.com
http://httpbin.org
https://google.com
https://www.perl.org
https://fsharp.org
https://clojure.org
https://www.rust-lang.org
https://golang.org
https://www.python.org
https://code.visualstudio.com
https://ifconfig.me
http://termbin.com
https://github.com
https://stackoverflow.com
https://www.php.net/

The urls.txt contains a list of websites.

async_req.pl
  

#!/usr/bin/perl

use warnings;
use 5.30.0;
use Path::Tiny;
use LWP::UserAgent;
use Parallel::ForkManager;

my @urls = split "\n", path('urls.txt')-&gt;slurp_utf8;

my $pm = Parallel::ForkManager-&gt;new(4);
my $ua = LWP::UserAgent-&gt;new;
$ua-&gt;agent('Perl script');

say "downloading ", scalar @urls, " files";

my $dir = 'files/';
mkdir $dir if not -d $dir;

foreach my $link (@urls) {

    my $name = $1 if $link =~ m%https?://(.+)\.\w+%;
    my $file_name = "$dir/$name" . '.txt';

    $pm-&gt;start and next;

    my $resp = $ua-&gt;get($link);

    if ($resp-&gt;is_success) {

        path($file_name)-&gt;spew_utf8($resp-&gt;decoded_content);

    } else { warn $resp-&gt;status_line }

    $pm-&gt;finish;
}

$pm-&gt;wait_all_children;

The example reads the urls.txt file and gets the links. It
generates async requests to the given urls. The contents of the web pages
are written to files.

$ ./async_req.pl
downloading 15 files
$ ls -1 files/
clojure.txt
code.visualstudio.txt
example.txt
fsharp.txt
github.txt
golang.txt
google.txt
httpbin.txt
ifconfig.txt
stackoverflow.txt
termbin.txt
webcode.txt
www.perl.txt
www.python.txt
www.rust-lang.txt

## JS async requests

For JavaScript, we have chosen the axios module.

$ npm i axios

We install the axios module.

async_req.js
  

const axios = require('axios');

async function makeRequests(urls) {

    const fetchUrl = (url) =&gt; axios.get(url);
    const promises = urls.map(fetchUrl);

    let responses = await Promise.all(promises);

    responses.forEach(resp =&gt; {
        let msg = `${resp.config.url} -&gt; ${resp.headers.server}: ${resp.status}`;
        console.log(msg);
    });
}

let urls = [
    'http://webcode.me',
    'https://example.com',
    'http://httpbin.org',
    'https://clojure.org',
    'https://fsharp.org',
    'https://symfony.com',
    'https://www.perl.org',
    'https://www.php.net',
    'https://www.python.org',
    'https://code.visualstudio.com',
    'https://github.com'
];

makeRequests(urls);

The example generates async requests to the given list of urls. It prints
the web site's url, server name, and status code.

const fetchUrl = (url) =&gt; axios.get(url);

The axios.get makes an async request and returns a promise.

let responses = await Promise.all(promises);

We collect all promises with Promise.All. The method resolves after
all of the given promises have either fulfilled or rejected.

$ node async_req.js
http://webcode.me -&gt; nginx/1.6.2: 200
https://example.com -&gt; ECS (dcb/7F83): 200
http://httpbin.org -&gt; gunicorn/19.9.0: 200
https://clojure.org -&gt; AmazonS3: 200
https://fsharp.org -&gt; GitHub.com: 200
https://symfony.com -&gt; cloudflare: 200
https://www.perl.org -&gt; Combust/Plack (Perl): 200
https://www.php.net -&gt; myracloud: 200
https://www.python.org -&gt; nginx: 200
https://code.visualstudio.com -&gt; Microsoft-IIS/10.0: 200
https://github.com -&gt; GitHub.com: 200

## Java async requests

The CompletableFuture  a high-level API for asynchronous
programming in Java.

com/zetcode/AsyncReqEx.java
  

package com.zetcode;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

public class AsyncReqEx {

    public static void main(String[] args) {

        List&lt;URI&gt; uris = Stream.of(
                "https://www.google.com/",
                "https://clojure.org",
                "https://www.rust-lang.org",
                "https://golang.org",
                "https://www.python.org",
                "https://code.visualstudio.com",
                "https://ifconfig.me",
                "http://termbin.com",
                "https://www.github.com/"
        ).map(URI::create).collect(toList());

        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .build();

        var futures = uris.stream()
                .map(uri -&gt; verifyUri(httpClient, uri))
                .toArray(CompletableFuture[]::new);

        CompletableFuture.allOf(futures).join();
    }

    private static CompletableFuture&lt;Void&gt; verifyUri(HttpClient httpClient,
                                                     URI uri) {
        HttpRequest request = HttpRequest.newBuilder()
                .timeout(Duration.ofSeconds(5))
                .uri(uri)
                .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.discarding())
                .thenApply(HttpResponse::statusCode)
                .thenApply(statusCode -&gt; statusCode == 200)
                .exceptionally(ex -&gt; false)
                .thenAccept(valid -&gt; {
                    if (valid) {
                        System.out.printf("[SUCCESS] Verified %s%n", uri);
                    } else {
                        System.out.printf("[FAILURE] Failed to verify%s%n", uri);
                    }
                });
    }
}

In the example, we have a list of urls. We check the status of the given web
pages. The example uses HttpClient for making a web request and
CompletableFuture for asynchronous execution.

[SUCCESS] Verified http://termbin.com
[SUCCESS] Verified https://clojure.org
[SUCCESS] Verified https://www.google.com/
[SUCCESS] Verified https://ifconfig.me
[SUCCESS] Verified https://www.python.org
[SUCCESS] Verified https://code.visualstudio.com
[SUCCESS] Verified https://golang.org
[SUCCESS] Verified https://www.rust-lang.org
[SUCCESS] Verified https://www.github.com/

## PHP async requests

In PHP, we use the cURL library.

async_req.php
  

&lt;?php

$urls = [
    "http://webcode.me",
    "https://example.com",
    "http://httpbin.org",
    "https://www.perl.org",
    "https://www.php.net",
    "https://www.python.org",
    "https://code.visualstudio.com",
    "https://ifconfig.me"
];

$options = [CURLOPT_HEADER =&gt; true, CURLOPT_NOBODY =&gt; true,
    CURLOPT_RETURNTRANSFER =&gt; true];

$mh = curl_multi_init();
$chs = [];

foreach ($urls as $url) {

    $ch = curl_init($url);
    curl_setopt_array($ch, $options);
    curl_multi_add_handle($mh, $ch);
    $chs[] = $ch;
}

$running = false;

do {
    curl_multi_exec($mh, $running);
} while ($running);

foreach ($chs as $h) {

    curl_multi_remove_handle($mh, $h);
}

curl_multi_close($mh);

foreach ($chs as $h) {

    $status = curl_getinfo($h, CURLINFO_RESPONSE_CODE);
    echo $status . "\n";
}

foreach ($chs as $h) {

    echo "----------------------\n";
    echo curl_multi_getcontent($h);
}

We print the status codes and headers of the requested web pages.

$ch = curl_init($url);

The curl_multi_init function creates a new multi handle, which
allows the processing of multiple cURL handles asynchronously.

$ php async_req.php
200
200
200
200
200
200
200
200
----------------------
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Thu, 22 Jul 2021 13:14:22 GMT
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT
Connection: keep-alive
ETag: "5d32ffc5-15c"
Accept-Ranges: bytes

----------------------
HTTP/2 200
content-encoding: gzip
accept-ranges: bytes
...

In this tutorial we have generated asynchronous web requests in Go, C#, F#,
Python, Perl, Java, JavaScript, and PHP.