/* 
npm install jsonwebtoken
*/

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

/* 
Criar Token
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
*/

dotenv.config();

export function generateToken(id) {
  return jwt.sign(
    { userId: id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  /* 
  Exemplo Output:
  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg2LCJpYXQiOjE3NzE3ODM2MjksImV4cCI6MTc3MTc4NzIyOX0.rFObl5CgMI0iXfVXzaXHrFdqmTNcZNSE2vZBkOfnK9A
  */
}

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch { 
    console.log('oi')
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function GetUserIdSession(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}