const express = require("express");
const knex = require("./knex");

const setupServer = () => {
  const app = express();
  app.use(express.json());

  // app.listen(3000, () => {
  //   console.log(`Server listening on port 3000`);
  // });

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
    const comment = req.body.comment;
    // ToDo
    // const photoPath = req.body.photoPath;
    // const date = req.body.date;
    const store = await knex
      .insert({
        id: id,
        store_name: storeName,
        region: region,
        comment: comment,
      })
      .into("store");
    return res.json(store);
  });

  app.patch("/stores/:id", async (req, res) => {
    const id = req.params.id;
    const value = req.body;
    await knex("store").where({ id: id }).update(value);
    res.sendStatus("200");
  });

  app.delete("/stores/:id", async (req, res) => {
    const id = req.params.id;
    await knex("store").where({ id: id }).del();
    res.sendStatus("200");
  });
  return app;
};

module.exports = { setupServer };
