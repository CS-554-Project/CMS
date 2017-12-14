const imagemagick = require('imagemagick');
const desPath ="C:/Users/HP/Desktop/Stevens Study/Sem 4/CS -554/LABs/CMS/cms/server/uploads/images/";
const srcPath="C:/Users/HP/Desktop/Stevens Study/Sem 4/CS -554/LABs/CMS/cms/server/uploads/images/";
const image="Capture.PNG";

module.exports = {
    convertImageToThumbnail(image) {
     
      var optionsObj = {
          srcPath: srcPath,
          dstPath: desPath + image +".png",
         
          quality: 100.0,
          width: "275",
          height: "183",
          format: 'png',
          customArgs: [
              '-gravity', 'center',
              "-bordercolor", "black",
              "-border", "5x5",
          ]
  
      };
 
      imagemagick.resize(optionsObj, function (err, stdout) {

        console.log(optionsObj);
          if (err) return "Could not convert user image file";
          console.log("image successfully converted and stored at " + desPath);
          return "image successfully converted and stored at " + desPath;
      });
  
    }
  }


module.exports.convertImageToThumbnail("Capture.PNG")