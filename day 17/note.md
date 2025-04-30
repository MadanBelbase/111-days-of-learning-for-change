# 📚 Daily Learning Summary – Node.js, MongoDB, Environment Variables & Promises

## 🔸 1. Environment Variables (`.env`)
- Use `.env` to store sensitive values like `PORT`, `MONGO_URL`.
- Keeps codebase clean and secure.
- Easily switch configurations without changing the source code.
- Use `dotenv` to load these variables in your app.

## 🔸 2. Git Ignore Best Practice
- Use `.gitignore` to avoid uploading:
  - `node_modules/`
  - `.env`
  - `.DS_Store`
  - Log files
- Keeps the repository clean and secure.

## 🔸 3. MongoDB Connection with Callback
- A utility function is used to connect to MongoDB.
- It uses a callback to ensure the connection is established before starting the server.
- Helps modularize code and improves maintainability.

## 🔸 4. `getDb` Function
- Used to access the database instance after connection.
- Throws an error if called before MongoDB is connected.
- Prevents runtime errors due to undefined DB access.

## 🔸 5. Error Fix: Cannot Read Properties of Undefined (Reading 'then')
- This error happens when `.then()` is called on something that isn't a Promise.
- Causes:
  - Not returning a Promise
  - Incorrect method that doesn’t return a Promise
- Solution:
  - Make sure the object is a valid Promise before chaining `.then()`.

## 🔸 6. Avoid Hardcoding Port in `app.js`
- Don't hardcode `PORT` directly in your source.
- Use `process.env.PORT` to make the code deployable and configurable.
- It helps when deploying to services like Heroku, Vercel, or Docker containers.

## 🔸 7. What is a Promise?
- A Promise is used to handle **asynchronous** operations in JavaScript.
- Has 3 states:
  - **Pending**
  - **Resolved (fulfilled)**
  - **Rejected (error)**
- Helps manage complex flows like API calls, file handling, DB operations.

---

## 📝 Takeaway Notes 

- ✅ Always use `.env` for secrets and configs.
- ✅ Setup `.gitignore` properly to protect sensitive and bulky files.
- ✅ Ensure MongoDB connection is established before using `getDb()`.
- ✅ Promises are key to handling async logic clearly.
- ✅ Avoid using `.then()` unless you're sure it's a Promise.
- ✅ Don’t hardcode sensitive data or ports in your application logic.

---
