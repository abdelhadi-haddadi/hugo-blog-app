+++
title = "JavaScript Builder pattern tutorial"
date = 2025-08-29T20:01:10.131+01:00
draft = false
description = "Learn how to use the Builder pattern in JavaScript for creating objects, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Builder pattern tutorial

last modified last modified October 18, 2023

 

In this article we show how to use Builder pattern to create objects in
JavaScript.

## Builder pattern

Builder pattern is a design pattern to provide a flexible solution
for creating objects. Builder pattern separates the construction of a complex
object from its representation.

Builder pattern builds a complex object using simple objects by providing a
step by step approach. It belongs to the creational patterns.

## Builder pattern example

The following example uses a Builder pattern with TaskBuilder.

task_creator.js
  

let Task = function(name, description, finished, dueDate) {

    this.name = name;
    this.description = description;
    this.finished = finished;
    this.dueDate = dueDate;
}

let TaskBuilder = function () {

    let name;
    let description;
    let isFinished = false;
    let dueDate;

    return {
        setName: function (name) {
            this.name = name;
            return this;
        },
        setDescription: function (description) {
            this.description = description;
            return this;
        },
        setFinished: function (finished) {
            this.finished = finished;
            return this;
        },
        setDueDate: function (dueDate) {
            this.dueDate = dueDate;
            return this;
        },
        build: function () {
            return new Task(name, description, isFinished, dueDate);
        }
    };
};

let task = new TaskBuilder().setName('Task A').setDescription('finish book')
    .setDueDate(new Date(2019, 5, 12));
console.log(task);

In this example, we have a TaskBuilder which generates Task
objects.

let Task = function(name, description, finished, dueDate) {

    this.name = name;
    this.description = description;
    this.finished = finished;
    this.dueDate = dueDate;
}

This is a Task object. It has four attributes: name, 
description, finished, and dueDate.

return {
    setName: function (name) {
        this.name = name;
        return this;
    },
...    

The TaskBuilder returns functions which set the four attributes.
Note that each function returns this, the reference to the 
current object. This way we can chain the function calls. The chain of 
function calls is known as *fluent API*.

let task = new TaskBuilder().setName('Task A').setDescription('finish book')
    .setDueDate(new Date(2019, 5, 12));
console.log(task);

We create a task using TaskBuilder.

## Source

[Builder pattern](https://en.wikipedia.org/wiki/Builder_pattern)

In this article we have presented the Builder pattern in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)