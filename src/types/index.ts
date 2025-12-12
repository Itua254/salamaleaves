export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    stock: number;
    tagline?: string;
    sku?: string;
    ingredients?: string;
    brewing_instructions?: string;
    benefits?: string;
    warning?: string;
}

export interface CartItem extends Product {
    quantity: number;
}
