const chai = require("chai");
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
});
