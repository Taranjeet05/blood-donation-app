const mongoose = require('mongoose');
const BloodRequest = require('../models/BloodRequest'); 
require('dotenv').config(); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const germanCities = [
  'Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart',
  'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig', 'Bremen', 'Dresden', 
  'Hannover', 'Nuremberg', 'Mannheim'
];

const urgencyLevels = ['Low', 'Medium', 'High'];

const getRandomUrgency = () => {
  return urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)];
};

const requesterNames = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Michael Brown', 'Emily Davis'];
const relations = ['Friend', 'Family', 'Colleague', 'Neighbor', 'Self'];

const getRandomRequester = () => {
  return requesterNames[Math.floor(Math.random() * requesterNames.length)];
};

const getRandomRelation = () => {
  return relations[Math.floor(Math.random() * relations.length)];
};

const seedBloodRequests = async () => {
  try {
    await BloodRequest.deleteMany(); 

    const bloodRequests = [];

    bloodGroups.forEach((bloodType) => {
      germanCities.forEach((city) => {
        for (let i = 0; i < 20; i++) {
          bloodRequests.push({
            requesterName: getRandomRequester(),
            relation: getRandomRelation(),
            bloodType,
            location: city,
            urgency: getRandomUrgency(),
            message: `Looking for an urgent ${bloodType} donation in ${city}.`, 
            createdAt: new Date(), 
          });
        }
      });
    });

    await BloodRequest.insertMany(bloodRequests); 
    console.log('Blood requests seeded successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); 
  }
};

connectDB().then(() => seedBloodRequests());
