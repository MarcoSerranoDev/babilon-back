import mongoose from 'mongoose';

const subProductSchema = new mongoose.Schema(
  {
    modelo: {
      type: String,
    },
    usLang: {
      description: {
        type: String,
      },
      description_small: {
        type: String,
      },
      featuresText: [{ type: String }],
    },
    esLang: {
      description: {
        type: String,
      },
      description_small: {
        type: String,
      },
      featuresText: [{ type: String }],
    },
    colors: [
      {
        color: {
          type: String,
        },
        code: {
          type: String,
        },
        rutas: [{ type: String }],
      },
    ],
    subModelImg: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const SubProduct = mongoose.model('SubProduct', subProductSchema);

module.exports = SubProduct;
