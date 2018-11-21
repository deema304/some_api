const log4js = require('log4js');
const logger = log4js.getLogger('[ItemController]');
logger.level = 'debug';

class ItemController {
  constructor(mysql, image) {
    this._mysql = mysql;
    this._image = image;
  }

  async init() {
    logger.info('ItemController inited');
  }

  async searchItem(req, res) {
    try {
      const item = await this._mysql.getModel('Item').search(req.query);

      return res.status(200).send(item);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }

  async getItemById(req, res) {
    try {
      const item = await this._mysql.getModel('Item').getById(req.params.id);

      return res.status(200).send(item);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }

  async updateItemById(req, res) {
    try {
      const item = await this._mysql.getModel('Item').update({ id: req.params.id }, req.body);

      return res.status(200).send(item);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }

  async deleteItemById(req, res) {
    try {
      const item = await this._mysql.getModel('Item').deleteById(req.params.id);

      return res.sendStatus(200);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }

  async createItem(req, res) {
    try {
      const item = await this._mysql.getModel('Item').create(req.body);

      return res.status(200).json(item);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }

  async uploadImage(req, res) {
    try {
      const uploadedFileName = await this._image.saveImage(req, res);

      await this._mysql.getModel('Item').update({ id: req.params.id }, {image: uploadedFileName});

      return res.sendStatus(200);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }

  async deleteImage(req, res) {
    try {
      const item = await this._mysql.getModel('Item').getById(req.params.id);

      await this._image.removeImage(item.image);
      await this._mysql.getModel('Item').update({ id: req.params.id }, {image: ''});

      return res.sendStatus(200);
    } catch (e) {
      return res.status(422).send(e.message);
    }
  }
}

module.exports = ItemController;