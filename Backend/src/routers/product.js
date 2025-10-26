const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/addProduct', upload.single('image'), ProductController.addProduct);
router.post('/delProduct', ProductController.delProduct);
router.post('/editProduct', upload.single('image'), ProductController.editProduct);
router.get('/getProduct/:productId', ProductController.getProduct);
router.get('/getProduct', ProductController.getProduct);
router.post('/searchProduct', ProductController.searchProduct);
router.get('/getNewProduct', ProductController.getNewProduct);

module.exports = router;
