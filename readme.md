const fastify = require('fastify')()
const mongoose = require('mongoose')

const todoService = require('./plugins/todo-service')
const todoData = require('./plugins/todo-data')
const todoRoutes = require('./plugins/todo-routes')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://vijay930:67THTyxdPvrOfwIB@cluster0.qyuho.mongodb.net/fastify-todo',{
            useNewUrlParser: true
        })

        fastify.log.info('MongoDB connected successfully')
    } catch(err){
        fastify.log.error('MongoDB connection failed: ', err)
        process.exit(1);
    }
};

const start = async () => {
    // Register method attaches the plugins to the main fastify instance. 
    await fastify.register(todoData);
    await fastify.register(todoService);
    await fastify.register(todoRoutes);

    try {
        await connectDB();

        await fastify.listen({ port: 4000});
        fastify.log.info(`Server is running at http://localhost:4000`)
    } catch(err){
        fastify.log.error('failed: ', err)
        process.exit(1);
    }
}

start();


