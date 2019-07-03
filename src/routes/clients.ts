import express from "express";
import asyncWrapper from "../utils/async-wrapper";
const db = require("../db/models");
const router = express.Router();
import checkRole from '../filters/check-role';

router.get('/', asyncWrapper(async (req: any, res: any) => {
  const clients = await db.Client.findAll();
  res.send(clients)
}));

router.post('/add',
  checkRole('admin'),
  asyncWrapper(async (req: any, res: any) => {
    const { clientData } = req.body;
    const newClient = await req.user.createClient({
      name: clientData.name,
      info: clientData.info
    });
    return res.send({
      newClientId: newClient.id
    });
  })
);

export default router;