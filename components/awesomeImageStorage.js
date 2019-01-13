const fs = require('fs');
const multer  = require('multer');
const gfsStorage = require('multer-gridfs-storage');

class AwesomeImageStorage {
  constructor(gridFs) {
    this._gridFs = gridFs;
  }

  async init() {
    await this._gridFs.init();

    const storage = gfsStorage({
      gfs: this._gridFs.getGfs(),
      url: 'mongodb://localhost:27017/some_api',
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.');
      }
    });
    this._upload = multer({ storage: storage }).single('image');
  }

  saveImage(req, res) {
    return new Promise((resolve, reject) => {
      this._upload(req, res, (err) => {
        if (err) {
          return reject(err.message);
        }

        return resolve(req.file.filename);
      });
    });
  }

  async getImage(fileName) {
    return await this._gridFs.getFileByName(fileName);
  }

  async removeImage(fileName) {
    return await this._gridFs.removeFileByName(fileName);
  }
}

module.exports = AwesomeImageStorage;