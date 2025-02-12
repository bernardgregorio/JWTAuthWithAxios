import User from "../models/user.js";

class UserRepository {
  async createUser(data) {
    return await User.create(data);
  }

  async findUserByUsername(username) {
    return await User.findOne({ username });
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserById(id) {
    return await User.findById(id);
  }

  async getAllUsers() {
    return await User.find();
  }

  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async saveRefreshToken(id, token) {
    return await User.findByIdAndUpdate(
      id,
      { refreshToken: token },
      { new: true }
    );
  }

  async findUserByRefreshToken(token) {
    return await User.findOne({ refreshToken: token });
  }
}

export default new UserRepository();
