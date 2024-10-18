import { createStore } from 'vuex';
import userModule from './modules/user.module';
import orderModule from './modules/order.module';
import productModule from './modules/product.module';
import categoryModule from './modules/category.module';

// Tạo store Vuex với các modules
const store = createStore({
  modules: {
    user: userModule,
    order: orderModule,
    product: productModule,
    category: categoryModule
  }
});

// Xuất store để sử dụng trong toàn ứng dụng
export default store;
