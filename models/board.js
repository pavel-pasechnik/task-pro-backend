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
          return v.startsWith('svg');
        },
        message: props => `${props.value} is not a valid icon path! It should start with 'svg'.`,
      },
      default: 'svg-defautl',
    },
    background: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.startsWith('img');
        },
        message: props =>
          `${props.value} is not a valid background path! It should start with 'url'.`,
      },
      default: 'img-default',
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
