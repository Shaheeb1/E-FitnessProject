import nc from "next-connect";
import Item from "../../../models/Item";
import database from "../../../Utils/database";

const handler = nc();

handler.get(async(req, res) => {
 await database.connect();
  const items = await Item.find({});
  await database.disconnect();
  res.send(items);
});

export default handler;