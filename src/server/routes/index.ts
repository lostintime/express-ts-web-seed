import * as express from 'express';
import {buildRouter as users, UsersRouteEnv} from './users';
import {buildRouter as tasks, TasksRouteEnv} from './tasks';

type RoutesEnv = UsersRouteEnv & TasksRouteEnv

export function buildRouter(env: RoutesEnv): express.Router {
  const router = express.Router();

  router.use('/users', users(env));
  router.use('/tasks', tasks(env));
  // serve static files
  router.use('/', express.static('dist/public'));

  return router;
}
