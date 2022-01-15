const express = require("express");

const router = require("./router");
const middleware = require("./middlewares/");
const db = require("./models/");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(router);

(async function bootstrap() {
  try {
    await db.sequelize.sync();
    app.listen(PORT);
    console.log(`server listening at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
  }
})();
