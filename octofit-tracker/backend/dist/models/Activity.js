import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    user: { type: String, required: true },
    team: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    completedAt: { type: Date, required: true },
}, { timestamps: true, collection: 'activities' });
export const Activity = model('Activity', activitySchema);
