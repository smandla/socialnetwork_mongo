const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
      },
    },
    message: "Enter a valid email.",
    //validation
  },
  //   thoughts: {
  //     t,
  //   },
  //   friends:
});
const User = mongoose.model("User", userSchema);

const handleError = (err) => console.error(err);

User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        { username: "sm", email: "sm@gmail.com" },
        {
          username: "km",
          email: "km@gmail.com",
        },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});
module.exports = User;
