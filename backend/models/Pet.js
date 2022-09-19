const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Pet = mongoose.model(
  'Pet',
  new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      }
      ,
      weight: {
        type: Number,
        required: true
      },
      color: {
        type: String,
        require: true
      },
      images: {
        type: Array,
      },
      available: {
        type: Boolean
      },
      user: Object
    },
    { timestamps: true },
  )
)

module.exports = Pet;