//syntax
class Box<T> {
    content: T;
  
    constructor(value: T) {
      this.content = value;
    }
  
    getContent(): T {
      return this.content;
    }
  }
   