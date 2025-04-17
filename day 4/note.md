## ✅ Day 4 – Handling Forms and Routing in Node.js

### 🔗 GitHub Links
- 📘 Notes: [note.md](https://github.com/madanbelbase/NodeJS-Learning-Notes/blob/main/note.md)
- 💻 Code: [Day4 Folder](https://github.com/madanbelbase/NodeJS-Learning-Notes/tree/main/Day4)

---

### 📥 Topics Learned

- **Routing in Node.js**
  - Used `req.url` and `req.method` to serve different content.
  - Showed a homepage with a form using `res.write`.

- **Form Handling**
  - Created a simple HTML form with:
    - Name input
    - Gender radio buttons
    - POST method submission to `/submit`

- **Parsing Data**
  - Used `req.on("data")` to collect form data in chunks.
  - Combined chunks with `Buffer.concat()` and converted to string.
  - Parsed using `URLSearchParams` and stored as an object.

- **Writing to File**
  - Stored parsed user data in `Data.txt` using `fs.writeFileSync`.

- **Redirection & 404**
  - Redirected to homepage after form submission.
  - Handled invalid URLs with a custom 404 page.

---

### 💬 Reflection

This day gave me hands-on experience building a form-based Node.js backend with custom routing and no frameworks. The concepts of buffering, parsing, and file writing helped me understand raw Node.js capabilities. I'm now more confident handling server requests, and can't wait to try async file handling and validation next!

 