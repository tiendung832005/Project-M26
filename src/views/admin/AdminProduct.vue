<template>
  <div class="container1">
    <SideBar :open-sidebar-toggle="sidebarOpen" @open-sidebar="toggleSidebar" />
    <div class="product-table">
      <div class="header">
        <h1>Sản phẩm</h1>
        <button class="add-product">
          <router-link class="add-product" to="/admin/products/add">+ Thêm sản phẩm</router-link>
        </button>
      </div>

      <div class="product-table-select">
        <!-- Input tìm kiếm sản phẩm -->
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm theo tên..."
          v-model="searchTerm"
          class="p-2 border border-gray-300 rounded-md mr-auto"
        />
        
        <!-- Input lọc giá tối thiểu và tối đa -->
        <b>Lọc theo giá</b>
        <input
          type="number"
          v-model="minPrice"
          placeholder="Giá tối thiểu"
          class="p-2 border border-gray-300 rounded-md mx-2"
        />
        <input
          type="number"
          v-model="maxPrice"
          placeholder="Giá tối đa"
          class="p-2 border border-gray-300 rounded-md mx-2"
        />

        <b>Sắp xếp theo: </b>
        <select class="product-table-select-option" @change="handleSort" v-model="sortCriteria">
          <option value="category">Danh Mục</option>
          <option value="price">Giá</option>
        </select>
      </div>
<!-- Hiển thị sản phẩm -->
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Ngày</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!currentItems.length">
            <td colspan="7">Không có sản phẩm nào</td>
          </tr>
          <tr v-for="(product, index) in currentItems" :key="index">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.status ? 'Còn hàng' : 'Hết hàng' }}</td>
            <td>{{ product.category }}</td>
            <td>{{ formatVND(product.price) }}</td>
            <td>{{ product.date }}</td>
            <td>
              <button class="view-btn">Xem</button>
              <button class="edit-btn">
                <router-link :to="`/admin/products/edit/${product.id}`">Chỉnh sửa</router-link>
              </button>
              <button class="delete-btn" @click="handleDelete(product.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button v-for="page in Math.ceil(filteredProducts.length / itemsPerPage)" :key="page" @click="paginate(page)">
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideBar from "@/components/SideBar.vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const sidebarOpen = ref(false);
const currentPage = ref(1);
const sortCriteria = ref("id");
const sortDirection = ref("asc");
const searchTerm = ref("");
const itemsPerPage = 8;
const minPrice = ref(0);  // Giá tối thiểu
const maxPrice = ref(Infinity);  // Giá tối đa mặc định

// Hàm mở/đóng sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Lấy danh sách sản phẩm từ Vuex store
const products = computed(() => store.getters["product/allProducts"] || []);

onMounted(() => {
  store.dispatch("product/fetchProducts");
});

// Hàm xóa sản phẩm
const handleDelete = async (id) => {
  await store.dispatch("product/deleteProduct", id);
};

// Hàm phân trang và lọc sản phẩm
const filteredProducts = computed(() => {
  // Lọc theo tên sản phẩm và giá
  let filtered = products.value
    .filter((product) => product.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
    .filter((product) => product.price >= minPrice.value && product.price <= maxPrice.value);
  
  // Sắp xếp sản phẩm theo tiêu chí đã chọn
  if (sortCriteria.value === "category") {
    filtered.sort((a, b) => {
      if (sortDirection.value === "asc") {
        return a.category.localeCompare(b.category);
      } else {
        return b.category.localeCompare(a.category);
      }
    });
  } else if (sortCriteria.value === "price") {
    filtered.sort((a, b) => {
      if (sortDirection.value === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  return filtered;
});

const indexOfLastItem = computed(() => currentPage.value * itemsPerPage);
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage);
const currentItems = computed(() => {
  return filteredProducts.value.slice(indexOfFirstItem.value, indexOfLastItem.value);
});

// phân trang
const paginate = (pageNumber) => {
  currentPage.value = pageNumber;
};

// Hàm format giá
const formatVND = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

// Hàm sắp xếp
const handleSort = (event) => {
  sortCriteria.value = event.target.value;
  sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
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
  background-color: white;
  color: black;
}

.product-table {
  margin: 10px;
  width: 1300px;
  font-family: Arial, sans-serif;
}

.product-table .header {
  display: flex;
  width: 176vh;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: #ddd;
}

.product-table .header h1 {
  margin: 0;
}

.product-table .header .add-product {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.product-table table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.product-table th {
  background-color: #f2f2f2;
}

.product-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.product-table .view-btn,
.product-table .edit-btn,
.product-table .delete-btn {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.product-table .view-btn {
  background-color: #007bff;
  color: white;
}

.product-table .edit-btn {
  background-color: #ff9800;
  color: white;
}

.product-table .delete-btn {
  background-color: #f44336;
  color: white;
}

.product-table .pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-table .pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  cursor: pointer;
}

.product-table .pagination span {
  margin: 0 5px;
}

.app {
  display: flex;
}

.app .sidebar {
  min-height: 610px;
  background-color: #343a40;
  color: white;
  padding: 20px;
}

.app .sidebar h2 {
  margin-bottom: 20px;
}

.app .sidebar nav ul {
  list-style-type: none;
  padding: 0;
}

.app .sidebar nav ul li {
  margin: 10px 0;
}

.app .sidebar .footer {
  margin-top: auto;
}

.app .sidebar .footer p {
  margin: 5px 0;
}

.app main {
  flex-grow: 1;
  padding: 20px;
}

.product-table-select {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}

.product-table-select .product-table-select-option {
  width: 80px;
  height: 20px;
  border-radius: 4px;
  margin-left: 10px;
}
</style>