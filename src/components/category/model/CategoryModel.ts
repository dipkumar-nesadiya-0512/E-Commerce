import { model } from 'mongoose';
import { CategoryMaster } from '../schema';

const CategoryModel = model('category_master', CategoryMaster);

export default CategoryModel;
