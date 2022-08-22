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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
let OrderService = class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async create(order) {
        console.log('creating order');
        const newOrder = new this.orderModel(order);
        return newOrder.save();
    }
    async findByStatus(status) {
        console.log('finding by status');
        return await this.orderModel.find({ order_status: { $regex: status, $options: '$i' } });
    }
    async updateOrder(id, update) {
        console.log('updating and finding order');
        return await this.orderModel.findOneAndUpdate({ _id: new mongoose_2.default.Types.ObjectId(id) }, update);
    }
    async findAll() {
        console.log('finding all orders');
        return await this.orderModel.find().select({ __v: 0 });
    }
    async findOne(id) {
        console.log('finding a document by id');
        return this.orderModel.findById(new mongoose_2.default.Types.ObjectId(id)).select({ __v: 0 });
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map