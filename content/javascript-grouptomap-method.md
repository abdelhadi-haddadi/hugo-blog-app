+++
title = "JavaScript groupToMap method"
date = 2025-08-29T20:02:08.192+01:00
draft = false
description = "JavaScript groupToMap tutorial shows how to group array elements into a Map in JavaScript. The tutorial provides numerous examples to demonstrate element grouping in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript groupToMap method

last modified April 4, 2025

 

In this article we show how to group array elements using the 
groupToMap method in JavaScript.

## Array grouping with groupToMap

The groupToMap method groups elements of an array according to a 
callback function. It returns a Map where keys are the grouping values and 
values are arrays of elements. This method is useful for organizing data into 
categories based on specific criteria.

Unlike group, groupToMap returns a Map object instead 
of a plain object. Maps preserve insertion order and can use any value as keys, 
including objects. The original array remains unchanged after the grouping 
operation.

The callback function receives each element and returns the grouping key. The 
method is available on Array.prototype in modern JavaScript environments. It 
provides an efficient way to categorize data while maintaining the original 
element references.

## Basic groupToMap example

The following example demonstrates the basic usage of the groupToMap
method.

main.js
  

const inventory = [
  { name: 'asparagus', type: 'vegetables' },
  { name: 'bananas', type: 'fruit' },
  { name: 'goat', type: 'meat' },
  { name: 'cherries', type: 'fruit' },
  { name: 'fish', type: 'meat' }
];

const grouped = inventory.groupToMap(item =&gt; item.type);

console.log(grouped);

We create an array of objects and group them by their type property. The 
callback function returns the type value for each element. The method returns 
a Map where keys are the unique type values and values are arrays of matching 
objects.

$ node main.js
Map(3) {
  'vegetables' =&gt; [ { name: 'asparagus', type: 'vegetables' } ],
  'fruit' =&gt; [
    { name: 'bananas', type: 'fruit' },
    { name: 'cherries', type: 'fruit' }
  ],
  'meat' =&gt; [
    { name: 'goat', type: 'meat' },
    { name: 'fish', type: 'meat' }
  ]
}

## Grouping by numeric property

The groupToMap method can group elements based on numeric values.

main.js
  

const students = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 72 },
  { name: 'Charlie', score: 85 },
  { name: 'David', score: 65 },
  { name: 'Eve', score: 72 }
];

const grouped = students.groupToMap(student =&gt; student.score);

console.log(grouped);

We group students by their test scores. The callback function returns the 
numeric score value. The resulting Map uses the scores as keys and arrays of 
student objects as values. Multiple students can share the same score.

$ node main.js
Map(3) {
  85 =&gt; [
    { name: 'Alice', score: 85 },
    { name: 'Charlie', score: 85 }
  ],
  72 =&gt; [
    { name: 'Bob', score: 72 },
    { name: 'Eve', score: 72 }
  ],
  65 =&gt; [ { name: 'David', score: 65 } ]
}

## Grouping with complex keys

The groupToMap method can use objects as grouping keys.

main.js
  

const transactions = [
  { amount: 100, currency: 'USD', date: '2023-01-15' },
  { amount: 200, currency: 'EUR', date: '2023-01-15' },
  { amount: 150, currency: 'USD', date: '2023-01-16' },
  { amount: 300, currency: 'EUR', date: '2023-01-16' }
];

const grouped = transactions.groupToMap(tx =&gt; {
  return { currency: tx.currency, date: tx.date };
});

console.log(grouped);

We group transactions by both currency and date using an object as the key. The 
callback function returns an object with these properties. The Map uses these 
objects as keys, demonstrating groupToMap's ability to handle complex key types.

$ node main.js
Map(4) {
  { currency: 'USD', date: '2023-01-15' } =&gt; [
    { amount: 100, currency: 'USD', date: '2023-01-15' }
  ],
  { currency: 'EUR', date: '2023-01-15' } =&gt; [
    { amount: 200, currency: 'EUR', date: '2023-01-15' }
  ],
  { currency: 'USD', date: '2023-01-16' } =&gt; [
    { amount: 150, currency: 'USD', date: '2023-01-16' }
  ],
  { currency: 'EUR', date: '2023-01-16' } =&gt; [
    { amount: 300, currency: 'EUR', date: '2023-01-16' }
  ]
}

## Grouping with thisArg parameter

The groupToMap method accepts an optional thisArg parameter.

main.js
  

const products = [
  { name: 'Laptop', category: 'Electronics', price: 999 },
  { name: 'Shirt', category: 'Clothing', price: 25 },
  { name: 'Phone', category: 'Electronics', price: 699 },
  { name: 'Pants', category: 'Clothing', price: 40 }
];

const categoryGroups = {
  Electronics: 'Tech',
  Clothing: 'Apparel'
};

const grouped = products.groupToMap(function(product) {
  return this[product.category] || 'Other';
}, categoryGroups);

console.log(grouped);

We use the thisArg parameter to provide context to the callback function. The 
callback maps category names to group names using the provided object. This 
demonstrates how to customize grouping logic with external configuration.

$ node main.js
Map(2) {
  'Tech' =&gt; [
    { name: 'Laptop', category: 'Electronics', price: 999 },
    { name: 'Phone', category: 'Electronics', price: 699 }
  ],
  'Apparel' =&gt; [
    { name: 'Shirt', category: 'Clothing', price: 25 },
    { name: 'Pants', category: 'Clothing', price: 40 }
  ]
}

## Grouping with index parameter

The callback function can access the current element's index.

main.js
  

const numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const grouped = numbers.groupToMap((num, index) =&gt; {
  return Math.floor(index / 3); // Group every 3 elements
});

console.log(grouped);

We group array elements based on their indices, creating groups of three 
elements each. The callback function uses the index parameter to calculate 
group numbers. This demonstrates how to create fixed-size batches of elements.

$ node main.js
Map(4) {
  0 =&gt; [ 10, 20, 30 ],
  1 =&gt; [ 40, 50, 60 ],
  2 =&gt; [ 70, 80, 90 ],
  3 =&gt; [ 100 ]
}

## Source

[Array groupToMap - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/groupToMap)

In this article we have demonstrated how to use the groupToMap() method to 
organize array elements into categorized Map structures in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)