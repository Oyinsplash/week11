"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const organization_1 = require("../model/organization");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongod = new mongodb_memory_server_1.MongoMemoryServer();
// dotenv.config();
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = "mongodb://localhost/myTests";
    const mongooseOpts = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };
    yield mongoose_1.default.connect(uri, mongooseOpts);
});
const closeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.dropDatabase();
    yield mongoose_1.default.connection.close();
    yield mongod.stop();
});
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        yield collection.deleteMany({}, () => { });
    }
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { return connect(); }));
/**
 * Clear all test data after every test.
 */
afterEach(() => __awaiter(void 0, void 0, void 0, function* () { return clearDatabase(); }));
/**
 * Remove and close the db and server.
 */
afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return closeDatabase(); }));
describe("POST /organizations", () => {
    /**
     * Tests that a valid product can be created through the productService without throwing any errors.
     */
    it("can be created correctly", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const organization = new organization_1.Organization({});
        expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield organization.save(); })).not.toThrow();
        done();
    }));
});
describe("GET /organizations", () => {
    /**
     * Tests that a valid product can be created through the productService without throwing any errors.
     */
    it("can be created correctly", (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield organization_1.Organization.find({}); })).not.toThrow();
        done();
    }));
});
describe("DELETE /organizations/:id ", () => {
    /**
     * Tests that a valid product can be created through the productService without throwing any errors.
     */
    it("can be created correctly", (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield organization_1.Organization.findByIdAndRemove(); })).not.toThrow();
        done();
    }));
});
describe("PUT /organizations/:id ", () => {
    /**
     * Tests that a valid product can be created through the productService without throwing any errors.
     */
    it("can be created correctly", (done) => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield organization_1.Organization.findByIdAndUpdate(); })).not.toThrow();
        done();
    }));
});
//# sourceMappingURL=memory.test.js.map