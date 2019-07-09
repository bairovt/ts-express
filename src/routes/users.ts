import express from "express";
import asyncWrapper from "../utils/async-wrapper";
import config from 'config';
const jwt = require('jsonwebtoken');
const db = require("../db/models");
import randomString from "../utils/random-string";
const router = express.Router();
import checkRole from '../filters/check-role';

router.get('/', asyncWrapper(async (req: any, res: any) => {
  const users = await db.User.findAll();
  res.send(users)
}));

router.post('/login', asyncWrapper(async (req: any, res: any) => {
  // todo: input validation
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
    lastName: user.lastName,
    role: user.role
  }
  const secretKey = config.get('secretKey');
  const token = jwt.sign(payload, secretKey);
  return res.send({
    token,
  });
}));

router.post('/add',
  checkRole('admin'),
  asyncWrapper(async (req: any, res: any) => {
    const { userData } = req.body;
    const salt = randomString();
    const pass_hash = await db.User.hashPassword(salt, userData.password);
    const newUser = await db.User.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      salt,
      pass_hash
    });
    return res.send({
      newUserId: newUser.id
    });
  })
);

export default router;