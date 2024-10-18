<template>
  <div class="container1">
    <Sidebar :open-sidebar-toggle="sidebarOpen" @open-sidebar="toggleSidebar" />
    <div class="add-product-page">
      <button class="back-button">
        <router-link to="/admin/category">Back</router-link>
      </button>
      <h1>Add Category</h1>
      <form class="add-product-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Category Name</label>
          <input
            type="text"
            name="name"
            v-model="category.name"
            placeholder="Nhập tên danh mục"
          />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            name="description"
            v-model="category.description"
            placeholder="Nhập mô tả danh mục"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select
            name="status"
            v-model="category.status"
            class="w-full p-2 border border-gray-300 rounded-md"
          >
            <option :value="true">Hoạt động</option>
            <option :value="false">Ngừng hoạt động</option>
          </select>
        </div>
        <button type="submit" class="submit-button">
          Add Category
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Sidebar from '@/components/SideBar.vue';

const sidebarOpen = ref(false);
const category = ref({
  id: 0,
  name: '',
  description: '',
  status: true
});

const router = useRouter();
const store = useStore();

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Tạo ID tự động
const fetchMaxId = async () => {
  try {
    const response = await fetch('http://localhost:8080/classify?_sort=id&_order=desc&_limit=1');
    if (response.ok) {
      const data = await response.json();
      const maxId = data.length > 0 ? data[0].id : 0;
      category.value.id = maxId + 1; // Tăng ID lên 1
    } else {
      console.error('Failed to fetch the maximum ID.');
    }
  } catch (error) {
    console.error('Error fetching the maximum ID:', error);
  }
};

// Fetch ID khi component mounted
onMounted(() => {
  fetchMaxId();
});

const handleSubmit = async () => {
  // Kiểm tra xem danh mục với tên này đã tồn tại hay chưa
  try {
    const existingCategoryResponse = await fetch(`http://localhost:8080/classify?name=${category.value.name}`);
    const existingCategoryData = await existingCategoryResponse.json();

    if (existingCategoryData.length > 0) {
      alert('Danh mục đã tồn tại!');
      return;
    }

    // Nếu không có danh mục trùng tên, thêm vào Vuex Store
    await store.dispatch('category/addCategory', category.value);

    router.push('/admin/category'); // Điều hướng sau khi thêm danh mục thành công
  } catch (error) {
    console.error('Có lỗi xảy ra khi kiểm tra danh mục:', error);
  }
};
</script>

  
<style scoped>
    .container1 {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 0.2fr 3fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  height: 100vh;
  color: black;
}

.add-product-page {
  margin: 10px;
  width: 1100px;
  padding: 50px;
  margin: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-product-page .back-button {
  background: none;
  text-decoration: none;
  border: none;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.add-product-page h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.add-product-page .add-product-form {
  display: flex;
  flex-direction: column;
}

.add-product-page .add-product-form .form-group {
  margin-bottom: 20px;
}

.add-product-page .add-product-form .form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.add-product-page .add-product-form input[type="text"],
.add-product-page .add-product-form input[type="file"],
.add-product-page .add-product-form select,
.add-product-page .add-product-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-product-page .add-product-form textarea {
  resize: vertical;
}

.add-product-page .add-product-form .image-preview {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.add-product-page .add-product-form .image-preview .image-placeholder {
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-product-page .add-product-form .submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
  </style>
  