/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("store").del();
  await knex("store").insert([
    {
      id: 1,
      store_name: "大統領",
      region: "上野",
      photo_path: "",
      date: "2000-01-01",
    },
    {
      id: 2,
      store_name: "正ちゃん",
      region: "浅草",
      photo_path: "",
      date: "2023-11-13",
    },
    {
      id: 3,
      store_name: "はなくじら",
      region: "福島(大阪)",
      photo_path: "",
      date: "2022-12-29",
    },
  ]);
};