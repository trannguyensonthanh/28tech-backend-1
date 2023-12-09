
const multer  = require('multer')
module.exports = () => {
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')  // lưu ở vị trí file này
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}-${file.originalname}`);  // đặt tên theo ý muốn (date-tenfile)
    }
  })
  
return storage;
}