import ProductCategory from '../schemas/product-category.js';

class ProductCategoryService {
    async create(productCategory: any) {
        const newProductCategory = await ProductCategory.create(productCategory)
        return newProductCategory;
    };

    async get(id: string) {
        const productCategory = await ProductCategory.findById(id);
        return productCategory;
    };

    async update(id: string, productCategory: any) {
        const updatedProductCategory = await ProductCategory.findByIdAndUpdate(id, productCategory, { new: true });
        return updatedProductCategory;
    };

    async delete(id: string) {
        const productCategory = await ProductCategory.findByIdAndDelete(id);
        return productCategory;
    };

    async getAll() {
        const users = await ProductCategory.find();
        return users;
    };
}

export default new ProductCategoryService();