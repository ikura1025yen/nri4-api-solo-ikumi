/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("store").del();
  await knex("store").insert([
    {
      store_name: "大統領",
      region: "上野",
      photo_path: "img/png_1.jpeg",
      date: "2022-11-11",
      comment: "朝10時から空いてる、とにかく人でいっぱい",
    },
    {
      store_name: "正ちゃん",
      region: "浅草",
      photo_path: "img/png_2.jpeg",
      date: "2023-11-13",
      comment: "キタナシュランで取り上げられた、店員さんがやさしい",
    },
    {
      store_name: "はなくじら",
      region: "福島(大阪)",
      photo_path: "img/png_3.jpeg",
      date: "2022-11-11",
      comment: "いつも大行列、おでんが美味しい",
    },
    {
      store_name: "三好",
      region: "学芸大学",
      photo_path: "img/png_4.jpeg",
      date: "2022-11-11",
      comment: "創業1982年の歴史のあるお店、店主のおじいちゃんが優しい",
    },
    {
      store_name: "穴場",
      region: "天満(大阪)",
      photo_path: "img/png_5.jpeg",
      date: "2022-11-11",
      comment: "お寿司がとにかく安く食べられる",
    },
  ]);
};
