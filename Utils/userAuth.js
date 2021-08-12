import jwt from 'jsonwebtoken';
//signing token to use login details so they remain logged in
const sToken = (user) => {
  return jwt.sign({
    _id: user._id, 
    name: user.name, 
    email: user.email, 
    admin: user.admin,
  },

  process.env.JWT_SECRET,

  {
     expiresIn: '30d',
  }
  
  );
};

const auth = async (req, res, next) => {
  const {authorization} = req.headers;
  if(authorization) {
    //Bearer xxx => xxx - Users require authorization before commencing to payment stage
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if(err) {
        res.status(401).send({message:'Token not valid.'});
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({message:'token not supplied'});
  }
};

export {sToken, auth};