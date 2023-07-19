const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    txnId: { type: String, required: true },
    causeId: { type: mongoose, required: true },
    amount: { type: Number, required: true },
    to: { type: String, required: true },
    from: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Payment", paymentSchema);
