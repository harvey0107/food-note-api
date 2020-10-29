const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true
  },

  cuisine: {
    type: String,
    required: true

  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('note', noteSchema)
