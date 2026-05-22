import { Schema, model } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    rank: { type: Number, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    activeMinutes: { type: Number, required: true },
}, { timestamps: true, collection: 'leaderboard' });
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);
