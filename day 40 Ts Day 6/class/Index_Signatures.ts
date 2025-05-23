// 1️⃣ Define an interface with an index signature
interface StudentGrades {
    [studentName: string]: number; // any string key must map to a number
  }
  
  // 2️⃣ Create an object using that interface
  const grades: StudentGrades = {
    Madan: 92,
    Alice: 85,
    Bob: 78
  };
  
  // 3️⃣ Access values using keys
  console.log(grades["Madan"]); // Output: 92
  console.log(grades.Alice);    // Output: 85
  
  // 4️⃣ Add more data dynamically
  grades["Charlie"] = 88;
  console.log(grades.Charlie);  // Output: 88
  
  // 5️⃣ Invalid example (shows type safety)
  // grades["Eve"] = "A+"; // ❌ Error: Type 'string' is not assignable to type 'number'
  