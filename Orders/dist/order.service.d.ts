import mongoose, { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<OrderDocument>);
    create(order: Order): Promise<Order & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findByStatus(status: string): Promise<(Order & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    updateOrder(id: string, update: {}): Promise<Order & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findAll(): Promise<(Order & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<Order & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
}
