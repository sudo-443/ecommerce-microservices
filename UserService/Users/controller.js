const UserModel = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

class UserController {
  async Register(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await UserModel.Register({
        username,
        email,
        password: hashedPassword,
      });
      if (result) return res.status(201).json(result);
    } catch (error) {
      console.log(error);
    }
  }
  async Login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.Login({ email, password });
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).send("Invalid credentials");
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        return res.status(200).json({token,user})
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new UserController();
