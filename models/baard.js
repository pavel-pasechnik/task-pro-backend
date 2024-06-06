import mongoose from 'mongoose';

const { Schema } = mongoose;

const baaardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'default-icon-url',
  },
  background: {
    type: String,
    default: 'default-background-url',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

export default mongoose.model('Baard', baaardSchema);
