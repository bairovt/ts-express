import express from "express";
import { any } from "bluebird";
const db = require("../db/models");
const router = express.Router()

router.get('/', (req, res) => {
  db.User.findAll()
    .then((users: any) => {
      res.send(users)
    });
})

export default router;