const mongoose = require('mongoose');

console.log(mongoose.connection.readyState);

const URL = 'mongodb://localhost:27017/TrailStops';

async function main() {
  await mongoose.connect(URL, {useNewUrlParser: true});
};

main();

module.exports = mongoose;