import asyncWrapper from '../utils/async-wrapper';

export default function (role: string) {
  return asyncWrapper(async function (req: any, res: any, next: any) {
    if (req.user.role === role) {
      next()
    } else {
      res.status(403).send({
        error: 'permission denied'
      })
    }
  })
}