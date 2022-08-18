const mongoose = require("mongoose");
const { Types } = require("mongoose");
const moment = require("moment");
const formatDate = (date) => {
  console.log("DATE", date);
  return moment(date).format("MMM Do, YYYY [at] h:mm a");
};
const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      //default value is set to a new ObjectId
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      //default current timestamp
      default: Date.now,
      //getter method to format
      get: formatDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max: 280,
      min: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: { type: String },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thoughts = mongoose.model("Thoughts", thoughtSchema);
Thoughts.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Thoughts.insertMany(
      [
        {
          thoughtText: "lol",
          username: "sm",
          reactions: [{ reactionBody: "djd", username: "skm" }],
        },
        {
          thoughtText: "loddddl",
          username: "km",
          reactions: [{ reactionBody: "dsdsdjd", username: "sm" }],
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
module.exports = Thoughts;
