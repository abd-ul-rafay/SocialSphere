import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        const ext = path.extname(file.originalname);
        const fileName = `${uniqueSuffix}${ext}`;

        req.body.imagePath = fileName;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const allowedImageExtensions = ['.png', '.jpeg', '.jpg'];

    if (allowedImageExtensions.includes(ext.toLowerCase())) {
        cb(null, true);
    } else {
        cb(new Error('Only image files with .png, .jpeg, or .jpg extensions are allowed.'));
    }
};

export default multer({ storage: storage, fileFilter });
