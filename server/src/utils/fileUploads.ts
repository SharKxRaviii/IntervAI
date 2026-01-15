// import multer from 'multer';
import multer from 'multer';
import path from 'path';

const filePath = path.join(path.resolve('src', 'uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath)
    },

    filename: function (req, file, cb) {
        const uniqueFilename = Date.now() + "-" + Math.round((Math.random()) * 1e9);
        cb(null, uniqueFilename + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

export default upload;