import mongoose from 'mongoose';

const { Schema } = mongoose;
const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Baard',
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model('Column', columnSchema);
