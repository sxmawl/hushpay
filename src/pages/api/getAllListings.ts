import Listing from "../../../models/listings";
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
  let listings = await Listing.find();
  res.status(200).json({listings});
};

export default connectDb(handler);
