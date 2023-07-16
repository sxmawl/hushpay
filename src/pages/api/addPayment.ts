import Payment from "../../../models/payments";
import connectDb from "../../../middlewares/mongoose";

const handler = async (req: any, res: any) => {
  if (req.method == "POST") {
    let payment = new Payment({
      txnId: req.body.txnId,
      causeId: req.body.causeId,
      amount: req.body.amount,
      to: req.body.to,
      from: req.body.from,
    });
    await payment.save();
    res.status(200).json({ message: "Payment added successfully." });
  } else {
    res.status(400).json({ error: "This method is not allowed." });
  }
};

export default connectDb(handler);
