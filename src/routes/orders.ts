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
  asyncWrapper(async (req: any, res: any, next: any) => {
    let newOrder: any;
    const { orderData } = req.body;
    const transaction = await db.sequelize.transaction();
    try {
      newOrder = await db.Order.create({
        delivery_date: orderData.delivery_date,
        client_id: orderData.client_id,
        created_user_id: req.user.id
      }, { transaction });

      const createPromises = orderData.products.map((product: any) => {
        return db.OrderProduct.create({
          order_id: newOrder.id,
          product_id: product.id,
          qty: product.qty
        }, { transaction });
      });
      await Promise.all(createPromises);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      return next(error);
    }
    return res.send({
      newOrderId: newOrder.id
    });
  })
);

export default router;