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

app.post("/stores", async (req, res) => {
  const id = req.body.id;
  const storeName = req.body.store_name;
  const region = req.body.region;
  // ToDo
  // const photoPath = req.body.photoPath;
  // const date = req.body.date;
  const store = await knex
    .insert({ id: id, store_name: storeName, region: region })
    .into("store");
  return res.json(store);
});
