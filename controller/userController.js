const {User} = require("../models")


class userController {
  static async create (req, res) {
    try {
      const { name } = req.body;

      const result = await User.create({
        name,
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({msg: "Internal Server Error"})
    }
  }

  static async read (req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({msg: "Internal Server Error"})
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      const findUser = await User.findByPk(id);
      if (findUser) {
        await User.destroy({
          where: {
            id,
          },
        });
        res.status(200).json({msg: "User has been Deleted" });
      } else {
        res.status(404).json({msg: "Error Not Found"})
      }
    } catch (error) {
      res.status(500).json({msg: "Internal Server Error"})
    }
  }

  static async readById (req, res) {
    const { id } = req.params;

    try {
      const findUser = await User.findByPk(id);

      if (findUser) {
        res.status(200).json(findUser);
      } else {
        res.status(404).json({msg: "Error Not Found"})
      }
    } catch (error) {
      res.status(500).json({msg: "Internal Server Error"})
    }
  }
}

module.exports = userController