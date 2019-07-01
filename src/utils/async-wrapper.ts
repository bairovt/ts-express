import express from "express";

const asyncWrapper = (func: any) => {
  return (res: express.Response, req: express.Request, next: any) => {
    Promise.resolve(func(res, req, next))
      .catch(next);
  }
}

export default asyncWrapper;