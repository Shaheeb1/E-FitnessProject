import nc from "next-connect";
import Details from "../../../models/Details";
import database from "../../../Utils/database";
import { onError } from "../../../Utils/errors";
import { auth } from "../../../Utils/userAuth";

const handler = nc({
  onError,
});
handler.use(auth);

handler.post(async(req, res) => {
  await database.connect();
  const newOrder = new Details({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
});
export default handler;