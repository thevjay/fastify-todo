const fp = require('fastify-plugin');
const mongoose = require('mongoose');

async function dbConnector(fastify, options) {
  try {
    console.log("ENV:",process.env.MONGODB_URL)
    await mongoose.connect(process.env.MONGODB_URL,{
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected');
    
    fastify.decorate('db', mongoose);
    
    fastify.addHook('onClose', async () => {
      await mongoose.connection.close();
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

module.exports = fp(dbConnector);