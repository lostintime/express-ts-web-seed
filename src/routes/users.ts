import * as express from 'express';
import * as winston from "winston";

export type UsersRouteEnv = {
  log: winston.Winston
}

export function buildRouter(env: UsersRouteEnv): express.Router {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    env.log.info("list users");
    res.send({
      result: [
        {name: "john"},
        {name: "steven"},
        {name: "bill"},
      ]
    })
  });

  return router;
}
