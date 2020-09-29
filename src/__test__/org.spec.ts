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

  it("Get an organization in the database", async (done) => {
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

  it("Add an organization to the database", async (done) => {
    request
      .post("/graphql")
      .send({
        mutation: 'updateOrganization(id: "5f67977f1b93d25dfb383e9c",organization: "Try",products: ["apps", "maps"],marketValue: "45",address: "7 Asajan street"ceo: "Dojcat",country: "Nigeria",employees: ["Shade", "cups", "tables", "John"]) {organization,employees}'})
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
      });
    done();
  });
});
