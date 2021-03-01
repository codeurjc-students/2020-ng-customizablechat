import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
    name: String,
    description: String,
    creationDate: Date,
    participants: [String],
    isPrivate: Boolean,
});
