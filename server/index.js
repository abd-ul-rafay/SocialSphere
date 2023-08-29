import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import notFound from './middlewares/not_found.js';
import errorHandler from './middlewares/error_handler.js';
import connectDb from './utils/connect_db.js';
import authorization from './middlewares/authorization.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';

// extra security packages
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';

dotenv.config();
const app = express();

app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(xss());
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => res.send('SocialSphere'));

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authorization, userRouter);
app.use('/api/v1/posts', authorization, postRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    await connectDb(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
}

startServer();
