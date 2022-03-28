import mongoose from 'mongoose';
import { config } from '../config';

export default async function connect() {
  mongoose.set('bufferCommands', false);
  await mongoose.connect(config.mongo.uri);
}

