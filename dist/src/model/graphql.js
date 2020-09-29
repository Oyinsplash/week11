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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const organization_1 = require("./organization");
const user_1 = __importDefault(require("./user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import authenticator from "../middleware/authorization";
const OrganizationType = new graphql_1.GraphQLObjectType({
    name: "organization",
    fields: () => ({
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
    }),
});
// User Type
const UserType = new graphql_1.GraphQLObjectType({
    name: "user",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    }),
});
// Root Query
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        organization: {
            type: OrganizationType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve(parentValue, args, req) {
                // authenticator(req);
                return organization_1.Organization.findById(args.id);
            },
        },
        organizations: {
            type: new graphql_1.GraphQLList(OrganizationType),
            resolve(parent, args) {
                return organization_1.Organization.find({});
            },
        },
        user: {
            type: UserType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve(parentValue, args) {
                return user_1.default.findById(args.id);
            },
        },
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve(parentValue, args) {
                return user_1.default.find({});
            },
        },
    },
});
// Mutations
const Mutation = new graphql_1.GraphQLObjectType({
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
            resolve(parentValue, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        args.noOfEmployees = args.employees.length;
                        const { error, value } = organization_1.validation(args);
                        if (error)
                            return error;
                        let organization = yield new organization_1.Organization(value);
                        return organization.save();
                    }
                    catch (_a) {
                        (err) => console.log(err.message);
                    }
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
            resolve(parentValue, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { id } = args, theRest = __rest(args, ["id"]);
                        theRest.noOfEmployees = theRest.employees.length;
                        const result = yield organization_1.Organization.findByIdAndUpdate(id, theRest, {
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
        deleteOrganizations: {
            type: OrganizationType,
            args: {
                id: { type: graphql_1.GraphQLID },
            },
            resolve(parentValue, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { id } = args;
                        const result = yield organization_1.Organization.findByIdAndDelete(id);
                        return result;
                    }
                    catch (_a) {
                        (err) => console.log(err.message);
                    }
                });
            },
        },
        registerUser: {
            type: UserType,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve(parentValue, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const { email, password } = args;
                        if (!email || !password)
                            return new Error("All fields are reqired!");
                        const notDuplicate = yield user_1.default.findOne({ email });
                        if (notDuplicate) {
                            return new Error("Account already exists!!");
                        }
                        return bcryptjs_1.default.hash(password, 10).then((password) => {
                            args.password = password;
                            const user = new user_1.default(args);
                            return user.save();
                        });
                    }
                    catch (_a) {
                        (err) => new Error("fhfhhfhfhhffhh");
                    }
                });
            },
        },
        logInUser: {
            type: UserType,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve(parentValue, args, req) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { email, password } = args;
                    if (!email || !password)
                        return new Error("All fields are reqired!");
                    const user = yield user_1.default.findOne({ email });
                    if (!user) {
                        return new Error("Please enter valid credentials and try again!!");
                    }
                    bcryptjs_1.default.compare(password, user.password).then((valid) => {
                        if (!valid)
                            return new Error("Please enter valid credentials and try again!!");
                        const token = jsonwebtoken_1.default.sign({ id: user._id }, "coolstuff");
                        req.headers.authorizatiion = token;
                        console.log(token);
                        console.log(req);
                        return {
                            _id: user._id,
                            email: user.email,
                            token,
                        };
                    });
                });
            }
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: Mutation });
//# sourceMappingURL=graphql.js.map