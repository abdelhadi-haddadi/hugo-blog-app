+++
title = "Go HTTP GET/POST request"
date = 2025-08-29T19:55:17.728+01:00
draft = false
description = "Learn how to handle GET and POST requests in Go. Includes examples of HTTP server and client."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go HTTP GET/POST request

last modified April 11, 2024

In this article we show how to send HTTP GET and POST requests in
Golang.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP protocol is the foundation of data communication for the World Wide Web.

In the code examples, we use httpbin.org, which is a freely available 
HTTP request and response service, and the webcode.me, which is 
a tiny HTML page for testing.

## HTTP GET

The HTTP GET method requests a representation of the specified resource. 
Requests using GET should only retrieve data.

## HTTP POST

The HTTP POST method sends data to the server. It is often used when 
uploading a file or when submitting a completed web form.

## Go http

In Go, we use the http package to create GET and POST requests. 
The package provides HTTP client and server implementations. 

## Go GET request

The following example creates a simple GET request in Go.

get_req.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

func main() {

    resp, err := http.Get("http://webcode.me")

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(body))
}

We create a GET request to the webcode.me webpage.

resp, err := http.Get("http://webcode.me")

A get request is issued with the Get function.

if err != nil {
    log.Fatal(err)
}

We check for the error.

defer resp.Body.Close()

The client must close the response body when finished.

body, err := ioutil.ReadAll(resp.Body)

We read the content of the body with ReadAll.

fmt.Println(string(body))

We print the received data to the console.

$ go run get_req.go
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

Instead of ioutil.ReadAll we can use the io.Copy
function.

get_req2.go
  

package main

import (
    "io"
    "log"
    "net/http"
    "os"
)

func main() {

    resp, err := http.Get("http://webcode.me")

    if err != nil {
      log.Fatal(err)
    }

    defer resp.Body.Close()

    _, err = io.Copy(os.Stdout, resp.Body)

    if err != nil {
      log.Fatal(err)
    }
}

The io.Copy function copies from source to destination until either
EOF is reached on source or an error occurs. It returns the number of bytes
copied and the first error encountered while copying, if any. 

In the next example, the page is written to a file.

get_req3.go
  

package main

import (
    "log"
    "net/http"
    "os"
)

func main() {

    r, err := http.Get("http://webcode.me")

    if err != nil {
      log.Fatal(err)
    }

    defer r.Body.Close()

    f, err := os.Create("index.html")

    if err != nil {
      log.Fatal(err)
    }

    defer f.Close()

    _, err = f.ReadFrom(r.Body)

    if err != nil {
      log.Fatal(err)
    }
}

We create a new file with os.Create and write the contents to the 
file with ReadFrom.

## Go async requests

Go has goroutines for making asynchronous requests. A goroutine is a lightweight
thread managed by the Go runtime.

 

async_req.go
  

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
    "http://webcode.me",
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
  defer resp.Body.Close()

  body, err := ioutil.ReadAll(resp.Body)

  if err != nil {
    log.Fatal(err)
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
of goroutines to finish

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

## Go GET request with query parameters

The following example appends query parameters to the URL.

get_req_params.go
  

package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "net/url"
)

func main() {

    name := "John Doe"
    occupation := "gardener"

    params := "name=" + url.QueryEscape(name) + "&amp;" +
        "occupation=" + url.QueryEscape(occupation)
    path := fmt.Sprintf("https://httpbin.org/get?%s", params)

    resp, err := http.Get(path)

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(string(body))
}

The values for the query parameters are escaped with url.QueryEscape.

$ go run get_req_params.go 
{
  "args": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  "headers": {
    "Accept-Encoding": "gzip", 
    "Host": "httpbin.org", 
    "User-Agent": "Go-http-client/2.0", 
    "X-Amzn-Trace-Id": "Root=1-6000718d-443f64a345d2252d39b49b8d"
  }, 
  ...
  "url": "https://httpbin.org/get?name=John+Doe&amp;occupation=gardener"
}

## Go HTTP POST request FORM data

The PostForm issues a POST to the specified URL, with data's keys
and values URL-encoded as the request body.  The Content-Type header is set to
application/x-www-form-urlencoded. The data is sent in the body of the request;
the keys and values are encoded in key-value tuples separated by '&amp;', with a
'=' between the key and the value. 

post_req_form.go
  

package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "net/url"
)

func main() {

    data := url.Values{
        "name":       {"John Doe"},
        "occupation": {"gardener"},
    }

    resp, err := http.PostForm("https://httpbin.org/post", data)

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    var res map[string]interface{}

    json.NewDecoder(resp.Body).Decode(&amp;res)

    fmt.Println(res["form"])
}

We send a POST request to the https://httpbin.org/post page.

resp, err := http.PostForm("https://httpbin.org/post", data)

The data is sent with PostForm function.

var res map[string]interface{}

json.NewDecoder(resp.Body).Decode(&amp;res)

We decode the response body into a map.

fmt.Println(res["form"])

We print the received data.

$ go run post_req_form.go 
map[name:John Doe occupation:gardener]

## Go HTTP POST request JSON data

The following example sends a POST request with data in JSON format. 

post_req_json.go
  

package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
)

func main() {

    values := map[string]string{"name": "John Doe", "occupation": "gardener"}
    json_data, err := json.Marshal(values)

    if err != nil {
        log.Fatal(err)
    }

    resp, err := http.Post("https://httpbin.org/post", "application/json",
        bytes.NewBuffer(json_data))

    if err != nil {
        log.Fatal(err)
    }

    defer resp.Body.Close()

    var res map[string]interface{}

    json.NewDecoder(resp.Body).Decode(&amp;res)

    fmt.Println(res["json"])
}

We generate a POST request to the httpbin.org/post webpage. The
post data is taken from a map and transformed into a string with
encoding/json
package.

values := map[string]string{"name": "John Doe", "occupation": "gardener"}
json_data, err := json.Marshal(values)

A map is serialized into JSON string with json.Marshal.

resp, err := http.Post("https://httpbin.org/post", "application/json",
    bytes.NewBuffer(json_data))

When we post the data, we set the content type to application/json.

$ go run post_req_json.go 
map[name:John Doe occupation:gardener]

## Source

[Go net/http package - reference](https://pkg.go.dev/net/http)

In this article we have created GET and POST requests in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).