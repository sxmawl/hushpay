import Listing from "../../../models/listings";
import connectDb from "../../../middlewares/mongoose";
import payments from "../../../models/payments";

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
  let listings = await Listing.find({
    publicKey: user,
  });
  res.status(200).json({ listings });
};

export default connectDb(handler);
