const express = require("express");
const knex = require("./knex");

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});

app.get("/", (req, res) => {
  console.log("OK");
});

app.get("/stores", async (req, res) => {
  const store = await knex.select().from("store");
  return res.json(store);
});
