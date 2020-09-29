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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var graphql_1 = require("graphql");
// import { Organization, validation } from "./organization";
// import User from "./user";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
var carStore_1 = require("./carStore");
// Purchased cars
var PurchasedType = new graphql_1.GraphQLObjectType({
    name: "purchase",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        modelNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        saleDate: { type: graphql_1.GraphQLString },
        buyer: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        color: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    }); },
});
// all cars
var CarType = new graphql_1.GraphQLObjectType({
    name: "car",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        productionDate: { type: graphql_1.GraphQLString },
        color: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
        amount: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        condition: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
        price: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
    }); },
});
var StaffType = new graphql_1.GraphQLObjectType({
    name: "staff",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        salary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        homeAddress: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
    }); },
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        allCars: {
            type: new graphql_1.GraphQLList(CarType),
            resolve: function (parent, args) {
                return carStore_1.Car.find({});
            },
        },
        purchasedCars: {
            type: new graphql_1.GraphQLList(PurchasedType),
            resolve: function (parent, args) {
                return carStore_1.Purchase.find({});
            },
        },
        staffs: {
            type: new graphql_1.GraphQLList(StaffType),
            resolve: function () {
                return carStore_1.Staff.find({});
            },
        },
        getPurchasedBy: {
            type: PurchasedType,
            args: {
                type: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLString },
            },
            resolve: function (_, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var color, type;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                color = args.color, type = args.type;
                                return [4 /*yield*/, carStore_1.Purchase.find({
                                        $or: [{ type: type }, { color: color }],
                                    })
                                        .exec()
                                        .then(function (data) { return data; })
                                        .catch(function (err) { return err; })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
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
            resolve: function (_, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var type, condition, price;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                type = args.type, condition = args.condition, price = args.price;
                                return [4 /*yield*/, carStore_1.Car.find({
                                        $or: [{ type: type, condition: condition, price: price }],
                                    }).exec().then(function (data) { return data; }).catch(function (err) { return err; })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            },
        },
    },
});
var Mutation = new graphql_1.GraphQLObjectType({
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
            resolve: function (_, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var car, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, new carStore_1.Car(args)];
                            case 1:
                                car = _b.sent();
                                return [2 /*return*/, car.save()];
                            case 2:
                                _a = _b.sent();
                                (function (err) { return console.log(err.message); });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
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
            resolve: function (_, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var staff, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, new carStore_1.Staff(args)];
                            case 1:
                                staff = _b.sent();
                                return [2 /*return*/, staff.save()];
                            case 2:
                                _a = _b.sent();
                                (function (err) { return console.log(err.message); });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
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
            resolve: function (_, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var purchase, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, new carStore_1.Purchase(args)];
                            case 1:
                                purchase = _b.sent();
                                return [2 /*return*/, purchase.save()];
                            case 2:
                                _a = _b.sent();
                                (function (err) { return console.log(err.message); });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
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
            resolve: function (parentValue, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, theRest, result, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                id = args.id, theRest = __rest(args, ["id"]);
                                return [4 /*yield*/, carStore_1.Car.findByIdAndUpdate(id, theRest, {
                                        new: true,
                                    })];
                            case 1:
                                result = _b.sent();
                                return [2 /*return*/, result];
                            case 2:
                                _a = _b.sent();
                                (function (err) { return console.log(err.message); });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        },
    }
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: Mutation });
