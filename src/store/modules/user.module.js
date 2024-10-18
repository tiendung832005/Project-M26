import { getAllUserAPI, addUserAPI, updateUserAPI } from '../../services/user.service';

const state = {
  customers: [],
  loading: false,
  error: null
};

const mutations = {
  SET_CUSTOMERS(state, customers) {
    state.customers = customers;
  },
  ADD_CUSTOMER(state, customer) {
    state.customers.push(customer);
  },
  UPDATE_CUSTOMER(state, updatedCustomer) {
    const index = state.customers.findIndex((customer) => customer.id === updatedCustomer.id);
    if (index !== -1) {
      state.customers[index] = updatedCustomer;
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
  async fetchCustomers({ commit }) {
    commit('SET_LOADING', true);
    try {
      const customers = await getAllUserAPI();
      commit('SET_CUSTOMERS', customers);
      commit('SET_LOADING', false);
    } catch (error) {
      commit('SET_ERROR', error.message);
      commit('SET_LOADING', false);
    }
  },

  async addCustomer({ commit }, newCustomer) {
    try {
      const addedCustomer = await addUserAPI(newCustomer);
      commit('ADD_CUSTOMER', addedCustomer);
    } catch (error) {
      console.error('Lỗi khi thêm khách hàng:', error);
    }
  },

  async updateCustomer({ commit }, updatedCustomer) {
    try {
      const customer = await updateUserAPI(updatedCustomer);
      commit('UPDATE_CUSTOMER', customer);
    } catch (error) {
      console.error('Lỗi khi cập nhật khách hàng:', error);
    }
  }
};

const getters = {
  allCustomers(state) {
    return state.customers;
  },
  isLoading(state) {
    return state.loading;
  },
  hasError(state) {
    return state.error;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
