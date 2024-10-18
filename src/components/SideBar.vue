<template>
  <aside :class="openSidebarToggle ? 'sidebar-responsive' : ''" id="sidebar">
    <div class="sidebar-title">
      <div class="sidebar-brand">
        <i class="bi bi-cart"></i> Vua Áo Bóng Đá
      </div>
      <span class="icon close_icon" @click="OpenSidebar">X</span>
    </div>
    <ul class="sidebar-list">
      <li class="sidebar-list-item">
        <router-link to="/admin/dashboard">
          <i class="bi bi-grid-1x2-fill"></i> Dashboard
        </router-link>
      </li>
      <li class="sidebar-list-item">
        <router-link to="/admin/products">
          <i class="bi bi-archive-fill"></i> Products
        </router-link>
      </li>
      <li class="sidebar-list-item">
        <router-link to="/admin/order">
          <i class="bi bi-grid-3x3-gap-fill"></i> Order
        </router-link>
      </li>
      <li class="sidebar-list-item">
        <router-link to="/admin/customer">
          <i class="bi bi-person-fill"></i> Customers
        </router-link>
      </li>
      <li class="sidebar-list-item">
        <router-link to="/admin/category">
          <i class="bi bi-grid"></i> Category
        </router-link>
      </li>
      <li class="sidebar-list-item" :style="{ marginTop: '220px'}">
        <span @click="handleLogout" class="cursor-pointer">
          <i class="bi bi-box-arrow-left"></i> Log out
        </span>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const props = defineProps({
  openSidebarToggle: Boolean,
  OpenSidebar: Function
});

const router = useRouter();

const handleLogout = () => {
  // Xóa token cookie
  Cookies.remove('token');

  // Chuyển hướng về trang đăng nhập
  router.push('/admin');
};
</script>


<style scoped>
/* Sidebar */
#sidebar {
    grid-area: sidebar;
    height: 100%;
    background-color: #263043;
    overflow-y: auto;
    transition: all 0.5s;
}

#sidebar .sidebar-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #404b61;
}

#sidebar .sidebar-title > span {
    display: none;
}

#sidebar .sidebar-brand {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
}

#sidebar .sidebar-list {
    padding: 0;
    list-style-type: none;
}

#sidebar .sidebar-list .sidebar-list-item {
    padding: 15px 20px;
    font-size: 16px;
    margin-top: 20px;
    color: #ffffff;
}

#sidebar .sidebar-list .sidebar-list-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
}

#sidebar .sidebar-list .sidebar-list-item > a {
    text-decoration: none;
    color: #9e9ea4;
    display: flex;
    align-items: center;
    
}

#sidebar.sidebar-responsive {
    position: absolute;
    z-index: 12;
}

/* End Sidebar */
</style>



