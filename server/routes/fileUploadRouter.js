const express = require('express');
const { upload } = require('../helpers/fileHelper');
const { singleFileUpload, getSingleFile } = require('../controllers/fileUploaderController');
const router = express.Router();
const auth = require('../middleware/auth');



router.post('/singleFile', auth, upload.single('file'), singleFileUpload);
router.get('/getSingleFile', auth, getSingleFile);


module.exports = {
    routes: router
}