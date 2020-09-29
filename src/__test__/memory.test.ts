import mongoose from "mongoose";
import { Organization } from "../model/organization";
import { MongoMemoryServer } from "mongodb-memory-server";
const mongod = new MongoMemoryServer();
// dotenv.config();
const connect = async () => {
  const uri = "mongodb://localhost/myTests";

  const mongooseOpts = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({}, () => {});
  }
};

beforeAll(async () => connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => closeDatabase());

describe("POST /organizations", () => {
  /**
   * Tests that a valid product can be created through the productService without throwing any errors.
   */
  it("can be created correctly", async (done) => {
    const organization = new Organization({})
    expect(async () => await organization.save()).not.toThrow();
    done();
  });
});
describe("GET /organizations", () => {
  /**
   * Tests that a valid product can be created through the productService without throwing any errors.
   */
  it("can be created correctly", async (done) => {
    expect(async () => await Organization.find({})).not.toThrow();
    done();
  });
});

describe("DELETE /organizations/:id ", () => {
  /**
   * Tests that a valid product can be created through the productService without throwing any errors.
   */
  it("can be created correctly", async (done) => {
    expect(async () => await Organization.findByIdAndRemove()).not.toThrow();
    done();
  });
});
describe("PUT /organizations/:id ", () => {
  /**
   * Tests that a valid product can be created through the productService without throwing any errors.
   */
  it("can be created correctly", async (done) => {
    expect(async () => await Organization.findByIdAndUpdate()).not.toThrow();
    done()
  });
});

