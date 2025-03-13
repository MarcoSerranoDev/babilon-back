import { Schema, model } from 'mongoose';

const schemaArtist = new Schema({
  name: String,
  usDescription: String,
  esDescription: String,
  img: String,
  facebook: String,
  twitter: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
});

export default model('Artist', schemaArtist);
