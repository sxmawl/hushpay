const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    publicKey: { type: String, required: true },
    amount: { type: Number, default: 0 },
    verified: { type: Boolean, default: false},
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Listing", listingSchema);
