const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://tse2.mm.bing.net/th?id=OIP.VaGJdZgEYXwP3OfDhpWDywHaHa&pid=Api&P=0&h=180"
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books"
      }
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books"
      }
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
