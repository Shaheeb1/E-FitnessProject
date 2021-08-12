import nc from "next-connect";
import Item from "../../../models/Item";
import database from "../../../Utils/database";

const handler = nc();

handler.get(async(req, res) => {
 await database.connect();
  const item = await Item.findById(req.query.id);
  await database.disconnect();
  res.send(item);
});

export default handler;