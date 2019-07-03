import express from "express";
import asyncWrapper from "../utils/async-wrapper";
const db = require("../db/models");
const router = express.Router();
import checkRole from '../filters/check-role';

router.get('/', asyncWrapper(async (req: any, res: any) => {
  const orders = await db.Order.findAll();
  res.send(orders)
}));

router.post('/',
  asyncWrapper(async (req: any, res: any) => {
    const { orderData } = req.body;
    const newOrder = await db.Order.create({
      delivery_date: orderData.delivery_date,
      client_id: orderData.client_id,
      created_user_id: req.user.id
    });
    return res.send({
      newOrderId: newOrder.id
    });
  })
);

export default router;