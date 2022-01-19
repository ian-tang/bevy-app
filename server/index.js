const express = require("express");
const cors = require("cors");

const router = require("./router");
const db = require("./models/");

const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
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
