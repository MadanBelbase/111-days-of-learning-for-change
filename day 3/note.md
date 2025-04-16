## ✅ Day 3 – Parsing Requests and Data Flow in Node.js


### 🧠 Key Concepts Explored

- **Streams, Chunks, and Buffers**
  - Data is received in parts (chunks).
  - These chunks are collected using `req.on('data')` and buffered using `Buffer.concat()`.
  - Ensures proper order and full message reconstruction.

- **Sockets**
  - Two-way communication channel.
  - Allows real-time data flow between client and server.

- **Parsing URL-encoded Data**
  - Converting request body into a string.
  - Extracting parameters and creating an object (using string methods or `Object.fromEntries()`).

- **File Handling**
  - Saving parsed input data using `fs.writeFile`.

- **Modularization**
  - Logic is separated into reusable modules with `module.exports` and `require()`.

- **Mini Project – Calculator**
  - Set up basic calculator logic.
  - Routes, handlers, and modular structure to keep code clean and scalable.

---

### 💬 Reflections

I now understand how data flows in Node.js at a deeper level. It’s empowering to see how modular code and stream handling simplify building real apps. Can’t wait to refine the calculator logic and move into async and Express.js soon!
