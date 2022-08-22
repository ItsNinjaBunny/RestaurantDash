import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }

    async create(order: Order) {
        console.log('creating order');
        const newOrder = new this.orderModel(order);
        return newOrder.save();
    }

    async findByStatus(status: string) {
        console.log('finding by status');
        return await this.orderModel.find({ order_status: { $regex: status, $options: '$i' }});
    }

    async updateOrder(id: string, update: {}) {
        console.log('updating and finding order');
        return await this.orderModel.findOneAndUpdate(
            { _id : new mongoose.Types.ObjectId(id)}, update
        )
    }

    async findAll() {
        console.log('finding all orders');
        return await this.orderModel.find().select({ __v: 0 });
    }

    async findOne(id: string) {
        console.log('finding a document by id');
        return this.orderModel.findById(new mongoose.Types.ObjectId(id)).select({ __v: 0 });
        
    }
}
