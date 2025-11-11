const Product = require('../models/Products')

class ProductController{
    
    //Thêm sản phẩm mới
    async addProduct(req, res) {
        try {
            const { productName, price, quantity } = req.body;

            const imageUrl = req.file ? req.file.filename : null;  

            const newProduct = new Product({
                name: productName,
                price,
                stock: quantity,
                imageUrl: imageUrl 
            });

            await newProduct.save();

            res.json({
                message: 'Thêm sản phẩm thành công!',
                product: newProduct
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi thêm sản phẩm!' });
        }
    }

    //Lấy sản Phẩm theo ID hoặc lấy tất cả
    async getProduct(req, res) {
        try {
            const { productId } = req.params; 
            if (productId) {
                const product = await Product.findById(productId);
                if (!product) {
                    return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
                }
                return res.status(200).json({ products: product });
            }

            const products = await Product.find();
            res.status(200).json({ products });
        } catch (error) {
            console.error('Error getProduct:', error);
            res.status(500).json({ message: 'Lỗi khi lấy sản phẩm!' });
        }
    }

    //Lấy 8 sản phẩm mới nhất
    async getNewProduct(req, res) {
        try {
            const products = await Product.find().sort({_id: -1}).limit(8) ;
            res.status(200).json({ products });
        } catch (error) {
            console.error('Error getProduct:', error);
            res.status(500).json({ message: 'Lỗi khi lấy sản phẩm!' });
        }
    }

    //Xóa sản phẩm theo ProductID
    async delProduct(req, res) {
        try {
            const {productId} = req.body
            const result = await Product.deleteOne({_id: productId})

            if(result.deletedCount === 0) 
                res.status(500).json({message:"Xóa thất bại", err: true})

            const getProducts = await Product.find()
            
            return res.status(200).json({ message: "Xóa thành công", err: false, products: getProducts });
        } catch (error) {
            res.status(500).json({ message: "Lỗi server", err: true });
        }
    }

    // Update sản phẩm
    async editProduct(req, res) {
        try{
            const { productName, price, quantity, productId } = req.body;
            let status = "Còn Hàng"

            if(quantity <= 0){
                 status = "Hết hàng"
            }

            const oldProduct = await Product.findById(productId);

            const imageUrl = req.file ? req.file.filename : oldProduct.imageUrl;  

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { $set: { name: productName, price, stock: quantity, imageUrl, status: status } },
                { new: true } 
                );

            if (!updatedProduct) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm", err: true });
            }

            res.status(200).json({
                message: 'Chỉnh sửa sản phẩm thành công!',
                err: false,
                product: updatedProduct
            }
            );


        }catch (error){
            res.status(500).json({ message: "Lỗi server", err: true });
        }
    }

    //Tìm kiếm sản phẩm theo searchValue
    async searchProduct(req, res) {
        try {
            const { searchValue , pageNumber, limit } = req.body;
            let skip = (pageNumber - 1) * limit

            const totalProducts = await Product.find().countDocuments();

            const totalPages = Math.ceil(totalProducts / limit);

            let products = [];

            if (searchValue === 'all') {
                products = await Product.find().skip(skip).limit(limit);
            }else if(searchValue === 'lowest'){
                products = await Product.find().sort({price: 1}).skip(skip).limit(limit)
            }else if(searchValue === 'highest'){
                products = await Product.find().sort({price: -1}).skip(skip).limit(limit)
            }

            return res.status(200).json({ products, pageNumber, totalPages });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm' });
        }
    }


}

module.exports = new ProductController();