/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvaliabilityController from '../controllers/ProviderDayAvaliabilityController';
import ProviderMonthAvaliabilityController from '../controllers/ProviderMonthAvaliabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerDayAvaliabilityController = new ProviderDayAvaliabilityController();
const providerMonthAvaliabilityController = new ProviderMonthAvaliabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvaliabilityController.index,
);

providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvaliabilityController.index,
);

export default providersRouter;
