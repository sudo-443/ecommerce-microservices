const User = require("./schema");

class UserModel {
  async Register(data) {
    try {
      console.log("data",data)
      const user = new User(data);
      await user.save();
      console.log("after db",user)
      if (user) return user;
      return 0;
    } catch (error) {
      console.log(error.message);
    }
  }
  async Login(data){
    const user = await User.findOne({email:data.email})
    return user
  }
  
  async listUser(req,res){
    try {
      return res.json({"user":await User.find()})
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UserModel();
