import { Router, Request, Response } from 'express';
import ProductController from './ProductController';
import Validation from './ProductValidations';

const router: Router = Router();

/**
 * @description get all products
 * @route GET /api/v1/products
 * @route GET /api/v1/products?category=Apparel
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {Object} - JSON response
 */
router.get('/', [Validation.getByCategory], (req: Request, res: Response) => {
    ProductController.getAll(req, res);
});

/**
 * @description get a product by id
 * @route GET /api/v1/products/:id
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {Object} - JSON response
 */
router.get(
    '/:product_id',
    [Validation.getOne],
    (req: Request, res: Response) => {
        ProductController.getOne(req, res);
    },
);

/**
 * @description Create a product
 * @route POST /api/v1/products
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {Object} - JSON response
 */
router.post('/', [Validation.create], (req: Request, res: Response) => {
    ProductController.create(req, res);
});

export default router;
