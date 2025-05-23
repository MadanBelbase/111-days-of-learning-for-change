class Parent {
    constructor() {
        console.log("Parent constructor");
    }

    greet() {
        console.log("Hello from Parent");
    }
}

class Child extends Parent {
    constructor() {
        super();  // Calls Parent constructor
        console.log("Child constructor");
    }

    greet() {
        super.greet();  // Calls Parent's greet()
        console.log("Hello from Child");
    }
}

const c = new Child();
// Output:
// Parent constructor
// Child constructor

c.greet();
// Output:
// Hello from Parent
// Hello from Child
