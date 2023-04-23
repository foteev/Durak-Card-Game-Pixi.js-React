import Order from '../schemas/order.js';

class OrderService {
    async create(order: any) {
        const newOrder = await Order.create(order);
        return newOrder;
    };

    async get(id: string) {
        const order = await Order.findById(id);
        return order;
    };

    async update(id: string, order: any) {
        const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
        return updatedOrder;
    };

    async delete(id: string) {
        const deletedOrder = await Order.findByIdAndDelete(id);
        return deletedOrder;
    };

    async sortByStatus(orderStatus: string) {
        const orders = await Order.find({'status': `${orderStatus}`});
        return orders;
    };

    async sortByUser(userEmail: string) {
        const orders = await Order.find({'cart.user.email': `${userEmail}`});
        return orders;
    };
}

export default new OrderService();