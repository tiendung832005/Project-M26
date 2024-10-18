import axios from 'axios';

const API_URL = 'http://localhost:8080/products';

// Hàm lấy thông tin tất cả products
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Hàm xóa product theo ID
export const deleteProductAPI = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // Trả về ID của sản phẩm đã xóa để có thể dùng trong store hoặc cập nhật UI
};

// Hàm thêm product mới
export const addProductAPI = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

// Hàm cập nhật product
export const updateProductAPI = async (product) => {
  const response = await axios.put(`${API_URL}/${product.id}`, product);
  return response.data;
};
