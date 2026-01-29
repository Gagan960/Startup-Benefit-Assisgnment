import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
  },
    email: {
    type: String,
    required: true,
    unique: true,
    //you can also add custom validation using validator property
    validator: {
      validator: function(emailValue) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
      },
      message:"Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

userSchema.pre("save", function modifyPassword (next) {
  //incoming user object
  const user = this;// object with plain password

  const SALT = bcrypt.genSaltSync(9);

  //hash the password
  const hashedPassword = bcrypt.hashSync(user.password, SALT);

  //replace plain password with hashed password
  user.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);// User collection

export default User;

