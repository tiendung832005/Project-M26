<template>
  <div class="container1">
    <SideBar :open-sidebar-toggle="sidebarOpen" @open-sidebar="toggleSidebar" />
    <div class="add-product-page">
      <button class="back-button">
        <router-link to="/admin/products">Back</router-link>
      </button>
      <h1>Add Product</h1>
      <form class="add-product-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            v-model="product.name"
            placeholder="Nhập tên sản phẩm"
            class="input"
          />
        </div>
        <div class="form-group">
          <label>Price</label>
          <input
            type="text"
            name="price"
            v-model="product.price"
            placeholder="Nhập giá"
            class="input"
          />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select name="category" v-model="product.category" class="input">
            <option value="">Chọn danh mục</option>
            <option v-for="category in categories" :key="category.id" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select name="status" v-model="product.status" class="input">
            <option value="">Chọn trạng thái</option>
            <option value="Còn hàng">Còn hàng</option>
            <option value="Sắp hết hàng">Sắp hết hàng</option>
            <option value="Bán hết">Bán hết</option>
          </select>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            name="description"
            v-model="product.description"
            placeholder="Type here"
            class="input"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Image</label>
          <input type="file" @change="handleImageChange" class="input" />
          <div class="image-preview" v-if="imageUrl">
            <img :src="imageUrl" alt="Product" class="image-preview" />
          </div>
          <input
            type="text"
            v-model="product.images"
            placeholder="Nhập link ảnh"
            class="input"
          />
        </div>
        <button type="submit" class="submit-button">Add Product</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';  // Import Vuex store
import SideBar from '@/components/SideBar.vue';
import { storage } from '@/firebase';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';

const sidebarOpen = ref(false);
const product = reactive({
  id: 0,
  name: '',
  price: 0,
  status: '',
  category: '',
  description: '',
  images: '',
});
const categories = ref([]);
const imageUrl = ref('');
const file = ref(null);
const router = useRouter();
const store = useStore();  // Sử dụng Vuex store

// Lấy ID sản phẩm có giá trị lớn nhất từ API và đặt ID tiếp theo
onMounted(() => {
  const fetchMaxId = async () => {
    try {
      const response = await fetch('http://localhost:8080/products?_sort=id&_order=desc&_limit=1');
      if (response.ok) {
        const data = await response.json();
        const maxId = data.length > 0 ? data[0].id : 0;
        product.id = maxId + 1;
      } else {
        console.error('Failed to fetch the maximum ID.');
      }
    } catch (error) {
      console.error('Error fetching the maximum ID:', error);
    }
  };

  fetchMaxId();
});

// Lấy danh sách các danh mục từ API
onMounted(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/classify');
      if (response.ok) {
        categories.value = await response.json();
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchCategories();
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Lấy giá trị trong ô input type file và preview hình ảnh
const handleImageChange = (e) => {
  imageUrl.value = URL.createObjectURL(e.target.files[0]);
  file.value = e.target.files[0];
};

// Upload hình ảnh lên Firebase Storage
const uploadImageToFirebase = async () => {
  if (!file.value) {
    alert('Chưa có file được chọn');
    return null;
  }
  try {
    const storageReference = storageRef(storage, `images/${file.value.name}`);
    await uploadBytes(storageReference, file.value);
    return await getDownloadURL(storageReference); // Trả về URL của ảnh sau khi upload thành công
  } catch (error) {
    console.log('Lỗi khi upload hình ảnh:', error);
    return null;
  }
};

// Gửi yêu cầu thêm sản phẩm tới API thông qua Vuex
const handleSubmit = async () => {
  try {
    const uploadedImageUrl = await uploadImageToFirebase();
    if (!uploadedImageUrl) {
      return;
    }
    product.images = uploadedImageUrl;

    // Dispatch action thêm sản phẩm vào Vuex
    await store.dispatch('product/addProduct', {
      ...product,
      price: parseFloat(product.price.toString()),
      date: new Date().toLocaleDateString(),
    });
    
    router.push('/admin/products'); // Điều hướng sau khi thêm sản phẩm thành công
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
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