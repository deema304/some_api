const fs = require('fs');
const multer = require('multer');
const Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './images');
  },
  filename: function(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({storage: Storage}).single('image');

class AwesomeImageStorage {
  constructor() {}

  saveImage(req, res) {
    return new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          return reject(err.message);
        }

        return resolve(req.file.filename);
      });
    });
  }

  getImage(fileName) {
    return fs.readFileSync(fileName);
  }

  removeImage(fileName) {
    return new Promise((resolve, reject) => {
      fs.unlink(`./images/${fileName}`, (e) => {
        if(e) {
          return reject(e);
        }

        return resolve();
      })
    });
  }
}

module.exports = AwesomeImageStorage;