// T must have a length property
class LengthChecker<T extends { length: number }> {
    checkLength(item: T): number {
      return item.length;
    }
  }
  
  const checker = new LengthChecker<string>();
  console.log(checker.checkLength("Hello")); // Output: 5
  