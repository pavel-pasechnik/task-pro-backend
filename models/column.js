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
      ref: 'Board',
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model('Column', columnSchema);
