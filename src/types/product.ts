export interface Product {
    id: string;
    title: string;
    description: string;
    variants: { size: string; price: number }[];
    image: string;
}