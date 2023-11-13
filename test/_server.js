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
  beforeEach(() => {
    request = chai.request(server);
  });

  after(async () => {
    await knex.from("store").where("id", 100).del();
  });

  describe("GET /stores", () => {
    it("should return stores", async () => {
      let expected = await knex.select().from("store");
      expected = expected.map((item) => {
        return {
          ...item,
          date: item.date.toISOString(),
        };
      });
      const res = await request.get("/stores");
      res.body.should.deep.equal(expected);
    });
  });

  describe("POST /stores", () => {
    it("should register stores", async () => {
      const testData = {
        id: 100,
        store_name: "鳥せん",
        region: "学芸大学",
        photo_path: "",
        date: "2000-01-01",
        comment: "",
      };
      await request.post("/stores").send(testData);

      const newData = await knex.select().from("store").where("id", 100);
      expect(newData).to.exist;
    });
  });

  describe("PATCH /stores/:id", () => {
    it("should update stores", async () => {
      const updateData = { store_name: "更新" };
      await request.patch("/stores/100").send(updateData);

      const newData = await knex
        .select("store_name")
        .from("store")
        .where("id", 100);
      expect(newData[0]).to.deep.equal(updateData);
    });
  });

  describe("DELETE /stores/:id", () => {
    it("should update stores", async () => {
      await request.delete("/stores/100");

      const newData = await knex
        .select("store_name")
        .from("store")
        .where("id", 100);
      expect(newData[0]).to.deep.equal(undefined);
    });
  });
});
