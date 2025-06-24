import { Router, Request, Response } from 'express';
import CategoryController from './CategoryController';
import Validation from './CategoryValidation';

const router: Router = Router();

/**
 * @description Create a category
 * @route POST /api/v1/categories
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {Object} - JSON response
 */
router.post('/', [Validation.create], (req: Request, res: Response) => {
    CategoryController.create(req, res);
});


export default router;
