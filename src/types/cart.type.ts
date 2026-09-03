export type CartItemType = {
    id: number;
    slug: string;
    price: number;
    discount: number;
    image: string | null;
    size: number;
    quantity: number;
    stock: number;
    reserved: number;
    product: {
        id: number;
        name: string;
        slug: string;
        brand: string;
        concentration: string;
        isLimited: boolean;
    }
}