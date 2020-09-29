import mongoose from "mongoose";
import Joi from "Joi";

const carSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    productionDate: String,
    color: [String],
    amount: Number,
    condition: String,
    price: Number,
  },
  { timestamps: true }
);
 const Car = mongoose.model("Car", carSchema);

const purchaseSchema = new mongoose.Schema(
  {
    type: String,
    modelNumber: String,
    saleDate: String,
    buyer: String,
    color: [String],
  },
  { timestamps: true }
);
 const Purchase = mongoose.model("Purchase", purchaseSchema);

const staffSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  position: String,
  salary: Number,
  homeAddress: String,
});
 const Staff = mongoose.model("Staff", staffSchema);

const carshopSchema = new mongoose.Schema({
  Car: { type: Object, unique: true, required: true },
  Purchase: { type: Object, unique: true, required: true },
  Staff: { type: Object, unique: true, required: true },
});

 const CarShop = mongoose.model("CarShop", carshopSchema);

export { Car, Purchase, Staff, CarShop};
