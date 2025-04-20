Important Points to Remember:

app.use() in Express:
app.use() is used to define middleware functions.
It can be used to specify the routes it applies to (e.g., /Home, /).
Middleware has access to the req, res, and next() functions.
How Middleware Works:
Middleware can either:
End the request-response cycle by sending a response (e.g., res.send()).
Or pass control to the next middleware using next().
In the provided example, no next() is used because the response is sent directly, so the middleware cycle ends there.
Matching Routes:
app.use() matches all routes by default unless you specify a path.
Example: app.use("/Home", handler) will only apply to /Home, whereas app.use(handler) applies to all routes.
Middleware Execution Flow:
When you send a response in middleware (like res.send()), the flow ends for that route. No further middleware will be executed for that route unless you explicitly use next().
🚀 Key Takeaways:
Middleware: The heart of routing and HTTP request handling in Express.
app.use(): Useful for both defining general middleware and handling specific routes.
No next() in this example: The response is sent directly in each middleware, so no need to call next().
🧑‍💻 Output:
Visiting http://localhost:3000/ displays: "Hello from Middleware 1"
Visiting http://localhost:3000/Home displays: "Hello from Middleware 2"
