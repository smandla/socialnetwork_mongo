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
    //validation
  },
  thoughts: [thoughtsSchema],
  //   friends:
});
const User = mongoose.model("User", userSchema);

const handleError = (err) => console.error(err);
