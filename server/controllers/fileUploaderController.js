
const SingleFile = require('../models/singleFile');

const singleFileUpload = async (req, res, next) => {
    try {
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSzieFotmatter(req.file.size, 2) //0.00
        })

        await file.save();
        res.status(200).send('File Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const fileSzieFotmatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 bytes';
    }

    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}


const getSingleFile = async (req, res , next) => {
    try {
        const files = await SingleFile.find();
        res.status(202).send(files);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    singleFileUpload,
    getSingleFile
}