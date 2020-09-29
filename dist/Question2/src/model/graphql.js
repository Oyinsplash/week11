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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// import { Organization, validation } from "./organization";
// import User from "./user";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
const carStore_1 = require("./carStore");
// Purchased cars
const PurchasedType = new graphql_1.GraphQLObjectType({
    name: "purchase",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        modelNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        saleDate: { type: graphql_1.GraphQLString },
        buyer: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        color: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    }),
});
// all cars
const CarType = new graphql_1.GraphQLObjectType({
    name: "car",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        productionDate: { type: graphql_1.GraphQLString },
        color: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
        amount: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        condition: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
        price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
    }),
});
const StaffType = new graphql_1.GraphQLObjectType({
    name: "staff",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        salary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        homeAddress: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        allCars: {
            type: new graphql_1.GraphQLList(CarType),
            resolve(parent, args) {
                return carStore_1.Car.find({});
            },
        },
        purchasedCars: {
            type: new graphql_1.GraphQLList(PurchasedType),
            resolve(parent, args) {
                return carStore_1.Purchase.find({});
            },
        },
        staffs: {
            type: new graphql_1.GraphQLList(StaffType),
            resolve() {
                return carStore_1.Staff.find({});
            },
        },
        getPurchasedBy: {
            type: PurchasedType,
            args: {
                type: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLString },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { color, type } = args;
                    return yield carStore_1.Purchase.find({
                        $or: [{ type }, { color }],
                    })
                        .exec()
                        .then((data) => data)
                        .catch((err) => err);
                });
            },
        },
        getAllCarsBy: {
            type: CarType,
            args: {
                type: { type: graphql_1.GraphQLString },
                condition: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLInt },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { type, condition, price } = args;
                    return yield carStore_1.Car.find({
                        $or: [{ type, condition, price }],
                    }).exec().then((data) => data).catch((err) => err);
                });
            },
        },
    },
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createCar: {
            type: CarType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                type: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                productionDate: { type: graphql_1.GraphQLString },
                color: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                amount: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                condition: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let car = yield new carStore_1.Car(args);
                        return car.save();
                    }
                    catch (_a) {
                        (err) => console.log(err.message);
                    }
                });
            },
        },
        addstaff: {
            type: StaffType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                salary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                homeAddress: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let staff = yield new carStore_1.Staff(args);
                        return staff.save();
                    }
                    catch (_a) {
                        (err) => console.log(err.message);
                    }
                });
            },
        },
        addPurchase: {
            type: PurchasedType,
            args: {
                type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                modelNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                saleDate: { type: graphql_1.GraphQLString },
                buyer: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                color: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve(_, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let purchase = yield new carStore_1.Purchase(args);
                        return purchase.save();
                    }
                    catch (_a) {
                        (err) => console.log(err.message);
                    }
                });
            }
        },
        updateCar: {
            type: CarType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                type: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                productionDate: { type: graphql_1.GraphQLString },
                color: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                amount: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                condition: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve(parentValue, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { id } = args, theRest = __rest(args, ["id"]);
                        const result = yield carStore_1.Car.findByIdAndUpdate(id, theRest, {
                            new: true,
                        });
                        return result;
                    }
                    catch (_a) {
                        (err) => console.log(err.message);
                    }
                });
            },
        },
    }
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: Mutation });
//# sourceMappingURL=graphql.js.map