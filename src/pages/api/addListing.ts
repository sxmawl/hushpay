import Listing from "../../../models/listings";
import connectDb from "../../../middlewares/mongoose";

const handler = async (req: any, res: any) => {
  if (req.method == "POST") {

    console.log(req.body.name);
    let listing = new Listing({
      name: req.body.name,
      description: req.body.description,
      publicKey: req.body.publicKey,
    });
    await listing.save();
    res.status(200).json({ message: "Listing added successfully." });
  } else {
    res.status(400).json({ error: "This method is not allowed." });
  }
};

export default connectDb(handler);
