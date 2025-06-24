export interface ValidationErrors {
    product_id?: string;
    category?: string;
    category_id?: string;
    product_name?: string;
    product_description?: string;
    product_price?: string;
    product_quantity?: string;
    product_image?: string;
}

export interface ValidationResponse {
    message: string;
    status: number;
    payload: {
        error: string;
    };
}
