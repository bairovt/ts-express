import express from "express";
import asyncWrapper from "../utils/async-wrapper";
import config from 'config';
const jwt = require('jsonwebtoken');
const db = require("../db/models");
const router = express.Router();

router.get('/', asyncWrapper(async (req: any, res: any) => {
  const users = await db.User.findAll();
  res.send(users)
}));

router.post('/login', asyncWrapper(async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({
    where: { email }
  });
  if (!user) return res.status(401).send();
  const passOk = await user.checkPassword(password);
  if (!passOk) return res.status(401).send();
  const payload = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName
  }
  const secretKey = config.get('secretKey');
  const token = jwt.sign(payload, secretKey);
  return res.send({
    token,
    user: payload
  });
}));

export default router;