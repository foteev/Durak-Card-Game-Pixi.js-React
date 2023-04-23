import Product from "../schemas/product.js";

class ProductService {
    async create(product: any) {
        const newProduct = await Product.create(product);
        return newProduct;
    };

    async get(id: string) {
        const product = await Product.findById(id);
        return product;
    };

    async update(id: string, product: any) {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        return updatedProduct;
    };

    async delete(id: string) {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return deletedProduct;
    };

    async getAll() {
        const users = await Product.find();
        return users;
    };
}

export default new ProductService();