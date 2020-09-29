import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import {Organization, validation} from './organization';
import User from './user';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
// import authenticator from "../middleware/authorization";
 


const OrganizationType = new GraphQLObjectType({
  name: "organization",
  fields: () => ({
    id: { type: GraphQLID },
    organization: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },
    products: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    marketValue: { type: GraphQLInt },
    address: { type: new GraphQLNonNull(GraphQLString) },
    ceo: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    employees: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    noOfEmployees: { type: GraphQLInt },
  }),
});

// User Type
const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});


// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    organization: {
      type: OrganizationType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, args, req) {
        // authenticator(req);
        return Organization.findById(args.id);
      },
    },
    organizations: {
      type: new GraphQLList(OrganizationType),
      resolve(parent, args) {
        return Organization.find({});
      },
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, args) {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return User.find({});
      },
    },
  },
});


// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createOrganization: {
      type: OrganizationType,
      args: {
        organization: {
          type: new GraphQLNonNull(GraphQLString),
        },
        products: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        marketValue: {
          type: new GraphQLNonNull(GraphQLString),
        },
        address: {
          type: new GraphQLNonNull(GraphQLString),
        },
        ceo: {
          type: new GraphQLNonNull(GraphQLString),
        },
        country: {
          type: new GraphQLNonNull(GraphQLString),
        },
        noOfEmployees: { type: GraphQLInt },
        employees: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
      },
      async resolve(parentValue, args) {
        try {
          args.noOfEmployees = args.employees.length;
          const { error, value } = validation(args);
          if (error) return error;
          let organization = await new Organization(value);
          return organization.save();
        } catch {
          (err: Error) => console.log(err.message);
        }
      },
    },
    updateOrganization: {
      type: OrganizationType,
      args: {
        id: { type: GraphQLID },
        organization: {
          type: new GraphQLNonNull(GraphQLString),
        },
        products: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
        marketValue: {
          type: new GraphQLNonNull(GraphQLString),
        },
        address: {
          type: new GraphQLNonNull(GraphQLString),
        },
        ceo: {
          type: new GraphQLNonNull(GraphQLString),
        },
        country: {
          type: new GraphQLNonNull(GraphQLString),
        },
        noOfEmployees: { type: GraphQLInt },
        employees: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        },
      },
      async resolve(parentValue, args) {
        try {
          const { id, ...theRest } = args;
          theRest.noOfEmployees = theRest.employees.length;
          const result = await Organization.findByIdAndUpdate(id, theRest, {
            new: true,
          });
          return result;
        } catch {
          (err: Error) => console.log(err.message);
        }
      },
    },
    deleteOrganizations: {
      type: OrganizationType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parentValue, args) {
        try {
          const { id } = args;
          const result = await Organization.findByIdAndDelete(id);
          return result;
        } catch {
          (err: Error) => console.log(err.message);
        }
      },
    },
    registerUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args) {
        try {
          const { email, password } = args;
          if (!email || !password) return new Error("All fields are reqired!");
          const notDuplicate = await User.findOne({ email });
          if (notDuplicate) {
            return new Error("Account already exists!!");
          }
          return bcrypt.hash(password, 10).then((password) => {
            args.password = password;
            const user = new User(args);
            return user.save();
          });
        } catch {
          (err: Error) => new Error("fhfhhfhfhhffhh");
        }
      },
    },
    logInUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args, req) {
        const { email, password } = args;
          if (!email || !password) return new Error("All fields are reqired!");
          const user:any = await User.findOne({ email });
          if (!user) {
            return new Error("Please enter valid credentials and try again!!");
          }
        bcrypt.compare(password, user.password).then((valid) => {
          if (!valid)
            return new Error("Please enter valid credentials and try again!!");
          const token = jwt.sign({ id: user._id }, "coolstuff");

          req.headers.authorizatiion = token;
          console.log(token);
          console.log(req);
          return {
            _id: user._id,
            email: user.email,
            token,
          };
        })
      }
    },
  },
});
export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });
