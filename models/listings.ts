const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    publicKey: { type: String, required: true },
    verified: { type: Boolean, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Listing", listingSchema);
