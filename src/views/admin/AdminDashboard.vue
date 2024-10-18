<template>
    <div class="grid-container1">
      <aside :class="sidebarOpen ? 'sidebar-responsive' : ''" id="sidebar">
        <div class="sidebar-title">
          <div class="sidebar-brand">
            <i class="bi bi-cart"></i> Vua Áo Bóng Đá
          </div>
          <span class="icon close_icon" @click="toggleSidebar">X</span>
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
              <i class="bi bi-bell-fill"></i> Order
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
          <li class="sidebar-list-item" :style="{ marginTop: '220px' }">
            <a @click="handleLogout">
              <i class="bi bi-box-arrow-left"></i> Log out
            </a>
          </li>
        </ul>
      </aside>
  
      <header class="header">
        <div class="menu-icon">
          <i class="bi bi-justify" @click="toggleSidebar"></i>
        </div>
        <div class="header-left">
          <i class="bi bi-search"></i>
        </div>
        <div class="header-right">
          <i class="bi bi-bell-fill"></i>
          <i class="bi bi-envelope-fill"></i>
          <i class="bi bi-person-circle"></i>
          <p class="hello">Xin chào Admin!</p>
        </div>
      </header>
  
      <main class="main-container">
        <div class="main-title">
          <h3>DASHBOARD</h3>
        </div>
  
        <div class="main-cards">
          <div class="card">
            <div class="card-inner">
              <h3>PRODUCTS</h3>
              <i class="bi bi-archive-fill card_icon"></i>
            </div>
            <h1>300</h1>
          </div>
          <div class="card">
            <div class="card-inner">
              <h3>ORDER</h3>
              <i class="bi bi-bell-fill card_icon"></i>
            </div>
            <h1>12</h1>
          </div>
          <div class="card">
            <div class="card-inner">
              <h3>CUSTOMERS</h3>
              <i class="bi bi-person-fill card_icon"></i>
            </div>
            <h1>33</h1>
          </div>
          <div class="card">
            <div class="card-inner">
              <h3>CATEGORY</h3>
              <i class="bi bi-grid card_icon"></i>
            </div>
            <h1>42</h1>
          </div>
        </div>
  
        
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  
  
  
  // Sidebar state
  const sidebarOpen = ref(false);
  const router = useRouter();
  
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };
  
  const handleLogout = () => {
  // Xóa token cookie
  Cookies.remove('token');

  // Chuyển hướng về trang đăng nhập
  router.push('/admin/login');
};

  </script>
  
  <style scoped>
 body {
    margin: 0;
    padding: 0;
    background-color: #1d2634;
    color: #9e9ea4;
    font-family: 'Montserrat', sans-serif;
}

.icon {
    vertical-align: middle;
    font-size: 20px;
    margin-right: 5px;
}

.icon.icon_header {
    font-size: 26px;
}

.close_icon {
    color: red;
    margin-left: 30px;
    margin-top: 10px;
    cursor: pointer;
}

.grid-container1 {
    display: grid;
    grid-template-columns: 260px 1fr;
    grid-template-rows: 60px auto;
    grid-template-areas: 'sidebar header' 'sidebar main';
    height: 100vh;
}

/* Header */
.header {
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #263043;
    box-shadow: 0 6px 7px -3px rgba(0, 0, 0, 0.35);
}

.header .menu-icon {
    display: none;
}

.header .header-left, .header .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 20px;
}

.header .header-left .hello {
    font-size: 26px;
    margin-top: 20px;
    margin-left: 20px;
    color: #2962ff;
}

.header .header-right .icon {
    margin-left: 20px;
}

/* End Header */

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

.main-container {
    grid-area: main;
    overflow-y: auto;
    padding: 20px;
    color: rgba(255, 255, 255, 0.95);
    background-color: #1d2634;
}

.main-container .main-title {
    display: flex;
    justify-content: space-between;
}

.main-container .main-cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    margin: 15px 0;
}

.main-container .main-cards .card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 15px;
    border-radius: 8px;
    color: #ffffff;
    background-color: #333a48;
}

.main-container .main-cards .card:first-child {
    background-color: #2962ff;
}

.main-container .main-cards .card:nth-child(2) {
    background-color: #ff6d00;
}

.main-container .main-cards .card:nth-child(3) {
    background-color: #2e7d32;
}

.main-container .main-cards .card:nth-child(4) {
    background-color: #d50000;
}

.main-container .main-cards .card .card-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.main-container .main-cards .card .card-inner > .card_icon {
    font-size: 25px;
}



  
  </style>
  