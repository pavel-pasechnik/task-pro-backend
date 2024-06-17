import mongoose from 'mongoose';

const { Schema } = mongoose;

const baaardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.endsWith('.svg');
        },
        message: props => `${props.value} is not a valid icon path! It should end with 'svg'.`,
      },
      default: 'svg-defautl.svg',
    },
    background: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.endsWith('.jpg');
        },
        message: props =>
          `${props.value} is not a valid background path! It should end with 'jpg'.`,
      },
      default: '../../assets/jpg/blockWhite.jpg',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.model('Board', baaardSchema);
