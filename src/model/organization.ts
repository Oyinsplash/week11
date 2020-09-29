import mongoose from "mongoose";
import joi from "joi";

const organizationSchema = new mongoose.Schema(
  {
    organization: {type: String, unique: true, required: true},
    products: [String],
    marketValue: Number,
    address: String,
    ceo: String,
    country: String,
    employees: [String],
    noOfEmployees: Number,
  },
  { timestamps: true }
);
export const validation = (details: Record<string, unknown>) => {
  const joiSchema = joi.object({
    organization: joi.string().alphanum().min(3).max(30).required(),
    products: joi.array().items(joi.string().required()),
    marketValue: joi.number().min(1).max(100).required(),
    address: joi.string().min(3).max(30).required(),
    ceo: joi.string().min(2).max(20).required(),
    country: joi.string().required(),
    noOfEmployees: joi.number().required(),
    employees: joi.array().items(joi.string().required()),
  });
  return joiSchema.validate(details, {
    abortEarly: false,
  });
};
export const Organization = mongoose.model("Organization", organizationSchema);
