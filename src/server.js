const express = require("express");
const knex = require("./knex");

const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.static("src/pages"));

  // app.listen(3000, () => {
  //   console.log(`Server listening on port 3000`);
  // });

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
  });

  app.get("/stores", async (req, res) => {
    let store = await knex.select().from("store");
    store = store.map((item) => {
      return {
        ...item,
        date: item.date.toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "Asia/Tokyo",
        }),
      };
    });

    return res.json(store);
  });

  app.post("/stores", async (req, res) => {
    const storeName = req.body.store_name;
    const region = req.body.region;
    const comment = req.body.comment;
    const photoPath = req.body.photoPath;
    const date = req.body.date ? req.body.date : new Date();
    const storeId = await knex
      .insert({
        store_name: storeName,
        region: region,
        photo_path: photoPath,
        date: date,
        comment: comment,
      })
      .returning("id")
      .into("store");
    return res.json(storeId[0]);
  });

  app.patch("/stores/:id", async (req, res) => {
    const id = req.params.id;
    const values = req.body;

    const currentData = await knex("store").where({ id: id }).first();
    const margedData = { ...currentData };
    console.log(margedData);
    Object.keys(values).forEach((key) => {
      if (values[key] !== "") {
        margedData[key] = values[key];
      }
    });

    margedData.date = new Date();

    await knex("store").where({ id: id }).update(margedData);
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
