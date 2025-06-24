import { NextFunction, Request, Response } from 'express';
import { ValidationErrors } from '../types';

class CategoryValidation {
    public async create(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        const { category_name, category_description } = req.body;
        const errors: ValidationErrors = {};

        // Name validation
        if (!category_name) {
            errors.category_name = 'Category name is required';
        } else if (typeof category_name !== 'string') {
            errors.category_name = 'Category name must be a string';
        } else if (category_name.length < 1 || category_name.length > 255) {
            errors.category_name =
                'Category name must be between 1 and 255 characters';
        }

        // Description validation
        if (category_description && typeof category_description !== 'string') {
            errors.category_description =
                'Category description must be a string';
        } else if (
            category_description.length < 1 ||
            category_description.length > 255
        ) {
            errors.category_description =
                'Category description must be between 1 and 255 characters';
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

export default new CategoryValidation();
