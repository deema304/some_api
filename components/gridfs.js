const gridfs = require('gridfs-stream');

class GridFS {
  constructor(mongo) {
    this._mongo = mongo;
  }

  async init() {
    await this._mongo.init();
    this._gfs = gridfs(this._mongo.getDb(), this._mongo.getMongo());
  }

  getGfs() {
    return this._gfs;
  }

  async checkIsFileExists(filename) {
    return new Promise((resolve, reject) => {
      this._gfs.exist({ filename }, (err, file) => {
        if(err || !file) {
          return reject(new Error('File is not exists'));
        }

        return resolve();
      });
    });
  }

  async getFileByName(filename) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.checkIsFileExists(filename);
      } catch (err) {
        return reject(err);
      }

      this._gfs.files.find({ filename }, (err, file) => {
        if (err || !file) {
          return reject(new Error('File Not Found'));
        }

        resolve(this._gfs.createReadStream({ filename }));
      });
    });
  }

  async removeFileByName(filename) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.checkIsFileExists(filename);
      } catch (err) {
        reject(err.message);
      }

      this._gfs.files.remove({ filename }, err => {
        if (err) {
          reject(err.message);
        }

        resolve("File has been deleted");
      });
    });
  }
}

module.exports = GridFS;