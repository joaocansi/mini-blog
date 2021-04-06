import 'reflect-metadata';
import express from 'express';

import 'express-async-errors';
import './shared/database/connection';

import { errorHandler } from './shared/errors/AppError';
import { config } from 'dotenv';
config();

import cors from 'cors';
import cookieParser from 'cookie-parser';

import csurf from 'csurf';
import usersRoutes from './modules/users/http/users.routes';
import sessionsRoutes from './modules/users/http/sessions.routes';
import postsRouter from './modules/posts/http/posts.routes';

const csurfProtection = csurf({ cookie: true });

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(csurfProtection);
app.get('/csrf', (req, res) => res.json({ csrfToken: req.csrfToken() }));
app.use('/users', usersRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/posts', postsRouter);
app.use(errorHandler);

app.listen(3333);
