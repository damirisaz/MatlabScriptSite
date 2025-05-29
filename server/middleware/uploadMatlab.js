import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Папка uploads/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    },
});

// Фильтр для только .m файлов
const fileFilter = (req, file, cb) => {
    if (path.extname(file.originalname) === '.m') {
        cb(null, true);
    } else {
        cb(new Error('Только MATLAB-скрипты (*.m) разрешены'), false);
    }
};

const uploadMatlab = multer({ storage, fileFilter });

export default uploadMatlab;
