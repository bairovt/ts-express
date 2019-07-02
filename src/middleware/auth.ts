'use strict';
const db = require('../db/models');
const jwt = require('jsonwebtoken');
const secretKey = require('config').get('secretKey');

/* authentication middleware */
export default async function (req: any, res: any, next: any) {
  if (['/users/login'].includes(req.path)) {
    return next();
  }
  const authHeader = req.get('Authorization');
  if (!authHeader) return res.status(401).send();

  const token = authHeader.split(' ').pop();
  const payload = jwt.verify(token, secretKey); //may throw JsonWebTokenError,

  const user = await db.User.findByPk(payload.id);
  if (!user) res.status(401).send();

  req.user = user;
  return await next()
};
