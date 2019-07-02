import express from "express";
import asyncWrapper from "../utils/async-wrapper";
const db = require("../db/models");
const router = express.Router()

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
  return res.send({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName
    }
  });
}));

export default router;