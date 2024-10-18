<template>
  <div class="container1">
    <SideBar
      :open-sidebar-toggle="sidebarOpen"
      @open-sidebar="toggleSidebar"
    ></SideBar>
    <div class="customer-list">
      <button class="toggle-btn" @click="toggleAddCustomerSection">
        Ẩn/Hiện
      </button>
      <input
        type="text"
        placeholder="Tìm kiếm khách hàng theo tên..."
        v-model="searchTerm"
        class="mb-4 p-2 border border-gray-300 rounded-md ml-96"
      />
      <button
        @click="toggleSortOrder"
        class="mb-4 p-2 bg-gray-200 border border-gray-300 rounded-md ml-80"
      >
        Sắp xếp theo tên: {{ sortOrder === "asc" ? "Tăng dần" : "Giảm dần" }}
      </button>

      <div
        v-if="showAddCustomerSection"
        class="add-customer"
        id="addCustomerSection"
      >
        <h2>Thêm Khách hàng mới</h2>
        <input type="text" id="name" placeholder="Tên" v-model="name" />
        <input type="email" id="email" placeholder="Email" v-model="email" />
        <input
          type="text"
          id="address"
          placeholder="Địa chỉ"
          v-model="address"
        />
        <button @click="handleAddCustomer">Thêm</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="customerTable">
          <tr v-for="(customer, index) in currentItems" :key="customer.id">
            <td>{{ indexOfFirstItem + index + 1 }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ customer.banned ? "Đã khóa" : "Hoạt động" }}</td>
            <td>
              <button @click="toggleBan(customer)">
                {{ customer.banned ? "Unban" : "Ban" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button
          v-for="page in Math.ceil(filteredCustomers.length / itemsPerPage)"
          :key="page"
          @click="paginate(page)"
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

const store = useStore();

// State variables
const sidebarOpen = ref(false);
const name = ref('');
const email = ref('');
const address = ref('');
const showAddCustomerSection = ref(false);
const currentPage = ref(1);
const searchTerm = ref('');
const sortOrder = ref('asc');
const itemsPerPage = 8;

// Fetch
const customers = computed(() => store.getters.allCustomers);
const loading = computed(() => store.getters.isLoading);

// Sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Hàm mở/đóng form
const toggleAddCustomerSection = () => {
  showAddCustomerSection.value = !showAddCustomerSection.value;
};
// thêm khách hàng
const handleAddCustomer = () => {
  if (!name.value || !email.value || !address.value) {
    alert('Vui lòng điền đầy đủ thông tin của khách hàng.');
    return;
  }

  const newCustomer = {
    name: name.value,
    email: email.value,
    address: address.value,
    banned: false
  };

  store.dispatch('addCustomer', newCustomer);
  name.value = '';
  email.value = '';
  address.value = '';
};

// Ban/unban khách hàng
const toggleBan = (customer) => {
  const updatedCustomer = { ...customer, banned: !customer.banned };
  store.dispatch('updateCustomer', updatedCustomer);
};

// tìm kiếm theo tên
const filteredCustomers = computed(() =>
  customers.value
    .filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder.value === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
);

const indexOfLastItem = computed(() => currentPage.value * itemsPerPage);
const indexOfFirstItem = computed(() => indexOfLastItem.value - itemsPerPage);
const currentItems = computed(() =>
  filteredCustomers.value.slice(indexOfFirstItem.value, indexOfLastItem.value)
);

// Pagination
const paginate = (pageNumber) => {
  currentPage.value = pageNumber;
};

// sắp xếp
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

// Fetch khách hàng khi mounted
onMounted(() => {
  store.dispatch('fetchCustomers');
});
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

.toggle-btn {
  width: 100px;
  height: 30px;
  margin-bottom: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.customer-list {
  margin: 10px;
  font-family: Arial, sans-serif;
}

.customer-list .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.customer-list .header h1 {
  margin: 0;
}

.customer-list .header .add-customer-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.customer-list .add-customer {
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.customer-list .add-customer h2 {
  margin-top: 0;
}

.customer-list .add-customer input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.customer-list .add-customer button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.customer-list table {
  width: 100%;
  border-collapse: collapse;
}

.customer-list table th,
.customer-list table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.customer-list table th {
  background-color: #f2f2f2;
}

.customer-list table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.customer-list table button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.customer-list table button.ban-btn {
  background-color: #f44336;
  color: white;
}

.customer-list table button.unban-btn {
  background-color: #4caf50;
  color: white;
}

.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  cursor: pointer;
}

.pagination span {
  margin: 0 5px;
}

.sidebar {
  background-color: #343a40;
  color: white;
  padding: 20px;
}

.sidebar h2 {
  margin-bottom: 20px;
}

.sidebar nav ul {
  list-style-type: none;
  padding: 0;
}

.sidebar nav ul li {
  margin: 10px 0;
}

.sidebar .footer {
  margin-top: auto;
}

.sidebar .footer p {
  margin: 5px 0;
}

main {
  flex-grow: 1;
  padding: 20px;
}
</style>
