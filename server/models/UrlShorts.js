import { Schema, model } from "mongoose";
import shortId from "shortid";

const shortUrlSchema = new Schema({
  full: {
    type: String,
    require: true,
  },
  short: {
    type: String,
    require: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    require: true,
    default: 0,
  },
});

const UrlShorts = model("UrlShorts", shortUrlSchema);

export default UrlShorts;
