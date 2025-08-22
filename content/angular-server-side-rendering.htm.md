+++
title = "Angular - Server Side Rendering"
date = "2025-08-22"
draft = false
description = "Server side Rendering (SSR) is a modern technique to convert a Single Page Application (SPA) running in the browser into a server based application. Usually, in SPA, the server returns a simple index.html file with the reference to the JavaScript based SPA app. The SPA app take over from there, conf"
image = "/angular/images/ssr.jpg"
imageBig = "/angular/images/ssr.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Server Side Rendering

URL: https://www.tutorialspoint.com/angular/angular-server-side-rendering.htm

Server side Rendering (SSR) is a modern technique to convert a Single Page Application (SPA) running in the browser into a server based application. Usually, in SPA, the server returns a simple index.html file with the reference to the JavaScript based SPA app. The SPA app take over from there, configure the entire application, process the request and then send the final response.

But in SSR supported application, the server as well do all the necessary configuration and then send the final response to the browser. The browser renders the response and start the SPA app. SPA app takeover from there and further request are diverted to SPA app. The flow of SPA and SSR is as shown in below diagram.

Converting a SPA application to SSR provides certain advantages and they are as follows −

Speed:First request is relatively fast. One of the main drawback of SPA is slow initial rendering. Once the application is rendered, SPA app is quite fast. SSR fixes the initial rendering issue.

SEO Friendly:Enables the site to be SEO friendly. Another main disadvantage of SPA is not able to crawled by web crawler for the purpose of SEO. SSR fixes the issue.

To enable SSR in Angular, Angular should be able to rendered in the server. To make it happen, Angular provides a special technology called Angular Universal. It is quite new technology and it is continuously evolving. Angular Universal knows how to render Angular application in the server. We can upgrade our application to Angular Universal to support SSR.

![Image](/angular/images/ssr.jpg)
