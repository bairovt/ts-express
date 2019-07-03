import express from "express";
import asyncWrapper from "../utils/async-wrapper";
const db = require("../db/models");
const router = express.Router();
import checkRole from '../filters/check-role';

router.get('/', asyncWrapper(async (req: any, res: any) => {
  const products = await db.Product.findAll();
  res.send(products)
}));

router.post('/',
  checkRole('admin'),
  asyncWrapper(async (req: any, res: any) => {
    const { productData } = req.body;
    const newProduct = await req.user.createProduct({
      name: productData.name,
      info: productData.info
    });
    return res.send({
      newProductId: newProduct.id
    });
  })
);

export default router;