"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarShop = exports.Staff = exports.Purchase = exports.Car = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const carSchema = new mongoose_1.default.Schema({
    name: String,
    type: String,
    productionDate: String,
    color: [String],
    amount: Number,
    condition: String,
    price: Number,
}, { timestamps: true });
const Car = mongoose_1.default.model("Car", carSchema);
exports.Car = Car;
const purchaseSchema = new mongoose_1.default.Schema({
    type: String,
    modelNumber: String,
    saleDate: String,
    buyer: String,
    color: [String],
}, { timestamps: true });
const Purchase = mongoose_1.default.model("Purchase", purchaseSchema);
exports.Purchase = Purchase;
const staffSchema = new mongoose_1.default.Schema({
    name: { type: String, unique: true },
    position: String,
    salary: Number,
    homeAddress: String,
});
const Staff = mongoose_1.default.model("Staff", staffSchema);
exports.Staff = Staff;
const carshopSchema = new mongoose_1.default.Schema({
    Car: { type: Object, unique: true, required: true },
    Purchase: { type: Object, unique: true, required: true },
    Staff: { type: Object, unique: true, required: true },
});
const CarShop = mongoose_1.default.model("CarShop", carshopSchema);
exports.CarShop = CarShop;
//# sourceMappingURL=carStore.js.map