const Todo = require('../models/Todo');

class TodoRepository {
  async create(todoData) {
    return await Todo.create(todoData);
  }

  async findAllByUser(userId) {
    return await Todo.find({ user: userId }).sort({ createdAt: -1 });
  }

  async findByIdAndUser(id, userId) {
    return await Todo.findOne({ _id: id, user: userId });
  }

  async deleteByIdAndUser(id, userId) {
    return await Todo.findOneAndDelete({ _id: id, user: userId });
  }
}

module.exports = new TodoRepository();