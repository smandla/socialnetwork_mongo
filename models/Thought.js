const mongoose = require("mongoose");
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    require: true,
    max: 280,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: new Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  //username
  //reactions
});
