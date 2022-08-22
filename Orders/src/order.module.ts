import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27019/Orders', {
            
        }),
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }