# Arrow functions

## What are arrow functions?

On a basic level, arrow functions are a shorthand version of anonymous functions. Below is an example of the same function written in the two versions.

```javascript

var c = function(a, b){
	return Math.sqrt(a*a + b*b);
}

var c = (a, b) => {return Math.sqrt(a*a + b*b)};
var cImplied = (a, b) => Math.sqrt(a*a + b*b);

// abother example

var hipsterQuote = function(){
	return "Is it organic?";
}

var hipsterQuote = () => "Is it organic?";

```

## Lexical this

Lexical `this` refers to the `this` relating to the containing function. Why is this important? The most comnmon example to show this is the following:

```javascript

function Counter() {
  this.number = 0;
  console.log(this.number);

  setInterval(function() {
    this.number++;
    console.log(this.number);
  }, 1000);
}

var count = new Counter();

```

This will output `0`, followed by `null` every second when using js strict mode. Why is this? because `this.number` is contained the function block while the `this.number++` is defined to the instance of the anonymous fn.

What is the solution?

Prior to ES2015, the solution was to use `self` or `that`;

```javascript

function Counter() {
  var self = this;
  self.number = 0;
  console.log(self.number);

  setInterval(function() {
    self.number++;
    console.log(self.number);
  }, 1000);
}

var count = new Counter();

```

However, in ES2015, we can use the following:

```javascript

function Counter() {
  this.number = 0;
  console.log(this.number);

  setInterval(() => {
    this.number++;
    console.log(this.number);
  }, 1000);
}

var count = new Counter();

```

Notice that `this.number` is bound to the inital `this.number` in the parent function. This removes the necessity of using `self` and `that` which is syntactically cleaner.

