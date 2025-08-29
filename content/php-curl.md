+++
title = "PHP cURL"
date = 2025-08-29T20:04:17.476+01:00
draft = false
description = "PHP cURL tutorial shows how to work with cURL library in PHP. cURL is a wrapper over the libcurl library."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP cURL

last modified February 16, 2025

PHP cURL tutorial shows how to work with cURL library in PHP. cURL is a wrapper
over the libcurl library.

## cURL

The curl is a command line tool and library for transferring data with
URL. It supports multiple protocols including HTTP, HTTPS, FTP, GOPHER, MQTT,
or SMTP. The cURL is a PHP wrapper over the library.

The cURL must be installed. For instance, on Debian the package name is
php-curl.

## PHP cURL GET request

In the following examples, we create simple GET requests.

get_req.php
  

&lt;?php

$ch = curl_init('http://webcode.me');

curl_exec($ch);
curl_close($ch);

In the example, we send a GET request to a small website. The output is directly
shown in the standard output.

$ch = curl_init('http://webcode.me');

The curl_init function initializes a new session and returns a cURL
handle for use with the curl_setopt, curl_exec, 
and curl_close functions. We provice a URL to which we sent the 
request.

curl_exec($ch);

The curl_exec executes the given cURL session. 

curl_close($ch);

The curl_close closes the cURL session.

$ php get_req.php 
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is a beautiful day. We go swimming and fishing.
    &lt;/p&gt;
    
    &lt;p&gt;
         Hello there. How are you?
    &lt;/p&gt;
    
&lt;/body&gt;
&lt;/html&gt;

In the next example, we send the output of the transfer to a variable.

get_req2.php
  

&lt;?php

$ch = curl_init('http://webcode.me');
 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data = curl_exec($ch);
 
curl_close($ch);
 
echo $data;

With the curl_setopt we set options for the cURL transfer. The
CURLOPT_RETURNTRANSFER returns the transfer as a string of the
return value of curl_exec instead of outputting it directly. 

## PHP cURL download file

The CURLOPT_FILE option specifies where the transfer should be 
written to; the default is the standard output.

download_file.php
  

&lt;?php

$ch = curl_init('http://webcode.me');
$fp = fopen('index.html', 'w');

curl_setopt($ch, CURLOPT_FILE, $fp);
curl_setopt($ch, CURLOPT_HEADER, false);

curl_exec($ch);

if (curl_error($ch)) {
    fwrite($fp, curl_error($ch));
}

curl_close($ch);
fclose($fp);

In the example, we set CURLOPT_FILE option to a file handle, that 
we have created. With the CURLOPT_HEADER, we disable the header.

## PHP cURL HEAD request

A HEAD request is a GET request without the body.

head_req.php
  

&lt;?php

$ch = curl_init('http://webcode.me');

$options = [CURLOPT_HEADER =&gt; true, CURLOPT_NOBODY =&gt; true, 
    CURLOPT_RETURNTRANSFER =&gt; true ];

curl_setopt_array($ch, $options);

$data = curl_exec($ch);
echo $data;

curl_close($ch);

In order to generate a HEAD request, we set the CURLOPT_HEADER
to true and the CURLOPT_NOBODY to false. We set all the options 
at once with curl_setopt_array.

$ php head_req.php 
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Mon, 08 Feb 2021 16:00:24 GMT
Content-Type: text/html
Content-Length: 348
Last-Modified: Sat, 20 Jul 2019 11:49:25 GMT
Connection: keep-alive
ETag: "5d32ffc5-15c"
Accept-Ranges: bytes

## PHP cURL status code

With the curl_getinfo function we get information regarding a
specific transfer.

status.php
  

&lt;?php

$ch = curl_init('http://webcode.me');
 
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_NOBODY, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 
curl_exec($ch);

$status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
echo $status;
 
curl_close($ch);

We send a HEAD reqeust to a website. After executing the request, we get the 
status by passing the CURLINFO_RESPONSE_CODE option to the 
curl_getinfo function.

