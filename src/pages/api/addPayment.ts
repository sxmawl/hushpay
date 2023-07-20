import Payment from "../../../models/payments";
import connectDb from "../../../middlewares/mongoose";
import listings from "../../../models/listings";

const handler = async (req: any, res: any) => {
  if (req.method == "POST") {
    let payment = new Payment({
      txnId: req.body.txnId,
      causeId: req.body.causeId,
      amount: req.body.amount,
      to: req.body.to,
      from: req.body.from,
    });
    // if (
    //   !payment.txnId ||
    //   !payment.causeId ||
    //   !payment.amount ||
    //   !payment.to ||
    //   !payment.from
    // ) {
    //   return res.status(400).json({ error: "Please fill all the fields." });
    // }

    if (payment.amount < 0) {
      return res.status(400).json({ error: "Amount cannot be negative." });
    }
    if (payment.to == payment.from) {
      return res
        .status(400)
        .json({ error: "You cannot send money to yourself." });
    }

    const document = await listings.findById(payment.causeId);

    if (document) {
      await payment.save();
      document.amount += payment.amount;
      await document.save();
      res.status(200).json({ message: "Payment added successfully." });
    } else {
      res.status(400).json({ error: "Cause not found." });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed." });
  }
};

export default connectDb(handler);
