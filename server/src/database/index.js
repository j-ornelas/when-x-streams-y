import mongoose from 'mongoose';
// Docker DB:
mongoose.connect('mongodb://directory-mongo:27017/test');
export const db = mongoose.connection;
