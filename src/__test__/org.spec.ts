import supertest from "supertest";
import app from "../app";
import { object } from "joi";

//jest.setTimeout(30000)
const request = supertest(app);

describe("Test for Task 0ne", () => {
  it("Get all all organizations in the database", async (done) => {
    request
      .post("/graphql")
      .send({
        query: "{ organizations{id, noOfEmployees}}",
      })
      .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        
      .end(function (err, res) {
        console.log("i got here");
        if (err) return done(err);
        console.log(res.body);
        expect(res.body).toBeInstanceOf(Object);
      });
    done();
  });

  it("Get one organizations in the database", async (done) => {
    request
      .post("/graphql")
      .send({
        query: "organization(id:'5f67977f1b93d25dfb383e9c'){organization}",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        console.log("i got here");
        if (err) return done(err);
        console.log(res.body);
        expect(res.body).toBeInstanceOf(Object);
      });
    done();
  });
});
