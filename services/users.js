const User = require('../models/userSchema');

const findUserByEmail = async (email) => await User.findOne({ email });


const findUserNameById = async (id) => {
  const userFinded = await User.findById(id);
  const userName = userFinded.name;
  return userName;
};

const createNewUser = async (body) => {
  const { name, email, password, role } = body;
  const newUser = new User({ name, email, role });
  await newUser.setPassword(password);
  await newUser.save();
  return newUser;
};

const updateUserToken = async (id, token = null) =>
  await User.findByIdAndUpdate(id, { token });

const updateAvatar = async (id, avatarURL) =>
  await User.findByIdAndUpdate(id, { avatarURL });

module.exports = {
  findUserByEmail,
  findUserNameById,
  createNewUser,
  updateUserToken,
  updateAvatar,
};