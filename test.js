require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');

(async () => {
  try {
    console.log('URL:', process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL);

    console.log('✅ Connected');
  } catch (e) {
    console.error(e);
  }
})();