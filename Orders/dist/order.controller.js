"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_schema_1 = require("./schemas/order.schema");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getOrder(id) {
        if (id !== undefined) {
            const result = await this.orderService.findOne(id);
            if (result === null)
                return 'no item could be found';
            return result;
        }
        return await this.orderService.findAll();
    }
    async getByStatus(status) {
        if (status === undefined)
            return {
                status_code: 500,
                error: 'status is undefined'
            };
        return await this.orderService.findByStatus(status);
    }
    async updateOrder(id) {
        const document = await this.getOrder(id);
        if (document === 'no item could be found')
            return {
                status_code: 500,
                error: 'no order could be found'
            };
        const status = document.order_status;
        switch (status) {
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
    async createOrder(body) {
        body.date = new Date(body.date);
        body.order_status = 'Pending';
        return await this.orderService.create(body);
    }
};
__decorate([
    (0, common_1.Get)('?'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrder", null);
__decorate([
    (0, common_1.Get)('status?'),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getByStatus", null);
__decorate([
    (0, common_1.Patch)('update?'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_schema_1.Order]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
OrderController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map