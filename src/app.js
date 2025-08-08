import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { createRoles } from './libs/initialSetup';
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import artistRoutes from './routes/artist.routes';
import guitarRoutes from './routes/guitar.routes';
import eventRoutes from './routes/event.routes';
import serieRoutes from './routes/serie.routes';

const app = express();
createRoles();

app.set('port', process.env.PORT || 4000);

//Meddlewares
const corsOptions = {};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/babilon/v1/products', productsRoutes);
app.use('/api/babilon/v1/auth', authRoutes);
app.use('/api/babilon/v1/users', userRoutes);
app.use('/api/babilon/v1/artist', artistRoutes);
app.use('/api/babilon/v1/guitar', guitarRoutes);
app.use('/api/babilon/v1/events', eventRoutes);
app.use('/api/babilon/v1/serie', serieRoutes);

export default app;
