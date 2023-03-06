const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bCrypt = require("bcrypt");

const ROLE_LIST = [
  "Student",
  "Mentor"
];

const userSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      password: {
        type: String,
        minlength: 8,
        required: [true, "Password is required"],
      },
      role: {
        type: String,
        enum: ROLE_LIST,
        required: [true, "Role is required"],
      },
      token: {
        type: String,
        default: null,
      },
    },
    {
      versionKey: false,
      timestamps: true,
      strict: "throw",
    }
  );

const SALT_ROUNDS = 12;

userSchema.methods.setPassword = async function (password) {
    this.password = await bCrypt.hash(password, bCrypt.genSaltSync(SALT_ROUNDS));
  };

userSchema.methods.validatePassword = async function (password) {
    return await bCrypt.compare(password, this.password);
  };

const User = model("user", userSchema);

module.exports = User;
