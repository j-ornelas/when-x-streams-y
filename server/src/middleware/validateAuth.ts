import { Router, Request, Response } from 'express';

export const validateAuth = (req:Request, res:Response, next:Function) => {
  // TODO: beef this up, do all sorts of validation
  const { email, password } = req.body;
  if (!password) res.send({ message: 'no password given!!!' });
  next();
}
