import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';
const users = [
    { username: 'mona', name: 'Mona Octocat', email: 'mona@example.com', team: 'OctoFit Core', role: 'captain' },
    { username: 'hubber', name: 'Hubber Sprint', email: 'hubber@example.com', team: 'Branch Burners', role: 'member' },
    { username: 'mergequeen', name: 'Asha Merge', email: 'asha@example.com', team: 'PR Pacers', role: 'coach' },
];
const teams = [
    { name: 'OctoFit Core', mascot: 'Flex', city: 'San Francisco', members: 8, weeklyGoalMinutes: 1200 },
    { name: 'Branch Burners', mascot: 'Spark', city: 'Austin', members: 6, weeklyGoalMinutes: 900 },
    { name: 'PR Pacers', mascot: 'Stride', city: 'Seattle', members: 7, weeklyGoalMinutes: 1050 },
];
const activities = [
    { user: 'Mona Octocat', team: 'OctoFit Core', type: 'run', durationMinutes: 32, calories: 310, completedAt: new Date('2026-05-20T13:30:00Z') },
    { user: 'Hubber Sprint', team: 'Branch Burners', type: 'strength', durationMinutes: 45, calories: 420, completedAt: new Date('2026-05-21T16:15:00Z') },
    { user: 'Asha Merge', team: 'PR Pacers', type: 'cycling', durationMinutes: 50, calories: 520, completedAt: new Date('2026-05-22T11:00:00Z') },
];
const leaderboard = [
    { rank: 1, team: 'OctoFit Core', points: 2450, activeMinutes: 1280 },
    { rank: 2, team: 'PR Pacers', points: 2385, activeMinutes: 1195 },
    { rank: 3, team: 'Branch Burners', points: 2310, activeMinutes: 1120 },
];
const workouts = [
    { title: 'Morning Mobility', focus: 'flexibility', difficulty: 'beginner', durationMinutes: 20, equipment: ['mat'] },
    { title: 'Full Stack Strength', focus: 'strength', difficulty: 'intermediate', durationMinutes: 40, equipment: ['dumbbells', 'bench'] },
    { title: 'Endurance Builder', focus: 'cardio', difficulty: 'advanced', durationMinutes: 55, equipment: ['bike'] },
];
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        LeaderboardEntry.deleteMany({}),
        Workout.deleteMany({}),
    ]);
    await Promise.all([
        User.insertMany(users),
        Team.insertMany(teams),
        Activity.insertMany(activities),
        LeaderboardEntry.insertMany(leaderboard),
        Workout.insertMany(workouts),
    ]);
    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, and ${workouts.length} workouts.`);
}
seedDatabase()
    .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await disconnectDatabase();
});
