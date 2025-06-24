import { NextFunction, Request, Response } from 'express';
import { ValidationErrors } from '../types';

class ProductValidations {
    /**
     * @description get a product by id
     * @param req - Express Request object
     * @param res - Express Response object
     * @param next - Express NextFunction
     */
    public getOne(req: Request, res: Response, next: NextFunction): any {
        const { product_id } = req.params;
        const errors: ValidationErrors = {};

        // Product ID validation
        if (!product_id) {
            errors.product_id = 'Product ID is required';
        } else if (typeof product_id !== 'string') {
            errors.product_id = 'Product ID must be a string';
        } else if (product_id.length !== 24) {
            errors.product_id = 'Product ID must be 24 characters';
        }

        if (Object.keys(errors).length > 0) {
            const firstError =
                errors[Object.keys(errors)[0] as keyof ValidationErrors];
            return res.status(422).json({
                message: firstError,
                status: 422,
                payload: { error: firstError },
            });
        } else {
            next();
        }
    }

    /**
     * @description Filter products by category.
     * @param req - Express Request object
     * @param res - Express Response object
     * @param next - Express NextFunction
     */
    public getByCategory(req: Request, res: Response, next: NextFunction): any {
        const { category } = req.query;
        const errors: ValidationErrors = {};

        // Category validation
        if (category) {
            if (typeof category !== 'string') {
                errors.category = 'Category must be a string';
            } else if (category.length < 1 || category.length > 225) {
                errors.category =
                    'Category must be between 1 and 255 characters';
            }
        }

        if (Object.keys(errors).length > 0) {
            const firstError =
                errors[Object.keys(errors)[0] as keyof ValidationErrors];
            return res.status(422).json({
                message: firstError,
                status: 422,
                payload: { error: firstError },
            });
        } else {
            next();
        }
    }

    /**
     * @description Create a product
     * @param req - Express Request object
     * @param res - Express Response object
     * @param next - Express NextFunction
     */
    public create(req: Request, res: Response, next: NextFunction): any {
        const {
            product_name,
            product_description,
            category_id,
            product_price,
            product_quantity,
            product_image,
        } = req.body;
        const errors: ValidationErrors = {};

        // Product name validation
        if (!product_name) {
            errors.product_name = 'Product name is required';
        } else if (typeof product_name !== 'string') {
            errors.product_name = 'Product name must be a string';
        } else if (product_name.length < 1 || product_name.length > 255) {
            errors.product_name =
                'Product name must be between 1 and 255 characters';
        }

        // Product description validation
        if (!product_description) {
            errors.product_description = 'Product description is required';
        } else if (typeof product_description !== 'string') {
            errors.product_description = 'Product description must be a string';
        } else if (
            product_description.length < 1 ||
            product_description.length > 255
        ) {
            errors.product_description =
                'Product description must be between 1 and 255 characters';
        }

        // Category validation
        if (!category_id) {
            errors.category_id = 'Category is required';
        } else if (typeof category_id !== 'string') {
            errors.category_id = 'Category must be a string';
        } else if (category_id.length !== 24) {
            errors.category_id = 'Category must be 24 characters';
        }

        // Product price validation
        if (!product_price) {
            errors.product_price = 'Product price is required';
        } else if (typeof product_price !== 'number') {
            errors.product_price = 'Product price must be a number';
        } else if (product_price < 0) {
            errors.product_price = 'Product price must be greater than 0';
        }

        // Product quantity validation
        if (!product_quantity) {
            errors.product_quantity = 'Product quantity is required';
        } else if (typeof product_quantity !== 'number') {
            errors.product_quantity = 'Product quantity must be a number';
        } else if (product_quantity < 0) {
            errors.product_quantity = 'Product quantity must be greater than 0';
        }

        // Product image validation
        if (!product_image) {
            errors.product_image = 'Product image is required';
        } else if (typeof product_image !== 'string') {
            errors.product_image = 'Product image must be a string';
        }

        if (Object.keys(errors).length > 0) {
            const firstError =
                errors[Object.keys(errors)[0] as keyof ValidationErrors];
            return res.status(422).json({
                message: firstError,
                status: 422,
                payload: { error: firstError },
            });
        } else {
            next();
        }
    }
}

export default new ProductValidations();
