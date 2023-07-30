import Payment from "../../../models/payments";
import connectDb from "../../../middlewares/mongoose";
import listings from "../../../models/listings";
import mongoose from "mongoose";

interface cause {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  publicKey: string;
  verified: boolean;
  createdAt: string;
}

const handler = async (
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
    };
  }
) => {
  // let payments = await Payment.find({});
  // res.status(200).json({ payments });
  let user = req.headers.user;
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  let payments = await Payment.find({ $or: [{ to: user }, { from: user }] }).populate("causeId");

  const causes = await listings.find();

  for (let payment of payments) {
    let paymentObject = payment.toObject();
    const cause = causes.find(
      (cause: cause) => cause._id.toString() === payment.causeId.toString()
    );
    if (cause) {
      paymentObject.cause = cause;
      payment = paymentObject;
    }
  }

  console.log(payments);

  res.status(200).json({ payments });
};

export default connectDb(handler);