$ php status.php 
200

## PHP cURL POST form

The POST form request  issues a POST to the specified URL, with data's keys and
values URL-encoded as the request body. The Content-Type header is set to
application/x-www-form-urlencoded. The data is sent in the body of the request;
the keys and values are encoded in key-value tuples separated by '&amp;', with a '='
between the key and the value. 

post_form.php
  

&lt;?php

$ch = curl_init('http://httpbin.org/post');
 
$fields = ['name' =&gt; 'John Doe', 'occupation' =&gt; 'gardener'];
$options = [CURLOPT_POST =&gt; true, CURLOPT_POSTFIELDS =&gt; $fields, 
    CURLOPT_RETURNTRANSFER =&gt; true];

curl_setopt_array($ch, $options);

$data = curl_exec($ch);
 
curl_close($ch);
 
echo $data;

The POST request is set with the CURLOPT_POST option. The POST 
fields are set with the CURLOPT_POSTFIELDS option.

$ php post_form.php 
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Content-Length": "254", 
    "Content-Type": "multipart/form-data; ...
    "Host": "httpbin.org", 
    "X-Amzn-Trace-Id": "Root=1-602162bf-3d24fe793b7403de54ad250f"
  }, 
  "json": null, 
  ...
  "url": "http://httpbin.org/post"
}

## PHP cURL POST JSON

In the following example, we POST JSON data.

post_json.php
  

&lt;?php

$ch = curl_init('http://httpbin.org/post');
 
$fields = json_encode(['name' =&gt; 'John Doe', 'occupation' =&gt; 'gardener']);
$options = [CURLOPT_POST =&gt; true, CURLOPT_POSTFIELDS =&gt; $fields, 
    CURLOPT_HTTPHEADER =&gt; ['Content-Type: application/json'], 
    CURLOPT_RETURNTRANSFER =&gt; true];
 
curl_setopt_array($ch, $options); 
 
$data = curl_exec($ch);
curl_close($ch);
 
echo $data;

We encode the JSON data with the json_encode function. We set the 
appropriate header with the CURLOPT_HTTPHEADER option.

$ php post_json.php 
{
  "args": {}, 
  "data": "{\"name\":\"John Doe\",\"occupation\":\"gardener\"}", 
  "files": {}, 
  "form": {}, 
  "headers": {
    "Accept": "*/*", 
    "Content-Length": "43", 
    "Content-Type": "application/json", 
    "Host": "httpbin.org", 
    "X-Amzn-Trace-Id": "Root=1-60216559-2436c3fe055f0fb61eb074d1"
   }, 
  "json": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  ...
  "url": "http://httpbin.org/post"
}

## PHP cURL multiple async requests

The curl_multi_init function creates a new multi handle, which 
allows the processing of multiple cURL handles asynchronously. 

multi_async.php
  

&lt;?php

