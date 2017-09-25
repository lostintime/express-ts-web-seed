import * as express from 'express';
import * as winston from "winston";

export type TasksRouteEnv = {
  log: winston.Winston
}

export function buildRouter(env: TasksRouteEnv): express.Router {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    env.log.info("list tasks");
    res.send({
      result: [
        {title: "Bootstrap project", done: true},
        {name: "Create demo routes", done: true},
        {name: "Add docker build files", done: false},
      ]
    })
  });

  return router;
}
