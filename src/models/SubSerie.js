import { Schema, model } from 'mongoose';

const subSerieSchema = new Schema(
  {
    name: String,
    logo: String,
    models: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    type: {
      type: String,
      enum: ['models', 'group'],
    },
  },
  {
    timestamps: true,
  },
);

export default model('SubSerie', subSerieSchema);
