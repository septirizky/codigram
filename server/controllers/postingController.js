const { Posting } = require("../models");
const { Op } = require("sequelize");

class PostingController {
  static async getPosting(req, res) {
    try {
      let posting = await Posting.findAll();

      res.status(200).json(posting);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async detailPosting(req, res, next) {
    try {
      const result = await Article.findAll({
        where: { id: req.params.id },
        include: [Users],
      });
      result
        ? res.status(200).json(result)
        : res
            .status(400)
            .json({ message: `Article ID ${req.params.id} not found.` });
    } catch (e) {
      res.status(400).json(e);
    }
  }
  static async createPosting(req, res) {
    try {
      const { caption, UserId } = req.body;
      let image = "https://via.placeholder.com/100";

      let result = await Posting.create({
        image,
        caption,
        UserId,
      });

      res.status(201).json(result);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  static async update(req, res) {
    try {
      let id = +req.params.id;
      const { caption, image, UserId } = req.body;

      let result = await Posting.update(
        {
          image,
          caption,
          UserId,
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
  static async delete(req, res) {
    try {
      let id = +req.params.id;

      let result = await Posting.destroy({
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

  static async searching(req, res) {
    try {
      const keyword = req.params.keyword;

      let result = await Posting.findAll({
        where: { caption: { [Op.iLike]: `%${keyword}%` } },
      });

      res.status(200).json({
        data: result,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = PostingController;
