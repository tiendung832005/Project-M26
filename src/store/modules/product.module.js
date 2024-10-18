import { getProducts, addProductAPI, deleteProductAPI, updateProductAPI } from '../../services/products.service'; // Điều chỉnh đường dẫn phù hợp với dự án của bạn

const state = {
  products: []
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  ADD_PRODUCT(state, product) {
    state.products.push(product);
  },
  DELETE_PRODUCT(state, productId) {
    state.products = state.products.filter((product) => product.id !== productId);
  },
  UPDATE_PRODUCT(state, updatedProduct) {
    const index = state.products.findIndex((product) => product.id === updatedProduct.id);
    if (index !== -1) {
      state.products[index] = updatedProduct;
    }
  }
};

const actions = {
  async fetchProducts({ commit }) {
    try {
      const products = await getProducts();
      commit('SET_PRODUCTS', products);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  },

  async addProduct({ commit }, product) {
    try {
      const addedProduct = await addProductAPI(product);
      commit('ADD_PRODUCT', addedProduct);
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
    }
  },

  async deleteProduct({ commit }, productId) {
    try {
      await deleteProductAPI(productId);
      commit('DELETE_PRODUCT', productId);
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  },

  async updateProduct({ commit }, product) {
    try {
      const updatedProduct = await updateProductAPI(product);
      commit('UPDATE_PRODUCT', updatedProduct);
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
    }
  }
};

const getters = {
  allProducts(state) {
    return state.products;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
