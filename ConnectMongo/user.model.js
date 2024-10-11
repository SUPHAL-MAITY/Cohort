const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");



const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);




userSchema.pre("save", async function (next) {
  console.log("running the pre save hook");
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});



const User = mongoose.model("User", userSchema);



module.exports = User;
