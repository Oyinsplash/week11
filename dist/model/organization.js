"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = exports.validation = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var organizationSchema = new mongoose_1.default.Schema({
    organization: { type: String, unique: true, required: true },
    products: [String],
    marketValue: Number,
    address: String,
    ceo: String,
    country: String,
    employees: [String],
    noOfEmployees: Number,
}, { timestamps: true });
exports.validation = function (details) {
    var joiSchema = joi_1.default.object({
        organization: joi_1.default.string().alphanum().min(3).max(30).required(),
        products: joi_1.default.array().items(joi_1.default.string().required()),
        marketValue: joi_1.default.number().min(1).max(100).required(),
        address: joi_1.default.string().min(3).max(30).required(),
        ceo: joi_1.default.string().min(2).max(20).required(),
        country: joi_1.default.string().required(),
        noOfEmployees: joi_1.default.number().required(),
        employees: joi_1.default.array().items(joi_1.default.string().required()),
    });
    return joiSchema.validate(details, {
        abortEarly: false,
    });
};
exports.Organization = mongoose_1.default.model("Organization", organizationSchema);
