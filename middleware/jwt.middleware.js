import jwt from "jsonwebtoken";
import express from "express";

const middleware = express.Router();

const authenticateJWT = (req, res, next) => {
  let token = req.headers["authorization"];
  // Falsy o Truthy, 0, 1, undefined, null
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ mensaje: "Invalid token" });
      else next();
    });
  } else {
    return res.status(401).send({ mensaje: "No token proportionated" });
  }
};

middleware.use(authenticateJWT);

export { middleware };
