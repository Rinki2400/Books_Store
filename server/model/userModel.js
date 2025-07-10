const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.flaticon.com/free-icon/woman_6997662?term=avatar&page=1&position=6&origin=tag&related_id=6997662",
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    favourities: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books",
      },
    ],
    order: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("userdetail", UserSchema);
