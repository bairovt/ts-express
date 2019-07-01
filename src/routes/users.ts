import express from "express";
import asyncWrapper from "../utils/async-wrapper";
const db = require("../db/models");
const router = express.Router()

router.get('/', asyncWrapper(async (req: any, res: any) => {
  const users = await db.User.findAll();
  res.send(users)
}));

export default router;