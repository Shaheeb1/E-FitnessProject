import nc from "next-connect";
import { auth } from "../../../../Utils/userAuth";
import Details from "../../../../models/Details";
import database from "../../../../Utils/database";

const handler = nc();
handler.use(auth);

handler.get(async(req, res) => {
 await database.connect();
  const order = await Details.findById(req.query.id);
  await database.disconnect();
  res.send(order);
});

export default handler;