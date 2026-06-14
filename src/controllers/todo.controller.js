const todoService = require('../services/todo.service');

class TodoController {
  async createTodo(req, reply) {
    try {
      const { title } = req.body;
      const userId = req.user.id;
      
      const todo = await todoService.createTodo(userId, title);
      
      return reply.code(201).send({
        success: true,
        message: 'Todo created successfully',
        data: todo
      });
    } catch (error) {
      return reply.code(400).send({
        success: false,
        message: error.message
      });
    }
  }

  async getTodos(req, reply) {
    try {
      const userId = req.user.id;
      const todos = await todoService.getUserTodos(userId);
      
      return reply.code(200).send({
        success: true,
        data: todos
      });
    } catch (error) {
      return reply.code(500).send({
        success: false,
        message: error.message
      });
    }
  }

  async deleteTodo(req, reply) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      const result = await todoService.deleteTodo(userId, id);
      
      return reply.code(200).send({
        success: true,
        message: result.message
      });
    } catch (error) {
      return reply.code(404).send({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new TodoController();