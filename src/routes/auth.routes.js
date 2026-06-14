async function authRoutes(fastify, options) {
    const authController = require("../controllers/auth.controller")

    // Register validation schema
    const registerSchema = {
        body: {
            type: 'object',
            required: ['name','email','password'],
            properties: {
                name: { type: 'string', minLength: 2, maxLength: 50},
                email: { type: 'string', format: 'email'},
                password: { type: 'string', minLength: 6}
            }
        }
    };

    const loginSchema = {
        body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 1 }
        }
        }
    };

    // Register route
    fastify.post('/register', {
        schema: registerSchema,
        handler: authController.register
    });

    // Login route
    fastify.post('/login', {
        schema: loginSchema,
        handler: authController.login
    });
    }

module.exports = authRoutes;

