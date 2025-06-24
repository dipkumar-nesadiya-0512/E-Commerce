import { Schema } from 'mongoose';

const ProductMaster = new Schema(
    {
        product_name: {
            type: String,
            required: true,
            trim: true,
        },
        product_description: {
            type: String,
            trim: true,
        },
        product_price: {
            type: String,
            required: true,
            trim: true,
        },
        product_quantity: {
            type: Number,
            required: true,
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: 'category_master',
            trim: true,
            default: null,
        },
        product_image: {
            type: String,
            trim: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: null,
        },
        is_deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        strict: true,
    },
);
export default ProductMaster;
