const bcrypt = require("bcryptjs");
const { genrateToken } = require("../../utlis/jwtUtils");
const { userSchema } = require("../users/userValidator");
const { createUser, getUserByEmail } = require("../users/usersModel");
const { v4: uuid } = require("uuid");
const genid = require("../../utlis/genID");
const register = async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Validation failed",
          error: error.details[0].message,
        });
    }
    console.log(value);
    const emailExist = await getUserByEmail(value.email);
    console.log(emailExist);
    if (emailExist) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const id = genid();
    const hashedPassword = await bcrypt.hash(value.password, 12);
    const nUser = {
      ...value,
      password: hashedPassword,
      id: id,
    };
    const newUser = await createUser(nUser);
    console.log(newUser);
    res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        data: { id: newUser[0], ...nUser, password: undefined },
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create user",
        error: error.message,
      });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, massage: "Invalid email or password" });
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, massage: "Invalid password" });
    }

    const token = genrateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({
        success: true,
        massage: "Login successful",
        token: token,
        role: user.role,
        user: user,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
module.exports = { register, login, logout };
