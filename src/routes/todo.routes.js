const authMiddleware = require('../middleware/auth')

async function todoRoutes(fastify, options) {
    const todoController = require('../controllers/todo.controller')

    // Validation schemas
    const createTodoSchema = {
        body: {
            type: 'object',
            required: ['title'],
            properties:{
                title: { type: 'string', minLength: 1, maxLength: 200}
            }
        }
    }

    const deleteTodoSchema = {
        params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
        }
        }
    };

    // Create todo (with auth middleware)
    fastify.post('/',{
        schema: createTodoSchema,
        preHandler: authMiddleware,    // Middleware runs here
        handler: todoController.createTodo
    });

    // Get all user todos (with auth middleware)
    fastify.get('/', {
        preHandler: authMiddleware,
        handler: todoController.getTodos
    })

    // Delete todo (with auth middleware)
    fastify.delete('/:id', {
        schema: deleteTodoSchema,
        preHandler: authMiddleware,
        handler: todoController.deleteTodo
    })

}

module.exports = todoRoutes;