// src/app.ts

import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './routes/task.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
