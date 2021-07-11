const mongoose = require("mongoose");
const User = require("./users");

const localSchema = new mongoose.Schema(
  {
    totalCandidate: {
      type: Number,
      default: 1,
    },
    pincode: Number,
    registeredUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // phoneNumbers: [Number],
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);
// localSchema.pre("save", function (next, id) {
//   this.registeredUser = id;
//   console.log(id);
//   console.log(this.registeredUser);
//   next();
// });
localSchema.pre("save", function (next) {
  this.totalCandidate = this.registeredUser.length;
  console.log("hello from middle ware");
  console.log(this.totalCandidate);
  next();
});

localSchema.statics.assign = async (pincode, id) => {
  console.log(pincode);
  console.log(id);
  const local = await Local.findOne({ pincode });
  if (local) {
    local.registeredUser.push(id);
    console.log("if part runned");
    await local.save();
    return 1;
  }
  // } else {
  //   console.log("else part runned");
  //   this.registeredUser = id;
  //   return 0;
  // }
};
localSchema.statics.remove = async (pincode, id) => {
  const local = await Local.findOne({ pincode: pincode });
  console.log(local);
  local.registeredUser.pop(id);
  // if(local.totalCandidates==0){
  //   local.remo
  // }
  await local.save();
};
localSchema.statics.delete=async()=>{
  
  const local=await Local.findOneAndRemove({
      totalCandidates:0
    })
}
  


const Local = mongoose.model("Local", localSchema);
module.exports = Local;
