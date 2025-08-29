+++
title = "Java Future"
date = 2025-08-29T19:58:59.822+01:00
draft = false
description = "Java Future tutorial shows how to do asynchronous programming in Java using Future."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Future

last modified January 27, 2024

 

Java Future tutorial shows how to do asynchronous programming in Java using
Future.

Future represents the result of an asynchronous computation. Methods
are provided to check if the computation is complete, to wait for its
completion, and to retrieve the result of the computation. In simple terms, 
a future is promise to hold the result of some operation once that operation 
completes. Future was introduced in Java 5.

The value is retrieved from a future with get, which blocks 
until the value is ready.

FutureTask class is an implementation of Future that
implements Runnable, and so may be executed by an
Executor.

Futures have several shortcomings. For instance, they cannot be manually completed
and they do not notify when they are completed. Futures cannot be chained 
and combined. In addition, there is no exception handling. 
To address this shortcomings, Java 8 introduced CompletableFuture.

## Java Future example

The following example uses futures to compute factorials.

com/zetcode/FactorialCalculator.java
  

package com.zetcode;

import java.math.BigInteger;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

public class FactorialCalculator implements Callable&lt;BigInteger&gt; {

    private int value;

    public FactorialCalculator(int value) {

        this.value = value;
    }

    @Override
    public BigInteger call() throws Exception {

        var result = BigInteger.valueOf(1);

        if (value == 0 || value == 1) {

            result = BigInteger.valueOf(1);
        } else {

            for (int i = 2; i &lt;= value; i++) {

                result = result.multiply(BigInteger.valueOf(i));
            }
        }

        TimeUnit.MILLISECONDS.sleep(500);

        return result;
    }
}

The FactorialCalculator computes factorials using BigInteger.

public class FactorialCalculator implements Callable&lt;BigInteger&gt; {

The FactorialCalculator implements a Callable. A Callable
represents an asynchronous task that returns a result. In our case the result is a 
computed factorial.

TimeUnit.MILLISECONDS.sleep(1500);

We slow down the computation a bit.

com/zetcode/JavaFutureEx.java
  

package com.zetcode;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ThreadPoolExecutor;

public class JavaFutureEx {

    public static void main(String[] args) throws ExecutionException, InterruptedException {

        var executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(2);

        List&lt;Map&lt;Integer, Future&lt;BigInteger&gt;&gt;&gt; resultList = new ArrayList&lt;&gt;();

        var random = new Random();

        for (int i = 0; i &lt; 6; i++) {

            int number = random.nextInt(100) + 10;
            var factorialCalculator = new FactorialCalculator(number);

            Map&lt;Integer, Future&lt;BigInteger&gt;&gt; result = new HashMap&lt;&gt;();
            result.put(number, executor.submit(factorialCalculator));
            resultList.add(result);
        }

        for (Map&lt;Integer, Future&lt;BigInteger&gt;&gt; pair : resultList) {

            var optional = pair.keySet().stream().findFirst();

            if (!optional.isPresent()) {
                return;
            }

            var key = optional.get();

            System.out.printf("Value is: %d%n", key);

            var future = pair.get(key);
            var result = future.get();
            var isDone = future.isDone();

            System.out.printf("Result is %d%n", result);
            System.out.printf("Task done: %b%n", isDone);
            System.out.println("--------------------");
        }

        executor.shutdown();
    }
}

We generate six random integers and calculate their factorial.

var executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(2);

The executor service handles the lifecycle of asynchronous tasks. Its submit 
can accept a Runnable as well as a Callable object.

var factorialCalculator = new FactorialCalculator(number);

A FactorialCalculator task is created. It will be run asynchronously.

Map&lt;Integer, Future&lt;BigInteger&gt;&gt; result = new HashMap&lt;&gt;();
result.put(number, executor.submit(factorialCalculator));
resultList.add(result);

We submit the tasks to the executor. We put the integer value and the future in a 
map so that we have the value and the computed factorial at hand.

for (Map&lt;Integer, Future&lt;BigInteger&gt;&gt; pair : resultList) {

We go through the list of results. Note that the futures are returned quickly
before their values are computed. 

var optional = pair.keySet().stream().findFirst();

if (!optional.isPresent()) {
    return;
}

var key = optional.get();

We get the key of the pair.

var future = pair.get(key);
var result = future.get();

Using the key we get the future. When we call get, the 
processing is blocked until the value is retrieved.

Value is: 39
Result is 20397882081197443358640281739902897356800000000
Task done: true
--------------------
Value is: 99
Result is 933262154439441526816992388562667004907159682643816214685929638952175999932299156089414639761565182862536979208272237582511852109168640000000000000000000000
Task done: true
--------------------
Value is: 39
Result is 20397882081197443358640281739902897356800000000
Task done: true
--------------------
Value is: 102
Result is 961446671503512660926865558697259548455355905059659464369444714048531715130254590603314961882364451384985595980362059157503710042865532928000000000000000000000000
Task done: true
--------------------
Value is: 12
Result is 479001600
Task done: true
--------------------
Value is: 49
Result is 608281864034267560872252163321295376887552831379210240000000000
Task done: true
--------------------

## Source

[Java Future - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/concurrent/Future.html)

In this article we have used Java's Future.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).