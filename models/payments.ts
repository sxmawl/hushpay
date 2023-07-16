const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    txnId: { type: String, required: true },
    causeId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Payment", paymentSchema);
