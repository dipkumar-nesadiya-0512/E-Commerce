import { Request, Response } from 'express';
import { ProductModel } from '../model';
import { CategoryModel } from '../../category/model';

class ProductController {
    /**
     * @description get all products
     * @param req - Express Request object
     * @param res - Express Response object
     */
    public async getAll(req: Request, res: Response) {
        try {
            const { category } = req.query;

            let isCategoryExist = null;
            if (category) {
                isCategoryExist = await CategoryModel.findOne({
                    category_name: category,
                    is_deleted: false,
                }).select('_id');

                if (!isCategoryExist) {
                    return res.status(404).json({
                        message: 'Category not found',
                        status: 404,
                    });
                }
            }

            const products = await ProductModel.find({
                is_deleted: false,
                ...(category && { category_id: isCategoryExist?._id }),
            })
                .populate(
                    'category_id',
                    'category_name category_description -_id',
                )
                .select('-__v -is_deleted -updated_at');

            if (products.length === 0) {
                return res.status(404).json({
                    message: 'No products found',
                    status: 404,
                });
            }

            return res.status(200).json({
                message: 'Products fetched successfully',
                status: 200,
                payload: products,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                status: 500,
                payload: error,
            });
        }
    }

    /**
     * @description get a product by id
     * @param req - Express Request object
     * @param res - Express Response object
     */
    public async getOne(req: Request, res: Response) {
        try {
            const { product_id } = req.params;

            const product = await ProductModel.findOne({
                _id: product_id,
                is_deleted: false,
            })
                .populate('category_id', 'category_name category_description')
                .select('-__v -is_deleted -updated_at');

            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                    status: 404,
                });
            }

            return res.status(200).json({
                message: 'Product fetched successfully',
                status: 200,
                payload: product,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                status: 500,
                payload: error,
            });
        }
    }

    /**
     * @description Filter products by category.
     * @param req - Express Request object
     * @param res - Express Response object
     */
    public async getByCategory(req: Request, res: Response) {
        try {
            const { category } = req.query;

            const isCategoryExist = await CategoryModel.findOne({
                category_name: category,
                is_deleted: false,
            }).select('_id');

            if (!isCategoryExist) {
                return res.status(404).json({
                    message: 'Category not found',
                    status: 404,
                });
            }

            const products = await ProductModel.find({
                category_id: isCategoryExist._id,
                is_deleted: false,
            })
                .populate(
                    'category_id',
                    'category_name category_description -_id',
                )
                .select('-__v -is_deleted -updated_at');

            if (products.length === 0) {
                return res.status(404).json({
                    message: 'No products found',
                    status: 404,
                });
            }

            return res.status(200).json({
                message: 'Products fetched successfully',
                status: 200,
                payload: products,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                status: 500,
                payload: error,
            });
        }
    }

    /**
     * @description Create a product
     * @param req - Express Request object
     * @param res - Express Response object
     */
    public async create(req: Request, res: Response) {
        try {
            const {
                product_name,
                product_description,
                category_id,
                product_price,
                product_quantity,
                product_image,
            } = req.body;

            const isCategoryExist = await CategoryModel.findOne({
                _id: category_id,
                is_deleted: false,
            });

            if (!isCategoryExist) {
                return res.status(404).json({
                    message: 'Category not found',
                    status: 404,
                });
            }

            const isProductExist = await ProductModel.findOne({
                product_name,
                is_deleted: false,
                category_id,
            });

            if (isProductExist) {
                return res.status(400).json({
                    message: 'Product already exists',
                    status: 400,
                });
            }

            const product = await ProductModel.create({
                product_name,
                product_description,
                category_id,
                product_price,
                product_quantity,
                product_image: product_image || '',
            });

            if (product) {
                await CategoryModel.updateOne(
                    { _id: category_id },
                    { $push: { product_ids: product._id } },
                );
            }

            return res.status(201).json({
                message: 'Product created successfully',
                status: 201,
                payload: product,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                status: 500,
                payload: error,
            });
        }
    }
}

export default new ProductController();
