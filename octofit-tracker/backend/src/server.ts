import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  response.json({
    status: 'ok',
    apiPort: 8000,
    frontendPort: 5173,
    mongoPort: 27017,
    baseUrl,
    mongoReadyState: mongoose.connection.readyState,
  });
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'octofit_db',
    });
    console.log(`Connected to MongoDB at ${mongoUri}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(port, () => {
    console.log(`OctoFit backend listening on http://localhost:${port}`);
  });
}

void startServer();