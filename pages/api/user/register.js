import nc from "next-connect";
import database from "../../../Utils/database";

import bcrypt from 'bcryptjs';

import Users from "../../../models/Users";
import { sToken } from "../../../Utils/userAuth";

const handler = nc();

handler.post(async(req, res) => {
 await database.connect();
 const userNew = new Users( {
   name: req.body.name, 
   email: req.body.email,
   password: bcrypt.hashSync(req.body.password),
   admin: false,
 });

 const users = await userNew.save();
  
  await database.disconnect();
    
  const token = sToken(users)
     res.send({
       token, 
       _id: users._id, 
       name: users.name, 
       email: users.email, 
       admin: users.admin,
     });
 
});

export default handler;