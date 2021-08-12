

//import database from "../../Utils/database"

export default async function handler(req, res) {
 //await database.connectionOn();
//await database.disconnect();
  res.status(200).json({ name: 'John Doe' });
}
