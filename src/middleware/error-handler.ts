export default function errorHandler(err: any, req: any, res: any, next: any) {
  console.error('error_handler', err.name, err.message);
  if (res.headersSent) {
    return next(err);
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'Invalid token' })
  }
  if (
    err.name === 'ValidationError' ||
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError') {
    return res.status(422).send({ error: 'Invalid data' })
  }
  console.error(err);
  res.status(500);
  res.send({ error: 'Server error' });
}