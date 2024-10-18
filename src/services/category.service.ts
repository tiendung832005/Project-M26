import axios from 'axios';

// URL API gốc
const API_URL = 'http://localhost:8080/classify';

// Hàm lấy tất cả thông tin Category
export const getAllCategoryAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Hàm xóa Category theo ID
export const deleteCategoryAPI = async (id:any) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // Trả về ID của category đã xóa để có thể dùng trong store hoặc cập nhật UI
};

// Hàm thêm Category mới
export const addCategoryAPI = async (category:any) => {
  const response = await axios.post(API_URL, category);
  return response.data;
};

// Hàm cập nhật Category
export const updateCategoryAPI = async (item:any) => {
  const response = await axios.put(`${API_URL}/${item.id}`, item);
  return response.data;
};
