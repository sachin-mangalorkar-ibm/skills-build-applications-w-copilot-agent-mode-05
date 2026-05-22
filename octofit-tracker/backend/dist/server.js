import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${port}`;
}
const resources = {
    users: [
        { id: 'u1', name: 'Mona Octocat', email: 'mona@example.com', team: 'OctoFit Core' },
        { id: 'u2', name: 'Hubber Sprint', email: 'hubber@example.com', team: 'Branch Burners' },
    ],
    teams: [
        { id: 't1', name: 'OctoFit Core', members: 8 },
        { id: 't2', name: 'Branch Burners', members: 6 },
    ],
    activities: [
        { id: 'a1', userId: 'u1', type: 'run', durationMinutes: 32, calories: 310 },
        { id: 'a2', userId: 'u2', type: 'strength', durationMinutes: 45, calories: 420 },
    ],
    leaderboard: [
        { rank: 1, team: 'OctoFit Core', points: 2450 },
        { rank: 2, team: 'Branch Burners', points: 2310 },
    ],
    workouts: [
        { id: 'w1', title: 'Morning Mobility', difficulty: 'beginner', durationMinutes: 20 },
        { id: 'w2', title: 'Full Stack Strength', difficulty: 'intermediate', durationMinutes: 40 },
    ],
};
app.use(cors());
app.use(express.json());
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
app.get('/api/users/', (_request, response) => {
    response.json({ baseUrl: getApiBaseUrl(), data: resources.users });
});
app.get('/api/teams/', (_request, response) => {
    response.json({ baseUrl: getApiBaseUrl(), data: resources.teams });
});
app.get('/api/activities/', (_request, response) => {
    response.json({ baseUrl: getApiBaseUrl(), data: resources.activities });
});
app.get('/api/leaderboard/', (_request, response) => {
    response.json({ baseUrl: getApiBaseUrl(), data: resources.leaderboard });
});
app.get('/api/workouts/', (_request, response) => {
    response.json({ baseUrl: getApiBaseUrl(), data: resources.workouts });
});
async function startServer() {
    try {
        await mongoose.connect(mongoUri, {
            dbName: 'octofit_db',
            serverSelectionTimeoutMS: 3000,
        });
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
