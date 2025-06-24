import { Schema } from 'mongoose';

const CategoryMaster = new Schema(
    {
        category_name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        category_description: {
            type: String,
            trim: true,
        },
        product_ids: {
            type: [Schema.Types.ObjectId],
            ref: 'product_master',
            default: [],
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

export default CategoryMaster;
