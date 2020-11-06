// singleton class to export a global instance of the Express Router function for use throughout the app
// the singleton means we'll only ever have the one instance
import express from 'express';

export class AppRouter {
  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}