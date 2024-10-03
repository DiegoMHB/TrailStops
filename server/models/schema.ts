import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
}

interface UserMarkers extends Document {
  _id: string;
  user_id: string;
  position: {
    lat: number;
    lng: number;
  };
  hotel?: string;
  prevDist: {
    dist: number;
    time: number;
  };
  nextDist: {
    dist: number;
    time: number;
  };
  order?: number;
  walkingSpeed: number;
  distanceMeasure: string;
}

const userSchema: Schema<User> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userMarkersSchema: Schema<UserMarkers> = new Schema({
  _id: { type: String, required: true },
  user_id: { type: String, required: true },
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  hotel: { type: String }, 
  prevDist: {
    dist: { type: Number, required: true },
    time: { type: Number, required: true },
  }, 
  nextDist: {
    dist: { type: Number, required: true },
    time: { type: Number, required: true },
  },
  order: { type: Number },
  walkingSpeed: { type: Number, required: true },
  distanceMeasure: { type: String, required: true },
});

const User = mongoose.model<User>('User', userSchema);

const UserMarkers = mongoose.model<UserMarkers>('UserMarkers', userMarkersSchema);

export { User, UserMarkers };


