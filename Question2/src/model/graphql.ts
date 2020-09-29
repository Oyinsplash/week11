import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
// import { Organization, validation } from "./organization";
// import User from "./user";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { Car, Purchase, Staff, CarShop } from "./carStore";

// Purchased cars
const PurchasedType = new GraphQLObjectType({
  name: "purchase",
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: new GraphQLNonNull(GraphQLString) },
    modelNumber: { type: new GraphQLNonNull(GraphQLString) },
    saleDate: { type: GraphQLString },
    buyer: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

// all cars
const CarType = new GraphQLObjectType({
  name: "car",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    productionDate: { type: GraphQLString },
    color: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    condition: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const StaffType = new GraphQLObjectType({
  name: "staff",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    position: { type: new GraphQLNonNull(GraphQLString) },
    salary: { type: new GraphQLNonNull(GraphQLInt) },
    homeAddress: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    allCars: {
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return Car.find({});
      },
    },
    purchasedCars: {
      type: new GraphQLList(PurchasedType),
      resolve(parent, args) {
        return Purchase.find({});
      },
    },
    staffs: {
      type: new GraphQLList(StaffType),
      resolve() {
        return Staff.find({});
      },
    },
    getPurchasedBy: {
      type: PurchasedType,
      args: {
        type: { type: GraphQLString },
        color: { type: GraphQLString },
      },
      async resolve(_, args) {
        const { color, type } = args;
        return await Purchase.find({
          $or: [{ type }, { color }],
        })
          .exec()
          .then((data) => data)
          .catch((err) => err);
      },
    },
    getAllCarsBy: {
      type: CarType,
      args: {
        type: { type: GraphQLString },
        condition: { type: GraphQLString },
        price: { type: GraphQLInt },
      },
      async resolve(_, args) {
        const {type, condition , price } = args;
        return await Car.find({
          $or: [{ type, condition, price }],
        }).exec().then((data) => data).catch((err)=> err)
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createCar: {
      type: CarType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        type: {
          type: new GraphQLNonNull(GraphQLString),
        },
        productionDate: { type: GraphQLString },
        color: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        condition: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(_, args) {
        try {
          let car = await new Car(args);
          return car.save();
        } catch {
          (err: Error) => console.log(err.message);
        }
      },
    },
    addstaff: {
      type: StaffType,
      args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    position: { type: new GraphQLNonNull(GraphQLString) },
    salary: { type: new GraphQLNonNull(GraphQLInt) },
    homeAddress: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      },
      async resolve(_, args) {
        try {
          let staff = await new Staff(args);
          return staff.save();
        } catch{
          (err: Error) => console.log(err.message);
       }
     }, 
    },
    addPurchase: {
      type: PurchasedType,
      args: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    modelNumber: { type: new GraphQLNonNull(GraphQLString) },
    saleDate: { type: GraphQLString },
    buyer: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args) {
        try {
          let purchase = await new Purchase(args);
          return purchase.save();
        } catch{
          (err: Error) => console.log(err.message)
}
    } 
    },
    updateCar: {
      type: CarType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        type: {
          type: new GraphQLNonNull(GraphQLString),
        },
        productionDate: { type: GraphQLString },
        color: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        condition: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parentValue, args) {
        try {
          const { id, ...theRest } = args;
          const result = await Car.findByIdAndUpdate(id, theRest, {
            new: true,
          });
          return result;
        } catch {
          (err: Error) => console.log(err.message);
        }
      },
    },
});

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
