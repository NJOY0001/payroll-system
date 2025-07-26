const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function testConnection() {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('Connection URI:', process.env.MONGODB_URI);
        
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        };

        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('Connected to MongoDB successfully');
        
        // Test database operation
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        await mongoose.connection.close();
        console.log('Connection closed successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        if (error.name === 'MongoServerSelectionError') {
            console.log('\nTroubleshooting steps:');
            console.log('1. Ensure MongoDB is installed');
            console.log('2. Check if MongoDB service is running');
            console.log('3. Verify MongoDB connection string in .env file');
        }
    } finally {
        process.exit();
    }
}

testConnection();