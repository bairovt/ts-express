export default function errorHandler(err: any, req: any, res: any, next: any) {
  if (res.headersSent) {
    return next(err);
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'Invalid token' })
  }
  console.error(err);
  res.status(500);
  res.send({ error: 'Server error' });
}