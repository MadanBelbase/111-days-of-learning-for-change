const path = require('path');
const express = require('express');

// Internal modules
const storeRouter = require('./Routes/storeRouter.js');
const hostRouter = require('./Routes/hostRouter.js'); // ✅ Fix applied
const rootdir = require('./utils/pathutils.js');
 const db = require('./utils/databaseutils.js'); // ✅ Fix applied
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootdir, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(storeRouter);
app.use("/host", hostRouter);

const errorhandler = require("./controllers/error.js");
app.use(errorhandler.error404);

const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
