const fastify = require('fastify')
const dns = require('dns');
const cors = require('@fastify/cors');

dns.setServers(['8.8.8.8', '1.1.1.1']);
const dotenv = require('dotenv')

dotenv.config()

// Import plugins
const dbPlugin = require('./plugins/db')

// Import routes
const authRoutes = require('./routes/auth.routes')
const todoRoutes = require('./routes/todo.routes')


function createApp() {
    
    // Create Fastify instance with logging
    const app = fastify({
        logger: false
    });

    app.register(cors, { origin: '*' });

        // 3. Routes
        app.register(authRoutes, { prefix: '/api/v1/auth'})
        app.register(todoRoutes, { prefix: '/api/v1/todos' });

        app.get('/health', async () => {
            return {
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            };
        });

    return app;
}

// Function to start server (for production/development)
async function startServer() {
    try {
        const app = createApp();

        // 2. Database plugin
        await app.register(dbPlugin);

    
        const port = process.env.PORT || 4000;
        await app.listen({ port , host: '0.0.0.0'})

        console.log(`🚀 Server running on http://localhost:${port}`);

        return app
    } catch(err){
        app.log.error(err)
        process.exit(1)
    }
}

// For direct execution (npm run dev)
if (require.main === module) {
  startServer().catch(console.error);
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n\n🛑 Shutting down gracefully')
    await app.close()
    process.exit(0);
});

module.exports = { createApp, startServer };

