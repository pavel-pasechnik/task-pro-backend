import mongoose from 'mongoose';
const startDate = new Date('01/01/2024');

const unixDay = 86400000;
const { Schema } = mongoose;

const cardShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  labelcolor: {
    type: String,
    enum: ['purpel', 'pink', 'green', 'black'],
    default: 'black',
  },
  deadline: {
    type: Number,
    min: +startDate,
    validate: {
      validator: function (value) {
        return value <= Date.now() + unixDay;
      },
      message: 'Date must be less than or equal to the current date.',
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Column',
    required: true,
  },
});

export default mongoose.model('Card', cardShema);
