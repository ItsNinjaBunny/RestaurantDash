import { Double } from 'typeorm';
export declare class Order {
    id: number;
    order_status: string;
    date: Date;
    restaurant_name: string;
    items: {};
    user_id: string;
    restaurant_id: string;
}
export declare class Item {
    id: number;
    name: string;
    price: Double;
}
export declare class User {
    id: number;
    customer_id: string;
}
