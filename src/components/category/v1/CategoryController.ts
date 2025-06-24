import { Request, Response } from 'express';
import { CategoryModel } from '../model';

class CategoryController {
    public async create(req: Request, res: Response) {
        try {
            const { category_name, category_description } = req.body;

            // Check if category already exists
            const isCategoryExist = await CategoryModel.findOne({
                category_name,
                is_deleted: false,
            });

            // If category already exists, return error
            if (isCategoryExist) {
                return res.status(400).json({
                    message: 'Category already exists',
                    status: 400,
                });
            }

            // Create category
            const category = await CategoryModel.create({
                category_name,
                category_description,
            });

            // Return success response
            return res.status(200).json({
                message: 'Category created successfully',
                status: 200,
                payload: category,
            });
        } catch (error) {
            // Return error response
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error',
                status: 500,
                payload: error,
            });
        }
    }
}

export default new CategoryController();
