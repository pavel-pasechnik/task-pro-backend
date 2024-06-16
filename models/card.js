import mongoose from 'mongoose';
const startDate = new Date('01/01/2024');

const unixDay = 86400000;
const { Schema } = mongoose;

const cardShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high', 'none'],
      default: 'none',
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
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model('Card', cardShema);
