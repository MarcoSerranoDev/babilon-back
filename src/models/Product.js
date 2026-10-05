import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    id: Number,
    serie: String, //? posible propiedad extra slugSerie
    modelo: String,
    slug: String,
    category: {
      type: String,
      enum: ['guitars', 'bass', 'ukuleles', 'strings', 'amplification'],
      require: true,
    },
    type: String,
    top: { type: Boolean, default: false },
    gama: { type: String, default: 'null' },
    usLang: {
      description: String,
      description_small: String,
      featuresText: [String],
    },
    esLang: {
      description: String,
      description_small: String,
      featuresText: [String],
    },
    cases: [String],
    colors: [
      //! se va a remplasar por variants, para futuras especificaciones extras aparte de solo colores
      {
        color: String,
        code: String,
        png: String,
        newTag: {
          type: Boolean,
          default: false,
        },
        rutas: [String],
      },
    ],
    variants: [
      {
        colorName: String,
        colorCode: String,
        colorPNG: String,
        isNewColor: Boolean,
        productPhotos: [String],
      },
    ],
    subModelImg: String,
    lifestyleGallery: [String],
    heroImg: String,
    rutas: [String],
    // subModelsTest: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product',
    //   },
    // ],
    frets: {
      img: [String],
      title: String,
      description: {
        usLang: String,
        esLang: String,
      },
    },
    underReview: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    newTag: Boolean,
    order: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // isSubModel: {
    //   type: Boolean,
    //   default: false,
    // },
    subSerie: {
      type: Schema.Types.ObjectId,
      ref: 'SubSerie',
    },
    subSerieName: String,
  },
  {
    timestamps: true,
  },
);

export default model('Product', productSchema);
