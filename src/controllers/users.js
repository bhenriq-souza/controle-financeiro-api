const boom = require('boom');
const { User } = require('../models');

class UserController {

  constructor() { }

  static async getAllUsers(request, reply) {
    try {
      const users = await User.find();
      reply.code(200).send(users);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  static async getSingleUser(request, reply) {
    try {
      const { id } = request.params;
      const user = await User.findById(id);
      reply.code(200).send(user);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  static async addUser(request, reply) {
    try {
      const newUser = new User(request.body);
      const user = await newUser.save();
      reply.code(200).send(user);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  static async updateUser(request, reply) {
    try {
      const { id } = request.params;
      const user = request.body;
      const { ...updateData } = user;
      const update = await User.findByIdAndUpdate(id, updateData, { new: true });
      reply.code(200).send(update);
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  static async deleteUser(request, reply) {
    try {
      const { id } = request.params;
      const user = await User.findByIdAndDelete(id);
      reply.code(200).send(user);
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

module.exports = UserController;