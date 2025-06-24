import { Application } from 'express';
import { ProductRoutes } from '../components/Products/v1';
import { CategoryRoutes } from '../components/category/v1';

export default (app: Application) => {
    app.use('/api/v1/products', ProductRoutes);
    app.use('/api/v1/categories', CategoryRoutes);
};
