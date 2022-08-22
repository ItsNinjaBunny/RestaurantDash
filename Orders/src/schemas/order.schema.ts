import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Item } from './Item.schema';


export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop()
    order_status: string;

    @Prop()
    date: Date;

    @Prop()
    restaurant_name: string;

    @Prop()
    items: Item[];

    @Prop()
    total: number;

    @Prop()
    user_id: string;

    @Prop()
    restaurant_id: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);