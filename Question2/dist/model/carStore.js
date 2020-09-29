"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarShop = exports.Staff = exports.Purchase = exports.Car = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var carSchema = new mongoose_1.default.Schema({
    name: String,
    type: String,
    productionDate: String,
    color: [String],
    amount: Number,
    condition: String,
    price: Number,
}, { timestamps: true });
var Car = mongoose_1.default.model("Car", carSchema);
exports.Car = Car;
var purchaseSchema = new mongoose_1.default.Schema({
    type: String,
    modelNumber: String,
    saleDate: String,
    buyer: String,
    color: [String],
}, { timestamps: true });
var Purchase = mongoose_1.default.model("Purchase", purchaseSchema);
exports.Purchase = Purchase;
var staffSchema = new mongoose_1.default.Schema({
    name: { type: String, unique: true },
    position: String,
    salary: Number,
    homeAddress: String,
});
var Staff = mongoose_1.default.model("Staff", staffSchema);
exports.Staff = Staff;
var carshopSchema = new mongoose_1.default.Schema({
    Car: { type: Object, unique: true, required: true },
    Purchase: { type: Object, unique: true, required: true },
    Staff: { type: Object, unique: true, required: true },
});
var CarShop = mongoose_1.default.model("CarShop", carshopSchema);
exports.CarShop = CarShop;
