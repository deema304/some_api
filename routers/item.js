const log4js = require('log4js');
const logger = log4js.getLogger('[Item]');
logger.level = 'debug';
const express = require("express");
const router = express.Router();

class Item {
  constructor(controller, auth) {
    this._controller = controller;
    this._auth = auth;
  }

  async init() {
    await this._controller.init();
    logger.info('Item router inited');
  }

  getRoutes() {

    router.get("/", this._auth.validateToken, this._controller.searchItem.bind(this._controller));
    router.get("/:id", this._auth.validateToken, this._controller.getItemById.bind(this._controller));
    router.get("/:name/image", this._auth.validateToken, this._controller.getImageByName.bind(this._controller));
    router.put("/:id", this._auth.validateToken, this._controller.updateItemById.bind(this._controller));
    router.delete("/:id", this._auth.validateToken, this._controller.deleteItemById.bind(this._controller));
    router.put("/", this._auth.validateToken, this._controller.createItem.bind(this._controller));
    router.post("/:id/image", this._auth.validateToken, this._controller.uploadImage.bind(this._controller));
    router.delete("/:id/image", this._auth.validateToken, this._controller.deleteImage.bind(this._controller));

    return router;
  }
}

module.exports = Item;