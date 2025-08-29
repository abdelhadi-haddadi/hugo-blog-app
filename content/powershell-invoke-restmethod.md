+++
title = "PowerShell Invoke-RestMethod"
date = 2025-08-29T20:07:05.214+01:00
draft = false
description = "PowerShell Invoke-RestMethod tutorial shows how to use PowerShell to interact with REST APIs and web services."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Invoke-RestMethod

last modified February 15, 2025

In this article, we will cover the Invoke-RestMethod cmdlet in
PowerShell. This cmdlet sends HTTP/HTTPS requests to RESTful web services.
It simplifies working with APIs by automatically converting JSON responses.

## REST basics

REST (Representational State Transfer) is an architectural style for web services.
It uses standard HTTP methods like GET, POST, PUT, and DELETE. REST APIs return
data typically in JSON or XML format. PowerShell's Invoke-RestMethod
handles these requests and responses efficiently.

## Basic GET request

The simplest usage is making a GET request to retrieve data from an API.
The -Uri parameter specifies the endpoint URL. By default, the response is
converted from JSON to PowerShell objects. This makes data manipulation easy.

rest1.ps1
  

$response = Invoke-RestMethod -Uri "https://jsonplaceholder.typicode.com/posts/1"
$response

This command fetches a sample post from JSONPlaceholder API. The response is
stored in $response variable and displayed. The output is automatically parsed.

## POST request with JSON body

To send data to an API, use a POST request with a JSON body. The -Method
parameter specifies POST. The -Body parameter contains the data to send.
Content-Type header should be set to application/json for JSON data.

rest2.ps1
  

$body = @{
    title = 'foo'
    body = 'bar'
    userId = 1
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "https://jsonplaceholder.typicode.com/posts" `
    -Method Post -Body $body -ContentType "application/json"
$response

This command creates a new post on the mock API. The hashtable is converted
to JSON format. The response contains the created post with an assigned ID.

PS C:\&gt; .\rest2.ps1

title body userId id
----- ---- ------ --
foo   bar       1 101

## Handling authentication

Many APIs require authentication. The -Headers parameter can include API keys.
For basic authentication, use -Credential parameter. OAuth tokens are typically
passed in headers. Always secure credentials properly.

rest3.ps1
  

$headers = @{
    "Authorization" = "Bearer your_api_token_here"
    "Accept" = "application/json"
}

$response = Invoke-RestMethod -Uri "https://api.example.com/protected" `
    -Headers $headers
$response

This example shows how to include an authorization token. The headers dictionary
contains the required authentication. Replace the token with your actual API key.

## Error handling

APIs may return errors that need proper handling. Use try/catch blocks to manage
errors gracefully. The -StatusCodeVariable parameter captures the status code.
This helps in debugging failed requests.

rest4.ps1
  

try {
    $response = Invoke-RestMethod -Uri "https://jsonplaceholder.typicode.com/nonexistent" `
        -ErrorAction Stop -StatusCodeVariable statusCode
    $response
}
catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Status code: $statusCode"
}

This command attempts to access a non-existent endpoint. The error is caught
and displayed. The status code is stored for reference. Always implement error
handling in production scripts.

## Working with paginated APIs

Many APIs paginate large result sets. You need to handle multiple requests.
The response often includes links to next pages. This example demonstrates
processing multiple pages of results.

rest5.ps1
  

$baseUri = "https://api.example.com/items"
$allResults = @()
$nextPage = $baseUri

while ($nextPage) {
    $response = Invoke-RestMethod -Uri $nextPage
    $allResults += $response.items
    $nextPage = $response.links.next
}

$allResults | Select-Object -First 10

This script collects all items from a paginated API. It follows next page links
until none remain. The results are accumulated in $allResults array. Only the
first 10 items are displayed for brevity.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Invoke-RestMethod cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).