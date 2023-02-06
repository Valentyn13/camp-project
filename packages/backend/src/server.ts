import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import AppRouter from './routes';
import connectDB from './config/database';
import { passportConfig } from './config/passport';

const app = express();
const router = new AppRouter(app);
app.use(cors());
// Connect to MongoDB
connectDB();

// Passport configuration
passportConfig(passport);
app.use(passport.initialize());

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
router.init();

function errorHandler(err: any, req: Request, res: Response): void {
  res.status(err.status || 500).json({
    message: err.message || 'Unknown Error',
    code: err.code
  });
}

const port = app.get('port');
app.use(errorHandler);
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
export default server;
