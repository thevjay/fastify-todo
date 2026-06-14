const todoRepository = require('../repositories/todo.repository');

class TodoService {
  async createTodo(userId, title) {
    if (!title || title.trim().length === 0) {
      throw new Error('Title is required');
    }

    return await todoRepository.create({ title, user: userId });
  }

  async getUserTodos(userId) {
    return await todoRepository.findAllByUser(userId);
  }

  async deleteTodo(userId, todoId) {
    const todo = await todoRepository.findByIdAndUser(todoId, userId);
    
    if (!todo) {
      throw new Error('Todo not found');
    }

    await todoRepository.deleteByIdAndUser(todoId, userId);
    return { message: 'Todo deleted successfully' };
  }
}

module.exports = new TodoService();