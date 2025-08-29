+++
title = "Go Docker"
date = 2025-08-29T19:55:09.534+01:00
draft = false
description = "Learn how to use Docker with Go. Includes examples of containerizing Go applications."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Docker

last modified April 11, 2024

In this article we show how to use Docker for Golang applications.

Application containerization is an OS-level virtualization method
used to deploy and run distributed applications without having to create an
entire virtual machine for each application. With containers, it is possible to
run multiple isolated applications or services on a single host and access the
same OS kernel. Containers work on bare-metal systems, cloud instances or
virtual machines.

## Docker

Docker is a platform for developers and sysadmins to build, run, and
share applications with containers. Docker facilitates application portability
and scalability. Docker provides application isolation and thus eliminates many
issues caused by library and environment differences. It helps automate
development and deployment. With predefined community images, developers save
time and improve their overall experience.

A Docker image is a read-only template with instructions for creating
a Docker container. A Docker container is a runnable instance of an
image.

Docker images are stored in repositories. The [Docker Hub](https://hub.docker.com/)
is the official Docker repository. Docker Engine is the underlying
client-server technology that builds and runs containers using Docker's
components and services.

A Dockerfile is a special file which contains instructions needed
to build a Docker image.

$ docker --version
Docker version 20.10.17, build 100c701

This is the Docker version we use.

## Go Docker hello example

In the following example, we create and run a very simple Docker image. When we
run the image, a simple Go application is executed.

main.go
  

package main

import (
    "fmt"
    "runtime"
)

func main() {

    fmt.Println("Hello there!")

    osv := runtime.GOOS
    fmt.Printf("The OS is: %s\n", osv)
}

This is a simple console application, which prints a message and the version 
of the underlying OS. 

Dockerfile
  

# syntax=docker/dockerfile:1

FROM golang:1.18

WORKDIR /app

COPY go.mod .

RUN go mod download

COPY *.go .

RUN go build -o /hello

CMD [ "/hello" ]

The Dockerfile is a series of commands to build the image. 

# syntax=docker/dockerfile:1

The first line is an optional syntax parser directive. The directive instructs
the Docker builder what syntax to use when parsing the Dockerfile.

FROM golang:1.18

We base our image on the community golang:1.18. 

WORKDIR /app

We need to set a build directory. The WORKDIR command instructs
Docker to use the specified directory as the default destination for all
subsequent commands. 

COPY go.mod .

We copy the go.mod file into our project directory (/app) with 
COPY.

RUN go mod download

With the RUN instruction, we run the go mod download
command which downloads our Go modules.

COPY *.go .

With the COPY command, we copy the Go source into the build
directory.

RUN go build -o /hello

We build the Go program. We place the executable at the root of the filesystem.

CMD [ "/hello" ]

With the CMD command we tell Docker what command to execute when 
the our image is used to start a container.

$ docker build -t hello .

We build the image and name it hello.

$ docker image ls
REPOSITORY               TAG       IMAGE ID       CREATED          SIZE
hello                    latest    1525ae981450   52 seconds ago   966MB
docker/getting-started   latest    cb90f98fd791   8 weeks ago      28.8MB

We list available images with docker image ls command.

$ docker run hello
Hello there!
The OS is: linux

We run the hello image.

## Multistage build

A multistage build allows use to use multiple images to build a final product.
In a multistage build, we have multiple images in a single Dockerfile. 

$ docker image ls
REPOSITORY               TAG       IMAGE ID       CREATED          SIZE
hello                    latest    1525ae981450   52 seconds ago   966MB
docker/getting-started   latest    cb90f98fd791   8 weeks ago      28.8MB

When we look at the size of the hello image, we notice that it is pretty big.
This is because the image contains all the Go tools and libraries needed to
build an application. However, once an application was built, these may not be
needed anymore. To cope with this problem, we use multi-stage builds. 

main.go
  

package main

import (
    "fmt"
    "runtime"
)

func main() {

    fmt.Println("multi-stage build")

    osv := runtime.GOOS
    fmt.Printf("The OS is: %s\n", osv)
}

We have the same console application.

Dockerfile
  

# syntax=docker/dockerfile:1

# Build

FROM golang:1.18 AS build

WORKDIR /app

COPY go.mod .

RUN go mod download

COPY *.go .

RUN go build -o /hello

# Deploy 

FROM scratch

WORKDIR /

COPY --from=build /hello /hello

CMD [ "/hello" ]

Now, we have two FROM commands forming two stages. 

FROM golang:1.18 AS build

With the AS instruction, we create a stage named
build.

FROM scratch

We use a minimal scratch image for the next stage.

COPY --from=build /hello /hello

We copy the build program from the build stage. 

CMD [ "/hello" ]

Finally, we set the program to be run.

$ docker build -t hello:multistage .

We build the image and give it the multistage label.

$ docker run hello:multistage
multi-stage build
The OS is: linux

We run the new image. 

$ docker image ls
REPOSITORY               TAG          IMAGE ID       CREATED          SIZE
hello                    multistage   28c2d0b534eb   6 minutes ago    1.77MB
hello                    latest       1525ae981450   23 minutes ago   966MB
docker/getting-started   latest       cb90f98fd791   8 weeks ago      28.8MB

There is a huge difference in size. 

## Go Docker echo example

In the next example, we create a simple web application with echo framework. 

main.go
  

package main

import (
    "net/http"

    "github.com/labstack/echo/v4"
)

func main() {

    e := echo.New()

    e.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "Hello there!")
    })

    e.Logger.Fatal(e.Start(":8080"))
}

The application has one text endpoint. It listens on port 8080. 

Dockerfile
  

# syntax=docker/dockerfile:1

# Build

FROM golang:1.18 AS build

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY *.go .

RUN go build -o /hello

# Deploy 

FROM debian:latest

WORKDIR /

COPY --from=build /hello /usr/local/bin/hello

EXPOSE 8080

ENTRYPOINT [ "/usr/local/bin/hello" ]

The EXPOSE instruction informs Docker that the container listens on
the specified network port at runtime.

FROM debian:latest

We base our image on Debian image.

$ docker build -t web .

Web build the image.

$ docker run -p 8080:8080 web

    ____    __
   / __/___/ /  ___
  / _// __/ _ \/ _ \
 /___/\__/_//_/\___/ v4.7.2
 High performance, minimalist Go web framework
 https://echo.labstack.com
 ____________________________________O/_______
                                     O\
 ⇨ http server started on [::]:8080
 

We run the image. The container's 8080 port is mapped to our computer's 8080
port.

$ curl localhost:8080
Hello there!

We create a GET request with curl.

## Source

[Go Docker image](https://hub.docker.com/_/golang)

In this article we have worked Go and Docker.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).