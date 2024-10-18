import axios from 'axios';

const API_URL = 'http://localhost:8080/orders';

// Hàm lấy thông tin tất cả orders
export const getAllOrderAPI = async () => {
  const response = await axios.get(API_URL);
  console.log('Orders fetched from API:', response.data); // Log phản hồi từ API để kiểm tra
  return response.data;
};

// Hàm thêm order mới
export const addOrderAPI = async (item:any) => {
  console.log('Order data to send to API:', item); // Log dữ liệu trước khi gửi API
  const response = await axios.post(API_URL, item);
  console.log('API response:', response.data); // Log phản hồi từ API
  return response.data;
};

// Hàm cập nhật order
export const updateOrderAPI = async (item:any) => {
  const response = await axios.put(`${API_URL}/${item.id}`, item);
  return response.data;
};
