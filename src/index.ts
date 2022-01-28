import { NextFunction, Request, Response } from 'express';
import * as FaunaTypes from 'faunadb';

import { Settings } from './Types/Settings';

export * from './Types';
export type FaunaDBClient = FaunaTypes.Client;
export * as Fauna from 'faunadb';

declare global {
  namespace Express {
    interface Request {
      faunaDB: FaunaDBClient;
    }
  }
}

export default (additionalSettings: Settings) => (req: Request, res: Response, next: NextFunction) => {
  // Set any default settings and append additional settings
  const settings: Settings = {
    domain: 'db.eu.fauna.com',
    ...additionalSettings,
  };

  const database: FaunaDBClient = new FaunaTypes.Client({
    secret: settings.secret,
    domain: settings.domain,
    port: 443,
    scheme: 'https',
  });

  // Define the object that is set as a Request enhancement
  req.faunaDB = database;

  next();
};
