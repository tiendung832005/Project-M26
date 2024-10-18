<template>
    <div class="bg-[#1d2634] h-screen overflow-hidden">
      <h1 class="flex justify-center text-[#2b6cb0]">Xin chào Admin</h1>
      <div class="min-h-screen flex items-center justify-center bg-[#1d2634] overflow-hidden">
        <div class="bg-white shadow rounded-lg flex flex-wrap">
          <div class="hidden md:block w-1/2">
            <img
              src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474063BWt/anh-binh-minh-dep-me-hon-tren-dinh-ta-chi-nhu-yen-bai_093052267.jpg"
              alt="Scenic Canyon"
              class="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div class="p-8 w-full md:w-1/2">
            <h2 class="text-xl font-bold mb-6">Login</h2>
            <form @submit.prevent="handleLogin">
              <div class="mb-4">
                <label class="block text-gray-600">Username</label>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="username"
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-600">Password</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="password"
                />
              </div>
              <p v-if="error" class="text-red-500">{{ error }}</p>
              <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Cookies from 'js-cookie';
  
  const username = ref('admin1');
  const password = ref('admin123');
  const error = ref('');
  const router = useRouter();
  
  const handleLogin = () => {
    if (username.value === 'admin1' && password.value === 'admin123') {
      // Lưu token vào cookie
      Cookies.set('token', 'your-generated-token', { expires: 1 });
  
      // Chuyển hướng tới trang dashboard
      router.push('/admin/dashboard');
    } else {
      error.value = 'Sai tên đăng nhập hoặc mật khẩu';
    }
  
    console.log(`Username: ${username.value}, Password: ${password.value}`);
  };
  </script>
  