const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


module.exports = upload; // faced error exporting the multer instead of upload