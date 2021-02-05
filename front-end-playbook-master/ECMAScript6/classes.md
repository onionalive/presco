# Classes

## What are classes?

A class is essentially a template/blueprint that creates an object. JS classes are nothing new for javascript, it is just a cleaner syntax for managing objects.

In most languages, classes contain methods (member functions) and variables (initial member variables) with 'member' meaning contained.

When a new class is called, an instance of that class is created.

### Classes can be declared as follows:

```javascript
class bicycle {
	constructor(speed, gear) {
		this.speed = speed;
		this.gear = gear;
		console.log('constructor called');
	}
	changeGear(newGear){
		this.gear = newGear;
		console.log('changed gear');
	}
}
var bike = new bicycle(0, 1);
bicycle.changeGear(2);
```

### Methods

#### Constructors

In the above example, when a new instance of the class is instantiated, the variables `0` and `1` are passed into the `constructor`. This defines the initial properties when instantiated.

#### Static and Prototype

Static methods are methods that are called by the class and not the instance of the class.

While prototype methods are called by the instance of the class and not the class itself.

This can be best summed up with the below:

```javascript

class hipsterBicycle {
	
	constructor(speed, gear){
		this.speed = speed;
		this.gear = gear;
		console.log('constructor called -> bike instance created');
	}

	static honkStaticHorn(){
		console.log("Novelty Static Horn");
	}
	honkHorn(){
		console.log("Novelty Horn");
	}

}

hipsterBicycle.honkStaticHorn(); // Novelty Static Horn
hipsterBicycle.honkHorn(); // is not a function

var bike = new hipsterBicycle();

bike.honkStaticHorn(); // not a function
bike.honkHorn(); // Novelty Horn

```

### Extend and Super

Extends are common amongst other languages such as PHP which allows a class to extend on another class.

Super constructors calls the constructor of the parent class.

In the below example, the hipster bicycle class extends the bicycle class with the super constructor inheriting the bikes constructor variables.

bicycle.js
```javascript
class Bicycle {
	constructor(speed, gear) {
		this.speed = speed;
		this.gear = gear;
		console.log('constructor called');
	}
	checkBike(){
		return {
			speed: this.speed, 
			gear: this.gear
		};
	}
	changeGear(newGear){
		this.gear = newGear;
		console.log('changed gear');
	}
	goFaster(increment){
		this.speed += increment;
		console.log('goFaster');
	}
	brakes(increment){
		this.speed -= increment;
		console.log('break');
	}
}

export default Bicycle;
```

HipsterBicycle.js
```javascript

import {bicycle} from "./bicycle";

class hipsterBicycle extends bicycle {
	constructor(speed, gear){
		super(speed, gear);
		this.sideBag = true;
	}
	honkHorn(){
		console.log("Novelty Horn");
	}
}

export default HipsterBicycle;
```

main.js
```javascript
import Bicycle from "./modules/bicycle";
import Hipsterbicycle from "./modules/hipsterBicycle";

var bike = new Bicycle(10,1);
console.log(bike.checkBike());

bike.changeGear(2);
console.log(bike.checkBike());

bike.goFaster(2);
console.log(bike.checkBike().speed);

var hipBike = new Hipsterbicycle(1,1);
console.log(hipBike.checkBike());

hipBike.goFaster(5);
hipBike.honkHorn();
```
