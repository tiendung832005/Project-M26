<template>
  <div class="flex w-screen h-screen bg-white text-black">
    <div class="w-80">
      <SideBar :open-sidebar-toggle="sidebarOpen" @open-sidebar="toggleSidebar" />
    </div>
    <div class="w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-semibold">Danh mục</h1>
        <button class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
          <router-link to="/admin/category/add" class="text-white">+ Thêm danh mục</router-link>
        </button>
      </div>

      <div class="flex items-center mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm danh mục theo tên..."
          v-model="searchTerm"
          class="p-2 border border-gray-300 rounded-md mr-4 w-1/2"
        />
      </div>

      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-2 px-4 border-b text-left">ID</th>
            <th class="py-2 px-4 border-b text-left">Tên danh mục</th>
            <th class="py-2 px-4 border-b text-left">Trạng thái</th>
            <th class="py-2 px-4 border-b text-left">Mô tả</th>
            <th class="py-2 px-4 border-b text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in currentItems" :key="index" class="border-t hover:bg-gray-100">
            <td class="py-2 px-4">{{ category.id }}</td>
            <td class="py-2 px-4">{{ category.name }}</td>
            <td class="py-2 px-4">{{ category.status ? 'Hoạt động' : 'Ngừng hoạt động' }}</td>
            <td class="py-2 px-4">{{ category.description }}</td>
            <td class="py-2 px-4 space-x-2">
              <button class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600" @click="handleDelete(category.id)">
                Xóa
              </button>
            </td>
          </tr>
          <tr v-if="!currentItems.length">
            <td colspan="5" class="py-4 text-center">Không có danh mục nào</td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-center space-x-2 mt-4">
        <button
          v-for="page in Math.ceil(filteredCategories.length / itemsPerPage)"
          :key="page"
          @click="paginate(page)"
          :class="`py-1 px-3 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-600`"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import SideBar from '@/components/SideBar.vue';

const sidebarOpen = ref(false);
const currentPage = ref(1);
const searchTerm = ref('');
const itemsPerPage = 8;
const store = useStore();

// Hàm mở/đóng sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Fetch danh mục từ store khi component mounted
onMounted(() => {
  store.dispatch('category/fetchCategories');
});

// Hàm xóa danh mục
const handleDelete = (id) => {
  store.dispatch('category/deleteCategory', id);
};

// Lọc danh mục để tìm kiếm
const filteredCategories = computed(() => {
  return store.getters['category/allCategories'].filter((category) =>
    category.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// Phân trang
const indexOfLastItem = computed(() => currentPage.value * itemsPerPage);
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage);
const currentItems = computed(() => {
  return filteredCategories.value.slice(indexOfFirstItem.value, indexOfLastItem.value);
});

const paginate = (pageNumber) => {
  currentPage.value = pageNumber;
};
</script>

<style scoped>

</style>
