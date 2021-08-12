import nc from "next-connect";
import Item from "../../models/Item";
import database from "../../Utils/database";
import data from "../../Utils/data";
import Users from "../../models/Users";

const handler = nc();

handler.get(async(req, res) => {
  await database.connect();
  await Users.deleteMany();
  await Users.insertMany(data.users);
  await Item.deleteMany();
  await Item.insertMany(data.items);
  await database.disconnect();
  res.send({message: 'seeded successfully'});
});

export default handler;