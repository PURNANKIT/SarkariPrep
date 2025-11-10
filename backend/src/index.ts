import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './user';
import { connectDB } from './db';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root test route
app.get('/', (req, res) => res.send('Hello World!'));

// Use user router at root
app.use('/', router);

// Start server only after DB connected
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Server not started due to DB connection error'));
