import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import { countryRouter } from './routes/countryRoutes';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3001', 10);

app.use(cors());
app.use(express.json());

app.use('/api/countries', countryRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
