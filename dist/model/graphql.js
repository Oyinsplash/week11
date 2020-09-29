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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var organization_1 = require("./organization");
var user_1 = __importDefault(require("./user"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import authenticator from "../middleware/authorization";
var OrganizationType = new graphql_1.GraphQLObjectType({
    name: "organization",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        organization: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        products: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
        marketValue: { type: graphql_1.GraphQLInt },
        address: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        ceo: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        country: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        employees: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
        noOfEmployees: { type: graphql_1.GraphQLInt },
    }); },
});
// User Type
var UserType = new graphql_1.GraphQLObjectType({
    name: "user",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    }); },
});
// Root Query
var RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        organization: {
            type: OrganizationType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve: function (parentValue, args, req) {
                // authenticator(req);
                return organization_1.Organization.findById(args.id);
            },
        },
        organizations: {
            type: new graphql_1.GraphQLList(OrganizationType),
            resolve: function (parent, args) {
                return organization_1.Organization.find({});
            },
        },
        user: {
            type: UserType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve: function (parentValue, args) {
                return user_1.default.findById(args.id);
            },
        },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve: function (parentValue, args) {
                return user_1.default.find({});
            },
        },
    },
});
// Mutations
var Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createOrganization: {
            type: OrganizationType,
            args: {
                organization: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                products: {
                    type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)),
                },
                marketValue: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                address: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                ceo: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                country: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                noOfEmployees: { type: graphql_1.GraphQLInt },
                employees: {
                    type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)),
                },
            },
            resolve: function (parentValue, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, error, value, organization, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                args.noOfEmployees = args.employees.length;
                                _a = organization_1.validation(args), error = _a.error, value = _a.value;
                                if (error)
                                    return [2 /*return*/, error];
                                return [4 /*yield*/, new organization_1.Organization(value)];
                            case 1:
                                organization = _c.sent();
                                return [2 /*return*/, organization.save()];
                            case 2:
                                _b = _c.sent();
                                (function (err) { return console.log(err.message); });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        },
        updateOrganization: {
            type: OrganizationType,
            args: {
                id: { type: graphql_1.GraphQLID },
                organization: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                products: {
                    type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)),
                },
                marketValue: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                address: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                ceo: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                country: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
                },
                noOfEmployees: { type: graphql_1.GraphQLInt },
                employees: {
                    type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)),
                },
            },
            resolve: function (parentValue, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, theRest, result, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                id = args.id, theRest = __rest(args, ["id"]);
                                theRest.noOfEmployees = theRest.employees.length;
                                return [4 /*yield*/, organization_1.Organization.findByIdAndUpdate(id, theRest, {
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
        deleteOrganizations: {
            type: OrganizationType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve: function (parentValue, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var id, result, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                id = args.id;
                                return [4 /*yield*/, organization_1.Organization.findByIdAndDelete(id)];
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
        registerUser: {
            type: UserType,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: function (parentValue, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var email, password, notDuplicate, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                email = args.email, password = args.password;
                                if (!email || !password)
                                    return [2 /*return*/, new Error("All fields are reqired!")];
                                return [4 /*yield*/, user_1.default.findOne({ email: email })];
                            case 1:
                                notDuplicate = _b.sent();
                                if (notDuplicate) {
                                    return [2 /*return*/, new Error("Account already exists!!")];
                                }
                                return [2 /*return*/, bcryptjs_1.default.hash(password, 10).then(function (password) {
                                        args.password = password;
                                        var user = new user_1.default(args);
                                        return user.save();
                                    })];
                            case 2:
                                _a = _b.sent();
                                (function (err) { return new Error("fhfhhfhfhhffhh"); });
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            },
        },
        logInUser: {
            type: UserType,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: function (parentValue, args, req) {
                return __awaiter(this, void 0, void 0, function () {
                    var email, password, user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                email = args.email, password = args.password;
                                if (!email || !password)
                                    return [2 /*return*/, new Error("All fields are reqired!")];
                                return [4 /*yield*/, user_1.default.findOne({ email: email })];
                            case 1:
                                user = _a.sent();
                                if (!user) {
                                    return [2 /*return*/, new Error("Please enter valid credentials and try again!!")];
                                }
                                bcryptjs_1.default.compare(password, user.password).then(function (valid) {
                                    if (!valid)
                                        return new Error("Please enter valid credentials and try again!!");
                                    var token = jsonwebtoken_1.default.sign({ id: user._id }, "coolstuff");
                                    req.headers.authorizatiion = token;
                                    console.log(token);
                                    console.log(req);
                                    return {
                                        _id: user._id,
                                        email: user.email,
                                        token: token,
                                    };
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            }
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: Mutation });
