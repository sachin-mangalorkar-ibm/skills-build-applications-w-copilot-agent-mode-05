import mongoose from 'mongoose';
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
mongoose.set('bufferCommands', false);
export async function connectDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    await mongoose.connect(mongoUri, {
        dbName: 'octofit_db',
        serverSelectionTimeoutMS: 3000,
    });
    return mongoose.connection;
}
export async function disconnectDatabase() {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
}
export { mongoUri };
