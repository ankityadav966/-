import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Load Swagger document
let swaggerDocument;
try {
  swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.warn('Swagger document not found, skipping /api/docs');
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
