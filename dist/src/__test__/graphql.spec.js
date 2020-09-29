"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const request = supertest_1.default(app_1.default);
describe('Test for Task 0ne', () => {
    it('Get all all organizations in the database', (done) => {
        request
            .post("/graphql")
            .send({ query: "{ organizations{id, noOfEmployees}}" })
            .set("Accept", "application/json")
            .expect("Content-type", /json/).end(function (err, res) {
            if (err)
                return done(err);
            console.log(res.body, '========> yo bro');
            expect(res.body).toBeInstanceOf(Object);
        });
    });
});
//# sourceMappingURL=graphql.spec.js.map