import mongoose from 'mongoose';

const URL = 'mongodb://localhost:27017/TrailStops';

async function main() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

main();

export default mongoose;
