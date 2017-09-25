///<reference path="missing-definitions.d.ts" />
import * as express from 'express';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as bodyParser from 'body-parser';
import {HttpError} from 'http-errors';
import * as createHttpError from 'http-errors';
import {buildRouter} from './routes';
import * as cors from 'cors';

export const app = express();

const isDevelopment = app.get('env') === 'development';
const defaultLogDevel = isDevelopment ? 'debug' : 'warn';
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : defaultLogDevel;

winston.configure({
  level: logLevel,
  transports: [
    new (winston.transports.Console)({level: logLevel}),
  ],
});

app.use(expressWinston.logger({
  winstonInstance: winston,
  meta: true,
  exitOnError: false,
  // expressFormat: true,
}));

// disable X-Powered-By header
app.disable('x-powered-by');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use('/', cors(), buildRouter({
  log: winston
}));

// error handlers
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createHttpError(404, 'Page Not Found'))
});

// development error handler
// will print stacktrace
if (isDevelopment) {
  app.use((err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stack traces leaked to user
app.use((err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.status || 500;
  if (status == 500) {
    winston.error('Http request failed', err);
  }
  res.status(status);
  res.send({
    message: err.message,
    error: {},
  });
});