$urls = [ 
    "http://webcode.me", 
    "https://example.com",
    "http://httpbin.org",
    "https://www.perl.org"
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

In the example, we create asynchronous requests to four websites. We print their
status codes and headers.

$mh = curl_multi_init();

We initiate the multi handle.

foreach ($urls as $url) {

    $ch = curl_init($url);
    curl_setopt_array($ch, $options);
    curl_multi_add_handle($mh, $ch);
    $chs[] = $ch;
}

We create standard handles for each URLs and add them to the multi handle with
curl_multi_add_handle.

$running = false;

do {
    curl_multi_exec($mh, $running);
} while ($running);

We execute all queries asynchronously, and continue when all are complete.

foreach ($chs as $h) {

    curl_multi_remove_handle($mh, $h);
}

curl_multi_close($mh);

We close the handles.

foreach ($chs as $h) {

    $status = curl_getinfo($h, CURLINFO_RESPONSE_CODE);
    echo $status . "\n";
}

We get the status codes.

foreach ($chs as $h) {

    echo "----------------------\n";
    echo curl_multi_getcontent($h);
}

We get the headers.

$ php multi_req.php 
200
200
200
200
----------------------
HTTP/1.1 200 OK
Server: nginx/1.6.2
Date: Mon, 08 Feb 2021 16:37:31 GMT
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
age: 285367
cache-control: max-age=604800
content-type: text/html; charset=UTF-8
date: Mon, 08 Feb 2021 16:36:11 GMT
etag: "3147526947"
expires: Mon, 15 Feb 2021 16:36:11 GMT
last-modified: Thu, 17 Oct 2019 07:18:26 GMT
server: ECS (dcb/7F83)
x-cache: HIT
content-length: 648

----------------------
HTTP/1.1 200 OK
Date: Mon, 08 Feb 2021 16:36:11 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 9593
Connection: keep-alive
Server: gunicorn/19.9.0
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

----------------------
HTTP/2 200 
server: Combust/Plack (Perl)
content-type: text/html; charset=utf-8
last-modified: Mon, 08 Feb 2021 15:29:36 GMT
x-content-type-options: nosniff
x-frame-options: deny
x-xss-protection: 1
strict-transport-security: max-age=15768000
via: 1.1 varnish, 1.1 varnish
accept-ranges: bytes
date: Mon, 08 Feb 2021 16:36:11 GMT
age: 2713
x-served-by: cache-lga21948-LGA, cache-vie21642-VIE
x-cache: HIT, HIT
x-cache-hits: 2, 1
x-timer: S1612802172.507868,VS0,VE1
content-length: 12011

## PHP cURL send email

We build a custom request with the CURLOPT_CUSTOMREQUEST option.

send_mail
  

&lt;?php

$ch = curl_init("core9");

curl_setopt($ch, CURLOPT_PORT, 25);
curl_setopt($ch, CURLOPT_CRLF, true);

$from = "john.doe@example.com";
$to = "root@core9";
$name = "John Doe";
$subject = "Hello";
$body = "Hello there";

$data = "EHLO core9\n";
$data .= "MAIL FROM:&lt;$from&gt;\n";
$data .= "RCPT TO:&lt;$to&gt;\n";
$data .= "DATA\n";
$data .= "$subject\n";
$data .= "$body\n";
$data .= "\n.\n";
$data .= "QUIT\n";

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $data);
curl_exec($ch);

curl_close($ch);

The example sends an email to a computer on a local network.

$ch = curl_init("core9");

The core9 is the name of the computer running email server on 
a LAN.

curl_setopt($ch, CURLOPT_PORT, 25);
curl_setopt($ch, CURLOPT_CRLF, true);

We specify the port number with CURLOPT_PORT. The
CURLOPT_CRLF translates Unix new lines into \r\n,
which are control characters of the SMTP protocol.

$data = "EHLO core9\n";
$data .= "MAIL FROM:&lt;$from&gt;\n";
$data .= "RCPT TO:&lt;$to&gt;\n";
$data .= "DATA\n";
$data .= "$subject\n";
$data .= "$body\n";
$data .= "\n.\n";
$data .= "QUIT\n";

The mail is build by using the SMPT commands.

From john.doe@example.com Tue Feb  9 18:00:08 2021
Return-Path: &lt;john.doe@example.com&gt;
Received: from core9 (spartan.local [192.168.0.20])
        by core9 (8.15.2/8.15.2) with ESMTP id 119H08go001746
        for &lt;root@core9&gt;; Tue, 9 Feb 2021 18:00:08 +0100 (CET)
        (envelope-from john.doe@example.com)
Date: Tue, 9 Feb 2021 18:00:08 +0100 (CET)
From: john.doe@example.com
Message-Id: &lt;202102091700.119H08go001746@core9&gt;
To: undisclosed-recipients:;
Status: RO

Hello
Hello there

We check the email with an email client on the server. 

## Source

[The cURL - PHP manual](https://www.php.net/manual/en/book.curl.php)

In this article we have worked with the PHP cURL library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.