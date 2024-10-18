import apiClient from "./intance";

const login = async () =>{
    const response = await apiClient.get('users');

    // lấy ra danh sách user và bắt đầu tìm kiếm theo email và password (dùng hàn find())
}