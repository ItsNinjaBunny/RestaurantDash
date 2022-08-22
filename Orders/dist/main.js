"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const order_module_1 = require("./order.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(order_module_1.OrderModule);
    app.enableCors();
    await app.listen(4500);
}
bootstrap();
//# sourceMappingURL=main.js.map