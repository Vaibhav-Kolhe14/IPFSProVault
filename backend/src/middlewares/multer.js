const multer = require('multer')

const storage = () => multer.memoryStorage();

module.exports = { uploadUsersImage:multer({ storage: storage() }).single('file') };