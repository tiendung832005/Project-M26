import { getAllOrderAPI, addOrderAPI, updateOrderAPI } from '../../services/order.service'; // Điều chỉnh đường dẫn phù hợp với dự án của bạn

const state = {
  orders: [],
  loading: false,
  error: null
};

const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },
  ADD_ORDER(state, order) {
    state.orders.push(order);
  },
  UPDATE_ORDER(state, updatedOrder) {
    const index = state.orders.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
      state.orders[index] = updatedOrder;
    }
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const actions = {
  async fetchOrders({ commit }) {
    try {
      commit('SET_LOADING', true);
      const orders = await getAllOrderAPI();
      commit('SET_ORDERS', orders);
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR', error.message);
      console.error("Lỗi khi lấy tt đơn hàng:", error.message);
    }
  },

  async addOrder({ commit }, order) {
    try {
      commit('SET_LOADING', true);
      const addedOrder = await addOrderAPI(order);
      commit('ADD_ORDER', addedOrder);
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR', error.message);
      console.error("Lỗi khi thêm đơn hàng:", error.message);
    }
  },

  async updateOrder({ commit }, order) {
    try {
      commit('SET_LOADING', true);
      const updatedOrder = await updateOrderAPI(order);
      commit('UPDATE_ORDER', updatedOrder);
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR', error.message);
      console.error("Lỗi khi cập nhật đơn hàng:", error.message);
    }
  }
};

const getters = {
  allOrders(state) {
    return state.orders;
  },
  isLoading(state) {
    return state.loading;
  },
  hasError(state) {
    return state.error;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
