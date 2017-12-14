const path = require('path');
const fs = require('fs');
const imagemagick = require('imagemagick');
const _srcPath = path.join(__dirname, '../uploads/images/');
const _desPath = path.join(__dirname, '../uploads/resized_images/');

module.exports = {
    convertImageToThumbnail(image, cb) {
      imagemagick.resize({
        srcPath: path.join(_srcPath, image),
        dstPath: path.join(_desPath, image),
        width:   256
        }, (err, stdout, stderr) => {
        if (err) throw err;
        else return cb('Image Resized');
      });
  }
}