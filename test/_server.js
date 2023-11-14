const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const { setupServer } = require("../src/server");

const knex = require("../src/knex");

const server = setupServer();
describe("Izakaya API Server", () => {
  let request;
  let testId = 1000;
  beforeEach(() => {
    request = chai.request(server);
  });

  before(async () => {
    const insertedData = await knex
      .insert({
        store_name: "testStore",
        region: "testRegion",
        photo_path: "testPhotoPath",
        // date: date,
        comment: "TestComment",
      })
      .returning("id")
      .into("store");
    testId = insertedData[0].id;
  });

  after(async () => {
    await knex.from("store").where("store_name", "鳥せん").del();
  });

  describe("GET /stores", () => {
    it("should return stores", async () => {
      let expected = await knex.select().from("store");
      expected = expected.map((item) => {
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
      const res = await request.get("/stores");
      res.body.should.deep.equal(expected);
    });
  });

  describe("POST /stores", () => {
    it("should register stores", async () => {
      const testData = {
        store_name: "鳥せん",
        region: "学芸大学",
        photo_path: "",
        date: "2000-01-01",
        comment: "",
      };
      const res = await request.post("/stores").send(testData);
      const testId = res.body.id;
      const newData = await knex.select().from("store").where("id", testId);
      expect(newData[0].store_name).to.equal(testData.store_name);
    });
  });

  describe("PATCH /stores/:id", () => {
    it("should update stores", async () => {
      const updateData = { store_name: "更新" };
      const res = await request.patch(`/stores/${testId}`).send(updateData);
      const newData = await knex
        .select("store_name")
        .from("store")
        .where("id", testId);
      expect(newData[0]).to.deep.equal(updateData);
    });
  });

  describe("DELETE /stores/:id", () => {
    it("should update stores", async () => {
      await request.delete(`/stores/${testId}`);
      const newData = await knex
        .select("store_name")
        .from("store")
        .where("id", testId);
      expect(newData[0]).to.deep.equal(undefined);
    });
  });
});
