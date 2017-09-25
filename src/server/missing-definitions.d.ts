declare module 'express-winston' {
  import * as express from 'express'

  export function logger(options: Object): express.Handler
}
