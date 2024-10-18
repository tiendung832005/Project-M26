import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

// Hàm lấy thông tin tất cả người dùng
export const getAllUserAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Hàm xóa người dùng theo ID
export const deleteUserAPI = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // Trả về ID của người dùng đã xóa để cập nhật UI
};

// Hàm thêm người dùng mới
export const addUserAPI = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Hàm cập nhật người dùng
export const updateUserAPI = async (item) => {
  const response = await axios.put(`${API_URL}/${item.id}`, item);
  return response.data;
};

// Hàm cập nhật giỏ hàng người dùng
export const updateUserCartAPI = async (item) => {
  const response = await axios.patch(`${API_URL}/${item.id}`, { cart: item.cart });
  return response.data;
};
