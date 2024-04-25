
import jwt from 'jsonwebtoken';
const secret = "KIRAN";

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.replace(/^Bearer\s+/i, '');

  if (token) {
    jwt.verify(token, "KIRAN", (err, decodedToken) => {
      if (err) {
        res.status(401).json("Invalid Token");
      } else {
        const userId = decodedToken.id;
        req.userId = userId;
        next();
      }
    });
  } else {
    res.status(401).json("Restricted");
  }
};

export default requireAuth;