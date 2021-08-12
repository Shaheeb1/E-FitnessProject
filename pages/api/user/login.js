import nc from "next-connect";
import database from "../../../Utils/database";

import bcrypt from 'bcryptjs';

import Users from "../../../models/Users";
import { sToken } from "../../../Utils/userAuth";

const handler = nc();

handler.post(async(req, res) => {
 await database.connect();
  const users = await Users.findOne({email: req.body.email});
  await database.disconnect();
  if (users && bcrypt.compareSync(req.body.password, users.password)) {
     const newToken = sToken(users);
     res.send({
       newToken, 
       _id: users._id, 
       name: users.name, 
       email: users.email, 
       admin: users.admin,
     });
  } else {
     res.status(401).send({ message: 'Invalid Email or Password' });
  }
});

export default handler;