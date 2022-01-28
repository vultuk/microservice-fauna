import { NextFunction, Request, Response } from 'express';

import { Settings } from './Types/Settings';

export * from './Types';

declare global {
  namespace Express {
    interface Request {
      // Additional Request enhancements go in here
      // template: TemplateInterface;
    }
  }
}

export default (additionalSettings?: Settings) => (req: Request, res: Response, next: NextFunction) => {
  // Set any default settings and append additional settings
  const settings: Settings = {
    ...additionalSettings
  }

  // Define the object that is set as a Request enhancement
  // req.template = TemplateObject;

  next();
};
