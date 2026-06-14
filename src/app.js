const fastify = require('fastify');
const dns = require('dns');
const cors = require('@fastify/cors');
const dotenv = require('dotenv');

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

// Plugins
const dbPlugin = require('./plugins/db');

// Routes
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');

async function createApp() {
    const app = fastify({
        logger: false
    });

    await app.register(cors, { origin: '*' });

    // Database
    await app.register(dbPlugin);

    // Routes
    await app.register(authRoutes, {
        prefix: '/api/v1/auth'
    });

    await app.register(todoRoutes, {
        prefix: '/api/v1/todos'
    });

    app.get('/health', async () => {
        return {
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        };
    });

    return app;
}

async function startServer() {
    try {
        const app = await createApp();

        const port = process.env.PORT || 4000;

        await app.listen({
            port,
            host: '0.0.0.0'
        });

        console.log(`🚀 Server running on port ${port}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// Local development only
if (require.main === module) {
    startServer();
}

module.exports = { createApp };