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
// todoRoutes
const todoRoutes = require('./routes/todo.routes')

// Create Fastify instance with logging
const app = fastify({
    logger: false
});

async function start() {
    try {
        
        // 2. Database plugin
        await app.register(dbPlugin);

        app.register(cors, { origin: '*' });

        // 3. Routes
        await app.register(authRoutes, { prefix: '/api/v1/auth'})
        await app.register(todoRoutes, { prefix: '/api/v1/todos' });

        app.get('/health', async () => {
            return {
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            };
        });

        const port = process.env.PORT || 4000;
        await app.listen({ port , host: '0.0.0.0'})

        
        console.log(`
        ═══════════════════════════════════════════════
        🚀 Server running on http://localhost:${port}
        📝 API docs available at http://localhost:${port}
        ❤️  Health check: http://localhost:${port}/health
        ═══════════════════════════════════════════════
        `);

    } catch(err){
        app.log.error(err)
        process.exit(1)
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n\n🛑 Shutting down gracefully')
    await app.close()
    process.exit(0);
});

start();


module.exports = app;