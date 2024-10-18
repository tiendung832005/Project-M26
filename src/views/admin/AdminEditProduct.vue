<template>
  <div class="container1">
    <SideBar :open-sidebar-toggle="sidebarOpen" @open-sidebar="toggleSidebar" />
    <div class="add-product-page">
      <button class="back-button">
        <router-link class="back-button" to="/admin/products">Back</router-link>
      </button>
      <h1>Edit Product</h1>
      <form class="add-product-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            v-model="product.name"
            placeholder="Nhập tên sản phẩm"
          />
        </div>
        <div class="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            v-model="product.price"
            placeholder="Nhập giá"
          />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select name="category" v-model="product.category">
            <option value="">Chọn danh mục</option>
            <option value="Áo Tuyển Quốc Gia">Áo tuyển Quốc Gia</option>
            <option value="Áo CLB">Áo CLB</option>
            <option value="Áo Retro">Áo Retro</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select name="status" v-model="product.status">
            <option value="">Chọn trạng thái</option>
            <option value="available">Còn hàng</option>
            <option value="out_of_stock">Sắp hết hàng</option>
            <option value="preorder">Bán hết</option>
          </select>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea
            name="description"
            v-model="product.description"
            placeholder="Type here"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Image</label>
          <input type="file" @change="handleImageChange" />
          <div class="image-preview" v-if="product.images">
            <img :src="product.images" alt="Product" />
          </div>
          <input
            type="text"
            v-model="product.images"
            placeholder="Nhập link ảnh"
          />
        </div>
        <button type="submit" class="submit-button">Edit Product</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import SideBar from "@/components/SideBar.vue";

// Trạng thái và router
const sidebarOpen = ref(false);
const product = reactive({
  name: "",
  price: 0,
  status: "",
  description: "",
  category: "",
  images: "",
});
const router = useRouter();
const route = useRoute(); // Sử dụng useRoute để lấy 'id' từ URL

const id = route.params.id;

// Kiểm tra và lấy thông tin sản phẩm khi component được mount
onMounted(() => {
  if (!id) {
    console.error("Không tìm thấy ID sản phẩm trong URL.");
    return;
  }

  fetch(`http://localhost:8080/products/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi khi tìm nạp sản phẩm");
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        Object.assign(product, data); // Gán dữ liệu sản phẩm vào product
      }
    })
    .catch((error) => console.error("Lỗi khi tìm nạp sản phẩm:", error));
});

// Mở/đóng Sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Xử lý chọn ảnh
const handleImageChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    // Xử lý file ảnh nếu cần thiết
  }
};

// Hàm cập nhật URL ảnh
const handleImageUrl = (imageUrl) => {
  product.images = imageUrl;
};

// Hàm submit
const handleSubmit = () => {
  if (!id) {
    console.error("Không có ID sản phẩm để cập nhật");
    return;
  }

  fetch(`http://localhost:8080/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      if (response.ok) {
        router.push("/admin/products"); // Điều hướng về trang danh sách sản phẩm
      } else {
        console.error("Lỗi cập nhật sản phẩm");
      }
    })
    .catch((error) => console.error("Lỗi cập nhật sản phẩm:", error));
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
