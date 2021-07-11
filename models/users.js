const mongoose = require("mongoose")
const { nanoid } = require("nanoid")
const jwt = require("jsonwebtoken")
const moment = require("moment")

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
    },
    address: {
      houseNumber: {
        type: String,
      },
      sector: {
        type: String,
      },
      society: {
        type: String,
      },
      landmark: {
        type: String,
      },
      city: {
        type: String,
        // required: true,
      },
      state: {
        type: String,
        // required: true,
      },
      pincode: {
        type: Number,
        // required: true,
      },
    },
    age: Number,
    aadharNumber: {
      type: Number,
      required: true,
      // unique: true,
      trim: true,
    },
    disablitiy: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    locations: {
      type: String,
    },
    customerId: {
      type: String,
    },
    registerDate: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a"),
    },
    vaccinatedDate: {
      type: String,
    },
    vaccinator: {
      type: String,
    },
    authCode: {
      type: String,
    },
    vaccinationSuccessful: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          // required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
// userSchema.virtual("locals", {
//   ref: "Local",
//   localField: "_id",
//   foreignField: "registeredUser",
// });

// Saving the customerID
// userSchema.pre("save", async function (next) {
//   const user = this;

//   // Generating CustomerID
//   user.customerId = await nanoid(8);
//   console.log(user.customerId);

//   //AuthToken
//   user.authCode = await nanoid(4);
//   console.log(user.authCode);

//   next();
// });

//Verify Login
userSchema.statics.verifyUser = async (custId) => {
  const user = await User.findOne({ customerId: custId })
  if (!user) {
    throw new Error("Unable to login")
  }

  return user
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id }, "thisismynewcourseprakharsrivastavahellooldfriend")

  user.tokens = user.tokens.concat({ token }) //we are pushing tokens for  adding multiple tokens in tokens arrar for sginign from varioius devise
  await user.save()

  return token
}

//Method For generating the id
userSchema.methods.generateId = async function () {
  const user = this
  // Generating CustomerID
  user.customerId = await nanoid(8)
  console.log(user.customerId)

  //AuthToken
  user.authCode = await nanoid(4)
  console.log(user.authCode)
}

const User = mongoose.model("User", userSchema)
module.exports = User
