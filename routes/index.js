import { errHandler, notFound } from '../middlewares/errHandler.js';

import auth from './auth.js';
import hotel from './hotel.js';
import room from './room.js';
import transaction from './transaction.js';
import user from './user.js';

export const initRoute = app => {
   app.use('/api/hotels', hotel);
   app.use('/api/auth', auth);
   app.use('/api/rooms', room);
   app.use('/api/users', user);
   app.use('/api/transactions', transaction);

   app.use(notFound);
   app.use(errHandler);
};
