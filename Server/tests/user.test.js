const request = require("supertest");
const app = require("../server");

describe("User API", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "John", email: "john@example.com", password: "123456" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "John");
  });
});
