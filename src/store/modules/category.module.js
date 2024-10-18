import { getAllCategoryAPI, addCategoryAPI, deleteCategoryAPI, updateCategoryAPI } from '../../services/category.service'; // Điều chỉnh đường dẫn cho phù hợp với dự án của bạn

const state = {
  classify: []
};

const mutations = {
  SET_CATEGORIES(state, categories) {
    state.classify = categories;
  },
  ADD_CATEGORY(state, category) {
    state.classify.push(category);
  },
  DELETE_CATEGORY(state, categoryId) {
    state.classify = state.classify.filter((category) => category.id !== categoryId);
  },
  UPDATE_CATEGORY(state, updatedCategory) {
    const index = state.classify.findIndex((category) => category.id === updatedCategory.id);
    if (index !== -1) {
      state.classify[index] = updatedCategory;
    }
  }
};

const actions = {
  async fetchCategories({ commit }) {
    try {
      const categories = await getAllCategoryAPI();
      commit('SET_CATEGORIES', categories);
    } catch (error) {
      console.error('Lỗi khi lấy tt danh mục:', error);
    }
  },

  async addCategory({ commit }, category) {
    try {
      const addedCategory = await addCategoryAPI(category);
      commit('ADD_CATEGORY', addedCategory);
    } catch (error) {
      console.error('Lỗi khi thêm danh mục:', error);
    }
  },

  async deleteCategory({ commit }, categoryId) {
    try {
      await deleteCategoryAPI(categoryId);
      commit('DELETE_CATEGORY', categoryId);
    } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error);
    }
  },

  async updateCategory({ commit }, category) {
    try {
      const updatedCategory = await updateCategoryAPI(category);
      commit('UPDATE_CATEGORY', updatedCategory);
    } catch (error) {
      console.error('Lỗi khi cập nhật danh mục:', error);
    }
  }
};

const getters = {
  allCategories(state) {
    return state.classify;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
