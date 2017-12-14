const imagemagick = require('imagemagick');
const srcPath ="../uploads/images/";
const desPath ="../uploads/resized_images/";
var fs = require('fs');

module.exports = {
    convertImageToThumbnail(image) {
    imagemagick.resize({
      srcPath: srcPath+image,
      dstPath: desPath+image,
      width:   256
      }, function(err, stdout, stderr){
      if (err) throw err;
      console.log('resized kittens.jpg to fit within 256x256px');
    });

    // imagemagick.resize({
    //   srcData: fs.readFileSync(srcPath+image, 'binary'),
    //   width:   256
    // }, function(err, stdout, stderr){
    //   if (err) throw err
    //   fs.writeFileSync(desPath+image, stdout, 'binary');
    //   console.log('resized kittens.jpg to fit within 256x256px')
    // });

  }
}