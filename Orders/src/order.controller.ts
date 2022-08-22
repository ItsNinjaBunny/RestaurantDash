import { Controller, Get, Post, Patch, Body, Query, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }
    
    @Get('?')
    async getOrder(@Query('id') id: string) {
        if(id !== undefined) {
            const result = await this.orderService.findOne(id);
            if(result === null)
                return 'no item could be found';
            return result;
        }
        return await this.orderService.findAll();
    }    

    @Get('status?')
    async getByStatus(
        @Query('status') status: string) {
        if(status === undefined)
            return {
                status_code: 500,
                error: 'status is undefined'
            }
        return await this.orderService.findByStatus(status) as Order[];
    }

    @Patch('update?')
    async updateOrder(@Query('id') id: string) {
        const document = await this.getOrder(id) as Order;
        //@ts-ignore
        if(document === 'no item could be found')
            return {
                status_code: 500,
                error: 'no order could be found'
            };
        const status = document.order_status;
        switch(status) {
            case 'Pending':
                return await this.orderService.updateOrder(id, { order_status: 'In-Progress' });
            case 'In-Progress':
                return await this.orderService.updateOrder(id, { order_status: 'Completed' });
            case 'Completed':
                return;
            default:
                return { 
                    status: 500,
                    error: 'order doesn\'t exist'
                };
        }
    }

    @Post()
    async createOrder(@Body() body: Order) {
        body.date = new Date(body.date);
        body.order_status = 'Pending'
        return await this.orderService.create(body);
    }
}
