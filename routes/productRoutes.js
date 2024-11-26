const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');
const path = require('path');

const router = express.Router();

// Cấu hình Multer để upload hình ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Route để render file `index.html`
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// API CRUD
router.get('/products', productController.getAllProducts);
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
