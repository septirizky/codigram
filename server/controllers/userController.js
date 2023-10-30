const { User } = require("../models");
const { genSalt, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

class UserController {
  static async getUser(req, res, next) {
    try {
      let user = await User.findAll();

      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  static async register(req, res, next) {
    try {
      const { username, email, password, picture } = req.body;
      const salt = await genSalt(10);
      const passHash = hashSync(password, salt);
      // res.send(passHash);
      if (username && email && password) {
        const dataUsername = await User.findOne({
          where: { username: username },
        });
        const dataEmail = await User.findOne({ where: { email: email } });
        if (dataUsername) {
          res.status(400).json({ message: "Username not available" });
        } else if (dataEmail) {
          res.status(400).json({ message: "Email already use" });
        } else {
          const result = await User.create({
            username: username,
            email: email,
            password: passHash,
            picture: picture ? picture : "https://via.placeholder.com/100",
          });
          res.status(200).json(result);
        }
      } else {
        res.status(400).json({ message: "Fill all forms please" });
      }
    } catch (err) {
      res.status(400).json({ message: "asdf" });
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const data = await User.findOne({ where: { username: username } });
      if (data) {
        const token = sign({ data }, process.env.SECRET_KEY);
        (await compareSync(password, data.password))
          ? res.status(200).json({ data: data, token: token })
          : res.status(400).json({ message: "Incorrect Password." });
      } else {
        res.status(400).json({ message: "Username not found." });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      let id = +req.params.id;

      let result = await User.destroy({
        where: { id: id },
      });

      result === 1
        ? res.status(200).json({
            message: `Id ${id} has been deleted.`,
          })
        : res.status(400).json({
            message: `Id ${id} has not been deleted.`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async update(req, res) {
    try {
      let id = +req.params.id;
      const { username, email, password, picture } = req.body;

      let result = await User.update(
        {
          username,
          email,
          password,
          picture,
        },
        {
          where: { id: id },
        }
      );

      result[0] === 1
        ? res.status(200).json({
            message: `Id ${id} has been updated.`,
          })
        : res.status(400).json({
            message: `Id ${id} has not been updated.`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async detailUser(req, res, next) {
    try {
      const result = await User.findByPk(req.params.id);
      result
        ? res.status(200).json([result])
        : res
            .status(400)
            .json({ message: `User ID ${req.params.id} not found.` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
