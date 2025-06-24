import { model } from 'mongoose';
import { ProductMaster } from '../schema';

const ProductModel = model('product_master', ProductMaster);

export default ProductModel;
