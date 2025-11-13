import app from './app';
import { connectDB } from './db/mongo';
import { config } from './config';

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
});
