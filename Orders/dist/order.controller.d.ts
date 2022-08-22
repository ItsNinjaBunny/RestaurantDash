import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrder(id: string): Promise<(Order & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | "no item could be found" | (Order & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getByStatus(status: string): Promise<Order[] | {
        status_code: number;
        error: string;
    }>;
    updateOrder(id: string): Promise<(Order & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        status_code: number;
        error: string;
        status?: undefined;
    } | {
        status: number;
        error: string;
        status_code?: undefined;
    }>;
    createOrder(body: Order): Promise<Order & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
