+++
title = "PyQt QNetworkAccessManager"
date = 2025-08-29T20:07:26.008+01:00
draft = false
description = "QNetworkAccessManager in PyQt shows how to use QNetworkAccessManager to send requests and receive responses."
image = ""
imageBig = ""
categories = ["pyqt"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PyQt QNetworkAccessManager

last modified August 24, 2023

In this article we show how to shows how to use
QNetworkAccessManager to send requests and receive responses.

Visit [Advanced PyQt5 e-book](/ebooks/advancedpyqt5/), 
read [PyQt6 tutorial](/pyqt6/), or list [all PyQt tutorials](/all/#pyqt).

## QNetworkAccessManager

QNetworkAccessManager allows the application to send network
requests and receive replies. The QNetworkRequest holds a request
to be sent with the network manager and the QNetworkReply contains
the data and headers returned for a response.

QNetworkAccessManager has an asynchronous API which means that its
methods always return immediately and do not wait until they finish. Instead, a
signal is emitted when the request is done. We handle the response in the method
attached to the finished signal.

## HTTP GET request

The HTTP GET method requests a representation of the specified resource.

get_request.py
  

#!/usr/bin/python

from PyQt6 import QtNetwork
from PyQt6.QtCore import QCoreApplication, QUrl
import sys

class Example:

    def __init__(self):

        self.doRequest()

    def doRequest(self):

        url = 'http://webcode.me'
        req = QtNetwork.QNetworkRequest(QUrl(url))

        self.nam = QtNetwork.QNetworkAccessManager()
        self.nam.finished.connect(self.handleResponse)
        self.nam.get(req)

    def handleResponse(self, reply):

        er = reply.error()

        if er == QtNetwork.QNetworkReply.NetworkError.NoError:

            bytes_string = reply.readAll()
            print(str(bytes_string, 'utf-8'))

        else:
            print("Error occured: ", er)
            print(reply.errorString())

        QCoreApplication.quit()

def main():

    app = QCoreApplication([])
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

The example retrieves the HTML code of the specified web page.

url = 'http://webcode.me'
req = QtNetwork.QNetworkRequest(QUrl(url))

With the QNetworkRequest we send a request to the specified URL.

self.nam = QtNetwork.QNetworkAccessManager()
self.nam.finished.connect(self.handleResponse)
self.nam.get(req)

A QNetworkAccessManager object is created. When the request is
finished, the handleResponse method is called. The request is fired
with the get method.

def handleResponse(self, reply):

    er = reply.error()

    if er == QtNetwork.QNetworkReply.NetworkError.NoError:

        bytes_string = reply.readAll()
        print(str(bytes_string, 'utf-8'))

    else:
        print("Error occured: ", er)
        print(reply.errorString())

    QCoreApplication.quit()

The handleResponse receives a QNetworkReply object.
It contains data and headers for the request that was sent. If there is no error
in the network reply, we read all data using the readAll method;
otherwise we print an error message. The errorString returns a
human-readable description of the last error that occurred. The
readAll returns the data in QByteArray that has to be
decoded.

$ ./get_request.py 
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

## HTTP POST request

The HTTP POST method sends data to the server. The type of the body of the
request is indicated by the Content-Type header. A POST request is
typically sent via an HTML form. The data sent in the request can be encoded in
different ways; in application/x-www-form-urlencoded the values are
encoded in key-value tuples separated by '&amp;', with a '=' between the key and
the value. Non-alphanumeric characters are percent encoded. The
multipart/form-data is used for binary data and file uploads.

post_request.py
  

#!/usr/bin/python

from PyQt6 import QtNetwork
from PyQt6 import QtCore
import sys, json

class Example:

    def __init__(self):

        self.doRequest()

    def doRequest(self):

        data = QtCore.QByteArray()
        data.append(b'name=Peter&amp;amp;')
        data.append(b'age=34')

        url = 'https://httpbin.org/post'
        req = QtNetwork.QNetworkRequest(QtCore.QUrl(url))
        req.setHeader(QtNetwork.QNetworkRequest.KnownHeaders.ContentTypeHeader,
            'application/x-www-form-urlencoded')

        self.nam = QtNetwork.QNetworkAccessManager()
        self.nam.finished.connect(self.handleResponse)
        self.nam.post(req, data)

    def handleResponse(self, reply):

        er = reply.error()

        if er == QtNetwork.QNetworkReply.NetworkError.NoError:

            bytes_string = reply.readAll()

            json_ar = json.loads(str(bytes_string, 'utf-8'))
            data = json_ar['form']

            print(f"Name: {data['name']}")
            print(f"Age: {data['age']}")
            print()

        else:
            print('Error occurred: ', er)
            print(reply.errorString())

        QtCore.QCoreApplication.quit()

def main():

    app = QtCore.QCoreApplication([])
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

The example sends a post request to the https://httpbin.org/post
testing site, which sends the data back in JSON format.

data = QtCore.QByteArray()
data.append(b'name=Peter&amp;amp;')
data.append(b'age=34')

As per specification, we encode the data sent in the QByteArray.

url = 'https://httpbin.org/post'
req = QtNetwork.QNetworkRequest(QtCore.QUrl(url))
req.setHeader(QtNetwork.QNetworkRequest.KnownHeaders.ContentTypeHeader,
    'application/x-www-form-urlencoded')

We specify the application/x-www-form-urlencoded encoding type.

bytes_string = reply.readAll()

json_ar = json.loads(str(bytes_string, 'utf-8'))
data = json_ar['form']

print(f"Name: {data['name']}")
print(f"Age: {data['age']}")
print()

In the handler method, we read the response data and decode it. With the
built-in json module, we extract the posted data.

$ ./post_request.py
Name: Peter
Age: 34

## QNetworkAccessManager authentication

The authenticationRequired signal is emitted whenever
a final server requests authentication before it delivers the requested contents.

authentication.py
  

#!/usr/bin/python

from PyQt6 import QtCore, QtNetwork
import sys, json

class Example:

    def __init__(self):

        self.doRequest()

    def doRequest(self):

        self.auth = 0

        url = 'https://httpbin.org/basic-auth/user7/passwd7'
        req = QtNetwork.QNetworkRequest(QtCore.QUrl(url))

        self.nam = QtNetwork.QNetworkAccessManager()
        self.nam.authenticationRequired.connect(self.authenticate)
        self.nam.finished.connect(self.handleResponse)
        self.nam.get(req)

    def authenticate(self, reply, auth):

        print('Authenticating')

        self.auth += 1

        if self.auth &gt;= 3:
            reply.abort()

        auth.setUser('user7')
        auth.setPassword('passwd7')

    def handleResponse(self, reply):

        er = reply.error()

        if er == QtNetwork.QNetworkReply.NetworkError.NoError:

            bytes_string = reply.readAll()

            data = json.loads(str(bytes_string, 'utf-8'))

            print(f"Authenticated: {data['authenticated']}")
            print(f"User: {data['user']}")

            print()

        else:
            print('Error occurred: ', er)
            print(reply.errorString())

        QtCore.QCoreApplication.quit()

def main():

    app = QtCore.QCoreApplication([])
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

In the example se use the https://httpbin.org website to show how
authentication is done with QNetworkAccessManager.

self.nam.authenticationRequired.connect(self.authenticate)

We connect the authenticationRequired signal to the
authenticate method.

def authenticate(self, reply, auth):

    print('Authenticating')
    ...

The third parameter of the authenticate method is the
QAuthenticator, which is used to pass the required authentication
information.

self.auth += 1

if self.auth &gt;= 3:
    reply.abort()

The QNetworkAccessManager keeps emitting the
authenticationRequired signal if the authentication fails. We abort
the process after three failed attempts.

auth.setUser('user7')
auth.setPassword('passwd7')

We set the user and the password to the QAuthenticator.

bytes_string = reply.readAll()

data = json.loads(str(bytes_string, 'utf-8'))

print(f"Authenticated: {data['authenticated']}")
print(f"User: {data['user']}")

print()

The https://httpbin.org responds with JSON data, which contains the user
name and a boolean value indicating authentication success.

$ ./authentication.py
Authenticating
Authenticated: True
User: user7

## QNetworkAccessManager fetch favicon

A favicon is a small icon associated with a particular website. In the following
example we are going to download a favicon from a website.

fetch_icon.py
  

#!/usr/bin/python

from PyQt6 import QtCore, QtNetwork
import sys

class Example:

    def __init__(self):

        self.doRequest()

    def doRequest(self):

        url = 'http://webcode.me/favicon.ico'
        req = QtNetwork.QNetworkRequest(QtCore.QUrl(url))

        self.nam = QtNetwork.QNetworkAccessManager()
        self.nam.finished.connect(self.handleResponse)
        self.nam.get(req)

    def handleResponse(self, reply):

        er = reply.error()

        if er == QtNetwork.QNetworkReply.NetworkError.NoError:

            data = reply.readAll()
            self.saveFile(data)

        else:
            print('Error occured: ', er)
            print(reply.errorString())

        QtCore.QCoreApplication.quit()

    def saveFile(self, data):

        f = open('favicon.ico', 'wb')

        with f:

            f.write(data)

def main():

    app = QtCore.QCoreApplication([])
    ex = Example()
    sys.exit(app.exec())

if __name__ == '__main__':
    main()

The code example downloads a Google's favicon.

self.nam.get(req)

We download the icon with the get method.

data = reply.readAll()
self.saveFile(data)

In the handleResponse method we read the data and save it to the file.

def saveFile(self, data):

    f = open('favicon.ico', 'wb')

    with f:

        f.write(data)

The image data is saved on the disk in the saveFile method.

In this article we have worked with QNetworkAccessManager.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PyQt tutorials](/all/#pyqt).