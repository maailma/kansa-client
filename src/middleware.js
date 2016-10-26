import { applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import hugo from './hugo/middleware'
import hugoAdmin from './hugo-admin/middleware'
import kansa from './kansa/middleware'
import logger from './app/middleware'

export default (history) => applyMiddleware(
  hugo, hugoAdmin, kansa, logger,
  routerMiddleware(history)
);
