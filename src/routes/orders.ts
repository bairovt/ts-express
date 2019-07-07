import express from "express";
import asyncWrapper from "../utils/async-wrapper";
const db = require("../db/models");
const router = express.Router();
import checkRole from '../filters/check-role';

router.get('/', asyncWrapper(async (req: any, res: any) => {
  const orders = await db.Order.findAll({
    attributes: ['id', 'createdAt', 'delivery_date'],
    where: {
      status: 'CREATED'
    },
    include: [{
      model: db.User,
      as: 'creator',
      attributes: ['id', 'firstName', 'lastName']
    }, {
      model: db.Client,
      as: 'client',
      attributes: ['id', 'name']
    }, {
      model: db.Product,
      attributes: ['id', 'name'],
      // required: true,
      through: {
        attributes: ['qty']
      }
    }]
  });
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

router.delete('/:orderId',
  // todo: allow action only for admins or creators and only in CREATED statuses
  asyncWrapper(async (req: any, res: any, next: any) => {
    const { orderId } = req.params;
    const order = await db.Order.findByPk(orderId);
    if (!order) return res.status(404).send();
    const transaction = await db.sequelize.transaction();
    try {
      await db.OrderProduct.destroy({
        where: {
          order_id: orderId
        }
      }, { transaction });
      await order.destroy({ transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      return next(error);
    }
    return res.send();
  })
);

export default router;