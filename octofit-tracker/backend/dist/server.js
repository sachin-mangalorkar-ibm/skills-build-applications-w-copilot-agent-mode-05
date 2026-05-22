import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase, mongoUri } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';
const app = express();
const port = Number(process.env.PORT ?? 8000);
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
}
app.use(cors());
app.use(express.json());
function isDatabaseConnected() {
    return mongoose.connection.readyState === 1;
}
function sendDatabaseUnavailable(response) {
    response.status(503).json({
        baseUrl: getApiBaseUrl(),
        error: 'MongoDB is not connected. Start MongoDB on port 27017 and seed octofit_db.',
    });
}
app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        apiPort: 8000,
        frontendPort: 5173,
        mongoPort: 27017,
        baseUrl: getApiBaseUrl(),
        mongoReadyState: mongoose.connection.readyState,
    });
});
app.get('/api/users/', async (_request, response, next) => {
    if (!isDatabaseConnected()) {
        sendDatabaseUnavailable(response);
        return;
    }
    try {
        const users = await User.find().sort({ name: 1 }).lean();
        response.json({ baseUrl: getApiBaseUrl(), data: users });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/teams/', async (_request, response, next) => {
    if (!isDatabaseConnected()) {
        sendDatabaseUnavailable(response);
        return;
    }
    try {
        const teams = await Team.find().sort({ name: 1 }).lean();
        response.json({ baseUrl: getApiBaseUrl(), data: teams });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/activities/', async (_request, response, next) => {
    if (!isDatabaseConnected()) {
        sendDatabaseUnavailable(response);
        return;
    }
    try {
        const activities = await Activity.find().sort({ completedAt: -1 }).lean();
        response.json({ baseUrl: getApiBaseUrl(), data: activities });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/leaderboard/', async (_request, response, next) => {
    if (!isDatabaseConnected()) {
        sendDatabaseUnavailable(response);
        return;
    }
    try {
        const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
        response.json({ baseUrl: getApiBaseUrl(), data: leaderboard });
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/workouts/', async (_request, response, next) => {
    if (!isDatabaseConnected()) {
        sendDatabaseUnavailable(response);
        return;
    }
    try {
        const workouts = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
        response.json({ baseUrl: getApiBaseUrl(), data: workouts });
    }
    catch (error) {
        next(error);
    }
});
app.use((error, _request, response, _next) => {
    response.status(500).json({ error: error.message });
});
async function startServer() {
    try {
        await connectDatabase();
        console.log(`Connected to MongoDB at ${mongoUri}`);
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
    }
    app.listen(port, () => {
        console.log(`OctoFit backend listening on http://localhost:${port}`);
    });
}
void startServer();
