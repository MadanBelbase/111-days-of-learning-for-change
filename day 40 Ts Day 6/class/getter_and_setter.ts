class Person {
    private _name: string;
  
    constructor(name: string) {
      this._name = name;
    }
  
    // Getter
    get name(): string {
      return this._name;
    }
  
    // Setter
    set name(newName: string) {
      if (newName.length >= 3) {
        this._name = newName;
      } else {
        console.log("Name must be at least 3 characters long.");
      }
    }
  }
  
  const p = new Person("Madan");
  
  console.log(p.name); // Uses getter → Output: Madan
  
  p.name = "Ma";       // Uses setter → Output: Name must be at least 3 characters long.
  p.name = "Mady";     // Uses setter → Valid
  console.log(p.name); // Output: Mady
  