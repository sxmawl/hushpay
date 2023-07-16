import Payment from "../../../models/payments";
import connectDb from "../../../middlewares/mongoose";

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
  let user = req.headers.user;
  let payments = await Payment.find({ $or: [{ to: user }, { from: user }] });
  res.status(200).json({ payments });
};

export default connectDb(handler);
